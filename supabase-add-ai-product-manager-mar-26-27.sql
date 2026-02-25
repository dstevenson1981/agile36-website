-- Add Certified AI Product Manager - March 26-27, 2026 (Thu-Fri)
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
  'Certified AI Product Manager™',
  'certified-ai-product-manager',
  'AI Product',
  '2026-03-26 09:00:00-04:00',
  '2026-03-27 14:00:00-04:00',
  '09:00:00',
  '14:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '02 days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  555.00,
  1110.00,
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
  course_slug,
  start_date,
  end_date,
  price,
  instructor_name,
  status
FROM course_schedules
WHERE course_slug = 'certified-ai-product-manager'
  AND start_date::date = '2026-03-26';
