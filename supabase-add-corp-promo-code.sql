-- Corporate discount: $100 off
-- Code: corp

DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'CORP';

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
  'corp',
  'fixed',
  100,
  'Corporate discount - $100 Off',
  TRUE,
  NULL,
  NULL,
  0,
  NOW(),
  NOW()
);

SELECT
  code,
  discount_type,
  discount_value,
  active,
  expires_at,
  description,
  CASE
    WHEN NOT active THEN 'INACTIVE'
    WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'EXPIRED'
    ELSE 'ACTIVE'
  END AS status
FROM promo_codes
WHERE UPPER(TRIM(code)) = 'CORP';
