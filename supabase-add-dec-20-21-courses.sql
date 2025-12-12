-- Add AI Agents and Scrum Master courses for December 20-21, 2025
-- Run this in your Supabase SQL Editor

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
  description
) VALUES 
-- AI Agent Builder Course - Dec 20-21, 2025
(
  'AI Agent Builder',
  'ai-agent-builder',
  'AI Agent Builder',
  '2025-12-20 09:00:00-05:00', -- December 20, 2025, 9:00 AM EST
  '2025-12-21 17:00:00-05:00', -- December 21, 2025, 5:00 PM EST
  '09:00:00',
  '17:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '2 Days',
  'Joe Puoci', -- Instructor
  '/Joe.jpeg', -- Instructor image
  515.00, -- Adjust price as needed
  899.00, -- Original price before discount
  'USD',
  25, -- Seats available
  25, -- Total seats
  'English',
  true,
  'active',
  true, -- Weekend course
  'Join our comprehensive AI Agent Builder training. Learn to build, deploy, and manage AI agents effectively.'
),
-- Scrum Master Course - Dec 20-21, 2025
(
  'SAFe Scrum Master',
  'scrum-master',
  'SAFe Scrum Master',
  '2025-12-20 09:00:00-05:00', -- December 20, 2025, 9:00 AM EST
  '2025-12-21 17:00:00-05:00', -- December 21, 2025, 5:00 PM EST
  '09:00:00',
  '17:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '2 Days',
  'Joe Puoci', -- Instructor
  '/Joe.jpeg', -- Instructor image
  515.00, -- Adjust price as needed
  899.00, -- Original price before discount
  'USD',
  25, -- Seats available
  25, -- Total seats
  'English',
  true,
  'active',
  true, -- Weekend course
  'Master the SAFe Scrum Master framework. Learn to facilitate Agile teams and drive organizational agility.'
);

-- Verify the courses were created
SELECT 
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  format,
  price,
  seats_available,
  status
FROM course_schedules
WHERE start_date::date = '2025-12-20'::date
ORDER BY course_name;
