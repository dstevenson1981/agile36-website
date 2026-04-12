/* Grant Leading SAFe Pro practice exam access (account → Practice Exams → Start Test).
   Run in Supabase SQL Editor on Production. Requires table from supabase-leading-safe-pro-access-whitelist.sql */

-- Verify (optional): already whitelisted
SELECT email, created_at
FROM leading_safe_pro_access_whitelist
WHERE LOWER(TRIM(email)) IN (
  'ann.w.barber@hii-nns.com',
  'enriquesan@iadb.org',
  'garyyyuen@gmail.com',
  'd.stevenson@agile36.com'
)
ORDER BY email;

INSERT INTO leading_safe_pro_access_whitelist (email) VALUES
  (lower(trim('ann.w.barber@hii-nns.com'))),
  (lower(trim('enriquesan@iadb.org'))),
  (lower(trim('garyyyuen@gmail.com'))),
  (lower(trim('d.stevenson@agile36.com')))
ON CONFLICT (email) DO NOTHING;

-- Confirm
SELECT email, created_at
FROM leading_safe_pro_access_whitelist
WHERE LOWER(TRIM(email)) IN (
  'ann.w.barber@hii-nns.com',
  'enriquesan@iadb.org',
  'garyyyuen@gmail.com',
  'd.stevenson@agile36.com'
)
ORDER BY email;
