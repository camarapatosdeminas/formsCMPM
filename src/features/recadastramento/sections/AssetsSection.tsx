import { Input, Textarea, Button } from "../../../components/ui/Controls";
import { formClasses as cx } from "../../../components/forms/formClasses";
import type { RecadastramentoModel } from "../useRecadastramento";
export function AssetsSection({ model }: { model: RecadastramentoModel }) {
  const { data, update, updateBem, addBem, inputClass } = model;
  return (
    <section className={cx("rec-section")}>
      <div className={cx("section-heading")}>
        <span className={cx("section-number")}>6</span>
        <div>
          <h2>Anexo II - Declaração de bens</h2>
          <p>
            Adicione quantos bens forem necessários. Textos extensos continuarão
            automaticamente na página seguinte do PDF.
          </p>
        </div>
      </div>
      <div className={cx("repeat-list")}>
        {data.bens.map((bem, index) => (
          <div
            className={cx(`repeat-card ${inputClass(`bem-${bem.id}`)}`)}
            key={bem.id}
            id={`bem-${bem.id}`}
          >
            <div className={cx("repeat-card-header")}>
              <strong>{index + 1}º bem</strong>
              {data.bens.length > 1 && (
                <Button
                  aria-label={`Remover bem ${index + 1}`}
                  type="button"
                  className={cx("button-link danger")}
                  onClick={() =>
                    update(
                      "bens",
                      data.bens.filter((item) => item.id !== bem.id),
                    )
                  }
                >
                  Remover
                </Button>
              )}
            </div>
            <div className={cx("rec-grid rec-grid-assets")}>
              <label className={cx("field")}>
                <span>
                  Descrição <b>*</b>
                </span>
                <Textarea
                  bare
                  value={bem.descricao}
                  onChange={(e) =>
                    updateBem(bem.id, "descricao", e.target.value)
                  }
                  rows={4}
                />
              </label>
              <label className={cx("field")}>
                <span>
                  Valor (R$) <b>*</b>
                </span>
                <Input
                  money
                  bare
                  value={bem.valor}
                  onChange={(e) => updateBem(bem.id, "valor", e.target.value)}
                  inputMode="decimal"
                  placeholder="0,00"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
      <Button type="button" className={cx("secondary-button")} onClick={addBem}>
        + Adicionar outro bem
      </Button>
    </section>
  );
}
