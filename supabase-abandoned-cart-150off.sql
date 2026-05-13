-- Update abandoned cart email templates to $150 OFF (code: 150OFF)
-- Also remove emoji characters from subject/body copy for a more professional tone.
-- Run in Supabase SQL Editor.

UPDATE email_templates
SET
  discount_code = '150OFF',
  discount_amount = 150.00,
  subject = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    REPLACE(REPLACE(COALESCE(subject, ''),
    '200OFF', '150OFF'), '100OFF', '150OFF'), '75OFF', '150OFF'),
    '$200', '$150'), '$100', '$150'), '$75', '$150'),
    '🎁', ''), '⏰', ''), '🤖', ''), '👔', ''), '📊', ''), '⚡', ''),
  body_text = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    REPLACE(REPLACE(COALESCE(body_text, ''),
    '200OFF', '150OFF'), '100OFF', '150OFF'), '75OFF', '150OFF'),
    '$200', '$150'), '$100', '$150'), '$75', '$150'),
    '🎁', ''), '⏰', ''), '🤖', ''), '👔', ''), '📊', ''), '⚡', ''),
  body_html = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    REPLACE(REPLACE(COALESCE(body_html, ''),
    '200OFF', '150OFF'), '100OFF', '150OFF'), '75OFF', '150OFF'),
    '$200', '$150'), '$100', '$150'), '$75', '$150'),
    '🎁', ''), '⏰', ''), '🤖', ''), '👔', ''), '📊', ''), '⚡', ''),
  updated_at = NOW()
WHERE template_type = 'abandoned_cart';

-- Ensure 150OFF promo code exists and is active for checkout
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = '150OFF';
INSERT INTO promo_codes (code, discount_type, discount_value, description, active, expires_at, usage_limit, usage_count, created_at, updated_at)
VALUES (
  '150OFF',
  'fixed',
  150,
  'Abandoned cart - $150 off',
  true,
  '2026-12-31 23:59:59+00'::timestamptz,
  NULL,
  0,
  NOW(),
  NOW()
);

-- Verify
SELECT template_type, course_slug, discount_code, discount_amount, LEFT(subject, 60) as subject_preview
FROM email_templates
WHERE template_type = 'abandoned_cart'
ORDER BY course_slug;
