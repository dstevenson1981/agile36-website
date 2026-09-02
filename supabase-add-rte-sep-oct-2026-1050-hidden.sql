-- Hidden SAFe AI-Empowered Release Train Engineer — Sept/Oct 2026 @ $1050
-- 8:00 AM–2:00 PM ET (one cohort per date range)
-- Shown on the private registration page:
--   https://www.agile36.com/private/rte
-- Checkout:
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
  format,
  duration,
  instructor_name,
  instructor_image,
  price,
  original_price,
  currency,
  total_registrants,
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
  n.start_date,
  n.end_date,
  n.start_time,
  n.end_time,
  'America/New_York',
  'live-virtual',
  n.duration,
  'Deadra Stevenson',
  '/Deadra.jpeg',
  1050.00,
  1999.00,
  'USD',
  0,
  25,
  'English',
  true,
  'active',
  n.is_weekend,
  true
FROM (
  VALUES
    -- Sept 16–18 (Wed–Fri)
    ('2026-09-16 08:00:00-04:00'::timestamptz, '2026-09-18 14:00:00-04:00'::timestamptz, '08:00:00'::time, '14:00:00'::time, '03 days', false),
    -- Sept 23–25 (Wed–Fri)
    ('2026-09-23 08:00:00-04:00'::timestamptz, '2026-09-25 14:00:00-04:00'::timestamptz, '08:00:00'::time, '14:00:00'::time, '03 days', false),
    -- Sept 26–27 (Sat–Sun)
    ('2026-09-26 08:00:00-04:00'::timestamptz, '2026-09-27 14:00:00-04:00'::timestamptz, '08:00:00'::time, '14:00:00'::time, '2 Days', true),
    -- Oct 7–9 (Wed–Fri)
    ('2026-10-07 08:00:00-04:00'::timestamptz, '2026-10-09 14:00:00-04:00'::timestamptz, '08:00:00'::time, '14:00:00'::time, '03 days', false),
    -- Oct 14–16 (Wed–Fri)
    ('2026-10-14 08:00:00-04:00'::timestamptz, '2026-10-16 14:00:00-04:00'::timestamptz, '08:00:00'::time, '14:00:00'::time, '03 days', false),
    -- Oct 17–18 (Sat–Sun)
    ('2026-10-17 08:00:00-04:00'::timestamptz, '2026-10-18 14:00:00-04:00'::timestamptz, '08:00:00'::time, '14:00:00'::time, '2 Days', true)
) AS n(start_date, end_date, start_time, end_time, duration, is_weekend)
WHERE NOT EXISTS (
  SELECT 1
  FROM course_schedules cs
  WHERE cs.course_slug = 'release-train-engineer'
    AND cs.start_date = n.start_date
    AND cs.price = 1050.00
);

SELECT id, start_date, end_date, start_time, end_time, price, duration, is_weekend, hidden
FROM course_schedules
WHERE course_slug = 'release-train-engineer'
  AND price = 1050.00
  AND start_date >= '2026-09-16'
  AND start_date < '2026-10-19'
ORDER BY start_date, start_time;
