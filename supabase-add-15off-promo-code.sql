-- Add 15OFF Promo Code - 15% Off (for checkout "Available Promo Code" section)
-- Run this in Supabase SQL Editor

DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '15OFF';

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
  '15OFF',
  'percentage',
  15,
  '15% Off - Available at checkout',
  TRUE,
  '2026-12-31 23:59:59+00'::timestamptz,
  NULL,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (code)
DO UPDATE SET
  discount_type = 'percentage',
  discount_value = 15,
  description = '15% Off - Available at checkout',
  active = TRUE,
  expires_at = '2026-12-31 23:59:59+00'::timestamptz,
  updated_at = NOW();

-- Verify
SELECT code, discount_type, discount_value, description, active, expires_at
FROM promo_codes
WHERE UPPER(TRIM(code)) = '15OFF';
