import { useMemo, useState } from "react";
import { createRowId } from "../../lib/validation/rowId";
import { focusErrors } from "../../lib/validation/focusErrors";
import { usePdf } from "../../lib/pdf/usePdf";
import {
  createInitialRecadastramentoData,
  type Bem,
  type Dependente,
  type RecadastramentoData,
} from "../../types/recadastramento";
import { validate, type ValidationError } from "./recadastramento.validation";
export function useRecadastramento() {
  const [data, setData] = useState<RecadastramentoData>(
    createInitialRecadastramentoData,
  );
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const pdf = usePdf({ data });

  const errorFields = useMemo(
    () => new Set(errors.map((error) => error.field)),
    [errors],
  );

  const update = <K extends keyof RecadastramentoData>(
    field: K,
    value: RecadastramentoData[K],
  ) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current.length ? validate({ ...data, [field]: value }) : current,
    );
  };

  const updateBem = (
    id: number,
    field: keyof Omit<Bem, "id">,
    value: string,
  ) => {
    update(
      "bens",
      data.bens.map((bem) =>
        bem.id === id ? { ...bem, [field]: value } : bem,
      ),
    );
  };

  const updateDependente = <K extends keyof Omit<Dependente, "id">>(
    id: number,
    field: K,
    value: Dependente[K],
  ) => {
    update(
      "dependentes",
      data.dependentes.map((dependente) =>
        dependente.id === id ? { ...dependente, [field]: value } : dependente,
      ),
    );
  };

  const addBem = () => {
    update("bens", [
      ...data.bens,
      { id: createRowId(), descricao: "", valor: "" },
    ]);
  };

  const addDependente = () => {
    update("dependentes", [
      ...data.dependentes,
      {
        id: createRowId(),
        nome: "",
        parentesco: "",
        dataNascimento: "",
        ir: false,
        af: false,
        am: false,
      },
    ]);
  };

  const preparePdf = () => {
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (nextErrors.length) focusErrors();
    if (!nextErrors.length)
      void pdf.generate(async ({ data }) => {
        const { default: Document } =
          await import("../../pdf/RecadastramentoPdf");
        return <Document data={data} />;
      });
  };
  const inputClass = (field: string) =>
    errorFields.has(field) ? "field-invalid" : "";
  const packageDescription =
    data.tipoRecadastramento === "simplificado"
      ? "O PDF começará com a Portaria e terá o Anexo VII, destinado a quem não teve alterações cadastrais."
      : `O PDF começará com a Portaria e terá os Anexos I, II, ${data.tipoPessoa === "servidor" ? "III" : "IV"}, V e VI.`;

  return {
    data,
    errors,
    pdf,
    update,
    updateBem,
    updateDependente,
    addBem,
    addDependente,
    preparePdf,
    inputClass,
    packageDescription,
  };
}
export type RecadastramentoModel = ReturnType<typeof useRecadastramento>;
