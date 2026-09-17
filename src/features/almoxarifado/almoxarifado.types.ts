export interface ItemRequisicao {
  id: number;
  descricao: string;
  quantidadeSolicitada: string;
  quantidadeAtendida: string;
}

export interface FormData {
  // Campos do Cabeçalho (Anexo I)
  dataEmissao: string;
  requisicaoNum: string;
  requisitante: string;
  lotacao: string;
  justificativa: string;

  // CAMPOS DE RECEBIMENTO REMOVIDOS
}
