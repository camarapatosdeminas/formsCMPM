// src/pdf/RelatorioViagemPdf.tsx

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Interfaces para a tipagem dos dados
interface Despesa {
  utilizado: string;
  reembolsar: string;
}
interface DespesaCombustivel extends Despesa {
  quilometragem: string;
}
interface DespesaAntecipada {
  antecipado: string;
  utilizado: string;
  reembolsar: string;
  devolver: string;
}
interface FormData {
  nome: string;
  matricula: string;
  cargo: string;
  destino: string;
  dataSaida: string;
  dataRetorno: string;
  meioTransporte: string;
  descricaoAtividades: string;
  despesasAntecipadas: { passagem: DespesaAntecipada };
  despesasRealizadas: {
    combustivel: DespesaCombustivel;
    transporteUrbano: Despesa;
    passagem: Despesa;
    pedagio: Despesa;
    estacionamento: Despesa;
  };
}

// Estilos EXATAMENTE como no código que você forneceu
const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, padding: 40 },
  bold: { fontFamily: "Helvetica-Bold" },
  title: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  dateText: { textAlign: "left", marginTop: 10 },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
  },
  section: { border: "1px solid #000", marginBottom: 10 },
  sectionTitle: {
    padding: 3,
    backgroundColor: "#E0E0E0",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    borderBottom: "1px solid #000",
  },
  content: { padding: 8 },
  row: { flexDirection: "row", marginBottom: 8 },
  col: { flex: 1, paddingRight: 10 },
  fieldLabel: { fontSize: 8, fontFamily: "Helvetica-Oblique", marginBottom: 2 },
  fieldValue: {
    fontSize: 10,
    borderBottom: "1px dotted #000",
    paddingBottom: 2,
    minHeight: 12,
  },
  declarationText: {
    fontSize: 9,
    textAlign: "justify",
    lineHeight: 1.4,
    marginTop: 2,
  },
  signatureLine: {
    borderBottom: "1px solid #000",
    marginTop: 25,
    width: "60%",
    alignSelf: "center",
  },
  signatureText: { fontSize: 9, alignSelf: "center", marginTop: 3 },
  // Estilos para as tabelas de despesas
  tableRow: { flexDirection: "row", borderBottom: "1px solid #000" },
  tableCol: { flex: 2, padding: 3, borderRight: "1px solid #000" },
  tableColHeader: { fontFamily: "Helvetica-Bold", backgroundColor: "#E0E0E0" },
});

const RelatorioViagemPdf = ({ formData }: { formData: FormData }) => {
  const totalUtilizado =
    parseFloat(formData.despesasRealizadas?.combustivel?.utilizado || "0") +
    parseFloat(
      formData.despesasRealizadas?.transporteUrbano?.utilizado || "0",
    ) +
    parseFloat(formData.despesasRealizadas?.passagem?.utilizado || "0") +
    parseFloat(formData.despesasRealizadas?.pedagio?.utilizado || "0") +
    parseFloat(formData.despesasRealizadas?.estacionamento?.utilizado || "0");

  const totalReembolsar =
    parseFloat(formData.despesasRealizadas?.combustivel?.reembolsar || "0") +
    parseFloat(
      formData.despesasRealizadas?.transporteUrbano?.reembolsar || "0",
    ) +
    parseFloat(formData.despesasRealizadas?.passagem?.reembolsar || "0") +
    parseFloat(formData.despesasRealizadas?.pedagio?.reembolsar || "0") +
    parseFloat(formData.despesasRealizadas?.estacionamento?.reembolsar || "0");

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    if (!dateString || dateString.indexOf("-") === -1) {
      return " ";
    }
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>RELATÓRIO DE VIAGEM</Text>
        <Text style={styles.subtitle}>PRESTAÇÃO DE CONTAS</Text>

        {/* CABEÇALHO MANTIDO INTACТО */}
        <View style={styles.section}>
          <View style={{ ...styles.content, paddingBottom: 0 }}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>NOME</Text>
                <Text style={styles.fieldValue}>{formData.nome || " "}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>MATRÍCULA</Text>
                <Text style={styles.fieldValue}>
                  {formData.matricula || " "}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>CARGO</Text>
                <Text style={styles.fieldValue}>{formData.cargo || " "}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>DESTINO</Text>
                <Text style={styles.fieldValue}>{formData.destino || " "}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>DATA SAÍDA</Text>
                <Text style={styles.fieldValue}>
                  {formatDate(formData.dataSaida)}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>DATA RETORNO</Text>
                <Text style={styles.fieldValue}>
                  {formatDate(formData.dataRetorno)}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>MEIO DE TRANSPORTE</Text>
                <Text style={styles.fieldValue}>
                  {formData.meioTransporte || " "}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            DESCRIÇÃO DAS ATIVIDADES REALIZADAS (ANEXAR COMPROVANTES CONFORME
            ART. 8)
          </Text>
          <Text style={{ ...styles.content, minHeight: 45 }}>
            {formData.descricaoAtividades || " "}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            DESPESAS REALIZADAS - EM CASO DE ANTECIPAÇÃO - ART. 3º, PARÁGRAFO
            ÚNICO
          </Text>
          <View style={styles.row}>
            <View
              style={{
                ...styles.tableCol,
                ...styles.tableColHeader,
                flex: 1.5,
              }}
            >
              <Text>DESPESA</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.tableColHeader }}>
              <Text>VALOR ANTECIPADO</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.tableColHeader }}>
              <Text>VALOR UTILIZADO</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.tableColHeader }}>
              <Text>VALOR A REEMBOLSAR</Text>
            </View>
            <View
              style={{
                ...styles.tableCol,
                ...styles.tableColHeader,
                borderRightWidth: 0,
              }}
            >
              <Text>VALOR A DEVOLVER</Text>
            </View>
          </View>
          <View style={{ ...styles.row, borderBottomWidth: 0 }}>
            <View style={{ ...styles.tableCol, flex: 1.5 }}>
              <Text>Passagem</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {formData.despesasAntecipadas?.passagem?.antecipado || " "}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {formData.despesasAntecipadas?.passagem?.utilizado || " "}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {formData.despesasAntecipadas?.passagem?.reembolsar || " "}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text>
                {formData.despesasAntecipadas?.passagem?.devolver || " "}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DESPESAS REALIZADAS</Text>
          <View style={styles.row}>
            <View
              style={{ ...styles.tableCol, ...styles.tableColHeader, flex: 3 }}
            >
              <Text>DESPESA</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.tableColHeader }}>
              <Text>VALOR UTILIZADO</Text>
            </View>
            <View
              style={{
                ...styles.tableCol,
                ...styles.tableColHeader,
                borderRightWidth: 0,
              }}
            >
              <Text>VALOR A REEMBOLSAR</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ ...styles.tableCol, flex: 3, textAlign: "left" }}>
              <Text>
                Combustível Quilometragem:{" "}
                {formData.despesasRealizadas?.combustivel?.quilometragem || "0"}{" "}
                Km
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {formData.despesasRealizadas?.combustivel?.utilizado || " "}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text>
                {formData.despesasRealizadas?.combustivel?.reembolsar || " "}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ ...styles.tableCol, flex: 3, textAlign: "left" }}>
              <Text>Transporte Urbano</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {formData.despesasRealizadas?.transporteUrbano?.utilizado ||
                  " "}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text>
                {formData.despesasRealizadas?.transporteUrbano?.reembolsar ||
                  " "}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ ...styles.tableCol, flex: 3, textAlign: "left" }}>
              <Text>Passagem (caso não tenha ocorrido antecipação)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {formData.despesasRealizadas?.passagem?.utilizado || " "}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text>
                {formData.despesasRealizadas?.passagem?.reembolsar || " "}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ ...styles.tableCol, flex: 3, textAlign: "left" }}>
              <Text>Pedágio</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {formData.despesasRealizadas?.pedagio?.utilizado || " "}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text>
                {formData.despesasRealizadas?.pedagio?.reembolsar || " "}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ ...styles.tableCol, flex: 3, textAlign: "left" }}>
              <Text>Estacionamento</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {formData.despesasRealizadas?.estacionamento?.utilizado || " "}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text>
                {formData.despesasRealizadas?.estacionamento?.reembolsar || " "}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.row, borderBottomWidth: 0 }}>
            <View
              style={{ ...styles.tableCol, ...styles.tableColHeader, flex: 3 }}
            >
              <Text>TOTAL</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.tableColHeader }}>
              <Text>R$ {totalUtilizado.toFixed(2)}</Text>
            </View>
            <View
              style={{
                ...styles.tableCol,
                ...styles.tableColHeader,
                borderRightWidth: 0,
              }}
            >
              <Text>R$ {totalReembolsar.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            DECLARAÇÃO DE RESIDENCIA E VERACIDADE
          </Text>
          <View style={styles.content}>
            <Text style={styles.declarationText}>
              Declaro que não resido na(s) localidade(s) de destino e que as
              informações prestadas são verdadeiras, correspondendo
              exclusivamente aos gastos efetuados para o cumprimento dos
              objetivos informados no momento da solicitação. Estou ciente de
              que a prestação de informações inveridicas pode acarretar as
              sanções cabíveis.
            </Text>
            <Text style={styles.dateText}>
              Patos de Minas, {formattedDate}.
            </Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Assinatura do Solicitante</Text>
          </View>
        </View>

        <View style={{ ...styles.section }}>
          <Text style={styles.sectionTitle}>PARECER DO DIRETOR-GERAL</Text>
          <View style={{ ...styles.content, fontSize: 8, lineHeight: 1.5 }}>
            <Text>
              Há valor a ser reembolsado pela Câmara Municipal ao Solicitante? (
              ) NÃO ( ) SIM - VALOR: R$ _________
            </Text>
            <Text>
              Há valor a ser devolvido pelo Solicitante à Câmara Municipal? ( )
              NÃO ( ) SIM - VALOR: R$ _________
            </Text>
            <Text style={{ marginTop: 10 }}>
              ( ) Aprovo a prestação de contas, tendo em vista que se encontra
              em conformidade com a regulamentação vigente.
            </Text>
            <Text>( ) Desaprovo a prestação de contas.</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>
              Assinatura do Diretor-Geral
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RelatorioViagemPdf;
