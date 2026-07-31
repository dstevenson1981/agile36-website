-- LPM Aug 27–28, 2026 → Pacific (America/Los_Angeles), Joe Puoci
-- Converted existing EST cohort (same dates/instructor) to PST.
-- 9am–5pm PDT both days. Price $950.

UPDATE course_schedules
SET
  start_date = '2026-08-27 09:00:00-07:00'::timestamptz,
  end_date = '2026-08-28 17:00:00-07:00'::timestamptz,
  start_time = '09:00:00'::time,
  end_time = '17:00:00'::time,
  timezone = 'America/Los_Angeles',
  time_slot = 'morning',
  instructor_name = 'Joe Puoci',
  instructor_image = '/Joe.jpeg',
  status = 'active'
WHERE id = 'b9fb3f71-0ef3-4b3d-9375-642b8c7f8527';

-- Verify
SELECT id, course_name, start_date, end_date, start_time, end_time, timezone,
       instructor_name, price, status
FROM course_schedules
WHERE id = 'b9fb3f71-0ef3-4b3d-9375-642b8c7f8527';
