/** Presentation only: never coerces or changes the value passed to the document. */
export function moneyPreview(value: string): string {
  if (!value || !/^[+-]?\d+(?:,\d*)?$/.test(value)) return "";
  const [integer, decimal] = value.split(",");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${grouped}${decimal === undefined ? "" : `,${decimal}`}`;
}
