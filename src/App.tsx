import { lazy, Suspense } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { formCatalog } from "./app/formCatalog";
import { RouteBoundary } from "./app/RouteBoundary";
import { SiteLayout, FormPage } from "./components/layout/SiteLayout";
import HomePage from "./features/home/HomePage";
const adiantamento13 = lazy(
  () => import("./features/adiantamento13/Adiantamento13Page"),
);
const declaracaoDependentes = lazy(
  () => import("./features/declaracaoDependentes/DeclaracaoDependentesPage"),
);
const declaracaoFichaLimpa = lazy(
  () => import("./features/declaracaoFichaLimpa/DeclaracaoFichaLimpaPage"),
);
const declaracaoNepotismo = lazy(
  () => import("./features/declaracaoNepotismo/DeclaracaoNepotismoPage"),
);
const declaracaoNaoOcupacao = lazy(
  () => import("./features/declaracaoNaoOcupacao/DeclaracaoNaoOcupacaoPage"),
);
const ocorrenciaPonto = lazy(
  () => import("./features/ocorrenciaPonto/OcorrenciaPontoPage"),
);
const relatorioViagem = lazy(
  () => import("./features/relatorioViagem/RelatorioViagemPage"),
);
const ferias = lazy(() => import("./features/ferias/FeriasPage"));
const solicitacaoCursos = lazy(
  () => import("./features/solicitacaoCursos/SolicitacaoCursosPage"),
);
const solicitacaoDiaria = lazy(
  () => import("./features/solicitacaoDiaria/SolicitacaoDiariaPage"),
);
const solicitacaoViagem = lazy(
  () => import("./features/solicitacaoViagem/SolicitacaoViagemPage"),
);
const almoxarifado = lazy(
  () => import("./features/almoxarifado/AlmoxarifadoPage"),
);
const solicitacaoDocumentos = lazy(
  () => import("./features/solicitacaoDocumentos/SolicitacaoDocumentosPage"),
);
const solicitacaoEstagiario = lazy(
  () => import("./features/solicitacaoEstagiario/SolicitacaoEstagiarioPage"),
);
const inspecaoMedica = lazy(
  () => import("./features/inspecaoMedica/InspecaoMedicaPage"),
);
const cartaoPonto = lazy(
  () => import("./features/cartaoPonto/CartaoPontoPage"),
);
const recadastramento = lazy(
  () => import("./features/recadastramento/RecadastramentoPage"),
);
const dfd = lazy(() => import("./features/dfd/DfdPage"));
const routes = [
  { id: "dfd", Page: dfd },
  { id: "adiantamento13", Page: adiantamento13 },
  { id: "declaracaoDependentes", Page: declaracaoDependentes },
  { id: "declaracaoFichaLimpa", Page: declaracaoFichaLimpa },
  { id: "declaracaoNepotismo", Page: declaracaoNepotismo },
  { id: "declaracaoNaoOcupacao", Page: declaracaoNaoOcupacao },
  { id: "ocorrenciaPonto", Page: ocorrenciaPonto },
  { id: "relatorioViagem", Page: relatorioViagem },
  { id: "ferias", Page: ferias },
  { id: "solicitacaoCursos", Page: solicitacaoCursos },
  { id: "solicitacaoDiaria", Page: solicitacaoDiaria },
  { id: "solicitacaoViagem", Page: solicitacaoViagem },
  { id: "almoxarifado", Page: almoxarifado },
  { id: "solicitacaoDocumentos", Page: solicitacaoDocumentos },
  { id: "solicitacaoEstagiario", Page: solicitacaoEstagiario },
  { id: "inspecaoMedica", Page: inspecaoMedica },
  { id: "cartaoPonto", Page: cartaoPonto },
  { id: "recadastramento", Page: recadastramento },
];
export default function App() {
  const location = useLocation();
  return (
    <SiteLayout>
      <RouteBoundary key={location.pathname}>
        <Suspense
          fallback={
            <p role="status" style={{ padding: 32, textAlign: "center" }}>
              Carregando formulário…
            </p>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            {routes.map(({ id, Page }) => {
              const form = formCatalog.find((f) => f.id === id)!;
              return (
                <Route
                  key={id}
                  path={form.path}
                  element={
                    <FormPage form={form}>
                      <Page />
                    </FormPage>
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <div style={{ padding: 48, textAlign: "center" }}>
                  <h1>Formulário não encontrado</h1>
                  <p>Confira o endereço ou encontre o documento no catálogo.</p>
                  <Link to="/">Voltar aos formulários</Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </RouteBoundary>
    </SiteLayout>
  );
}
