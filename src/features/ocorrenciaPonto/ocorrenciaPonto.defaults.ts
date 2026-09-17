import type { Ocorrencia, ServidorInfo } from "./ocorrenciaPonto.types";
export const createServidorInfo = (): ServidorInfo => ({
  servidor: "",
  matricula: "",
  cargo: "",
  chefia: "",
});
export const createOcorrencias = (): Ocorrencia[] => [
  { id: 1, data: "", horario: "", referente: "entrada", justificativa: "" },
];
