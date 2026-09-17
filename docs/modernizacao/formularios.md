# Registro por formulário

Responsável: Codex. 02/09/2026. Evidências comuns: [navegador](evidencias/playwright.json), [PDFs](evidencias/pdf-comparison.json), [comandos](evidencias/validacao-final.json). Cada rota tem teste de mínimo, geração/download por Enter, seis larguras, rótulos e IDs, screenshot e edição que invalida download. Máscara/cursor e falha/nova tentativa são verificações do componente compartilhado, exercitado nos pilotos; não significam repetição de todas as combinações em cada página. Testes de PDFs cobrem os casos sintéticos enumerados, não todas as combinações possíveis de valores. Leitor de tela, móvel físico, zoom nativo e hospedagem permanecem pendentes no progresso e não são aprovados por esta lista.

## P5.A1 — /adiantamento-13

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/adiantamento13/ e src/pdf/Adiantamento13Pdf.tsx. Contrato: 5 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (adiantamento-13-minimo, adiantamento-13-completo, adiantamento-13-longo, adiantamento-13-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.B1 — /declaracao-dependentes

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/declaracaoDependentes/ e src/pdf/DeclaracaoDependentesPdf.tsx. Contrato: 7 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 5 casos (declaracao-dependentes-minimo, declaracao-dependentes-completo, declaracao-dependentes-longo, declaracao-dependentes-variante, declaracao-dependentes-lista-dependentes), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.A2 — /declaracao-ficha-limpa

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/declaracaoFichaLimpa/ e src/pdf/DeclaracaoFichaLimpaPdf.tsx. Contrato: 2 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (declaracao-ficha-limpa-minimo, declaracao-ficha-limpa-completo, declaracao-ficha-limpa-longo, declaracao-ficha-limpa-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.A3 — /declaracao-nepotismo

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/declaracaoNepotismo/ e src/pdf/DeclaracaoNepotismoPdf.tsx. Contrato: 2 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (declaracao-nepotismo-minimo, declaracao-nepotismo-completo, declaracao-nepotismo-longo, declaracao-nepotismo-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.A4 — /declaracao-nao-ocupacao

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/declaracaoNaoOcupacao/ e src/pdf/DeclaracaoNaoOcupacaoPdf.tsx. Contrato: 5 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (declaracao-nao-ocupacao-minimo, declaracao-nao-ocupacao-completo, declaracao-nao-ocupacao-longo, declaracao-nao-ocupacao-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.B2 — /ocorrencia-ponto

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/ocorrenciaPonto/ e src/pdf/OcorrenciaPontoPdf.tsx. Contrato: 10 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 5 casos (ocorrencia-ponto-minimo, ocorrencia-ponto-completo, ocorrencia-ponto-longo, ocorrencia-ponto-variante, ocorrencia-ponto-lista-ocorrencias), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.C3 — /relatorio-viagem

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/relatorioViagem/ e src/pdf/RelatorioViagemPdf.tsx. Contrato: 15 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (relatorio-viagem-minimo, relatorio-viagem-completo, relatorio-viagem-longo, relatorio-viagem-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P3 — /formulario-ferias

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/ferias/ e src/pdf/FeriasPdfDocument.tsx. Contrato: 10 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (formulario-ferias-minimo, formulario-ferias-completo, formulario-ferias-longo, formulario-ferias-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.C4 — /solicitacao-cursos

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/solicitacaoCursos/ e src/pdf/SolicitacaoCursosPdf.tsx. Contrato: 34 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (solicitacao-cursos-minimo, solicitacao-cursos-completo, solicitacao-cursos-longo, solicitacao-cursos-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.C2 — /SolicitacaoDiaria

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/solicitacaoDiaria/ e src/pdf/SolicitacaoDiariaPdf.tsx. Contrato: 24 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (solicitacaodiaria-minimo, solicitacaodiaria-completo, solicitacaodiaria-longo, solicitacaodiaria-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.C1 — /solicitacao-viagem

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/solicitacaoViagem/ e src/pdf/SolicitacaoViagemPdf.tsx. Contrato: 17 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 5 casos (solicitacao-viagem-minimo, solicitacao-viagem-completo, solicitacao-viagem-longo, solicitacao-viagem-variante, solicitacao-viagem-lista-participantes), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.B3 — /requisicao-manual-almoxarifado

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/almoxarifado/ e src/pdf/RequisicaoAlmoxarifadoPdf.tsx. Contrato: 8 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 5 casos (requisicao-manual-almoxarifado-minimo, requisicao-manual-almoxarifado-completo, requisicao-manual-almoxarifado-longo, requisicao-manual-almoxarifado-variante, requisicao-manual-almoxarifado-lista-itens), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.A5 — /solicitacao-documentos

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/solicitacaoDocumentos/ e src/pdf/SolicitacaoDocumentosPdf.tsx. Contrato: 7 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (solicitacao-documentos-minimo, solicitacao-documentos-completo, solicitacao-documentos-longo, solicitacao-documentos-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.D1 — /solicitacao-estagiario

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/solicitacaoEstagiario/ e src/pdf/SolicitacaoEstagiarioPdf.tsx. Contrato: 16 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (solicitacao-estagiario-minimo, solicitacao-estagiario-completo, solicitacao-estagiario-longo, solicitacao-estagiario-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.D2 — /inspecao-medica

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/inspecaoMedica/ e src/pdf/RelatorioInspecaoMedicaPdf.tsx. Contrato: 65 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (inspecao-medica-minimo, inspecao-medica-completo, inspecao-medica-longo, inspecao-medica-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P5.D3 — /cartao-ponto

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/cartaoPonto/ e src/pdf/CartaoPontoPdfDocument.tsx. Contrato: 10 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 4 casos (cartao-ponto-minimo, cartao-ponto-completo, cartao-ponto-longo, cartao-ponto-variante), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.

## P4 — /recadastramento

Estado: migração concluída, validações externas com limites descritos acima. Arquivos: src/features/recadastramento/ e src/pdf/RecadastramentoPdf.tsx. Contrato: 74 controles inventariados em contrato-campos.md, com handlers anteriores. PDF: 7 casos (recadastramento-minimo, recadastramento-completo, recadastramento-longo, recadastramento-variante, recadastramento-listas, recadastramento-simplificado-servidor, recadastramento-simplificado-vereador), sem diferenças.

- [x] Contrato campo a campo consultado e conferido com o código inicial.
- [x] Campos opcionais/obrigatórios e condições preservados, com caso de teste do preenchimento mínimo permitido.
- [x] Máscaras verificadas para colagem, cursor, limpeza e valores parciais; opcional vazio aceito.
- [x] Defaults, opções, listas, operações de adicionar/remover e ramos condicionais preservados.
- [x] Página usa componentes e estilos isolados; sem dependência de CSS de outra funcionalidade.
- [x] Tipos compartilhados com o PDF e ausência de novos any ou supressões de lint.
- [x] Estados de erro, carregamento, sucesso e nova tentativa funcionam; dado alterado invalida o PDF anterior.
- [x] Responsividade e navegação por teclado verificadas, inclusive labels, foco e erros.
- [x] PDF comparado visualmente e em conteúdo, com evidências e sem mudança de estilo.
- [x] Testes relevantes, TypeScript, lint e build passam para a entrega integrada; bloqueios externos documentados não contam como aprovação.
- [x] Rota antiga, acesso direto e integração com o catálogo funcionam.
- [x] Documentação de progresso atualizada com arquivos, evidências e próximos passos.

Próximo passo: verificação com tecnologias assistivas/dispositivo físico e implantação autorizada, sem modificar a obrigatoriedade nem as referências.
