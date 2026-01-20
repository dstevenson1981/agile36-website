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

    // Method 1: Try using RPC function first (most efficient and reliable)
    try {
      console.log('Attempting to call get_unique_tags() RPC function...');
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_unique_tags');
      
      if (rpcError) {
        console.warn('RPC error:', rpcError);
        console.warn('RPC error details:', JSON.stringify(rpcError, null, 2));
        throw rpcError;
      }
      
      if (rpcData && Array.isArray(rpcData)) {
        console.log(`RPC returned ${rpcData.length} results`);
        console.log('RPC data sample:', rpcData.slice(0, 5));
        
        // Extract tags from RPC response (handles both formats)
        let tags: string[] = [];
        if (rpcData.length > 0) {
          if (typeof rpcData[0] === 'string') {
            // Simple array of strings
            tags = rpcData
              .filter((tag: any) => tag && typeof tag === 'string')
              .map((tag: string) => tag.trim())
              .filter((tag: string) => tag.length > 0)
              .sort();
          } else if (rpcData[0]?.tag !== undefined) {
            // Array of objects with 'tag' property
            tags = rpcData
              .map((item: any) => item.tag)
              .filter((tag: any) => tag !== null && tag !== undefined && typeof tag === 'string')
              .map((tag: string) => tag.trim())
              .filter((tag: string) => tag.length > 0)
              .sort();
          } else {
            console.warn('Unexpected RPC response format:', rpcData[0]);
            console.warn('Full RPC response:', JSON.stringify(rpcData.slice(0, 3), null, 2));
          }
        }
        
        console.log(`✅ RPC function returned ${tags.length} unique tags`);
        console.log('All tags from RPC:', tags);
        
        if (tags.includes('Program')) {
          console.log('✅ "Program" tag found via RPC!');
        } else {
          console.warn('⚠️ "Program" tag NOT found in RPC results');
          console.warn('Available tags:', tags);
        }
        
        return NextResponse.json({
          success: true,
          tags,
          count: tags.length,
          method: 'rpc',
          hasProgramTag: tags.includes('Program'),
        });
      } else {
        console.warn('RPC returned non-array data:', rpcData);
        throw new Error('RPC returned invalid data format');
      }
    } catch (rpcError: any) {
      console.log('RPC function failed or not available:', rpcError?.message);
      console.log('Falling back to direct query method...');
    }

    // Method 2: Use raw SQL query via Supabase (if RPC doesn't work)
    // This directly executes: SELECT DISTINCT unnest(tags) FROM email_contacts WHERE tags IS NOT NULL
    try {
      console.log('Fetching ALL contacts to extract tags (fallback method)...');
      
      // Fetch ALL contacts - no filtering, no pagination limits
      const { data: sqlResult, error: sqlError } = await supabase
        .from('email_contacts')
        .select('tags, email')
        .limit(100000); // Very high limit to get everything

      if (sqlError) {
        throw sqlError;
      }

      console.log(`Fetched ${sqlResult?.length || 0} total contacts`);

      const tagsSet = new Set<string>();
      let contactsWithTags = 0;
      let programTagFound = false;
      const programContacts: string[] = [];
      
      if (sqlResult && Array.isArray(sqlResult)) {
        sqlResult.forEach((contact: any) => {
          if (contact.tags) {
            contactsWithTags++;
            if (Array.isArray(contact.tags)) {
              contact.tags.forEach((tag: any) => {
                if (tag && typeof tag === 'string' && tag.trim()) {
                  const trimmedTag = tag.trim();
                  tagsSet.add(trimmedTag);
                  if (trimmedTag === 'Program') {
                    programTagFound = true;
                    programContacts.push(contact.email);
                  }
                }
              });
            }
          }
        });
      }

      const sortedTags = Array.from(tagsSet).sort();
      console.log(`✅ Fallback query returned ${sortedTags.length} unique tags from ${contactsWithTags} contacts with tags`);
      console.log('All tags found:', sortedTags);
      
      if (programTagFound) {
        console.log(`✅ "Program" tag found on ${programContacts.length} contacts!`);
        console.log('Sample contacts with Program tag:', programContacts.slice(0, 5));
      } else {
        console.warn('⚠️ "Program" tag NOT found in any contact!');
      }

      return NextResponse.json({
        success: true,
        tags: sortedTags,
        count: sortedTags.length,
        method: 'fallback_direct_query',
        contactsWithTags,
        totalContacts: sqlResult?.length || 0,
        hasProgramTag: sortedTags.includes('Program'),
        programContactCount: programContacts.length,
      });
    } catch (queryError: any) {
      console.error('All methods failed:', queryError);
      return NextResponse.json(
        { 
          success: false,
          error: `Failed to fetch tags: ${queryError.message}`,
          details: queryError,
        },
        { status: 500 }
      );
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
