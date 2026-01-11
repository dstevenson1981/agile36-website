-- Fix 100OFF Promo Code - Extend Expiration Date
-- Run this in Supabase SQL Editor to ensure 100OFF code is active and working

-- Step 1: Update 100OFF to extend expiration to end of 2026
UPDATE promo_codes 
SET 
  active = TRUE,
  expires_at = '2026-12-31 23:59:59+00'::timestamptz,
  updated_at = NOW()
WHERE UPPER(TRIM(code)) = '100OFF';

-- Step 2: If 100OFF doesn't exist, create it
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
SELECT 
  '100OFF',
  'fixed',
  100,
  'End of Year Sale - $100 Off',
  TRUE,
  '2026-12-31 23:59:59+00'::timestamptz,
  NULL,
  0,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM promo_codes WHERE UPPER(TRIM(code)) = '100OFF'
);

-- Step 3: Verify 100OFF is active
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
WHERE UPPER(TRIM(code)) = '100OFF';

-- Step 4: Show all active promo codes
SELECT 
  code, 
  discount_type,
  discount_value,
  description,
  expires_at,
  CASE 
    WHEN NOT active THEN 'INACTIVE'
    WHEN expires_at < NOW() THEN 'EXPIRED'
    ELSE 'ACTIVE ✓'
  END as status
FROM promo_codes 
WHERE active = TRUE 
  AND (expires_at IS NULL OR expires_at > NOW())
ORDER BY code;



















