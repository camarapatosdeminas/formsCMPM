// Não ocupação used the date of the eager module import, i.e. application startup.
let applicationDate: Date | undefined;
export function initializeDocumentClock() {
  applicationDate ??= new Date();
}
export function getApplicationDate() {
  initializeDocumentClock();
  return new Date(applicationDate!);
}
