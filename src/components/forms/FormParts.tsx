import { type ReactNode } from "react";
import { Button } from "../ui/Controls";
import styles from "./FormParts.module.css";
export interface FieldError {
  field: string;
  message: string;
}
export function ErrorSummary({ errors }: { errors: FieldError[] }) {
  if (!errors.length) return null;
  return (
    <div
      data-error-summary
      className={styles.summary}
      tabIndex={-1}
      role="alert"
    >
      <p>
        <strong>Revise os campos indicados para continuar.</strong>
      </p>
      <ul>
        {errors.map((e, i) => (
          <li key={`${e.field}-${i}`}>
            <a
              href={`#${e.field}`}
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById(e.field);
                const control = target?.matches("input,select,textarea")
                  ? target
                  : target?.querySelector<HTMLElement>("input,select,textarea");
                (control || target)?.focus();
                (control || target)?.scrollIntoView({ block: "center" });
              }}
            >
              {e.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
export function FormGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
export function PdfActions({
  status,
  url,
  error,
  onGenerate,
  fileName,
}: {
  status: "editing" | "generating" | "ready" | "error";
  url: string;
  error: string;
  onGenerate: () => void;
  fileName: string;
}) {
  return (
    <div className={styles.actions}>
      <p>
        <strong>Conclua seu documento</strong>Revise as informações e gere o
        arquivo para download.
      </p>
      <Button
        data-pdf-generate
        onClick={onGenerate}
        disabled={status === "generating"}
      >
        {status === "generating"
          ? "Gerando PDF…"
          : status === "error"
            ? "Tentar novamente"
            : "Gerar PDF"}
      </Button>
      <div
        className={`${styles.status} ${error ? styles.error : ""}`}
        role="status"
        aria-live="polite"
      >
        {status === "generating" &&
          "Preparando o documento. Você pode continuar editando; alterações cancelam este resultado."}
        {error}
        {status === "ready" && (
          <>
            <p>PDF disponível. Alterar os dados exige uma nova geração.</p>
            <a className={styles.download} href={url} download={fileName}>
              Baixar PDF
            </a>
          </>
        )}
      </div>
    </div>
  );
}
