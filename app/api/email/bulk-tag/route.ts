import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { tags, filters } = await request.json();

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: 'Tags array is required' },
        { status: 400 }
      );
    }

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

    // Build query based on filters
    // For tag filtering, we need to handle it differently since Supabase's contains
    // requires all tags to match. We'll fetch all contacts and filter in JavaScript
    // if tags are specified, otherwise use database queries for other filters.
    
    let contacts: any[] = [];
    
    if (filters && filters.tags && filters.tags.length > 0) {
      // For tag filtering, fetch all contacts and filter in JavaScript
      const { data: allContacts, error: fetchAllError } = await supabase
        .from('email_contacts')
        .select('*');
      
      if (fetchAllError) {
        console.error('Error fetching contacts:', fetchAllError);
        return NextResponse.json(
          { error: 'Failed to fetch contacts' },
          { status: 500 }
        );
      }
      
      // Filter by tags in JavaScript
      contacts = (allContacts || []).filter((contact: any) => {
        if (!contact.tags) return false;
        const contactTags = Array.isArray(contact.tags) ? contact.tags : [];
        return filters.tags.some((filterTag: string) =>
          contactTags.some((contactTag: string) =>
            contactTag?.toString().trim().toLowerCase() === filterTag?.toString().trim().toLowerCase()
          )
        );
      });
      
      // Apply other filters
      if (filters.role) {
        contacts = contacts.filter((c: any) => c.role === filters.role);
      }
      if (filters.company) {
        contacts = contacts.filter((c: any) => c.company === filters.company);
      }
      if (filters.subscribed !== undefined) {
        contacts = contacts.filter((c: any) => c.subscribed === filters.subscribed);
      }
      if (filters.blocked !== undefined) {
        contacts = contacts.filter((c: any) => c.blocked === filters.blocked);
      }
    } else {
      // No tag filters, use database query
      let query = supabase.from('email_contacts').select('*');
      
      if (filters) {
        if (filters.role) {
          query = query.eq('role', filters.role);
        }
        if (filters.company) {
          query = query.eq('company', filters.company);
        }
        if (filters.subscribed !== undefined) {
          query = query.eq('subscribed', filters.subscribed);
        }
        if (filters.blocked !== undefined) {
          query = query.eq('blocked', filters.blocked);
        }
      }
      
      const { data: fetchedContacts, error: fetchError } = await query;
      
      if (fetchError) {
        console.error('Error fetching contacts:', fetchError);
        return NextResponse.json(
          { error: 'Failed to fetch contacts' },
          { status: 500 }
        );
      }
      
      contacts = fetchedContacts || [];
    }

    if (fetchError) {
      console.error('Error fetching contacts:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch contacts' },
        { status: 500 }
      );
    }

    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { error: 'No contacts found matching the criteria' },
        { status: 400 }
      );
    }

    // Update each contact with new tags
    let updatedCount = 0;
    const errors: string[] = [];

    for (const contact of contacts) {
      try {
        const currentTags = contact.tags || [];
        const tagsArray = Array.isArray(currentTags) ? currentTags : [];
        const newTags = [...tagsArray];

        // Add new tags that don't already exist (case-insensitive)
        tags.forEach((tag: string) => {
          const normalizedTag = tag.trim();
          if (normalizedTag && !newTags.some(t => t.trim().toLowerCase() === normalizedTag.toLowerCase())) {
            newTags.push(normalizedTag);
          }
        });

        const { error: updateError } = await supabase
          .from('email_contacts')
          .update({ tags: newTags })
          .eq('id', contact.id);

        if (updateError) {
          errors.push(`Failed to update ${contact.email}: ${updateError.message}`);
        } else {
          updatedCount++;
        }
      } catch (error: any) {
        errors.push(`Error updating ${contact.email}: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      updated: updatedCount,
      total: contacts.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Error in bulk tag API:', error);
    return NextResponse.json(
      { error: `Failed to bulk tag contacts: ${error.message}` },
      { status: 500 }
    );
  }
}
