import { Input, Button } from "../../../components/ui/Controls";
import { formClasses as cx } from "../../../components/forms/formClasses";
import type { RecadastramentoModel } from "../useRecadastramento";
export function DependentsSection({ model }: { model: RecadastramentoModel }) {
  const { data, update, updateDependente, addDependente, inputClass } = model;
  return (
    <section className={cx("rec-section")}>
      <div className={cx("section-heading")}>
        <span className={cx("section-number")}>
          {data.tipoPessoa === "vereador" ? "8" : "7"}
        </span>
        <div>
          <h2>Anexo VI - Dependentes</h2>
          <p>
            Deixe a lista vazia se não houver dependentes. IR = Imposto de
            Renda; AF = Abono Família; AM = Assistência Médica e Odontológica.
          </p>
        </div>
      </div>
      {data.dependentes.length === 0 && (
        <div className={cx("empty-state")}>Nenhum dependente incluído.</div>
      )}
      <div className={cx("repeat-list")}>
        {data.dependentes.map((dependente, index) => (
          <div
            className={cx(
              `repeat-card ${inputClass(`dependente-${dependente.id}`)}`,
            )}
            key={dependente.id}
            id={`dependente-${dependente.id}`}
          >
            <div className={cx("repeat-card-header")}>
              <strong>Dependente {index + 1}</strong>
              <Button
                aria-label={`Remover dependente ${index + 1}`}
                type="button"
                className={cx("button-link danger")}
                onClick={() =>
                  update(
                    "dependentes",
                    data.dependentes.filter(
                      (item) => item.id !== dependente.id,
                    ),
                  )
                }
              >
                Remover
              </Button>
            </div>
            <div className={cx("rec-grid rec-grid-3")}>
              <label className={cx("field")}>
                <span>
                  Nome <b>*</b>
                </span>
                <Input
                  bare
                  value={dependente.nome}
                  onChange={(e) =>
                    updateDependente(dependente.id, "nome", e.target.value)
                  }
                />
              </label>
              <label className={cx("field")}>
                <span>
                  Parentesco <b>*</b>
                </span>
                <Input
                  bare
                  value={dependente.parentesco}
                  onChange={(e) =>
                    updateDependente(
                      dependente.id,
                      "parentesco",
                      e.target.value,
                    )
                  }
                />
              </label>
              <label className={cx("field")}>
                <span>
                  Nascimento <b>*</b>
                </span>
                <Input
                  bare
                  type="date"
                  value={dependente.dataNascimento}
                  onChange={(e) =>
                    updateDependente(
                      dependente.id,
                      "dataNascimento",
                      e.target.value,
                    )
                  }
                />
              </label>
            </div>
            <div className={cx("dependency-options")}>
              <label>
                <Input
                  bare
                  type="checkbox"
                  checked={dependente.ir}
                  onChange={(e) =>
                    updateDependente(dependente.id, "ir", e.target.checked)
                  }
                />{" "}
                IR
              </label>
              <label>
                <Input
                  bare
                  type="checkbox"
                  checked={dependente.af}
                  onChange={(e) =>
                    updateDependente(dependente.id, "af", e.target.checked)
                  }
                />{" "}
                AF
              </label>
              <label>
                <Input
                  bare
                  type="checkbox"
                  checked={dependente.am}
                  onChange={(e) =>
                    updateDependente(dependente.id, "am", e.target.checked)
                  }
                />{" "}
                AM
              </label>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        className={cx("secondary-button")}
        onClick={addDependente}
      >
        + Adicionar dependente
      </Button>
    </section>
  );
}
