import { Input } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./declaracaoNaoOcupacao.defaults";
import type { FormData } from "./declaracaoNaoOcupacao.types";
// src/pages/DeclaracaoNaoOcupacao/DeclaracaoNaoOcupacao.tsx
import React, { useState } from "react";
const DeclaracaoNaoOcupacao = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  const pdf = usePdf({ formData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData }) => {
      const { default: Document } =
        await import("../../pdf/DeclaracaoNaoOcupacaoPdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>Dados Pessoais</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Seu Nome Completo"
            id="nome"
            type="text"
            name="nome"
            placeholder="Seu Nome Completo"
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

      <div className={cx("form-section")}>
        <h2>Endereço</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Nome da Rua / Av."
            id="rua"
            type="text"
            name="rua"
            placeholder="Nome da Rua / Av."
            value={formData.rua}
            onChange={handleInputChange}
          />
          <Input
            label="Nº"
            id="numero"
            type="text"
            name="numero"
            placeholder="Nº"
            value={formData.numero}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={cx("form-section")}>
        <h2>Cargo</h2>
        <Input
          label="Cargo para o qual está a tomar posse"
          id="cargo"
          type="text"
          name="cargo"
          placeholder="Cargo para o qual está a tomar posse"
          value={formData.cargo}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="declaracao_nao_ocupacao.pdf"
      />
    </FormSurface>
  );
};

export default DeclaracaoNaoOcupacao;
