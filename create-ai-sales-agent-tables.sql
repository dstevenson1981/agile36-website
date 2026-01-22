-- PART 1: Database Tables for AI Sales Agent

-- 1. Create expansion_opportunities table
CREATE TABLE IF NOT EXISTS expansion_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text,
  last_name text,
  job_title text,
  company_name text NOT NULL,
  company_size int,
  seniority text,
  linkedin_url text,
  source text NOT NULL,
  source_email text,
  contacted boolean DEFAULT false,
  created_at timestamp DEFAULT NOW()
);

-- Add indexes for expansion_opportunities
CREATE UNIQUE INDEX IF NOT EXISTS idx_expansion_email_source ON expansion_opportunities(email, source);
CREATE INDEX IF NOT EXISTS idx_expansion_company ON expansion_opportunities(company_name);
CREATE INDEX IF NOT EXISTS idx_expansion_source ON expansion_opportunities(source);

-- 2. Create email_queue table
CREATE TABLE IF NOT EXISTS email_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email text NOT NULL,
  recipient_name text,
  subject text NOT NULL,
  body text NOT NULL,
  scheduled_for timestamp NOT NULL,
  sent_at timestamp,
  status text DEFAULT 'pending',
  error_message text,
  created_at timestamp DEFAULT NOW()
);

-- Add index for email_queue
CREATE INDEX IF NOT EXISTS idx_email_queue_pending ON email_queue(status, scheduled_for);

-- 3. Add enrichment columns to existing tables
-- enrollment_leads
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'job_title') THEN
    ALTER TABLE enrollment_leads ADD COLUMN job_title text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'company_name') THEN
    ALTER TABLE enrollment_leads ADD COLUMN company_name text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'company_size') THEN
    ALTER TABLE enrollment_leads ADD COLUMN company_size int;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'seniority') THEN
    ALTER TABLE enrollment_leads ADD COLUMN seniority text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'enriched_at') THEN
    ALTER TABLE enrollment_leads ADD COLUMN enriched_at timestamp;
  END IF;
END $$;

-- orders
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'job_title') THEN
    ALTER TABLE orders ADD COLUMN job_title text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'company_name') THEN
    ALTER TABLE orders ADD COLUMN company_name text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'company_size') THEN
    ALTER TABLE orders ADD COLUMN company_size int;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'seniority') THEN
    ALTER TABLE orders ADD COLUMN seniority text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'enriched_at') THEN
    ALTER TABLE orders ADD COLUMN enriched_at timestamp;
  END IF;
END $$;

-- assessment_emails
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'job_title') THEN
    ALTER TABLE assessment_emails ADD COLUMN job_title text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'company_name') THEN
    ALTER TABLE assessment_emails ADD COLUMN company_name text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'company_size') THEN
    ALTER TABLE assessment_emails ADD COLUMN company_size int;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'seniority') THEN
    ALTER TABLE assessment_emails ADD COLUMN seniority text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'enriched_at') THEN
    ALTER TABLE assessment_emails ADD COLUMN enriched_at timestamp;
  END IF;
END $$;

-- Grant permissions (adjust as needed for your RLS policies)
-- ALTER TABLE expansion_opportunities ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
