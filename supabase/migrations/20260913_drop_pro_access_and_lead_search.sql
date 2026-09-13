-- Pro exam access is now derived from orders.plan = 'pro'.
-- Lead search/evidence/events were unused; public.leads is kept.
ALTER TABLE IF EXISTS public.leads DROP CONSTRAINT IF EXISTS leads_lead_search_id_fkey;

DROP TABLE IF EXISTS public.lead_evidence;
DROP TABLE IF EXISTS public.lead_events;
DROP TABLE IF EXISTS public.lead_searches;

DROP TABLE IF EXISTS public.user_access;
DROP TABLE IF EXISTS public.popm_pro_access_whitelist;
DROP TABLE IF EXISTS public.lpm_pro_access_whitelist;
DROP TABLE IF EXISTS public.leading_safe_pro_access_whitelist;
DROP TABLE IF EXISTS public.scrum_master_pro_access_whitelist;
DROP TABLE IF EXISTS public.advanced_scrum_master_pro_access_whitelist;
DROP TABLE IF EXISTS public.agile_product_management_pro_access_whitelist;

DROP FUNCTION IF EXISTS public.match_lpm_whitelist(text);
