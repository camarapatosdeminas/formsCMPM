import { Input, Textarea } from "../../components/ui/Controls";
import { FormSurface } from "../../components/forms/FormSurface";
import { formClasses as cx } from "../../components/forms/formClasses";
import { PdfActions } from "../../components/forms/FormParts";
import { usePdf } from "../../lib/pdf/usePdf";
import { createFormData } from "./inspecaoMedica.defaults";
import type { FormData } from "./inspecaoMedica.types";
import React, { useState } from "react";
const RelatorioInspecaoMedica = () => {
  const [formData, setFormData] = useState<FormData>(createFormData);

  const pdf = usePdf({ formData });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGerarPdfClick = () => {
    void pdf.generate(async ({ formData }) => {
      const { default: Document } =
        await import("../../pdf/RelatorioInspecaoMedicaPdf");
      return <Document formData={formData} />;
    });
  };
  return (
    <FormSurface className={cx("form-container")}>
      <div className={cx("form-section")}>
        <h2>I - Preenchimento do Servidor Público Municipal </h2>
        <div className={cx("form-grid")}>
          <Input
            label="Nome"
            id="nome"
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
          <Input
            label="Matrícula"
            id="matricula"
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleInputChange}
          />
          <Input
            label="CPF"
            id="cpf"
            mask="cpf"
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleInputChange}
          />
          <div className={cx("form-grid")}>
            <p> Admissão</p>
            <Input
              label="Admissão"
              id="admissao"
              type="date"
              name="admissao"
              placeholder="Admissão"
              value={formData.admissao}
              onChange={handleInputChange}
            />
          </div>
          <Input
            label="Regime"
            id="regime"
            type="text"
            name="regime"
            placeholder="Regime"
            value={formData.regime}
            onChange={handleInputChange}
          />

          <div className={cx("form-grid")}>
            <p> Data de Nascimento</p>
            <Input
              label="Data Nascimento"
              id="data"
              type="date"
              name="data"
              placeholder="Data Nascimento"
              value={formData.data}
              onChange={handleInputChange}
            />
          </div>

          <Input
            label="Sexo"
            id="sexo"
            type="text"
            name="sexo"
            placeholder="Sexo"
            value={formData.sexo}
            onChange={handleInputChange}
          />

          <Input
            label="Estado Civil"
            id="estadoCivil"
            type="text"
            name="estadoCivil"
            placeholder="Estado Civil"
            value={formData.estadoCivil}
            onChange={handleInputChange}
          />

          <Input
            label="Cargo"
            id="cargo"
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleInputChange}
          />

          <Input
            label="Função"
            id="funcao"
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

          <Input
            label="Lotação"
            id="lotacao"
            type="text"
            name="lotacao"
            placeholder="Lotação"
            value={formData.lotacao}
            onChange={handleInputChange}
          />
        </div>
        <hr /> {/* Linha horizontal para separar visualmente */}
        <div className={cx("form-container")}>
          <div className={cx("form-grid")}>
            <Input
              label="Endereço"
              id="endereco"
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={formData.endereco}
              onChange={handleInputChange}
            />

            <Input
              label="Nº"
              id="numeroCasa"
              type="text"
              name="numeroCasa"
              placeholder="Nº"
              value={formData.numeroCasa}
              onChange={handleInputChange}
            />

            <Input
              label="Bairro"
              id="bairro"
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={handleInputChange}
            />

            <Input
              label="Complemento"
              id="complemento"
              type="text"
              name="complemento"
              placeholder="Complemento"
              value={formData.complemento}
              onChange={handleInputChange}
            />

            <Input
              label="Email"
              id="emailServidor"
              type="text"
              name="emailServidor"
              placeholder="Email"
              value={formData.emailServidor}
              onChange={handleInputChange}
            />
            <Input
              label="Contato (Telefone)"
              id="contato"
              mask="phone"
              type="text"
              name="contato"
              placeholder="Contato (Telefone)"
              value={formData.contato}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <hr /> {/* Linha horizontal para separar visualmente */}
        <div className={cx("form-container")}>
          <fieldset className={cx("radio-group")}>
            <legend>Tem férias agendadas nos próximos 30 dias ?</legend>
            <label>
              <Input
                bare
                type="radio"
                name="funcaoConfianca"
                value="sim"
                checked={formData.funcaoConfianca === "sim"}
                onChange={handleInputChange}
              />{" "}
              Sim
            </label>
            <label>
              <Input
                bare
                type="radio"
                name="funcaoConfianca"
                value="nao"
                checked={formData.funcaoConfianca === "nao"}
                onChange={handleInputChange}
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
          </fieldset>

          {formData.funcaoConfianca === "sim" && (
            <div className={cx("conditional-input")}>
              <label>
                <p>Data Saída</p>
                <Input
                  bare
                  id="dataSaida"
                  type="date"
                  name="dataSaida"
                  placeholder="Data Saída"
                  value={formData.dataSaida}
                  onChange={handleInputChange}
                />
                <p>Data Retorno</p>
                <Input
                  bare
                  id="dataRetorno"
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
        <div className={cx("form-container")}>
          <p>Data:</p>
          <div className={cx("form-grid")}>
            <Input
              label="DD/MM/AAAA"
              id="dataAssinaturaServidor"
              className={cx("input-data")}
              type="date"
              name="dataAssinaturaServidor"
              placeholder="DD/MM/AAAA"
              value={formData.dataAssinaturaServidor}
              onChange={handleInputChange}
            />
            <div className={cx("bloco-assinatura")}>
              <div className={cx("linha-assinatura")}></div>

              <p className={cx("texto-assinatura")}>Assinatura do Servidor</p>
            </div>
          </div>
        </div>
        <hr /> {/* Linha horizontal para separar visualmente */}
      </div>
      <div className={cx("form-container")}>
        <h3>II - PREENCHIMENTO DA CHEFIA IMEDIATA </h3>
        <div className={cx("form-grid")}>
          <p>Descreva as funções exercidas pelo servidor:</p>
        </div>

        <Textarea
          label="Descrição das funções"
          id="descricaoFuncao"
          value=""
          readOnly
          className={cx("full-width-textarea")}
        ></Textarea>

        <div className={cx("form-container")}>
          <p>Data:</p>
          <div className={cx("form-grid")}>
            <Input
              label="DD/MM/AAAA"
              id="dataAssinaturaChefe"
              type="text"
              name="dataAssinaturaChefe"
              placeholder="DD/MM/AAAA"
              value=""
              // value={formData.dataAssinaturaChefe}
              onChange={handleInputChange}
            />

            <div className={cx("bloco-assinatura")}>
              <div className={cx("linha-assinatura")}></div>

              <p className={cx("texto-assinatura")}>
                Assinatura e Carimbo da Chefia Imediata
              </p>
            </div>
          </div>
        </div>

        <div className={cx("form-container")}>
          <h3>III - PREENCHIMENTO DA GESAT/MEDICINA DO TRABALHO </h3>
          <div className={cx("split-container")}>
            {/* Coluna da Esquerda */}
            <div className={cx("left-column")}>
              <label>
                <Input
                  bare
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={formData.funcaoGESAT === "Admissional"}
                  onChange={handleInputChange}
                />{" "}
                Admissional
              </label>

              <label>
                <Input
                  bare
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={formData.funcaoGESAT === "Demissional"}
                  onChange={handleInputChange}
                />{" "}
                Demissional
              </label>

              <label>
                <Input
                  bare
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={formData.funcaoGESAT === "Periódico"}
                  onChange={handleInputChange}
                />{" "}
                Periódico
              </label>

              <label>
                <Input
                  bare
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={
                    formData.funcaoGESAT === "Readaptacao / Restricao Medica"
                  }
                  onChange={handleInputChange}
                />{" "}
                Readaptacao / Restricao Médica
              </label>

              <label>
                <Input
                  bare
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={
                    formData.funcaoGESAT === "Licenca por Acidente de Trabalho"
                  }
                  onChange={handleInputChange}
                />{" "}
                Licença por Acidente de Trabalho
              </label>

              <label>
                <Input
                  bare
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={
                    formData.funcaoGESAT === "Licenca para Tratamento de Saude"
                  }
                  onChange={handleInputChange}
                />{" "}
                Licenca para Tratamento de Saude
              </label>

              <label>
                <Input
                  bare
                  type="radio"
                  name="funcaoGESAT"
                  value=""
                  checked={formData.funcaoGESAT === "Outros"}
                  onChange={handleInputChange}
                />{" "}
                Outros
              </label>

              <Input
                label="Descreva outro motivo"
                id="outrosFuncaoGESAT"
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
            <div className={cx("form-group")}>
              <p className={cx("question-label")}>
                O servidor (a) está afastado (a) consecutivamente?
              </p>
              <div className={cx("radio-options-inline")}>
                <label>
                  <Input
                    bare
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
                  <Input
                    bare
                    type="radio"
                    name="afastadoConsecutivamente"
                    value="Não"
                    checked={formData.afastadoConsecutivamente === "Não"}
                    onChange={handleInputChange}
                  />{" "}
                  Não
                </label>

                <Input
                  label="DD/MM/AAAA"
                  id="dataAfastamento"
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
              <p className={cx("question-label")}>
                O servidor (a) encontra-se readaptado?
              </p>
              <div className={cx("radio-options-inline")}>
                <label>
                  <Input
                    bare
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
                  <Input
                    bare
                    type="radio"
                    name="afastadoReadaptado"
                    value="Não"
                    checked={formData.afastadoReadaptado === "Não"}
                    onChange={handleInputChange}
                  />{" "}
                  Não
                </label>
                <Input
                  label="DD/MM/AAAA"
                  id="dataAfastamentoReadaptado"
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
      <div className={cx("form-container")}>
        <h2>AVALIAÇÃO DO MÉDICO DO TRABALHO</h2>
        <div className={cx("form-grid")}></div>

        <div className={cx("form-container")}>
          <h5 className={cx("text-align-center")}>DADOS DO PACIENTE</h5>
          <p>Nome:</p>
          <div className={cx("form")}>
            <Input
              label="Nome"
              id="nomePaciente"
              type="text"
              name="nomePaciente"
              placeholder="Nome"
              value={formData.nomePaciente}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={cx("form-container print-version")}>
          <h5 className={cx("text-align-center")}>
            RESULTADO DA AVALIAÇÃO MÉDICA
          </h5>

          {/* Seção 1: Histórico (Anamnese) */}
          <div className={cx("section-box")}>
            <Textarea
              label={<span>Histórico (Anamnese):</span>}
              id="historicoAnamnese"
              value=""
              readOnly
              className={cx("full-width-textarea")}
              // O atributo 'rows' foi removido
            ></Textarea>
          </div>

          {/* Seção 2: Exames clínico e complementar */}
          <div className={cx("section-box")}>
            <Textarea
              label={
                <span>Exames clínico e complementar (anexar resultados):</span>
              }
              id="examesComplementar"
              value=""
              readOnly
              className={cx("full-width-textarea")}
              // O atributo 'rows' foi removido
            ></Textarea>
          </div>

          {/* Seção 3: Diagnóstico e observações */}
          <div className={cx("section-box split-section")}>
            <div className={cx("diagnostico-observacoes")}>
              <Textarea
                label={<span>Diagnóstico e observações:</span>}
                id="diagnosticoObservacoes"
                value=""
                readOnly
                className={cx("full-width-textarea")}
                // O atributo 'rows' foi removido
              ></Textarea>
            </div>
            {/* ... restante do código ... */}
          </div>

          <div className={cx("section-box split-section")}>
            <div className={cx("diagnostico-observacoes")}>
              <Textarea
                label={<span>CID 10:</span>}
                id="cid10"
                value=""
                readOnly
                className={cx("full-width-textarea")}
                // O atributo 'rows' foi removido
              ></Textarea>
            </div>
            {/* ... restante do código ... */}
          </div>

          {/* ====================================================== */}
          {/* ========= INÍCIO DA NOVA SEÇÃO DO FORMULÁRIO ========= */}
          {/* ====================================================== */}
          <div className={cx("form-container conclusion-section")}>
            <h3>Conclusão:</h3>
            {/* --- Linha 1: Período solicitado --- */}
            <div className={cx("form-row")}>
              <Input
                label={<span>Período solicitado de </span>}
                id="periodoSolicitado"
                type="text"
                className={cx("input-short")}
                value=""
                readOnly
              />

              <Input
                label={<span>dias, a partir de:</span>}
                id="periodoInicio"
                type="text"
                className={cx("input-date")}
                value=""
                readOnly
              />
              <span>/</span>
              <Input
                label="Informação"
                type="text"
                className={cx("input-date")}
                value=""
                readOnly
              />
              <span>/</span>
              <Input
                label="Informação"
                type="text"
                className={cx("input-date-year")}
                value=""
                readOnly
              />
              <span>.</span>
            </div>

            {/* --- Linha 2: Obteve licença --- */}
            <div className={cx("form-row")}>
              <Input
                label={<span>Obteve</span>}
                id="obteveDias"
                type="text"
                className={cx("input-short")}
                value=""
                readOnly
              />

              <Input
                label={<span>dias de licença, de:</span>}
                id="licencaDe"
                type="text"
                className={cx("input-date")}
                value=""
                readOnly
              />
              <span>/</span>
              <Input
                label="Informação"
                type="text"
                className={cx("input-date")}
                value=""
                readOnly
              />
              <span>/</span>
              <Input
                label="Informação"
                type="text"
                className={cx("input-date-year")}
                value=""
                readOnly
              />

              <Input
                label={<span>a</span>}
                id="licencaA"
                type="text"
                className={cx("input-date")}
                value=""
                readOnly
              />
              <span>/</span>
              <Input
                label="Informação"
                type="text"
                className={cx("input-date")}
                value=""
                readOnly
              />
              <span>/</span>
              <Input
                label="Informação"
                type="text"
                className={cx("input-date-year")}
                value=""
                readOnly
              />
              <span>.</span>
            </div>

            {/* --- Linha 3: Licença não concedida --- */}
            <div className={cx("form-row")}>
              <Input
                label={<span>Licença não concedida. Motivo:</span>}
                id="motivoLicenca"
                type="text"
                className={cx("input-long")}
                value=""
                readOnly
              />
            </div>

            {/* --- Linha 4: Encaminhar para --- */}
            <div className={cx("form-row")}>
              <p>Encaminhar para:</p>
              <div className={cx("radio-group-inline")}>
                <Input
                  type="radio"
                  id="iprem"
                  name="encaminhar"
                  value="IPREM"
                  disabled
                />
                <label htmlFor="iprem">IPREM</label>
              </div>
              <div className={cx("radio-group-inline")}>
                <Input
                  type="radio"
                  id="inss"
                  name="encaminhar"
                  value="INSS"
                  disabled
                />
                <label htmlFor="inss">INSS</label>
              </div>
              <div className={cx("radio-group-inline")}>
                <Input
                  type="radio"
                  id="outro"
                  name="encaminhar"
                  value="Outro"
                  disabled
                />
                <label htmlFor="outro">Outro:</label>
              </div>
              <Input
                label="Outro encaminhamento"
                id="encaminharOutro"
                type="text"
                className={cx("input-long")}
                value=""
                readOnly
              />
            </div>

            {/* --- Linha 5: Inapto para --- */}
            <div className={cx("form-row")}>
              <Input
                label={<span>Inapto para a função de:</span>}
                id="inaptoPara"
                type="text"
                className={cx("input-long")}
                value=""
                readOnly
              />
            </div>

            {/* --- Linha 6: Apto para --- */}
            <div className={cx("form-row")}>
              <Input
                label={<span>Apto para a função de:</span>}
                id="aptoPara"
                type="text"
                className={cx("input-long")}
                value=""
                readOnly
              />
            </div>

            {/* --- Linha 7: Outros --- */}
            <div className={cx("form-row")}>
              <Input
                label={<span>Outros:</span>}
                id="outrosGeral"
                type="text"
                className={cx("input-long")}
                value=""
                readOnly
              />
            </div>
          </div>

          {/* ====================================================== */}
          {/* =========== INÍCIO DA SEÇÃO DE ASSINATURA ============ */}
          {/* ====================================================== */}
          <div className={cx("signature-container")}>
            {/* --- Coluna da Esquerda (Data) --- */}
            <div className={cx("date-column")}>
              <p>Data da Avaliação Médica e Homologação do Atestado Médico:</p>
              <div className={cx("date-input-group")}>
                <Input
                  label="Informação"
                  type="text"
                  className={cx("date-box")}
                  value=""
                  readOnly
                />
                <span>/</span>
                <Input
                  label="Informação"
                  type="text"
                  className={cx("date-box")}
                  value=""
                  readOnly
                />
                <span>/</span>
                <Input
                  label="Informação"
                  type="text"
                  className={cx("date-box")}
                  value=""
                  readOnly
                />
                <span>.</span>
              </div>
            </div>

            {/* --- Coluna da Direita (Assinatura) --- */}
            <div className={cx("signature-column")}>
              <p>Assinatura/Carimbo/CRM do médico de trabalho:</p>
              {/* O espaço em branco para a assinatura é criado pelo CSS */}
            </div>
          </div>
        </div>
      </div>
      <PdfActions
        {...pdf}
        onGenerate={handleGerarPdfClick}
        fileName="relatorio_inspecao_medica.pdf"
      />
    </FormSurface>
  );
};

export default RelatorioInspecaoMedica;
