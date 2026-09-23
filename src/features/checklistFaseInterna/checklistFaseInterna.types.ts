export type ChecklistItemStatus = "" | "valid" | "invalid";

export interface ChecklistItem {
  id: string;
  itemName: string;
  itemDescription: string;
  status: ChecklistItemStatus;
  observation: string;
  legalBasis: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistFaseInternaData {
  orgaoRequisitante: string;
  objetoReduzido: string;
  modalidadeCriterio: string;
  valorGlobalEstimado: string;
  garantiaSuporte: string;
  sections: ChecklistSection[];
}
