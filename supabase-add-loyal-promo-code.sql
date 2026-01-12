-- Add Loyal Promo Code - $201 Off
-- Run this in Supabase SQL Editor to create the Loyal promo code

-- Step 1: Delete any existing Loyal code to start fresh
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'LOYAL';

-- Step 2: Insert Loyal with correct settings
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
    'Loyal',                    -- Code name
    'fixed',                     -- Fixed dollar amount ($201 off)
    201,                         -- $201 discount
    'Loyal Customer Discount - $201 Off', 
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
  discount_value = 201,
  description = 'Loyal Customer Discount - $201 Off',
  active = TRUE,
  expires_at = NULL,
  updated_at = NOW();

-- Step 3: Verify Loyal code is active
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
WHERE UPPER(TRIM(code)) = 'LOYAL';
