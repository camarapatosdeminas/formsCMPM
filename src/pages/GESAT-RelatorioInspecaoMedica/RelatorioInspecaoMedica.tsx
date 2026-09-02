import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RelatorioInspecaoMedicaPdf from "../../pdf/RelatorioInspecaoMedicaPdf";
import "./RelatorioInspecaoMedica.css";

interface FormData {
  nome: string;
  endereco: string;
  data: string;
  numeroCasa: string;
  funcao: string;
  matricula: string;
  lotacao: string;
  emailServidor: string;
  admissao: string;
  sexo: string;
  estadoCivil: string;
  regime: string;
  cpf: string;
  cargo: string;
  // localTrabalho: string;
  bairro: string;
  complemento: string;
  dataSaida: string;
  dataRetorno: string;
  dataAssinaturaServidor: string;
  dataAssinaturaChefe: string;
  dataAfastamento: string;
  descricaoFuncoes: string;
  ramal: string;
  funcaoConfianca: "sim" | "nao";
  funcaoGESAT:
    | "Admissional"
    | "Demissional"
    | "Periódico"
    | "Retorno ao Trabalho"
    | "Readaptacao / Restricao Medica"
    | "Licenca por Acidente de Trabalho"
    | "Licenca para Tratamento de Saude"
    | "Outros";
  outrosFuncaoGESAT: string;
  funcaoAfastamento: "Sim";
  afastadoConsecutivamente: "Sim" | "Não";
  afastadoReadaptado: "Sim" | "Não";
  dataAfastamentoReadaptado: string;
  anamnese: string;
  exames: string;
  diagnostico: string;
  cid: string;
  nomePaciente: string;
  contato: string;
}

const RelatorioInspecaoMedica = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    endereco: "",
    numeroCasa: "",
    data: "",
    funcao: "",
    matricula: "",
    lotacao: "",
    emailServidor: "",
    admissao: "",
    sexo: "",
    estadoCivil: "",
    regime: "",
    cpf: "",
    cargo: "",
    // localTrabalho: "",
    ramal: "",
    bairro: "",
    complemento: "",
    dataSaida: "",
    dataRetorno: "",
    dataAssinaturaServidor: "",
    dataAssinaturaChefe: "",
    descricaoFuncoes: "",
    funcaoConfianca: "nao",
    funcaoGESAT: "Outros",
    funcaoAfastamento: "Sim",
    afastadoReadaptado: "Sim",
    nomePaciente: "",
    dataAfastamentoReadaptado: "",
    afastadoConsecutivamente: "Não",
    dataAfastamento: "",
    outrosFuncaoGESAT: "",
    anamnese: "",
    exames: "",
    diagnostico: "",
    cid: "",
    contato: "",
  });

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <RelatorioInspecaoMedicaPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Formulário para Inspeção Médica</h2>
      <div className="form-section">
        <h3>I - Preenchimento do Servidor Público Municipal </h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleInputChange}
          />
          <div className="form-grid">
            <p> Admissão</p>
            <input
              type="date"
              name="admissao"
              placeholder="Admissão"
              value={formData.admissao}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            name="regime"
            placeholder="Regime"
            value={formData.regime}
            onChange={handleInputChange}
          />

          <div className="form-grid">
            <p> Data de Nascimento</p>
            <input
              type="date"
              name="data"
              placeholder="Data Nascimento"
              value={formData.data}
              onChange={handleInputChange}
            />
          </div>

          <input
            type="text"
            name="sexo"
            placeholder="Sexo"
            value={formData.sexo}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="estadoCivil"
            placeholder="Estado Civil"
            value={formData.estadoCivil}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="funcao"
            placeholder="Função"
            value={formData.funcao}
            onChange={handleInputChange}
          />

          {/* <input
                        type="text"
                        name="localTrabalho"
                        placeholder="Local de Trabalho"
                        value={formData.localTrabalho}
                        onChange={handleInputChange}
                    /> */}

          <input
            type="text"
            name="lotacao"
            placeholder="Lotação"
            value={formData.lotacao}
            onChange={handleInputChange}
          />
        </div>
        <hr /> {/* Linha horizontal para separar visualmente */}
        <div className="form-container">
          <h2>Endereço</h2>
          <div className="form-grid">
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={formData.endereco}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="numeroCasa"
              placeholder="Nº"
              value={formData.numeroCasa}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="complemento"
              placeholder="Complemento"
              value={formData.complemento}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="emailServidor"
              placeholder="Email"
              value={formData.emailServidor}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contato"
              placeholder="Contato (Telefone)"
              value={formData.contato}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <hr /> {/* Linha horizontal para separar visualmente */}
        <div className="form-container">
          <div className="radio-group" style={{ marginTop: "1rem" }}>
            <label>Tem férias agendadas nos próximos 30 dias ?</label>
            <label>
              <input
                type="radio"
                name="funcaoConfianca"
                value="sim"
                checked={formData.funcaoConfianca === "sim"}
                onChange={handleInputChange as any}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="funcaoConfianca"
                value="nao"
                checked={formData.funcaoConfianca === "nao"}
                onChange={handleInputChange as any}
              />{" "}
              Não
            </label>
            <p>
              <strong>ATENÇÃO: </strong>
              Servidores com afastamento médico superior ou igual a 15 dias,
              protocolados nos 30 dias que antecedem o início das férias terão o
              período suspenso.
              <strong>
                Após o retorno ao trabalho, será necessário agendar novo período
                de férias.
              </strong>
            </p>
          </div>

          {formData.funcaoConfianca === "sim" && (
            <div className="conditional-input">
              <label>
                <p>Data Saída</p>
                <input
                  type="date"
                  name="dataSaida"
                  placeholder="Data Saída"
                  value={formData.dataSaida}
                  onChange={handleInputChange}
                />
                <p>Data Retorno</p>
                <input
                  type="date"
                  name="dataRetorno"
                  placeholder="Data Retorno"
                  value={formData.dataRetorno}
                  onChange={handleInputChange}
                />
              </label>
              <u>
                {/* <p>
                                    <strong>ATENÇÃO: </strong>
                                    Servidores com afastamento médico superior ou igual a 15 dias, protocolados nos 30 dias que antecedem o início
                                    das férias terão o período suspenso.
                                    <strong>
                                        Após o retorno ao trabalho, será necessário agendar novo período de férias.
                                    </strong>

                                </p> */}
              </u>
            </div>
          )}
        </div>
        <div className="form-container">
          <p>Data:</p>
          <div className="form-grid">
            <input
              className="input-data"
              type="date"
              name="dataAssinaturaServidor"
              placeholder="DD/MM/AAAA"
              value={formData.dataAssinaturaServidor}
              onChange={handleInputChange}
              style={{ width: "180px", justifySelf: "start", height: "40px" }}
            />
            <div className="bloco-assinatura">
              <div className="linha-assinatura"></div>

              <p className="texto-assinatura">Assinatura do Servidor</p>
            </div>
          </div>
        </div>
        <hr /> {/* Linha horizontal para separar visualmente */}
      </div>
      <div className="form-container">
        <h4>II - PREENCHIMENTO DA CHEFIA IMEDIATA </h4>
        <div className="form-grid">
          <p>Descreva as funções exercidas pelo servidor:</p>
        </div>

        <textarea
          id="descricaoFuncao"
          value=""
          readOnly
          className="full-width-textarea"
        ></textarea>

        <div className="form-container">
          <p>Data:</p>
          <div className="form-grid">
            <input
              type="text"
              name="dataAssinaturaChefe"
              placeholder="DD/MM/AAAA"
              value=""
              // value={formData.dataAssinaturaChefe}
              onChange={handleInputChange}
              style={{ width: "180px", justifySelf: "start", height: "40px" }}
            />

            <div className="bloco-assinatura">
              <div className="linha-assinatura"></div>

              <p className="texto-assinatura">
                Assinatura e Carimbo da Chefia Imediata
              </p>
            </div>
          </div>
        </div>

        <div className="form-container">
          <h4>III - PREENCHIMENTO DA GESAT/MEDICINA DO TRABALHO </h4>
          <div className="split-container">
            {/* Coluna da Esquerda */}
            <div className="left-column">
              <label>
                <input
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={formData.funcaoGESAT === "Admissional"}
                  onChange={handleInputChange as any}
                />{" "}
                Admissional
              </label>

              <label>
                <input
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={formData.funcaoGESAT === "Demissional"}
                  onChange={handleInputChange as any}
                />{" "}
                Demissional
              </label>

              <label>
                <input
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={formData.funcaoGESAT === "Periódico"}
                  onChange={handleInputChange as any}
                />{" "}
                Periódico
              </label>

              <label>
                <input
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={
                    formData.funcaoGESAT === "Readaptacao / Restricao Medica"
                  }
                  onChange={handleInputChange as any}
                />{" "}
                Readaptacao / Restricao Médica
              </label>

              <label>
                <input
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={
                    formData.funcaoGESAT === "Licenca por Acidente de Trabalho"
                  }
                  onChange={handleInputChange as any}
                />{" "}
                Licença por Acidente de Trabalho
              </label>

              <label>
                <input
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={
                    formData.funcaoGESAT === "Licenca para Tratamento de Saude"
                  }
                  onChange={handleInputChange as any}
                />{" "}
                Licenca para Tratamento de Saude
              </label>

              <label>
                <input
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={formData.funcaoGESAT === "Outros"}
                  onChange={handleInputChange as any}
                />{" "}
                Outros
              </label>

              <input
                type="text"
                name="outrosFuncaoGESAT"
                placeholder="Descreva outro motivo"
                value=""
                onChange={handleInputChange}
              />

              {/* {formData.funcaoGESAT === "Outros" && (
                                <input
                                    type="text"
                                    name="outrosFuncaoGESAT"
                                    placeholder="Descreva outro motivo"
                                    value={formData.outrosFuncaoGESAT}
                                    onChange={handleInputChange}
                                />

                            )} */}
            </div>
            <hr /> {/* Linha horizontal para separar visualmente */}
            <div className="form-group">
              <label className="question-label">
                O servidor (a) está afastado (a) consecutivamente?
              </label>
              <div className="radio-options-inline">
                <label>
                  <input
                    type="radio"
                    name="afastadoConsecutivamente"
                    value="Sim"
                    // Supondo que você terá um estado para isso:
                    checked={formData.afastadoConsecutivamente === "Sim"}
                    onChange={handleInputChange}
                  />{" "}
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    name="afastadoConsecutivamente"
                    value="Não"
                    checked={formData.afastadoConsecutivamente === "Não"}
                    onChange={handleInputChange}
                  />{" "}
                  Não
                </label>

                <input
                  type="text"
                  name="dataAfastamento"
                  placeholder="DD/MM/AAAA"
                  value=""
                  // value={formData.dataAfastamento}
                  onChange={handleInputChange}
                />
                {/* {formData.afastadoConsecutivamente === "Sim" && (

                                    <label>
                                        <p>Data:</p>
                                        <input
                                            type="text"
                                            name="dataAfastamento"
                                            placeholder="DD/MM/AAAA"
                                            value={formData.dataAfastamento}
                                            onChange={handleInputChange}
                                            style={{ width: '180px', justifySelf: 'start', height: '40px' }}
                                        />

                                    </label>

                                )} */}
              </div>
              <hr /> {/* Linha horizontal para separar visualmente */}
              <label className="question-label">
                O servidor (a) encontra-se readaptado?
              </label>
              <div className="radio-options-inline">
                <label>
                  <input
                    type="radio"
                    name="afastadoReadaptado"
                    value="Sim"
                    // Supondo que você terá um estado para isso:
                    checked={formData.afastadoReadaptado === "Sim"}
                    onChange={handleInputChange}
                  />{" "}
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    name="afastadoReadaptado"
                    value="Não"
                    checked={formData.afastadoReadaptado === "Não"}
                    onChange={handleInputChange}
                  />{" "}
                  Não
                </label>
                <input
                  type="text"
                  name="dataAfastamentoReadaptado"
                  placeholder="DD/MM/AAAA"
                  value=""
                  // value={formData.dataAfastamentoReadaptado}
                  onChange={handleInputChange}
                />
                {/* {formData.afastadoReadaptado === "Sim" && (

                                    <label>
                                        <p>Data:</p>
                                        <input
                                            type="text"
                                            name="dataAfastamentoReadaptado"
                                            placeholder="DD/MM/AAAA"
                                            value={formData.dataAfastamentoReadaptado}
                                            onChange={handleInputChange}
                                            style={{ width: '180px', justifySelf: 'start', height: '40px' }}
                                        />

                                    </label>


                                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr /> {/* Linha horizontal para separar visualmente */}
      <div className="form-container">
        <h3>AVALIAÇÃO DO MÉDICO DO TRABALHO</h3>
        <div className="form-grid"></div>

        <div className="form-container">
          <h5 className="text-align-center">DADOS DO PACIENTE</h5>
          <p>Nome:</p>
          <div className="form">
            <input
              type="text"
              name="nomePaciente"
              placeholder="Nome"
              value={formData.nomePaciente}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-container print-version">
          <h5 className="text-align-center">RESULTADO DA AVALIAÇÃO MÉDICA</h5>

          {/* Seção 1: Histórico (Anamnese) */}
          <div className="section-box">
            <label htmlFor="historicoAnamnese">Histórico (Anamnese):</label>
            <textarea
              id="historicoAnamnese"
              value=""
              readOnly
              className="full-width-textarea"
              // O atributo 'rows' foi removido
            ></textarea>
          </div>

          {/* Seção 2: Exames clínico e complementar */}
          <div className="section-box">
            <label htmlFor="examesComplementar">
              Exames clínico e complementar (anexar resultados):
            </label>
            <textarea
              id="examesComplementar"
              value=""
              readOnly
              className="full-width-textarea"
              // O atributo 'rows' foi removido
            ></textarea>
          </div>

          {/* Seção 3: Diagnóstico e observações */}
          <div className="section-box split-section">
            <div className="diagnostico-observacoes">
              <label htmlFor="diagnosticoObservacoes">
                Diagnóstico e observações:
              </label>
              <textarea
                id="diagnosticoObservacoes"
                value=""
                readOnly
                className="full-width-textarea"
                // O atributo 'rows' foi removido
              ></textarea>
            </div>
            {/* ... restante do código ... */}
          </div>

          <div className="section-box split-section">
            <div className="diagnostico-observacoes">
              <label htmlFor="diagnosticoObservacoes">CID 10:</label>
              <textarea
                id="diagnosticoObservacoes"
                value=""
                readOnly
                className="full-width-textarea"
                // O atributo 'rows' foi removido
              ></textarea>
            </div>
            {/* ... restante do código ... */}
          </div>

          {/* ====================================================== */}
          {/* ========= INÍCIO DA NOVA SEÇÃO DO FORMULÁRIO ========= */}
          {/* ====================================================== */}
          <div className="form-container conclusion-section">
            <h4>Conclusão:</h4>
            {/* --- Linha 1: Período solicitado --- */}
            <div className="form-row">
              <label htmlFor="periodoSolicitado">Período solicitado de </label>
              <input
                id="periodoSolicitado"
                type="text"
                className="input-short"
                value=""
                readOnly
              />
              <label htmlFor="periodoInicio">dias, a partir de:</label>
              <input
                id="periodoInicio"
                type="text"
                className="input-date"
                value=""
                readOnly
              />
              <span>/</span>
              <input type="text" className="input-date" value="" readOnly />
              <span>/</span>
              <input
                type="text"
                className="input-date-year"
                value=""
                readOnly
              />
              <span>.</span>
            </div>

            {/* --- Linha 2: Obteve licença --- */}
            <div className="form-row">
              <label htmlFor="obteveDias">Obteve</label>
              <input
                id="obteveDias"
                type="text"
                className="input-short"
                value=""
                readOnly
              />
              <label htmlFor="licencaDe">dias de licença, de:</label>
              <input
                id="licencaDe"
                type="text"
                className="input-date"
                value=""
                readOnly
              />
              <span>/</span>
              <input type="text" className="input-date" value="" readOnly />
              <span>/</span>
              <input
                type="text"
                className="input-date-year"
                value=""
                readOnly
              />
              <label htmlFor="licencaA">a</label>
              <input
                id="licencaA"
                type="text"
                className="input-date"
                value=""
                readOnly
              />
              <span>/</span>
              <input type="text" className="input-date" value="" readOnly />
              <span>/</span>
              <input
                type="text"
                className="input-date-year"
                value=""
                readOnly
              />
              <span>.</span>
            </div>

            {/* --- Linha 3: Licença não concedida --- */}
            <div className="form-row">
              <label htmlFor="motivoLicenca">
                Licença não concedida. Motivo:
              </label>
              <input
                id="motivoLicenca"
                type="text"
                className="input-long"
                value=""
                readOnly
              />
            </div>

            {/* --- Linha 4: Encaminhar para --- */}
            <div className="form-row">
              <label>Encaminhar para:</label>
              <div className="radio-group-inline">
                <input
                  type="radio"
                  id="iprem"
                  name="encaminhar"
                  value="IPREM"
                  disabled
                />
                <label htmlFor="iprem">IPREM</label>
              </div>
              <div className="radio-group-inline">
                <input
                  type="radio"
                  id="inss"
                  name="encaminhar"
                  value="INSS"
                  disabled
                />
                <label htmlFor="inss">INSS</label>
              </div>
              <div className="radio-group-inline">
                <input
                  type="radio"
                  id="outro"
                  name="encaminhar"
                  value="Outro"
                  disabled
                />
                <label htmlFor="encaminharOutro">Outro:</label>
              </div>
              <input
                id="encaminharOutro"
                type="text"
                className="input-long"
                value=""
                readOnly
              />
            </div>

            {/* --- Linha 5: Inapto para --- */}
            <div className="form-row">
              <label htmlFor="inaptoPara">Inapto para a função de:</label>
              <input
                id="inaptoPara"
                type="text"
                className="input-long"
                value=""
                readOnly
              />
            </div>

            {/* --- Linha 6: Apto para --- */}
            <div className="form-row">
              <label htmlFor="aptoPara">Apto para a função de:</label>
              <input
                id="aptoPara"
                type="text"
                className="input-long"
                value=""
                readOnly
              />
            </div>

            {/* --- Linha 7: Outros --- */}
            <div className="form-row">
              <label htmlFor="outrosGeral">Outros:</label>
              <input
                id="outrosGeral"
                type="text"
                className="input-long"
                value=""
                readOnly
              />
            </div>
          </div>

          {/* ====================================================== */}
          {/* =========== INÍCIO DA SEÇÃO DE ASSINATURA ============ */}
          {/* ====================================================== */}
          <div className="signature-container">
            {/* --- Coluna da Esquerda (Data) --- */}
            <div className="date-column">
              <label>
                Data da Avaliação Médica e Homologação do Atestado Médico:
              </label>
              <div className="date-input-group">
                <input type="text" className="date-box" value="" readOnly />
                <span>/</span>
                <input type="text" className="date-box" value="" readOnly />
                <span>/</span>
                <input type="text" className="date-box" value="" readOnly />
                <span>.</span>
              </div>
            </div>

            {/* --- Coluna da Direita (Assinatura) --- */}
            <div className="signature-column">
              <label>Assinatura/Carimbo/CRM do médico de trabalho:</label>
              {/* O espaço em branco para a assinatura é criado pelo CSS */}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleGerarPdfClick}
        className="generate-pdf-button"
        style={{
          marginTop: "1rem",
          display: "block",
          textAlign: "center",
          width: "100%",
          border: "none",
        }}
      >
        Gerar PDF
      </button>
      {documentoPronto && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName="relatorio_inspecao_medica.pdf"
            className="download-link"
          >
            {({ loading }) =>
              loading
                ? "A carregar documento..."
                : "Download Pronto! Clique aqui para transferir."
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default RelatorioInspecaoMedica;
