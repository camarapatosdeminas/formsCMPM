import type { ChecklistFaseInternaData } from "./checklistFaseInterna.types";

const sectionTemplates = [
  {
    id: "section-1",
    title: "1 - Planejamento e Início do Processo",
    items: [
      "Documento de Formalização da Demanda (DFD)",
      "Alinhamento ao PCA 2026",
      "Portaria de Designação",
    ],
  },
  {
    id: "section-2",
    title: "2 - Estudos Técnicos Preliminares e Gestão de Riscos",
    items: [
      "Estudo Técnico Preliminar (ETP)",
      "Memória de Cálculo de Quantitativos",
      "Justificativa de Lote Único",
      "Mapa de Gestão de Riscos",
    ],
  },
  {
    id: "section-3",
    title: "3 - Termo de Referência Consolidado (TR v9)",
    items: [
      "Especificações Técnicas do Hardware",
      "Requisitos de Acessibilidade PCD",
      "Garantia Técnica e SLA de Suporte",
      "Qualificação Técnica Operacional",
      "Regramento da Prova de Conceito (PoC)",
      "Tabela de Multas e Sanções",
      "Disposições Legais Complementares",
    ],
  },
  {
    id: "section-4",
    title: "4 - Pesquisa de Preços e Orçamento",
    items: [
      "Relatório de Pesquisa de Mercado",
      "Declaração de Adequação Orçamentária",
    ],
  },
  {
    id: "section-5",
    title: "5 - Minutas de Edital e Parecer Jurídico",
    items: [
      "Minuta do Edital de Pregão Eletrônico",
      "Parecer da Assessoria Jurídica",
      "Atendimento a Recomendações Jurídicas",
    ],
  },
  {
    id: "section-6",
    title: "6 - Autorização e Publicidade da Licitação",
    items: [
      "Despacho de Homologação da Fase Interna",
      "Publicação Oficial no PNCP",
    ],
  },
] as const;

export const createChecklistFaseInternaData = (): ChecklistFaseInternaData => ({
  orgaoRequisitante: "",
  objetoReduzido: "",
  modalidadeCriterio: "",
  valorGlobalEstimado: "",
  garantiaSuporte: "",
  sections: sectionTemplates.map((section) => ({
    id: section.id,
    title: section.title,
    items: section.items.map((itemName, index) => ({
      id: `${section.id}-item-${index + 1}`,
      itemName,
      itemDescription: "",
      status: "",
      observation: "",
      legalBasis: "",
    })),
  })),
});
