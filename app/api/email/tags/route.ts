import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Optimized endpoint to fetch all unique tags from email_contacts
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

    // Try to use RPC function first (more efficient), fallback to direct query
    let sortedTags: string[] = [];
    
    try {
      // Try RPC function if it exists
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_unique_tags');
      
      if (!rpcError && rpcData) {
        // Handle RPC response format
        if (Array.isArray(rpcData)) {
          if (rpcData.length > 0 && typeof rpcData[0] === 'string') {
            sortedTags = rpcData.sort();
          } else if (rpcData.length > 0 && rpcData[0]?.tag) {
            sortedTags = rpcData.map((item: any) => item.tag).filter(Boolean).sort();
          }
        }
      } else {
        throw new Error('RPC not available, using fallback');
      }
    } catch (rpcError) {
      // Fallback: Fetch all contacts and extract tags client-side
      // Query all contacts (including those with null tags) to ensure we get everything
      const { data: sqlData, error: sqlError } = await supabase
        .from('email_contacts')
        .select('tags')
        .limit(10000); // Increased limit for large datasets
      
      if (sqlError) {
        console.error('Error fetching tags:', sqlError);
        return NextResponse.json(
          { error: 'Failed to fetch tags', details: sqlError.message },
          { status: 500 }
        );
      }
      
      const tagsSet = new Set<string>();
      if (sqlData && Array.isArray(sqlData)) {
        sqlData.forEach((contact: any) => {
          // Handle both array format and potential string format
          if (contact.tags) {
            if (Array.isArray(contact.tags)) {
              contact.tags.forEach((tag: string) => {
                if (tag && typeof tag === 'string' && tag.trim()) {
                  tagsSet.add(tag.trim());
                }
              });
            } else if (typeof contact.tags === 'string') {
              // Handle case where tags might be stored as comma-separated string
              contact.tags.split(',').forEach((tag: string) => {
                const trimmed = tag.trim();
                if (trimmed) {
                  tagsSet.add(trimmed);
                }
              });
            }
          }
        });
      }
      sortedTags = Array.from(tagsSet).sort();
    }

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
