-- Add Release Train Engineer (RTE) schedules - Aug / Sep 2026
-- Visible at /courses/release-train-engineer/schedule
-- Also used by combo checkout for ssm-rte (slug: release-train-engineer)
-- Pattern matches supabase-add-rte-hidden-schedules-mar-may-2026.sql (public / not hidden)

-- Aug 5–7, 2026 (Wed–Fri, 3 days) - Deadra Stevenson
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend, hidden
)
SELECT 'SAFe AI-Empowered Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-08-05 09:00:00-04:00'::timestamptz, '2026-08-07 14:00:00-04:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false, false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-08-05 09:00:00-04:00'::timestamptz
);

-- Aug 15–16, 2026 (Sat–Sun, 2 days) - Deadra Stevenson
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend, hidden
)
SELECT 'SAFe AI-Empowered Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-08-15 09:00:00-04:00'::timestamptz, '2026-08-16 14:00:00-04:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '2 Days', 'Deadra Stevenson', '/Deadra.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', true, false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-08-15 09:00:00-04:00'::timestamptz
);

-- Aug 19–21, 2026 (Wed–Fri, 3 days) - Marcus Ball
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend, hidden
)
SELECT 'SAFe AI-Empowered Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-08-19 09:00:00-04:00'::timestamptz, '2026-08-21 14:00:00-04:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '03 days', 'Marcus Ball', '/marcus.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false, false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-08-19 09:00:00-04:00'::timestamptz
);

-- Sept 7–9, 2026 (Mon–Wed, 3 days) - Joe Puoci
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend, hidden
)
SELECT 'SAFe AI-Empowered Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-09-07 09:00:00-04:00'::timestamptz, '2026-09-09 14:00:00-04:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '03 days', 'Joe Puoci', '/Joe.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false, false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-09-07 09:00:00-04:00'::timestamptz
);

-- Verify
SELECT id, course_slug, start_date, end_date, duration, instructor_name, price, status, hidden, is_weekend
FROM course_schedules
WHERE course_slug = 'release-train-engineer'
  AND start_date >= '2026-08-01'
  AND start_date < '2026-10-01'
ORDER BY start_date;
