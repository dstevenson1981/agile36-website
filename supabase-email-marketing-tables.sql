-- Email Marketing System Tables
-- Run this in your Supabase SQL Editor

-- 1. email_contacts table
CREATE TABLE IF NOT EXISTS email_contacts (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  tags TEXT[], -- Array of tags for segmentation
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for email_contacts
CREATE INDEX IF NOT EXISTS idx_email_contacts_email ON email_contacts(email);
CREATE INDEX IF NOT EXISTS idx_email_contacts_subscribed ON email_contacts(subscribed);
CREATE INDEX IF NOT EXISTS idx_email_contacts_tags ON email_contacts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_email_contacts_created_at ON email_contacts(created_at DESC);

-- 2. email_campaigns table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
  sent_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  created_by TEXT
);

-- Indexes for email_campaigns
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_created_at ON email_campaigns(created_at DESC);

-- 3. email_sends table (tracks individual email sends)
CREATE TABLE IF NOT EXISTS email_sends (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT REFERENCES email_campaigns(id) ON DELETE CASCADE,
  contact_id BIGINT REFERENCES email_contacts(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  bounced BOOLEAN DEFAULT false,
  bounce_reason TEXT,
  unsubscribed BOOLEAN DEFAULT false,
  sendgrid_message_id TEXT,
  UNIQUE(campaign_id, contact_id)
);

-- Indexes for email_sends
CREATE INDEX IF NOT EXISTS idx_email_sends_campaign_id ON email_sends(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_sends_contact_id ON email_sends(contact_id);
CREATE INDEX IF NOT EXISTS idx_email_sends_sent_at ON email_sends(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_sends_sendgrid_message_id ON email_sends(sendgrid_message_id);

-- 4. email_unsubscribes table
CREATE TABLE IF NOT EXISTS email_unsubscribes (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  unsubscribed_at TIMESTAMPTZ DEFAULT NOW(),
  campaign_id BIGINT REFERENCES email_campaigns(id) ON DELETE SET NULL,
  reason TEXT
);

-- Indexes for email_unsubscribes
CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_email ON email_unsubscribes(email);
CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_token ON email_unsubscribes(token);
CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_unsubscribed_at ON email_unsubscribes(unsubscribed_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_email_contacts_updated_at 
  BEFORE UPDATE ON email_contacts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE email_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_unsubscribes ENABLE ROW LEVEL SECURITY;

-- Policies for email_contacts (admin access only - adjust based on your auth system)
CREATE POLICY "Allow service role full access to email_contacts" ON email_contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for email_campaigns
CREATE POLICY "Allow service role full access to email_campaigns" ON email_campaigns
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for email_sends
CREATE POLICY "Allow service role full access to email_sends" ON email_sends
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for email_unsubscribes (allow public inserts for unsubscribe)
CREATE POLICY "Allow public inserts to email_unsubscribes" ON email_unsubscribes
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to email_unsubscribes" ON email_unsubscribes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow public to read unsubscribes by token (for unsubscribe page)
CREATE POLICY "Allow public read by token" ON email_unsubscribes
  FOR SELECT
  TO anon
  USING (true);









