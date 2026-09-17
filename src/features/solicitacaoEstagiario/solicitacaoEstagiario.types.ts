export interface OpcaoCurso {
  id: number;
  curso: string;
  periodo: string;
  nivel: "graduacao" | "pos";
}

export interface FormData {
  setor: string;
  areaEstagio: string;
  supervisor: string;
  cargo: string;
  horario: string;
  duracao: string;
  atividades: string;
  habilidades: string;
  justificativa: string;
  remunerado: "sim" | "nao";
  vagas: string;
  opcoesCurso: OpcaoCurso[];
}
