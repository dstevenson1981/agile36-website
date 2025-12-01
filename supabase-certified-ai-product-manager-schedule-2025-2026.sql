-- Certified AI Product Manager™ Course Schedule Data
-- This SQL file contains schedule data for the Certified AI Product Manager™ course
-- Each class is 2 days (10 hours total), 5 hours per day, 9 AM - 2 PM EST
-- Schedule: Dec 20-21, 2025 and Dec 29-30, 2025, then once every week (weekdays) and every weekend from January through May 2026

-- First, delete any existing schedules for this course
DELETE FROM course_schedules WHERE course_slug = 'certified-ai-product-manager';

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
-- December 2025 - Initial dates
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2025-12-20 09:00:00-05:00', '2025-12-21 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2025-12-29 09:00:00-05:00', '2025-12-30 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),

-- January 2026 - Weekday and Weekend batches
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-01-06 09:00:00-05:00', '2026-01-07 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-01-13 09:00:00-05:00', '2026-01-14 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-01-20 09:00:00-05:00', '2026-01-21 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-01-27 09:00:00-05:00', '2026-01-28 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-01-08 09:00:00-05:00', '2026-01-09 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-01-15 09:00:00-05:00', '2026-01-16 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-01-22 09:00:00-05:00', '2026-01-23 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-01-29 09:00:00-05:00', '2026-01-30 14:00:00-05:00', '09:00:00', '14:00:00', 'America/New_York', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),

-- February 2026
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-02-03', '2026-02-04', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-02-10', '2026-02-11', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-02-17', '2026-02-18', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-02-24', '2026-02-25', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-02-05', '2026-02-06', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-02-12', '2026-02-13', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-02-19', '2026-02-20', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-02-26', '2026-02-27', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),

-- March 2026
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-03', '2026-03-04', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-10', '2026-03-11', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-17', '2026-03-18', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-24', '2026-03-25', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-31', '2026-04-01', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-05', '2026-03-06', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-12', '2026-03-13', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-19', '2026-03-20', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-03-26', '2026-03-27', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),

-- April 2026
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-07', '2026-04-08', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-14', '2026-04-15', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-21', '2026-04-22', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-28', '2026-04-29', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-02', '2026-04-03', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-09', '2026-04-10', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-16', '2026-04-17', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-23', '2026-04-24', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-04-30', '2026-05-01', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),

-- May 2026
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-05-05', '2026-05-06', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-05-12', '2026-05-13', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-05-19', '2026-05-20', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-05-26', '2026-05-27', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-05-07', '2026-05-08', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-05-14', '2026-05-15', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-05-21', '2026-05-22', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false),
('Certified AI Product Manager™', 'certified-ai-product-manager', 'AI Product', '2026-05-28', '2026-05-29', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', false);

-- Verify the schedules were created
SELECT 
  course_name,
  start_date,
  end_date,
  is_weekend,
  CASE 
    WHEN EXTRACT(DOW FROM start_date) IN (0, 6) THEN 'Weekend'
    ELSE 'Weekday'
  END as day_type,
  instructor_name
FROM course_schedules 
WHERE course_slug = 'certified-ai-product-manager'
ORDER BY start_date;

