-- Add SAFe Lean Portfolio Management (LPM) class for March 28-29, 2026 (Sat-Sun)
-- Safe insert: only adds the class if it does not already exist.
-- Run in Supabase SQL Editor.

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
  'SAFe Lean Portfolio Management',
  'lean-portfolio-management',
  'SAFe',
  '2026-03-28 09:00:00-04:00',
  '2026-03-29 14:00:00-04:00',
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
  true
WHERE NOT EXISTS (
  SELECT 1
  FROM course_schedules
  WHERE course_slug = 'lean-portfolio-management'
    AND start_date::date = '2026-03-28'
);

-- Verify
SELECT
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  price,
  instructor_name,
  is_weekend,
  status
FROM course_schedules
WHERE course_slug = 'lean-portfolio-management'
  AND start_date::date = '2026-03-28';
