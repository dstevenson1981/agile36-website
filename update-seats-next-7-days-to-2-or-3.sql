-- Set "seats remaining" scarcity for upcoming classes
-- Sets seats_available to 2 or 3 for active schedules starting in the next 7 days.
-- Run in Supabase SQL Editor.

UPDATE course_schedules
SET
  seats_available = (CASE WHEN random() < 0.5 THEN 2 ELSE 3 END),
  updated_at = NOW()
WHERE
  status = 'active'
  AND start_date >= NOW()
  AND start_date < NOW() + INTERVAL '7 days';

-- Verify (next 7 days)
SELECT
  id,
  course_slug,
  course_name,
  start_date,
  seats_available,
  total_seats,
  status
FROM course_schedules
WHERE
  start_date >= NOW()
  AND start_date < NOW() + INTERVAL '7 days'
ORDER BY start_date;

