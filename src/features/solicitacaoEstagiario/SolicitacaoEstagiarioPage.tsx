import { Input, Textarea } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./solicitacaoEstagiario.defaults";
import type { FormData } from "./solicitacaoEstagiario.types";
// src/pages/SolicitacaoEstagiario/SolicitacaoEstagiario.tsx
import React, { useState } from "react";
const SolicitacaoEstagiario = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  const pdf = usePdf({ formData });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData }) => {
      const { default: Document } =
        await import("../../pdf/SolicitacaoEstagiarioPdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>Identificação do Setor</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Setor Solicitante"
            id="setor"
            type="text"
            name="setor"
            placeholder="Setor Solicitante"
            value={formData.setor}
            onChange={handleInputChange}
          />
          <Input
            label="Área de Estágio"
            id="areaEstagio"
            type="text"
            name="areaEstagio"
            placeholder="Área de Estágio"
            value={formData.areaEstagio}
            onChange={handleInputChange}
          />
          <Input
            label="Supervisor do Estágio"
            id="supervisor"
            type="text"
            name="supervisor"
            placeholder="Supervisor do Estágio"
            value={formData.supervisor}
            onChange={handleInputChange}
          />
          <Input
            label="Cargo do Supervisor"
            id="cargo"
            type="text"
            name="cargo"
            placeholder="Cargo do Supervisor"
            value={formData.cargo}
            onChange={handleInputChange}
          />
          <Input
            label="Horário de Estágio"
            id="horario"
            type="text"
            name="horario"
            placeholder="Horário de Estágio"
            value={formData.horario}
            onChange={handleInputChange}
          />
          <Input
            label="Duração Prevista (meses)"
            id="duracao"
            type="number"
            name="duracao"
            placeholder="Duração Prevista (meses)"
            value={formData.duracao}
            onChange={handleInputChange}
          />
        </div>

        <Input
          label={<span>Número de Vagas Geral:</span>}
          id="vagas"
          type="number"
          name="vagas"
          value={formData.vagas}
          onChange={handleInputChange}
          className={cx("form-input-full")}
        />
      </div>

      <div className={cx("form-section")}>
        <h2>Opções de Curso/Área</h2>
        {formData.opcoesCurso.map((opcao, index) => (
          <div key={opcao.id} className={cx("occurrence-block")}>
            <h3>{index + 1}ª Opção</h3>
            <div className={cx("form-grid")}>
              <Input
                label="Curso/Área"
                type="text"
                name="curso"
                placeholder="Curso/Área"
                value={opcao.curso}
                onChange={(e) => handleOpcaoCursoTextChange(index, e)}
              />
              <Input
                label="Período"
                type="text"
                name="periodo"
                placeholder="Período"
                value={opcao.periodo}
                onChange={(e) => handleOpcaoCursoTextChange(index, e)}
              />
            </div>
            <fieldset className={cx("radio-group")}>
              <legend>Nível de formação</legend>
              {/* O 'name' agora é único para cada grupo, usando o id da opção */}
              <label>
                <Input
                  bare
                  type="radio"
                  name={`nivel-${opcao.id}`}
                  value="graduacao"
                  checked={opcao.nivel === "graduacao"}
                  onChange={(e) => handleOpcaoCursoChange(index, e)}
                />{" "}
                Graduação/Técnico
              </label>
              <label>
                <Input
                  bare
                  type="radio"
                  name={`nivel-${opcao.id}`}
                  value="pos"
                  checked={opcao.nivel === "pos"}
                  onChange={(e) => handleOpcaoCursoChange(index, e)}
                />{" "}
                Pós-Graduação
              </label>
            </fieldset>
          </div>
        ))}
      </div>

      <div className={cx("form-section")}>
        <h2>Detalhes da Vaga</h2>

        <Textarea
          label={<span>Atividades a serem desenvolvidas:</span>}
          id="atividades"
          name="atividades"
          value={formData.atividades}
          onChange={handleInputChange}
        ></Textarea>

        <Textarea
          label={<span>Habilidades desejáveis:</span>}
          id="habilidades"
          name="habilidades"
          value={formData.habilidades}
          onChange={handleInputChange}
        ></Textarea>

        <Textarea
          label={<span>Justificativa da Solicitação:</span>}
          id="justificativa"
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
        ></Textarea>
      </div>
      <div className={cx("form-section")}>
        <h2>Remuneração</h2>
        <fieldset className={cx("radio-group")}>
          <legend>Estágio remunerado</legend>
          <label>
            <Input
              bare
              type="radio"
              name="remunerado"
              value="sim"
              checked={formData.remunerado === "sim"}
              onChange={handleInputChange}
            />{" "}
            Sim
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="remunerado"
              value="nao"
              checked={formData.remunerado === "nao"}
              onChange={handleInputChange}
            />{" "}
            Não
          </label>
        </fieldset>
      </div>
      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="solicitacao_estagiario.pdf"
      />
    </FormSurface>
  );
};

export default SolicitacaoEstagiario;
