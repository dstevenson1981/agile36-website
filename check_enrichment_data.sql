-- Check enrichment data in customers table
-- Run this in Supabase SQL Editor

-- Sample enriched customers with their data
SELECT 
  email,
  name,
  job_title,
  company_name,
  company_website,
  apollo_id,
  enriched_at
FROM customers
WHERE apollo_id IS NOT NULL
ORDER BY enriched_at DESC
LIMIT 20;

-- Count enriched customers and how many have job_title/company_name
SELECT 
  COUNT(*) as total_enriched,
  COUNT(job_title) as with_job_title,
  COUNT(company_name) as with_company_name,
  COUNT(linkedin_url) as with_linkedin,
  COUNT(city) as with_city
FROM customers
WHERE apollo_id IS NOT NULL;

-- Check if columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'customers' 
  AND column_name IN ('job_title', 'company_name', 'apollo_id', 'enriched_at')
ORDER BY column_name;
