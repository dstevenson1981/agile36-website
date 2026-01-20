-- Find customers with corporate email addresses
-- Run this in Supabase SQL Editor

-- Common free email providers to exclude
-- Corporate emails are those NOT using these domains

-- Count corporate vs personal emails
SELECT 
  COUNT(*) as total_customers,
  COUNT(CASE 
    WHEN email NOT ILIKE '%@gmail.com' 
      AND email NOT ILIKE '%@yahoo.com'
      AND email NOT ILIKE '%@hotmail.com'
      AND email NOT ILIKE '%@outlook.com'
      AND email NOT ILIKE '%@icloud.com'
      AND email NOT ILIKE '%@aol.com'
      AND email NOT ILIKE '%@live.com'
      AND email NOT ILIKE '%@msn.com'
      AND email NOT ILIKE '%@protonmail.com'
      AND email NOT ILIKE '%@mail.com'
      AND email NOT ILIKE '%@yandex.com'
      AND email NOT ILIKE '%@zoho.com'
      AND email NOT ILIKE '%@gmx.com'
    THEN 1 
  END) as corporate_emails,
  COUNT(CASE 
    WHEN email ILIKE '%@gmail.com' 
      OR email ILIKE '%@yahoo.com'
      OR email ILIKE '%@hotmail.com'
      OR email ILIKE '%@outlook.com'
      OR email ILIKE '%@icloud.com'
      OR email ILIKE '%@aol.com'
      OR email ILIKE '%@live.com'
      OR email ILIKE '%@msn.com'
      OR email ILIKE '%@protonmail.com'
      OR email ILIKE '%@mail.com'
      OR email ILIKE '%@yandex.com'
      OR email ILIKE '%@zoho.com'
      OR email ILIKE '%@gmx.com'
    THEN 1 
  END) as personal_emails
FROM customers;

-- List all customers with corporate email addresses
SELECT 
  email,
  name,
  stripe_customer_id,
  course_slug,
  total_spend,
  first_purchase_date,
  last_purchase_date,
  -- Extract domain for analysis
  SUBSTRING(email FROM POSITION('@' IN email) + 1) as email_domain
FROM customers
WHERE email NOT ILIKE '%@gmail.com' 
  AND email NOT ILIKE '%@yahoo.com'
  AND email NOT ILIKE '%@hotmail.com'
  AND email NOT ILIKE '%@outlook.com'
  AND email NOT ILIKE '%@icloud.com'
  AND email NOT ILIKE '%@aol.com'
  AND email NOT ILIKE '%@live.com'
  AND email NOT ILIKE '%@msn.com'
  AND email NOT ILIKE '%@protonmail.com'
  AND email NOT ILIKE '%@mail.com'
  AND email NOT ILIKE '%@yandex.com'
  AND email NOT ILIKE '%@zoho.com'
  AND email NOT ILIKE '%@gmx.com'
ORDER BY total_spend DESC NULLS LAST, email;

-- Count corporate emails by domain (top 20)
SELECT 
  SUBSTRING(email FROM POSITION('@' IN email) + 1) as email_domain,
  COUNT(*) as customer_count,
  SUM(total_spend) as total_revenue,
  AVG(total_spend) as avg_spend
FROM customers
WHERE email NOT ILIKE '%@gmail.com' 
  AND email NOT ILIKE '%@yahoo.com'
  AND email NOT ILIKE '%@hotmail.com'
  AND email NOT ILIKE '%@outlook.com'
  AND email NOT ILIKE '%@icloud.com'
  AND email NOT ILIKE '%@aol.com'
  AND email NOT ILIKE '%@live.com'
  AND email NOT ILIKE '%@msn.com'
  AND email NOT ILIKE '%@protonmail.com'
  AND email NOT ILIKE '%@mail.com'
  AND email NOT ILIKE '%@yandex.com'
  AND email NOT ILIKE '%@zoho.com'
  AND email NOT ILIKE '%@gmx.com'
GROUP BY email_domain
ORDER BY customer_count DESC
LIMIT 20;

-- Corporate emails by course
SELECT 
  course_slug,
  COUNT(*) as corporate_customer_count,
  SUM(total_spend) as total_revenue
FROM customers
WHERE email NOT ILIKE '%@gmail.com' 
  AND email NOT ILIKE '%@yahoo.com'
  AND email NOT ILIKE '%@hotmail.com'
  AND email NOT ILIKE '%@outlook.com'
  AND email NOT ILIKE '%@icloud.com'
  AND email NOT ILIKE '%@aol.com'
  AND email NOT ILIKE '%@live.com'
  AND email NOT ILIKE '%@msn.com'
  AND email NOT ILIKE '%@protonmail.com'
  AND email NOT ILIKE '%@mail.com'
  AND email NOT ILIKE '%@yandex.com'
  AND email NOT ILIKE '%@zoho.com'
  AND email NOT ILIKE '%@gmx.com'
GROUP BY course_slug
ORDER BY corporate_customer_count DESC;
