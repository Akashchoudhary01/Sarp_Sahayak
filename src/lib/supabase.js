// src/lib/supabase.js

import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// TEMPORARY DEBUG: Check what value the app is reading for the key
console.log('Supabase URL read:', url);
console.log('Supabase Key read:', key); // WARNING: This exposes your key in the console!

const supabase = createClient(
 url,
 key
);

export { supabase };