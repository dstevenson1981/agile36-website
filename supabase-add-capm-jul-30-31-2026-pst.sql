-- Certified AI Product Manager™ — Jul 30–31, 2026, 9am–2pm PDT (America/Los_Angeles)
-- Live on public schedule at /courses/certified-ai-product-manager/schedule

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
  is_weekend,
  hidden
)
SELECT
  'Certified AI Product Manager™',
  'certified-ai-product-manager',
  'AI Product',
  '2026-07-30 09:00:00-07:00'::timestamptz,
  '2026-07-31 14:00:00-07:00'::timestamptz,
  '09:00:00'::time,
  '14:00:00'::time,
  'America/Los_Angeles',
  'morning',
  'live-virtual',
  '02 days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  400.00,
  800.00,
  'USD',
  25,
  25,
  'English',
  true,
  'active',
  false,
  false
WHERE NOT EXISTS (
  SELECT 1
  FROM course_schedules
  WHERE course_slug = 'certified-ai-product-manager'
    AND timezone = 'America/Los_Angeles'
    AND start_date = '2026-07-30 09:00:00-07:00'::timestamptz
)
RETURNING id, course_name, start_date, end_date, timezone, price;
