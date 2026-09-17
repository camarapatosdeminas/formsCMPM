import { Input } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./adiantamento13.defaults";
import type { FormData } from "./adiantamento13.types";
// src/pages/Adiantamento13/Adiantamento13.tsx
import React, { useState } from "react";
const Adiantamento13 = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  const pdf = usePdf({ formData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData }) => {
      const { default: Document } = await import("../../pdf/Adiantamento13Pdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>1. Dados do Requisitante</h2>
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
            label="Matrícula"
            id="matricula"
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
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
            label="Lotação"
            id="lotacao"
            type="text"
            name="lotacao"
            placeholder="Lotação"
            value={formData.lotacao}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={cx("form-section")}>
        <h2>2. Assunto</h2>
        <p>Com base na Portaria nº:</p>
        <Input
          label="Número da Portaria"
          id="portaria"
          type="text"
          name="portaria"
          placeholder="Número da Portaria"
          value={formData.portaria}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="adiantamento_13.pdf"
      />
    </FormSurface>
  );
};

export default Adiantamento13;
