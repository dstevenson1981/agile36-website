-- Add SAFe for Teams Course - Feb 23-24, 2026
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
  'SAFe for Teams',
  'safe-for-teams',
  'SAFe',
  '2026-02-23 09:00:00-05:00',
  '2026-02-24 14:00:00-05:00',
  '09:00:00',
  '14:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '02 days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  599.00,
  1198.00,
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
WHERE course_slug = 'safe-for-teams' 
  AND start_date = '2026-02-23 09:00:00-05:00';
