-- Add blocked/spam status to email_contacts table
-- Run this in your Supabase SQL Editor

-- Add blocked column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_contacts' AND column_name = 'blocked'
  ) THEN
    ALTER TABLE email_contacts ADD COLUMN blocked BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Add blocked_at timestamp
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_contacts' AND column_name = 'blocked_at'
  ) THEN
    ALTER TABLE email_contacts ADD COLUMN blocked_at TIMESTAMPTZ;
  END IF;
END $$;

-- Add blocked_reason
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'email_contacts' AND column_name = 'blocked_reason'
  ) THEN
    ALTER TABLE email_contacts ADD COLUMN blocked_reason TEXT;
  END IF;
END $$;

-- Create index for blocked contacts
CREATE INDEX IF NOT EXISTS idx_email_contacts_blocked ON email_contacts(blocked) WHERE blocked = true;

-- Auto-block contacts that have bounced emails
-- This will mark contacts as blocked if they have any bounced emails
UPDATE email_contacts
SET 
  blocked = true,
  blocked_at = COALESCE(blocked_at, NOW()),
  blocked_reason = COALESCE(blocked_reason, 'Auto-blocked due to bounced emails'),
  subscribed = false
WHERE id IN (
  SELECT DISTINCT contact_id 
  FROM email_sends 
  WHERE bounced = true
)
AND blocked = false;

-- Verify the update
SELECT 
  COUNT(*) as total_blocked_contacts,
  COUNT(*) FILTER (WHERE subscribed = false) as unsubscribed_blocked
FROM email_contacts
WHERE blocked = true;

