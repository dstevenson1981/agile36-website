-- Add Leading SAFe Course - Jan 31-Feb 1, 2026
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
  'Leading SAFe® 6.0',
  'leading-safe',
  'SAFe',
  '2026-01-31 09:00:00-05:00',
  '2026-02-01 14:00:00-05:00',
  '09:00:00',
  '14:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '02 days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  995.00,
  1990.00,
  'USD',
  25,
  25,
  'English',
  true,
  'active',
  false
)
ON CONFLICT DO NOTHING
RETURNING id, course_name, course_slug, start_date, end_date, price;

-- Verify the course was added
SELECT 
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  price,
  original_price,
  seats_available,
  status
FROM course_schedules 
WHERE course_slug = 'leading-safe' 
  AND start_date = '2026-01-31 09:00:00-05:00';
