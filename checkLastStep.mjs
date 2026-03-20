import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://frhlkmivnjtcdidyvfxf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaGxrbWl2bmp0Y2RpZHl2ZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTI4MjAsImV4cCI6MjA4NzM4ODgyMH0.Wte0Z5G_T-0VSpfZzSHv8axVYQ7yzRLYQcHNgqxPwB4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkResources() {
  console.log("Verificando recursos no Supabase...");
  
  // 1. Check Tables
  const { data: properties, error: dbError } = await supabase.from('properties').select('id').limit(1);
  if (dbError) {
    console.log("DB_CHECK:", "ERRO", dbError.message);
  } else {
    console.log("DB_CHECK:", "TABELAS EXISTEM");
  }

  // 2. Check Storage Bucket
  const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
  if (storageError) {
    console.log("STORAGE_CHECK:", "ERRO", storageError.message);
  } else {
    const bucketExists = buckets.some(b => b.id === 'property-images');
    console.log("STORAGE_CHECK:", bucketExists ? "BUCKET 'property-images' EXISTE" : "BUCKET NÃO ENCONTRADO");
  }

  // 3. User Role in Table
  const { data: userData, error: userError } = await supabase.from('users').select('id, role').eq('email', 'douglas@clubeimoveis.com').single();
  if (userError) {
    console.log("USER_CHECK:", "ERRO", userError.message);
  } else {
    console.log("USER_CHECK:", "Usuário Douglas existe com o papel:", userData.role);
  }
}

checkResources();
