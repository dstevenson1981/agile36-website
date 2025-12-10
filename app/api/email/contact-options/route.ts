import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    // Supabase setup
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Fetch ALL contacts in batches to ensure we get every single one
    // Supabase has default limits, so we need to paginate
    const roles = new Set<string>();
    const companies = new Set<string>();
    let offset = 0;
    const batchSize = 1000;
    let hasMore = true;
    let totalFetched = 0;

    console.log('Fetching all companies and roles from database...');

    // Fetch all contacts in batches
    while (hasMore) {
      const { data: batchContacts, error } = await supabase
        .from('email_contacts')
        .select('role, company')
        .range(offset, offset + batchSize - 1);

      if (error) {
        console.error('Error fetching contacts batch:', error);
        // Continue with what we have
        break;
      }

      if (!batchContacts || batchContacts.length === 0) {
        hasMore = false;
        break;
      }

      totalFetched += batchContacts.length;

      // Extract unique roles and companies from this batch
      batchContacts.forEach((contact: any) => {
        // Handle role
        if (contact.role) {
          const roleValue = typeof contact.role === 'string' ? contact.role.trim() : String(contact.role).trim();
          if (roleValue && roleValue.length > 0 && roleValue !== 'null' && roleValue !== 'undefined') {
            roles.add(roleValue);
          }
        }
        
        // Handle company
        if (contact.company) {
          const companyValue = typeof contact.company === 'string' ? contact.company.trim() : String(contact.company).trim();
          if (companyValue && companyValue.length > 0 && companyValue !== 'null' && companyValue !== 'undefined') {
            companies.add(companyValue);
          }
        }
      });

      // If we got fewer than batchSize, we're done
      if (batchContacts.length < batchSize) {
        hasMore = false;
      } else {
        offset += batchSize;
      }
    }

    console.log(`Fetched ${totalFetched} contacts, found ${roles.size} unique roles and ${companies.size} unique companies`);

    return NextResponse.json({
      success: true,
      roles: Array.from(roles).sort(),
      companies: Array.from(companies).sort(),
    });
  } catch (error: any) {
    console.error('Error in contact-options API:', error);
    return NextResponse.json(
      { error: `Failed to fetch contact options: ${error.message}` },
      { status: 500 }
    );
  }
}
