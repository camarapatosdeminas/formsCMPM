import type { FormData } from "./relatorioViagem.types";
export const createFormData = (): FormData => ({
  nome: "",
  matricula: "",
  cargo: "",
  destino: "",
  dataSaida: "",
  dataRetorno: "",
  meioTransporte: "",
  descricaoAtividades: "",
  despesasAntecipadas: {
    passagem: { antecipado: "", utilizado: "", reembolsar: "", devolver: "" },
  },
  despesasRealizadas: {
    combustivel: { utilizado: "", reembolsar: "", quilometragem: "" },
    transporteUrbano: { utilizado: "", reembolsar: "" },
    passagem: { utilizado: "", reembolsar: "" },
    pedagio: { utilizado: "", reembolsar: "" },
    estacionamento: { utilizado: "", reembolsar: "" },
  },
});
