-- Simple script to block all contacts that have bounced emails
-- Run this in your Supabase SQL Editor

-- First, check what we're working with
SELECT 
  COUNT(*) as total_bounced_sends,
  COUNT(DISTINCT contact_id) as unique_contacts_with_bounces,
  COUNT(*) FILTER (WHERE contact_id IS NULL) as bounces_without_contact_id
FROM email_sends 
WHERE bounced = true;

-- Block all contacts that have bounced emails
UPDATE email_contacts
SET 
  blocked = true,
  blocked_at = NOW(),
  blocked_reason = 'Auto-blocked due to bounced emails',
  subscribed = false
WHERE id IN (
  SELECT DISTINCT contact_id 
  FROM email_sends 
  WHERE bounced = true 
    AND contact_id IS NOT NULL
)
AND (blocked = false OR blocked IS NULL);

-- Verify the update
SELECT 
  COUNT(*) as total_blocked_contacts
FROM email_contacts
WHERE blocked = true;

