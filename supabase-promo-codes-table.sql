-- Promo Codes Table for Managing Discount Codes
-- This table allows you to create and manage promotional discount codes

CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('fixed', 'percentage')),
  discount_value DECIMAL NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster code lookups
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_promo_codes_active ON promo_codes(active);

-- Insert the Black Friday promo code
INSERT INTO promo_codes (code, discount_type, discount_value, description, expires_at, usage_limit)
VALUES 
  ('150OFF', 'fixed', 150, 'Black Friday Sale - $150 Off', '2026-12-31 23:59:59', NULL),
  ('SAVE25', 'percentage', 25, '25% Off - Holiday Special', '2026-12-31 23:59:59', 100);

-- Example: How to add more codes later
-- Fixed dollar amount off:
-- INSERT INTO promo_codes (code, discount_type, discount_value, description, expires_at)
-- VALUES ('NEWYEAR100', 'fixed', 100, 'New Year - $100 Off', '2025-01-15 23:59:59');

-- Percentage discount:
-- INSERT INTO promo_codes (code, discount_type, discount_value, description, expires_at)
-- VALUES ('SPRING20', 'percentage', 20, 'Spring Sale - 20% Off', '2025-04-30 23:59:59');

-- Example: How to update/deactivate a code
-- UPDATE promo_codes SET active = false WHERE code = '150OFF';

-- Example: How to check usage
-- SELECT code, usage_count, usage_limit FROM promo_codes;

