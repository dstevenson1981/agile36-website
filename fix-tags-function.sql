-- Fix the get_unique_tags function
-- Run this in Supabase SQL editor

-- Drop existing function
DROP FUNCTION IF EXISTS get_unique_tags();

-- Create simpler function that just returns unique tags
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

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_unique_tags() TO authenticated;
GRANT EXECUTE ON FUNCTION get_unique_tags() TO anon;
GRANT EXECUTE ON FUNCTION get_unique_tags() TO service_role;

-- Test it
SELECT * FROM get_unique_tags();

-- Also verify tags exist
SELECT COUNT(*) as contacts_with_program_tag
FROM email_contacts 
WHERE 'Program' = ANY(tags);

-- See all unique tags (alternative query)
SELECT DISTINCT unnest(tags) as tag
FROM email_contacts
WHERE tags IS NOT NULL
ORDER BY tag;
