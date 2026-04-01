-- Update Advanced Scrum Master course schedule prices to $599 (sale) / $1198 (original)
-- Run in Supabase SQL Editor so schedule and checkout match site pricing.

UPDATE course_schedules
SET 
  price = 599.00,
  original_price = 1198.00
WHERE 
  course_slug = 'advanced-scrum-master' 
  OR course_name LIKE '%Advanced Scrum Master%';

-- If you want to see what will be updated first, run this query:
-- SELECT course_name, course_slug, price, original_price 
-- FROM course_schedules 
-- WHERE course_slug = 'advanced-scrum-master' 
--    OR course_name LIKE '%Advanced Scrum Master%';
