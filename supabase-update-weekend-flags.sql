-- Update is_weekend flags for existing course schedules
-- Run this AFTER you've already inserted the course data
-- This will update the weekend/weekday batch flags

-- Set weekend batches to true
UPDATE course_schedules 
SET is_weekend = true 
WHERE start_date IN (
  '2025-11-29 09:00:00-05:00',
  '2025-12-13 09:00:00-05:00',
  '2025-12-20 09:00:00-05:00',
  '2026-01-10 09:00:00-05:00',
  '2026-01-31 09:00:00-05:00',
  '2026-02-07 09:00:00-05:00',
  '2026-02-28 09:00:00-05:00',
  '2026-03-14 09:00:00-04:00',
  '2026-03-21 09:00:00-04:00'
);

-- Set weekday batches to false
UPDATE course_schedules 
SET is_weekend = false 
WHERE start_date IN (
  '2026-01-03 09:00:00-05:00',
  '2026-01-17 09:00:00-05:00',
  '2026-01-24 09:00:00-05:00',
  '2026-02-14 09:00:00-05:00',
  '2026-02-21 09:00:00-05:00',
  '2026-03-07 09:00:00-05:00'
);

-- Verify the updates
SELECT 
  start_date,
  instructor_name,
  is_weekend,
  CASE WHEN is_weekend THEN 'Weekend' ELSE 'Weekday' END as batch_type
FROM course_schedules 
ORDER BY start_date;



