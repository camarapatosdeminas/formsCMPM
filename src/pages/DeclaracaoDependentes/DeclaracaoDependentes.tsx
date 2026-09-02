// src/pages/DeclaracaoDependentes/DeclaracaoDependentes.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeclaracaoDependentesPdf from "../../pdf/DeclaracaoDependentesPdf";
import "../FormularioFerias/FormularioFerias.css";

interface Dependente {
  id: number;
  nome: string;
  dataNascimento: string;
  parentesco: string;
  cpf: string;
  isDependenteIR: boolean;
}

interface ServidorInfo {
  nome: string;
  matricula: string;
}

const DeclaracaoDependentes = () => {
  const [servidorInfo, setServidorInfo] = useState<ServidorInfo>({
    nome: "",
    matricula: "",
  });

  const [dependentes, setDependentes] = useState<Dependente[]>([
    {
      id: 1,
      nome: "",
      dataNascimento: "",
      parentesco: "",
      cpf: "",
      isDependenteIR: true,
    },
  ]);

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleServidorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServidorInfo((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  // --- FUNÇÃO CORRIGIDA PARA ATUALIZAR OS DADOS DO DEPENDENTE ---
  const handleDependenteChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value, type, checked } = e.target;

    // Criamos uma cópia da lista de dependentes para modificar
    const novosDependentes = [...dependentes];
    // Criamos uma cópia do dependente específico que estamos a alterar
    const dependenteAtualizado = { ...novosDependentes[index] };

    // Verificamos qual campo foi alterado e atualizamos a propriedade correta
    if (name === "nome") {
      dependenteAtualizado.nome = value;
    } else if (name === "dataNascimento") {
      dependenteAtualizado.dataNascimento = value;
    } else if (name === "parentesco") {
      dependenteAtualizado.parentesco = value;
    } else if (name === "cpf") {
      dependenteAtualizado.cpf = value;
    } else if (name === "isDependenteIR" && type === "checkbox") {
      dependenteAtualizado.isDependenteIR = checked;
    }

    // Substituímos o dependente antigo pelo atualizado na lista
    novosDependentes[index] = dependenteAtualizado;

    setDependentes(novosDependentes);
    setDocumentoPronto(null);
  };

  const adicionarDependente = () => {
    setDependentes([
      ...dependentes,
      {
        id: Date.now(),
        nome: "",
        dataNascimento: "",
        parentesco: "",
        cpf: "",
        isDependenteIR: true,
      },
    ]);
  };

  const removerDependente = (index: number) => {
    if (dependentes.length <= 1) return;
    setDependentes(dependentes.filter((_, i) => i !== index));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = (
      <DeclaracaoDependentesPdf
        servidorInfo={servidorInfo}
        dependentes={dependentes}
      />
    );
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Declaração de Dependentes para Fins de Imposto de Renda</h2>

      <div className="form-section">
        <h3>Identificação do Servidor</h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Nome do Servidor"
            value={servidorInfo.nome}
            onChange={handleServidorInfoChange}
          />
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={servidorInfo.matricula}
            onChange={handleServidorInfoChange}
          />
        </div>
      </div>

      <h3>Relação de Dependentes</h3>
      {dependentes.map((dependente, index) => (
        <div key={dependente.id} className="form-section occurrence-block">
          <div className="occurrence-header">
            <h4>Dependente #{index + 1}</h4>
            {dependentes.length > 1 && (
              <button
                onClick={() => removerDependente(index)}
                className="remove-btn"
              >
                Remover
              </button>
            )}
          </div>
          <div
            className="form-grid"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
          >
            <input
              type="text"
              name="nome"
              placeholder="Nome do Dependente"
              value={dependente.nome}
              onChange={(e) => handleDependenteChange(index, e)}
            />
            <input
              type="text"
              name="dataNascimento"
              placeholder="Data de Nascimento"
              value={dependente.dataNascimento}
              onChange={(e) => handleDependenteChange(index, e)}
            />
            <input
              type="text"
              name="parentesco"
              placeholder="Parentesco"
              value={dependente.parentesco}
              onChange={(e) => handleDependenteChange(index, e)}
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={dependente.cpf}
              onChange={(e) => handleDependenteChange(index, e)}
            />
          </div>
          <div className="radio-group" style={{ marginTop: "1rem" }}>
            <label>
              <input
                type="checkbox"
                name="isDependenteIR"
                checked={dependente.isDependenteIR}
                onChange={(e) => handleDependenteChange(index, e)}
              />
              <span style={{ marginLeft: "10px" }}>
                Dependente para Imposto de Renda (IR)
              </span>
            </label>
          </div>
        </div>
      ))}
      <div>
        <button onClick={adicionarDependente} className="add-btn">
          + Adicionar Novo Dependente
        </button>
      </div>

      <button
        onClick={handleGerarPdfClick}
        className="generate-pdf-button"
        style={{ marginTop: "2rem", width: "100%" }}
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
            fileName="declaracao_dependentes.pdf"
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

export default DeclaracaoDependentes;
