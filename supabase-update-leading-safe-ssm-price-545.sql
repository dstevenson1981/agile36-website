-- Leading SAFe + SAFe Scrum Master list price → $545 (original $1,030).
-- Run in Supabase SQL Editor (or applied via MCP).

UPDATE course_schedules
SET price = 545.00,
    original_price = 1030.00,
    updated_at = NOW()
WHERE course_slug IN ('leading-safe', 'scrum-master')
  AND price = 515.00;

SELECT course_slug, price, original_price, COUNT(*) AS cohorts
FROM course_schedules
WHERE course_slug IN ('leading-safe', 'scrum-master')
GROUP BY course_slug, price, original_price
ORDER BY course_slug, price;
