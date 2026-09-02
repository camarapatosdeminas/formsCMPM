// src/pages/SolicitacaoEstagiario/SolicitacaoEstagiario.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SolicitacaoEstagiarioPdf from "../../pdf/SolicitacaoEstagiarioPdf";
import "../FormularioFerias/FormularioFerias.css";

interface OpcaoCurso {
  id: number;
  curso: string;
  periodo: string;
  nivel: "graduacao" | "pos";
}

interface FormData {
  setor: string;
  areaEstagio: string;
  supervisor: string;
  cargo: string;
  horario: string;
  duracao: string;
  atividades: string;
  habilidades: string;
  justificativa: string;
  remunerado: "sim" | "nao";
  vagas: string;
  opcoesCurso: OpcaoCurso[];
}

const SolicitacaoEstagiario = () => {
  const [formData, setFormData] = useState<FormData>({
    setor: "",
    areaEstagio: "",
    supervisor: "",
    cargo: "",
    horario: "",
    duracao: "",
    atividades: "",
    habilidades: "",
    justificativa: "",
    remunerado: "sim",
    vagas: "",
    opcoesCurso: [
      { id: 1, curso: "", periodo: "", nivel: "graduacao" },
      { id: 2, curso: "", periodo: "", nivel: "graduacao" },
      { id: 3, curso: "", periodo: "", nivel: "graduacao" },
    ],
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

  // Handler corrigido para os botões de rádio
  const handleOpcaoCursoChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    const novasOpcoes = [...formData.opcoesCurso];
    novasOpcoes[index] = {
      ...novasOpcoes[index],
      nivel: value as "graduacao" | "pos",
    };
    setFormData((prev) => ({ ...prev, opcoesCurso: novasOpcoes }));
    setDocumentoPronto(null);
  };

  // Handler para os campos de texto das opções
  const handleOpcaoCursoTextChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const novasOpcoes = [...formData.opcoesCurso];
    novasOpcoes[index] = { ...novasOpcoes[index], [name]: value };
    setFormData((prev) => ({ ...prev, opcoesCurso: novasOpcoes }));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <SolicitacaoEstagiarioPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Formulário de Solicitação de Estagiário</h2>

      <div className="form-section">
        <h3>Identificação do Setor</h3>
        <div className="form-grid">
          <input
            type="text"
            name="setor"
            placeholder="Setor Solicitante"
            value={formData.setor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="areaEstagio"
            placeholder="Área de Estágio"
            value={formData.areaEstagio}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="supervisor"
            placeholder="Supervisor do Estágio"
            value={formData.supervisor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo do Supervisor"
            value={formData.cargo}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="horario"
            placeholder="Horário de Estágio"
            value={formData.horario}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="duracao"
            placeholder="Duração Prevista (meses)"
            value={formData.duracao}
            onChange={handleInputChange}
          />
        </div>
        <label style={{ marginTop: "1rem" }}>Número de Vagas Geral:</label>
        <input
          type="number"
          name="vagas"
          value={formData.vagas}
          onChange={handleInputChange}
          className="form-input-full"
        />
      </div>

      <div className="form-section">
        <h3>Opções de Curso/Área</h3>
        {formData.opcoesCurso.map((opcao, index) => (
          <div key={opcao.id} className="occurrence-block">
            <h4>{index + 1}ª Opção</h4>
            <div className="form-grid">
              <input
                type="text"
                name="curso"
                placeholder="Curso/Área"
                value={opcao.curso}
                onChange={(e) => handleOpcaoCursoTextChange(index, e)}
              />
              <input
                type="text"
                name="periodo"
                placeholder="Período"
                value={opcao.periodo}
                onChange={(e) => handleOpcaoCursoTextChange(index, e)}
              />
            </div>
            <div className="radio-group" style={{ marginTop: "0.5rem" }}>
              {/* O 'name' agora é único para cada grupo, usando o id da opção */}
              <label>
                <input
                  type="radio"
                  name={`nivel-${opcao.id}`}
                  value="graduacao"
                  checked={opcao.nivel === "graduacao"}
                  onChange={(e) => handleOpcaoCursoChange(index, e)}
                />{" "}
                Graduação/Técnico
              </label>
              <label>
                <input
                  type="radio"
                  name={`nivel-${opcao.id}`}
                  value="pos"
                  checked={opcao.nivel === "pos"}
                  onChange={(e) => handleOpcaoCursoChange(index, e)}
                />{" "}
                Pós-Graduação
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="form-section">
        <h3>Detalhes da Vaga</h3>
        <label>Atividades a serem desenvolvidas:</label>
        <textarea
          name="atividades"
          value={formData.atividades}
          onChange={handleInputChange}
        ></textarea>
        <label style={{ marginTop: "1rem" }}>Habilidades desejáveis:</label>
        <textarea
          name="habilidades"
          value={formData.habilidades}
          onChange={handleInputChange}
        ></textarea>
        <label style={{ marginTop: "1rem" }}>
          Justificativa da Solicitação:
        </label>
        <textarea
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-section">
        <h3>Remuneração</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="remunerado"
              value="sim"
              checked={formData.remunerado === "sim"}
              onChange={handleInputChange as any}
            />{" "}
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="remunerado"
              value="nao"
              checked={formData.remunerado === "nao"}
              onChange={handleInputChange as any}
            />{" "}
            Não
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
            fileName="solicitacao_estagiario.pdf"
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

export default SolicitacaoEstagiario;
