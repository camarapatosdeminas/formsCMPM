import { Input } from "../../../components/ui/Controls";
import { formClasses as cx } from "../../../components/forms/formClasses";
import type { RecadastramentoModel } from "../useRecadastramento";
export function PersonalSection({ model }: { model: RecadastramentoModel }) {
  const { data, errors, update, inputClass } = model;
  return (
    <section className={cx("rec-section")}>
      <div className={cx("section-heading")}>
        <span className={cx("section-number")}>3</span>
        <div>
          <h2>Anexo I - Dados pessoais e documentos</h2>
          <p>
            Campos sem asterisco podem ser deixados em branco quando não se
            aplicarem.
          </p>
        </div>
      </div>
      <div className={cx("rec-grid rec-grid-4")}>
        <label className={cx("field")}>
          <span>
            Nascimento <b>*</b>
          </span>
          <Input
            bare
            id="dataNascimento"
            error={
              errors.find((error) => error.field === "dataNascimento")?.message
            }
            type="date"
            className={cx(inputClass("dataNascimento"))}
            value={data.dataNascimento}
            onChange={(e) => update("dataNascimento", e.target.value)}
          />
        </label>
        <label className={cx("field field-span-2")}>
          <span>
            Naturalidade <b>*</b>
          </span>
          <Input
            bare
            id="naturalidade"
            error={
              errors.find((error) => error.field === "naturalidade")?.message
            }
            className={cx(inputClass("naturalidade"))}
            value={data.naturalidade}
            onChange={(e) => update("naturalidade", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            UF nascimento <b>*</b>
          </span>
          <Input
            bare
            id="ufNascimento"
            error={
              errors.find((error) => error.field === "ufNascimento")?.message
            }
            maxLength={2}
            className={cx(inputClass("ufNascimento"))}
            value={data.ufNascimento}
            onChange={(e) =>
              update("ufNascimento", e.target.value.toUpperCase())
            }
          />
        </label>
        <label className={cx("field")}>
          <span>Nacionalidade</span>
          <Input
            bare
            id="nacionalidade"
            value={data.nacionalidade}
            onChange={(e) => update("nacionalidade", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>
            Estado civil <b>*</b>
          </span>
          <Input
            bare
            id="estadoCivil"
            error={
              errors.find((error) => error.field === "estadoCivil")?.message
            }
            className={cx(inputClass("estadoCivil"))}
            value={data.estadoCivil}
            onChange={(e) => update("estadoCivil", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Sexo</span>
          <Input
            bare
            id="sexo"
            value={data.sexo}
            onChange={(e) => update("sexo", e.target.value)}
          />
        </label>
        <label className={cx("field field-checkbox")}>
          <Input
            bare
            type="checkbox"
            checked={data.possuiDeficiencia}
            onChange={(e) => update("possuiDeficiencia", e.target.checked)}
          />
          <span>Possui deficiência</span>
        </label>
        {data.possuiDeficiencia && (
          <label className={cx("field field-span-4")}>
            <span>
              Tipo de deficiência <b>*</b>
            </span>
            <Input
              bare
              id="tipoDeficiencia"
              error={
                errors.find((error) => error.field === "tipoDeficiencia")
                  ?.message
              }
              className={cx(inputClass("tipoDeficiencia"))}
              value={data.tipoDeficiencia}
              onChange={(e) => update("tipoDeficiencia", e.target.value)}
            />
          </label>
        )}
      </div>

      <h3 className={cx("subsection-title")}>Documentos</h3>
      <div className={cx("rec-grid rec-grid-4")}>
        <label className={cx("field")}>
          <span>Órgão emissor do RG</span>
          <Input
            bare
            id="rgEmissor"
            value={data.rgEmissor}
            onChange={(e) => update("rgEmissor", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>UF do RG</span>
          <Input
            bare
            id="rgUf"
            maxLength={2}
            value={data.rgUf}
            onChange={(e) => update("rgUf", e.target.value.toUpperCase())}
          />
        </label>
        <label className={cx("field")}>
          <span>Data de emissão do RG</span>
          <Input
            bare
            id="rgData"
            type="date"
            value={data.rgData}
            onChange={(e) => update("rgData", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>PIS/PASEP</span>
          <Input
            bare
            id="pisPasep"
            value={data.pisPasep}
            onChange={(e) => update("pisPasep", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Título de eleitor</span>
          <Input
            bare
            id="tituloEleitor"
            value={data.tituloEleitor}
            onChange={(e) => update("tituloEleitor", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Zona</span>
          <Input
            bare
            id="zonaEleitoral"
            value={data.zonaEleitoral}
            onChange={(e) => update("zonaEleitoral", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Seção</span>
          <Input
            bare
            id="secaoEleitoral"
            value={data.secaoEleitoral}
            onChange={(e) => update("secaoEleitoral", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>UF eleitoral</span>
          <Input
            bare
            id="eleitorUf"
            maxLength={2}
            value={data.eleitorUf}
            onChange={(e) => update("eleitorUf", e.target.value.toUpperCase())}
          />
        </label>
        <label className={cx("field")}>
          <span>CTPS</span>
          <Input
            bare
            id="ctps"
            value={data.ctps}
            onChange={(e) => update("ctps", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Série da CTPS</span>
          <Input
            bare
            id="ctpsSerie"
            value={data.ctpsSerie}
            onChange={(e) => update("ctpsSerie", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>UF da CTPS</span>
          <Input
            bare
            id="ctpsUf"
            maxLength={2}
            value={data.ctpsUf}
            onChange={(e) => update("ctpsUf", e.target.value.toUpperCase())}
          />
        </label>
        <label className={cx("field")}>
          <span>Emissão da CTPS</span>
          <Input
            bare
            id="ctpsEmissao"
            type="date"
            value={data.ctpsEmissao}
            onChange={(e) => update("ctpsEmissao", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Conselho regional nº</span>
          <Input
            bare
            id="conselhoNumero"
            value={data.conselhoNumero}
            onChange={(e) => update("conselhoNumero", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Órgão do conselho</span>
          <Input
            bare
            id="conselhoOrgao"
            value={data.conselhoOrgao}
            onChange={(e) => update("conselhoOrgao", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Reservista</span>
          <Input
            bare
            id="reservista"
            value={data.reservista}
            onChange={(e) => update("reservista", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Órgão reservista</span>
          <Input
            bare
            id="orgaoReservista"
            value={data.orgaoReservista}
            onChange={(e) => update("orgaoReservista", e.target.value)}
          />
        </label>
        <label className={cx("field field-span-2")}>
          <span>CNH</span>
          <Input
            bare
            id="cnh"
            value={data.cnh}
            onChange={(e) => update("cnh", e.target.value)}
          />
        </label>
        <label className={cx("field")}>
          <span>Categoria da CNH</span>
          <Input
            bare
            id="cnhCategoria"
            value={data.cnhCategoria}
            onChange={(e) => update("cnhCategoria", e.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
