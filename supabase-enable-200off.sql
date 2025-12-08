-- Enable 200OFF Promo Code
-- Run this in Supabase SQL Editor to ensure 200OFF code is active and working

-- Step 1: Delete any existing 200OFF to start fresh
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '200OFF';

-- Step 2: Insert 200OFF with correct settings
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
VALUES 
  (
    '200OFF',                    -- Exact code
    'fixed',                     -- Fixed dollar amount ($200 off)
    200,                         -- $200 discount
    '200OFF Special - $200 Off', 
    TRUE,                       -- ACTIVE
    '2026-12-31 23:59:59+00'::timestamptz,  -- Expires Dec 31, 2026
    NULL,                       -- No usage limit
    0,                          -- Usage count starts at 0
    NOW(),
    NOW()
  )
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 200,
  description = '200OFF Special - $200 Off',
  active = TRUE,
  expires_at = '2026-12-31 23:59:59+00'::timestamptz,
  updated_at = NOW();

-- Step 3: Verify 200OFF is active
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
WHERE UPPER(TRIM(code)) = '200OFF';

-- Step 4: Show all active promo codes
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




