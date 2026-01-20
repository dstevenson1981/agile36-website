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

    // Fetch all unique tags directly from database
    // Use pagination to ensure we get ALL contacts, not just the first batch
    let sortedTags: string[] = [];
    const tagsSet = new Set<string>();
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    console.log('Starting to fetch all tags from email_contacts...');

    // Fetch all contacts in batches to ensure we get everything
    while (hasMore) {
      const { data: sqlData, error: sqlError } = await supabase
        .from('email_contacts')
        .select('tags')
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (sqlError) {
        console.error('Error fetching tags batch:', sqlError);
        return NextResponse.json(
          { error: 'Failed to fetch tags', details: sqlError.message },
          { status: 500 }
        );
      }

      if (!sqlData || sqlData.length === 0) {
        hasMore = false;
        break;
      }

      // Extract tags from this batch
      sqlData.forEach((contact: any) => {
        if (contact.tags) {
          // Debug: Log the type and value of tags
          if (page === 0 && tagsSet.size < 5) {
            console.log('Sample contact tags:', {
              tags: contact.tags,
              type: typeof contact.tags,
              isArray: Array.isArray(contact.tags),
              stringified: JSON.stringify(contact.tags)
            });
          }
          
          if (Array.isArray(contact.tags)) {
            contact.tags.forEach((tag: string) => {
              if (tag && typeof tag === 'string' && tag.trim()) {
                const trimmedTag = tag.trim();
                tagsSet.add(trimmedTag);
                if (trimmedTag === 'Program' && page === 0) {
                  console.log('✅ Found "Program" tag in array format');
                }
              }
            });
          } else if (typeof contact.tags === 'string') {
            // Handle case where tags might be stored as comma-separated string
            try {
              const parsed = JSON.parse(contact.tags);
              if (Array.isArray(parsed)) {
                parsed.forEach((tag: string) => {
                  if (tag && typeof tag === 'string' && tag.trim()) {
                    const trimmedTag = tag.trim();
                    tagsSet.add(trimmedTag);
                    if (trimmedTag === 'Program') {
                      console.log('✅ Found "Program" tag in JSON string format');
                    }
                  }
                });
              }
            } catch {
              // If not JSON, treat as comma-separated
              contact.tags.split(',').forEach((tag: string) => {
                const trimmed = tag.trim();
                if (trimmed) {
                  tagsSet.add(trimmed);
                  if (trimmed === 'Program') {
                    console.log('✅ Found "Program" tag in comma-separated format');
                  }
                }
              });
            }
          }
        }
      });

      // If we got fewer results than pageSize, we've reached the end
      if (sqlData.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }

      console.log(`Fetched batch ${page}, found ${sqlData.length} contacts, ${tagsSet.size} unique tags so far`);
    }

    sortedTags = Array.from(tagsSet).sort();
    console.log(`Total unique tags found: ${sortedTags.length}`);
    console.log('All tags:', sortedTags);
    
    // Verify "Program" tag is included
    if (sortedTags.includes('Program')) {
      console.log('✅ "Program" tag is included in results');
    } else {
      console.warn('⚠️ "Program" tag NOT found in results!');
      console.warn('Tags found:', sortedTags);
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
