import type { FormData } from "../features/adiantamento13/adiantamento13.types";
// src/pdf/Adiantamento13Pdf.tsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 11, padding: 50, lineHeight: 1.5 },
  header: { textAlign: "center", marginBottom: 20 },
  bold: { fontFamily: "Helvetica-Bold" },
  headerText: { fontSize: 10, color: "grey" },
  title: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    border: "1px solid black",
    padding: 5,
    margin: "20px 0",
  },
  section: { border: "1px solid #000", marginBottom: 15 },
  sectionTitle: {
    padding: 4,
    backgroundColor: "#E0E0E0",
    fontFamily: "Helvetica-Bold",
    borderBottom: "1px solid #000",
  },
  content: { padding: 8 },
  row: { flexDirection: "row", marginBottom: 8 },
  col: { flex: 1, paddingRight: 10 },
  fieldLabel: { fontSize: 9, fontFamily: "Helvetica-Oblique" },
  fieldValue: { borderBottom: "1px dotted #000", minHeight: 12 },
  bodyText: { textAlign: "justify", marginTop: 15 },
  signatureSection: { marginTop: 60, alignItems: "center" },
  signatureLine: { borderBottom: "1px solid #000", width: "70%" },
  signatureText: { fontSize: 10, marginTop: 3 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "grey",
  },
});

const Adiantamento13Pdf = ({ formData }: { formData: FormData }) => {
  const currentDate = new Date();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.bold}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
          <Text style={styles.headerText}>
            Rua José de Santana, 470, Centro CEP: 38700-052-Patos de Minas - MG
          </Text>
          <Text style={styles.headerText}>
            Tel: (34) 3821-8455-camarapatos@camarapatos.mg.gov.br -
            www.camarapatos.mg.gov.br
          </Text>
        </View>

        <Text style={styles.title}>
          REQUERIMENTO DE ANTECIPAÇÃO 1ª PARCELA DO 13° SALÁRIO
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Dados do requisitante</Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Nome</Text>
                <Text style={styles.fieldValue}>{formData.nome || " "}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Matrícula</Text>
                <Text style={styles.fieldValue}>
                  {formData.matricula || " "}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>CPF</Text>
                <Text style={styles.fieldValue}>{formData.cpf || " "}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Lotação</Text>
                <Text style={styles.fieldValue}>{formData.lotacao || " "}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={{ fontFamily: "Helvetica-Bold" }}>2. Assunto:</Text>
        <Text style={styles.bodyText}>
          Requerimento de antecipação da primeira parcela do 13º salário.
        </Text>
        <Text style={styles.bodyText}>
          Prezada(o) responsável pelo: Recursos Humanos
        </Text>
        <Text style={styles.bodyText}>
          Com base na Portaria nº{" "}
          <Text style={{ ...styles.fieldValue, fontFamily: "Helvetica-Bold" }}>
            {formData.portaria || "__________"}
          </Text>
          , requeiro a antecipação do pagamento da primeira parcela do meu 13°
          vencimento.
        </Text>

        <Text style={{ textAlign: "right", marginTop: 40 }}>
          Patos de Minas,{" "}
          {currentDate.toLocaleDateString("pt-BR", { day: "2-digit" })} de{" "}
          {currentDate.toLocaleDateString("pt-BR", { month: "long" })} de{" "}
          {currentDate.getFullYear()}.
        </Text>

        <View style={styles.signatureSection}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Assinatura do(a) Servidor(a)</Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>
            Rua José de Santana, 470, Centro - CEP: 38700-052-Patos de Minas-MG
            Tel: (34) 3030-1134-camarapatos@camarapatos.mg.gov.br
            www.camarapatos.mg.gov.br
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Adiantamento13Pdf;
