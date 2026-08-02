-- Rename seats_available -> total_registrants (tracks paid enrollments per cohort)
ALTER TABLE public.course_schedules
  RENAME COLUMN seats_available TO total_registrants;

ALTER TABLE public.course_schedules
  ALTER COLUMN total_registrants SET DEFAULT 0;

-- Reset marketing/fake seat numbers; backfill from real succeeded orders
UPDATE public.course_schedules
SET total_registrants = 0;

WITH order_counts AS (
  SELECT
    trim(sid) AS schedule_id,
    SUM(COALESCE(o.quantity, 1))::integer AS qty
  FROM public.orders o
  CROSS JOIN LATERAL unnest(string_to_array(o.schedule_id, ',')) AS sid
  WHERE o.payment_status = 'succeeded'
    AND o.schedule_id IS NOT NULL
    AND trim(o.schedule_id) <> ''
    AND trim(sid) <> ''
  GROUP BY trim(sid)
)
UPDATE public.course_schedules cs
SET total_registrants = oc.qty,
    updated_at = now()
FROM order_counts oc
WHERE cs.id::text = oc.schedule_id;

-- Atomic increment helper (supports comma-separated combo schedule_ids)
CREATE OR REPLACE FUNCTION public.increment_schedule_registrants(
  p_schedule_ids text,
  p_quantity integer DEFAULT 1
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sid text;
  qty integer := GREATEST(COALESCE(p_quantity, 1), 1);
BEGIN
  IF p_schedule_ids IS NULL OR trim(p_schedule_ids) = '' THEN
    RETURN;
  END IF;

  FOREACH sid IN ARRAY string_to_array(p_schedule_ids, ',')
  LOOP
    sid := trim(sid);
    IF sid = '' THEN
      CONTINUE;
    END IF;

    UPDATE public.course_schedules
    SET total_registrants = COALESCE(total_registrants, 0) + qty,
        updated_at = now()
    WHERE id::text = sid;
  END LOOP;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_schedule_registrants(text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_schedule_registrants(text, integer) TO service_role;

-- Keep total_registrants in sync when paid orders are created/marked succeeded
CREATE OR REPLACE FUNCTION public.orders_bump_schedule_registrants()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.payment_status = 'succeeded' THEN
      PERFORM public.increment_schedule_registrants(NEW.schedule_id, NEW.quantity);
    END IF;
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    IF NEW.payment_status = 'succeeded'
       AND COALESCE(OLD.payment_status, '') IS DISTINCT FROM 'succeeded' THEN
      PERFORM public.increment_schedule_registrants(NEW.schedule_id, NEW.quantity);
    END IF;
    RETURN NEW;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_orders_bump_schedule_registrants ON public.orders;
CREATE TRIGGER trg_orders_bump_schedule_registrants
AFTER INSERT OR UPDATE OF payment_status, schedule_id, quantity
ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.orders_bump_schedule_registrants();

COMMENT ON COLUMN public.course_schedules.total_registrants IS
  'Count of paid registrants for this cohort; incremented when an order reaches payment_status=succeeded.';
