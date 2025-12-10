import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { tags, hours = 1 } = await request.json();

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

    // Calculate the time threshold (last N hours)
    const hoursAgo = new Date();
    hoursAgo.setHours(hoursAgo.getHours() - hours);
    const thresholdTime = hoursAgo.toISOString();

    // Fetch all contacts created in the last N hours
    const { data: contacts, error: fetchError } = await supabase
      .from('email_contacts')
      .select('*')
      .gte('created_at', thresholdTime)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching recent contacts:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch recent contacts' },
        { status: 500 }
      );
    }

    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { 
          success: true,
          updated: 0,
          total: 0,
          message: `No contacts found created in the last ${hours} hour(s)`
        }
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
      message: `Successfully tagged ${updatedCount} out of ${contacts.length} contacts created in the last ${hours} hour(s)`,
    });
  } catch (error: any) {
    console.error('Error in tag recent API:', error);
    return NextResponse.json(
      { error: `Failed to tag recent contacts: ${error.message}` },
      { status: 500 }
    );
  }
}
