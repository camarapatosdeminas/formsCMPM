import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions, ErrorSummary } from "../../components/forms/FormParts";
import { onlyDigits } from "../../lib/formatters/masks";
import { useRecadastramento } from "./useRecadastramento";
import { PackageSection } from "./sections/PackageSection";
import { IdentitySection } from "./sections/IdentitySection";
import { PersonalSection } from "./sections/PersonalSection";
import { ContactSection } from "./sections/ContactSection";
import { EmploymentSection } from "./sections/EmploymentSection";
import { AssetsSection } from "./sections/AssetsSection";
import { CouncilorSection } from "./sections/CouncilorSection";
import { DependentsSection } from "./sections/DependentsSection";
const Recadastramento = () => {
  const model = useRecadastramento();
  const { data, errors, pdf, preparePdf, packageDescription } = model;
  return (
    <FormSurface className={cx("recadastramento-shell")}>
      <div className={cx("recadastramento-hero")}>
        <span className={cx("eyebrow")}>
          Portaria nº 1.798, de 5 de abril de 2023
        </span>
        <h2>Recadastramento de vereadores e servidores</h2>
        <p>
          Preencha os blocos abaixo uma única vez. Os dados compartilhados serão
          repetidos automaticamente nos anexos aplicáveis e reunidos em um só
          PDF.
        </p>
      </div>

      <div className={cx("annex-map")} aria-label="Anexos que serão gerados">
        <div>
          <strong>Pacote selecionado</strong>
          <span>{packageDescription}</span>
        </div>
        <div>
          <strong>Conteúdo fixo</strong>
          <span>
            A íntegra da Portaria e as declarações aplicáveis serão incluídas
            automaticamente no documento.
          </span>
        </div>
        <div>
          <strong>Antes do download</strong>
          <span>
            O sistema confere identificação, contato, campos condicionais, bens
            e dependentes.
          </span>
        </div>
      </div>

      <p>
        Campos com * são obrigatórios no pacote selecionado. No contato, informe
        telefone ou celular; não é necessário preencher ambos.
      </p>
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <PackageSection model={model} />

        <IdentitySection model={model} />

        {data.tipoRecadastramento === "completo" && (
          <>
            <PersonalSection model={model} />

            <ContactSection model={model} />

            <EmploymentSection model={model} />

            <AssetsSection model={model} />

            {data.tipoPessoa === "vereador" && (
              <CouncilorSection model={model} />
            )}

            <DependentsSection model={model} />
          </>
        )}

        <ErrorSummary errors={errors} />
        <PdfActions
          {...pdf}
          onGenerate={preparePdf}
          fileName={`recadastramento-${onlyDigits(data.cpf) || "cmpm"}.pdf`}
        />
      </form>
    </FormSurface>
  );
};

export default Recadastramento;
