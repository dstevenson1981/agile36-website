-- Keep customers as a slim person file: who, email, last course, when, spend, LinkedIn, company, role.
ALTER TABLE public.customers
  DROP COLUMN IF EXISTS stripe_customer_id,
  DROP COLUMN IF EXISTS total_courses,
  DROP COLUMN IF EXISTS enriched,
  DROP COLUMN IF EXISTS apollo_id,
  DROP COLUMN IF EXISTS company_website,
  DROP COLUMN IF EXISTS company_size,
  DROP COLUMN IF EXISTS company_industry,
  DROP COLUMN IF EXISTS phone_number,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS state,
  DROP COLUMN IF EXISTS country,
  DROP COLUMN IF EXISTS seniority,
  DROP COLUMN IF EXISTS departments,
  DROP COLUMN IF EXISTS enriched_at,
  DROP COLUMN IF EXISTS first_name,
  DROP COLUMN IF EXISTS last_name;
