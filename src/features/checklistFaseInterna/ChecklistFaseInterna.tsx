import { useState, type ChangeEvent } from "react";
import {
  ErrorSummary,
  FormGrid,
  FormSection,
  PdfActions,
} from "../../components/forms/FormParts";
import { FormSurface } from "../../components/forms/FormSurface";
import { Input, Select, Textarea } from "../../components/ui/Controls";
import { usePdf } from "../../lib/pdf/usePdf";
import { focusErrors } from "../../lib/validation/focusErrors";
import { createChecklistFaseInternaData } from "./checklistFaseInterna.defaults";
import type {
  ChecklistFaseInternaData,
  ChecklistItem,
} from "./checklistFaseInterna.types";
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
  const setField = (
    field: Exclude<keyof ChecklistFaseInternaData, "sections">,
    value: string,
  ) => {
    clear(field);
    setData((current) => ({ ...current, [field]: value }));
  };
  const change = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) =>
    setField(
      event.target.name as Exclude<keyof ChecklistFaseInternaData, "sections">,
      event.target.value,
    );
  const setItemField = <
    Field extends keyof Omit<ChecklistItem, "id" | "itemName">,
  >(
    sectionId: string,
    itemId: string,
    field: Field,
    value: ChecklistItem[Field],
  ) => {
    clear(`${itemId}-${field}`);
    setData((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item,
              ),
            }
          : section,
      ),
    }));
  };
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
        Preencha os dados do processo e todos os itens de verificação. Em cada
        item, selecione válido (V), inválido (X) ou ausente (sem marcação). As
        observações são opcionais; os demais campos são obrigatórios.
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

      {data.sections.map((section) => (
        <FormSection key={section.id} title={section.title}>
          <div className={styles.sectionIntro}>
            O status ausente será representado por um campo sem marcação no PDF.
          </div>
          {section.items.map((item, index) => (
            <article className={styles.item} key={item.id}>
              <h3>
                {index + 1}. {item.itemName}
              </h3>
              <div className={styles.itemGrid}>
                <Textarea
                  id={`${item.id}-itemDescription`}
                  label={requiredLabel("Texto relacionado ao item")}
                  value={item.itemDescription}
                  rows={4}
                  placeholder={`Informe o texto relacionado a “${item.itemName}”.`}
                  onChange={(event) =>
                    setItemField(
                      section.id,
                      item.id,
                      "itemDescription",
                      event.target.value,
                    )
                  }
                  error={message(`${item.id}-itemDescription`)}
                />
                <Select
                  id={`${item.id}-status`}
                  label="Status"
                  value={item.status}
                  onChange={(event) =>
                    setItemField(
                      section.id,
                      item.id,
                      "status",
                      event.target.value as ChecklistItem["status"],
                    )
                  }
                >
                  <option value="">Ausente (sem marcação)</option>
                  <option value="valid">Válido (V)</option>
                  <option value="invalid">Inválido (X)</option>
                </Select>
                <Input
                  id={`${item.id}-legalBasis`}
                  label={requiredLabel("Base legal")}
                  value={item.legalBasis}
                  placeholder="Informe a base legal."
                  onChange={(event) =>
                    setItemField(
                      section.id,
                      item.id,
                      "legalBasis",
                      event.target.value,
                    )
                  }
                  error={message(`${item.id}-legalBasis`)}
                />
                <Textarea
                  id={`${item.id}-observation`}
                  label="Observação (opcional)"
                  value={item.observation}
                  rows={3}
                  placeholder="Acrescente uma observação, se necessário."
                  onChange={(event) =>
                    setItemField(
                      section.id,
                      item.id,
                      "observation",
                      event.target.value,
                    )
                  }
                />
              </div>
            </article>
          ))}
        </FormSection>
      ))}

      <PdfActions
        {...pdf}
        onGenerate={generate}
        fileName="checklist_introducao_processual.pdf"
      />
    </FormSurface>
  );
}
