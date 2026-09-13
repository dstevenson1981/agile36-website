-- Remove unused empty tables that were never populated.
-- Keeps hyper_people (live visitor identification) and empty land-expand
-- opportunity/prospect/message tables (still queried by admin + checkout hooks).

ALTER TABLE IF EXISTS chat_conversations
  DROP CONSTRAINT IF EXISTS chat_conversations_lead_id_fkey;
ALTER TABLE IF EXISTS chat_conversations
  DROP COLUMN IF EXISTS lead_id;

DROP TABLE IF EXISTS land_expand_conversions;
DROP TABLE IF EXISTS competitor_posts;
DROP TABLE IF EXISTS content_calendar;
DROP TABLE IF EXISTS linkedin_posts;
DROP TABLE IF EXISTS outreach_enrollments;
DROP TABLE IF EXISTS outreach_steps;
DROP TABLE IF EXISTS outreach_sequences;
DROP TABLE IF EXISTS lead_activity_log;
DROP TABLE IF EXISTS sales_leads;
DROP TABLE IF EXISTS expansion_opportunities;
