-- One-off: SAFe for Teams Feb 11-12 (Wed-Thu) → Feb 12-13 (Thu-Fri).
-- Two-day classes must be Mon-Tue, Thu-Fri, or Sat-Sun. Run once in Supabase SQL Editor.

UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  updated_at = NOW()
WHERE course_slug = 'safe-for-teams'
  AND status = 'active'
  AND start_date::date = '2026-02-11'
  AND end_date::date = '2026-02-12';

-- Verify: should show Thu 12 – Fri 13
SELECT
  course_slug,
  start_date::date AS start_date,
  end_date::date AS end_date,
  TO_CHAR(start_date, 'Dy') AS start_day,
  TO_CHAR(end_date, 'Dy') AS end_day
FROM course_schedules
WHERE course_slug = 'safe-for-teams'
  AND status = 'active'
  AND start_date::date >= '2026-02-10'
  AND start_date::date <= '2026-02-15';
