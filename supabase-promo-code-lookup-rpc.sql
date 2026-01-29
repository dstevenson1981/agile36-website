-- RPC: Look up promo code by normalized code (trim + case-insensitive)
-- Run this in Supabase SQL Editor once. Use so 50OFF works regardless of casing/spaces.

CREATE OR REPLACE FUNCTION get_promo_code_by_code(p_code text)
RETURNS SETOF promo_codes
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM promo_codes
  WHERE UPPER(TRIM(code)) = UPPER(TRIM(p_code))
  LIMIT 1;
$$;

-- Grant execute to anon and service_role so the API can call it
GRANT EXECUTE ON FUNCTION get_promo_code_by_code(text) TO anon;
GRANT EXECUTE ON FUNCTION get_promo_code_by_code(text) TO service_role;
