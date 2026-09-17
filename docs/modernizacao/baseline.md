# Referência P0

HEAD: a4d17a3. Alteração local inicial: AGENTS.md, preservada. Node 24.13.0, npm 11.6.2, Windows, America/Sao_Paulo.

Build original: saída 0 fora do sandbox; tsc -b incluído. Sandbox: erro de leitura de diretório pai no esbuild, saída 1. Lint inicial: 213 erros.

Bundle original: JS 1.946,66 kB (gzip 614,08 kB), CSS 16,78 kB (gzip 4,21 kB). Preview http://127.0.0.1:4173/ sessão 28112. Home e férias observadas no navegador integrado; home original tem 16 cards, textos transbordando e grid fixo de 5 colunas. Capturas registradas na conversa. Lighthouse e percentis reais não medidos.

PDFs: 75 documentos, 144 páginas, Poppler 96 dpi, pypdf para texto. Relógio 2026-09-02T15:00:00.000Z, fuso America/Sao_Paulo, renderer 4.3.1. Fontes internas Helvetica/Times; sem fontes remotas. Manifesto guarda geometria, SHA-256 de texto e PNGs por página e tempos de geração em Node (não equivalem ao navegador).

Fixtures em tests/fixtures/pdf-cases.json; código anterior integral em legacy-source.json. Não sobrescrever referências. Regressões: npm run test:pdf (após configuração dos scripts). Casos mínimos de cartão e recadastramento incluem somente os requisitos existentes. Outros casos cobrem texto extenso, listas, condições e anexos.

Defeitos anteriores: férias mínimo já ocupa 2 páginas; almoxarifado emite aviso de espaços fora de Text; alguns documentos possuem quebras extensas. Preservar estilo, registrar correções técnicas e comparar.
