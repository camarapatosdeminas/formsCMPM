// src/pages/FormularioCartaoPonto/FormularioCartaoPonto.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CartaoPontoPdfDocument from "../../pdf/CartaoPontoPdfDocument";
import "./FormularioCartaoPonto.css";

interface FormData {
  nome: string;
  matricula: string;
  setor: string;
  horario: string;
  vereador: string;
  mesReferencia: string;
  inicioFerias: string;
  fimFerias: string;
}

const FormularioCartaoPonto = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    matricula: "",
    setor: "",
    horario: "",
    vereador: "",
    mesReferencia: "",
    inicioFerias: "",
    fimFerias: "",
  });
  const [pdfPronto, setPdfPronto] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfPronto(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.nome.trim() !== "" &&
    formData.matricula.trim() !== "" &&
    formData.mesReferencia !== "";

  return (
    <div className="form-container">
      <h2>Gerador de Cartão de Ponto</h2>
      <p style={{ marginBottom: "20px" }}>
        Preencha as informações para gerar a folha de frequência.
      </p>

      <div className="form-section">
        <h3>1. Informações do Servidor</h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
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
            name="setor"
            placeholder="Setor (Ex: GABINETE DO VEREADOR...)"
            value={formData.setor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="horario"
            placeholder="Horário (Ex: 09:30 às 11:30 e 14:00 às 18:00)"
            value={formData.horario}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="vereador"
            placeholder="Vereador Responsável (Para assinatura)"
            value={formData.vereador}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>2. Período do Ponto</h3>
        <div className="form-grid">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Mês de Referência:
            </label>
            <input
              type="month"
              name="mesReferencia"
              value={formData.mesReferencia}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>3. Férias (Opcional)</h3>
        <div className="form-grid">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Início das Férias:
            </label>
            <input
              type="date"
              name="inicioFerias"
              value={formData.inicioFerias}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Fim das Férias:
            </label>
            <input
              type="date"
              name="fimFerias"
              value={formData.fimFerias}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {!pdfPronto ? (
        <button
          type="button"
          className="generate-pdf-button"
          onClick={() => setPdfPronto(true)}
          disabled={!isFormValid}
          style={{
            opacity: !isFormValid ? 0.5 : 1,
            cursor: !isFormValid ? "not-allowed" : "pointer",
          }}
        >
          Preparar PDF para Download
        </button>
      ) : (
        <PDFDownloadLink
          document={<CartaoPontoPdfDocument data={formData as any} />}
          fileName={`cartao_ponto_${formData.nome.replace(/\s+/g, "_")}.pdf`}
          className="generate-pdf-button"
        >
          {({ loading }) => (loading ? "Processando..." : "Baixar PDF")}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default FormularioCartaoPonto;
