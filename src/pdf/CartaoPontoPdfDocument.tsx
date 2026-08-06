// src/pdf/CartaoPontoPdfDocument.tsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface FormData {
  nome: string;
  matricula: string;
  setor: string;
  horario: string;
  vereador: string;
  mesReferencia: string;
  inicioFerias: string;
  fimFerias: string;
}

interface PdfProps {
  data: FormData;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 25,
    paddingTop: 35,
    color: "#000",
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 20,
  },
  // Container do Cabeçalho (Informações) - CORRIGIDO (border completo)
  headerContainer: {
    border: "1px solid #000",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  headerCell: {
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  headerBorderRight: {
    borderRight: "1px solid #000",
  },
  headerLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginRight: 4,
  },
  headerValue: {
    fontSize: 10,
  },
  // Estilos da Tabela
  table: {
    borderTop: "1px solid #000",
    borderLeft: "1px solid #000",
    borderRight: "1px solid #000",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    minHeight: 16,
    // Removido alignItems: "center" para as células esticarem (stretch) e as linhas serem contínuas
  },
  // Novas classes de Células (View) para garantir borda vertical contínua
  tableHeaderCell: {
    borderRight: "1px solid #000",
    justifyContent: "center", // Centraliza o texto verticalmente
    padding: 3,
  },
  tableHeaderCellLast: {
    justifyContent: "center",
    padding: 3,
  },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    textAlign: "center", // Centraliza o texto horizontalmente
  },
  tableCell: {
    borderRight: "1px solid #000",
    justifyContent: "center",
    padding: 3,
  },
  tableCellLast: {
    justifyContent: "center",
    padding: 3,
  },
  tableCellText: {
    fontSize: 8,
    textAlign: "center",
  },
  // Larguras das colunas
  colSemana: { width: "13%" },
  colMes: { width: "9%" },
  colManhaEntrada: { width: "13%" },
  colManhaSaida: { width: "13%" },
  colTardeEntrada: { width: "13%" },
  colTardeSaida: { width: "13%" },
  colObs: { width: "26%" },

  // Estilos de Assinatura
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  signatureBlock: {
    width: "30%",
    alignItems: "center",
  },
  signatureLine: {
    borderTop: "1px solid #000",
    width: "100%",
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    textAlign: "center",
  },
});

const diasSemana = [
  "DOMINGO",
  "SEGUNDA",
  "TERÇA",
  "QUARTA",
  "QUINTA",
  "SEXTA",
  "SÁBADO",
];

const CartaoPontoPdfDocument: React.FC<PdfProps> = ({ data }) => {
  // Extrair o ano e mês da string (formato "YYYY-MM")
  const [anoStr, mesStr] = data.mesReferencia
    ? data.mesReferencia.split("-")
    : [
        new Date().getFullYear().toString(),
        (new Date().getMonth() + 1).toString(),
      ];
  const ano = parseInt(anoStr, 10);
  const mes = parseInt(mesStr, 10);

  // Pegar a quantidade de dias no mês selecionado
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const rows = [];

  for (let i = 1; i <= diasNoMes; i++) {
    const dataAtual = new Date(ano, mes - 1, i);
    const diaSemanaIndex = dataAtual.getDay();
    const diaSemana = diasSemana[diaSemanaIndex];

    const diaFormatado = String(i).padStart(2, "0");
    const mesFormatado = String(mes).padStart(2, "0");
    const anoFormatado = String(ano).slice(-2);

    // Formato DD/MM/YY
    const dataExibicao = `${diaFormatado}/${mesFormatado}/${anoFormatado}`;

    // Lógica para verificar se o dia atual está no período de Férias
    let isFerias = false;
    if (data.inicioFerias && data.fimFerias) {
      // Data no formato YYYY-MM-DD para comparação lexográfica segura
      const dataComparacao = `${anoStr}-${mesFormatado}-${diaFormatado}`;
      if (
        dataComparacao >= data.inicioFerias &&
        dataComparacao <= data.fimFerias
      ) {
        isFerias = true;
      }
    }

    let textoPreenchimento = "";
    if (isFerias) {
      textoPreenchimento = "FÉRIAS";
    } else if (diaSemanaIndex === 0) {
      textoPreenchimento = "DOMINGO";
    } else if (diaSemanaIndex === 6) {
      textoPreenchimento = "SÁBADO";
    }

    rows.push({
      diaSemana,
      dataExibicao,
      textoPreenchimento,
    });
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Cartão de Ponto – Câmara Municipal de Patos de Minas
        </Text>

        {/* Quadro de Informações */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View
              style={{
                ...styles.headerCell,
                ...styles.headerBorderRight,
                flex: 2.5,
              }}
            >
              <Text style={styles.headerLabel}>Nome:</Text>
              <Text style={styles.headerValue}>
                {data.nome ? data.nome.toUpperCase() : ""}
              </Text>
            </View>
            <View style={{ ...styles.headerCell, flex: 1.5 }}>
              <Text style={styles.headerLabel}>Matrícula:</Text>
              <Text style={styles.headerValue}>{data.matricula}</Text>
            </View>
          </View>
          <View style={{ ...styles.headerRow, borderBottom: "none" }}>
            <View
              style={{
                ...styles.headerCell,
                ...styles.headerBorderRight,
                flex: 2.5,
              }}
            >
              <Text style={styles.headerLabel}>Setor:</Text>
              <Text style={styles.headerValue}>
                {data.setor ? data.setor.toUpperCase() : ""}
              </Text>
            </View>
            <View style={{ ...styles.headerCell, flex: 1.5 }}>
              <Text style={styles.headerLabel}>Horário:</Text>
              <Text style={styles.headerValue}>{data.horario}</Text>
            </View>
          </View>
        </View>

        {/* Tabela de Preenchimento */}
        <View style={styles.table}>
          <View style={{ ...styles.tableRow, backgroundColor: "#eeeeee" }}>
            <View style={{ ...styles.tableHeaderCell, ...styles.colSemana }}>
              <Text style={styles.tableHeaderText}>Dia Semana</Text>
            </View>
            <View style={{ ...styles.tableHeaderCell, ...styles.colMes }}>
              <Text style={styles.tableHeaderText}>Dia Mês</Text>
            </View>
            <View
              style={{ ...styles.tableHeaderCell, ...styles.colManhaEntrada }}
            >
              <Text style={styles.tableHeaderText}>Entrada Manhã</Text>
            </View>
            <View
              style={{ ...styles.tableHeaderCell, ...styles.colManhaSaida }}
            >
              <Text style={styles.tableHeaderText}>Saída Manhã</Text>
            </View>
            <View
              style={{ ...styles.tableHeaderCell, ...styles.colTardeEntrada }}
            >
              <Text style={styles.tableHeaderText}>Entrada Tarde</Text>
            </View>
            <View
              style={{ ...styles.tableHeaderCell, ...styles.colTardeSaida }}
            >
              <Text style={styles.tableHeaderText}>Saída Tarde</Text>
            </View>
            <View style={{ ...styles.tableHeaderCellLast, ...styles.colObs }}>
              <Text style={styles.tableHeaderText}>Observação</Text>
            </View>
          </View>

          {rows.map((row, index) => (
            <View
              key={index}
              style={{
                ...styles.tableRow,
                backgroundColor:
                  row.textoPreenchimento &&
                  !row.textoPreenchimento.includes("FÉRIAS")
                    ? "#fcfcfc"
                    : "#fff",
              }}
            >
              <View style={{ ...styles.tableCell, ...styles.colSemana }}>
                <Text style={styles.tableCellText}>{row.diaSemana}</Text>
              </View>
              <View style={{ ...styles.tableCell, ...styles.colMes }}>
                <Text style={styles.tableCellText}>{row.dataExibicao}</Text>
              </View>
              <View style={{ ...styles.tableCell, ...styles.colManhaEntrada }}>
                <Text style={styles.tableCellText}>
                  {row.textoPreenchimento}
                </Text>
              </View>
              <View style={{ ...styles.tableCell, ...styles.colManhaSaida }}>
                <Text style={styles.tableCellText}>
                  {row.textoPreenchimento}
                </Text>
              </View>
              <View style={{ ...styles.tableCell, ...styles.colTardeEntrada }}>
                <Text style={styles.tableCellText}>
                  {row.textoPreenchimento}
                </Text>
              </View>
              <View style={{ ...styles.tableCell, ...styles.colTardeSaida }}>
                <Text style={styles.tableCellText}>
                  {row.textoPreenchimento}
                </Text>
              </View>
              <View style={{ ...styles.tableCellLast, ...styles.colObs }}>
                <Text style={styles.tableCellText}></Text>
              </View>
            </View>
          ))}
        </View>

        {/* Rodapé - Assinaturas */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Controle e Apuração</Text>
            <Text style={styles.signatureText}>de Frequência</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Servidor</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>
              {data.vereador ? data.vereador.toUpperCase() : "VEREADOR"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CartaoPontoPdfDocument;
