-- Fix RLS policies for promo_codes to allow service role to read ALL codes
-- This ensures the API can validate promo codes even if they're inactive (for error messages)

-- Drop existing policies that might be blocking
DROP POLICY IF EXISTS "Allow public read access to promo_codes" ON public.promo_codes;
DROP POLICY IF EXISTS "Allow service role to read promo_codes" ON public.promo_codes;

-- Create policy: Allow service role to READ ALL promo codes (bypasses RLS)
-- This is needed for the validate-promo-code API endpoint
CREATE POLICY "Allow service role to read promo_codes"
ON public.promo_codes
FOR SELECT
TO service_role
USING (true);

-- Create policy: Allow public to READ active promo codes only
-- This is for security - public users can only see active codes
CREATE POLICY "Allow public read access to promo_codes"
ON public.promo_codes
FOR SELECT
TO public
USING (active = true);

-- Verify the policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'promo_codes';

-- Test query as service role (should return all codes)
-- Note: This will only work if you're running as service_role
-- The API uses service_role key, so it should work there









