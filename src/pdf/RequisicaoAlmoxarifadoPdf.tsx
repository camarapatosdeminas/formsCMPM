import type {
  ItemRequisicao,
  FormData,
} from "../features/almoxarifado/almoxarifado.types";
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// --- INTERFACES ---

interface Props {
  formData: FormData;
  itens: ItemRequisicao[];
}

// --- ESTILOS OTIMIZADOS E CORRIGIDOS ---
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  // --- Estilos de Layout Geral ---
  requisicaoData: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 15,
    padding: 8,
  },
  requisicaoDataText: {
    // NOVO ESTILO PARA REQUISIÇÃO/LOTAÇÃO/REQUISITANTE
    fontSize: 10,
    lineHeight: 1.3, // Reduz um pouco o espaçamento entre linhas
    marginTop: 3,
  },
  // --- Tabela de Itens ---
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    marginBottom: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 25,
  },
  // Headers da Tabela
  tableColHeader: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 6,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    fontSize: 10,
  },
  tableColDescHeader: {
    width: "55%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 6,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    fontSize: 10,
  },
  tableColQtdeHeader: {
    width: "17.5%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 6,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    fontSize: 10,
  },
  tableColQtdeAtendHeader: {
    width: "17.5%",
    padding: 6,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    fontSize: 10,
  },
  // Conteúdo da Tabela (AJUSTADO: Fonte 9 e Padding 4)
  tableCol: {
    width: "10%",
    borderRightColor: "#000",
    borderRightWidth: 1,
    padding: 4,
    textAlign: "center",
    fontSize: 9,
  },
  tableColDesc: {
    width: "55%",
    borderRightColor: "#000",
    borderRightWidth: 1,
    padding: 4,
    fontSize: 9,
  },
  tableColQtde: {
    width: "17.5%",
    borderRightColor: "#000",
    borderRightWidth: 1,
    padding: 4,
    textAlign: "center",
    fontSize: 9,
  },
  tableColQtdeAtend: {
    width: "17.5%",
    padding: 4,
    textAlign: "center",
    fontSize: 9,
  },

  // --- Estilos para Recebimento/Entrega (Mantidos) ---
  recebimentoSection: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 20,
  },
  recebimentoTitleRow: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 25,
  },
  recebimentoFieldRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 35,
    alignItems: "flex-end",
    paddingBottom: 2,
  },
  recebimentoFieldText: {
    fontSize: 10,
    fontWeight: "bold",
    paddingLeft: 6,
  },
  assinaturaMatriculaRow: {
    flexDirection: "row",
    minHeight: 50,
    alignItems: "flex-end",
    paddingHorizontal: 6,
  },
  assinaturaCol: {
    width: "70%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    paddingVertical: 6,
    paddingRight: 6,
    textAlign: "center",
  },
  matriculaCol: {
    width: "30%",
    paddingVertical: 6,
    paddingLeft: 6,
    textAlign: "center",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginTop: 25,
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  signatureText: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
  },
});

const RequisicaoAlmoxarifadoPdf: React.FC<Props> = ({ formData, itens }) => {
  const dataItens = itens.map((item, index) => (
    <View key={item.id} style={styles.tableRow} wrap={false}>
      <Text style={styles.tableCol}>{index + 1}</Text>
      <Text style={styles.tableColDesc} wrap={true}>
        {item.descricao}
      </Text>
      {/* WRAP para a descrição */}
      <Text style={styles.tableColQtde} wrap={true}>
        {item.quantidadeSolicitada}
      </Text>
      {/* WRAP para quantidade solicitada */}
      <Text style={styles.tableColQtdeAtend} wrap={true}>
        {item.quantidadeAtendida}
      </Text>
      {/* WRAP para quantidade atendida */}
    </View>
  ));

  // Lógica para adicionar linhas vazias
  const minRows = 10;
  const emptyRows = [];
  for (let i = itens.length; i < minRows; i++) {
    emptyRows.push(
      <View key={`empty-${i}`} style={styles.tableRow} wrap={false}>
        <Text style={styles.tableCol}>{i + 1}</Text>
        <Text style={styles.tableColDesc}></Text>
        <Text style={styles.tableColQtde}></Text>
        <Text style={styles.tableColQtdeAtend}></Text>
      </View>,
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <View style={{ marginBottom: 15, textAlign: "center" }}>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            CÂMARA MUNICIPAL DE PATOS DE MINAS
          </Text>
          <Text style={{ fontSize: 11 }}>
            PROTOCOLO DE ENTREGA DE MATERIAIS DE CONSUMO
          </Text>
          <Text style={{ fontSize: 9, marginTop: 5 }}>ANEXO I</Text>
        </View>

        {/* Dados da Requisição (AJUSTADO COM WRAP) */}
        <View style={styles.requisicaoData}>
          <Text style={styles.requisicaoDataText} wrap={true}>
            REQUISIÇÃO Nº: {formData.requisicaoNum} - DATA:{" "}
            {formData.dataEmissao}
          </Text>
          <Text style={styles.requisicaoDataText} wrap={true}>
            REQUISITANTE: {formData.requisitante}
          </Text>
          <Text style={styles.requisicaoDataText} wrap={true}>
            LOTAÇÃO: {formData.lotacao}
          </Text>
        </View>

        {/* Justificativa */}
        <View style={styles.requisicaoData}>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            JUSTIFICATIVA:
          </Text>
          <Text style={{ fontSize: 9, marginTop: 5 }} wrap={true}>
            {formData.justificativa}
          </Text>
        </View>

        {/* TABELA DE ITENS */}
        <View style={styles.table} wrap={true}>
          {/* Header da Tabela */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>ITEM</Text>
            <Text style={styles.tableColDescHeader}>DESCRIÇÃO</Text>
            <Text style={styles.tableColQtdeHeader}>QTDE. SOLICITADA</Text>
            <Text style={styles.tableColQtdeAtendHeader}>QTDE. ATENDIDA</Text>
          </View>
          {/* Linhas de Itens */}
          {dataItens}
          {emptyRows}
        </View>

        {/* DADOS RECEBIMENTO/ENTREGA (Layout Final) */}
        <View style={styles.recebimentoSection} wrap={false}>
          {/* Linha 1: Rótulo principal (Dados Recebimento...) */}
          <View style={styles.recebimentoTitleRow}>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              DADOS RECEBIMENTO/ENTREGA REQUISIÇÃO Nº: {formData.requisicaoNum}
            </Text>
          </View>

          {/* Linha 2: DATA RECEBIMENTO/ENTREGA */}
          <View style={styles.recebimentoFieldRow}>
            <Text style={styles.recebimentoFieldText}>
              DATA RECEBIMENTO/ENTREGA:
            </Text>
          </View>

          {/* Linha 3: ENTREGUE POR: */}
          <View style={styles.recebimentoFieldRow}>
            <Text style={styles.recebimentoFieldText}>ENTREGUE POR:</Text>
          </View>

          {/* Linha 4: RECEBIDO POR: */}
          <View style={styles.recebimentoFieldRow}>
            <Text style={styles.recebimentoFieldText}>RECEBIDO POR:</Text>
          </View>

          {/* Linha Final: ASSINATURA e MATRÍCULA */}
          <View style={styles.assinaturaMatriculaRow}>
            {/* Coluna da Assinatura */}
            <View style={styles.assinaturaCol}>
              {/* Linha Horizontal de Assinatura */}
              <Text style={styles.signatureLine}></Text>
              <Text style={styles.signatureText}>ASSINATURA</Text>
            </View>

            {/* Coluna da Matrícula */}
            <View style={styles.matriculaCol}>
              {/* Linha Horizontal de Matrícula */}
              <Text style={styles.signatureLine}></Text>
              <Text style={styles.signatureText}>MATRÍCULA:</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RequisicaoAlmoxarifadoPdf;
