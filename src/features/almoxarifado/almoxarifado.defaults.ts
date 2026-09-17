import type { ItemRequisicao, FormData } from "./almoxarifado.types";
export const createFormData = (): FormData => ({
  dataEmissao: new Date().toLocaleDateString("pt-BR"),
  requisicaoNum: "",
  requisitante: "",
  lotacao: "",
  justificativa: "",
});
export const createItens = (): ItemRequisicao[] => [
  { id: 1, descricao: "", quantidadeSolicitada: "", quantidadeAtendida: "" },
];
