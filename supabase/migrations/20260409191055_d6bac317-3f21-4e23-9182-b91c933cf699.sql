CREATE TYPE public.categoria_empresa AS ENUM (
  'medwork', 'medwork_porto', 'avista', 'especial', 'credenciada', 'mensalidade', 'labore'
);

CREATE TYPE public.tipo_faturamento AS ENUM ('propria_empresa', 'outra_empresa');

CREATE TYPE public.status_faturamento AS ENUM (
  'pendente', 'aguardando_oc', 'conferencia', 'faturado', 'pago_avista', 'concluido'
);

CREATE TYPE public.status_competencia AS ENUM ('aberto', 'concluido');

CREATE TABLE public.empresas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_empresa TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  categoria categoria_empresa NOT NULL,
  tipo_faturamento tipo_faturamento NOT NULL DEFAULT 'propria_empresa',
  empresa_faturadora_id UUID REFERENCES public.empresas(id),
  observacoes TEXT,
  ativa BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.competencias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mes INTEGER NOT NULL CHECK (mes >= 1 AND mes <= 12),
  ano INTEGER NOT NULL,
  status status_competencia NOT NULL DEFAULT 'aberto',
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (mes, ano)
);

CREATE TABLE public.faturamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  competencia_id UUID NOT NULL REFERENCES public.competencias(id) ON DELETE CASCADE,
  empresa_executora_id UUID NOT NULL REFERENCES public.empresas(id),
  empresa_faturadora_id UUID NOT NULL REFERENCES public.empresas(id),
  categoria_snapshot TEXT NOT NULL,
  link_relatorio_eso TEXT,
  status status_faturamento NOT NULL DEFAULT 'pendente',
  observacoes_mes TEXT,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.importacoes_eso (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  competencia_id UUID NOT NULL REFERENCES public.competencias(id),
  nome_arquivo TEXT NOT NULL,
  data_importacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id)
);

ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faturamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.importacoes_eso ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read empresas" ON public.empresas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert empresas" ON public.empresas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update empresas" ON public.empresas FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read competencias" ON public.competencias FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert competencias" ON public.competencias FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update competencias" ON public.competencias FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read faturamentos" ON public.faturamentos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert faturamentos" ON public.faturamentos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update faturamentos" ON public.faturamentos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete faturamentos" ON public.faturamentos FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read importacoes_eso" ON public.importacoes_eso FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert importacoes_eso" ON public.importacoes_eso FOR INSERT TO authenticated WITH CHECK (true);

CREATE INDEX idx_faturamentos_competencia ON public.faturamentos(competencia_id);
CREATE INDEX idx_faturamentos_executora ON public.faturamentos(empresa_executora_id);
CREATE INDEX idx_empresas_cnpj ON public.empresas(cnpj);
CREATE INDEX idx_competencias_mes_ano ON public.competencias(mes, ano);