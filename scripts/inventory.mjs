import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const read = (p) => fs.readFileSync(p, "utf8");
const parse = (p, source = read(p)) =>
  ts.createSourceFile(
    p,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
const walk = (n, fn) => {
  fn(n);
  ts.forEachChild(n, (c) => walk(c, fn));
};
const attrs = (n) =>
  Object.fromEntries(
    n.attributes.properties
      .filter(ts.isJsxAttribute)
      .map((a) => [
        a.name.text,
        !a.initializer
          ? "true"
          : ts.isStringLiteral(a.initializer)
            ? a.initializer.text
            : (a.initializer.expression?.getText() ?? ""),
      ]),
  );
const files = fs
  .readdirSync("src", { recursive: true })
  .filter((p) => /\.(tsx?|css)$/.test(p))
  .map((p) => "src/" + p.replaceAll("\\", "/"));
fs.mkdirSync("tests/fixtures", { recursive: true });
fs.mkdirSync("docs/modernizacao", { recursive: true });
if (fs.existsSync("tests/fixtures/legacy-source.json"))
  throw Error("A referência já existe: não sobrescrever.");
fs.writeFileSync(
  "tests/fixtures/legacy-source.json",
  JSON.stringify(Object.fromEntries(files.map((p) => [p, read(p)])), null, 2),
);
const app = parse("src/App.tsx");
const imports = {};
walk(app, (n) => {
  if (ts.isImportDeclaration(n) && n.importClause?.name)
    imports[n.importClause.name.text] = n.moduleSpecifier.text;
});
const routes = {};
walk(app, (n) => {
  if (ts.isJsxSelfClosingElement(n) && n.tagName.getText() === "Route") {
    const a = attrs(n);
    const name = a.element?.match(/<([\w]+)/)?.[1];
    if (name && a.path !== "/")
      routes[
        path.normalize("src/" + imports[name] + ".tsx").replaceAll("\\", "/")
      ] = a.path;
  }
});
const inventory = [];
for (const [file, route] of Object.entries(routes)) {
  const source = read(file),
    ast = parse(file);
  const states = {},
    controls = [],
    conditions = [],
    operations = [];
  let pdf = "",
    component = "",
    props = {},
    download = "";
  walk(ast, (n) => {
    if (ts.isImportDeclaration(n) && n.moduleSpecifier.text.includes("/pdf/")) {
      pdf = path
        .normalize(
          path.join(path.dirname(file), n.moduleSpecifier.text + ".tsx"),
        )
        .replaceAll("\\", "/");
      component = n.importClause.name.text;
    }
    if (
      ts.isVariableDeclaration(n) &&
      ts.isArrayBindingPattern(n.name) &&
      n.initializer &&
      ts.isCallExpression(n.initializer) &&
      n.initializer.expression.getText() === "useState"
    )
      states[n.name.elements[0].name.getText()] =
        n.initializer.arguments[0]?.getText();
    if (ts.isJsxSelfClosingElement(n) || ts.isJsxOpeningElement(n)) {
      const tag = n.tagName.getText(),
        a = attrs(n);
      if (tag === component) props = a;
      if (tag === "PDFDownloadLink") download = a.fileName;
      if (["input", "textarea", "select"].includes(tag)) {
        let label = a.placeholder || a["aria-label"] || a.name || a.id || "";
        let p = n.parent;
        const conditional = [];
        while (p) {
          if (
            ts.isJsxElement(p) &&
            p.openingElement.tagName.getText() === "label"
          )
            label =
              p.children
                .filter(ts.isJsxText)
                .map((c) => c.text.trim())
                .join(" ") || label;
          if (
            ts.isBinaryExpression(p) &&
            p.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
          )
            conditional.push(p.left.getText());
          if (ts.isConditionalExpression(p))
            conditional.push(p.condition.getText());
          p = p.parent;
        }
        controls.push({
          tag,
          label,
          ...a,
          condition: conditional.reverse().join(" && ") || "Sempre",
        });
      }
    }
    if (ts.isIfStatement(n)) conditions.push(n.expression.getText());
    if (
      ts.isVariableDeclaration(n) &&
      n.initializer &&
      ts.isArrowFunction(n.initializer) &&
      /handle|adicionar|remover|update|prepare|add|validate/i.test(
        n.name.getText(),
      )
    )
      operations.push(n.getText());
  });
  inventory.push({
    file,
    route,
    pdf,
    component,
    states,
    props,
    download,
    controls,
    conditions,
    operations,
  });
}
fs.writeFileSync(
  "tests/fixtures/inventory.json",
  JSON.stringify(inventory, null, 2),
);
let md =
  "# Contrato de campos — referência anterior à migração\n\nCommit " +
  execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim() +
  ". Extração AST do código local em 02/09/2026. Os handlers abaixo são a referência operacional: atributos nativos isolados não significam bloqueio da geração. `legacy-source.json` conserva o código original integral.\n\nNos 14 formulários sem validação de geração, todos os campos aceitam vazio. Férias exige somente justificativa quando período ≠30; cartão exige nome, matrícula e mês; recadastramento tem validação condicional transcrita abaixo. Listas mínimas não tornam o conteúdo das linhas obrigatório.\n\n";
const cell = (v) =>
  String(v ?? "—")
    .replaceAll("|", "\\|")
    .replace(/\s+/g, " ")
    .trim();
for (const f of inventory) {
  md +=
    "## " +
    f.route +
    "\n\nPágina: `" +
    f.file +
    "`. PDF: `" +
    f.pdf +
    "`. Download: `" +
    cell(f.download) +
    "`.\n\n### Estado inicial\n\n```tsx\n" +
    Object.entries(f.states)
      .filter(
        ([k]) =>
          !["documentoPronto", "pdfPronto", "ready", "errors"].includes(k),
      )
      .map(([k, v]) => k + " = " + v)
      .join("\n") +
    "\n```\n\n### Campos e correspondência\n\n| Nome / valor no estado | Rótulo original | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração | PDF |\n|---|---|---|---|---|---|---|---|\n";
  for (const c of f.controls)
    md +=
      "| " +
      [
        c.name || c.id || c.value || c.checked,
        c.label,
        c.type || c.tag,
        c.condition + (c.disabled ? " / disabled: " + c.disabled : ""),
        c.required || "Não declarada",
        ["min", "max", "maxLength", "pattern"]
          .filter((k) => c[k])
          .map((k) => k + "=" + c[k])
          .join("; ") || "Nenhum",
        c.onChange || "—",
        c.value || c.checked || c.name,
      ]
        .map(cell)
        .join(" | ") +
      " |\n";
  md +=
    "\nDados enviados: `" +
    cell(JSON.stringify(f.props)) +
    "`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.\n\n### Operações e regras preservadas\n\n```tsx\n" +
    f.operations.join("\n\n") +
    "\n```\n\n";
}
md +=
  "## Divergências registradas\n\n- Adicionar participante/dependente em viagem/dependentes não invalidava um download anterior; será corrigido tecnicamente sem alterar mínimo de linhas.\n- Relatório de viagem e listas de materiais/participantes mutavam objetos aninhados; usar atualização imutável.\n- Férias descreve parcelamento no rótulo, mas a condição operacional é somente período diferente de 30.\n- Inspeção médica converte algumas datas civis via UTC; defeito legado no PDF deve permanecer documentado, sem mudar o documento nesta migração.\n- Tipos da solicitação de viagem no PDF não declaram todos os campos já enviados pela página; preservar payload e apresentação.\n- Recadastramento: o retorno antecipado do simplificado dispensa as demais validações. Telefone/celular requer somente um deles com dígitos, não comprimento completo.\n";
fs.writeFileSync("docs/modernizacao/contrato-campos.md", md);
fs.writeFileSync(
  "docs/modernizacao/progresso.md",
  "# Progresso da modernização\n\nResponsável: Codex. Início: 02/09/2026.\n\n| Bloco | Estado | Evidências e próximo passo |\n|---|---|---|\n| P0 | em andamento | Inventário AST, código original preservado e regras transcritas. Gerar fixtures e PDFs antes da migração. |\n| P1/P2 | pendente | Dependem das referências P0. |\n| P3/P4 | pendente | Pilotos após fundamentos. |\n| P5 | pendente | Migração após pilotos. |\n| P6 | em andamento | Bundle inicial medido; inspeção de rede pendente. |\n| P7 | pendente | Validação integrada e navegador visível ao final. |\n\nAlteração anterior preservada: AGENTS.md modificado pelo usuário. HEAD a4d17a3, formatação prévia concluída; nenhuma migração de interface encontrada. Lint inicial: 213 erros, saída 1. Build inicial: tsc aprovado; Vite bloqueado pelo sandbox (saída 1); repetição autorizada fora do sandbox: saída 0.\n",
);
console.log(
  inventory.length +
    " formulários, " +
    inventory.reduce((n, f) => n + f.controls.length, 0) +
    " controles registrados.",
);
