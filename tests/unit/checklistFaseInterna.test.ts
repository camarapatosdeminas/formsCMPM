import assert from "node:assert/strict";
import { test } from "node:test";
import { createChecklistFaseInternaData } from "../../src/features/checklistFaseInterna/checklistFaseInterna.defaults.ts";
import { validateChecklistFaseInterna } from "../../src/features/checklistFaseInterna/checklistFaseInterna.validation.ts";

test("checklist exige cabeçalho, descrições e bases legais", () => {
  const empty = createChecklistFaseInternaData();
  const emptyErrors = validateChecklistFaseInterna(empty);
  assert.equal(emptyErrors.length, 47);
  assert.ok(emptyErrors.some((error) => error.field === "orgaoRequisitante"));
  assert.ok(
    emptyErrors.some(
      (error) => error.field === "section-4-item-1-itemDescription",
    ),
  );
  assert.deepEqual(
    empty.sections.map((section) => section.items.map((item) => item.itemName)),
    [
      [
        "Documento de Formalização da Demanda (DFD)",
        "Alinhamento ao PCA 2026",
        "Portaria de Designação",
      ],
      [
        "Estudo Técnico Preliminar (ETP)",
        "Memória de Cálculo de Quantitativos",
        "Justificativa de Lote Único",
        "Mapa de Gestão de Riscos",
      ],
      [
        "Especificações Técnicas do Hardware",
        "Requisitos de Acessibilidade PCD",
        "Garantia Técnica e SLA de Suporte",
        "Qualificação Técnica Operacional",
        "Regramento da Prova de Conceito (PoC)",
        "Tabela de Multas e Sanções",
        "Disposições Legais Complementares",
      ],
      [
        "Relatório de Pesquisa de Mercado",
        "Declaração de Adequação Orçamentária",
      ],
      [
        "Minuta do Edital de Pregão Eletrônico",
        "Parecer da Assessoria Jurídica",
        "Atendimento a Recomendações Jurídicas",
      ],
      ["Despacho de Homologação da Fase Interna", "Publicação Oficial no PNCP"],
    ],
  );

  const complete = {
    ...empty,
    orgaoRequisitante: "Órgão sintético",
    objetoReduzido: "Objeto sintético",
    modalidadeCriterio: "Pregão / menor preço",
    valorGlobalEstimado: "R$ 10.000,00",
    garantiaSuporte: "24 meses",
    sections: empty.sections.map((section) => ({
      ...section,
      items: section.items.map((item, index) => ({
        ...item,
        itemDescription: `Descrição sintética ${item.id}`,
        legalBasis: `Base legal ${item.id}`,
        status: index === 0 ? ("valid" as const) : ("" as const),
      })),
    })),
  };
  assert.deepEqual(validateChecklistFaseInterna(complete), []);
  assert.deepEqual(
    validateChecklistFaseInterna({
      ...complete,
      objetoReduzido: "  ",
    }).map((error) => error.field),
    ["objetoReduzido"],
  );
});
