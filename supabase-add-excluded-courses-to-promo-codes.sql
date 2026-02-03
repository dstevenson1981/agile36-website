-- Add excluded_course_slugs to promo_codes for "all courses except these"
-- Run in Supabase SQL Editor before enabling 150OFF.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'promo_codes' AND column_name = 'excluded_course_slugs'
  ) THEN
    ALTER TABLE promo_codes ADD COLUMN excluded_course_slugs TEXT[] DEFAULT NULL;
    COMMENT ON COLUMN promo_codes.excluded_course_slugs IS 'If set, this promo code does NOT apply to these course_slug values. Used with course_slug NULL for "all except these".';
  END IF;
END $$;
