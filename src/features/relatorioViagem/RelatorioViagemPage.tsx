import { Input, Textarea } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./relatorioViagem.defaults";
import type { FormData } from "./relatorioViagem.types";
// src/pages/RelatorioViagem/RelatorioViagem.tsx
import React, { useState } from "react";
// Interfaces para organizar os dados do formulário

const RelatorioViagem = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  const pdf = usePdf({ formData });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDespesaChange = (
    tabela: "despesasAntecipadas" | "despesasRealizadas",
    despesa: keyof FormData["despesasRealizadas"],
    campo: string,
    value: string,
  ) => {
    setFormData((prev) => {
      if (tabela === "despesasAntecipadas")
        return {
          ...prev,
          despesasAntecipadas: {
            ...prev.despesasAntecipadas,
            passagem: { ...prev.despesasAntecipadas.passagem, [campo]: value },
          },
        };
      return {
        ...prev,
        despesasRealizadas: {
          ...prev.despesasRealizadas,
          [despesa]: { ...prev.despesasRealizadas[despesa], [campo]: value },
        },
      };
    });
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData }) => {
      const { default: Document } =
        await import("../../pdf/RelatorioViagemPdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>Solicitante e Viagem</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Nome"
            id="nome"
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
          <Input
            label="Matrícula"
            id="matricula"
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleInputChange}
          />
          <Input
            label="Cargo"
            id="cargo"
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleInputChange}
          />
          <Input
            label="Destino"
            id="destino"
            type="text"
            name="destino"
            placeholder="Destino"
            value={formData.destino}
            onChange={handleInputChange}
          />
          <Input
            label="Data Saída"
            id="dataSaida"
            type="date"
            name="dataSaida"
            placeholder="Data Saída"
            value={formData.dataSaida}
            onChange={handleInputChange}
          />
          <Input
            label="Data Retorno"
            id="dataRetorno"
            type="date"
            name="dataRetorno"
            placeholder="Data Retorno"
            value={formData.dataRetorno}
            onChange={handleInputChange}
          />
        </div>
        <Input
          label="Meio de Transporte"
          id="meioTransporte"
          type="text"
          name="meioTransporte"
          placeholder="Meio de Transporte"
          value={formData.meioTransporte}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
      </div>

      <div className={cx("form-section")}>
        <h2>Descrição das Atividades Realizadas</h2>
        <Textarea
          label="Descrição das atividades"
          id="descricaoAtividades"
          name="descricaoAtividades"
          value={formData.descricaoAtividades}
          onChange={handleInputChange}
          rows={5}
        ></Textarea>
      </div>

      <div className={cx("form-section")}>
        <h2>Despesas Realizadas - Em Caso de Antecipação</h2>
        <div className={cx("form-grid")}>
          <b>Passagem</b>
          <Input
            value={formData.despesasAntecipadas["passagem"].antecipado}
            money
            label="Valor Antecipado"
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
          <Input
            value={formData.despesasAntecipadas["passagem"].utilizado}
            money
            label="Valor Utilizado"
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
          <Input
            value={formData.despesasAntecipadas["passagem"].reembolsar}
            money
            label="Valor a Reembolsar"
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
          <Input
            value={formData.despesasAntecipadas["passagem"].devolver}
            money
            label="Valor a Devolver"
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

      <div className={cx("form-section")}>
        <h2>Despesas Realizadas</h2>
        {(
          Object.keys(
            formData.despesasRealizadas,
          ) as (keyof FormData["despesasRealizadas"])[]
        ).map((key) => (
          <div className={cx("form-grid")} key={key}>
            <b>{key.charAt(0).toUpperCase() + key.slice(1)}</b>
            {key === "combustivel" && (
              <Input
                value={formData.despesasRealizadas["combustivel"].quilometragem}
                label="Quilometragem"
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
            <Input
              value={formData.despesasRealizadas[key].utilizado}
              money
              label="Valor Utilizado"
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
            <Input
              value={formData.despesasRealizadas[key].reembolsar}
              money
              label="Valor a Reembolsar"
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

      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="relatorio_viagem.pdf"
      />
    </FormSurface>
  );
};

export default RelatorioViagem;
