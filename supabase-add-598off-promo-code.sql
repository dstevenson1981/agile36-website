-- 598OFF: $598 fixed discount (all courses). Run in Supabase SQL Editor if needed.

DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '598OFF';

INSERT INTO promo_codes (
  code,
  discount_type,
  discount_value,
  description,
  active,
  expires_at,
  usage_limit,
  usage_count,
  course_slug,
  created_at,
  updated_at
)
VALUES (
  '598OFF',
  'fixed',
  598,
  '$598 off — custom corporate / special pricing',
  TRUE,
  '2026-12-31 23:59:59+00'::timestamptz,
  NULL,
  0,
  NULL,
  NOW(),
  NOW()
);

SELECT code, discount_type, discount_value, active, expires_at
FROM promo_codes
WHERE UPPER(TRIM(code)) = '598OFF';
