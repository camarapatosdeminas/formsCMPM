import { createRowId } from "../../lib/validation/rowId";
import type { DfdData, DfdItem } from "./dfd.types";

export const createDfdItem = (): DfdItem => ({
  id: createRowId(),
  descricao: "",
  quantidade: "",
  valorUnitario: "",
  valorTotal: "",
});

export const createDfdData = (): DfdData => ({
  objeto: "",
  setorRequisitante: "",
  responsavelDemanda: "",
  matricula: "",
  email: "",
  telefone: "",
  justificativa: "",
  itens: [createDfdItem()],
  providenciasVinculacao: "",
  dataInicio: "",
  valorEstimado: "",
  prioridade: "",
  motivoPrioridade: "",
  fiscalTitular: "",
  fiscalSubstituto: "",
  gestorTitular: "",
  gestorSubstituto: "",
  dataFormalizacao: "",
  responsavelFormalizacao: "",
  matriculaFormalizacao: "",
  relacionadoTecnologia: "",
});
