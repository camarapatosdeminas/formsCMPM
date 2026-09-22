import assert from "node:assert/strict";
import { test } from "node:test";
import { createChecklistFaseInternaData } from "../../src/features/checklistFaseInterna/checklistFaseInterna.defaults.ts";
import { validateChecklistFaseInterna } from "../../src/features/checklistFaseInterna/checklistFaseInterna.validation.ts";

test("checklist exige os cinco campos e aceita preenchimento completo", () => {
  const empty = createChecklistFaseInternaData();
  assert.deepEqual(
    validateChecklistFaseInterna(empty).map((error) => error.field),
    Object.keys(empty),
  );

  const complete = Object.fromEntries(
    Object.keys(empty).map((key) => [key, `Valor sintético de ${key}`]),
  ) as typeof empty;
  assert.deepEqual(validateChecklistFaseInterna(complete), []);
  assert.deepEqual(
    validateChecklistFaseInterna({
      ...complete,
      objetoReduzido: "  ",
    }).map((error) => error.field),
    ["objetoReduzido"],
  );
});
