import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are required');
  }
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10) || 50, 1), 200);

    const supabase = getSupabase();
    let query = supabase
      .from('corporate_accounts')
      .select(
        'id, company_name, contact_name, contact_email, contact_title, corp_code, status, authorized_email_domains, terms_accepted_at, welcome_email_sent_at, created_at, updated_at',
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (q) {
      const pattern = `%${q}%`;
      query = query.or(
        `company_name.ilike.${pattern},contact_email.ilike.${pattern},corp_code.ilike.${pattern},contact_name.ilike.${pattern}`,
      );
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ accounts: data ?? [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load corporate accounts';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const id = String(body.id ?? '').trim();
    const status = body.status;

    if (!id) {
      return NextResponse.json({ error: 'Account id is required' }, { status: 400 });
    }
    if (status !== 'active' && status !== 'inactive') {
      return NextResponse.json({ error: 'Status must be active or inactive' }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('corporate_accounts')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id, company_name, corp_code, status')
      .single();

    if (error) throw error;

    return NextResponse.json({ account: data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update account';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
