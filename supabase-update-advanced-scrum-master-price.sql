-- Update Advanced Scrum Master course schedule prices to $599 (sale) / $1198 (original)
-- Run in Supabase SQL Editor so schedule and checkout match site pricing.

UPDATE course_schedules
SET 
  price = 599.00,
  original_price = 1198.00
WHERE 
  course_slug = 'advanced-scrum-master' 
  OR course_name LIKE '%Advanced Scrum Master%';
