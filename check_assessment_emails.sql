-- Check assessment_emails table structure and recent entries
-- Run this in Supabase SQL Editor

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'assessment_emails'
ORDER BY ordinal_position;

-- Check recent entries (last 30 days)
SELECT 
  id,
  name,
  email,
  source,
  exam_name,
  message,
  created_at
FROM assessment_emails
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 50;

-- Count entries by date (to see when it stopped)
SELECT 
  DATE(created_at) as date,
  COUNT(*) as count
FROM assessment_emails
WHERE created_at >= '2024-12-01'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Check RLS policies
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
WHERE tablename = 'assessment_emails';

-- Check if RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' 
  AND tablename = 'assessment_emails';
