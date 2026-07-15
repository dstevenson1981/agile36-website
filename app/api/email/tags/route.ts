import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Short in-memory cache — tags change infrequently relative to page loads
let tagsCache: { tags: string[]; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60_000;

function normalizeTags(raw: any[]): string[] {
  return [
    ...new Set(
      raw
        .map((row: any) => {
          if (typeof row === 'string') return row;
          return row?.tag || row;
        })
        .filter((tag: any) => tag && typeof tag === 'string')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0)
    ),
  ].sort();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bypassCache = searchParams.get('refresh') === '1';

    if (!bypassCache && tagsCache && Date.now() < tagsCache.expiresAt) {
      return NextResponse.json({
        success: true,
        tags: tagsCache.tags,
        count: tagsCache.tags.length,
        method: 'cache',
      });
    }

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

    // Prefer RPC (unnest + DISTINCT) — O(unique tags), not O(contacts)
    const { data: rpcData, error: rpcError } = await supabase.rpc('get_unique_tags');

    if (!rpcError && rpcData && Array.isArray(rpcData)) {
      const sortedTags = normalizeTags(rpcData);
      tagsCache = { tags: sortedTags, expiresAt: Date.now() + CACHE_TTL_MS };

      return NextResponse.json({
        success: true,
        tags: sortedTags,
        count: sortedTags.length,
        method: 'rpc',
      });
    }

    if (rpcError) {
      console.warn('RPC get_unique_tags unavailable:', rpcError.message);
    }

    // Bounded fallback: sample tags column only (never full-row *), max 5k rows.
    // Prefer fixing the RPC over relying on this path.
    const tagsSet = new Set<string>();
    const pageSize = 1000;
    const maxPages = 5;

    for (let page = 0; page < maxPages; page++) {
      const { data: contacts, error } = await supabase
        .from('email_contacts')
        .select('tags')
        .not('tags', 'is', null)
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error) {
        console.error(`Error fetching tags page ${page}:`, error);
        throw error;
      }

      if (!contacts || contacts.length === 0) break;

      contacts.forEach((contact: any) => {
        if (contact.tags && Array.isArray(contact.tags)) {
          contact.tags.forEach((tag: any) => {
            if (tag && typeof tag === 'string' && tag.trim()) {
              tagsSet.add(tag.trim());
            }
          });
        }
      });

      if (contacts.length < pageSize) break;
    }

    const sortedTags = Array.from(tagsSet).sort();
    tagsCache = { tags: sortedTags, expiresAt: Date.now() + CACHE_TTL_MS };

    return NextResponse.json({
      success: true,
      tags: sortedTags,
      count: sortedTags.length,
      method: 'bounded-sample',
      warning:
        'get_unique_tags RPC unavailable; tags may be incomplete. Run create-get-unique-tags-function.sql.',
    });
  } catch (error: any) {
    console.error('Error in tags API:', error);
    return NextResponse.json(
      { error: `Failed to fetch tags: ${error.message}` },
      { status: 500 }
    );
  }
}
