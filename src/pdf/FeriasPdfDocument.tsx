import type { FeriasData as FormData } from "../features/ferias/ferias.types";
// src/pdf/FeriasPdfDocument.tsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// A interface permanece a mesma da última versão

interface PdfProps {
  data: FormData;
}

// Estilos refinados para garantir o layout de colunas e a visibilidade dos elementos
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 40,
    color: "#000",
  },
  header: {
    textAlign: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
  },
  section: {
    border: "1px solid #000",
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    fontSize: 11,
  },
  // Sistema de Grid (Linha e Coluna) para forçar o alinhamento lado a lado
  row: {
    flexDirection: "row",
    width: "100%",
  },
  col: {
    flex: 1, // Faz com que cada coluna ocupe metade do espaço
    paddingRight: 10, // Espaço entre as colunas
  },
  // Estilo para um campo de formulário (label + valor com linha)
  fieldContainer: {
    marginBottom: 12, // Espaço vertical entre as linhas de campos
  },
  fieldLabel: {
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  fieldValue: {
    borderBottom: "1px dotted #000",
    minHeight: 14,
    padding: 2,
    fontSize: 10,
  },
  signatureSection: {
    marginTop: 25,
    textAlign: "center",
  },
  signatureLine: {
    width: "60%",
    borderBottom: "1px solid #000",
    margin: "30px auto 0 auto",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "grey",
  },
});

const FeriasPdfDocument: React.FC<PdfProps> = ({ data }) => {
  const dia = String(data.dataRequerimento.getDate()).padStart(2, "0");
  const mes = data.dataRequerimento.toLocaleString("pt-BR", { month: "long" });
  const ano = data.dataRequerimento.getFullYear();

  const formatDataInicio = (dateStr: string) => {
    if (!dateStr) return " ";
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* cabeçalho padrao*/}
        <View style={styles.header}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>
            CÂMARA MUNICIPAL DE PATOS DE MINAS
          </Text>
          <Text style={{ fontSize: 9 }}>
            Rua José de Santana, 470, Centro CEP: 38700-052-Patos de Minas - MG
          </Text>
        </View>

        <Text style={styles.title}>REQUERIMENTO DE FÉRIAS REGULAMENTARES</Text>

        <Text>
          DISPÕE SOBRE O ESTATUTO DOS SERVIDORES PÚBLICOS DO MUNICÍPIO DE PATOS
          DE MINAS.
        </Text>

        <Text style={{ marginTop: 5 }}>
          Art. 69 É proibida a acumulação de férias, salvo por absoluta
          necessidade do serviço e pelo Maximo de 2 (dois) anos.
        </Text>

        <Text style={{ marginTop: 5 }}>
          § 1º Em casos excepcionais, à critério da administração, as férias
          poderão ser gozadas em 2 (dois) períodos, nenhum dos quais poderá ser
          inferior a 10 (dez) dias.
        </Text>

        <Text style={{ marginTop: 5 }}>
          § 2º Somente serão considerados como não gozadas, por absoluta
          necessidade do serviço, as férias que o servidor deixar de gozar,
          mediante decisão escrita do Presidente da Câmara, exarada em processo
          e publicada na forma legal, dentro do exercício a que elas
          correspondem.
        </Text>

        {/* SEÇÃO 1: DADOS DO REQUISITANTE (em 2 linhas) */}
        <View style={{ ...styles.section, marginTop: 10 }}>
          <Text style={styles.sectionTitle}>1. Dados do requisitante</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Nome:</Text>
                <Text style={styles.fieldValue}>{data.nome || " "}</Text>
              </View>
            </View>
            <View style={styles.col}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Matrícula:</Text>
                <Text style={styles.fieldValue}>{data.matricula || " "}</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>CPF:</Text>
                <Text style={styles.fieldValue}>{data.cpf || " "}</Text>
              </View>
            </View>
            <View style={styles.col}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Lotação:</Text>
                <Text style={styles.fieldValue}>{data.lotacao || " "}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SEÇÃO 2: PERÍODO DE GOZO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Período de gozo</Text>
          <Text style={{ fontSize: "1.2rem" }}>
            {data.periodoGozo === "30" ? "[X]" : "[  ]"} 30 dias (não necessita
            autorização da presidência)
          </Text>
          <Text style={{ fontSize: "1.2rem", marginTop: 5 }}>
            {data.periodoGozo === "20" ? "[X]" : "[  ]"} 20 dias (necessita
            autorização da presidência)
          </Text>
          <Text style={{ fontSize: "1.2rem", marginTop: 5 }}>
            {data.periodoGozo === "15" ? "[X]" : "[  ]"} 15 dias (necessita
            autorização da presidência)
          </Text>
          <Text style={{ fontSize: "1.2rem", marginTop: 5 }}>
            {data.periodoGozo === "10" ? "[X]" : "[  ]"} 10 dias (necessita
            autorização da presidência)
          </Text>
          <Text style={{ marginTop: 10 }}>
            a partir de: {formatDataInicio(data.dataInicio)}
          </Text>
          <Text style={{ marginTop: 10 }}>Justificativa:</Text>
          <Text style={{ ...styles.fieldValue, minHeight: 24 }}>
            {data.justificativa || " "}
          </Text>
        </View>

        {/* SEÇÃO DE ASSINATURA DO SERVIDOR */}
        <View style={styles.signatureSection}>
          <Text>
            Patos de Minas, {dia} de {mes} de {ano}.
          </Text>
          <View style={styles.signatureLine}></View>
          <Text>Assinatura do(a) Servidor(a)</Text>
        </View>

        {/* SEÇÃO DE AUTORIZAÇÃO */}
        <View style={{ ...styles.section, marginTop: 20 }}>
          <Text>Autorizado por chefe imediato (carimbo e assinatura):</Text>
          <View style={{ height: 50 }}></View>
        </View>

        {data.periodoGozo !== "30" && (
          <View style={{ ...styles.section }}>
            <Text>Autorizado por presidência (carimbo e assinatura):</Text>
            <View style={{ height: 50 }}></View>
          </View>
        )}

        {/* SEÇÃO DO RH - COM A ALTERAÇÃO SOLICITADA */}
        <View
          style={{
            ...styles.section,
            marginTop: data.periodoGozo === "30" ? 76 : 0,
          }}
        >
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Período aquisitivo:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Informações adicionais:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>Faltas:</Text>
              <Text style={styles.fieldValue}> </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>Dias de direito:</Text>
              <Text style={styles.fieldValue}> </Text>
            </View>
          </View>
          <Text style={{ marginTop: 5 }}>( ) Deferido</Text>
          <Text style={{ marginTop: 5 }}>( ) Indeferido. Justificativa:</Text>

          {/* CAMPO DE ASSINATURA ADICIONADO AQUI */}
          <View
            style={{
              ...styles.signatureSection,
              marginTop: 25,
              marginBottom: 0,
            }}
          >
            <View
              style={{
                ...styles.signatureLine,
                width: "50%",
                margin: "20px auto 0 auto",
              }}
            ></View>
            <Text>Recursos Humanos</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FeriasPdfDocument;
