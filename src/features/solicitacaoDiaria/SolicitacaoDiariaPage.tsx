import { Input, Textarea } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./solicitacaoDiaria.defaults";
import type { FormData } from "./solicitacaoDiaria.types";
// src/pages/SolicitacaoDiaria/SolicitacaoDiaria.tsx
import React, { useState } from "react";
const SolicitacaoDiaria = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  const pdf = usePdf({ formData });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData }) => {
      const { default: Document } =
        await import("../../pdf/SolicitacaoDiariaPdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>Solicitante</h2>
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
            label="Cargo"
            id="cargo"
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleInputChange}
          />
          <Input
            label="Banco"
            id="banco"
            type="text"
            name="banco"
            placeholder="Banco"
            value={formData.banco}
            onChange={handleInputChange}
          />
          <Input
            label="Agência"
            id="agencia"
            type="text"
            name="agencia"
            placeholder="Agência"
            value={formData.agencia}
            onChange={handleInputChange}
          />
          <Input
            label="Conta"
            id="conta"
            type="text"
            name="conta"
            placeholder="Conta"
            value={formData.conta}
            onChange={handleInputChange}
          />
        </div>
        <Input
          label="Pix"
          id="pix"
          type="text"
          name="pix"
          placeholder="Pix"
          value={formData.pix}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
        <fieldset className={cx("radio-group")}>
          <legend>Tipo de Conta:</legend>
          <label>
            <Input
              bare
              type="radio"
              name="tipoConta"
              value="corrente"
              checked={formData.tipoConta === "corrente"}
              onChange={handleInputChange}
            />{" "}
            Corrente
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="tipoConta"
              value="poupanca"
              checked={formData.tipoConta === "poupanca"}
              onChange={handleInputChange}
            />{" "}
            Poupança
          </label>
        </fieldset>
      </div>

      <div className={cx("form-section")}>
        <h2>Destino e Período</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Cidade"
            id="cidade"
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleInputChange}
          />
          <Input
            label="Estado"
            id="estado"
            type="text"
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            onChange={handleInputChange}
          />
        </div>
        <Input
          label="Período da Viagem (Ex: 01/01/2025 a 05/01/2025)"
          id="periodoViagem"
          type="text"
          name="periodoViagem"
          placeholder="Período da Viagem (Ex: 01/01/2025 a 05/01/2025)"
          value={formData.periodoViagem}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
      </div>

      <div className={cx("form-section")}>
        <h2>Meio de Transporte</h2>
        <fieldset className={cx("radio-group")}>
          <legend>Meio de transporte</legend>
          <label>
            <Input
              bare
              type="radio"
              name="meioTransporte"
              value="carro"
              checked={formData.meioTransporte === "carro"}
              onChange={handleInputChange}
            />{" "}
            Carro
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="meioTransporte"
              value="onibus"
              checked={formData.meioTransporte === "onibus"}
              onChange={handleInputChange}
            />{" "}
            Ônibus
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="meioTransporte"
              value="aereo"
              checked={formData.meioTransporte === "aereo"}
              onChange={handleInputChange}
            />{" "}
            Aéreo
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="meioTransporte"
              value="outro"
              checked={formData.meioTransporte === "outro"}
              onChange={handleInputChange}
            />{" "}
            Outro
          </label>
        </fieldset>
        {formData.meioTransporte === "carro" && (
          <div className={cx("conditional-input")}>
            <Input
              label="Placa do Carro"
              id="placaCarro"
              type="text"
              name="placaCarro"
              placeholder="Placa do Carro"
              value={formData.placaCarro}
              onChange={handleInputChange}
            />
          </div>
        )}
        {/* CAMPO CONDICIONAL ADICIONADO AQUI */}
        {formData.meioTransporte === "outro" && (
          <div className={cx("conditional-input")}>
            <Input
              label="Especifique o transporte"
              id="outroTransporte"
              type="text"
              name="outroTransporte"
              placeholder="Especifique o transporte"
              value={formData.outroTransporte}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>

      <div className={cx("form-section")}>
        <h2>Diárias e Valores</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Nº diárias inteiras"
            id="diariasInteiras"
            type="number"
            name="diariasInteiras"
            placeholder="Nº diárias inteiras"
            value={formData.diariasInteiras}
            onChange={handleInputChange}
          />
          <Input
            label="Nº diárias reduzidas"
            id="diariasReduzidas"
            type="number"
            name="diariasReduzidas"
            placeholder="Nº diárias reduzidas"
            value={formData.diariasReduzidas}
            onChange={handleInputChange}
          />
        </div>
        <fieldset className={cx("radio-group")}>
          <legend>Solicita Antecipação?</legend>
          <label>
            <Input
              bare
              type="radio"
              name="solicitaAntecipacao"
              value="sim"
              checked={formData.solicitaAntecipacao === "sim"}
              onChange={handleInputChange}
            />{" "}
            Sim
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="solicitaAntecipacao"
              value="nao"
              checked={formData.solicitaAntecipacao === "nao"}
              onChange={handleInputChange}
            />{" "}
            Não
          </label>
        </fieldset>
        <Input
          money
          label="Valor Solicitado (preenchido pelo solicitante)"
          id="valorSolicitado"
          type="text"
          name="valorSolicitado"
          placeholder="Valor Solicitado (preenchido pelo solicitante)"
          value={formData.valorSolicitado}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
      </div>

      <div className={cx("form-section")}>
        <h2>Objetivo Detalhado da Viagem</h2>
        <Textarea
          label="Objetivo da viagem"
          id="objetivo"
          name="objetivo"
          value={formData.objetivo}
          onChange={handleInputChange}
          rows={5}
        ></Textarea>
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="solicitacao_diaria.pdf"
      />
    </FormSurface>
  );
};

export default SolicitacaoDiaria;
