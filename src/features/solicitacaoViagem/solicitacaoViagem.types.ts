export interface Participante {
  id: number;
  nome: string;
}

export interface FormData {
  // Campos do Solicitante
  nome: string;
  matricula: string;
  cargo: string;
  banco: string;
  agencia: string;
  conta: string;
  pix: string;
  // Campos que já existiam
  numVereadores: string;
  numServidores: string;
  finalidade: "encontro" | "curso" | "outros";
  finalidadeOutros: string;
  periodo: string;
  cidadeEstado: string;
  local: string;
  meioTransporte: string;
  justificativa: string;
}
