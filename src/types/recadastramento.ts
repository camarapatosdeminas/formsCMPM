export type TipoPessoa = "servidor" | "vereador";
export type TipoRecadastramento = "completo" | "simplificado";
export type Vinculo = "efetivo" | "comissionado" | "cedido" | "agentePolitico";

export interface Bem {
  id: number;
  descricao: string;
  valor: string;
}

export interface Dependente {
  id: number;
  nome: string;
  parentesco: string;
  dataNascimento: string;
  ir: boolean;
  af: boolean;
  am: boolean;
}

export interface RecadastramentoData {
  tipoPessoa: TipoPessoa;
  tipoRecadastramento: TipoRecadastramento;
  dataDeclaracao: string;
  matricula: string;
  nome: string;
  dataNascimento: string;
  naturalidade: string;
  ufNascimento: string;
  nacionalidade: string;
  estadoCivil: string;
  sexo: string;
  possuiDeficiencia: boolean;
  tipoDeficiencia: string;
  cpf: string;
  rg: string;
  rgEmissor: string;
  rgUf: string;
  rgData: string;
  tituloEleitor: string;
  zonaEleitoral: string;
  secaoEleitoral: string;
  eleitorUf: string;
  pisPasep: string;
  ctps: string;
  ctpsSerie: string;
  ctpsUf: string;
  ctpsEmissao: string;
  conselhoNumero: string;
  conselhoOrgao: string;
  reservista: string;
  orgaoReservista: string;
  cnh: string;
  cnhCategoria: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  enderecoUf: string;
  email: string;
  telefone: string;
  celular: string;
  admissao: string;
  vinculo: Vinculo | "";
  orgaoCessao: string;
  cargoConcurso: string;
  cargoFuncao: string;
  lotacao: string;
  grauInstrucao: string;
  formacao: string;
  agencia: string;
  operacao: string;
  conta: string;
  exerceAtividadeRemunerada: boolean;
  atividadeRemuneradaDetalhes: string;
  bens: Bem[];
  dependentes: Dependente[];
  situacaoVereador: "naoServidor" | "servidorCompativel" | "servidorIncompativel";
  opcaoRemuneracao: "opta" | "naoOpta";
  baseContribuicao: "subsidioVereador" | "remuneracaoCargoEfetivo";
}

export const hojeIso = () => {
  const hoje = new Date();
  const offset = hoje.getTimezoneOffset();
  return new Date(hoje.getTime() - offset * 60_000).toISOString().slice(0, 10);
};

export const createInitialRecadastramentoData = (): RecadastramentoData => ({
  tipoPessoa: "servidor",
  tipoRecadastramento: "completo",
  dataDeclaracao: hojeIso(),
  matricula: "",
  nome: "",
  dataNascimento: "",
  naturalidade: "",
  ufNascimento: "",
  nacionalidade: "Brasileira",
  estadoCivil: "",
  sexo: "",
  possuiDeficiencia: false,
  tipoDeficiencia: "",
  cpf: "",
  rg: "",
  rgEmissor: "",
  rgUf: "",
  rgData: "",
  tituloEleitor: "",
  zonaEleitoral: "",
  secaoEleitoral: "",
  eleitorUf: "",
  pisPasep: "",
  ctps: "",
  ctpsSerie: "",
  ctpsUf: "",
  ctpsEmissao: "",
  conselhoNumero: "",
  conselhoOrgao: "",
  reservista: "",
  orgaoReservista: "",
  cnh: "",
  cnhCategoria: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cep: "",
  cidade: "Patos de Minas",
  enderecoUf: "MG",
  email: "",
  telefone: "",
  celular: "",
  admissao: "",
  vinculo: "",
  orgaoCessao: "",
  cargoConcurso: "",
  cargoFuncao: "",
  lotacao: "",
  grauInstrucao: "",
  formacao: "",
  agencia: "",
  operacao: "",
  conta: "",
  exerceAtividadeRemunerada: false,
  atividadeRemuneradaDetalhes: "",
  bens: [{ id: 1, descricao: "", valor: "" }],
  dependentes: [],
  situacaoVereador: "naoServidor",
  opcaoRemuneracao: "opta",
  baseContribuicao: "subsidioVereador",
});
