-- Fix existing Agile Product Management course dates from 2025 to 2026
-- Run this in Supabase SQL Editor to update existing records

UPDATE course_schedules
SET 
  start_date = start_date + INTERVAL '1 year',
  end_date = end_date + INTERVAL '1 year'
WHERE course_slug = 'agile-product-management'
  AND EXTRACT(YEAR FROM start_date) = 2025;

-- Verify the update
SELECT 
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  instructor_name,
  is_weekend
FROM course_schedules 
WHERE course_slug = 'agile-product-management'
  AND start_date >= '2026-01-27'
  AND start_date <= '2026-05-15'
ORDER BY start_date;
