import { Input, Button } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import {
  PdfActions,
  ErrorSummary,
  type FieldError,
} from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./cartaoPonto.defaults";
import { focusErrors } from "../../lib/validation/focusErrors";
import type { FormData } from "./cartaoPonto.types";
// src/pages/FormularioCartaoPonto/FormularioCartaoPonto.tsx
import React, { useState } from "react";
type TipoDiaEspecial = "pontosFacultativos" | "feriados";

const formatarData = (data: string) => {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

const isFimDeSemana = (data: string) => {
  const diaSemana = new Date(`${data}T00:00:00Z`).getUTCDay();
  return diaSemana === 0 || diaSemana === 6;
};

const FormularioCartaoPonto = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);
  const pdf = usePdf({ formData });
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [pontoFacultativoSelecionado, setPontoFacultativoSelecionado] =
    useState("");
  const [feriadoSelecionado, setFeriadoSelecionado] = useState("");
  const [erroDiaEspecial, setErroDiaEspecial] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErroDiaEspecial("");
    if (value.trim())
      setErrors((current) => current.filter((error) => error.field !== name));

    if (name === "mesReferencia") {
      setPontoFacultativoSelecionado("");
      setFeriadoSelecionado("");
      setFormData((prev) => ({
        ...prev,
        mesReferencia: value,
        pontosFacultativos: prev.pontosFacultativos.filter((data) =>
          data.startsWith(`${value}-`),
        ),
        feriados: prev.feriados.filter((data) => data.startsWith(`${value}-`)),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const adicionarDiaEspecial = (
    tipo: TipoDiaEspecial,
    dataSelecionada: string,
  ) => {
    setErroDiaEspecial("");

    if (!dataSelecionada) return;

    if (
      !formData.mesReferencia ||
      !dataSelecionada.startsWith(`${formData.mesReferencia}-`)
    ) {
      setErroDiaEspecial("Selecione uma data dentro do mês de referência.");
      return;
    }

    if (tipo === "pontosFacultativos" && isFimDeSemana(dataSelecionada)) {
      setPontoFacultativoSelecionado("");
      setErroDiaEspecial(
        "Pontos facultativos só podem ser selecionados em dias de semana.",
      );
      return;
    }

    const outroTipo: TipoDiaEspecial =
      tipo === "pontosFacultativos" ? "feriados" : "pontosFacultativos";

    setFormData((prev) => ({
      ...prev,
      [tipo]: Array.from(new Set([...prev[tipo], dataSelecionada])).sort(),
      [outroTipo]: prev[outroTipo].filter((data) => data !== dataSelecionada),
    }));

    if (tipo === "pontosFacultativos") {
      setPontoFacultativoSelecionado("");
    } else {
      setFeriadoSelecionado("");
    }
  };

  const removerDiaEspecial = (tipo: TipoDiaEspecial, dataRemovida: string) => {
    setFormData((prev) => ({
      ...prev,
      [tipo]: prev[tipo].filter((data) => data !== dataRemovida),
    }));
  };

  const limiteInicial = formData.mesReferencia
    ? `${formData.mesReferencia}-01`
    : undefined;
  const limiteFinal = formData.mesReferencia
    ? (() => {
        const [ano, mes] = formData.mesReferencia.split("-").map(Number);
        const ultimoDia = new Date(ano, mes, 0).getDate();
        return `${formData.mesReferencia}-${String(ultimoDia).padStart(2, "0")}`;
      })()
    : undefined;

  const preparePdf = () => {
    const next: FieldError[] = [];
    if (!formData.nome.trim())
      next.push({ field: "nome", message: "Informe o nome." });
    if (!formData.matricula.trim())
      next.push({ field: "matricula", message: "Informe a matrícula." });
    if (!formData.mesReferencia)
      next.push({
        field: "mesReferencia",
        message: "Informe o mês de referência.",
      });
    setErrors(next);
    if (next.length) focusErrors();
    if (!next.length)
      void pdf.generate(async ({ formData }) => {
        const { default: Document } =
          await import("../../pdf/CartaoPontoPdfDocument");
        return <Document data={formData} />;
      });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <p>
        Nome, matrícula e mês de referência são obrigatórios. Os demais campos
        são opcionais.
      </p>

      <div className={cx("form-section")}>
        <h2>1. Informações do Servidor</h2>
        <div className={cx("form-grid")}>
          <Input
            label="Nome completo"
            id="nome"
            error={errors.find((error) => error.field === "nome")?.message}
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleInputChange}
          />
          <Input
            label="Matrícula"
            id="matricula"
            error={errors.find((error) => error.field === "matricula")?.message}
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleInputChange}
          />
          <Input
            label="Setor (Ex: GABINETE DO VEREADOR...)"
            id="setor"
            type="text"
            name="setor"
            placeholder="Setor (Ex: GABINETE DO VEREADOR...)"
            value={formData.setor}
            onChange={handleInputChange}
          />
          <Input
            label="Horário (Ex: 09:30 às 11:30 e 14:00 às 18:00)"
            id="horario"
            type="text"
            name="horario"
            placeholder="Horário (Ex: 09:30 às 11:30 e 14:00 às 18:00)"
            value={formData.horario}
            onChange={handleInputChange}
          />
          <Input
            label="Vereador Responsável (Para assinatura)"
            id="vereador"
            type="text"
            name="vereador"
            placeholder="Vereador Responsável (Para assinatura)"
            value={formData.vereador}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={cx("form-section")}>
        <h2>2. Período do Ponto</h2>
        <div className={cx("form-grid")}>
          <div>
            <Input
              label={<span>Mês de Referência:</span>}
              id="mesReferencia"
              error={
                errors.find((error) => error.field === "mesReferencia")?.message
              }
              type="month"
              name="mesReferencia"
              value={formData.mesReferencia}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className={cx("form-section")}>
        <h2>3. Férias (Opcional)</h2>
        <div className={cx("form-grid")}>
          <div>
            <Input
              label={<span>Início das Férias:</span>}
              id="inicioFerias"
              type="date"
              name="inicioFerias"
              value={formData.inicioFerias}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              label={<span>Fim das Férias:</span>}
              id="fimFerias"
              type="date"
              name="fimFerias"
              value={formData.fimFerias}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className={cx("form-section")}>
        <h2>4. Dias Especiais (Opcional)</h2>
        <p className={cx("special-days-help")}>
          Selecione uma data por vez. Você pode adicionar quantos dias precisar
          dentro do mês de referência.
        </p>
        <div className={cx("form-grid")}>
          <div className={cx("special-days-field")}>
            <Input
              label={<span>Ponto Facultativo:</span>}
              id="pontoFacultativo"
              type="date"
              value={pontoFacultativoSelecionado}
              min={limiteInicial}
              max={limiteFinal}
              disabled={!formData.mesReferencia}
              onChange={(e) => {
                setPontoFacultativoSelecionado(e.target.value);
                adicionarDiaEspecial("pontosFacultativos", e.target.value);
              }}
            />
            <small>
              Disponível somente para dias de segunda a sexta-feira.
            </small>
            <div className={cx("selected-days-list")}>
              {formData.pontosFacultativos.map((data) => (
                <span className={cx("selected-day")} key={data}>
                  {formatarData(data)}
                  <Button
                    type="button"
                    aria-label={`Remover ponto facultativo de ${formatarData(data)}`}
                    onClick={() =>
                      removerDiaEspecial("pontosFacultativos", data)
                    }
                  >
                    ×
                  </Button>
                </span>
              ))}
            </div>
          </div>

          <div className={cx("special-days-field")}>
            <Input
              label={<span>Feriado:</span>}
              id="feriado"
              type="date"
              value={feriadoSelecionado}
              min={limiteInicial}
              max={limiteFinal}
              disabled={!formData.mesReferencia}
              onChange={(e) => {
                setFeriadoSelecionado(e.target.value);
                adicionarDiaEspecial("feriados", e.target.value);
              }}
            />
            <small>Pode ser selecionado em qualquer dia da semana.</small>
            <div className={cx("selected-days-list")}>
              {formData.feriados.map((data) => (
                <span className={cx("selected-day")} key={data}>
                  {formatarData(data)}
                  <Button
                    type="button"
                    aria-label={`Remover feriado de ${formatarData(data)}`}
                    onClick={() => removerDiaEspecial("feriados", data)}
                  >
                    ×
                  </Button>
                </span>
              ))}
            </div>
          </div>
        </div>
        {erroDiaEspecial && (
          <p className={cx("special-days-error")} role="alert">
            {erroDiaEspecial}
          </p>
        )}
      </div>

      <ErrorSummary errors={errors} />
      <PdfActions
        {...pdf}
        onGenerate={preparePdf}
        fileName={`cartao_ponto_${formData.nome.replace(/\s+/g, "_")}.pdf`}
      />
    </FormSurface>
  );
};

export default FormularioCartaoPonto;
