-- Black Friday 2024 Promo Code: BF200
-- $200 OFF - Today Only
-- This promo code provides a fixed $200 discount

-- Insert the BF200 promo code
-- Expires at end of today (11:59:59 PM UTC)
INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit)
VALUES 
  ('BF200', 'fixed', 200, 'Black Friday Sale - $200 Off - Today Only', TRUE, 
   (CURRENT_DATE + INTERVAL '1 day' - INTERVAL '1 second')::timestamp, 
   NULL)
ON CONFLICT (code) 
DO UPDATE SET
  discount_type = EXCLUDED.discount_type,
  discount_value = EXCLUDED.discount_value,
  description = EXCLUDED.description,
  active = EXCLUDED.active,
  expires_at = EXCLUDED.expires_at,
  updated_at = NOW();

-- Verify the promo code was created/updated
SELECT code, discount_type, discount_value, description, active, expires_at 
FROM promo_codes 
WHERE code = 'BF200';

