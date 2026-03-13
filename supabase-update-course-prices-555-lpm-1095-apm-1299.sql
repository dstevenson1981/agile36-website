-- Update course prices: 515→555, LPM→$1,095, APM→$1,299
-- Run in Supabase SQL Editor

-- 1. Leading SAFe, Scrum Master, POPM, SAFe for Teams: $555 (original $1,110)
UPDATE course_schedules
SET price = 555.00, original_price = 1110.00, updated_at = NOW()
WHERE course_slug IN ('leading-safe', 'scrum-master', 'product-owner-manager', 'safe-for-teams');

-- 2. Lean Portfolio Management: $1,095 (original $2,190)
UPDATE course_schedules
SET price = 1095.00, original_price = 2190.00, updated_at = NOW()
WHERE course_slug = 'lean-portfolio-management';

-- 3. Agile Product Management: $1,299 (original $2,598)
UPDATE course_schedules
SET price = 1299.00, original_price = 2598.00, updated_at = NOW()
WHERE course_slug = 'agile-product-management';

-- Verify
SELECT course_slug, course_name, price, original_price
FROM course_schedules
WHERE course_slug IN ('leading-safe', 'scrum-master', 'product-owner-manager', 'safe-for-teams', 'lean-portfolio-management', 'agile-product-management')
ORDER BY course_slug, start_date
LIMIT 30;
