-- POPM list price → $545 (original $1,030). Run in Supabase SQL Editor.
UPDATE course_schedules
SET price = 545.00,
    original_price = 1030.00,
    updated_at = NOW()
WHERE course_slug = 'product-owner-manager';

SELECT course_slug, price, original_price, COUNT(*) AS cohorts
FROM course_schedules
WHERE course_slug = 'product-owner-manager'
GROUP BY course_slug, price, original_price;
