-- Stop auto-cancelling overlapping cohorts. Deadra will cancel by hand.
-- Production data: all cancelled Sep–Dec 2026 rows were reopened
-- (status back to active), including the Certified AI Product Manager
-- date of 2026-09-24 that had a registrant.

CREATE OR REPLACE FUNCTION public.cancel_same_day_competing_schedules()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- No-op. Overlapping cohorts are no longer cancelled automatically.
  RETURN NEW;
END;
$$;

ALTER TABLE public.course_schedules
  DISABLE TRIGGER trg_cancel_same_day_competing_schedules;

COMMENT ON FUNCTION public.cancel_same_day_competing_schedules() IS
  'Disabled. Previously cancelled overlapping zero-registration cohorts when one class reached total_registrants >= 1. Deadra cancels by hand.';
