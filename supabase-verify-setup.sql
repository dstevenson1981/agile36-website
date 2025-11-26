-- Verify that the assessment_emails table is set up correctly
-- Run this in Supabase SQL Editor to check your setup

-- Check if table exists and has all columns
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'assessment_emails'
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'assessment_emails';

-- Check if the insert policy exists
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



