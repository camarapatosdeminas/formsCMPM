import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePages";
import FormularioFerias from "./pages/FormularioFerias/FormularioFerias";
import OcorrenciaPonto from "./pages/OcorrenciaPonto/OcorrenciaPonto";
import SolicitacaoEstagiario from "./pages/SolicitacaoEstagiario/SolicitacaoEstagiario";
import SolicitacaoCursos from "./pages/SolicitacaoCursos/SolicitacaoCursos";
import SolicitacaoViagem from "./pages/SolicitacaoViagem/SolicitacaoViagem";
import Adiantamento13 from "./pages/Adiantamento13/Adiantamento13";
import RelatorioViagem from "./pages/RelatorioViagem/RelatorioViagem";
import SolicitacaoDocumentos from "./pages/SolicitacaoDocumentos/SolicitacaoDocumentos";
import DeclaracaoDependentes from "./pages/DeclaracaoDependentes/DeclaracaoDependentes";
import DeclaracaoNaoOcupacao from "./pages/DeclaracaoNaoOcupacao/DeclaracaoNaoOcupacao";
import DeclaracaoNepotismo from "./pages/DeclaracaoNepotismo/DeclaracaoNepotismo";
import DeclaracaoFichaLimpa from "./pages/DeclaracaoFichaLimpa/DeclaracaoFichaLimpa";
import SolicitacaoDiaria from "./pages/SolicitacaoDiaria/SolicitacaoDiaria";
import RelatorioInspecaoMedica from "./pages/GESAT-RelatorioInspecaoMedica/RelatorioInspecaoMedica";
import RequisicaoManualAlmoxarifado from "./pages/RequisicaoManualAlmoxarifado/RequisicaoManualAlmoxarifado";
import FormularioCartaoPonto from "./pages/CartaoPonto/FormularioCartaoPonto";
import Recadastramento from "./pages/Recadastramento/Recadastramento";
import SiteHeader from "./components/SiteHeader";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <SiteHeader />
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adiantamento-13" element={<Adiantamento13 />} />
          <Route
            path="/declaracao-dependentes"
            element={<DeclaracaoDependentes />}
          />
          <Route
            path="/declaracao-ficha-limpa"
            element={<DeclaracaoFichaLimpa />}
          />
          <Route
            path="/declaracao-nepotismo"
            element={<DeclaracaoNepotismo />}
          />
          <Route
            path="/declaracao-nao-ocupacao"
            element={<DeclaracaoNaoOcupacao />}
          />
          <Route path="/ocorrencia-ponto" element={<OcorrenciaPonto />} />
          <Route path="/relatorio-viagem" element={<RelatorioViagem />} />
          <Route path="/formulario-ferias" element={<FormularioFerias />} />
          <Route path="/solicitacao-cursos" element={<SolicitacaoCursos />} />
          <Route path="/SolicitacaoDiaria" element={<SolicitacaoDiaria />} />
          <Route path="/solicitacao-viagem" element={<SolicitacaoViagem />} />
          <Route
            path="/requisicao-manual-almoxarifado"
            element={<RequisicaoManualAlmoxarifado />}
          />
          <Route
            path="/solicitacao-documentos"
            element={<SolicitacaoDocumentos />}
          />
          <Route
            path="/solicitacao-estagiario"
            element={<SolicitacaoEstagiario />}
          />
          <Route
            path="/inspecao-medica"
            element={<RelatorioInspecaoMedica />}
          />
          <Route path="/cartao-ponto" element={<FormularioCartaoPonto />} />
          <Route path="/recadastramento" element={<Recadastramento />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
