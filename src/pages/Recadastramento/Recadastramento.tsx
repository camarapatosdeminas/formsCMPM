import { useMemo, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RecadastramentoPdf from "../../pdf/RecadastramentoPdf";
import {
  createInitialRecadastramentoData,
  type Bem,
  type Dependente,
  type RecadastramentoData,
} from "../../types/recadastramento";
import "./Recadastramento.css";

interface ValidationError {
  field: string;
  message: string;
}

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const maskCpf = (value: string) =>
  onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

const maskCep = (value: string) =>
  onlyDigits(value).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

const maskPhone = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

const isValidCpf = (cpf: string) => {
  const digits = onlyDigits(cpf);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const calculateDigit = (length: number) => {
    const sum = digits
      .slice(0, length)
      .split("")
      .reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0);
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };

  return calculateDigit(9) === Number(digits[9]) && calculateDigit(10) === Number(digits[10]);
};

const validate = (data: RecadastramentoData): ValidationError[] => {
  const errors: ValidationError[] = [];
  const required = (field: keyof RecadastramentoData, message: string) => {
    if (!String(data[field] ?? "").trim()) errors.push({ field, message });
  };

  required("nome", "Informe o nome completo.");
  required("rg", "Informe o RG.");
  required("cpf", "Informe o CPF.");
  required("cargoFuncao", "Informe o cargo ou função.");
  required("dataDeclaracao", "Informe a data da declaração.");

  if (data.cpf && !isValidCpf(data.cpf)) {
    errors.push({ field: "cpf", message: "Informe um CPF válido, com 11 dígitos." });
  }

  if (data.tipoRecadastramento === "simplificado") return errors;

  required("matricula", "Informe a matrícula.");
  required("dataNascimento", "Informe a data de nascimento.");
  required("naturalidade", "Informe a naturalidade.");
  required("ufNascimento", "Informe a UF de nascimento.");
  required("estadoCivil", "Informe o estado civil.");
  required("logradouro", "Informe o logradouro.");
  required("numero", "Informe o número do endereço.");
  required("bairro", "Informe o bairro.");
  required("cidade", "Informe a cidade.");
  required("enderecoUf", "Informe a UF do endereço.");
  required("email", "Informe o e-mail.");
  required("admissao", "Informe a data de admissão.");
  required("vinculo", "Selecione o vínculo funcional.");
  required("lotacao", "Informe a lotação atual.");

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "Informe um e-mail válido." });
  }
  if (!onlyDigits(data.telefone) && !onlyDigits(data.celular)) {
    errors.push({ field: "celular", message: "Informe ao menos um telefone ou celular." });
  }
  if (data.possuiDeficiencia && !data.tipoDeficiencia.trim()) {
    errors.push({ field: "tipoDeficiencia", message: "Descreva o tipo de deficiência." });
  }
  if (data.exerceAtividadeRemunerada && !data.atividadeRemuneradaDetalhes.trim()) {
    errors.push({
      field: "atividadeRemuneradaDetalhes",
      message: "Descreva a outra atividade remunerada e os horários.",
    });
  }

  if (!data.bens.length) {
    errors.push({ field: "bens", message: "Inclua ao menos uma linha na declaração de bens." });
  }
  data.bens.forEach((bem, index) => {
    if (!bem.descricao.trim() || !bem.valor.trim()) {
      errors.push({
        field: `bem-${bem.id}`,
        message: `Complete a descrição e o valor do ${index + 1}º bem. Se não houver bens, declare “Não possuo bens” e valor “0,00”.`,
      });
    }
  });

  data.dependentes.forEach((dependente, index) => {
    if (!dependente.nome.trim() || !dependente.parentesco.trim() || !dependente.dataNascimento) {
      errors.push({
        field: `dependente-${dependente.id}`,
        message: `Complete nome, parentesco e nascimento do dependente ${index + 1}.`,
      });
    }
    if (!dependente.ir && !dependente.af && !dependente.am) {
      errors.push({
        field: `dependente-${dependente.id}`,
        message: `Marque ao menos um tipo de dependência para o dependente ${index + 1}.`,
      });
    }
  });

  return errors;
};

const Recadastramento = () => {
  const [data, setData] = useState<RecadastramentoData>(createInitialRecadastramentoData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [ready, setReady] = useState(false);

  const errorFields = useMemo(() => new Set(errors.map((error) => error.field)), [errors]);

  const update = <K extends keyof RecadastramentoData>(field: K, value: RecadastramentoData[K]) => {
    setData((current) => ({ ...current, [field]: value }));
    setReady(false);
    setErrors([]);
  };

  const updateBem = (id: number, field: keyof Omit<Bem, "id">, value: string) => {
    update(
      "bens",
      data.bens.map((bem) => (bem.id === id ? { ...bem, [field]: value } : bem)),
    );
  };

  const updateDependente = <K extends keyof Omit<Dependente, "id">>(
    id: number,
    field: K,
    value: Dependente[K],
  ) => {
    update(
      "dependentes",
      data.dependentes.map((dependente) =>
        dependente.id === id ? { ...dependente, [field]: value } : dependente,
      ),
    );
  };

  const addBem = () => {
    update("bens", [...data.bens, { id: Date.now(), descricao: "", valor: "" }]);
  };

  const addDependente = () => {
    update("dependentes", [
      ...data.dependentes,
      {
        id: Date.now(),
        nome: "",
        parentesco: "",
        dataNascimento: "",
        ir: false,
        af: false,
        am: false,
      },
    ]);
  };

  const preparePdf = () => {
    const nextErrors = validate(data);
    setErrors(nextErrors);
    setReady(nextErrors.length === 0);
    if (nextErrors.length) {
      window.requestAnimationFrame(() => {
        document.getElementById("validation-summary")?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  };

  const inputClass = (field: string) => (errorFields.has(field) ? "field-invalid" : "");
  const packageDescription =
    data.tipoRecadastramento === "simplificado"
      ? "O PDF começará com a Portaria e terá o Anexo VII, destinado a quem não teve alterações cadastrais."
      : `O PDF começará com a Portaria e terá os Anexos I, II, ${data.tipoPessoa === "servidor" ? "III" : "IV"}, V e VI.`;

  return (
    <div className="recadastramento-shell">
      <div className="recadastramento-hero">
        <span className="eyebrow">Portaria nº 1.798, de 5 de abril de 2023</span>
        <h2>Recadastramento de vereadores e servidores</h2>
        <p>
          Preencha os blocos abaixo uma única vez. Os dados compartilhados serão repetidos automaticamente nos anexos aplicáveis e reunidos em um só PDF.
        </p>
      </div>

      <div className="annex-map" aria-label="Anexos que serão gerados">
        <div>
          <strong>Pacote selecionado</strong>
          <span>{packageDescription}</span>
        </div>
        <div>
          <strong>Conteúdo fixo</strong>
          <span>A íntegra da Portaria, os textos legais, títulos, órgão e declarações já estão definidos no código.</span>
        </div>
        <div>
          <strong>Antes do download</strong>
          <span>O sistema confere identificação, contato, campos condicionais, bens e dependentes.</span>
        </div>
      </div>

      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <section className="rec-section rec-section-highlight">
          <div className="section-heading">
            <span className="section-number">1</span>
            <div>
              <h3>Defina o pacote</h3>
              <p>Essa escolha determina quais anexos entram no arquivo final.</p>
            </div>
          </div>

          <div className="choice-grid">
            <label className={`choice-card ${data.tipoRecadastramento === "completo" ? "is-selected" : ""}`}>
              <input
                type="radio"
                name="tipoRecadastramento"
                checked={data.tipoRecadastramento === "completo"}
                onChange={() => update("tipoRecadastramento", "completo")}
              />
              <span>
                <strong>Recadastramento completo</strong>
                <small>Para quem teve alterações ou precisa atualizar todo o cadastro.</small>
              </span>
            </label>
            <label className={`choice-card ${data.tipoRecadastramento === "simplificado" ? "is-selected" : ""}`}>
              <input
                type="radio"
                name="tipoRecadastramento"
                checked={data.tipoRecadastramento === "simplificado"}
                onChange={() => update("tipoRecadastramento", "simplificado")}
              />
              <span>
                <strong>Declaração simplificada</strong>
                <small>Somente quando não houve alteração desde o último recadastramento.</small>
              </span>
            </label>
          </div>

          <div className="choice-grid choice-grid-compact">
            <label className={`choice-card ${data.tipoPessoa === "servidor" ? "is-selected" : ""}`}>
              <input
                type="radio"
                name="tipoPessoa"
                checked={data.tipoPessoa === "servidor"}
                onChange={() => update("tipoPessoa", "servidor")}
              />
              <span><strong>Servidor(a)</strong><small>Usa o Anexo III no pacote completo.</small></span>
            </label>
            <label className={`choice-card ${data.tipoPessoa === "vereador" ? "is-selected" : ""}`}>
              <input
                type="radio"
                name="tipoPessoa"
                checked={data.tipoPessoa === "vereador"}
                onChange={() => update("tipoPessoa", "vereador")}
              />
              <span><strong>Vereador(a)</strong><small>Usa o Anexo IV no pacote completo.</small></span>
            </label>
          </div>
        </section>

        <section className="rec-section" id="identificacao">
          <div className="section-heading">
            <span className="section-number">2</span>
            <div>
              <h3>Identificação compartilhada</h3>
              <p>Estes dados aparecem em várias declarações.</p>
            </div>
          </div>
          <div className="rec-grid rec-grid-3">
            <label className="field field-span-2">
              <span>Nome completo <b>*</b></span>
              <input className={inputClass("nome")} value={data.nome} onChange={(e) => update("nome", e.target.value)} autoComplete="name" />
            </label>
            <label className="field">
              <span>Matrícula {data.tipoRecadastramento === "completo" && <b>*</b>}</span>
              <input className={inputClass("matricula")} value={data.matricula} onChange={(e) => update("matricula", e.target.value)} />
            </label>
            <label className="field">
              <span>CPF <b>*</b></span>
              <input className={inputClass("cpf")} value={data.cpf} onChange={(e) => update("cpf", maskCpf(e.target.value))} inputMode="numeric" placeholder="000.000.000-00" />
            </label>
            <label className="field">
              <span>RG <b>*</b></span>
              <input className={inputClass("rg")} value={data.rg} onChange={(e) => update("rg", e.target.value)} />
            </label>
            <label className="field">
              <span>Cargo/Função <b>*</b></span>
              <input className={inputClass("cargoFuncao")} value={data.cargoFuncao} onChange={(e) => update("cargoFuncao", e.target.value)} />
            </label>
            <label className="field">
              <span>Data da declaração <b>*</b></span>
              <input type="date" className={inputClass("dataDeclaracao")} value={data.dataDeclaracao} onChange={(e) => update("dataDeclaracao", e.target.value)} />
            </label>
          </div>
        </section>

        {data.tipoRecadastramento === "completo" && (
          <>
            <section className="rec-section">
              <div className="section-heading">
                <span className="section-number">3</span>
                <div><h3>Anexo I - Dados pessoais e documentos</h3><p>Campos sem asterisco podem ser deixados em branco quando não se aplicarem.</p></div>
              </div>
              <div className="rec-grid rec-grid-4">
                <label className="field"><span>Nascimento <b>*</b></span><input type="date" className={inputClass("dataNascimento")} value={data.dataNascimento} onChange={(e) => update("dataNascimento", e.target.value)} /></label>
                <label className="field field-span-2"><span>Naturalidade <b>*</b></span><input className={inputClass("naturalidade")} value={data.naturalidade} onChange={(e) => update("naturalidade", e.target.value)} /></label>
                <label className="field"><span>UF nascimento <b>*</b></span><input maxLength={2} className={inputClass("ufNascimento")} value={data.ufNascimento} onChange={(e) => update("ufNascimento", e.target.value.toUpperCase())} /></label>
                <label className="field"><span>Nacionalidade</span><input value={data.nacionalidade} onChange={(e) => update("nacionalidade", e.target.value)} /></label>
                <label className="field"><span>Estado civil <b>*</b></span><input className={inputClass("estadoCivil")} value={data.estadoCivil} onChange={(e) => update("estadoCivil", e.target.value)} /></label>
                <label className="field"><span>Sexo</span><input value={data.sexo} onChange={(e) => update("sexo", e.target.value)} /></label>
                <label className="field field-checkbox"><input type="checkbox" checked={data.possuiDeficiencia} onChange={(e) => update("possuiDeficiencia", e.target.checked)} /><span>Possui deficiência</span></label>
                {data.possuiDeficiencia && (
                  <label className="field field-span-4"><span>Tipo de deficiência <b>*</b></span><input className={inputClass("tipoDeficiencia")} value={data.tipoDeficiencia} onChange={(e) => update("tipoDeficiencia", e.target.value)} /></label>
                )}
              </div>

              <h4 className="subsection-title">Documentos</h4>
              <div className="rec-grid rec-grid-4">
                <label className="field"><span>Órgão emissor do RG</span><input value={data.rgEmissor} onChange={(e) => update("rgEmissor", e.target.value)} /></label>
                <label className="field"><span>UF do RG</span><input maxLength={2} value={data.rgUf} onChange={(e) => update("rgUf", e.target.value.toUpperCase())} /></label>
                <label className="field"><span>Data de emissão do RG</span><input type="date" value={data.rgData} onChange={(e) => update("rgData", e.target.value)} /></label>
                <label className="field"><span>PIS/PASEP</span><input value={data.pisPasep} onChange={(e) => update("pisPasep", e.target.value)} /></label>
                <label className="field"><span>Título de eleitor</span><input value={data.tituloEleitor} onChange={(e) => update("tituloEleitor", e.target.value)} /></label>
                <label className="field"><span>Zona</span><input value={data.zonaEleitoral} onChange={(e) => update("zonaEleitoral", e.target.value)} /></label>
                <label className="field"><span>Seção</span><input value={data.secaoEleitoral} onChange={(e) => update("secaoEleitoral", e.target.value)} /></label>
                <label className="field"><span>UF eleitoral</span><input maxLength={2} value={data.eleitorUf} onChange={(e) => update("eleitorUf", e.target.value.toUpperCase())} /></label>
                <label className="field"><span>CTPS</span><input value={data.ctps} onChange={(e) => update("ctps", e.target.value)} /></label>
                <label className="field"><span>Série da CTPS</span><input value={data.ctpsSerie} onChange={(e) => update("ctpsSerie", e.target.value)} /></label>
                <label className="field"><span>UF da CTPS</span><input maxLength={2} value={data.ctpsUf} onChange={(e) => update("ctpsUf", e.target.value.toUpperCase())} /></label>
                <label className="field"><span>Emissão da CTPS</span><input type="date" value={data.ctpsEmissao} onChange={(e) => update("ctpsEmissao", e.target.value)} /></label>
                <label className="field"><span>Conselho regional nº</span><input value={data.conselhoNumero} onChange={(e) => update("conselhoNumero", e.target.value)} /></label>
                <label className="field"><span>Órgão do conselho</span><input value={data.conselhoOrgao} onChange={(e) => update("conselhoOrgao", e.target.value)} /></label>
                <label className="field"><span>Reservista</span><input value={data.reservista} onChange={(e) => update("reservista", e.target.value)} /></label>
                <label className="field"><span>Órgão reservista</span><input value={data.orgaoReservista} onChange={(e) => update("orgaoReservista", e.target.value)} /></label>
                <label className="field field-span-2"><span>CNH</span><input value={data.cnh} onChange={(e) => update("cnh", e.target.value)} /></label>
                <label className="field"><span>Categoria da CNH</span><input value={data.cnhCategoria} onChange={(e) => update("cnhCategoria", e.target.value)} /></label>
              </div>
            </section>

            <section className="rec-section">
              <div className="section-heading">
                <span className="section-number">4</span>
                <div><h3>Anexo I - Endereço e contato</h3><p>O endereço também será inserido nas declarações de bens e de não acumulação.</p></div>
              </div>
              <div className="rec-grid rec-grid-4">
                <label className="field field-span-3"><span>Logradouro <b>*</b></span><input className={inputClass("logradouro")} value={data.logradouro} onChange={(e) => update("logradouro", e.target.value)} autoComplete="street-address" /></label>
                <label className="field"><span>Número <b>*</b></span><input className={inputClass("numero")} value={data.numero} onChange={(e) => update("numero", e.target.value)} /></label>
                <label className="field field-span-2"><span>Complemento</span><input value={data.complemento} onChange={(e) => update("complemento", e.target.value)} /></label>
                <label className="field"><span>Bairro <b>*</b></span><input className={inputClass("bairro")} value={data.bairro} onChange={(e) => update("bairro", e.target.value)} /></label>
                <label className="field"><span>CEP</span><input value={data.cep} onChange={(e) => update("cep", maskCep(e.target.value))} inputMode="numeric" placeholder="00000-000" /></label>
                <label className="field field-span-2"><span>Cidade <b>*</b></span><input className={inputClass("cidade")} value={data.cidade} onChange={(e) => update("cidade", e.target.value)} /></label>
                <label className="field"><span>UF <b>*</b></span><input maxLength={2} className={inputClass("enderecoUf")} value={data.enderecoUf} onChange={(e) => update("enderecoUf", e.target.value.toUpperCase())} /></label>
                <label className="field"><span>Telefone</span><input value={data.telefone} onChange={(e) => update("telefone", maskPhone(e.target.value))} inputMode="tel" /></label>
                <label className="field"><span>Celular <b>*</b></span><input className={inputClass("celular")} value={data.celular} onChange={(e) => update("celular", maskPhone(e.target.value))} inputMode="tel" /></label>
                <label className="field field-span-3"><span>E-mail <b>*</b></span><input type="email" className={inputClass("email")} value={data.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></label>
              </div>
            </section>

            <section className="rec-section">
              <div className="section-heading">
                <span className="section-number">5</span>
                <div><h3>Anexo I - Dados funcionais</h3><p>Informações profissionais e bancárias do cadastro funcional.</p></div>
              </div>
              <div className="rec-grid rec-grid-3">
                <label className="field"><span>Data de admissão <b>*</b></span><input type="date" className={inputClass("admissao")} value={data.admissao} onChange={(e) => update("admissao", e.target.value)} /></label>
                <label className="field"><span>Vínculo <b>*</b></span><select className={inputClass("vinculo")} value={data.vinculo} onChange={(e) => update("vinculo", e.target.value as RecadastramentoData["vinculo"])}><option value="">Selecione</option><option value="efetivo">Efetivo</option><option value="comissionado">Comissionado</option><option value="cedido">Cedido</option><option value="agentePolitico">Agente político</option></select></label>
                <label className="field"><span>Órgão de cessão</span><input value={data.orgaoCessao} onChange={(e) => update("orgaoCessao", e.target.value)} /></label>
                <label className="field"><span>Cargo do concurso</span><input value={data.cargoConcurso} onChange={(e) => update("cargoConcurso", e.target.value)} /></label>
                <label className="field"><span>Cargo/Função atual <b>*</b></span><input className={inputClass("cargoFuncao")} value={data.cargoFuncao} onChange={(e) => update("cargoFuncao", e.target.value)} /></label>
                <label className="field"><span>Lotação atual <b>*</b></span><input className={inputClass("lotacao")} value={data.lotacao} onChange={(e) => update("lotacao", e.target.value)} /></label>
                <label className="field"><span>Grau de instrução</span><input value={data.grauInstrucao} onChange={(e) => update("grauInstrucao", e.target.value)} /></label>
                <label className="field field-span-2"><span>Formação/Graduação</span><input value={data.formacao} onChange={(e) => update("formacao", e.target.value)} /></label>
                <label className="field"><span>Agência CEF</span><input value={data.agencia} onChange={(e) => update("agencia", e.target.value)} /></label>
                <label className="field"><span>Operação</span><input value={data.operacao} onChange={(e) => update("operacao", e.target.value)} /></label>
                <label className="field"><span>Conta</span><input value={data.conta} onChange={(e) => update("conta", e.target.value)} /></label>
              </div>
              <label className="toggle-line"><input type="checkbox" checked={data.exerceAtividadeRemunerada} onChange={(e) => update("exerceAtividadeRemunerada", e.target.checked)} /><span>Exerço outra atividade remunerada</span></label>
              {data.exerceAtividadeRemunerada && (
                <label className="field field-textarea"><span>Atividade(s) e horários <b>*</b></span><textarea className={inputClass("atividadeRemuneradaDetalhes")} value={data.atividadeRemuneradaDetalhes} onChange={(e) => update("atividadeRemuneradaDetalhes", e.target.value)} rows={4} /></label>
              )}
            </section>

            <section className="rec-section">
              <div className="section-heading">
                <span className="section-number">6</span>
                <div><h3>Anexo II - Declaração de bens</h3><p>Adicione quantos bens forem necessários. Textos extensos continuarão automaticamente na página seguinte do PDF.</p></div>
              </div>
              <div className="repeat-list">
                {data.bens.map((bem, index) => (
                  <div className={`repeat-card ${inputClass(`bem-${bem.id}`)}`} key={bem.id}>
                    <div className="repeat-card-header"><strong>{index + 1}º bem</strong>{data.bens.length > 1 && <button type="button" className="button-link danger" onClick={() => update("bens", data.bens.filter((item) => item.id !== bem.id))}>Remover</button>}</div>
                    <div className="rec-grid rec-grid-assets">
                      <label className="field"><span>Descrição <b>*</b></span><textarea value={bem.descricao} onChange={(e) => updateBem(bem.id, "descricao", e.target.value)} rows={4} /></label>
                      <label className="field"><span>Valor (R$) <b>*</b></span><input value={bem.valor} onChange={(e) => updateBem(bem.id, "valor", e.target.value)} inputMode="decimal" placeholder="0,00" /></label>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="secondary-button" onClick={addBem}>+ Adicionar outro bem</button>
            </section>

            {data.tipoPessoa === "vereador" && (
              <section className="rec-section">
                <div className="section-heading"><span className="section-number">7</span><div><h3>Anexo IV - Situação do vereador</h3><p>Selecione a declaração compatível com sua situação funcional.</p></div></div>
                <div className="stacked-options">
                  <label><input type="radio" name="situacaoVereador" checked={data.situacaoVereador === "naoServidor"} onChange={() => update("situacaoVereador", "naoServidor")} /><span>Não sou servidor público em exercício de mandato eletivo.</span></label>
                  <label><input type="radio" name="situacaoVereador" checked={data.situacaoVereador === "servidorCompativel"} onChange={() => update("situacaoVereador", "servidorCompativel")} /><span>Sou servidor público e há compatibilidade de horários.</span></label>
                  <label><input type="radio" name="situacaoVereador" checked={data.situacaoVereador === "servidorIncompativel"} onChange={() => update("situacaoVereador", "servidorIncompativel")} /><span>Sou servidor público e há incompatibilidade de horários.</span></label>
                </div>
                {data.situacaoVereador === "servidorIncompativel" && (
                  <div className="conditional-box">
                    <strong>Remuneração do cargo efetivo</strong>
                    <label><input type="radio" name="opcaoRemuneracao" checked={data.opcaoRemuneracao === "opta"} onChange={() => update("opcaoRemuneracao", "opta")} /> Opto pela remuneração do cargo efetivo</label>
                    <label><input type="radio" name="opcaoRemuneracao" checked={data.opcaoRemuneracao === "naoOpta"} onChange={() => update("opcaoRemuneracao", "naoOpta")} /> Não opto pela remuneração do cargo efetivo</label>
                    {data.opcaoRemuneracao === "naoOpta" && (
                      <>
                        <strong>Base das contribuições ao regime próprio</strong>
                        <label><input type="radio" name="baseContribuicao" checked={data.baseContribuicao === "subsidioVereador"} onChange={() => update("baseContribuicao", "subsidioVereador")} /> Subsídio de vereador</label>
                        <label><input type="radio" name="baseContribuicao" checked={data.baseContribuicao === "remuneracaoCargoEfetivo"} onChange={() => update("baseContribuicao", "remuneracaoCargoEfetivo")} /> Remuneração do cargo efetivo</label>
                      </>
                    )}
                  </div>
                )}
              </section>
            )}

            <section className="rec-section">
              <div className="section-heading">
                <span className="section-number">{data.tipoPessoa === "vereador" ? "8" : "7"}</span>
                <div><h3>Anexo VI - Dependentes</h3><p>Deixe a lista vazia se não houver dependentes. IR = Imposto de Renda; AF = Abono Família; AM = Assistência Médica e Odontológica.</p></div>
              </div>
              {data.dependentes.length === 0 && <div className="empty-state">Nenhum dependente incluído.</div>}
              <div className="repeat-list">
                {data.dependentes.map((dependente, index) => (
                  <div className={`repeat-card ${inputClass(`dependente-${dependente.id}`)}`} key={dependente.id}>
                    <div className="repeat-card-header"><strong>Dependente {index + 1}</strong><button type="button" className="button-link danger" onClick={() => update("dependentes", data.dependentes.filter((item) => item.id !== dependente.id))}>Remover</button></div>
                    <div className="rec-grid rec-grid-3">
                      <label className="field"><span>Nome <b>*</b></span><input value={dependente.nome} onChange={(e) => updateDependente(dependente.id, "nome", e.target.value)} /></label>
                      <label className="field"><span>Parentesco <b>*</b></span><input value={dependente.parentesco} onChange={(e) => updateDependente(dependente.id, "parentesco", e.target.value)} /></label>
                      <label className="field"><span>Nascimento <b>*</b></span><input type="date" value={dependente.dataNascimento} onChange={(e) => updateDependente(dependente.id, "dataNascimento", e.target.value)} /></label>
                    </div>
                    <div className="dependency-options">
                      <label><input type="checkbox" checked={dependente.ir} onChange={(e) => updateDependente(dependente.id, "ir", e.target.checked)} /> IR</label>
                      <label><input type="checkbox" checked={dependente.af} onChange={(e) => updateDependente(dependente.id, "af", e.target.checked)} /> AF</label>
                      <label><input type="checkbox" checked={dependente.am} onChange={(e) => updateDependente(dependente.id, "am", e.target.checked)} /> AM</label>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="secondary-button" onClick={addDependente}>+ Adicionar dependente</button>
            </section>
          </>
        )}

        <section className="download-panel">
          <div>
            <span className="eyebrow">Etapa final</span>
            <h3>Validar e baixar o PDF consolidado</h3>
            <p>O botão de download só aparece depois que os campos obrigatórios e condicionais forem validados.</p>
          </div>
          <button type="button" className="primary-button" onClick={preparePdf}>Validar e preparar PDF</button>

          {errors.length > 0 && (
            <div className="validation-summary" id="validation-summary" role="alert">
              <strong>Revise {errors.length === 1 ? "este campo" : `estes ${errors.length} pontos`}:</strong>
              <ul>{errors.map((error, index) => <li key={`${error.field}-${index}`}>{error.message}</li>)}</ul>
            </div>
          )}

          {ready && (
            <div className="download-ready" aria-live="polite">
              <div><strong>Validação concluída.</strong><span>Seu PDF está pronto para ser montado e baixado.</span></div>
              <PDFDownloadLink
                className="download-button"
                document={<RecadastramentoPdf data={data} />}
                fileName={`recadastramento-${onlyDigits(data.cpf) || "cmpm"}.pdf`}
              >
                {({ loading }) => (loading ? "Montando PDF..." : "Baixar PDF completo")}
              </PDFDownloadLink>
            </div>
          )}
        </section>
      </form>
    </div>
  );
};

export default Recadastramento;
