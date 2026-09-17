import { Input } from "../../../components/ui/Controls";
import { formClasses as cx } from "../../../components/forms/formClasses";
import type { RecadastramentoModel } from "../useRecadastramento";
export function CouncilorSection({ model }: { model: RecadastramentoModel }) {
  const { data, update } = model;
  return (
    <section className={cx("rec-section")}>
      <div className={cx("section-heading")}>
        <span className={cx("section-number")}>7</span>
        <div>
          <h2>Anexo IV - Situação do vereador</h2>
          <p>Selecione a declaração compatível com sua situação funcional.</p>
        </div>
      </div>
      <div className={cx("stacked-options")}>
        <label>
          <Input
            bare
            type="radio"
            name="situacaoVereador"
            checked={data.situacaoVereador === "naoServidor"}
            onChange={() => update("situacaoVereador", "naoServidor")}
          />
          <span>Não sou servidor público em exercício de mandato eletivo.</span>
        </label>
        <label>
          <Input
            bare
            type="radio"
            name="situacaoVereador"
            checked={data.situacaoVereador === "servidorCompativel"}
            onChange={() => update("situacaoVereador", "servidorCompativel")}
          />
          <span>Sou servidor público e há compatibilidade de horários.</span>
        </label>
        <label>
          <Input
            bare
            type="radio"
            name="situacaoVereador"
            checked={data.situacaoVereador === "servidorIncompativel"}
            onChange={() => update("situacaoVereador", "servidorIncompativel")}
          />
          <span>Sou servidor público e há incompatibilidade de horários.</span>
        </label>
      </div>
      {data.situacaoVereador === "servidorIncompativel" && (
        <div className={cx("conditional-box")}>
          <strong>Remuneração do cargo efetivo</strong>
          <label>
            <Input
              bare
              type="radio"
              name="opcaoRemuneracao"
              checked={data.opcaoRemuneracao === "opta"}
              onChange={() => update("opcaoRemuneracao", "opta")}
            />{" "}
            Opto pela remuneração do cargo efetivo
          </label>
          <label>
            <Input
              bare
              type="radio"
              name="opcaoRemuneracao"
              checked={data.opcaoRemuneracao === "naoOpta"}
              onChange={() => update("opcaoRemuneracao", "naoOpta")}
            />{" "}
            Não opto pela remuneração do cargo efetivo
          </label>
          {data.opcaoRemuneracao === "naoOpta" && (
            <>
              <strong>Base das contribuições ao regime próprio</strong>
              <label>
                <Input
                  bare
                  type="radio"
                  name="baseContribuicao"
                  checked={data.baseContribuicao === "subsidioVereador"}
                  onChange={() =>
                    update("baseContribuicao", "subsidioVereador")
                  }
                />{" "}
                Subsídio de vereador
              </label>
              <label>
                <Input
                  bare
                  type="radio"
                  name="baseContribuicao"
                  checked={data.baseContribuicao === "remuneracaoCargoEfetivo"}
                  onChange={() =>
                    update("baseContribuicao", "remuneracaoCargoEfetivo")
                  }
                />{" "}
                Remuneração do cargo efetivo
              </label>
            </>
          )}
        </div>
      )}
    </section>
  );
}
