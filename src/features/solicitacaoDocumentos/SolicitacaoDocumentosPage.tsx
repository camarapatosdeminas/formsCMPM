import { Input, Textarea } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./solicitacaoDocumentos.defaults";
import type { FormData } from "./solicitacaoDocumentos.types";
// src/pages/SolicitacaoDocumentos/SolicitacaoDocumentos.tsx
import React, { useState } from "react";
const SolicitacaoDocumentos = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  const pdf = usePdf({ formData });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData }) => {
      const { default: Document } =
        await import("../../pdf/SolicitacaoDocumentosPdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>Identificação do Solicitante</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Nome"
            id="nome"
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
          <Input
            label="CPF"
            id="cpf"
            mask="cpf"
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleInputChange}
          />
          <Input
            label="E-mail"
            id="email"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Contato (Telefone)"
            id="contato"
            mask="phone"
            type="text"
            name="contato"
            placeholder="Contato (Telefone)"
            value={formData.contato}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={cx("form-section")}>
        <h2>Dados da Solicitação</h2>

        <Textarea
          label={
            <span>
              Descrever os documentos solicitados (ex: ficha funcional, termo de
              posse, etc).
            </span>
          }
          id="documentosSolicitados"
          name="documentosSolicitados"
          value={formData.documentosSolicitados}
          onChange={handleInputChange}
          rows={4}
        ></Textarea>

        <Textarea
          label={<span>Justificativa do pedido de cópia:</span>}
          id="justificativa"
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
          rows={4}
        ></Textarea>

        <fieldset className={cx("radio-group")}>
          <legend>Documentos solicitados</legend>
          <label>
            <Input
              bare
              type="checkbox"
              name="cienteLgpd"
              checked={formData.cienteLgpd}
              onChange={handleInputChange}
            />
            <span>
              Declaro estar ciente da Lei nº 13.709, de 14 de agosto de 2018 -
              Lei Geral de Proteção de Dados Pessoais (LGPD).
            </span>
          </label>
        </fieldset>
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="solicitacao_documentos.pdf"
      />
    </FormSurface>
  );
};

export default SolicitacaoDocumentos;
