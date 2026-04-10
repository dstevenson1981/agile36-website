/* Leading SAFe Pro practice test access whitelist. Run in Supabase SQL Editor.
   Users in this table get Leading SAFe practice test access without needing a Pro order. */

CREATE TABLE IF NOT EXISTS leading_safe_pro_access_whitelist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leading_safe_whitelist_email ON leading_safe_pro_access_whitelist(LOWER(email));

-- RLS: users can only check if their own email is in the whitelist (case-insensitive)
ALTER TABLE leading_safe_pro_access_whitelist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can check own whitelist status" ON leading_safe_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status" ON leading_safe_pro_access_whitelist
  FOR SELECT
  USING (
    LOWER(TRIM(leading_safe_pro_access_whitelist.email)) = LOWER(TRIM((SELECT u.email FROM auth.users u WHERE u.id = auth.uid())))
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND TRIM(p.email) <> ''
        AND LOWER(TRIM(leading_safe_pro_access_whitelist.email)) = LOWER(TRIM(p.email))
    )
  );

-- Service role can manage
DROP POLICY IF EXISTS "Service role can manage whitelist" ON leading_safe_pro_access_whitelist;
CREATE POLICY "Service role can manage whitelist" ON leading_safe_pro_access_whitelist
  FOR ALL
  USING (auth.role() = 'service_role');

-- Insert whitelisted emails (Pro users granted access)
INSERT INTO leading_safe_pro_access_whitelist (email) VALUES
  ('Kennethleerogersjr@gmail.com'),
  ('Kenny.rogers@alliedsolutions.net'),
  ('haw_glazes_6x@icloud.com')
ON CONFLICT (email) DO NOTHING;
