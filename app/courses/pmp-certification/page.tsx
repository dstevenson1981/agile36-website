"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PMPCertificationCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const courseSlug = "pmp-certification";


  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#01203d]">Home</Link>
            <span>/</span>
            <span className="text-[#01203d]">PMI</span>
            <span>/</span>
            <span className="text-[#01203d]">PMP® Certification Training</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">PMI</span>
                <span className="text-sm text-gray-500">PMP Certification Training</span>
              </div>

              {/* Rating and Enrolled */}
              <div className="flex items-center gap-6 flex-wrap">
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
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-900">9K+ Enrolled</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  PMP® Certification Training<br />
                  Earn Your PMP in 5 Days
                </h1>
                <p className="text-lg text-gray-700 font-semibold">
                  Master project management with our intensive 5-day PMP® certification prep course. 35 PDUs included.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {[
                  "Intensive 5-day PMP® certification prep course with expert instructors",
                  "Comprehensive PMBOK® Guide 7th Edition coverage",
                  "35 Contact Hours (PDUs) required for PMP® exam eligibility",
                  "Proven exam strategies and 1000+ practice questions",
                  "Live interactive sessions with real-world project scenarios"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Accredited By */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-base font-semibold text-gray-900">Authorized by</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-16 rounded flex items-center justify-center overflow-hidden">
                    <Image
                      src="/PMP.png"
                      alt="PMI Authorized Training Partner"
                      width={128}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setShowConsultationModal(true)}
                  className="px-6 py-3 border-2 border-[#fa4a23] text-[#fa4a23] font-semibold rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </button>
                <button 
                  onClick={() => setShowConsultationModal(true)}
                  className="px-6 py-3 bg-[#fa4a23] text-white font-bold rounded-md hover:bg-[#e03d1a] transition-colors"
                >
                  View Schedules
                </button>
              </div>
            </div>

            {/* Right Side - Image Card */}
            <div className="lg:flex lg:justify-end">
              <div className="max-w-md w-full">
                <img 
                  src="/annie-spratt-sggw4-qDD54-unsplash.jpg" 
                  alt="PMP Certification Training" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
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
            <div className="lg:col-span-2 space-y-12">
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
                        Our PMP® Certification Training is a comprehensive 5-day intensive course designed to prepare you for the Project Management Professional (PMP)® exam. This globally recognized certification validates your expertise in project management and demonstrates your commitment to the profession.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        During this five-day course, you'll learn the PMBOK® Guide 7th Edition principles, master all three project management domains, and develop the skills needed to lead projects successfully. The course includes 35 Contact Hours (PDUs) required for PMP® exam eligibility.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "PMBOK® Guide 7th Edition principles and practices",
                          "Three performance domains: People, Process, Business Environment",
                          "Predictive, Agile, and Hybrid project approaches",
                          "Project initiation and planning techniques",
                          "Risk management and stakeholder engagement",
                          "PMP® exam strategies and practice questions"
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
                      <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
                        <li>Project managers seeking PMP® certification</li>
                        <li>Senior project coordinators and team leaders</li>
                        <li>Program and portfolio managers</li>
                        <li>IT professionals managing complex projects</li>
                        <li>Anyone with 3+ years of project management experience</li>
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
                            <p className="font-semibold text-gray-900">PMP® Certification by PMI</p>
                            <p className="text-sm text-gray-600">Valid for 3 years, renewable with PDUs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">35 Contact Hours (PDUs)</p>
                            <p className="text-sm text-gray-600">Required for PMP® exam eligibility</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">Course Completion Certificate</p>
                            <p className="text-sm text-gray-600">Downloadable upon completion</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What is PMP Training */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What is PMP® Certification Training?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        PMP® Certification Training is a comprehensive program designed to prepare professionals for the Project Management Professional (PMP)® exam administered by the Project Management Institute (PMI). This intensive course covers the PMBOK® Guide 7th Edition and provides the 35 contact hours required for exam eligibility.
                      </p>
                      <p className="text-base text-gray-700">
                        The training prepares participants for the PMP® exam, providing them with the knowledge and skills to manage projects successfully using both predictive and agile approaches, while understanding the business environment context.
                      </p>
                    </div>

                    {/* Why PMP */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Why Get PMP® Certified?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        The PMP® Certification is the world's leading project management credential, recognized by organizations worldwide. It validates your ability to lead and direct projects and demonstrates your commitment to professional development in project management.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        By earning this certification, you gain credibility, increased earning potential, and recognition as a qualified project management professional. The PMP® is recognized globally across industries and opens doors to leadership opportunities.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-[#006f] p-6 my-6">
                        <p className="text-base text-gray-700 font-semibold mb-2">Key Benefits:</p>
                        <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
                          <li>Globally recognized project management credential</li>
                          <li>Average salary increase of 22% after certification</li>
                          <li>Enhanced career opportunities across all industries</li>
                          <li>Demonstrates commitment to professional development</li>
                          <li>Join a global network of 1.3 million PMP® certified professionals</li>
                        </ul>
                      </div>
                    </div>

                    {/* What Will You Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What Will You Learn in PMP® Certification Training?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Complete your PMP® certification training to gain the comprehensive knowledge and practical skills needed to manage projects successfully. This intensive course covers all aspects of the PMBOK® Guide 7th Edition and prepares you for exam success.
                      </p>
                      <p className="text-base text-gray-700 mb-6">
                        Through PMP® Certification Training, you will learn:
                      </p>
                      <div className="space-y-4">
                        {[
                          "PMBOK® Guide 7th Edition principles and performance domains",
                          "Project management processes across all knowledge areas",
                          "Predictive, agile, and hybrid project management approaches",
                          "Stakeholder engagement and communication strategies",
                          "Risk management and quality assurance techniques",
                          "Schedule management and cost control methods",
                          "Professional and social responsibility in project management",
                          "PMP® exam strategies and test-taking techniques"
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
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Prerequisites for PMP® Certification Training Course</h3>
                      <p className="text-base text-gray-700 mb-4">
                        To enroll in <strong>PMP® Certification Training</strong>, PMI requires specific project management experience and education:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">4-year degree + 3 years of project management experience OR High school diploma + 5 years of project management experience</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">4,500 hours of leading and directing projects (36 months) for degree holders OR 7,500 hours (60 months) for non-degree holders</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">35 contact hours of project management education (provided by this course)</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Basic understanding of project management concepts and terminology</p>
                        </div>
                      </div>
                    </div>

                    {/* Career Advancement */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">How Does PMP® Certification Advance Your Career?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Earning your PMP® certification opens up numerous career opportunities and demonstrates your commitment to professional excellence. The certification validates your ability to lead projects and manage complex initiatives across any industry.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Career Growth</h4>
                          <p className="text-base text-gray-700">
                            PMP® certification positions you for senior project management roles, including Program Manager, Portfolio Manager, and PMO Director positions across all industries.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Salary Increase</h4>
                          <p className="text-base text-gray-700">
                            PMP® certified professionals earn 22% more on average than non-certified peers, with salaries ranging from $95,000 to $140,000+ depending on experience and location.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Global Recognition</h4>
                          <p className="text-base text-gray-700">
                            The PMP® certification is recognized in over 180 countries by top organizations worldwide, including Fortune 500 companies, making you a valuable asset globally.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Network Expansion</h4>
                          <p className="text-base text-gray-700">
                            Join a global community of 1.3+ million PMP® certified professionals, access exclusive PMI resources, and connect with industry leaders worldwide.
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
                          <p className="text-sm text-gray-700">5 days of interactive online sessions with certified PMP® instructors</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 text-center">
                          <div className="w-16 h-16 bg-[#fa4a23] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">Course Materials</h4>
                          <p className="text-sm text-gray-700">PMBOK® Guide 7th Edition, study guides, and 1000+ practice questions</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 text-center">
                          <div className="w-16 h-16 bg-[#fa4a23] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">35 PDUs Included</h4>
                          <p className="text-sm text-gray-700">Contact hours required for PMP® exam eligibility</p>
                        </div>
                      </div>
                    </div>

                    {/* Exam Information */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">PMP® Exam Information</h3>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam Format:</p>
                            <p className="text-base text-gray-700">180 multiple choice questions</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Duration:</p>
                            <p className="text-base text-gray-700">230 minutes (3 hours 50 min)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam Domains:</p>
                            <p className="text-base text-gray-700">People (42%), Process (50%), Business Environment (8%)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam Fee:</p>
                            <p className="text-base text-gray-700">$555 for PMI members, $405 non-members (not included in course)</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-base text-gray-700 mb-2">
                            <strong>Note:</strong> The exam can be taken at a Pearson VUE test center or online with proctoring. You must meet PMI's eligibility requirements and complete 35 contact hours before applying to take the exam.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                    <div className="space-y-4">
                      {[
                        { day: "Day 1", topics: ["Introduction to PMP® and PMBOK® Guide 7th Edition", "Project Management Framework and Terminology", "Project Integration Management", "Project Scope Management"] },
                        { day: "Day 2", topics: ["Project Schedule Management", "Project Cost Management", "Project Quality Management", "Project Resource Management"] },
                        { day: "Day 3", topics: ["Project Communications Management", "Project Risk Management", "Project Procurement Management", "Stakeholder Management"] },
                        { day: "Day 4", topics: ["Agile and Hybrid Approaches", "People Domain - Leadership and Team Development", "Process Domain - Planning and Execution", "Business Environment Domain"] },
                        { day: "Day 5", topics: ["Professional and Social Responsibility", "PMP® Exam Strategies and Tips", "Full-Length Practice Exam", "Exam Review and Q&A"] }
                      ].map((day, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">{day.day}</h3>
                          <ul className="space-y-2">
                            {day.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-base text-gray-700">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
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
                          name: "Christopher Lee", 
                          role: "Senior Project Manager", 
                          review: "The PMP® certification training was exceptional! The comprehensive coverage of PMBOK® principles and practices gave me the foundation I needed. I passed the PMP® exam on my first attempt!",
                          rating: 5
                        },
                        { 
                          name: "Michelle Chang", 
                          role: "IT Program Manager", 
                          review: "Outstanding training! The PMP® course exceeded my expectations. The real-world project examples and case studies made complex concepts easy to understand. Highly recommend!",
                          rating: 5
                        },
                        { 
                          name: "Thomas Wright", 
                          role: "Construction Project Manager", 
                          review: "As someone with years of practical experience, this PMP® course provided the framework I needed. The instructors were patient and the exam preparation was thorough and effective.",
                          rating: 5
                        },
                        { 
                          name: "Patricia Moore", 
                          role: "Portfolio Manager", 
                          review: "Excellent course structure! The PMP® training content is well-organized and the instructors bring years of practical experience. I've already applied the principles learned in my projects.",
                          rating: 5
                        },
                        { 
                          name: "Benjamin Harris", 
                          role: "Engineering Manager", 
                          review: "This PMP® course helped me understand project management at a deeper level. The interactive sessions on risk management and stakeholder engagement were particularly valuable.",
                          rating: 5
                        },
                        { 
                          name: "Samantha Clark", 
                          role: "PMO Director", 
                          review: "The PMP® certification has opened new career opportunities for me. The training materials and 1000+ practice questions are comprehensive. Exam prep was excellent.",
                          rating: 5
                        },
                        { 
                          name: "Jonathan Lewis", 
                          role: "IT Director", 
                          review: "I appreciated the focus on practical application. The instructors shared real-world challenges in project management. The PMP® course exceeded my expectations in every way.",
                          rating: 5
                        },
                        { 
                          name: "Nicole Walker", 
                          role: "Operations Manager", 
                          review: "Excellent investment in professional development! The PMBOK® concepts are clearly explained with relevant examples. I feel confident managing complex projects now.",
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
                        { q: "What is the PMP® certification?", a: "The PMP® (Project Management Professional) certification is a globally recognized credential offered by PMI that validates your expertise in project management and demonstrates your ability to lead complex projects." },
                        { q: "How long is the certification valid?", a: "The PMP® certification is valid for three years from the date of issue. You can renew it by earning 60 Professional Development Units (PDUs) within the three-year cycle." },
                        { q: "What is included in the course?", a: "The course includes 5 days of live training, PMBOK® Guide 7th Edition, comprehensive study materials, 1000+ practice questions, and a certificate of completion providing 35 PDUs." },
                        { q: "Do I need prior project management experience?", a: "Yes, PMI requires either 3 years of project management experience with a 4-year degree, or 5 years with a high school diploma, along with 4,500 or 7,500 hours leading projects respectively." }
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
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$1,100</div>
                  <div className="text-base text-gray-500 line-through">$2,200</div>
                  <div className="text-sm text-green-600 font-semibold mt-2">50% OFF</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">5 Days Intensive Training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">35 PDUs Included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">PMP® Exam Prep</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">1000+ Practice Questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">PMBOK® 7th Edition</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowConsultationModal(true)}
                  className="w-full border-2 border-[#fa4a23] text-[#fa4a23] font-semibold py-3 rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors mb-4"
                >
                  View Schedule
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Test Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-2">Unsure about your prep?</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2 className="text-4xl font-bold text-gray-900">PMP® Practice Test</h2>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                "Immediate Results",
                "Sample Papers",
                "Time-Limited",
                "Comprehensive Explanation",
                "Previous Exams"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Test Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border-2 border-blue-200 rounded-xl p-8 shadow-lg">
              {/* Badge */}
              <div className="mb-4">
                <span className="bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md">
                  1 Practice Test
                </span>
              </div>

              {/* Title and Users */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  PMP® Practice Test | Project Management Mock Exam
                </h3>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-base text-gray-700 font-semibold">9K+ Users</span>
                </div>
              </div>

              {/* Test Details */}
              <div className="flex items-center gap-8 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base text-gray-700 font-medium">45 Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base text-gray-700 font-medium">1 hours and 30 minutes</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="text-base text-gray-700 font-medium">English</span>
                </div>
                <Link
                  href="/test/leading-safe"
                  className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold px-8 py-3 rounded-lg transition-colors"
                >
                  Start Test
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
            <p className="text-sm text-[#01203d] mb-1">Get the PMP® Certification</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">PMP® Certificate by PMI</h2>
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
              src="/SA Certificate.jpeg"
              alt="SAFe 6.0 Agilist Certificate"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-2">PMP® Course FAQs</p>
            <h2 className="text-3xl font-bold text-gray-900">FAQs on PMP® Certification Training Course</h2>
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
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Refunds are only available if the class is more than 30 days out from the start date. Please contact our support team for more details." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Is there any option to complete the Training in the native language if a participant chooses to?", a: "Currently, our PMP® training is conducted in English. However, we do offer course materials in multiple languages. Please contact us to discuss your specific language requirements." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, you can reschedule your training class as long as it's within 24 hours of the start time at no additional charge. Please contact our support team to make changes to your enrollment." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes, upon successful completion of the Leading SAFe course and passing the certification exam, you'll receive the official SAFe 6.0 Agilist (SA) certificate from Scaled Agile, Inc." }
                ],
                exam: [
                  { q: "What is the format of the SAFe Agilist exam?", a: "The SAFe Agilist exam is a multiple-choice exam with 45 questions. You have 90 minutes to complete it, and you need to score 35 out of 45 (77%) to pass." },
                  { q: "How long do I have to take the exam after completing the course?", a: "You have 30 days after course completion to take the exam." },
                  { q: "Is the exam included in the course fee?", a: "Yes, the exam fee is included with your course enrollment. There are no additional charges for taking the certification exam." },
                  { q: "Can I take the exam online?", a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course." },
                  { q: "What happens if I fail the exam?", a: "If you don't pass on your first attempt, you can retake the exam for a $50 fee paid directly to Scaled Agile. You can purchase retakes through Scaled Agile's website." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Refunds are only available if the class is more than 30 days out from the start date. Please contact our support team for refund requests." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials, the certification exam, and one year of access to the SAFe Community Platform. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is Leading SAFe certification?", a: "Leading SAFe is a comprehensive course that provides the knowledge and skills needed to lead a Lean-Agile enterprise using the Scaled Agile Framework (SAFe). It prepares you for the SAFe 6 Agilist (SA) certification exam." },
                  { q: "Who should take this course?", a: "This course is ideal for executives, leaders, Agile coaches, program managers, product managers, and anyone interested in leading enterprise Agile transformations." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in software development or IT projects is recommended." },
                  { q: "How long is the course?", a: "The Leading SAFe course is a 2-day intensive training program, totaling 16 hours of instruction." },
                  { q: "What materials are included?", a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam." },
                  { q: "Is this course available online?", a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you." },
                  { q: "How do I maintain my certification?", a: "The SAFe Agilist certification is valid for one year. You can renew it by earning continuing education credits or by taking advanced SAFe courses." }
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

      {/* Why Choose Section */}
      <section className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#01203d] mb-4">
              Why Choose the Leading SAFe Certification Course with Agile36?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Benefit 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Globally Recognized SAFe® Certification
                  </h3>
                  <p className="text-base text-gray-700">
                    Agile36 offers Leading SAFe training accredited by Scaled Agile, Inc., ensuring an internationally recognized certification valued across industries and enterprises worldwide.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Hands-On Learning Experience
                  </h3>
                  <p className="text-base text-gray-700">
                    Agile36 integrates case studies, role-playing, and simulations that mirror real challenges faced by Agile teams in enterprise organizations for practical skill development.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Comprehensive Exam Preparation
                  </h3>
                  <p className="text-base text-gray-700">
                    Get guided exam readiness support, including practice tests, learning resources, and expert mentoring to ensure success in the SAFe® Agilist Certification exam.
                  </p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Earn PDUs and SEUs for Career Advancement
                  </h3>
                  <p className="text-base text-gray-700">
                    Participants earn 16 PDUs and SEUs to maintain the validity of their certifications and expand professional credibility in the Agile market.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Benefit 5 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Expert-Led Training by Certified SPCs
                  </h3>
                  <p className="text-base text-gray-700">
                    Learn from experienced SAFe® Practice Consultants (SPCs) who bring real-world Agile implementation experience and actionable insights into every session.
                  </p>
                </div>
              </div>

              {/* Benefit 6 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Flexible Learning Options
                  </h3>
                  <p className="text-base text-gray-700">
                    Choose from live online, classroom, or corporate group sessions designed for working professionals across major cities in the United States.
                  </p>
                </div>
              </div>

              {/* Benefit 7 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Networking with Global SAFe® Professionals
                  </h3>
                  <p className="text-base text-gray-700">
                    Agile36 training connects participants with a vast network of certified professionals and Agile leaders across the United States and globally.
                  </p>
                </div>
              </div>

              {/* Benefit 8 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Post-Certification Career Support
                  </h3>
                  <p className="text-base text-gray-700">
                    Agile36 offers continuous learning support and guidance to help certified SAFe professionals explore new roles and opportunities in the Agile job market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFe Agilist Certification in the USA Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              SAFe Agilist Certification in the USA
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              There has been a significant increase in demand for the Leading SAFe 6.0 Agilist certification across the United States, as more organizations embrace Agile-at-scale methodologies to enhance productivity and drive business agility. Companies throughout the USA in sectors including technology, finance, healthcare, and manufacturing are actively recruiting SAFe certified professionals to spearhead enterprise-wide Agile transformations. These certified experts are highly valued for their expertise in connecting strategy with execution through Lean-Agile leadership principles. The SAFe Agilist certification serves as a powerful differentiator in the competitive US job market, especially as organizations continue their digital transformation journeys.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Are Job Opportunities for Leading SAFe Professionals in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Leading SAFe 6.0 certified professionals in the United States have access to a wide range of career opportunities. Popular roles include Agile Coach, Release Train Engineer, Product Owner, Program Manager, and Scrum Master. These positions are in high demand across various industries throughout the USA, including IT, finance, healthcare, and manufacturing sectors. As more enterprises in the United States adopt the Scaled Agile Framework to improve their outcomes and accelerate delivery, the need for certified SAFe professionals continues to grow across the country.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Certifications Are Required for SAFe Agile Certification Training in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              No prior certification is required to enroll in SAFe Agile Certification Training in the United States. However, having foundational knowledge of Agile principles, Scrum methodologies, or project management (such as CSM or PMP certifications) can be beneficial for participants. The Leading SAFe 6.0 course in the USA prepares candidates for the SAFe Agilist (SA) certification exam from Scaled Agile, Inc., making it accessible to professionals at various stages of their Agile journey.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What is the Fee for SAFe Agilist Certification in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              The cost of the Leading SAFe certification course in the United States typically ranges from <strong>$545 to $910</strong>, depending on the specific course offerings and training provider. This investment includes two days of instructor-led training, comprehensive digital study materials, one exam attempt, and a one-year membership to the SAFe Community Platform provided by Scaled Agile, Inc. The pricing for SAFe Agilist certification training in the USA reflects the value of expert instruction, official materials, and ongoing community access that supports your professional development.
            </p>
          </div>
        </div>
      </section>

      {/* Find Leading SAFe Course in Cities Section */}
      <section className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600 mb-2 text-center">Courses based on location</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#01203d] mb-8 text-center">
            Find Leading SAFe® Course in Other Top Cities in USA
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
                  href={`/leading-safe-certification-training/${citySlug}`}
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
