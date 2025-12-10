-- Debug query for BF200 promo code
-- Run this in Supabase SQL Editor to check the current state

-- Check if BF200 exists (case-insensitive)
SELECT 
  code, 
  discount_type, 
  discount_value, 
  description, 
  active, 
  expires_at,
  usage_limit,
  usage_count,
  created_at,
  updated_at,
  -- Check expiration status
  CASE 
    WHEN expires_at IS NULL THEN 'NO EXPIRATION'
    WHEN expires_at < NOW() THEN 'EXPIRED'
    WHEN expires_at >= NOW() THEN 'VALID (not expired)'
  END as expiration_status,
  -- Check if code is currently valid
  CASE 
    WHEN NOT active THEN 'INACTIVE'
    WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'EXPIRED'
    WHEN usage_limit IS NOT NULL AND usage_count >= usage_limit THEN 'USAGE LIMIT REACHED'
    ELSE 'VALID'
  END as overall_status,
  NOW() as current_time_utc,
  expires_at - NOW() as time_until_expiration
FROM promo_codes 
WHERE UPPER(code) = UPPER('BF200')
   OR code ILIKE '%BF200%';

-- Check all promo codes to see what's in the database
SELECT 
  code, 
  active, 
  expires_at,
  expires_at < NOW() as is_expired,
  discount_type,
  discount_value
FROM promo_codes 
ORDER BY created_at DESC
LIMIT 10;







