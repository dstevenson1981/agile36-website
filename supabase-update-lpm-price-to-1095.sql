-- Update Lean Portfolio Management (LPM) course price to $1,095
-- Run this in Supabase SQL Editor to update all LPM schedules

UPDATE course_schedules
SET 
  price = 1095.00,
  original_price = 2190.00,
  updated_at = NOW()
WHERE course_slug = 'lean-portfolio-management';

-- Verify the update
SELECT 
  course_name,
  course_slug,
  price,
  original_price,
  start_date,
  end_date
FROM course_schedules
WHERE course_slug = 'lean-portfolio-management'
ORDER BY start_date;







