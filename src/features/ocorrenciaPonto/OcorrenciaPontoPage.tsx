import { createRowId } from "../../lib/validation/rowId";
import { Input, Button, Textarea } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import {
  createServidorInfo,
  createOcorrencias,
} from "./ocorrenciaPonto.defaults";
import type { Ocorrencia, ServidorInfo } from "./ocorrenciaPonto.types";
// src/pages/OcorrenciaPonto/OcorrenciaPonto.tsx
import React, { useState } from "react";
const OcorrenciaPonto = () => {
  const [servidorInfo, setServidorInfo] =
    useState<ServidorInfo>(createServidorInfo);

  const [ocorrencias, setOcorrencias] =
    useState<Ocorrencia[]>(createOcorrencias);

  const pdf = usePdf({ servidorInfo, ocorrencias });

  const handleServidorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServidorInfo((prev) => ({ ...prev, [name]: value }));
  };

  // --- FUNÇÃO CORRIGIDA AQUI ---
  const handleOcorrenciaChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const novasOcorrencias = [...ocorrencias];

    // Se o input for um radio, atualizamos a propriedade 'referente'
    if (type === "radio") {
      novasOcorrencias[index] = {
        ...novasOcorrencias[index],
        referente: value as "dia" | "entrada" | "saida",
      };
    } else {
      // Caso contrário, atualizamos a propriedade com base no 'name' (para data, horario, justificativa)
      novasOcorrencias[index] = { ...novasOcorrencias[index], [name]: value };
    }

    setOcorrencias(novasOcorrencias);
  };

  const adicionarOcorrencia = () => {
    setOcorrencias([
      ...ocorrencias,
      {
        id: createRowId(),
        data: "",
        horario: "",
        referente: "entrada",
        justificativa: "",
      },
    ]);
  };

  const removerOcorrencia = (index: number) => {
    if (ocorrencias.length <= 1) return;
    const novasOcorrencias = ocorrencias.filter((_, i) => i !== index);
    setOcorrencias(novasOcorrencias);
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ servidorInfo, ocorrencias }) => {
      const { default: Document } =
        await import("../../pdf/OcorrenciaPontoPdf");
      return <Document servidorInfo={servidorInfo} ocorrencias={ocorrencias} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>Dados do Servidor</h2>
        <Input
          label="Nome do Servidor"
          id="servidor"
          type="text"
          name="servidor"
          placeholder="Nome do Servidor"
          value={servidorInfo.servidor}
          onChange={handleServidorInfoChange}
          className={cx("form-input-full")}
        />
        <div className={cx("form-grid")}>
          <Input
            label="Matrícula"
            id="matricula"
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={servidorInfo.matricula}
            onChange={handleServidorInfoChange}
          />
          <Input
            label="Cargo/Função"
            id="cargo"
            type="text"
            name="cargo"
            placeholder="Cargo/Função"
            value={servidorInfo.cargo}
            onChange={handleServidorInfoChange}
          />
        </div>
      </div>

      <h2>Ocorrências</h2>
      {ocorrencias.map((ocorrencia, index) => (
        <div
          key={ocorrencia.id}
          className={cx("form-section occurrence-block")}
        >
          <div className={cx("occurrence-header")}>
            <h3>Ocorrência #{index + 1}</h3>
            {ocorrencias.length > 1 && (
              <Button
                aria-label={`Remover item ${index + 1}`}
                onClick={() => removerOcorrencia(index)}
                className={cx("remove-btn")}
              >
                Remover
              </Button>
            )}
          </div>
          <div className={cx("form-grid")}>
            <Input
              label="Data"
              type="date"
              name="data"
              value={ocorrencia.data}
              onChange={(e) => handleOcorrenciaChange(index, e)}
            />
            <Input
              label="Horário"
              type="time"
              name="horario"
              value={ocorrencia.horario}
              onChange={(e) => handleOcorrenciaChange(index, e)}
            />
          </div>
          <fieldset className={cx("radio-group")}>
            <legend>Tipo de ocorrência</legend>
            <label>
              <Input
                bare
                type="radio"
                name={`referente-${ocorrencia.id}`}
                value="dia"
                checked={ocorrencia.referente === "dia"}
                onChange={(e) => handleOcorrenciaChange(index, e)}
              />{" "}
              Dia todo
            </label>
            <label>
              <Input
                bare
                type="radio"
                name={`referente-${ocorrencia.id}`}
                value="entrada"
                checked={ocorrencia.referente === "entrada"}
                onChange={(e) => handleOcorrenciaChange(index, e)}
              />{" "}
              Entrada
            </label>
            <label>
              <Input
                bare
                type="radio"
                name={`referente-${ocorrencia.id}`}
                value="saida"
                checked={ocorrencia.referente === "saida"}
                onChange={(e) => handleOcorrenciaChange(index, e)}
              />{" "}
              Saída
            </label>
          </fieldset>
          <Textarea
            label="Justificativa para esta ocorrência..."
            name="justificativa"
            placeholder="Justificativa para esta ocorrência..."
            value={ocorrencia.justificativa}
            onChange={(e) => handleOcorrenciaChange(index, e)}
          ></Textarea>
        </div>
      ))}
      <Button onClick={adicionarOcorrencia} className={cx("add-btn")}>
        + Adicionar Nova Ocorrência
      </Button>

      <div className={cx("form-section")}>
        <h2>Chefia Imediata</h2>
        <Input
          label="Nome da Chefia Imediata para ciência"
          id="chefia"
          type="text"
          name="chefia"
          placeholder="Nome da Chefia Imediata para ciência"
          value={servidorInfo.chefia}
          onChange={handleServidorInfoChange}
          className={cx("form-input-full")}
        />
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="ocorrencia_ponto.pdf"
      />
    </FormSurface>
  );
};

export default OcorrenciaPonto;
