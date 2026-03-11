-- Abandoned cart emails: $100 off, code DISCOUNT
-- Run this in Supabase SQL Editor.
-- Updates all abandoned_cart templates to offer $100 off with code "discount".

UPDATE email_templates
SET
  discount_code = 'discount',
  discount_amount = 100,
  subject = 
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      REPLACE(REPLACE(REPLACE(REPLACE(
        subject,
        '150OFF', 'discount'), '100OFF', 'discount'), '50OFF', 'discount'), '75OFF', 'discount'), '200OFF', 'discount'),
        '$150', '$100'), '$50', '$100'), '$75', '$100'), '$200', '$100'),
  body_text = 
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      REPLACE(REPLACE(REPLACE(REPLACE(
        body_text,
        '150OFF', 'discount'), '100OFF', 'discount'), '50OFF', 'discount'), '75OFF', 'discount'), '200OFF', 'discount'),
        '$150', '$100'), '$50', '$100'), '$75', '$100'), '$200', '$100'),
  body_html = 
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      REPLACE(REPLACE(REPLACE(REPLACE(
        COALESCE(body_html, ''),
        '150OFF', 'discount'), '100OFF', 'discount'), '50OFF', 'discount'), '75OFF', 'discount'), '200OFF', 'discount'),
        '$150', '$100'), '$50', '$100'), '$75', '$100'), '$200', '$100'),
  updated_at = NOW()
WHERE template_type = 'abandoned_cart';

-- Add "discount" to promo_codes if not exists (for checkout validation)
INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit, usage_count, created_at, updated_at)
SELECT 'discount', 'fixed', 100, 'Abandoned cart - $100 off', true, '2026-12-31 23:59:59+00'::timestamptz, NULL, 0, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM promo_codes WHERE UPPER(TRIM(code)) = 'DISCOUNT');

-- Verify
SELECT course_slug, discount_code, discount_amount, LEFT(subject, 60) as subject_preview
FROM email_templates
WHERE template_type = 'abandoned_cart'
ORDER BY course_slug;
