-- Update existing promo codes with new expiration dates
-- Run this in your Supabase SQL Editor to fix the expired codes

UPDATE promo_codes
SET 
  expires_at = '2026-12-31 23:59:59',
  updated_at = NOW()
WHERE code IN ('150OFF', 'SAVE25');

-- Verify the update
SELECT code, discount_type, discount_value, description, expires_at, active, usage_count
FROM promo_codes
WHERE code IN ('150OFF', 'SAVE25');

