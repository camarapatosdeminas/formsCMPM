# Plano de modernização do FormsCMPM

Este arquivo orienta os agentes que implementarão a modernização completa. A criação deste plano não significa que as tarefas de implementação foram executadas. Usar os checklists abaixo para acompanhar o trabalho e registrar evidências antes de marcar uma tarefa como concluída.

Plano elaborado em 02/09/2026. Referência inicial do código: commit `e099035790808041e90a2c9196711b1eb3b2c881`. Ao retomar o trabalho, conferir o estado real da árvore e as mudanças posteriores; não sobrescrever trabalho de outros agentes.

## Instrução permanente do usuário

> Sempre que você não tiver certeza sobre suas afirmações, pesquise em fontes confiáveis na internet e confirme as informações que você me passa e me forneça o link de onde você pegou a informação.

Para decisões técnicas, preferir documentação oficial. Registrar as fontes utilizadas nos documentos de decisão e citar os links ao comunicar conclusões ao usuário. Distinguir fatos observados no repositório, resultados medidos e propostas ainda não verificadas.

## Objetivo e restrições obrigatórias

Modernizar a interface, o layout e a experiência de preenchimento dos 17 formulários, com responsividade, acessibilidade, componentização, organização do código, máscaras, segurança e performance.

1. **Preservar a obrigatoriedade atual de cada campo.** Campo opcional continua opcional; campo obrigatório continua obrigatório nas mesmas condições. Não transformar ausência de validação em autorização para exigir preenchimento.
2. **Preservar o estilo dos PDFs.** Fontes, tamanhos, cores, margens, bordas, cabeçalhos, rodapés, tabelas, espaçamentos, assinaturas e regras de paginação permanecem como estão. A organização interna do código pode mudar.
3. Preservar o conteúdo dos documentos: textos institucionais e legais, títulos, campos, anexos, ordem, valores e nomes de download. Não revisar legislação nem reescrever declarações como parte desta modernização.
4. Aplicar máscaras a campos com formato explícito e confirmado, como CPF. Máscara não torna o campo obrigatório. Campo opcional vazio deve continuar válido.
5. Manter as regras condicionais, opções, valores iniciais, operações sobre listas e comportamento dos dados ocultos, exceto correções técnicas documentadas que não mudem a regra administrativa.
6. Manter as URLs existentes, inclusive `/SolicitacaoDiaria`. Se houver uma nova URL normalizada, preservar a antiga como alias. Links já distribuídos precisam continuar funcionando.
7. Manter React, TypeScript, Vite e a geração local com `@react-pdf/renderer`. Não incluir migração de framework, backend, login, banco de dados, serviços de consulta cadastral ou armazenamento persistente neste escopo.
8. O novo visual aplica-se à aplicação web. Não aplicar os tokens visuais da aplicação aos estilos dos PDFs.
9. Não introduzir novos bloqueios administrativos, limites de tamanho, quantidade, idade, prazo ou valor sob justificativa genérica de segurança ou organização. Preservar limites já existentes; novas regras precisam de solicitação específica.
10. Se a interface sugerir uma regra diferente da efetivamente implementada, registrar a divergência. Preservar o comportamento operacional existente durante a modernização; não inventar uma correção de negócio.

## Estado inicial observado

- SPA com React 19, TypeScript, Vite 7, React Router 7 e `@react-pdf/renderer` 4. Os números são os declarados no `package.json` na elaboração do plano; conferir versões resolvidas no lockfile antes de alterações.
- 17 páginas de formulários e uma home. Os documentos estão em `src/pdf/`.
- `src/App.tsx` importa as páginas diretamente. O catálogo também aparece em `src/components/SiteHeader.tsx` e `src/pages/HomePage/HomePages.tsx`.
- Solicitação de viagem possui rota e opção no cabeçalho, mas não possui card na home inicial. O catálogo central deve cobrir todos os 17 formulários.
- A home usa `repeat(5, 1fr)` e várias páginas compartilham `FormularioFerias.css`, que contém seletores globais de campos. Há risco de interferência entre estilos.
- Há tipos duplicados entre páginas e PDFs e usos de `any`. O lint executado na análise anterior encontrou 565 erros, incluindo espaços irregulares; esse número não equivale a 565 falhas funcionais.
- A etapa TypeScript do build passou na análise anterior. O Vite não concluiu por restrição de acesso do ambiente ao carregar sua configuração. Reexecutar em ambiente adequado antes de afirmar que o build está aprovado ou quebrado.
- `vercel.json` contém rewrite para `index.html`, sem cabeçalhos personalizados declarados. Isso não comprova quais cabeçalhos estão ativos na hospedagem: verificar a resposta HTTP da implantação.
- A busca inicial não encontrou chamadas explícitas de envio dos formulários nem uso de `localStorage`/`sessionStorage`. Confirmar o tráfego real no navegador antes de apresentar garantias de privacidade.
- `index.html` usa um favicon externo. Existem imagens institucionais em `public/images/`.
- Não há scripts de testes no `package.json` inicial.

## Contrato de validação a preservar

Obrigatoriedade, máscara e validação de formato são responsabilidades distintas. Não usar um schema compartilhado de identificação que passe a exigir nome, CPF ou matrícula em todos os formulários.

### Regras já confirmadas no código inicial

| Formulário                   | Obrigatoriedade e condições existentes                                                                                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Férias                       | `justificativa.trim()` é exigida quando `periodoGozo` é diferente de `30`. Os demais campos não bloqueiam a geração por estarem vazios. Ao retornar a 30 dias, o código limpa e desabilita a justificativa. |
| Cartão de ponto              | `nome.trim()`, `matricula.trim()` e `mesReferencia` são exigidos. Setor, horário, vereador, férias e dias especiais não são obrigatórios.                                                                   |
| Recadastramento simplificado | Exige `nome`, `rg`, `cpf`, `cargoFuncao` e `dataDeclaracao`; verifica dígitos do CPF. O retorno antecipado da validação dispensa as regras específicas do completo.                                         |
| Recadastramento completo     | Exige os mesmos campos do simplificado e os campos adicionais e condições listados abaixo.                                                                                                                  |
| Outros 14 formulários        | Os handlers de geração consultados não bloqueiam campos vazios. Preservar essa possibilidade; reconferir entradas, atributos nativos e operações condicionais no inventário detalhado.                      |

No recadastramento completo, manter:

- Obrigatórios adicionais: `matricula`, `dataNascimento`, `naturalidade`, `ufNascimento`, `estadoCivil`, `logradouro`, `numero`, `bairro`, `cidade`, `enderecoUf`, `email`, `admissao`, `vinculo` e `lotacao`.
- Ao menos um entre `telefone` e `celular` com dígitos informados. Não tornar os dois obrigatórios.
- Verificação de formato do e-mail e dos dígitos verificadores do CPF já existente.
- `tipoDeficiencia` preenchido quando `possuiDeficiencia` for verdadeiro.
- `atividadeRemuneradaDetalhes` preenchido quando `exerceAtividadeRemunerada` for verdadeiro.
- Ao menos uma linha de bens, com descrição e valor preenchidos. Preservar a orientação atual para quem não possui bens.
- Dependentes podem estar ausentes. Para cada dependente adicionado, exigir nome, parentesco, nascimento e ao menos um entre `ir`, `af` e `am`.
- Preservar os ramos de servidor/vereador, completo/simplificado e a composição dos anexos correspondentes.

No cartão de ponto, manter também:

- Dias especiais pertencem ao mês de referência.
- Ponto facultativo não pode ser adicionado em fim de semana.
- Datas não ficam duplicadas; ao atribuir uma data a um tipo, ela sai do outro.
- Ao mudar o mês, filtrar os dias especiais como ocorre atualmente.
- Não tornar início/fim de férias obrigatórios nem inventar novas restrições para esse intervalo.

Esses resumos não substituem o inventário campo a campo. Antes de migrar cada formulário, registrar: nome interno, rótulo, tipo, valor inicial, obrigatoriedade, condição, máscara, validação, limite existente, comportamento ao ocultar/limpar e campo correspondente no PDF.

### Política de máscaras e formatos

- CPF: apresentação `000.000.000-00`; aceitar digitação e colagem com ou sem pontuação; manter zeros iniciais. Usar entrada textual com teclado numérico apropriado, não `type="number"`.
- Manter a validação dos dígitos do CPF onde já existe. Não expandir automaticamente essa verificação para todos os formulários; a melhoria solicitada para os demais é máscara e consistência do formato informado.
- Campo opcional vazio é aceito. Campo preenchido com um formato explícito incompleto pode apresentar erro de formato ao sair do campo ou tentar gerar. Permitir edição parcial durante a digitação e limpar o campo completamente.
- CEP e telefone/celular: reutilizar os formatos existentes do recadastramento quando o campo tiver a mesma semântica. Distinguir ramal de telefone; não aplicar a máscara de telefone a ramais.
- CNPJ: o formulário de cursos possui esse campo. Suportar os formatos numérico e alfanumérico atuais, mantendo a pontuação apropriada. Não aplicar `onlyDigits` a CNPJ: a Receita Federal já implantou o formato alfanumérico. Conferir a especificação oficial referenciada ao final antes de implementar.
- RG, matrícula, agência, conta bancária, chave Pix, placa e campos de período livre: não assumir um único padrão nem remover letras ou sinais sem evidência. Pix não é necessariamente CPF. Preservar os formatos aceitos e documentar eventuais dúvidas.
- Datas: preservar os controles e formatos válidos atuais; não transformar campo textual de período em data única. Tratar datas civis sem deslocar o dia por conversão de fuso.
- Valores monetários: adicionar formatação somente a campos inequivocamente monetários, preservando vazio, zero, precisão e sinal aceitos atualmente. Não converter vazio em zero por coerção de schema.
- Separar valor exibido, valor normalizado e representação esperada pelo PDF por funções tipadas. A introdução de máscara na tela não deve reformar o estilo ou a formatação legada dos documentos sem necessidade.
- Testar colagem, apagar tudo, edição no meio, seleção/substituição e uso em teclado móvel. Não deixar a máscara reposicionar o cursor de forma imprevisível.

## Organização de código proposta

```text
src/
  app/
    App.tsx
    routes.tsx
    formCatalog.ts
  components/
    ui/
    forms/
    layout/
  features/
    home/
    ferias/
      FeriasPage.tsx
      FeriasForm.tsx
      ferias.schema.ts
      ferias.types.ts
      ferias.defaults.ts
      ferias.toPdf.ts
      FeriasForm.module.css
      pdf/
        FeriasPdf.tsx
    recadastramento/
    ...
  lib/
    formatters/
    validation/
    pdf/
  styles/
    tokens.css
    global.css
tests/
  fixtures/
  pdf-baseline/
  e2e/
docs/
  modernizacao/
```

Criar arquivos conforme a responsabilidade existir; não gerar arquivos vazios apenas para reproduzir a árvore. Testes unitários podem ficar próximos das funções testadas. A estrutura de PDFs pode ser migrada progressivamente, mantendo imports de compatibilidade temporários.

- `app`: composição da aplicação, rotas e catálogo. O catálogo contém identificador, nome, descrição, categoria, caminho e ícone; não importa documentos PDF antecipadamente.
- `components/ui`: controles visuais pequenos e reutilizáveis. Não conhecem regras administrativas nem módulos de PDF.
- `components/forms`: composição de rótulo/ajuda/erro, seções, resumo de erros, listas e ações comuns. Obrigatoriedade vem do formulário, nunca de uma regra global implícita.
- `components/layout`: cabeçalho, navegação, contêiner e estrutura de página.
- `features`: estado, regras, seções e documentos de uma funcionalidade. Uma funcionalidade não importa CSS ou detalhes internos de outra.
- `lib/formatters` e `lib/validation`: funções puras reutilizáveis, sem dependência de React.
- `lib/pdf`: preparação de dados, inicialização necessária do renderer e geração sob demanda. Sem regras de apresentação web.
- `styles`: reset global mínimo e tokens de cores, tipografia, espaçamento, raio, sombra e foco. Estilos locais em CSS Modules.
- PDF recebe dados tipados por props; não busca dados no DOM nem lê diretamente o estado dos campos.
- Eliminar `any` por contratos reais. Não substituir por casts amplos nem desabilitar regras do lint para fazer a migração passar.
- Preferir estado local por formulário. Introduzir contexto somente onde existir necessidade concreta de compartilhamento na mesma funcionalidade.

Base sugerida: React Hook Form para interação e Zod para schemas, com versões compatíveis com o projeto. A integração deve ser validada no piloto antes de se espalhar. Em Zod, tratar explicitamente `""` de campos opcionais e diferenciar tipos de entrada e saída quando houver transformação. Não usar coerção que altere silenciosamente a semântica dos dados.

## Roadmap e dependências

Ordem principal: **P0 → P1 → P2 → P3 → P4 → P5 → P7**. P6 começa depois de P0, incorpora mudanças a partir de P2 e precisa estar concluída antes da liberação de P7. As migrações de P5 podem ser divididas entre agentes depois que os contratos comuns estiverem estabilizados.

### P0 — Inventário e referências de regressão

- [ ] P0.1 Registrar commit de referência, alterações locais, comandos de execução e limitações do ambiente em `docs/modernizacao/baseline.md`.
- [ ] P0.2 Inventariar todos os campos dos 17 formulários em `docs/modernizacao/contrato-campos.md`, usando o modelo descrito neste arquivo. Distinguir campo obrigatório de linha mínima de uma lista.
- [ ] P0.3 Registrar as regras condicionais, valores iniciais, limites atuais, rotas, nomes de arquivo, anexos e comportamento de dados ocultos.
- [ ] P0.4 Criar fixtures exclusivamente sintéticas: preenchimento mínimo permitido, preenchimento completo, textos longos, listas e variantes condicionais relevantes.
- [ ] P0.5 Gerar PDFs de referência antes de mudar renderer, imports, estilos ou estrutura. Fixar relógio e fuso no ambiente de teste quando necessário; registrar versões, fontes e parâmetros de renderização.
- [ ] P0.6 Renderizar todas as páginas dos PDFs de referência e registrar quantidade de páginas, dimensões, textos e imagens para comparação futura. Preferir geração local no ambiente do projeto, sem enviar documentos a serviços externos.
- [ ] P0.7 Capturar home e telas representativas em celular e desktop; registrar tarefas de uso: localizar formulário, preencher, corrigir, gerar e baixar.
- [ ] P0.8 Medir a versão de produção local ou prévia: tamanho transferido inicialmente, scripts carregados, Lighthouse e tempo de geração de PDFs representativos. Registrar dispositivo/simulação, navegador e condições.
- [ ] P0.9 Reexecutar lint, TypeScript e build; separar erros de aplicação de bloqueios ambientais. Não mascarar a falha de um comando.

Saída de P0: contrato de campos e referências suficientes para comparar comportamento e aparência. A migração de uma página não começa sem a referência correspondente.

### P1 — Direção visual e experiência

- [ ] P1.1 Definir tokens e registrar decisões em `docs/modernizacao/ui-ux.md`: paleta institucional, contraste, escala tipográfica, espaçamento, superfícies, largura de conteúdo, bordas e foco.
- [ ] P1.2 Preparar a proposta visual da home e de férias em celular e desktop, com estados normal, erro, carregamento e download disponível. Usar o resultado como referência das próximas páginas.
- [ ] P1.3 Organizar o catálogo com busca por título/termos úteis e categorias claras; incluir os 17 formulários, estado sem resultados e ação de limpar busca.
- [ ] P1.4 Definir hierarquia de títulos, instruções curtas, indicação fiel de opcionais/obrigatórios e texto das ações. Manter textos legais completos acessíveis quando sua apresentação na tela for reorganizada.
- [ ] P1.5 Definir padrão de formulário curto em página única e de formulário extenso por seções; usar etapas apenas se melhorarem o fluxo sem perda de dados ou novos requisitos.
- [ ] P1.6 Definir navegação entre formulários e tratamento de saída com alterações não utilizadas. Se houver confirmação, deve permitir continuar preenchendo e manter o foco acessível.

Saída de P1: referência visual documentada e estados definidos. A estética dos PDFs não participa desta etapa.

### P2 — Base técnica e componentes

- [ ] P2.1 Implantar a estrutura de pastas gradualmente e configurar imports previsíveis. Manter rotas antigas operantes durante a transição.
- [ ] P2.2 Criar tokens e CSS Modules; limitar CSS global a reset e fundamentos. Não modernizar o CSS legado compartilhado de uma vez e afetar páginas ainda não migradas.
- [ ] P2.3 Criar `Button`, `Input`, `Select`, `Textarea`, `Checkbox` e `RadioGroup` conforme necessidades reais. Garantir props nativas, refs, nomes acessíveis, foco e estados.
- [ ] P2.4 Criar `FormField`, `FormSection`, `FormGrid`, `ErrorSummary` e ações de geração/download. Usar `label`, `fieldset` e `legend` corretamente; conectar ajuda e erros por `aria-describedby`.
- [ ] P2.5 Extrair máscaras, normalizadores e validadores puros. Implementar testes de casos observáveis, especialmente campos opcionais vazios e edição das máscaras.
- [ ] P2.6 Integrar React Hook Form e Zod no piloto com política de erro consistente: permitir digitação parcial, validar ao sair/tentar gerar e revalidar correções. Não exibir todos os campos como inválidos ao abrir a página.
- [ ] P2.7 Criar um catálogo central e rotas com carregamento adiado, tela de rota inexistente, fallback de carregamento e tratamento de falha de importação. Evitar imports de runtime dos PDFs na home.
- [ ] P2.8 Criar fluxo comum de PDF com estados de edição, validação, geração, pronto e erro. Gerar a partir de uma cópia estável dos dados; qualquer alteração relevante invalida o download anterior.
- [ ] P2.9 Impedir cliques duplicados e publicação de resultado obsoleto: se o usuário editar enquanto o PDF é gerado, o resultado antigo não pode aparecer como atual. Permitir nova tentativa após falha.
- [ ] P2.10 Liberar URLs de objeto e recursos ao substituí-los/desmontar, quando gerenciados pela aplicação; evitar revogação antes do download terminar.
- [ ] P2.11 Corrigir espaços irregulares, tipos e configurações inconsistentes de forma revisável; auditar dependências de tipos antigas como `@types/react-router-dom` antes de removê-las. Não atualizar versões major em massa.
- [ ] P2.12 Configurar testes de regras e de fluxos relevantes, além de comandos documentados de TypeScript, lint e build. Escolher versões das ferramentas compatíveis e registrar a decisão.

Saída de P2: componentes funcionais demonstrados no piloto, contratos estáveis e base que convive com as páginas legadas.

### P3 — Home e formulário piloto: férias

- [ ] P3.1 Implementar home e cabeçalho novos com busca, categorias e todos os formulários. Preservar caminhos, título da página, navegação por teclado e indicação da página atual.
- [ ] P3.2 Migrar férias para componentes, tipos, defaults e schema próprios. Não exigir nome, CPF, matrícula, lotação ou data inicial só porque parecem importantes.
- [ ] P3.3 Preservar a exigência condicional da justificativa e sua limpeza/desabilitação no retorno a 30 dias. Aplicar máscara de CPF sem exigir preenchimento.
- [ ] P3.4 Refatorar o contrato e os imports do PDF somente depois de comparar a referência. Eliminar o cast `as any` mantendo apresentação e conteúdo.
- [ ] P3.5 Verificar o fluxo mínimo permitido, parcelamento com/sem justificativa, máscara, correção de erro, falha de geração e edição após geração.
- [ ] P3.6 Conferir responsividade, teclado, leitor de tela, estados e PDF de férias. Registrar evidências e ajustes dos componentes em `docs/modernizacao/progresso.md`.

Saída de P3: primeira entrega completa utilizável, servindo de exemplo concreto para os demais agentes.

### P4 — Validar a arquitetura em recadastramento

- [ ] P4.1 Extrair schemas, defaults, máscaras e seções da página extensa, preservando todos os ramos de validação descritos neste arquivo.
- [ ] P4.2 Migrar listas de bens e dependentes com identificadores estáveis, foco previsível ao adicionar/remover e atualização imutável. Preservar as regras de linhas e opções.
- [ ] P4.3 Exercitar completo/simplificado e servidor/vereador; preservar dados ao navegar pelas seções e a política existente ao alternar condições.
- [ ] P4.4 Manter obrigatoriedade somente nas condições atuais, incluindo alternativa telefone/celular e dependentes opcionais.
- [ ] P4.5 Preservar portaria, anexos, ordem, texto e aparência em todas as variantes. Conferir documento extenso e textos longos com referências de P0.
- [ ] P4.6 Ajustar componentes comuns apenas quando houver necessidade reutilizável, sem introduzir regras de recadastramento nos demais formulários.

Saída de P4: padrão validado tanto em formulário simples quanto em listas e documentos extensos. Após esta etapa, estabilizar a API compartilhada para dividir P5.

### P5 — Migrar os 15 formulários restantes

Cada linha só pode ser marcada após cumprir integralmente a definição de conclusão por formulário. Os caminhos das páginas abaixo são relativos a `src/pages/`; os PDFs iniciais estão em `src/pdf/`.

| Status / ID | Rota preservada                   | Página inicial                                                  | PDF inicial                      |
| ----------- | --------------------------------- | --------------------------------------------------------------- | -------------------------------- |
| [ ] P5.A1   | `/adiantamento-13`                | `Adiantamento13/Adiantamento13.tsx`                             | `Adiantamento13Pdf.tsx`          |
| [ ] P5.A2   | `/declaracao-ficha-limpa`         | `DeclaracaoFichaLimpa/DeclaracaoFichaLimpa.tsx`                 | `DeclaracaoFichaLimpaPdf.tsx`    |
| [ ] P5.A3   | `/declaracao-nepotismo`           | `DeclaracaoNepotismo/DeclaracaoNepotismo.tsx`                   | `DeclaracaoNepotismoPdf.tsx`     |
| [ ] P5.A4   | `/declaracao-nao-ocupacao`        | `DeclaracaoNaoOcupacao/DeclaracaoNaoOcupacao.tsx`               | `DeclaracaoNaoOcupacaoPdf.tsx`   |
| [ ] P5.A5   | `/solicitacao-documentos`         | `SolicitacaoDocumentos/SolicitacaoDocumentos.tsx`               | `SolicitacaoDocumentosPdf.tsx`   |
| [ ] P5.B1   | `/declaracao-dependentes`         | `DeclaracaoDependentes/DeclaracaoDependentes.tsx`               | `DeclaracaoDependentesPdf.tsx`   |
| [ ] P5.B2   | `/ocorrencia-ponto`               | `OcorrenciaPonto/OcorrenciaPonto.tsx`                           | `OcorrenciaPontoPdf.tsx`         |
| [ ] P5.B3   | `/requisicao-manual-almoxarifado` | `RequisicaoManualAlmoxarifado/RequisicaoManualAlmoxarifado.tsx` | `RequisicaoAlmoxarifadoPdf.tsx`  |
| [ ] P5.C1   | `/solicitacao-viagem`             | `SolicitacaoViagem/SolicitacaoViagem.tsx`                       | `SolicitacaoViagemPdf.tsx`       |
| [ ] P5.C2   | `/SolicitacaoDiaria`              | `SolicitacaoDiaria/SolicitacaoDiaria.tsx`                       | `SolicitacaoDiariaPdf.tsx`       |
| [ ] P5.C3   | `/relatorio-viagem`               | `RelatorioViagem/RelatorioViagem.tsx`                           | `RelatorioViagemPdf.tsx`         |
| [ ] P5.C4   | `/solicitacao-cursos`             | `SolicitacaoCursos/SolicitacaoCursos.tsx`                       | `SolicitacaoCursosPdf.tsx`       |
| [ ] P5.D1   | `/solicitacao-estagiario`         | `SolicitacaoEstagiario/SolicitacaoEstagiario.tsx`               | `SolicitacaoEstagiarioPdf.tsx`   |
| [ ] P5.D2   | `/inspecao-medica`                | `GESAT-RelatorioInspecaoMedica/RelatorioInspecaoMedica.tsx`     | `RelatorioInspecaoMedicaPdf.tsx` |
| [ ] P5.D3   | `/cartao-ponto`                   | `CartaoPonto/FormularioCartaoPonto.tsx`                         | `CartaoPontoPdfDocument.tsx`     |

Formulários já cobertos pelos pilotos: `/formulario-ferias` em `FormularioFerias/FormularioFerias.tsx`, PDF `FeriasPdfDocument.tsx`; `/recadastramento` em `Recadastramento/Recadastramento.tsx`, PDF `RecadastramentoPdf.tsx`.

Cuidados por lote: A contém formulários mais simples; B contém listas e mínimos de linhas; C contém dados de viagem, valores, participantes e CNPJ; D contém condições extensas, dados de saúde e calendário. Não reutilizar obrigatoriedade entre formulários por semelhança de nomes.

### P6 — Segurança e performance durante a migração

- [ ] P6.1 Conferir tráfego e armazenamento no navegador usando somente dados sintéticos. Garantir que valores de campos não sejam enviados a analytics, logs, URLs ou serviços externos pela aplicação.
- [ ] P6.2 Manter os dados em memória; não adicionar rascunho em `localStorage`, `sessionStorage`, IndexedDB ou service worker. Explicar o comportamento de perda de dados na interface conforme o fluxo implementado.
- [ ] P6.3 Revisar uso de HTML dinâmico, links e scripts; tratar texto informado como texto. Não introduzir `dangerouslySetInnerHTML` ou sanitizadores sem necessidade concreta.
- [ ] P6.4 Revisar dependências e resultado de auditoria, distinguindo vulnerabilidades aplicáveis, ferramentas de desenvolvimento e runtime. Corrigir com alterações controladas e verificar PDFs após qualquer mudança no renderer/fontes.
- [ ] P6.5 Conferir que nenhuma credencial esteja em código, assets ou variáveis `VITE_*` usadas no cliente. Não exibir valores de segredos em saídas de auditoria.
- [ ] P6.6 Hospedar favicon e assets institucionais localmente quando adequado. Otimizar imagens web e declarar suas dimensões sem substituir assets usados em PDFs por versões visualmente diferentes.
- [ ] P6.7 Inspecionar os cabeçalhos efetivos e definir no `vercel.json` CSP, política de referência, prevenção de MIME sniffing e restrição de incorporação conforme o uso real. Se houver incorporação institucional, permitir apenas as origens necessárias; não quebrá-la com bloqueio indiscriminado.
- [ ] P6.8 Introduzir CSP primeiro em `Content-Security-Policy-Report-Only`, observar violações e ajustar antes de aplicar bloqueio. Conferir estilos, fontes, imagens e URLs `blob:`/`data:` somente onde efetivamente necessários. Não copiar política genérica nem liberar todas as origens para fazer o PDF funcionar.
- [ ] P6.9 Medir o bundle de produção: a home não deve carregar renderer e documentos PDF por imports transitivos. Carregar gerador/documento sob demanda e conferir loading/erro de rede.
- [ ] P6.10 Medir digitação, listas e geração nos formulários maiores. Não gerar novamente a cada tecla. Adotar worker ou otimizações adicionais somente se a medição demonstrar bloqueio relevante e se a compatibilidade visual for verificada.
- [ ] P6.11 Conferir cache de assets e atualização de HTML/chunks em novas versões; evitar cache indiscriminado que mantenha referências a arquivos removidos. Tratar falha de chunk com recuperação compreensível, sem descarte silencioso de dados.
- [ ] P6.12 Registrar resultados em `docs/modernizacao/seguranca-performance.md`, com condições, comparação antes/depois e limitações. Não declarar ausência de vulnerabilidades apenas porque uma auditoria automática passou.

Meta de performance em uso real: LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 no percentil 75, separando celular/desktop. Usar Lighthouse como diagnóstico laboratorial. Se não houver dados reais suficientes, registrar essa ausência; não declarar a meta atingida com base em uma única execução. Fixar orçamento de bundle e de geração depois de medir P0, sem inventar um tempo universal para todos os PDFs.

### P7 — Integração, documentação e liberação

- [ ] P7.1 Confirmar os 17 formulários migrados, acessíveis no catálogo e nas URLs antigas. Testar acesso direto, atualização de página, voltar/avançar e rota inexistente.
- [ ] P7.2 Remover CSS, imports, tipos e componentes legados somente após não terem consumidores. Conferir navegação em ordens diferentes para detectar interferência residual de estilos.
- [ ] P7.3 Executar lint, TypeScript, testes relevantes e build limpos. Configurar uma verificação automática desses comandos no mecanismo de CI disponível, sem presumir integração externa já existente.
- [ ] P7.4 Validar interface em 320, 375/390, 768, 1024 e 1440 px, retrato/paisagem e zoom de 200%/400%. Não aceitar rolagem horizontal da página; tabelas que exijam duas dimensões precisam de tratamento local acessível.
- [ ] P7.5 Testar teclado e leitor de tela em fluxos representativos, contraste e foco. Fazer pelo menos uma verificação móvel real quando houver dispositivo disponível; documentar quando só houver emulação.
- [ ] P7.6 Comparar todos os PDFs e suas variantes com P0, incluindo textos longos, campos vazios permitidos e listas. Verificar download em navegadores desktop e móveis disponíveis.
- [ ] P7.7 Atualizar README com setup, scripts, estrutura, adição de formulário, contratos de campos, geração de PDF, testes e execução na Vercel. Documentar pendências reais, se houver.
- [ ] P7.8 Preparar e verificar uma implantação de prévia na Vercel quando houver acesso e autorização de publicação. Conferir cabeçalhos, rotas, assets, PDFs e console na versão publicada.
- [ ] P7.9 Registrar versão anterior recuperável e procedimento de rollback; fazer mudanças pequenas e identificáveis. Publicar em produção somente conforme a autorização da tarefa de implementação; este plano não é uma ordem isolada de deploy.
- [ ] P7.10 Entregar relatório com tarefas concluídas, evidências, resultado dos comandos, diferenças conhecidas e eventuais bloqueios. Não marcar como concluída uma etapa que depende de verificação ainda indisponível.

## Critérios de acessibilidade e comportamento

- Usar WCAG 2.2 nível AA como referência da interface; não afirmar conformidade integral sem avaliação correspondente.
- Todo campo tem nome acessível e rótulo visível; placeholder serve somente de exemplo.
- Indicar obrigatoriedade conforme o contrato de campos. Erros não dependem apenas de cor.
- Após tentar gerar com erro, fornecer resumo com links e foco no resumo ou no primeiro campo inválido. Manter ordem de tabulação natural.
- Anunciar carregamento, falha e conclusão sem repetição excessiva. Desabilitar a ação durante geração, mas não deixar bloqueios sem explicação.
- Usar foco visível, contraste adequado e alvos confortáveis ao toque. Adotar 44 px como objetivo de design dos controles principais; avaliar o mínimo de 24 px e as exceções da WCAG no contexto correto.
- Respeitar redução de movimento e evitar elementos fixos que cubram campos, mensagens ou o teclado virtual.
- Em listas, botões de remoção indicam o item e devolvem foco a um lugar previsível. Adicionar/remover deve invalidar PDF antigo.
- Formulários curtos devem permitir concluir rapidamente; se houver etapas, dados e erros devem permanecer coerentes ao navegar entre elas.

## Preservação e testes dos PDFs

- A comparação é visual e de conteúdo. Igualdade binária do arquivo não é requisito: metadados e identificadores podem variar.
- Usar o mesmo payload, relógio, fuso, renderer, fontes e resolução para comparar antes/depois. Renderizar todas as páginas, não somente a primeira.
- Conferir fontes, tamanho de página, margens, cores, bordas, alinhamentos, largura de colunas, alturas, quebras, assinaturas, cabeçalhos, rodapés, ordem e quantidade de páginas para as mesmas fixtures.
- Comparar também texto extraído e valores dos campos. Uma imagem semelhante não comprova integridade dos dados.
- Inspecionar diferenças de renderização; não aumentar tolerâncias nem substituir referências automaticamente para fazer um teste passar. Pequenas diferenças de antialiasing precisam de justificativa; mudanças de estilo ou geometria não são aceitas.
- O código inicial registra `Font.registerHyphenationCallback` em `RecadastramentoPdf.tsx`. Como o registro pode afetar o renderer compartilhado, verificar seus efeitos antes de introduzir lazy loading. Testar férias antes/depois de recadastramento e na ordem inversa; preservar o comportamento visual da referência sem carregar todos os documentos na home.
- Alguns documentos calculam a data ao importar o módulo ou ao renderizar. Controlar o relógio dos testes e verificar datas próximas da meia-noite; não confundir mudança de data com mudança visual.
- Extrair componentes comuns de PDF somente onde os estilos já forem equivalentes. Não criar um cabeçalho universal que padronize documentos atualmente diferentes.
- Se um defeito visual ou textual já existir, registrá-lo separadamente. Não redesenhar o PDF nem alterar texto institucional para resolver a refatoração.

## Definição de conclusão por formulário

Copiar esta lista para o registro da tarefa, mantendo o ID de P3, P4 ou P5 correspondente:

- [ ] Contrato campo a campo consultado e conferido com o código inicial.
- [ ] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [ ] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [ ] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [ ] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [ ] Tipos compartilhados com o PDF e ausência de novos `any` ou supressões de lint.
- [ ] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado nunca baixa PDF obsoleto.
- [ ] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [ ] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [ ] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [ ] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [ ] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

## Divisão do trabalho e passagem entre agentes

O plano pode ser executado sequencialmente. Quando houver trabalho paralelo autorizado, dividir por entregas e propriedade de arquivos:

| Responsabilidade         | Escopo                                                          | Dependências                                   |
| ------------------------ | --------------------------------------------------------------- | ---------------------------------------------- |
| Integração e fundamentos | P0, contratos, catálogo, tokens, componentes, dependências e CI | Início; coordena mudanças compartilhadas       |
| Pilotos                  | P3 e P4, com ajustes coordenados na base                        | P1 e P2                                        |
| Formulários A/B          | Lotes P5.A e P5.B                                               | Pilotos concluídos e contratos comuns estáveis |
| Formulários C/D          | Lotes P5.C e P5.D, subdivisíveis por página                     | Pilotos concluídos e contratos comuns estáveis |
| Verificação e liberação  | P6 e P7, evidências de acessibilidade/PDF/performance           | Baseline e entregas integráveis                |

- Designar um responsável por `package.json`, lockfile, catálogo, rotas, componentes compartilhados e configuração de testes. Outros agentes propõem mudanças nesses arquivos ao responsável em vez de alterá-los simultaneamente.
- Cada agente recebe IDs de tarefas, páginas/PDFs sob sua responsabilidade, contrato de campos, referência visual e evidências esperadas. Não distribuir apenas uma instrução vaga de “modernizar telas”.
- Usar entregas pequenas em branches com prefixo `codex/` quando houver criação de branches. Não reverter mudanças alheias nem excluir arquivos fora do escopo.
- Não alterar schema de uma funcionalidade para acomodar outra. Ajustes de API compartilhada exigem verificar seus consumidores.
- Registrar em `docs/modernizacao/progresso.md`: ID, estado (`pendente`, `em andamento`, `concluído` ou `bloqueado`), responsável, arquivos, comandos/resultados, evidências, decisão e próximo passo.
- Ao concluir um lote, comunicar o que mudou, quais invariantes foram conferidos e quais verificações ainda faltam. Uma tarefa bloqueada deve indicar a dependência concreta; as demais podem continuar.
- Marcar os checkboxes deste arquivo apenas com evidência. Manter as restrições do usuário no topo; não editá-las para justificar um desvio de implementação.

## Fontes oficiais de referência

Referências consultadas na preparação do plano. Conferir novamente detalhes sujeitos a mudança na data de implementação.

- [W3C — Validação de formulários](https://www.w3.org/WAI/tutorials/forms/validation/): formatos, obrigatoriedade e limites da validação no cliente.
- [W3C — Mensagens e erros em formulários](https://www.w3.org/WAI/tutorials/forms/notifications/): identificação e comunicação acessível de erros.
- [W3C — Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): adaptação a larguras reduzidas e zoom.
- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/): contraste, foco, operação por teclado e tamanho de alvos.
- [React — lazy](https://react.dev/reference/react/lazy): carregamento adiado de componentes.
- [React Hook Form — integração de schemas](https://github.com/react-hook-form/resolvers) e [Zod](https://zod.dev/): integração e contratos de validação.
- [Vite — CSS Modules](https://vite.dev/guide/features#css-modules): isolamento de estilos.
- [Vite — variáveis de ambiente](https://vite.dev/guide/env-and-mode): exposição das variáveis usadas no cliente.
- [OWASP — HTML5 Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html): armazenamento e segurança no navegador.
- [Vercel — cabeçalhos e CSP](https://vercel.com/docs/cdn-security/security-headers) e [vercel.json](https://vercel.com/docs/project-configuration/vercel-json): configuração e introdução gradual de políticas.
- [web.dev — Web Vitals](https://web.dev/articles/vitals): métricas e limites de boa experiência no percentil 75.
- [Receita Federal — CNPJ alfanumérico](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico): formato que deve ser considerado nas máscaras de CNPJ.
