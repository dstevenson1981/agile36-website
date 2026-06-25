import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getActiveCorporateAccountByCode, normalizeCorporateCode } from '@/app/lib/corporate';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are required');
  }
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const code = normalizeCorporateCode(body.code ?? body.corporateCode);
    if (!code) {
      return NextResponse.json({ valid: false, error: 'Enter a corporate billing code' }, { status: 200 });
    }

    const supabase = getSupabase();
    const account = await getActiveCorporateAccountByCode(supabase, code);
    if (!account) {
      return NextResponse.json(
        { valid: false, error: 'Invalid or inactive corporate billing code' },
        { status: 200 },
      );
    }

    return NextResponse.json({
      valid: true,
      code: account.corp_code,
      companyName: account.company_name,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Validation failed';
    return NextResponse.json({ valid: false, error: message }, { status: 500 });
  }
}
