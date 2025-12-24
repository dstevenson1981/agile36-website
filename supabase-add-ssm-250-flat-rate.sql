-- Add SSM250 Promo Code: Flat Rate $250 for SAFe Scrum Master Course
-- This promo code provides a $305 discount to reduce the SAFe Scrum Master course from $555 to $250
-- Current course price: $555.00
-- Target price: $250.00
-- Required discount: $305.00
-- Course-specific: Only applies to 'scrum-master' course

-- First, ensure the course_slug column exists (run supabase-add-course-slug-to-promo-codes.sql first if needed)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'promo_codes' AND column_name = 'course_slug'
  ) THEN
    ALTER TABLE promo_codes ADD COLUMN course_slug TEXT;
    CREATE INDEX IF NOT EXISTS idx_promo_codes_course_slug ON promo_codes(course_slug);
  END IF;
END $$;

-- Delete any existing SSM250 codes (in case of case mismatches)
DELETE FROM promo_codes WHERE UPPER(code) = 'SSM250';

-- Insert the SSM250 promo code
-- $305 off discount to achieve flat rate of $250 for SAFe Scrum Master course
-- Course-specific: Only applies to 'scrum-master' course
-- No expiration date (set to NULL for unlimited time)
-- Storing in uppercase to ensure consistency
INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit, usage_count, course_slug)
VALUES
  ('SSM250', 'fixed', 305, 'SAFe Scrum Master Flat Rate $250 (reduces price from $555 to $250)', TRUE,
   NULL,
   NULL,
   0,
   'scrum-master')
ON CONFLICT (code)
DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 305,
  description = 'SAFe Scrum Master Flat Rate $250 (reduces price from $555 to $250)',
  active = TRUE,
  expires_at = NULL,
  course_slug = 'scrum-master',
  updated_at = NOW();

-- Verify the promo code was created/updated
SELECT
  code,
  discount_type,
  discount_value,
  description,
  active,
  expires_at,
  usage_limit,
  usage_count,
  course_slug,
  CASE
    WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'EXPIRED'
    WHEN NOT active THEN 'INACTIVE'
    WHEN usage_limit IS NOT NULL AND usage_count >= usage_limit THEN 'USAGE LIMIT REACHED'
    ELSE 'VALID'
  END as status,
  NOW() as current_time
FROM promo_codes
WHERE code = 'SSM250' OR UPPER(code) = 'SSM250';

