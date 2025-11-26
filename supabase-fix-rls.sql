-- Fix Row Level Security policy for assessment_emails table
-- Run this in Supabase SQL Editor

-- Enable RLS if not already enabled
ALTER TABLE assessment_emails ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to recreate it)
DROP POLICY IF EXISTS "Allow public inserts" ON assessment_emails;

-- Create policy that allows anyone to insert emails
CREATE POLICY "Allow public inserts" ON assessment_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);



