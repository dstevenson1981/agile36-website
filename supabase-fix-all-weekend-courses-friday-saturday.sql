-- Fix ALL weekend courses: Change Friday-Saturday to Saturday-Sunday
-- Weekend courses should be Saturday-Sunday, not Friday-Saturday
-- This applies to ALL courses, not just specific ones

-- First, fix the specific Jan 30-31 course (should be Jan 31-Feb 1)
UPDATE course_schedules
SET
  start_date = '2026-01-31 09:00:00-05:00',
  end_date = '2026-02-01 14:00:00-05:00',
  is_weekend = true
WHERE course_slug = 'ai-agent-builder'
  AND start_date::date = '2026-01-30'::date
  AND status = 'active';

-- Update ALL weekend courses that start on Friday (DOW = 5) to start on Saturday (add 1 day)
-- This will catch any weekend courses with the same issue across all courses
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day'
WHERE is_weekend = true
  AND EXTRACT(DOW FROM start_date) = 5  -- Friday (0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday)
  AND status = 'active';

-- Also fix any courses that are marked as weekend but start on Friday
-- This catches courses that might not have is_weekend set correctly
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  is_weekend = true
WHERE course_slug = 'ai-agent-builder'
  AND EXTRACT(DOW FROM start_date) = 5  -- Friday
  AND EXTRACT(DOW FROM end_date) = 6    -- Saturday
  AND status = 'active';

-- Verify the updates - show all weekend courses that start on Friday or Saturday
SELECT
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  is_weekend,
  CASE
    WHEN EXTRACT(DOW FROM start_date) = 6 THEN 'Saturday'
    WHEN EXTRACT(DOW FROM start_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM start_date) = 5 THEN 'Friday'
    ELSE 'Other'
  END as start_day,
  CASE
    WHEN EXTRACT(DOW FROM end_date) = 6 THEN 'Saturday'
    WHEN EXTRACT(DOW FROM end_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM end_date) = 5 THEN 'Friday'
    ELSE 'Other'
  END as end_day
FROM course_schedules
WHERE is_weekend = true
  AND start_date >= '2026-01-01'
ORDER BY start_date;

-- Show any remaining Friday-Saturday weekend courses (should be 0 after the update)
SELECT
  id,
  course_name,
  course_slug,
  start_date,
  end_date
FROM course_schedules
WHERE is_weekend = true
  AND EXTRACT(DOW FROM start_date) = 5  -- Friday
  AND status = 'active';
