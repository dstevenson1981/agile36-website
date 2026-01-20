-- Create campaign recipients junction table
CREATE TABLE IF NOT EXISTS email_campaign_recipients (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT REFERENCES email_campaigns(id) ON DELETE CASCADE,
  contact_id BIGINT REFERENCES email_contacts(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, contact_id)
);

CREATE INDEX IF NOT EXISTS idx_campaign_recipients_campaign ON email_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_contact ON email_campaign_recipients(contact_id);

-- Add recipient count to campaigns view
CREATE OR REPLACE VIEW campaigns_with_stats AS
SELECT 
  c.*,
  COUNT(DISTINCT cr.contact_id) as recipient_count,
  COUNT(DISTINCT cr.contact_id) FILTER (WHERE cr.sent_at IS NOT NULL) as sent_count,
  COUNT(DISTINCT cr.contact_id) FILTER (WHERE cr.opened_at IS NOT NULL) as opened_count,
  COUNT(DISTINCT cr.contact_id) FILTER (WHERE cr.clicked_at IS NOT NULL) as clicked_count
FROM email_campaigns c
LEFT JOIN email_campaign_recipients cr ON c.id = cr.campaign_id
GROUP BY c.id;
