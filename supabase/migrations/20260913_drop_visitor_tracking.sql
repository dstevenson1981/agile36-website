-- Remove unused visitor identification / live-watch tables.
-- These never produced person-level data and are not used by checkout.
DROP TABLE IF EXISTS public.visitor_presence;
DROP TABLE IF EXISTS public.website_visitors;
DROP TABLE IF EXISTS public.visitor_logs;
DROP TABLE IF EXISTS public.hyper_people;
DROP TABLE IF EXISTS public.hyper_ip_cache;
