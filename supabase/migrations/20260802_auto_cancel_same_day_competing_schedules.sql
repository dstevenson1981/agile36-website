-- When a cohort gets its first paid registrant, cancel every other active
-- class on that same calendar start day. August 2026 is grandfathered.

CREATE OR REPLACE FUNCTION public.cancel_same_day_competing_schedules()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  class_day date;
BEGIN
  -- Only when crossing into first registration
  IF COALESCE(NEW.total_registrants, 0) < 1 THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND COALESCE(OLD.total_registrants, 0) >= 1 THEN
    RETURN NEW;
  END IF;

  class_day := NEW.start_date::date;

  -- Leave August 2026 double-bookings alone; rule starts Sept 1, 2026
  IF class_day < DATE '2026-09-01' THEN
    RETURN NEW;
  END IF;

  UPDATE public.course_schedules
  SET status = 'cancelled',
      updated_at = now()
  WHERE id IS DISTINCT FROM NEW.id
    AND status = 'active'
    AND start_date::date = class_day
    AND COALESCE(total_registrants, 0) = 0;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_cancel_same_day_competing_schedules ON public.course_schedules;
CREATE TRIGGER trg_cancel_same_day_competing_schedules
AFTER INSERT OR UPDATE OF total_registrants
ON public.course_schedules
FOR EACH ROW
EXECUTE FUNCTION public.cancel_same_day_competing_schedules();

COMMENT ON FUNCTION public.cancel_same_day_competing_schedules() IS
  'Cancels other active zero-registration cohorts on the same start day once one hits total_registrants >= 1. Skips days before 2026-09-01.';

-- One-time cleanup for Sept 2026+ days that already have a winner
UPDATE public.course_schedules cs
SET status = 'cancelled',
    updated_at = now()
WHERE cs.status = 'active'
  AND cs.start_date::date >= DATE '2026-09-01'
  AND COALESCE(cs.total_registrants, 0) = 0
  AND EXISTS (
    SELECT 1
    FROM public.course_schedules winner
    WHERE winner.start_date::date = cs.start_date::date
      AND winner.id IS DISTINCT FROM cs.id
      AND COALESCE(winner.total_registrants, 0) >= 1
  );
