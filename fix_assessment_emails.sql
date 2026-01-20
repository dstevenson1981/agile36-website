-- Fix assessment_emails table - ensure all columns exist and RLS is configured
-- Run this in Supabase SQL Editor

-- Add message column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'assessment_emails' AND column_name = 'message'
    ) THEN
        ALTER TABLE assessment_emails ADD COLUMN message TEXT;
    END IF;
END $$;

-- Ensure the table has all required columns
CREATE TABLE IF NOT EXISTS assessment_emails (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'SA Free Assessment',
  exam_name TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop and recreate unique constraint to allow same email for different exams
DO $$
BEGIN
    -- Drop old constraint if it exists
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'assessment_emails_email_source_key'
    ) THEN
        ALTER TABLE assessment_emails DROP CONSTRAINT assessment_emails_email_source_key;
    END IF;
    
    -- Drop new constraint if it exists
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'assessment_emails_email_source_exam_name_key'
    ) THEN
        ALTER TABLE assessment_emails DROP CONSTRAINT assessment_emails_email_source_exam_name_key;
    END IF;
END $$;

-- Add unique constraint on email, source, and exam_name
ALTER TABLE assessment_emails 
ADD CONSTRAINT assessment_emails_email_source_exam_name_key 
UNIQUE(email, source, exam_name);

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_assessment_emails_email ON assessment_emails(email);
CREATE INDEX IF NOT EXISTS idx_assessment_emails_exam_name ON assessment_emails(exam_name);
CREATE INDEX IF NOT EXISTS idx_assessment_emails_created_at ON assessment_emails(created_at DESC);

-- Fix RLS - Disable first, then re-enable with proper policy
ALTER TABLE assessment_emails DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON assessment_emails;
DROP POLICY IF EXISTS "Allow anon inserts" ON assessment_emails;
DROP POLICY IF EXISTS "Allow authenticated inserts" ON assessment_emails;
DROP POLICY IF EXISTS "assessment_emails_insert_policy" ON assessment_emails;
DROP POLICY IF EXISTS "Enable insert for anon users" ON assessment_emails;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON assessment_emails;

-- Re-enable RLS
ALTER TABLE assessment_emails ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone (including anon) to insert
CREATE POLICY "Allow all inserts" ON assessment_emails
  FOR INSERT
  TO anon, authenticated, public
  WITH CHECK (true);

-- Verify setup
SELECT 
  'Table exists' as check_item,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'assessment_emails') 
    THEN '✓' ELSE '✗' END as status
UNION ALL
SELECT 
  'message column exists',
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'message')
    THEN '✓' ELSE '✗' END
UNION ALL
SELECT 
  'RLS enabled',
  CASE WHEN (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'assessment_emails')
    THEN '✓' ELSE '✗' END
UNION ALL
SELECT 
  'Insert policy exists',
  CASE WHEN EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'assessment_emails' AND policyname = 'Allow all inserts')
    THEN '✓' ELSE '✗' END;
