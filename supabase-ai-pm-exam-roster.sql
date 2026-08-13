/* AI Product Management final exam roster.
   Only emails in this table see Course Exams → AI Product Management Exam in Account.

   Add a learner:
     INSERT INTO ai_product_management_exam_roster (email) VALUES ('student@company.com')
     ON CONFLICT (email) DO NOTHING;

   Remove a learner:
     DELETE FROM ai_product_management_exam_roster WHERE LOWER(email) = LOWER('student@company.com');
*/

CREATE TABLE IF NOT EXISTS ai_product_management_exam_roster (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_pm_exam_roster_email
  ON ai_product_management_exam_roster (LOWER(email));

ALTER TABLE ai_product_management_exam_roster ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can check own AI PM exam roster status"
  ON ai_product_management_exam_roster;
CREATE POLICY "Users can check own AI PM exam roster status"
  ON ai_product_management_exam_roster
  FOR SELECT
  USING (
    LOWER(TRIM(ai_product_management_exam_roster.email)) =
      LOWER(TRIM((SELECT u.email FROM auth.users u WHERE u.id = auth.uid())))
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.email IS NOT NULL
        AND TRIM(p.email) <> ''
        AND LOWER(TRIM(ai_product_management_exam_roster.email)) = LOWER(TRIM(p.email))
    )
  );

DROP POLICY IF EXISTS "Service role can manage AI PM exam roster"
  ON ai_product_management_exam_roster;
CREATE POLICY "Service role can manage AI PM exam roster"
  ON ai_product_management_exam_roster
  FOR ALL
  USING (auth.role() = 'service_role');
