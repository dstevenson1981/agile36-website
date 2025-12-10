-- ============================================================
-- UPDATE COURSE PRICES
-- Run this in Supabase SQL Editor
-- ============================================================

-- Step 1: Update all courses that are $515 to $555
-- This includes: Leading SAFe, Scrum Master, Product Owner/Manager, 
-- AI-Driven Scrum Master, Generative AI for Project Managers, etc.
UPDATE course_schedules
SET 
  price = 555.00,
  original_price = CASE 
    WHEN original_price = 1030.00 THEN 1110.00  -- Update original price proportionally
    WHEN original_price IS NULL THEN NULL
    ELSE original_price * (555.00 / 515.00)  -- Scale original price
  END,
  updated_at = NOW()
WHERE price = 515.00
  AND course_slug NOT IN ('devops', 'safe-for-teams', 'lean-portfolio-management', 'agile-product-management');

-- Step 2: Update DevOps to $699
UPDATE course_schedules
SET 
  price = 699.00,
  original_price = CASE 
    WHEN original_price = 1198.00 THEN 1398.00  -- Update original price proportionally
    WHEN original_price IS NULL THEN NULL
    ELSE original_price * (699.00 / 599.00)  -- Scale original price (assuming current is 599)
  END,
  updated_at = NOW()
WHERE course_slug = 'devops';

-- Step 3: Update SAFe for Teams to $599
UPDATE course_schedules
SET 
  price = 599.00,
  original_price = CASE 
    WHEN original_price = 1030.00 THEN 1198.00  -- Update original price proportionally
    WHEN original_price IS NULL THEN NULL
    ELSE original_price * (599.00 / 515.00)  -- Scale original price
  END,
  updated_at = NOW()
WHERE course_slug = 'safe-for-teams';

-- Step 4: Update Lean Portfolio Management to $950
UPDATE course_schedules
SET 
  price = 950.00,
  original_price = CASE 
    WHEN original_price = 1998.00 THEN 1900.00  -- Keep similar ratio
    WHEN original_price IS NULL THEN NULL
    ELSE original_price * (950.00 / 999.00)  -- Scale original price (assuming current is 999)
  END,
  updated_at = NOW()
WHERE course_slug = 'lean-portfolio-management';

-- Step 5: Update SAFe Agile Product Management to $950
UPDATE course_schedules
SET 
  price = 950.00,
  original_price = CASE 
    WHEN original_price = 2398.00 THEN 1900.00  -- Keep similar ratio
    WHEN original_price IS NULL THEN NULL
    ELSE original_price * (950.00 / 1199.00)  -- Scale original price (assuming current is 1199)
  END,
  updated_at = NOW()
WHERE course_slug = 'agile-product-management';

-- Step 6: Verify the updates
SELECT 
  course_slug,
  course_name,
  price,
  original_price,
  CASE 
    WHEN course_slug IN ('devops') THEN 'Should be $699'
    WHEN course_slug IN ('safe-for-teams') THEN 'Should be $599'
    WHEN course_slug IN ('lean-portfolio-management', 'agile-product-management') THEN 'Should be $950'
    ELSE 'Should be $555'
  END as expected_price
FROM course_schedules
WHERE status = 'active'
ORDER BY 
  CASE course_slug
    WHEN 'devops' THEN 1
    WHEN 'safe-for-teams' THEN 2
    WHEN 'lean-portfolio-management' THEN 3
    WHEN 'agile-product-management' THEN 4
    ELSE 5
  END,
  course_slug;

-- ============================================================
-- DONE! Check the results above to verify prices are correct.
-- ============================================================









