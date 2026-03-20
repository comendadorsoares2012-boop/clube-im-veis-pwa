-- Limpa planos antigos e insere os novos com a estrutura solicitada
TRUNCATE TABLE public.plans CASCADE;

INSERT INTO public.plans (id, name, price, type, duration_days)
VALUES 
  ('plan_basic', 'Plano Básico', 0.00, 'individual', 30),
  ('plan_pro', 'Plano PRO', 29.99, 'professional', 30),
  ('plan_premium', 'Plano Agência Premium', 49.99, 'premium', 30);

-- Adiciona colunas para controle de limites se não existirem
ALTER TABLE public.plans 
ADD COLUMN IF NOT EXISTS max_properties INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS max_photos INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS lead_price NUMERIC DEFAULT 4.99;

-- Atualiza os limites específicos de cada plano
UPDATE public.plans SET max_properties = 1, max_photos = 5, lead_price = 4.99 WHERE id = 'plan_basic';
UPDATE public.plans SET max_properties = 5, max_photos = 10, lead_price = 2.99 WHERE id = 'plan_pro';
UPDATE public.plans SET max_properties = 10, max_photos = 15, lead_price = 0.00 WHERE id = 'plan_premium'; -- 15 fotos para premium ou o que desejar
