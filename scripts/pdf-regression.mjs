import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import ts from "typescript";
import React from "react";
import { renderToFile, Font } from "@react-pdf/renderer";

const baseline = process.argv.includes("--baseline");
const fixture = JSON.parse(
  fs.readFileSync("tests/fixtures/pdf-cases.json", "utf8"),
);
const source = JSON.parse(
  fs.readFileSync("tests/fixtures/legacy-source.json", "utf8"),
);
const out = baseline ? "tests/pdf-baseline" : "tests/pdf-current";
if (baseline && fs.existsSync(out + "/manifest.json"))
  throw Error(
    "Referências imutáveis: comparação não pode sobrescrever baseline.",
  );
fs.mkdirSync(out, { recursive: true });
const NativeDate = Date;
globalThis.Date = class extends NativeDate {
  constructor(...args) {
    super(...(args.length ? args : [fixture.now]));
  }
  static now() {
    return new NativeDate(fixture.now).getTime();
  }
};
process.env.TZ = fixture.timezone;
const runtime = path.resolve(
  "tmp/pdf-runtime-" + (baseline ? "baseline" : "current"),
);
fs.mkdirSync(runtime, { recursive: true });
if (!baseline) {
  const code = ts.transpileModule(
    fs.readFileSync("src/lib/pdf/applicationDate.ts", "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  fs.writeFileSync(path.join(runtime, "applicationDate.mjs"), code);
  const { initializeDocumentClock } = await import(
    pathToFileURL(path.join(runtime, "applicationDate.mjs"))
  );
  initializeDocumentClock();
}
for (const file of Object.keys(source).filter(
  (p) => p.startsWith("src/pdf/") || p.startsWith("src/types/"),
)) {
  const s = baseline ? source[file] : fs.readFileSync(file, "utf8");
  let code = ts.transpileModule(s, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  code = code.replace(/from "\.\.\/types\/([^"]+)"/g, 'from "./$1.mjs"');
  code = code.replace(
    '"../lib/pdf/applicationDate"',
    '"./applicationDate.mjs"',
  );
  fs.writeFileSync(
    path.join(runtime, path.basename(file).replace(/\.tsx?$/, ".mjs")),
    code,
  );
}
const docs = {};
const loadDocument = async (file) => {
  docs[file] = (
    await import(
      pathToFileURL(
        path.join(runtime, path.basename(file).replace(".tsx", ".mjs")),
      )
    )
  ).default;
};
if (baseline) {
  // Original App imported every document, including global hyphenation registration.
  for (const file of [...new Set(fixture.cases.map((c) => c.pdf))])
    await loadDocument(file);
} else {
  // Exercise the actual shared initialization before lazily importing each document.
  const code = ts.transpileModule(
    fs.readFileSync("src/lib/pdf/configureFonts.ts", "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  fs.writeFileSync(path.join(runtime, "configureFonts.mjs"), code);
  const { configureFonts } = await import(
    pathToFileURL(path.join(runtime, "configureFonts.mjs"))
  );
  configureFonts(Font);
}
const hash = (b) => createHash("sha256").update(b).digest("hex");
const manifest = {
  now: fixture.now,
  timezone: fixture.timezone,
  renderer: JSON.parse(
    fs.readFileSync("node_modules/@react-pdf/renderer/package.json", "utf8"),
  ).version,
  dpi: 96,
  documents: [],
};
for (const c of fixture.cases) {
  if (!docs[c.pdf]) await loadDocument(c.pdf);
  const props = structuredClone(c.props);
  if (props.data?.dataRequerimento)
    props.data.dataRequerimento = new Date(props.data.dataRequerimento);
  const file = path.resolve(out, c.id + ".pdf");
  const start = performance.now();
  await renderToFile(React.createElement(docs[c.pdf], props), file);
  const ms = Math.round(performance.now() - start);
  execFileSync(
    "pdftoppm",
    ["-r", "96", "-png", file, path.resolve(out, c.id)],
    { stdio: "pipe" },
  );
  const info = execFileSync("pdfinfo", [file], { encoding: "utf8" });
  const python =
    process.env.PYTHON ||
    (process.platform === "win32"
      ? path.join(
          process.env.USERPROFILE,
          ".cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe",
        )
      : "python3");
  const text = execFileSync(
    python,
    [
      "-c",
      'import sys; from pypdf import PdfReader; sys.stdout.reconfigure(encoding="utf-8"); print("\\f".join(p.extract_text(extraction_mode="layout") for p in PdfReader(sys.argv[1]).pages))',
      file,
    ],
    { encoding: "utf8" },
  );
  fs.writeFileSync(path.resolve(out, c.id + ".txt"), text);
  const images = fs
    .readdirSync(out)
    .filter((p) => p.startsWith(c.id + "-") && p.endsWith(".png"))
    .sort()
    .map((p) => ({
      file: p,
      sha256: hash(fs.readFileSync(path.join(out, p))),
    }));
  manifest.documents.push({
    id: c.id,
    pages: Number(info.match(/Pages:\s+(\d+)/)?.[1]),
    size: info.match(/Page size:\s+([^\n]+)/)?.[1],
    textSha256: hash(text),
    images,
    ms,
  });
  console.log(c.id + ": " + images.length + " páginas, " + ms + " ms");
}
fs.writeFileSync(out + "/manifest.json", JSON.stringify(manifest, null, 2));
if (!baseline) {
  const before = JSON.parse(
    fs.readFileSync("tests/pdf-baseline/manifest.json", "utf8"),
  );
  const differences = [];
  for (const doc of manifest.documents) {
    const b = before.documents.find((d) => d.id === doc.id);
    for (const key of ["pages", "size", "textSha256", "images"])
      if (JSON.stringify(doc[key]) !== JSON.stringify(b[key]))
        differences.push(doc.id + ": " + key);
  }
  const holiday = fixture.cases.find(
    (c) => c.id === "formulario-ferias-completo",
  );
  const holidayProps = structuredClone(holiday.props);
  holidayProps.data.dataRequerimento = new Date(
    holidayProps.data.dataRequerimento,
  );
  const repeated = path.join(runtime, "ferias-apos-recadastramento.pdf");
  await renderToFile(
    React.createElement(docs[holiday.pdf], holidayProps),
    repeated,
  );
  const repeatedPrefix = path.join(runtime, "ferias-apos-recadastramento");
  execFileSync("pdftoppm", ["-r", "96", "-png", repeated, repeatedPrefix], {
    stdio: "pipe",
  });
  const holidayReference = before.documents.find((d) => d.id === holiday.id);
  for (let i = 0; i < holidayReference.images.length; i++) {
    if (
      hash(fs.readFileSync(`${repeatedPrefix}-${i + 1}.png`)) !==
      holidayReference.images[i].sha256
    )
      differences.push(`Férias após recadastramento: página ${i + 1}`);
  }
  fs.writeFileSync(
    out + "/comparison.json",
    JSON.stringify(
      {
        checked: manifest.documents.length,
        order: "ferias-recadastramento-ferias",
        differences,
      },
      null,
      2,
    ),
  );
  if (differences.length)
    throw Error("Diferenças nos PDFs:\n" + differences.join("\n"));
  console.log("Todos os PDFs: páginas, dimensões, texto e imagens idênticos.");
}
