-- RESTORE ORIGINAL PRICES after testing
-- Run this to restore prices back to their original values
-- WARNING: Only run this if you have a backup of original prices!

-- If you need to restore, you'll need to know the original prices
-- Here's a template - you'll need to fill in the actual prices

-- Example: Restore specific schedule
/*
UPDATE course_schedules 
SET price = '515.00', original_price = '1030.00'
WHERE id = 'YOUR_SCHEDULE_ID';
*/

-- To be safe, check what prices are currently set to $1
SELECT id, course_name, start_date, price, original_price 
FROM course_schedules 
WHERE price = '1.00';

-- Then manually update each one back to its original price
-- OR export the data before running the $1 update so you can restore



