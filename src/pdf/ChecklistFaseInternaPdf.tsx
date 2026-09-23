import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type {
  ChecklistFaseInternaData,
  ChecklistItemStatus,
  ChecklistSection,
} from "../features/checklistFaseInterna/checklistFaseInterna.types.ts";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#000000",
    paddingTop: 22,
    paddingRight: 54,
    paddingBottom: 42,
    paddingLeft: 54,
  },
  header: {
    paddingBottom: 7,
    marginBottom: 36,
    borderBottomWidth: 0.7,
    borderBottomColor: "#666666",
    textAlign: "center",
  },
  institution: { fontFamily: "Helvetica-Bold", fontSize: 15, marginBottom: 3 },
  headerMeta: { fontSize: 7.4, lineHeight: 1.25 },
  headerInstance: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "#ffffff",
    fontSize: 0.1,
  },
  title: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 4,
  },
  legal: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    marginBottom: 18,
  },
  identification: {
    borderWidth: 0.7,
    borderColor: "#555555",
    marginBottom: 10,
  },
  row: { flexDirection: "row" },
  cell: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRightWidth: 0.7,
    borderBottomWidth: 0.7,
    borderColor: "#777777",
  },
  cellLast: { borderRightWidth: 0 },
  label: { fontFamily: "Helvetica-Bold" },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: "#ededed",
    borderWidth: 0.7,
    borderColor: "#555555",
  },
  table: { marginBottom: 20 },
  tableRow: { flexDirection: "row" },
  tableCell: {
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderWidth: 0.5,
    borderColor: "#777777",
  },
  tableHeader: {
    backgroundColor: "#ededed",
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    textAlign: "center",
  },
  status: { width: "8%", textAlign: "center" },
  description: { width: "55%", textAlign: "left" },
  observation: { width: "22%", textAlign: "left" },
  legalBasis: { width: "15%", textAlign: "center" },
  statusLegend: { fontSize: 8, marginBottom: 10, textAlign: "center" },
  signatureGroup: { marginTop: 12 },
  signatureRow: { flexDirection: "row", gap: 18, marginTop: 20 },
  signatureCell: { flex: 1, alignItems: "center" },
  signatureLine: {
    width: "100%",
    borderTopWidth: 0.7,
    borderTopColor: "#000000",
    marginBottom: 4,
  },
  signatureName: {
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    fontSize: 10,
  },
  date: { marginTop: 5, textAlign: "center", fontSize: 10 },
});

function Header({ pageId }: { pageId: string }) {
  return (
    <View
      key={`checklist-header-${pageId}`}
      style={styles.header}
      id={`checklist-header-${pageId}`}
    >
      <Text style={styles.headerInstance}>{pageId}</Text>
      <Text style={styles.institution}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
      <Text style={styles.headerMeta}>
        Rua José de Santana, 470, Centro, Patos de Minas/MG CEP: 38.700-052
      </Text>
      <Text style={styles.headerMeta}>Tel (34) 3821.8455</Text>
      <Text style={styles.headerMeta}>
        e-mail: camarapatos@camarapatos.mg.gov.br -
        http://www.camarapatos.mg.gov.br
      </Text>
    </View>
  );
}

const statusMark = (status: ChecklistItemStatus) => {
  if (status === "valid") return "[V]";
  if (status === "invalid") return "[X]";
  return "[  ]";
};

function Section({ section }: { section: ChecklistSection }) {
  return (
    <>
      <Text style={styles.sectionTitle} minPresenceAhead={80}>
        {section.title}
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow} wrap={false}>
          <Text style={[styles.tableCell, styles.tableHeader, styles.status]}>
            Status
          </Text>
          <Text
            style={[styles.tableCell, styles.tableHeader, styles.description]}
          >
            Item de Verificação e Descrição
          </Text>
          <Text
            style={[styles.tableCell, styles.tableHeader, styles.observation]}
          >
            Observação
          </Text>
          <Text
            style={[styles.tableCell, styles.tableHeader, styles.legalBasis]}
          >
            Base Legal
          </Text>
        </View>

        {section.items.map((item) => (
          <View key={item.id} style={styles.tableRow} wrap={false}>
            <Text style={[styles.tableCell, styles.status]}>
              {statusMark(item.status)}
            </Text>
            <Text style={[styles.tableCell, styles.description]}>
              {item.itemName}: {item.itemDescription}
            </Text>
            <Text style={[styles.tableCell, styles.observation]}>
              {item.observation.trim() || "-"}
            </Text>
            <Text style={[styles.tableCell, styles.legalBasis]}>
              {item.legalBasis}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}

function Signature({ name, date }: { name: string; date: string }) {
  return (
    <View style={styles.signatureCell}>
      <View style={styles.signatureLine} />
      <Text style={styles.signatureName}>{name}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

function Identification({ data }: { data: ChecklistFaseInternaData }) {
  const fields = [
    ["Órgão Requisitante:", data.orgaoRequisitante],
    ["Objeto Reduzido:", data.objetoReduzido],
    ["Modalidade / Critério:", data.modalidadeCriterio],
    ["Valor Global Estimado:", data.valorGlobalEstimado],
    ["Garantia / Suporte:", data.garantiaSuporte],
  ];

  return (
    <View style={styles.identification} wrap={false}>
      {fields.map(([label, value]) => (
        <View style={styles.row} key={label}>
          <Text style={[styles.cell, styles.cellLast, { width: "25%" }]}>
            <Text style={styles.label}>{label}</Text>
          </Text>
          <Text style={[styles.cell, styles.cellLast, { width: "75%" }]}>
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}

function Signatures() {
  return (
    <>
      <View style={[styles.signatureGroup, { marginTop: 22 }]} wrap={false}>
        <View style={styles.signatureRow}>
          <Signature
            name="Agente de Contratação / Pregoeiro"
            date="____/____/______"
          />
          <Signature
            name="Integrante Técnico da Equipe de Planejamento"
            date="____/____/______"
          />
        </View>
      </View>
      <View style={[styles.signatureGroup, { marginTop: 22 }]} wrap={false}>
        <View style={styles.signatureRow}>
          <Signature
            name="Controle Interno / Auditoria"
            date="____/____/______"
          />
          <Signature
            name="Autoridade Competente / Ordenador de Despesas"
            date="____/____/______"
          />
        </View>
      </View>
    </>
  );
}

export default function ChecklistFaseInternaPdf({
  data,
}: {
  data: ChecklistFaseInternaData;
}) {
  return (
    <Document
      title="Checklist de Fase Interna"
      author="Câmara Municipal de Patos de Minas"
    >
      <Page size="A4" style={styles.page} wrap>
        <Header pageId="1" />
        <Text style={styles.title}>CHECKLIST DE FASE INTERNA</Text>
        <Text style={styles.subtitle}>
          ROTEIRO DE VERIFICAÇÃO DA FASE PREPARATÓRIA
        </Text>
        <Text style={styles.legal}>sob a Lei Federal nº 14.133/2021</Text>

        <Identification data={data} />

        <Text style={styles.statusLegend}>
          Status: [V] válido | [X] inválido | [ ] ausente
        </Text>

        {data.sections.slice(0, 2).map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <Header pageId="2" />
        {data.sections.slice(2, 4).map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <Header pageId="3" />
        {data.sections.slice(4).map((section) => (
          <Section key={section.id} section={section} />
        ))}
        <Signatures />
      </Page>
    </Document>
  );
}
