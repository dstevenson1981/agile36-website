-- Block all JP Morgan contacts (jpmorganchase.com domain)
-- This will block the 366 contacts that bounced
-- Run this in your Supabase SQL Editor

-- First, make sure the blocked columns exist (run the main migration first if needed)
-- Then block all jpmorganchase.com contacts

UPDATE email_contacts
SET 
  blocked = true,
  blocked_at = NOW(),
  blocked_reason = 'Auto-blocked: jpmorganchase.com domain blocked by SendGrid (366 bounced emails)',
  subscribed = false
WHERE email LIKE '%@jpmorganchase.com'
  AND (blocked = false OR blocked IS NULL);

-- Verify the update
SELECT 
  COUNT(*) as total_blocked_jpmorgan,
  COUNT(*) FILTER (WHERE subscribed = false) as unsubscribed_blocked
FROM email_contacts
WHERE email LIKE '%@jpmorganchase.com' AND blocked = true;

-- Also check total blocked contacts
SELECT 
  COUNT(*) as total_blocked_contacts
FROM email_contacts
WHERE blocked = true;













