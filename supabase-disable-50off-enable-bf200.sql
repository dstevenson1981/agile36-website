-- Disable 50OFF and ensure BF200 is active
-- Run this in Supabase SQL Editor

-- Step 1: Disable 50OFF (set to inactive and expire it)
UPDATE promo_codes 
SET 
  active = FALSE,
  expires_at = NOW() - INTERVAL '1 day',
  updated_at = NOW()
WHERE UPPER(TRIM(code)) = '50OFF';

-- Step 2: Ensure BF200 exists and is active
-- Delete any existing BF200 first
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'BF200';

-- Insert BF200 with correct settings
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
    'BF200',                    -- Exact code
    'fixed',                    -- Fixed dollar amount
    200,                        -- $200 discount
    'Black Friday Sale - $200 Off', 
    TRUE,                       -- ACTIVE
    '2024-11-29 23:59:59+00'::timestamptz,  -- Expires Nov 29, 2024
    NULL,                       -- No usage limit
    0,                          -- Usage count starts at 0
    NOW(),
    NOW()
  )
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 200,
  description = 'Black Friday Sale - $200 Off',
  active = TRUE,
  expires_at = '2024-11-29 23:59:59+00'::timestamptz,
  updated_at = NOW();

-- Step 3: Verify all promo codes status
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
WHERE UPPER(TRIM(code)) IN ('50OFF', 'BF200', '100OFF', '150OFF')
ORDER BY code;

-- Step 4: Show all active promo codes
SELECT 
  code, 
  discount_value,
  expires_at,
  'ACTIVE' as status
FROM promo_codes 
WHERE active = TRUE 
  AND (expires_at IS NULL OR expires_at > NOW())
ORDER BY code;

