import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    // Create Supabase client with service role key for backend operations
    // Using auth options to ensure service role bypasses RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Look up the promo code (case-insensitive)
    // Trim and uppercase the input code for consistency
    const trimmedCode = code.trim().toUpperCase();
    
    console.log('Validating promo code:', trimmedCode);
    console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
    console.log('Service Key:', supabaseServiceKey ? 'Set' : 'Missing');
    
    // First, test if we can query the table at all
    const { data: testQuery, error: testError } = await supabase
      .from('promo_codes')
      .select('code')
      .limit(1);
    
    if (testError) {
      console.error('Cannot query promo_codes table:', testError);
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Database connection error. Please contact support.',
          debug: process.env.NODE_ENV === 'development' ? { error: testError.message } : undefined
        },
        { status: 200 }
      );
    }
    
    // Try case-insensitive search first (more reliable)
    let { data: promoCode, error } = await supabase
      .from('promo_codes')
      .select('*')
      .ilike('code', trimmedCode)
      .maybeSingle();

    // If not found with ilike, try exact match
    if (error || !promoCode) {
      console.log('Case-insensitive search failed, trying exact match. Error:', error);
      const { data: promoCodeExact, error: errorExact } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', trimmedCode)
        .maybeSingle();
      
      if (!errorExact && promoCodeExact) {
        promoCode = promoCodeExact;
        error = null;
      } else {
        console.error('Promo code lookup failed completely');
        console.error('Searched for code:', trimmedCode);
        console.error('ILike error:', error);
        console.error('Exact match error:', errorExact);
        
        // Debug: Check what codes exist
        const { data: allCodes } = await supabase
          .from('promo_codes')
          .select('code, active, expires_at')
          .limit(10);
        console.log('Available promo codes in database:', allCodes);
        
        return NextResponse.json(
          { 
            valid: false, 
            error: 'Invalid promo code',
            debug: process.env.NODE_ENV === 'development' ? { 
              searched: trimmedCode, 
              ilikeError: error?.message, 
              exactError: errorExact?.message,
              availableCodes: allCodes?.map(c => c.code)
            } : undefined
          },
          { status: 200 }
        );
      }
    }
    
    console.log('Found promo code:', promoCode?.code);

    // Check if code is active
    if (!promoCode.active) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'This promo code is no longer active' 
        },
        { status: 200 }
      );
    }

    // Check if code has expired
    if (promoCode.expires_at) {
      const expirationDate = new Date(promoCode.expires_at);
      if (expirationDate < new Date()) {
        return NextResponse.json(
          { 
            valid: false, 
            error: 'This promo code has expired' 
          },
          { status: 200 }
        );
      }
    }

    // Check usage limit
    if (promoCode.usage_limit && promoCode.usage_count >= promoCode.usage_limit) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'This promo code has reached its usage limit' 
        },
        { status: 200 }
      );
    }

    // Code is valid - return the discount details
    return NextResponse.json(
      { 
        valid: true,
        code: promoCode.code,
        discountType: promoCode.discount_type,
        discountValue: parseFloat(promoCode.discount_value),
        description: promoCode.description
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error validating promo code:', error);
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}

// Optional: Track promo code usage
export async function PUT(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get current promo code data
    const { data: promoData, error: fetchError } = await supabase
      .from('promo_codes')
      .select('usage_count')
      .ilike('code', code.trim())
      .single();

    if (fetchError || !promoData) {
      console.error('Error fetching promo code:', fetchError);
      return NextResponse.json(
        { error: 'Promo code not found' },
        { status: 404 }
      );
    }

    // Increment usage count
    const { error: updateError } = await supabase
      .from('promo_codes')
      .update({ 
        usage_count: (promoData.usage_count || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .ilike('code', code.trim());

    if (updateError) {
      console.error('Error updating promo code usage:', updateError);
      return NextResponse.json(
        { error: 'Failed to update usage count' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error tracking promo code usage:', error);
    return NextResponse.json(
      { error: 'Failed to track usage' },
      { status: 500 }
    );
  }
}

