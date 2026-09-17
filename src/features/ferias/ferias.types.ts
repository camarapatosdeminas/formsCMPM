export interface FeriasData {
  nome: string;
  matricula: string;
  cpf: string;
  lotacao: string;
  periodoGozo: "30" | "20" | "15" | "10";
  dataInicio: string;
  justificativa: string;
  outrosDias: string;
  dataRequerimento: Date;
}
