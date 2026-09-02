// src/pages/OcorrenciaPonto/OcorrenciaPonto.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OcorrenciaPontoPdf from "../../pdf/OcorrenciaPontoPdf";
import "../FormularioFerias/FormularioFerias.css";

interface Ocorrencia {
  id: number;
  data: string;
  horario: string;
  referente: "dia" | "entrada" | "saida";
  justificativa: string;
}

interface ServidorInfo {
  servidor: string;
  matricula: string;
  cargo: string;
  chefia: string;
}

const OcorrenciaPonto = () => {
  const [servidorInfo, setServidorInfo] = useState<ServidorInfo>({
    servidor: "",
    matricula: "",
    cargo: "",
    chefia: "",
  });

  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([
    { id: 1, data: "", horario: "", referente: "entrada", justificativa: "" },
  ]);

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleServidorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServidorInfo((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  // --- FUNÇÃO CORRIGIDA AQUI ---
  const handleOcorrenciaChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const novasOcorrencias = [...ocorrencias];

    // Se o input for um radio, atualizamos a propriedade 'referente'
    if (type === "radio") {
      novasOcorrencias[index] = {
        ...novasOcorrencias[index],
        referente: value as "dia" | "entrada" | "saida",
      };
    } else {
      // Caso contrário, atualizamos a propriedade com base no 'name' (para data, horario, justificativa)
      novasOcorrencias[index] = { ...novasOcorrencias[index], [name]: value };
    }

    setOcorrencias(novasOcorrencias);
    setDocumentoPronto(null);
  };

  const adicionarOcorrencia = () => {
    setOcorrencias([
      ...ocorrencias,
      {
        id: Date.now(),
        data: "",
        horario: "",
        referente: "entrada",
        justificativa: "",
      },
    ]);
    setDocumentoPronto(null);
  };

  const removerOcorrencia = (index: number) => {
    if (ocorrencias.length <= 1) return;
    const novasOcorrencias = ocorrencias.filter((_, i) => i !== index);
    setOcorrencias(novasOcorrencias);
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = (
      <OcorrenciaPontoPdf
        servidorInfo={servidorInfo}
        ocorrencias={ocorrencias}
      />
    );
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Ocorrência de Ponto</h2>

      <div className="form-section">
        <h3>Dados do Servidor</h3>
        <input
          type="text"
          name="servidor"
          placeholder="Nome do Servidor"
          value={servidorInfo.servidor}
          onChange={handleServidorInfoChange}
          className="form-input-full"
        />
        <div className="form-grid">
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={servidorInfo.matricula}
            onChange={handleServidorInfoChange}
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo/Função"
            value={servidorInfo.cargo}
            onChange={handleServidorInfoChange}
          />
        </div>
      </div>

      <h3>Ocorrências</h3>
      {ocorrencias.map((ocorrencia, index) => (
        <div key={ocorrencia.id} className="form-section occurrence-block">
          <div className="occurrence-header">
            <h4>Ocorrência #{index + 1}</h4>
            {ocorrencias.length > 1 && (
              <button
                onClick={() => removerOcorrencia(index)}
                className="remove-btn"
              >
                Remover
              </button>
            )}
          </div>
          <div className="form-grid">
            <input
              type="date"
              name="data"
              value={ocorrencia.data}
              onChange={(e) => handleOcorrenciaChange(index, e)}
            />
            <input
              type="time"
              name="horario"
              value={ocorrencia.horario}
              onChange={(e) => handleOcorrenciaChange(index, e)}
            />
          </div>
          <div className="radio-group" style={{ marginTop: "1rem" }}>
            <label>
              <input
                type="radio"
                name={`referente-${ocorrencia.id}`}
                value="dia"
                checked={ocorrencia.referente === "dia"}
                onChange={(e) => handleOcorrenciaChange(index, e)}
              />{" "}
              Dia todo
            </label>
            <label>
              <input
                type="radio"
                name={`referente-${ocorrencia.id}`}
                value="entrada"
                checked={ocorrencia.referente === "entrada"}
                onChange={(e) => handleOcorrenciaChange(index, e)}
              />{" "}
              Entrada
            </label>
            <label>
              <input
                type="radio"
                name={`referente-${ocorrencia.id}`}
                value="saida"
                checked={ocorrencia.referente === "saida"}
                onChange={(e) => handleOcorrenciaChange(index, e)}
              />{" "}
              Saída
            </label>
          </div>
          <textarea
            name="justificativa"
            placeholder="Justificativa para esta ocorrência..."
            value={ocorrencia.justificativa}
            onChange={(e) => handleOcorrenciaChange(index, e)}
          ></textarea>
        </div>
      ))}
      <button onClick={adicionarOcorrencia} className="add-btn">
        + Adicionar Nova Ocorrência
      </button>

      <div className="form-section" style={{ marginTop: "2rem" }}>
        <h3>Chefia Imediata</h3>
        <input
          type="text"
          name="chefia"
          placeholder="Nome da Chefia Imediata para ciência"
          value={servidorInfo.chefia}
          onChange={handleServidorInfoChange}
          className="form-input-full"
        />
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
        <div
          className="download-link-container"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName="ocorrencia_ponto.pdf"
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

export default OcorrenciaPonto;
