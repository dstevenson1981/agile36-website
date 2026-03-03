/* Fix LPM whitelist access for d.stevenson@agile36.com and d.stevenson@agile.com
   Run in Supabase SQL Editor if access still not working. */

-- Ensure table exists (run full supabase-lpm-pro-access-whitelist.sql first if not)
-- Add d.stevenson@agile.com if missing
INSERT INTO lpm_pro_access_whitelist (email) VALUES
  ('d.stevenson@agile.com')
ON CONFLICT (email) DO NOTHING;

-- Fix RLS: case-insensitive email match (auth.users may store different casing)
DROP POLICY IF EXISTS "Users can check own whitelist status" ON lpm_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status" ON lpm_pro_access_whitelist
  FOR SELECT
  USING (LOWER(email) = LOWER((SELECT email FROM auth.users WHERE id = auth.uid())));
