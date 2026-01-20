-- Create tables for n8n AI Sales Agent workflows
-- Run this in Supabase SQL Editor before importing workflows

-- expansion_opportunities table
CREATE TABLE IF NOT EXISTS expansion_opportunities (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  existing_customer_email TEXT,
  prospect_email TEXT,
  prospect_name TEXT,
  prospect_first_name TEXT,
  prospect_last_name TEXT,
  prospect_title TEXT,
  prospect_seniority TEXT,
  prospect_linkedin TEXT,
  prospect_phone TEXT,
  company_size INTEGER,
  company_industry TEXT,
  source TEXT NOT NULL, -- 'abandoned_checkout_lookalike', 'customer_lookalike', 'assessment_lookalike', 'new_customer_expansion', 'website_visitor', 'hiring_company', 'high_value_expansion'
  opportunity_type TEXT, -- 'colleague', 'hot_hiring', 'high_value'
  opportunity_score INTEGER DEFAULT 0,
  contacted BOOLEAN DEFAULT FALSE,
  contacted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_expansion_company ON expansion_opportunities(company_name);
CREATE INDEX IF NOT EXISTS idx_expansion_source ON expansion_opportunities(source);
CREATE INDEX IF NOT EXISTS idx_expansion_contacted ON expansion_opportunities(contacted);
CREATE INDEX IF NOT EXISTS idx_expansion_score ON expansion_opportunities(opportunity_score);

-- outreach_log table
CREATE TABLE IF NOT EXISTS outreach_log (
  id SERIAL PRIMARY KEY,
  source_table TEXT NOT NULL,
  source_id INTEGER NOT NULL,
  email TEXT NOT NULL,
  workflow_name TEXT NOT NULL,
  channel TEXT DEFAULT 'email',
  subject TEXT,
  body TEXT,
  sent_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'sent',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_outreach_log_email ON outreach_log(email);
CREATE INDEX IF NOT EXISTS idx_outreach_log_source ON outreach_log(source_table, source_id);
CREATE INDEX IF NOT EXISTS idx_outreach_log_workflow ON outreach_log(workflow_name);
CREATE INDEX IF NOT EXISTS idx_outreach_log_created ON outreach_log(created_at DESC);

-- Add enrichment columns to enrollment_leads if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'job_title') THEN
    ALTER TABLE enrollment_leads ADD COLUMN job_title TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'company_name') THEN
    ALTER TABLE enrollment_leads ADD COLUMN company_name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'company_size') THEN
    ALTER TABLE enrollment_leads ADD COLUMN company_size INTEGER;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'seniority') THEN
    ALTER TABLE enrollment_leads ADD COLUMN seniority TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'linkedin_url') THEN
    ALTER TABLE enrollment_leads ADD COLUMN linkedin_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'phone_number') THEN
    ALTER TABLE enrollment_leads ADD COLUMN phone_number TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollment_leads' AND column_name = 'enriched_at') THEN
    ALTER TABLE enrollment_leads ADD COLUMN enriched_at TIMESTAMP;
  END IF;
END $$;

-- Add enrichment columns to orders if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'job_title') THEN
    ALTER TABLE orders ADD COLUMN job_title TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'company_name') THEN
    ALTER TABLE orders ADD COLUMN company_name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'company_size') THEN
    ALTER TABLE orders ADD COLUMN company_size INTEGER;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'upsell_offered') THEN
    ALTER TABLE orders ADD COLUMN upsell_offered BOOLEAN DEFAULT FALSE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'upsell_offered_at') THEN
    ALTER TABLE orders ADD COLUMN upsell_offered_at TIMESTAMP;
  END IF;
END $$;

-- Add enrichment columns to assessment_emails if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'exam_score') THEN
    ALTER TABLE assessment_emails ADD COLUMN exam_score INTEGER;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'job_title') THEN
    ALTER TABLE assessment_emails ADD COLUMN job_title TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'company_name') THEN
    ALTER TABLE assessment_emails ADD COLUMN company_name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'company_size') THEN
    ALTER TABLE assessment_emails ADD COLUMN company_size INTEGER;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'seniority') THEN
    ALTER TABLE assessment_emails ADD COLUMN seniority TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_emails' AND column_name = 'linkedin_url') THEN
    ALTER TABLE assessment_emails ADD COLUMN linkedin_url TEXT;
  END IF;
END $$;

-- Verify tables created
SELECT 
  'expansion_opportunities' as table_name,
  COUNT(*) as column_count
FROM information_schema.columns 
WHERE table_name = 'expansion_opportunities'
UNION ALL
SELECT 
  'outreach_log',
  COUNT(*)
FROM information_schema.columns 
WHERE table_name = 'outreach_log';
