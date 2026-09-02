// src/pages/SolicitacaoViagem/SolicitacaoViagem.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SolicitacaoViagemPdf from "../../pdf/SolicitacaoViagemPdf";
import "../FormularioFerias/FormularioFerias.css";

interface Participante {
  id: number;
  nome: string;
}

// 1. ATUALIZAÇÃO: Adicionados os campos do solicitante aqui
interface FormData {
  // Campos do Solicitante
  nome: string;
  matricula: string;
  cargo: string;
  banco: string;
  agencia: string;
  conta: string;
  pix: string;
  // Campos que já existiam
  numVereadores: string;
  numServidores: string;
  finalidade: "encontro" | "curso" | "outros";
  finalidadeOutros: string;
  periodo: string;
  cidadeEstado: string;
  local: string;
  meioTransporte: string;
  justificativa: string;
}

const SolicitacaoViagem = () => {
  // 2. ATUALIZAÇÃO: Adicionados os campos no estado inicial
  const [formData, setFormData] = useState<FormData>({
    // Novos campos
    nome: "",
    matricula: "",
    cargo: "",
    banco: "",
    agencia: "",
    conta: "",
    pix: "",
    // Campos que já existiam
    numVereadores: "",
    numServidores: "",
    finalidade: "encontro",
    finalidadeOutros: "",
    periodo: "",
    cidadeEstado: "",
    local: "",
    meioTransporte: "",
    justificativa: "",
  });

  const [participantes, setParticipantes] = useState<Participante[]>([
    { id: 1, nome: "" },
  ]);

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  const handleParticipanteChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const novosParticipantes = [...participantes];
    novosParticipantes[index].nome = e.target.value;
    setParticipantes(novosParticipantes);
    setDocumentoPronto(null);
  };

  const adicionarParticipante = () => {
    setParticipantes([...participantes, { id: Date.now(), nome: "" }]);
  };

  const removerParticipante = (index: number) => {
    if (participantes.length <= 1) return;
    setParticipantes(participantes.filter((_, i) => i !== index));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = (
      <SolicitacaoViagemPdf formData={formData} participantes={participantes} />
    );
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      {/* 3. ATUALIZAÇÃO: Adicionada a seção do solicitante no formulário */}
      <div className="form-section">
        <h3>1. Solicitante</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome Completo"
          value={formData.nome}
          onChange={handleInputChange}
          className="form-input-full"
        />
        <div className="form-grid">
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleInputChange}
          />
        </div>
        <h4>Dados Bancários</h4>
        <div className="form-grid">
          <input
            type="text"
            name="banco"
            placeholder="Banco"
            value={formData.banco}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="agencia"
            placeholder="Agência"
            value={formData.agencia}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="conta"
            placeholder="Conta"
            value={formData.conta}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="pix"
          placeholder="Chave PIX (opcional)"
          value={formData.pix}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
      </div>
      <div className="form-section">
        <h3>Participantes</h3>
        {participantes.map((p, index) => (
          <div key={p.id} className="occurrence-header">
            <input
              type="text"
              value={p.nome}
              onChange={(e) => handleParticipanteChange(index, e)}
              placeholder={`Nome do Participante`}
              className="form-input-full"
            />
            {participantes.length > 1 && (
              <button
                onClick={() => removerParticipante(index)}
                className="remove-btn"
              >
                Remover
              </button>
            )}
          </div>
        ))}
        <button onClick={adicionarParticipante} className="add-btn">
          + Adicionar Participante
        </button>
      </div>
      {/* O resto do seu formulário continua igual */}
      <div className="form-section">
                <h3>2. Finalidade</h3>       {" "}
        <div className="radio-group">
                   {" "}
          <label>
                       {" "}
            <input
              type="radio"
              name="finalidade"
              value="encontro"
              checked={formData.finalidade === "encontro"}
              onChange={handleInputChange as any}
            />{" "}
                        Encontro/Seminário/Congresso          {" "}
          </label>
                   {" "}
          <label>
                       {" "}
            <input
              type="radio"
              name="finalidade"
              value="curso"
              checked={formData.finalidade === "curso"}
              onChange={handleInputChange as any}
            />{" "}
                        Curso de aperfeiçoamento          {" "}
          </label>
                   {" "}
          <label>
                       {" "}
            <input
              type="radio"
              name="finalidade"
              value="outros"
              checked={formData.finalidade === "outros"}
              onChange={handleInputChange as any}
            />{" "}
                        Outros          {" "}
          </label>
                 {" "}
        </div>
               {" "}
        {formData.finalidade === "outros" && (
          <input
            type="text"
            name="finalidadeOutros"
            placeholder="Especifique a finalidade"
            value={formData.finalidadeOutros}
            onChange={handleInputChange}
            className="form-input-full conditional-input"
          />
        )}
             {" "}
      </div>
           {" "}
      <div className="form-section">
                <h3>3. Período</h3>       {" "}
        <input
          type="text"
          name="periodo"
          placeholder="Ex: 01/01/2025 a 05/01/2025"
          value={formData.periodo}
          onChange={handleInputChange}
          className="form-input-full"
        />
             {" "}
      </div>
           {" "}
      <div className="form-section">
                <h3>4. Destino</h3>       {" "}
        <div className="form-grid">
                   {" "}
          <input
            type="text"
            name="cidadeEstado"
            placeholder="Cidade e Estado"
            value={formData.cidadeEstado}
            onChange={handleInputChange}
          />
                   {" "}
          <input
            type="text"
            name="local"
            placeholder="Local (Hotel, Centro de Convenções, etc.)"
            value={formData.local}
            onChange={handleInputChange}
          />
                 {" "}
        </div>
               {" "}
        <input
          type="text"
          name="meioTransporte"
          placeholder="Meio de transporte"
          value={formData.meioTransporte}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
             {" "}
      </div>
           {" "}
      <div className="form-section">
                <h3>5. Justificativa</h3>       {" "}
        <textarea
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
          rows={5}
        ></textarea>
             {" "}
      </div>
      <button
        onClick={handleGerarPdfClick}
        className="generate-pdf-button"
        style={{
          marginTop: "1rem",
          display: "block",
          textAlign: "center",
          width: "100%",
          border: "none",
        }}
      >
        Gerar PDF
      </button>
      {documentoPronto && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName="solicitacao_viagem.pdf"
            className="download-link"
          >
            {({ loading }) =>
              loading
                ? "A carregar documento..."
                : "Download Pronto!!! Clique aqui para transferir."
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default SolicitacaoViagem;
