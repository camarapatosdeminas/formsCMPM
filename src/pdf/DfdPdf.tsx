import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { DfdData } from "../features/dfd/dfd.types";

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
  itemNumber: { width: "7%", textAlign: "center" },
  itemDescription: { width: "43%" },
  itemQuantity: { width: "12%", textAlign: "center" },
  itemValue: { width: "19%", textAlign: "right" },
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
    fontSize: 8.8,
  },
  signatureRole: { textAlign: "center", fontSize: 8 },
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

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${day}/${month}/${year}` : iso;
};
const currency = (value: string) =>
  /^\s*R\$/i.test(value) ? value : `R$ ${value}`;
const priorityLabel = { baixo: "Baixo", medio: "Médio", alto: "Alto" } as const;

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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{children}</Text>
    </View>
  );
}

function Signature({ name, role }: { name?: string; role: string }) {
  return (
    <View style={styles.signatureCell}>
      <View style={styles.signatureLine} />
      {name && <Text style={styles.signatureName}>{name}</Text>}
      <Text style={styles.signatureRole}>{role}</Text>
    </View>
  );
}

export default function DfdPdf({ data }: { data: DfdData }) {
  return (
    <Document
      title="Documento de Formalização de Demanda - DFD"
      author="Câmara Municipal de Patos de Minas"
    >
      <Page size="A4" style={styles.page} wrap>
        <Header />
        <Text style={styles.title}>
          DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA - DFD
        </Text>
        <Text style={styles.subtitle}>
          PLANEJAMENTO DA CONTRATAÇÃO DE {data.objeto.toUpperCase()}
        </Text>
        <Text style={styles.legal}>
          Art. 12, VII, c/c Art. 72, I, da Lei Federal nº 14.133/2021
        </Text>

        <View style={styles.identification} wrap={false}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cellLast, { width: "100%" }]}>
              <Text style={styles.label}>
                Setor Requisitante (Unidade/Setor/Divisão):{" "}
              </Text>
              {data.setorRequisitante}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, { width: "68%" }]}>
              <Text style={styles.label}>Responsável pela demanda: </Text>
              {data.responsavelDemanda}
            </Text>
            <Text style={[styles.cell, styles.cellLast, { width: "32%" }]}>
              <Text style={styles.label}>Matrícula: </Text>
              {data.matricula}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.rowLast, { width: "68%" }]}>
              <Text style={styles.label}>E-mail: </Text>
              {data.email}
            </Text>
            <Text
              style={[
                styles.cell,
                styles.cellLast,
                styles.rowLast,
                { width: "32%" },
              ]}
            >
              <Text style={styles.label}>Telefone: </Text>
              {data.telefone}
            </Text>
          </View>
        </View>

        <Section title="1 - Justificativa da necessidade da contratação de serviço ou aquisição de produto">
          {data.justificativa}
        </Section>

        <Text
          style={[
            styles.sectionTitle,
            { borderWidth: 0.7, borderColor: "#555555", marginBottom: 0 },
          ]}
          minPresenceAhead={80}
        >
          2 - Quantidade de serviço/produto a ser contratado
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow} wrap={false}>
            <Text
              style={[styles.tableCell, styles.tableHeader, styles.itemNumber]}
            >
              Item
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeader,
                styles.itemDescription,
              ]}
            >
              Descrição
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeader,
                styles.itemQuantity,
              ]}
            >
              Quant.
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, styles.itemValue]}
            >
              Valor unit.
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, styles.itemValue]}
            >
              Valor total
            </Text>
          </View>
          {data.itens.map((item, index) => (
            <View key={item.id} style={styles.tableRow} wrap={false}>
              <Text style={[styles.tableCell, styles.itemNumber]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.itemDescription]}>
                {item.descricao}
              </Text>
              <Text style={[styles.tableCell, styles.itemQuantity]}>
                {item.quantidade}
              </Text>
              <Text style={[styles.tableCell, styles.itemValue]}>
                {currency(item.valorUnitario)}
              </Text>
              <Text style={[styles.tableCell, styles.itemValue]}>
                {currency(item.valorTotal)}
              </Text>
            </View>
          ))}
        </View>

        <Section title="3 - Providências a serem adotadas previamente à contratação OU indicação de vinculação ou dependência com o objeto de outro DFD">
          {data.providenciasVinculacao}
        </Section>
        <Section title="4 - Previsão da data de início da prestação do serviço ou entrega dos produtos (dia/mês/ano)">
          {formatDate(data.dataInicio)}
        </Section>
        <Section title="5 - Valor estimado da contratação">
          {currency(data.valorEstimado)}
        </Section>
        <Section title="6 - Grau de prioridade da compra ou da contratação">
          <Text style={styles.priority}>
            {priorityLabel[data.prioridade as keyof typeof priorityLabel]}
          </Text>
          {" - "}Motivo: {data.motivoPrioridade}
        </Section>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>
            7 - Indicação do responsável pela fiscalização e gestão (mesmo para
            entregas únicas)
          </Text>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.rowLast, { width: "50%" }]}>
              <Text style={styles.label}>
                Fiscal, titular e substituto:{"\n"}
              </Text>
              T - {data.fiscalTitular}
              {"\n"}S - {data.fiscalSubstituto}
            </Text>
            <Text
              style={[
                styles.cell,
                styles.cellLast,
                styles.rowLast,
                { width: "50%" },
              ]}
            >
              <Text style={styles.label}>
                Gestor do Contrato, titular e substituto:{"\n"}
              </Text>
              T - {data.gestorTitular}
              {"\n"}S - {data.gestorSubstituto}
            </Text>
          </View>
        </View>

        <View style={styles.signatureGroup} wrap={false}>
          <Text style={styles.declaration}>
            Declaro que os servidores indicados foram comunicados e estão
            cientes de suas atribuições.
          </Text>
          <Text style={{ textAlign: "center" }}>
            Patos de Minas, {formatDate(data.dataFormalizacao)}.
          </Text>
          <View style={styles.signatureRow}>
            <Signature
              name={`${data.responsavelFormalizacao} - matrícula ${data.matriculaFormalizacao}`}
              role="Responsável pela Formalização da Demanda"
            />
          </View>
        </View>

        {data.relacionadoTecnologia === "sim" && (
          <View style={[styles.section, { marginTop: 18 }]} wrap={false}>
            <Text style={styles.technicalTitle}>
              AVALIAÇÃO DA DIVISÃO DE INFORMÁTICA
            </Text>
            <Text style={styles.declaration}>
              <Text style={styles.label}>OBRIGATÓRIO</Text> para bens, produtos
              e serviços de informática, de tecnologia da informação e de áudio
              e vídeo.
            </Text>
            <Text style={styles.declaration}>
              Submeto o Documento de Formalização da Demanda para avaliação da
              área técnica.
            </Text>
            <Text style={[styles.declaration, { fontSize: 8.5 }]}>
              (Caso se trate de contratação que envolva outra área técnica, essa
              se manifestará, podendo propor alterações ou correções.)
            </Text>
            <View style={styles.signatureRow}>
              <Signature
                name="Paulo Cesar Caixeta - matrícula 791"
                role="Divisão de Informática"
              />
              <Signature
                name="Marília Santana de Oliveira Lima - matrícula 989"
                role="Divisão de Informática"
              />
            </View>
          </View>
        )}

        <View style={[styles.signatureGroup, { marginTop: 22 }]} wrap={false}>
          <View style={styles.signatureRow}>
            <Signature
              name="Setor Requisitante"
              role={data.setorRequisitante}
            />
            <Signature
              name="Autoridade Competente"
              role="Presidência da Câmara Municipal de Patos de Minas"
            />
          </View>
        </View>

        <View wrap={false} style={{ marginTop: 18 }}>
          <Text style={styles.noteTitle}>Observações:</Text>
          <Text style={styles.note}>
            - É aconselhável fazer um DFD para cada produto/serviço de acordo
            com a sua natureza.
          </Text>
          <Text style={styles.note}>
            - É obrigatório informar a data de entrega do serviço/produto,
            inclusive em se tratando dos aditivos (não colocar conforme o
            contrato).
          </Text>
          <Text style={styles.note}>
            - Se se tratar de aquisição relacionada à informática, tecnologia da
            informação ou áudio e vídeo, o demandante deverá solicitar a análise
            do pedido pela Divisão de Informática, que o assinará em conjunto.
          </Text>
          <Text style={styles.note}>
            - Aditivos devem ser lançados pelo fiscal do contrato.
          </Text>
          <Text style={styles.version}>Versão: agosto/2025</Text>
        </View>
      </Page>
    </Document>
  );
}
