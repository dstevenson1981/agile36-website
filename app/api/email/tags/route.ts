import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use direct SQL query with unnest to get ALL tags efficiently
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

    // Try RPC function first (most efficient)
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('get_unique_tags');

    if (!rpcError && rpcData && Array.isArray(rpcData)) {
      // RPC function exists and returned data
      const tags = rpcData
        .map((row: any) => {
          // Handle both {tag: "value"} and direct string returns
          return typeof row === 'string' ? row : (row.tag || row);
        })
        .filter((tag: any) => tag && typeof tag === 'string')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);
      
      const sortedTags = [...new Set(tags)].sort();
      
      console.log(`✅ RPC: Found ${sortedTags.length} unique tags:`, sortedTags);
      
      return NextResponse.json({
        success: true,
        tags: sortedTags,
        count: sortedTags.length,
        method: 'rpc',
      });
    }

    // If RPC fails, log and fall through to pagination
    if (rpcError) {
      console.warn('RPC function not available or error:', rpcError.message);
    }

    // Final fallback: Fetch ALL contacts with pagination
    console.log('SQL RPC not available, fetching all contacts with pagination...');
    const tagsSet = new Set<string>();
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data: contacts, error } = await supabase
        .from('email_contacts')
        .select('tags')
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error) {
        console.error(`Error fetching contacts page ${page}:`, error);
        throw error;
      }

      if (!contacts || contacts.length === 0) {
        hasMore = false;
        break;
      }

      contacts.forEach((contact: any) => {
        if (contact.tags && Array.isArray(contact.tags)) {
          contact.tags.forEach((tag: any) => {
            if (tag && typeof tag === 'string' && tag.trim()) {
              tagsSet.add(tag.trim());
            }
          });
        }
      });

      // If we got fewer than pageSize, we're done
      if (contacts.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }
    }

    const sortedTags = Array.from(tagsSet).sort();
    
    console.log(`✅ Pagination: Found ${sortedTags.length} unique tags after ${page + 1} pages`);
    console.log('All tags:', sortedTags);

    return NextResponse.json({
      success: true,
      tags: sortedTags,
      count: sortedTags.length,
      method: 'pagination',
      pages: page + 1,
    });
  } catch (error: any) {
    console.error('Error in tags API:', error);
    return NextResponse.json(
      { error: `Failed to fetch tags: ${error.message}` },
      { status: 500 }
    );
  }
}
