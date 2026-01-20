-- Create a PostgreSQL function to get all unique tags from email_contacts
-- This is more efficient than fetching all contacts and extracting tags client-side

CREATE OR REPLACE FUNCTION get_unique_tags()
RETURNS TABLE(tag TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT unnest(tags)::TEXT as tag
  FROM email_contacts
  WHERE tags IS NOT NULL
  ORDER BY tag;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_unique_tags() TO authenticated;
GRANT EXECUTE ON FUNCTION get_unique_tags() TO anon;
