-- Block contacts based on SendGrid bounce data
-- Run this in your Supabase SQL Editor

-- Step 1: Check the current state
SELECT 
  'email_sends with bounced=true' as check_type,
  COUNT(*) as total_bounced_sends,
  COUNT(DISTINCT contact_id) as unique_contacts_with_ids,
  COUNT(*) FILTER (WHERE contact_id IS NULL) as bounced_without_contact_id
FROM email_sends 
WHERE bounced = true;

-- Step 2: Block contacts that have contact_id linked
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
    AND contact_id IS NOT NULL
)
AND (blocked = false OR blocked IS NULL);

-- Step 3: If you know the email domain that's blocked (e.g., jpmorganchase.com)
-- Uncomment and run this to block all contacts from that domain:
UPDATE email_contacts
SET 
  blocked = true,
  blocked_at = NOW(),
  blocked_reason = 'Auto-blocked: jpmorganchase.com domain blocked by SendGrid',
  subscribed = false
WHERE email LIKE '%@jpmorganchase.com'
  AND (blocked = false OR blocked IS NULL);

-- Step 4: Verify the update
SELECT 
  COUNT(*) as total_blocked_contacts,
  COUNT(*) FILTER (WHERE subscribed = false) as unsubscribed_blocked
FROM email_contacts
WHERE blocked = true;

