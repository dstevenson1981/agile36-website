-- Remove 'Leadership' tag from ALL contacts in the database
-- This will completely delete the 'Leadership' tag from every contact that has it

-- Step 1: Remove 'Leadership' from all contacts that have it
-- Using array_remove() which is the proper PostgreSQL function for removing elements from arrays
UPDATE email_contacts 
SET tags = array_remove(tags, 'Leadership')
WHERE 'Leadership' = ANY(tags);

-- Step 2: Also handle case-insensitive matches (in case there are variations like 'leadership', 'LEADERSHIP', etc.)
-- Remove any case variations
UPDATE email_contacts 
SET tags = array_remove(tags, 'leadership')
WHERE 'leadership' = ANY(tags);

UPDATE email_contacts 
SET tags = array_remove(tags, 'LEADERSHIP')
WHERE 'LEADERSHIP' = ANY(tags);

-- Step 3: Clean up empty arrays (set to NULL if array becomes empty)
UPDATE email_contacts 
SET tags = NULL
WHERE tags = ARRAY[]::TEXT[] OR array_length(tags, 1) IS NULL;

-- Step 4: Verify the removal
-- This query will show if any 'Leadership' tags still exist (should return 0 rows)
SELECT 
  id,
  email,
  tags
FROM email_contacts
WHERE 'Leadership' = ANY(tags) 
   OR 'leadership' = ANY(tags)
   OR 'LEADERSHIP' = ANY(tags);

-- If the above query returns any rows, those contacts still have the tag
-- If it returns 0 rows, the tag has been completely removed

-- Summary: Show count of contacts updated
SELECT 
  COUNT(*) as total_contacts,
  COUNT(CASE WHEN tags IS NOT NULL THEN 1 END) as contacts_with_tags,
  COUNT(CASE WHEN tags IS NULL OR array_length(tags, 1) IS NULL THEN 1 END) as contacts_without_tags
FROM email_contacts;
