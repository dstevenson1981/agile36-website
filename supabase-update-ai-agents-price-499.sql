-- Update AI Agents course price to $499
-- This updates all active schedules for the ai-agent-builder course

UPDATE course_schedules
SET 
  price = '499.00',
  original_price = '998.00'
WHERE course_slug = 'ai-agent-builder'
  AND status = 'active';

-- Verify the update
SELECT 
  id,
  course_name,
  course_slug,
  price,
  original_price,
  start_date,
  status
FROM course_schedules
WHERE course_slug = 'ai-agent-builder'
  AND status = 'active'
ORDER BY start_date;
