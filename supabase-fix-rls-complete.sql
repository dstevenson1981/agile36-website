-- Complete RLS fix for assessment_emails table
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Enable RLS
ALTER TABLE assessment_emails ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies on this table (to start fresh)
DROP POLICY IF EXISTS "Allow public inserts" ON assessment_emails;
DROP POLICY IF EXISTS "assessment_emails_insert_policy" ON assessment_emails;
DROP POLICY IF EXISTS "Enable insert for anon users" ON assessment_emails;

-- Step 3: Create a new policy that allows anonymous users to insert
CREATE POLICY "Allow public inserts" ON assessment_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 4: Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  with_check
FROM pg_policies 
WHERE tablename = 'assessment_emails';



