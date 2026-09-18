import type { FieldError } from "../../components/forms/FormParts";
import type { DfdData } from "./dfd.types";

const required: Array<[keyof DfdData, string]> = [
  ["objeto", "Informe o objeto da contratação."],
  ["setorRequisitante", "Informe o setor requisitante."],
  ["responsavelDemanda", "Informe o responsável pela demanda."],
  ["matricula", "Informe a matrícula do responsável pela demanda."],
  ["email", "Informe o e-mail."],
  ["telefone", "Informe o telefone."],
  ["justificativa", "Informe a justificativa da contratação."],
  [
    "providenciasVinculacao",
    "Informe as providências ou a vinculação da demanda.",
  ],
  ["dataInicio", "Informe a data prevista para início ou entrega."],
  ["valorEstimado", "Informe o valor estimado da contratação."],
  ["prioridade", "Selecione o grau de prioridade."],
  ["motivoPrioridade", "Explique o motivo do grau de prioridade."],
  ["fiscalTitular", "Informe o fiscal titular."],
  ["fiscalSubstituto", "Informe o fiscal substituto."],
  ["gestorTitular", "Informe o gestor titular."],
  ["gestorSubstituto", "Informe o gestor substituto."],
  ["dataFormalizacao", "Informe a data da formalização."],
  ["responsavelFormalizacao", "Informe o responsável pela formalização."],
  [
    "matriculaFormalizacao",
    "Informe a matrícula do responsável pela formalização.",
  ],
  [
    "relacionadoTecnologia",
    "Informe se a demanda é relacionada à tecnologia ou áudio e vídeo.",
  ],
];

export function validateDfd(data: DfdData): FieldError[] {
  const errors: FieldError[] = [];
  for (const [field, message] of required) {
    if (!String(data[field]).trim()) errors.push({ field, message });
  }
  if (
    data.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  ) {
    errors.push({ field: "email", message: "Informe um e-mail válido." });
  }
  data.itens.forEach((item, index) => {
    const number = index + 1;
    if (!item.descricao.trim())
      errors.push({
        field: `item-${item.id}-descricao`,
        message: `Informe a descrição do item ${number}.`,
      });
    if (!item.quantidade.trim())
      errors.push({
        field: `item-${item.id}-quantidade`,
        message: `Informe a quantidade do item ${number}.`,
      });
    if (!item.valorUnitario.trim())
      errors.push({
        field: `item-${item.id}-valorUnitario`,
        message: `Informe o valor unitário do item ${number}.`,
      });
    if (!item.valorTotal.trim())
      errors.push({
        field: `item-${item.id}-valorTotal`,
        message: `Informe o valor total do item ${number}.`,
      });
  });
  return errors;
}
