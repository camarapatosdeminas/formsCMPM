export type Mask = "cpf" | "cnpj" | "cep" | "phone";
export const onlyDigits = (value: string) => value.replace(/\D/g, "");
export const maskCpf = (value: string) =>
  onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
export const maskCep = (value: string) =>
  onlyDigits(value)
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
export const maskPhone = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(digits.length <= 10 ? /(\d{4})(\d)/ : /(\d{5})(\d)/, "$1-$2");
};
export const maskCnpj = (value: string) =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 14)
    .replace(/^(.{2})(.)/, "$1.$2")
    .replace(/^(.{6})(.)/, "$1.$2")
    .replace(/^(.{10})(.)/, "$1/$2")
    .replace(/^(.{15})(.)/, "$1-$2");
export const applyMask = (value: string, mask: Mask) =>
  ({ cpf: maskCpf, cnpj: maskCnpj, cep: maskCep, phone: maskPhone })[mask](
    value,
  );
export function maskError(value: string, mask: Mask): string {
  if (!value) return "";
  const count = onlyDigits(value).length;
  if (mask === "cpf" && count !== 11)
    return "Informe os 11 dígitos do CPF ou deixe o campo vazio.";
  if (mask === "cep" && count !== 8)
    return "Informe os 8 dígitos do CEP ou deixe o campo vazio.";
  if (mask === "phone" && count !== 10 && count !== 11)
    return "Informe DDD e telefone com 10 ou 11 dígitos ou deixe o campo vazio.";
  if (
    mask === "cnpj" &&
    !/^[A-Z0-9]{12}\d{2}$/.test(value.replace(/[^A-Z0-9]/g, ""))
  )
    return "Informe 12 letras ou números e os 2 dígitos finais do CNPJ, ou deixe o campo vazio.";
  return "";
}
export function caretAfterMask(raw: string, caret: number, formatted: string) {
  const count = raw.slice(0, caret).replace(/[^a-z0-9]/gi, "").length;
  if (!count) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++)
    if (/[a-z0-9]/i.test(formatted[i]) && ++seen === count) return i + 1;
  return formatted.length;
}
