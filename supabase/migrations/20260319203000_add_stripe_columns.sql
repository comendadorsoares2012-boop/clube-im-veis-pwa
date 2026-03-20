-- Adiciona colunas para identificar transações do Stripe
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS stripe_id TEXT;

ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS stripe_id TEXT;

-- Garante que o bucket para imagens de imóveis exista (caso não tenha sido criado)
-- (Supabase migrations rodando com privilégios podem acessar storage.buckets)
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Adiciona políticas de storage (caso faltem)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Public Access Images') THEN
        CREATE POLICY "Public Access Images" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Authenticated Upload') THEN
        CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');
    END IF;
END $$;
