import { Input } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./declaracaoFichaLimpa.defaults";
import type { FormData } from "./declaracaoFichaLimpa.types";
// src/pages/DeclaracaoFichaLimpa/DeclaracaoFichaLimpa.tsx
import React, { useState } from "react";
const DeclaracaoFichaLimpa = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  const pdf = usePdf({ formData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData }) => {
      const { default: Document } =
        await import("../../pdf/DeclaracaoFichaLimpaPdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>Seus Dados</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Nome Completo"
            id="nome"
            type="text"
            name="nome"
            placeholder="Nome Completo"
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
        </div>
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="declaracao_ficha_limpa.pdf"
      />
    </FormSurface>
  );
};

export default DeclaracaoFichaLimpa;
