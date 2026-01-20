-- Create or replace function to get unique tags from email_contacts
-- This is more efficient than fetching all contacts

DROP FUNCTION IF EXISTS get_unique_tags();

CREATE OR REPLACE FUNCTION get_unique_tags()
RETURNS TABLE(tag text) 
LANGUAGE SQL
STABLE
AS $$
  SELECT DISTINCT unnest(tags) as tag
  FROM email_contacts
  WHERE tags IS NOT NULL 
    AND array_length(tags, 1) > 0
  ORDER BY tag;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_unique_tags() TO authenticated;
GRANT EXECUTE ON FUNCTION get_unique_tags() TO anon;
