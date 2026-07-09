"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import InternationalPhoneInput from "@/app/components/InternationalPhoneInput";
import CorporateBillingCodeField from '@/app/components/checkout/CorporateBillingCodeField';
import { handleCreatePaymentIntentResult } from '@/app/lib/checkout-corporate';
import AvailablePromoCodes from "@/app/components/AvailablePromoCodes";
import { useCheckoutStepScroll } from "@/app/hooks/useCheckoutStepScroll";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scheduleId = searchParams.get('schedule');
  const courseSlug = searchParams.get('course') || 'certified-ai-product-manager';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [enrollmentQuantity, setEnrollmentQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [courseName, setCourseName] = useState("Certified AI Product Manager™");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoDiscountType, setPromoDiscountType] = useState<'fixed' | 'percentage'>('fixed');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [showAlternativeContact, setShowAlternativeContact] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useCheckoutStepScroll(currentStep, clientSecret);


  const resetPaymentIntentIfNeeded = () => {
    if (clientSecret && currentStep === 3) {
      setClientSecret(null);
      setPaymentIntentId(null);
      setCurrentStep(2);
    }
  };
  
  const [enrollmentFormData, setEnrollmentFormData] = useState({
    enrollingFor: 'myself',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    alternativeContact: '',
    referralCode: '',
    corporateBillingCode: '',
  });

  const courseNames: { [key: string]: string } = {
    'ai-agent-builder': 'No-Code AI Agents & Automation™',
    'certified-ai-product-manager': 'Certified AI Product Manager™',
    'leading-safe': 'AI-Empowered Leading SAFe® / SAFe Agilist',
    'scrum-master': 'AI-Empowered SAFe Scrum Master',
    'product-owner-manager': 'AI-Empowered SAFe Product Owner/Product Manager',
    'lean-portfolio-management': 'Lean Portfolio Management',
    'agile-product-management': 'SAFe Agile Product Management',
    'safe-for-teams': 'AI-Empowered SAFe for Teams',
    'certified-genai-practitioner': 'Certified GenAI Practitioner™',
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!scheduleId) {
        // Redirect to schedule page if no schedule ID
        router.push(`/courses/certified-ai-product-manager/schedule`);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/course-schedules?course_slug=${courseSlug}&status=active`);
        const result = await response.json();
        if (result.success) {
          const data = result.data || [];
          const schedule = data.find((s: any) => s.id === scheduleId);
          if (schedule) {
            setSelectedSchedule(schedule);
            setEnrollmentQuantity(1);
          } else {
            // Schedule not found, redirect to schedule page
            router.push(`/courses/certified-ai-product-manager/schedule`);
          }
        } else {
          router.push(`/courses/certified-ai-product-manager/schedule`);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
        router.push(`/courses/certified-ai-product-manager/schedule`);
      } finally {
        setIsLoading(false);
      }
    };

    const displayName = courseNames[courseSlug] || 'Course';
    setCourseName(displayName);
    fetchSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId, courseSlug, router]);

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const opts = { month: 'short' as const, day: 'numeric' as const, timeZone: 'America/New_York' as const };
    const startFormatted = start.toLocaleDateString('en-US', opts);
    const endFormatted = end.toLocaleDateString('en-US', { ...opts, year: 'numeric' as const });
    return `${startFormatted} - ${endFormatted}`;
  };

  const formatTime = (time: string, timezone: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const tz = timezone.split('/').pop();
    return `${displayHour}:${minutes} ${ampm}${tz ? ` (${tz})` : ''}`;
  };

  const calculateDiscount = (originalPrice: number, salePrice: number) => {
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  const hasValidAttendeeList = (value: string) => {
    const emailRegex = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/;
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .some((line) => emailRegex.test(line));
  };

  const handleEnrollingForChange = (value: 'myself' | 'someoneElse') => {
    setEnrollmentFormData({ ...enrollmentFormData, enrollingFor: value });
    if (value === 'someoneElse') {
      setShowAlternativeContact(true);
    }
  };

  const handleApplyPromoCode = async (codeOverride?: string) => {
    const code = (codeOverride ?? promoCodeInput.trim()).trim();
    
    if (!code) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsValidatingPromo(true);
    setPromoError(null);

    try {
      const response = await fetch('/api/validate-promo-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, courseSlug }),
      });

      const data = await response.json();

      if (data.valid) {
        setAppliedPromoCode(data.code);
        setPromoDiscountType(data.discountType);
        setPromoDiscount(data.discountValue);
        setPromoCodeInput('');
        setPromoError(null);
        resetPaymentIntentIfNeeded();
      } else {
        setPromoError(data.error || 'Invalid promo code');
        setAppliedPromoCode(null);
        setPromoDiscount(0);
      }
    } catch (error) {
      console.error('Error validating promo code:', error);
      setPromoError('Failed to validate promo code. Please try again.');
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const handleRemovePromoCode = () => {
    setAppliedPromoCode(null);
    setPromoDiscount(0);
    setPromoDiscountType('fixed');
    setPromoError(null);
    resetPaymentIntentIfNeeded();
  };

  const handleContinue = async () => {
    if (currentStep === 1) {
      // Validate Basic Details
      if (!enrollmentFormData.firstName || !enrollmentFormData.lastName || !enrollmentFormData.email || !enrollmentFormData.phone) {
        alert('Please fill in all required fields');
        return;
      }

      if (
        enrollmentFormData.enrollingFor === 'someoneElse' &&
        !hasValidAttendeeList(enrollmentFormData.alternativeContact)
      ) {
        setShowAlternativeContact(true);
        alert('Please add at least one attendee name and email (one per line).');
        return;
      }
      
      // Save enrollment lead to database
      try {
        const response = await fetch('/api/save-enrollment-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            scheduleId: selectedSchedule.id,
            courseSlug,
            courseName,
            enrollingFor: enrollmentFormData.enrollingFor,
            firstName: enrollmentFormData.firstName,
            lastName: enrollmentFormData.lastName,
            email: enrollmentFormData.email,
            phone: enrollmentFormData.phone,
            alternativeContact: enrollmentFormData.alternativeContact,
            referralCode: enrollmentFormData.referralCode,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Error saving enrollment lead:', data.error);
          // Don't block the user from continuing, but log the error
        }
      } catch (error) {
        console.error('Error saving enrollment lead:', error);
        // Don't block the user from continuing
      }
      
      // Skip plan selection, go directly to payment
      await createPaymentIntent();
    }
  };

  const createPaymentIntent = async () => {
    if (!selectedSchedule) return;

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // Calculate discount at the time of payment intent creation to ensure it's current
      const basePrice = parseFloat(selectedSchedule.price);
      const baseTotal = basePrice * enrollmentQuantity;
      
      // Apply promo code discount
      let calculatedPromoDiscount = 0;
      if (appliedPromoCode && promoDiscount > 0) {
        if (promoDiscountType === 'fixed') {
          calculatedPromoDiscount = Math.min(promoDiscount, baseTotal);
        } else {
          // percentage
          calculatedPromoDiscount = (baseTotal * promoDiscount) / 100;
        }
      }
      
      const finalAmount = Math.max(0, baseTotal - calculatedPromoDiscount);
      
      // Log for debugging
      console.log('Creating payment intent:', {
        basePrice,
        baseTotal,
        appliedPromoCode,
        promoDiscount,
        promoDiscountType,
        calculatedPromoDiscount,
        finalAmount,
      });

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          scheduleId: selectedSchedule.id,
          courseSlug,
          courseName,
          quantity: enrollmentQuantity,
          customerEmail: enrollmentFormData.email,
          customerName: `${enrollmentFormData.firstName} ${enrollmentFormData.lastName}`,
          promoCode: appliedPromoCode || null,
          promoDiscount: calculatedPromoDiscount || 0,
          originalAmount: baseTotal,
          corporateCode: enrollmentFormData.corporateBillingCode?.trim() || null,
          enrollmentData: {
            ...enrollmentFormData,
            scheduleDate: formatDateRange(selectedSchedule.start_date, selectedSchedule.end_date),
            scheduleTime: `${formatTime(selectedSchedule.start_time, selectedSchedule.timezone)} - ${formatTime(selectedSchedule.end_time, selectedSchedule.timezone)}`,
            duration: selectedSchedule.duration,
            timezone: selectedSchedule.timezone,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      const handled = await handleCreatePaymentIntentResult(data, {
        enrollmentData: {
          ...enrollmentFormData,
          scheduleDate: selectedSchedule ? formatDateRange(selectedSchedule.start_date, selectedSchedule.end_date) : '',
          scheduleTime: selectedSchedule ? `${formatTime(selectedSchedule.start_time, selectedSchedule.timezone)} - ${formatTime(selectedSchedule.end_time, selectedSchedule.timezone)}` : '',
          duration: selectedSchedule?.duration,
          timezone: selectedSchedule?.timezone,
        },
        successUrl: (paymentIntentId) => `/courses/certified-ai-product-manager/schedule/checkout/success?payment_intent=${paymentIntentId}`,
        onCardReady: (secret, piId) => {
          setClientSecret(secret);
          setPaymentIntentId(piId);
          setCurrentStep(2);
        },
      });
      if (!handled.handled) {
        throw new Error(handled.error || 'Failed to initialize payment');
      }
      if (data.corporateCharge) return;
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      setPaymentError(error.message || 'Failed to initialize payment');
      alert(error.message || 'Failed to initialize payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };



  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]"></div>
      </main>
    );
  }

  if (!selectedSchedule) {
    return null;
  }

  const basePrice = parseFloat(selectedSchedule.price);
  const listPrice =
    selectedSchedule.original_price != null && selectedSchedule.original_price !== ''
      ? parseFloat(selectedSchedule.original_price)
      : null;

  const baseTotal = basePrice * enrollmentQuantity;
  const totalOriginalPrice =
    listPrice != null ? listPrice * enrollmentQuantity : null;
  
  // Apply promo code discount
  let calculatedPromoDiscount = 0;
  if (appliedPromoCode && promoDiscount > 0) {
    if (promoDiscountType === 'fixed') {
      calculatedPromoDiscount = Math.min(promoDiscount, baseTotal);
    } else {
      // percentage
      calculatedPromoDiscount = (baseTotal * promoDiscount) / 100;
    }
  }
  
  const totalPrice = Math.max(0, baseTotal - calculatedPromoDiscount);
  const discount =
    listPrice != null && listPrice > basePrice
      ? calculateDiscount(listPrice, basePrice)
      : 0;

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content - Enrollment Form */}
          <div className="flex-1">
            {/* Step Navigation */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-[#d97706]' : 'text-[#64748b]'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 1 ? 'bg-[#d97706] text-white' : 'bg-[#1f2c4a]/10 text-[#64748b]'
                }`}>1</div>
                <span className="font-medium">Basic Details</span>
              </div>
              <div className="w-12 h-0.5 bg-[#1f2c4a]/20"></div>
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-[#d97706]' : 'text-[#64748b]'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 2 ? 'bg-[#d97706] text-white' : 'bg-[#1f2c4a]/10 text-[#64748b]'
                }`}>2</div>
                <span className="font-medium">Secure Payment</span>
              </div>
            </div>

            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center font-bold">1</div>
                  <h2 className="text-xl font-normal text-[#1f2c4a] tracking-[-0.03em]">Basic Details</h2>
                </div>

                <div className="space-y-6">
                  {/* Enrolling For */}
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-3">Enrolling for</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="enrollingFor"
                          value="myself"
                          checked={enrollmentFormData.enrollingFor === 'myself'}
                          onChange={() => handleEnrollingForChange('myself')}
                          className="w-4 h-4 accent-[#d97706]"
                        />
                        <span className="text-sm text-[#475569]">Myself</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="enrollingFor"
                          value="someoneElse"
                          checked={enrollmentFormData.enrollingFor === 'someoneElse'}
                          onChange={() => handleEnrollingForChange('someoneElse')}
                          className="w-4 h-4 accent-[#d97706]"
                        />
                        <span className="text-sm text-[#475569]">Someone else</span>
                      </label>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#475569] mb-2">
                        First Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={enrollmentFormData.firstName}
                        onChange={(e) => setEnrollmentFormData({ ...enrollmentFormData, firstName: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:outline-none focus:border-[#1f2c4a]/50"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#475569] mb-2">
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={enrollmentFormData.lastName}
                        onChange={(e) => setEnrollmentFormData({ ...enrollmentFormData, lastName: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:outline-none focus:border-[#1f2c4a]/50"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-2">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <InternationalPhoneInput
                      value={enrollmentFormData.phone}
                      onChange={(value) => setEnrollmentFormData({ ...enrollmentFormData, phone: value })}
                      required
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-2">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={enrollmentFormData.email}
                      onChange={(e) => setEnrollmentFormData({ ...enrollmentFormData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:outline-none focus:border-[#1f2c4a]/50"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <CorporateBillingCodeField
                    value={enrollmentFormData.corporateBillingCode}
                    onChange={(value) => setEnrollmentFormData({ ...enrollmentFormData, corporateBillingCode: value })}
                  />

                  {/* Alternative Contact */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowAlternativeContact(!showAlternativeContact)}
                      className="text-sm text-[#475569] hover:text-[#d97706] flex items-center gap-2 mb-2"
                    >
                      {showAlternativeContact ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                          Hide {enrollmentFormData.enrollingFor === 'someoneElse' ? 'Attendees' : 'Alternative Contact'}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          + {enrollmentFormData.enrollingFor === 'someoneElse' ? 'Add attendees' : 'Alternative contact'}
                        </>
                      )}
                    </button>
                    {showAlternativeContact && (
                      <div>
                        <label className="block text-sm font-medium text-[#475569] mb-2">
                          {enrollmentFormData.enrollingFor === 'someoneElse'
                            ? 'Attendee names and emails'
                            : 'Alternative Email'}
                        </label>
                        <textarea
                          value={enrollmentFormData.alternativeContact}
                          onChange={(e) => setEnrollmentFormData({ ...enrollmentFormData, alternativeContact: e.target.value })}
                          className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:outline-none focus:border-[#1f2c4a]/50"
                          rows={enrollmentFormData.enrollingFor === 'someoneElse' ? 4 : 2}
                          placeholder={
                            enrollmentFormData.enrollingFor === 'someoneElse'
                              ? "Enter one attendee per line:\nJane Doe - jane@example.com\nJohn Smith - john@example.com"
                              : "alternative.email@example.com"
                          }
                        />
                        {enrollmentFormData.enrollingFor === 'someoneElse' && (
                          <p className="mt-2 text-xs text-[#64748b]">
                            Add all attendee names and emails here. We will use this list for enrollment follow-up.
                          </p>
                        )}
                      </div>
                    )}
                  </div>


                  {/* Continue Button */}
                  <button
                    onClick={handleContinue}
                    className="w-full bg-[#1f2c4a] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#16243f] transition-colors flex items-center justify-center gap-2"
                  >
                    Continue &gt;
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Secure Payment */}
            {currentStep === 2 && clientSecret && (
              <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center font-bold">2</div>
                  <h2 className="text-xl font-normal text-[#1f2c4a] tracking-[-0.03em]">Secure Payment</h2>
                </div>

                {paymentError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-600 px-4 py-3 rounded-lg mb-6">
                    {paymentError}
                  </div>
                )}

                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#d97706',
                        colorBackground: '#ffffff',
                        colorText: '#1f2937',
                        colorDanger: '#ef4444',
                        fontFamily: 'system-ui, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '8px',
                      },
                    },
                  }}
                >
                  <PaymentForm
                    onSuccess={() => {
                      const params = new URLSearchParams({
                        schedule: scheduleId || '',
                        course: courseSlug,
                        amount: totalPrice.toFixed(2),
                      });
                      router.push(`/courses/certified-ai-product-manager/schedule/checkout/success?${params.toString()}`);
                    }}
                    onCancel={() => {
                      router.push(`/courses/certified-ai-product-manager/schedule?course=${courseSlug}`);
                    }}
                    enrollmentData={enrollmentFormData}
                    paymentIntentId={paymentIntentId || ''}
                    amount={totalPrice}
                  />
                </Elements>
              </div>
            )}
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-[#1f2c4a]">Order Summary</h3>
              </div>
              
              {/* Course Details */}
              <div className="bg-[#1f2c4a]/[0.04] border border-[#1f2c4a]/10 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-[#475569] bg-[#1f2c4a]/10 px-2 py-1 rounded">Standard</span>
                  <button className="text-[#64748b] hover:text-[#1f2c4a]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <h4 className="font-semibold text-[#1f2c4a] mb-3">{courseName}</h4>
                <div className="space-y-2 text-sm text-[#64748b]">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDateRange(selectedSchedule.start_date, selectedSchedule.end_date)} • {selectedSchedule.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTime(selectedSchedule.start_time, selectedSchedule.timezone)} - {formatTime(selectedSchedule.end_time, selectedSchedule.timezone)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => setEnrollmentQuantity(Math.max(1, enrollmentQuantity - 1))}
                      className="w-8 h-8 border border-[#1f2c4a]/20 rounded flex items-center justify-center hover:bg-[#1f2c4a]/10"
                    >
                      -
                    </button>
                    <span className="font-semibold text-[#1f2c4a]">{enrollmentQuantity}</span>
                    <button
                      onClick={() => setEnrollmentQuantity(enrollmentQuantity + 1)}
                      className="w-8 h-8 border border-[#1f2c4a]/20 rounded flex items-center justify-center hover:bg-[#1f2c4a]/10"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-[#1f2c4a]/[0.04] border border-[#1f2c4a]/10 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#64748b]">Subtotal</span>
                  <div className="flex items-center gap-2">
                    {totalOriginalPrice && (
                      <span className="text-sm text-[#64748b] line-through">${totalOriginalPrice ? totalOriginalPrice.toFixed(2) : '0.00'}</span>
                    )}
                    <span className="font-semibold text-[#1f2c4a]">${baseTotal.toFixed(2)}</span>
                  </div>
                </div>
                {appliedPromoCode && calculatedPromoDiscount > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#64748b]">Promo Code ({appliedPromoCode})</span>
                    <span className="text-sm font-semibold text-green-700">-${calculatedPromoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-[#1f2c4a]/15 pt-3 flex items-center justify-between">
                  <span className="font-bold text-[#1f2c4a]">Total</span>
                  <div className="flex items-center gap-2">
                    {appliedPromoCode && calculatedPromoDiscount > 0 && (
                      <span className="bg-green-500/15 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                        -${calculatedPromoDiscount.toFixed(0)}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="bg-[#d97706]/15 text-[#d97706] text-xs font-semibold px-2 py-1 rounded">{discount}% OFF</span>
                    )}
                    {totalOriginalPrice && (
                      <span className="text-sm text-[#64748b] line-through">${totalOriginalPrice ? totalOriginalPrice.toFixed(2) : '0.00'}</span>
                    )}
                    <span className="text-xl font-bold text-[#1f2c4a]">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-[#1f2c4a]/[0.04] border border-[#1f2c4a]/10 rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold text-[#475569] mb-2">Accepted Payment Methods:</p>
                <p className="text-xs text-[#64748b]">Credit/Debit Cards • Apple Pay</p>
              </div>

            
              {/* Promo Codes */}
              <div className="bg-[#1f2c4a]/[0.04] border border-[#1f2c4a]/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h4 className="font-semibold text-[#1f2c4a]">Promo Codes</h4>
                </div>
                <AvailablePromoCodes
                  appliedPromoCode={appliedPromoCode}
                  onSelectCode={(code) => handleApplyPromoCode(code)}
                  isValidatingPromo={isValidatingPromo}
                />
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Apply a Code"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyPromoCode()}
                    disabled={isValidatingPromo}
                    className="flex-1 px-3 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded text-sm text-[#1f2c4a] placeholder-[#94a3b8] focus:outline-none focus:border-[#1f2c4a]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button 
                    onClick={() => handleApplyPromoCode()}
                    disabled={isValidatingPromo || !promoCodeInput.trim()}
                    className="bg-[#1f2c4a] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#16243f] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isValidatingPromo ? 'Validating...' : 'Apply'}
                  </button>
                </div>
                {promoError && (
                  <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded">
                    <p className="text-xs text-red-600">{promoError}</p>
                  </div>
                )}
                {appliedPromoCode && (
                  <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-green-700">{appliedPromoCode}</span>
                        <p className="text-xs text-green-700">Promo code applied successfully</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleRemovePromoCode}
                      className="text-xs text-red-600 hover:text-red-200 font-semibold underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>


            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]"></div>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

