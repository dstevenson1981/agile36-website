-- Update Advanced Scrum Master course schedule prices to $950 (sale) / $1900 (original)
-- This updates any existing schedule entries in the course_schedules table

UPDATE course_schedules
SET 
  price = 950.00,
  original_price = 1900.00
WHERE 
  course_slug = 'advanced-scrum-master' 
  OR course_name LIKE '%Advanced Scrum Master%';

-- If you want to see what will be updated first, run this query:
-- SELECT course_name, course_slug, price, original_price 
-- FROM course_schedules 
-- WHERE course_slug = 'advanced-scrum-master' 
--    OR course_name LIKE '%Advanced Scrum Master%';
