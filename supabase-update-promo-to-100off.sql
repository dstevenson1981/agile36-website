-- Update Black Friday promo code from $150 to $100
-- Run this in Supabase SQL Editor

-- Update the existing 150OFF code to 100OFF with $100 discount
UPDATE promo_codes
SET 
  code = '100OFF',
  discount_value = 100,
  description = 'Black Friday Sale - $100 Off',
  updated_at = NOW()
WHERE code = '150OFF';

-- Verify the change
SELECT code, discount_type, discount_value, description, active, expires_at
FROM promo_codes
WHERE code = '100OFF';

-- Note: You can change this back to 150OFF on Black Friday by running:
-- UPDATE promo_codes SET code = '150OFF', discount_value = 150, description = 'Black Friday Sale - $150 Off' WHERE code = '100OFF';



















