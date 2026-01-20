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

    console.log('🔄 Fetching ALL unique tags using direct SQL query...');

    // Method 1: Try using RPC function if it exists (most efficient)
    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_unique_tags');
      
      if (!rpcError && rpcData && Array.isArray(rpcData)) {
        let tags: string[] = [];
        if (rpcData.length > 0) {
          if (typeof rpcData[0] === 'string') {
            tags = rpcData.sort();
          } else if (rpcData[0]?.tag) {
            tags = rpcData.map((item: any) => item.tag).filter(Boolean).sort();
          }
        }
        console.log(`✅ RPC function returned ${tags.length} tags:`, tags);
        if (tags.includes('Program')) {
          console.log('✅ "Program" tag found via RPC');
        }
        return NextResponse.json({
          success: true,
          tags,
          count: tags.length,
          method: 'rpc',
        });
      }
    } catch (rpcError) {
      console.log('RPC function not available, using direct query...');
    }

    // Method 2: Use direct SQL query via REST API (most reliable)
    // This directly executes: SELECT DISTINCT unnest(tags) FROM email_contacts WHERE tags IS NOT NULL
    try {
      const { data: sqlResult, error: sqlError } = await supabase
        .from('email_contacts')
        .select('tags')
        .not('tags', 'is', null);

      if (sqlError) {
        throw sqlError;
      }

      const tagsSet = new Set<string>();
      if (sqlResult && Array.isArray(sqlResult)) {
        sqlResult.forEach((contact: any) => {
          if (contact.tags) {
            if (Array.isArray(contact.tags)) {
              contact.tags.forEach((tag: any) => {
                if (tag && typeof tag === 'string' && tag.trim()) {
                  tagsSet.add(tag.trim());
                }
              });
            }
          }
        });
      }

      const sortedTags = Array.from(tagsSet).sort();
      console.log(`✅ Direct query returned ${sortedTags.length} tags:`, sortedTags);
      
      if (sortedTags.includes('Program')) {
        console.log('✅ "Program" tag found via direct query');
      } else {
        console.warn('⚠️ "Program" tag NOT found!');
        console.warn('Sample contacts with tags:', sqlResult?.slice(0, 5));
      }

      return NextResponse.json({
        success: true,
        tags: sortedTags,
        count: sortedTags.length,
        method: 'direct_query',
      });
    } catch (queryError: any) {
      console.error('Direct query failed:', queryError);
      
      // Method 3: Fallback - fetch ALL contacts and extract tags
      console.log('Using fallback method: fetching all contacts...');
      const tagsSet = new Set<string>();
      let page = 0;
      const pageSize = 1000;
      let hasMore = true;

      while (hasMore) {
        const { data: batchData, error: batchError } = await supabase
          .from('email_contacts')
          .select('tags')
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (batchError) {
          throw batchError;
        }

        if (!batchData || batchData.length === 0) {
          hasMore = false;
          break;
        }

        batchData.forEach((contact: any) => {
          if (contact.tags && Array.isArray(contact.tags)) {
            contact.tags.forEach((tag: any) => {
              if (tag && typeof tag === 'string' && tag.trim()) {
                tagsSet.add(tag.trim());
              }
            });
          }
        });

        if (batchData.length < pageSize) {
          hasMore = false;
        } else {
          page++;
        }
      }

      const sortedTags = Array.from(tagsSet).sort();
      console.log(`✅ Fallback method returned ${sortedTags.length} tags:`, sortedTags);
      
      return NextResponse.json({
        success: true,
        tags: sortedTags,
        count: sortedTags.length,
        method: 'fallback_pagination',
      });
    }

    return NextResponse.json({
      success: true,
      tags: sortedTags,
      count: sortedTags.length,
      debug: {
        totalBatches: page + 1,
        sampleTags: sortedTags.slice(0, 10),
        hasProgramTag: sortedTags.includes('Program'),
      },
    });
  } catch (error: any) {
    console.error('Error in tags API:', error);
    return NextResponse.json(
      { error: `Failed to fetch tags: ${error.message}` },
      { status: 500 }
    );
  }
}
