import type { Dependente, ServidorInfo } from "./declaracaoDependentes.types";
export const createServidorInfo = (): ServidorInfo => ({
  nome: "",
  matricula: "",
});
export const createDependentes = (): Dependente[] => [
  {
    id: 1,
    nome: "",
    dataNascimento: "",
    parentesco: "",
    cpf: "",
    isDependenteIR: true,
  },
];
