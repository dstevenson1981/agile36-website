import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    // Fetch all contacts in batches (include email to extract company from domain if needed)
    while (hasMore) {
      const { data: batchContacts, error } = await supabase
        .from('email_contacts')
        .select('role, company, email')
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
        
        // Handle company - check both stored company and email domain
        let companyValue = null;
        
        // First, try the stored company field
        if (contact.company) {
          companyValue = typeof contact.company === 'string' ? contact.company.trim() : String(contact.company).trim();
          if (companyValue && companyValue.length > 0 && companyValue !== 'null' && companyValue !== 'undefined') {
            companies.add(companyValue);
          }
        }
        
        // If no company stored, extract from email domain as fallback
        if (!companyValue && contact.email && contact.email.includes('@')) {
          const domain = contact.email.split('@')[1];
          if (domain) {
            const domainParts = domain.split('.');
            if (domainParts.length > 0) {
              const mainDomain = domainParts[0].toLowerCase();
              // Map common domains to proper company names
              const domainMap: Record<string, string> = {
                'nationwide': 'Nationwide',
                'visa': 'Visa',
                'bny': 'BNY Mellon',
                'bnymellon': 'BNY Mellon',
                'tjx': 'TJX',
              };
              
              const mappedCompany = domainMap[mainDomain];
              if (mappedCompany) {
                companies.add(mappedCompany);
              } else if (!['gmail', 'yahoo', 'hotmail', 'outlook', 'icloud', 'aol'].includes(mainDomain)) {
                // Only add if it's not a personal email domain
                const formattedCompany = mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
                companies.add(formattedCompany);
              }
            }
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

    // Also fetch all tags
    const tags = new Set<string>();
    offset = 0;
    hasMore = true;
    
    while (hasMore) {
      const { data: batchContacts, error: tagError } = await supabase
        .from('email_contacts')
        .select('tags')
        .range(offset, offset + batchSize - 1);

      if (tagError || !batchContacts || batchContacts.length === 0) {
        hasMore = false;
        break;
      }

      batchContacts.forEach((contact: any) => {
        if (contact.tags && Array.isArray(contact.tags)) {
          contact.tags.forEach((tag: string) => {
            if (tag && typeof tag === 'string' && tag.trim()) {
              tags.add(tag.trim());
            }
          });
        }
      });

      if (batchContacts.length < batchSize) {
        hasMore = false;
      } else {
        offset += batchSize;
      }
    }

    return NextResponse.json({
      success: true,
      roles: Array.from(roles).sort(),
      companies: Array.from(companies).sort(),
      tags: Array.from(tags).sort(),
    });
  } catch (error: any) {
    console.error('Error in contact-options API:', error);
    return NextResponse.json(
      { error: `Failed to fetch contact options: ${error.message}` },
      { status: 500 }
    );
  }
}
