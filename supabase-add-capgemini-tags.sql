-- Add tags to all Capgemini email contacts
-- Run this in your Supabase SQL Editor

-- Option 1: Add "capgemini" tag to existing tags (preserves existing tags)
-- This version works better - adds tag if it doesn't already exist
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['capgemini']
  WHEN 'capgemini' = ANY(tags) THEN tags
  ELSE tags || ARRAY['capgemini']
END
WHERE email ILIKE '%capgemini%';

-- Option 2: Set tags to just "capgemini" (replaces all existing tags)
-- Uncomment this if you want to replace all tags with just "capgemini"
-- UPDATE email_contacts
-- SET tags = ARRAY['capgemini']
-- WHERE email ILIKE '%capgemini%';

-- Option 3: Add multiple tags (e.g., "capgemini" and "customer")
-- UPDATE email_contacts
-- SET tags = COALESCE(tags, ARRAY[]::TEXT[]) || ARRAY['capgemini', 'customer']
-- WHERE email ILIKE '%capgemini%'
--   AND ('capgemini' = ANY(tags) IS NULL OR 'capgemini' != ALL(tags));

-- Verify the update
SELECT 
  email, 
  first_name, 
  last_name, 
  tags,
  company
FROM email_contacts
WHERE email ILIKE '%capgemini%'
ORDER BY email;

