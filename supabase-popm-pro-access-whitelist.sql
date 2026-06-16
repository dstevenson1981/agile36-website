/* POPM Pro practice exam access whitelist. Run in Supabase SQL Editor. */

CREATE TABLE IF NOT EXISTS popm_pro_access_whitelist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_popm_whitelist_email ON popm_pro_access_whitelist(email);

ALTER TABLE popm_pro_access_whitelist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can check own whitelist status" ON popm_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status" ON popm_pro_access_whitelist
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' IS NOT NULL
    AND LOWER(TRIM(email)) = LOWER(TRIM(auth.jwt() ->> 'email'))
  );

DROP POLICY IF EXISTS "Service role can manage whitelist" ON popm_pro_access_whitelist;
CREATE POLICY "Service role can manage whitelist" ON popm_pro_access_whitelist
  FOR ALL
  USING (auth.role() = 'service_role');

INSERT INTO popm_pro_access_whitelist (email) VALUES
  ('rebecca.clark@lmcu.org'),
  ('hughes.lauren12@gmail.com'),
  ('eahoppstetter@gmail.com')
ON CONFLICT (email) DO NOTHING;
