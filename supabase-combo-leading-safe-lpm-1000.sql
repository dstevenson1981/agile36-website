-- Leading SAFe + Lean Portfolio Management combo course: set price to $1,000
-- Run in Supabase SQL Editor (if you have a combo_courses or similar table)

-- If combo prices are stored in a table:
-- UPDATE combo_courses
-- SET price = 1000, updated_at = NOW()
-- WHERE id = 'leading-safe-lpm';

-- If using a key-value or config table:
-- UPDATE site_config SET value = '1000' WHERE key = 'combo_leading_safe_lpm_price';

-- NOTE: Combo course prices are currently defined in app/combo-courses/data.ts (comboPrice: 1000).
-- The code has been updated. This SQL is for reference if you migrate combo prices to the database.
