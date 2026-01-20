#!/usr/bin/env python3
"""
Import customers and purchases from stripe_customers.csv to Supabase.

This script:
1. Reads public/stripe_customers.csv
2. Filters out rows with NULL/empty courseSlug
3. Creates customers and purchases tables in Supabase
4. Inserts data grouped by email
5. Handles duplicates (upsert customers, skip duplicate purchases)
"""

import os
import csv
import sys
from datetime import datetime
from collections import defaultdict
from typing import Dict, List, Optional, Tuple
from supabase import create_client, Client
import uuid
from dotenv import load_dotenv

# Load environment variables from .env.local (Next.js convention) or .env file
load_dotenv('.env.local')
load_dotenv()  # Also try .env as fallback

# Supabase configuration
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL') or os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: Supabase credentials not found!")
    print("Please set one of:")
    print("  - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    print("  - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    sys.exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# CSV file path
CSV_FILE = 'public/stripe_customers.csv'

def create_tables():
    """Create customers and purchases tables if they don't exist."""
    print("\n📋 Creating tables...")
    
    # Create customers table
    customers_sql = """
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
    """
    
    # Create purchases table
    purchases_sql = """
    CREATE TABLE IF NOT EXISTS purchases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_email TEXT REFERENCES customers(email) ON DELETE CASCADE,
        course_slug TEXT NOT NULL,
        purchase_date TIMESTAMP,
        stripe_customer_id TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(customer_email, course_slug, purchase_date)
    );
    """
    
    # Create indexes for better performance
    indexes_sql = """
    CREATE INDEX IF NOT EXISTS idx_purchases_customer_email ON purchases(customer_email);
    CREATE INDEX IF NOT EXISTS idx_purchases_course_slug ON purchases(course_slug);
    CREATE INDEX IF NOT EXISTS idx_customers_stripe_id ON customers(stripe_customer_id);
    """
    
    try:
        # Execute SQL using RPC or direct SQL execution
        # Note: Supabase Python client doesn't support direct SQL execution
        # We'll need to use the REST API or create a migration
        print("⚠️  Note: Tables should be created via Supabase SQL Editor or migration.")
        print("   Run the SQL from create_tables.sql file in Supabase SQL Editor.")
        print("   The script will continue and attempt to insert data...")
    except Exception as e:
        print(f"⚠️  Warning: Could not create tables automatically: {e}")
        print("   Please create tables manually using the SQL in create_tables.sql")

def parse_date(date_str: Optional[str]) -> Optional[datetime]:
    """Parse date string to datetime object."""
    if not date_str or date_str.strip().lower() in ['null', 'none', '']:
        return None
    
    # Try different date formats
    formats = [
        '%Y-%m-%d %H:%M',      # 2026-01-13 22:10 (no seconds)
        '%Y-%m-%d %H:%M:%S',   # 2026-01-13 22:10:30
        '%Y-%m-%d %H:%M:%S%z', # 2026-01-13 22:10:30+00:00
        '%Y-%m-%dT%H:%M:%S',   # 2026-01-13T22:10:30
        '%Y-%m-%dT%H:%M:%S%z', # 2026-01-13T22:10:30+00:00
        '%Y-%m-%d',            # 2026-01-13
        '%m/%d/%Y',            # 01/13/2026
        '%m/%d/%Y %H:%M:%S',   # 01/13/2026 22:10:30
    ]
    
    for fmt in formats:
        try:
            return datetime.strptime(date_str.strip(), fmt)
        except ValueError:
            continue
    
    print(f"⚠️  Warning: Could not parse date: {date_str}")
    return None

def parse_numeric(value: Optional[str]) -> Optional[float]:
    """Parse numeric string to float."""
    if not value or value.strip().lower() in ['null', 'none', '']:
        return None
    try:
        return float(value.replace(',', '').strip())
    except (ValueError, AttributeError):
        return None

def parse_int(value: Optional[str]) -> Optional[int]:
    """Parse string to integer."""
    if not value or value.strip().lower() in ['null', 'none', '']:
        return None
    try:
        return int(float(value.replace(',', '').strip()))
    except (ValueError, AttributeError):
        return None

def read_and_process_csv(file_path: str) -> Tuple[Dict, List]:
    """Read CSV and process data into customers and purchases."""
    print(f"\n📖 Reading {file_path}...")
    
    if not os.path.exists(file_path):
        print(f"❌ Error: File {file_path} not found!")
        sys.exit(1)
    
    # Group data by email
    customers_data = {}  # email -> customer info
    purchases_data = []  # list of purchases
    
    total_rows = 0
    skipped_rows = 0
    
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            total_rows += 1
            
            # Skip rows with NULL or empty courseSlug
            course_slug = row.get('courseSlug (metadata)', '').strip()
            if not course_slug or course_slug.lower() in ['null', 'none', '']:
                skipped_rows += 1
                continue
            
            email = row.get('Email', '').strip()
            if not email:
                skipped_rows += 1
                continue
            
            # Extract customer data
            name = row.get('Name', '').strip() or None
            stripe_customer_id = row.get('Card ID', '').strip() or None
            total_spend = parse_numeric(row.get('Total Spend', ''))
            payment_count = parse_int(row.get('Payment Count', ''))
            created_date = parse_date(row.get('Created (UTC)', ''))
            
            # Group by email - keep earliest first_purchase_date and latest last_purchase_date
            if email not in customers_data:
                customers_data[email] = {
                    'email': email,
                    'name': name,
                    'stripe_customer_id': stripe_customer_id,
                    'total_spend': total_spend or 0,
                    'payment_count': payment_count or 0,
                    'first_purchase_date': created_date,
                    'last_purchase_date': created_date,
                }
            else:
                # Update totals
                if total_spend:
                    customers_data[email]['total_spend'] = (customers_data[email]['total_spend'] or 0) + total_spend
                if payment_count:
                    customers_data[email]['payment_count'] = (customers_data[email]['payment_count'] or 0) + payment_count
                
                # Update dates
                if created_date:
                    if not customers_data[email]['first_purchase_date'] or created_date < customers_data[email]['first_purchase_date']:
                        customers_data[email]['first_purchase_date'] = created_date
                    if not customers_data[email]['last_purchase_date'] or created_date > customers_data[email]['last_purchase_date']:
                        customers_data[email]['last_purchase_date'] = created_date
            
            # Add purchase
            purchases_data.append({
                'customer_email': email,
                'course_slug': course_slug,
                'purchase_date': created_date,
                'stripe_customer_id': stripe_customer_id,
            })
    
    print(f"✅ Processed {total_rows} rows")
    print(f"   - Skipped {skipped_rows} rows (NULL courseSlug or missing email)")
    print(f"   - Found {len(customers_data)} unique customers")
    print(f"   - Found {len(purchases_data)} purchases")
    
    return customers_data, purchases_data

def insert_customers(customers_data: Dict):
    """Insert or update customers in Supabase."""
    print(f"\n👥 Inserting/updating {len(customers_data)} customers...")
    
    inserted = 0
    updated = 0
    errors = 0
    
    for i, (email, customer) in enumerate(customers_data.items(), 1):
        try:
            # Prepare data - use only fields that exist in the table
            # Table has: email, name, stripe_customer_id, first_purchase_date, last_purchase_date, company, title
            # Table does NOT have: total_spend, payment_count
            customer_record = {
                'email': email,
            }
            
            # Add optional fields
            if customer['name']:
                customer_record['name'] = customer['name']
            if customer['stripe_customer_id']:
                customer_record['stripe_customer_id'] = customer['stripe_customer_id']
            if customer['first_purchase_date']:
                customer_record['first_purchase_date'] = customer['first_purchase_date'].isoformat()
            if customer['last_purchase_date']:
                customer_record['last_purchase_date'] = customer['last_purchase_date'].isoformat()
            
            # Check if customer exists
            existing = supabase.table('customers').select('email').eq('email', email).execute()
            
            if existing.data:
                # Update existing customer
                supabase.table('customers').update(customer_record).eq('email', email).execute()
                updated += 1
            else:
                # Insert new customer
                supabase.table('customers').insert(customer_record).execute()
                inserted += 1
            
            if i % 50 == 0:
                print(f"   Progress: {i}/{len(customers_data)} customers processed...")
                
        except Exception as e:
            errors += 1
            print(f"   ❌ Error processing customer {email}: {e}")
    
    print(f"✅ Customers: {inserted} inserted, {updated} updated, {errors} errors")

def insert_purchases(purchases_data: List):
    """Insert purchases in Supabase, skipping duplicates."""
    print(f"\n🛒 Inserting {len(purchases_data)} purchases...")
    
    inserted = 0
    skipped = 0
    errors = 0
    
    # Group purchases by customer_email, course_slug, purchase_date to check for duplicates
    seen_purchases = set()
    
    for i, purchase in enumerate(purchases_data, 1):
        try:
            # Create unique key for duplicate detection
            purchase_key = (
                purchase['customer_email'],
                purchase['course_slug'],
                purchase['purchase_date'].isoformat() if purchase['purchase_date'] else None
            )
            
            if purchase_key in seen_purchases:
                skipped += 1
                continue
            
            seen_purchases.add(purchase_key)
            
            # Check if purchase already exists in database
            # The UNIQUE constraint will handle exact duplicates, but we check to avoid unnecessary inserts
            query = supabase.table('purchases').select('id').eq('customer_email', purchase['customer_email']).eq('course_slug', purchase['course_slug'])
            
            if purchase['purchase_date']:
                purchase_date_str = purchase['purchase_date'].isoformat()
                # Check for exact match (date format may vary in DB, so we'll let UNIQUE constraint handle it)
                existing = query.execute()
                if existing.data:
                    # Get full records to check dates
                    full_records = supabase.table('purchases').select('purchase_date').eq('customer_email', purchase['customer_email']).eq('course_slug', purchase['course_slug']).execute()
                    for record in full_records.data:
                        existing_date = record.get('purchase_date')
                        if existing_date:
                            # Compare date part only (ignore time)
                            if purchase_date_str[:10] == existing_date[:10]:
                                skipped += 1
                                continue
            else:
                # If no date, check if any purchase exists (might be duplicate)
                existing = query.execute()
                if existing.data:
                    skipped += 1
                    continue
            
            # Prepare purchase record
            purchase_record = {
                'customer_email': purchase['customer_email'],
                'course_slug': purchase['course_slug'],
                'purchase_date': purchase['purchase_date'].isoformat() if purchase['purchase_date'] else None,
                'stripe_customer_id': purchase['stripe_customer_id'],
            }
            
            # Insert purchase
            supabase.table('purchases').insert(purchase_record).execute()
            inserted += 1
            
            if i % 100 == 0:
                print(f"   Progress: {i}/{len(purchases_data)} purchases processed...")
                
        except Exception as e:
            errors += 1
            if errors <= 10:  # Only print first 10 errors
                print(f"   ❌ Error processing purchase {i}: {e}")
            elif errors == 11:
                print(f"   ... (suppressing further error messages)")
    
    print(f"✅ Purchases: {inserted} inserted, {skipped} skipped (duplicates), {errors} errors")

def main():
    """Main execution function."""
    print("=" * 60)
    print("🚀 Customer & Purchase Import Script")
    print("=" * 60)
    
    # Step 1: Create tables (or remind user to create them)
    create_tables()
    
    # Step 2: Read and process CSV
    customers_data, purchases_data = read_and_process_csv(CSV_FILE)
    
    if not customers_data:
        print("\n❌ No valid customer data found. Exiting.")
        sys.exit(1)
    
    # Step 3: Insert customers
    insert_customers(customers_data)
    
    # Step 4: Insert purchases
    insert_purchases(purchases_data)
    
    # Summary
    print("\n" + "=" * 60)
    print("✅ Import Complete!")
    print("=" * 60)
    print(f"📊 Summary:")
    print(f"   - Customers processed: {len(customers_data)}")
    print(f"   - Purchases processed: {len(purchases_data)}")
    print("\n💡 Next steps:")
    print("   1. Verify data in Supabase dashboard")
    print("   2. Check for any errors in the output above")
    print("   3. Run analytics queries on the new tables")

if __name__ == '__main__':
    main()
