// src/pages/RequisicaoManualAlmoxarifado/RequisicaoManualAlmoxarifado.tsx

import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RequisicaoAlmoxarifadoPdf from "../../pdf/RequisicaoAlmoxarifadoPdf";
import "../FormularioFerias/FormularioFerias.css";

// Interface para um item da requisição
interface ItemRequisicao {
  id: number;
  descricao: string;
  quantidadeSolicitada: string;
  quantidadeAtendida: string;
}

// Interface para os dados do formulário de Requisição de Almoxarifado
interface FormData {
  // Campos do Cabeçalho (Anexo I)
  dataEmissao: string;
  requisicaoNum: string;
  requisitante: string;
  lotacao: string;
  justificativa: string;

  // CAMPOS DE RECEBIMENTO REMOVIDOS
}

const RequisicaoManualAlmoxarifado = () => {
  const [formData, setFormData] = useState<FormData>({
    dataEmissao: new Date().toLocaleDateString("pt-BR"),
    requisicaoNum: "",
    requisitante: "",
    lotacao: "",
    justificativa: "",
  });

  // ESTADO DOS ITENS (Foi omitido, mas é necessário)
  const [itens, setItens] = useState<ItemRequisicao[]>([
    { id: 1, descricao: "", quantidadeSolicitada: "", quantidadeAtendida: "" },
  ]);

  // ESTADO CORRIGIDO: Necessário para 'setDocumentoPronto'
  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null); // Corrigido!
  };

  // Funções de Item (Adicionei placeholders, você deve usar o código completo delas)
  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const novosItens = [...itens];

    // Simplificado
    if (name === "descricao") {
      novosItens[index].descricao = value;
    } else if (name === "quantidadeSolicitada") {
      novosItens[index].quantidadeSolicitada = value;
    } else if (name === "quantidadeAtendida") {
      novosItens[index].quantidadeAtendida = value;
    }

    setItens(novosItens);
    setDocumentoPronto(null);
  };

  const adicionarItem = () => {
    setItens([
      ...itens,
      {
        id: Date.now(),
        descricao: "",
        quantidadeSolicitada: "",
        quantidadeAtendida: "",
      },
    ]);
    setDocumentoPronto(null);
  };

  const removerItem = (index: number) => {
    if (itens.length <= 1) return;
    setItens(itens.filter((_, i) => i !== index));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <RequisicaoAlmoxarifadoPdf formData={formData} itens={itens} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Requisição Manual de Materiais - Almoxarifado</h2>

      {/* Seção 1: Dados da Requisição (Permanece igual) */}
      <div className="form-section">
        <h3>Dados da Requisição</h3>
        <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <input
            type="text"
            name="requisicaoNum"
            placeholder="REQUISIÇÃO Nº"
            value={formData.requisicaoNum}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="dataEmissao"
            placeholder="DATA (Ex: DD/MM/AAAA)"
            value={formData.dataEmissao}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="requisitante"
          placeholder="REQUISITANTE"
          value={formData.requisitante}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
        <input
          type="text"
          name="lotacao"
          placeholder="LOTAÇÃO"
          value={formData.lotacao}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />
        <h4>JUSTIFICATIVA</h4>
        <textarea
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
          rows={3}
        ></textarea>
      </div>

      {/* Seção 2: Itens Solicitados (ADICIONEI O JSX) */}
      <div className="form-section">
        <h3>Itens Solicitados</h3>
        <div
          className="table-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 100px 100px 50px",
            gap: "0.5rem",
            fontWeight: "bold",
          }}
        >
          <span>DESCRIÇÃO</span>
          <span style={{ textAlign: "center" }}>QTDE. SOLICITADA</span>
          <span style={{ textAlign: "center" }}>QTDE. ATENDIDA</span>
          <span></span>
        </div>

        {itens.map((item, index) => (
          <div
            key={item.id}
            className="item-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 100px 50px",
              gap: "0.5rem",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <input
              type="text"
              name="descricao"
              value={item.descricao}
              onChange={(e) =>
                handleItemChange(
                  index,
                  e as React.ChangeEvent<HTMLInputElement>,
                )
              }
              placeholder="Descrição do material"
            />
            <input
              type="number"
              name="quantidadeSolicitada"
              value={item.quantidadeSolicitada}
              onChange={(e) =>
                handleItemChange(
                  index,
                  e as React.ChangeEvent<HTMLInputElement>,
                )
              }
              placeholder="Solic."
              style={{ textAlign: "center" }}
            />
            <input
              type="number"
              name="quantidadeAtendida"
              value={item.quantidadeAtendida}
              onChange={(e) =>
                handleItemChange(
                  index,
                  e as React.ChangeEvent<HTMLInputElement>,
                )
              }
              placeholder="Atend."
              style={{ textAlign: "center" }}
            />
            {itens.length > 1 && (
              <button
                onClick={() => removerItem(index)}
                className="remove-btn"
                style={{ height: "38px", padding: "0 5px" }}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button onClick={adicionarItem} className="add-btn">
          + Adicionar Item
        </button>
      </div>

      {/* Seção 3: Recebimento/Entrega REMOVIDA DO JSX */}
      <div className="form-section">
        <h3>Dados Recebimento/Entrega</h3>
        <p>
          Estes campos serão preenchidos manualmente após a impressão do PDF.
        </p>

        {/* Adicione um aviso visual para o usuário */}
        <div
          style={{
            padding: "10px",
            backgroundColor: "#35679C",
            color: "#fff",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          ESTA SEÇÃO NÃO REQUER PREENCHIMENTO DIGITAL.
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
        Gerar PDF de Requisição
      </button>

      {documentoPronto && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName={`requisicao_almoxarifado_${formData.requisicaoNum || "sem_numero"}.pdf`}
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

export default RequisicaoManualAlmoxarifado;
