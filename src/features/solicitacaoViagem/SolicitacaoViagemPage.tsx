import { createRowId } from "../../lib/validation/rowId";
import { Input, Button, Textarea } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import {
  createFormData,
  createParticipantes,
} from "./solicitacaoViagem.defaults";
import type { Participante, FormData } from "./solicitacaoViagem.types";
// src/pages/SolicitacaoViagem/SolicitacaoViagem.tsx
import React, { useState } from "react";
// 1. ATUALIZAÇÃO: Adicionados os campos do solicitante aqui

const SolicitacaoViagem = () => {
  // 2. ATUALIZAÇÃO: Adicionados os campos no estado inicial
  const [formData, setFormData] = useState<FormData>(createFormData);

  const [participantes, setParticipantes] =
    useState<Participante[]>(createParticipantes);

  const pdf = usePdf({ formData, participantes });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParticipanteChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const novosParticipantes = [...participantes];
    novosParticipantes[index] = {
      ...novosParticipantes[index],
      nome: e.target.value,
    };
    setParticipantes(novosParticipantes);
  };

  const adicionarParticipante = () => {
    setParticipantes([...participantes, { id: createRowId(), nome: "" }]);
  };

  const removerParticipante = (index: number) => {
    if (participantes.length <= 1) return;
    setParticipantes(participantes.filter((_, i) => i !== index));
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData, participantes }) => {
      const { default: Document } =
        await import("../../pdf/SolicitacaoViagemPdf");
      return <Document formData={formData} participantes={participantes} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      {/* 3. ATUALIZAÇÃO: Adicionada a seção do solicitante no formulário */}
      <div className={cx("form-section")}>
        <h2>1. Solicitante</h2>
        <Input
          label="Nome Completo"
          id="nome"
          type="text"
          name="nome"
          placeholder="Nome Completo"
          value={formData.nome}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
        <div className={cx("form-grid")}>
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
        </div>
        <h3>Dados Bancários</h3>
        <div className={cx("form-grid")}>
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
          label="Chave PIX (opcional)"
          id="pix"
          type="text"
          name="pix"
          placeholder="Chave PIX (opcional)"
          value={formData.pix}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
      </div>
      <div className={cx("form-section")}>
        <h2>Participantes</h2>
        {participantes.map((p, index) => (
          <div key={p.id} className={cx("occurrence-header")}>
            <Input
              label="`Nome do Participante`"
              type="text"
              value={p.nome}
              onChange={(e) => handleParticipanteChange(index, e)}
              placeholder={`Nome do Participante`}
              className={cx("form-input-full")}
            />
            {participantes.length > 1 && (
              <Button
                aria-label={`Remover item ${index + 1}`}
                onClick={() => removerParticipante(index)}
                className={cx("remove-btn")}
              >
                Remover
              </Button>
            )}
          </div>
        ))}
        <Button onClick={adicionarParticipante} className={cx("add-btn")}>
          + Adicionar Participante
        </Button>
      </div>
      {/* O resto do seu formulário continua igual */}
      <div className={cx("form-section")}>
        <h2>2. Finalidade</h2>{" "}
        <fieldset className={cx("radio-group")}>
          <legend>Finalidade</legend>{" "}
          <label>
            {" "}
            <Input
              bare
              type="radio"
              name="finalidade"
              value="encontro"
              checked={formData.finalidade === "encontro"}
              onChange={handleInputChange}
            />{" "}
            Encontro/Seminário/Congresso{" "}
          </label>{" "}
          <label>
            {" "}
            <Input
              bare
              type="radio"
              name="finalidade"
              value="curso"
              checked={formData.finalidade === "curso"}
              onChange={handleInputChange}
            />{" "}
            Curso de aperfeiçoamento{" "}
          </label>{" "}
          <label>
            {" "}
            <Input
              bare
              type="radio"
              name="finalidade"
              value="outros"
              checked={formData.finalidade === "outros"}
              onChange={handleInputChange}
            />{" "}
            Outros{" "}
          </label>{" "}
        </fieldset>{" "}
        {formData.finalidade === "outros" && (
          <Input
            label="Especifique a finalidade"
            id="finalidadeOutros"
            type="text"
            name="finalidadeOutros"
            placeholder="Especifique a finalidade"
            value={formData.finalidadeOutros}
            onChange={handleInputChange}
            className={cx("form-input-full conditional-input")}
          />
        )}{" "}
      </div>{" "}
      <div className={cx("form-section")}>
        <h2>3. Período</h2>{" "}
        <Input
          label="Ex: 01/01/2025 a 05/01/2025"
          id="periodo"
          type="text"
          name="periodo"
          placeholder="Ex: 01/01/2025 a 05/01/2025"
          value={formData.periodo}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />{" "}
      </div>{" "}
      <div className={cx("form-section")}>
        <h2>4. Destino</h2>{" "}
        <div className={cx("form-grid")}>
          {" "}
          <Input
            label="Cidade e Estado"
            id="cidadeEstado"
            type="text"
            name="cidadeEstado"
            placeholder="Cidade e Estado"
            value={formData.cidadeEstado}
            onChange={handleInputChange}
          />{" "}
          <Input
            label="Local (Hotel, Centro de Convenções, etc.)"
            id="local"
            type="text"
            name="local"
            placeholder="Local (Hotel, Centro de Convenções, etc.)"
            value={formData.local}
            onChange={handleInputChange}
          />{" "}
        </div>{" "}
        <Input
          label="Meio de transporte"
          id="meioTransporte"
          type="text"
          name="meioTransporte"
          placeholder="Meio de transporte"
          value={formData.meioTransporte}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />{" "}
      </div>{" "}
      <div className={cx("form-section")}>
        <h2>5. Justificativa</h2>{" "}
        <Textarea
          label="Justificativa"
          id="justificativa"
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
          rows={5}
        ></Textarea>{" "}
      </div>
      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="solicitacao_viagem.pdf"
      />
    </FormSurface>
  );
};

export default SolicitacaoViagem;
