-- SAFe for Teams — June 2–3, 2026 (Mon–Tue)
-- Run in Supabase SQL Editor (safe to re-run)

INSERT INTO course_schedules (
  course_name,
  course_slug,
  course_type,
  start_date,
  end_date,
  start_time,
  end_time,
  timezone,
  time_slot,
  format,
  duration,
  instructor_name,
  instructor_image,
  price,
  original_price,
  currency,
  seats_available,
  total_seats,
  language,
  exam_included,
  status,
  is_weekend
)
SELECT
  'SAFe for Teams',
  'safe-for-teams',
  'SAFe for Teams',
  '2026-06-02 09:00:00-04:00'::timestamptz,
  '2026-06-03 17:00:00-04:00'::timestamptz,
  '09:00:00'::time,
  '17:00:00'::time,
  'America/New_York',
  'morning',
  'live-virtual',
  '2 Days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  599.00,
  1030.00,
  'USD',
  15,
  20,
  'English',
  true,
  'active',
  false
WHERE NOT EXISTS (
  SELECT 1
  FROM course_schedules cs
  WHERE cs.course_slug = 'safe-for-teams'
    AND cs.start_date::date = '2026-06-02'::date
    AND cs.end_date::date = '2026-06-03'::date
    AND cs.start_time = '09:00:00'::time
    AND cs.status = 'active'
);

SELECT
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  instructor_name,
  price,
  seats_available,
  status
FROM course_schedules
WHERE course_slug = 'safe-for-teams'
  AND start_date::date = '2026-06-02'::date
  AND status = 'active';
