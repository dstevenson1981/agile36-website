-- Alternative RLS fix - allows both anon and authenticated users
-- Use this if the previous script doesn't work

ALTER TABLE assessment_emails ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON assessment_emails;
DROP POLICY IF EXISTS "assessment_emails_insert_policy" ON assessment_emails;
DROP POLICY IF EXISTS "Enable insert for anon users" ON assessment_emails;

-- Create policy for anonymous users
CREATE POLICY "Allow anon inserts" ON assessment_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also create policy for authenticated users (if needed)
CREATE POLICY "Allow authenticated inserts" ON assessment_emails
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Verify policies
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'assessment_emails';



