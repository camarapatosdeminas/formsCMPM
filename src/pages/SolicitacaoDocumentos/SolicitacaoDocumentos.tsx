// src/pages/SolicitacaoDocumentos/SolicitacaoDocumentos.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SolicitacaoDocumentosPdf from "../../pdf/SolicitacaoDocumentosPdf";
import "../FormularioFerias/FormularioFerias.css";

interface FormData {
  nome: string;
  cpf: string;
  email: string;
  contato: string;
  documentosSolicitados: string;
  justificativa: string;
  cienteLgpd: boolean;
}

const SolicitacaoDocumentos = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
    email: "",
    contato: "",
    documentosSolicitados: "",
    justificativa: "",
    cienteLgpd: false,
  });

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

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
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <SolicitacaoDocumentosPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Solicitação de Pasta Funcional e/ou Documento</h2>

      <div className="form-section">
        <h3>Identificação do Solicitante</h3>
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
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contato"
            placeholder="Contato (Telefone)"
            value={formData.contato}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Dados da Solicitação</h3>
        <label>
          Descrever os documentos solicitados (ex: ficha funcional, termo de
          posse, etc).
        </label>
        <textarea
          name="documentosSolicitados"
          value={formData.documentosSolicitados}
          onChange={handleInputChange}
          rows={4}
        ></textarea>

        <label style={{ marginTop: "1rem" }}>
          Justificativa do pedido de cópia:
        </label>
        <textarea
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
          rows={4}
        ></textarea>

        <div
          className="radio-group"
          style={{
            marginTop: "1rem",
            border: "1px solid #444",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="cienteLgpd"
              checked={formData.cienteLgpd}
              onChange={handleInputChange}
            />
            <span style={{ marginLeft: "10px" }}>
              Declaro estar ciente da Lei nº 13.709, de 14 de agosto de 2018 -
              Lei Geral de Proteção de Dados Pessoais (LGPD).
            </span>
          </label>
        </div>
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
            fileName="solicitacao_documentos.pdf"
            className="download-link"
          >
            {/* Também corrigi o erro de 'Loading' para 'loading' */}
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

export default SolicitacaoDocumentos;
