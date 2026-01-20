-- Create customers and purchases tables for customer import
-- Run this in Supabase SQL Editor before running import_customers.py

-- Drop tables if they exist (uncomment if you want to start fresh)
-- DROP TABLE IF EXISTS purchases CASCADE;
-- DROP TABLE IF EXISTS customers CASCADE;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    email TEXT PRIMARY KEY,
    name TEXT,
    stripe_customer_id TEXT,
    total_spend NUMERIC,
    payment_count INTEGER,
    first_purchase_date TIMESTAMP,
    last_purchase_date TIMESTAMP,
    company TEXT,
    title TEXT,
    linkedin_url TEXT,
    enriched BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_email TEXT REFERENCES customers(email) ON DELETE CASCADE,
    course_slug TEXT NOT NULL,
    purchase_date TIMESTAMP,
    stripe_customer_id TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(customer_email, course_slug, purchase_date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_purchases_customer_email ON purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_purchases_course_slug ON purchases(course_slug);
CREATE INDEX IF NOT EXISTS idx_customers_stripe_id ON customers(stripe_customer_id);

-- Add comments for documentation
COMMENT ON TABLE customers IS 'Customer information aggregated by email';
COMMENT ON TABLE purchases IS 'Individual course purchases linked to customers';
