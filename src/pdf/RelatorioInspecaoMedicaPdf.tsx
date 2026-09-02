import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Você pode exportar a interface do seu arquivo principal para evitar duplicá-la
interface FormData {
  nome: string;
  endereco: string;
  data: string;
  numeroCasa: string;
  funcao: string;
  matricula: string;
  lotacao: string;
  emailServidor: string;
  admissao: string;
  sexo: string;
  estadoCivil: string;
  regime: string;
  cpf: string;
  cargo: string;

  bairro: string;
  complemento: string;
  dataSaida: string;
  dataRetorno: string;
  dataAssinaturaServidor: string;
  funcaoConfianca: "sim" | "nao";
  contato: string;
}

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 20, lineHeight: 1.4 },
  header: {
    textAlign: "center",
    marginBottom: 15,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
  },
  bold: { fontFamily: "Helvetica-Bold" },
  title: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginVertical: 10,
  },

  section: { border: "1px solid #333", marginBottom: 10 },
  sectionTitle: {
    padding: 4,
    backgroundColor: "#E0E0E0",
    fontFamily: "Helvetica-Bold",
    borderBottom: "1px solid #333",
    fontSize: 11,
    textAlign: "center",
  },
  content: { padding: 0.5 },
  sectionGesat: {
    border: "1px solid #333",
    marginBottom: 5,
    padding: 5,
    fontSize: 8,
  },
  contentGesat: { padding: 3 },

  gridContainer: { flexDirection: "row", flexWrap: "wrap" },
  gridItem: { width: "33.33%", padding: "0 4px 4px 0" },

  fieldContainer: { marginBottom: 8 },
  fieldLabel: { fontSize: 7, fontFamily: "Helvetica-Oblique", color: "#555" },
  fieldValue: {
    borderBottom: "0.5px dotted #333",
    minHeight: 12,
    paddingBottom: 2,
  },

  multiLineValue: {
    border: "1px solid #999",
    padding: 5,
    minHeight: 80,
    fontSize: 8,
  },

  row: { flexDirection: "row", alignItems: "flex-end" },
  col: { flex: 1, paddingRight: 5 },

  signatureBox: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  signatureBoxData: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  signatureLine: {
    borderTop: "1px solid #000",
    width: "60%",
    textAlign: "center",
    paddingTop: 2,
  },

  // Estilos para as seções finais
  finalSectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 5,
  },
  finalSectionInput: {
    borderBottom: "1px solid #000",
    paddingHorizontal: 4,
    minWidth: 40,
    textAlign: "center",
  },
  finalSectionInputLong: { flex: 1, borderBottom: "1px solid #000" },

  twoColumnContainer: {
    flexDirection: "row",
    border: "1px solid #999",
    marginTop: 10,
  },
  column: { padding: 8 },
  leftColumn: { flex: 1, borderRight: "1px solid #999" },
  rightColumn: { flex: 2 },
  subtitle: { fontSize: 9, textAlign: "center", marginBottom: 15 },

  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Garante que o container ocupe o espaço restante
    marginLeft: 5,
    gap: 10, // Espaço entre "IPREM", "INSS", "Outro:"
  },
  outroLine: {
    flex: 1, // Faz a linha se esticar até o final
    borderBottom: "1px solid #000",
    marginLeft: 3,
    height: 10, // Define uma altura para a linha ser visível
  },

  headerContainer: {
    width: "100%",
    border: "1px solid #000",
    marginBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },

  rightColumn2: {
    flex: 1, // Ocupa a outra metade
    padding: 10,
  },
  rightColumnText: {
    fontSize: 9,
    textAlign: "center",
  },
  middleRow: {
    padding: 5,
    borderBottom: "1px solid #000",
  },
  middleRowText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  bottomRow: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#E0E0E0",
  },
  bottomRowTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center", // Alinhado à direita como na imagem
  },
  bottomRowGESAT: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    textAlign: "center", // Alinhado à direita como na imagem
  },
  feriasContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTop: "1px dotted #999",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 10,
  },
  radioCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    border: "1px solid #000",
  },
  radioCircleFilled: {
    height: 10,
    width: 10,
    borderRadius: 5,
    border: "1px solid #000",
    backgroundColor: "#000",
  },
  feriasDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: 15, // Indenta as datas
    marginBottom: 8,
  },
  inputBox: {
    borderBottom: "1px solid #000",
    paddingHorizontal: 4,
    minWidth: 80,
  },
  feriasWarningBox: {
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    padding: 6,
    fontSize: 8, // Fonte menor para o aviso
    textAlign: "justify",
  },
  colunaDireita: {
    width: "50%", // Define que a coluna ocupa a outra metade
    // Ou você pode usar flex: 1
  },
  textoBase: {
    fontSize: 8, // Ou o tamanho que preferir
    color: "#333",
  },
  negrito: {
    fontWeight: "bold",
  },

  // Garanta que o bold esteja definido

  // Garanta que o bold esteja definido

  // Garanta que o bold esteja definido
  // bold: {
  //     fontFamily: "Helvetica-Bold"
  // },

  // ...o resto dos seus estilos...
});

const RelatorioInspecaoMedicaPdf = ({ formData }: { formData: FormData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ====================================================== */}
        {/* ============= NOVO CABEÇALHO DETALHADO ============= */}
        {/* ====================================================== */}

        {/* --- Linha do Meio (GESAT) --- */}
        <View style={styles.middleRow}>
          <Text style={styles.middleRowText}>
            GESAT – Gerência de Saúde Ocupacional, Segurança do Trabalho e
            Assistência ao Servidor
          </Text>
        </View>

        {/* --- Linha Inferior (Título do Relatório) --- */}
        <View style={styles.section}>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomRowTitle}>
              RELATÓRIO DE INSPEÇÃO MÉDICA
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomRowGESAT}>
              Entregar o relatório preenchido e assinado pelo servidor(a) e
              chefia imediata junto com o atestado médico original na GESAT.
            </Text>
          </View>
        </View>

        {/* O RESTO DO SEU DOCUMENTO CONTINUA AQUI... */}
        {/* <View style={styles.section}> ... </View> */}

        {/* --- SEÇÃO I: SERVIDOR --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            I - Preenchimento do Servidor Público Municipal
          </Text>
          <View style={styles.content}>
            <View style={styles.gridContainer}>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Nome:</Text>
                <Text style={styles.fieldValue}>{formData.nome || " "}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Matrícula:</Text>
                <Text style={styles.fieldValue}>
                  {formData.matricula || " "}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>CPF:</Text>
                <Text style={styles.fieldValue}>{formData.cpf || " "}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Admissão:</Text>
                <Text style={styles.fieldValue}>
                  {formData.admissao
                    ? new Date(formData.admissao).toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                      })
                    : " "}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Regime:</Text>
                <Text style={styles.fieldValue}>{formData.regime || " "}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Data de Nascimento:</Text>
                <Text style={styles.fieldValue}>
                  {formData.data
                    ? new Date(formData.data).toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                      })
                    : " "}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Sexo:</Text>
                <Text style={styles.fieldValue}>{formData.sexo || " "}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Estado Civil:</Text>
                <Text style={styles.fieldValue}>
                  {formData.estadoCivil || " "}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Cargo:</Text>
                <Text style={styles.fieldValue}>{formData.cargo || " "}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Função:</Text>
                <Text style={styles.fieldValue}>{formData.funcao || " "}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>
                  CÂMARA MUNICIPAL DE PATOS DE MINAS:
                </Text>
              </View>
              <View style={{ width: "100%", padding: "0 4px 4px 0" }}>
                <Text style={styles.fieldLabel}>Endereço:</Text>
                <Text
                  style={styles.fieldValue}
                >{`${formData.endereco || ""}, ${formData.numeroCasa || ""} - ${formData.complemento || ""} - ${formData.bairro || ""}`}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>Contato:</Text>
                <Text style={styles.fieldValue}>{formData.contato || " "}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.fieldLabel}>E-mail:</Text>
                <Text style={styles.fieldValue}>
                  {formData.emailServidor || " "}
                </Text>
              </View>

              <View style={styles.feriasContainer}>
                <View style={styles.optionItem}>
                  <Text>Tem férias agendadas nos próximos 30 dias?</Text>
                  <View style={styles.optionItem}>
                    <View
                      style={
                        formData.funcaoConfianca === "sim"
                          ? styles.radioCircleFilled
                          : styles.radioCircle
                      }
                    />
                    <Text style={styles.optionText}>Sim</Text>
                  </View>
                  <View style={styles.optionItem}>
                    <View
                      style={
                        formData.funcaoConfianca === "nao"
                          ? styles.radioCircleFilled
                          : styles.radioCircle
                      }
                    />
                    <Text style={styles.optionText}>Não</Text>
                  </View>
                  <Text> </Text>
                  {formData.funcaoConfianca === "sim" && (
                    <View>
                      <View style={styles.feriasDateRow}>
                        <Text style={styles.fieldLabel}>Data Saída: </Text>
                        <View style={styles.inputBox}>
                          <Text>
                            {formData.dataSaida
                              ? new Date(formData.dataSaida).toLocaleDateString(
                                  "pt-BR",
                                  { timeZone: "UTC" },
                                )
                              : " "}
                          </Text>
                        </View>
                        <Text style={styles.fieldLabel}>Data Retorno: </Text>
                        <View style={styles.inputBox}>
                          <Text>
                            {formData.dataRetorno
                              ? new Date(
                                  formData.dataRetorno,
                                ).toLocaleDateString("pt-BR", {
                                  timeZone: "UTC",
                                })
                              : " "}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>

                {/* --- Bloco Condicional que só aparece se a resposta for "Sim" --- */}
                {formData.funcaoConfianca === "sim" && (
                  <View style={styles.feriasWarningBox}>
                    <Text style={styles.textoBase}>
                      {/* O "ATENÇÃO:" que estava no seu primeiro exemplo */}
                      <Text style={styles.negrito}>ATENÇÃO: </Text>
                      {/* Parte do texto normal */}
                      Servidores com afastamento médico superior ou igual a 15
                      dias, protocolados nos 30 dias que antecedem o início das
                      férias terão o período suspenso.
                      {/* Segunda parte em negrito */}
                      <Text style={styles.negrito}>
                        {" "}
                        Após o retorno ao trabalho, será necessário agendar novo
                        período de férias.
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.signatureBoxData}>
              <Text style={styles.fieldValue}>
                Data:
                <Text>
                  {formData.dataAssinaturaServidor
                    ? new Date(
                        formData.dataAssinaturaServidor,
                      ).toLocaleDateString("pt-BR", { timeZone: "UTC" })
                    : " "}
                </Text>
              </Text>
              <View style={styles.signatureLine}>
                <Text>Assinatura do Servidor</Text>
              </View>
            </View>
          </View>
        </View>

        {/* --- AQUI ACONTECE O "CORTE" --- */}

        {/* --- SEÇÃO II: CHEFIA --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            II - PREENCHIMENTO DA CHEFIA IMEDIATA
          </Text>

          <View style={styles.content}>
            <Text style={styles.fieldLabel}>
              Descrição das funções exercidas pelo servidor:
            </Text>
            <View style={styles.multiLineValue}></View>

            <View style={styles.signatureBoxData}>
              <Text style={styles.fieldValue}>Data: {"____/____/______"}</Text>
              <View style={styles.signatureLine}>
                <Text>Assinatura e Carimbo da Chefia</Text>
              </View>
            </View>
          </View>
        </View>

        {/* --- SEÇÃO III: GESAT --- */}
        <View style={styles.sectionGesat}>
          <Text style={styles.sectionTitle}>
            III - PREENCHIMENTO DA GESAT/MEDICINA DO TRABALHO
          </Text>
          <View style={styles.contentGesat}>
            <View style={styles.finalSectionRow}>
              <ul>
                <View>
                  <Text>( ) ADMISSIONAL</Text>
                  <Text>( ) DEMISSIONAL</Text>
                  <Text>( ) PERIÓDICO</Text>
                  <Text>( ) RETORNO AO TRABALHO</Text>
                  <Text>( ) READAPTAÇÃO / RESTRIÇÃO MÉDICA</Text>
                  <Text>( ) LICENÇA POR ACIDENTE DE TRABALHO</Text>
                  <Text>( ) LICENÇA PARA TRATAMENTO DE SAÚDE</Text>
                  <Text>
                    ( ) OUTROS: ________________________________________________
                  </Text>
                </View>
              </ul>
              <View style={styles.rightColumn2}>
                <Text>O servidor (a) está afastado (a) consecutivamente?</Text>
                <Text>( ) SIM ( ) NÃO</Text>
                <Text>Desde de:___/___/_____</Text>

                <Text>O servidor (a) encontra-se readaptado?</Text>
                <Text>( ) SIM ( ) NÃO</Text>
                <Text>Desde de:___/___/_____</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        {/* --- SEÇÃO AVALIAÇÃO MÉDICA --- */}
        {/* <View style={styles.middleRow}>
          <Text style={styles.middleRowText}>
            GESAT – Gerência de Saúde Ocupacional, Segurança do Trabalho e Assistência ao Servidor
          </Text>
        </View>

        {/* --- Linha Inferior (Título do Relatório) --- */}
        <View style={styles.section}>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomRowTitle}>
              RELATÓRIO DE INSPEÇÃO MÉDICA
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.finalSectionRow}>
            <Text>Nome do Paciente: </Text>
            <Text style={styles.fieldValue}>{formData.nome || " "}</Text>
          </View>
        </View>

        <Text style={styles.title}>RESULTADO DA AVALIAÇÃO MÉDICA</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico (Anamnese)</Text>
          <View style={styles.multiLineValue}></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Exames clínico e complementar (anexar resultados)
          </Text>
          <View style={styles.multiLineValue}></View>
        </View>

        <View style={styles.twoColumnContainer}>
          <View style={[styles.leftColumn, { flex: 3 }]}>
            <Text style={styles.sectionTitle}>Diagnóstico e observações:</Text>
            <View style={styles.multiLineValue}></View>
          </View>

          <View style={[{ flex: 1 }]}>
            <Text style={styles.sectionTitle}>CID 10:</Text>
            <View style={styles.multiLineValue}></View>
          </View>
        </View>

        {/* --- SEÇÃO CONCLUSÃO --- */}
        <View style={[styles.section, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>Conclusão</Text>
          <View style={styles.content}>
            <View style={styles.finalSectionRow}>
              <Text>Período solicitado de:___/___/_____</Text>
              <Text>dias, a partir de:___/___/_____</Text>
            </View>
            <View style={styles.finalSectionRow}>
              <Text>Obteve:___</Text>
              <Text>dias de licença, de:___/___/_____ a ___/___/_____ </Text>
              {/* <Text>a</Text><Text style={styles.finalSectionInput}>{formData.licencaA || ' '}</Text> */}
            </View>
            <View style={styles.finalSectionRow}>
              <Text>Licença não concedida. Motivo:</Text>
              <Text style={styles.finalSectionInputLong}></Text>
            </View>

            <View style={styles.finalSectionRow}>
              <Text>Encaminhar para:</Text>
              <ul>
                <View style={styles.optionsContainer}>
                  <Text>( ) IPREM</Text>
                  <Text>( ) INSS</Text>
                  <Text>
                    ( ) Outro:
                    ___________________________________________________
                  </Text>
                  <View style={styles.outroLine} />
                </View>
              </ul>
            </View>

            {/* <View style={styles.finalSectionRow}><Text>Encaminhar para:</Text><Text style={styles.finalSectionInputLong}>{`${formData.encaminharPara || ''}${formData.encaminharPara === 'Outro' ? `: ${formData.encaminharOutro}` : ''}`}</Text></View> */}
            <View style={styles.finalSectionRow}>
              <Text>Inapto para a função de:</Text>
              <Text style={styles.finalSectionInputLong}></Text>
            </View>
            <View style={styles.finalSectionRow}>
              <Text>Apto para a função de:</Text>
              <Text style={styles.finalSectionInputLong}></Text>
            </View>
            <View style={styles.finalSectionRow}>
              <Text>Outros:</Text>
              <Text style={styles.finalSectionInputLong}></Text>
            </View>
          </View>
        </View>

        {/* --- SEÇÃO FINAL ASSINATURA --- */}
        <View style={styles.twoColumnContainer}>
          <View style={[styles.column, styles.leftColumn]}>
            <Text style={styles.bold}>
              Data da Avaliação Médica e Homologação do Atestado Médico:
            </Text>
            <Text> </Text>
            <Text>___/___/_____</Text>
            <Text style={{ marginTop: 20 }}></Text>
          </View>
          <View style={[styles.column, styles.rightColumn]}>
            <Text style={styles.bold}>
              Assinatura/Carimbo/CRM do médico de trabalho:
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RelatorioInspecaoMedicaPdf;
