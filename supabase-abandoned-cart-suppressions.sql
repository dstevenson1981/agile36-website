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

-- Suppressed addresses (no enrollment_leads insert → no abandoned-cart / discount email via N8N)
INSERT INTO abandoned_cart_suppressions (email, reason) VALUES
  ('amandar@woodforest.com', 'Do not send abandoned cart - requested by user'),
  ('enriquesan@iadb.org', 'Leading SAFe payment failed; do not send abandoned cart discount'),
  ('mpulm@yahoo.com', 'Combo checkout started - do not send abandoned cart discount (requested)'),
  ('heather.mckenney@voya.com', 'Do not send abandoned cart $150 off email (requested)'),
  ('steven.garcia@sncorp.com', 'POPM payment failed; do not send abandoned cart email'),
  ('kristen.kunkel@gmail.com', 'Do not send abandoned cart discount (requested)')
ON CONFLICT (email) DO NOTHING;

-- NOTE: If a lead was already inserted before suppression, the N8N webhook may have fired once.
-- Optional: remove existing row so no downstream job uses it (review before running):
-- DELETE FROM enrollment_leads WHERE LOWER(TRIM(email)) = 'enriquesan@iadb.org';
