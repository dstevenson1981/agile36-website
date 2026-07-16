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

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!selectedCourse) {
      newErrors.course = "Please select a course";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.course) {
      try {
        const response = await fetch("/api/store-coupon-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            course: selectedCourse,
            couponCode,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Failed to store email:", errorData);
        }
      } catch (error) {
        console.error("Error storing email:", error);
      }

      onClaimCoupon(email, selectedCourse);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
        <div className="hidden md:flex flex-col justify-end w-1/2 relative overflow-hidden min-h-[420px]">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, #ff9f5c 0%, #ff7a2e 38%, #fa5a1e 72%, #ea3d12 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#7c2d12]/90 via-[#7c2d12]/40 to-transparent" aria-hidden />
          <div className="relative z-10 p-8 mt-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">
              Limited-time offer
            </p>
            <h2 className="text-white text-2xl font-bold mb-3 leading-tight">
              $100 off your next course
            </h2>
            <p className="text-white/90 text-sm">
              Subscribe below to unlock your code.
            </p>
          </div>
        </div>

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

          <p className="md:hidden text-xs font-bold uppercase tracking-widest text-[#ea3d12] mb-1">
            Limited-time offer
          </p>
          <h3 className="text-gray-900 text-xl font-semibold mb-1">Get your $100 off code</h3>
          <p className="text-gray-600 text-sm mb-6">
            Enter your email and course interest — we&apos;ll reveal your code instantly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="coupon-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="coupon-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e53935] focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="coupon-course" className="block text-sm font-medium text-gray-700 mb-1">
                Select Course <span className="text-red-500">*</span>
              </label>
              <select
                id="coupon-course"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setErrors({ ...errors, course: "" });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e53935] focus:border-transparent ${
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
              className="w-full bg-[#e53935] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#c62828] transition-all shadow-lg hover:shadow-xl"
            >
              Reveal my $100 off code
            </button>

            <p className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>
                By providing your contact details you agreed to our{" "}
                <a href="/privacy-policy" className="text-[#e53935] hover:underline">
                  Privacy Policy
                </a>{" "}
                &{" "}
                <a href="/privacy-policy" className="text-[#e53935] hover:underline">
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
