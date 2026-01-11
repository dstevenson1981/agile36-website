-- ============================================================
-- RUN THIS ONE FILE TO FIX BF200 PROMO CODE
-- Copy and paste this entire file into Supabase SQL Editor
-- ============================================================

-- Step 1: Disable 50OFF (so it stops working)
UPDATE promo_codes 
SET 
  active = FALSE,
  expires_at = NOW() - INTERVAL '1 day',
  updated_at = NOW()
WHERE UPPER(TRIM(code)) = '50OFF';

-- Step 2: Delete any old BF200 codes
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'BF200';

-- Step 3: Create BF200 with correct settings
INSERT INTO promo_codes (
  code, 
  discount_type, 
  discount_value, 
  description, 
  active, 
  expires_at, 
  usage_limit, 
  usage_count,
  created_at,
  updated_at
)
VALUES 
  (
    'BF200',                    -- Code name
    'fixed',                    -- Fixed dollar amount (not percentage)
    200,                        -- $200 discount
    'Black Friday Sale - $200 Off', 
    TRUE,                       -- ACTIVE (must be TRUE)
    '2025-12-01 23:59:59+00'::timestamptz,  -- Expires Dec 1, 2025
    NULL,                       -- No usage limit
    0,                          -- Usage count starts at 0
    NOW(),
    NOW()
  );

-- Step 4: Verify it worked (you should see BF200 with status "ACTIVE ✓")
SELECT 
  code, 
  discount_type, 
  discount_value, 
  active, 
  expires_at,
  expires_at < NOW() as is_expired,
  CASE 
    WHEN NOT active THEN 'INACTIVE ❌'
    WHEN expires_at < NOW() THEN 'EXPIRED ❌'
    ELSE 'ACTIVE ✓'
  END as status
FROM promo_codes 
WHERE UPPER(TRIM(code)) IN ('50OFF', 'BF200')
ORDER BY code;

-- ============================================================
-- DONE! If you see "ACTIVE ✓" for BF200, it should work now.
-- ============================================================



















