-- Fix incorrect weekend flags
-- Set is_weekend = false for courses that are marked as weekend but actually fall on weekdays
-- Weekends are Saturday (DOW = 6) or Sunday (DOW = 0)
-- Weekdays are Monday-Friday (DOW = 1-5)

-- First, show all courses with incorrect weekend flags (for verification)
SELECT
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  is_weekend,
  CASE
    WHEN EXTRACT(DOW FROM start_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM start_date) = 1 THEN 'Monday'
    WHEN EXTRACT(DOW FROM start_date) = 2 THEN 'Tuesday'
    WHEN EXTRACT(DOW FROM start_date) = 3 THEN 'Wednesday'
    WHEN EXTRACT(DOW FROM start_date) = 4 THEN 'Thursday'
    WHEN EXTRACT(DOW FROM start_date) = 5 THEN 'Friday'
    WHEN EXTRACT(DOW FROM start_date) = 6 THEN 'Saturday'
  END as start_day
FROM course_schedules
WHERE is_weekend = true
  AND EXTRACT(DOW FROM start_date) BETWEEN 1 AND 5  -- Monday through Friday
  AND status = 'active'
ORDER BY start_date;

-- Fix: Set is_weekend = false for courses that start on weekdays (Monday-Friday)
UPDATE course_schedules
SET
  is_weekend = false
WHERE is_weekend = true
  AND EXTRACT(DOW FROM start_date) BETWEEN 1 AND 5  -- Monday (1) through Friday (5)
  AND status = 'active';

-- Also ensure courses that start on Saturday or Sunday are marked as weekend
UPDATE course_schedules
SET
  is_weekend = true
WHERE is_weekend = false
  AND EXTRACT(DOW FROM start_date) IN (0, 6)  -- Sunday (0) or Saturday (6)
  AND status = 'active';

-- Verify the fixes - show all courses with their correct weekend flags
SELECT
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  is_weekend,
  CASE
    WHEN EXTRACT(DOW FROM start_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM start_date) = 1 THEN 'Monday'
    WHEN EXTRACT(DOW FROM start_date) = 2 THEN 'Tuesday'
    WHEN EXTRACT(DOW FROM start_date) = 3 THEN 'Wednesday'
    WHEN EXTRACT(DOW FROM start_date) = 4 THEN 'Thursday'
    WHEN EXTRACT(DOW FROM start_date) = 5 THEN 'Friday'
    WHEN EXTRACT(DOW FROM start_date) = 6 THEN 'Saturday'
  END as start_day,
  CASE
    WHEN is_weekend = true AND EXTRACT(DOW FROM start_date) IN (0, 6) THEN '✓ Correct'
    WHEN is_weekend = false AND EXTRACT(DOW FROM start_date) BETWEEN 1 AND 5 THEN '✓ Correct'
    ELSE '✗ Incorrect'
  END as flag_status
FROM course_schedules
WHERE start_date >= '2026-01-01'
  AND status = 'active'
ORDER BY start_date;
