DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'assessment_emails' AND column_name = 'name'
  ) THEN
    ALTER TABLE assessment_emails ADD COLUMN name TEXT;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'assessment_emails' AND column_name = 'exam_name'
  ) THEN
    ALTER TABLE assessment_emails ADD COLUMN exam_name TEXT;
  END IF;
END $$;

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'assessment_emails_email_source_key'
  ) THEN
    ALTER TABLE assessment_emails DROP CONSTRAINT assessment_emails_email_source_key;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'assessment_emails_email_source_exam_name_key'
  ) THEN
    ALTER TABLE assessment_emails 
    ADD CONSTRAINT assessment_emails_email_source_exam_name_key 
    UNIQUE(email, source, exam_name);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_assessment_emails_exam_name ON assessment_emails(exam_name);

