import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://frhlkmivnjtcdidyvfxf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGxrbWl2bmp0Y2RpZHl2ZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTI4MjAsImV4cCI6MjA4NzM4ODgyMH0.Wte0Z5G_T-0VSpfZzSHv8axVYQ7yzRLYQcHNgqxPwB4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seedPlans() {
  const { data: auth, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'douglas@clubeimoveis.com',
    password: 'adminsuperuser123'
  });

  if (authErr) {
    console.log("ERRO AUTH:", authErr.message);
    return;
  }

  const plans = [
    { name: "Plano Individual", price: 49.90, type: "individual", duration_days: 30 },
    { name: "Plano Premium Mensal", price: 199.90, type: "premium", duration_days: 30 },
    { name: "Plano Agência PRO", price: 499.90, type: "premium", duration_days: 30 }
  ];

  console.log("Inserindo planos iniciais...");
  const { error } = await supabase.from('plans').insert(plans);
  
  if (error) {
    console.log("ERRO SEED:", error.message);
  } else {
    console.log("SUCESSO: Planos criados!");
  }
}

seedPlans();
