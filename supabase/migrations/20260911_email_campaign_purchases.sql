-- Match campaign recipients to Stripe orders by email.
-- Starts from orders (hundreds of rows), not email_sends (hundreds of thousands).

CREATE INDEX IF NOT EXISTS idx_email_sends_contact_sent
  ON email_sends (contact_id, sent_at);

CREATE OR REPLACE FUNCTION public.email_campaign_purchases(p_campaign_id bigint DEFAULT NULL)
RETURNS TABLE (
  campaign_id bigint,
  campaign_name text,
  order_id uuid,
  customer_email text,
  customer_name text,
  first_name text,
  last_name text,
  course_name text,
  course_slug text,
  amount numeric,
  purchased_at timestamptz,
  sent_at timestamptz,
  opened boolean,
  clicked boolean,
  purchased_after_send boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT ON (es.campaign_id, o.id)
    es.campaign_id,
    camp.name,
    o.id,
    o.customer_email,
    o.customer_name,
    c.first_name,
    c.last_name,
    o.course_name,
    o.course_slug,
    o.amount,
    o.created_at,
    es.sent_at,
    es.opened_at IS NOT NULL,
    es.clicked_at IS NOT NULL,
    (es.sent_at IS NOT NULL AND o.created_at >= es.sent_at)
  FROM orders o
  JOIN email_contacts c
    ON lower(trim(c.email)) = lower(trim(o.customer_email))
  JOIN email_sends es
    ON es.contact_id = c.id
  JOIN email_campaigns camp
    ON camp.id = es.campaign_id
  WHERE o.payment_status = 'succeeded'
    AND (p_campaign_id IS NULL OR es.campaign_id = p_campaign_id)
  ORDER BY
    es.campaign_id,
    o.id,
    (es.sent_at IS NOT NULL AND o.created_at >= es.sent_at) DESC,
    es.sent_at DESC NULLS LAST;
$$;

REVOKE ALL ON FUNCTION public.email_campaign_purchases(bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.email_campaign_purchases(bigint) TO service_role;
