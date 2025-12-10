-- Add 300OFF Promo Code: $300 OFF
-- This promo code provides a fixed $300 discount

-- First, delete any existing 300OFF codes (in case of case mismatches)
DELETE FROM promo_codes WHERE UPPER(code) = '300OFF';

-- Insert the 300OFF promo code
-- $300 off discount, no expiration date (set to NULL for unlimited time)
-- Storing in uppercase to ensure consistency
INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit, usage_count)
VALUES 
  ('300OFF', 'fixed', 300, '$300 Off Discount', TRUE, 
   NULL, 
   NULL,
   0)
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 300,
  description = '$300 Off Discount',
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
WHERE code = '300OFF' OR UPPER(code) = '300OFF';
