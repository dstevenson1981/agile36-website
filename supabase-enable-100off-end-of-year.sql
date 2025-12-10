-- Enable 100OFF Promo Code for End of Year Sale
-- Run this in Supabase SQL Editor to ensure 100OFF code is active and working
-- This code expires at the end of today (23:59:59)

-- Step 1: Delete any existing 100OFF to start fresh
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '100OFF';

-- Step 2: Insert 100OFF with correct settings
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
    '100OFF',                    -- Exact code
    'fixed',                     -- Fixed dollar amount ($100 off)
    100,                         -- $100 discount
    'End of Year Sale - $100 Off', 
    TRUE,                       -- ACTIVE
    (DATE_TRUNC('day', NOW()) + INTERVAL '1 day' - INTERVAL '1 second')::timestamptz,  -- Expires end of today (23:59:59)
    NULL,                       -- No usage limit
    0,                          -- Usage count starts at 0
    NOW(),
    NOW()
  )
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 100,
  description = 'End of Year Sale - $100 Off',
  active = TRUE,
  expires_at = (DATE_TRUNC('day', NOW()) + INTERVAL '1 day' - INTERVAL '1 second')::timestamptz,
  updated_at = NOW();

-- Step 3: Disable 50OFF (End of Year Sale replaces it)
UPDATE promo_codes 
SET 
  active = FALSE,
  expires_at = NOW() - INTERVAL '1 day',
  updated_at = NOW()
WHERE UPPER(TRIM(code)) = '50OFF';

-- Step 4: Verify 100OFF is active
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







