-- Add Generative AI for Project Managers Certification Training - March 23-24, 2026 (Mon-Tue)
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
  'Generative AI for Project Managers',
  'generative-ai-project-managers',
  'Generative AI',
  '2026-03-23 09:00:00-04:00',
  '2026-03-24 14:00:00-04:00',
  '09:00:00',
  '14:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '2 Days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  400.00,
  800.00,
  'USD',
  15,
  20,
  'English',
  false,
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
WHERE course_slug = 'generative-ai-project-managers'
  AND start_date::date = '2026-03-23';
