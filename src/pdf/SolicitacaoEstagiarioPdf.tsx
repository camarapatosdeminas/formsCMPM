import type { FormData } from "../features/solicitacaoEstagiario/solicitacaoEstagiario.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, color: "#000" },
  header: { textAlign: "center", marginBottom: 15 },
  title: {
    fontSize: 9,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
  },
  section: {
    border: "1px solid #000",
    padding: 8,
    marginBottom: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  row: { flexDirection: "row", width: "100%", marginBottom: 8 },
  col: { flex: 1, paddingRight: 10 },
  fieldLabel: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  fieldValue: {
    borderBottom: "1px dotted #000",
    minHeight: 12,
    padding: 1,
    fontSize: 10,
  },
  textAreaValue: {
    border: "1px dotted #000",
    minHeight: 35,
    padding: 3,
    fontSize: 10,
    marginTop: 3,
  },
  bold: { fontFamily: "Helvetica-Bold" },
  tableContainer: {
    flexDirection: "row",
    border: "1px solid #000",
  },
  tableMain: {
    flex: 3,
    flexDirection: "column",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderBottom: "1px solid #000",
  },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #000" },
  tableCol: { padding: 4, fontSize: 9, borderRight: "1px solid #000" },
  tableColHeader: {
    padding: 4,
    fontFamily: "Helvetica-Bold",
    borderRight: "1px solid #000",
  },
  vagasContainer: {
    flex: 1,
    flexDirection: "column",
    borderLeft: "1px solid #000",
  },
  vagasHeader: {
    backgroundColor: "#E0E0E0",
    padding: 4,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    borderBottom: "1px solid #000",
  },
  vagasContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vagasText: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
  },
  internalSection: {
    border: "1px solid #000",
    borderTop: "none",
  },
  internalSectionTitle: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#E0E0E0",
    padding: 3,
    borderTop: "1px solid #000",
  },
  internalContent: {
    padding: 8,
  },
  signatureBlock: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  signatureContainer: {
    alignItems: "center",
    paddingLeft: 10,
  },
  signatureLine: {
    borderBottom: "1px solid #000",
    width: 180,
  },
  signatureText: {
    fontSize: 9,
    marginTop: 3,
  },
});

const SolicitacaoEstagiarioPdf = ({ formData }: { formData: FormData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.bold}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
          <Text style={{ fontSize: 9 }}>
            Rua José de Santana, 470, Centro, Patos de Minas/MG CEP: 38.700-052
          </Text>
        </View>
        <Text style={styles.title}>
          ANEXO I - FORMULÁRIO DE SOLICITAÇÃO DE ESTAGIÁRIO
        </Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>SETOR:</Text>
              <Text style={styles.fieldValue}>{formData.setor || " "}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>ÁREA DE ESTÁGIO:</Text>
              <Text style={styles.fieldValue}>
                {formData.areaEstagio || " "}
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>SUPERVISOR:</Text>
              <Text style={styles.fieldValue}>
                {formData.supervisor || " "}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>CARGO:</Text>
              <Text style={styles.fieldValue}>{formData.cargo || " "}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>HORÁRIO DE ESTÁGIO:</Text>
              <Text style={styles.fieldValue}>{formData.horario || " "}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>DURAÇÃO PREVISTA (MESES):</Text>
              <Text style={styles.fieldValue}>{formData.duracao || " "}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableMain}>
            <View style={styles.tableHeader}>
              <View style={{ ...styles.tableColHeader, width: "50%" }}>
                <Text>CURSO/ÁREA</Text>
              </View>
              <View style={{ ...styles.tableColHeader, width: "20%" }}>
                <Text>PERÍODO</Text>
              </View>
              <View
                style={{
                  ...styles.tableColHeader,
                  width: "30%",
                  borderRight: 0,
                }}
              >
                <Text>NÍVEL</Text>
              </View>
            </View>
            {formData.opcoesCurso.map((opcao, index) => (
              <View
                key={opcao.id}
                style={{
                  ...styles.tableRow,
                  borderBottom: index === 2 ? 0 : "1px solid #000",
                }}
              >
                <View style={{ ...styles.tableCol, width: "50%" }}>
                  <Text>{opcao.curso}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: "20%" }}>
                  <Text>{opcao.periodo}</Text>
                </View>
                <View
                  style={{ ...styles.tableCol, width: "30%", borderRight: 0 }}
                >
                  {/* A lógica de marcação foi reintroduzida aqui */}
                  <Text>
                    {opcao.nivel === "graduacao" ? "[X]" : "[ ]"}{" "}
                    Graduação/Técnico
                  </Text>
                  <Text>
                    {opcao.nivel === "pos" ? "[X]" : "[ ]"} Pós-Graduação
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.vagasContainer}>
            <Text style={styles.vagasHeader}>Nº VAGAS</Text>
            <View style={styles.vagasContent}>
              <Text style={styles.vagasText}>{formData.vagas || " "}</Text>
            </View>
          </View>
        </View>

        <View style={{ ...styles.section, marginTop: 10 }}>
          <Text style={styles.fieldLabel}>
            ATIVIDADES A SEREM DESENVOLVIDAS:
          </Text>
          <Text style={styles.textAreaValue}>{formData.atividades}</Text>
          <Text style={{ ...styles.fieldLabel, marginTop: 8 }}>
            HABILIDADES DO ESTAGIÁRIO, DESEJÁVEIS PARA O DESENVOLVIMENTO DAS
            ATIVIDADES:
          </Text>
          <Text style={styles.textAreaValue}>{formData.habilidades}</Text>
          <Text style={{ ...styles.fieldLabel, marginTop: 8 }}>
            JUSTIFICATIVA DA SOLICITAÇÃO:
          </Text>
          <Text style={styles.textAreaValue}>{formData.justificativa}</Text>
        </View>
        <View style={styles.section}>
          <Text style={{ ...styles.bold, marginBottom: 20 }}>
            ESTÁGIO REMUNERADO: {"  "}{" "}
            {formData.remunerado === "sim" ? "[X] SIM" : "[ ] SIM"} {"  "}{" "}
            {formData.remunerado === "nao" ? "[X] NÃO" : "[ ] NÃO"}
          </Text>
          <View
            style={{
              ...styles.row,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.signatureContainer}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Ass. Solicitante</Text>
            </View>
            <Text>Data: ____/____/______</Text>
          </View>
        </View>
        <View style={styles.internalSection}>
          <Text style={styles.internalSectionTitle}>
            USO EXCLUSIVO DA DIVISÃO DE CONTABILIDADE
          </Text>
          <View style={styles.internalContent}>
            <Text style={{ marginBottom: 10, textAlign: "center" }}>
              Declaro haver dotação orçamentária e financeira suficiente para
              fazer face ao requerimento.
            </Text>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureContainer}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureText}>
                  Ass. Divisão de Contabilidade
                </Text>
              </View>
              <Text>Data: ____/____/______</Text>
            </View>
          </View>
        </View>
        <View style={styles.internalSection}>
          <Text style={styles.internalSectionTitle}>
            USO EXCLUSIVO DA PRESIDÊNCIA DA CÂMARA MUNICIPAL
          </Text>
          <View style={styles.internalContent}>
            <View
              style={{
                ...styles.row,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text>Autorizo o(s) estágio de estudante(s)</Text>
              <Text style={{ margin: "0 10px" }}>[ ] NÃO</Text>
              <Text style={{ margin: "0 10px" }}>[ ] SIM</Text>
              <Text style={{ marginLeft: 20 }}>QUANTIDADE:</Text>
              <View
                style={{
                  border: "1px solid #000",
                  width: 40,
                  height: 15,
                  marginLeft: 5,
                }}
              ></View>
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureContainer}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureText}>
                  Ass. Presidente da Câmara
                </Text>
              </View>
              <Text>Data: ____/____/______</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SolicitacaoEstagiarioPdf;
