export interface FormData {
  nome: string;
  matricula: string;
  cargo: string;
  banco: string;
  tipoConta: "corrente" | "poupanca";
  agencia: string;
  conta: string;
  pix: string;
  cidade: string;
  estado: string;
  periodoViagem: string;
  meioTransporte: "carro" | "onibus" | "aereo" | "outro";
  placaCarro: string;
  outroTransporte: string; // Adicionado este campo
  diariasInteiras: string;
  diariasReduzidas: string;
  solicitaAntecipacao: "sim" | "nao";
  valorSolicitado: string;
  objetivo: string;
}
