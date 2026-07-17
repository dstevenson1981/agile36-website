-- Set Advanced Scrum Master (SASM) class times to 9am–5pm America/New_York
-- Does not invent new dates — only updates times on existing advanced-scrum-master rows.

-- Preview
SELECT
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  start_time,
  end_time,
  timezone
FROM course_schedules
WHERE course_slug = 'advanced-scrum-master'
  AND (start_time IS DISTINCT FROM '09:00:00'::time OR end_time IS DISTINCT FROM '17:00:00'::time)
ORDER BY start_date;

-- Update times (preserve calendar dates in America/New_York)
UPDATE course_schedules
SET
  start_time = '09:00:00'::time,
  end_time = '17:00:00'::time,
  start_date = (
    ((start_date AT TIME ZONE 'America/New_York')::date + TIME '09:00:00')
    AT TIME ZONE 'America/New_York'
  ),
  end_date = (
    ((end_date AT TIME ZONE 'America/New_York')::date + TIME '17:00:00')
    AT TIME ZONE 'America/New_York'
  ),
  timezone = 'America/New_York'
WHERE course_slug = 'advanced-scrum-master'
  AND (start_time IS DISTINCT FROM '09:00:00'::time OR end_time IS DISTINCT FROM '17:00:00'::time);

-- Verify
SELECT
  course_slug,
  start_date,
  end_date,
  start_time,
  end_time,
  timezone
FROM course_schedules
WHERE course_slug = 'advanced-scrum-master'
ORDER BY start_date;
