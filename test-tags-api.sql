-- Test query to verify tags are in the database
-- Run this in Supabase SQL editor to check your tags

-- 1. Check total contacts and how many have tags
SELECT 
  COUNT(*) as total_contacts,
  COUNT(tags) as contacts_with_tags,
  COUNT(*) - COUNT(tags) as contacts_without_tags
FROM email_contacts;

-- 2. Get all unique tags using unnest (PostgreSQL array function)
SELECT DISTINCT unnest(tags)::TEXT as tag
FROM email_contacts
WHERE tags IS NOT NULL
ORDER BY tag;

-- 3. Count how many contacts have each tag
SELECT 
  unnest(tags)::TEXT as tag,
  COUNT(*) as contact_count
FROM email_contacts
WHERE tags IS NOT NULL
GROUP BY tag
ORDER BY contact_count DESC, tag;

-- 4. Show sample contacts with their tags (recently added)
SELECT 
  id,
  email,
  first_name,
  last_name,
  tags,
  array_length(tags, 1) as tag_count,
  created_at
FROM email_contacts
WHERE tags IS NOT NULL
ORDER BY created_at DESC
LIMIT 20;

-- 5. Check for contacts added yesterday with tags
SELECT 
  id,
  email,
  first_name,
  last_name,
  tags,
  created_at
FROM email_contacts
WHERE tags IS NOT NULL
  AND created_at >= CURRENT_DATE - INTERVAL '1 day'
ORDER BY created_at DESC;
