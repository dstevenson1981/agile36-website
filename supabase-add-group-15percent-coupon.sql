-- Add GROUP Promo Code - 15% Off
-- Run this in Supabase SQL Editor to add the GROUP coupon code

-- Step 1: Delete any existing GROUP code to start fresh
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'GROUP';

-- Step 2: Insert GROUP with 15% discount
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
    'GROUP',                    -- Exact code
    'percentage',               -- Percentage discount (15% off)
    15,                        -- 15% discount
    'GROUP - 15% Off', 
    TRUE,                      -- ACTIVE
    '2026-12-31 23:59:59+00'::timestamptz,  -- Expires Dec 31, 2026 (adjust as needed)
    NULL,                      -- No usage limit
    0,                         -- Usage count starts at 0
    NOW(),
    NOW()
  )
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = 'percentage',
  discount_value = 15,
  description = 'GROUP - 15% Off',
  active = TRUE,
  expires_at = '2026-12-31 23:59:59+00'::timestamptz,
  updated_at = NOW();

-- Step 3: Verify GROUP is active
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
WHERE UPPER(TRIM(code)) = 'GROUP';

-- Step 4: Show all active promo codes
SELECT 
  code, 
  discount_type,
  discount_value,
  description,
  expires_at,
  'ACTIVE' as status
FROM promo_codes 
WHERE active = TRUE 
  AND (expires_at IS NULL OR expires_at > NOW())
ORDER BY code;









