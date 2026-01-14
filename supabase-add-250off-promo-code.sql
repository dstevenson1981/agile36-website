-- Add $250 Off Promo Code
-- Run this in Supabase SQL Editor to create the $250 off promo code

-- Step 1: Delete any existing 250OFF code to start fresh
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '250OFF';

-- Step 2: Insert 250OFF with correct settings
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
    '250OFF',                   -- Code name
    'fixed',                     -- Fixed dollar amount ($250 off)
    250,                         -- $250 discount
    'Special Discount - $250 Off', 
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
  discount_value = 250,
  description = 'Special Discount - $250 Off',
  active = TRUE,
  expires_at = NULL,
  updated_at = NOW();

-- Step 3: Verify 250OFF code is active
SELECT 
  code, 
  discount_type, 
  discount_value, 
  active, 
  expires_at,
  CASE 
    WHEN NOT active THEN 'INACTIVE'
    WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'EXPIRED'
    ELSE 'ACTIVE ✓'
  END as status
FROM promo_codes 
WHERE UPPER(TRIM(code)) = '250OFF';
