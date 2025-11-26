-- TEMPORARY: Disable RLS to test if that's the issue
-- Only use this for testing - re-enable RLS after confirming it works

ALTER TABLE assessment_emails DISABLE ROW LEVEL SECURITY;

-- Verify it's disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'assessment_emails';
-- rowsecurity should be 'f' (false)



