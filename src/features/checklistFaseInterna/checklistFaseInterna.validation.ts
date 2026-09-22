import type { FieldError } from "../../components/forms/FormParts";
import type { ChecklistFaseInternaData } from "./checklistFaseInterna.types";

const required: Array<[keyof ChecklistFaseInternaData, string]> = [
  ["orgaoRequisitante", "Informe o órgão requisitante."],
  ["objetoReduzido", "Informe o objeto reduzido."],
  ["modalidadeCriterio", "Informe a modalidade / critério."],
  ["valorGlobalEstimado", "Informe o valor global estimado."],
  ["garantiaSuporte", "Informe a garantia / suporte."],
];

export function validateChecklistFaseInterna(
  data: ChecklistFaseInternaData,
): FieldError[] {
  const errors: FieldError[] = [];
  for (const [field, message] of required) {
    if (!String(data[field]).trim()) errors.push({ field, message });
  }

  return errors;
}
