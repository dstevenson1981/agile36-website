#!/usr/bin/env python3
"""
Import payment data from unified_payments.csv and update customers table.

This script:
1. Reads public/unified_payments.csv
2. Groups payments by customer email
3. Updates customers table with aggregated payment data
"""

import os
import csv
import sys
from datetime import datetime
from collections import defaultdict
from typing import Optional
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env.local (Next.js convention) or .env file
load_dotenv('.env.local')
load_dotenv()  # Also try .env as fallback

# Supabase configuration
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL') or os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: Supabase credentials not found!")
    sys.exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# CSV file path
CSV_FILE = 'public/unified_payments.csv'

def parse_date(date_str: Optional[str]) -> Optional[datetime]:
    """Parse date string to datetime object."""
    if not date_str or date_str.strip().lower() in ['null', 'none', '']:
        return None
    
    # Try different date formats
    formats = [
        '%m/%d/%y %H:%M',      # 1/14/26 22:15
        '%m/%d/%y',            # 1/14/26
        '%Y-%m-%d %H:%M:%S',   # 2026-01-14 22:15:30
        '%Y-%m-%d %H:%M',      # 2026-01-14 22:15
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

def read_and_process_payments(file_path: str):
    """Read CSV and aggregate payment data by customer email."""
    print(f"\n📖 Reading {file_path}...")
    
    if not os.path.exists(file_path):
        print(f"❌ Error: File {file_path} not found!")
        sys.exit(1)
    
    # Group payments by email
    customer_payments = defaultdict(lambda: {
        'email': None,
        'name': None,
        'name_date': None,  # Track date of name to use most recent
        'stripe_customer_id': None,
        'total_amount': 0.0,
        'payment_count': 0,
        'first_payment_date': None,
        'last_payment_date': None,
    })
    
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
            
            # Parse payment data
            amount = parse_numeric(row.get('Total Spend', ''))
            if not amount or amount <= 0:
                skipped_rows += 1
                continue
            
            payment_date = parse_date(row.get('Created date (UTC)', ''))
            stripe_customer_id = row.get('Customer ID', '').strip() or None
            name = row.get('Name', '').strip() or None
            
            # Aggregate by email
            customer = customer_payments[email]
            customer['email'] = email
            
            # Update name - use the most recent name (from latest payment date)
            if name:
                if not customer['name'] or (payment_date and (
                    not customer['name_date'] or payment_date > customer['name_date']
                )):
                    customer['name'] = name
                    customer['name_date'] = payment_date
            
            if stripe_customer_id and not customer['stripe_customer_id']:
                customer['stripe_customer_id'] = stripe_customer_id
            
            customer['total_amount'] += amount
            customer['payment_count'] += 1
            
            # Update dates
            if payment_date:
                if not customer['first_payment_date'] or payment_date < customer['first_payment_date']:
                    customer['first_payment_date'] = payment_date
                if not customer['last_payment_date'] or payment_date > customer['last_payment_date']:
                    customer['last_payment_date'] = payment_date
    
    print(f"✅ Processed {total_rows} payment rows")
    print(f"   - Skipped {skipped_rows} rows (missing email or invalid amount)")
    print(f"   - Found {len(customer_payments)} unique customers")
    
    return dict(customer_payments)

def update_customers(customer_payments):
    """Update customers table with aggregated payment data."""
    print(f"\n👥 Updating {len(customer_payments)} customers with payment data...")
    
    updated = 0
    created = 0
    errors = 0
    
    for i, (email, payment_data) in enumerate(customer_payments.items(), 1):
        try:
            # Prepare update data
            update_data = {}
            
            # Always update name from payments data (uses most recent name from latest payment)
            if payment_data['name']:
                update_data['name'] = payment_data['name']
            
            # Update stripe_customer_id if not already set
            if payment_data['stripe_customer_id']:
                update_data['stripe_customer_id'] = payment_data['stripe_customer_id']
            
            # Update dates
            if payment_data['first_payment_date']:
                update_data['first_purchase_date'] = payment_data['first_payment_date'].isoformat()
            if payment_data['last_payment_date']:
                update_data['last_purchase_date'] = payment_data['last_payment_date'].isoformat()
            
            # Check if customer exists
            existing = supabase.table('customers').select('email').eq('email', email).execute()
            
            if existing.data:
                # Update existing customer
                if update_data:
                    supabase.table('customers').update(update_data).eq('email', email).execute()
                updated += 1
            else:
                # Create new customer
                customer_record = {
                    'email': email,
                    **update_data
                }
                supabase.table('customers').insert(customer_record).execute()
                created += 1
            
            if i % 50 == 0:
                print(f"   Progress: {i}/{len(customer_payments)} customers processed...")
                
        except Exception as e:
            errors += 1
            if errors <= 10:
                print(f"   ❌ Error processing customer {email}: {e}")
            elif errors == 11:
                print(f"   ... (suppressing further error messages)")
    
    print(f"✅ Customers: {created} created, {updated} updated, {errors} errors")
    print(f"   Total amount processed: ${sum(c['total_amount'] for c in customer_payments.values()):,.2f}")
    print(f"   Total payments: {sum(c['payment_count'] for c in customer_payments.values())}")

def main():
    """Main execution function."""
    print("=" * 60)
    print("💳 Payment Data Import to Customers Table")
    print("=" * 60)
    
    # Read and process payments
    customer_payments = read_and_process_payments(CSV_FILE)
    
    if not customer_payments:
        print("\n❌ No valid payment data found. Exiting.")
        sys.exit(1)
    
    # Update customers
    update_customers(customer_payments)
    
    # Summary
    print("\n" + "=" * 60)
    print("✅ Import Complete!")
    print("=" * 60)
    print(f"📊 Summary:")
    print(f"   - Customers processed: {len(customer_payments)}")
    print(f"   - Total payment amount: ${sum(c['total_amount'] for c in customer_payments.values()):,.2f}")
    print(f"   - Total payments: {sum(c['payment_count'] for c in customer_payments.values())}")
    print("\n💡 Next steps:")
    print("   1. Verify data in Supabase dashboard")
    print("   2. Check customer records for updated payment information")

if __name__ == '__main__':
    main()
