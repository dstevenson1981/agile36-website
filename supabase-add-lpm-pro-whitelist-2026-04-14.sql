/* Grant LPM Pro practice exam access (account → Practice Exams → Start Test).
   Run in Supabase SQL Editor on Production. Requires table from supabase-lpm-pro-access-whitelist.sql */

-- Verify (optional): already whitelisted
SELECT email, created_at
FROM lpm_pro_access_whitelist
WHERE LOWER(TRIM(email)) IN (
  'jdroyko@gmail.com',
  'k_davis@acs.org',
  '123karendavis@gmail.com',
  'jjboll4@gmail.com',
  'garyyyuen@gmail.com',
  'pereira-suellen@hotmail.com',
  'alexander@middleton-consulting.com',
  'enriquesan@iadb.org'
)
ORDER BY email;

INSERT INTO lpm_pro_access_whitelist (email) VALUES
  (lower(trim('jdroyko@gmail.com'))),
  (lower(trim('k_davis@acs.org'))),
  (lower(trim('123karendavis@gmail.com'))),
  (lower(trim('jjboll4@gmail.com'))),
  (lower(trim('garyyyuen@gmail.com'))),
  (lower(trim('pereira-suellen@hotmail.com'))),
  (lower(trim('alexander@middleton-consulting.com'))),
  (lower(trim('ENRIQUESAN@IADB.ORG')))
ON CONFLICT (email) DO NOTHING;

-- Confirm
SELECT email, created_at
FROM lpm_pro_access_whitelist
WHERE LOWER(TRIM(email)) IN (
  'jdroyko@gmail.com',
  'k_davis@acs.org',
  '123karendavis@gmail.com',
  'jjboll4@gmail.com',
  'garyyyuen@gmail.com',
  'pereira-suellen@hotmail.com',
  'alexander@middleton-consulting.com',
  'enriquesan@iadb.org'
)
ORDER BY email;
