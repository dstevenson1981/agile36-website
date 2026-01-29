-- Enable 50OFF Promo Code
-- Run this in Supabase SQL Editor to ensure 50OFF code is active and working.
-- If you see "column course_slug does not exist", run supabase-add-course-slug-to-promo-codes.sql first.

-- Step 1: Delete any existing 50OFF to start fresh
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '50OFF';

-- Step 2: Insert 50OFF with correct settings
INSERT INTO promo_codes (
  code,
  discount_type,
  discount_value,
  description,
  active,
  expires_at,
  usage_limit,
  usage_count,
  created_at,
  updated_at
)
VALUES (
  '50OFF',
  'fixed',
  50,
  '50OFF Special - $50 Off',
  TRUE,
  '2026-12-31 23:59:59+00'::timestamptz,
  NULL,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (code)
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 50,
  description = '50OFF Special - $50 Off',
  active = TRUE,
  expires_at = '2026-12-31 23:59:59+00'::timestamptz,
  updated_at = NOW();

-- Step 2b: Ensure 50OFF applies to all courses (clear course_slug if column exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'promo_codes' AND column_name = 'course_slug'
  ) THEN
    UPDATE promo_codes SET course_slug = NULL, updated_at = NOW() WHERE UPPER(TRIM(code)) = '50OFF';
  END IF;
END $$;

-- Step 3: Disable BF200 (Black Friday is over)
UPDATE promo_codes 
SET 
  active = FALSE,
  expires_at = NOW() - INTERVAL '1 day',
  updated_at = NOW()
WHERE UPPER(TRIM(code)) = 'BF200';

-- Step 4: Verify 50OFF is active
SELECT 
  code, 
  discount_type, 
  discount_value, 
  active, 
  expires_at,
  expires_at < NOW() as is_expired,
  CASE 
    WHEN NOT active THEN 'INACTIVE'
    WHEN expires_at < NOW() THEN 'EXPIRED'
    ELSE 'ACTIVE ✓'
  END as status
FROM promo_codes 
WHERE UPPER(TRIM(code)) = '50OFF';

-- Step 5: Show all active promo codes
SELECT 
  code, 
  discount_type,
  discount_value,
  expires_at,
  'ACTIVE' as status
FROM promo_codes 
WHERE active = TRUE 
  AND (expires_at IS NULL OR expires_at > NOW())
ORDER BY code;

