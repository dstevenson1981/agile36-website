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
  'SAFe for Teams',
  'safe-for-teams',
  'SAFe Practitioner',
  '2026-01-24 09:00:00-05:00'::timestamp with time zone,
  '2026-01-25 17:00:00-05:00'::timestamp with time zone,
  '09:00:00'::time,
  '17:00:00'::time,
  'America/New_York',
  'morning',
  'live-virtual',
  '2 Days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  599.00,
  1198.00,
  'USD',
  15,
  20,
  'English',
  true,
  'active',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules 
  WHERE course_slug = 'safe-for-teams'
    AND start_date = '2026-01-24 09:00:00-05:00'::timestamp with time zone
);
