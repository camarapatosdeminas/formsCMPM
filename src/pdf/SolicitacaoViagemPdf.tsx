import type {
  Participante,
  FormData,
} from "../features/solicitacaoViagem/solicitacaoViagem.types";
// src/pdf/SolicitacaoViagemPdf.tsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Interface idêntica à do formulário para garantir consistência

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, color: "#333" },
  header: { textAlign: "center", marginBottom: 15 },
  bold: { fontFamily: "Helvetica-Bold" },
  headerText: { fontSize: 9, color: "grey", lineHeight: 1.3 },
  introText: {
    fontSize: 10,
    textAlign: "justify",
    lineHeight: 1.5,
    marginBottom: 10,
  },
  section: { borderWidth: 1, borderColor: "#000", marginBottom: 10 },
  sectionTitle: {
    padding: 4,
    backgroundColor: "#E0E0E0",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  content: { padding: 8 },
  contentFinalidade: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  row: { flexDirection: "row", marginBottom: 0, gap: 5 },
  col: { flex: 1, paddingRight: 10 },
  fieldContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    flexGrow: 1,
    marginBottom: 5,
  },
  fieldLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
    color: "#555",
  },
  fieldValue: {
    fontSize: 9,
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "#000",
    paddingBottom: 2,
    minHeight: 12,
  },
  fieldValueSolicitante: { fontSize: 9, minHeight: 12, paddingBottom: 2 },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 4,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    fontSize: 9,
  },
  tableCol: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 4,
    minHeight: 20,
  },
  footerText: { fontSize: 8, marginTop: 5, fontStyle: "italic" },
  signatureSection: { marginTop: 25, alignItems: "center" },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "60%",
  },
  signatureText: { fontSize: 9, marginTop: 3 },
});

const SolicitacaoViagemPdf = ({
  formData,
  participantes,
}: {
  formData: FormData;
  participantes: Participante[];
}) => {
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOLICITANTE</Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={{ ...styles.fieldContainer, width: "100%" }}>
                <Text style={styles.fieldLabel}>NOME</Text>
                <Text style={styles.fieldValueSolicitante}>
                  {formData.nome || " "}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ ...styles.fieldContainer, width: "15%" }}>
                <Text style={styles.fieldLabel}>MATRÍCULA</Text>
                <Text style={styles.fieldValueSolicitante}>
                  {formData.matricula || " "}
                </Text>
              </View>
              <View style={{ ...styles.fieldContainer, width: "85%" }}>
                <Text style={styles.fieldLabel}>CARGO</Text>
                <Text style={styles.fieldValueSolicitante}>
                  {formData.cargo || " "}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ ...styles.fieldContainer, width: "40%" }}>
                <Text style={styles.fieldLabel}>BANCO</Text>
                <Text style={styles.fieldValueSolicitante}>
                  {formData.banco || " "}
                </Text>
              </View>
              <View style={{ ...styles.fieldContainer, width: "15%" }}>
                <Text style={styles.fieldLabel}>AGÊNCIA</Text>
                <Text style={styles.fieldValueSolicitante}>
                  {formData.agencia || " "}
                </Text>
              </View>
              <View style={{ ...styles.fieldContainer, width: "20%" }}>
                <Text style={styles.fieldLabel}>CONTA</Text>
                <Text style={styles.fieldValueSolicitante}>
                  {formData.conta || " "}
                </Text>
              </View>
              <View style={{ ...styles.fieldContainer, width: "25%" }}>
                <Text style={styles.fieldLabel}>PIX</Text>
                <Text style={styles.fieldValueSolicitante}>
                  {formData.pix || " "}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={{
            ...styles.introText,
            textAlign: "center",
            fontFamily: "Helvetica-Bold",
          }}
        >
          EXCELENTÍSSIMO SENHOR PRESIDENTE DA CÂMARA MUNICIPAL DE PATOS DE MINAS
        </Text>
        <Text style={styles.introText}>
          Em atendimento ao disposto na Resolução nº 276/12, requeiro a Vossa
          Excelência autorização para desempenho de missão temporária, de
          caráter representativo ou cultural, a qual será custeada por diárias
          pagas pelo poder público.
        </Text>
        <Text style={styles.introText}>Para tanto, especifico o seguinte:</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Finalidade:</Text>
          <View style={styles.contentFinalidade}>
            <Text style={{ marginBottom: 5 }}>
              [{formData.finalidade === "encontro" ? "X" : " "}]
              Encontro/Seminário/Congresso
            </Text>
            <Text style={{ marginBottom: 5 }}>
              [{formData.finalidade === "curso" ? "X" : " "}] Curso de
              aperfeiçoamento
            </Text>
            <Text>
              [{formData.finalidade === "outros" ? "X" : " "}] Outros:{" "}
              <Text style={{ ...styles.fieldValue, flex: 1 }}>
                {formData.finalidadeOutros}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Período</Text>
          <View style={styles.content}>
            <Text style={styles.fieldValue}>{formData.periodo || " "}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Destino</Text>
          <View style={styles.content}>
            <View style={{ ...styles.row, marginBottom: 8 }}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>a) Cidade e Estado:</Text>
                <Text style={styles.fieldValue}>{formData.cidadeEstado}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>b) Local:</Text>
                <Text style={styles.fieldValue}>{formData.local}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>c) Meio de transporte:</Text>
                <Text style={styles.fieldValue}>{formData.meioTransporte}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Justificativa</Text>
          <Text style={{ ...styles.content, minHeight: 40 }}>
            {formData.justificativa || " "}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableColHeader}>
              <Text>Participante(s)</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Assinatura(s) do Participante</Text>
            </View>
            <View style={{ ...styles.tableColHeader, borderRightWidth: 0 }}>
              <Text>Assinatura(s) do Chefe Imediato*</Text>
            </View>
          </View>
          {participantes.map((p, index) => (
            <View
              key={p.id}
              style={{
                ...styles.tableRow,
                borderBottomWidth: index === participantes.length - 1 ? 0 : 1,
              }}
            >
              <View style={styles.tableCol}>
                <Text>{p.nome}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text> </Text>
              </View>
              <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
                <Text> </Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.footerText}>
          *A assinatura do Chefe Imediato certifica que não haverá prejuízo dos
          trabalhos no setor em que o servidor está lotado.
        </Text>

        <Text
          style={{
            ...styles.footerText,
            textAlign: "right",
            marginTop: 15,
            marginBottom: 20,
          }}
        >
          Patos de Minas,{" "}
          {currentDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          .
        </Text>

        <View style={styles.signatureSection}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Divisão de Contabilidade</Text>
          <Text style={{ ...styles.footerText, textAlign: "center" }}>
            Declaro haver dotação orçamentária e financeira suficiente para
            fazer face ao requerimento.
          </Text>
        </View>

        <View style={{ ...styles.signatureSection }}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>
            Presidente da Câmara Municipal
          </Text>
          <Text style={{ ...styles.footerText, textAlign: "center" }}>
            Fica autorizada a percepção de diárias de viagem conforme requerido.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SolicitacaoViagemPdf;
