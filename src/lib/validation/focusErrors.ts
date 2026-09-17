export function focusErrors() {
  window.requestAnimationFrame(() =>
    document.querySelector<HTMLElement>("[data-error-summary]")?.focus(),
  );
}
