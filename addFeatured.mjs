import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://frhlkmivnjtcdidyvfxf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGxrbWl2bmp0Y2RpZHl2ZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTI4MjAsImV4cCI6MjA4NzM4ODgyMH0.Wte0Z5G_T-0VSpfZzSHv8axVYQ7yzRLYQcHNgqxPwB4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function addPremiumProperty() {
  console.log("Adicionando Imóvel Premium de Destaque...");
  
  const { data: prop, error: pError } = await supabase.from('properties').insert({
    title: "Casa de Transição Premium - Miguel Couto",
    description: "Excelente residência com acabamento de alto padrão, duplex, área gourmet e ótima localização em Nova Iguaçu.",
    price: 980000,
    type: "sale",
    property_type: "house",
    neighborhood: "Miguel Couto",
    city: "Nova Iguaçu",
    bedrooms: 4,
    bathrooms: 3,
    parking_spaces: 2,
    size: 250,
    status: "premium"
  }).select().single();

  if (pError) {
    console.error("ERRO AO INSERIR:", pError.message);
    return;
  }

  // Inserir imagem faker
  const { error: iError } = await supabase.from('property_images').insert({
    property_id: prop.id,
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    position: 0
  });

  if (iError) console.error("ERRO IMAGEM:", iError.message);
  else console.log("Imóvel adicionado com SUCESSO aos Destaques!");
}

addPremiumProperty();
