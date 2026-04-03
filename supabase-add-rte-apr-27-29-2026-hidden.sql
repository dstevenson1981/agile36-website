-- Hidden SAFe Release Train Engineer cohorts (not on public schedule pages).
-- 1) April 27–29, 2026 — Mon–Wed, 3 days, EDT
-- 2) May 9–10, 2026 — Sat–Sun, 2 days, EDT
-- NOT shown on /courses/release-train-engineer/schedule (hidden = true).
-- Requires column course_schedules.hidden — run supabase-add-hidden-column.sql first if needed.
-- After insert, use the returned id for direct checkout:
--   /courses/release-train-engineer/schedule/checkout?schedule={UUID}&course=release-train-engineer

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
  'SAFe Release Train Engineer',
  'release-train-engineer',
  'SAFe',
  '2026-04-27 09:00:00-04:00'::timestamptz,
  '2026-04-29 14:00:00-04:00'::timestamptz,
  '09:00:00'::time,
  '14:00:00'::time,
  'America/New_York',
  'morning',
  'live-virtual',
  '03 days',
  'Marcus Ball',
  '/marcus.jpeg',
  1299.00,
  1999.00,
  'USD',
  25,
  25,
  'English',
  true,
  'active',
  false,
  true
WHERE NOT EXISTS (
  SELECT 1
  FROM course_schedules
  WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-04-27 09:00:00-04:00'::timestamptz
)
RETURNING id, course_name, start_date, end_date, price, hidden;

-- May 9–10, 2026 (Sat–Sun, 2 days) — hidden RTE
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
  'SAFe Release Train Engineer',
  'release-train-engineer',
  'SAFe',
  '2026-05-09 09:00:00-04:00'::timestamptz,
  '2026-05-10 14:00:00-04:00'::timestamptz,
  '09:00:00'::time,
  '14:00:00'::time,
  'America/New_York',
  'morning',
  'live-virtual',
  '2 Days',
  'Marcus Ball',
  '/marcus.jpeg',
  1299.00,
  1999.00,
  'USD',
  25,
  25,
  'English',
  true,
  'active',
  true,
  true
WHERE NOT EXISTS (
  SELECT 1
  FROM course_schedules
  WHERE course_slug = 'release-train-engineer'
    AND start_date = '2026-05-09 09:00:00-04:00'::timestamptz
)
RETURNING id, course_name, start_date, end_date, price, hidden;
