-- SASM465: $485 off Advanced Scrum Master ($950 Basic → $465/seat)
-- Optional DB row; production also enforces via app (validate-promo-code + create-payment-intent).

DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'SASM465';

INSERT INTO promo_codes (
  code,
  discount_type,
  discount_value,
  description,
  active,
  expires_at,
  usage_limit,
  usage_count,
  course_slug
)
VALUES (
  'SASM465',
  'fixed',
  485,
  'Advanced Scrum Master — $465 per seat (Basic, $950 list)',
  TRUE,
  NULL,
  NULL,
  0,
  'advanced-scrum-master'
);

SELECT code, discount_value, course_slug, active FROM promo_codes WHERE code = 'SASM465';
