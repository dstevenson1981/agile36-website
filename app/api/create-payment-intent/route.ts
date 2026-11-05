import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import {
  discountPerSeatForCap,
  getCoursePromoCapByCode,
  linePricePerSeat,
  roundMoney,
} from '@/app/lib/course-promo-caps';
import { chargeCorporateAccount } from '@/app/lib/corporate-charge';
import { isCorporateCodeFormat, normalizeCorporateCode } from '@/app/lib/corporate';
import { findComboById } from '@/app/combo-courses/data';
import { anySchedulesOverlap, COMBO_DATE_OVERLAP_MESSAGE } from '@/app/lib/schedule-overlap';

export const dynamic = 'force-dynamic';

type StoredPromo = {
  code: string;
  discount_type: string;
  discount_value: string | number;
  active: boolean;
  expires_at: string | null;
  usage_limit: number | null;
  usage_count: number | null;
  course_slug?: string | null;
};

/** Class price minus the database promo. Ignores the dollar amount the browser already cached. */
async function priceWithDatabasePromo(args: {
  code: string;
  scheduleId: string;
  courseSlug: string;
  selectedPlan: unknown;
  quantity: unknown;
}): Promise<{ charge: number; discount: number; original: number } | { error: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { error: 'Server configuration error. Please contact support.' };
  const supabase = createClient(supabaseUrl, supabaseKey);

  let promo: StoredPromo | null = null;
  const { data: rpcData } = await supabase.rpc('get_promo_code_by_code', { p_code: args.code });
  const first = Array.isArray(rpcData) ? rpcData[0] : rpcData;
  if (first && typeof first === 'object') promo = first as StoredPromo;
  if (!promo) {
    const { data: row } = await supabase.from('promo_codes').select('*').ilike('code', args.code).maybeSingle();
    if (row) promo = row as StoredPromo;
  }
  if (!promo || !promo.active) return { error: 'This promo code is no longer active.' };
  if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
    return { error: 'This promo code has expired.' };
  }
  if (promo.usage_limit && (promo.usage_count ?? 0) >= promo.usage_limit) {
    return { error: 'This promo code has reached its usage limit.' };
  }
  const allowed = (promo.course_slug || '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);
  if (allowed.length > 0 && !allowed.includes(args.courseSlug)) {
    return { error: 'This promo code does not apply to this class.' };
  }

  const { data: schedule, error: schedErr } = await supabase
    .from('course_schedules')
    .select('price, course_slug')
    .eq('id', args.scheduleId)
    .maybeSingle();
  if (schedErr || !schedule) return { error: 'Invalid class for this promo code.' };
  if (args.courseSlug && schedule.course_slug !== args.courseSlug) {
    return { error: 'Invalid class for this promo code.' };
  }
  if (allowed.length > 0 && !allowed.includes(schedule.course_slug)) {
    return { error: 'This promo code does not apply to this class.' };
  }

  const basic = parseFloat(String(schedule.price));
  if (!Number.isFinite(basic) || basic <= 0) return { error: 'Invalid class price.' };
  const linePerSeat = linePricePerSeat(basic, args.selectedPlan);
  const qty = Math.max(1, Math.min(100, parseInt(String(args.quantity ?? 1), 10) || 1));
  const original = roundMoney(linePerSeat * qty);
  const value = Number(promo.discount_value);
  if (!Number.isFinite(value) || value <= 0) return { error: 'This promo code has no discount.' };
  const discount =
    promo.discount_type === 'percentage'
      ? roundMoney((original * value) / 100)
      : roundMoney(Math.min(value, original));
  return { charge: roundMoney(Math.max(0, original - discount)), discount, original };
}

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is required');
  }
  return new Stripe(secretKey);
};

/** Derive combo checkout from comboId / courseSlug — do not trust client isCombo alone. */
function resolveComboCheckout(body: {
  isCombo?: unknown;
  comboId?: unknown;
  courseSlug?: unknown;
}): { isCombo: boolean; comboId: string; catalogPrice: number | null } {
  const rawComboId = typeof body.comboId === 'string' ? body.comboId.trim() : '';
  const slug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
  const fromSlug = slug.startsWith('combo-') ? slug.slice('combo-'.length) : '';
  const comboId = rawComboId || fromSlug;
  const catalog = comboId ? findComboById(comboId) : undefined;
  const isCombo = Boolean(body.isCombo) || Boolean(comboId);
  return {
    isCombo,
    comboId: catalog ? catalog.id : comboId,
    catalogPrice: catalog ? catalog.comboPrice : null,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      currency = 'usd',
      scheduleId,
      courseSlug,
      courseName,
      selectedPlan,
      quantity,
      customerEmail,
      customerName,
      enrollmentData,
      promoCode,
      promoDiscount,
      originalAmount,
    } = body;

    const { isCombo, comboId, catalogPrice } = resolveComboCheckout(body);

    // Combo checkouts cannot use promo codes, site coupons, or corporate billing
    const effectivePromoCode = isCombo ? '' : (promoCode || '');
    const effectivePromoDiscount = isCombo ? 0 : (promoDiscount ?? 0);

    const scheduleIdsRaw = body.scheduleIds;
    const scheduleIdsArr = scheduleIdsRaw
      ? (Array.isArray(scheduleIdsRaw) ? scheduleIdsRaw : String(scheduleIdsRaw).split(',').filter(Boolean))
      : [];
    const effectiveScheduleId = isCombo && scheduleIdsArr.length
      ? scheduleIdsArr[0]
      : scheduleId;

    if (amount == null || amount === '' || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (!effectiveScheduleId) {
      return NextResponse.json(
        { error: 'Schedule ID is required' },
        { status: 400 }
      );
    }

    if (isCombo && scheduleIdsArr.length > 1) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json(
          { error: 'Server configuration error. Please contact support.' },
          { status: 500 },
        );
      }
      const overlapClient = createClient(supabaseUrl, supabaseKey);
      const { data: selectedSchedules, error: overlapErr } = await overlapClient
        .from('course_schedules')
        .select('id, start_date, end_date, timezone')
        .in('id', scheduleIdsArr);
      const uniqueIds = Array.from(new Set(scheduleIdsArr));
      if (overlapErr || !selectedSchedules || selectedSchedules.length !== uniqueIds.length) {
        return NextResponse.json(
          { error: 'One of the selected classes could not be found.' },
          { status: 400 },
        );
      }
      if (scheduleIdsArr.length !== uniqueIds.length || anySchedulesOverlap(selectedSchedules)) {
        return NextResponse.json(
          { error: COMBO_DATE_OVERLAP_MESSAGE },
          { status: 400 },
        );
      }
    }
    
    // Validate and prepare customer data
    const trimmedEmail = customerEmail?.trim() || '';
    const trimmedName = customerName?.trim() || '';
    
    if (!trimmedEmail) {
      return NextResponse.json(
        { error: 'Customer email is required' },
        { status: 400 }
      );
    }
    
    if (!trimmedName) {
      console.warn('Customer name not provided - this may cause issues with customer records');
      // Name should be provided from the form, but we'll continue with email only if needed
    }

    let stripe: Stripe;
    try {
      stripe = getStripe();
    } catch (error: any) {
      console.error('Stripe configuration error:', error);
      return NextResponse.json(
        { error: 'Stripe configuration error. Check STRIPE_SECRET_KEY.' },
        { status: 500 }
      );
    }

    // Create or retrieve Stripe customer
    let customer;
    try {
      console.log('Creating/retrieving customer:', { email: trimmedEmail, name: trimmedName });
      
      // Try to find existing customer by email
      const existingCustomers = await stripe.customers.list({
        email: trimmedEmail,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        console.log('Found existing customer:', customer.id, customer.email, customer.name);
        
        // Always update existing customer with latest info to ensure name and email are current
        const updateData: any = {
          email: trimmedEmail, // Always set email
        };
        
        // Always set name if provided - this ensures the customer has a name in Stripe
        if (trimmedName) {
          updateData.name = trimmedName;
        } else {
          console.warn('No customer name provided for existing customer update');
        }
        
        if (enrollmentData?.phone && enrollmentData.phone.trim()) {
          updateData.phone = enrollmentData.phone.trim();
        }
        
        // Always update to ensure email and name are set
        console.log('Updating customer with:', updateData);
        customer = await stripe.customers.update(customer.id, updateData);
        console.log('Customer updated:', customer.id, customer.email, customer.name);
      } else {
        // Create new customer with all available info
        const customerData: any = {
          email: trimmedEmail,
        };
        
        // Always set name if provided - this ensures the customer has a name in Stripe
        if (trimmedName) {
          customerData.name = trimmedName;
        } else {
          console.warn('No customer name provided for new customer creation');
        }
        
        if (enrollmentData?.phone && enrollmentData.phone.trim()) {
          customerData.phone = enrollmentData.phone.trim();
        }
        
        customerData.metadata = {
          courseSlug: (isCombo && comboId ? `combo-${comboId}` : courseSlug) || '',
          ...(isCombo && comboId ? { comboId } : {}),
          source: isCombo ? 'combo_enrollment' : 'course_enrollment',
        };
        
        console.log('Creating new customer with:', customerData);
        customer = await stripe.customers.create(customerData);
        console.log('Customer created:', customer.id, customer.email, customer.name);
      }
    } catch (error: any) {
      console.error('Error creating/retrieving customer:', error);
      // Don't continue without customer - throw error
      throw new Error(`Failed to create/retrieve customer: ${error.message}`);
    }
    
    // Ensure we have a customer before proceeding
    if (!customer || !customer.id) {
      throw new Error('Failed to create or retrieve customer');
    }
    
    // Double-check customer has email and name - always ensure they're set
    const needsUpdate: any = {};
    if (!customer.email || customer.email !== trimmedEmail) {
      console.warn('Customer missing or incorrect email, updating...');
      needsUpdate.email = trimmedEmail;
    }
    
    if (trimmedName && (!customer.name || customer.name !== trimmedName)) {
      console.warn('Customer missing or incorrect name, updating...');
      needsUpdate.name = trimmedName;
    }
    
    if (Object.keys(needsUpdate).length > 0) {
      customer = await stripe.customers.update(customer.id, needsUpdate);
      console.log('Customer final update:', customer.id, customer.email, customer.name);
    }
    
    // Final validation - email is required, name is optional but should be set if provided
    if (!customer.email) {
      throw new Error('Customer missing required email field');
    }

    let chargeAmountDollars = typeof amount === 'number' ? amount : parseFloat(String(amount));
    if (!Number.isFinite(chargeAmountDollars) || chargeAmountDollars < 0) {
      return NextResponse.json({ error: 'Invalid payment amount' }, { status: 400 });
    }

    // Combos: always charge catalog price; ignore any client-supplied discount amount
    if (isCombo) {
      if (catalogPrice == null || !Number.isFinite(catalogPrice) || catalogPrice <= 0) {
        return NextResponse.json(
          { error: 'Invalid combo course. Please return to combo courses and try again.' },
          { status: 400 },
        );
      }
      chargeAmountDollars = catalogPrice;
    }

    let promoDiscountDollars =
      typeof effectivePromoDiscount === 'number'
        ? effectivePromoDiscount
        : parseFloat(String(effectivePromoDiscount ?? 0));
    if (!Number.isFinite(promoDiscountDollars) || isCombo) promoDiscountDollars = 0;

    let stripeOriginalForMeta =
      typeof originalAmount === 'number'
        ? originalAmount
        : parseFloat(String(originalAmount ?? ''));
    if (!Number.isFinite(stripeOriginalForMeta) || isCombo) {
      stripeOriginalForMeta = chargeAmountDollars;
    }

    const courseCap = !isCombo ? getCoursePromoCapByCode(String(effectivePromoCode || '')) : null;
    if (courseCap && courseSlug === courseCap.courseSlug) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json(
          { error: 'Server configuration error. Please contact support.' },
          { status: 500 },
        );
      }
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: row, error: schedErr } = await supabase
        .from('course_schedules')
        .select('price, course_slug')
        .eq('id', effectiveScheduleId)
        .maybeSingle();
      if (schedErr || !row || row.course_slug !== courseCap.courseSlug) {
        return NextResponse.json(
          { error: 'Invalid schedule for this promo code.' },
          { status: 400 },
        );
      }
      const basic = parseFloat(String(row.price));
      if (!Number.isFinite(basic) || basic <= 0) {
        return NextResponse.json({ error: 'Invalid class price.' }, { status: 400 });
      }
      const linePerSeat = linePricePerSeat(basic, selectedPlan);
      const qty = Math.max(1, Math.min(100, parseInt(String(quantity ?? 1), 10) || 1));
      const capResult = discountPerSeatForCap(linePerSeat, courseCap);
      if (!capResult.ok) {
        return NextResponse.json(
          { error: 'This promo code does not apply to this class price.' },
          { status: 400 },
        );
      }
      promoDiscountDollars = roundMoney(capResult.discountPerSeat * qty);
      const baseTotal = roundMoney(linePerSeat * qty);
      chargeAmountDollars = roundMoney(baseTotal - promoDiscountDollars);
      stripeOriginalForMeta = baseTotal;
    } else if (!isCombo && String(effectivePromoCode || '').trim()) {
      const priced = await priceWithDatabasePromo({
        code: String(effectivePromoCode).trim(),
        scheduleId: String(effectiveScheduleId || ''),
        courseSlug: typeof courseSlug === 'string' ? courseSlug.trim() : '',
        selectedPlan,
        quantity,
      });
      if ('error' in priced) {
        return NextResponse.json({ error: priced.error }, { status: 400 });
      }
      chargeAmountDollars = priced.charge;
      promoDiscountDollars = priced.discount;
      stripeOriginalForMeta = priced.original;
    }

    // Get schedule details for better description
    const scheduleDate = enrollmentData?.scheduleDate || '';
    const scheduleTime = enrollmentData?.scheduleTime || '';
    const duration = enrollmentData?.duration || '';
    const comboScheduleMap = enrollmentData?.comboScheduleMap && typeof enrollmentData.comboScheduleMap === 'object'
      ? JSON.stringify(enrollmentData.comboScheduleMap)
      : '';
    const comboScheduleDates = enrollmentData?.comboScheduleDates && typeof enrollmentData.comboScheduleDates === 'object'
      ? JSON.stringify(enrollmentData.comboScheduleDates)
      : '';
    const comboCourseNames = enrollmentData?.comboCourseNames && typeof enrollmentData.comboCourseNames === 'object'
      ? JSON.stringify(enrollmentData.comboCourseNames)
      : '';
    const planName = selectedPlan === 'pro' ? 'Pro Plan' : 'Basic Plan';
    
    // Create detailed description for receipt
    // This description appears on the Stripe receipt and shows what was purchased
    // Format: "Course Name - Plan (Date) - Quantity"
    let receiptDescription = `${courseName}`;
    receiptDescription += ` - ${planName}`;
    if (scheduleDate) {
      receiptDescription += ` (Class: ${scheduleDate})`;
    }
    if (quantity > 1) {
      receiptDescription += ` - ${quantity} enrollments`;
    } else {
      receiptDescription += ` - 1 enrollment`;
    }

    const corporateCodeRaw =
      body.corporateCode ||
      enrollmentData?.corporateCode ||
      enrollmentData?.corporateBillingCode ||
      enrollmentData?.referralCode;
    const corporateCode = normalizeCorporateCode(
      typeof corporateCodeRaw === 'string' ? corporateCodeRaw : '',
    );
    if (isCombo && corporateCode && isCorporateCodeFormat(corporateCode)) {
      return NextResponse.json(
        {
          error:
            'Corporate and group discounts are not applicable to combo courses. Please pay the combo price by card.',
        },
        { status: 400 },
      );
    }
    if (corporateCode && isCorporateCodeFormat(corporateCode) && !isCombo) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json(
          { error: 'Server configuration error. Please contact support.' },
          { status: 500 },
        );
      }
      const supabase = createClient(supabaseUrl, supabaseKey);
      try {
        const { paymentIntent, companyName } = await chargeCorporateAccount(stripe, supabase, {
          corporateCode,
          amountDollars: chargeAmountDollars,
          currency,
          description: receiptDescription,
          employeeEmail: trimmedEmail,
          employeeName: trimmedName || trimmedEmail,
          metadata: {
            scheduleId: effectiveScheduleId,
            scheduleIds: isCombo && scheduleIdsArr.length ? scheduleIdsArr.join(',') : '',
            courseSlug: courseSlug || '',
            courseName: courseName || '',
            selectedPlan: selectedPlan || 'basic',
            quantity: String(quantity ?? 1),
            promoCode: effectivePromoCode || '',
            promoDiscount: promoDiscountDollars ? promoDiscountDollars.toString() : '0',
          },
        });
        return NextResponse.json({
          corporateCharge: true,
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
          companyName,
          amount: chargeAmountDollars,
        });
      } catch (corpError: unknown) {
        const message =
          corpError instanceof Error ? corpError.message : 'Corporate billing failed';
        return NextResponse.json({ error: message }, { status: 400 });
      }
    }

    // Ensure customer is set before creating payment intent
    if (!customer || !customer.id) {
      throw new Error('Customer is required for payment');
    }
    
    console.log('Creating payment intent with customer:', customer.id, customer.email, customer.name);
    
    // Create payment intent - card only to avoid Stripe rejecting unconfigured methods (google_pay, etc.)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(chargeAmountDollars * 100), // Convert to cents
      currency,
      customer: customer.id, // Always use customer ID, not optional
      receipt_email: trimmedEmail, // Send receipt email automatically
      statement_descriptor: 'Agile36 Course', // Shows on card statement (max 22 chars)
      description: receiptDescription, // This appears on the Stripe receipt as "Payment to Agile36" details
      payment_method_types: ['card'],
      metadata: {
        scheduleId: effectiveScheduleId,
        scheduleIds: (isCombo && scheduleIdsArr.length) ? scheduleIdsArr.join(',') : '',
        comboId: isCombo ? comboId : '',
        courseSlug: isCombo && comboId ? `combo-${comboId}` : (courseSlug || ''),
        courseName,
        selectedPlan: selectedPlan || 'basic',
        planName,
        quantity: quantity.toString(),
        customerEmail,
        customerName: customerName || '',
        customerId: customer?.id || '',
        enrollingFor: enrollmentData?.enrollingFor || 'myself',
        phone: enrollmentData?.phone || '',
        alternativeContact: enrollmentData?.alternativeContact || '',
        scheduleDate: scheduleDate || '',
        scheduleTime: scheduleTime || '',
        duration: duration || '',
        timezone: enrollmentData?.timezone || '',
        comboScheduleMap,
        comboScheduleDates,
        comboCourseNames,
        // Combos never store promo / discount metadata
        promoCode: isCombo ? '' : (effectivePromoCode || ''),
        promoDiscount: isCombo ? '0' : (promoDiscountDollars ? promoDiscountDollars.toString() : '0'),
        originalAmount: stripeOriginalForMeta.toString(),
        finalAmount: chargeAmountDollars.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      customerId: customer?.id,
      amount: paymentIntent.amount / 100, // Return amount in dollars
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

