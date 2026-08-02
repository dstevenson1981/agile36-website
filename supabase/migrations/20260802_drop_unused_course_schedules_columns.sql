-- Remove never-used / always-empty course_schedules columns
ALTER TABLE public.course_schedules
  DROP COLUMN IF EXISTS location,
  DROP COLUMN IF EXISTS meeting_link,
  DROP COLUMN IF EXISTS registration_url,
  DROP COLUMN IF EXISTS curriculum_url,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS is_best_deal;
