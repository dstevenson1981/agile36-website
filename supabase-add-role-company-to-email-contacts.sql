-- Add role and company columns to email_contacts table
-- Run this in your Supabase SQL Editor

ALTER TABLE email_contacts 
ADD COLUMN IF NOT EXISTS role TEXT,
ADD COLUMN IF NOT EXISTS company TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_contacts_role ON email_contacts(role);
CREATE INDEX IF NOT EXISTS idx_email_contacts_company ON email_contacts(company);

-- Add comment to columns
COMMENT ON COLUMN email_contacts.role IS 'Professional role or job title';
COMMENT ON COLUMN email_contacts.company IS 'Company or organization name';




