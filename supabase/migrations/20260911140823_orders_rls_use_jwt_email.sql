-- Authenticated users cannot SELECT auth.users. RLS that does
--   SELECT email FROM auth.users WHERE id = auth.uid()
-- throws "permission denied for table users" and the account Orders
-- page shows "Error loading orders".
-- Match the signed-in email from the JWT and from public.profiles instead.

DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (
    lower(trim(customer_email)) = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
    OR EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND trim(p.email) <> ''
        AND lower(trim(customer_email)) = lower(trim(p.email))
    )
  );

DROP POLICY IF EXISTS "Users can check own whitelist status" ON public.lpm_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status"
  ON public.lpm_pro_access_whitelist
  FOR SELECT
  TO authenticated
  USING (
    lower(trim(email)) = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
    OR EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND trim(p.email) <> ''
        AND lower(trim(lpm_pro_access_whitelist.email)) = lower(trim(p.email))
    )
  );

DROP POLICY IF EXISTS "Users can check own whitelist status" ON public.leading_safe_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status"
  ON public.leading_safe_pro_access_whitelist
  FOR SELECT
  TO authenticated
  USING (
    lower(trim(email)) = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
    OR EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND trim(p.email) <> ''
        AND lower(trim(leading_safe_pro_access_whitelist.email)) = lower(trim(p.email))
    )
  );

DROP POLICY IF EXISTS "Users can check own whitelist status" ON public.advanced_scrum_master_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status"
  ON public.advanced_scrum_master_pro_access_whitelist
  FOR SELECT
  TO authenticated
  USING (
    lower(trim(email)) = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
    OR EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND trim(p.email) <> ''
        AND lower(trim(advanced_scrum_master_pro_access_whitelist.email)) = lower(trim(p.email))
    )
  );

DROP POLICY IF EXISTS "Users can check own whitelist status" ON public.scrum_master_pro_access_whitelist;
CREATE POLICY "Users can check own whitelist status"
  ON public.scrum_master_pro_access_whitelist
  FOR SELECT
  TO authenticated
  USING (
    lower(trim(email)) = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
    OR EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND trim(p.email) <> ''
        AND lower(trim(scrum_master_pro_access_whitelist.email)) = lower(trim(p.email))
    )
  );

DROP POLICY IF EXISTS "Users can check own AI PM exam roster status" ON public.ai_product_management_exam_roster;
CREATE POLICY "Users can check own AI PM exam roster status"
  ON public.ai_product_management_exam_roster
  FOR SELECT
  TO authenticated
  USING (
    lower(trim(email)) = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
    OR EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND trim(p.email) <> ''
        AND lower(trim(ai_product_management_exam_roster.email)) = lower(trim(p.email))
    )
  );
