-- Update course prices: Leading SAFe, Scrum Master, POPM, Teams → $515; APM → $1299
-- Run in Supabase SQL Editor

-- Leading SAFe: $515 (original $1,030)
UPDATE course_schedules
SET price = 515.00, original_price = 1030.00
WHERE course_slug = 'leading-safe';

-- SAFe Scrum Master: $515 (original $1,030)
UPDATE course_schedules
SET price = 515.00, original_price = 1030.00
WHERE course_slug = 'scrum-master';

-- SAFe Product Owner/Product Manager (POPM): $515 (original $1,030)
UPDATE course_schedules
SET price = 515.00, original_price = 1030.00
WHERE course_slug = 'product-owner-manager';

-- SAFe for Teams: $515 (original $1,030)
UPDATE course_schedules
SET price = 515.00, original_price = 1030.00
WHERE course_slug = 'safe-for-teams';

-- SAFe Agile Product Management (APM): $1,299 (original $2,598)
UPDATE course_schedules
SET price = 1299.00, original_price = 2598.00
WHERE course_slug = 'agile-product-management';

-- Verify
SELECT course_slug, course_name, price, original_price
FROM course_schedules
WHERE course_slug IN ('leading-safe', 'scrum-master', 'product-owner-manager', 'safe-for-teams', 'agile-product-management')
ORDER BY course_slug
LIMIT 20;
