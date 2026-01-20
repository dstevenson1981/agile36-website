-- Remove old company and title columns from customers table
-- Run this in Supabase SQL Editor

-- Drop the old columns (company and title) since we now use company_name and job_title from Apollo
ALTER TABLE customers 
DROP COLUMN IF EXISTS company,
DROP COLUMN IF EXISTS title;

-- Verify the columns are removed
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'customers' 
  AND column_name IN ('company', 'title', 'company_name', 'job_title')
ORDER BY column_name;
