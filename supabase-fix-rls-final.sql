-- Final comprehensive RLS fix
-- This will completely reset and fix the RLS policies

-- Step 1: Disable RLS temporarily to clear any issues
ALTER TABLE assessment_emails DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies (comprehensive cleanup)
DROP POLICY IF EXISTS "Allow public inserts" ON assessment_emails;
DROP POLICY IF EXISTS "Allow anon inserts" ON assessment_emails;
DROP POLICY IF EXISTS "Allow authenticated inserts" ON assessment_emails;
DROP POLICY IF EXISTS "assessment_emails_insert_policy" ON assessment_emails;
DROP POLICY IF EXISTS "Enable insert for anon users" ON assessment_emails;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON assessment_emails;

-- Step 3: Re-enable RLS
ALTER TABLE assessment_emails ENABLE ROW LEVEL SECURITY;

-- Step 4: Create a permissive policy for INSERT that allows everything
-- Using both USING and WITH CHECK for maximum compatibility
CREATE POLICY "Allow all inserts" ON assessment_emails
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Step 5: Also create for anon role specifically (most common)
CREATE POLICY "Allow anon inserts" ON assessment_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 6: Verify everything
SELECT 
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'assessment_emails';

-- Step 7: Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'assessment_emails';



