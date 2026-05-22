"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CourseHeroSocialProof from "@/app/components/CourseHeroSocialProof";
import CourseHeroRightColumn from "@/app/components/CourseHeroRightColumn";

export default function ScrumMasterCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentFormData, setAssessmentFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const examName = "SAFe Scrum Master Practice Test";
  const courseSlug = "scrum-master";

  const handleAssessmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessmentFormData.email || !assessmentFormData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    if (!assessmentFormData.name || assessmentFormData.name.trim() === '') {
      alert('Please enter your full name');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/store-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: assessmentFormData.name,
          email: assessmentFormData.email,
          source: 'SA Free Assessment',
          exam_name: examName
        }),
      });

      if (response.ok) {
        // Redirect to practice test
        window.location.href = '/test/scrum-master';
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        alert(errorData.error || 'Failed to submit email. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

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
            <span className="text-[#01203d]">AI-Empowered SAFe Scrum Master Certification Training</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-16 w-16 shrink-0">
                  <Image
                    src="/SSM.jpeg"
                    alt="SAFe Scrum Master Badge"
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5">
                  <svg className="h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="text-sm font-semibold text-blue-700">English</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl font-bold leading-[1.08] text-gray-900 sm:text-5xl md:text-6xl lg:text-[3.35rem] mb-3 md:mb-4">
                  AI-Empowered SAFe® Scrum Master (SSM) Certification Training
                </h1>
                <p className="mb-4 text-lg font-semibold text-gray-700 md:mb-5 md:text-xl">
                  Become a certified AI-Empowered SAFe Scrum Master in 2 days. Live, expert-led training from a SAFe Silver Partner with Fortune 100 experience.
                </p>
                <CourseHeroSocialProof
                  enrolledLabel="25,000+ enrolled"
                  trailing={
                    <div className="flex items-center gap-2 rounded-lg border-2 border-green-500 bg-green-50 px-3 py-2 sm:px-4">
                      <svg className="h-5 w-5 shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-bold text-green-700">Certification Exam Included</span>
                    </div>
                  }
                />

                {/* Key Stats Bar */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#01203d]">2-Day Live Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#01203d]">Exam Fee Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#01203d]">16 PDUs & SEUs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#01203d]">SAFe Silver Partner</span>
                  </div>
                </div>
                
                {/* Key Benefits with Checkmarks */}
                <div className="space-y-3 mb-6">
                  {[
                    "Join 16 Hrs of Live Online Training by Certified SAFe® SSM Trainers",
                    "Learn Real-World Case Studies & Hands-On Scrum Master Exercises",
                    "Exam Fee Included in Training | Get Support for SAFe® SSM Exam",
                    "Earn 16 PDUs & SEUs with SAFe® 6 SSM Certification Course",
                    "Access to SAFe® Community & Career Resources"
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
                    src="/SSM.jpeg"
                    alt="SAFe Scrum Master Certification Badge"
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
                  href="/SSM_Agile36_Brochure.pdf" 
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
                  href={`/courses/scrum-master/schedule?course=${courseSlug}`}
                  className="px-6 py-3 bg-[#fa4a23] text-white font-bold rounded-md hover:bg-[#e03d1a] transition-colors inline-block text-center"
                >
                  View Schedules
                </Link>
                <button 
                  onClick={() => setShowAssessmentModal(true)}
                  className="px-6 py-3 border-2 border-[#0e78c2] text-[#0e78c2] font-bold rounded-md hover:bg-[#0e78c2] hover:text-white transition-colors"
                >
                  Free SSM Assessment
                </button>
              </div>

              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Related reading</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2 text-sm">
                  <Link href="/blog/ssm-vs-csm" className="text-[#01203d] underline hover:text-[#134263] font-medium">
                    SSM vs CSM comparison →
                  </Link>
                  <Link href="/blog/safe-scrum-master-exam-questions" className="text-[#01203d] underline hover:text-[#134263] font-medium">
                    SAFe Scrum Master exam questions →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - pricing + hero details */}
            <CourseHeroRightColumn courseSlug={courseSlug}>
              <div className="mt-8 lg:mt-20">
                <img
                  src="/SSM_Header.jpg"
                  alt="SAFe Scrum Master"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </CourseHeroRightColumn>
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
                        SAFe Scrum Master is a comprehensive 2-day course that provides the knowledge and skills needed to effectively facilitate team success, coach Agile teams, and support Program Increment (PI) planning in a SAFe environment. This course prepares you to take the SAFe® Scrum Master (SSM) certification exam.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        During this two-day course, you'll learn how to facilitate team events, coach Agile teams, support Program Increment (PI) planning, and remove impediments. You'll master Scrum Master responsibilities, facilitate team ceremonies, and support Agile Release Trains. The course emphasizes servant leadership and team facilitation.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <p className="text-base text-gray-700 mb-4">
                        SAFe® Scrum Master (SSM) certification training offers a variety of learning opportunities that can benefit professionals involved in Agile team facilitation, Scrum practices, and Agile Release Train support.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Facilitate team events and ceremonies",
                          "Coach Agile teams and support continuous improvement",
                          "Support Program Increment (PI) planning",
                          "Remove impediments and foster team collaboration",
                          "Apply SAFe principles in team context",
                          "Support Agile Release Trains effectively"
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
                        <li>Scrum Masters and Agile Coaches</li>
                        <li>Team Leads and Facilitators</li>
                        <li>Agile Practitioners</li>
                        <li>Project Managers transitioning to Agile</li>
                        <li>Anyone interested in facilitating Agile teams in SAFe</li>
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
                            <p className="font-semibold text-gray-900">SAFe® Scrum Master (SSM) Certification</p>
                            <p className="text-sm text-gray-600">Valid for 1 year, renewable</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">16 PDUs & SEUs</p>
                            <p className="text-sm text-gray-600">Earn professional development units</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">Digital Certificate</p>
                            <p className="text-sm text-gray-600">Downloadable upon completion</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What is Leading SAFe Training */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What is SAFe Scrum Master training?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        SAFe Scrum Master Training is a certification program designed to help professionals understand and effectively facilitate Agile teams within the Scaled Agile Framework (SAFe). This comprehensive 2-day course covers Scrum Master responsibilities, facilitating team events, coaching Agile teams, supporting PI planning, and removing impediments. You'll learn to apply SAFe principles and support Agile Release Trains.
                      </p>
                      <p className="text-base text-gray-700">
                        The training prepares participants for the SAFe Scrum Master (SSM) certificate exam, providing them with the knowledge and skills to work effectively as Scrum Masters in a SAFe environment, facilitating team success and supporting Agile Release Trains.
                      </p>
                    </div>

                    {/* Why Leading SAFe */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Why SAFe Scrum Master?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        The SAFe Scrum Master Certification empowers professionals to effectively facilitate Agile teams in a SAFe environment. It provides a comprehensive understanding of how to coach teams, facilitate ceremonies, support PI planning, and remove impediments to team success.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        By earning this certification, you gain the expertise to support Agile Release Trains, facilitate team events, and foster continuous improvement. The certification is recognized globally and opens doors to Scrum Master, Agile Coach, and Team Facilitator roles in Agile organizations.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-[#006f] p-6 my-6">
                        <p className="text-base text-gray-700 font-semibold mb-2">Key Benefits:</p>
                        <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
                          <li>Master SAFe Scrum Master principles and practices</li>
                          <li>Improve team facilitation and coaching skills</li>
                          <li>Accelerate team performance through effective facilitation</li>
                          <li>Increase organizational agility through team support</li>
                          <li>Enhance career prospects with globally recognized certification</li>
                        </ul>
                      </div>
                    </div>

                    {/* What Will You Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What Will You Learn in SAFe Scrum Master Certification Training?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Complete your SAFe Scrum Master certification course to gain the practical tools and knowledge needed to effectively facilitate Agile teams, coach team members, and support Program Increment (PI) planning in a SAFe environment. This comprehensive training covers all aspects of Scrum Master responsibilities in SAFe.
                      </p>
                      <p className="text-base text-gray-700 mb-6">
                        Through SAFe Scrum Master Certification, you will learn:
                      </p>
                      <div className="space-y-4">
                        {[
                          "Facilitate team events and ceremonies effectively",
                          "Coach Agile teams and support continuous improvement",
                          "Support Program Increment (PI) planning",
                          "Remove impediments and foster team collaboration",
                          "Apply SAFe principles in team context",
                          "Support Agile Release Trains effectively",
                          "Facilitate team retrospectives and improvements",
                          "Build high-performing Agile teams"
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
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Who Should Attend SAFe Scrum Master Training</h3>
                      <p className="text-base text-gray-700 mb-4">
                        This course is ideal for:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-base text-gray-700 mb-4">
                        <li>Current Scrum Masters looking to operate in a SAFe enterprise</li>
                        <li>Team leads transitioning to an Agile role</li>
                        <li>Project managers moving into Agile facilitation</li>
                        <li>Anyone on an Agile Release Train (ART)</li>
                      </ul>
                      <p className="text-base text-gray-700 font-semibold mb-2">Recommended (not required):</p>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Basic understanding of Scrum or Agile principles</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Familiarity with iteration-based delivery</p>
                        </div>
                      </div>
                    </div>

                    {/* Career & Salary */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Career Outcomes for SAFe Scrum Masters</h3>
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Average Salary</h4>
                          <p className="text-base text-gray-700">
                            $95,000–$130,000 (US)
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Common Roles</h4>
                          <p className="text-base text-gray-700">
                            SAFe Scrum Master, Agile Coach, Release Train Engineer
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
                            70% of Fortune 100 companies use SAFe — certified professionals are in high demand
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
                      <h3 className="text-xl font-bold text-[#006f] mb-4">SAFe Scrum Master (SSM) Exam Details</h3>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Format:</p>
                            <p className="text-base text-gray-700">Multiple choice, single select</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Questions:</p>
                            <p className="text-base text-gray-700">45</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Time Limit:</p>
                            <p className="text-base text-gray-700">90 minutes</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Passing Score:</p>
                            <p className="text-base text-gray-700">73% (33 out of 45 correct)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Delivery:</p>
                            <p className="text-base text-gray-700">Online, open book</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam Window:</p>
                            <p className="text-base text-gray-700">Must be taken within 30 days of course completion</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Retake Cost:</p>
                            <p className="text-base text-gray-700">$50 per attempt (paid to Scaled Agile)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Certification Valid:</p>
                            <p className="text-base text-gray-700">1 year (renewal fee: $195/year)</p>
                          </div>
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
                        <h2 className="text-3xl font-bold text-gray-900">SAFe® Scrum Master Certification Course Curriculum</h2>
                      </div>
                      <a 
                        href="/SSM_Agile36_Brochure.pdf" 
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
                        By the end of this course, you will be able to:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Facilitate team events and ceremonies effectively",
                          "Coach Agile teams and support continuous improvement",
                          "Support Program Increment (PI) planning",
                          "Remove impediments and foster team collaboration",
                          "Apply SAFe principles in team context",
                          "Support Agile Release Trains effectively",
                          "Facilitate team retrospectives and improvements",
                          "Build high-performing Agile teams"
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
                          module: "Module 1: Introducing Scrum in SAFe®",
                          expanded: false
                        },
                        { 
                          module: "Module 2: Defining the Scrum Master / Team Coach role",
                          expanded: false
                        },
                        { 
                          module: "Module 3: Supporting Team Events",
                          expanded: false
                        },
                        { 
                          module: "Module 4: Supporting ART Events",
                          expanded: false
                        },
                        { 
                          module: "Module 5: AI and the Future of the Scrum Master Role",
                          expanded: false
                        }
                      ].map((module, index) => (
                        <div key={index} className="border border-blue-200 rounded-lg bg-white">
                          <button
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition-colors"
                            onClick={() => {
                              // Toggle expansion logic can be added here if needed
                            }}
                          >
                            <span className="text-lg font-semibold text-gray-900">{module.module}</span>
                            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
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
                          name: "Brian Mitchell", 
                          role: "Scrum Master", 
                          review: "The SAFe Scrum Master course transformed how I facilitate teams. The PI planning and iteration execution modules were game-changers. I passed the SSM exam on my first attempt!",
                          rating: 5
                        },
                        { 
                          name: "Catherine Wong", 
                          role: "Agile Coach", 
                          review: "Outstanding training! The focus on team facilitation and coaching gave me practical tools I use daily. The instructors' real-world examples made complex SAFe concepts clear.",
                          rating: 5
                        },
                        { 
                          name: "Derek Thompson", 
                          role: "Team Lead", 
                          review: "As a Team Lead transitioning to Scrum Master, this course provided exactly what I needed. The facilitation techniques and impediment removal lessons were particularly valuable. Highly recommend!",
                          rating: 5
                        },
                        { 
                          name: "Elena Rodriguez", 
                          role: "Senior Scrum Master", 
                          review: "The SAFe SSM certification has elevated my facilitation skills significantly. The Agile Release Train support module helped me better serve my teams. Worth every penny!",
                          rating: 5
                        },
                        { 
                          name: "Franklin Lee", 
                          role: "Agile Facilitator", 
                          review: "Excellent course structure! The two-day format was intensive but well-paced. I've already applied the team coaching and facilitation frameworks in my organization with great results.",
                          rating: 5
                        },
                        { 
                          name: "Gabriela Silva", 
                          role: "Scrum Master", 
                          review: "The SAFe SSM training exceeded expectations. The case studies on PI planning and team ceremonies were incredibly practical. The exam preparation was thorough and effective.",
                          rating: 5
                        },
                        { 
                          name: "Henry Chen", 
                          role: "Agile Team Coach", 
                          review: "This course helped me bridge the gap between Scrum and SAFe. The servant leadership and team facilitation principles are now core to my coaching approach.",
                          rating: 5
                        },
                        { 
                          name: "Isabella Martinez", 
                          role: "Lead Scrum Master", 
                          review: "Outstanding investment in professional development! The SAFe Scrum Master framework concepts are clearly explained with relevant examples. I feel confident facilitating Agile Release Trains now.",
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
                        { q: "What is the SAFe Scrum Master (SSM) certification?", a: "The SAFe Scrum Master (SSM) certification validates your knowledge of Scrum Master responsibilities in the Scaled Agile Framework and your ability to facilitate Agile teams, coach team members, and support Program Increment (PI) planning in a SAFe environment." },
                        { q: "How long is the certification valid?", a: "The SAFe Scrum Master (SSM) certification is valid for one year from the date of issue. You can renew it by earning continuing education credits or taking advanced SAFe courses." },
                        { q: "What is included in the course?", a: "The course includes 16 hours of live training over 2 days, comprehensive course materials, practice exam, and one year of access to the SAFe Community Platform." },
                        { q: "Do I need prior Agile experience?", a: "While prior Agile experience is helpful, it's not required. The course is designed for both beginners and experienced practitioners. Basic understanding of Scrum or Agile practices is recommended." }
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
                  <div className="text-4xl font-bold text-gray-900 mb-2">$515</div>
                  <div className="text-base text-gray-500 line-through">$1,030</div>
                  <div className="text-sm text-green-600 font-semibold mt-2">50% OFF</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">16 Hours Training</span>
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
                    <span className="text-sm text-gray-700">SAFe Scrum Master Certification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">16 PDUs & SEUs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Lifetime Access to Materials</span>
                  </div>
                </div>

                <Link 
                  href={`/courses/scrum-master/schedule?course=${courseSlug}`}
                  className="w-full border-2 border-[#fa4a23] text-[#fa4a23] font-semibold py-3 rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors mb-4 inline-block text-center"
                >
                  View Schedule
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Test Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2 className="text-4xl font-bold text-gray-900">SAFe Scrum Master Practice Test</h2>
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
                  SAFe Scrum Master Practice Test
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
                  <span className="text-base text-gray-700 font-medium">2 hours</span>
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
                <button
                  onClick={() => setShowAssessmentModal(true)}
                  className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold px-8 py-3 rounded-lg transition-colors"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="w-full bg-white py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-[#01203d] mb-1">Get the SAFe Scrum Master Certification</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">SAFe Scrum Master Certificate</h2>
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
              src="/SSM_Certification.jpeg"
              alt="SAFe Scrum Master Certificate"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-2">SAFe Scrum Master Course FAQs</p>
            <h2 className="text-3xl font-bold text-gray-900">FAQs on SAFe Scrum Master Certification Course</h2>
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
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. For questions, please email d.stevenson@agile36.com." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Is there any option to complete the Training in the native language if a participant chooses to?", a: "Currently, our SAFe Scrum Master training is conducted in English. However, we do offer course materials in multiple languages. Please contact us to discuss your specific language requirements." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com so they can be processed promptly." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes, upon successful completion of the SAFe Scrum Master course and passing the certification exam, you'll receive the official SAFe Scrum Master (SSM) certificate from Scaled Agile, Inc." }
                ],
                exam: [
                  { q: "How is the SAFe Scrum Master different from a regular Scrum Master?", a: "The SAFe Scrum Master operates at enterprise scale — supporting not just one team but an entire Agile Release Train (ART). You'll learn PI Planning, program-level ceremonies, and how to coordinate across multiple teams, which goes well beyond traditional Scrum." },
                  { q: "Is the SAFe SSM exam included in the course price?", a: "Yes. Your first exam attempt is included in your Agile36 course fee. The exam must be taken within 30 days of completing the course." },
                  { q: "How long does SAFe Scrum Master certification last?", a: "One year. Renewal requires earning 24 Continuing Education Units (CEUs) and paying the $195 annual renewal fee to Scaled Agile." },
                  { q: "Can I take the SAFe SSM exam online?", a: "Yes. The exam is delivered online through the SAFe Community Platform and can be taken from anywhere within 30 days of course completion." },
                  { q: "What is the passing score for the SAFe Scrum Master exam?", a: "You need to answer at least 33 out of 45 questions correctly (73%) to pass." },
                  { q: "Does Agile36 offer corporate/team training for SAFe Scrum Master?", a: "Yes. Agile36 specializes in enterprise and Fortune 100 training. Contact us for private group pricing and custom scheduling." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. For questions, please email d.stevenson@agile36.com." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials, the certification exam, and one year of access to the SAFe Community Platform. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is SAFe Scrum Master certification?", a: "SAFe Scrum Master (SSM) is a 2-day certification teaching Scrum Masters to facilitate Agile teams within the Scaled Agile Framework. You learn to support teams on Agile Release Trains, participate in PI Planning, remove impediments at scale, and coach teams in SAFe practices." },
                  { q: "Who should take this course?", a: "This course is ideal for current Scrum Masters looking to operate in a SAFe enterprise, team leads transitioning to Agile, project managers moving into Agile facilitation, and anyone on an Agile Release Train (ART)." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. Basic understanding of Scrum or Agile principles and familiarity with iteration-based delivery are recommended but not required." },
                  { q: "How long is the course?", a: "The SAFe Scrum Master course is a 2-day intensive training program, totaling 16 hours of instruction." },
                  { q: "What materials are included?", a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam." },
                  { q: "Is this course available online?", a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you." },
                  { q: "How do I maintain my certification?", a: "The SAFe Scrum Master certification is valid for one year. Renewal requires earning 24 CEUs and paying the $195 annual renewal fee to Scaled Agile." }
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

      {/* Why Agile36 Section */}
      <section className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#01203d] mb-4">
              Why Choose Agile36 for SAFe Certification Training
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">SAFe Silver Partner</h3>
                <p className="text-base text-gray-700">Fully accredited by Scaled Agile, Inc. Our instructors are certified SAFe Program Consultants (SPCs) who meet Scaled Agile&apos;s rigorous standards.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Fortune 100 Experience</h3>
                <p className="text-base text-gray-700">Our instructors have led real SAFe transformations at Fortune 100 companies. You&apos;re learning from practitioners who&apos;ve done it at scale.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">20+ Years of Enterprise Training</h3>
                <p className="text-base text-gray-700">Agile36 has trained tens of thousands of professionals across the US and globally, with a proven track record of high first-attempt pass rates.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">4.9/5.0 Rating</h3>
                <p className="text-base text-gray-700">Based on 2,500+ verified Scaled Agile reviews from professionals who&apos;ve completed our training.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Exam Fee Included</h3>
                <p className="text-base text-gray-700">No surprises. Your first certification exam attempt is included in your course fee.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Post-Training Support</h3>
                <p className="text-base text-gray-700">Access to practice exams, study materials, and instructor support before your exam date.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFe Agilist Certification Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              SAFe Scrum Master Certification
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              There has been a significant increase in demand for the SAFe Scrum Master certification across the United States, as more organizations embrace Agile-at-scale methodologies to enhance productivity and drive business agility. Companies throughout the USA in sectors including technology, finance, healthcare, and manufacturing are actively recruiting SAFe certified Scrum Masters and Agile Coaches who can facilitate Agile teams, support Program Increment (PI) planning, remove impediments, and foster team collaboration. These certified experts are highly valued for their expertise in team facilitation, servant leadership, Agile Release Train support, and continuous improvement. The SAFe Scrum Master certification serves as a powerful differentiator in the competitive US job market, especially as organizations continue their digital transformation journeys.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Certifications Are Required for SAFe Scrum Master Certification Training?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              No prior certification is required to enroll in SAFe Scrum Master Certification Training. However, having foundational knowledge of Agile principles, Scrum methodologies, or team facilitation experience can be beneficial for participants. The SAFe Scrum Master course prepares candidates for the SAFe Scrum Master (SSM) certification exam from Scaled Agile, Inc., covering team facilitation, PI planning support, impediment removal, and Agile Release Train support. The course is accessible to professionals at various stages of their Agile journey.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Are Job Opportunities for SAFe Scrum Master Professionals?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              SAFe Scrum Master professionals in the United States have excellent career prospects across various industries. Job opportunities include Scrum Master, Senior Scrum Master, Agile Coach, Team Facilitator, and Agile Release Train Engineer roles. Companies in technology, finance, healthcare, and manufacturing sectors actively seek professionals with SAFe SSM certification who can facilitate Agile teams, support PI planning, remove impediments, and foster team collaboration. The certification opens doors to leadership positions in Agile team facilitation and coaching roles.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What is the Fee for SAFe Scrum Master Certification?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              The cost of the SAFe Scrum Master certification course typically ranges from <strong>$515 to $1,030</strong>, depending on the specific course offerings and training provider. This investment includes two days of instructor-led training, comprehensive digital study materials, one exam attempt, and a one-year membership to the SAFe Community Platform provided by Scaled Agile, Inc. The pricing for SAFe Scrum Master certification training reflects the value of expert instruction, official materials, and ongoing community access that supports your professional development.
            </p>
          </div>
        </div>
      </section>

      {/* Find Leading SAFe Course in Cities Section */}
      <section className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600 mb-2 text-center">Courses based on location</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#01203d] mb-8 text-center">
            Find SAFe Scrum Master Course in Other Top Cities
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
                  href={`/scrum-master-certification-training/${citySlug}`}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <span className="text-base text-gray-900 font-medium">{city}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free APM Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAssessmentModal(false);
                setAssessmentFormData({ name: "", email: "" });
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center z-10"
            >
              <span className="text-gray-600 text-xl">×</span>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Section - Course Promotion */}
              <div className="bg-gradient-to-br from-[#fffef2] to-[#ffe5d9] p-8 md:w-2/5 flex flex-col justify-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Ready to Master This Certification?
                  </h2>
                  <p className="text-base text-gray-700 mb-4">
                    Take your learning to the next level with our comprehensive training course.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#fa4a23]">
                    <p className="text-sm font-semibold text-[#fa4a23] mb-1">
                      🎯 Special Offer
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      $50 Off Full Course Enrollment
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Live instructor-led sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Official certification exam voucher
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Lifetime access to course materials
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Section - Practice Test Form */}
              <div className="p-8 md:w-3/5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Start Your Practice Test
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Enter your details below to access the {examName}
                </p>
                <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="assessment-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="assessment-name"
                      required
                      value={assessmentFormData.name}
                      onChange={(e) =>
                        setAssessmentFormData({ ...assessmentFormData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="assessment-email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="assessment-email"
                      required
                      value={assessmentFormData.email}
                      onChange={(e) =>
                        setAssessmentFormData({ ...assessmentFormData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send you the practice test link and course information
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#fa4a23] to-[#e03d1a] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {isSubmitting ? 'Submitting...' : 'Start Practice Test'}
                  </button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                    <p className="text-xs text-blue-800 text-center">
                      💡 <strong>Interested in the full course?</strong> We'll send you exclusive enrollment details and special pricing after you complete the practice test.
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 text-center">
                    ✔ By providing your contact details you agreed to our{" "}
                    <Link href="#" className="font-bold hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    &{" "}
                    <Link href="#" className="font-bold hover:underline">
                      Terms and Conditions.
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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
