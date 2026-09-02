// src/pages/SolicitacaoDiaria/SolicitacaoDiaria.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SolicitacaoDiariaPdf from "../../pdf/SolicitacaoDiariaPdf";
import "../FormularioFerias/FormularioFerias.css";

interface FormData {
  nome: string;
  matricula: string;
  cargo: string;
  banco: string;
  tipoConta: "corrente" | "poupanca";
  agencia: string;
  conta: string;
  pix: string;
  cidade: string;
  estado: string;
  periodoViagem: string;
  meioTransporte: "carro" | "onibus" | "aereo" | "outro";
  placaCarro: string;
  outroTransporte: string; // Adicionado este campo
  diariasInteiras: string;
  diariasReduzidas: string;
  solicitaAntecipacao: "sim" | "nao";
  valorSolicitado: string;
  objetivo: string;
}

const SolicitacaoDiaria = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    matricula: "",
    cargo: "",
    banco: "",
    tipoConta: "corrente",
    agencia: "",
    conta: "",
    pix: "",
    cidade: "",
    estado: "",
    periodoViagem: "",
    meioTransporte: "carro",
    placaCarro: "",
    outroTransporte: "", // Adicionado este campo
    diariasInteiras: "",
    diariasReduzidas: "",
    solicitaAntecipacao: "nao",
    valorSolicitado: "",
    objetivo: "",
  });

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <SolicitacaoDiariaPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Solicitação de Diária/Passagem</h2>

      <div className="form-section">
        <h3>Solicitante</h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
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
          placeholder="Pix"
          value={formData.pix}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
        <div className="radio-group" style={{ marginTop: "1rem" }}>
          <label>Tipo de Conta:</label>
          <label>
            <input
              type="radio"
              name="tipoConta"
              value="corrente"
              checked={formData.tipoConta === "corrente"}
              onChange={handleInputChange as any}
            />{" "}
            Corrente
          </label>
          <label>
            <input
              type="radio"
              name="tipoConta"
              value="poupanca"
              checked={formData.tipoConta === "poupanca"}
              onChange={handleInputChange as any}
            />{" "}
            Poupança
          </label>
        </div>
      </div>

      <div className="form-section">
        <h3>Destino e Período</h3>
        <div className="form-grid">
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="periodoViagem"
          placeholder="Período da Viagem (Ex: 01/01/2025 a 05/01/2025)"
          value={formData.periodoViagem}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
      </div>

      <div className="form-section">
        <h3>Meio de Transporte</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="meioTransporte"
              value="carro"
              checked={formData.meioTransporte === "carro"}
              onChange={handleInputChange as any}
            />{" "}
            Carro
          </label>
          <label>
            <input
              type="radio"
              name="meioTransporte"
              value="onibus"
              checked={formData.meioTransporte === "onibus"}
              onChange={handleInputChange as any}
            />{" "}
            Ônibus
          </label>
          <label>
            <input
              type="radio"
              name="meioTransporte"
              value="aereo"
              checked={formData.meioTransporte === "aereo"}
              onChange={handleInputChange as any}
            />{" "}
            Aéreo
          </label>
          <label>
            <input
              type="radio"
              name="meioTransporte"
              value="outro"
              checked={formData.meioTransporte === "outro"}
              onChange={handleInputChange as any}
            />{" "}
            Outro
          </label>
        </div>
        {formData.meioTransporte === "carro" && (
          <div className="conditional-input">
            <input
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
          <div className="conditional-input">
            <input
              type="text"
              name="outroTransporte"
              placeholder="Especifique o transporte"
              value={formData.outroTransporte}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>

      <div className="form-section">
        <h3>Diárias e Valores</h3>
        <div className="form-grid">
          <input
            type="number"
            name="diariasInteiras"
            placeholder="Nº diárias inteiras"
            value={formData.diariasInteiras}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="diariasReduzidas"
            placeholder="Nº diárias reduzidas"
            value={formData.diariasReduzidas}
            onChange={handleInputChange}
          />
        </div>
        <div className="radio-group" style={{ marginTop: "1rem" }}>
          <label>Solicita Antecipação?</label>
          <label>
            <input
              type="radio"
              name="solicitaAntecipacao"
              value="sim"
              checked={formData.solicitaAntecipacao === "sim"}
              onChange={handleInputChange as any}
            />{" "}
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="solicitaAntecipacao"
              value="nao"
              checked={formData.solicitaAntecipacao === "nao"}
              onChange={handleInputChange as any}
            />{" "}
            Não
          </label>
        </div>
        <input
          type="text"
          name="valorSolicitado"
          placeholder="Valor Solicitado (preenchido pelo solicitante)"
          value={formData.valorSolicitado}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
      </div>

      <div className="form-section">
        <h3>Objetivo Detalhado da Viagem</h3>
        <textarea
          name="objetivo"
          value={formData.objetivo}
          onChange={handleInputChange}
          rows={5}
        ></textarea>
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
            fileName="solicitacao_diaria.pdf"
            className="download-link"
          >
            {({ loading }) =>
              loading
                ? "A carregar documento..."
                : "Download Pronto! Clique aqui para transferir."
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default SolicitacaoDiaria;
