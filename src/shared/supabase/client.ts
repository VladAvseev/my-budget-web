import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url) {
  throw new Error('Не задана переменная окружения SUPABASE_URL');
}

if (!anonKey) {
  throw new Error('Не задана переменная окружения SUPABASE_ANON_KEY');
}

export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    persistSession: true,
    storageKey: 'mb-auth-token',
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});