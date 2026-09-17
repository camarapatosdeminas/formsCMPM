export interface Dependente {
  id: number;
  nome: string;
  dataNascimento: string;
  parentesco: string;
  cpf: string;
  isDependenteIR: boolean;
}

export interface ServidorInfo {
  nome: string;
  matricula: string;
}
