-- Add Advanced Scrum Master course for January 17-18, 2026 (Instructor: Deadra Stevenson)

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
) VALUES (
  'Advanced Scrum Master Certification Path',
  'advanced-scrum-master',
  'Advanced Scrum Master Certification Path',
  '2026-01-17 09:00:00-05:00',
  '2026-01-18 17:00:00-05:00',
  '09:00:00',
  '17:00:00',
  'America/New_York',
  'morning',
  'live-virtual',
  '2 Days',
  'Deadra Stevenson',
  NULL,
  950.00,
  1699.00,
  'USD',
  15,
  20,
  'English',
  true,
  'active',
  true,
  'Enhance your ability to facilitate Agile teams effectively. Master conflict resolution, boost team collaboration, and optimize team flow and Agile Release Train (ART) performance.'
);

-- Verify the insertion
SELECT 
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  instructor_name,
  price,
  original_price,
  status
FROM course_schedules
WHERE course_slug = 'advanced-scrum-master'
  AND start_date = '2026-01-17 09:00:00-05:00'
ORDER BY start_date DESC;
