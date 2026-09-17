import { Input } from "../../../components/ui/Controls";
import { formClasses as cx } from "../../../components/forms/formClasses";
import type { RecadastramentoModel } from "../useRecadastramento";
import { maskCpf } from "../../../lib/formatters/masks";
export function IdentitySection({ model }: { model: RecadastramentoModel }) {
  const { data, errors, update, inputClass } = model;
  return (
    <section className={cx("rec-section")} id="identificacao">
      <div className={cx("section-heading")}>
        <span className={cx("section-number")}>2</span>
        <div>
          <h2>Identificação compartilhada</h2>
          <p>Estes dados aparecem em várias declarações.</p>
        </div>
      </div>
      <div className={cx("rec-grid rec-grid-3")}>
        <label className={cx("field field-span-2")}>
          <span>
            Nome completo <b>*</b>
          </span>
          <Input
            bare
            id="nome"
            error={errors.find((error) => error.field === "nome")?.message}
            className={cx(inputClass("nome"))}
            value={data.nome}
            onChange={(e) => update("nome", e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className={cx("field")}>
          <span>
            Matrícula {data.tipoRecadastramento === "completo" && <b>*</b>}
          </span>
          <Input
            bare
            id="matricula"
            error={errors.find((error) => error.field === "matricula")?.message}
            className={cx(inputClass("matricula"))}
            value={data.matricula}
            onChange={(e) => update("matricula", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            CPF <b>*</b>
          </span>
          <Input
            bare
            id="cpf"
            mask="cpf"
            error={errors.find((error) => error.field === "cpf")?.message}
            className={cx(inputClass("cpf"))}
            value={data.cpf}
            onChange={(e) => update("cpf", maskCpf(e.target.value))}
            inputMode="numeric"
            placeholder="000.000.000-00"
          />
        </label>
        <label className={cx("field")}>
          <span>
            RG <b>*</b>
          </span>
          <Input
            bare
            id="rg"
            error={errors.find((error) => error.field === "rg")?.message}
            className={cx(inputClass("rg"))}
            value={data.rg}
            onChange={(e) => update("rg", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            Cargo/Função <b>*</b>
          </span>
          <Input
            bare
            id="cargoFuncao"
            error={
              errors.find((error) => error.field === "cargoFuncao")?.message
            }
            className={cx(inputClass("cargoFuncao"))}
            value={data.cargoFuncao}
            onChange={(e) => update("cargoFuncao", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            Data da declaração <b>*</b>
          </span>
          <Input
            bare
            id="dataDeclaracao"
            error={
              errors.find((error) => error.field === "dataDeclaracao")?.message
            }
            type="date"
            className={cx(inputClass("dataDeclaracao"))}
            value={data.dataDeclaracao}
            onChange={(e) => update("dataDeclaracao", e.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
