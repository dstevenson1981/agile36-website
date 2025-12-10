-- Fix contacts that were incorrectly marked as unsubscribed
-- Run this in your Supabase SQL Editor to reset all contacts to subscribed

-- Reset all contacts to subscribed (unless they actually unsubscribed)
UPDATE email_contacts
SET subscribed = true
WHERE subscribed = false
  AND email NOT IN (
    SELECT DISTINCT email 
    FROM email_unsubscribes 
    WHERE unsubscribed_at IS NOT NULL
  );

-- Verify the update
SELECT 
  COUNT(*) as total_contacts,
  SUM(CASE WHEN subscribed = true THEN 1 ELSE 0 END) as subscribed_count,
  SUM(CASE WHEN subscribed = false THEN 1 ELSE 0 END) as unsubscribed_count
FROM email_contacts;







