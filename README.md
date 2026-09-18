# FormsCMPM

Portal de 18 formulários administrativos da Câmara Municipal de Patos de Minas. Aplicação React + TypeScript + Vite, com geração local de PDF por `@react-pdf/renderer`.

## Executar

Ambiente validado: Node 24.13.0 e npm 11.6.2. Use o lockfile versionado.

```bash
npm ci
npm run dev
```

Prévia da versão de produção:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Abra a URL informada pelo Vite. A prévia local desta entrega está em [127.0.0.1:4173](http://127.0.0.1:4173/). O build executa `tsc -b` antes do Vite. Não são necessárias variáveis de ambiente, backend, banco ou login. Os campos permanecem em memória; sair da página ou recarregar descarta o preenchimento.

## Verificar

```bash
npm run format
npm run format:check
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run test:pdf
```

No Windows com Edge instalado, use `$env:PLAYWRIGHT_CHANNEL='msedge'` antes de `npm run test:e2e`. Os testes usam dados sintéticos, a prévia em 4173 e salvam resultados em `test-results/`. `npm run check` reúne formato, lint, regras e build; não substitui os testes de navegador e PDF.

A comparação de PDFs requer Poppler (`pdftoppm`, `pdfinfo`) no PATH e Python com `pypdf`. Defina `PYTHON` para o executável apropriado; no ambiente Codex existe um fallback para o Python empacotado. Referência: Windows, Poppler 26.05.0, pypdf 6.10.0, 96 dpi, renderer 4.3.1, relógio e fuso em `tests/fixtures/pdf-cases.json`. Execute com as mesmas versões para comparação exata de pixels. O teste verifica 75 documentos/144 páginas, texto, dimensões e imagens. Não substitua `tests/pdf-baseline/` para fazer uma regressão passar. Os scripts de inventário/fixtures são registros da preparação original e recusam sobrescrever referências existentes.

A configuração em `.github/workflows/verify.yml` executa formato, lint, regras, build e navegador em pushes/PRs quando o repositório estiver no GitHub com Actions habilitado. A execução remota ainda não foi observada. O gate visual de PDF permanece local no ambiente de referência; não se presume igualdade de rasterização entre sistemas operacionais diferentes.

## Organização

- `src/app`: catálogo dos 18 formulários e recuperação de falha de rota. `src/App.tsx` compõe rotas com imports adiados, mantendo todos os caminhos anteriores, inclusive `/SolicitacaoDiaria`.
- `src/features`: páginas, tipos, defaults e regras por funcionalidade. Férias usa React Hook Form/Zod. Recadastramento separa estado/validação e oito seções; seu contrato de dados já compartilhado continua em `src/types/recadastramento.ts`.
- `src/components/ui`, `forms`, `layout`: controles nativos, rótulos, grupos, erros, seções, navegação e ações, com CSS Modules.
- `src/lib/formatters`: máscaras e apresentação monetária sem coerção; `src/lib/pdf`: geração a partir de cópia estável, descarte de resultados obsoletos e liberação de URLs.
- `src/pdf`: documentos com apresentação independente dos estilos web. Renderer e documento são carregados ao gerar; não fazem parte da carga inicial da home.
- `tests/fixtures`, `tests/pdf-baseline`: dados exclusivamente sintéticos e referência imutável anterior à migração.
- `docs/modernizacao`: contrato de campos, direção visual, medições e [progresso](docs/modernizacao/progresso.md).

## Adicionar ou alterar formulário

1. Consulte o [AGENTS.md](AGENTS.md) e o [contrato de campos](docs/modernizacao/contrato-campos.md). Registre defaults, obrigatoriedade, condições, limites, listas, nomes de download e comportamento de campos ocultos.
2. Crie o tipo e os defaults na funcionalidade. Reutilize controles, `FormSurface`/`FormSection` e `PdfActions`; a obrigatoriedade pertence à regra daquele formulário. CPF opcional não se torna obrigatório pelo uso de máscara.
3. Adicione o registro em `formCatalog.ts` e o import adiado em `App.tsx`. Preserve aliases de caminhos existentes.
4. Use `usePdf(dados)` e seu `generate(snapshot => ...)` com import dinâmico do documento. Passe props tipadas; não leia dados do DOM e não aplique tokens web ao PDF. Alterações em listas também precisam produzir estado novo.
5. Acrescente casos mínimos/condicionais e teste colagem, limpeza, cursor, falha, edição durante geração e download. Mudanças em documentos existentes exigem comparação com a referência anterior; não reescreva textos institucionais como parte de refatorações.

## Hospedagem e recuperação

Na Vercel, configure instalação `npm ci`, build `npm run build` e saída `dist`. `vercel.json` preserva o rewrite de SPA e propõe `nosniff`, política de referência e CSP inicialmente em **Report-Only**. O Vite preview não aplica os cabeçalhos da Vercel. Antes de publicar, verificar respostas HTTP efetivas, violações, incorporação institucional, cache de HTML/chunks, URLs diretas e downloads; só promover CSP para bloqueio após essa observação.

Não houve deploy nesta tarefa. Fonte anterior recuperável: commit `a4d17a3f6b6cde5d410cdaac643d44865234b2b6`. Preserve o identificador da implantação anterior antes de uma publicação futura. Para rollback publicado, promova essa implantação anterior na Vercel; no código, reverta o commit de liberação com `git revert <commit-da-liberacao>` após revisar alterações posteriores. Não use reset destrutivo sobre trabalho local. As mudanças desta entrega permanecem no diretório de trabalho para revisão, sem commit automático.

Limitações de validação e instruções de continuidade estão no [relatório de progresso](docs/modernizacao/progresso.md) e na [análise de segurança e performance](docs/modernizacao/seguranca-performance.md).
