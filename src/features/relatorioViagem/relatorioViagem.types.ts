export interface Despesa {
  utilizado: string;
  reembolsar: string;
}

export interface DespesaCombustivel extends Despesa {
  quilometragem: string;
}

export interface DespesaAntecipada {
  antecipado: string;
  utilizado: string;
  reembolsar: string;
  devolver: string;
}

export interface FormData {
  nome: string;
  matricula: string;
  cargo: string;
  destino: string;
  dataSaida: string;
  dataRetorno: string;
  meioTransporte: string;
  descricaoAtividades: string;
  despesasAntecipadas: {
    passagem: DespesaAntecipada;
  };
  despesasRealizadas: {
    combustivel: DespesaCombustivel;
    transporteUrbano: Despesa;
    passagem: Despesa;
    pedagio: Despesa;
    estacionamento: Despesa;
  };
}
