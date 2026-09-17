export interface Ocorrencia {
  id: number;
  data: string;
  horario: string;
  referente: "dia" | "entrada" | "saida";
  justificativa: string;
}

export interface ServidorInfo {
  servidor: string;
  matricula: string;
  cargo: string;
  chefia: string;
}
