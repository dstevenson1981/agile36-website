import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags');
    const subscribed = searchParams.get('subscribed');
    const search = searchParams.get('search');

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

    let query = supabase.from('email_contacts').select('*');

    // Apply filters
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim());
      query = query.contains('tags', tagArray);
    }

    if (subscribed !== null) {
      query = query.eq('subscribed', subscribed === 'true');
    }

    if (search) {
      query = query.or(`email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
    }

    const { data: contacts, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch contacts' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contacts: contacts || [],
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
    const { email, first_name, last_name, tags, subscribed = true } = await request.json();

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

