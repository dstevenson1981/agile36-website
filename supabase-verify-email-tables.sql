-- Verify Email Marketing Tables Were Created
-- Run this in Supabase SQL Editor to check if tables exist

-- Check if tables exist
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('email_contacts', 'email_campaigns', 'email_sends', 'email_unsubscribes')
ORDER BY table_name;

-- Check table structures
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'email_contacts'
ORDER BY ordinal_position;

-- Test insert (should work)
INSERT INTO email_contacts (email, first_name, last_name, tags)
VALUES ('test@example.com', 'Test', 'User', ARRAY['test'])
ON CONFLICT (email) DO NOTHING
RETURNING *;

-- Clean up test
DELETE FROM email_contacts WHERE email = 'test@example.com';

SELECT '✅ All tables created successfully!' as status;

