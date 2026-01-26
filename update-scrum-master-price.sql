-- Update SAFe Scrum Master course prices to $515
-- Original price set to $1030 (50% discount)

UPDATE course_schedules
SET 
  price = '515.00',
  original_price = '1030.00'
WHERE 
  course_slug = 'scrum-master'
  AND status = 'active';

-- Verify the update
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  price,
  original_price,
  status
FROM course_schedules
WHERE course_slug = 'scrum-master'
ORDER BY start_date;
