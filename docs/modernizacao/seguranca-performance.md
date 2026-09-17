# Segurança e performance

Avaliação local de 02/09/2026, com dados sintéticos. Não representa teste de invasão nem garantia de ausência de vulnerabilidades.

## Dados e recursos

A busca no código cliente não encontrou chamadas de envio, HTML dinâmico, credenciais reconhecíveis ou variáveis `VITE_*`. O fluxo de férias com marcador sintético foi observado no navegador: apenas GETs de recursos locais, sem transmissão dos campos, analytics ou parâmetros de URL. LocalStorage, sessionStorage, IndexedDB e registros de service worker permaneceram vazios nos testes. Isso descreve os fluxos testados, não serviços externos à aplicação.

Estado fica em memória por funcionalidade. O aviso de perda ao sair/recarregar aparece antes dos campos. Cada geração usa `structuredClone`; alterações de dados invalidam o link anterior e a identificação da requisição impede publicação de resultados atrasados. A ação fica desabilitada durante geração. Recursos blob são revogados após substituição/desmontagem com atraso de 1,5 s para não interferir no clique de download. Não há geração a cada tecla.

Favicon e brasão web usam o PNG institucional local de 9.020 bytes, com dimensões declaradas. Os assets incorporados aos PDFs foram preservados. Os textos de usuário são filhos React, sem `dangerouslySetInnerHTML`.

## Dependências

As capturas de auditoria estão em `audit-before.json` e `audit-after.json`. A captura anterior ao saneamento contabilizou 38 avisos (inclui dependências transitivas e ferramentas); a captura final retornou zero alertas conhecidos. Contagem npm não equivale a número de falhas exploráveis da aplicação.

Atualizações dentro dos majors existentes: React Router 7.18.3, Vite 7.3.6, plugin React 5.2.0, ESLint 9.39.5 e TypeScript ESLint 8.69.0, além de transitivas corrigidas pelo npm. Removido `@types/react-router-dom` 5, incompatível com os tipos já distribuídos no Router atual. Renderer 4.3.1, layout 4.4.1 e textkit 6.0.0 mantidos; o lockfile é a fonte exata. As regressões visuais dos PDFs verificam o efeito das transitivas.

A análise distingue o servidor de desenvolvimento Vite do runtime distribuído. O advisory de redirecionamento do React Router consultado informa que o modo declarativo usado por `BrowserRouter` não está afetado por aquele vetor específico; a atualização foi realizada sem mudar o modo do roteador. Fontes: [advisory do React Router](https://github.com/remix-run/react-router/security/advisories/GHSA-2w69-qvjg-hvjx), [advisory do Vite](https://github.com/vitejs/vite/security/advisories/GHSA-v2wj-q39q-566r).

## Cabeçalhos e publicação

`vercel.json` propõe `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` e CSP **Report-Only**. A política permite scripts da própria origem, `wasm-unsafe-eval` para compilação do Yoga, conexões locais e `data:` para seu binário incorporado, estilos locais e inline atualmente utilizados, imagens locais/data e fontes locais. A primeira simulação detectou violações em `connect-src` e `script-src`; o trace identificou o binário WebAssembly incorporado do renderer. O ajuste foi testado sem liberar `unsafe-eval` JavaScript ou origens externas. Referência: [MDN — WebAssembly e CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src#unsafe_webassembly_execution). O link blob de download não exige liberação genérica de `blob:` em todas as diretivas. O bloqueio de incorporação não foi ativado: primeiro confirmar se há portais institucionais que incorporam a aplicação.

O teste de navegador injeta a política proposta na resposta HTML local e observa eventos de violação durante geração dos 17 formulários. Essa simulação não comprova cabeçalhos ativos na Vercel. Não existe endpoint de coleta de relatórios; a observação inicial é pelo console/eventos, sem introduzir backend. Referência: [Vercel — CSP](https://vercel.com/docs/cdn-security/security-headers).

Férias também revelou uma tentativa de avaliação dinâmica pelo otimizador do Zod. Configurado `jitless: true` antes da criação do schema, conforme a [documentação do Zod](https://zod.dev/compile#content-security-policy). A validação continua integralmente ativa pelo parser padrão; não foi liberado `unsafe-eval` nem removida regra de validação.

Pendentes de uma implantação autorizada: cabeçalhos efetivos, origens de incorporação, violações em navegação real, cache/CDN e transição entre HTML e chunks de duas versões. O teste de chunk indisponível verifica mensagem de recuperação, retorno ao catálogo e recarga explícita; não faz reload automático nem descarta dados de formulário silenciosamente.

## Medições

Produção local em Windows, preview 127.0.0.1:4173, sem rede móvel real. Bundle inicial original: 1.946,66 kB JS / 614,08 kB gzip. Após migração: aproximadamente 256 kB / 82 kB gzip. Redução de cerca de 87% no JavaScript inicial. A home carrega um script, CSS e brasão; nenhum documento nem renderer PDF. O renderer separado continua grande: 1.486,95 kB / 497,49 kB gzip, carregado quando solicitado. O aviso Vite de chunk >500 kB foi mantido, não ocultado por aumento do limite.

Diagnóstico Lighthouse 13.4.1: relatório em `evidencias/lighthouse-mobile.json`, configuração mobile simulada da ferramenta. A primeira execução no Edge gerou relatório, mas terminou com EPERM ao limpar o perfil temporário, saída 1; foi repetida com Chrome headless dedicado via porta 9224 e terminou com saída 0. Não há medição Lighthouse da versão original, portanto não cabe comparação de scores antes/depois.

Tempos de geração e digitação são registrados em `evidencias/medicao-local.json`: tempo do clique até link disponível, incluindo automação/imports/renderização, sem throttling; recadastramento completo, férias e relatório de viagem. O teste mede também digitação de 50 caracteres e adição de dez bens. Os manifestos PDF registram tempos Node separados, que não equivalem a responsividade no navegador. O caso de listas do recadastramento possui 15 páginas. Não foi introduzido worker sem medição em dispositivo lento que justifique sua complexidade e valide a compatibilidade visual.

Orçamento inicial para próximas alterações: home até 300 kB JS bruto e 100 kB gzip, renderer ausente da carga inicial. São limites técnicos de bundle derivados das medições desta migração, não bloqueios de dados administrativos. Não há orçamento universal de tempo de geração; comparar por documento, payload e ambiente com os manifestos.

Não existem dados de usuários no percentil 75. LCP ≤2,5 s, INP ≤200 ms e CLS ≤0,1 em celular/desktop continuam metas de campo, não foram declaradas atingidas com Lighthouse. Fonte: [Web Vitals](https://web.dev/articles/vitals).

## Acessibilidade e limites

Testes em 320, 375, 390, 768, 1024 e 1440 CSS px, orientação retrato/paisagem e área de reflow equivalente à redução por zoom. A equivalência de 1280 px a 400% para 320 CSS px é descrita pelo [W3C](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html); a emulação não substitui todas as interações com zoom nativo.

axe verifica cinco telas representativas. Testes de teclado exercitam busca, geração e download; o teste móvel emula toque com Pixel 7. Nenhum celular físico, Safari/iOS ou leitor de tela foi conectado/disponibilizado nesta execução. Não se afirma conformidade WCAG integral. Validar esses ambientes e tecnologias assistivas antes de encerrar os itens correspondentes do roadmap.
