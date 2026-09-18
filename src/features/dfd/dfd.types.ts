export type GrauPrioridade = "" | "baixo" | "medio" | "alto";
export type RespostaBinaria = "" | "sim" | "nao";

export interface DfdItem {
  id: number;
  descricao: string;
  quantidade: string;
  valorUnitario: string;
  valorTotal: string;
}

export interface DfdData {
  objeto: string;
  setorRequisitante: string;
  responsavelDemanda: string;
  matricula: string;
  email: string;
  telefone: string;
  justificativa: string;
  itens: DfdItem[];
  providenciasVinculacao: string;
  dataInicio: string;
  valorEstimado: string;
  prioridade: GrauPrioridade;
  motivoPrioridade: string;
  fiscalTitular: string;
  fiscalSubstituto: string;
  gestorTitular: string;
  gestorSubstituto: string;
  dataFormalizacao: string;
  responsavelFormalizacao: string;
  matriculaFormalizacao: string;
  relacionadoTecnologia: RespostaBinaria;
}
