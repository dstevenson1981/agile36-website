-- Hidden SAFe AI-Empowered Release Train Engineer — Aug 5–7, 2026
-- Not shown on public schedule / calendar; checkout works via direct URL:
--   /courses/release-train-engineer/schedule/checkout?schedule={UUID}&course=release-train-engineer
-- Public Aug 5–7 cohort remains visible separately (hidden=false).

ALTER TABLE course_schedules
ADD COLUMN IF NOT EXISTS hidden BOOLEAN DEFAULT false;

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
  is_weekend,
  hidden
)
SELECT
  'SAFe AI-Empowered Release Train Engineer',
  'release-train-engineer',
  'SAFe',
  '2026-08-05 09:00:00-04:00'::timestamptz,
  '2026-08-07 14:00:00-04:00'::timestamptz,
  '09:00:00'::time,
  '14:00:00'::time,
  'America/New_York',
  'morning',
  'live-virtual',
  '03 days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  1299.00,
  1999.00,
  'USD',
  25,
  25,
  'English',
  true,
  'active',
  false,
  true
WHERE NOT EXISTS (
  SELECT 1
  FROM course_schedules
  WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-08-05 09:00:00-04:00'::timestamptz
    AND hidden = true
)
RETURNING id, course_name, start_date, end_date, price, hidden;
