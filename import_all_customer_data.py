#!/usr/bin/env python3
"""
Import customer data from both unified_payments.csv and stripe_customers.csv to Supabase.

This script:
1. Reads public/unified_payments.csv
2. Reads public/stripe_customers.csv
3. Combines data from both files
4. Updates customers table with: email, name, stripe_customer_id, course_slug, total_spend, dates
"""

import os
import csv
import sys
import re
from datetime import datetime
from collections import defaultdict
from typing import Optional
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL') or os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: Supabase credentials not found!")
    sys.exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# CSV files
UNIFIED_PAYMENTS_FILE = 'public/unified_payments.csv'
STRIPE_CUSTOMERS_FILE = 'public/stripe_customers.csv'

# Course name to slug mapping
COURSE_SLUG_MAP = {
    'leading safe': 'leading-safe',
    'leading safe®': 'leading-safe',
    'leading safe® 6.0': 'leading-safe',
    'safe agile product management': 'agile-product-management',
    'safe product owner/product manager': 'product-owner-manager',
    'advanced scrum master': 'advanced-scrum-master',
    'certified genai practitioner': 'certified-genai-practitioner',
    'certified genai practitioner™': 'certified-genai-practitioner',
    'safe® value stream mapping': 'value-stream-mapping',
    'value stream mapping': 'value-stream-mapping',
    'scrum master': 'scrum-master',
    'safe scrum master': 'scrum-master',
    'lean portfolio management': 'lean-portfolio-management',
    'safe for teams': 'safe-for-teams',
    'devops': 'devops',
    'safe devops': 'devops',
    'executive genai leadership': 'executive-genai-leadership',
    'executive genai leadership™': 'executive-genai-leadership',
    'generative ai for project managers': 'generative-ai-project-managers',
    'ai agent builder': 'ai-agent-builder',
    'no-code ai agents': 'ai-agent-builder',
    'certified ai product manager': 'certified-ai-product-manager',
    'certified ai product manager™': 'certified-ai-product-manager',
    'ai-driven scrum master': 'ai-driven-scrum-master',
    'responsible ai': 'responsible-ai',
    'release train engineer': 'release-train-engineer',
    'safe release train engineer': 'release-train-engineer',
}

def extract_course_slug_from_description(course_description: str) -> Optional[str]:
    """Extract course slug from full course description in unified_payments."""
    if not course_description:
        return None
    
    desc_lower = course_description.lower()
    
    # Try to match course names
    for course_name, slug in COURSE_SLUG_MAP.items():
        if course_name in desc_lower:
            return slug
    
    return None

def parse_date(date_str: Optional[str]) -> Optional[datetime]:
    """Parse date string to datetime object."""
    if not date_str or date_str.strip().lower() in ['null', 'none', '']:
        return None
    
    formats = [
        '%m/%d/%y %H:%M',      # 1/14/26 22:15
        '%m/%d/%y',            # 1/14/26
        '%Y-%m-%d %H:%M',      # 2026-01-13 22:10
        '%Y-%m-%d %H:%M:%S',   # 2026-01-14 22:15:30
        '%Y-%m-%d',            # 2026-01-14
        '%m/%d/%Y %H:%M:%S',   # 01/14/2026 22:15:30
        '%m/%d/%Y',            # 01/14/2026
    ]
    
    for fmt in formats:
        try:
            return datetime.strptime(date_str.strip(), fmt)
        except ValueError:
            continue
    
    return None

def parse_numeric(value: Optional[str]) -> Optional[float]:
    """Parse numeric string to float."""
    if not value or value.strip().lower() in ['null', 'none', '']:
        return None
    try:
        return float(value.replace(',', '').replace('$', '').strip())
    except (ValueError, AttributeError):
        return None

def process_unified_payments(file_path: str, customer_data: dict):
    """Process unified_payments.csv and add to customer_data."""
    print(f"\n📖 Reading {file_path}...")
    
    if not os.path.exists(file_path):
        print(f"⚠️  Warning: File {file_path} not found!")
        return
    
    total_rows = 0
    skipped_rows = 0
    
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            total_rows += 1
            
            email = row.get('Customer Email', '').strip()
            if not email:
                skipped_rows += 1
                continue
            
            amount = parse_numeric(row.get('Total Spend', ''))
            if not amount or amount <= 0:
                skipped_rows += 1
                continue
            
            payment_date = parse_date(row.get('Created date (UTC)', ''))
            stripe_customer_id = row.get('Customer ID', '').strip() or None
            name = row.get('Name', '').strip() or None
            course_description = row.get('Course Slug', '').strip()
            course_slug = extract_course_slug_from_description(course_description)
            
            # Get or create customer record
            if email not in customer_data:
                customer_data[email] = {
                    'email': email,
                    'name': None,
                    'name_date': None,
                    'stripe_customer_id': None,
                    'course_slug': None,
                    'course_slug_date': None,
                    'total_spend': 0.0,
                    'first_purchase_date': None,
                    'last_purchase_date': None,
                }
            
            customer = customer_data[email]
            
            # Update name (use most recent)
            if name:
                if not customer['name'] or (payment_date and (
                    not customer['name_date'] or payment_date > customer['name_date']
                )):
                    customer['name'] = name
                    customer['name_date'] = payment_date
            
            # Update stripe_customer_id
            if stripe_customer_id and not customer['stripe_customer_id']:
                customer['stripe_customer_id'] = stripe_customer_id
            
            # Update course_slug (use most recent)
            if course_slug:
                if not customer['course_slug'] or (payment_date and (
                    not customer['course_slug_date'] or payment_date > customer['course_slug_date']
                )):
                    customer['course_slug'] = course_slug
                    customer['course_slug_date'] = payment_date
            
            # Aggregate totals
            customer['total_spend'] += amount
            
            # Update dates
            if payment_date:
                if not customer['first_purchase_date'] or payment_date < customer['first_purchase_date']:
                    customer['first_purchase_date'] = payment_date
                if not customer['last_purchase_date'] or payment_date > customer['last_purchase_date']:
                    customer['last_purchase_date'] = payment_date
    
    print(f"✅ Processed {total_rows} payment rows")
    print(f"   - Skipped {skipped_rows} rows (missing email or invalid amount)")

def process_stripe_customers(file_path: str, customer_data: dict):
    """Process stripe_customers.csv and add to customer_data."""
    print(f"\n📖 Reading {file_path}...")
    
    if not os.path.exists(file_path):
        print(f"⚠️  Warning: File {file_path} not found!")
        return
    
    total_rows = 0
    skipped_rows = 0
    
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            total_rows += 1
            
            email = row.get('Email', '').strip()
            if not email:
                skipped_rows += 1
                continue
            
            # Skip rows with NULL courseSlug
            course_slug = row.get('courseSlug (metadata)', '').strip()
            if not course_slug or course_slug.lower() in ['null', 'none', '']:
                skipped_rows += 1
                continue
            
            name = row.get('Name', '').strip() or None
            stripe_customer_id = row.get('Card ID', '').strip() or row.get('id', '').strip() or None
            total_spend = parse_numeric(row.get('Total Spend', ''))
            created_date = parse_date(row.get('Created (UTC)', ''))
            
            # Get or create customer record
            if email not in customer_data:
                customer_data[email] = {
                    'email': email,
                    'name': None,
                    'name_date': None,
                    'stripe_customer_id': None,
                    'course_slug': None,
                    'course_slug_date': None,
                    'total_spend': 0.0,
                    'first_purchase_date': None,
                    'last_purchase_date': None,
                }
            
            customer = customer_data[email]
            
            # Update name (use most recent)
            if name:
                if not customer['name'] or (created_date and (
                    not customer['name_date'] or created_date > customer['name_date']
                )):
                    customer['name'] = name
                    customer['name_date'] = created_date
            
            # Update stripe_customer_id
            if stripe_customer_id and not customer['stripe_customer_id']:
                customer['stripe_customer_id'] = stripe_customer_id
            
            # Update course_slug (use most recent, but stripe_customers has direct slug)
            if course_slug:
                if not customer['course_slug'] or (created_date and (
                    not customer['course_slug_date'] or created_date > customer['course_slug_date']
                )):
                    customer['course_slug'] = course_slug
                    customer['course_slug_date'] = created_date
            
            # Aggregate totals
            if total_spend:
                customer['total_spend'] += total_spend
            
            # Update dates
            if created_date:
                if not customer['first_purchase_date'] or created_date < customer['first_purchase_date']:
                    customer['first_purchase_date'] = created_date
                if not customer['last_purchase_date'] or created_date > customer['last_purchase_date']:
                    customer['last_purchase_date'] = created_date
    
    print(f"✅ Processed {total_rows} customer rows")
    print(f"   - Skipped {skipped_rows} rows (NULL courseSlug or missing email)")

def update_customers(customer_data: dict):
    """Update customers table with combined data."""
    print(f"\n👥 Updating {len(customer_data)} customers...")
    
    updated = 0
    created = 0
    errors = 0
    
    for i, (email, data) in enumerate(customer_data.items(), 1):
        try:
            # Prepare update data - only include fields that exist
            update_data = {
                'email': email,
            }
            
            if data['name']:
                update_data['name'] = data['name']
            if data['stripe_customer_id']:
                update_data['stripe_customer_id'] = data['stripe_customer_id']
            if data['first_purchase_date']:
                update_data['first_purchase_date'] = data['first_purchase_date'].isoformat()
            if data['last_purchase_date']:
                update_data['last_purchase_date'] = data['last_purchase_date'].isoformat()
            
            # Try to add course_slug and total_spend if columns exist
            # (Will fail gracefully if columns don't exist - user needs to run SQL first)
            if data['course_slug']:
                update_data['course_slug'] = data['course_slug']
            if data['total_spend'] > 0:
                update_data['total_spend'] = data['total_spend']
            
            # Check if customer exists
            existing = supabase.table('customers').select('email').eq('email', email).execute()
            
            if existing.data:
                # Update existing customer
                supabase.table('customers').update(update_data).eq('email', email).execute()
                updated += 1
            else:
                # Create new customer
                supabase.table('customers').insert(update_data).execute()
                created += 1
            
            if i % 100 == 0:
                print(f"   Progress: {i}/{len(customer_data)} customers processed...")
                
        except Exception as e:
            errors += 1
            if errors <= 10:
                print(f"   ❌ Error processing customer {email}: {e}")
            elif errors == 11:
                print(f"   ... (suppressing further error messages)")
    
    print(f"✅ Customers: {created} created, {updated} updated, {errors} errors")

def main():
    """Main execution function."""
    print("=" * 60)
    print("📊 Combined Customer Data Import")
    print("=" * 60)
    print("Importing from:")
    print(f"  - {UNIFIED_PAYMENTS_FILE}")
    print(f"  - {STRIPE_CUSTOMERS_FILE}")
    
    # Combined customer data
    customer_data = {}
    
    # Process both files
    process_unified_payments(UNIFIED_PAYMENTS_FILE, customer_data)
    process_stripe_customers(STRIPE_CUSTOMERS_FILE, customer_data)
    
    if not customer_data:
        print("\n❌ No valid customer data found. Exiting.")
        sys.exit(1)
    
    print(f"\n📊 Combined data:")
    print(f"   - Total unique customers: {len(customer_data)}")
    print(f"   - Customers with course_slug: {sum(1 for c in customer_data.values() if c['course_slug'])}")
    print(f"   - Total spend: ${sum(c['total_spend'] for c in customer_data.values()):,.2f}")
    
    # Update customers
    update_customers(customer_data)
    
    # Summary
    print("\n" + "=" * 60)
    print("✅ Import Complete!")
    print("=" * 60)
    print(f"📊 Final Summary:")
    print(f"   - Customers processed: {len(customer_data)}")
    print(f"   - Customers with course_slug: {sum(1 for c in customer_data.values() if c['course_slug'])}")
    print(f"   - Total spend: ${sum(c['total_spend'] for c in customer_data.values()):,.2f}")

if __name__ == '__main__':
    main()
