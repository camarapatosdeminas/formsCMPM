import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  applyMask,
  caretAfterMask,
  maskError,
  type Mask,
} from "../../lib/formatters/masks";
import styles from "./Controls.module.css";
import { moneyPreview } from "../../lib/formatters/money";

type FieldProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: string;
  bare?: boolean;
};
export function FormField({
  id,
  label,
  hint,
  error,
  children,
}: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {hint && (
        <span id={`${id}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
export function Input({
  label,
  hint: suppliedHint,
  error,
  bare,
  mask,
  money = false,
  validateFormat = true,
  ref,
  ...props
}: ComponentProps<"input"> &
  FieldProps & { mask?: Mask; validateFormat?: boolean; money?: boolean }) {
  const generated = useId();
  const id = props.id || generated;
  const internal = useRef<HTMLInputElement>(null);
  const caret = useRef<number | null>(null);
  const [touched, setTouched] = useState(false);
  const value = props.value === undefined ? undefined : String(props.value);
  const preview = money ? moneyPreview(value || "") : "";
  const hint =
    suppliedHint || (preview ? `Valor informado: ${preview}` : undefined);
  const formatted =
    mask && value !== undefined ? applyMask(value, mask) : props.value;
  const formatError =
    mask && validateFormat ? maskError(String(formatted ?? ""), mask) : "";
  const message = error || (touched ? formatError : "");
  useLayoutEffect(() => {
    if (caret.current !== null && internal.current === document.activeElement)
      internal.current?.setSelectionRange(caret.current, caret.current);
    caret.current = null;
  });
  const check = props.type === "radio" || props.type === "checkbox";
  const control = (
    <input
      {...props}
      id={id}
      ref={(node) => {
        internal.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      }}
      value={formatted}
      inputMode={
        mask && mask !== "cnpj"
          ? "numeric"
          : money
            ? "decimal"
            : props.inputMode
      }
      className={[check ? styles.check : styles.control, props.className]
        .filter(Boolean)
        .join(" ")}
      data-format-error={formatError || undefined}
      data-field-label={typeof label === "string" ? label : undefined}
      aria-invalid={message ? true : props["aria-invalid"]}
      aria-describedby={
        [
          props["aria-describedby"],
          hint ? `${id}-hint` : "",
          message ? `${id}-error` : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined
      }
      onChange={(event) => {
        if (mask) {
          const raw = event.target.value;
          const next = applyMask(raw, mask);
          caret.current = caretAfterMask(
            raw,
            event.target.selectionStart ?? raw.length,
            next,
          );
          event.target.value = next;
        }
        props.onChange?.(event);
      }}
      onBlur={(event) => {
        setTouched(true);
        props.onBlur?.(event);
      }}
    />
  );
  if (check || bare)
    return (
      <>
        {control}
        {hint && (
          <span className={styles.hint} id={`${id}-hint`}>
            {hint}
          </span>
        )}
        {message && (
          <span className={styles.error} id={`${id}-error`}>
            {message}
          </span>
        )}
      </>
    );
  return (
    <FormField id={id} label={label} hint={hint} error={message}>
      {control}
    </FormField>
  );
}
export function Textarea({
  label,
  hint,
  error,
  bare,
  ...props
}: ComponentProps<"textarea"> & FieldProps) {
  const generated = useId();
  const id = props.id || generated;
  const control = (
    <textarea
      {...props}
      id={id}
      className={`${styles.control} ${props.className || ""}`}
      aria-invalid={error ? true : props["aria-invalid"]}
      aria-describedby={
        [
          props["aria-describedby"],
          hint ? `${id}-hint` : "",
          error ? `${id}-error` : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined
      }
    />
  );
  return bare ? (
    control
  ) : (
    <FormField id={id} label={label} hint={hint} error={error}>
      {control}
    </FormField>
  );
}
export function Select({
  label,
  hint,
  error,
  bare,
  ...props
}: ComponentProps<"select"> & FieldProps) {
  const generated = useId();
  const id = props.id || generated;
  const control = (
    <select
      {...props}
      id={id}
      className={`${styles.control} ${props.className || ""}`}
      aria-invalid={error ? true : props["aria-invalid"]}
      aria-describedby={
        [
          props["aria-describedby"],
          hint ? `${id}-hint` : "",
          error ? `${id}-error` : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined
      }
    />
  );
  return bare ? (
    control
  ) : (
    <FormField id={id} label={label} hint={hint} error={error}>
      {control}
    </FormField>
  );
}
export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: "primary" | "secondary" }) {
  return (
    <button
      type="button"
      {...props}
      className={[
        styles.button,
        variant === "secondary" ? styles.secondary : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
export function Checkbox(props: ComponentProps<typeof Input>) {
  return <Input {...props} type="checkbox" />;
}
export function RadioGroup({
  legend,
  children,
}: {
  legend: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={styles.choices}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
