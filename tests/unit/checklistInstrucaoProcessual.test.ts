import assert from "node:assert/strict";
import { test } from "node:test";
import { createChecklistInstrucaoProcessualData } from "../../src/features/checklistInstrucaoProcessual/checklistInstrucaoProcessual.defaults.ts";
import { validateChecklistInstrucaoProcessual } from "../../src/features/checklistInstrucaoProcessual/checklistInstrucaoProcessual.validation.ts";

test("checklist exige os cinco campos e aceita preenchimento completo", () => {
  const empty = createChecklistInstrucaoProcessualData();
  assert.deepEqual(
    validateChecklistInstrucaoProcessual(empty).map((error) => error.field),
    Object.keys(empty),
  );

  const complete = Object.fromEntries(
    Object.keys(empty).map((key) => [key, `Valor sintético de ${key}`]),
  ) as typeof empty;
  assert.deepEqual(validateChecklistInstrucaoProcessual(complete), []);
  assert.deepEqual(
    validateChecklistInstrucaoProcessual({
      ...complete,
      objetoReduzido: "  ",
    }).map((error) => error.field),
    ["objetoReduzido"],
  );
});
