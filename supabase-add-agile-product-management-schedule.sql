-- Add SAFe Agile Product Management Course Schedules
-- Monday-Wednesday classes (once per week) and Weekend classes (twice per month)
-- From late January through mid-May 2026
-- Mix trainers: Deadra Stevenson and Joe
-- Run this in Supabase SQL Editor

-- Clear any existing schedules for this course (optional - comment out if you want to keep existing)
-- DELETE FROM course_schedules WHERE course_slug = 'agile-product-management';

-- Monday-Wednesday Classes (3 days, once per week)
-- Starting Monday, January 27, 2026 and continuing weekly until May 11, 2026
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
) VALUES
-- January 2026
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-01-27 09:00:00-05:00', '2026-01-29 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
-- February 2026
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-02-02 09:00:00-05:00', '2026-02-04 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-02-09 09:00:00-05:00', '2026-02-11 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-02-16 09:00:00-05:00', '2026-02-18 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-02-23 09:00:00-05:00', '2026-02-25 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
-- March 2026
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-03-02 09:00:00-05:00', '2026-03-04 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-03-09 09:00:00-05:00', '2026-03-11 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-03-16 09:00:00-04:00', '2026-03-18 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-03-23 09:00:00-04:00', '2026-03-25 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-03-30 09:00:00-04:00', '2026-04-01 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
-- April 2026
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-04-06 09:00:00-04:00', '2026-04-08 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-04-13 09:00:00-04:00', '2026-04-15 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-04-20 09:00:00-04:00', '2026-04-22 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-04-27 09:00:00-04:00', '2026-04-29 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
-- May 2026
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-05-04 09:00:00-04:00', '2026-05-06 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-05-11 09:00:00-04:00', '2026-05-13 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '03 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', false)
ON CONFLICT DO NOTHING;

-- Weekend Classes (Friday-Saturday, 2 days, twice per month)
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
) VALUES
-- January 2026 (Jan 31-Feb 1 is the weekend)
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-01-31 09:00:00-05:00', '2026-02-01 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', true),
-- February 2026 (two weekends: Feb 6-7 and Feb 13-14)
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-02-06 09:00:00-05:00', '2026-02-07 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', true),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-02-13 09:00:00-05:00', '2026-02-14 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', true),
-- March 2026 (two weekends: Mar 6-7 and Mar 13-14)
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-03-06 09:00:00-05:00', '2026-03-07 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', true),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-03-13 09:00:00-04:00', '2026-03-14 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', true),
-- April 2026 (two weekends: Apr 3-4 and Apr 10-11)
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-04-03 09:00:00-04:00', '2026-04-04 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', true),
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-04-10 09:00:00-04:00', '2026-04-11 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', true),
-- May 2026 (one weekend: May 1-2, since cutoff is mid-May)
('SAFe Agile Product Management', 'agile-product-management', 'SAFe', '2026-05-01 09:00:00-04:00', '2026-05-02 14:00:00-04:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Joe', '/Joe.jpeg', 1095.00, 2190.00, 'USD', 25, 25, 'English', true, 'active', true)
ON CONFLICT DO NOTHING;

-- Verify the schedules were added
SELECT 
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  instructor_name,
  is_weekend,
  seats_available,
  status
FROM course_schedules 
WHERE course_slug = 'agile-product-management'
  AND start_date >= '2026-01-27'
  AND start_date <= '2026-05-15'
ORDER BY start_date;

-- Summary count
SELECT 
  COUNT(*) as total_classes,
  COUNT(*) FILTER (WHERE is_weekend = true) as weekend_classes,
  COUNT(*) FILTER (WHERE is_weekend = false) as weekday_classes,
  COUNT(*) FILTER (WHERE instructor_name = 'Deadra Stevenson') as deadra_classes,
  COUNT(*) FILTER (WHERE instructor_name = 'Joe') as joe_classes
FROM course_schedules 
WHERE course_slug = 'agile-product-management'
  AND start_date >= '2026-01-27'
  AND start_date <= '2026-05-15';
