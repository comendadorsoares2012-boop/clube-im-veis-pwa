import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://frhlkmivnjtcdidyvfxf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGxrbWl2bmp0Y2RpZHl2ZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTI4MjAsImV4cCI6MjA4NzM4ODgyMH0.Wte0Z5G_T-0VSpfZzSHv8axVYQ7yzRLYQcHNgqxPwB4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkStatus() {
  const { data: users, error: uError } = await supabase.from('users').select('id, email, name');
  console.log("USERS:", users);

  const { data: subs, error: sError } = await supabase.from('subscriptions').select('*');
  console.log("SUBS:", subs);

  const { data: payments, error: pError } = await supabase.from('payments').select('*');
  console.log("PAYMENTS:", payments);
}

checkStatus();
