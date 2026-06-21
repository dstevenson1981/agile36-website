/* Grant SSM Pro practice exam access for abhishek.yelgalwar@gmail.com
   Run in Supabase SQL Editor on Production. */

INSERT INTO scrum_master_pro_access_whitelist (email) VALUES
  ('abhishek.yelgalwar@gmail.com')
ON CONFLICT (email) DO NOTHING;

SELECT email, created_at
FROM scrum_master_pro_access_whitelist
WHERE LOWER(TRIM(email)) = 'abhishek.yelgalwar@gmail.com';
