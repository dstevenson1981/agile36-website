-- AI-Driven Scrum Master list price → $555 (original $1,110).
-- Aligns schedule rows that were still at $515 with the site list price.
-- Run in Supabase SQL Editor (or applied via MCP).

UPDATE course_schedules
SET price = 555.00,
    original_price = 1110.00,
    updated_at = NOW()
WHERE course_slug = 'ai-driven-scrum-master'
  AND price = 515.00;

SELECT course_slug, price, original_price, COUNT(*) AS cohorts
FROM course_schedules
WHERE course_slug = 'ai-driven-scrum-master'
GROUP BY course_slug, price, original_price
ORDER BY price;
