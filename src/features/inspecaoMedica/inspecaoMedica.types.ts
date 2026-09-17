export interface FormData {
  nome: string;
  endereco: string;
  data: string;
  numeroCasa: string;
  funcao: string;
  matricula: string;
  lotacao: string;
  emailServidor: string;
  admissao: string;
  sexo: string;
  estadoCivil: string;
  regime: string;
  cpf: string;
  cargo: string;
  // localTrabalho: string;
  bairro: string;
  complemento: string;
  dataSaida: string;
  dataRetorno: string;
  dataAssinaturaServidor: string;
  dataAssinaturaChefe: string;
  dataAfastamento: string;
  descricaoFuncoes: string;
  ramal: string;
  funcaoConfianca: "sim" | "nao";
  funcaoGESAT:
    | "Admissional"
    | "Demissional"
    | "Periódico"
    | "Retorno ao Trabalho"
    | "Readaptacao / Restricao Medica"
    | "Licenca por Acidente de Trabalho"
    | "Licenca para Tratamento de Saude"
    | "Outros";
  outrosFuncaoGESAT: string;
  funcaoAfastamento: "Sim";
  afastadoConsecutivamente: "Sim" | "Não";
  afastadoReadaptado: "Sim" | "Não";
  dataAfastamentoReadaptado: string;
  anamnese: string;
  exames: string;
  diagnostico: string;
  cid: string;
  nomePaciente: string;
  contato: string;
}
