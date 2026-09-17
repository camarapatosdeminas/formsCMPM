import type { FormData } from "./solicitacaoDiaria.types";
export const createFormData = (): FormData => ({
  nome: "",
  matricula: "",
  cargo: "",
  banco: "",
  tipoConta: "corrente",
  agencia: "",
  conta: "",
  pix: "",
  cidade: "",
  estado: "",
  periodoViagem: "",
  meioTransporte: "carro",
  placaCarro: "",
  outroTransporte: "", // Adicionado este campo
  diariasInteiras: "",
  diariasReduzidas: "",
  solicitaAntecipacao: "nao",
  valorSolicitado: "",
  objetivo: "",
});
