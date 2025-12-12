-- Fix course name for ai-agent-builder courses
-- Update any entries that say "AI Agent Builder" to "No-Code AI Agents & Automation™"

UPDATE course_schedules
SET 
  course_name = 'No-Code AI Agents & Automation™',
  course_type = 'No-Code AI Agents & Automation™',
  updated_at = NOW()
WHERE course_slug = 'ai-agent-builder'
  AND (course_name != 'No-Code AI Agents & Automation™' OR course_type != 'No-Code AI Agents & Automation™');

-- Verify the updates
SELECT 
  id,
  course_name,
  course_type,
  course_slug,
  price,
  start_date
FROM course_schedules
WHERE course_slug = 'ai-agent-builder'
ORDER BY start_date DESC;
