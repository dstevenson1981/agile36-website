-- Update AI Agent Builder (No-Code AI Agents & Automation) course prices to $555
-- Original price set to $1110 (50% discount)

UPDATE course_schedules
SET 
  price = '555.00',
  original_price = '1110.00'
WHERE 
  course_slug = 'ai-agent-builder'
  AND status = 'active';

-- Verify the update
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  price,
  original_price,
  status
FROM course_schedules
WHERE course_slug = 'ai-agent-builder'
ORDER BY start_date;
