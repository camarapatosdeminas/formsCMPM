import type { FormData } from "./cartaoPonto.types";
export const createFormData = (): FormData => ({
  nome: "",
  matricula: "",
  setor: "",
  horario: "",
  vereador: "",
  mesReferencia: "",
  inicioFerias: "",
  fimFerias: "",
  pontosFacultativos: [],
  feriados: [],
});
