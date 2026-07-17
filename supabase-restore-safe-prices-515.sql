-- Restore Leading SAFe, SAFe Scrum Master, and POPM list price → $515 (original $1,030).
-- Applied to production 2026-07-17 via MCP; keep for re-runs / local reference.

UPDATE course_schedules
SET price = 515.00,
    original_price = 1030.00,
    updated_at = NOW()
WHERE course_slug IN ('leading-safe', 'scrum-master', 'product-owner-manager')
  AND price = 545.00;

SELECT course_slug, price, original_price, COUNT(*) AS cohorts
FROM course_schedules
WHERE course_slug IN ('leading-safe', 'scrum-master', 'product-owner-manager')
GROUP BY course_slug, price, original_price
ORDER BY course_slug, price;
