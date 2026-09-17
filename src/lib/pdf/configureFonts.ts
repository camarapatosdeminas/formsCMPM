import type { Font } from "@react-pdf/renderer";

/** The original eager Recadastramento import applied this rule to every PDF. */
export function configureFonts(
  font: Pick<typeof Font, "registerHyphenationCallback">,
) {
  font.registerHyphenationCallback((word) =>
    word.length <= 24 ? [word] : (word.match(/.{1,18}/g) ?? [word]),
  );
}
