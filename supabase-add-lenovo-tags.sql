-- Add tags to all Lenovo email contacts
-- Run this in your Supabase SQL Editor

-- Add "lenovo" tag to all Lenovo email contacts
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['lenovo']
  WHEN 'lenovo' = ANY(tags) THEN tags
  ELSE tags || ARRAY['lenovo']
END
WHERE email ILIKE '%lenovo%';

-- Verify it worked
SELECT email, tags FROM email_contacts WHERE email ILIKE '%lenovo%' LIMIT 10;







