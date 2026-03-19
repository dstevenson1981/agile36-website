-- Set Leading SAFe, Scrum Master to $515; DevOps, SAFe for Teams to $599
-- Run in Supabase SQL Editor

-- Leading SAFe: $515 (original $1,030)
UPDATE course_schedules
SET price = 515.00, original_price = 1030.00, updated_at = NOW()
WHERE course_slug = 'leading-safe';

-- SAFe Scrum Master: $515 (original $1,030)
UPDATE course_schedules
SET price = 515.00, original_price = 1030.00, updated_at = NOW()
WHERE course_slug = 'scrum-master';

-- SAFe DevOps: $599
UPDATE course_schedules
SET price = 599.00, original_price = 1198.00, updated_at = NOW()
WHERE course_slug = 'devops';

-- SAFe for Teams: $599
UPDATE course_schedules
SET price = 599.00, original_price = 1198.00, updated_at = NOW()
WHERE course_slug = 'safe-for-teams';

-- Verify
SELECT course_slug, course_name, price, original_price
FROM course_schedules
WHERE course_slug IN ('leading-safe', 'scrum-master', 'devops', 'safe-for-teams')
ORDER BY course_slug, start_date
LIMIT 30;
