import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Empresa = Database["public"]["Tables"]["empresas"]["Row"];
export type EmpresaInsert = Database["public"]["Tables"]["empresas"]["Insert"];
export type Competencia = Database["public"]["Tables"]["competencias"]["Row"];
export type CompetenciaInsert = Database["public"]["Tables"]["competencias"]["Insert"];
export type Faturamento = Database["public"]["Tables"]["faturamentos"]["Row"];
export type FaturamentoInsert = Database["public"]["Tables"]["faturamentos"]["Insert"];

export type Categoria = Database["public"]["Enums"]["categoria_empresa"];
export type TipoFaturamento = Database["public"]["Enums"]["tipo_faturamento"];
export type StatusFaturamento = Database["public"]["Enums"]["status_faturamento"];
export type StatusCompetencia = Database["public"]["Enums"]["status_competencia"];

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
  sem_cadastro: "Não possui cadastro",
};

export const STATUS_COLORS: Record<StatusFaturamento, string> = {
  pendente: "bg-warning/20 text-warning",
  aguardando_oc: "bg-warning/20 text-warning",
  conferencia: "bg-info/20 text-info",
  faturado: "bg-primary/20 text-primary",
  pago_avista: "bg-success/20 text-success",
  concluido: "bg-success text-white",
  sem_cadastro: "bg-destructive/20 text-destructive",
};

export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

// API functions
export async function fetchEmpresas() {
  const { data, error } = await supabase.from("empresas").select("*").order("nome_empresa");
  if (error) throw error;
  return data;
}

export async function insertEmpresa(empresa: EmpresaInsert) {
  const { data, error } = await supabase.from("empresas").insert(empresa).select().single();
  if (error) throw error;
  return data;
}

export async function insertEmpresasBulk(empresas: EmpresaInsert[]) {
  const { data, error } = await supabase.from("empresas").insert(empresas).select();
  if (error) throw error;
  return data;
}

export async function fetchCompetencias() {
  const { data, error } = await supabase.from("competencias").select("*").order("ano", { ascending: false }).order("mes", { ascending: false });
  if (error) throw error;
  return data;
}

export async function insertCompetencia(comp: CompetenciaInsert) {
  const { data, error } = await supabase.from("competencias").insert(comp).select().single();
  if (error) throw error;
  return data;
}

export async function fetchFaturamentos(competenciaId: string) {
  const { data, error } = await supabase
    .from("faturamentos")
    .select("*, empresa_executora:empresas!faturamentos_empresa_executora_id_fkey(*), empresa_faturadora:empresas!faturamentos_empresa_faturadora_id_fkey(*)")
    .eq("competencia_id", competenciaId);
  if (error) throw error;
  return data;
}

export async function updateFaturamentoStatus(id: string, status: StatusFaturamento) {
  const { error } = await supabase.from("faturamentos").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function insertFaturamento(fat: FaturamentoInsert) {
  const { data, error } = await supabase.from("faturamentos").insert(fat).select().single();
  if (error) throw error;
  return data;
}

export async function updateEmpresa(id: string, updates: Partial<EmpresaInsert>) {
  const { error } = await supabase.from("empresas").update(updates).eq("id", id);
  if (error) throw error;
}

export async function deleteEmpresa(id: string) {
  const { error } = await supabase.from("empresas").delete().eq("id", id);
  if (error) throw error;
}

export type FaturamentoUpdate = Database["public"]["Tables"]["faturamentos"]["Update"];

export async function updateFaturamento(id: string, updates: FaturamentoUpdate) {
  const { error } = await supabase.from("faturamentos").update(updates).eq("id", id);
  if (error) throw error;
}
