import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags');
    const subscribed = searchParams.get('subscribed');
    const blocked = searchParams.get('blocked');
    const search = searchParams.get('search');
    const limitParam = searchParams.get('limit');

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

    // NOTE:
    // Supabase/PostgREST often caps responses to 1000 rows per request (max_rows).
    // Even if the client calls .limit(50000), the API may still return only 1000.
    // To avoid "1000 recipients max" behavior, we page results here.

    const requestedLimit = limitParam ? parseInt(limitParam, 10) : 10000;
    const effectiveLimit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 50000) : 10000;
    const pageSize = 1000;

    const buildBaseQuery = (includeCount: boolean) => {
      let query = supabase.from('email_contacts').select('*', includeCount ? { count: 'exact' } : undefined as any);

      // Apply filters
      if (tags) {
        const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
        if (tagArray.length > 0) {
          // contains() with an array checks that ALL are present (AND). This matches multi-select behavior here.
          query = query.contains('tags', tagArray);
        }
      }

      if (subscribed !== null) {
        query = query.eq('subscribed', subscribed === 'true');
      }

      if (blocked !== null && blocked !== '') {
        query = query.eq('blocked', blocked === 'true');
      }

      if (search) {
        query = query.or(
          `email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%,role.ilike.%${search}%,company.ilike.%${search}%`
        );
      }

      return query.order('created_at', { ascending: false });
    };

    const allContacts: any[] = [];
    let totalCount: number | null = null;
    let page = 0;

    while (allContacts.length < effectiveLimit) {
      const start = page * pageSize;
      const end = start + pageSize - 1;

      const { data, error, count } = await buildBaseQuery(page === 0)
        .range(start, end);

      if (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to fetch contacts',
            details: error.message,
            code: error.code,
          },
          { status: 500 }
        );
      }

      if (page === 0 && typeof count === 'number') {
        totalCount = count;
      }

      if (!data || data.length === 0) break;

      allContacts.push(...data);

      if (data.length < pageSize) break;
      page++;
    }

    const contacts = allContacts.slice(0, effectiveLimit);

    // Ensure tags are properly formatted as arrays
    const formattedContacts = (contacts || []).map((contact: any) => ({
      ...contact,
      tags: Array.isArray(contact.tags) ? contact.tags : (contact.tags ? [contact.tags] : null)
    }));

    return NextResponse.json({
      success: true,
      contacts: formattedContacts,
      count: totalCount ?? formattedContacts.length,
    });
  } catch (error: any) {
    console.error('Error in contacts API:', error);
    return NextResponse.json(
      { error: `Failed to fetch contacts: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, first_name, last_name, role, company, tags, subscribed = true } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
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

    const { data, error } = await supabase
      .from('email_contacts')
      .upsert({
        email: email.toLowerCase().trim(),
        first_name: first_name || null,
        last_name: last_name || null,
        role: role || null,
        company: company || null,
        tags: tags && tags.length > 0 ? tags : null,
        subscribed,
      }, {
        onConflict: 'email',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating contact:', error);
      return NextResponse.json(
        { error: `Failed to create contact: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: data,
    });
  } catch (error: any) {
    console.error('Error in contacts API:', error);
    return NextResponse.json(
      { error: `Failed to create contact: ${error.message}` },
      { status: 500 }
    );
  }
}

