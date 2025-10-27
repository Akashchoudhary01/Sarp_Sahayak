// src/lib/supabase.js

import { createClient } from '@supabase/supabase-js';

// Access variables using the VITE standard (import.meta.env)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // Accesses the fixed VITE variable
  import.meta.env.VITE_SUPABASE_ANON_KEY // Accesses the fixed VITE variable
);

export { supabase };