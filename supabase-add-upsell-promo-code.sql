/* Upsell promo code: UPSKILL = $200 off (for 30-day post-course upsell emails). Run in Supabase SQL Editor. */

DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'UPSKILL';

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
  'UPSKILL',
  'fixed',
  200,
  'Upsell - $200 off next course (returning customer)',
  TRUE,
  '2026-12-31 23:59:59+00'::timestamptz,
  NULL,
  0,
  NOW(),
  NOW()
);

SELECT code, discount_type, discount_value, active, expires_at
FROM promo_codes
WHERE UPPER(TRIM(code)) = 'UPSKILL';
