import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const CONTACT_COLUMNS =
  'id, email, first_name, last_name, role, company, tags, subscribed, blocked, blocked_at, blocked_reason, created_at';

function formatContact(contact: any) {
  return {
    ...contact,
    tags: Array.isArray(contact.tags)
      ? contact.tags
      : contact.tags
        ? [contact.tags]
        : null,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags');
    const subscribed = searchParams.get('subscribed');
    const blocked = searchParams.get('blocked');
    const search = searchParams.get('search');
    const limitParam = searchParams.get('limit');
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize');

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

    const applyFilters = (query: any) => {
      if (tags) {
        const tagArray = tags.split(',').map((t) => t.trim()).filter(Boolean);
        if (tagArray.length > 0) {
          // contains() with an array checks that ALL are present (AND).
          query = query.contains('tags', tagArray);
        }
      }

      if (subscribed !== null && subscribed !== '') {
        query = query.eq('subscribed', subscribed === 'true');
      }

      if (blocked !== null && blocked !== '') {
        query = query.eq('blocked', blocked === 'true');
      }

      if (search) {
        const escaped = search.replace(/[%_,]/g, '');
        query = query.or(
          `email.ilike.%${escaped}%,first_name.ilike.%${escaped}%,last_name.ilike.%${escaped}%,role.ilike.%${escaped}%,company.ilike.%${escaped}%`
        );
      }

      return query.order('created_at', { ascending: false });
    };

    // Paginated mode (admin Contacts UI) — single range query, light payload.
    // Bulk mode only when `limit` is explicitly requested (campaign audience picker).
    if (!limitParam) {
      const page = Math.max(parseInt(pageParam || '1', 10) || 1, 1);
      const pageSize = Math.min(
        Math.max(parseInt(pageSizeParam || '50', 10) || 50, 1),
        200
      );
      const start = (page - 1) * pageSize;
      const end = start + pageSize - 1;

      let query = supabase
        .from('email_contacts')
        .select(CONTACT_COLUMNS, { count: 'exact' });
      query = applyFilters(query);

      const { data, error, count } = await query.range(start, end);

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

      const formattedContacts = (data || []).map(formatContact);

      return NextResponse.json({
        success: true,
        contacts: formattedContacts,
        count: count ?? formattedContacts.length,
        page,
        pageSize,
        totalPages: count != null ? Math.max(Math.ceil(count / pageSize), 1) : 1,
      });
    }

    // Legacy bulk mode (campaign audience picker) — still pages server-side
    // to work around PostgREST max_rows, but only when explicitly requested.
    const requestedLimit = limitParam ? parseInt(limitParam, 10) : 10000;
    const effectiveLimit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(requestedLimit, 1), 50000)
      : 10000;
    const bulkPageSize = 1000;

    const allContacts: any[] = [];
    let totalCount: number | null = null;
    let page = 0;

    while (allContacts.length < effectiveLimit) {
      const start = page * bulkPageSize;
      const end = start + bulkPageSize - 1;

      let query = supabase
        .from('email_contacts')
        .select(CONTACT_COLUMNS, page === 0 ? { count: 'exact' } : undefined);
      query = applyFilters(query);

      const { data, error, count } = await query.range(start, end);

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

      if (data.length < bulkPageSize) break;
      page++;
    }

    const contacts = allContacts.slice(0, effectiveLimit).map(formatContact);

    return NextResponse.json({
      success: true,
      contacts,
      count: totalCount ?? contacts.length,
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
      .upsert(
        {
          email: email.toLowerCase().trim(),
          first_name: first_name || null,
          last_name: last_name || null,
          role: role || null,
          company: company || null,
          tags: tags && tags.length > 0 ? tags : null,
          subscribed,
        },
        {
          onConflict: 'email',
        }
      )
      .select(CONTACT_COLUMNS)
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
