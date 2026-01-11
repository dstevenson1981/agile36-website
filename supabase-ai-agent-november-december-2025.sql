-- Add November-December 2025 schedules for No-Code AI Agents & Automation™
-- Plus check for and remove any duplicate entries

-- STEP 1: Check for duplicates (run this first to see if there are any)
SELECT start_date, end_date, COUNT(*) as count
FROM course_schedules
WHERE course_slug = 'ai-agent-builder'
GROUP BY start_date, end_date
HAVING COUNT(*) > 1;

-- STEP 2: Remove duplicates (keeps the first entry, removes others)
-- Only run this if step 1 shows duplicates
DELETE FROM course_schedules
WHERE id IN (
  SELECT id
  FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY course_slug, start_date, end_date ORDER BY created_at) as row_num
    FROM course_schedules
    WHERE course_slug = 'ai-agent-builder'
  ) t
  WHERE row_num > 1
);

-- STEP 3: Add November 2025 schedule (starting Nov 29-30)
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
  status
) VALUES
-- November 2025 - Starting with Nov 29-30 (Saturday-Sunday weekend)
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-11-29', '2025-11-30', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active');

-- STEP 4: Add December 2025 schedules (weekdays + weekends)
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
  status
) VALUES
-- December 2025
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-02', '2025-12-03', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active'),
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-06', '2025-12-07', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active'),
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-09', '2025-12-10', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active'),
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-13', '2025-12-14', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active'),
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-16', '2025-12-17', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active'),
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-20', '2025-12-21', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active'),
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-23', '2025-12-24', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active'),
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-27', '2025-12-28', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active'),
('No-Code AI Agents & Automation™', 'ai-agent-builder', 'AI Product', '2025-12-30', '2025-12-31', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 699, 1398, 'USD', 25, 25, 'English', true, 'active');

-- VERIFICATION: Check that Nov 29-30 was added and no duplicates remain
SELECT start_date, end_date, instructor_name, COUNT(*) as count
FROM course_schedules
WHERE course_slug = 'ai-agent-builder'
AND start_date >= '2025-11-29'
AND start_date <= '2025-12-31'
GROUP BY start_date, end_date, instructor_name
ORDER BY start_date;



















