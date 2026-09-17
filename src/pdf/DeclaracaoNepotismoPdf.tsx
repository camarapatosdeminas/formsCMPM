import type { FormData } from "../features/declaracaoNepotismo/declaracaoNepotismo.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    padding: "1in",
    lineHeight: 1.5,
  },
  title: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 20,
    textDecoration: "underline",
  },
  body: { textAlign: "justify" },
  signatureSection: { marginTop: 60, alignItems: "center" },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "80%",
  },
  signatureText: { fontSize: 10, marginTop: 4, textAlign: "center" },
  dateText: { textAlign: "left", marginTop: 40 },
});

const DeclaracaoNepotismoPdf = ({ formData }: { formData: FormData }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>DECLARAÇÃO</Text>

        <Text style={styles.body}>
          Declaro para os fins de provimento em cargo comissionado junto ao
          Poder Legislativo de Patos de Minas que fui devidamente informado das
          restrições contidas no art. 1º da Lei Complementar Municipal nº 274,
          de 8 de janeiro de 2007 e na Súmula Vinculante nº 13 do STF, que vedam
          a prática de nepotismo:
        </Text>
        <Text
          style={{
            ...styles.body,
            fontStyle: "italic",
            fontSize: 11,
            marginTop: 15,
            marginLeft: 20,
          }}
        >
          Art. 1º É vedada a prática de nepotismo no âmbito do Poder Legislativo
          e dos Órgãos da Administração Direta e Indireta do Poder Executivo
          Municipal, sendo nulos os atos assim caracterizados.
        </Text>
        <Text
          style={{
            ...styles.body,
            fontStyle: "italic",
            fontSize: 11,
            marginTop: 15,
            marginLeft: 20,
          }}
        >
          Súmula Vinculante nº 13 do STF: A nomeação de cônjuge, companheiro ou
          parente em linha reta, colateral ou por afinidade, até o terceiro
          grau, inclusive, da autoridade nomeante ou de servidor da mesma pessoa
          jurídica, investido em cargo de direção, chefia ou assessoramento,
          para o exercício de cargo em comissão ou de confiança, ou, ainda, de
          função gratificada na Administração Pública direta e indireta, em
          qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos
          municípios, compreendido o ajuste mediante designações recíprocas,
          viola a Constituição Federal.
        </Text>

        <Text style={{ ...styles.body, marginTop: 20 }}>
          Declaro, ainda, que não me encontro inserido nas referidas vedações.
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

export default DeclaracaoNepotismoPdf;
