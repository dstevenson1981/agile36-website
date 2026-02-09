-- Enable 150OFF: $150 off for ALL classes EXCEPT Lean Portfolio Management and Agile Product Management
-- Code: 150OFF
-- Run in Supabase SQL Editor. Run supabase-add-excluded-courses-to-promo-codes.sql first if the column is missing.

-- Ensure excluded_course_slugs column exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'promo_codes' AND column_name = 'excluded_course_slugs'
  ) THEN
    ALTER TABLE promo_codes ADD COLUMN excluded_course_slugs TEXT[] DEFAULT NULL;
  END IF;
END $$;

-- Remove any existing 150OFF so we can insert with exclusions
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '150OFF';

-- Insert 150OFF: applies to all courses EXCEPT lean-portfolio-management and agile-product-management
INSERT INTO promo_codes (
  code,
  discount_type,
  discount_value,
  description,
  active,
  expires_at,
  usage_limit,
  usage_count,
  course_slug,
  excluded_course_slugs,
  created_at,
  updated_at
)
VALUES (
  '150OFF',
  'fixed',
  150,
  '$150 Off (excludes LPM & APM)',
  TRUE,
  '2026-12-31 23:59:59+00'::timestamptz,
  NULL,
  0,
  NULL,  -- NULL = all courses
  ARRAY['lean-portfolio-management', 'agile-product-management'],
  NOW(),
  NOW()
);

-- If your table does not have excluded_course_slugs, use this variant instead (no exclusions column):
-- INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit, usage_count, course_slug, created_at, updated_at)
-- VALUES ('150OFF', 'fixed', 150, '$150 Off', TRUE, '2026-12-31 23:59:59+00'::timestamptz, NULL, 0, NULL, NOW(), NOW());

-- Verify
SELECT
  code,
  discount_type,
  discount_value,
  description,
  active,
  course_slug,
  excluded_course_slugs,
  expires_at
FROM promo_codes
WHERE UPPER(TRIM(code)) = '150OFF';
