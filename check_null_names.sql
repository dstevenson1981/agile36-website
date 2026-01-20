-- Check customers with null names
-- Run this in Supabase SQL Editor

-- Count customers with null names
SELECT COUNT(*) as customers_with_null_names
FROM customers
WHERE name IS NULL;

-- List all customers with null names (with their email and stripe_customer_id)
SELECT 
  email,
  stripe_customer_id,
  course_slug,
  total_spend,
  first_purchase_date,
  last_purchase_date
FROM customers
WHERE name IS NULL
ORDER BY last_purchase_date DESC NULLS LAST, email;

-- Count null names by course_slug
SELECT 
  course_slug,
  COUNT(*) as null_name_count
FROM customers
WHERE name IS NULL
GROUP BY course_slug
ORDER BY null_name_count DESC;

-- Summary: Total customers vs customers with names
SELECT 
  COUNT(*) as total_customers,
  COUNT(name) as customers_with_names,
  COUNT(*) - COUNT(name) as customers_with_null_names,
  ROUND(100.0 * COUNT(name) / COUNT(*), 2) as percent_with_names
FROM customers;
