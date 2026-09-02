import { FaHome, FaListUl } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SiteHeader.css";

const formularios = [
  ["/recadastramento", "Recadastramento"],
  ["/adiantamento-13", "Antecipação do 13º salário"],
  ["/cartao-ponto", "Cartão de ponto"],
  ["/declaracao-dependentes", "Declaração de dependentes"],
  ["/declaracao-ficha-limpa", "Declaração de ficha limpa"],
  ["/declaracao-nao-ocupacao", "Declaração de não ocupação de cargos"],
  ["/declaracao-nepotismo", "Declaração de nepotismo"],
  ["/formulario-ferias", "Requerimento de férias"],
  ["/ocorrencia-ponto", "Ocorrência de ponto"],
  ["/relatorio-viagem", "Relatório de viagem"],
  ["/requisicao-manual-almoxarifado", "Requisição manual de almoxarifado"],
  ["/solicitacao-cursos", "Solicitação de cursos"],
  ["/SolicitacaoDiaria", "Solicitação de diária e passagem"],
  ["/solicitacao-documentos", "Solicitação de documentos"],
  ["/solicitacao-estagiario", "Solicitação de estagiário"],
  ["/inspecao-medica", "Solicitação de inspeção médica"],
  ["/solicitacao-viagem", "Solicitação de viagem"],
] as const;

const SiteHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formularioAtual = formularios.some(([path]) => path === location.pathname)
    ? location.pathname
    : "";

  return (
    <header className="site-header">
      <div className="site-header__shell">
        <Link className="site-header__brand" to="/" aria-label="Ir para a página inicial">
          <picture>
            <source media="(max-width: 440px)" srcSet="/images/brasao.png" />
            <img
              className="site-header__logo"
              src="/images/brasaosuperior.png"
              alt="Câmara Municipal de Patos de Minas"
            />
          </picture>
        </Link>

        <nav className="site-header__navigation" aria-label="Navegação principal">
          <Link
            className={`site-header__home${location.pathname === "/" ? " site-header__home--active" : ""}`}
            to="/"
          >
            <FaHome aria-hidden="true" />
            <span>Início</span>
          </Link>

          <label className="site-header__picker">
            <span className="site-header__picker-label">
              <FaListUl aria-hidden="true" />
              Formulários
            </span>
            <select
              value={formularioAtual}
              onChange={(event) => {
                if (event.target.value) navigate(event.target.value);
              }}
              aria-label="Abrir outro formulário"
            >
              <option value="">Selecione um formulário</option>
              {formularios.map(([path, label]) => (
                <option key={path} value={path}>{label}</option>
              ))}
            </select>
          </label>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
