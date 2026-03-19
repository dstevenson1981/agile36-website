-- Revert course prices: Leading SAFe, Scrum Master, POPM, Teams → $555 (from $515)
-- Run in Supabase SQL Editor

-- Leading SAFe: $555 (original $1,030)
UPDATE course_schedules
SET price = 555.00, original_price = 1030.00
WHERE course_slug = 'leading-safe';

-- SAFe Scrum Master: $555 (original $1,030)
UPDATE course_schedules
SET price = 555.00, original_price = 1030.00
WHERE course_slug = 'scrum-master';

-- SAFe Product Owner/Product Manager (POPM): $555 (original $1,030)
UPDATE course_schedules
SET price = 555.00, original_price = 1030.00
WHERE course_slug = 'product-owner-manager';

-- SAFe for Teams: $555 (original $1,030)
UPDATE course_schedules
SET price = 555.00, original_price = 1030.00
WHERE course_slug = 'safe-for-teams';

-- Verify
SELECT course_slug, course_name, price, original_price
FROM course_schedules
WHERE course_slug IN ('leading-safe', 'scrum-master', 'product-owner-manager', 'safe-for-teams')
ORDER BY course_slug
LIMIT 20;
