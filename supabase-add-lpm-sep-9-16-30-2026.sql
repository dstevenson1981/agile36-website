-- Add SAFe Lean Portfolio Management
-- Sept 9–10, Sept 16–17, Sept 30–Oct 1, 2026
-- Instructor: Deadra Stevenson · America/New_York · $950

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
  'SAFe Lean Portfolio Management',
  'lean-portfolio-management',
  'SAFe LPM',
  n.start_date,
  n.end_date,
  n.start_time,
  n.end_time,
  'America/New_York',
  'live-virtual',
  '2 Days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  950.00,
  1900.00,
  'USD',
  0,
  20,
  'English',
  true,
  'active',
  false,
  false
FROM (
  VALUES
    ('2026-09-09 09:00:00-04:00'::timestamptz, '2026-09-10 17:00:00-04:00'::timestamptz, '09:00:00'::time, '17:00:00'::time),
    ('2026-09-16 09:00:00-04:00'::timestamptz, '2026-09-17 17:00:00-04:00'::timestamptz, '09:00:00'::time, '17:00:00'::time),
    ('2026-09-30 09:00:00-04:00'::timestamptz, '2026-10-01 17:00:00-04:00'::timestamptz, '09:00:00'::time, '17:00:00'::time)
) AS n(start_date, end_date, start_time, end_time)
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules cs
  WHERE cs.course_slug = 'lean-portfolio-management'
    AND cs.start_date = n.start_date
);
