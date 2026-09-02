// src/pages/SolicitacaoCursos/SolicitacaoCursos.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SolicitacaoCursosPdf from "../../pdf/SolicitacaoCursosPdf";
import "../FormularioFerias/FormularioFerias.css";

interface FormData {
  nome: string;
  endereco: string;
  celular: string;
  identidade: string;
  matricula: string;
  lotacao: string;
  emailServidor: string;
  cpf: string;
  cargo: string;
  ramal: string;
  funcaoConfianca: "sim" | "nao";
  tipoFuncao: "direcao" | "gratificada" | "nenhum";
  qualFuncao: string;
  descricaoCurso: string;
  fornecedor: string;
  cnpj: string;
  contato: string;
  whatsapp: string;
  emailFornecedor: string;
  periodoRealizacao: string;
  inicioTermino: string;
  cargaHorariaTotal: string;
  cargaHorariaDiaria: string;
  usoProgressao: "sim" | "nao";
  formaApresentacao: string;
  solicitaInscricao: "sim" | "nao";
  valorInscricao: string;
  solicitaMensalidade: "sim" | "nao";
  valorMensalidade: string;
  valorTotal: string;
}

const SolicitacaoCursos = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    endereco: "",
    celular: "",
    identidade: "",
    matricula: "",
    lotacao: "",
    emailServidor: "",
    cpf: "",
    cargo: "",
    ramal: "",
    funcaoConfianca: "nao",
    tipoFuncao: "nenhum",
    qualFuncao: "",
    descricaoCurso: "",
    fornecedor: "",
    cnpj: "",
    contato: "",
    whatsapp: "",
    emailFornecedor: "",
    periodoRealizacao: "",
    inicioTermino: "",
    cargaHorariaTotal: "",
    cargaHorariaDiaria: "",
    usoProgressao: "nao",
    formaApresentacao: "",
    solicitaInscricao: "nao",
    valorInscricao: "",
    solicitaMensalidade: "nao",
    valorMensalidade: "",
    valorTotal: "",
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
    const doc = <SolicitacaoCursosPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Solicitação de Apoio a Cursos</h2>

      <div className="form-section">
        <h3>I - Identificação do Servidor</h3>
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
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lotacao"
            placeholder="Lotação"
            value={formData.lotacao}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="celular"
            placeholder="Celular"
            value={formData.celular}
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
            type="text"
            name="identidade"
            placeholder="Identidade"
            value={formData.identidade}
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
            type="email"
            name="emailServidor"
            placeholder="Email"
            value={formData.emailServidor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ramal"
            placeholder="Ramal"
            value={formData.ramal}
            onChange={handleInputChange}
          />
        </div>
        <div className="radio-group" style={{ marginTop: "1rem" }}>
          <label>Função de Confiança:</label>
          <label>
            <input
              type="radio"
              name="funcaoConfianca"
              value="sim"
              checked={formData.funcaoConfianca === "sim"}
              onChange={handleInputChange as any}
            />{" "}
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="funcaoConfianca"
              value="nao"
              checked={formData.funcaoConfianca === "nao"}
              onChange={handleInputChange as any}
            />{" "}
            Não
          </label>
        </div>
        {formData.funcaoConfianca === "sim" && (
          <div className="conditional-input">
            <label>
              <input
                type="radio"
                name="tipoFuncao"
                value="direcao"
                checked={formData.tipoFuncao === "direcao"}
                onChange={handleInputChange as any}
              />{" "}
              Cargo de Direção
            </label>
            <label>
              <input
                type="radio"
                name="tipoFuncao"
                value="gratificada"
                checked={formData.tipoFuncao === "gratificada"}
                onChange={handleInputChange as any}
              />{" "}
              Função Gratificada
            </label>
            <input
              type="text"
              name="qualFuncao"
              placeholder="Qual?"
              value={formData.qualFuncao}
              onChange={handleInputChange}
              style={{ marginTop: "0.5rem" }}
            />
          </div>
        )}
      </div>

      <div className="form-section">
        <h3>II - Identificação do Curso</h3>
        {/* NOVO CAMPO ADICIONADO AQUI */}
        <label>Descrição do Curso:</label>
        <textarea
          name="descricaoCurso"
          placeholder="Descreva brevemente o tema do curso"
          value={formData.descricaoCurso}
          onChange={handleInputChange}
          rows={3}
        ></textarea>

        <input
          type="text"
          name="fornecedor"
          placeholder="Dados do Fornecedor"
          value={formData.fornecedor}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
        <div className="form-grid">
          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contato"
            placeholder="Contato (Telefone)"
            value={formData.contato}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="emailFornecedor"
            placeholder="Email do Fornecedor"
            value={formData.emailFornecedor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="inicioTermino"
            placeholder="Início/Término Ex: 02/10/2025 a 15/12/2025"
            value={formData.inicioTermino}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cargaHorariaTotal"
            placeholder="Carga Horária Total"
            value={formData.cargaHorariaTotal}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cargaHorariaDiaria"
            placeholder="Carga Horária Diária"
            value={formData.cargaHorariaDiaria}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="formaApresentacao"
          placeholder="Forma de Apresentação (presencial, online, etc.)"
          value={formData.formaApresentacao}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
        <div className="radio-group" style={{ marginTop: "1rem" }}>
          <label>Uso para progressão na carreira?</label>
          <label>
            <input
              type="radio"
              name="usoProgressao"
              value="sim"
              checked={formData.usoProgressao === "sim"}
              onChange={handleInputChange as any}
            />{" "}
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="usoProgressao"
              value="nao"
              checked={formData.usoProgressao === "nao"}
              onChange={handleInputChange as any}
            />{" "}
            Não
          </label>
        </div>
      </div>

      <div className="form-section">
        <h3>III - Apoio Financeiro Solicitado</h3>
        <div className="form-grid">
          <div>
            <label>Inscrição:</label>
            <label>
              <input
                type="radio"
                name="solicitaInscricao"
                value="sim"
                checked={formData.solicitaInscricao === "sim"}
                onChange={handleInputChange as any}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="solicitaInscricao"
                value="nao"
                checked={formData.solicitaInscricao === "nao"}
                onChange={handleInputChange as any}
              />{" "}
              Não
            </label>
            <input
              type="text"
              name="valorInscricao"
              placeholder="Valor da Inscrição"
              value={formData.valorInscricao}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Mensalidade:</label>
            <label>
              <input
                type="radio"
                name="solicitaMensalidade"
                value="sim"
                checked={formData.solicitaMensalidade === "sim"}
                onChange={handleInputChange as any}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="solicitaMensalidade"
                value="nao"
                checked={formData.solicitaMensalidade === "nao"}
                onChange={handleInputChange as any}
              />{" "}
              Não
            </label>
            <input
              type="text"
              name="valorMensalidade"
              placeholder="Valor por Mês"
              value={formData.valorMensalidade}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <label style={{ marginTop: "1rem" }}>Valor Total do Curso:</label>
        <input
          type="text"
          name="valorTotal"
          placeholder="Valor Total do Curso"
          value={formData.valorTotal}
          onChange={handleInputChange}
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
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName="solicitacao_cursos.pdf"
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

export default SolicitacaoCursos;
