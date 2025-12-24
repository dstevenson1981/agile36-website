-- Add course_slug column to promo_codes table for course-specific restrictions
-- If course_slug is NULL, the promo code applies to all courses
-- If course_slug is set, the promo code only applies to that specific course

-- Add the column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'promo_codes' AND column_name = 'course_slug'
  ) THEN
    ALTER TABLE promo_codes ADD COLUMN course_slug TEXT;
    
    -- Create index for faster lookups
    CREATE INDEX IF NOT EXISTS idx_promo_codes_course_slug ON promo_codes(course_slug);
    
    -- Add comment
    COMMENT ON COLUMN promo_codes.course_slug IS 'If set, this promo code only applies to the specified course. NULL means it applies to all courses.';
  END IF;
END $$;


