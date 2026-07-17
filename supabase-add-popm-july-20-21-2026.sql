-- Add SAFe POPM schedule - July 20–21, 2026 (Mon–Tue)
-- Visible at /courses/product-owner-manager/schedule
-- Matches live production POPM fields (price $515, 9am–5pm ET, live-virtual)

-- July 20–21, 2026 (Mon–Tue, 2 days) - Deadra Stevenson
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend, hidden
)
SELECT 'SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product',
  '2026-07-20 09:00:00-04:00'::timestamptz, '2026-07-21 17:00:00-04:00'::timestamptz,
  '09:00:00'::time, '17:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '2 Days', 'Deadra Stevenson', '/Deadra.jpeg', 515.00, 1030.00, 'USD', 15, 20,
  'English', true, 'active', false, false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'product-owner-manager'
    AND start_date = '2026-07-20 09:00:00-04:00'::timestamptz
);

-- Verify
SELECT id, course_slug, start_date, end_date, duration, instructor_name,
       price, original_price, status, hidden, is_weekend, seats_available, total_seats
FROM course_schedules
WHERE course_slug = 'product-owner-manager'
  AND start_date = '2026-07-20 09:00:00-04:00'::timestamptz;
