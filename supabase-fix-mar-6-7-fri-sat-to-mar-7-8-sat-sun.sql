-- Fix Mar 6-7 (Fri-Sat) → Mar 7-8 (Sat-Sun). Two-day classes must be Mon-Tue, Thu-Fri, or Sat-Sun only.
-- Today: Feb 8, 2026 (Sunday). This script does NOT touch any February dates — only these March rows.
-- Run in Supabase SQL Editor.

-- Move every 2-day class that is currently Mar 6-7 (Fri-Sat) to Mar 7-8 (Sat-Sun)
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE status = 'active'
  AND start_date::date = '2026-03-06'
  AND end_date::date = '2026-03-07';

-- Verify: no classes should remain on Mar 6-7; Mar 7-8 should show Sat-Sun
SELECT
  course_slug,
  course_type,
  start_date::date AS start_date,
  end_date::date AS end_date,
  TO_CHAR(start_date AT TIME ZONE 'America/New_York', 'Dy') AS start_day,
  TO_CHAR(end_date AT TIME ZONE 'America/New_York', 'Dy') AS end_day,
  is_weekend
FROM course_schedules
WHERE status = 'active'
  AND start_date::date >= '2026-03-05'
  AND start_date::date <= '2026-03-10'
ORDER BY start_date, course_slug;
