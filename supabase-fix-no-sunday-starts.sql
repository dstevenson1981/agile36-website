-- No course should start on Sunday. Shift any Sunday-start to Saturday.
-- DO NOT touch February — all February dates are correct. Only fix March and later.
-- Run in Supabase SQL Editor.

-- 1) Shift Sunday-start classes back one day (Sun→Sat, Sun-Mon→Sat-Sun). Skip February.
UPDATE course_schedules
SET
  start_date = start_date - INTERVAL '1 day',
  end_date = end_date - INTERVAL '1 day',
  updated_at = NOW()
WHERE status = 'active'
  AND EXTRACT(DOW FROM start_date) = 0
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 2) Verify: list any remaining Sunday starts (should be 0)
SELECT
  course_slug,
  course_name,
  start_date::date AS start_date,
  end_date::date AS end_date,
  TO_CHAR(start_date, 'Dy') AS start_day
FROM course_schedules
WHERE status = 'active'
  AND EXTRACT(DOW FROM start_date) = 0
ORDER BY course_slug, start_date;
