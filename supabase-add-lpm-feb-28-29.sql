-- Add SAFe Lean Portfolio Management (LPM) - Feb 28 - Mar 1, 2026 (Sat-Sun)
-- Note: 2026 is not a leap year, so Feb 29 doesn't exist; using Feb 28 - Mar 1
-- Run this in Supabase SQL Editor

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
  '2026-02-28 09:00:00-05:00',
  '2026-03-01 14:00:00-05:00',
  '09:00:00',
  '14:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '02 days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  950.00,
  1900.00,
  'USD',
  25,
  25,
  'English',
  true,
  'active',
  true
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
  AND start_date::date = '2026-02-28';
