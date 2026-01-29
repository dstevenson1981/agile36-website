-- Run once in Supabase SQL Editor so only N8N handles new enrollment_leads
-- (Database Webhook in Supabase sends to N8N; no trigger needed)

DROP TRIGGER IF EXISTS trigger_process_enrollment_lead ON public.enrollment_leads;
DROP TRIGGER IF EXISTS enrollment_leads_process_trigger ON public.enrollment_leads;
