import type { RecadastramentoData } from "../../types/recadastramento";
import { onlyDigits } from "../../lib/formatters/masks";
export interface ValidationError {
  field: string;
  message: string;
}
export const isValidCpf = (cpf: string) => {
  const digits = onlyDigits(cpf);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const calculateDigit = (length: number) => {
    const sum = digits
      .slice(0, length)
      .split("")
      .reduce(
        (total, digit, index) => total + Number(digit) * (length + 1 - index),
        0,
      );
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };

  return (
    calculateDigit(9) === Number(digits[9]) &&
    calculateDigit(10) === Number(digits[10])
  );
};

export const validate = (data: RecadastramentoData): ValidationError[] => {
  const errors: ValidationError[] = [];
  const required = (field: keyof RecadastramentoData, message: string) => {
    if (!String(data[field] ?? "").trim()) errors.push({ field, message });
  };

  required("nome", "Informe o nome completo.");
  required("rg", "Informe o RG.");
  required("cpf", "Informe o CPF.");
  required("cargoFuncao", "Informe o cargo ou função.");
  required("dataDeclaracao", "Informe a data da declaração.");

  if (data.cpf && !isValidCpf(data.cpf)) {
    errors.push({
      field: "cpf",
      message: "Informe um CPF válido, com 11 dígitos.",
    });
  }

  if (data.tipoRecadastramento === "simplificado") return errors;

  required("matricula", "Informe a matrícula.");
  required("dataNascimento", "Informe a data de nascimento.");
  required("naturalidade", "Informe a naturalidade.");
  required("ufNascimento", "Informe a UF de nascimento.");
  required("estadoCivil", "Informe o estado civil.");
  required("logradouro", "Informe o logradouro.");
  required("numero", "Informe o número do endereço.");
  required("bairro", "Informe o bairro.");
  required("cidade", "Informe a cidade.");
  required("enderecoUf", "Informe a UF do endereço.");
  required("email", "Informe o e-mail.");
  required("admissao", "Informe a data de admissão.");
  required("vinculo", "Selecione o vínculo funcional.");
  required("lotacao", "Informe a lotação atual.");

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "Informe um e-mail válido." });
  }
  if (!onlyDigits(data.telefone) && !onlyDigits(data.celular)) {
    errors.push({
      field: "celular",
      message: "Informe ao menos um telefone ou celular.",
    });
  }
  if (data.possuiDeficiencia && !data.tipoDeficiencia.trim()) {
    errors.push({
      field: "tipoDeficiencia",
      message: "Descreva o tipo de deficiência.",
    });
  }
  if (
    data.exerceAtividadeRemunerada &&
    !data.atividadeRemuneradaDetalhes.trim()
  ) {
    errors.push({
      field: "atividadeRemuneradaDetalhes",
      message: "Descreva a outra atividade remunerada e os horários.",
    });
  }

  if (!data.bens.length) {
    errors.push({
      field: "bens",
      message: "Inclua ao menos uma linha na declaração de bens.",
    });
  }
  data.bens.forEach((bem, index) => {
    if (!bem.descricao.trim() || !bem.valor.trim()) {
      errors.push({
        field: `bem-${bem.id}`,
        message: `Complete a descrição e o valor do ${index + 1}º bem. Se não houver bens, declare “Não possuo bens” e valor “0,00”.`,
      });
    }
  });

  data.dependentes.forEach((dependente, index) => {
    if (
      !dependente.nome.trim() ||
      !dependente.parentesco.trim() ||
      !dependente.dataNascimento
    ) {
      errors.push({
        field: `dependente-${dependente.id}`,
        message: `Complete nome, parentesco e nascimento do dependente ${index + 1}.`,
      });
    }
    if (!dependente.ir && !dependente.af && !dependente.am) {
      errors.push({
        field: `dependente-${dependente.id}`,
        message: `Marque ao menos um tipo de dependência para o dependente ${index + 1}.`,
      });
    }
  });

  return errors;
};
