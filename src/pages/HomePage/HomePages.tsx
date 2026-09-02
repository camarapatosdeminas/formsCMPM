// src/pages/HomePage/HomePage.tsx
import FormCard from "../../components/FormCard";
import "./HomePage.css";
import {
  FaPlaneDeparture,
  FaClock,
  FaUserGraduate,
  FaBook,
  FaSuitcaseRolling,
  FaFileAlt,
  FaMoneyBillWave,
  FaReceipt,
  FaUserShield,
  FaUsers,
  FaBuilding,
  FaUserSlash,
  FaBriefcaseMedical,
  FaWarehouse,
  FaCalendarCheck,
  FaIdCard,
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="homepage-container">
      {" "}
      <div className="card-container">
        {" "}
        <FormCard
          title="Recadastramento"
          description="Preencha os anexos da Portaria nº 1.798/2023 e gere um único PDF."
          linkTo="/recadastramento"
          icon={<FaIdCard />}
        />{" "}
        <FormCard
          title="Antecipação 13º Salário"
          description="Requerimento da antecipação da primeira parcela do 13º salário."
          linkTo="/adiantamento-13"
          icon={<FaMoneyBillWave />}
        />{" "}
        <FormCard
          title="Declaração de Dependentes"
          description="Formulário para declaração de dependentes para fins de imposto de renda."
          linkTo="/declaracao-dependentes"
          icon={<FaUsers />}
        />{" "}
        <FormCard
          title="Declaração Ficha Limpa"
          description="Declaração para fins de provimento em cargo comissionado (LC 356/2011)."
          linkTo="/declaracao-ficha-limpa"
          icon={<FaUserShield />}
        />{" "}
        <FormCard
          title="Declaração de Nepotismo"
          description="Declaração sobre inexistência de Nepotismo (LC 274 e Súmula 13 STF)."
          linkTo="/declaracao-nepotismo"
          icon={<FaUserSlash />}
        />{" "}
        <FormCard
          title="Não Ocupação de Cargos"
          description="Declaração quanto a ocupação de cargos públicos."
          linkTo="/declaracao-nao-ocupacao"
          icon={<FaBuilding />}
        />{" "}
        <FormCard
          title="Ocorrência de Ponto"
          description="Justifique ausências, atrasos ou esquecimentos de marcação."
          linkTo="/ocorrencia-ponto"
          icon={<FaClock />}
        />{" "}
        <FormCard
          title="Relatório de Viagem"
          description="Formulário para prestação de contas de viagens."
          linkTo="/relatorio-viagem"
          icon={<FaReceipt />}
        />{" "}
        <FormCard
          title="Requerimento de Férias"
          description="Solicite as suas férias regulamentares."
          linkTo="/formulario-ferias"
          icon={<FaPlaneDeparture />}
        />{" "}
        <FormCard
          title="Solicitação de Cursos"
          description="Apoio a iniciativas de capacitação de curta e média duração."
          linkTo="/solicitacao-cursos"
          icon={<FaBook />}
        />{" "}
        <FormCard
          title="Solicitação de Diária/Passagem"
          description="Solicite diárias e passagens."
          linkTo="/SolicitacaoDiaria"
          icon={<FaSuitcaseRolling />}
        />{" "}
        <FormCard
          title="Solicitação de Documentos"
          description="Requerimento de cópia de documentos da pasta funcional."
          linkTo="/solicitacao-documentos"
          icon={<FaFileAlt />}
        />{" "}
        <FormCard
          title="Solicitação de Estagiário"
          description="Formulário para solicitar a contratação de estagiários."
          linkTo="/solicitacao-estagiario"
          icon={<FaUserGraduate />}
        />{" "}
        <FormCard
          title="Solicitação de Inspeção Médica"
          description="Formulário para solicitar inspeção médica."
          linkTo="/inspecao-medica"
          icon={<FaBriefcaseMedical />}
        />{" "}
        <FormCard
          title="Requisição Manual Almoxarifado"
          description="Formulário para requisição manual de materiais de consumo."
          linkTo="/requisicao-manual-almoxarifado"
          icon={<FaWarehouse />}
        />{" "}
        <FormCard
          title="Cartão de Ponto"
          description="Formulário para impressão do cartão de ponto de assessores."
          linkTo="/cartao-ponto"
          icon={<FaCalendarCheck />}
        />{" "}
      </div>{" "}
    </div>
  );
};

export default HomePage;
