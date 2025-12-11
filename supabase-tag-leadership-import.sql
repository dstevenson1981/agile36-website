-- Tag contacts from the "leadership" CSV import with "Leadership" tag
-- This script adds the "Leadership" tag to contacts created within a specific time window

-- Option 1: Tag contacts created in the last hour (if you just imported)
-- Uncomment and adjust the hours as needed
/*
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['Leadership']
  WHEN 'Leadership' = ANY(tags) THEN tags  -- Already has it, keep as is
  ELSE tags || ARRAY['Leadership']  -- Add to existing tags
END
WHERE created_at >= NOW() - INTERVAL '1 hour';
*/

-- Option 2: Tag contacts created on a specific date (replace 'YYYY-MM-DD' with your import date)
-- Example: If you imported on December 10, 2024, use '2024-12-10'
/*
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['Leadership']
  WHEN 'Leadership' = ANY(tags) THEN tags
  ELSE tags || ARRAY['Leadership']
END
WHERE created_at::date = '2024-12-10'::date;
*/

-- Option 3: Tag contacts created within a specific time range
-- Replace the timestamps with your actual import time window
/*
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['Leadership']
  WHEN 'Leadership' = ANY(tags) THEN tags
  ELSE tags || ARRAY['Leadership']
END
WHERE created_at >= '2024-12-10 10:00:00'::timestamp
  AND created_at <= '2024-12-10 11:00:00'::timestamp;
*/

-- Option 4: Tag the most recent X contacts (if you know how many you imported)
-- Replace 50 with the actual number of contacts you imported
/*
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['Leadership']
  WHEN 'Leadership' = ANY(tags) THEN tags
  ELSE tags || ARRAY['Leadership']
END
WHERE id IN (
  SELECT id 
  FROM email_contacts 
  ORDER BY created_at DESC 
  LIMIT 50
);
*/

-- RECOMMENDED: Tag contacts created YESTERDAY (all day)
-- This tags all contacts imported yesterday
UPDATE email_contacts
SET tags = CASE 
  WHEN tags IS NULL THEN ARRAY['Leadership']
  WHEN 'Leadership' = ANY(tags) THEN tags  -- Already has it, keep as is
  ELSE tags || ARRAY['Leadership']  -- Add to existing tags
END
WHERE created_at::date = CURRENT_DATE - INTERVAL '1 day';

-- Verify the update - Check how many contacts were tagged
SELECT 
  COUNT(*) as total_contacts_yesterday,
  COUNT(CASE WHEN 'Leadership' = ANY(tags) THEN 1 END) as now_has_leadership_tag
FROM email_contacts
WHERE created_at::date = CURRENT_DATE - INTERVAL '1 day';

-- Show sample of tagged contacts from yesterday
SELECT 
  id,
  email,
  first_name,
  last_name,
  tags,
  created_at
FROM email_contacts
WHERE 'Leadership' = ANY(tags)
  AND created_at::date = CURRENT_DATE - INTERVAL '1 day'
ORDER BY created_at DESC
LIMIT 20;
