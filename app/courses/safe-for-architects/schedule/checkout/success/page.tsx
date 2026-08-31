"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const scheduleId = searchParams.get('schedule');
  const courseSlug = searchParams.get('course');
  const plan = searchParams.get('plan');
  const amount = searchParams.get('amount');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/15 mb-6">
            <svg className="h-8 w-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-normal text-[#1f2c4a] tracking-[-0.03em] mb-4">Payment Successful!</h1>
          <p className="text-lg text-[#64748b] mb-2">
            Thank you for your enrollment.
          </p>
          {amount && (
            <p className="text-sm text-[#64748b] mb-8">
              Amount paid: <span className="font-semibold">${amount}</span>
            </p>
          )}

          <div className="bg-[#1f2c4a]/[0.04] border border-[#1f2c4a]/10 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-[#1f2c4a] mb-4">What's Next?</h2>
            <ul className="space-y-3 text-sm text-[#475569]">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>You will receive a confirmation email with course details and access information.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Our team will contact you within 24 hours with additional course materials and login credentials.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Check your email for the course schedule and any pre-course materials.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses/safe-for-architects/schedule"
              className="px-6 py-3 border border-[#1f2c4a]/20 rounded-lg text-[#475569] font-medium hover:bg-[#1f2c4a]/10 transition-colors"
            >
              View Schedule
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-[#1f2c4a] text-white font-medium rounded-lg hover:bg-[#16243f] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]"></div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}

