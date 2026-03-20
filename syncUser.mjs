import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://frhlkmivnjtcdidyvfxf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGxrbWl2bmp0Y2RpZHl2ZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTI4MjAsImV4cCI6MjA4NzM4ODgyMH0.Wte0Z5G_T-0VSpfZzSHv8axVYQ7yzRLYQcHNgqxPwB4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function syncUser() {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'douglas@clubeimoveis.com',
    password: 'adminsuperuser123',
  });

  if (authError || !authData.user) {
    console.log("ERRO AUTH:", authError?.message);
    return;
  }

  const { error: upsertError } = await supabase.from('users').upsert({
    id: authData.user.id,
    name: 'Douglas Administrador',
    email: 'douglas@clubeimoveis.com',
    role: 'admin'
  });

  if (upsertError) {
    console.log("ERRO DB:", upsertError.message);
  } else {
    console.log("SUCESSO: Sincronizado!");
  }
}

syncUser();
