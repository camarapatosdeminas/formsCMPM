import type { FeriasData } from "./ferias.types";
export const createFeriasDefaults = (): FeriasData => ({
  nome: "",
  matricula: "",
  cpf: "",
  lotacao: "",
  periodoGozo: "30",
  dataInicio: "",
  justificativa: "",
  outrosDias: "",
  dataRequerimento: new Date(),
});
