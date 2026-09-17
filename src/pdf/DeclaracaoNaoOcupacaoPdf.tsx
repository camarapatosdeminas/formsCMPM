import type { FormData } from "../features/declaracaoNaoOcupacao/declaracaoNaoOcupacao.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { getApplicationDate } from "../lib/pdf/applicationDate";

const currentDate = getApplicationDate();
const formattedDate = currentDate.toLocaleDateString("pt-BR");

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 12, padding: 60, lineHeight: 1.5 },
  title: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 40,
    textDecoration: "underline",
  },
  body: { textAlign: "justify" },
  bold: { fontFamily: "Helvetica-Bold" },
  signatureSection: { marginTop: 80, alignItems: "center" },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "80%",
  },
  signatureText: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: "Helvetica-Oblique",
  },
  dateText: { textAlign: "left", marginTop: 40 },
});

const DeclaracaoNaoOcupacaoPdf = ({ formData }: { formData: FormData }) => {
  return (
    <Document>
      {/* A CORREÇÃO ESTÁ AQUI: de "AA4" para "A4" */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          DECLARAÇÃO QUANTO A OCUPAÇÃO DE CARGOS PÚBLICOS
        </Text>

        <Text style={styles.body}>
          Eu,{" "}
          <Text style={styles.bold}>
            {formData.nome || "________________________________"}
          </Text>
          , portador do CPF{" "}
          <Text style={styles.bold}>
            {formData.cpf || "____________________"}
          </Text>
          , residente a Rua{" "}
          <Text style={styles.bold}>
            {formData.rua || "________________________________"}
          </Text>
          , nº <Text style={styles.bold}>{formData.numero || "______"}</Text>{" "}
          nesta cidade, declaro, sob as penas da lei, para fins de nomeação e
          posse no cargo{" "}
          <Text style={styles.bold}>
            {formData.cargo || "____________________"}
          </Text>
          , não ocupar cargo público em âmbito municipal, estadual e federal, ou
          autarquia.
        </Text>

        <Text
          style={styles.dateText}
        >{`Patos de Minas, ${formattedDate}`}</Text>

        <View style={styles.signatureSection}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>
            {formData.nome || "Assinatura do Servidor"}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DeclaracaoNaoOcupacaoPdf;
