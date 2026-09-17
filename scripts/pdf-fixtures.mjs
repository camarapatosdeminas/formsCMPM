import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { pathToFileURL } from "node:url";
const inventory = JSON.parse(
  fs.readFileSync("tests/fixtures/inventory.json", "utf8"),
);
const original = JSON.parse(
  fs.readFileSync("tests/fixtures/legacy-source.json", "utf8"),
);
const dir = "tmp/pdf-reference-runtime";
fs.mkdirSync(dir, { recursive: true });
const now = "2026-09-02T15:00:00.000Z";
const NativeDate = Date;
globalThis.Date = class extends NativeDate {
  constructor(...args) {
    super(...(args.length ? args : [now]));
  }
  static now() {
    return new NativeDate(now).getTime();
  }
};
process.env.TZ = "America/Sao_Paulo";
for (const [file, source] of Object.entries(original).filter(([p]) =>
  p.startsWith("src/types/"),
)) {
  fs.writeFileSync(
    path.join(dir, path.basename(file).replace(/\.ts$/, ".mjs")),
    ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
  );
}
const { createInitialRecadastramentoData } = await import(
  pathToFileURL(path.resolve(dir, "recadastramento.mjs"))
);
const evaluate = (expr, env = {}) =>
  new Function(
    ...Object.keys(env),
    "return (" + expr.replace(/ as any/g, "") + ");",
  )(...Object.values(env));
const fill = (v, key = "", long = false) => {
  if (Array.isArray(v)) return v.length ? v.map((x) => fill(x, key, long)) : v;
  if (v && typeof v === "object" && !(v instanceof Date))
    return Object.fromEntries(
      Object.entries(v).map(([k, val]) => [k, fill(val, k, long)]),
    );
  if (v !== "" || typeof v !== "string") return v;
  if (/cpf/i.test(key)) return "529.982.247-25";
  if (/cnpj/i.test(key)) return "12.ABC.345/01DE-35";
  if (/email/i.test(key)) return "teste@example.invalid";
  if (/telefone|celular|contato|whatsapp/i.test(key)) return "(34) 99999-0000";
  if (/data|admissao|inicioFerias|fimFerias/i.test(key)) return "2026-09-02";
  if (/mesReferencia/.test(key)) return "2026-09";
  if (/cep/i.test(key)) return "38700-000";
  if (/uf$|ufNascimento|estado$/.test(key)) return "MG";
  if (/valor|utilizado|reembolsar|antecipado|devolver/.test(key))
    return "1234,50";
  if (/quantidade|vagas|numVereadores|numServidores|diarias/.test(key))
    return "2";
  if (
    long &&
    /nome|descricao|justificativa|atividades|objetivo|endereco/i.test(key)
  )
    return "Exemplo sintético para conferir texto extenso e paginação. ".repeat(
      10,
    );
  return "Teste " + key;
};
const fixtures = [];
for (const f of inventory) {
  const env = { createInitialRecadastramentoData };
  for (const [key, expr] of Object.entries(f.states)) {
    try {
      const val = evaluate(expr, env);
      env[key] = typeof val === "function" ? val() : val;
    } catch {}
  }
  const props = Object.fromEntries(
    Object.entries(f.props).map(([k, v]) => [k, evaluate(v, env)]),
  );
  const add = (name, p) =>
    fixtures.push({
      id: f.route.slice(1).toLowerCase() + "-" + name,
      route: f.route,
      pdf: f.pdf,
      props: p,
    });
  if (f.route === "/cartao-ponto")
    Object.assign(props.data, {
      nome: "Pessoa Sintética",
      matricula: "0001",
      mesReferencia: "2026-09",
    });
  if (f.route === "/recadastramento") {
    Object.assign(props.data, {
      tipoRecadastramento: "simplificado",
      nome: "Pessoa Sintética",
      rg: "RG-001",
      cpf: "529.982.247-25",
      cargoFuncao: "Teste",
    });
  }
  add("minimo", structuredClone(props));
  const full = fill(props);
  if (f.route === "/recadastramento") {
    Object.assign(full.data, {
      tipoRecadastramento: "completo",
      vinculo: "efetivo",
      possuiDeficiencia: true,
      exerceAtividadeRemunerada: true,
      dependentes: [
        {
          id: 1,
          nome: "Dependente Sintético",
          parentesco: "Filho",
          dataNascimento: "2010-01-15",
          ir: true,
          af: false,
          am: false,
        },
      ],
    });
  }
  add("completo", structuredClone(full));
  add("longo", fill(props, "", true));
  const branch = structuredClone(full);
  const primary = branch.formData || branch.data || branch.servidorInfo;
  for (const [k, v] of Object.entries(primary)) {
    if (typeof v === "boolean") primary[k] = !v;
    const options = f.controls
      .filter((c) => c.name === k && c.type === "radio" && c.value)
      .map((c) => c.value.replace(/^"|"$/g, ""));
    if (options.length) primary[k] = options.at(-1);
  }
  if (f.route === "/formulario-ferias")
    Object.assign(primary, {
      periodoGozo: "15",
      justificativa: "Solicitação sintética de parcelamento.",
    });
  if (f.route === "/recadastramento")
    Object.assign(primary, {
      tipoPessoa: "vereador",
      tipoRecadastramento: "completo",
      situacaoVereador: "servidorIncompativel",
      opcaoRemuneracao: "naoOpta",
      baseContribuicao: "remuneracaoCargoEfetivo",
    });
  if (f.route === "/cartao-ponto")
    Object.assign(primary, {
      inicioFerias: "2026-09-10",
      fimFerias: "2026-09-20",
      feriados: ["2026-09-07"],
      pontosFacultativos: ["2026-09-08"],
    });
  add("variante", branch);
  for (const [k, v] of Object.entries(full))
    if (Array.isArray(v) && v.length) {
      const p = structuredClone(full);
      p[k] = Array.from({ length: 16 }, (_, i) => ({ ...v[0], id: i + 1 }));
      add("lista-" + k, p);
    }
  if (f.route === "/recadastramento") {
    const p = structuredClone(full);
    p.data.bens = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      descricao: "Bem sintético " + (i + 1),
      valor: "0,00",
    }));
    p.data.dependentes = Array.from({ length: 10 }, (_, i) => ({
      ...full.data.dependentes[0],
      id: i + 1,
      nome: "Dependente sintético " + (i + 1),
    }));
    add("listas", p);
    for (const tipoPessoa of ["servidor", "vereador"]) {
      const p = structuredClone(full);
      Object.assign(p.data, {
        tipoPessoa,
        tipoRecadastramento: "simplificado",
      });
      add("simplificado-" + tipoPessoa, p);
    }
  }
}
if (fs.existsSync("tests/fixtures/pdf-cases.json"))
  throw Error("Fixtures já existem; não sobrescrever.");
fs.writeFileSync(
  "tests/fixtures/pdf-cases.json",
  JSON.stringify({ now, timezone: process.env.TZ, cases: fixtures }, null, 2),
);
console.log(fixtures.length + " fixtures sintéticas criadas.");
