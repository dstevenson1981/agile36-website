"use client";

import { useState } from "react";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimCoupon: (email: string, course: string) => void;
  /** Stored with the lead and shown in the success modal (default 100OFF) */
  couponCode?: string;
}

const courses = [
  "SAFe® 6.0 Scrum Master (SSM) Certification",
  "Leading SAFe® 6.0 Training",
  "SAFe Product Owner/Product Manager",
  "SAFe Agile Product Management",
  "SAFe Lean Portfolio Management",
  "SAFe DevOps",
  "SAFe for Teams",
  "Advanced SAFe Scrum Master",
  "SAFe Value Stream Mapping",
  "Achieving Responsible AI with SAFe",
  "Certified AI Product Manager",
  "Certified GenAI Practitioner",
  "AI Agent Builder",
  "AI-Driven Scrum Master",
  "Generative AI for Project Managers",
  "Executive GenAI Leadership",
  "PMP Certification",
];

export default function CouponModal({
  isOpen,
  onClose,
  onClaimCoupon,
  couponCode = "100OFF",
}: CouponModalProps) {
  const [email, setEmail] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [errors, setErrors] = useState({ email: "", course: "" });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", course: "" };

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate course
    if (!selectedCourse) {
      newErrors.course = "Please select a course";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.course) {
      // Store email in Supabase
      try {
        const response = await fetch('/api/store-coupon-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            course: selectedCourse,
            couponCode,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Failed to store email:', errorData);
          // Continue anyway - don't block user from getting coupon
        }
      } catch (error) {
        console.error('Error storing email:', error);
        // Continue anyway - don't block user from getting coupon
      }

      // Show coupon code
      onClaimCoupon(email, selectedCourse);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Left Side - Promotional Banner */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-red-600 to-red-700 p-8 w-1/2 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute top-8 left-4 w-12 h-12 bg-yellow-400 rounded-full opacity-10 blur-lg"></div>
          
          <div className="relative z-10">
            <h2 className="text-gray-900 text-2xl font-bold mb-4">
              Get $100 off your course.
            </h2>
            <p className="text-gray-800 text-sm mb-6">
              Gain high-value skills that drive real results.
            </p>
          </div>

          {/* $100 hint */}
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">$</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="relative flex-1 p-6 md:p-8 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 className="text-gray-800 text-xl font-semibold mb-6">Fill the Required Details</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email*"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Select Course <span className="text-red-500">*</span>
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setErrors({ ...errors, course: "" });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.course ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a course...</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="text-red-500 text-sm mt-1">{errors.course}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
            >
              Claim Coupon Code
            </button>

            <p className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>
                By providing your contact details you agreed to our{" "}
                <a href="/privacy-policy" className="text-red-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                &{" "}
                <a href="/privacy-policy" className="text-red-600 hover:underline">
                  Terms and Conditions
                </a>
                .
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

