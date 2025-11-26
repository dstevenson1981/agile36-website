-- Migration script to add name and exam_name columns to existing table
-- Run this if you already created the table without these columns

-- Add name column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'assessment_emails' AND column_name = 'name'
  ) THEN
    ALTER TABLE assessment_emails ADD COLUMN name TEXT;
  END IF;
END $$;

-- Add exam_name column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'assessment_emails' AND column_name = 'exam_name'
  ) THEN
    ALTER TABLE assessment_emails ADD COLUMN exam_name TEXT;
  END IF;
END $$;

-- Drop old unique constraint if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'assessment_emails_email_source_key'
  ) THEN
    ALTER TABLE assessment_emails DROP CONSTRAINT assessment_emails_email_source_key;
  END IF;
END $$;

-- Add new unique constraint with exam_name
ALTER TABLE assessment_emails 
ADD CONSTRAINT assessment_emails_email_source_exam_name_key 
UNIQUE(email, source, exam_name);

-- Create index on exam_name if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_assessment_emails_exam_name ON assessment_emails(exam_name);



