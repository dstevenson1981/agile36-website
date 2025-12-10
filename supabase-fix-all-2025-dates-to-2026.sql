-- Fix all course schedules: Update dates from January 1, 2025 onwards to 2026
-- EXCEPT December 2025 dates which should remain as 2025
-- This ensures all courses scheduled from Jan 1, 2025 onwards are correctly set to 2026

-- Update all courses where start_date is between Jan 1, 2025 and Nov 30, 2025
-- These should all be changed to 2026 (add 1 year)
UPDATE course_schedules
SET 
  start_date = (start_date + INTERVAL '1 year')::timestamp with time zone,
  end_date = (end_date + INTERVAL '1 year')::timestamp with time zone,
  updated_at = NOW()
WHERE 
  -- Only update dates from Jan 1, 2025 to Nov 30, 2025
  start_date >= '2025-01-01'::timestamp with time zone
  AND start_date < '2025-12-01'::timestamp with time zone
  -- Don't update if it's already 2026 or later
  AND EXTRACT(YEAR FROM start_date) = 2025;

-- Verify the updates
SELECT 
  course_name,
  course_slug,
  start_date,
  end_date,
  EXTRACT(YEAR FROM start_date) as year,
  CASE 
    WHEN start_date >= '2026-01-01' AND start_date < '2026-12-01' THEN '✓ Correct (2026)'
    WHEN start_date >= '2025-12-01' AND start_date < '2026-01-01' THEN '✓ Correct (Dec 2025)'
    WHEN start_date >= '2025-01-01' AND start_date < '2025-12-01' THEN '✗ Still 2025 - Needs Update'
    ELSE 'Other'
  END as status
FROM course_schedules 
WHERE start_date >= '2025-01-01'
ORDER BY start_date, course_slug
LIMIT 50;

-- Show summary
SELECT 
  EXTRACT(YEAR FROM start_date) as year,
  COUNT(*) as course_count,
  COUNT(DISTINCT course_slug) as unique_courses
FROM course_schedules 
WHERE start_date >= '2025-01-01'
GROUP BY EXTRACT(YEAR FROM start_date)
ORDER BY year;









