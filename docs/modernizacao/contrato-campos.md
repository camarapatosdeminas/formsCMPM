# Contrato de campos — referência anterior à migração

Commit a4d17a3f6b6cde5d410cdaac643d44865234b2b6. Extração AST do código local em 02/09/2026. Os handlers abaixo são a referência operacional: atributos nativos isolados não significam bloqueio da geração. `legacy-source.json` conserva o código original integral.

Nos 14 formulários sem validação de geração, todos os campos aceitam vazio. Férias exige somente justificativa quando período ≠30; cartão exige nome, matrícula e mês; recadastramento tem validação condicional transcrita abaixo. Listas mínimas não tornam o conteúdo das linhas obrigatório.

## /adiantamento-13

Página: `src/pages/Adiantamento13/Adiantamento13.tsx`. PDF: `src/pdf/Adiantamento13Pdf.tsx`. Download: `adiantamento_13.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  matricula: "",
  cpf: "",
  lotacao: "",
  portaria: "",
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original    | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração | PDF                |
| ---------------------- | ------------------ | -------- | ------------------------ | ---------------------- | ----------------- | ------------------- | ------------------ |
| nome                   | Nome               | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.nome      |
| matricula              | Matrícula          | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.matricula |
| cpf                    | CPF                | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.cpf       |
| lotacao                | Lotação            | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.lotacao   |
| portaria               | Número da Portaria | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.portaria  |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <Adiantamento13Pdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /declaracao-dependentes

Página: `src/pages/DeclaracaoDependentes/DeclaracaoDependentes.tsx`. PDF: `src/pdf/DeclaracaoDependentesPdf.tsx`. Download: `declaracao_dependentes.pdf`.

### Estado inicial

```tsx
servidorInfo = {
  nome: "",
  matricula: "",
};
dependentes = [
  {
    id: 1,
    nome: "",
    dataNascimento: "",
    parentesco: "",
    cpf: "",
    isDependenteIR: true,
  },
];
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original    | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração                     | PDF                       |
| ---------------------- | ------------------ | -------- | ------------------------ | ---------------------- | ----------------- | --------------------------------------- | ------------------------- |
| nome                   | Nome do Servidor   | text     | Sempre                   | Não declarada          | Nenhum            | handleServidorInfoChange                | servidorInfo.nome         |
| matricula              | Matrícula          | text     | Sempre                   | Não declarada          | Nenhum            | handleServidorInfoChange                | servidorInfo.matricula    |
| nome                   | Nome do Dependente | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDependenteChange(index, e) | dependente.nome           |
| dataNascimento         | Data de Nascimento | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDependenteChange(index, e) | dependente.dataNascimento |
| parentesco             | Parentesco         | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDependenteChange(index, e) | dependente.parentesco     |
| cpf                    | CPF                | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDependenteChange(index, e) | dependente.cpf            |
| isDependenteIR         |                    | checkbox | Sempre                   | Não declarada          | Nenhum            | (e) => handleDependenteChange(index, e) | dependente.isDependenteIR |

Dados enviados: `{"servidorInfo":"servidorInfo","dependentes":"dependentes"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleServidorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setServidorInfo((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleDependenteChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const { name, value, type, checked } = e.target;

  // Criamos uma cópia da lista de dependentes para modificar
  const novosDependentes = [...dependentes];
  // Criamos uma cópia do dependente específico que estamos a alterar
  const dependenteAtualizado = { ...novosDependentes[index] };

  // Verificamos qual campo foi alterado e atualizamos a propriedade correta
  if (name === "nome") {
    dependenteAtualizado.nome = value;
  } else if (name === "dataNascimento") {
    dependenteAtualizado.dataNascimento = value;
  } else if (name === "parentesco") {
    dependenteAtualizado.parentesco = value;
  } else if (name === "cpf") {
    dependenteAtualizado.cpf = value;
  } else if (name === "isDependenteIR" && type === "checkbox") {
    dependenteAtualizado.isDependenteIR = checked;
  }

  // Substituímos o dependente antigo pelo atualizado na lista
  novosDependentes[index] = dependenteAtualizado;

  setDependentes(novosDependentes);
  setDocumentoPronto(null);
};

adicionarDependente = () => {
  setDependentes([
    ...dependentes,
    {
      id: Date.now(),
      nome: "",
      dataNascimento: "",
      parentesco: "",
      cpf: "",
      isDependenteIR: true,
    },
  ]);
};

removerDependente = (index: number) => {
  if (dependentes.length <= 1) return;
  setDependentes(dependentes.filter((_, i) => i !== index));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = (
    <DeclaracaoDependentesPdf
      servidorInfo={servidorInfo}
      dependentes={dependentes}
    />
  );
  setDocumentoPronto(doc);
};
```

## /declaracao-ficha-limpa

Página: `src/pages/DeclaracaoFichaLimpa/DeclaracaoFichaLimpa.tsx`. PDF: `src/pdf/DeclaracaoFichaLimpaPdf.tsx`. Download: `declaracao_ficha_limpa.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  cpf: "",
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração | PDF           |
| ---------------------- | --------------- | -------- | ------------------------ | ---------------------- | ----------------- | ------------------- | ------------- |
| nome                   | Nome Completo   | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.nome |
| cpf                    | CPF             | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.cpf  |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <DeclaracaoFichaLimpaPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /declaracao-nepotismo

Página: `src/pages/DeclaracaoNepotismo/DeclaracaoNepotismo.tsx`. PDF: `src/pdf/DeclaracaoNepotismoPdf.tsx`. Download: `declaracao_nepotismo.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  cpf: "",
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração | PDF           |
| ---------------------- | --------------- | -------- | ------------------------ | ---------------------- | ----------------- | ------------------- | ------------- |
| nome                   | Nome Completo   | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.nome |
| cpf                    | CPF             | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.cpf  |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <DeclaracaoNepotismoPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /declaracao-nao-ocupacao

Página: `src/pages/DeclaracaoNaoOcupacao/DeclaracaoNaoOcupacao.tsx`. PDF: `src/pdf/DeclaracaoNaoOcupacaoPdf.tsx`. Download: `declaracao_nao_ocupacao.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  cpf: "",
  rua: "",
  numero: "",
  cargo: "",
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original                      | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração | PDF             |
| ---------------------- | ------------------------------------ | -------- | ------------------------ | ---------------------- | ----------------- | ------------------- | --------------- |
| nome                   | Seu Nome Completo                    | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.nome   |
| cpf                    | CPF                                  | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.cpf    |
| rua                    | Nome da Rua / Av.                    | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.rua    |
| numero                 | Nº                                   | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.numero |
| cargo                  | Cargo para o qual está a tomar posse | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.cargo  |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <DeclaracaoNaoOcupacaoPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /ocorrencia-ponto

Página: `src/pages/OcorrenciaPonto/OcorrenciaPonto.tsx`. PDF: `src/pdf/OcorrenciaPontoPdf.tsx`. Download: `ocorrencia_ponto.pdf`.

### Estado inicial

```tsx
servidorInfo = {
  servidor: "",
  matricula: "",
  cargo: "",
  chefia: "",
};
ocorrencias = [
  { id: 1, data: "", horario: "", referente: "entrada", justificativa: "" },
];
```

### Campos e correspondência

| Nome / valor no estado       | Rótulo original                       | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração                     | PDF                      |
| ---------------------------- | ------------------------------------- | -------- | ------------------------ | ---------------------- | ----------------- | --------------------------------------- | ------------------------ |
| servidor                     | Nome do Servidor                      | text     | Sempre                   | Não declarada          | Nenhum            | handleServidorInfoChange                | servidorInfo.servidor    |
| matricula                    | Matrícula                             | text     | Sempre                   | Não declarada          | Nenhum            | handleServidorInfoChange                | servidorInfo.matricula   |
| cargo                        | Cargo/Função                          | text     | Sempre                   | Não declarada          | Nenhum            | handleServidorInfoChange                | servidorInfo.cargo       |
| data                         | data                                  | date     | Sempre                   | Não declarada          | Nenhum            | (e) => handleOcorrenciaChange(index, e) | ocorrencia.data          |
| horario                      | horario                               | time     | Sempre                   | Não declarada          | Nenhum            | (e) => handleOcorrenciaChange(index, e) | ocorrencia.horario       |
| `referente-${ocorrencia.id}` | Dia todo                              | radio    | Sempre                   | Não declarada          | Nenhum            | (e) => handleOcorrenciaChange(index, e) | dia                      |
| `referente-${ocorrencia.id}` | Entrada                               | radio    | Sempre                   | Não declarada          | Nenhum            | (e) => handleOcorrenciaChange(index, e) | entrada                  |
| `referente-${ocorrencia.id}` | Saída                                 | radio    | Sempre                   | Não declarada          | Nenhum            | (e) => handleOcorrenciaChange(index, e) | saida                    |
| justificativa                | Justificativa para esta ocorrência... | textarea | Sempre                   | Não declarada          | Nenhum            | (e) => handleOcorrenciaChange(index, e) | ocorrencia.justificativa |
| chefia                       | Nome da Chefia Imediata para ciência  | text     | Sempre                   | Não declarada          | Nenhum            | handleServidorInfoChange                | servidorInfo.chefia      |

Dados enviados: `{"servidorInfo":"servidorInfo","ocorrencias":"ocorrencias"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleServidorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setServidorInfo((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleOcorrenciaChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value, type } = e.target;
  const novasOcorrencias = [...ocorrencias];

  // Se o input for um radio, atualizamos a propriedade 'referente'
  if (type === "radio") {
    novasOcorrencias[index] = {
      ...novasOcorrencias[index],
      referente: value as "dia" | "entrada" | "saida",
    };
  } else {
    // Caso contrário, atualizamos a propriedade com base no 'name' (para data, horario, justificativa)
    novasOcorrencias[index] = { ...novasOcorrencias[index], [name]: value };
  }

  setOcorrencias(novasOcorrencias);
  setDocumentoPronto(null);
};

adicionarOcorrencia = () => {
  setOcorrencias([
    ...ocorrencias,
    {
      id: Date.now(),
      data: "",
      horario: "",
      referente: "entrada",
      justificativa: "",
    },
  ]);
  setDocumentoPronto(null);
};

removerOcorrencia = (index: number) => {
  if (ocorrencias.length <= 1) return;
  const novasOcorrencias = ocorrencias.filter((_, i) => i !== index);
  setOcorrencias(novasOcorrencias);
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = (
    <OcorrenciaPontoPdf servidorInfo={servidorInfo} ocorrencias={ocorrencias} />
  );
  setDocumentoPronto(doc);
};
```

## /relatorio-viagem

Página: `src/pages/RelatorioViagem/RelatorioViagem.tsx`. PDF: `src/pdf/RelatorioViagemPdf.tsx`. Download: `relatorio_viagem.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  matricula: "",
  cargo: "",
  destino: "",
  dataSaida: "",
  dataRetorno: "",
  meioTransporte: "",
  descricaoAtividades: "",
  despesasAntecipadas: {
    passagem: { antecipado: "", utilizado: "", reembolsar: "", devolver: "" },
  },
  despesasRealizadas: {
    combustivel: { utilizado: "", reembolsar: "", quilometragem: "" },
    transporteUrbano: { utilizado: "", reembolsar: "" },
    passagem: { utilizado: "", reembolsar: "" },
    pedagio: { utilizado: "", reembolsar: "" },
    estacionamento: { utilizado: "", reembolsar: "" },
  },
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original     | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração                                                                                 | PDF                          |
| ---------------------- | ------------------- | -------- | ------------------------ | ---------------------- | ----------------- | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| nome                   | Nome                | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                                                   | formData.nome                |
| matricula              | Matrícula           | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                                                   | formData.matricula           |
| cargo                  | Cargo               | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                                                   | formData.cargo               |
| destino                | Destino             | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                                                   | formData.destino             |
| dataSaida              | Data Saída          | date     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                                                   | formData.dataSaida           |
| dataRetorno            | Data Retorno        | date     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                                                   | formData.dataRetorno         |
| meioTransporte         | Meio de Transporte  | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                                                   | formData.meioTransporte      |
| descricaoAtividades    | descricaoAtividades | textarea | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                                                   | formData.descricaoAtividades |
| —                      | Valor Antecipado    | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDespesaChange( "despesasAntecipadas", "passagem", "antecipado", e.target.value, )      | —                            |
| —                      | Valor Utilizado     | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDespesaChange( "despesasAntecipadas", "passagem", "utilizado", e.target.value, )       | —                            |
| —                      | Valor a Reembolsar  | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDespesaChange( "despesasAntecipadas", "passagem", "reembolsar", e.target.value, )      | —                            |
| —                      | Valor a Devolver    | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDespesaChange( "despesasAntecipadas", "passagem", "devolver", e.target.value, )        | —                            |
| —                      | Quilometragem       | text     | key === "combustivel"    | Não declarada          | Nenhum            | (e) => handleDespesaChange( "despesasRealizadas", "combustivel", "quilometragem", e.target.value, ) | —                            |
| —                      | Valor Utilizado     | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDespesaChange( "despesasRealizadas", key, "utilizado", e.target.value, )               | —                            |
| —                      | Valor a Reembolsar  | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleDespesaChange( "despesasRealizadas", key, "reembolsar", e.target.value, )              | —                            |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleDespesaChange = (
  tabela: "despesasAntecipadas" | "despesasRealizadas",
  despesa: string,
  campo: string,
  value: string,
) => {
  setFormData((prev) => {
    const newFormData = { ...prev };
    (newFormData[tabela] as any)[despesa][campo] = value;
    return newFormData;
  });
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <RelatorioViagemPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /formulario-ferias

Página: `src/pages/FormularioFerias/FormularioFerias.tsx`. PDF: `src/pdf/FeriasPdfDocument.tsx`. Download: `requerimento_ferias.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  matricula: "",
  cpf: "",
  lotacao: "",
  periodoGozo: "30",
  dataInicio: "",
  justificativa: "",
  outrosDias: "",
  dataRequerimento: new Date(),
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original                                                      | Controle | Condição / desabilitação                         | Obrigatoriedade nativa | Limites originais | Máscara / alteração | PDF                    |
| ---------------------- | -------------------------------------------------------------------- | -------- | ------------------------------------------------ | ---------------------- | ----------------- | ------------------- | ---------------------- |
| nome                   | Nome                                                                 | text     | Sempre                                           | Não declarada          | Nenhum            | handleInputChange   | formData.nome          |
| matricula              | Matrícula                                                            | text     | Sempre                                           | Não declarada          | Nenhum            | handleInputChange   | formData.matricula     |
| cpf                    | CPF                                                                  | text     | Sempre                                           | Não declarada          | Nenhum            | handleInputChange   | formData.cpf           |
| lotacao                | Lotação                                                              | text     | Sempre                                           | Não declarada          | Nenhum            | handleInputChange   | formData.lotacao       |
| periodoGozo            | 30 dias                                                              | radio    | Sempre                                           | Não declarada          | Nenhum            | handlePeriodoChange | 30                     |
| periodoGozo            | 20 dias                                                              | radio    | Sempre                                           | Não declarada          | Nenhum            | handlePeriodoChange | 20                     |
| periodoGozo            | 15 dias                                                              | radio    | Sempre                                           | Não declarada          | Nenhum            | handlePeriodoChange | 15                     |
| periodoGozo            | 10 dias                                                              | radio    | Sempre                                           | Não declarada          | Nenhum            | handlePeriodoChange | 10                     |
| dataInicio             | dataInicio                                                           | date     | Sempre                                           | Não declarada          | Nenhum            | handleInputChange   | formData.dataInicio    |
| justificativa          | Obrigatório caso haja parcelamento ou solicitação inferior a 30 dias | textarea | Sempre / disabled: formData.periodoGozo === "30" | Não declarada          | Nenhum            | handleInputChange   | formData.justificativa |

Dados enviados: `{"data":"formData as any"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  setPdfPronto(false);
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

handlePeriodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPdfPronto(false); // Esconde o botão de download se mudar os dias
  const value = e.target.value as "30" | "20" | "15" | "10";
  setFormData((prev) => ({
    ...prev,
    periodoGozo: value,
    // Limpa a justificativa se voltar para 30 dias
    justificativa: value === "30" ? "" : prev.justificativa,
  }));
};
```

## /solicitacao-cursos

Página: `src/pages/SolicitacaoCursos/SolicitacaoCursos.tsx`. PDF: `src/pdf/SolicitacaoCursosPdf.tsx`. Download: `solicitacao_cursos.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  endereco: "",
  celular: "",
  identidade: "",
  matricula: "",
  lotacao: "",
  emailServidor: "",
  cpf: "",
  cargo: "",
  ramal: "",
  funcaoConfianca: "nao",
  tipoFuncao: "nenhum",
  qualFuncao: "",
  descricaoCurso: "",
  fornecedor: "",
  cnpj: "",
  contato: "",
  whatsapp: "",
  emailFornecedor: "",
  periodoRealizacao: "",
  inicioTermino: "",
  cargaHorariaTotal: "",
  cargaHorariaDiaria: "",
  usoProgressao: "nao",
  formaApresentacao: "",
  solicitaInscricao: "nao",
  valorInscricao: "",
  solicitaMensalidade: "nao",
  valorMensalidade: "",
  valorTotal: "",
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original                                  | Controle | Condição / desabilitação           | Obrigatoriedade nativa | Limites originais | Máscara / alteração      | PDF                         |
| ---------------------- | ------------------------------------------------ | -------- | ---------------------------------- | ---------------------- | ----------------- | ------------------------ | --------------------------- |
| nome                   | Nome                                             | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.nome               |
| matricula              | Matrícula                                        | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.matricula          |
| endereco               | Endereço                                         | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.endereco           |
| lotacao                | Lotação                                          | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.lotacao            |
| celular                | Celular                                          | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.celular            |
| cpf                    | CPF                                              | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.cpf                |
| identidade             | Identidade                                       | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.identidade         |
| cargo                  | Cargo                                            | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.cargo              |
| emailServidor          | Email                                            | email    | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.emailServidor      |
| ramal                  | Ramal                                            | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.ramal              |
| funcaoConfianca        | Sim                                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | sim                         |
| funcaoConfianca        | Não                                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | nao                         |
| tipoFuncao             | Cargo de Direção                                 | radio    | formData.funcaoConfianca === "sim" | Não declarada          | Nenhum            | handleInputChange as any | direcao                     |
| tipoFuncao             | Função Gratificada                               | radio    | formData.funcaoConfianca === "sim" | Não declarada          | Nenhum            | handleInputChange as any | gratificada                 |
| qualFuncao             | Qual?                                            | text     | formData.funcaoConfianca === "sim" | Não declarada          | Nenhum            | handleInputChange        | formData.qualFuncao         |
| descricaoCurso         | Descreva brevemente o tema do curso              | textarea | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.descricaoCurso     |
| fornecedor             | Dados do Fornecedor                              | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.fornecedor         |
| cnpj                   | CNPJ                                             | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.cnpj               |
| contato                | Contato (Telefone)                               | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.contato            |
| whatsapp               | WhatsApp                                         | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.whatsapp           |
| emailFornecedor        | Email do Fornecedor                              | email    | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.emailFornecedor    |
| inicioTermino          | Início/Término Ex: 02/10/2025 a 15/12/2025       | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.inicioTermino      |
| cargaHorariaTotal      | Carga Horária Total                              | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.cargaHorariaTotal  |
| cargaHorariaDiaria     | Carga Horária Diária                             | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.cargaHorariaDiaria |
| formaApresentacao      | Forma de Apresentação (presencial, online, etc.) | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.formaApresentacao  |
| usoProgressao          | Sim                                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | sim                         |
| usoProgressao          | Não                                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | nao                         |
| solicitaInscricao      | Sim                                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | sim                         |
| solicitaInscricao      | Não                                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | nao                         |
| valorInscricao         | Valor da Inscrição                               | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.valorInscricao     |
| solicitaMensalidade    | Sim                                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | sim                         |
| solicitaMensalidade    | Não                                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | nao                         |
| valorMensalidade       | Valor por Mês                                    | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.valorMensalidade   |
| valorTotal             | Valor Total do Curso                             | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.valorTotal         |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <SolicitacaoCursosPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /SolicitacaoDiaria

Página: `src/pages/SolicitacaoDiaria/SolicitacaoDiaria.tsx`. PDF: `src/pdf/SolicitacaoDiariaPdf.tsx`. Download: `solicitacao_diaria.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  matricula: "",
  cargo: "",
  banco: "",
  tipoConta: "corrente",
  agencia: "",
  conta: "",
  pix: "",
  cidade: "",
  estado: "",
  periodoViagem: "",
  meioTransporte: "carro",
  placaCarro: "",
  outroTransporte: "", // Adicionado este campo
  diariasInteiras: "",
  diariasReduzidas: "",
  solicitaAntecipacao: "nao",
  valorSolicitado: "",
  objetivo: "",
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original                                 | Controle | Condição / desabilitação            | Obrigatoriedade nativa | Limites originais | Máscara / alteração      | PDF                       |
| ---------------------- | ----------------------------------------------- | -------- | ----------------------------------- | ---------------------- | ----------------- | ------------------------ | ------------------------- |
| nome                   | Nome                                            | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.nome             |
| matricula              | Matrícula                                       | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.matricula        |
| cargo                  | Cargo                                           | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.cargo            |
| banco                  | Banco                                           | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.banco            |
| agencia                | Agência                                         | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.agencia          |
| conta                  | Conta                                           | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.conta            |
| pix                    | Pix                                             | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.pix              |
| tipoConta              | Corrente                                        | radio    | Sempre                              | Não declarada          | Nenhum            | handleInputChange as any | corrente                  |
| tipoConta              | Poupança                                        | radio    | Sempre                              | Não declarada          | Nenhum            | handleInputChange as any | poupanca                  |
| cidade                 | Cidade                                          | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.cidade           |
| estado                 | Estado                                          | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.estado           |
| periodoViagem          | Período da Viagem (Ex: 01/01/2025 a 05/01/2025) | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.periodoViagem    |
| meioTransporte         | Carro                                           | radio    | Sempre                              | Não declarada          | Nenhum            | handleInputChange as any | carro                     |
| meioTransporte         | Ônibus                                          | radio    | Sempre                              | Não declarada          | Nenhum            | handleInputChange as any | onibus                    |
| meioTransporte         | Aéreo                                           | radio    | Sempre                              | Não declarada          | Nenhum            | handleInputChange as any | aereo                     |
| meioTransporte         | Outro                                           | radio    | Sempre                              | Não declarada          | Nenhum            | handleInputChange as any | outro                     |
| placaCarro             | Placa do Carro                                  | text     | formData.meioTransporte === "carro" | Não declarada          | Nenhum            | handleInputChange        | formData.placaCarro       |
| outroTransporte        | Especifique o transporte                        | text     | formData.meioTransporte === "outro" | Não declarada          | Nenhum            | handleInputChange        | formData.outroTransporte  |
| diariasInteiras        | Nº diárias inteiras                             | number   | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.diariasInteiras  |
| diariasReduzidas       | Nº diárias reduzidas                            | number   | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.diariasReduzidas |
| solicitaAntecipacao    | Sim                                             | radio    | Sempre                              | Não declarada          | Nenhum            | handleInputChange as any | sim                       |
| solicitaAntecipacao    | Não                                             | radio    | Sempre                              | Não declarada          | Nenhum            | handleInputChange as any | nao                       |
| valorSolicitado        | Valor Solicitado (preenchido pelo solicitante)  | text     | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.valorSolicitado  |
| objetivo               | objetivo                                        | textarea | Sempre                              | Não declarada          | Nenhum            | handleInputChange        | formData.objetivo         |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <SolicitacaoDiariaPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /solicitacao-viagem

Página: `src/pages/SolicitacaoViagem/SolicitacaoViagem.tsx`. PDF: `src/pdf/SolicitacaoViagemPdf.tsx`. Download: `solicitacao_viagem.pdf`.

### Estado inicial

```tsx
formData = {
  // Novos campos
  nome: "",
  matricula: "",
  cargo: "",
  banco: "",
  agencia: "",
  conta: "",
  pix: "",
  // Campos que já existiam
  numVereadores: "",
  numServidores: "",
  finalidade: "encontro",
  finalidadeOutros: "",
  periodo: "",
  cidadeEstado: "",
  local: "",
  meioTransporte: "",
  justificativa: "",
};
participantes = [{ id: 1, nome: "" }];
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original                           | Controle | Condição / desabilitação         | Obrigatoriedade nativa | Limites originais | Máscara / alteração                       | PDF                       |
| ---------------------- | ----------------------------------------- | -------- | -------------------------------- | ---------------------- | ----------------- | ----------------------------------------- | ------------------------- |
| nome                   | Nome Completo                             | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.nome             |
| matricula              | Matrícula                                 | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.matricula        |
| cargo                  | Cargo                                     | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.cargo            |
| banco                  | Banco                                     | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.banco            |
| agencia                | Agência                                   | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.agencia          |
| conta                  | Conta                                     | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.conta            |
| pix                    | Chave PIX (opcional)                      | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.pix              |
| p.nome                 | `Nome do Participante`                    | text     | Sempre                           | Não declarada          | Nenhum            | (e) => handleParticipanteChange(index, e) | p.nome                    |
| finalidade             | Encontro/Seminário/Congresso              | radio    | Sempre                           | Não declarada          | Nenhum            | handleInputChange as any                  | encontro                  |
| finalidade             | Curso de aperfeiçoamento                  | radio    | Sempre                           | Não declarada          | Nenhum            | handleInputChange as any                  | curso                     |
| finalidade             | Outros                                    | radio    | Sempre                           | Não declarada          | Nenhum            | handleInputChange as any                  | outros                    |
| finalidadeOutros       | Especifique a finalidade                  | text     | formData.finalidade === "outros" | Não declarada          | Nenhum            | handleInputChange                         | formData.finalidadeOutros |
| periodo                | Ex: 01/01/2025 a 05/01/2025               | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.periodo          |
| cidadeEstado           | Cidade e Estado                           | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.cidadeEstado     |
| local                  | Local (Hotel, Centro de Convenções, etc.) | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.local            |
| meioTransporte         | Meio de transporte                        | text     | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.meioTransporte   |
| justificativa          | justificativa                             | textarea | Sempre                           | Não declarada          | Nenhum            | handleInputChange                         | formData.justificativa    |

Dados enviados: `{"formData":"formData","participantes":"participantes"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleParticipanteChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const novosParticipantes = [...participantes];
  novosParticipantes[index].nome = e.target.value;
  setParticipantes(novosParticipantes);
  setDocumentoPronto(null);
};

adicionarParticipante = () => {
  setParticipantes([...participantes, { id: Date.now(), nome: "" }]);
};

removerParticipante = (index: number) => {
  if (participantes.length <= 1) return;
  setParticipantes(participantes.filter((_, i) => i !== index));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = (
    <SolicitacaoViagemPdf formData={formData} participantes={participantes} />
  );
  setDocumentoPronto(doc);
};
```

## /requisicao-manual-almoxarifado

Página: `src/pages/RequisicaoManualAlmoxarifado/RequisicaoManualAlmoxarifado.tsx`. PDF: `src/pdf/RequisicaoAlmoxarifadoPdf.tsx`. Download: `requisicao_almoxarifado_${formData.requisicaoNum \|\| "sem_numero"}.pdf`.

### Estado inicial

```tsx
formData = {
  dataEmissao: new Date().toLocaleDateString("pt-BR"),
  requisicaoNum: "",
  requisitante: "",
  lotacao: "",
  justificativa: "",
};
itens = [
  { id: 1, descricao: "", quantidadeSolicitada: "", quantidadeAtendida: "" },
];
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original       | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração                                                         | PDF                       |
| ---------------------- | --------------------- | -------- | ------------------------ | ---------------------- | ----------------- | --------------------------------------------------------------------------- | ------------------------- |
| requisicaoNum          | REQUISIÇÃO Nº         | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                           | formData.requisicaoNum    |
| dataEmissao            | DATA (Ex: DD/MM/AAAA) | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                           | formData.dataEmissao      |
| requisitante           | REQUISITANTE          | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                           | formData.requisitante     |
| lotacao                | LOTAÇÃO               | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                           | formData.lotacao          |
| justificativa          | justificativa         | textarea | Sempre                   | Não declarada          | Nenhum            | handleInputChange                                                           | formData.justificativa    |
| descricao              | Descrição do material | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleItemChange( index, e as React.ChangeEvent<HTMLInputElement>, ) | item.descricao            |
| quantidadeSolicitada   | Solic.                | number   | Sempre                   | Não declarada          | Nenhum            | (e) => handleItemChange( index, e as React.ChangeEvent<HTMLInputElement>, ) | item.quantidadeSolicitada |
| quantidadeAtendida     | Atend.                | number   | Sempre                   | Não declarada          | Nenhum            | (e) => handleItemChange( index, e as React.ChangeEvent<HTMLInputElement>, ) | item.quantidadeAtendida   |

Dados enviados: `{"formData":"formData","itens":"itens"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null); // Corrigido!
};

handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  const novosItens = [...itens];

  // Simplificado
  if (name === "descricao") {
    novosItens[index].descricao = value;
  } else if (name === "quantidadeSolicitada") {
    novosItens[index].quantidadeSolicitada = value;
  } else if (name === "quantidadeAtendida") {
    novosItens[index].quantidadeAtendida = value;
  }

  setItens(novosItens);
  setDocumentoPronto(null);
};

adicionarItem = () => {
  setItens([
    ...itens,
    {
      id: Date.now(),
      descricao: "",
      quantidadeSolicitada: "",
      quantidadeAtendida: "",
    },
  ]);
  setDocumentoPronto(null);
};

removerItem = (index: number) => {
  if (itens.length <= 1) return;
  setItens(itens.filter((_, i) => i !== index));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <RequisicaoAlmoxarifadoPdf formData={formData} itens={itens} />;
  setDocumentoPronto(doc);
};
```

## /solicitacao-documentos

Página: `src/pages/SolicitacaoDocumentos/SolicitacaoDocumentos.tsx`. PDF: `src/pdf/SolicitacaoDocumentosPdf.tsx`. Download: `solicitacao_documentos.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  cpf: "",
  email: "",
  contato: "",
  documentosSolicitados: "",
  justificativa: "",
  cienteLgpd: false,
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original       | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração | PDF                            |
| ---------------------- | --------------------- | -------- | ------------------------ | ---------------------- | ----------------- | ------------------- | ------------------------------ |
| nome                   | Nome                  | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.nome                  |
| cpf                    | CPF                   | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.cpf                   |
| email                  | E-mail                | email    | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.email                 |
| contato                | Contato (Telefone)    | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.contato               |
| documentosSolicitados  | documentosSolicitados | textarea | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.documentosSolicitados |
| justificativa          | justificativa         | textarea | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.justificativa         |
| cienteLgpd             |                       | checkbox | Sempre                   | Não declarada          | Nenhum            | handleInputChange   | formData.cienteLgpd            |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value, type } = e.target;

  if (type === "checkbox") {
    const { checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <SolicitacaoDocumentosPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /solicitacao-estagiario

Página: `src/pages/SolicitacaoEstagiario/SolicitacaoEstagiario.tsx`. PDF: `src/pdf/SolicitacaoEstagiarioPdf.tsx`. Download: `solicitacao_estagiario.pdf`.

### Estado inicial

```tsx
formData = {
  setor: "",
  areaEstagio: "",
  supervisor: "",
  cargo: "",
  horario: "",
  duracao: "",
  atividades: "",
  habilidades: "",
  justificativa: "",
  remunerado: "sim",
  vagas: "",
  opcoesCurso: [
    { id: 1, curso: "", periodo: "", nivel: "graduacao" },
    { id: 2, curso: "", periodo: "", nivel: "graduacao" },
    { id: 3, curso: "", periodo: "", nivel: "graduacao" },
  ],
};
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original          | Controle | Condição / desabilitação | Obrigatoriedade nativa | Limites originais | Máscara / alteração                         | PDF                    |
| ---------------------- | ------------------------ | -------- | ------------------------ | ---------------------- | ----------------- | ------------------------------------------- | ---------------------- |
| setor                  | Setor Solicitante        | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.setor         |
| areaEstagio            | Área de Estágio          | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.areaEstagio   |
| supervisor             | Supervisor do Estágio    | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.supervisor    |
| cargo                  | Cargo do Supervisor      | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.cargo         |
| horario                | Horário de Estágio       | text     | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.horario       |
| duracao                | Duração Prevista (meses) | number   | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.duracao       |
| vagas                  | vagas                    | number   | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.vagas         |
| curso                  | Curso/Área               | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleOpcaoCursoTextChange(index, e) | opcao.curso            |
| periodo                | Período                  | text     | Sempre                   | Não declarada          | Nenhum            | (e) => handleOpcaoCursoTextChange(index, e) | opcao.periodo          |
| `nivel-${opcao.id}`    | Graduação/Técnico        | radio    | Sempre                   | Não declarada          | Nenhum            | (e) => handleOpcaoCursoChange(index, e)     | graduacao              |
| `nivel-${opcao.id}`    | Pós-Graduação            | radio    | Sempre                   | Não declarada          | Nenhum            | (e) => handleOpcaoCursoChange(index, e)     | pos                    |
| atividades             | atividades               | textarea | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.atividades    |
| habilidades            | habilidades              | textarea | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.habilidades   |
| justificativa          | justificativa            | textarea | Sempre                   | Não declarada          | Nenhum            | handleInputChange                           | formData.justificativa |
| remunerado             | Sim                      | radio    | Sempre                   | Não declarada          | Nenhum            | handleInputChange as any                    | sim                    |
| remunerado             | Não                      | radio    | Sempre                   | Não declarada          | Nenhum            | handleInputChange as any                    | nao                    |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleOpcaoCursoChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const { value } = e.target;
  const novasOpcoes = [...formData.opcoesCurso];
  novasOpcoes[index] = {
    ...novasOpcoes[index],
    nivel: value as "graduacao" | "pos",
  };
  setFormData((prev) => ({ ...prev, opcoesCurso: novasOpcoes }));
  setDocumentoPronto(null);
};

handleOpcaoCursoTextChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const { name, value } = e.target;
  const novasOpcoes = [...formData.opcoesCurso];
  novasOpcoes[index] = { ...novasOpcoes[index], [name]: value };
  setFormData((prev) => ({ ...prev, opcoesCurso: novasOpcoes }));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <SolicitacaoEstagiarioPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /inspecao-medica

Página: `src/pages/GESAT-RelatorioInspecaoMedica/RelatorioInspecaoMedica.tsx`. PDF: `src/pdf/RelatorioInspecaoMedicaPdf.tsx`. Download: `relatorio_inspecao_medica.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  endereco: "",
  numeroCasa: "",
  data: "",
  funcao: "",
  matricula: "",
  lotacao: "",
  emailServidor: "",
  admissao: "",
  sexo: "",
  estadoCivil: "",
  regime: "",
  cpf: "",
  cargo: "",
  // localTrabalho: "",
  ramal: "",
  bairro: "",
  complemento: "",
  dataSaida: "",
  dataRetorno: "",
  dataAssinaturaServidor: "",
  dataAssinaturaChefe: "",
  descricaoFuncoes: "",
  funcaoConfianca: "nao",
  funcaoGESAT: "Outros",
  funcaoAfastamento: "Sim",
  afastadoReadaptado: "Sim",
  nomePaciente: "",
  dataAfastamentoReadaptado: "",
  afastadoConsecutivamente: "Não",
  dataAfastamento: "",
  outrosFuncaoGESAT: "",
  anamnese: "",
  exames: "",
  diagnostico: "",
  cid: "",
  contato: "",
};
```

### Campos e correspondência

| Nome / valor no estado    | Rótulo original                  | Controle | Condição / desabilitação           | Obrigatoriedade nativa | Limites originais | Máscara / alteração      | PDF                                                         |
| ------------------------- | -------------------------------- | -------- | ---------------------------------- | ---------------------- | ----------------- | ------------------------ | ----------------------------------------------------------- |
| nome                      | Nome                             | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.nome                                               |
| matricula                 | Matrícula                        | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.matricula                                          |
| cpf                       | CPF                              | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.cpf                                                |
| admissao                  | Admissão                         | date     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.admissao                                           |
| regime                    | Regime                           | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.regime                                             |
| data                      | Data Nascimento                  | date     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.data                                               |
| sexo                      | Sexo                             | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.sexo                                               |
| estadoCivil               | Estado Civil                     | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.estadoCivil                                        |
| cargo                     | Cargo                            | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.cargo                                              |
| funcao                    | Função                           | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.funcao                                             |
| lotacao                   | Lotação                          | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.lotacao                                            |
| endereco                  | Endereço                         | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.endereco                                           |
| numeroCasa                | Nº                               | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.numeroCasa                                         |
| bairro                    | Bairro                           | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.bairro                                             |
| complemento               | Complemento                      | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.complemento                                        |
| emailServidor             | Email                            | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.emailServidor                                      |
| contato                   | Contato (Telefone)               | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.contato                                            |
| funcaoConfianca           | Sim                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | sim                                                         |
| funcaoConfianca           | Não                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | nao                                                         |
| dataSaida                 |                                  | date     | formData.funcaoConfianca === "sim" | Não declarada          | Nenhum            | handleInputChange        | formData.dataSaida                                          |
| dataRetorno               |                                  | date     | formData.funcaoConfianca === "sim" | Não declarada          | Nenhum            | handleInputChange        | formData.dataRetorno                                        |
| dataAssinaturaServidor    | DD/MM/AAAA                       | date     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.dataAssinaturaServidor                             |
| descricaoFuncao           | descricaoFuncao                  | textarea | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| dataAssinaturaChefe       | DD/MM/AAAA                       | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | dataAssinaturaChefe                                         |
| funcaoGESAT               | Admissional                      | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | formData.funcaoGESAT === "Admissional"                      |
| funcaoGESAT               | Demissional                      | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | formData.funcaoGESAT === "Demissional"                      |
| funcaoGESAT               | Periódico                        | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | formData.funcaoGESAT === "Periódico"                        |
| funcaoGESAT               | Readaptacao / Restricao Médica   | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | formData.funcaoGESAT === "Readaptacao / Restricao Medica"   |
| funcaoGESAT               | Licença por Acidente de Trabalho | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | formData.funcaoGESAT === "Licenca por Acidente de Trabalho" |
| funcaoGESAT               | Licenca para Tratamento de Saude | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | formData.funcaoGESAT === "Licenca para Tratamento de Saude" |
| funcaoGESAT               | Outros                           | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange as any | formData.funcaoGESAT === "Outros"                           |
| outrosFuncaoGESAT         | Descreva outro motivo            | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | outrosFuncaoGESAT                                           |
| afastadoConsecutivamente  | Sim                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | Sim                                                         |
| afastadoConsecutivamente  | Não                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | Não                                                         |
| dataAfastamento           | DD/MM/AAAA                       | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | dataAfastamento                                             |
| afastadoReadaptado        | Sim                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | Sim                                                         |
| afastadoReadaptado        | Não                              | radio    | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | Não                                                         |
| dataAfastamentoReadaptado | DD/MM/AAAA                       | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | dataAfastamentoReadaptado                                   |
| nomePaciente              | Nome                             | text     | Sempre                             | Não declarada          | Nenhum            | handleInputChange        | formData.nomePaciente                                       |
| historicoAnamnese         | historicoAnamnese                | textarea | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| examesComplementar        | examesComplementar               | textarea | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| diagnosticoObservacoes    | diagnosticoObservacoes           | textarea | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| diagnosticoObservacoes    | diagnosticoObservacoes           | textarea | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| periodoSolicitado         | periodoSolicitado                | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| periodoInicio             | periodoInicio                    | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| obteveDias                | obteveDias                       | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| licencaDe                 | licencaDe                        | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| licencaA                  | licencaA                         | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| motivoLicenca             | motivoLicenca                    | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| encaminhar                | encaminhar                       | radio    | Sempre / disabled: true            | Não declarada          | Nenhum            | —                        | IPREM                                                       |
| encaminhar                | encaminhar                       | radio    | Sempre / disabled: true            | Não declarada          | Nenhum            | —                        | INSS                                                        |
| encaminhar                | encaminhar                       | radio    | Sempre / disabled: true            | Não declarada          | Nenhum            | —                        | Outro                                                       |
| encaminharOutro           | encaminharOutro                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| inaptoPara                | inaptoPara                       | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| aptoPara                  | aptoPara                         | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| outrosGeral               | outrosGeral                      | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |
| —                         |                                  | text     | Sempre                             | Não declarada          | Nenhum            | —                        | —                                                           |

Dados enviados: `{"formData":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setDocumentoPronto(null);
};

handleGerarPdfClick = () => {
  const doc = <RelatorioInspecaoMedicaPdf formData={formData} />;
  setDocumentoPronto(doc);
};
```

## /cartao-ponto

Página: `src/pages/CartaoPonto/FormularioCartaoPonto.tsx`. PDF: `src/pdf/CartaoPontoPdfDocument.tsx`. Download: `cartao_ponto_${formData.nome.replace(/\s+/g, "_")}.pdf`.

### Estado inicial

```tsx
formData = {
  nome: "",
  matricula: "",
  setor: "",
  horario: "",
  vereador: "",
  mesReferencia: "",
  inicioFerias: "",
  fimFerias: "",
  pontosFacultativos: [],
  feriados: [],
};
pontoFacultativoSelecionado = "";
feriadoSelecionado = "";
erroDiaEspecial = "";
```

### Campos e correspondência

| Nome / valor no estado | Rótulo original                               | Controle | Condição / desabilitação                   | Obrigatoriedade nativa | Limites originais                  | Máscara / alteração                                                                                                    | PDF                         |
| ---------------------- | --------------------------------------------- | -------- | ------------------------------------------ | ---------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| nome                   | Nome completo                                 | text     | Sempre                                     | Não declarada          | Nenhum                             | handleInputChange                                                                                                      | formData.nome               |
| matricula              | Matrícula                                     | text     | Sempre                                     | Não declarada          | Nenhum                             | handleInputChange                                                                                                      | formData.matricula          |
| setor                  | Setor (Ex: GABINETE DO VEREADOR...)           | text     | Sempre                                     | Não declarada          | Nenhum                             | handleInputChange                                                                                                      | formData.setor              |
| horario                | Horário (Ex: 09:30 às 11:30 e 14:00 às 18:00) | text     | Sempre                                     | Não declarada          | Nenhum                             | handleInputChange                                                                                                      | formData.horario            |
| vereador               | Vereador Responsável (Para assinatura)        | text     | Sempre                                     | Não declarada          | Nenhum                             | handleInputChange                                                                                                      | formData.vereador           |
| mesReferencia          | mesReferencia                                 | month    | Sempre                                     | Não declarada          | Nenhum                             | handleInputChange                                                                                                      | formData.mesReferencia      |
| inicioFerias           | inicioFerias                                  | date     | Sempre                                     | Não declarada          | Nenhum                             | handleInputChange                                                                                                      | formData.inicioFerias       |
| fimFerias              | fimFerias                                     | date     | Sempre                                     | Não declarada          | Nenhum                             | handleInputChange                                                                                                      | formData.fimFerias          |
| pontoFacultativo       | pontoFacultativo                              | date     | Sempre / disabled: !formData.mesReferencia | Não declarada          | min=limiteInicial; max=limiteFinal | (e) => { setPontoFacultativoSelecionado(e.target.value); adicionarDiaEspecial("pontosFacultativos", e.target.value); } | pontoFacultativoSelecionado |
| feriado                | feriado                                       | date     | Sempre / disabled: !formData.mesReferencia | Não declarada          | min=limiteInicial; max=limiteFinal | (e) => { setFeriadoSelecionado(e.target.value); adicionarDiaEspecial("feriados", e.target.value); }                    | feriadoSelecionado          |

Dados enviados: `{"data":"formData"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPdfPronto(false);
  const { name, value } = e.target;
  setErroDiaEspecial("");

  if (name === "mesReferencia") {
    setPontoFacultativoSelecionado("");
    setFeriadoSelecionado("");
    setFormData((prev) => ({
      ...prev,
      mesReferencia: value,
      pontosFacultativos: prev.pontosFacultativos.filter((data) =>
        data.startsWith(`${value}-`),
      ),
      feriados: prev.feriados.filter((data) => data.startsWith(`${value}-`)),
    }));
    return;
  }

  setFormData((prev) => ({ ...prev, [name]: value }));
};

adicionarDiaEspecial = (tipo: TipoDiaEspecial, dataSelecionada: string) => {
  setPdfPronto(false);
  setErroDiaEspecial("");

  if (!dataSelecionada) return;

  if (
    !formData.mesReferencia ||
    !dataSelecionada.startsWith(`${formData.mesReferencia}-`)
  ) {
    setErroDiaEspecial("Selecione uma data dentro do mês de referência.");
    return;
  }

  if (tipo === "pontosFacultativos" && isFimDeSemana(dataSelecionada)) {
    setPontoFacultativoSelecionado("");
    setErroDiaEspecial(
      "Pontos facultativos só podem ser selecionados em dias de semana.",
    );
    return;
  }

  const outroTipo: TipoDiaEspecial =
    tipo === "pontosFacultativos" ? "feriados" : "pontosFacultativos";

  setFormData((prev) => ({
    ...prev,
    [tipo]: Array.from(new Set([...prev[tipo], dataSelecionada])).sort(),
    [outroTipo]: prev[outroTipo].filter((data) => data !== dataSelecionada),
  }));

  if (tipo === "pontosFacultativos") {
    setPontoFacultativoSelecionado("");
  } else {
    setFeriadoSelecionado("");
  }
};

removerDiaEspecial = (tipo: TipoDiaEspecial, dataRemovida: string) => {
  setPdfPronto(false);
  setFormData((prev) => ({
    ...prev,
    [tipo]: prev[tipo].filter((data) => data !== dataRemovida),
  }));
};
```

## /recadastramento

Página: `src/pages/Recadastramento/Recadastramento.tsx`. PDF: `src/pdf/RecadastramentoPdf.tsx`. Download: `recadastramento-${onlyDigits(data.cpf) \|\| "cmpm"}.pdf`.

### Estado inicial

```tsx
data = createInitialRecadastramentoData;
```

### Campos e correspondência

| Nome / valor no estado           | Rótulo original                            | Controle | Condição / desabilitação                                                                                                                                             | Obrigatoriedade nativa | Limites originais | Máscara / alteração                                                           | PDF                                                 |
| -------------------------------- | ------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------------- | ----------------------------------------------------------------------------- | --------------------------------------------------- |
| tipoRecadastramento              |                                            | radio    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | () => update("tipoRecadastramento", "completo")                               | data.tipoRecadastramento === "completo"             |
| tipoRecadastramento              |                                            | radio    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | () => update("tipoRecadastramento", "simplificado")                           | data.tipoRecadastramento === "simplificado"         |
| tipoPessoa                       |                                            | radio    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | () => update("tipoPessoa", "servidor")                                        | data.tipoPessoa === "servidor"                      |
| tipoPessoa                       |                                            | radio    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | () => update("tipoPessoa", "vereador")                                        | data.tipoPessoa === "vereador"                      |
| data.nome                        |                                            | input    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | (e) => update("nome", e.target.value)                                         | data.nome                                           |
| data.matricula                   |                                            | input    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | (e) => update("matricula", e.target.value)                                    | data.matricula                                      |
| data.cpf                         |                                            | input    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | (e) => update("cpf", maskCpf(e.target.value))                                 | data.cpf                                            |
| data.rg                          |                                            | input    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | (e) => update("rg", e.target.value)                                           | data.rg                                             |
| data.cargoFuncao                 |                                            | input    | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | (e) => update("cargoFuncao", e.target.value)                                  | data.cargoFuncao                                    |
| data.dataDeclaracao              |                                            | date     | Sempre                                                                                                                                                               | Não declarada          | Nenhum            | (e) => update("dataDeclaracao", e.target.value)                               | data.dataDeclaracao                                 |
| data.dataNascimento              |                                            | date     | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("dataNascimento", e.target.value)                               | data.dataNascimento                                 |
| data.naturalidade                |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("naturalidade", e.target.value)                                 | data.naturalidade                                   |
| data.ufNascimento                |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | maxLength=2       | (e) => update("ufNascimento", e.target.value.toUpperCase())                   | data.ufNascimento                                   |
| data.nacionalidade               |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("nacionalidade", e.target.value)                                | data.nacionalidade                                  |
| data.estadoCivil                 |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("estadoCivil", e.target.value)                                  | data.estadoCivil                                    |
| data.sexo                        |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("sexo", e.target.value)                                         | data.sexo                                           |
| data.possuiDeficiencia           |                                            | checkbox | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("possuiDeficiencia", e.target.checked)                          | data.possuiDeficiencia                              |
| data.tipoDeficiencia             |                                            | input    | data.tipoRecadastramento === "completo" && data.possuiDeficiencia                                                                                                    | Não declarada          | Nenhum            | (e) => update("tipoDeficiencia", e.target.value)                              | data.tipoDeficiencia                                |
| data.rgEmissor                   |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("rgEmissor", e.target.value)                                    | data.rgEmissor                                      |
| data.rgUf                        |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | maxLength=2       | (e) => update("rgUf", e.target.value.toUpperCase())                           | data.rgUf                                           |
| data.rgData                      |                                            | date     | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("rgData", e.target.value)                                       | data.rgData                                         |
| data.pisPasep                    |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("pisPasep", e.target.value)                                     | data.pisPasep                                       |
| data.tituloEleitor               |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("tituloEleitor", e.target.value)                                | data.tituloEleitor                                  |
| data.zonaEleitoral               |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("zonaEleitoral", e.target.value)                                | data.zonaEleitoral                                  |
| data.secaoEleitoral              |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("secaoEleitoral", e.target.value)                               | data.secaoEleitoral                                 |
| data.eleitorUf                   |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | maxLength=2       | (e) => update("eleitorUf", e.target.value.toUpperCase())                      | data.eleitorUf                                      |
| data.ctps                        |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("ctps", e.target.value)                                         | data.ctps                                           |
| data.ctpsSerie                   |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("ctpsSerie", e.target.value)                                    | data.ctpsSerie                                      |
| data.ctpsUf                      |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | maxLength=2       | (e) => update("ctpsUf", e.target.value.toUpperCase())                         | data.ctpsUf                                         |
| data.ctpsEmissao                 |                                            | date     | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("ctpsEmissao", e.target.value)                                  | data.ctpsEmissao                                    |
| data.conselhoNumero              |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("conselhoNumero", e.target.value)                               | data.conselhoNumero                                 |
| data.conselhoOrgao               |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("conselhoOrgao", e.target.value)                                | data.conselhoOrgao                                  |
| data.reservista                  |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("reservista", e.target.value)                                   | data.reservista                                     |
| data.orgaoReservista             |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("orgaoReservista", e.target.value)                              | data.orgaoReservista                                |
| data.cnh                         |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("cnh", e.target.value)                                          | data.cnh                                            |
| data.cnhCategoria                |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("cnhCategoria", e.target.value)                                 | data.cnhCategoria                                   |
| data.logradouro                  |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("logradouro", e.target.value)                                   | data.logradouro                                     |
| data.numero                      |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("numero", e.target.value)                                       | data.numero                                         |
| data.complemento                 |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("complemento", e.target.value)                                  | data.complemento                                    |
| data.bairro                      |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("bairro", e.target.value)                                       | data.bairro                                         |
| data.cep                         |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("cep", maskCep(e.target.value))                                 | data.cep                                            |
| data.cidade                      |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("cidade", e.target.value)                                       | data.cidade                                         |
| data.enderecoUf                  |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | maxLength=2       | (e) => update("enderecoUf", e.target.value.toUpperCase())                     | data.enderecoUf                                     |
| data.telefone                    |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("telefone", maskPhone(e.target.value))                          | data.telefone                                       |
| data.celular                     |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("celular", maskPhone(e.target.value))                           | data.celular                                        |
| data.email                       |                                            | email    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("email", e.target.value)                                        | data.email                                          |
| data.admissao                    |                                            | date     | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("admissao", e.target.value)                                     | data.admissao                                       |
| data.vinculo                     |                                            | select   | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update( "vinculo", e.target.value as RecadastramentoData["vinculo"], ) | data.vinculo                                        |
| data.orgaoCessao                 |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("orgaoCessao", e.target.value)                                  | data.orgaoCessao                                    |
| data.cargoConcurso               |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("cargoConcurso", e.target.value)                                | data.cargoConcurso                                  |
| data.cargoFuncao                 |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("cargoFuncao", e.target.value)                                  | data.cargoFuncao                                    |
| data.lotacao                     |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("lotacao", e.target.value)                                      | data.lotacao                                        |
| data.grauInstrucao               |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("grauInstrucao", e.target.value)                                | data.grauInstrucao                                  |
| data.formacao                    |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("formacao", e.target.value)                                     | data.formacao                                       |
| data.agencia                     |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("agencia", e.target.value)                                      | data.agencia                                        |
| data.operacao                    |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("operacao", e.target.value)                                     | data.operacao                                       |
| data.conta                       |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("conta", e.target.value)                                        | data.conta                                          |
| data.exerceAtividadeRemunerada   |                                            | checkbox | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => update("exerceAtividadeRemunerada", e.target.checked)                  | data.exerceAtividadeRemunerada                      |
| data.atividadeRemuneradaDetalhes |                                            | textarea | data.tipoRecadastramento === "completo" && data.exerceAtividadeRemunerada                                                                                            | Não declarada          | Nenhum            | (e) => update("atividadeRemuneradaDetalhes", e.target.value)                  | data.atividadeRemuneradaDetalhes                    |
| bem.descricao                    |                                            | textarea | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => updateBem(bem.id, "descricao", e.target.value)                         | bem.descricao                                       |
| bem.valor                        |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => updateBem(bem.id, "valor", e.target.value)                             | bem.valor                                           |
| situacaoVereador                 |                                            | radio    | data.tipoRecadastramento === "completo" && data.tipoPessoa === "vereador"                                                                                            | Não declarada          | Nenhum            | () => update("situacaoVereador", "naoServidor")                               | data.situacaoVereador === "naoServidor"             |
| situacaoVereador                 |                                            | radio    | data.tipoRecadastramento === "completo" && data.tipoPessoa === "vereador"                                                                                            | Não declarada          | Nenhum            | () => update("situacaoVereador", "servidorCompativel")                        | data.situacaoVereador === "servidorCompativel"      |
| situacaoVereador                 |                                            | radio    | data.tipoRecadastramento === "completo" && data.tipoPessoa === "vereador"                                                                                            | Não declarada          | Nenhum            | () => update("situacaoVereador", "servidorIncompativel")                      | data.situacaoVereador === "servidorIncompativel"    |
| opcaoRemuneracao                 | Opto pela remuneração do cargo efetivo     | radio    | data.tipoRecadastramento === "completo" && data.tipoPessoa === "vereador" && data.situacaoVereador === "servidorIncompativel"                                        | Não declarada          | Nenhum            | () => update("opcaoRemuneracao", "opta")                                      | data.opcaoRemuneracao === "opta"                    |
| opcaoRemuneracao                 | Não opto pela remuneração do cargo efetivo | radio    | data.tipoRecadastramento === "completo" && data.tipoPessoa === "vereador" && data.situacaoVereador === "servidorIncompativel"                                        | Não declarada          | Nenhum            | () => update("opcaoRemuneracao", "naoOpta")                                   | data.opcaoRemuneracao === "naoOpta"                 |
| baseContribuicao                 | Subsídio de vereador                       | radio    | data.tipoRecadastramento === "completo" && data.tipoPessoa === "vereador" && data.situacaoVereador === "servidorIncompativel" && data.opcaoRemuneracao === "naoOpta" | Não declarada          | Nenhum            | () => update("baseContribuicao", "subsidioVereador")                          | data.baseContribuicao === "subsidioVereador"        |
| baseContribuicao                 | Remuneração do cargo efetivo               | radio    | data.tipoRecadastramento === "completo" && data.tipoPessoa === "vereador" && data.situacaoVereador === "servidorIncompativel" && data.opcaoRemuneracao === "naoOpta" | Não declarada          | Nenhum            | () => update( "baseContribuicao", "remuneracaoCargoEfetivo", )                | data.baseContribuicao === "remuneracaoCargoEfetivo" |
| dependente.nome                  |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => updateDependente( dependente.id, "nome", e.target.value, )             | dependente.nome                                     |
| dependente.parentesco            |                                            | input    | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => updateDependente( dependente.id, "parentesco", e.target.value, )       | dependente.parentesco                               |
| dependente.dataNascimento        |                                            | date     | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => updateDependente( dependente.id, "dataNascimento", e.target.value, )   | dependente.dataNascimento                           |
| dependente.ir                    | IR                                         | checkbox | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => updateDependente( dependente.id, "ir", e.target.checked, )             | dependente.ir                                       |
| dependente.af                    | AF                                         | checkbox | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => updateDependente( dependente.id, "af", e.target.checked, )             | dependente.af                                       |
| dependente.am                    | AM                                         | checkbox | data.tipoRecadastramento === "completo"                                                                                                                              | Não declarada          | Nenhum            | (e) => updateDependente( dependente.id, "am", e.target.checked, )             | dependente.am                                       |

Dados enviados: `{"data":"data"}`. Campos não apresentados continuam nos defaults; nomes repetidos pertencem às respectivas listas.

### Operações e regras preservadas

```tsx
validate = (data: RecadastramentoData): ValidationError[] => {
  const errors: ValidationError[] = [];
  const required = (field: keyof RecadastramentoData, message: string) => {
    if (!String(data[field] ?? "").trim()) errors.push({ field, message });
  };

  required("nome", "Informe o nome completo.");
  required("rg", "Informe o RG.");
  required("cpf", "Informe o CPF.");
  required("cargoFuncao", "Informe o cargo ou função.");
  required("dataDeclaracao", "Informe a data da declaração.");

  if (data.cpf && !isValidCpf(data.cpf)) {
    errors.push({
      field: "cpf",
      message: "Informe um CPF válido, com 11 dígitos.",
    });
  }

  if (data.tipoRecadastramento === "simplificado") return errors;

  required("matricula", "Informe a matrícula.");
  required("dataNascimento", "Informe a data de nascimento.");
  required("naturalidade", "Informe a naturalidade.");
  required("ufNascimento", "Informe a UF de nascimento.");
  required("estadoCivil", "Informe o estado civil.");
  required("logradouro", "Informe o logradouro.");
  required("numero", "Informe o número do endereço.");
  required("bairro", "Informe o bairro.");
  required("cidade", "Informe a cidade.");
  required("enderecoUf", "Informe a UF do endereço.");
  required("email", "Informe o e-mail.");
  required("admissao", "Informe a data de admissão.");
  required("vinculo", "Selecione o vínculo funcional.");
  required("lotacao", "Informe a lotação atual.");

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "Informe um e-mail válido." });
  }
  if (!onlyDigits(data.telefone) && !onlyDigits(data.celular)) {
    errors.push({
      field: "celular",
      message: "Informe ao menos um telefone ou celular.",
    });
  }
  if (data.possuiDeficiencia && !data.tipoDeficiencia.trim()) {
    errors.push({
      field: "tipoDeficiencia",
      message: "Descreva o tipo de deficiência.",
    });
  }
  if (
    data.exerceAtividadeRemunerada &&
    !data.atividadeRemuneradaDetalhes.trim()
  ) {
    errors.push({
      field: "atividadeRemuneradaDetalhes",
      message: "Descreva a outra atividade remunerada e os horários.",
    });
  }

  if (!data.bens.length) {
    errors.push({
      field: "bens",
      message: "Inclua ao menos uma linha na declaração de bens.",
    });
  }
  data.bens.forEach((bem, index) => {
    if (!bem.descricao.trim() || !bem.valor.trim()) {
      errors.push({
        field: `bem-${bem.id}`,
        message: `Complete a descrição e o valor do ${index + 1}º bem. Se não houver bens, declare “Não possuo bens” e valor “0,00”.`,
      });
    }
  });

  data.dependentes.forEach((dependente, index) => {
    if (
      !dependente.nome.trim() ||
      !dependente.parentesco.trim() ||
      !dependente.dataNascimento
    ) {
      errors.push({
        field: `dependente-${dependente.id}`,
        message: `Complete nome, parentesco e nascimento do dependente ${index + 1}.`,
      });
    }
    if (!dependente.ir && !dependente.af && !dependente.am) {
      errors.push({
        field: `dependente-${dependente.id}`,
        message: `Marque ao menos um tipo de dependência para o dependente ${index + 1}.`,
      });
    }
  });

  return errors;
};

update = <K extends keyof RecadastramentoData>(
  field: K,
  value: RecadastramentoData[K],
) => {
  setData((current) => ({ ...current, [field]: value }));
  setReady(false);
  setErrors([]);
};

updateBem = (id: number, field: keyof Omit<Bem, "id">, value: string) => {
  update(
    "bens",
    data.bens.map((bem) => (bem.id === id ? { ...bem, [field]: value } : bem)),
  );
};

updateDependente = <K extends keyof Omit<Dependente, "id">>(
  id: number,
  field: K,
  value: Dependente[K],
) => {
  update(
    "dependentes",
    data.dependentes.map((dependente) =>
      dependente.id === id ? { ...dependente, [field]: value } : dependente,
    ),
  );
};

addBem = () => {
  update("bens", [...data.bens, { id: Date.now(), descricao: "", valor: "" }]);
};

addDependente = () => {
  update("dependentes", [
    ...data.dependentes,
    {
      id: Date.now(),
      nome: "",
      parentesco: "",
      dataNascimento: "",
      ir: false,
      af: false,
      am: false,
    },
  ]);
};

preparePdf = () => {
  const nextErrors = validate(data);
  setErrors(nextErrors);
  setReady(nextErrors.length === 0);
  if (nextErrors.length) {
    window.requestAnimationFrame(() => {
      document
        .getElementById("validation-summary")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
};
```

## Divergências registradas

- Adicionar participante/dependente em viagem/dependentes não invalidava um download anterior; será corrigido tecnicamente sem alterar mínimo de linhas.
- Relatório de viagem e listas de materiais/participantes mutavam objetos aninhados; usar atualização imutável.
- Férias descreve parcelamento no rótulo, mas a condição operacional é somente período diferente de 30.
- Inspeção médica converte algumas datas civis via UTC; defeito legado no PDF deve permanecer documentado, sem mudar o documento nesta migração.
- Tipos da solicitação de viagem no PDF não declaram todos os campos já enviados pela página; preservar payload e apresentação.
- Recadastramento: o retorno antecipado do simplificado dispensa as demais validações. Telefone/celular requer somente um deles com dígitos, não comprimento completo.
