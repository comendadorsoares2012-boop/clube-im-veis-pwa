import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://frhlkmivnjtcdidyvfxf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGxrbWl2bmp0Y2RpZHl2ZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTI4MjAsImV4cCI6MjA4NzM4ODgyMH0.Wte0Z5G_T-0VSpfZzSHv8axVYQ7yzRLYQcHNgqxPwB4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  const { data, error } = await supabase.from('properties').select('title, created_at').order('created_at', {ascending: false}).limit(1);
  console.log(JSON.stringify(data, null, 2));
}

check();
