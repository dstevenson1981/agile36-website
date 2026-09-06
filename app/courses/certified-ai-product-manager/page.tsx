"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CourseHeroSocialProof from "@/app/components/CourseHeroSocialProof";
import CourseHeroRightColumn from "@/app/components/CourseHeroRightColumn";
import TrustedByStrip from "@/app/components/TrustedByStrip";
import { courseLong } from "@/app/lib/course-seo";

export default function CertifiedAIProductManagerCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [expandedCurriculum, setExpandedCurriculum] = useState<number[]>([0]);

  const courseSlug = "certified-ai-product-manager";

  const toggleCurriculum = (index: number) => {
    setExpandedCurriculum(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      {/* Hero Section */}
      <section className="w-full bg-black py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <span className="text-[#334155]">Courses</span>
            <span>/</span>
            <span className="text-[#334155]">Certified AI Product Manager™ Certification Training</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] px-3 py-1.5">
                  <svg className="h-5 w-5 shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="text-sm font-semibold text-blue-700">English</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1f2c4a] sm:text-[2rem] lg:text-[2rem]">
                  {courseLong("certified-ai-product-manager")}
                </h1>
                <p className="mb-4 mt-4 text-[14.5px] font-normal leading-relaxed text-[#475569] md:mb-5 md:text-[15px]">
                  Prompting ChatGPT for research notes is last year&apos;s class. In this one you leave with a working app you built.
                </p>
                <CourseHeroSocialProof
                  enrolledLabel="2,500+ enrolled"
                  trailing={
                    <div className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 sm:px-4">
                      <svg className="h-5 w-5 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-bold text-emerald-700">Certification Exam Included</span>
                    </div>
                  }
                />

                {/* Key Benefits with Checkmarks */}
                <div className="space-y-3 mb-6">
                  {[
                    "Leave class with a live app, not a slide deck or a Figma file",
                    "Build with Cursor, v0, Bolt, and Lovable — real UI, data, and deploy",
                    "Put AI inside the product, not just in your PM workflow",
                    "Make product calls while you build: scope, data, auth, what to cut",
                    "Earn Certified AI Product Manager™ certification"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[14.5px] text-[#475569]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="px-6 py-3 liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium rounded-lg hover:bg-[#1f2c4a] hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </button>
                <Link 
                  href={`/courses/certified-ai-product-manager/schedule?course=${courseSlug}`}
                  className="px-6 py-3 bg-[#1f2c4a] text-white font-medium rounded-lg hover:bg-[#16243f] transition-colors inline-block text-center"
                >
                  View Schedules
                </Link>
              </div>
            </div>

            <CourseHeroRightColumn courseSlug={courseSlug}>
              <div className="mt-8 lg:mt-20">
                <img
                  src="/annie-spratt-QckxruozjRg-unsplash.jpg"
                  alt="Certified AI Product Manager"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </CourseHeroRightColumn>
          </div>
        </div>
      </section>

      {/* Trusted by industry leaders */}
      <TrustedByStrip />

      {/* Market Demand & Salary Section */}
      <section className="w-full bg-[#1f2c4a]/[0.03] py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              Why AI Product Managers Are Essential
            </h2>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto">
              Companies do not need another PM who can summarize a backlog in ChatGPT. They need PMs who can sit down and ship a working product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Stat 1 - Higher Compensation */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 transition-colors hover:bg-[#1f2c4a]/[0.1]">
              <div className="text-lg md:text-xl font-semibold text-[#1f2c4a] mb-3">Higher Compensation</div>
              <p className="text-sm text-[#64748b] mb-4">AI Product Managers command premium salaries compared to traditional PMs.</p>
              <div className="pt-4 border-t border-[#1f2c4a]/15">
                <div className="text-2xl md:text-3xl font-bold text-[#d97706]">$140K–$200K</div>
                <div className="text-xs md:text-sm text-[#64748b] mt-1">typical salary range</div>
              </div>
            </div>

            {/* Stat 2 - Faster Time-to-Market */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 transition-colors hover:bg-[#1f2c4a]/[0.1]">
              <div className="text-lg md:text-xl font-semibold text-[#1f2c4a] mb-3">Faster Time-to-Market</div>
              <p className="text-sm text-[#64748b] mb-4">PMs who can build skip the handoff and show a live product instead of a deck.</p>
              <div className="pt-4 border-t border-[#1f2c4a]/15">
                <div className="text-xl md:text-2xl font-bold text-[#d97706]">Ship in class</div>
                <div className="text-xs md:text-sm text-[#64748b] mt-1">a live URL, not a mock</div>
              </div>
            </div>

            {/* Stat 3 - Market Demand */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 transition-colors hover:bg-[#1f2c4a]/[0.1]">
              <div className="text-lg md:text-xl font-semibold text-[#1f2c4a] mb-3">High Demand</div>
              <p className="text-sm text-[#64748b] mb-4">Organizations actively seeking AI Product Managers for their teams.</p>
              <div className="pt-4 border-t border-[#1f2c4a]/15">
                <div className="text-xl md:text-2xl font-bold text-[#d97706]">Growing Need</div>
                <div className="text-xs md:text-sm text-[#64748b] mt-1">across all industries</div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="liquid-glass rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-6 text-center">Key Skills You&apos;ll Master</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-[#1f2c4a] text-sm md:text-base mb-1">Ship a working app in two days</div>
                  <div className="text-sm text-[#64748b]">The class deliverable</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#d97706] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-[#1f2c4a] text-sm md:text-base mb-1">Build with Cursor, v0, Bolt, and Lovable</div>
                  <div className="text-sm text-[#64748b]">The tools product teams ship with now</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-[#1f2c4a] text-sm md:text-base mb-1">Put AI inside the product</div>
                  <div className="text-sm text-[#64748b]">A real feature, not a writing assistant</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#d97706] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-[#1f2c4a] text-sm md:text-base mb-1">Product calls while you build</div>
                  <div className="text-sm text-[#64748b]">Scope, data, auth, what to cut</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-[#1f2c4a] text-sm md:text-base mb-1">Demo a live URL to stakeholders</div>
                  <div className="text-sm text-[#64748b]">Sell the product from the product</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key to Success Section */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-12 text-center">
            Our Key to Career Success
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                title: "Expert-Led Training" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ), 
                title: "Comprehensive Materials" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ), 
                title: "Networking Opportunities" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ), 
                title: "Flexible Payment Plans" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ), 
                title: "Real-World Case Studies" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ), 
                title: "You Leave With an App" 
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-[#1f2c4a]">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Pricing Card */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content area - 2 columns */}
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-12">
              {/* Tabs Navigation */}
              <div className="border-b border-[#1f2c4a]/15">
                <nav className="flex space-x-8">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "curriculum", label: "Curriculum" },
                    { id: "reviews", label: "Reviews" },
                    { id: "faq", label: "FAQ" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-[#d97706] text-[#d97706]"
                          : "border-transparent text-[#64748b] hover:text-[#1f2c4a] hover:border-[#1f2c4a]/40"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">Course Overview</h2>
                      <p className="text-base text-[#475569] mb-4">
                        This is a 2-day build class (10 hours). You pick a product, stand it up, and leave with a working app. We are not covering how to use AI in discovery, roadmapping, and launch. That class is everywhere, and it is stale.
                      </p>
                      <p className="text-base text-[#475569] mb-4">
                        You will use the same tools product teams ship with now — Cursor, v0, Bolt, Lovable — to get a real UI, real data, and a live URL. Then you put an AI feature inside the product itself and demo it. Stakeholders click the app. They do not sit through a deck about the app.
                      </p>
                      <p className="text-base text-[#475569] mb-4">
                        The product work still matters: what to cut, what to persist, what the AI should never do, and what you would hand an engineer next. You make those calls on something you built, not on a slide. You leave with the Certified AI Product Manager™ certification and a URL you can send on Monday.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What You&apos;ll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Stand up a working app in class and deploy it",
                          "Build with Cursor, v0, Bolt, and Lovable",
                          "Add data, auth, and a path a real user can complete",
                          "Ship an AI feature inside the product",
                          "Make scope and cut calls while you build",
                          "Demo a live URL instead of a prototype deck"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[14.5px] text-[#475569]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Who Should Attend</h3>
                      <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                        <li>Product Managers and Product Owners</li>
                        <li>Product Leaders and Directors</li>
                        <li>Product Marketing Managers</li>
                        <li>Innovation Leaders and Strategists</li>
                        <li>Anyone who wants to ship the first version themselves</li>
                      </ul>

                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4 mt-6">Certification</h3>
                      <p className="text-[14.5px] text-[#475569]">
                        You&apos;ll earn the <strong>Certified AI Product Manager™ Certification</strong>, issued through <strong>Accredible</strong>, the global credentialing platform used by top universities and training providers.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-[#64748b] mb-2">Course Curriculum</p>
                        <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">Certified AI Product Manager™ Course Curriculum</h2>
                      </div>
                      <button
                        onClick={() => setShowConsultationModal(true)}
                        className="px-6 py-3 liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium rounded-lg hover:bg-[#1f2c4a] hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Curriculum
                      </button>
                    </div>

                    <div className="space-y-4">
                      {[
                        { 
                          title: "Module 1: From idea to a shippable product",
                          topics: [
                            "Pick the app you will build and cut it to something you can ship in two days",
                            "Name the user, the job, and the one workflow that has to work",
                            "Set up Cursor, v0 / Bolt / Lovable, and hosting",
                            "Define done: a live URL someone else can click",
                            "Write the thinnest product brief that still guides a build"
                          ],
                          learningObjective: "Leave with a scoped product and a running project, not a PRD"
                        },
                        { 
                          title: "Module 2: Build the first working version",
                          topics: [
                            "Generate the app shell and get it running",
                            "Screens, navigation, and the core user path",
                            "Fake data vs real data — when each is enough",
                            "Fix what the tools get wrong instead of starting over",
                            "Keep the first version clickable before you add more"
                          ],
                          learningObjective: "Have a working first version, not a mock, before you go further"
                        },
                        { 
                          title: "Module 3: Data, auth, and the parts that make it an app",
                          topics: [
                            "Persist something: lists, records, or user-generated content",
                            "Add login or a simple access path",
                            "Connect an API or backend the product actually needs",
                            "Do not overbuild — ship the thinnest real version",
                            "Know the difference between a demo and an app people can use"
                          ],
                          learningObjective: "Turn the first version into something a real user can complete"
                        },
                        { 
                          title: "Module 4: Put AI in the product",
                          topics: [
                            "Add a real AI feature: generate, extract, classify, or assist",
                            "Treat prompting as product work, not chat",
                            "Design what the user sees when the model is wrong",
                            "Guardrails, cost, latency, and when not to use a model",
                            "Ship the capability inside the app, not in a sidebar of your workflow"
                          ],
                          learningObjective: "Ship an AI feature customers would recognize as part of the product"
                        },
                        { 
                          title: "Module 5: Finish and deploy",
                          topics: [
                            "Polish the path you will demo",
                            "Deploy to a live URL",
                            "Open it on your phone. Send it to someone else.",
                            "Break it, then fix what would embarrass you in a stakeholder meeting",
                            "Package the URL, the story, and the ask"
                          ],
                          learningObjective: "Leave with a public URL you can send after class"
                        },
                        { 
                          title: "Module 6: Product calls you only make when you are building",
                          topics: [
                            "What you cut and why",
                            "What you would hire an engineer for next",
                            "Price the next 30 days of work from the build, not a guess",
                            "Write the product story from the working app",
                            "Decide what is a bug, a feature, and a later release"
                          ],
                          learningObjective: "Practice PM judgment on something you shipped"
                        },
                        { 
                          title: "Module 7: Demo the live app",
                          topics: [
                            "Walk a stakeholder through the working product",
                            "Take feedback against a live build, not slides",
                            "Decide what to change tonight vs next week",
                            "Handle the questions only a real app surfaces",
                            "Close with a clear next ask"
                          ],
                          learningObjective: "Sell the product from the product"
                        },
                        { 
                          title: "Module 8: What you take back to work",
                          topics: [
                            "Run this build loop on Monday with your team",
                            "When to build it yourself vs when to brief engineering",
                            "Measure whether the app is doing the job",
                            "Repeat the loop on the next idea",
                            "Exam prep and certification"
                          ],
                          learningObjective: "Leave with a repeatable way to ship, not a one-off class project"
                        }
                      ].map((part, index) => (
                        <div key={index} className="border border-blue-200 rounded-lg bg-white">
                          <button
                            onClick={() => toggleCurriculum(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1f2c4a]/[0.1] transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-[#1f2c4a]">{part.title}</h3>
                            <svg 
                              className={`w-5 h-5 text-[#d97706] flex-shrink-0 transition-transform ${expandedCurriculum.includes(index) ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {expandedCurriculum.includes(index) && (
                            <div className="p-4 pt-0 border-t border-blue-100">
                              {part.topics.length > 0 && (
                                <div className="mb-4">
                                  <p className="font-semibold text-[#1f2c4a] mb-2">Topics:</p>
                                  <ul className="list-disc list-inside space-y-1 text-[#475569]">
                                    {part.topics.map((topic, topicIndex) => (
                                      <li key={topicIndex}>{topic}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {part.learningObjective && (
                                <div>
                                  <p className="font-semibold text-[#1f2c4a] mb-2">Learning Objective:</p>
                                  <p className="text-[#475569]">{part.learningObjective}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">Student Reviews</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-base font-semibold text-[#1f2c4a]">4.9 (156 reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[
                        { 
                          name: "Sarah Johnson", 
                          role: "Senior Product Manager", 
                          review: "I left with a live app, not a deck. We used the URL in a board meeting that week. That is a different conversation than walking through research slides. Build the thing.",
                          rating: 5
                        },
                        { 
                          name: "Michael Chen", 
                          role: "Product Director", 
                          review: "The build sessions are the class. Cursor and v0 got me to a working product the first day. I still cut features and write the story — I just do it against something people can click.",
                          rating: 5
                        },
                        { 
                          name: "Emily Rodriguez", 
                          role: "Product Lead", 
                          review: "I have sat through the 'use AI across the lifecycle' class. This is not that. We shipped an app, put an AI feature in it, and demoed a live URL. That is the job now.",
                          rating: 5
                        }
                      ].map((review, index) => (
                        <div key={index} className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-[#1f2c4a]">{review.name}</h4>
                              <p className="text-sm text-[#64748b]">{review.role}</p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-[14.5px] text-[#475569]">
                            {review.review}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {[
                  { q: "What is the Certified AI Product Manager™ Certification Training?", a: "A 2-day build class (10 hours). You leave with a working app you shipped in class — a live URL, not a prototype deck — and the Certified AI Product Manager™ certification." },
                  { q: "Do I need technical or coding experience?", a: "No traditional coding background is required. You build with Cursor, v0, Bolt, and Lovable. You will be making the product, not sitting through a lecture about tools." },
                        { q: "What is included in the course?", a: "Ten hours of live training, a working app you build and deploy, the tools and templates for the next build, course materials, and certification when you pass the exam." },
                        { q: "What tools will I learn to use?", a: "Cursor, v0, Bolt, and Lovable to ship the app. Claude and ChatGPT when they help the product, not as a substitute for building it." }
                      ].map((faq, index) => (
                        <div key={index} className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                          <h3 className="font-bold text-[#1f2c4a] mb-2">{faq.q}</h3>
                          <p className="text-[14.5px] text-[#475569]">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Card - Sticky */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24 h-fit">
              <div className="liquid-glass rounded-2xl p-6">
                <div className="text-center mb-6">
                  <div className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1f2c4a] sm:text-[2rem] lg:text-[2rem]">$400</div>
                  <div className="text-base text-[#64748b] line-through">$800</div>
                  <div className="text-sm text-emerald-600 font-semibold mt-2">50% OFF</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[#475569]">Live Virtual Training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[#475569]">Comprehensive Course Materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[#475569]">You leave with a live app</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[#475569]">Expert-Led Sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[#475569]">Lifetime Access to Materials</span>
                  </div>
                </div>

                <Link 
                  href={`/courses/certified-ai-product-manager/schedule?course=${courseSlug}`}
                  className="w-full liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium py-3 rounded-lg hover:bg-[#1f2c4a] hover:text-white transition-colors mb-4 inline-block text-center"
                >
                  View Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-[#64748b] mb-2">Certified AI Product Manager™ Course FAQs</p>
            <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">FAQs on Certified AI Product Manager™ Certification Training</h2>
          </div>

          {/* FAQ Category Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[
              { id: "courses", label: "FAQ Courses" },
              { id: "payment", label: "FAQ Payment" },
              { id: "generic", label: "FAQ Generic" }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveFaqCategory(category.id);
                  setExpandedFaqs([]);
                }}
                className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                  activeFaqCategory === category.id
                    ? "bg-[#1f2c4a] text-white"
                    : "bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="space-y-4">
            {(() => {
              const faqs = {
                courses: [
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. For questions, please email d.stevenson@agile36.com." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com so they can be processed promptly." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. For questions, please email d.stevenson@agile36.com." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials and resources. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is the Certified AI Product Manager™ Certification Training?", a: "A 2-day class where product managers build and deploy a working app. The old version of this course was about using AI across the product lifecycle. This one is about shipping." },
                  { q: "Who should take this course?", a: "Product Managers, Product Owners, Product Leaders, and anyone who is tired of briefing other people to build and wants to ship the first version themselves." },
                  { q: "What are the prerequisites for this course?", a: "Product sense helps. Traditional coding does not. You will be in the tools and shipping, not watching slides about AI." },
                  { q: "Will I receive a certification?", a: "Yes! Upon passing the certification exam, you'll receive the Certified AI Product Manager™ Certification, issued through Accredible, the global credentialing platform used by top universities and training providers." }
                ]
              };

              const currentFaqs = faqs[activeFaqCategory as keyof typeof faqs] || [];

              return currentFaqs.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div key={index} className="border border-[#1f2c4a]/15 rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        setExpandedFaqs(prev =>
                          prev.includes(index)
                            ? prev.filter(i => i !== index)
                            : [...prev, index]
                        );
                      }}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1f2c4a]/[0.06] transition-colors"
                    >
                      <h3 className="font-bold text-[#1f2c4a] pr-4">{faq.q}</h3>
                      <svg
                        className={`w-5 h-5 text-[#64748b] flex-shrink-0 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-[14.5px] text-[#475569]">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowConsultationModal(false)}
              className="absolute top-4 right-4 text-[#64748b] hover:text-[#1f2c4a]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-6">Get Course Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Tell us about your interest in this course"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1f2c4a] text-white font-medium py-3 rounded-lg hover:bg-[#16243f] transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

