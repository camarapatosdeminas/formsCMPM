import type { IconType } from "react-icons";
import {
  FiSun,
  FiUserCheck,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiUsers,
  FiShield,
  FiUserX,
  FiBriefcase,
  FiMap,
  FiNavigation,
  FiFileText,
  FiBookOpen,
  FiFolder,
  FiAward,
  FiHeart,
  FiBox,
  FiClipboard,
  FiCheckSquare,
} from "react-icons/fi";
export interface FormDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  icon: IconType;
  terms: string;
}
export const formCatalog: FormDefinition[] = [
  {
    id: "checklistIntroducaoProcessual",
    path: "/checklist-introducao-processual",
    name: "Checklist de Fase Interna",
    description: "Crie o checklist processos internos.",
    category: "Solicitações",
    icon: FiCheckSquare,
    terms: "processo checklist compra prioridade demanda validar interno",
  },
  {
    id: "dfd",
    path: "/documento-formalizacao-demanda",
    name: "Formalização de demanda DFD",
    description:
      "Formalize a necessidade, os itens, a prioridade e os responsáveis pela contratação.",
    category: "Solicitações",
    icon: FiClipboard,
    terms: "dfd contratação compra prioridade demanda tecnologia informática",
  },
  {
    id: "ferias",
    path: "/formulario-ferias",
    name: "Requerimento de férias",
    description:
      "Solicite suas férias regulamentares e informe o período de gozo.",
    category: "Vida funcional",
    icon: FiSun,
    terms: "descanso férias parcelamento",
  },
  {
    id: "recadastramento",
    path: "/recadastramento",
    name: "Recadastramento",
    description: "Atualize seus dados e reúna os anexos em um único documento.",
    category: "Vida funcional",
    icon: FiUserCheck,
    terms: "cadastro portaria servidor vereador",
  },
  {
    id: "adiantamento13",
    path: "/adiantamento-13",
    name: "Antecipação do 13º salário",
    description: "Requeira a antecipação da primeira parcela do 13º salário.",
    category: "Vida funcional",
    icon: FiDollarSign,
    terms: "adiantamento décimo terceiro salario",
  },
  {
    id: "cartaoPonto",
    path: "/cartao-ponto",
    name: "Cartão de ponto",
    description: "Prepare a folha mensal de frequência dos assessores.",
    category: "Vida funcional",
    icon: FiCalendar,
    terms: "frequência mes assessor",
  },
  {
    id: "ocorrenciaPonto",
    path: "/ocorrencia-ponto",
    name: "Ocorrência de ponto",
    description: "Registre ausências, atrasos ou ajustes de marcação.",
    category: "Vida funcional",
    icon: FiClock,
    terms: "frequência atraso falta",
  },
  {
    id: "declaracaoDependentes",
    path: "/declaracao-dependentes",
    name: "Declaração de dependentes",
    description: "Informe os dependentes para fins de imposto de renda.",
    category: "Declarações",
    icon: FiUsers,
    terms: "ir imposto renda",
  },
  {
    id: "declaracaoFichaLimpa",
    path: "/declaracao-ficha-limpa",
    name: "Declaração de ficha limpa",
    description: "Declaração para provimento em cargo comissionado.",
    category: "Declarações",
    icon: FiShield,
    terms: "posse comissionado",
  },
  {
    id: "declaracaoNepotismo",
    path: "/declaracao-nepotismo",
    name: "Declaração de nepotismo",
    description: "Declare a inexistência de situações de nepotismo.",
    category: "Declarações",
    icon: FiUserX,
    terms: "parentesco posse",
  },
  {
    id: "declaracaoNaoOcupacao",
    path: "/declaracao-nao-ocupacao",
    name: "Não ocupação de cargos",
    description: "Declaração quanto à ocupação de cargos públicos.",
    category: "Declarações",
    icon: FiBriefcase,
    terms: "acumulação posse",
  },
  {
    id: "solicitacaoViagem",
    path: "/solicitacao-viagem",
    name: "Solicitação de viagem",
    description:
      "Informe o destino, a finalidade e os participantes da viagem.",
    category: "Viagens e capacitação",
    icon: FiMap,
    terms: "destino participantes transporte",
  },
  {
    id: "solicitacaoDiaria",
    path: "/SolicitacaoDiaria",
    name: "Diárias e passagens",
    description: "Solicite diárias, passagens e antecipação para viagem.",
    category: "Viagens e capacitação",
    icon: FiNavigation,
    terms: "viagem diária passagem",
  },
  {
    id: "relatorioViagem",
    path: "/relatorio-viagem",
    name: "Relatório de viagem",
    description: "Registre atividades e despesas para a prestação de contas.",
    category: "Viagens e capacitação",
    icon: FiFileText,
    terms: "despesas reembolso prestação contas",
  },
  {
    id: "solicitacaoCursos",
    path: "/solicitacao-cursos",
    name: "Apoio a cursos",
    description: "Solicite apoio para iniciativas de capacitação.",
    category: "Viagens e capacitação",
    icon: FiBookOpen,
    terms: "inscrição mensalidade formação treinamento",
  },
  {
    id: "solicitacaoDocumentos",
    path: "/solicitacao-documentos",
    name: "Solicitação de documentos",
    description: "Solicite cópias de documentos da sua pasta funcional.",
    category: "Solicitações",
    icon: FiFolder,
    terms: "cópia pasta funcional",
  },
  {
    id: "solicitacaoEstagiario",
    path: "/solicitacao-estagiario",
    name: "Solicitação de estagiário",
    description: "Informe as necessidades de estágio do seu setor.",
    category: "Solicitações",
    icon: FiAward,
    terms: "contratação estágio",
  },
  {
    id: "inspecaoMedica",
    path: "/inspecao-medica",
    name: "Inspeção médica",
    description: "Preencha o formulário de inspeção médica municipal.",
    category: "Solicitações",
    icon: FiHeart,
    terms: "saúde gesat afastamento licença",
  },
  {
    id: "almoxarifado",
    path: "/requisicao-manual-almoxarifado",
    name: "Requisição de almoxarifado",
    description: "Requisite materiais de consumo para o seu setor.",
    category: "Solicitações",
    icon: FiBox,
    terms: "material materiais requisição manual",
  },
];
export const categories = [
  ...new Set(formCatalog.map((form) => form.category)),
];
export const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
