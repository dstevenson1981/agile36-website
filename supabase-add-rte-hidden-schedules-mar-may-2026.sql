-- Add Release Train Engineer (RTE) schedules - March through May 2026
-- Visible at /courses/release-train-engineer/schedule

-- March 16-18, 2026 (3 days) - Deadra Stevenson
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend
)
SELECT 'SAFe Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-03-16 09:00:00-05:00'::timestamptz, '2026-03-18 14:00:00-05:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-03-16 09:00:00-05:00'::timestamptz
);

-- March 21-22, 2026 (2 days) - Joe Puoci
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend
)
SELECT 'SAFe Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-03-21 09:00:00-05:00'::timestamptz, '2026-03-22 14:00:00-05:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '2 Days', 'Joe Puoci', '/Joe.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-03-21 09:00:00-05:00'::timestamptz
);

-- April 13-15, 2026 (3 days) - Marcus Ball
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend
)
SELECT 'SAFe Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-04-13 09:00:00-04:00'::timestamptz, '2026-04-15 14:00:00-04:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '03 days', 'Marcus Ball', '/marcus.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-04-13 09:00:00-04:00'::timestamptz
);

-- April 25-26, 2026 (2 days) - Deadra Stevenson
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend
)
SELECT 'SAFe Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-04-25 09:00:00-04:00'::timestamptz, '2026-04-26 14:00:00-04:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '2 Days', 'Deadra Stevenson', '/Deadra.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-04-25 09:00:00-04:00'::timestamptz
);

-- May 11-13, 2026 (3 days) - Joe Puoci
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend
)
SELECT 'SAFe Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-05-11 09:00:00-04:00'::timestamptz, '2026-05-13 14:00:00-04:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '03 days', 'Joe Puoci', '/Joe.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-05-11 09:00:00-04:00'::timestamptz
);

-- May 18-20, 2026 (3 days) - Marcus Ball
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats, language,
  exam_included, status, is_weekend
)
SELECT 'SAFe Release Train Engineer', 'release-train-engineer', 'SAFe',
  '2026-05-18 09:00:00-04:00'::timestamptz, '2026-05-20 14:00:00-04:00'::timestamptz,
  '09:00:00'::time, '14:00:00'::time, 'America/New_York', 'morning', 'live-virtual',
  '03 days', 'Marcus Ball', '/marcus.jpeg', 1299.00, 1999.00, 'USD', 25, 25,
  'English', true, 'active', false
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-05-18 09:00:00-04:00'::timestamptz
);

-- Schedules are visible at: https://www.agile36.com/courses/release-train-engineer/schedule
