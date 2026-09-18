import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createDfdData,
  createDfdItem,
} from "../../src/features/dfd/dfd.defaults.ts";
import { validateDfd } from "../../src/features/dfd/dfd.validation.ts";

const complete = () => ({
  ...createDfdData(),
  objeto: "Objeto sintético",
  setorRequisitante: "Setor sintético",
  responsavelDemanda: "Pessoa sintética",
  matricula: "0001",
  email: "pessoa@example.com",
  telefone: "3000-0000",
  justificativa: "Justificativa sintética",
  itens: [
    {
      ...createDfdItem(),
      descricao: "Item sintético",
      quantidade: "1",
      valorUnitario: "10,00",
      valorTotal: "10,00",
    },
  ],
  providenciasVinculacao: "Não se aplica",
  dataInicio: "2026-12-15",
  valorEstimado: "10,00",
  prioridade: "medio" as const,
  motivoPrioridade: "Motivo sintético",
  fiscalTitular: "Fiscal titular",
  fiscalSubstituto: "Fiscal substituto",
  gestorTitular: "Gestor titular",
  gestorSubstituto: "Gestor substituto",
  dataFormalizacao: "2026-09-17",
  responsavelFormalizacao: "Pessoa formalizadora",
  matriculaFormalizacao: "0002",
  relacionadoTecnologia: "sim" as const,
});

test("DFD exige todos os campos e aceita os três graus de prioridade", () => {
  assert.ok(validateDfd(createDfdData()).length > 20);
  for (const prioridade of ["baixo", "medio", "alto"] as const)
    assert.deepEqual(validateDfd({ ...complete(), prioridade }), []);
  assert.ok(
    validateDfd({ ...complete(), email: "invalido" }).some(
      (error) => error.field === "email",
    ),
  );
  assert.ok(
    validateDfd({
      ...complete(),
      itens: [{ ...createDfdItem(), descricao: "Item" }],
    }).some((error) => error.field.includes("valorUnitario")),
  );
});
