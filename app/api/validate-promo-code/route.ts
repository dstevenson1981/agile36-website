import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  discountPerSeatForCap,
  getCoursePromoCapByCode,
  linePricePerSeat,
  roundMoney,
} from '@/app/lib/course-promo-caps';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

type PromoDiscountType = 'fixed' | 'percentage';

/** Matches promo_codes table. One property per column—do not duplicate (e.g. course_slug). */
type PromoCodeRow = {
  code: string;
  discount_type: PromoDiscountType;
  discount_value: string | number;
  description: string | null;
  active: boolean;
  expires_at: string | null;
  usage_limit: number | null;
  usage_count: number | null;
  course_slug?: string | null;
};

/** Per-seat price caps (POPM $399, SASM465 $465, etc.) — see course-promo-caps.ts */
function tryValidateCoursePriceCap(
  cap: ReturnType<typeof getCoursePromoCapByCode>,
  body: {
    courseSlug?: string;
    scheduleBasicPrice?: unknown;
    selectedPlan?: unknown;
  },
): NextResponse {
  if (!cap) {
    return NextResponse.json({ valid: false, error: 'Invalid promo code' }, { status: 200 });
  }
  const { courseSlug, scheduleBasicPrice, selectedPlan } = body;
  if (!courseSlug || typeof courseSlug !== 'string' || courseSlug.trim() !== cap.courseSlug) {
    return NextResponse.json(
      {
        valid: false,
        error: `This promo code is only valid for the ${cap.courseSlug} course`,
      },
      { status: 200 },
    );
  }
  const raw =
    typeof scheduleBasicPrice === 'number'
      ? scheduleBasicPrice
      : parseFloat(String(scheduleBasicPrice ?? ''));
  if (!Number.isFinite(raw) || raw <= 0) {
    return NextResponse.json(
      {
        valid: false,
        error: 'Unable to apply this code for this class. Refresh the page and try again.',
      },
      { status: 200 },
    );
  }
  const linePerSeat = linePricePerSeat(roundMoney(raw), selectedPlan);
  const result = discountPerSeatForCap(linePerSeat, cap);
  if (!result.ok) {
    return NextResponse.json(
      {
        valid: false,
        error: 'This promo code does not apply to this class price.',
      },
      { status: 200 },
    );
  }
  return NextResponse.json(
    {
      valid: true,
      code: cap.code,
      discountType: 'fixed' as const,
      discountValue: result.discountPerSeat,
      description: cap.description,
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, courseSlug, scheduleBasicPrice, selectedPlan, isCombo, comboId } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    const slug = typeof courseSlug === 'string' ? courseSlug.trim() : '';
    const isComboCheckout =
      Boolean(isCombo) ||
      Boolean(typeof comboId === 'string' && comboId.trim()) ||
      slug.startsWith('combo-');
    if (isComboCheckout) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Promo codes are not applicable to combo courses.',
        },
        { status: 200 },
      );
    }

    // Validate environment variables (needed for database-backed promo codes)
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Server configuration error. Please contact support.' 
        },
        { status: 200 }
      );
    }

    const trimmedCode = code.trim();
    if (!trimmedCode) {
      return NextResponse.json(
        { valid: false, error: 'Invalid promo code' },
        { status: 200 }
      );
    }

    const courseCap = getCoursePromoCapByCode(trimmedCode);
    if (courseCap) {
      return tryValidateCoursePriceCap(courseCap, { courseSlug, scheduleBasicPrice, selectedPlan });
    }

    // Create Supabase client with service role key for backend operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Prefer RPC for normalized lookup (trim + case-insensitive); fallback to ilike
    let promoCode: PromoCodeRow | null = null;
    const { data: rpcData } = await supabase.rpc('get_promo_code_by_code', {
      p_code: trimmedCode,
    });
    const first = Array.isArray(rpcData) ? rpcData[0] : rpcData;
    if (first && typeof first === 'object') {
      promoCode = first as unknown as PromoCodeRow;
    }
    if (!promoCode) {
      const { data: row, error } = await supabase
        .from('promo_codes')
        .select('*')
        .ilike('code', trimmedCode)
        .maybeSingle();
      if (!error && row) promoCode = row as unknown as PromoCodeRow;
    }

    if (!promoCode) {
      return NextResponse.json(
        { valid: false, error: 'Invalid promo code' },
        { status: 200 }
      );
    }

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
    if (promoCode.usage_limit && (promoCode.usage_count ?? 0) >= promoCode.usage_limit) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'This promo code has reached its usage limit' 
        },
        { status: 200 }
      );
    }

    // Check if code is course-specific and validate course match
    // If a promo code has a course_slug, it MUST only work for that specific course
    if (promoCode.course_slug) {
      // Require courseSlug to be provided when validating a course-specific code
      if (!courseSlug) {
        return NextResponse.json(
          { 
            valid: false, 
            error: 'This promo code is course-specific. Please use it on the correct course page.' 
          },
          { status: 200 }
        );
      }
      // Strict match - must match exactly (case-sensitive)
      if (courseSlug.trim() !== promoCode.course_slug.trim()) {
        return NextResponse.json(
          { 
            valid: false, 
            error: `This promo code is only valid for the ${promoCode.course_slug} course` 
          },
          { status: 200 }
        );
      }
    }

    // Code is valid - return the discount details
    return NextResponse.json(
      { 
        valid: true,
        code: promoCode.code,
        discountType: promoCode.discount_type,
        discountValue: Number(promoCode.discount_value),
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

