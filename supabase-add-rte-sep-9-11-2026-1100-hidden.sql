-- Hidden SAFe AI-Empowered Release Train Engineer — Sept 9–11, 2026 @ $1100
-- Not shown on public schedule; checkout via:
--   /private/rte/checkout?schedule={UUID}&course=release-train-engineer

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
  '2026-09-09 09:00:00-04:00'::timestamptz,
  '2026-09-11 17:00:00-04:00'::timestamptz,
  '09:00:00'::time,
  '17:00:00'::time,
  'America/New_York',
  'morning',
  'live-virtual',
  '03 days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  1100.00,
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
    AND start_date = '2026-09-09 09:00:00-04:00'::timestamptz
    AND price = 1100.00
)
RETURNING id, course_name, start_date, end_date, price, hidden;
