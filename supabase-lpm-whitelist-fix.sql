/* Fix LPM whitelist access for d.stevenson@agile36.com and d.stevenson@agile.com
   Run in Supabase SQL Editor if access still not working. */

-- Ensure table exists (run full supabase-lpm-pro-access-whitelist.sql first if not)
-- Add d.stevenson@agile.com if missing
INSERT INTO lpm_pro_access_whitelist (email) VALUES
  ('d.stevenson@agile.com')
ON CONFLICT (email) DO NOTHING;

-- Fix RLS: JWT email + Gmail dot–equivalence (matches fred.hardenbrook vs fredhardenbrook)
DROP POLICY IF EXISTS "Users can check own whitelist status" ON lpm_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status" ON lpm_pro_access_whitelist
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' IS NOT NULL
    AND (
      LOWER(TRIM(email)) = LOWER(TRIM(auth.jwt() ->> 'email'))
      OR (
        LOWER(TRIM(SPLIT_PART(email, '@', 2))) IN ('gmail.com', 'googlemail.com')
        AND LOWER(TRIM(SPLIT_PART(auth.jwt() ->> 'email', '@', 2))) IN ('gmail.com', 'googlemail.com')
        AND REGEXP_REPLACE(LOWER(TRIM(SPLIT_PART(email, '@', 1))), '\.', '', 'g')
          = REGEXP_REPLACE(LOWER(TRIM(SPLIT_PART(auth.jwt() ->> 'email', '@', 1))), '\.', '', 'g')
      )
    )
  );
