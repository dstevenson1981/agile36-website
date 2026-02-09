-- Fix Mar 4-5 (Wed-Thu) → Mar 5-6 (Thu-Fri). Two-day classes must be Mon-Tue, Thu-Fri, or Sat-Sun only.
-- Run in Supabase SQL Editor. Only touches rows that are exactly Mar 4-5.

UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  updated_at = NOW()
WHERE status = 'active'
  AND start_date::date = '2026-03-04'
  AND end_date::date = '2026-03-05';

-- Verify: classes that were Mar 4-5 should now be Mar 5-6 (Thu-Fri)
SELECT
  course_slug,
  course_type,
  start_date::date AS start_date,
  end_date::date AS end_date,
  TO_CHAR(start_date AT TIME ZONE 'America/New_York', 'Dy') AS start_day,
  TO_CHAR(end_date AT TIME ZONE 'America/New_York', 'Dy') AS end_day
FROM course_schedules
WHERE status = 'active'
  AND start_date::date >= '2026-03-03'
  AND start_date::date <= '2026-03-08'
ORDER BY start_date, course_slug;
