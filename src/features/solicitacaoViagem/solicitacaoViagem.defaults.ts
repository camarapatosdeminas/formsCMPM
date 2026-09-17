import type { Participante, FormData } from "./solicitacaoViagem.types";
export const createFormData = (): FormData => ({
  // Novos campos
  nome: "",
  matricula: "",
  cargo: "",
  banco: "",
  agencia: "",
  conta: "",
  pix: "",
  // Campos que já existiam
  numVereadores: "",
  numServidores: "",
  finalidade: "encontro",
  finalidadeOutros: "",
  periodo: "",
  cidadeEstado: "",
  local: "",
  meioTransporte: "",
  justificativa: "",
});
export const createParticipantes = (): Participante[] => [{ id: 1, nome: "" }];
