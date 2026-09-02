// src/pages/RelatorioViagem/RelatorioViagem.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RelatorioViagemPdf from "../../pdf/RelatorioViagemPdf";
import "../FormularioFerias/FormularioFerias.css";

// Interfaces para organizar os dados do formulário
interface Despesa {
  utilizado: string;
  reembolsar: string;
}
interface DespesaCombustivel extends Despesa {
  quilometragem: string;
}
interface DespesaAntecipada {
  antecipado: string;
  utilizado: string;
  reembolsar: string;
  devolver: string;
}

interface FormData {
  nome: string;
  matricula: string;
  cargo: string;
  destino: string;
  dataSaida: string;
  dataRetorno: string;
  meioTransporte: string;
  descricaoAtividades: string;
  despesasAntecipadas: {
    passagem: DespesaAntecipada;
  };
  despesasRealizadas: {
    combustivel: DespesaCombustivel;
    transporteUrbano: Despesa;
    passagem: Despesa;
    pedagio: Despesa;
    estacionamento: Despesa;
  };
}

const RelatorioViagem = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    matricula: "",
    cargo: "",
    destino: "",
    dataSaida: "",
    dataRetorno: "",
    meioTransporte: "",
    descricaoAtividades: "",
    despesasAntecipadas: {
      passagem: { antecipado: "", utilizado: "", reembolsar: "", devolver: "" },
    },
    despesasRealizadas: {
      combustivel: { utilizado: "", reembolsar: "", quilometragem: "" },
      transporteUrbano: { utilizado: "", reembolsar: "" },
      passagem: { utilizado: "", reembolsar: "" },
      pedagio: { utilizado: "", reembolsar: "" },
      estacionamento: { utilizado: "", reembolsar: "" },
    },
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

  const handleDespesaChange = (
    tabela: "despesasAntecipadas" | "despesasRealizadas",
    despesa: string,
    campo: string,
    value: string,
  ) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      (newFormData[tabela] as any)[despesa][campo] = value;
      return newFormData;
    });
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <RelatorioViagemPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Relatório de Viagem / Prestação de Contas</h2>

      <div className="form-section">
        <h3>Solicitante e Viagem</h3>
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
            name="destino"
            placeholder="Destino"
            value={formData.destino}
            onChange={handleInputChange}
          />
          <p>Data Saída</p>
          <input
            type="date"
            name="dataSaida"
            placeholder="Data Saída"
            value={formData.dataSaida}
            onChange={handleInputChange}
          />
          <p>Data Retorno</p>
          <input
            type="date"
            name="dataRetorno"
            placeholder="Data Retorno"
            value={formData.dataRetorno}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="meioTransporte"
          placeholder="Meio de Transporte"
          value={formData.meioTransporte}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
      </div>

      <div className="form-section">
        <h3>Descrição das Atividades Realizadas</h3>
        <textarea
          name="descricaoAtividades"
          value={formData.descricaoAtividades}
          onChange={handleInputChange}
          rows={5}
        ></textarea>
      </div>

      <div className="form-section">
        <h3>Despesas Realizadas - Em Caso de Antecipação</h3>
        <div
          className="form-grid"
          style={{
            gridTemplateColumns: "1fr repeat(4, 1fr)",
            alignItems: "center",
          }}
        >
          <b>Passagem</b>
          <input
            type="text"
            placeholder="Valor Antecipado"
            onChange={(e) =>
              handleDespesaChange(
                "despesasAntecipadas",
                "passagem",
                "antecipado",
                e.target.value,
              )
            }
          />
          <input
            type="text"
            placeholder="Valor Utilizado"
            onChange={(e) =>
              handleDespesaChange(
                "despesasAntecipadas",
                "passagem",
                "utilizado",
                e.target.value,
              )
            }
          />
          <input
            type="text"
            placeholder="Valor a Reembolsar"
            onChange={(e) =>
              handleDespesaChange(
                "despesasAntecipadas",
                "passagem",
                "reembolsar",
                e.target.value,
              )
            }
          />
          <input
            type="text"
            placeholder="Valor a Devolver"
            onChange={(e) =>
              handleDespesaChange(
                "despesasAntecipadas",
                "passagem",
                "devolver",
                e.target.value,
              )
            }
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Despesas Realizadas</h3>
        {Object.keys(formData.despesasRealizadas).map((key) => (
          <div
            className="form-grid"
            key={key}
            style={{
              gridTemplateColumns: "1fr repeat(3, 1fr)",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <b>{key.charAt(0).toUpperCase() + key.slice(1)}</b>
            {key === "combustivel" && (
              <input
                type="text"
                placeholder="Quilometragem"
                onChange={(e) =>
                  handleDespesaChange(
                    "despesasRealizadas",
                    "combustivel",
                    "quilometragem",
                    e.target.value,
                  )
                }
              />
            )}
            <input
              type="text"
              placeholder="Valor Utilizado"
              onChange={(e) =>
                handleDespesaChange(
                  "despesasRealizadas",
                  key,
                  "utilizado",
                  e.target.value,
                )
              }
            />
            <input
              type="text"
              placeholder="Valor a Reembolsar"
              onChange={(e) =>
                handleDespesaChange(
                  "despesasRealizadas",
                  key,
                  "reembolsar",
                  e.target.value,
                )
              }
            />
          </div>
        ))}
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
            fileName="relatorio_viagem.pdf"
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

export default RelatorioViagem;
