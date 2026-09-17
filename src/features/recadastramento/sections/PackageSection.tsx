import { Input } from "../../../components/ui/Controls";
import { formClasses as cx } from "../../../components/forms/formClasses";
import type { RecadastramentoModel } from "../useRecadastramento";
export function PackageSection({ model }: { model: RecadastramentoModel }) {
  const { data, update } = model;
  return (
    <section className={cx("rec-section rec-section-highlight")}>
      <div className={cx("section-heading")}>
        <span className={cx("section-number")}>1</span>
        <div>
          <h2>Defina o pacote</h2>
          <p>Essa escolha determina quais anexos entram no arquivo final.</p>
        </div>
      </div>

      <fieldset className={cx("choice-grid")}>
        <legend>Tipo de recadastramento</legend>
        <label
          className={cx(
            `choice-card ${data.tipoRecadastramento === "completo" ? "is-selected" : ""}`,
          )}
        >
          <Input
            bare
            type="radio"
            name="tipoRecadastramento"
            checked={data.tipoRecadastramento === "completo"}
            onChange={() => update("tipoRecadastramento", "completo")}
          />
          <span>
            <strong>Recadastramento completo</strong>
            <small>
              Para quem teve alterações ou precisa atualizar todo o cadastro.
            </small>
          </span>
        </label>
        <label
          className={cx(
            `choice-card ${data.tipoRecadastramento === "simplificado" ? "is-selected" : ""}`,
          )}
        >
          <Input
            bare
            type="radio"
            name="tipoRecadastramento"
            checked={data.tipoRecadastramento === "simplificado"}
            onChange={() => update("tipoRecadastramento", "simplificado")}
          />
          <span>
            <strong>Declaração simplificada</strong>
            <small>
              Somente quando não houve alteração desde o último recadastramento.
            </small>
          </span>
        </label>
      </fieldset>

      <fieldset className={cx("choice-grid choice-grid-compact")}>
        <legend>Perfil</legend>
        <label
          className={cx(
            `choice-card ${data.tipoPessoa === "servidor" ? "is-selected" : ""}`,
          )}
        >
          <Input
            bare
            type="radio"
            name="tipoPessoa"
            checked={data.tipoPessoa === "servidor"}
            onChange={() => update("tipoPessoa", "servidor")}
          />
          <span>
            <strong>Servidor(a)</strong>
            <small>Usa o Anexo III no pacote completo.</small>
          </span>
        </label>
        <label
          className={cx(
            `choice-card ${data.tipoPessoa === "vereador" ? "is-selected" : ""}`,
          )}
        >
          <Input
            bare
            type="radio"
            name="tipoPessoa"
            checked={data.tipoPessoa === "vereador"}
            onChange={() => update("tipoPessoa", "vereador")}
          />
          <span>
            <strong>Vereador(a)</strong>
            <small>Usa o Anexo IV no pacote completo.</small>
          </span>
        </label>
      </fieldset>
    </section>
  );
}
