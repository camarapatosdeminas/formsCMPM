import { createRowId } from "../../lib/validation/rowId";
import { Input, Textarea, Button } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData, createItens } from "./almoxarifado.defaults";
import type { ItemRequisicao, FormData } from "./almoxarifado.types";
// src/pages/RequisicaoManualAlmoxarifado/RequisicaoManualAlmoxarifado.tsx

import React, { useState } from "react";
// Interface para um item da requisição

// Interface para os dados do formulário de Requisição de Almoxarifado

const RequisicaoManualAlmoxarifado = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  // ESTADO DOS ITENS (Foi omitido, mas é necessário)
  const [itens, setItens] = useState<ItemRequisicao[]>(createItens);

  // ESTADO CORRIGIDO: Necessário para 'setDocumentoPronto'
  const pdf = usePdf({ formData, itens });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Corrigido!
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
      novosItens[index] = { ...novosItens[index], descricao: value };
    } else if (name === "quantidadeSolicitada") {
      novosItens[index] = { ...novosItens[index], quantidadeSolicitada: value };
    } else if (name === "quantidadeAtendida") {
      novosItens[index] = { ...novosItens[index], quantidadeAtendida: value };
    }

    setItens(novosItens);
  };

  const adicionarItem = () => {
    setItens([
      ...itens,
      {
        id: createRowId(),
        descricao: "",
        quantidadeSolicitada: "",
        quantidadeAtendida: "",
      },
    ]);
  };

  const removerItem = (index: number) => {
    if (itens.length <= 1) return;
    setItens(itens.filter((_, i) => i !== index));
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData, itens }) => {
      const { default: Document } =
        await import("../../pdf/RequisicaoAlmoxarifadoPdf");
      return <Document formData={formData} itens={itens} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      {/* Seção 1: Dados da Requisição (Permanece igual) */}
      <div className={cx("form-section")}>
        <h2>Dados da Requisição</h2>
        <div className={cx("form-grid")}>
          <Input
            label="REQUISIÇÃO Nº"
            id="requisicaoNum"
            type="text"
            name="requisicaoNum"
            placeholder="REQUISIÇÃO Nº"
            value={formData.requisicaoNum}
            onChange={handleInputChange}
          />
          <Input
            label="DATA (Ex: DD/MM/AAAA)"
            id="dataEmissao"
            type="text"
            name="dataEmissao"
            placeholder="DATA (Ex: DD/MM/AAAA)"
            value={formData.dataEmissao}
            onChange={handleInputChange}
          />
        </div>
        <Input
          label="REQUISITANTE"
          id="requisitante"
          type="text"
          name="requisitante"
          placeholder="REQUISITANTE"
          value={formData.requisitante}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
        <Input
          label="LOTAÇÃO"
          id="lotacao"
          type="text"
          name="lotacao"
          placeholder="LOTAÇÃO"
          value={formData.lotacao}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
        <h3>JUSTIFICATIVA</h3>
        <Textarea
          label="Justificativa"
          id="justificativa"
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
          rows={3}
        ></Textarea>
      </div>

      {/* Seção 2: Itens Solicitados (ADICIONEI O JSX) */}
      <div className={cx("form-section")}>
        <h2>Itens Solicitados</h2>
        <div className={cx("table-header")}>
          <span>DESCRIÇÃO</span>
          <span>QTDE. SOLICITADA</span>
          <span>QTDE. ATENDIDA</span>
          <span></span>
        </div>

        {itens.map((item, index) => (
          <div key={item.id} className={cx("item-row")}>
            <Input
              label="Descrição do material"
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
            <Input
              label="Solic."
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
            />
            <Input
              label="Atend."
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
            />
            {itens.length > 1 && (
              <Button
                aria-label={`Remover item ${index + 1}`}
                onClick={() => removerItem(index)}
                className={cx("remove-btn")}
              >
                X
              </Button>
            )}
          </div>
        ))}
        <Button onClick={adicionarItem} className={cx("add-btn")}>
          + Adicionar Item
        </Button>
      </div>

      {/* Seção 3: Recebimento/Entrega REMOVIDA DO JSX */}
      <div className={cx("form-section")}>
        <h2>Dados Recebimento/Entrega</h2>
        <p>
          Estes campos serão preenchidos manualmente após a impressão do PDF.
        </p>

        {/* Adicione um aviso visual para o usuário */}
        <div>ESTA SEÇÃO NÃO REQUER PREENCHIMENTO DIGITAL.</div>
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName={`requisicao_almoxarifado_${formData.requisicaoNum || "sem_numero"}.pdf`}
      />
    </FormSurface>
  );
};

export default RequisicaoManualAlmoxarifado;
