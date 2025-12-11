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

    // Fetch all contacts with tags
    const { data: contacts, error: fetchError } = await supabase
      .from('email_contacts')
      .select('tags')
      .not('tags', 'is', null);

    if (fetchError) {
      console.error('Error fetching contacts:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch contacts' },
        { status: 500 }
      );
    }

    // Count contacts per tag
    const tagCounts: Record<string, number> = {};

    if (contacts) {
      for (const contact of contacts) {
        const tags = contact.tags || [];
        if (Array.isArray(tags)) {
          for (const tag of tags) {
            if (tag && typeof tag === 'string' && tag.trim()) {
              const normalizedTag = tag.trim();
              tagCounts[normalizedTag] = (tagCounts[normalizedTag] || 0) + 1;
            }
          }
        }
      }
    }

    // Convert to array and sort by count (descending)
    const tagStats = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      tags: tagStats,
    });
  } catch (error: any) {
    console.error('Error in tag stats API:', error);
    return NextResponse.json(
      { error: `Failed to fetch tag stats: ${error.message}` },
      { status: 500 }
    );
  }
}
