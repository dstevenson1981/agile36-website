/* LPM Pro practice test access whitelist. Run in Supabase SQL Editor.
   Users in this table get LPM practice test access without needing a Pro order. */

CREATE TABLE IF NOT EXISTS lpm_pro_access_whitelist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lpm_whitelist_email ON lpm_pro_access_whitelist(email);

-- RLS: users can only check if their own email is in the whitelist (case-insensitive)
ALTER TABLE lpm_pro_access_whitelist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can check own whitelist status" ON lpm_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status" ON lpm_pro_access_whitelist
  FOR SELECT
  USING (LOWER(email) = LOWER((SELECT email FROM auth.users WHERE id = auth.uid())));

-- Service role can manage
DROP POLICY IF EXISTS "Service role can manage whitelist" ON lpm_pro_access_whitelist;
CREATE POLICY "Service role can manage whitelist" ON lpm_pro_access_whitelist
  FOR ALL
  USING (auth.role() = 'service_role');

-- Insert whitelisted emails (lowercase for case-insensitive matching)
INSERT INTO lpm_pro_access_whitelist (email) VALUES
  ('ldntlmn@gmail.com'),
  ('liangxj1982@163.com'),
  ('d.stevenson@agile36.com'),
  ('d.stevenson@agile.com'),
  ('scott.poholsky@rtx.com'),
  ('fhardenbrook@intoxalock.com'),
  ('fred.hardenbrook@gmail.com')
ON CONFLICT (email) DO NOTHING;