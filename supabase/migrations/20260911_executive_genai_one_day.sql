-- Executive GenAI Leadership is a one-day class, 9 AM–2 PM.
-- Collapses upcoming two-day spans onto the start date and relabels duration.
UPDATE course_schedules
SET
  end_date = start_date + interval '5 hours',
  start_time = '09:00:00',
  end_time = '14:00:00',
  duration = '1 Day',
  updated_at = NOW()
WHERE course_slug = 'executive-genai-leadership'
  AND start_date >= now();
