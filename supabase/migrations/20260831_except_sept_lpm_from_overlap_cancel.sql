-- Keep span-aware overlap cancel, with a September 2026 Lean Portfolio exception.
-- Deadra scheduled those LPM dates to overlap on purpose.

CREATE OR REPLACE FUNCTION public.cancel_same_day_competing_schedules()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF COALESCE(NEW.total_registrants, 0) < 1 THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND COALESCE(OLD.total_registrants, 0) >= 1 THEN
    RETURN NEW;
  END IF;

  IF NEW.start_date::date < DATE '2026-09-01' THEN
    RETURN NEW;
  END IF;

  UPDATE public.course_schedules
  SET status = 'cancelled',
      updated_at = now()
  WHERE id IS DISTINCT FROM NEW.id
    AND status = 'active'
    AND start_date::date <= NEW.end_date::date
    AND end_date::date >= NEW.start_date::date
    AND COALESCE(total_registrants, 0) = 0
    AND NOT (
      course_slug = 'lean-portfolio-management'
      AND start_date::date >= DATE '2026-09-01'
      AND start_date::date < DATE '2026-10-01'
    );

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.cancel_same_day_competing_schedules() IS
  'Cancels other active zero-registration cohorts whose date span overlaps a class that just reached total_registrants >= 1. Skips days before 2026-09-01. September 2026 Lean Portfolio classes are exempt.';
