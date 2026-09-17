import type {
  Ocorrencia,
  ServidorInfo,
} from "../features/ocorrenciaPonto/ocorrenciaPonto.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface PdfProps {
  servidorInfo: ServidorInfo;
  ocorrencias: Ocorrencia[];
}

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, color: "#000" },
  header: { textAlign: "center", marginBottom: 15 },
  title: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  subtitle: { fontSize: 9, textAlign: "center", marginBottom: 15 },
  section: { border: "1px solid #000", padding: 10, marginBottom: 10 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    backgroundColor: "#E0E0E0",
    padding: 3,
    textAlign: "center",
    marginBottom: 10,
  },
  row: { flexDirection: "row", width: "100%" },
  col: { flex: 1, paddingRight: 10 },
  fieldContainer: { marginBottom: 12 },
  fieldLabel: { fontSize: 9, fontFamily: "Helvetica" },
  fieldValue: {
    borderBottom: "1px dotted #000",
    minHeight: 14,
    padding: 2,
    fontSize: 10,
  },
  declarationText: { fontSize: 9, textAlign: "justify", lineHeight: 1.4 },
  signatureSection: { marginTop: 25, textAlign: "center" },
  signatureLine: {
    width: "60%",
    borderBottom: "1px solid #000",
    margin: "30px auto 0 auto",
  },

  ocorrenciaText: {
    fontSize: 9,
    marginBottom: 3,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  justificativaValue: {
    fontSize: 8,
    paddingTop: 2,
    fontFamily: "Helvetica-Oblique",
  },
});

const OcorrenciaPontoPdf = ({ servidorInfo, ocorrencias }: PdfProps) => {
  const currentDate = new Date();
  const dia = String(currentDate.getDate()).padStart(2, "0");
  const mes = currentDate.toLocaleString("pt-BR", { month: "long" });
  const ano = currentDate.getFullYear();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return " ";
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.bold}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
          <Text style={{ fontSize: 9 }}>
            Rua José de Santana, 470, Centro-CEP: 38700-052-Patos de Minas - MG
          </Text>
        </View>
        <Text style={styles.title}>OCORRÊNCIA DE PONTO</Text>
        <Text style={styles.subtitle}>(Portaria nº 1775/2023)</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SERVIDOR DO PODER LEGISLATIVO</Text>
          {/* ESTRUTURA CORRIGIDA PARA EXIBIR OS DADOS */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Servidor:</Text>
            <Text style={styles.fieldValue}>
              {servidorInfo.servidor || " "}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>Matrícula:</Text>
              <Text style={styles.fieldValue}>
                {servidorInfo.matricula || " "}
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>Cargo/Função:</Text>
              <Text style={styles.fieldValue}>{servidorInfo.cargo || " "}</Text>
            </View>
          </View>
        </View>

        {ocorrencias.map((ocorrencia, index) => (
          <View key={ocorrencia.id} style={styles.section} wrap={false}>
            <Text
              style={{ ...styles.sectionTitle, backgroundColor: "#F0F0F0" }}
            >
              OCORRÊNCIA {index + 1}
            </Text>
            <Text style={styles.ocorrenciaText}>
              <Text style={styles.bold}>Data:</Text>{" "}
              {formatDate(ocorrencia.data)}
              <Text style={styles.bold}> Horário:</Text>{" "}
              {ocorrencia.horario || "N/A"}
              <Text style={styles.bold}> Referente:</Text>{" "}
              {ocorrencia.referente === "dia" ? "[X] dia" : "[ ] dia"}{" "}
              {ocorrencia.referente === "entrada"
                ? "[X] entrada"
                : "[ ] entrada"}{" "}
              {ocorrencia.referente === "saida" ? "[X] saída" : "[ ] saída"}
            </Text>
            <Text style={styles.ocorrenciaText}>
              <Text style={styles.bold}>Justificativa:</Text>
              <Text style={styles.justificativaValue}>
                {" "}
                {ocorrencia.justificativa || " "}
              </Text>
            </Text>
          </View>
        ))}

        <Text style={styles.declarationText}>
          DECLARO, para fins de direito, sob as penas da Lei, que as informações
          prestadas são verdadeiras, e que estou ciente de que a falsidade dessa
          declaração configura crime previsto no art. 299 do Código Penal
          Brasileiro, passível de apuração na forma da Lei.
        </Text>
        <Text style={{ ...styles.signatureSection, marginTop: 15 }}>
          Nestes Termos, Peço Deferimento.
        </Text>
        <Text style={{ ...styles.signatureSection, marginTop: 5 }}>
          Patos de Minas, {dia} de {mes} de {ano}.
        </Text>
        <View style={styles.signatureSection}>
          <View style={{ ...styles.signatureLine, width: "50%" }}></View>
          <Text>Servidor</Text>
        </View>

        <View style={{ ...styles.section, marginTop: 20 }}>
          <Text style={styles.sectionTitle}>CHEFIA IMEDIATA</Text>
          <Text style={{ marginBottom: 20 }}>
            Ciente:{" "}
            <Text style={{ fontFamily: "Helvetica-Oblique" }}>
              {servidorInfo.chefia ||
                ".................................................................."}
            </Text>
          </Text>
          <View style={{ ...styles.row, alignItems: "flex-end" }}>
            <Text style={{ flex: 3 }}>
              ( ) Deferido e encaminho para o Responsável pelo controle de
              pontos.
            </Text>
            <View style={{ flex: 1, textAlign: "center" }}>
              <View
                style={{ borderBottom: "1px dotted #000", height: 16 }}
              ></View>
              <Text style={{ fontSize: 8 }}>Data</Text>
            </View>
          </View>
          <Text style={{ marginTop: 8 }}>
            ( ) Indeferido, pelo motivo:
            ....................................................................................................
          </Text>
          <View
            style={{
              ...styles.signatureSection,
              marginTop: 20,
              marginBottom: 0,
            }}
          >
            <View style={{ ...styles.signatureLine, width: "50%" }}></View>
            <Text>Chefia Imediata</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OcorrenciaPontoPdf;
