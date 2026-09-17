import { Input } from "../../../components/ui/Controls";
import { formClasses as cx } from "../../../components/forms/formClasses";
import type { RecadastramentoModel } from "../useRecadastramento";
import { maskCep, maskPhone } from "../../../lib/formatters/masks";
export function ContactSection({ model }: { model: RecadastramentoModel }) {
  const { data, errors, update, inputClass } = model;
  return (
    <section className={cx("rec-section")}>
      <div className={cx("section-heading")}>
        <span className={cx("section-number")}>4</span>
        <div>
          <h2>Anexo I - Endereço e contato</h2>
          <p>
            O endereço também será inserido nas declarações de bens e de não
            acumulação.
          </p>
        </div>
      </div>
      <div className={cx("rec-grid rec-grid-4")}>
        <label className={cx("field field-span-3")}>
          <span>
            Logradouro <b>*</b>
          </span>
          <Input
            bare
            id="logradouro"
            error={
              errors.find((error) => error.field === "logradouro")?.message
            }
            className={cx(inputClass("logradouro"))}
            value={data.logradouro}
            onChange={(e) => update("logradouro", e.target.value)}
            autoComplete="street-address"
          />
        </label>
        <label className={cx("field")}>
          <span>
            Número <b>*</b>
          </span>
          <Input
            bare
            id="numero"
            error={errors.find((error) => error.field === "numero")?.message}
            className={cx(inputClass("numero"))}
            value={data.numero}
            onChange={(e) => update("numero", e.target.value)}
          />
        </label>
        <label className={cx("field field-span-2")}>
          <span>Complemento</span>
          <Input
            bare
            id="complemento"
            value={data.complemento}
            onChange={(e) => update("complemento", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            Bairro <b>*</b>
          </span>
          <Input
            bare
            id="bairro"
            error={errors.find((error) => error.field === "bairro")?.message}
            className={cx(inputClass("bairro"))}
            value={data.bairro}
            onChange={(e) => update("bairro", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>CEP</span>
          <Input
            bare
            id="cep"
            mask="cep"
            validateFormat={false}
            value={data.cep}
            onChange={(e) => update("cep", maskCep(e.target.value))}
            inputMode="numeric"
            placeholder="00000-000"
          />
        </label>
        <label className={cx("field field-span-2")}>
          <span>
            Cidade <b>*</b>
          </span>
          <Input
            bare
            id="cidade"
            error={errors.find((error) => error.field === "cidade")?.message}
            className={cx(inputClass("cidade"))}
            value={data.cidade}
            onChange={(e) => update("cidade", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            UF <b>*</b>
          </span>
          <Input
            bare
            id="enderecoUf"
            error={
              errors.find((error) => error.field === "enderecoUf")?.message
            }
            maxLength={2}
            className={cx(inputClass("enderecoUf"))}
            value={data.enderecoUf}
            onChange={(e) => update("enderecoUf", e.target.value.toUpperCase())}
          />
        </label>
        <label className={cx("field")}>
          <span>Telefone</span>
          <Input
            bare
            id="telefone"
            mask="phone"
            validateFormat={false}
            value={data.telefone}
            onChange={(e) => update("telefone", maskPhone(e.target.value))}
            inputMode="tel"
          />
        </label>
        <label className={cx("field")}>
          <span>Celular</span>
          <Input
            bare
            id="celular"
            mask="phone"
            validateFormat={false}
            error={errors.find((error) => error.field === "celular")?.message}
            hint="Informe ao menos um: telefone ou celular."
            className={cx(inputClass("celular"))}
            value={data.celular}
            onChange={(e) => update("celular", maskPhone(e.target.value))}
            inputMode="tel"
          />
        </label>
        <label className={cx("field field-span-3")}>
          <span>
            E-mail <b>*</b>
          </span>
          <Input
            bare
            id="email"
            error={errors.find((error) => error.field === "email")?.message}
            type="email"
            className={cx(inputClass("email"))}
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </label>
      </div>
    </section>
  );
}
