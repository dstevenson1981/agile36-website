-- Add SAFe Scrum Master schedule - July 29–30, 2026 (Wed–Thu)
-- Visible at /courses/scrum-master/schedule
-- Matches live production SSM fields (price $515, 9am–5pm ET, live-virtual)
-- Instructor: Marcus Ball (next in rotation after Joe Mon–Tue / before Deadra Thu–Fri pattern)

-- July 29–30, 2026 (Wed–Thu, 2 days) - Marcus Ball
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend, hidden
)
SELECT 'SAFe Scrum Master', 'scrum-master', 'SAFe Scrum',
  '2026-07-29 09:00:00-04:00'::timestamptz, '2026-07-30 17:00:00-04:00'::timestamptz,
  '09:00:00'::time, '17:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '2 Days', 'Marcus Ball', '/marcus.jpeg', 515.00, 1030.00, 'USD', 15, 20,
  'English', true, 'active', false, false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'scrum-master'
    AND start_date = '2026-07-29 09:00:00-04:00'::timestamptz
);

-- Verify
SELECT id, course_slug, start_date, end_date, duration, instructor_name,
       price, original_price, status, hidden, is_weekend, seats_available, total_seats,
       format, timezone, time_slot
FROM course_schedules
WHERE course_slug = 'scrum-master'
  AND start_date = '2026-07-29 09:00:00-04:00'::timestamptz;
