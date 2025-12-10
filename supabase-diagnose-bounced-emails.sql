-- Diagnostic query to see what's actually in the database
-- Run this first to understand the data

-- Check bounced emails in email_sends
SELECT 
  'Bounced emails in email_sends' as check_type,
  COUNT(*) as total_bounced,
  COUNT(DISTINCT contact_id) as unique_contacts_with_ids,
  COUNT(*) FILTER (WHERE contact_id IS NULL) as bounced_without_contact_id,
  COUNT(*) FILTER (WHERE contact_id IS NOT NULL) as bounced_with_contact_id
FROM email_sends 
WHERE bounced = true;

-- Check if those contact_ids exist in email_contacts
SELECT 
  'Contacts that should be blocked' as check_type,
  COUNT(DISTINCT es.contact_id) as contacts_to_block
FROM email_sends es
WHERE es.bounced = true 
  AND es.contact_id IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM email_contacts ec 
    WHERE ec.id = es.contact_id
  );

-- Check current blocked status
SELECT 
  'Current blocked contacts' as check_type,
  COUNT(*) as already_blocked
FROM email_contacts
WHERE blocked = true;

-- Show sample of bounced sends with contact info
SELECT 
  es.id,
  es.contact_id,
  es.bounced,
  es.bounce_reason,
  es.sendgrid_message_id,
  ec.email,
  ec.blocked
FROM email_sends es
LEFT JOIN email_contacts ec ON ec.id = es.contact_id
WHERE es.bounced = true
LIMIT 10;



