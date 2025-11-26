-- Set price to $1.00 for testing Stripe integration with real credit card
-- Run this in Supabase SQL Editor to update prices for testing
-- 
-- IMPORTANT: 
-- - This will charge your real credit card $1.00
-- - The promo code "50OFF" gives $50 off, so don't use it with $1 price (would be negative)
-- - After testing, run supabase-restore-original-prices.sql to restore original prices
-- - Make a note of which schedules you update so you can restore them

-- Option 1: Update ALL active schedules to $1 (for comprehensive testing)
-- WARNING: This updates ALL active courses to $1
UPDATE course_schedules 
SET price = '1.00', original_price = '1.00'
WHERE status = 'active';

-- Option 2: Update only the FIRST upcoming schedule to $1 (safer, test one at a time)
-- Uncomment the lines below and comment out Option 1 above if you prefer this approach
/*
UPDATE course_schedules 
SET price = '1.00', original_price = '1.00'
WHERE id = (
  SELECT id 
  FROM course_schedules 
  WHERE status = 'active' 
    AND start_date >= NOW()
  ORDER BY start_date ASC 
  LIMIT 1
);
*/

-- Option 3: Update a specific schedule by ID (most precise)
-- Replace 'YOUR_SCHEDULE_ID' with the actual schedule ID you want to test
/*
UPDATE course_schedules 
SET price = '1.00', original_price = '1.00'
WHERE id = 'YOUR_SCHEDULE_ID';
*/

-- Verify the update
SELECT id, course_name, start_date, price, original_price, status 
FROM course_schedules 
WHERE price = '1.00' 
ORDER BY start_date ASC;

