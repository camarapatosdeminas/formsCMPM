import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea, RadioGroup } from "../../components/ui/Controls";
import {
  ErrorSummary,
  FormGrid,
  FormSection,
  PdfActions,
} from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFeriasDefaults } from "./ferias.defaults";
import { feriasSchema } from "./ferias.schema";
import type { FeriasData } from "./ferias.types";
import styles from "./FeriasPage.module.css";
export default function FeriasPage() {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FeriasData>({
    defaultValues: createFeriasDefaults(),
    resolver: zodResolver(feriasSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const values = watch();
  const pdf = usePdf(values);
  const generate = handleSubmit(() => {
    void pdf.generate(async (data) => {
      const { default: Document } = await import("../../pdf/FeriasPdfDocument");
      return <Document data={data} />;
    });
  });
  const fieldErrors = Object.entries(errors).map(([field, error]) => ({
    field,
    message: String(error.message),
  }));
  return (
    <form className={styles.form} noValidate onSubmit={generate}>
      <p className={styles.help}>
        Os dados de identificação e a data inicial são opcionais. A
        justificativa é obrigatória somente para períodos diferentes de 30 dias.
      </p>
      <details className={styles.legal}>
        <summary>Orientações legais · Lei Complementar nº 2/1990</summary>
        <p>LEI COMPLEMENTAR Nº 2/1990</p>
        <p>
          DISPÕE SOBRE O ESTATUTO DOS SERVIDORES PÚBLICOS DO MUNICÍPIO DE PATOS
          DE MINAS.
        </p>
        <p>
          Art. 69 É proibida a acumulação de férias, salvo por absoluta
          necessidade do serviço e pelo Maximo de 2 (dois) anos.
        </p>
        <p>
          § 1º Em casos excepcionais, à critério da administração, as férias
          poderão ser gozadas em 2 (dois) períodos, nenhum dos quais poderá ser
          inferior a 10 (dez) dias.
        </p>
        <p>
          § 2º Somente serão considerados como não gozadas, por absoluta
          necessidade do serviço, as férias que o servidor deixar de gozar,
          mediante decisão escrita do Presidente da Câmara, exarada em processo
          e publicada na forma legal, dentro do exercício a que elas
          correspondem.
        </p>
      </details>
      <ErrorSummary errors={fieldErrors} />
      <FormSection title="1. Dados do requisitante">
        <FormGrid>
          <Input
            id="nome"
            label="Nome"
            autoComplete="name"
            {...register("nome")}
          />
          <Input id="matricula" label="Matrícula" {...register("matricula")} />
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="cpf"
                label="CPF"
                mask="cpf"
                error={errors.cpf?.message}
                placeholder="000.000.000-00"
              />
            )}
          />
          <Input id="lotacao" label="Lotação" {...register("lotacao")} />
        </FormGrid>
      </FormSection>
      <FormSection title="2. Período de gozo">
        <RadioGroup legend="Quantos dias de férias?">
          <Controller
            name="periodoGozo"
            control={control}
            render={({ field }) => (
              <>
                {(["30", "20", "15", "10"] as const).map((periodo) => (
                  <label key={periodo}>
                    <Input
                      type="radio"
                      name={field.name}
                      value={periodo}
                      checked={field.value === periodo}
                      onBlur={field.onBlur}
                      onChange={() => {
                        field.onChange(periodo);
                        if (periodo === "30")
                          setValue("justificativa", "", {
                            shouldValidate: true,
                          });
                      }}
                    />
                    {periodo} dias
                  </label>
                ))}
              </>
            )}
          />
        </RadioGroup>
        <div className={styles.period}>
          <Input
            id="dataInicio"
            label="A partir de"
            type="date"
            {...register("dataInicio")}
          />
        </div>
        <Textarea
          id="justificativa"
          label={`Justificativa${values.periodoGozo !== "30" ? " (obrigatória)" : ""}`}
          hint={
            values.periodoGozo === "30"
              ? "Não é necessária para 30 dias. Ao voltar a esse período, a justificativa é apagada."
              : "Explique a solicitação de período inferior a 30 dias."
          }
          disabled={values.periodoGozo === "30"}
          error={errors.justificativa?.message}
          {...register("justificativa")}
        />
      </FormSection>
      <PdfActions
        {...pdf}
        onGenerate={() => void generate()}
        fileName="requerimento_ferias.pdf"
      />
    </form>
  );
}
