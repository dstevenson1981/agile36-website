-- Insert POPM (SAFe Product Owner/Product Manager) course schedule data
-- Dates from January 3, 2026 to May 3, 2026
-- Classes every Mon-Tue, Thu-Fri, and weekends (Sat-Sun)
-- Each class is 2 days, starting on Mon, Thu, or Sat

-- First, delete any existing POPM schedules to prevent duplicates
DELETE FROM course_schedules 
WHERE course_slug = 'product-owner-manager' 
  AND start_date >= '2026-01-01';

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



