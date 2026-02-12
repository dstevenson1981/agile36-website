import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

    if (!amount || !scheduleId || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
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
          courseSlug: courseSlug || '',
          source: 'course_enrollment',
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

    // Get schedule details for better description
    const scheduleDate = enrollmentData?.scheduleDate || '';
    const scheduleTime = enrollmentData?.scheduleTime || '';
    const duration = enrollmentData?.duration || '';
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

    // Ensure customer is set before creating payment intent
    if (!customer || !customer.id) {
      throw new Error('Customer is required for payment');
    }
    
    console.log('Creating payment intent with customer:', customer.id, customer.email, customer.name);
    
    // Create payment intent with automatic payment methods
    // This will show card, Apple Pay, and other available methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      customer: customer.id, // Always use customer ID, not optional
      receipt_email: trimmedEmail, // Send receipt email automatically
      statement_descriptor: 'Agile36 Course', // Shows on card statement (max 22 chars)
      description: receiptDescription, // This appears on the Stripe receipt as "Payment to Agile36" details
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      metadata: {
        scheduleId,
        courseSlug,
        courseName,
        selectedPlan,
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
        promoCode: promoCode || '',
        promoDiscount: promoDiscount ? promoDiscount.toString() : '0',
        originalAmount: originalAmount ? originalAmount.toString() : amount.toString(),
        finalAmount: amount.toString(),
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

