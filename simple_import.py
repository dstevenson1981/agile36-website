#!/usr/bin/env python3
"""
Simple import: Read unified_payments.csv and insert into customers table.
"""

import os
import csv
import sys
from datetime import datetime
from collections import defaultdict
from supabase import create_client, Client
from dotenv import load_dotenv
import re

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

CSV_FILE = 'public/unified_payments.csv'

# Extract course slug from description
def extract_course_slug(description: str) -> str:
    """Extract course slug from description."""
    if not description:
        return None
    
    description_lower = description.lower()
    
    # Map common course names to slugs
    if 'leading safe' in description_lower:
        return 'leading-safe'
    elif 'agile product management' in description_lower:
        return 'agile-product-management'
    elif 'product owner' in description_lower or 'product manager' in description_lower:
        return 'product-owner-manager'
    elif 'advanced scrum master' in description_lower:
        return 'advanced-scrum-master'
    elif 'genai practitioner' in description_lower:
        return 'certified-genai-practitioner'
    elif 'lean portfolio' in description_lower:
        return 'lean-portfolio-management'
    elif 'value stream mapping' in description_lower:
        return 'value-stream-mapping'
    elif 'scrum master' in description_lower:
        return 'scrum-master'
    elif 'release train engineer' in description_lower:
        return 'release-train-engineer'
    elif 'agile software engineering' in description_lower:
        return 'agile-software-engineering'
    elif 'devops' in description_lower:
        return 'devops'
    elif 'product manager' in description_lower:
        return 'product-manager'
    
    return None

# Parse date
def parse_date(date_str: str) -> datetime:
    """Parse date string."""
    if not date_str:
        return None
    
    try:
        # Try format: 1/14/26 22:15
        return datetime.strptime(date_str.strip(), '%m/%d/%y %H:%M')
    except:
        try:
            # Try format: 1/14/26
            return datetime.strptime(date_str.strip(), '%m/%d/%y')
        except:
            return None

# Read CSV and aggregate by email
print("📖 Reading unified_payments.csv...")
customer_data = defaultdict(lambda: {
    'name': None,
    'stripe_customer_id': None,
    'course_slug': None,
    'total_spend': 0,
    'payment_count': 0,
    'first_purchase_date': None,
    'last_purchase_date': None
})

with open(CSV_FILE, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    row_count = 0
    
    for row in reader:
        row_count += 1
        email = row.get('Customer Email', '').strip()
        if not email:
            continue
        
        # Get name - use most recent non-empty name
        name = row.get('Name', '').strip()
        if name:
            customer_data[email]['name'] = name
        
        # Get customer ID
        customer_id = row.get('Customer ID', '').strip()
        if customer_id:
            customer_data[email]['stripe_customer_id'] = customer_id
        
        # Extract course slug (optional - don't skip if missing)
        course_desc = row.get('Course Slug', '').strip()
        course_slug = extract_course_slug(course_desc)
        
        # Set course slug (use first one found, but it's okay if none)
        if course_slug and not customer_data[email]['course_slug']:
            customer_data[email]['course_slug'] = course_slug
        
        # Add to total spend
        try:
            spend = float(row.get('Total Spend', 0) or 0)
            customer_data[email]['total_spend'] += spend
        except:
            pass
        
        # Increment payment count
        customer_data[email]['payment_count'] += 1
        
        # Parse dates
        date_str = row.get('Created date (UTC)', '').strip()
        purchase_date = parse_date(date_str)
        
        if purchase_date:
            if not customer_data[email]['first_purchase_date'] or purchase_date < customer_data[email]['first_purchase_date']:
                customer_data[email]['first_purchase_date'] = purchase_date
            if not customer_data[email]['last_purchase_date'] or purchase_date > customer_data[email]['last_purchase_date']:
                customer_data[email]['last_purchase_date'] = purchase_date

print(f"✅ Read {row_count} rows")
print(f"📊 Found {len(customer_data)} unique customers")

# Prepare records for bulk insert
print("\n💾 Inserting into customers table...")
records = []

for email, data in customer_data.items():
    record = {
        'email': email,
        'total_spend': data['total_spend'],
    }
    
    # Only include name if it exists
    if data['name']:
        record['name'] = data['name']
    
    # Only include stripe_customer_id if it exists
    if data['stripe_customer_id']:
        record['stripe_customer_id'] = data['stripe_customer_id']
    
    # Only include course_slug if it exists
    if data['course_slug']:
        record['course_slug'] = data['course_slug']
    
    if data['first_purchase_date']:
        record['first_purchase_date'] = data['first_purchase_date'].isoformat()
    if data['last_purchase_date']:
        record['last_purchase_date'] = data['last_purchase_date'].isoformat()
    
    records.append(record)

# Bulk upsert
try:
    result = supabase.table('customers').upsert(records, on_conflict='email').execute()
    print(f"✅ Successfully inserted/updated {len(records)} customers")
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

print("\n✅ Done!")
