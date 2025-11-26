-- QUICK TEST: Set ALL active schedules to $1.00
-- Copy and paste this ENTIRE block into Supabase SQL Editor and run it

UPDATE course_schedules 
SET price = '1.00', original_price = '1.00'
WHERE status = 'active';

-- Verify it worked
SELECT id, course_name, start_date, price, original_price 
FROM course_schedules 
WHERE price = '1.00' 
ORDER BY start_date ASC 
LIMIT 10;
