// src/pages/FormularioCartaoPonto/FormularioCartaoPonto.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CartaoPontoPdfDocument from "../../pdf/CartaoPontoPdfDocument";
import "./FormularioCartaoPonto.css";

interface FormData {
  nome: string;
  matricula: string;
  setor: string;
  horario: string;
  vereador: string;
  mesReferencia: string;
  inicioFerias: string;
  fimFerias: string;
  pontosFacultativos: string[];
  feriados: string[];
}

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
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    matricula: "",
    setor: "",
    horario: "",
    vereador: "",
    mesReferencia: "",
    inicioFerias: "",
    fimFerias: "",
    pontosFacultativos: [],
    feriados: [],
  });
  const [pdfPronto, setPdfPronto] = useState(false);
  const [pontoFacultativoSelecionado, setPontoFacultativoSelecionado] =
    useState("");
  const [feriadoSelecionado, setFeriadoSelecionado] = useState("");
  const [erroDiaEspecial, setErroDiaEspecial] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfPronto(false);
    const { name, value } = e.target;
    setErroDiaEspecial("");

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
    setPdfPronto(false);
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
    setPdfPronto(false);
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

  const isFormValid =
    formData.nome.trim() !== "" &&
    formData.matricula.trim() !== "" &&
    formData.mesReferencia !== "";

  return (
    <div className="form-container">
      <h2>Gerador de Cartão de Ponto</h2>
      <p style={{ marginBottom: "20px" }}>
        Preencha as informações para gerar a folha de frequência.
      </p>

      <div className="form-section">
        <h3>1. Informações do Servidor</h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
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
            name="setor"
            placeholder="Setor (Ex: GABINETE DO VEREADOR...)"
            value={formData.setor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="horario"
            placeholder="Horário (Ex: 09:30 às 11:30 e 14:00 às 18:00)"
            value={formData.horario}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="vereador"
            placeholder="Vereador Responsável (Para assinatura)"
            value={formData.vereador}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>2. Período do Ponto</h3>
        <div className="form-grid">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Mês de Referência:
            </label>
            <input
              type="month"
              name="mesReferencia"
              value={formData.mesReferencia}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>3. Férias (Opcional)</h3>
        <div className="form-grid">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Início das Férias:
            </label>
            <input
              type="date"
              name="inicioFerias"
              value={formData.inicioFerias}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Fim das Férias:
            </label>
            <input
              type="date"
              name="fimFerias"
              value={formData.fimFerias}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>4. Dias Especiais (Opcional)</h3>
        <p className="special-days-help">
          Selecione uma data por vez. Você pode adicionar quantos dias precisar
          dentro do mês de referência.
        </p>
        <div className="form-grid">
          <div className="special-days-field">
            <label htmlFor="pontoFacultativo">Ponto Facultativo:</label>
            <input
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
            <div className="selected-days-list">
              {formData.pontosFacultativos.map((data) => (
                <span className="selected-day" key={data}>
                  {formatarData(data)}
                  <button
                    type="button"
                    aria-label={`Remover ponto facultativo de ${formatarData(data)}`}
                    onClick={() =>
                      removerDiaEspecial("pontosFacultativos", data)
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="special-days-field">
            <label htmlFor="feriado">Feriado:</label>
            <input
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
            <div className="selected-days-list">
              {formData.feriados.map((data) => (
                <span className="selected-day" key={data}>
                  {formatarData(data)}
                  <button
                    type="button"
                    aria-label={`Remover feriado de ${formatarData(data)}`}
                    onClick={() => removerDiaEspecial("feriados", data)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        {erroDiaEspecial && (
          <p className="special-days-error" role="alert">
            {erroDiaEspecial}
          </p>
        )}
      </div>

      {!pdfPronto ? (
        <button
          type="button"
          className="generate-pdf-button"
          onClick={() => setPdfPronto(true)}
          disabled={!isFormValid}
          style={{
            opacity: !isFormValid ? 0.5 : 1,
            cursor: !isFormValid ? "not-allowed" : "pointer",
          }}
        >
          Preparar PDF para Download
        </button>
      ) : (
        <PDFDownloadLink
          document={<CartaoPontoPdfDocument data={formData} />}
          fileName={`cartao_ponto_${formData.nome.replace(/\s+/g, "_")}.pdf`}
          className="generate-pdf-button"
        >
          {({ loading }) => (loading ? "Processando..." : "Baixar PDF")}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default FormularioCartaoPonto;
