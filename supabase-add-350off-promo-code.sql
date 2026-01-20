-- Add $350 Off Promo Code
-- Run this in Supabase SQL Editor to create the $350 off promo code

-- Step 1: Delete any existing 350OFF code to start fresh
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '350OFF';

-- Step 2: Insert 350OFF with correct settings
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
    '350OFF',                   -- Code name
    'fixed',                     -- Fixed dollar amount ($350 off)
    350,                         -- $350 discount
    'Special Discount - $350 Off', 
    TRUE,                       -- ACTIVE
    NULL,                       -- No expiration (or set expiration date if needed)
    NULL,                       -- No usage limit
    0,                          -- Usage count starts at 0
    NOW(),
    NOW()
  )
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 350,
  description = 'Special Discount - $350 Off',
  active = TRUE,
  expires_at = NULL,
  updated_at = NOW();

-- Step 3: Verify 350OFF code is active
SELECT 
  code, 
  discount_type, 
  discount_value, 
  active, 
  expires_at,
  usage_count,
  usage_limit,
  CASE 
    WHEN NOT active THEN 'INACTIVE'
    WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'EXPIRED'
    ELSE 'ACTIVE ✓'
  END as status
FROM promo_codes 
WHERE UPPER(TRIM(code)) = '350OFF';
