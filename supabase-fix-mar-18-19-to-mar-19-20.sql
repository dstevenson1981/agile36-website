-- Shift all classes on Mar 18-19 to Mar 19-20. Run in Supabase SQL Editor.

UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  updated_at = NOW()
WHERE status = 'active'
  AND start_date::date = '2026-03-18'
  AND end_date::date = '2026-03-19';

-- Verify: classes that were Mar 18-19 should now be Mar 19-20
SELECT
  course_slug,
  course_name,
  start_date::date AS start_date,
  end_date::date AS end_date
FROM course_schedules
WHERE status = 'active'
  AND start_date::date >= '2026-03-17'
  AND start_date::date <= '2026-03-22'
ORDER BY start_date, course_slug;
