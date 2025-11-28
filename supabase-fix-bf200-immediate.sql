-- IMMEDIATE FIX for BF200 promo code
-- Run this in Supabase SQL Editor RIGHT NOW

-- Step 1: Check if BF200 exists and its current state
SELECT 
  code, 
  active, 
  expires_at,
  expires_at < NOW() as is_expired,
  NOW() as current_time,
  discount_type,
  discount_value
FROM promo_codes 
WHERE UPPER(TRIM(code)) = 'BF200';

-- Step 2: Delete ALL variations of BF200 (case-insensitive)
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'BF200';

-- Step 3: Insert BF200 with correct settings
-- Expires: November 29, 2024 at 11:59:59 PM UTC
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
    'BF200',                    -- Exact code, uppercase
    'fixed',                    -- Fixed dollar amount
    200,                        -- $200 discount
    'Black Friday Sale - $200 Off', 
    TRUE,                       -- ACTIVE
    '2024-11-29 23:59:59+00'::timestamptz,  -- Expires Nov 29, 2024
    NULL,                       -- No usage limit
    0,                          -- Usage count starts at 0
    NOW(),
    NOW()
  );

-- Step 4: Verify it was created correctly
SELECT 
  code, 
  discount_type, 
  discount_value, 
  active, 
  expires_at,
  expires_at < NOW() as is_expired,
  NOW() as current_time_utc,
  CASE 
    WHEN NOT active THEN 'INACTIVE - FIX THIS!'
    WHEN expires_at < NOW() THEN 'EXPIRED - FIX THIS!'
    ELSE 'VALID ✓'
  END as status
FROM promo_codes 
WHERE code = 'BF200';

-- If status shows INACTIVE or EXPIRED, the code won't work!
-- Make sure active = TRUE and expires_at is in the future

