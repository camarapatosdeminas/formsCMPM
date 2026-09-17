import type { FormData } from "./solicitacaoEstagiario.types";
export const createFormData = (): FormData => ({
  setor: "",
  areaEstagio: "",
  supervisor: "",
  cargo: "",
  horario: "",
  duracao: "",
  atividades: "",
  habilidades: "",
  justificativa: "",
  remunerado: "sim",
  vagas: "",
  opcoesCurso: [
    { id: 1, curso: "", periodo: "", nivel: "graduacao" },
    { id: 2, curso: "", periodo: "", nivel: "graduacao" },
    { id: 3, curso: "", periodo: "", nivel: "graduacao" },
  ],
});
