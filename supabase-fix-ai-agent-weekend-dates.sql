-- Fix weekend courses for No-Code AI Agents & Automation
-- Change all Friday-Saturday courses to Saturday-Sunday
-- Weekend courses should be Saturday-Sunday, not Friday-Saturday

-- Update all weekend courses that start on Friday (DOW = 5) to start on Saturday (add 1 day)
-- This will catch any weekend courses with the same issue
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day'
WHERE course_slug = 'ai-agent-builder'
  AND is_weekend = true
  AND EXTRACT(DOW FROM start_date) = 5  -- Friday (0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday)
  AND status = 'active';

-- Also fix the specific dates mentioned by the user to ensure they're Saturday-Sunday
-- Jan 31-Feb 1 (should be Saturday-Sunday)
UPDATE course_schedules
SET
  start_date = '2026-01-31 09:00:00-05:00',
  end_date = '2026-02-01 14:00:00-05:00'
WHERE course_slug = 'ai-agent-builder'
  AND start_date::date = '2026-01-30'::date
  AND is_weekend = true;

-- Feb 7-8 (should be Saturday-Sunday)
UPDATE course_schedules
SET
  start_date = '2026-02-07 09:00:00-05:00',
  end_date = '2026-02-08 14:00:00-05:00'
WHERE course_slug = 'ai-agent-builder'
  AND start_date::date = '2026-02-06'::date
  AND is_weekend = true;

-- Feb 14-15 (should be Saturday-Sunday)
UPDATE course_schedules
SET
  start_date = '2026-02-14 09:00:00-05:00',
  end_date = '2026-02-15 14:00:00-05:00'
WHERE course_slug = 'ai-agent-builder'
  AND start_date::date = '2026-02-13'::date
  AND is_weekend = true;

-- Verify the updates - show all weekend courses for ai-agent-builder
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
WHERE course_slug = 'ai-agent-builder'
  AND is_weekend = true
  AND start_date >= '2026-01-01'
ORDER BY start_date;
