-- Add SAFe Lean Portfolio Management Aug 24–25, 2026 (Mon–Tue)
-- Instructor: Deadra Stevenson · America/New_York · $1050

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
) VALUES (
  'SAFe Lean Portfolio Management',
  'lean-portfolio-management',
  'SAFe LPM',
  '2026-08-24 09:00:00-04:00',
  '2026-08-25 17:00:00-04:00',
  '09:00:00',
  '17:00:00',
  'America/New_York',
  'live-virtual',
  '2 Days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  1050.00,
  2100.00,
  'USD',
  0,
  20,
  'English',
  true,
  'active',
  false,
  false
);

SELECT id, course_name, start_date, end_date, start_time, end_time, timezone,
       instructor_name, price, original_price, status, is_weekend
FROM course_schedules
WHERE course_slug = 'lean-portfolio-management'
  AND start_date::date = '2026-08-24';
