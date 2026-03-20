-- Adiciona colunas de latitude e longitude na tabela de properties
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Atualiza imóveis existentes com coordenadas aleatórias aproximadas de Nova Iguaçu para fins de teste
UPDATE public.properties 
SET 
  latitude = -22.75 + (random() * 0.1 - 0.05),
  longitude = -43.45 + (random() * 0.1 - 0.05)
WHERE latitude IS NULL;
