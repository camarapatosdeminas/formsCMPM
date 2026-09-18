import { useState, type ChangeEvent } from "react";
import {
  ErrorSummary,
  FormGrid,
  FormSection,
  PdfActions,
} from "../../components/forms/FormParts";
import { FormSurface } from "../../components/forms/FormSurface";
import { Button, Input, Textarea } from "../../components/ui/Controls";
import { usePdf } from "../../lib/pdf/usePdf";
import { focusErrors } from "../../lib/validation/focusErrors";
import { createDfdData, createDfdItem } from "./dfd.defaults";
import type { DfdData, DfdItem } from "./dfd.types";
import { validateDfd } from "./dfd.validation";
import styles from "./DfdPage.module.css";

const requiredLabel = (label: string) => (
  <>
    {label}{" "}
    <span className={styles.required} aria-hidden="true">
      *
    </span>
  </>
);

export default function DfdPage() {
  const [data, setData] = useState<DfdData>(createDfdData);
  const [errors, setErrors] = useState<ReturnType<typeof validateDfd>>([]);
  const pdf = usePdf(data);
  const message = (field: string) =>
    errors.find((error) => error.field === field)?.message;
  const clear = (field: string) =>
    setErrors((current) => current.filter((error) => error.field !== field));
  const setField = (field: keyof DfdData, value: string) => {
    clear(field);
    setData((current) => ({ ...current, [field]: value }));
  };
  const change = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setField(event.target.name as keyof DfdData, event.target.value);
  const changeItem = (
    id: number,
    field: keyof Omit<DfdItem, "id">,
    value: string,
  ) => {
    clear(`item-${id}-${field}`);
    setData((current) => ({
      ...current,
      itens: current.itens.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };
  const generate = () => {
    const nextErrors = validateDfd(data);
    setErrors(nextErrors);
    if (nextErrors.length) {
      focusErrors();
      return;
    }
    void pdf.generate(async (snapshot) => {
      const { default: Document } = await import("../../pdf/DfdPdf");
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
      <FormSection title="Identificação da demanda">
        <Input
          id="objeto"
          name="objeto"
          label={requiredLabel("Objeto da contratação")}
          value={data.objeto}
          onChange={change}
          error={message("objeto")}
          placeholder="Ex.: aquisição de equipamentos de segurança"
          style={{ marginBottom: "22px" }}
        />
        <FormGrid>
          <Input
            id="setorRequisitante"
            name="setorRequisitante"
            label={requiredLabel("Setor requisitante")}
            value={data.setorRequisitante}
            onChange={change}
            error={message("setorRequisitante")}
          />
          <Input
            id="responsavelDemanda"
            name="responsavelDemanda"
            label={requiredLabel("Responsável pela demanda")}
            value={data.responsavelDemanda}
            onChange={change}
            error={message("responsavelDemanda")}
          />
          <Input
            id="matricula"
            name="matricula"
            label={requiredLabel("Matrícula")}
            value={data.matricula}
            onChange={change}
            error={message("matricula")}
          />
          <Input
            id="email"
            name="email"
            type="email"
            label={requiredLabel("E-mail")}
            value={data.email}
            onChange={change}
            error={message("email")}
          />
          <Input
            id="telefone"
            name="telefone"
            label={requiredLabel("Telefone")}
            value={data.telefone}
            onChange={change}
            error={message("telefone")}
          />
        </FormGrid>
      </FormSection>

      <FormSection title="1. Justificativa da necessidade">
        <Textarea
          id="justificativa"
          name="justificativa"
          label={requiredLabel("Justificativa da contratação")}
          rows={7}
          value={data.justificativa}
          onChange={change}
          error={message("justificativa")}
        />
      </FormSection>

      <FormSection title="2. Itens da contratação">
        {data.itens.map((item, index) => (
          <div className={styles.item} key={item.id}>
            <div className={styles.itemHeader}>
              <h3>Item {index + 1}</h3>
              {data.itens.length > 1 && (
                <Button
                  variant="secondary"
                  aria-label={`Remover item ${index + 1}`}
                  onClick={() => {
                    setErrors((current) =>
                      current.filter(
                        (error) => !error.field.startsWith(`item-${item.id}-`),
                      ),
                    );
                    setData((current) => ({
                      ...current,
                      itens: current.itens.filter(
                        (candidate) => candidate.id !== item.id,
                      ),
                    }));
                  }}
                >
                  Remover
                </Button>
              )}
            </div>
            <div className={styles.itemGrid}>
              <Textarea
                id={`item-${item.id}-descricao`}
                label={requiredLabel("Descrição")}
                rows={3}
                value={item.descricao}
                onChange={(event) =>
                  changeItem(item.id, "descricao", event.target.value)
                }
                error={message(`item-${item.id}-descricao`)}
              />
              <Input
                id={`item-${item.id}-quantidade`}
                label={requiredLabel("Quantidade")}
                value={item.quantidade}
                onChange={(event) =>
                  changeItem(item.id, "quantidade", event.target.value)
                }
                error={message(`item-${item.id}-quantidade`)}
              />
              <Input
                id={`item-${item.id}-valorUnitario`}
                label={requiredLabel("Valor unitário")}
                placeholder="0,00"
                value={item.valorUnitario}
                onChange={(event) =>
                  changeItem(item.id, "valorUnitario", event.target.value)
                }
                error={message(`item-${item.id}-valorUnitario`)}
                money
              />
              <Input
                id={`item-${item.id}-valorTotal`}
                label={requiredLabel("Valor total")}
                value={item.valorTotal}
                onChange={(event) =>
                  changeItem(item.id, "valorTotal", event.target.value)
                }
                error={message(`item-${item.id}-valorTotal`)}
                money
              />
            </div>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={() =>
            setData((current) => ({
              ...current,
              itens: [...current.itens, createDfdItem()],
            }))
          }
        >
          + Adicionar item
        </Button>
      </FormSection>

      <FormSection title="3. Providências ou vinculação">
        <Textarea
          id="providenciasVinculacao"
          name="providenciasVinculacao"
          label={requiredLabel(
            "Providências prévias ou vinculação/dependência com outro DFD",
          )}
          rows={5}
          value={data.providenciasVinculacao}
          onChange={change}
          error={message("providenciasVinculacao")}
        />
      </FormSection>

      <FormSection title="4 e 5. Prazo e valor estimado">
        <FormGrid>
          <Input
            id="dataInicio"
            name="dataInicio"
            type="date"
            label={requiredLabel(
              "Data prevista para início do serviço ou entrega",
            )}
            value={data.dataInicio}
            onChange={change}
            error={message("dataInicio")}
          />
          <Input
            id="valorEstimado"
            name="valorEstimado"
            label={requiredLabel("Valor estimado da contratação")}
            value={data.valorEstimado}
            onChange={change}
            error={message("valorEstimado")}
            money
          />
        </FormGrid>
      </FormSection>

      <FormSection title="6. Grau de prioridade">
        <fieldset
          id="prioridade"
          className={styles.priorityOptions}
          aria-describedby={
            message("prioridade") ? "prioridade-error" : undefined
          }
        >
          <legend>{requiredLabel("Selecione o grau de prioridade")}</legend>
          {(["baixo", "medio", "alto"] as const).map((priority) => (
            <label key={priority}>
              <Input
                bare
                type="radio"
                name="prioridade"
                value={priority}
                checked={data.prioridade === priority}
                onChange={change}
              />
              {priority === "medio"
                ? "Médio"
                : priority[0].toUpperCase() + priority.slice(1)}
            </label>
          ))}
        </fieldset>
        {message("prioridade") && (
          <span id="prioridade-error" className={styles.required}>
            {message("prioridade")}
          </span>
        )}
        <Textarea
          id="motivoPrioridade"
          name="motivoPrioridade"
          label={requiredLabel("Motivo da prioridade")}
          rows={4}
          value={data.motivoPrioridade}
          onChange={change}
          error={message("motivoPrioridade")}
        />
      </FormSection>

      <FormSection title="7. Fiscalização e gestão">
        <FormGrid>
          <Input
            id="fiscalTitular"
            name="fiscalTitular"
            label={requiredLabel("Fiscal titular")}
            value={data.fiscalTitular}
            onChange={change}
            error={message("fiscalTitular")}
          />
          <Input
            id="fiscalSubstituto"
            name="fiscalSubstituto"
            label={requiredLabel("Fiscal substituto")}
            value={data.fiscalSubstituto}
            onChange={change}
            error={message("fiscalSubstituto")}
          />
          <Input
            id="gestorTitular"
            name="gestorTitular"
            label={requiredLabel("Gestor do contrato titular")}
            value={data.gestorTitular}
            onChange={change}
            error={message("gestorTitular")}
          />
          <Input
            id="gestorSubstituto"
            name="gestorSubstituto"
            label={requiredLabel("Gestor do contrato substituto")}
            value={data.gestorSubstituto}
            onChange={change}
            error={message("gestorSubstituto")}
          />
        </FormGrid>
      </FormSection>

      <FormSection title="Formalização e assinaturas">
        <FormGrid>
          <Input
            id="dataFormalizacao"
            name="dataFormalizacao"
            type="date"
            label={requiredLabel("Data da formalização")}
            value={data.dataFormalizacao}
            onChange={change}
            error={message("dataFormalizacao")}
          />
          <Input
            id="responsavelFormalizacao"
            name="responsavelFormalizacao"
            label={requiredLabel("Responsável pela formalização da demanda")}
            value={data.responsavelFormalizacao}
            onChange={change}
            error={message("responsavelFormalizacao")}
          />
          <Input
            id="matriculaFormalizacao"
            name="matriculaFormalizacao"
            label={requiredLabel("Matrícula do responsável pela formalização")}
            value={data.matriculaFormalizacao}
            onChange={change}
            error={message("matriculaFormalizacao")}
          />
        </FormGrid>
        <fieldset
          id="relacionadoTecnologia"
          className={styles.technologyOptions}
        >
          <legend>
            {requiredLabel(
              "O bem, produto ou serviço é relacionado à informática, tecnologia da informação ou áudio e vídeo?",
            )}
          </legend>
          <label>
            <Input
              bare
              type="radio"
              name="relacionadoTecnologia"
              value="sim"
              checked={data.relacionadoTecnologia === "sim"}
              onChange={change}
            />
            Sim
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="relacionadoTecnologia"
              value="nao"
              checked={data.relacionadoTecnologia === "nao"}
              onChange={change}
            />
            Não
          </label>
        </fieldset>
        {message("relacionadoTecnologia") && (
          <span className={styles.required}>
            {message("relacionadoTecnologia")}
          </span>
        )}
        {data.relacionadoTecnologia === "sim" && (
          <div className={styles.fixedInfo}>
            <strong>
              Assinaturas da Divisão de Informática incluídas no PDF:
            </strong>
            <ul>
              <li>Paulo Cesar Caixeta - matrícula 791</li>
              <li>Marília Santana de Oliveira Lima - matrícula 989</li>
            </ul>
          </div>
        )}
        <div className={styles.fixedInfo}>
          <strong>Assinatura final fixa:</strong> Autoridade competente.
        </div>
      </FormSection>

      <PdfActions
        {...pdf}
        onGenerate={generate}
        fileName="documento_formalizacao_demanda_dfd.pdf"
      />
    </FormSurface>
  );
}
