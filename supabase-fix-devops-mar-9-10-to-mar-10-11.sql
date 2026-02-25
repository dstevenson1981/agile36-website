-- DevOps: change March 9-10 to March 10-11. Run in Supabase SQL Editor.

UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  updated_at = NOW()
WHERE course_slug IN ('devops', 'safe-devops')
  AND status = 'active'
  AND start_date::date = '2026-03-09'
  AND end_date::date = '2026-03-10';

-- Verify: should show Mar 10 – Mar 11
SELECT
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  start_date::date AS start_date_only,
  end_date::date AS end_date_only
FROM course_schedules
WHERE course_slug IN ('devops', 'safe-devops')
  AND status = 'active'
  AND start_date::date >= '2026-03-08'
  AND start_date::date <= '2026-03-12';
