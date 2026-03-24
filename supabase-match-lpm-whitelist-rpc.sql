/* Optional but recommended: Gmail treats dots in the local part as equivalent.
   Run in Supabase SQL Editor so OAuth emails match whitelist rows even when
   one uses fred.hardenbrook@ and the other fredhardenbrook@. */

CREATE OR REPLACE FUNCTION public.match_lpm_whitelist(check_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM lpm_pro_access_whitelist w
    WHERE lower(trim(w.email)) = lower(trim(check_email))
    OR (
      lower(split_part(trim(w.email), '@', 2)) IN ('gmail.com', 'googlemail.com')
      AND lower(split_part(trim(check_email), '@', 2)) IN ('gmail.com', 'googlemail.com')
      AND regexp_replace(lower(split_part(trim(w.email), '@', 1)), '\.', '', 'g')
        = regexp_replace(lower(split_part(trim(check_email), '@', 1)), '\.', '', 'g')
    )
  );
$$;

REVOKE ALL ON FUNCTION public.match_lpm_whitelist(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.match_lpm_whitelist(text) TO service_role;
