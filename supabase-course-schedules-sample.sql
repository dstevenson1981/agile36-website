-- Sample data for course_schedules table
-- Run this AFTER creating the table with supabase-course-schedules.sql
-- You can modify these dates and add more schedules as needed

-- Example: Leading SAFe course schedules
-- Replace these with your actual course dates and times

INSERT INTO course_schedules (
  course_name,
  course_slug,
  start_date,
  end_date,
  start_time,
  end_time,
  timezone,
  format,
  instructor_name,
  price,
  currency,
  seats_available,
  total_seats,
  location,
  status,
  description
) VALUES 
-- Example Live Virtual Course
(
  'Leading SAFe® 6.0 Training',
  'leading-safe',
  '2025-02-15 09:00:00-05:00', -- Start date with timezone
  '2025-02-16 17:00:00-05:00', -- End date with timezone
  '09:00:00', -- Start time
  '17:00:00', -- End time
  'America/New_York',
  'live-virtual',
  'Deadra Stevenson',
  515.00,
  'USD',
  15,
  25,
  NULL, -- No location for virtual
  'active',
  'Join our live virtual Leading SAFe training with expert instructors. Perfect for remote teams and individuals.'
),
-- Example In-Person Course
(
  'Leading SAFe® 6.0 Training',
  'leading-safe',
  '2025-03-10 09:00:00-05:00',
  '2025-03-11 17:00:00-05:00',
  '09:00:00',
  '17:00:00',
  'America/New_York',
  'in-person',
  'Joe Puoci',
  515.00,
  'USD',
  8,
  20,
  'New York, NY',
  'active',
  'In-person training in New York. Network with other professionals and get hands-on experience.'
),
-- Another Virtual Course
(
  'Leading SAFe® 6.0 Training',
  'leading-safe',
  '2025-04-05 09:00:00-05:00',
  '2025-04-06 17:00:00-05:00',
  '09:00:00',
  '17:00:00',
  'America/New_York',
  'live-virtual',
  'Marcus Ball',
  515.00,
  'USD',
  20,
  25,
  NULL,
  'active',
  'Early morning virtual session. Great for West Coast participants.'
);

-- Note: Dates should be in the future
-- Format: 'YYYY-MM-DD HH:MM:SS-TZ' (e.g., '2025-02-15 09:00:00-05:00' for EST)
-- Times should be in HH:MM:SS format (24-hour)
-- Timezone examples: 'America/New_York', 'America/Los_Angeles', 'UTC', etc.



