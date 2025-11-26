"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function CityLPMCoursePage() {
  const params = useParams();
  const city = params?.city as string;
  
  // Convert slug to display name (e.g., "new-york" -> "New York")
  const cityDisplayName = city
    ? city
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

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

  const examName = "SAFe Lean Portfolio Management Practice Test";
  const courseSlug = "lean-portfolio-management";

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
          source: 'Free LPM Assessment',
          exam_name: examName
        }),
      });

      if (response.ok) {
        // Redirect to practice test
        window.location.href = '/test/lean-portfolio-management';
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
            <span className="text-[#01203d]">SAFe Lean Portfolio Management Certification Training</span>
            {cityDisplayName && (
              <>
                <span>/</span>
                <span className="text-[#01203d]">{cityDisplayName}</span>
              </>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe</span>
                <span className="text-sm text-gray-500">SAFe Lean Portfolio Management Certification Training</span>
              </div>

              {/* Rating and Enrolled */}
              <div className="flex items-center gap-6">
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
                  SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training
                  {cityDisplayName && (
                    <span className="block text-3xl md:text-4xl mt-2">in {cityDisplayName}</span>
                  )}
                </h1>
                <p className="text-lg text-gray-700 font-semibold">
                  Lead Agile Portfolios with SAFe® LPM Training That Delivers Real Value
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {[
                  "Join 16 Hrs of Live Online Training by Certified SAFe® LPM Trainers",
                  "Learn Real-World Case Studies & Hands-On Portfolio Exercises",
                  "Exam Fee Included in Training | Get Support for SAFe® LPM Exam",
                  "Earn 16 PDUs & SEUs with SAFe® 6 LPM Certification Course",
                  "Access to SAFe® Community & Career Resources"
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
                <span className="text-base font-semibold text-gray-900">Accredited by</span>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded flex items-center justify-center overflow-hidden">
                    <Image
                      src="/Silver.png"
                      alt="Scaled Agile Silver Partner"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-16 h-16 rounded flex items-center justify-center overflow-hidden">
                    <Image
                      src="/SAFe Lean Portfolio Management.png"
                      alt="SAFe Lean Portfolio Management"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="/LPM_6.0_Partner (1).pdf" 
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
                  href={`/courses/lean-portfolio-management/schedule?course=${courseSlug}`}
                  className="px-6 py-3 bg-[#fa4a23] text-white font-bold rounded-md hover:bg-[#e03d1a] transition-colors inline-block text-center"
                >
                  View Schedules
                </Link>
                <button 
                  onClick={() => setShowAssessmentModal(true)}
                  className="px-6 py-3 border-2 border-[#0e78c2] text-[#0e78c2] font-bold rounded-md hover:bg-[#0e78c2] hover:text-white transition-colors"
                >
                  Free LPM Assessment
                </button>
              </div>
            </div>

            {/* Right Side - Image Card */}
            <div className="lg:flex lg:justify-end">
              <div className="max-w-md w-full">
                <img 
                  src="/LeadingSAFeHome.jpg" 
                  alt="SAFe Lean Portfolio Management" 
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
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Overview</h2>
                      <p className="text-base text-gray-700 mb-4">
                        SAFe Lean Portfolio Management® 6.0 is a comprehensive course that provides the knowledge and skills needed to lead a Lean-Agile enterprise using the Scaled Agile Framework (SAFe). This course prepares you to take the SAFe® 6 Agilist (SA) certification exam.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        During this two-day course, you'll learn how to lead an enterprise Agile transformation by leveraging the Scaled Agile Framework. You'll understand how to establish team and technical agility, organize around value, and lead the transformation.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Understanding SAFe principles and values",
                          "Leading Lean-Agile transformations",
                          "Establishing team and technical agility",
                          "Organizing around value streams",
                          "Implementing Lean Portfolio Management",
                          "Building a culture of continuous improvement"
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
                        <li>Executives and leaders driving Agile transformations</li>
                        <li>Agile coaches and consultants</li>
                        <li>Program and portfolio managers</li>
                        <li>Product and solution managers</li>
                        <li>Anyone interested in leading enterprise Agile transformations</li>
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
                            <p className="font-semibold text-gray-900">SAFe® 6 Agilist (SA) Certification</p>
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

                    {/* What is SAFe Lean Portfolio Management Training */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What is SAFe Lean Portfolio Management training?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        SAFe Lean Portfolio Management Training is a certification program designed to help professionals understand and implement the Scaled Agile Framework (SAFe) in their organizations. This comprehensive course covers the principles, practices, and tools needed to lead enterprise Agile transformations successfully.
                      </p>
                      <p className="text-base text-gray-700">
                        The training prepares participants for the SAFe Lean Portfolio Management certificate exam, providing them with the knowledge and skills to scale Agile practices across large organizations and deliver value more effectively.
                      </p>
                    </div>

                    {/* Why SAFe Lean Portfolio Management */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Why SAFe Lean Portfolio Management?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        The SAFe Lean Portfolio Management® Certification empowers professionals to lead Agile transformations at an enterprise scale. It provides a comprehensive understanding of how to apply Lean-Agile principles across multiple teams and departments, ensuring alignment and continuous delivery of value.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        By earning this certification, you gain the expertise to coordinate multiple teams, enhance collaboration, and deliver continuous value to customers. The certification is recognized globally and opens doors to leadership roles in Agile organizations.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-[#006f] p-6 my-6">
                        <p className="text-base text-gray-700 font-semibold mb-2">Key Benefits:</p>
                        <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
                          <li>Lead enterprise-wide Agile transformations</li>
                          <li>Improve team collaboration and alignment</li>
                          <li>Accelerate time-to-market for products and services</li>
                          <li>Increase customer satisfaction through continuous delivery</li>
                          <li>Enhance career prospects with globally recognized certification</li>
                        </ul>
                      </div>
                    </div>

                    {/* What Will You Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What Will You Learn in SAFe Lean Portfolio Management Certification Training?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Complete your SAFe Agile certification course to gain the practical tools and leadership mindset needed to scale agility across your organization. This comprehensive training covers all aspects of the Scaled Agile Framework.
                      </p>
                      <p className="text-base text-gray-700 mb-6">
                        Through SAFe Lean Portfolio Management Agilist Certification, you will learn:
                      </p>
                      <div className="space-y-4">
                        {[
                          "How to apply SAFe principles and values in your organization",
                          "Techniques for establishing team and technical agility",
                          "Methods for organizing around value streams",
                          "Strategies for implementing Lean Portfolio Management",
                          "Approaches to building a culture of continuous improvement",
                          "Best practices for leading Agile Release Trains (ARTs)",
                          "How to facilitate PI Planning events",
                          "Techniques for managing dependencies and risks"
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
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Prerequisites for SAFe Lean Portfolio Management Certification Training Course?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        There are no prerequisites to enroll in the <strong>SAFe Lean Portfolio Management Certification course.</strong> However, it is recommended for professionals to have:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Basic understanding of Agile principles and practices</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Experience working in software development or IT projects</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Interest in leading organizational change and transformation</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#fa4a23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-base text-gray-700">Willingness to learn and apply SAFe principles in your work environment</p>
                        </div>
                      </div>
                    </div>

                    {/* Career Advancement */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">How Does SAFe® Agile Certification Advance Your Career?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Earning your SAFe Lean Portfolio Management certification opens up numerous career opportunities and demonstrates your commitment to professional growth. The certification validates your ability to lead Agile transformations and manage complex enterprise-level initiatives.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Career Growth</h4>
                          <p className="text-base text-gray-700">
                            SAFe certification positions you for leadership roles in Agile organizations, including Agile Coach, Release Train Engineer, and Enterprise Agile Coach positions.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Salary Increase</h4>
                          <p className="text-base text-gray-700">
                            Certified SAFe professionals typically earn 20-30% more than their non-certified peers, with salaries ranging from $100,000 to $150,000+ depending on experience and location.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Industry Recognition</h4>
                          <p className="text-base text-gray-700">
                            The SAFe certification is recognized by top organizations worldwide, including Fortune 500 companies, making you a valuable asset in the job market.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Network Expansion</h4>
                          <p className="text-base text-gray-700">
                            Join a global community of 1+ million SAFe professionals, access exclusive resources, and connect with industry leaders through the SAFe Community Platform.
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
                      <h3 className="text-xl font-bold text-[#006f] mb-4">SAFe Lean Portfolio Management Exam Information</h3>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam Format:</p>
                            <p className="text-base text-gray-700">Multiple choice, 45 questions</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Duration:</p>
                            <p className="text-base text-gray-700">90 minutes</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Passing Score:</p>
                            <p className="text-base text-gray-700">35 out of 45 (77%)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam Fee:</p>
                            <p className="text-base text-gray-700">Included with course enrollment</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-base text-gray-700 mb-2">
                            <strong>Note:</strong> The exam can be taken online from anywhere, and you have 30 days after course completion to take the exam. If you don't pass on your first attempt, you can retake the exam for a $50 fee paid directly to Scaled Agile.
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
                        { day: "Day 1", topics: ["Introduction to SAFe", "Becoming a Lean-Agile Leader", "Establishing Team and Technical Agility", "Building Solutions with Agile Product Delivery"] },
                        { day: "Day 2", topics: ["Exploring Lean Portfolio Management", "Leading the Transformation", "Exam Preparation", "Practice Exam"] }
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
                          name: "Sarah Chen", 
                          role: "Senior Product Manager", 
                          review: "Excellent course! The instructors were knowledgeable and the material was comprehensive. I passed the exam on my first try. Highly recommend for anyone looking to scale Agile practices.",
                          rating: 5
                        },
                        { 
                          name: "Michael Rodriguez", 
                          role: "Agile Transformation Lead", 
                          review: "The SAFe Lean Portfolio Management training exceeded my expectations. The real-world examples and case studies made the concepts easy to understand. The practice exam was particularly helpful.",
                          rating: 5
                        },
                        { 
                          name: "Emily Thompson", 
                          role: "Program Manager", 
                          review: "As someone new to SAFe, this course provided a solid foundation. The instructors were patient and answered all my questions. The certification process was straightforward.",
                          rating: 5
                        },
                        { 
                          name: "David Kim", 
                          role: "Enterprise Agile Coach", 
                          review: "Outstanding training program! The content is well-structured and the instructors bring years of practical experience. I've already applied many concepts in my organization.",
                          rating: 5
                        },
                        { 
                          name: "Jennifer Martinez", 
                          role: "Release Train Engineer", 
                          review: "This course helped me understand the bigger picture of SAFe implementation. The interactive sessions and group discussions were valuable. Worth every penny!",
                          rating: 5
                        },
                        { 
                          name: "Robert Anderson", 
                          role: "Scrum Master", 
                          review: "The SAFe Lean Portfolio Management certification has opened new career opportunities for me. The training materials are comprehensive and the exam preparation was thorough.",
                          rating: 5
                        },
                        { 
                          name: "Lisa Wang", 
                          role: "Portfolio Manager", 
                          review: "I appreciated the focus on practical application. The instructors shared real-world challenges and solutions. The course exceeded my expectations in every way.",
                          rating: 5
                        },
                        { 
                          name: "James Wilson", 
                          role: "IT Director", 
                          review: "Excellent investment in professional development. The SAFe framework concepts are clearly explained with relevant examples. I feel confident leading Agile transformations now.",
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
                        { q: "What is the SAFe Lean Portfolio Management certification?", a: "The SAFe Lean Portfolio Management (SA) certification validates your knowledge of the Scaled Agile Framework and your ability to lead enterprise Agile transformations." },
                        { q: "How long is the certification valid?", a: "The SAFe Lean Portfolio Management certification is valid for one year from the date of issue. You can renew it by earning continuing education credits." },
                        { q: "What is included in the course?", a: "The course includes 16 hours of live training, course materials, practice exam, and one year of access to the SAFe Community Platform." },
                        { q: "Do I need prior Agile experience?", a: "While prior Agile experience is helpful, it's not required. The course is designed for both beginners and experienced practitioners." }
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
                    <span className="text-sm text-gray-700">SAFe Lean Portfolio Management Certification</span>
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
                  href={`/courses/lean-portfolio-management/schedule?course=${courseSlug}`}
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
            <p className="text-sm text-gray-600 mb-2">Unsure about your prep?</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2 className="text-4xl font-bold text-gray-900">SAFe Lean Portfolio Management® Practice Test</h2>
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
                  SAFe Lean Portfolio Management Practice Test | SAFe Lean Portfolio Management Mock Test
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
                  href="/test/lean-portfolio-management"
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
            <p className="text-sm text-[#01203d] mb-1">Get the SAFe Lean Portfolio Management® Certification</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">SAFe 6.0 Agilist Certificate</h2>
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
            <p className="text-sm text-gray-600 mb-2">SAFe Lean Portfolio Management® Course FAQs</p>
            <h2 className="text-3xl font-bold text-gray-900">FAQs on SAFe Lean Portfolio Management® 6.0 Certification Course</h2>
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
                  { q: "Is there any option to complete the Training in the native language if a participant chooses to?", a: "Currently, our SAFe Lean Portfolio Management training is conducted in English. However, we do offer course materials in multiple languages. Please contact us to discuss your specific language requirements." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, you can reschedule your training class as long as it's within 24 hours of the start time at no additional charge. Please contact our support team to make changes to your enrollment." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes, upon successful completion of the SAFe Lean Portfolio Management course and passing the certification exam, you'll receive the official SAFe 6.0 Agilist (SA) certificate from Scaled Agile, Inc." }
                ],
                exam: [
                  { q: "What is the format of the SAFe Lean Portfolio Management exam?", a: "The SAFe Lean Portfolio Management exam is a multiple-choice exam with 45 questions. You have 90 minutes to complete it, and you need to score 35 out of 45 (77%) to pass." },
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
                  { q: "What is SAFe Lean Portfolio Management certification?", a: "SAFe Lean Portfolio Management is a comprehensive course that provides the knowledge and skills needed to lead a Lean-Agile enterprise using the Scaled Agile Framework (SAFe). It prepares you for the SAFe 6 Agilist (SA) certification exam." },
                  { q: "Who should take this course?", a: "This course is ideal for executives, leaders, Agile coaches, program managers, product managers, and anyone interested in leading enterprise Agile transformations." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in software development or IT projects is recommended." },
                  { q: "How long is the course?", a: "The SAFe Lean Portfolio Management course is a 2-day intensive training program, totaling 16 hours of instruction." },
                  { q: "What materials are included?", a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam." },
                  { q: "Is this course available online?", a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you." },
                  { q: "How do I maintain my certification?", a: "The SAFe Lean Portfolio Management certification is valid for one year. You can renew it by earning continuing education credits or by taking advanced SAFe courses." }
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
              Why Choose the SAFe Lean Portfolio Management Certification Course with Agile36?
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
                    Agile36 offers SAFe Lean Portfolio Management training accredited by Scaled Agile, Inc., ensuring an internationally recognized certification valued across industries and enterprises worldwide.
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

      {/* SAFe Lean Portfolio Management Certification in the USA Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              SAFe Lean Portfolio Management Certification in the USA
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              There has been a significant increase in demand for the SAFe Lean Portfolio Management 6.0 Agilist certification across the United States, as more organizations embrace Agile-at-scale methodologies to enhance productivity and drive business agility. Companies throughout the USA in sectors including technology, finance, healthcare, and manufacturing are actively recruiting SAFe certified professionals to spearhead enterprise-wide Agile transformations. These certified experts are highly valued for their expertise in connecting strategy with execution through Lean-Agile leadership principles. The SAFe Lean Portfolio Management certification serves as a powerful differentiator in the competitive US job market, especially as organizations continue their digital transformation journeys.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Are Job Opportunities for SAFe Lean Portfolio Management Professionals in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              SAFe Lean Portfolio Management 6.0 certified professionals in the United States have access to a wide range of career opportunities. Popular roles include Agile Coach, Release Train Engineer, Product Owner, Program Manager, and Scrum Master. These positions are in high demand across various industries throughout the USA, including IT, finance, healthcare, and manufacturing sectors. As more enterprises in the United States adopt the Scaled Agile Framework to improve their outcomes and accelerate delivery, the need for certified SAFe professionals continues to grow across the country.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Certifications Are Required for SAFe Agile Certification Training in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              No prior certification is required to enroll in SAFe Agile Certification Training in the United States. However, having foundational knowledge of Agile principles, Scrum methodologies, or project management (such as CSM or PMP certifications) can be beneficial for participants. The SAFe Lean Portfolio Management 6.0 course in the USA prepares candidates for the SAFe Lean Portfolio Management (SA) certification exam from Scaled Agile, Inc., making it accessible to professionals at various stages of their Agile journey.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What is the Fee for SAFe Lean Portfolio Management Certification in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              The cost of the SAFe Lean Portfolio Management certification course in the United States typically ranges from <strong>$545 to $910</strong>, depending on the specific course offerings and training provider. This investment includes two days of instructor-led training, comprehensive digital study materials, one exam attempt, and a one-year membership to the SAFe Community Platform provided by Scaled Agile, Inc. The pricing for SAFe Lean Portfolio Management certification training in the USA reflects the value of expert instruction, official materials, and ongoing community access that supports your professional development.
            </p>
          </div>
        </div>
      </section>

      {/* Find SAFe Lean Portfolio Management Course in Cities Section */}
      <section className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600 mb-2 text-center">Courses based on location</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#01203d] mb-8 text-center">
            Find SAFe Lean Portfolio Management® Course in Other Top Cities in USA
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
            ].map((cityName) => {
              const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={cityName}
                  href={`/lean-portfolio-management-certification-training/${citySlug}`}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <span className="text-base text-gray-900 font-medium">{cityName}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free LPM Assessment Modal */}
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
                  <p className="text-gray-700 mb-4">
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

