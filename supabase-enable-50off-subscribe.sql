-- Enable 50OFF ($50 fixed) for email-subscribe promo flow
-- Run in Supabase SQL Editor after deploying site changes.
-- Optional: deactivate 100OFF so only 50OFF matches the new campaign.

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
  '50OFF',
  'fixed',
  50,
  'Newsletter / banner signup - $50 Off',
  TRUE,
  NULL,
  NULL,
  0,
  NOW(),
  NOW()
)
ON CONFLICT (code)
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 50,
  description = EXCLUDED.description,
  active = TRUE,
  updated_at = NOW();

-- Optional: turn off old public code
-- UPDATE promo_codes SET active = FALSE, updated_at = NOW() WHERE UPPER(TRIM(code)) = '100OFF';
