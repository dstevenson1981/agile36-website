-- Clear instructor name and image on every course schedule row.
-- Run in Supabase SQL Editor. Fixes cases where names differ (e.g. "Joe" vs "Joe Puoci")
-- or partial updates missed rows.
--
-- If either column is NOT NULL in your project, use empty string instead:
--   SET instructor_name = '', instructor_image = '';

UPDATE course_schedules
SET
  instructor_name = NULL,
  instructor_image = NULL;

-- Verify (uncomment):
-- SELECT id, course_slug, start_date, instructor_name, instructor_image
-- FROM course_schedules
-- ORDER BY start_date
-- LIMIT 30;
