import { Input, Select, Textarea } from "../../../components/ui/Controls";
import { formClasses as cx } from "../../../components/forms/formClasses";
import type { RecadastramentoModel } from "../useRecadastramento";
import type { RecadastramentoData } from "../../../types/recadastramento";
export function EmploymentSection({ model }: { model: RecadastramentoModel }) {
  const { data, errors, update, inputClass } = model;
  return (
    <section className={cx("rec-section")}>
      <div className={cx("section-heading")}>
        <span className={cx("section-number")}>5</span>
        <div>
          <h2>Anexo I - Dados funcionais</h2>
          <p>Informações profissionais e bancárias do cadastro funcional.</p>
        </div>
      </div>
      <div className={cx("rec-grid rec-grid-3")}>
        <label className={cx("field")}>
          <span>
            Data de admissão <b>*</b>
          </span>
          <Input
            bare
            id="admissao"
            error={errors.find((error) => error.field === "admissao")?.message}
            type="date"
            className={cx(inputClass("admissao"))}
            value={data.admissao}
            onChange={(e) => update("admissao", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            Vínculo <b>*</b>
          </span>
          <Select
            bare
            id="vinculo"
            error={errors.find((error) => error.field === "vinculo")?.message}
            className={cx(inputClass("vinculo"))}
            value={data.vinculo}
            onChange={(e) =>
              update(
                "vinculo",
                e.target.value as RecadastramentoData["vinculo"],
              )
            }
          >
            <option value="">Selecione</option>
            <option value="efetivo">Efetivo</option>
            <option value="comissionado">Comissionado</option>
            <option value="cedido">Cedido</option>
            <option value="agentePolitico">Agente político</option>
          </Select>
        </label>
        <label className={cx("field")}>
          <span>Órgão de cessão</span>
          <Input
            bare
            id="orgaoCessao"
            value={data.orgaoCessao}
            onChange={(e) => update("orgaoCessao", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Cargo do concurso</span>
          <Input
            bare
            id="cargoConcurso"
            value={data.cargoConcurso}
            onChange={(e) => update("cargoConcurso", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            Cargo/Função atual <b>*</b>
          </span>
          <Input
            bare
            id="cargoFuncaoAtual"
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
            Lotação atual <b>*</b>
          </span>
          <Input
            bare
            id="lotacao"
            error={errors.find((error) => error.field === "lotacao")?.message}
            className={cx(inputClass("lotacao"))}
            value={data.lotacao}
            onChange={(e) => update("lotacao", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Grau de instrução</span>
          <Input
            bare
            id="grauInstrucao"
            value={data.grauInstrucao}
            onChange={(e) => update("grauInstrucao", e.target.value)}
          />
        </label>
        <label className={cx("field field-span-2")}>
          <span>Formação/Graduação</span>
          <Input
            bare
            id="formacao"
            value={data.formacao}
            onChange={(e) => update("formacao", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Agência CEF</span>
          <Input
            bare
            id="agencia"
            value={data.agencia}
            onChange={(e) => update("agencia", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Operação</span>
          <Input
            bare
            id="operacao"
            value={data.operacao}
            onChange={(e) => update("operacao", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Conta</span>
          <Input
            bare
            id="conta"
            value={data.conta}
            onChange={(e) => update("conta", e.target.value)}
          />
        </label>
      </div>
      <label className={cx("toggle-line")}>
        <Input
          bare
          type="checkbox"
          checked={data.exerceAtividadeRemunerada}
          onChange={(e) =>
            update("exerceAtividadeRemunerada", e.target.checked)
          }
        />
        <span>Exerço outra atividade remunerada</span>
      </label>
      {data.exerceAtividadeRemunerada && (
        <label className={cx("field field-textarea")}>
          <span>
            Atividade(s) e horários <b>*</b>
          </span>
          <Textarea
            bare
            id="atividadeRemuneradaDetalhes"
            error={
              errors.find(
                (error) => error.field === "atividadeRemuneradaDetalhes",
              )?.message
            }
            className={cx(inputClass("atividadeRemuneradaDetalhes"))}
            value={data.atividadeRemuneradaDetalhes}
            onChange={(e) =>
              update("atividadeRemuneradaDetalhes", e.target.value)
            }
            rows={4}
          />
        </label>
      )}
    </section>
  );
}
