"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { combosForCategory, type ComboCategory } from "./data";

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

  const filteredCombos = combosForCategory(selectedCategory);

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-black px-4 py-14 sm:px-6 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm text-[#64748b]">
              <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
              <span>/</span>
              <span className="text-[#334155]">Combo Courses</span>
            </div>

            {/* Accent headline with underline flourish */}
            <div className="mb-3 inline-block">
              <span className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                <span className="text-[#d97706]">Two certifications.</span>{" "}
                <span className="text-[#1f2c4a]">One bundle.</span>
              </span>
              <svg viewBox="0 0 220 10" className="mt-1 h-2.5 w-56 text-[#d97706]" fill="none" aria-hidden>
                <path d="M3 7c40-5 80-5 107-3 32 2 70 2 107-2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            <h1 className="mb-5 text-4xl font-normal leading-[1.08] text-[#1f2c4a] md:text-5xl" style={{ letterSpacing: "-0.03em" }}>
              Stack credentials faster — and pay less doing it
            </h1>
            <p className="mb-7 max-w-xl text-lg leading-relaxed text-[#475569]">
              Pair complementary SAFe®, PMI, and AI certifications into one
              integrated path. Same live SPC-led instruction, bundled pricing,
              and a portfolio that compounds with every credential.
            </p>

            {/* Internal rating row */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex gap-1" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-[#1f2c4a]">4.9/5</span>
              <span className="text-sm text-[#64748b]">from 2,500+ learner reviews</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#combo-catalog"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1f2c4a]/25 px-7 py-3.5 font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
              >
                Explore Combo Courses
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1f2c4a] px-7 py-3.5 font-medium text-white shadow-lg shadow-[#1f2c4a]/20 transition-colors hover:bg-[#16243f]"
              >
                Contact Course Advisor
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: instructor visual with baked-in trust badges */}
          <div className="relative">
            <div aria-hidden className="absolute -inset-8 rounded-full bg-[#d97706]/[0.08] blur-3xl" />
            <Image
              src="/combo-hero.png"
              alt="Agile36 instructor — SAFe Silver Partner, SPC certified, live online training rated 4.9/5"
              width={1376}
              height={768}
              priority
              className="relative w-full rounded-3xl shadow-2xl shadow-[#1f2c4a]/15 ring-1 ring-[#1f2c4a]/10"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="combo-catalog" className="w-full scroll-mt-24 py-16 px-4 sm:px-6 lg:px-20 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-normal text-[#1f2c4a] mb-10 text-center" style={{ letterSpacing: "-0.03em" }}>
            Key Benefits of Combo Courses
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center rounded-2xl liquid-glass p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]"
              >
                <div className="w-16 h-16 rounded-xl border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06] flex items-center justify-center text-[#d97706] mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-medium text-[#1f2c4a] mb-2">{benefit.title}</h3>
                <p className="text-[#64748b] text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Schedule with Tabs */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-normal text-[#1f2c4a] mb-8" style={{ letterSpacing: "-0.03em" }}>Unbeatable Saving Combo Schedule</h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                  selectedCategory === tab.id
                    ? "bg-[#1f2c4a] text-white"
                    : "liquid-glass text-[#475569] hover:text-[#1f2c4a]"
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
                className="rounded-2xl liquid-glass p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] flex flex-col relative overflow-hidden"
              >
                {combo.trending && (
                  <div className="absolute top-0 left-0 bg-[#d97706] text-white text-xs font-bold px-3 py-1 -rotate-45 -translate-x-6 translate-y-2">
                    TRENDING
                  </div>
                )}
                <button
                  type="button"
                  className="absolute top-3 right-3 p-1.5 text-[#94a3b8] hover:text-[#1f2c4a] rounded transition-colors"
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
                        <span className="text-[#94a3b8] font-bold">+</span>
                      )}
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06] flex-shrink-0">
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

                <h3 className="text-lg font-medium text-[#1f2c4a] mb-2">{combo.name}</h3>

                {combo.enrolled && (
                  <p className="text-xs text-[#94a3b8] mb-3">{combo.enrolled} enrolled • Live Classroom</p>
                )}

                <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                  <span className="text-xl font-bold text-[#1f2c4a]">USD {combo.comboPrice.toLocaleString()}</span>
                  <span className="text-sm text-[#94a3b8] line-through">USD {combo.originalPrice.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-[#d97706] bg-[#d97706]/10 border border-[#d97706]/20 px-2 py-0.5 rounded flex items-center gap-1">
                    {combo.discount.toLocaleString()} off
                  </span>
                </div>

                <div className="mt-auto">
                  <Link
                    href={`/combo-courses/schedule?combo=${combo.id}`}
                    className="inline-flex items-center justify-center w-full bg-[#1f2c4a] text-white font-medium py-3 px-4 rounded-lg transition-colors hover:bg-[#16243f] text-sm"
                  >
                    ENROLL NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCombos.length === 0 && (
            <div className="text-center py-12 rounded-2xl liquid-glass">
              <p className="text-[#64748b]">No combo courses found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Unlock More */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-normal text-[#1f2c4a] mb-5 text-center" style={{ letterSpacing: "-0.03em" }}>Unlock More with Combo Courses</h2>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[#475569] text-sm">
            <li>Learn Multiple Skills Together</li>
            <li>Dual/Multiple Certifications</li>
            <li>Save More, Gain More</li>
            <li>Flexible Learning Access</li>
            <li>Career-Ready Curriculum</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-black py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-normal text-[#1f2c4a] mb-8" style={{ letterSpacing: "-0.03em" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl liquid-glass overflow-hidden transition-colors duration-300 hover:border-[#1f2c4a]/25"
              >
                <summary className="px-5 py-4 cursor-pointer font-medium text-[#1f2c4a] list-none flex items-center justify-between">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-[#94a3b8] group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-[#64748b] text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
