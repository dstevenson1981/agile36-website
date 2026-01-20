import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Simple: fetch all contacts, extract tags, return unique tags
export async function GET(request: NextRequest) {
  try {
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

    // Fetch ALL contacts - just get the tags column
    const { data: contacts, error } = await supabase
      .from('email_contacts')
      .select('tags');

    if (error) {
      console.error('Error fetching contacts:', error);
      return NextResponse.json(
        { error: `Failed to fetch contacts: ${error.message}` },
        { status: 500 }
      );
    }

    // Extract all tags from all contacts
    const tagsSet = new Set<string>();
    
    if (contacts && Array.isArray(contacts)) {
      contacts.forEach((contact: any) => {
        if (contact.tags && Array.isArray(contact.tags)) {
          contact.tags.forEach((tag: any) => {
            if (tag && typeof tag === 'string') {
              tagsSet.add(tag.trim());
            }
          });
        }
      });
    }

    const sortedTags = Array.from(tagsSet).sort();

    return NextResponse.json({
      success: true,
      tags: sortedTags,
      count: sortedTags.length,
    });
  } catch (error: any) {
    console.error('Error in tags API:', error);
    return NextResponse.json(
      { error: `Failed to fetch tags: ${error.message}` },
      { status: 500 }
    );
  }
}
