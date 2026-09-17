import { Input, Textarea } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./solicitacaoCursos.defaults";
import type { FormData } from "./solicitacaoCursos.types";
// src/pages/SolicitacaoCursos/SolicitacaoCursos.tsx
import React, { useState } from "react";
const SolicitacaoCursos = () => {
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
        await import("../../pdf/SolicitacaoCursosPdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>I - Identificação do Servidor</h2>
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
            label="Endereço"
            id="endereco"
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
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
          <Input
            label="Celular"
            id="celular"
            mask="phone"
            type="text"
            name="celular"
            placeholder="Celular"
            value={formData.celular}
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
            label="Identidade"
            id="identidade"
            type="text"
            name="identidade"
            placeholder="Identidade"
            value={formData.identidade}
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
            label="Email"
            id="emailServidor"
            type="email"
            name="emailServidor"
            placeholder="Email"
            value={formData.emailServidor}
            onChange={handleInputChange}
          />
          <Input
            label="Ramal"
            id="ramal"
            type="text"
            name="ramal"
            placeholder="Ramal"
            value={formData.ramal}
            onChange={handleInputChange}
          />
        </div>
        <fieldset className={cx("radio-group")}>
          <legend>Função de Confiança:</legend>
          <label>
            <Input
              bare
              type="radio"
              name="funcaoConfianca"
              value="sim"
              checked={formData.funcaoConfianca === "sim"}
              onChange={handleInputChange}
            />{" "}
            Sim
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="funcaoConfianca"
              value="nao"
              checked={formData.funcaoConfianca === "nao"}
              onChange={handleInputChange}
            />{" "}
            Não
          </label>
        </fieldset>
        {formData.funcaoConfianca === "sim" && (
          <div className={cx("conditional-input")}>
            <label>
              <Input
                bare
                type="radio"
                name="tipoFuncao"
                value="direcao"
                checked={formData.tipoFuncao === "direcao"}
                onChange={handleInputChange}
              />{" "}
              Cargo de Direção
            </label>
            <label>
              <Input
                bare
                type="radio"
                name="tipoFuncao"
                value="gratificada"
                checked={formData.tipoFuncao === "gratificada"}
                onChange={handleInputChange}
              />{" "}
              Função Gratificada
            </label>
            <Input
              label="Qual?"
              id="qualFuncao"
              type="text"
              name="qualFuncao"
              placeholder="Qual?"
              value={formData.qualFuncao}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>

      <div className={cx("form-section")}>
        <h2>II - Identificação do Curso</h2>
        {/* NOVO CAMPO ADICIONADO AQUI */}

        <Textarea
          label={<span>Descrição do Curso:</span>}
          id="descricaoCurso"
          name="descricaoCurso"
          placeholder="Descreva brevemente o tema do curso"
          value={formData.descricaoCurso}
          onChange={handleInputChange}
          rows={3}
        ></Textarea>

        <Input
          label="Dados do Fornecedor"
          id="fornecedor"
          type="text"
          name="fornecedor"
          placeholder="Dados do Fornecedor"
          value={formData.fornecedor}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
        <div className={cx("form-grid")}>
          <Input
            label="CNPJ"
            id="cnpj"
            mask="cnpj"
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
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
          <Input
            label="WhatsApp"
            id="whatsapp"
            mask="phone"
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleInputChange}
          />
          <Input
            label="Email do Fornecedor"
            id="emailFornecedor"
            type="email"
            name="emailFornecedor"
            placeholder="Email do Fornecedor"
            value={formData.emailFornecedor}
            onChange={handleInputChange}
          />
          <Input
            label="Início/Término Ex: 02/10/2025 a 15/12/2025"
            id="inicioTermino"
            type="text"
            name="inicioTermino"
            placeholder="Início/Término Ex: 02/10/2025 a 15/12/2025"
            value={formData.inicioTermino}
            onChange={handleInputChange}
          />
          <Input
            label="Carga Horária Total"
            id="cargaHorariaTotal"
            type="text"
            name="cargaHorariaTotal"
            placeholder="Carga Horária Total"
            value={formData.cargaHorariaTotal}
            onChange={handleInputChange}
          />
          <Input
            label="Carga Horária Diária"
            id="cargaHorariaDiaria"
            type="text"
            name="cargaHorariaDiaria"
            placeholder="Carga Horária Diária"
            value={formData.cargaHorariaDiaria}
            onChange={handleInputChange}
          />
        </div>
        <Input
          label="Forma de Apresentação (presencial, online, etc.)"
          id="formaApresentacao"
          type="text"
          name="formaApresentacao"
          placeholder="Forma de Apresentação (presencial, online, etc.)"
          value={formData.formaApresentacao}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
        <fieldset className={cx("radio-group")}>
          <legend>Uso para progressão na carreira?</legend>
          <label>
            <Input
              bare
              type="radio"
              name="usoProgressao"
              value="sim"
              checked={formData.usoProgressao === "sim"}
              onChange={handleInputChange}
            />{" "}
            Sim
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="usoProgressao"
              value="nao"
              checked={formData.usoProgressao === "nao"}
              onChange={handleInputChange}
            />{" "}
            Não
          </label>
        </fieldset>
      </div>

      <div className={cx("form-section")}>
        <h2>III - Apoio Financeiro Solicitado</h2>
        <div className={cx("form-grid")}>
          <div>
            <p>Inscrição:</p>
            <label>
              <Input
                bare
                type="radio"
                name="solicitaInscricao"
                value="sim"
                checked={formData.solicitaInscricao === "sim"}
                onChange={handleInputChange}
              />{" "}
              Sim
            </label>
            <label>
              <Input
                bare
                type="radio"
                name="solicitaInscricao"
                value="nao"
                checked={formData.solicitaInscricao === "nao"}
                onChange={handleInputChange}
              />{" "}
              Não
            </label>
            <Input
              money
              label="Valor da Inscrição"
              id="valorInscricao"
              type="text"
              name="valorInscricao"
              placeholder="Valor da Inscrição"
              value={formData.valorInscricao}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p>Mensalidade:</p>
            <label>
              <Input
                bare
                type="radio"
                name="solicitaMensalidade"
                value="sim"
                checked={formData.solicitaMensalidade === "sim"}
                onChange={handleInputChange}
              />{" "}
              Sim
            </label>
            <label>
              <Input
                bare
                type="radio"
                name="solicitaMensalidade"
                value="nao"
                checked={formData.solicitaMensalidade === "nao"}
                onChange={handleInputChange}
              />{" "}
              Não
            </label>
            <Input
              money
              label="Valor por Mês"
              id="valorMensalidade"
              type="text"
              name="valorMensalidade"
              placeholder="Valor por Mês"
              value={formData.valorMensalidade}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Input
          money
          label={<span>Valor Total do Curso:</span>}
          id="valorTotal"
          type="text"
          name="valorTotal"
          placeholder="Valor Total do Curso"
          value={formData.valorTotal}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="solicitacao_cursos.pdf"
      />
    </FormSurface>
  );
};

export default SolicitacaoCursos;
