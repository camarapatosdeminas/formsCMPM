import { test, expect, devices } from "@playwright/test";
import { formCatalog } from "../../src/app/formCatalog";

const TOTAL_FORMS = formCatalog.length;
test("Calendário: mês, fins de semana, exclusividade e filtros", async ({
  page,
}) => {
  await page.goto("/cartao-ponto");
  await page.locator("#mesReferencia").fill("2026-09");
  await page.locator("#pontoFacultativo").fill("2026-09-05");
  await expect(page.getByRole("alert")).toContainText("dias de semana");
  await page.locator("#pontoFacultativo").fill("2026-10-01");
  await expect(page.getByRole("alert")).toContainText("mês de referência");
  await page.locator("#pontoFacultativo").fill("2026-09-07");
  await expect(
    page.getByRole("button", {
      name: "Remover ponto facultativo de 07/09/2026",
    }),
  ).toHaveCount(1);
  await page.locator("#feriado").fill("2026-09-07");
  await expect(
    page.getByRole("button", { name: /Remover ponto facultativo/ }),
  ).toHaveCount(0);
  await page.locator("#feriado").fill("2026-09-07");
  await expect(
    page.getByRole("button", { name: "Remover feriado de 07/09/2026" }),
  ).toHaveCount(1);
  await page.locator("#mesReferencia").fill("2026-10");
  await expect(
    page.getByRole("button", { name: /Remover feriado/ }),
  ).toHaveCount(0);
  await expect(page.locator("#inicioFerias")).toHaveValue("");
  await expect(page.locator("#fimFerias")).toHaveValue("");
});

test("Falha de geração permite tentar novamente com os mesmos dados", async ({
  page,
}) => {
  // A controlled browser-resource failure exercises the real hook, renderer and recovery.
  await page.addInitScript(() => {
    const original = URL.createObjectURL;
    let failed = false;
    URL.createObjectURL = (blob) => {
      if (!failed && blob instanceof Blob && blob.type === "application/pdf") {
        failed = true;
        throw new Error("Falha sintética de recurso do navegador");
      }
      return original(blob);
    };
  });
  await page.goto("/formulario-ferias");
  await page.locator("#nome").fill("Pessoa Sintética Recuperação");
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Não foi possível gerar",
  );
  await expect(page.locator("#nome")).toHaveValue(
    "Pessoa Sintética Recuperação",
  );
  await page.getByRole("button", { name: "Tentar novamente" }).click();
  await expect(
    page.getByRole("link", { name: "Baixar PDF", exact: true }),
  ).toBeVisible();
});

test("Chunk de rota indisponível: recuperação pelo catálogo e recarga", async ({
  page,
}) => {
  await page.route("**/Adiantamento13Page-*.js", (route) => route.abort());
  await page.goto("/adiantamento-13");
  await expect(
    page.getByRole("heading", { name: "Não foi possível abrir o formulário" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Voltar aos formulários" }).click();
  await expect(page.locator("main h3")).toHaveCount(TOTAL_FORMS);
  await page.unroute("**/Adiantamento13Page-*.js");
  await page.goto("/adiantamento-13");
  await expect(page.locator("#nome")).toBeVisible();
});

test("Home: teclado, retrato/paisagem e área de reflow equivalente a 200%/400%", async ({
  page,
}, info) => {
  await page.goto("/");
  for (const [width, height] of [
    [320, 720],
    [390, 844],
    [844, 390],
    [640, 512],
    [320, 256],
    [1440, 1000],
  ]) {
    await page.setViewportSize({ width, height });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveAttribute("type", "search");
  await page.keyboard.type("ferias");
  await expect(page.locator("main h3")).toHaveCount(1);
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.press("Backspace");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: info.outputPath("home-mobile.png"),
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: info.outputPath("home-desktop.png"),
    fullPage: true,
  });
});

test("Toque emulado: máscara, seleção, geração e download", async ({
  browser,
}, info) => {
  const context = await browser.newContext({
    ...devices["Pixel 7"],
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/formulario-ferias");
  const cpf = page.locator("#cpf");
  await cpf.tap();
  await cpf.fill("012.345.678-90");
  await expect(cpf).toHaveValue("012.345.678-90");
  await cpf.press("ControlOrMeta+A");
  await cpf.pressSequentially("52998224725");
  await expect(cpf).toHaveValue("529.982.247-25");
  await cpf.press("ControlOrMeta+A");
  await cpf.press("Backspace");
  await expect(cpf).toHaveValue("");
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).tap();
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Baixar PDF", exact: true }).tap();
  await (await download).saveAs(info.outputPath("mobile-ferias.pdf"));
  await context.close();
});

test("Geração sob demanda: rede local, tempos e digitação em formulário extenso", async ({
  page,
}, info) => {
  await page.goto("/");
  const initial = await page.evaluate(() =>
    performance.getEntriesByType("resource").map((e) => {
      const r = e as PerformanceResourceTiming;
      return {
        name: r.name,
        type: r.initiatorType,
        transferSize: r.transferSize,
        decodedBodySize: r.decodedBodySize,
      };
    }),
  );
  const timings: Record<string, number> = {};
  for (const route of [
    "/formulario-ferias",
    "/recadastramento",
    "/relatorio-viagem",
  ]) {
    await page.goto(route);
    if (route === "/recadastramento") {
      for (const [id, value] of Object.entries({
        nome: "Pessoa Sintética",
        cpf: "52998224725",
        rg: "RG-01",
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
      }))
        await page.locator("#" + id).fill(value);
      await page.locator("#vinculo").selectOption("efetivo");
      await page
        .locator('[id^="bem-"]')
        .first()
        .locator("textarea")
        .fill("Não possuo bens");
      await page.locator('[id^="bem-"]').first().locator("input").fill("0,00");
    }
    const start = performance.now();
    await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
    await expect(
      page.getByRole("link", { name: "Baixar PDF", exact: true }),
    ).toBeVisible();
    timings[route] = Math.round(performance.now() - start);
  }
  await page.goto("/recadastramento");
  const start = performance.now();
  await page
    .locator("#nome")
    .pressSequentially("Pessoa Sintética para verificar atualização de texto");
  timings.typing50Characters = Math.round(performance.now() - start);
  const listStart = performance.now();
  for (let i = 0; i < 10; i++)
    await page.getByRole("button", { name: /Adicionar outro bem/ }).click();
  timings.add10Assets = Math.round(performance.now() - listStart);
  const storage = await page.evaluate(async () => ({
    local: localStorage.length,
    session: sessionStorage.length,
    databases: (await indexedDB.databases()).length,
    serviceWorkers: (await navigator.serviceWorker.getRegistrations()).length,
  }));
  expect(storage).toEqual({
    local: 0,
    session: 0,
    databases: 0,
    serviceWorkers: 0,
  });
  await info.attach("medicao-local", {
    body: JSON.stringify(
      {
        browser: await page.context().browser()?.version(),
        initial,
        timings,
        storage,
      },
      null,
      2,
    ),
    contentType: "application/json",
  });
});
