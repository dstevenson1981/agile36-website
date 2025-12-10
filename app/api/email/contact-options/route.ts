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

    // Get ALL contacts to extract unique values (no limit)
    const { data: allContacts, error } = await supabase
      .from('email_contacts')
      .select('role, company')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch contact options' },
        { status: 500 }
      );
    }

    // Extract unique roles and companies
    const roles = new Set<string>();
    const companies = new Set<string>();

    allContacts?.forEach((contact: any) => {
      if (contact.role && contact.role.trim()) {
        roles.add(contact.role.trim());
      }
      if (contact.company && contact.company.trim()) {
        companies.add(contact.company.trim());
      }
    });

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
