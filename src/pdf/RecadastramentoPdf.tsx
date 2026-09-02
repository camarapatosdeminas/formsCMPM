import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Fragment, type ReactNode } from "react";
import type { RecadastramentoData } from "../types/recadastramento";

Font.registerHyphenationCallback((word) => {
  if (word.length <= 24) return [word];
  return word.match(/.{1,18}/g) ?? [word];
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.4,
    lineHeight: 1.38,
    paddingTop: 96,
    paddingRight: 42,
    paddingBottom: 48,
    paddingLeft: 42,
    color: "#172033",
  },
  header: {
    position: "absolute",
    top: 24,
    left: 42,
    right: 42,
    borderBottomWidth: 1,
    borderBottomColor: "#8aa2bd",
    paddingBottom: 8,
  },
  institution: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: "#234e7c",
    letterSpacing: 0.35,
  },
  institutionMeta: {
    textAlign: "center",
    fontSize: 7.5,
    marginTop: 2,
    color: "#536579",
  },
  annexTitle: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 11.5,
    marginTop: 6,
    color: "#172033",
  },
  footerLeft: {
    position: "absolute",
    bottom: 20,
    left: 42,
    fontSize: 7,
    color: "#607286",
  },
  footerRight: {
    position: "absolute",
    bottom: 20,
    right: 42,
    fontSize: 7,
    color: "#607286",
    textAlign: "right",
  },
  footerRule: {
    position: "absolute",
    bottom: 32,
    left: 42,
    right: 42,
    borderTopWidth: 0.7,
    borderTopColor: "#c5d0dc",
  },
  portariaPage: {
    fontFamily: "Times-Roman",
    fontSize: 9.4,
    lineHeight: 1.35,
    paddingTop: 108,
    paddingRight: 54,
    paddingBottom: 44,
    paddingLeft: 54,
    color: "#1f2937",
  },
  portariaHeader: {
    position: "absolute",
    top: 24,
    left: 54,
    right: 54,
    paddingBottom: 7,
    borderBottomWidth: 0.6,
    borderBottomColor: "#9ca3af",
  },
  portariaInstitution: {
    textAlign: "center",
    fontFamily: "Times-Bold",
    fontSize: 17,
    lineHeight: 1.05,
    color: "#4b5563",
    letterSpacing: 0.3,
  },
  portariaMetaBlock: {
    marginTop: 5,
  },
  portariaInstitutionMeta: {
    textAlign: "center",
    fontSize: 7.2,
    lineHeight: 1.2,
    color: "#6b7280",
  },
  portariaTitle: {
    textAlign: "center",
    fontFamily: "Times-Bold",
    fontSize: 10.8,
    marginBottom: 23,
    letterSpacing: 0.15,
  },
  portariaEmenta: {
    width: "61%",
    alignSelf: "flex-end",
    fontFamily: "Times-Bold",
    fontSize: 9.3,
    textAlign: "justify",
    lineHeight: 1.35,
    marginBottom: 22,
  },
  portariaParagraph: {
    textAlign: "justify",
    marginBottom: 10,
    textIndent: 55,
  },
  portariaConsiderando: {
    textAlign: "justify",
    marginBottom: 11,
    textIndent: 55,
  },
  portariaResolve: {
    textAlign: "center",
    fontFamily: "Times-Bold",
    fontSize: 10,
    marginVertical: 8,
  },
  portariaArticle: {
    textAlign: "justify",
    marginBottom: 10,
    textIndent: 55,
  },
  portariaContinuation: {
    textAlign: "justify",
    marginBottom: 11,
  },
  portariaSignature: {
    alignSelf: "center",
    width: "62%",
    marginTop: 24,
    paddingTop: 5,
    borderTopWidth: 0.7,
    borderTopColor: "#374151",
    textAlign: "center",
  },
  portariaSigner: {
    fontFamily: "Times-Bold",
    fontSize: 10,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: "#ffffff",
    backgroundColor: "#35679c",
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    borderLeftWidth: 0.7,
    borderBottomWidth: 0.7,
    borderColor: "#91a1b2",
  },
  field: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRightWidth: 0.7,
    borderColor: "#91a1b2",
    minHeight: 31,
  },
  fieldLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 6.8,
    color: "#607286",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  fieldValue: {
    fontSize: 9,
    color: "#111827",
  },
  paragraph: {
    textAlign: "justify",
    marginBottom: 10,
    lineHeight: 1.48,
  },
  legalLead: {
    fontFamily: "Helvetica-Bold",
  },
  note: {
    marginTop: 9,
    padding: 8,
    backgroundColor: "#eef4fa",
    borderLeftWidth: 3,
    borderLeftColor: "#35679c",
    fontSize: 8,
    lineHeight: 1.4,
  },
  signatureDate: {
    textAlign: "center",
    marginTop: 24,
    marginBottom: 30,
  },
  signature: {
    alignSelf: "center",
    width: "56%",
    borderTopWidth: 0.8,
    borderTopColor: "#172033",
    paddingTop: 4,
    textAlign: "center",
    fontSize: 8,
  },
  signatureGrid: {
    flexDirection: "row",
    marginTop: 24,
    borderWidth: 0.7,
    borderColor: "#91a1b2",
  },
  signatureCell: {
    width: "50%",
    minHeight: 58,
    padding: 9,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRightWidth: 0.7,
    borderRightColor: "#91a1b2",
  },
  signatureLine: {
    width: "82%",
    borderTopWidth: 0.7,
    borderTopColor: "#172033",
    paddingTop: 3,
    textAlign: "center",
    fontSize: 7.5,
  },
  assetIndex: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#234e7c",
    backgroundColor: "#eef4fa",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderWidth: 0.7,
    borderColor: "#91a1b2",
    marginTop: 4,
  },
  assetDescription: {
    padding: 7,
    borderLeftWidth: 0.7,
    borderRightWidth: 0.7,
    borderColor: "#91a1b2",
    lineHeight: 1.42,
  },
  assetValue: {
    padding: 7,
    borderWidth: 0.7,
    borderColor: "#91a1b2",
    marginBottom: 9,
  },
  longFieldBlock: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderLeftWidth: 0.7,
    borderRightWidth: 0.7,
    borderBottomWidth: 0.7,
    borderColor: "#91a1b2",
    fontSize: 8.2,
    lineHeight: 1.28,
  },
  dependentsHeader: {
    flexDirection: "row",
    backgroundColor: "#35679c",
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    textAlign: "center",
  },
  dependentRow: {
    flexDirection: "row",
    borderLeftWidth: 0.7,
    borderBottomWidth: 0.7,
    borderColor: "#91a1b2",
  },
  tableCell: {
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderRightWidth: 0.7,
    borderColor: "#91a1b2",
  },
  option: {
    marginBottom: 7,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: "#f5f7fa",
    borderLeftWidth: 2,
    borderLeftColor: "#91a1b2",
  },
});

const vazio = "-";
const value = (text?: string) => text?.trim() || vazio;

const formatDate = (iso: string) => {
  if (!iso) return vazio;
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${day}/${month}/${year}` : iso;
};

const checkbox = (selected: boolean) => (selected ? "[X]" : "[ ]");

const chunkText = (text: string, maxLength = 620) => {
  const words = value(text).split(/\s+/);
  const chunks: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLength && current) {
      chunks.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) chunks.push(current);
  return chunks.length ? chunks : [vazio];
};

interface AssetSegment {
  assetIndex: number;
  partIndex: number;
  totalParts: number;
  text: string;
  value: string;
}

const paginateAssets = (bens: RecadastramentoData["bens"]) => {
  const segments: AssetSegment[] = bens.flatMap((bem, assetIndex) => {
    const parts = chunkText(bem.descricao, 700);
    return parts.map((text, partIndex) => ({
      assetIndex,
      partIndex,
      totalParts: parts.length,
      text,
      value: bem.valor,
    }));
  });

  if (!segments.length) return [[]];

  const pages: AssetSegment[][] = [[]];
  const weights = [0];

  segments.forEach((segment) => {
    let pageIndex = pages.length - 1;
    const capacity = pageIndex === 0 ? 800 : 850;
    const weight = segment.text.length + 170;

    if (pages[pageIndex].length > 0 && weights[pageIndex] + weight > capacity) {
      pages.push([]);
      weights.push(0);
      pageIndex += 1;
    }

    pages[pageIndex].push(segment);
    weights[pageIndex] += weight;
  });

  if (weights[weights.length - 1] > 400) {
    pages.push([]);
  }

  return pages;
};

function Cabecalho({ titulo, fixed = false }: { titulo: string; fixed?: boolean }) {
  return (
    <View style={styles.header} fixed={fixed}>
      <Text style={styles.institution}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
      <Text style={styles.institutionMeta}>
        Rua José de Santana, 470, Centro, Patos de Minas/MG - CEP 38.700-052
      </Text>
      <Text style={styles.annexTitle}>{titulo}</Text>
    </View>
  );
}

function Rodape() {
  return (
    <>
      <View style={styles.footerRule} fixed />
      <Text style={styles.footerLeft} fixed>Portaria nº 1.798, de 5 de abril de 2023</Text>
    </>
  );
}

const dataAtualExtenso = () => {
  const data = new Date();
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(data);
};

function CabecalhoPortaria() {
  return (
    <View style={styles.portariaHeader}>
      <Text style={styles.portariaInstitution}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
      <View style={styles.portariaMetaBlock}>
        <Text style={styles.portariaInstitutionMeta}>
          Rua José de Santana, 470, Centro, Patos de Minas/MG - CEP: 38.700-052
        </Text>
        <Text style={styles.portariaInstitutionMeta}>Tel.: (34) 3821-8455</Text>
        <Text style={styles.portariaInstitutionMeta}>
          E-mail: camarapatos@camarapatos.mg.gov.br - https://www.camarapatos.mg.gov.br
        </Text>
      </View>
    </View>
  );
}

function Portaria() {
  return (
    <>
      <Page size="A4" style={styles.portariaPage} wrap>
        <CabecalhoPortaria />
        <Text style={styles.portariaTitle}>PORTARIA Nº 1798, DE 5 DE ABRIL DE 2023.</Text>
        <Text style={styles.portariaEmenta}>
          Dispõe sobre os critérios para a realização de recadastramento dos servidores e vereadores da Câmara Municipal de Patos de Minas; e dá outras providências.
        </Text>

        <Text style={styles.portariaParagraph}>
          O Presidente da Câmara Municipal de Patos de Minas, no uso das atribuições que lhe confere o Regimento Interno da Câmara Municipal de Patos de Minas e considerando o disposto na alínea “e” do art. 17 da Resolução nº 262, de 16 de julho de 2010,
        </Text>
        <Text style={styles.portariaConsiderando}>
          CONSIDERANDO a necessidade de implementar procedimentos internos mais céleres e menos burocráticos,
        </Text>
        <Text style={styles.portariaConsiderando}>
          CONSIDERANDO o parecer favorável emitido pela Controladoria Interna no bojo do Memorando nº 07/2023, em resposta ao Requerimento Administrativo nº 32/2023,
        </Text>
        <Text style={styles.portariaResolve}>RESOLVE:</Text>

        <Text style={styles.portariaArticle}>
          Art. 1º Fica instituído o recadastramento dos servidores e vereadores da Câmara Municipal de Patos de Minas, obrigatório a cada 4 (quatro) anos.
        </Text>
        <Text style={styles.portariaArticle}>
          Art. 2º Os servidores e vereadores que eventualmente não tiverem realizado o cadastramento no mês de janeiro, em razão de sua admissão, deverão protocolar, junto à Divisão de Recursos Humanos, até o último dia útil do mês de março, do primeiro ano de cada legislatura, formulário de recadastramento e declarações preenchidos, datados e assinados conforme os modelos constantes no anexo desta Portaria.
        </Text>
        <Text style={styles.portariaArticle}>
          Art. 3º Os modelos a serem utilizados estarão disponíveis no “Portal de Acesso à Informação” disponível no sítio da Câmara Municipal de Patos de Minas, na internet.
        </Text>
        <Text style={styles.portariaArticle}>
          Art. 4º Dúvidas com relação ao preenchimento do formulário e das declarações poderão ser sanadas junto à Divisão de Recursos Humanos e Controladoria Interna.
        </Text>
        <Text style={styles.portariaArticle}>
          Art. 5º O servidor ou vereador que não observar o prazo previsto no art. 2º poderá ter seu pagamento bloqueado pela Divisão de Recursos Humanos, até a regularização da situação.
        </Text>
        <Text style={styles.portariaArticle}>
          Art. 6º Caberá a cada servidor e vereador a manutenção de seus dados atualizados, devendo comunicar à Divisão de Recursos Humanos, imediatamente, alteração de dados posterior ao recadastramento, como endereço, telefone, e-mail, alteração de dependentes ou quaisquer outras informações relevantes à manutenção atualizada de seus cadastros funcionais, sob pena de responsabilização pessoal.
        </Text>
        <Text style={styles.portariaArticle}>
          Art. 7º Os servidores e vereadores que não tiverem sofrido alterações em seus dados cadastrais deverão apresentar declaração simplificada à Divisão de Recursos Humanos, até no
        </Text>
      </Page>

      <Page size="A4" style={styles.portariaPage} wrap>
        <CabecalhoPortaria />
        <Text style={styles.portariaContinuation}>
          último dia útil do mês de março, do terceiro ano da legislatura, sob pena de sofrer as mesmas sanções do art. 5º.
        </Text>
        <Text style={styles.portariaArticle}>
          Art. 8º Fica revogada a Portaria nº 1.347, de 09 de fevereiro de 2017.
        </Text>
        <Text style={styles.portariaArticle}>
          Art. 9º Esta Portaria entra em vigor na data de sua publicação.
        </Text>
        <Text style={styles.portariaArticle}>Art. 10. Publique-se e cumpra-se.</Text>
        <Text style={[styles.portariaParagraph, { marginTop: 14, textIndent: 0 }]}>
          Câmara Municipal de Patos de Minas, {dataAtualExtenso()}.
        </Text>

        <View style={styles.portariaSignature}>
          <Text style={styles.portariaSigner}>João Batista Gonçalves (Cabo Batista)</Text>
          <Text>Presidente da Câmara Municipal</Text>
        </View>
      </Page>
    </>
  );
}

function Campo({
  label,
  children,
  width = "50%",
}: {
  label: string;
  children: ReactNode;
  width?: string;
}) {
  return (
    <View style={[styles.field, { width }]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{children}</Text>
    </View>
  );
}

function DataEAssinatura({ data, pessoa }: { data: string; pessoa: string }) {
  return (
    <>
      <Text style={styles.signatureDate}>
        Patos de Minas - MG, {formatDate(data)}.
      </Text>
      <View style={styles.signature}>
        <Text>Assinatura do(a) declarante - {value(pessoa)}</Text>
      </View>
    </>
  );
}

function NotasEAssinaturasAnexoI({ data }: { data: RecadastramentoData }) {
  return (
    <>
      <View style={styles.note}>
        <Text>
          Documentos a serem apresentados na Divisão de Recursos Humanos: Formulário de Recadastramento do funcionário; Declaração de não acúmulo de cargos; Declaração de bens; Declaração de Atualização de Cadastro; Relação de Dependentes.
        </Text>
        <Text style={{ marginTop: 3 }}>
          Observação: apresentar fotocópia do documento de identidade caso tenha mudado de nome em virtude de divórcio ou outros processos judiciais.
        </Text>
      </View>

      <View wrap={false}>
        <View style={styles.signatureGrid}>
          <View style={styles.signatureCell}>
            <Text style={styles.signatureLine}>Declarante - {value(data.nome)}</Text>
          </View>
          <View style={[styles.signatureCell, { borderRightWidth: 0 }]}>
            <Text style={styles.signatureLine}>Data do cadastramento/recadastramento - {formatDate(data.dataDeclaracao)}</Text>
          </View>
        </View>
        <View style={[styles.signatureGrid, { marginTop: 0 }]}>
          <View style={styles.signatureCell}>
            <Text style={styles.signatureLine}>Divisão de Recursos Humanos</Text>
          </View>
          <View style={[styles.signatureCell, { borderRightWidth: 0 }]}>
            <Text style={styles.signatureLine}>Controladoria Interna</Text>
          </View>
        </View>
      </View>
    </>
  );
}

function AnexoI({ data }: { data: RecadastramentoData }) {
  const vinculo = (nome: RecadastramentoData["vinculo"]) =>
    checkbox(data.vinculo === nome);
  const atividadeLonga = data.exerceAtividadeRemunerada
    && data.atividadeRemuneradaDetalhes.trim().length > 420;
  const atividadeChunks = atividadeLonga
    ? chunkText(data.atividadeRemuneradaDetalhes, 700)
    : [];

  return (
    <>
      <Page size="A4" style={styles.page} wrap>
        <Cabecalho titulo="ANEXO I - FORMULÁRIO DE RECADASTRAMENTO" />
        <Rodape />

      <Text style={styles.sectionTitle}>DADOS PESSOAIS</Text>
      <View style={styles.row}>
        <Campo label="Matrícula" width="25%">{value(data.matricula)}</Campo>
        <Campo label="Nome" width="75%">{value(data.nome)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Data de nascimento" width="25%">{formatDate(data.dataNascimento)}</Campo>
        <Campo label="Naturalidade" width="45%">{value(data.naturalidade)}</Campo>
        <Campo label="UF de nascimento" width="30%">{value(data.ufNascimento)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Nacionalidade" width="35%">{value(data.nacionalidade)}</Campo>
        <Campo label="Estado civil" width="35%">{value(data.estadoCivil)}</Campo>
        <Campo label="Sexo" width="30%">{value(data.sexo)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Possui deficiência" width="30%">{data.possuiDeficiencia ? "Sim" : "Não"}</Campo>
        <Campo label="Tipo de deficiência" width="70%">{data.possuiDeficiencia ? value(data.tipoDeficiencia) : "Não se aplica"}</Campo>
      </View>

      <Text style={styles.sectionTitle}>DOCUMENTOS</Text>
      <View style={styles.row}>
        <Campo label="CPF" width="25%">{value(data.cpf)}</Campo>
        <Campo label="RG" width="22%">{value(data.rg)}</Campo>
        <Campo label="Emissor" width="18%">{value(data.rgEmissor)}</Campo>
        <Campo label="UF" width="12%">{value(data.rgUf)}</Campo>
        <Campo label="Data" width="23%">{formatDate(data.rgData)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Título de eleitor nº" width="38%">{value(data.tituloEleitor)}</Campo>
        <Campo label="Zona nº" width="22%">{value(data.zonaEleitoral)}</Campo>
        <Campo label="Seção nº" width="22%">{value(data.secaoEleitoral)}</Campo>
        <Campo label="UF" width="18%">{value(data.eleitorUf)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="PIS/PASEP" width="28%">{value(data.pisPasep)}</Campo>
        <Campo label="CTPS" width="22%">{value(data.ctps)}</Campo>
        <Campo label="Série" width="18%">{value(data.ctpsSerie)}</Campo>
        <Campo label="UF" width="12%">{value(data.ctpsUf)}</Campo>
        <Campo label="Emissão" width="20%">{formatDate(data.ctpsEmissao)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Conselho regional nº" width="30%">{value(data.conselhoNumero)}</Campo>
        <Campo label="Órgão do conselho" width="26%">{value(data.conselhoOrgao)}</Campo>
        <Campo label="Reservista" width="20%">{value(data.reservista)}</Campo>
        <Campo label="Órgão reservista" width="24%">{value(data.orgaoReservista)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="CNH" width="65%">{value(data.cnh)}</Campo>
        <Campo label="Categoria" width="35%">{value(data.cnhCategoria)}</Campo>
      </View>

      <Text style={styles.sectionTitle}>ENDEREÇO</Text>
      <View style={styles.row}>
        <Campo label="Logradouro" width="76%">{value(data.logradouro)}</Campo>
        <Campo label="Número" width="24%">{value(data.numero)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Complemento" width="45%">{value(data.complemento)}</Campo>
        <Campo label="Bairro" width="35%">{value(data.bairro)}</Campo>
        <Campo label="CEP" width="20%">{value(data.cep)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Cidade" width="48%">{value(data.cidade)}</Campo>
        <Campo label="UF" width="12%">{value(data.enderecoUf)}</Campo>
        <Campo label="Telefone" width="20%">{value(data.telefone)}</Campo>
        <Campo label="Celular" width="20%">{value(data.celular)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="E-mail" width="100%">{value(data.email)}</Campo>
      </View>

      </Page>

      <Page size="A4" style={styles.page} wrap>
      <Cabecalho titulo="ANEXO I - FORMULÁRIO DE RECADASTRAMENTO" />
      <Rodape />

      <Text style={[styles.sectionTitle, { marginTop: 0 }]}>DADOS FUNCIONAIS</Text>
      <View style={styles.row}>
        <Campo label="Admissão" width="22%">{formatDate(data.admissao)}</Campo>
        <Campo label="Vínculo" width="78%">
          {`${vinculo("efetivo")} Efetivo    ${vinculo("comissionado")} Comissionado    ${vinculo("cedido")} Cedido    ${vinculo("agentePolitico")} Agente político`}
        </Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Órgão de cessão" width="100%">{value(data.orgaoCessao)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Cargo do concurso" width="45%">{value(data.cargoConcurso)}</Campo>
        <Campo label="Cargo/Função que exerce" width="55%">{value(data.cargoFuncao)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Lotação atual" width="100%">{value(data.lotacao)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Grau de instrução" width="38%">{value(data.grauInstrucao)}</Campo>
        <Campo label="Formação/Graduação" width="62%">{value(data.formacao)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Caixa Econômica Federal - Agência" width="35%">{value(data.agencia)}</Campo>
        <Campo label="Operação" width="25%">{value(data.operacao)}</Campo>
        <Campo label="Conta" width="40%">{value(data.conta)}</Campo>
      </View>
      <View style={styles.row}>
        <Campo label="Exerce outra atividade remunerada?" width="100%">{data.exerceAtividadeRemunerada ? "Sim" : "Não"}</Campo>
      </View>
      {data.exerceAtividadeRemunerada && !atividadeLonga && (
        <Text style={styles.longFieldBlock}>
          <Text style={styles.fieldLabel}>ATIVIDADE(S) E HORÁRIOS{"\n"}</Text>
          {value(data.atividadeRemuneradaDetalhes)}
        </Text>
      )}
      {atividadeLonga && (
        <Text style={styles.longFieldBlock}>
          <Text style={styles.fieldLabel}>ATIVIDADE(S) E HORÁRIOS{"\n"}</Text>
          Conteúdo detalhado nas páginas seguintes deste anexo.
        </Text>
      )}

      {!atividadeLonga && <NotasEAssinaturasAnexoI data={data} />}
      </Page>

      {atividadeChunks.map((chunk, index) => (
        <Page key={`atividade-page-${index}`} size="A4" style={styles.page} wrap>
          <Cabecalho titulo="ANEXO I - FORMULÁRIO DE RECADASTRAMENTO" />
          <Rodape />
          <Text style={[styles.sectionTitle, { marginTop: 0 }]}>ATIVIDADE(S) REMUNERADA(S) E HORÁRIOS - CONTINUAÇÃO</Text>
          <Text style={styles.longFieldBlock}>{chunk}</Text>
        </Page>
      ))}

      {atividadeLonga && (
        <Page size="A4" style={styles.page} wrap>
          <Cabecalho titulo="ANEXO I - FORMULÁRIO DE RECADASTRAMENTO" />
          <Rodape />
          <NotasEAssinaturasAnexoI data={data} />
        </Page>
      )}
    </>
  );
}

function AnexoII({ data }: { data: RecadastramentoData }) {
  const pages = paginateAssets(data.bens);

  return (
    <>
      {pages.map((segments, pageIndex) => {
        const isFirst = pageIndex === 0;
        const isLast = pageIndex === pages.length - 1;

        return (
          <Page key={`assets-page-${pageIndex}`} size="A4" style={styles.page} wrap>
            <Cabecalho titulo="ANEXO II - DECLARAÇÃO DE BENS" />
            <Rodape />

            {isFirst && (
              <Text style={styles.paragraph}>
                Eu, <Text style={styles.legalLead}>{value(data.nome)}</Text>, brasileiro(a), portador(a) do RG nº <Text style={styles.legalLead}>{value(data.rg)}</Text> e do CPF nº <Text style={styles.legalLead}>{value(data.cpf)}</Text>, residente e domiciliado(a) à <Text style={styles.legalLead}>{`${value(data.logradouro)}, ${value(data.numero)}, ${value(data.bairro)}, ${value(data.cidade)}/${value(data.enderecoUf)}`}</Text>, DECLARO, para os devidos fins, que até a presente data o meu patrimônio é constituído pelos bens arrolados a seguir:
              </Text>
            )}

            {segments.map((segment) => {
              const isContinuation = segment.partIndex > 0;
              const isFinalPart = segment.partIndex === segment.totalParts - 1;
              return (
                <Fragment key={`${segment.assetIndex}-${segment.partIndex}`}>
                  <Text style={styles.assetIndex}>
                    {`${segment.assetIndex + 1}º BEM${isContinuation ? " - CONTINUAÇÃO" : ""}`}
                  </Text>
                  <Text style={styles.assetDescription}>
                    <Text style={styles.fieldLabel}>DESCRIÇÃO DO BEM{"\n"}</Text>
                    {segment.text}
                  </Text>
                  {isFinalPart && (
                    <Text style={styles.assetValue}>
                      <Text style={styles.fieldLabel}>VALOR DO BEM (R$): </Text>
                      {value(segment.value)}
                    </Text>
                  )}
                </Fragment>
              );
            })}

            {isLast && (
              <>
                <Text style={[styles.paragraph, { marginTop: 8 }]}>
                  Sendo o que havia a declarar e por ser a expressão da verdade, firmo a presente declaração.
                </Text>
                <DataEAssinatura data={data.dataDeclaracao} pessoa={data.nome} />
              </>
            )}
          </Page>
        );
      })}
    </>
  );
}

function AnexoIII({ data }: { data: RecadastramentoData }) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <Cabecalho titulo="ANEXO III - DECLARAÇÃO DE NÃO ACUMULAÇÃO DE CARGOS - SERVIDOR" />
      <Rodape />

      <Text style={styles.paragraph}>
        Eu, <Text style={styles.legalLead}>{value(data.nome)}</Text>, portador(a) do RG nº <Text style={styles.legalLead}>{value(data.rg)}</Text> e do CPF nº <Text style={styles.legalLead}>{value(data.cpf)}</Text>, residente e domiciliado(a) à <Text style={styles.legalLead}>{`${value(data.logradouro)}, ${value(data.numero)}, ${value(data.bairro)}, ${value(data.cidade)}/${value(data.enderecoUf)}`}</Text>, DECLARO QUE NÃO EXERÇO cargo, função ou emprego público junto à administração pública direta, autarquias, fundações, empresas públicas, sociedade de economia mista, suas subsidiárias e sociedades controladas direta ou indiretamente pelo poder público, de conformidade com os incisos XVI e XVII do art. 37 da Constituição Federal de 05/10/1988 e art. 41 da Lei Orgânica do Município de Patos de Minas.
      </Text>
      <Text style={styles.paragraph}>
        DECLARO, outrossim, QUE NÃO PERCEBO proventos de aposentadoria decorrente do art. 40 ou dos arts. 42 e 142 da Constituição Federal, que sejam inacumuláveis com meu cargo.
      </Text>
      <Text style={styles.paragraph}>
        DECLARO, mais, estar ciente de que devo comunicar à Câmara Municipal de Patos de Minas qualquer alteração que venha a ocorrer em minha vida funcional que não atenda às determinações legais vigentes relativamente à acumulação de cargos, sob pena de responder legalmente por isso.
      </Text>
      <Text style={styles.paragraph}>
        DECLARO, ainda, estar ciente de que prestar declaração falsa é crime previsto no art. 299 do Código Penal Brasileiro, sujeitando-me às penas, sem prejuízo de outras sanções cabíveis.
      </Text>
      <Text style={styles.paragraph}>
        DECLARO, por fim, que tomo ciência de toda a legislação suprarreferida.
      </Text>
      <DataEAssinatura data={data.dataDeclaracao} pessoa={data.nome} />
    </Page>
  );
}

function AnexoIV({ data }: { data: RecadastramentoData }) {
  const opt = (id: RecadastramentoData["situacaoVereador"]) =>
    checkbox(data.situacaoVereador === id);

  return (
    <Page size="A4" style={styles.page} wrap>
      <Cabecalho titulo="ANEXO IV - DECLARAÇÃO DE NÃO ACUMULAÇÃO DE CARGOS - VEREADOR" />
      <Rodape />

      <Text style={styles.paragraph}>
        Eu, <Text style={styles.legalLead}>{value(data.nome)}</Text>, portador(a) do RG nº <Text style={styles.legalLead}>{value(data.rg)}</Text> e do CPF nº <Text style={styles.legalLead}>{value(data.cpf)}</Text>, residente e domiciliado(a) à <Text style={styles.legalLead}>{`${value(data.logradouro)}, ${value(data.numero)}, ${value(data.bairro)}, ${value(data.cidade)}/${value(data.enderecoUf)}`}</Text>, DECLARO QUE não exerço cargo, função ou emprego público junto à administração pública direta, autarquias, fundações, empresas públicas, sociedade de economia mista, suas subsidiárias e sociedades controladas direta ou indiretamente pelo poder público, de conformidade com os incisos XVI e XVII do art. 37 da Constituição Federal de 05/10/1988 e art. 41 da Lei Orgânica do Município de Patos de Minas. DECLARO, outrossim, QUE NÃO PERCEBO proventos de aposentadoria decorrente do art. 40 ou dos arts. 42 e 142 da Constituição Federal, que sejam inacumuláveis com os de vereador.
      </Text>

      <Text style={styles.option}>{`${opt("naoServidor")} DECLARO que não sou servidor público em exercício de mandato eletivo.`}</Text>
      <Text style={styles.option}>{`${opt("servidorCompativel")} DECLARO que sou servidor público em exercício de mandato eletivo de vereador, com compatibilidade de horários, em conformidade com o inciso III do art. 42 da Lei Orgânica do Município de Patos de Minas.`}</Text>
      <Text style={styles.option}>{`${opt("servidorIncompativel")} DECLARO que sou servidor público em exercício de mandato eletivo de vereador e, em virtude da incompatibilidade de horários, em conformidade com o art. 49 da Lei Orgânica do Município de Patos de Minas, ${checkbox(data.opcaoRemuneracao === "opta")} opto ${checkbox(data.opcaoRemuneracao === "naoOpta")} não opto pela remuneração do cargo efetivo.`}</Text>

      {data.situacaoVereador === "servidorIncompativel" && data.opcaoRemuneracao === "naoOpta" && (
        <Text style={styles.option}>
          SE NÃO OPTAR PELA REMUNERAÇÃO DO CARGO EFETIVO, DECLARO que as contribuições a serem revertidas ao Regime Próprio de Previdência deverão ser feitas tendo por base {checkbox(data.baseContribuicao === "subsidioVereador")} o subsídio de vereador {checkbox(data.baseContribuicao === "remuneracaoCargoEfetivo")} a remuneração do cargo efetivo.
        </Text>
      )}

      <Text style={styles.paragraph}>
        DECLARO, mais, estar ciente de que devo comunicar à Câmara Municipal de Patos de Minas qualquer alteração que venha a ocorrer em minha vida funcional que não atenda às determinações legais vigentes relativamente à acumulação de cargos, sob pena de responder legalmente por isso.
      </Text>
      <Text style={styles.paragraph}>
        DECLARO, ainda, estar ciente de que prestar declaração falsa é crime previsto no art. 299 do Código Penal Brasileiro, sujeitando-me às penas, sem prejuízo de outras sanções cabíveis.
      </Text>
      <Text style={styles.paragraph}>DECLARO, por fim, que tomo ciência de toda a legislação supramencionada.</Text>
      <DataEAssinatura data={data.dataDeclaracao} pessoa={data.nome} />
    </Page>
  );
}

function AnexoV({ data }: { data: RecadastramentoData }) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <Cabecalho titulo="ANEXO V - DECLARAÇÃO DE ATUALIZAÇÃO DE CADASTRO" />
      <Rodape />
      <Text style={styles.paragraph}>
        Eu, <Text style={styles.legalLead}>{value(data.nome)}</Text>, portador(a) do RG nº <Text style={styles.legalLead}>{value(data.rg)}</Text> e do CPF nº <Text style={styles.legalLead}>{value(data.cpf)}</Text>, {data.tipoPessoa === "vereador" ? "vereador(a)" : "servidor(a)"} da Câmara Municipal de Patos de Minas, na qual ocupo o cargo de <Text style={styles.legalLead}>{value(data.cargoFuncao)}</Text>, DECLARO QUE informarei à Divisão de Recursos Humanos, a título de atualização do meu cadastro funcional, sempre que mudar de endereço, telefone, e-mail e dependentes, assim como qualquer outra informação relevante à manutenção da atualização contínua do meu cadastro funcional.
      </Text>
      <Text style={styles.paragraph}>
        Sendo o que havia a declarar e por ser a expressão da verdade, firmo a presente declaração.
      </Text>
      <DataEAssinatura data={data.dataDeclaracao} pessoa={data.nome} />
    </Page>
  );
}

const widths = ["34%", "18%", "21%", "9%", "9%", "9%"];

function TableCell({ children, width }: { children: ReactNode; width: string }) {
  return <View style={[styles.tableCell, { width }]}><Text>{children}</Text></View>;
}

function AnexoVI({ data }: { data: RecadastramentoData }) {
  const dependentPages = data.dependentes.length
    ? Array.from({ length: Math.ceil(data.dependentes.length / 8) }, (_, pageIndex) =>
        data.dependentes.slice(pageIndex * 8, pageIndex * 8 + 8),
      )
    : [[]];

  return (
    <>
      {dependentPages.map((dependents, pageIndex) => {
        const isFirst = pageIndex === 0;
        const isLast = pageIndex === dependentPages.length - 1;

        return (
          <Page key={`dependents-page-${pageIndex}`} size="A4" style={styles.page} wrap>
            <Cabecalho titulo="ANEXO VI - DECLARAÇÃO DE DEPENDENTES" />
            <Rodape />

            {isFirst && (
              <>
                <View style={styles.row}>
                  <Campo label="Servidor(a)/Vereador(a)" width="62%">{value(data.nome)}</Campo>
                  <Campo label="Matrícula" width="38%">{value(data.matricula)}</Campo>
                </View>
                <View style={styles.row}>
                  <Campo label="Cargo" width="62%">{value(data.cargoFuncao)}</Campo>
                  <Campo label="Telefone" width="38%">{value(data.celular || data.telefone)}</Campo>
                </View>
                <Text style={[styles.sectionTitle, { marginTop: 16 }]}>DADOS DOS DEPENDENTES</Text>
              </>
            )}

            {!isFirst && <Text style={[styles.sectionTitle, { marginTop: 0 }]}>DADOS DOS DEPENDENTES - CONTINUAÇÃO</Text>}

            <View style={styles.dependentsHeader}>
              {[
                ["NOME", widths[0]],
                ["PARENTESCO", widths[1]],
                ["DATA NASC.", widths[2]],
                ["IR", widths[3]],
                ["AF", widths[4]],
                ["AM", widths[5]],
              ].map(([label, width]) => (
                <TableCell key={label} width={width}>{label}</TableCell>
              ))}
            </View>

            {data.dependentes.length ? (
              dependents.map((dep) => (
                <View key={dep.id} style={styles.dependentRow}>
                  <TableCell width={widths[0]}>{value(dep.nome)}</TableCell>
                  <TableCell width={widths[1]}>{value(dep.parentesco)}</TableCell>
                  <TableCell width={widths[2]}>{formatDate(dep.dataNascimento)}</TableCell>
                  <TableCell width={widths[3]}>{dep.ir ? "X" : ""}</TableCell>
                  <TableCell width={widths[4]}>{dep.af ? "X" : ""}</TableCell>
                  <TableCell width={widths[5]}>{dep.am ? "X" : ""}</TableCell>
                </View>
              ))
            ) : (
              <View style={styles.dependentRow}>
                <TableCell width="100%">Nenhum dependente declarado.</TableCell>
              </View>
            )}

            {isLast && (
              <>
                <View style={styles.note}>
                  <Text>Marcação: IR - Imposto de Renda; AF - Abono Família; AM - Assistência Médica e Odontológica.</Text>
                </View>
                <Text style={[styles.paragraph, { marginTop: 14 }]}>
                  Declaro, sob as penas da lei, que as informações prestadas são verdadeiras e comprometo-me a atualizar junto à Divisão de Recursos Humanos qualquer alteração das informações aqui registradas.
                </Text>
                <DataEAssinatura data={data.dataDeclaracao} pessoa={data.nome} />
              </>
            )}
          </Page>
        );
      })}
    </>
  );
}

function AnexoVII({ data }: { data: RecadastramentoData }) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <Cabecalho titulo="ANEXO VII - DECLARAÇÃO SIMPLIFICADA - ATUALIZAÇÃO CADASTRAL" />
      <Rodape />
      <Text style={styles.paragraph}>
        Eu, <Text style={styles.legalLead}>{value(data.nome)}</Text>, portador(a) do RG nº <Text style={styles.legalLead}>{value(data.rg)}</Text> e do CPF nº <Text style={styles.legalLead}>{value(data.cpf)}</Text>, {data.tipoPessoa === "vereador" ? "vereador(a)" : "servidor(a)"} da Câmara Municipal de Patos de Minas, na qual ocupo o cargo de <Text style={styles.legalLead}>{value(data.cargoFuncao)}</Text>, DECLARO QUE, desde o último cadastramento/recadastramento, não ocorreram alterações em meus dados cadastrais.
      </Text>
      <Text style={styles.paragraph}>
        Sendo o que havia a declarar e por ser a expressão da verdade, firmo a presente declaração.
      </Text>
      <DataEAssinatura data={data.dataDeclaracao} pessoa={data.nome} />
    </Page>
  );
}

const RecadastramentoPdf = ({ data }: { data: RecadastramentoData }) => (
  <Document
    title="Recadastramento - Câmara Municipal de Patos de Minas"
    author="Câmara Municipal de Patos de Minas"
    subject="Anexos da Portaria nº 1.798, de 5 de abril de 2023"
  >
    <Portaria />
    {data.tipoRecadastramento === "simplificado" ? (
      <AnexoVII data={data} />
    ) : (
      <>
        <AnexoI data={data} />
        <AnexoII data={data} />
        {data.tipoPessoa === "servidor" ? <AnexoIII data={data} /> : <AnexoIV data={data} />}
        <AnexoV data={data} />
        <AnexoVI data={data} />
      </>
    )}
  </Document>
);

export default RecadastramentoPdf;
