-- 500OFF — $500 off

INSERT INTO promo_codes (code, discount_type, discount_value, description, active)
VALUES ('500OFF', 'fixed', 500, '$500 Off', TRUE)
ON CONFLICT (code) DO UPDATE SET
  discount_type = 'fixed',
  discount_value = 500,
  description = '$500 Off',
  active = TRUE,
  updated_at = NOW();
