-- View all enriched customers with their Apollo data
-- Run this in Supabase SQL Editor

-- Complete list of all enriched customers with all enrichment data
SELECT 
  email,
  name,
  first_name,
  last_name,
  job_title,
  company_name,
  company_website,
  company_size,
  company_industry,
  linkedin_url,
  phone_number,
  city,
  state,
  country,
  seniority,
  departments,
  course_slug,
  total_spend,
  apollo_id,
  enriched_at,
  first_purchase_date,
  last_purchase_date
FROM customers
WHERE apollo_id IS NOT NULL
ORDER BY enriched_at DESC;

-- Summary statistics
SELECT 
  COUNT(*) as total_enriched_customers,
  COUNT(job_title) as with_job_title,
  COUNT(company_name) as with_company_name,
  COUNT(linkedin_url) as with_linkedin,
  COUNT(phone_number) as with_phone,
  COUNT(city) as with_location,
  COUNT(DISTINCT company_name) as unique_companies
FROM customers
WHERE apollo_id IS NOT NULL;

-- Top companies by customer count
SELECT 
  company_name,
  COUNT(*) as customer_count,
  SUM(total_spend) as total_revenue
FROM customers
WHERE apollo_id IS NOT NULL
  AND company_name IS NOT NULL
GROUP BY company_name
ORDER BY customer_count DESC
LIMIT 20;

-- Top job titles
SELECT 
  job_title,
  COUNT(*) as count
FROM customers
WHERE apollo_id IS NOT NULL
  AND job_title IS NOT NULL
GROUP BY job_title
ORDER BY count DESC
LIMIT 20;
