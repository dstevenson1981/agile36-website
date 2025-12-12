-- Add 250OFF Promo Code: $250 OFF
-- This promo code provides a fixed $250 discount

-- First, delete any existing 250OFF codes (in case of case mismatches)
DELETE FROM promo_codes WHERE UPPER(code) = '250OFF';

-- Insert the 250OFF promo code
-- $250 off discount, no expiration date (set to NULL for unlimited time)
-- Storing in uppercase to ensure consistency
INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit, usage_count)
VALUES
  ('250OFF', 'fixed', 250, '$250 Off Discount', TRUE,
   NULL,
   NULL,
   0)
ON CONFLICT (code)
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 250,
  description = '$250 Off Discount',
  active = TRUE,
  expires_at = NULL,
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
    WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'EXPIRED'
    WHEN NOT active THEN 'INACTIVE'
    WHEN usage_limit IS NOT NULL AND usage_count >= usage_limit THEN 'USAGE LIMIT REACHED'
    ELSE 'VALID'
  END as status,
  NOW() as current_time
FROM promo_codes
WHERE code = '250OFF' OR UPPER(code) = '250OFF';
