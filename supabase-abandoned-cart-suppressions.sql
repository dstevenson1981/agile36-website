-- Abandoned cart email suppressions
-- Emails in this table will NOT trigger abandoned cart emails (no insert into enrollment_leads = no webhook to N8N)
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS abandoned_cart_suppressions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_abandoned_cart_suppressions_email ON abandoned_cart_suppressions(LOWER(email));

-- RLS: service role only (API uses service role)
ALTER TABLE abandoned_cart_suppressions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage suppressions" ON abandoned_cart_suppressions;
CREATE POLICY "Service role can manage suppressions" ON abandoned_cart_suppressions
  FOR ALL
  USING (auth.role() = 'service_role');

-- Add Amanda - do not send abandoned cart emails
INSERT INTO abandoned_cart_suppressions (email, reason) VALUES
  ('amandar@woodforest.com', 'Do not send abandoned cart - requested by user')
ON CONFLICT (email) DO NOTHING;

-- NOTE: If Amanda's lead was already inserted before you ran this, the N8N webhook may have
-- already fired. Add a filter in your N8N workflow to skip emails in this table, or
-- manually cancel that execution. Future abandonments will be blocked (no insert = no webhook).
