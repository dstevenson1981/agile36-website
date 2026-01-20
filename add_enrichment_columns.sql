-- Add enrichment columns to customers table
-- Run this in Supabase SQL Editor BEFORE running the Apollo enrichment script

-- Add Apollo enrichment columns
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS apollo_id TEXT,
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS company_website TEXT,
ADD COLUMN IF NOT EXISTS company_size TEXT,
ADD COLUMN IF NOT EXISTS company_industry TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS seniority TEXT,
ADD COLUMN IF NOT EXISTS departments TEXT,
ADD COLUMN IF NOT EXISTS enriched_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Create index on apollo_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_customers_apollo_id ON customers(apollo_id);

-- Create index on enriched_at for filtering
CREATE INDEX IF NOT EXISTS idx_customers_enriched_at ON customers(enriched_at);

-- Add comments for documentation
COMMENT ON COLUMN customers.apollo_id IS 'Apollo.io person ID';
COMMENT ON COLUMN customers.job_title IS 'Job title from Apollo';
COMMENT ON COLUMN customers.company_name IS 'Company name from Apollo';
COMMENT ON COLUMN customers.enriched_at IS 'Timestamp when customer was enriched with Apollo data';
