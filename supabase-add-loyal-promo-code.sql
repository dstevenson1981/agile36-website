-- Promo code LOYAL — $115 off (fixed)
-- Run in Supabase SQL Editor (or use Agile36_Production).

DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'LOYAL';

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
    'loyal',
    'fixed',
    115,
    'Loyal customer — $115 off',
    TRUE,
    NULL,
    NULL,
    0,
    NOW(),
    NOW()
  );

SELECT code, discount_type, discount_value, description, active, expires_at
FROM promo_codes
WHERE UPPER(TRIM(code)) = 'LOYAL';
