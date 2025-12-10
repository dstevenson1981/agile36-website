-- Add message column to assessment_emails table
-- Run this in your Supabase SQL Editor

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

-- Add index for message searches (optional, but helpful if you want to search by message content)
-- CREATE INDEX IF NOT EXISTS idx_assessment_emails_message ON assessment_emails USING gin(to_tsvector('english', message));



