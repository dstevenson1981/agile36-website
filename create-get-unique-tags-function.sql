-- Create a PostgreSQL function to get all unique tags from email_contacts
-- This is more efficient than fetching all contacts and extracting tags client-side

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS get_unique_tags();

-- Create function that returns tags with counts
CREATE OR REPLACE FUNCTION get_unique_tags()
RETURNS TABLE(tag TEXT, tag_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    unnest(tags)::TEXT as tag,
    COUNT(*)::BIGINT as tag_count
  FROM email_contacts
  WHERE tags IS NOT NULL
  GROUP BY tag
  ORDER BY tag_count DESC, tag ASC;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_unique_tags() TO authenticated;
GRANT EXECUTE ON FUNCTION get_unique_tags() TO anon;
GRANT EXECUTE ON FUNCTION get_unique_tags() TO service_role;

-- Test the function
SELECT * FROM get_unique_tags();
