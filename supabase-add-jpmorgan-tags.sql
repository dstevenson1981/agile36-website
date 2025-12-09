-- Add tags to all JP Morgan email contacts
-- Run this in your Supabase SQL Editor

-- Option 1: Add "JP Morgan" tag to contacts matching email domain
-- This adds the tag if it doesn't already exist, preserving existing tags
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['JP Morgan']
  WHEN 'JP Morgan' = ANY(tags) THEN tags
  ELSE tags || ARRAY['JP Morgan']
END
WHERE email ILIKE '%@jpmorgan%' 
   OR email ILIKE '%@jpmorganchase%'
   OR email ILIKE '%@jpmc%';

-- Option 2: Add "JP Morgan" tag to contacts matching company name
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['JP Morgan']
  WHEN 'JP Morgan' = ANY(tags) THEN tags
  ELSE tags || ARRAY['JP Morgan']
END
WHERE company ILIKE '%JP Morgan%'
   OR company ILIKE '%JPMorgan%'
   OR company ILIKE '%JPMorgan Chase%'
   OR company ILIKE '%JPM%';

-- Option 3: Add "JP Morgan" tag to recently uploaded contacts (last 24 hours)
-- Uncomment this if you want to tag contacts uploaded in the last 24 hours
-- UPDATE email_contacts
-- SET tags = CASE 
--   WHEN tags IS NULL THEN ARRAY['JP Morgan']
--   WHEN 'JP Morgan' = ANY(tags) THEN tags
--   ELSE tags || ARRAY['JP Morgan']
-- END
-- WHERE created_at >= NOW() - INTERVAL '24 hours';

-- Verify the update
SELECT 
  email, 
  first_name, 
  last_name, 
  tags,
  company,
  created_at
FROM email_contacts
WHERE 'JP Morgan' = ANY(tags)
ORDER BY created_at DESC;

-- Show count of tagged contacts
SELECT 
  COUNT(*) as total_jpmorgan_contacts
FROM email_contacts
WHERE 'JP Morgan' = ANY(tags);

