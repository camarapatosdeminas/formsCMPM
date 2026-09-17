import type { FormData } from "./solicitacaoDocumentos.types";
export const createFormData = (): FormData => ({
  nome: "",
  cpf: "",
  email: "",
  contato: "",
  documentosSolicitados: "",
  justificativa: "",
  cienteLgpd: false,
});
