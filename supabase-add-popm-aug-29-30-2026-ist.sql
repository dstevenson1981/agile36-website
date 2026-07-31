-- SAFe POPM — Aug 29–30, 2026, 8:00 AM – 4:00 PM IST (Asia/Kolkata)
-- Visible at /courses/product-owner-manager/schedule
-- Parallel to the existing Aug 29–30 ET cohort; this row is India timezone.

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
  'SAFe Product Owner/Product Manager',
  'product-owner-manager',
  'SAFe Product',
  (TIMESTAMP '2026-08-29 08:00:00' AT TIME ZONE 'Asia/Kolkata'),
  (TIMESTAMP '2026-08-30 16:00:00' AT TIME ZONE 'Asia/Kolkata'),
  '08:00:00'::time,
  '16:00:00'::time,
  'Asia/Kolkata',
  'morning',
  'live-virtual',
  '2 Days',
  'Deadra Stevenson',
  '/Deadra.jpeg',
  545.00,
  1090.00,
  'USD',
  15,
  20,
  'English',
  true,
  'active',
  true,
  false
WHERE NOT EXISTS (
  SELECT 1
  FROM course_schedules
  WHERE course_slug = 'product-owner-manager'
    AND timezone = 'Asia/Kolkata'
    AND start_date = (TIMESTAMP '2026-08-29 08:00:00' AT TIME ZONE 'Asia/Kolkata')
)
RETURNING id, course_name, start_date, end_date, start_time, end_time, timezone, price;
