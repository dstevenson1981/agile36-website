-- Add FUTURE20 Promo Code: 20% Off
-- This promo code provides a 20% percentage discount

-- First, delete any existing FUTURE20 codes (in case of case mismatches)
DELETE FROM promo_codes WHERE UPPER(code) = 'FUTURE20';

-- Insert the FUTURE20 promo code
-- 20% off discount, no expiration date (set to NULL for unlimited time)
-- Storing in uppercase to ensure consistency
INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit, usage_count)
VALUES 
  ('FUTURE20', 'percentage', 20, 'Future Special - 20% Off', TRUE, 
   NULL, 
   NULL,
   0)
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = 'percentage',
  discount_value = 20,
  description = 'Future Special - 20% Off',
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
WHERE code = 'FUTURE20' OR UPPER(code) = 'FUTURE20';







