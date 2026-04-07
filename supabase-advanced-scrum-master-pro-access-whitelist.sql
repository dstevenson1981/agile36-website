/* SAFe Advanced Scrum Master (SASM) Pro practice test whitelist. Run in Supabase SQL Editor.
   Users in this table get the SASM practice exam in Practice Exams without a Pro order. */

CREATE TABLE IF NOT EXISTS advanced_scrum_master_pro_access_whitelist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_asm_whitelist_email ON advanced_scrum_master_pro_access_whitelist (LOWER(email));

ALTER TABLE advanced_scrum_master_pro_access_whitelist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can check own whitelist status" ON advanced_scrum_master_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status" ON advanced_scrum_master_pro_access_whitelist
  FOR SELECT
  USING (
    LOWER(TRIM(advanced_scrum_master_pro_access_whitelist.email)) = LOWER(TRIM((SELECT u.email FROM auth.users u WHERE u.id = auth.uid())))
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND TRIM(p.email) <> ''
        AND LOWER(TRIM(advanced_scrum_master_pro_access_whitelist.email)) = LOWER(TRIM(p.email))
    )
  );

DROP POLICY IF EXISTS "Service role can manage whitelist" ON advanced_scrum_master_pro_access_whitelist;
CREATE POLICY "Service role can manage whitelist" ON advanced_scrum_master_pro_access_whitelist
  FOR ALL
  USING (auth.role() = 'service_role');

INSERT INTO advanced_scrum_master_pro_access_whitelist (email) VALUES
  ('Michelle.mizer@gmail.com'),
  ('ufs777@gmail.com'),
  ('d.stevenson@agile36.com'),
  ('monique.hart@carefirst.com')
ON CONFLICT (email) DO NOTHING;
