#!/usr/bin/env python3
"""
Export all enriched customers to CSV
"""

import os
import csv
from supabase import create_client
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')
load_dotenv()

# Initialize Supabase
supabase = create_client(
    os.getenv('NEXT_PUBLIC_SUPABASE_URL'),
    os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
)

# Fetch all enriched customers
print("Fetching enriched customers from Supabase...")
# Use pagination to get all customers
all_customers = []
page = 0
page_size = 1000
has_more = True

while has_more:
    result = supabase.table('customers').select('*').not_.is_('apollo_id', 'null').range(page * page_size, (page + 1) * page_size - 1).execute()
    if result.data:
        all_customers.extend(result.data)
        page += 1
        has_more = len(result.data) == page_size
        print(f"  Fetched page {page}: {len(result.data)} customers (total: {len(all_customers)})")
    else:
        has_more = False

customers = all_customers

customers = result.data
print(f"Found {len(customers)} enriched customers")

# Export to CSV
output_file = 'enriched_customers.csv'
fieldnames = [
    'email', 'name', 'first_name', 'last_name',
    'job_title', 'company_name', 'company_website', 'company_size', 'company_industry',
    'linkedin_url', 'phone_number',
    'city', 'state', 'country',
    'seniority', 'departments',
    'course_slug', 'total_spend',
    'apollo_id', 'enriched_at',
    'first_purchase_date', 'last_purchase_date',
    'stripe_customer_id'
]

with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    
    for customer in customers:
        row = {field: customer.get(field, '') for field in fieldnames}
        writer.writerow(row)

print(f"\n✅ Exported {len(customers)} enriched customers to {output_file}")

# Print summary
with_title = sum(1 for c in customers if c.get('job_title'))
with_company = sum(1 for c in customers if c.get('company_name'))
with_linkedin = sum(1 for c in customers if c.get('linkedin_url'))

print(f"\nSummary:")
print(f"  Total enriched: {len(customers)}")
print(f"  With job title: {with_title}")
print(f"  With company name: {with_company}")
print(f"  With LinkedIn: {with_linkedin}")
