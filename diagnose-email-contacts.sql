-- Diagnostic queries for email_contacts table
-- Run these in Supabase SQL Editor to check the state of your data

-- 1. Check table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'email_contacts'
ORDER BY ordinal_position;

-- 2. Count total contacts
SELECT COUNT(*) as total_contacts FROM email_contacts;

-- 3. Count contacts with tags
SELECT 
    COUNT(*) as contacts_with_tags,
    COUNT(*) FILTER (WHERE tags IS NOT NULL AND array_length(tags, 1) > 0) as contacts_with_non_empty_tags
FROM email_contacts;

-- 4. Get all unique tags
SELECT DISTINCT unnest(tags) as tag
FROM email_contacts
WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
ORDER BY tag;

-- 5. Sample contacts with tags
SELECT 
    id,
    email,
    first_name,
    last_name,
    tags,
    subscribed,
    blocked,
    created_at
FROM email_contacts
WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
ORDER BY created_at DESC
LIMIT 10;

-- 6. Sample contacts without tags
SELECT 
    id,
    email,
    first_name,
    last_name,
    tags,
    subscribed,
    created_at
FROM email_contacts
WHERE tags IS NULL OR array_length(tags, 1) = 0
ORDER BY created_at DESC
LIMIT 10;

-- 7. Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'email_contacts';

-- 8. Check if RLS is enabled
SELECT 
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'email_contacts';

-- 9. Count by subscription status
SELECT 
    subscribed,
    COUNT(*) as count
FROM email_contacts
GROUP BY subscribed;

-- 10. Count by blocked status
SELECT 
    COALESCE(blocked::text, 'null') as blocked_status,
    COUNT(*) as count
FROM email_contacts
GROUP BY blocked;
