import { createRowId } from "../../lib/validation/rowId";
import { Input, Button } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import {
  createServidorInfo,
  createDependentes,
} from "./declaracaoDependentes.defaults";
import type { Dependente, ServidorInfo } from "./declaracaoDependentes.types";
// src/pages/DeclaracaoDependentes/DeclaracaoDependentes.tsx
import React, { useState } from "react";
const DeclaracaoDependentes = () => {
  const [servidorInfo, setServidorInfo] =
    useState<ServidorInfo>(createServidorInfo);

  const [dependentes, setDependentes] =
    useState<Dependente[]>(createDependentes);

  const pdf = usePdf({ servidorInfo, dependentes });

  const handleServidorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServidorInfo((prev) => ({ ...prev, [name]: value }));
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
  };

  const adicionarDependente = () => {
    setDependentes([
      ...dependentes,
      {
        id: createRowId(),
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
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ servidorInfo, dependentes }) => {
      const { default: Document } =
        await import("../../pdf/DeclaracaoDependentesPdf");
      return <Document servidorInfo={servidorInfo} dependentes={dependentes} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>Identificação do Servidor</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Nome do Servidor"
            id="nome"
            type="text"
            name="nome"
            placeholder="Nome do Servidor"
            value={servidorInfo.nome}
            onChange={handleServidorInfoChange}
          />
          <Input
            label="Matrícula"
            id="matricula"
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={servidorInfo.matricula}
            onChange={handleServidorInfoChange}
          />
        </div>
      </div>

      <h2>Relação de Dependentes</h2>
      {dependentes.map((dependente, index) => (
        <div
          key={dependente.id}
          className={cx("form-section occurrence-block")}
        >
          <div className={cx("occurrence-header")}>
            <h3>Dependente #{index + 1}</h3>
            {dependentes.length > 1 && (
              <Button
                aria-label={`Remover item ${index + 1}`}
                onClick={() => removerDependente(index)}
                className={cx("remove-btn")}
              >
                Remover
              </Button>
            )}
          </div>
          <div className={cx("form-grid")}>
            <Input
              label="Nome do Dependente"
              type="text"
              name="nome"
              placeholder="Nome do Dependente"
              value={dependente.nome}
              onChange={(e) => handleDependenteChange(index, e)}
            />
            <Input
              label="Data de Nascimento"
              type="text"
              name="dataNascimento"
              placeholder="Data de Nascimento"
              value={dependente.dataNascimento}
              onChange={(e) => handleDependenteChange(index, e)}
            />
            <Input
              label="Parentesco"
              type="text"
              name="parentesco"
              placeholder="Parentesco"
              value={dependente.parentesco}
              onChange={(e) => handleDependenteChange(index, e)}
            />
            <Input
              label="CPF"
              mask="cpf"
              type="text"
              name="cpf"
              placeholder="CPF"
              value={dependente.cpf}
              onChange={(e) => handleDependenteChange(index, e)}
            />
          </div>
          <fieldset className={cx("radio-group")}>
            <legend>Finalidades da declaração</legend>
            <label>
              <Input
                bare
                type="checkbox"
                name="isDependenteIR"
                checked={dependente.isDependenteIR}
                onChange={(e) => handleDependenteChange(index, e)}
              />
              <span>Dependente para Imposto de Renda (IR)</span>
            </label>
          </fieldset>
        </div>
      ))}
      <div>
        <Button onClick={adicionarDependente} className={cx("add-btn")}>
          + Adicionar Novo Dependente
        </Button>
      </div>

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="declaracao_dependentes.pdf"
      />
    </FormSurface>
  );
};

export default DeclaracaoDependentes;
