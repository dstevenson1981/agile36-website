"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COMBO_COURSES, BADGES, type ComboCategory } from "./data";

const CATEGORY_TABS: { id: ComboCategory; label: string }[] = [
  { id: "safe", label: "Scaled Agile Combo" },
  { id: "pmi", label: "PMI Combo" },
  { id: "ai", label: "AI Combo" },
];

const BENEFITS = [
  {
    title: "Cost Effective Investment",
    desc: "Enjoy bundled pricing that's more affordable than enrolling in individual courses separately.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Broader Expertise with Flexible Schedules",
    desc: "Build a well-rounded skill set across related frameworks while learning at your own pace to fit professional commitments.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 4.18 4.18 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 4.18 4.18 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 4.18 4.18 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 4.18 4.18 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Flexible Schedule",
    desc: "Learn at your own pace with online access anytime. Live virtual classes available for most combos.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: "What are Agile36 Combo Courses?",
    a: "Agile36 Combo Courses combine two or more related certifications into a single, streamlined learning path to help you learn faster and save on fees.",
  },
  {
    q: "How do Combo Courses help save costs?",
    a: "We offer bundled pricing, which is significantly lower than enrolling for each training program and certification separately.",
  },
  {
    q: "Who should enroll in Combo Courses?",
    a: "Our combo courses are ideal for professionals aiming to expand skills across related frameworks quickly and efficiently.",
  },
  {
    q: "Are the certifications globally recognized?",
    a: "Yes, all certifications included in the combos are recognized by industry-leading bodies such as Scaled Agile, PMI, and SAFe worldwide.",
  },
  {
    q: "Will I get separate certificates for each course?",
    a: "Yes, you will receive individual certificates upon successful completion of each course and passing the exam (if applicable) in the combo from the respective accreditation bodies.",
  },
];

export default function ComboCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ComboCategory>("safe");

  const filteredCombos = COMBO_COURSES.filter((c) => c.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="w-full bg-[#f0f9ff] py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#01203d] mb-4">
            Maximize Your Learning with Combo Courses
          </h1>
          <p className="text-lg text-[#4f6882] max-w-3xl mb-4">
            Earn multiple globally recognized certifications faster and more affordably. Learn from industry experts, follow integrated learning paths, and gain a comprehensive understanding of related frameworks to enhance your professional portfolio.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            100% Money Back Guarantee — The full amount will be refunded if you are not satisfied with the class within 2 Hours. Terms and conditions apply.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm"
          >
            Contact Course Advisor
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-[#01203d] mb-6 text-center">
            Key Benefits of Combo Courses
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#f0f9ff] rounded-lg flex items-center justify-center text-[#01203d] mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Schedule with Tabs */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-20 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#01203d] mb-6">Unbeatable Saving Combo Schedule</h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedCategory === tab.id
                    ? "bg-[#01203d] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Combo Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCombos.map((combo) => (
              <div
                key={combo.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col relative overflow-hidden"
              >
                {combo.trending && (
                  <div className="absolute top-0 left-0 bg-[#fa4a23] text-white text-xs font-bold px-3 py-1 -rotate-45 -translate-x-6 translate-y-2">
                    TRENDING
                  </div>
                )}
                <button
                  type="button"
                  className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 rounded"
                  aria-label="Share"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                {/* Course badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {combo.courses.map((course, idx) => (
                    <div key={course.id} className="flex items-center gap-2">
                      {idx > 0 && (
                        <span className="text-gray-400 font-bold">+</span>
                      )}
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={course.badge}
                          alt={course.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{combo.name}</h3>

                {combo.enrolled && (
                  <p className="text-xs text-gray-500 mb-3">{combo.enrolled} enrolled • Live Classroom</p>
                )}

                <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                  <span className="text-xl font-bold text-[#fa4a23]">USD {combo.comboPrice.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through">USD {combo.originalPrice.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded flex items-center gap-1">
                    {combo.discount.toLocaleString()} off
                  </span>
                </div>

                <div className="mt-auto">
                  <Link
                    href={`/combo-courses/schedule?combo=${combo.id}`}
                    className="inline-flex items-center justify-center w-full bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-3 px-4 rounded-md transition-colors text-sm"
                  >
                    ENROLL NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCombos.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No combo courses found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Unlock More */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-[#01203d] mb-4 text-center">Unlock More with Combo Courses</h2>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-gray-700 text-sm">
            <li>Learn Multiple Skills Together</li>
            <li>Dual/Multiple Certifications</li>
            <li>Save More, Gain More</li>
            <li>Flexible Learning Access</li>
            <li>Career-Ready Curriculum</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-[#01203d] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <summary className="px-4 py-4 cursor-pointer font-semibold text-gray-900 list-none flex items-center justify-between">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
