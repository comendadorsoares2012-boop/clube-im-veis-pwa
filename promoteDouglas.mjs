import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://frhlkmivnjtcdidyvfxf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGxrbWl2bmp0Y2RpZHl2ZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTI4MjAsImV4cCI6MjA4NzM4ODgyMH0.Wte0Z5G_T-0VSpfZzSHv8axVYQ7yzRLYQcHNgqxPwB4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function promoteAdmin() {
  console.log("Tentando promover Douglas a Admin...");
  
  // Primeiro tentamos logar para ter permissão (já que a política de INSERT permite se for o próprio ID, 
  // e de UPDATE também permite se for o próprio ID)
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'douglas@clubeimoveis.com',
    password: 'adminsuperuser123',
  });

  if (authError || !authData.user) {
    console.log("ERRO AUTH:", authError?.message);
    return;
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .eq('id', authData.user.id);

  if (updateError) {
    console.log("ERRO AO PROMOVER:", updateError.message);
  } else {
    console.log("SUCESSO: Douglas promovido a Admin!");
  }
}

promoteAdmin();
