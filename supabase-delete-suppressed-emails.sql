-- Delete Suppressed Emails from Supabase
-- Run diagnostic queries first to see what's actually in the database

-- ============================================
-- STEP 1: DIAGNOSTIC - See what's in the database
-- ============================================

-- Check bounced emails in email_sends
SELECT 
  'Bounced emails in email_sends' as check_type,
  COUNT(*) as total_bounced,
  COUNT(DISTINCT contact_id) as unique_contacts_with_ids,
  COUNT(*) FILTER (WHERE contact_id IS NULL) as bounced_without_contact_id
FROM email_sends 
WHERE bounced = true;

-- Check blocked contacts
SELECT 
  'Blocked contacts' as check_type,
  COUNT(*) as total_blocked
FROM email_contacts
WHERE blocked = true;

-- Check if bounced sends link to contacts
SELECT 
  'Bounced sends with valid contact_id' as check_type,
  COUNT(DISTINCT es.contact_id) as contacts_to_delete
FROM email_sends es
INNER JOIN email_contacts ec ON ec.id = es.contact_id
WHERE es.bounced = true 
  AND es.contact_id IS NOT NULL;

-- Show sample of what would be deleted
SELECT 
  ec.id,
  ec.email,
  ec.blocked,
  ec.subscribed,
  COUNT(es.id) as bounce_count
FROM email_contacts ec
INNER JOIN email_sends es ON ec.id = es.contact_id
WHERE es.bounced = true
GROUP BY ec.id, ec.email, ec.blocked, ec.subscribed
LIMIT 20;

-- ============================================
-- STEP 2: DELETE OPTIONS
-- ============================================

-- OPTION A: Delete all blocked contacts (if already marked)
DELETE FROM email_contacts
WHERE blocked = true;

-- OPTION B: Delete contacts with bounced emails (if email_sends has the data)
DELETE FROM email_contacts
WHERE id IN (
  SELECT DISTINCT es.contact_id 
  FROM email_sends es
  INNER JOIN email_contacts ec ON ec.id = es.contact_id
  WHERE es.bounced = true 
    AND es.contact_id IS NOT NULL
);

-- OPTION C: Delete by email list (paste your SendGrid suppressed emails here)
-- First, export your suppressed emails from SendGrid as a list
-- Then replace the example emails below:
DELETE FROM email_contacts
WHERE LOWER(TRIM(email)) IN (
  LOWER(TRIM('example1@email.com')),
  LOWER(TRIM('example2@email.com')),
  LOWER(TRIM('example3@email.com'))
  -- Add more emails here, one per line
);

-- OPTION D: Delete contacts that are blocked OR have bounced (comprehensive)
DELETE FROM email_contacts
WHERE blocked = true
   OR id IN (
     SELECT DISTINCT es.contact_id 
     FROM email_sends es
     WHERE es.bounced = true 
       AND es.contact_id IS NOT NULL
   );

-- ============================================
-- ALTERNATIVE: If email_sends doesn't have contact_id linked properly
-- Delete by matching email addresses directly
-- ============================================
-- This requires you to have the list of bounced emails
-- You can get this from SendGrid API or from the clean-suppressions.js output

-- Example: If you have a list of bounced emails, create a temp table or use IN clause
-- DELETE FROM email_contacts
-- WHERE email IN (
--   -- Your list of bounced emails from SendGrid
--   SELECT email FROM (VALUES 
--     ('email1@example.com'),
--     ('email2@example.com')
--   ) AS bounced_emails(email)
-- );

-- ============================================
-- RECOMMENDED APPROACH:
-- Since you already ran clean-suppressions.js which deleted 335 emails,
-- those are already gone. If you're seeing 0, it might be because:
-- 1. They were already deleted
-- 2. The email_sends table doesn't have bounced=true set
-- 3. The contact_id linkage is missing
--
-- Best approach: Use the SendGrid API to get the current suppressed emails
-- and delete by email address directly (OPTION C above)
-- ============================================


