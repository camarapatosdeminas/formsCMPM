# Progresso da modernização

Responsável: Codex. Início e execução: 02/09/2026. Alteração anterior do usuário em AGENTS.md preservada; HEAD inicial `a4d17a3f6b6cde5d410cdaac643d44865234b2b6`. Nenhuma migração anterior foi encontrada; havia formatação prévia e o plano. Mudanças desta execução permanecem sem commit.

## Estado dos blocos

| Bloco | Estado                                         | Evidência e limite                                                                                                                                                                                                             |
| ----- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P0    | concluído, exceto P0.7/P0.8 parciais           | 17 formulários, 311 controles, defaults e operações em contrato-campos.md; 75 PDFs/144 páginas anteriores à migração. Capturas originais na conversa; bundle original medido, sem Lighthouse ou tempos originais de navegador. |
| P1/P2 | implementado e validado localmente             | Tokens, CSS Modules, componentes, catálogo, rotas adiadas, máscaras e geração comum; ui-ux.md. Proposta e estados refinados diretamente nos pilotos.                                                                           |
| P3/P4 | implementado; leitor de tela pendente          | Home e férias novos; RHF/Zod no piloto; recadastramento com hook, validação e oito seções. Regras alternativas e condicionais preservadas.                                                                                     |
| P5    | 15 páginas migradas; gate local aprovado       | Funcionalidades em src/features; tipos e defaults próprios, componentes compartilhados, PDFs sob demanda. Rota antiga e mínimo de cada formulário exercitados no navegador.                                                    |
| P6    | implementado localmente; hospedagem pendente   | Auditoria npm sem alertas conhecidos; medições e limites em seguranca-performance.md; cabeçalhos Report-Only propostos.                                                                                                        |
| P7    | validação local concluída; pendências externas | Formato, lint, seis testes de regras, TypeScript/build, 29 testes de navegador e 75 PDFs aprovados. Preview e home mantidos abertos.                                                                                           |

## Evidências e decisões por bloco

P0.1–P0.6/P0.9: snapshot anterior `tests/fixtures/legacy-source.json`, inventário `inventory.json`, casos `pdf-cases.json`, manifesto `tests/pdf-baseline/manifest.json`. Relógio 2026-09-02T15:00Z, America/Sao_Paulo, Poppler 26.05.0/96 dpi, renderer 4.3.1 e pypdf 6.10.0. Referências não foram regeneradas durante a migração. O inventário guarda handlers originais completos para desambiguação de campos dinâmicos, além da correspondência ao PDF. Condições não equivalem a novos requisitos.

P1/P2: navegação institucional, busca sem distinção de acento, categorias e inclusão de viagem no catálogo. Formulários extensos organizados em seções, sem etapas ou persistência. Controles têm rótulo visível, foco, ajuda/erro associado; grupos usam fieldset/legend. Máscaras permitem colagem, edição parcial, substituição, cursor e limpeza. Valores monetários recebem prévia formatada em texto de ajuda sem converter o payload: vazio, zero, sinais e precisão anteriores permanecem aceitos. Não houve padrão inventado para RG, matrícula, Pix, banco, ramal ou período livre.

P2.8–P2.10: `usePdf` recebe dados tipados, clona na geração, impede duplicação e invalida links/resultados por versão dos dados. URLs são liberadas após substituição/desmontagem. Falha de recurso do navegador é simulada para testar nova tentativa sem perda. Falha de chunk de rota permite retorno ao catálogo e recarga explícita. A regra global de hifenização anterior é inicializada sem importar recadastramento na home; a regressão compara carregamento adiado e férias antes/depois de recadastramento.

P3: férias mantém vazio permitido, justificativa somente para período diferente de 30 dias e limpeza/desabilitação ao voltar a 30. CPF não recebeu validação de dígitos verificadores. Legal completo permanece acessível em details. Erros de máscara só surgem ao sair/tentar gerar, sem bloquear edição parcial.

P4: `useRecadastramento.tsx`, `recadastramento.validation.ts` e oito componentes em `sections/`. Defaults/tipos já compartilhados continuam em `src/types/recadastramento.ts`. Validação simplificada retorna antes das regras do completo. Testes exercitam telefone ou celular, deficiência, outra atividade, bens e dependentes opcionais/condicionais. IDs das listas são estáveis e foco é reposicionado ao adicionar/remover. Não se acrescentou comprimento mínimo ao telefone nesse formulário: o comportamento anterior aceita qualquer sequência não vazia de dígitos.

P5: os lotes A/B/C/D reutilizam controles/geração, sem compartilhar obrigatoriedade administrativa. Operações de participantes, itens e despesas passaram a atualizar estado imutavelmente. CSS e páginas antigas foram removidos após não terem consumidores; código inicial continua recuperável no Git e snapshot. PDFs mantêm suas fontes, tabelas, margens, títulos, textos e nomes de download; somente contratos/tipos e correções técnicas sem diferença visual foram aplicados.

P6: [segurança e performance](seguranca-performance.md), auditorias antes/depois, rede e armazenamento observados com dados sintéticos. Não houve envio de dados para serviços externos. Nenhuma publicação foi realizada. CSP local simulada não equivale a cabeçalhos efetivamente implantados.

## Correções técnicas e divergências registradas

- Home inicial tinha 16 cards; solicitação de viagem já existia no cabeçalho/rota. Catálogo novo contém os 17.
- Recadastramento marcava somente celular com asterisco, embora o handler aceite telefone **ou** celular. A interface agora explica a alternativa; a regra continua idêntica.
- Cartão de ponto exige somente nome, matrícula e mês. Data fora do mês, fim de semana facultativo, exclusividade entre tipos e filtro ao mudar mês foram testados; início/fim de férias permanecem opcionais.
- A inspeção médica possui blocos destinados ao preenchimento posterior, com controles vazios/fixos/desabilitados no código inicial. Esses comportamentos foram preservados; não se habilitou edição nem se criou bloqueio administrativo. Identificadores duplicados de CID/observações e cargo/função em recadastramento foram corrigidos sem alterar os dados.
- A primeira checagem integrada encontrou foco saltando durante edição de máscara: o resumo de erros passou a receber foco somente após tentativa inválida. Os três testes inicialmente falhos passaram após correção.
- PDF de férias mínimo já ocupava duas páginas. A referência mantém essa paginação. O PDF de almoxarifado tinha espaços fora de Text que geravam avisos; removidos somente esses nós ignorados, sob comparação exata. Nenhum texto institucional foi revisado.
- Não ocupação calculava data ao importar o módulo na abertura da aplicação. Um pequeno módulo compartilhado mantém essa data inicial apesar do novo import adiado; teste atravessa meia-noite. Conversões civis legadas dos demais documentos foram preservadas, incluindo compensações existentes; não foram substituídas por conversões de fuso novas.
- Avisos Rollup em comentários de pureza do Zod e tamanho do chunk do renderer permanecem visíveis; não se desabilitou regra nem se elevou limite para esconder avisos.

## Protocolo final

Resultado consolidado registrado em `evidencias/validacao-final.json` e na tabela abaixo. Cada processo tem seu código de saída conferido.

| Comando                       | Resultado final |
| ----------------------------- | --------------- |
| npm run format                | saída 0         |
| npm run format:check          | saída 0         |
| npm run lint                  | saída 0         |
| npm test                      | saída 0         |
| npm run build (tsc -b + Vite) | saída 0         |
| npm run test:e2e              | saída 0         |
| npm run test:pdf              | saída 0         |

Restrições ambientais já contornadas: esbuild não acessava diretórios pais no sandbox; build repetido fora dele passou. Node/tsx e navegadores exigiram execução fora do sandbox. Lighthouse/Edge produziu relatório, mas falhou na limpeza temporária (EPERM, saída 1); repetição usando Chrome dedicado terminou com saída 0. Esses resultados iniciais não foram omitidos nem tratados como falhas de aplicação.

## Pendências reais e continuação

- P0.7/P0.8: não existe Lighthouse/tempo de geração de navegador da versão antiga. Há bundle e referências PDF, mas não inventar comparação histórica de métricas não coletadas.
- P1.2: estados foram implementados e testados; não foi produzido um conjunto separado de mockups/capturas de todos os estados em todos os tamanhos.
- P3.6/P7.5: leitor de tela e dispositivo móvel físico indisponíveis. Axe/DOM, teclado e toque emulado não bastam para declarar conformidade WCAG integral. Safari/iOS não foi exercitado.
- P7.4: reflow, retrato/paisagem e larguras exigidas automatizados; zoom testado por área CSS equivalente, sem inspeção de todos os controles sob zoom nativo do sistema.
- P6.7/P6.8/P6.11/P7.8: verificar cabeçalhos efetivos, CSP, incorporação, cache/CDN, transição de chunks e PDFs em implantação Vercel autorizada. Não havia implantação de prévia autorizada/configurada nesta execução. A configuração local não encerra esses itens.
- Metas de Web Vitals no percentil 75 continuam sem dados reais. Lighthouse é diagnóstico local; medições de geração não são benchmarks universais.
- CI foi configurado, mas sua execução no serviço remoto não foi observada. Comparação PDF permanece gate local com versões de rasterização fixadas.

Rollback e setup estão no README. Ao publicar futuramente, registrar o identificador da implantação anterior e o commit de liberação. Não há commit/deploy automático nesta entrega.

## Encerramento local

Todos os comandos finais terminaram com saída 0: formato, checagem de formato, lint, seis testes de regras, build com TypeScript, 29 testes de navegador e comparação de 75 PDFs/144 páginas. Nenhuma diferença de texto, geometria ou imagem; ordem férias–recadastramento–férias verificada. A política CSP proposta foi simulada nos 17 fluxos sem violações após o ajuste de WebAssembly/data. O registro detalhado por formulário está em [formularios.md](formularios.md).

Evidências finais em [evidencias/validacao-final.json](evidencias/validacao-final.json), capturas desktop/celular, resultados Playwright, Lighthouse e manifestos. Home aberta no navegador integrado e preview ativo em http://127.0.0.1:4173/, sessão 28112. Confirmação visual em evidencias/home-verificacao.json: busca, navegação, 17 cards, imagens carregadas e console sem registros. Captura do navegador visível registrada na conversa. Os itens externos acima continuam pendentes.
