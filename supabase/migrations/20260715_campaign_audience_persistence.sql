-- Persist campaign audience: tag filters on campaign + recipient junction table
ALTER TABLE email_campaigns
  ADD COLUMN IF NOT EXISTS tag_filters TEXT[] DEFAULT '{}';

CREATE TABLE IF NOT EXISTS email_campaign_recipients (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
  contact_id BIGINT NOT NULL REFERENCES email_contacts(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, contact_id)
);

CREATE INDEX IF NOT EXISTS idx_campaign_recipients_campaign ON email_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_contact ON email_campaign_recipients(contact_id);

ALTER TABLE email_campaign_recipients ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'email_campaign_recipients'
      AND policyname = 'Allow service role full access to email_campaign_recipients'
  ) THEN
    CREATE POLICY "Allow service role full access to email_campaign_recipients"
      ON email_campaign_recipients
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
