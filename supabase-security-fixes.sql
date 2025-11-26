-- ===================================================================
-- SUPABASE SECURITY FIXES - Run this in Supabase SQL Editor
-- Fixes: Table public.promo_codes is public + RLS policies
-- ===================================================================

-- 1. Enable Row Level Security on promo_codes table
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- 2. Enable Row Level Security on course_schedules table (if not already enabled)
ALTER TABLE public.course_schedules ENABLE ROW LEVEL SECURITY;

-- 3. Create policy: Allow public READ access to promo_codes 
--    (needed for the validate-promo-code API to work)
CREATE POLICY "Allow public read access to promo_codes"
ON public.promo_codes
FOR SELECT
TO public
USING (active = true);

-- 4. Create policy: Allow service role to UPDATE promo_codes
--    (needed for tracking usage_count)
CREATE POLICY "Allow service role to update promo_codes"
ON public.promo_codes
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- 5. Create policy: Allow public READ access to course_schedules
--    (needed for displaying schedules on the website)
CREATE POLICY "Allow public read access to course_schedules"
ON public.course_schedules
FOR SELECT
TO public
USING (status = 'active');

-- 6. Create policy: Only authenticated users can INSERT schedules
CREATE POLICY "Only authenticated users can insert schedules"
ON public.course_schedules
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 7. Create policy: Only service role can UPDATE schedules
CREATE POLICY "Only service role can update schedules"
ON public.course_schedules
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- ===================================================================
-- VERIFICATION QUERIES - Run these to verify policies are applied
-- ===================================================================

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('promo_codes', 'course_schedules');

-- View all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('promo_codes', 'course_schedules');

-- ===================================================================
-- NOTES:
-- ===================================================================
-- After running this:
-- 1. Public users can READ active promo codes (for validation)
-- 2. Public users can READ active course schedules (for display)
-- 3. Only service_role can UPDATE promo codes (your API uses this)
-- 4. Only authenticated users can INSERT new schedules
-- 5. This fixes the "Table public.promo_codes is public" security warning
-- 
-- The "slow queries" warnings (0.21s-0.84s) are normal for migrations
-- and system queries - they won't affect your site performance.
-- ===================================================================

