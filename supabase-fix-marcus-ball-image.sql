-- Fix Marcus Ball instructor image path
-- Update all instances to use lowercase '/marcus.jpeg' instead of '/Marcus.jpeg'

UPDATE course_schedules
SET 
  instructor_image = '/marcus.jpeg',
  updated_at = NOW()
WHERE instructor_name = 'Marcus Ball'
  AND (instructor_image = '/Marcus.jpeg' OR instructor_image IS NULL OR instructor_image = '');

-- Verify the fix
SELECT 
  course_name,
  instructor_name,
  instructor_image,
  start_date
FROM course_schedules 
WHERE instructor_name = 'Marcus Ball'
ORDER BY start_date
LIMIT 10;




