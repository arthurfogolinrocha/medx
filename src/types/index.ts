export type Categoria =
  | "medwork"
  | "medwork_porto"
  | "avista"
  | "especial"
  | "credenciada"
  | "mensalidade"
  | "labore";

export type TipoFaturamento = "propria_empresa" | "outra_empresa";

export type StatusFaturamento =
  | "pendente"
  | "aguardando_oc"
  | "conferencia"
  | "faturado"
  | "pago_avista"
  | "concluido";

export type StatusCompetencia = "aberto" | "concluido";

export interface Empresa {
  id: string;
  nome_empresa: string;
  cnpj: string;
  categoria: Categoria;
  tipo_faturamento: TipoFaturamento;
  empresa_faturadora_id?: string;
  observacoes?: string;
  ativa: boolean;
  criado_em: string;
}

export interface Competencia {
  id: string;
  mes: number;
  ano: number;
  status: StatusCompetencia;
  criado_em: string;
}

export interface Faturamento {
  id: string;
  competencia_id: string;
  empresa_executora_id: string;
  empresa_faturadora_id: string;
  categoria_snapshot: Categoria;
  link_relatorio_eso?: string;
  status: StatusFaturamento;
  observacoes_mes?: string;
  criado_em: string;
  // Joined
  empresa_executora?: Empresa;
  empresa_faturadora?: Empresa;
}

export interface ImportacaoEso {
  id: string;
  competencia_id: string;
  nome_arquivo: string;
  data_importacao: string;
  usuario_id: string;
}

export const CATEGORIA_LABELS: Record<Categoria, string> = {
  medwork: "MedWork",
  medwork_porto: "MedWork Porto",
  avista: "À Vista",
  especial: "Especial",
  credenciada: "Credenciada",
  mensalidade: "Mensalidade",
  labore: "Labore",
};

export const STATUS_LABELS: Record<StatusFaturamento, string> = {
  pendente: "Pendente",
  aguardando_oc: "Aguardando OC",
  conferencia: "Conferência",
  faturado: "Faturado",
  pago_avista: "Pago à Vista",
  concluido: "Concluído",
};

export const STATUS_COLORS: Record<StatusFaturamento, string> = {
  pendente: "bg-muted text-muted-foreground",
  aguardando_oc: "bg-warning/20 text-warning",
  conferencia: "bg-info/20 text-info",
  faturado: "bg-primary/20 text-primary",
  pago_avista: "bg-success/20 text-success",
  concluido: "bg-success text-white",
};

export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
