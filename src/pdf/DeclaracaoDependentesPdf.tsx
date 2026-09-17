import type {
  Dependente,
  ServidorInfo,
} from "../features/declaracaoDependentes/declaracaoDependentes.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 8, padding: 50 },
  header: { textAlign: "center", marginBottom: 20 },
  bold: { fontFamily: "Helvetica-Bold" },
  title: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: { fontSize: 12, marginBottom: 15 },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableColHeader: {
    padding: 4,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  tableCol: {
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: "#000",
    minHeight: 18,
  }, // Adicionado minHeight
  obsSection: { marginTop: 15 },
  obsText: {
    fontSize: 8,
    textAlign: "justify",
    lineHeight: 1.4,
    marginBottom: 3,
  },
  declarationText: { fontSize: 10, textAlign: "justify", marginTop: 20 },
  signatureSection: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  signatureBlock: { alignItems: "center", width: "45%" },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "100%",
  },
  signatureText: { fontSize: 10, marginTop: 3 },
});

const DeclaracaoDependentesPdf = ({
  servidorInfo,
  dependentes,
}: {
  servidorInfo: ServidorInfo;
  dependentes: Dependente[];
}) => {
  // 1. Pegando a data atual para usar no PDF
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          DECLARAÇÃO DE DEPENDENTES Para fins de Imposto de Renda
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 11 }}>
            Nome do Servidor: {servidorInfo.nome || "_____________________"}
          </Text>
          <Text style={{ fontSize: 11 }}>
            Matrícula: {servidorInfo.matricula || "___________"}
          </Text>
        </View>

        <Text style={styles.subtitle}>Relação dos dependentes:</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={{ ...styles.tableColHeader, flex: 3 }}>
              <Text>DEPENDENTE</Text>
            </View>
            <View style={{ ...styles.tableColHeader, flex: 2 }}>
              <Text>DATA DE NASCIMENTO</Text>
            </View>
            <View style={{ ...styles.tableColHeader, flex: 2 }}>
              <Text>PARENTESCO</Text>
            </View>
            <View style={{ ...styles.tableColHeader, flex: 2 }}>
              <Text>CPF</Text>
            </View>
            <View
              style={{ ...styles.tableColHeader, flex: 1, borderRightWidth: 0 }}
            >
              <Text>DEPENDÊNCIA IR</Text>
            </View>
          </View>
          {dependentes.map((dep) => (
            <View key={dep.id} style={styles.tableRow}>
              <View style={{ ...styles.tableCol, flex: 3 }}>
                <Text>{dep.nome}</Text>
              </View>
              <View style={{ ...styles.tableCol, flex: 2 }}>
                <Text>{dep.dataNascimento}</Text>
              </View>
              <View style={{ ...styles.tableCol, flex: 2 }}>
                <Text>{dep.parentesco}</Text>
              </View>
              <View style={{ ...styles.tableCol, flex: 2 }}>
                <Text>{dep.cpf}</Text>
              </View>
              {/* 3. Lógica do 'Sim' ou 'Não' */}
              <View
                style={{
                  ...styles.tableCol,
                  flex: 1,
                  textAlign: "center",
                  borderRightWidth: 0,
                }}
              >
                <Text>{dep.isDependenteIR ? "Sim" : "Não"}</Text>
              </View>
            </View>
          ))}
          {Array(Math.max(0, 10 - dependentes.length))
            .fill(0)
            .map((_, i) => (
              <View
                key={`blank-${i}`}
                style={{
                  ...styles.tableRow,
                  borderBottomWidth:
                    i === Math.max(0, 10 - dependentes.length) - 1 ? 0 : 1,
                }}
              >
                <View style={{ ...styles.tableCol, flex: 3 }}>
                  <Text> </Text>
                </View>
                <View style={{ ...styles.tableCol, flex: 2 }}>
                  <Text> </Text>
                </View>
                <View style={{ ...styles.tableCol, flex: 2 }}>
                  <Text> </Text>
                </View>
                <View style={{ ...styles.tableCol, flex: 2 }}>
                  <Text> </Text>
                </View>
                <View
                  style={{ ...styles.tableCol, flex: 1, borderRightWidth: 0 }}
                >
                  <Text> </Text>
                </View>
              </View>
            ))}
        </View>

        <View style={styles.obsSection}>
          <Text style={styles.obsText}>
            Observação: Deverá ser apresentada junto a esta ficha, cópia da
            certidão de casamento quando o parentesco for “esposa (o)”.
          </Text>
          <Text style={styles.obsText}>
            Cópia da certidão de nascimento se o parentesco for: companheiro
            (a); filho (a); enteado (a); menor sob guarda ou tutela.
          </Text>
          <Text style={styles.obsText}>
            Para dependente maior de 21 anos se estudante, deverá ser
            apresentada declaração expedida pela instituição, com data de
            emissão recente, indicando o ano/semestre que está cursando.
          </Text>
          <Text style={styles.obsText}>
            Toda a vez em que ocorrer alteração na relação dos seus dependentes
            (inclusão de novo dependente ou exclusão), deverá ser assinada nova
            declaração, com a alteração necessária.
          </Text>
        </View>

        <Text style={styles.declarationText}>
          Declaro, na forma da Lei, que as informações prestadas são
          verdadeiras, tendo conhecimento da legislação e das conseqüências
          decorrentes de falsa declaração.
        </Text>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text
              style={{
                ...styles.signatureLine,
                textAlign: "center",
                fontSize: 10,
              }}
            >{`Patos de Minas, ${formattedDate}`}</Text>
            <Text style={styles.signatureText}>LOCAL E DATA</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>ASSINATURA DO SERVIDOR</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DeclaracaoDependentesPdf;
