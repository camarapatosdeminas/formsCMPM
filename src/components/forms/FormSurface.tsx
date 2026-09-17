import { useRef, useState, type ReactNode } from "react";
import { ErrorSummary, type FieldError } from "./FormParts";
import styles from "./FormSurface.module.css";
import { focusErrors } from "../../lib/validation/focusErrors";
export function FormSurface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FieldError[]>([]);
  return (
    <div
      ref={root}
      className={`${styles.surface} ${className || ""}`}
      onChangeCapture={(event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement)
          setErrors((current) =>
            current.filter((error) => error.field !== target.id),
          );
      }}
      onClickCapture={(event) => {
        const target = event.target instanceof Element ? event.target : null;
        const button = target?.closest("button");
        if (!button) return;
        if (button.hasAttribute("data-pdf-generate")) {
          const invalid = Array.from(
            root.current?.querySelectorAll<HTMLInputElement>(
              "input[data-format-error]",
            ) || [],
          ).filter((el) => !el.disabled && el.getClientRects().length);
          if (invalid.length) {
            focusErrors();
            event.preventDefault();
            event.stopPropagation();
            setErrors(
              invalid.map((el) => ({
                field: el.id,
                message: `${el.dataset.fieldLabel || el.name || "Campo"}: ${el.dataset.formatError}`,
              })),
            );
          }
        }
        if (
          /remover|excluir|adicionar|incluir/i.test(button.textContent || "") ||
          /remover|excluir/i.test(button.getAttribute("aria-label") || "")
        ) {
          const controls = Array.from(
            root.current?.querySelectorAll<HTMLElement>(
              "input,select,textarea,button",
            ) || [],
          );
          const index = controls.indexOf(button);
          window.requestAnimationFrame(() => {
            if (!button.isConnected) {
              const remaining = controls.filter((c) => c.isConnected);
              (
                remaining[Math.min(index, remaining.length - 1)] || root.current
              )?.focus();
            } else if (/adicionar|incluir/i.test(button.textContent || "")) {
              const added = Array.from(
                root.current?.querySelectorAll<HTMLElement>(
                  "input,select,textarea",
                ) || [],
              ).filter((c) => !controls.includes(c));
              added[0]?.focus();
            }
          });
        }
      }}
    >
      <ErrorSummary errors={errors} />
      {children}
    </div>
  );
}
