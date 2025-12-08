-- Add Leading SAFe course for January 14-15, 2026 (Thursday-Friday)
-- This script adds a single schedule entry

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
  'Leading SAFe',
  'leading-safe',
  'SAFe Agilist',
  '2026-01-14 09:00:00-05:00',
  '2026-01-15 17:00:00-05:00',
  '09:00:00',
  '17:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '2 Days',
  'Joe Puoci',
  '/Joe.jpeg',
  555.00,
  1110.00,
  'USD',
  15,
  20,
  'English',
  true,
  'active',
  false
)
ON CONFLICT DO NOTHING;

-- Verify the schedule was added
SELECT 
  course_name,
  start_date,
  end_date,
  instructor_name,
  price,
  is_weekend
FROM course_schedules 
WHERE course_slug = 'leading-safe'
  AND start_date = '2026-01-14 09:00:00-05:00';




