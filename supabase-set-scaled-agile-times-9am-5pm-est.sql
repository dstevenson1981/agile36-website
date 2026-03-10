-- Set all Scaled Agile class times to 9am–5pm EST
-- EXCEPT: Value Stream Mapping and Responsible AI (keep their current times)

-- Preview: rows that will be updated
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
WHERE course_slug NOT IN ('value-stream-mapping', 'responsible-ai')
  AND (start_time IS DISTINCT FROM '09:00:00' OR end_time IS DISTINCT FROM '17:00:00')
ORDER BY course_slug, start_date;

-- Update start_time, end_time, and start_date/end_date timestamps (9am–5pm EST)
UPDATE course_schedules
SET 
  start_time = '09:00:00',
  end_time = '17:00:00',
  start_date = DATE(start_date) + TIME '09:00:00',
  end_date = DATE(end_date) + TIME '17:00:00',
  timezone = 'America/New_York'
WHERE course_slug NOT IN ('value-stream-mapping', 'responsible-ai')
  AND (start_time IS DISTINCT FROM '09:00:00' OR end_time IS DISTINCT FROM '17:00:00');

-- Verify
SELECT 
  course_slug,
  course_name,
  start_time,
  end_time,
  timezone,
  start_date,
  end_date
FROM course_schedules
WHERE course_slug NOT IN ('value-stream-mapping', 'responsible-ai')
ORDER BY course_slug, start_date
LIMIT 30;
