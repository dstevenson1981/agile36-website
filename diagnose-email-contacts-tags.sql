-- Diagnostic queries for email_contacts tags
-- Run these in Supabase SQL editor to verify your data

-- 1. Check total contacts and how many have tags
SELECT 
  COUNT(*) as total_contacts,
  COUNT(tags) as contacts_with_tags,
  COUNT(*) - COUNT(tags) as contacts_without_tags
FROM email_contacts;

-- 2. Check tag data types and formats
SELECT 
  id,
  email,
  tags,
  pg_typeof(tags) as tags_type,
  array_length(tags, 1) as tag_count
FROM email_contacts
WHERE tags IS NOT NULL
LIMIT 10;

-- 3. Get all unique tags using unnest (what the RPC function does)
SELECT DISTINCT unnest(tags)::TEXT as tag
FROM email_contacts
WHERE tags IS NOT NULL
ORDER BY tag;

-- 4. Count contacts per tag
SELECT 
  unnest(tags)::TEXT as tag,
  COUNT(*) as contact_count
FROM email_contacts
WHERE tags IS NOT NULL
GROUP BY tag
ORDER BY contact_count DESC, tag;

-- 5. Check for any non-array tags (shouldn't happen, but good to verify)
SELECT 
  id,
  email,
  tags,
  pg_typeof(tags) as tags_type
FROM email_contacts
WHERE tags IS NOT NULL 
  AND pg_typeof(tags) != 'text[]'::regtype;

-- 6. Sample of contacts with their tags
SELECT 
  id,
  email,
  first_name,
  last_name,
  tags,
  array_length(tags, 1) as tag_count
FROM email_contacts
WHERE tags IS NOT NULL
ORDER BY array_length(tags, 1) DESC
LIMIT 20;
