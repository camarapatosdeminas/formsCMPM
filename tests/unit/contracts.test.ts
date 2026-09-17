import { test } from "node:test";
import assert from "node:assert/strict";
import {
  maskCpf,
  maskCnpj,
  maskCep,
  maskPhone,
  maskError,
  caretAfterMask,
} from "../../src/lib/formatters/masks.ts";
import { feriasSchema } from "../../src/features/ferias/ferias.schema.ts";
import { createFeriasDefaults } from "../../src/features/ferias/ferias.defaults.ts";
import { validate } from "../../src/features/recadastramento/recadastramento.validation.ts";
import { createInitialRecadastramentoData } from "../../src/types/recadastramento.ts";
import { moneyPreview } from "../../src/lib/formatters/money.ts";

test("Valores monetários: apresentação preserva vazio, zero, sinal e precisão", () => {
  assert.equal(moneyPreview(""), "");
  assert.equal(moneyPreview("0"), "R$ 0");
  assert.equal(moneyPreview("-1234,0050"), "R$ -1.234,0050");
  assert.equal(moneyPreview("+1234,"), "R$ +1.234,");
  assert.equal(moneyPreview("1234.50"), "");
});

test("Férias: vazio permitido, justificativa condicional sem exigir identificação", () => {
  const data = createFeriasDefaults();
  assert.equal(feriasSchema.safeParse(data).success, true);
  for (const periodoGozo of ["20", "15", "10"] as const) {
    assert.equal(
      feriasSchema.safeParse({ ...data, periodoGozo, justificativa: "  " })
        .success,
      false,
    );
    assert.equal(
      feriasSchema.safeParse({
        ...data,
        periodoGozo,
        justificativa: "Motivo sintético",
      }).success,
      true,
    );
  }
  assert.equal(feriasSchema.safeParse({ ...data, cpf: "123" }).success, false);
  assert.equal(
    feriasSchema.safeParse({ ...data, cpf: "000.000.000-00" }).success,
    true,
  );
});
test("Máscaras: zeros, colagem, parcial, limpeza e CNPJ com letras", () => {
  assert.equal(maskCpf("01234567890"), "012.345.678-90");
  assert.equal(maskCpf("012.345.678-90"), "012.345.678-90");
  assert.equal(maskCpf("012"), "012");
  assert.equal(maskCpf(""), "");
  assert.equal(maskCnpj("12abc34501de35"), "12.ABC.345/01DE-35");
  assert.equal(maskCnpj("12345678000190"), "12.345.678/0001-90");
  assert.equal(maskCep("01234567"), "01234-567");
  assert.equal(maskPhone("34999990000"), "(34) 99999-0000");
  assert.equal(maskPhone("3432220000"), "(34) 3222-0000");
  for (const mask of ["cpf", "cep", "cnpj", "phone"] as const)
    assert.equal(maskError("", mask), "");
  assert.equal(maskError("12.ABC.345/01DE-35", "cnpj"), "");
  assert.notEqual(maskError("12.ABC.345/01DE-AA", "cnpj"), "");
  assert.equal(caretAfterMask("01234567890", 4, "012.345.678-90"), 5);
  assert.equal(caretAfterMask("", 0, ""), 0);
});
test("Recadastramento simplificado dispensa campos e listas do completo", () => {
  const data = {
    ...createInitialRecadastramentoData(),
    tipoRecadastramento: "simplificado" as const,
    nome: "Pessoa Sintética",
    cpf: "529.982.247-25",
    rg: "RG-1",
    cargoFuncao: "Teste",
    bens: [],
  };
  assert.deepEqual(validate(data), []);
  assert.deepEqual(validate({ ...data, tipoPessoa: "vereador" }), []);
  assert.ok(
    validate({ ...data, cpf: "111.111.111-11" }).some((e) => e.field === "cpf"),
  );
  for (const field of ["nome", "cpf", "rg", "cargoFuncao", "dataDeclaracao"])
    assert.ok(
      validate({ ...data, [field]: "" }).some((e) => e.field === field),
    );
});
test("Recadastramento completo: telefone alternativo, dependentes opcionais e condições", () => {
  const data = {
    ...createInitialRecadastramentoData(),
    nome: "Pessoa Sintética",
    cpf: "529.982.247-25",
    rg: "RG-1",
    cargoFuncao: "Teste",
    matricula: "0",
    dataNascimento: "1990-01-01",
    naturalidade: "Teste",
    ufNascimento: "MG",
    estadoCivil: "Teste",
    logradouro: "Rua Teste",
    numero: "0",
    bairro: "Teste",
    email: "teste@example.invalid",
    admissao: "2020-01-01",
    vinculo: "efetivo" as const,
    lotacao: "Teste",
    telefone: "1",
    bens: [{ id: 1, descricao: "Não possuo bens", valor: "0,00" }],
  };
  assert.deepEqual(validate(data), []);
  assert.deepEqual(validate({ ...data, telefone: "", celular: "1" }), []);
  assert.ok(
    validate({ ...data, telefone: "" }).some((e) => e.field === "celular"),
  );
  assert.ok(
    validate({ ...data, possuiDeficiencia: true }).some(
      (e) => e.field === "tipoDeficiencia",
    ),
  );
  assert.ok(
    validate({ ...data, exerceAtividadeRemunerada: true }).some(
      (e) => e.field === "atividadeRemuneradaDetalhes",
    ),
  );
  assert.ok(validate({ ...data, bens: [] }).some((e) => e.field === "bens"));
  const dependente = {
    id: 2,
    nome: "Dependente Sintético",
    parentesco: "Filho",
    dataNascimento: "2010-01-01",
    ir: false,
    af: false,
    am: false,
  };
  assert.ok(
    validate({ ...data, dependentes: [dependente] }).some(
      (e) => e.field === "dependente-2",
    ),
  );
  assert.deepEqual(
    validate({ ...data, dependentes: [{ ...dependente, am: true }] }),
    [],
  );
});
