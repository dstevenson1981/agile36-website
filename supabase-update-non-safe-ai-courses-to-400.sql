/* Set non-SAFE AI courses to $400 where price is above $400.
   Excludes SAFe AI courses (e.g. ai-driven-scrum-master).
   Run in Supabase SQL Editor. */

UPDATE course_schedules
SET price = '400.00'
WHERE course_slug IN (
  'ai-agent-builder',
  'certified-ai-product-manager',
  'certified-genai-practitioner',
  'executive-genai-leadership',
  'generative-ai-project-managers'
)
  AND status = 'active'
  AND (price::numeric) > 400;

-- Verify the update
SELECT course_slug, course_name, start_date, price, original_price
FROM course_schedules
WHERE course_slug IN (
  'ai-agent-builder',
  'certified-ai-product-manager',
  'certified-genai-practitioner',
  'executive-genai-leadership',
  'generative-ai-project-managers'
)
  AND status = 'active'
ORDER BY course_slug, start_date;
