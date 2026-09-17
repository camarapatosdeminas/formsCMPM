import { z } from "zod";
import { onlyDigits } from "../../lib/formatters/masks";
// Keep validation in the standard parser; code generation would require JS unsafe-eval.
z.config({ jitless: true });
export const feriasSchema = z
  .object({
    nome: z.string(),
    matricula: z.string(),
    cpf: z
      .string()
      .refine(
        (value) => !value || onlyDigits(value).length === 11,
        "Informe os 11 dígitos do CPF ou deixe o campo vazio.",
      ),
    lotacao: z.string(),
    periodoGozo: z.enum(["30", "20", "15", "10"]),
    dataInicio: z.string(),
    justificativa: z.string(),
    outrosDias: z.string(),
    dataRequerimento: z.date(),
  })
  .superRefine((data, ctx) => {
    if (data.periodoGozo !== "30" && !data.justificativa.trim())
      ctx.addIssue({
        code: "custom",
        path: ["justificativa"],
        message:
          "Preencha a justificativa para o período diferente de 30 dias.",
      });
  });
