import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ChecklistFaseInternaData } from "../features/checklistFaseInterna/checklistFaseInterna.types.ts";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#000000",
    paddingTop: 100,
    paddingRight: 54,
    paddingBottom: 42,
    paddingLeft: 54,
  },
  header: {
    position: "absolute",
    top: 22,
    left: 54,
    right: 54,
    paddingBottom: 7,
    borderBottomWidth: 0.7,
    borderBottomColor: "#666666",
    textAlign: "center",
  },
  institution: { fontFamily: "Helvetica-Bold", fontSize: 15, marginBottom: 3 },
  headerMeta: { fontSize: 7.4, lineHeight: 1.25 },
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
  rowLast: { borderBottomWidth: 0 },
  label: { fontFamily: "Helvetica-Bold" },
  section: { borderWidth: 0.7, borderColor: "#555555", marginBottom: 10 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: "#ededed",
    borderBottomWidth: 0.7,
    borderBottomColor: "#777777",
  },
  sectionBody: {
    paddingVertical: 7,
    paddingHorizontal: 8,
    textAlign: "justify",
  },
  table: {
    marginBottom: 10,
  },
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
  status: { width: "7%", textAlign: "center" },
  description: { width: "80%", textAlign: "justify" },
  legalBasis: { width: "13%", textAlign: "center" },
  priority: { fontFamily: "Helvetica-Bold", marginBottom: 5 },
  declaration: { textAlign: "justify", marginBottom: 12 },
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
  technicalTitle: {
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 7,
  },
  noteTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    marginTop: 2,
    marginBottom: 4,
  },
  note: { fontSize: 8, marginBottom: 3, textAlign: "justify" },
  version: { fontFamily: "Helvetica-Bold", fontSize: 7.5, marginTop: 8 },
});

interface ValidationRow {
  itemDescription: string;
  legalBasis: string;
}

function Header() {
  return (
    <View style={styles.header} fixed>
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

function Section({ title, rows }: { title: string; rows: ValidationRow[] }) {
  return (
    <>
      <Text
        style={[
          styles.sectionTitle,
          { borderWidth: 0.7, borderColor: "#555555", marginBottom: 0 },
        ]}
        minPresenceAhead={80}
      >
        {title}
      </Text>
      <View style={[styles.table, { marginBottom: 20 }]}>
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
            style={[styles.tableCell, styles.tableHeader, styles.legalBasis]}
          >
            Base Legal
          </Text>
        </View>

        {rows.map((row, index) => (
          <View key={index} style={styles.tableRow} wrap={false}>
            <Text style={[styles.tableCell, styles.status]}>{`[  ]`}</Text>
            <Text style={[styles.tableCell, styles.description]}>
              {row.itemDescription}
            </Text>
            <Text style={[styles.tableCell, styles.legalBasis]}>
              {row.legalBasis}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}

function Signature({ name, date }: { name?: string; date: string }) {
  return (
    <View style={styles.signatureCell}>
      <View style={styles.signatureLine} />
      {name && <Text style={styles.signatureName}>{name}</Text>}
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

export default function ChecklistInstrucaoProcessualPdf({
  data,
}: {
  data: ChecklistFaseInternaData;
}) {
  const rowsSection1: ValidationRow[] = [
    {
      itemDescription:
        "Documento de Formalização da Demanda (DFD): Emissão pelo setor de Segurança Patrimonial justificando a necessidade de reforço preventivo de controle de acesso.",
      legalBasis: "Art. 12, VII e Art. 72, I",
    },
    {
      itemDescription:
        "Alinhamento ao PCA 2026: Verificação da inclusão formal da contratação no Plano de Contratações Anual do órgão no PNCP.",
      legalBasis: "Art. 12, VII, Lei 14.133",
    },
    {
      itemDescription:
        "Portaria de Designação: Designação do Agente de Contratação, Equipe de Apoio e Comissão de Planejamento da Contratação.",
      legalBasis: "Art. 8º e Art. 18, caput",
    },
  ];

  const rowsSection2: ValidationRow[] = [
    {
      itemDescription:
        "Estudo Técnico Preliminar (ETP): Confecção do ETP demonstrando a viabilidade técnica e a escolha da aquisição definitiva frente ao aluguel.",
      legalBasis: "Art. 18, § 1º, Lei 14.133",
    },
    {
      itemDescription:
        "Memória de Cálculo de Quantitativos: Dimensionamento justificado para 01 pórtico fixo e 02 detectores manuais com base no fluxo de público.",
      legalBasis: "Art. 18, § 1º, IV ",
    },
    {
      itemDescription:
        "Justificativa de Lote Único: Fundamentação para o não parcelamento (Empreitada por Preço Global) por responsabilidade técnica unificada.",
      legalBasis: "Art. 40, § 2º e Art. 47, II",
    },
    {
      itemDescription:
        "Mapa de Gestão de Riscos: Mapeamento dos riscos do processo (entrega, PoC, infraestrutura, SLA) com ações de mitigação e contingência.",
      legalBasis: "Art. 18, X, Lei 14.133",
    },
  ];

  const rowsSection3: ValidationRow[] = [
    {
      itemDescription:
        "Especificações Técnicas do Hardware: Multizona 18+, display com senha, nobreak 4h, IP55, 02 raquetes manuais recarregáveis.",
      legalBasis: "Art. 6º, XXIII, 'a'",
    },
    {
      itemDescription:
        "Requisitos de Acessibilidade PCD: Vão livre de 0,75m a 0,85m, piso plano, laudos de inofensividade a marcapassos/gestantes e inspeção alternativa.",
      legalBasis: "Lei 13.146/15 e Normas NIJ",
    },
    {
      itemDescription:
        "Garantia Técnica e SLA de Suporte: Garantia de 24 meses integral on-site, atendimento presencial em até 48h e fornecimento de backup em 72h.",
      legalBasis: "Art. 6º, XXIII, 'd'",
    },
    {
      itemDescription:
        "Qualificação Técnica Operacional: Exigência de Certidão CREA/CONFEA, indicação de Engenheiro RT e Atestados de Capacidade Técnica.",
      legalBasis: "Art. 67, I e II, Lei 14.133",
    },
    {
      itemDescription:
        "Regramento da Prova de Conceito (PoC): Exigência de apresentação de amostra do pórtico pelo 1º colocado no prazo de 5 dias úteis.",
      legalBasis: "Art. 17, § 3º e Art. 41, II",
    },
    {
      itemDescription:
        "Tabela de Multas e Sanções: Regramento claro para multas moratórias diárias (0,5%) e sanções administrativas compensatórias.",
      legalBasis: "Arts. 155 a 163, Lei 14.133",
    },
    {
      itemDescription:
        "Disposições Legais Complementares: Dispensa de caução, vedação de subcontratação, reajuste por IPCA e logística reversa de baterias.",
      legalBasis: "Arts. 92, 96, 122 e Lei 12.305",
    },
  ];

  const rowsSection4: ValidationRow[] = [
    {
      itemDescription: `Relatório de Pesquisa de Mercado: Pesquisa balizada no PNCP e Compras.gov.br (CGU, TRE-MG, IAPEN-AC) fixando o valor de ${data.valorGlobalEstimado}.`,
      legalBasis: "Art. 23 e IN SEGES/ME 65/21",
    },
    {
      itemDescription:
        "Declaração de Adequação Orçamentária: Certidão do Ordenador atestando disponibilidade no Elemento 4.4.90.52 e conformidade com a LRF.",
      legalBasis: "Art. 18, VIII e Arts. 16/17 LRF",
    },
  ];

  const rowsSection5: ValidationRow[] = [
    {
      itemDescription:
        "Minuta do Edital de Pregão Eletrônico: Elaboração do edital de licitação pelo critério de Menor Preço Global em lote único.",
      legalBasis: "Art. 25 e Art. 34, Lei 14.133",
    },
    {
      itemDescription:
        "Parecer da Assessoria Jurídica: Aprovação prévia das minutas de edital, TR e anexos pelo órgão de assessoramento jurídico.",
      legalBasis: "Art. 53, caput e § 1º",
    },
    {
      itemDescription:
        "Atendimento a Recomendações Jurídicas: Saneamento e justificativa de eventuais apontamentos realizados no parecer jurídico.",
      legalBasis: "Art. 53, § 2º, Lei 14.133",
    },
  ];

  const rowsSection6: ValidationRow[] = [
    {
      itemDescription:
        "Despacho de Homologação da Fase Interna: Aprovação expressa da autoridade competente autorizando a abertura do certame.",
      legalBasis: "Art. 18, caput, Lei 14.133",
    },
    {
      itemDescription:
        "Publicação Oficial no PNCP: Divulgação do edital e anexos no Portal Nacional de Contratações Públicas e Diário Oficial.",
      legalBasis: "Art. 54 e Art. 174, Lei 14.133",
    },
  ];

  return (
    <Document
      title="Checklist de Fase Interna"
      author="Câmara Municipal de Patos de Minas"
    >
      <Page size="A4" style={styles.page} wrap>
        <Header />
        <Text style={styles.title}>CHECKLIST DE FASE INTERNA</Text>
        <Text style={styles.subtitle}>
          ROTEIRO DE VERIFICAÇÃO DA FASE PREPARATÓRIA
        </Text>
        <Text style={styles.legal}>sob a Lei Federal nº 14.133/2021</Text>

        <View style={styles.identification} wrap={false}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellLast, { width: "25%" }]}>
              <Text style={styles.label}>Órgão Requisitante:</Text>
            </Text>
            <Text style={[styles.cell, styles.cellLast, { width: "75%" }]}>
              <Text>{data.orgaoRequisitante}</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellLast, { width: "25%" }]}>
              <Text style={styles.label}>Objeto Reduzido:</Text>
            </Text>
            <Text style={[styles.cell, styles.cellLast, { width: "75%" }]}>
              <Text>{data.objetoReduzido}</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellLast, { width: "25%" }]}>
              <Text style={styles.label}>Modalidade / Critério:</Text>
            </Text>
            <Text style={[styles.cell, styles.cellLast, { width: "75%" }]}>
              <Text>{data.modalidadeCriterio}</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellLast, { width: "25%" }]}>
              <Text style={styles.label}>Valor Global Estimado:</Text>
            </Text>
            <Text style={[styles.cell, styles.cellLast, { width: "75%" }]}>
              <Text>{data.valorGlobalEstimado}</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellLast, { width: "25%" }]}>
              <Text style={styles.label}>Garantia / Suporte:</Text>
            </Text>
            <Text style={[styles.cell, styles.cellLast, { width: "75%" }]}>
              <Text>{data.garantiaSuporte}</Text>
            </Text>
          </View>
        </View>

        <Section
          title="1 - Planejamento e Início do Processo"
          rows={rowsSection1}
        />

        <Section
          title="2 - Estudos Técnicos Preliminares e Gestão de Riscos"
          rows={rowsSection2}
        />

        <Section
          title="3 - Termo de Referência Consolidado (TR v9)"
          rows={rowsSection3}
        />

        <Section
          title="4 - Pesquisa de Preços e Orçamento"
          rows={rowsSection4}
        />

        <Section
          title="5 - Minutas de Edital e Parecer Jurídico"
          rows={rowsSection5}
        />

        <Section
          title="6 - Autorização e Publicidade da Licitação"
          rows={rowsSection6}
        />

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
      </Page>
    </Document>
  );
}
