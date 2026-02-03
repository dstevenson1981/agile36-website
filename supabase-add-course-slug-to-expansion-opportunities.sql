/* Add course_slug to expansion_opportunities. Run in Supabase SQL Editor. */

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'expansion_opportunities' AND column_name = 'course_slug'
  ) THEN
    ALTER TABLE expansion_opportunities ADD COLUMN course_slug text;
    COMMENT ON COLUMN expansion_opportunities.course_slug IS 'Course slug (e.g. leading-safe, product-owner-manager) when opportunity is tied to a specific course.';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_expansion_opportunities_course_slug ON expansion_opportunities(course_slug);
