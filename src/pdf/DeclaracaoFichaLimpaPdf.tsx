import type { FormData } from "../features/declaracaoFichaLimpa/declaracaoFichaLimpa.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    padding: "1.2in",
    lineHeight: 1.5,
  },
  title: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 40,
    textDecoration: "underline",
  },
  body: { textAlign: "justify" },
  signatureSection: { marginTop: 80, alignItems: "center" },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "80%",
  },
  signatureText: { fontSize: 10, marginTop: 4, textAlign: "center" },
  dateText: { textAlign: "left", marginTop: 40 },
});

const DeclaracaoFichaLimpaPdf = ({ formData }: { formData: FormData }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>DECLARAÇÃO</Text>

        <Text style={styles.body}>
          Declaro para os fins de provimento em cargo comissionado junto ao
          Poder Legislativo de Patos de Minas que fui devidamente informado das
          restrições contidas no art. 1º da Lei Complementar Municipal nº 356,
          de 23 de março de 2011 e que não me encontro inserido nas vedações
          constantes da referida lei complementar.
        </Text>

        <Text style={styles.dateText}>Patos de Minas, {formattedDate}.</Text>

        <View style={styles.signatureSection}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>
            {formData.nome || "NOME"} - CPF: {formData.cpf || "CPF"}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DeclaracaoFichaLimpaPdf;
