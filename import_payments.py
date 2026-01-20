#!/usr/bin/env python3
"""
Import payment transactions from unified_payments.csv to Supabase.

This script:
1. Reads public/unified_payments.csv
2. Extracts course slug from course description
3. Links payments to customers by email
4. Inserts into payments table
"""

import os
import csv
import sys
import re
from datetime import datetime
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
    print("Please set one of:")
    print("  - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    print("  - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    sys.exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# CSV file path
CSV_FILE = 'public/unified_payments.csv'

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

def extract_course_slug(course_description: str) -> Optional[str]:
    """Extract course slug from full course description."""
    if not course_description:
        return None
    
    # Convert to lowercase for matching
    desc_lower = course_description.lower()
    
    # Try to match course names
    for course_name, slug in COURSE_SLUG_MAP.items():
        if course_name in desc_lower:
            return slug
    
    # Try to extract from patterns like "Course Name - Plan"
    # Remove plan type and class info
    parts = course_description.split(' - ')
    if parts:
        course_name = parts[0].strip()
        # Try direct lookup
        course_name_lower = course_name.lower()
        for course_name_key, slug in COURSE_SLUG_MAP.items():
            if course_name_key in course_name_lower:
                return slug
    
    # If no match found, return None
    return None

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
    
    print(f"⚠️  Warning: Could not parse date: {date_str}")
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
    """Read CSV and process payment data."""
    print(f"\n📖 Reading {file_path}...")
    
    if not os.path.exists(file_path):
        print(f"❌ Error: File {file_path} not found!")
        sys.exit(1)
    
    payments_data = []
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
            
            # Extract course slug from description
            course_description = row.get('Course Slug', '').strip()
            course_slug = extract_course_slug(course_description)
            
            # Parse payment data
            amount = parse_numeric(row.get('Total Spend', ''))
            if not amount or amount <= 0:
                skipped_rows += 1
                continue
            
            payment_date = parse_date(row.get('Created date (UTC)', ''))
            stripe_customer_id = row.get('Customer ID', '').strip() or None
            name = row.get('Name', '').strip() or None
            
            payments_data.append({
                'customer_email': email,
                'stripe_customer_id': stripe_customer_id,
                'amount': amount,
                'course_slug': course_slug,
                'course_description': course_description,
                'payment_date': payment_date,
                'name': name,  # For reference, not stored in payments table
            })
    
    print(f"✅ Processed {total_rows} rows")
    print(f"   - Skipped {skipped_rows} rows (missing email or invalid amount)")
    print(f"   - Found {len(payments_data)} valid payments")
    print(f"   - {sum(1 for p in payments_data if p['course_slug']) } payments with matched course slugs")
    print(f"   - {sum(1 for p in payments_data if not p['course_slug'])} payments with unmatched course slugs")
    
    return payments_data

def insert_payments(payments_data):
    """Insert payments into Supabase, skipping duplicates."""
    print(f"\n💳 Inserting {len(payments_data)} payments...")
    
    inserted = 0
    skipped = 0
    errors = 0
    
    # Track seen payments to avoid duplicates in memory
    seen_payments = set()
    
    for i, payment in enumerate(payments_data, 1):
        try:
            # Create unique key for duplicate detection
            payment_key = (
                payment['customer_email'],
                payment['stripe_customer_id'],
                payment['amount'],
                payment['payment_date'].isoformat() if payment['payment_date'] else None,
                payment['course_slug'] or ''
            )
            
            if payment_key in seen_payments:
                skipped += 1
                continue
            
            seen_payments.add(payment_key)
            
            # Prepare payment record
            payment_record = {
                'customer_email': payment['customer_email'],
                'amount': payment['amount'],
                'payment_date': payment['payment_date'].isoformat() if payment['payment_date'] else None,
            }
            
            # Add optional fields
            if payment['stripe_customer_id']:
                payment_record['stripe_customer_id'] = payment['stripe_customer_id']
            if payment['course_slug']:
                payment_record['course_slug'] = payment['course_slug']
            if payment['course_description']:
                payment_record['course_description'] = payment['course_description']
            
            # Insert payment
            supabase.table('payments').insert(payment_record).execute()
            inserted += 1
            
            if i % 100 == 0:
                print(f"   Progress: {i}/{len(payments_data)} payments processed...")
                
        except Exception as e:
            error_msg = str(e)
            # Check if it's a duplicate error
            if 'duplicate' in error_msg.lower() or 'unique' in error_msg.lower() or '23505' in error_msg:
                skipped += 1
            else:
                errors += 1
                if errors <= 10:  # Only print first 10 errors
                    print(f"   ❌ Error processing payment {i}: {error_msg[:100]}")
                elif errors == 11:
                    print(f"   ... (suppressing further error messages)")
    
    print(f"✅ Payments: {inserted} inserted, {skipped} skipped (duplicates), {errors} errors")

def main():
    """Main execution function."""
    print("=" * 60)
    print("💳 Payment Import Script")
    print("=" * 60)
    
    # Read and process CSV
    payments_data = read_and_process_payments(CSV_FILE)
    
    if not payments_data:
        print("\n❌ No valid payment data found. Exiting.")
        sys.exit(1)
    
    # Insert payments
    insert_payments(payments_data)
    
    # Summary
    print("\n" + "=" * 60)
    print("✅ Import Complete!")
    print("=" * 60)
    print(f"📊 Summary:")
    print(f"   - Payments processed: {len(payments_data)}")
    print("\n💡 Next steps:")
    print("   1. Verify data in Supabase dashboard")
    print("   2. Check for any errors in the output above")
    print("   3. Run analytics queries on the payments table")

if __name__ == '__main__':
    main()
