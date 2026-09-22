import { useState, type ChangeEvent } from "react";
import {
  ErrorSummary,
  FormGrid,
  FormSection,
  PdfActions,
} from "../../components/forms/FormParts";
import { FormSurface } from "../../components/forms/FormSurface";
import { Input } from "../../components/ui/Controls";
import { usePdf } from "../../lib/pdf/usePdf";
import { focusErrors } from "../../lib/validation/focusErrors";
import { createChecklistFaseInternaData } from "./checklistFaseInterna.defaults";
import type { ChecklistFaseInternaData } from "./checklistFaseInterna.types";
import { validateChecklistFaseInterna } from "./checklistFaseInterna.validation";
import styles from "./ChecklistFaseInterna.module.css";

const requiredLabel = (label: string) => (
  <>
    {label}{" "}
    <span className={styles.required} aria-hidden="true">
      *
    </span>
  </>
);

export default function ChecklistFaseInternaPage() {
  const [data, setData] = useState<ChecklistFaseInternaData>(
    createChecklistFaseInternaData,
  );
  const [errors, setErrors] = useState<
    ReturnType<typeof validateChecklistFaseInterna>
  >([]);
  const pdf = usePdf(data);
  const message = (field: string) =>
    errors.find((error) => error.field === field)?.message;
  const clear = (field: string) =>
    setErrors((current) => current.filter((error) => error.field !== field));
  const setField = (field: keyof ChecklistFaseInternaData, value: string) => {
    clear(field);
    setData((current) => ({ ...current, [field]: value }));
  };
  const change = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) =>
    setField(
      event.target.name as keyof ChecklistFaseInternaData,
      event.target.value,
    );
  const generate = () => {
    const nextErrors = validateChecklistFaseInterna(data);
    setErrors(nextErrors);
    if (nextErrors.length) {
      focusErrors();
      return;
    }
    void pdf.generate(async (snapshot) => {
      const { default: Document } =
        await import("../../pdf/ChecklistFaseInternaPdf");
      return <Document data={snapshot} />;
    });
  };

  return (
    <FormSurface>
      <p className={styles.intro}>
        Todos os campos são obrigatórios. O PDF mantém o cabeçalho institucional
        em todas as páginas e reserva as assinaturas para preenchimento após a
        impressão.
      </p>
      <ErrorSummary errors={errors} />
      <FormSection title="Informações do Processo">
        <FormGrid>
          <Input
            id="orgaoRequisitante"
            name="orgaoRequisitante"
            label={requiredLabel("Órgão requisitante")}
            value={data.orgaoRequisitante}
            onChange={change}
            error={message("orgaoRequisitante")}
          />
          <Input
            id="objetoReduzido"
            name="objetoReduzido"
            label={requiredLabel("Objeto reduzido")}
            value={data.objetoReduzido}
            onChange={change}
            error={message("objetoReduzido")}
          />
          <Input
            id="modalidadeCriterio"
            name="modalidadeCriterio"
            label={requiredLabel("Modalidade / Critério")}
            value={data.modalidadeCriterio}
            onChange={change}
            error={message("modalidadeCriterio")}
          />
          <Input
            id="valorGlobalEstimado"
            name="valorGlobalEstimado"
            label={requiredLabel("Valor global estimado")}
            value={data.valorGlobalEstimado}
            onChange={change}
            error={message("valorGlobalEstimado")}
          />
          <Input
            id="garantiaSuporte"
            name="garantiaSuporte"
            label={requiredLabel("Garantia / Suporte")}
            value={data.garantiaSuporte}
            onChange={change}
            error={message("garantiaSuporte")}
          />
        </FormGrid>
      </FormSection>

      <PdfActions
        {...pdf}
        onGenerate={generate}
        fileName="checklist_introducao_processual.pdf"
      />
    </FormSurface>
  );
}
