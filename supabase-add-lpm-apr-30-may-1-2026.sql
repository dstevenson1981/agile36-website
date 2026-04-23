-- SAFe Lean Portfolio Management — April 30-May 1, 2026 (Thu-Fri, EDT)
-- Instructor: Deadra Stevenson
-- Run in Supabase SQL Editor

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
VALUES (
  'SAFe Lean Portfolio Management',
  'lean-portfolio-management',
  'SAFe',
  '2026-04-30 09:00:00-04:00',
  '2026-05-01 14:00:00-04:00',
  '09:00:00',
  '14:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '02 days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  1095.00,
  2190.00,
  'USD',
  25,
  25,
  'English',
  true,
  'active',
  false
);

-- Verify
SELECT
  id,
  course_name,
  start_date,
  end_date,
  instructor_name,
  status
FROM course_schedules
WHERE course_slug = 'lean-portfolio-management'
  AND start_date::date = '2026-04-30';
