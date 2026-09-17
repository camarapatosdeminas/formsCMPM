import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
const inventory: { route: string; download: string }[] = JSON.parse(
  fs.readFileSync("tests/fixtures/inventory.json", "utf8"),
);
const reportPolicy: string = JSON.parse(
  fs.readFileSync("vercel.json", "utf8"),
).headers[0].headers.find(
  (header: { key: string }) =>
    header.key === "Content-Security-Policy-Report-Only",
).value;
test.beforeEach(async ({ page }) => {
  // Exercise the proposed response policy locally; Vite preview does not read vercel.json.
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() !== "document") return route.continue();
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: {
        ...response.headers(),
        "Content-Security-Policy-Report-Only": reportPolicy,
      },
    });
  });
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      document.documentElement.dataset.cspViolation = JSON.stringify({
        directive: event.violatedDirective,
        resource: event.blockedURI,
        source: event.sourceFile,
        line: event.lineNumber,
      });
    });
  });
});

test("Home: 17 rotas, busca, filtros, resultado vazio e histórico", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("/");
  await expect(page.locator("main h3")).toHaveCount(17);
  await expect(page.locator("h1")).toContainText("Seus formulários");
  expect(
    requests.some((r) => r.includes("react-pdf") || /Pdf[A-Z]/.test(r)),
  ).toBe(false);
  await page.getByRole("searchbox").fill("ferias");
  await expect(page.locator("main h3")).toHaveCount(1);
  await page.getByRole("searchbox").fill("inexistente-xyz");
  await expect(page.getByText("Nenhum formulário encontrado")).toBeVisible();
  await page.getByRole("button", { name: "Limpar busca e filtros" }).click();
  await expect(page.locator("main h3")).toHaveCount(17);
  await page.getByRole("button", { name: "Declarações", exact: true }).click();
  await expect(page.locator("main h3")).toHaveCount(4);
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await page.locator('main a[href="/solicitacao-viagem"]').click();
  await expect(page.locator("h1")).toContainText("Solicitação de viagem");
  await page.goBack();
  await expect(page.locator("main h3")).toHaveCount(17);
  await page.goForward();
  await expect(page.locator("h1")).toContainText("Solicitação de viagem");
  await page.goto("/nao-existe");
  await expect(
    page.getByRole("heading", { name: "Formulário não encontrado" }),
  ).toBeVisible();
});

for (const { route, download } of inventory)
  test(`Mínimo e responsividade: ${route}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    if (route === "/cartao-ponto") {
      await page.locator("#nome").fill("Pessoa Sintética");
      await page.locator("#matricula").fill("0001");
      await page.locator("#mesReferencia").fill("2026-09");
    }
    if (route === "/recadastramento") {
      await page
        .getByRole("radio", { name: /Declaração simplificada/ })
        .check();
      for (const [id, value] of Object.entries({
        nome: "Pessoa Sintética",
        cpf: "52998224725",
        rg: "RG-001",
        cargoFuncao: "Teste",
      }))
        await page.locator("#" + id).fill(value);
    }
    const generate = page.getByRole("button", {
      name: "Gerar PDF",
      exact: true,
    });
    await generate.focus();
    await page.keyboard.press("Enter");
    const link = page.getByRole("link", { name: "Baixar PDF", exact: true });
    await expect(link).toBeVisible();
    const event = page.waitForEvent("download");
    await link.focus();
    await page.keyboard.press("Enter");
    const file = await event;
    expect(file.suggestedFilename()).toMatch(/\.pdf$/);
    if (!download.startsWith("`"))
      expect(file.suggestedFilename()).toBe(download);
    await file.saveAs(info.outputPath("minimo.pdf"));
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
        `overflow ${route} ${width}`,
      ).toBe(true);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: info.outputPath("mobile.png"),
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({
      path: info.outputPath("desktop.png"),
      fullPage: true,
    });
    const ids = await page
      .locator("[id]")
      .evaluateAll((els) => els.map((e) => e.id));
    expect(ids.length).toBe(new Set(ids).size);
    const unlabeled = await page
      .locator("main input,main textarea,main select")
      .evaluateAll((els) =>
        els
          .filter((el) => {
            const input = el as HTMLInputElement;
            return (
              input.type !== "hidden" &&
              !input.labels?.length &&
              !input.getAttribute("aria-label") &&
              !input.getAttribute("aria-labelledby")
            );
          })
          .map((e) => e.outerHTML),
      );
    expect(unlabeled).toEqual([]);
    const first = page
      .locator(
        "main input:not([type=radio]):not([type=checkbox]):not([type=date]):not([type=month])",
      )
      .first();
    if (await first.count()) {
      await first.fill("Alteração sintética");
      await expect(link).toHaveCount(0);
    }
    expect(errors).toEqual([]);
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-csp-violation",
    );
  });

test("Férias: erros, máscara, cursor, limpeza e cancelamento de resultado", async ({
  page,
}) => {
  await page.goto("/formulario-ferias");
  await page.getByRole("radio", { name: "15 dias", exact: true }).check();
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("justificativa");
  await page.locator("#justificativa").fill("Motivo sintético");
  await page.getByRole("radio", { name: "30 dias", exact: true }).check();
  await expect(page.locator("#justificativa")).toHaveValue("");
  await expect(page.locator("#justificativa")).toBeDisabled();
  const cpf = page.locator("#cpf");
  await cpf.fill("01234567890");
  await expect(cpf).toHaveValue("012.345.678-90");
  await cpf.press("Home");
  await cpf.press("ArrowRight");
  await cpf.press("Delete");
  await cpf.press("9");
  await expect(cpf).toHaveValue("092.345.678-90");
  await cpf.fill("123");
  await cpf.blur();
  await expect(
    page.getByText("Informe os 11 dígitos", { exact: false }).first(),
  ).toBeVisible();
  await cpf.fill("");
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await page.locator("#nome").fill("Edição durante geração");
  await expect(
    page.getByRole("link", { name: "Baixar PDF", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Baixar PDF", exact: true }),
  ).toBeVisible();
});

test("Recadastramento: completo, alternativas, listas e ramos", async ({
  page,
}) => {
  await page.goto("/recadastramento");
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  const values = {
    nome: "Pessoa Sintética",
    cpf: "52998224725",
    rg: "RG-001",
    cargoFuncao: "Teste",
    matricula: "0001",
    dataNascimento: "1990-01-01",
    naturalidade: "Teste",
    ufNascimento: "MG",
    estadoCivil: "Teste",
    logradouro: "Rua Sintética",
    numero: "0",
    bairro: "Teste",
    email: "teste@example.invalid",
    admissao: "2020-01-01",
    lotacao: "Teste",
    telefone: "1",
  };
  for (const [id, value] of Object.entries(values))
    await page.locator("#" + id).fill(value);
  await page.locator("#vinculo").selectOption("efetivo");
  await page
    .locator('[id^="bem-"]')
    .first()
    .locator("textarea")
    .fill("Não possuo bens");
  await page
    .locator('[id^="bem-"]')
    .first()
    .locator("input")
    .nth(0)
    .fill("0,00");
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Baixar PDF", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Adicionar dependente/ }).click();
  await expect(
    page.getByRole("link", { name: "Baixar PDF", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("dependente");
  await page.getByRole("button", { name: /Remover dependente/ }).click();
  await page.getByRole("radio", { name: /Vereador\(a\)/ }).check();
  await page.getByRole("radio", { name: /Declaração simplificada/ }).check();
  await expect(page.locator("#nome")).toHaveValue("Pessoa Sintética");
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Baixar PDF", exact: true }),
  ).toBeVisible();
});

test("Listas: mínimo, adicionar invalida e identificadores únicos", async ({
  page,
}) => {
  for (const route of [
    "/declaracao-dependentes",
    "/solicitacao-viagem",
    "/ocorrencia-ponto",
    "/requisicao-manual-almoxarifado",
  ]) {
    await page.goto(route);
    await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
    await expect(
      page.getByRole("link", { name: "Baixar PDF", exact: true }),
    ).toBeVisible();
    const add = page.getByRole("button", { name: /Adicionar/ }).first();
    await add.click();
    await expect(
      page.getByRole("link", { name: "Baixar PDF", exact: true }),
    ).toHaveCount(0);
    const ids = await page
      .locator("[id]")
      .evaluateAll((els) => els.map((e) => e.id));
    expect(ids.length).toBe(new Set(ids).size);
    await page
      .getByRole("button", { name: /Remover item/ })
      .last()
      .click();
  }
});

test("CNPJ alfanumérico e campos ocultos preservados", async ({ page }) => {
  await page.goto("/solicitacao-cursos");
  const cnpj = page.locator("#cnpj");
  await cnpj.fill("12abc34501de35");
  await expect(cnpj).toHaveValue("12.ABC.345/01DE-35");
  await cnpj.fill("");
  await page.goto("/SolicitacaoDiaria");
  await page.locator('input[name="meioTransporte"][value="outro"]').check();
  await page.locator("#outroTransporte").fill("Transporte sintético");
  await page.locator('input[name="meioTransporte"][value="carro"]').check();
  await page.locator('input[name="meioTransporte"][value="outro"]').check();
  await expect(page.locator("#outroTransporte")).toHaveValue(
    "Transporte sintético",
  );
});

test("Acessibilidade automatizada e ausência de armazenamento/tráfego de dados", async ({
  page,
}) => {
  const sent: string[] = [];
  page.on("request", (r) => {
    if (r.method() !== "GET" || !r.url().startsWith("http://127.0.0.1:4173"))
      sent.push(r.url());
  });
  for (const route of [
    "/",
    "/formulario-ferias",
    "/recadastramento",
    "/solicitacao-cursos",
    "/cartao-ponto",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
  await page.goto("/formulario-ferias");
  await page.locator("#nome").fill("SINTETICO-NAO-TRANSMITIR");
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Baixar PDF", exact: true }),
  ).toBeVisible();
  expect(sent).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
});
