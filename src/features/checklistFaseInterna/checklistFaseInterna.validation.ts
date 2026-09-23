import type { FieldError } from "../../components/forms/FormParts";
import type { ChecklistFaseInternaData } from "./checklistFaseInterna.types";

type HeaderField = Exclude<keyof ChecklistFaseInternaData, "sections">;

const required: Array<[HeaderField, string]> = [
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

  data.sections.forEach((section, sectionIndex) => {
    section.items.forEach((item, itemIndex) => {
      const location = `seção ${sectionIndex + 1}, item ${itemIndex + 1}`;
      if (!item.itemDescription.trim()) {
        errors.push({
          field: `${item.id}-itemDescription`,
          message: `Informe o texto de “${item.itemName}” (${location}).`,
        });
      }
      if (!item.legalBasis.trim()) {
        errors.push({
          field: `${item.id}-legalBasis`,
          message: `Informe a base legal da ${location}.`,
        });
      }
    });
  });

  return errors;
}
