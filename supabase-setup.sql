-- Create table for storing assessment email addresses
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS assessment_emails (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'SA Free Assessment',
  exam_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, source, exam_name)
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_assessment_emails_email ON assessment_emails(email);

-- Create an index on exam_name for filtering by exam
CREATE INDEX IF NOT EXISTS idx_assessment_emails_exam_name ON assessment_emails(exam_name);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_assessment_emails_created_at ON assessment_emails(created_at DESC);

-- Enable Row Level Security (RLS) - only allow inserts, not reads
ALTER TABLE assessment_emails ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert emails (for the API)
CREATE POLICY "Allow public inserts" ON assessment_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Create a policy for authenticated users to read (if you want to view emails later)
-- CREATE POLICY "Allow authenticated reads" ON assessment_emails
--   FOR SELECT
--   TO authenticated
--   USING (true);

