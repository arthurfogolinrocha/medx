-- Allow authenticated users to delete empresas
CREATE POLICY "Authenticated users can delete empresas"
ON public.empresas
FOR DELETE
TO authenticated
USING (true);

-- Add valor column to faturamentos
ALTER TABLE public.faturamentos ADD COLUMN IF NOT EXISTS valor numeric DEFAULT 0;