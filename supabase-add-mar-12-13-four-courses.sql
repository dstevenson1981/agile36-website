/* Add four courses on Mar 12-13 (Thu-Fri): POPM, SAFe for Teams, Advanced Scrum Master, Leading SAFe. Run in Supabase SQL Editor. */

INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
) VALUES
-- 1) Product Owner/Product Manager 6.0
(
  'SAFe Product Owner/Product Manager',
  'product-owner-manager',
  'SAFe Product',
  '2026-03-12 09:00:00-04:00',
  '2026-03-13 14:00:00-04:00',
  '09:00:00', '14:00:00',
  'America/New_York', 'morning', 'live-virtual', '02 days',
  'Deadra Stevenson', '/Deadra.jpeg',
  555.00, 1110.00, 'USD', 25, 25, 'English', true, 'active', false
),
-- 2) SAFe for Teams 6.0
(
  'SAFe for Teams',
  'safe-for-teams',
  'SAFe',
  '2026-03-12 09:00:00-04:00',
  '2026-03-13 14:00:00-04:00',
  '09:00:00', '14:00:00',
  'America/New_York', 'morning', 'live-virtual', '02 days',
  'Deadra Stevenson', '/Deadra.jpeg',
  599.00, 1198.00, 'USD', 25, 25, 'English', true, 'active', false
),
-- 3) Advanced Scrum Master
(
  'SAFe Advanced Scrum Master',
  'advanced-scrum-master',
  'SAFe Scrum',
  '2026-03-12 09:00:00-04:00',
  '2026-03-13 17:00:00-04:00',
  '09:00:00', '17:00:00',
  'America/New_York', 'morning', 'live-virtual', '02 days',
  'Deadra Stevenson', '/Deadra.jpeg',
  950.00, 1900.00, 'USD', 25, 25, 'English', true, 'active', false
),
-- 4) Leading SAFe 6.0
(
  'Leading SAFe',
  'leading-safe',
  'SAFe Agilist',
  '2026-03-12 09:00:00-04:00',
  '2026-03-13 14:00:00-04:00',
  '09:00:00', '14:00:00',
  'America/New_York', 'morning', 'live-virtual', '02 days',
  'Deadra Stevenson', '/Deadra.jpeg',
  555.00, 1110.00, 'USD', 25, 25, 'English', true, 'active', false
);
