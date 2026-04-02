"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WhyAgile36Section from "@/app/components/WhyAgile36Section";

export default function AdvancedScrumMasterCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const courseSlug = "advanced-scrum-master";

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#01203d]">Home</Link>
            <span>/</span>
            <span className="text-[#01203d]">SAFe</span>
            <span>/</span>
            <span className="text-[#01203d]">AI-Empowered SAFe Advanced Scrum Master (SASM)</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Advanced Scrum Master Badge, Rating and Enrolled */}
              <div className="flex items-center gap-6 flex-wrap">
                {/* Advanced Scrum Master Badge */}
                <div className="w-16 h-16 flex-shrink-0">
                  <Image
                    src="/Advanced_Logo.png"
                    alt="AI-Empowered SAFe Advanced Scrum Master Badge"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">5.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-900">25,000+ enrolled</span>
                </div>
                {/* English Language Indicator */}
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="text-sm font-semibold text-blue-700">English</span>
                </div>
                {/* Certification Exam Included Badge */}
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border-2 border-green-500">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-bold text-green-700">Certification Exam Included</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  AI-Empowered SAFe® Advanced Scrum Master (SASM)
                </h1>
                <p className="text-xl text-gray-900 font-bold mb-4">
                  Elevate your Scrum Master impact on the ART—flow, high-performing teams, and conflict skills—with responsible AI for facilitation
                </p>
                
                {/* Key Benefits with Checkmarks */}
                <div className="space-y-3 mb-6">
                  {[
                    "Improve flow and help teams collaborate across the Agile Release Train",
                    "Build high-performing teams and stronger cross-team facilitation",
                    "Grow conflict-management skills for healthy multi-team engagement",
                    "Strengthen ART performance through outcomes, I&A, and problem-solving",
                    "Apply AI fundamentals, prompting, and SAFe Studio resources for the SASM role—with human-in-the-loop judgment"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-base text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accredited By */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-base font-semibold text-gray-900">Accredited by</span>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded flex items-center justify-center overflow-hidden">
                    <Image
                      src="/Silver.png"
                      alt="Scaled Agile Silver Partner"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-20 h-20 rounded flex items-center justify-center overflow-hidden">
                    <Image
                    src="/Advanced_Logo.png"
                    alt="AI-Empowered SAFe Advanced Scrum Master Certification Badge"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="/AdvancedSM_Brochure.pdf" 
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-[#fa4a23] text-[#fa4a23] font-semibold rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </a>
                <Link 
                  href={`/courses/advanced-scrum-master/schedule?course=${courseSlug}`}
                  className="px-6 py-3 bg-[#fa4a23] text-white font-bold rounded-md hover:bg-[#e03d1a] transition-colors inline-block text-center"
                >
                  View Schedules
                </Link>
              </div>
            </div>

            {/* Right Side - Image Card */}
            <div className="lg:flex lg:justify-end">
              <div className="max-w-md w-full mt-8 lg:mt-20">
                <img 
                  src="/Advanced_Header.jpg" 
                  alt="AI-Empowered SAFe Advanced Scrum Master" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI amplification — aligned with Scaled Agile SASM positioning */}
      <section className="w-full bg-slate-50 py-10 px-4 sm:px-6 lg:px-20 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#01203d] mb-6 text-center">
            Leverage AI to amplify results
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
            The AI-Empowered SASM course shows how to use AI alongside Lean-Agile principles—so you spend less time on admin and more on high-impact facilitation.
          </p>
          <ul className="grid md:grid-cols-2 gap-5 text-gray-800">
            {[
              "AI fundamentals and prompting tailored to the SASM role—for templates, acceptance criteria, and splitting complex stories",
              "Use SAFe CoPilot-style guidance to reference Framework practices and support data-backed flow recommendations",
              "Apply AI to high-impact work: retrospective themes across teams, ART-level bottlenecks, PI Planning prompts",
              "Evaluate AI outputs with human-in-the-loop oversight for ethical, quality outcomes aligned with Lean-Agile thinking",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <span className="text-[#fa4a23] font-bold shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Key to Success Section */}
      <section className="w-full bg-gradient-to-b from-[#d3edff52] to-transparent py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#01203d] mb-12 text-center">
            Our Key to Exam and Career Success
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                title: "Guaranteed to Pass" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ), 
                title: "Expert-Led Study Sessions" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ), 
                title: "Networking Opportunities" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ), 
                title: "Flexible Monthly Payment Plans" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ), 
                title: "Real-World Case Studies" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ), 
                title: "Hands-On Project Experience" 
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#d3edff99] to-transparent flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Pricing Card */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content area - 2 columns */}
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-12">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200">
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
                          ? "border-[#fa4a23] text-[#fa4a23]"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
                      <p className="text-base text-gray-700 mb-4">
                        The <strong>AI-Empowered SAFe Advanced Scrum Master (SASM)</strong> course—for experienced Scrum Masters, typically with SAFe Scrum Master (SSM) certification—builds the skills to foster high-performing teams that collaborate on the <strong>Agile Release Train (ART)</strong>. You will improve <strong>flow</strong>, strengthen <strong>cross-team collaboration</strong>, and apply practical <strong>conflict management</strong> so the train stays aligned and delivery stays healthy.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        Scaled Agile positions this offering as <strong>foundational-level</strong> training that adds <strong>AI-empowered facilitation</strong>: using AI fundamentals and prompting for role-specific templates and analysis, Studio and CoPilot-style tooling for Framework guidance, and <strong>human-in-the-loop</strong> judgment so recommendations stay aligned with Lean-Agile principles. Exam: <strong>120 minutes</strong>, <strong>73%</strong> to pass; credential maintenance includes continuing education per Scaled Agile (e.g. <strong>24 CEUs within a two-year cycle</strong>, <strong>12 CEUs per year</strong> on average).
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        Agile36 delivers this as expert-led, live virtual training with hands-on practice, exam preparation, and the materials you need to succeed—consistent with Scaled Agile&apos;s certification process (workbook, Studio access, practice test with feedback, timed exam with coaching report).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You&apos;ll Learn: Advance team value flow</h3>
                      <p className="text-base text-gray-700 mb-4">
                        The course deepens team-level facilitation for multi-team environments: coordinating success on the ART, optimizing flow with XP and Kanban practices, facilitating collaboration, and improving ART performance through Inspect &amp; Adapt and related events.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Facilitate cross-team collaboration and synchronized delivery on the ART",
                          "Optimize flow: method selection, visualization, measurement, acceleration, built-in quality",
                          "Manage multi-team engagement: conflict behaviors, sources, interest-based problem solving, reframing",
                          "Drive high-performing teams: characteristics, powerful questions, collaboration, performance assessment",
                          "Improve ART performance: outcome-based team events, IP iteration, I&A, problem-solving workshop",
                          "Apply AI responsibly for the SASM role—templates, insights, and preparation with human oversight",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-base text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Who Should Attend</h3>
                      <p className="text-base text-gray-700 mb-3">
                        Scaled Agile recommends this for professionals with a firm grasp of the Scrum Master role, SAFe principles, and team facilitation—especially <strong>experienced Scrum Masters</strong> and those who already hold <strong>SAFe Scrum Master (SSM)</strong>.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
                        <li><strong>Scrum Master</strong> — scale to flow, outcomes, and system improvement at team level</li>
                        <li><strong>Agile Coach</strong> — add advanced SASM disciplines for measurable collaboration across the ART</li>
                        <li><strong>Engineering Manager</strong> — deeper flow measurement and scalable engineering practices</li>
                        <li><strong>Aspiring Release Train Engineer</strong> — multi-team facilitation and conflict resolution as a foundation for train-level roles</li>
                        <li>Program-level facilitators and Agile transformation leaders in SAFe</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Certification Details</h3>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">AI-Empowered SAFe Advanced Scrum Master (SASM)</p>
                            <p className="text-sm text-gray-600">AI-Empowered certification path (Scaled Agile)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">PMI PDUs &amp; Scrum CEUs</p>
                            <p className="text-sm text-gray-600">Eligible professional credits per Scaled Agile guidance</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">Digital badge &amp; certificate</p>
                            <p className="text-sm text-gray-600">Shareable credential after you pass the exam</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What is SASM */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What is the AI-Empowered SAFe Advanced Scrum Master (SASM)?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        SASM is the Scaled Agile certification for Scrum Masters who are ready to go deeper on <strong>flow</strong>, <strong>multi-team collaboration</strong>, <strong>conflict</strong>, and <strong>ART outcomes</strong>. The AI-Empowered update adds practical use of AI and Studio tooling so you can focus on facilitation and coaching while still applying Lean-Agile guardrails.
                      </p>
                      <p className="text-base text-gray-700">
                        Exam coverage includes evolving the Advanced Scrum Master role (including empowering teams with AI), improving flow, building high-performing teams, addressing conflict, and improving ART performance—aligned with Scaled Agile&apos;s published exam blueprint.
                      </p>
                    </div>

                    {/* Why SASM */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Why earn SASM now?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Employers continue to invest in SAFe at scale; SASM signals you can support teams <em>and</em> the train without losing sight of flow, psychological safety, and measurable improvement. The AI-Empowered curriculum matches how organizations actually work today—using assistants and automation where they help, with clear human accountability.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-[#006f] p-6 my-6">
                        <p className="text-base text-gray-700 font-semibold mb-2">Outcomes aligned with Scaled Agile:</p>
                        <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
                          <li>Stronger facilitation when multiple teams share dependencies and a single PI cadence</li>
                          <li>Practical conflict skills—not just theory—for lasting alignment</li>
                          <li>Flow thinking that connects team-level work to ART health</li>
                          <li>Responsible AI habits: prompts, verification, and value-stream alignment</li>
                          <li>Preparation for the official SASM exam (120 minutes, 73% passing score)</li>
                        </ul>
                      </div>
                    </div>

                    {/* Exam domains summary */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Exam emphasis (Scaled Agile domains)</h3>
                      <p className="text-base text-gray-700 mb-6">
                        The certification exam weights roughly: Evolving the Advanced Scrum Master role (11–13%); Improving Flow (22–24%); Building high-performing teams (26–28%); Addressing conflict (18–20%); Improving ART performance (17–19%). Agile36 training maps activities and study time to these areas.
                      </p>
                      <div className="space-y-4">
                        {[
                          "Role evolution: understanding the Advanced Scrum Master and empowering teams with AI",
                          "Flow: team method, visualization, measurement and acceleration, built-in quality",
                          "Teams: high-performing traits, powerful questions, cross-team collaboration, performance assessment",
                          "Conflict: behaviors, sources, interest-based problem solving, reframing, analysis & strategy design",
                          "ART: outcome-based events, coaching IP iteration, I&A, problem-solving workshop",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-base text-gray-700">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Prerequisites for SASM</h3>
                      <p className="text-base text-gray-700 mb-4">
                        To enroll in the <strong>AI-Empowered SAFe Advanced Scrum Master</strong> course, you should have:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700"><strong>SAFe Scrum Master (SSM) certification is required</strong></p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Experience as a Scrum Master or Agile Coach (recommended)</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Interest in program-level coaching and organizational transformation</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Willingness to lead and mentor other Scrum Masters</p>
                        </div>
                      </div>
                    </div>

                    {/* Career & Salary */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Career Outcomes for AI-Empowered SAFe Advanced Scrum Masters</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Earning your AI-Empowered SAFe Advanced Scrum Master certification opens up numerous senior career opportunities and demonstrates your commitment to advanced professional growth. The certification validates your ability to effectively lead program-level coaching and organizational transformation in a SAFe environment.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Average Salary</h4>
                          <p className="text-base text-gray-700">
                            $100,000–$150,000 (US)
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Common Roles</h4>
                          <p className="text-base text-gray-700">
                            Senior Scrum Master, Agile Coach, Agile Transformation Leader, Program-level Agile Coach
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Top Hiring Industries</h4>
                          <p className="text-base text-gray-700">
                            Financial services, healthcare, federal government, technology
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Demand</h4>
                          <p className="text-base text-gray-700">
                            70% of Fortune 100 companies use SAFe — certified advanced Scrum Masters are in high demand
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Course Format */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Course Format & Delivery</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="border border-gray-200 rounded-lg p-6 text-center">
                          <div className="w-16 h-16 bg-[#fa4a23] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">Live Virtual Training</h4>
                          <p className="text-sm text-gray-700">Interactive online sessions with expert instructors</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 text-center">
                          <div className="w-16 h-16 bg-[#fa4a23] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">Course Materials</h4>
                          <p className="text-sm text-gray-700">Comprehensive study guides and practice exams</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 text-center">
                          <div className="w-16 h-16 bg-[#fa4a23] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">Community Access</h4>
                          <p className="text-sm text-gray-700">1 year access to SAFe Community Platform</p>
                        </div>
                      </div>
                    </div>

                    {/* Exam Information */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Certification exam &amp; course logistics</h3>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Course format:</p>
                            <p className="text-base text-gray-700">Live virtual training with hands-on activities</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Duration:</p>
                            <p className="text-base text-gray-700">2 days (10 hours live instruction, typical schedules 9 AM – 2 PM ET)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Class time:</p>
                            <p className="text-base text-gray-700">See your session (commonly 9 AM – 2 PM Eastern)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Included with Scaled Agile certification process:</p>
                            <p className="text-base text-gray-700">Course workbook, Studio™ access, unlimited practice test with feedback, timed exam with coaching report</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam format:</p>
                            <p className="text-base text-gray-700">Timed, multiple-choice (Scaled Agile)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam duration:</p>
                            <p className="text-base text-gray-700">120 minutes</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Passing score:</p>
                            <p className="text-base text-gray-700">73%</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Credential:</p>
                            <p className="text-base text-gray-700">AI-Empowered SAFe Advanced Scrum Master (SASM)—AI-Empowered SAFe</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-base text-gray-700 mb-2">
                            <strong>Note:</strong> Maintaining your credential requires continuing education per Scaled Agile—currently communicated as <strong>24 CEUs within a two-year cycle</strong> (about <strong>12 CEUs per year</strong>). Verify current renewal rules on the official SASM certification page when you register.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Course Curriculum</p>
                        <h2 className="text-3xl font-bold text-gray-900">AI-Empowered SASM curriculum map</h2>
                      </div>
                      <a 
                        href="/AdvancedSM_Brochure.pdf" 
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border-2 border-[#fa4a23] text-[#fa4a23] font-semibold rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Curriculum
                      </a>
                    </div>
                    {/* Learning Objectives Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Objectives</h3>
                      <p className="text-base text-gray-700 mb-4">
                        By the end of this course, you will be better able to:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Facilitate collaboration across teams on the ART",
                          "Visualize, measure, and improve team flow using appropriate team methods",
                          "Coach high-performing teams and use powerful questions effectively",
                          "Apply interest-based problem solving and reframing in conflict situations",
                          "Support Inspect & Adapt, the problem-solving workshop, and ART-level improvement",
                          "Use AI and Studio resources responsibly with Lean-Agile guardrails",
                          "Prepare for the official SASM exam structure and timing (120 minutes, 73% to pass)",
                          "Connect day-to-day Scrum Master work to train-level outcomes"
                        ].map((objective, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-base text-gray-700">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { 
                          module: "Module 1: Evolving the Advanced Scrum Master role",
                          content: [
                            "Advanced Scrum Master responsibilities on and across the ART",
                            "Empowering teams with AI: prompts, templates, and verification",
                            "Human-in-the-loop use of SAFe Studio / CoPilot-style guidance",
                            "Ethical, quality-focused use of AI with Lean-Agile principles"
                          ]
                        },
                        { 
                          module: "Module 2: Improving flow",
                          content: [
                            "Selecting the team method (Scrum, Kanban, XP hooks)",
                            "Visualizing and managing flow; bottlenecks and WIP",
                            "Measuring and accelerating flow at team level",
                            "Built-in quality practices that protect throughput"
                          ]
                        },
                        { 
                          module: "Module 3: High-performing teams & cross-team collaboration",
                          content: [
                            "Characteristics of high-performing teams",
                            "Employing powerful questions in facilitation",
                            "Promoting cross-team collaboration on shared objectives",
                            "Assessing team performance and improvement backlog items"
                          ]
                        },
                        { 
                          module: "Module 4: Addressing conflict",
                          content: [
                            "Behaviors that improve (or erode) conflict outcomes",
                            "Sources of conflict in multi-team settings",
                            "Interest-based problem solving",
                            "Framing and reframing; conflict analysis and strategy design"
                          ]
                        },
                        { 
                          module: "Module 5: Improving ART performance",
                          content: [
                            "Outcome-based team events and facilitating toward ART goals",
                            "Coaching the Innovation & Planning (IP) iteration",
                            "Inspect & Adapt and the problem-solving workshop",
                            "Exam preparation and review—timed 120-minute, 73% passing context"
                          ]
                        }
                      ].map((module, index) => {
                        const isExpanded = expandedModules.includes(index);
                        return (
                          <div key={index} className="border border-blue-200 rounded-lg bg-white overflow-hidden">
                            <button
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition-colors"
                              onClick={() => {
                                setExpandedModules(prev => 
                                  prev.includes(index) 
                                    ? prev.filter(i => i !== index)
                                    : [...prev, index]
                                );
                              }}
                            >
                              <span className="text-lg font-semibold text-gray-900">{module.module}</span>
                              <svg 
                                className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 border-t border-blue-100">
                                <ul className="mt-4 space-y-2">
                                  {module.content.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-start gap-2">
                                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                      <span className="text-base text-gray-700">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">Student Reviews</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-base font-semibold text-gray-900">4.9 (234 reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[
                        { 
                          name: "Brian Mitchell", 
                          role: "Scrum Master", 
                          review: "SASM pushed my facilitation past single-team basics. Flow, cross-team collaboration, and I&A prep finally clicked—I passed the SASM exam on my first try.",
                          rating: 5
                        },
                        { 
                          name: "Catherine Wong", 
                          role: "Agile Coach", 
                          review: "The conflict and collaboration depth is what I needed for multi-team settings. Real examples from the trainers made SAFe at scale much easier to coach.",
                          rating: 5
                        },
                        { 
                          name: "Derek Thompson", 
                          role: "Team Lead", 
                          review: "After SSM, this was the right next step. Built-in quality, flow metrics, and ART-level events are now part of how I support teams.",
                          rating: 5
                        },
                        { 
                          name: "Elena Rodriguez", 
                          role: "Senior Scrum Master", 
                          review: "Worth it for the ART focus alone. I’m more deliberate about dependencies, PI readiness, and healthy team dynamics across the train.",
                          rating: 5
                        },
                        { 
                          name: "Franklin Lee", 
                          role: "Agile Facilitator", 
                          review: "Two intense days, well paced. I’ve used the powerful-questions and problem-solving workshop patterns in live PIs already.",
                          rating: 5
                        },
                        { 
                          name: "Gabriela Silva", 
                          role: "Scrum Master", 
                          review: "Exam prep matched the blueprint. Practice scenarios for flow and conflict were the most valuable part of the class.",
                          rating: 5
                        },
                        { 
                          name: "Henry Chen", 
                          role: "Agile Team Coach", 
                          review: "Connects team-level Scrum Master habits to train outcomes. Exactly what I needed before coaching more teams on the same ART.",
                          rating: 5
                        },
                        { 
                          name: "Isabella Martinez", 
                          role: "Lead Scrum Master", 
                          review: "Clear, practical, and focused on measurable improvement. I left with a concrete plan for I&A and team health.",
                          rating: 5
                        }
                      ].map((review, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900">{review.name}</h4>
                              <p className="text-sm text-gray-600">{review.role}</p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-base text-gray-700">
                            {review.review}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {[
                        { q: "What is the AI-Empowered SAFe Advanced Scrum Master (SASM)?", a: "SASM is Scaled Agile’s certification for experienced Scrum Masters who strengthen flow, high-performing teams, multi-team conflict skills, and ART performance. The AI-Empowered course adds responsible use of AI, prompting, and Studio / CoPilot-style support for the SASM role." },
                        { q: "What is the exam like?", a: "Scaled Agile publishes a timed, multiple-choice SASM exam. As of the AI-Empowered program overview, you have 120 minutes and need 73% to pass. You also get practice tests and a coaching report through the official certification process." },
                        { q: "What is included with the course?", a: "Agile36 provides live expert-led training plus exam preparation. Scaled Agile’s certification process includes perpetual workbook access, Studio for study, an unlimited practice test with feedback, customer support, and the timed exam with coaching report—per their public SASM certification page." },
                        { q: "Do I need Agile experience?", a: "You should already understand the Scrum Master role and SAFe team facilitation. SAFe Scrum Master (SSM) certification is required, and real-world Scrum Master experience is strongly recommended so you can apply advanced topics on the job." }
                      ].map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                          <p className="text-base text-gray-700">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Card - Sticky */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24 h-fit">
              <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$950</div>
                  <p className="text-sm text-gray-600">Live virtual SASM—AI-Empowered SAFe®. Taxes if applicable.</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">10 Hours Training (9 AM - 2 PM EST)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">2 Days Duration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">AI-Empowered SAFe Advanced Scrum Master Certification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">PMI PDUs &amp; Scrum CEUs (as eligible)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Lifetime Access to Materials</span>
                  </div>
                </div>

                <Link 
                  href={`/courses/advanced-scrum-master/schedule?course=${courseSlug}`}
                  className="w-full border-2 border-[#fa4a23] text-[#fa4a23] font-semibold py-3 rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors mb-4 inline-block text-center"
                >
                  View Schedule
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="w-full bg-white py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-[#01203d] mb-1">Earn the AI-Empowered SAFe Advanced Scrum Master (SASM) credential</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">AI-Empowered SAFe Advanced Scrum Master Certificate</h2>
              <div className="flex gap-1">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Certificate Display */}
          <div className="bg-white border border-blue-200 rounded-lg overflow-hidden">
            <img
              src="/Advanced_Cert.jpg"
              alt="AI-Empowered SAFe Advanced Scrum Master Certificate"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-2">AI-Empowered SASM course FAQs</p>
            <h2 className="text-3xl font-bold text-gray-900">FAQs on AI-Empowered SAFe Advanced Scrum Master (SASM)</h2>
          </div>

          {/* FAQ Category Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[
              { id: "courses", label: "FAQ Courses" },
              { id: "exam", label: "FAQ Exam" },
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
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {(() => {
              const faqs = {
                courses: [
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before the scheduled class start date. Cancellations received within thirty (30) days of the class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. For questions, please email d.stevenson@agile36.com." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Is there any option to complete the Training in the native language if a participant chooses to?", a: "Currently, our AI-Empowered SAFe Advanced Scrum Master training is conducted in English. However, we do offer course materials in multiple languages. Please contact us to discuss your specific language requirements." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com so they can be processed promptly." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes, upon successful completion of the AI-Empowered SAFe Advanced Scrum Master course and passing the certification exam, you'll receive the official SAFe Advanced Scrum Master (SASM) certificate from Scaled Agile, Inc." }
                ],
                exam: [
                  { q: "What is the format of the AI-Empowered SAFe Advanced Scrum Master (SASM) exam?", a: "The SASM exam is a timed, multiple-choice exam administered by Scaled Agile. Their public certification overview specifies a 120-minute exam and a 73% passing score. Use the practice test in Studio to gauge readiness." },
                  { q: "How long do I have to take the exam after completing the course?", a: "You typically have a limited window after course completion to attempt the exam (confirm your exact deadline in your Scaled Agile learning account and course communication)." },
                  { q: "Is the exam included in the course fee?", a: "Your Agile36 enrollment includes training aligned to SASM; exam fees are generally bundled per Scaled Agile partner offerings—confirm with your enrollment confirmation for your specific registration." },
                  { q: "Can I take the exam online?", a: "Yes, the exam is taken online through Scaled Agile’s exam platform. You’ll receive access instructions after you complete the course." },
                  { q: "What happens if I fail the exam?", a: "You may purchase a retake through Scaled Agile. Retake pricing and policies are set by Scaled Agile and can change—check their site for the current fee and rules." },
                  { q: "How do I maintain my SASM certification?", a: "Scaled Agile communicates credential maintenance including continuing education—for example, 24 CEUs within a two-year certification cycle (about 12 CEUs per year). Certification is also described as renewed yearly on their SASM page; verify current renewal fees and CEU rules on scaledagile.com when you certify." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before the scheduled class start date. Cancellations received within thirty (30) days of the class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. For questions, please email d.stevenson@agile36.com." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials, the certification exam, and one year of access to the SAFe Community Platform. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is AI-Empowered SAFe Advanced Scrum Master (SASM) certification?", a: "AI-Empowered SAFe Advanced Scrum Master is an advanced certification for experienced Scrum Masters who want to lead program-level coaching, optimize Agile Release Train performance, and drive organizational transformation. It builds on your SAFe Scrum Master (SSM) certification." },
                  { q: "Who should take this course?", a: "This course is ideal for certified SAFe Scrum Masters (SSM), experienced Scrum Masters, Agile Coaches, program-level facilitators, and Agile transformation leaders who want to advance their coaching and facilitation skills at scale." },
                  { q: "What are the prerequisites for this course?", a: "SAFe Scrum Master (SSM) certification is required. Experience as a Scrum Master or Agile Coach is also recommended to get the most from the advanced content." },
                  { q: "How long is the course?", a: "The AI-Empowered SASM class is typically two days of live instruction (about 10 hours total; many sessions run 9 AM–2 PM Eastern). Confirm exact times on your enrollment." },
                  { q: "What materials are included?", a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the SASM certification exam." },
                  { q: "Is this course available online?", a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you." },
                  { q: "How do I maintain my certification?", a: "Per Scaled Agile’s public SASM materials, plan for continuing education such as 24 CEUs within a two-year cycle (about 12 CEUs per year), and confirm the latest renewal steps and any annual membership or renewal fees on the official certification page." }
                ]
              };

              return faqs[activeFaqCategory as keyof typeof faqs]?.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <button
                      onClick={() => {
                        setExpandedFaqs(
                          isExpanded
                            ? expandedFaqs.filter((i) => i !== index)
                            : [...expandedFaqs, index]
                        );
                      }}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-semibold text-gray-900 pr-4">
                        {index + 1}. {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform ${
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
                      <div className="px-4 pb-4 pt-0">
                        <div className="pt-4 border-t border-gray-300">
                          <p className="text-base text-gray-700 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      <WhyAgile36Section />

      {/* SAFe Agilist Certification Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              AI-Empowered SAFe Advanced Scrum Master Certification
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              There has been a significant increase in demand for the AI-Empowered SAFe Advanced Scrum Master certification across the United States, as more organizations embrace Agile-at-scale methodologies and seek experienced professionals to lead program-level coaching and organizational transformation. Companies throughout the USA in sectors including technology, finance, healthcare, and manufacturing are actively recruiting AI-Empowered SAFe Advanced Scrum Masters and Program-level Agile Coaches who can lead organizational change, scale Agile practices across multiple teams, mentor other Scrum Masters, and drive Agile Release Train transformations. These certified experts are highly valued for their expertise in program-level coaching, organizational transformation, advanced facilitation, and scaling Agile practices. The AI-Empowered SAFe Advanced Scrum Master certification serves as a powerful differentiator in the competitive US job market, especially as organizations continue their digital transformation journeys and seek senior Agile leadership.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Certifications Are Required for AI-Empowered SAFe Advanced Scrum Master Certification Training?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Experience as a Scrum Master or Agile Coach is recommended for SASM in the United States. The AI-Empowered SASM course builds skills to collaborate across the Agile Release Train: flow, high-performing teams, multi-team conflict, and ART performance—including responsible AI practices aligned with Scaled Agile’s published curriculum and exam blueprint.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Are Job Opportunities for AI-Empowered SAFe Advanced Scrum Master Professionals?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Advanced Scrum Master professionals in the United States have excellent senior career prospects across various industries. Job opportunities include Senior Scrum Master, Agile Coach, Agile Transformation Leader, Enterprise Agile Coach, and Agile Release Train Coach roles. Companies in technology, finance, healthcare, and manufacturing sectors actively seek professionals with Advanced Scrum Master certification who can facilitate Agile teams effectively, resolve conflicts, optimize team flow, and drive organizational success with advanced Agile methodologies. The certification opens doors to senior leadership positions in Agile transformation and team facilitation roles.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What is the Fee for AI-Empowered SAFe Advanced Scrum Master Certification?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Agile36 currently offers this AI-Empowered SASM course at <strong>$950</strong> for live virtual training (pricing may vary by promotion or private cohort). Your investment covers expert-led instruction aligned to the official exam blueprint; Scaled Agile separately provides workbook, Studio, practice test, and exam per their certification process. Always confirm the latest list price on the schedule page before you register.
            </p>
          </div>
        </div>
      </section>

      {/* Find Leading SAFe Course in Cities Section */}
      <section className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600 mb-2 text-center">Courses based on location</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#01203d] mb-8 text-center">
            Find AI-Empowered SAFe Advanced Scrum Master Course in Other Top Cities
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              "New York",
              "Los Angeles",
              "Chicago",
              "Houston",
              "Phoenix",
              "Philadelphia",
              "San Antonio",
              "San Diego",
              "Dallas",
              "San Jose",
              "Austin",
              "Jacksonville",
              "Fort Worth",
              "Columbus",
              "Charlotte",
              "San Francisco",
              "Indianapolis",
              "Seattle",
              "Denver",
              "Washington",
              "Boston",
              "Nashville",
              "Oklahoma City",
              "Las Vegas",
              "Portland",
              "Miami",
              "Tampa",
              "Orlando",
              "Raleigh",
              "Baltimore"
            ].map((city) => {
              const citySlug = city.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={city}
                  href={`/advanced-scrum-master-certification-training/${citySlug}`}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <span className="text-base text-gray-900 font-medium">{city}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowConsultationModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Course Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa4a23]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa4a23]"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa4a23]"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa4a23]"
                    placeholder="Tell us about your requirements"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#fa4a23] text-white font-bold py-3 rounded-md hover:bg-[#e03d1a] transition-colors"
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
