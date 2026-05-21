-- Memorial Day 100OFF — expires May 25, 2026 (run in Supabase SQL Editor)

UPDATE promo_codes
SET
  active = TRUE,
  description = 'Memorial Day Sale - $100 Off',
  expires_at = '2026-05-25 23:59:59+00'::timestamptz,
  updated_at = NOW()
WHERE UPPER(TRIM(code)) = '100OFF';

SELECT code, active, expires_at, expires_at < NOW() AS is_expired
FROM promo_codes
WHERE UPPER(TRIM(code)) = '100OFF';
