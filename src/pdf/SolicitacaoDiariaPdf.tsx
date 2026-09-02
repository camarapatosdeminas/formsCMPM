import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Interface dos dados
interface FormData {
  nome: string;
  matricula: string;
  cargo: string;
  banco: string;
  tipoConta: "corrente" | "poupanca";
  agencia: string;
  conta: string;
  pix: string;
  cidade: string;
  estado: string;
  periodoViagem: string;
  meioTransporte: "carro" | "onibus" | "aereo" | "outro";
  placaCarro: string;
  outroTransporte: string;
  diariasInteiras: string;
  diariasReduzidas: string;
  solicitaAntecipacao: "sim" | "nao";
  valorSolicitado: string;
  objetivo: string;
}

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, padding: 40 },
  header: { textAlign: "center", marginBottom: 15 },
  bold: { fontFamily: "Helvetica-Bold" },
  headerText: { fontSize: 9, color: "grey", lineHeight: 1.3 },
  title: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
  },
  introText: {
    fontSize: 9,
    textAlign: "justify",
    lineHeight: 1.5,
    marginBottom: 10,
  },
  section: { border: "1px solid #000", marginBottom: 5 },
  sectionTitle: {
    padding: 3,
    backgroundColor: "#E0E0E0",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  content: { padding: 5 },
  row: { flexDirection: "row", marginBottom: 5 },
  col: { flex: 1, marginRight: 5 },
  lastCol: { marginRight: 0 },
  fieldLabel: { fontSize: 7, fontFamily: "Helvetica-Oblique" },
  fieldValue: {
    fontSize: 9,
    borderBottom: "1px dotted #000",
    paddingBottom: 1,
    minHeight: 11,
  },
  checkboxContainer: {
    borderBottom: "1px dotted #000",
    paddingBottom: 1,
    minHeight: 22,
  },
  checkboxText: {
    fontSize: 9,
  },
  declarationText: {
    fontSize: 8,
    textAlign: "justify",
    lineHeight: 1.4,
    marginTop: 5,
  },
  signatureLine: {
    borderBottom: "1px solid #000",
    marginTop: 30,
    width: "60%",
    alignSelf: "center",
  },
  signatureText: { fontSize: 8, alignSelf: "center", marginTop: 2 },
});

const SolicitacaoDiariaPdf = ({ formData }: { formData: FormData }) => {
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

        <Text style={styles.title}>Solicitação de Diária/Passagem</Text>

        <Text
          style={{
            ...styles.bold,
            textAlign: "center",
            fontSize: 10,
            marginBottom: 10,
          }}
        >
          EXCELENTÍSSIMO SENHOR PRESIDENTE DA CÂMARA MUNICIPAL DE PATOS DE MINAS
        </Text>
        <Text style={styles.introText}>
          Em atendimento ao disposto na Resolução nº 323, de 14 de Março de
          2025, requeiro a Vossa Excelência autorização para desempenho de
          missão temporária, de caráter representativo ou cultural, a qual será
          custeada por diárias pagas pelo poder público.
        </Text>
        <Text style={styles.introText}>Para tanto, especifico o seguinte:</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOLICITANTE</Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={{ ...styles.col, flex: 1.5 }}>
                <Text style={styles.fieldLabel}>NOME</Text>
                <Text style={styles.fieldValue}>{formData.nome}</Text>
              </View>
              <View style={{ ...styles.col, flex: 0.5 }}>
                <Text style={styles.fieldLabel}>MATRÍCULA</Text>
                <Text style={styles.fieldValue}>{formData.matricula}</Text>
              </View>
              <View style={{ ...styles.col, flex: 2, ...styles.lastCol }}>
                <Text style={styles.fieldLabel}>CARGO</Text>
                <Text style={styles.fieldValue}>{formData.cargo}</Text>
              </View>
            </View>

            {/* --- LAYOUT DOS CAMPOS BANCÁRIOS REFINADO --- */}
            <View style={{ ...styles.row, alignItems: "flex-end" }}>
              <View style={{ ...styles.col, flex: 2 }}>
                <Text style={styles.fieldLabel}>Banco</Text>
                <Text style={styles.fieldValue}>{formData.banco}</Text>
              </View>
              {/* Tipo de Conta: reduzido */}
              <View style={{ ...styles.col, flex: 1 }}>
                <Text style={styles.fieldLabel}>Tipo de Conta</Text>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxText}>
                    {formData.tipoConta === "corrente"
                      ? "(X) Corrente"
                      : "( ) Corrente"}
                  </Text>
                  <Text style={styles.checkboxText}>
                    {formData.tipoConta === "poupanca"
                      ? "(X) Poupança"
                      : "( ) Poupança"}
                  </Text>
                </View>
              </View>
              {/* Agência: reduzido */}
              <View style={{ ...styles.col, flex: 0.5 }}>
                <Text style={styles.fieldLabel}>Agência</Text>
                <Text style={styles.fieldValue}>{formData.agencia}</Text>
              </View>
              {/* Conta: reduzido */}
              <View style={{ ...styles.col, flex: 0.7 }}>
                <Text style={styles.fieldLabel}>Conta</Text>
                <Text style={styles.fieldValue}>{formData.conta}</Text>
              </View>
              {/* Pix: aumentado com o espaço economizado */}
              <View style={{ ...styles.col, flex: 1.8, ...styles.lastCol }}>
                <Text style={styles.fieldLabel}>Pix</Text>
                <Text style={styles.fieldValue}>{formData.pix}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ ...styles.row, marginBottom: 0 }}>
          <View style={{ ...styles.section, flex: 2, marginRight: 5 }}>
            <Text style={styles.sectionTitle}>DESTINO</Text>
            <View style={{ ...styles.content, flexDirection: "row" }}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>CIDADE</Text>
                <Text style={styles.fieldValue}>{formData.cidade}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>ESTADO</Text>
                <Text style={styles.fieldValue}>{formData.estado}</Text>
              </View>
              <View style={{ ...styles.col, ...styles.lastCol }}>
                <Text style={styles.fieldLabel}>PERÍODO DA VIAGEM</Text>
                <Text style={styles.fieldValue}>{formData.periodoViagem}</Text>
              </View>
            </View>
          </View>
          <View style={{ ...styles.section, flex: 1 }}>
            <Text style={styles.sectionTitle}>MEIO DE TRANSPORTE</Text>
            <View style={{ ...styles.content, fontSize: 8 }}>
              <Text>
                {formData.meioTransporte === "carro" ? "[X]" : "[ ]"} Carro
                Placa: {formData.placaCarro}
              </Text>
              <Text>
                {formData.meioTransporte === "onibus" ? "[X]" : "[ ]"} Ônibus{" "}
                {formData.meioTransporte === "aereo" ? "[X]" : "[ ]"} Aéreo{" "}
                {formData.meioTransporte === "outro" ? "[X]" : "[ ]"} Outro:{" "}
                {formData.outroTransporte || ""}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OBJETIVO DETALHADO DA VIAGEM</Text>
          <View style={styles.content}>
            <Text style={{ ...styles.fieldValue, minHeight: 60 }}>
              {formData.objetivo}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.section, flexDirection: "row" }}>
          <View
            style={{
              ...styles.content,
              flex: 1,
              borderRight: "1px solid #000",
            }}
          >
            <Text style={{ fontFamily: "Helvetica-Bold", textAlign: "center" }}>
              DIÁRIAS
            </Text>
            <Text style={{ marginTop: 5 }}>
              {formData.diariasInteiras || "__"} inteiras{" "}
              {formData.diariasReduzidas || "__"} reduzida(s)
            </Text>
          </View>
          <View style={{ ...styles.content, flex: 2 }}>
            <Text style={{ fontFamily: "Helvetica-Bold", textAlign: "center" }}>
              SOLICITAÇÃO DE ANTECIPAÇÃO - ART. 3º, PARAGRAFO ÚNICO
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 5,
              }}
            >
              <Text>
                ({formData.solicitaAntecipacao === "sim" ? "X" : " "})SIM (
                {formData.solicitaAntecipacao === "nao" ? "X" : " "})NÃO
              </Text>
              <Text>VALOR SOLICITADO: R$ {formData.valorSolicitado}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DECLARAÇÃO DO SOLICITANTE</Text>
          <View style={styles.content}>
            <Text style={styles.declarationText}>
              Declaro que me comprometo a prestar contas no prazo de 5 (cinco)
              dias úteis da importância supracitada, apresentando relatório de
              viagem, acompanhado das respectivas notas fiscais e/ou recibos.
            </Text>
            <Text style={styles.declarationText}>
              Em caso de inadimplência, autorizo o desconto integral em folha de
              pagamento.
            </Text>
            <View style={styles.signatureLine} />
            <Text>Data: ___/___/_____ </Text>
            <Text style={styles.signatureText}>Assinatura do Solicitante</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            AUTORIZAÇÃO DO SUPERIOR IMEDIATO (dispensável para solicitação de
            Vereadores)
          </Text>
          <View style={styles.content}>
            <Text style={styles.declarationText}>
              Declaro que não haverá prejuízo na execução das atividades no
              setor em que o servidor solicitante está lotado.
            </Text>
            <View style={styles.signatureLine} />
            <Text>Data: ___/___/_____ </Text>
            <Text style={styles.signatureText}>
              Assinatura do Superior Imediato
            </Text>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ ...styles.section, height: "15%" }}>
          <Text style={styles.sectionTitle}>
            DECLARAÇÃO DE DISPONIBILIDADE ORÇAMENTÁRIA E FINANCEIRA
          </Text>
          <View style={styles.content}>
            <Text style={{ ...styles.declarationText, marginTop: 20 }}>
              Declaro haver dotação orçamentária e financeira suficiente para
              fazer faze ao requerimento.
            </Text>
            <View style={styles.signatureLine} />
            <Text>Data: ___/___/_____ </Text>
            <Text style={styles.signatureText}>
              Assinatura da Divisão de Contabilidade
            </Text>
          </View>
        </View>
        <View style={{ ...styles.section, height: "20%" }}>
          <Text style={styles.sectionTitle}>DESPACHO DO PRESIDENTE</Text>
          <View style={{ ...styles.content, paddingTop: 20 }}>
            <Text>
              ( ) Autorizo a concessão de ______ diárias inteiras e ______
              diárias reduzidas.
            </Text>
            <Text style={{ marginTop: 10 }}>
              ( ) Autorizo o meio de transporte indicado no pedido.
            </Text>
            <Text style={{ marginTop: 10 }}>
              ( ) Autorizo a antecipação de R$ ____________ para aquisição de
              passagens.
            </Text>
            <Text style={{ marginTop: 10 }}>
              ( ) Indefiro a concessão de diárias.
            </Text>
            <View style={styles.signatureLine} />
            <Text>Data: ___/___/_____ </Text>
            <Text style={styles.signatureText}>Assinatura do Presidente</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SolicitacaoDiariaPdf;
