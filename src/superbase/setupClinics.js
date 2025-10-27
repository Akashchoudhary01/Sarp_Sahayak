import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // MUST be service role key
);

async function setupClinics() {
  // 1. Create Table
  const createTable = await supabase.rpc('exec', {
    query: `
      CREATE TABLE IF NOT EXISTS clinics (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        type text NOT NULL DEFAULT 'PHC',
        address text NOT NULL,
        phone text NOT NULL,
        latitude numeric(10, 7) NOT NULL,
        longitude numeric(10, 7) NOT NULL,
        antivenom_stock integer NOT NULL DEFAULT 0,
        last_updated timestamptz DEFAULT now(),
        created_at timestamptz DEFAULT now()
      );
    `
  });

  console.log("✅ Table Created:", createTable.error ?? "OK");

  // 2. Enable RLS
  await supabase.rpc('exec', {
    query: `ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;`
  });

  // 3. Public read access
  await supabase.rpc('exec', {
    query: `
      CREATE POLICY IF NOT EXISTS "Public can view clinic information"
      ON clinics
      FOR SELECT
      TO public
      USING (true);
    `
  });

  // 4. Authenticated users can update stock
  await supabase.rpc('exec', {
    query: `
      CREATE POLICY IF NOT EXISTS "Authenticated users can update stock"
      ON clinics
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
    `
  });

  // 5. Insert sample clinics
  const { error: seedError } = await supabase.from('clinics').insert([
    {
      name: 'District Hospital Ranchi',
      type: 'District Hospital',
      address: 'Main Road, Ranchi, Jharkhand 834001',
      phone: '+91-651-2401016',
      latitude: 23.3441,
      longitude: 85.3096,
      antivenom_stock: 52
    },
    {
      name: 'Primary Health Center - Bundu',
      type: 'PHC',
      address: 'Bundu Road, Bundu, Ranchi, Jharkhand 835204',
      phone: '+91-651-2587421',
      latitude: 23.1592,
      longitude: 85.5889,
      antivenom_stock: 0
    },
    {
      name: 'Rajendra Institute of Medical Sciences',
      type: 'Medical College',
      address: 'Bariatu Road, Ranchi, Jharkhand 834009',
      phone: '+91-651-2451070',
      latitude: 23.3389,
      longitude: 85.3094,
      antivenom_stock: 150
    }
  ]);

  if (seedError) {
    console.error("❌ Error inserting seed data:", seedError);
  } else {
    console.log("✅ Clinic seed data inserted");
  }
}

setupClinics();
