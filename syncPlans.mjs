import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://frhlkmivnjtcdidyvfxf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGxrbWl2bmp0Y2RpZHl2ZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTI4MjAsImV4cCI6MjA4NzM4ODgyMH0.Wte0Z5G_T-0VSpfZzSHv8axVYQ7yzRLYQcHNgqxPwB4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function updatePlans() {
  console.log("Iniciando limpeza dos planos...");
  
  // Como não temos a service role key aqui (presumindo anon), vamos tentar atualizar os que já existem
  // Ou melhor, vou inserir se não houver conflito ou atualizar por ID.
  const plans = [
    { id: 'plan_basic', name: 'Plano Básico', price: 0.00, type: 'individual', duration_days: 30, max_properties: 1, max_photos: 5, lead_price: 4.99 },
    { id: 'plan_pro', name: 'Plano PRO', price: 29.99, type: 'professional', duration_days: 30, max_properties: 5, max_photos: 10, lead_price: 2.99 },
    { id: 'plan_premium', name: 'Plano Agência Premium', price: 49.99, type: 'premium', duration_days: 30, max_properties: 10, max_photos: 15, lead_price: 0.00 }
  ];

  for (const plan of plans) {
    const { error } = await supabase.from('plans').upsert(plan, { onConflict: 'id' });
    if (error) console.log(`ERRO NO PLANO ${plan.id}:`, error.message);
    else console.log(`SUCESSO NO PLANO ${plan.id}`);
  }
}

updatePlans();
