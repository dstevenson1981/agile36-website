-- Black Friday 2024 Promo Code: BF200
-- $200 OFF - Expires November 29, 2024
-- This promo code provides a fixed $200 discount

-- First, delete any existing BF200 codes (in case of case mismatches)
DELETE FROM promo_codes WHERE UPPER(code) = 'BF200';

-- Insert the BF200 promo code
-- Expires at end of November 29, 2024 (11:59:59 PM UTC)
-- Storing in uppercase to ensure consistency
INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit, usage_count)
VALUES 
  ('BF200', 'fixed', 200, 'Black Friday Sale - $200 Off', TRUE, 
   '2024-11-29 23:59:59+00'::timestamptz, 
   NULL,
   0)
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 200,
  description = 'Black Friday Sale - $200 Off',
  active = TRUE,
  expires_at = '2024-11-29 23:59:59+00'::timestamptz,
  updated_at = NOW();

-- Verify the promo code was created/updated
SELECT 
  code, 
  discount_type, 
  discount_value, 
  description, 
  active, 
  expires_at,
  usage_limit,
  usage_count,
  CASE 
    WHEN expires_at < NOW() THEN 'EXPIRED'
    WHEN NOT active THEN 'INACTIVE'
    WHEN usage_limit IS NOT NULL AND usage_count >= usage_limit THEN 'USAGE LIMIT REACHED'
    ELSE 'VALID'
  END as status,
  NOW() as current_time,
  expires_at - NOW() as time_until_expiration
FROM promo_codes 
WHERE code = 'BF200' OR UPPER(code) = 'BF200';

-- Check all promo codes for troubleshooting
-- SELECT code, discount_type, discount_value, active, expires_at, 
--        expires_at < NOW() as is_expired,
--        NOW() as current_time
-- FROM promo_codes 
-- WHERE UPPER(code) LIKE '%BF200%' OR UPPER(code) LIKE '%200%';

