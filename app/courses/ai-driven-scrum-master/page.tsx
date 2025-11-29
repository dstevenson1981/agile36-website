"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AIDrivenScrumMasterCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [expandedCurriculum, setExpandedCurriculum] = useState<number[]>([0]);

  const courseSlug = "ai-driven-scrum-master";

  const toggleCurriculum = (index: number) => {
    setExpandedCurriculum(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
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
            <span className="text-[#01203d]">Courses</span>
            <span>/</span>
            <span className="text-[#01203d]">AI-Driven Scrum Master™ Certification Training</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-6">
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
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-900">2,500+ enrolled</span>
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
                  AI-Driven Scrum Master™ Certification Training
                </h1>
                <p className="text-xl text-gray-900 font-bold mb-4">
                  Enhance Your Scrum Master Skills with AI-Powered Tools and Practices
                </p>
                
                {/* Key Benefits with Checkmarks */}
                <div className="space-y-3 mb-6">
                  {[
                    "Master AI-enhanced Scrum practices and methodologies",
                    "Learn to leverage Agile AI tools for team facilitation",
                    "Integrate AI technologies into your Scrum ceremonies",
                    "Enhance team productivity with AI-driven insights",
                    "Stay ahead with cutting-edge AI-Scrum integration"
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

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="/AI_Driven_Scrum_Master_Brochure.pdf" 
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
                  href={`/courses/ai-driven-scrum-master/schedule?course=${courseSlug}`}
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
                  src="/redd-francisco-5U_28ojjgms-unsplash.jpg" 
                  alt="AI-Driven Scrum Master" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Demand & Salary Section */}
      <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why AI-Driven Scrum Masters Are in High Demand
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Organizations are racing to integrate AI into their Agile workflows. Scrum Masters with AI expertise command premium salaries and have unprecedented career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Stat 1 - Salary Premium */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Higher Salary</div>
              <p className="text-sm text-gray-600 mb-4">AI-skilled Scrum Masters earn significantly more than traditional Scrum Masters.</p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-2xl md:text-3xl font-bold text-[#fa4a23]">$125K–$165K</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">typical range</div>
              </div>
            </div>

            {/* Stat 2 - Job Growth */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Job Growth</div>
              <p className="text-sm text-gray-600 mb-4">Demand for AI-Agile roles is rapidly increasing over the next 2 years.</p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xl md:text-2xl font-bold text-blue-600">Strong Growth</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">in enterprise demand</div>
              </div>
            </div>

            {/* Stat 3 - Productivity */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Faster Delivery</div>
              <p className="text-sm text-gray-600 mb-4">Teams using AI improve speed and quality noticeably within months.</p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xl md:text-2xl font-bold text-[#fa4a23]">Strong ROI</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">within the first year</div>
              </div>
            </div>
          </div>

          {/* Skills Demand Chart */}
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Key Skills Covered in This Course</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">AI-Assisted Sprint Planning</div>
                  <div className="text-sm text-gray-600">High Demand</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#fa4a23] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">AI-Powered Retrospectives</div>
                  <div className="text-sm text-gray-600">High Demand</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">Automated Workflow Optimization</div>
                  <div className="text-sm text-gray-600">High Demand</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#fa4a23] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">AI-Enhanced Team Performance Analytics</div>
                  <div className="text-sm text-gray-600">Growing Priority</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">Prompt Engineering for Agile</div>
                  <div className="text-sm text-gray-600">Essential Skill</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="border-2 border-blue-200 rounded-lg p-8 bg-white">
            <p className="text-sm text-blue-600 font-medium mb-2">AI-Driven Scrum Master™ Training Highlights</p>
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#01203d]">
                What Are the Key Highlights of the AI-Driven Scrum Master™ Training Course
              </h2>
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Highlight 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">8 Hours of Live Sessions With Industry Experts</h3>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 2v6h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hands-On Practice Using the Latest AI Tools</h3>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Prompts for Scrum Master Tasks</h3>
                </div>
              </div>

              {/* Highlight 4 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Practical AI Applications Designed for Scrum Masters</h3>
                </div>
              </div>

              {/* Highlight 5 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Solutions Covering the Complete Agile Lifecycle</h3>
                </div>
              </div>

              {/* Highlight 6 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-World Projects Customized for Scrum Masters</h3>
                </div>
              </div>

              {/* Highlight 7 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Assignments Ensuring Mastery of Each Concept</h3>
                </div>
              </div>

              {/* Highlight 8 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">1-on-1 Post-Class Doubt-Solving Sessions</h3>
                </div>
              </div>

              {/* Highlight 9 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">24/7 Learning Assistance and Support</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key to Success Section */}
      <section className="w-full bg-gradient-to-b from-[#d3edff52] to-transparent py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#01203d] mb-12 text-center">
            Our Key to Career Success
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                title: "Expert-Led Training" 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ), 
                title: "Comprehensive Materials" 
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
                title: "Flexible Payment Plans" 
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
                title: "Hands-On Experience" 
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

      {/* Learning Path Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-100 relative overflow-hidden">
            {/* Decorative wavy lines in bottom right */}
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path d="M0,100 Q50,50 100,100 T200,100" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-600" />
                <path d="M0,120 Q50,70 100,120 T200,120" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-600" />
                <path d="M0,140 Q50,90 100,140 T200,140" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-600" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#01203d]">
                  AI-Driven Scrum Master™ Learning Path
                </h2>
              </div>

              <div className="space-y-6">
                {/* Step 1 - Enroll */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Enroll:</h3>
                    <p className="text-base text-gray-700">Join live, interactive sessions led by expert Scrum instructors.</p>
                  </div>
                </div>

                {/* Step 2 - Learn */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Learn:</h3>
                    <p className="text-base text-gray-700">Master AI tools across the complete Agile and Scrum lifecycle.</p>
                  </div>
                </div>

                {/* Step 3 - Practice */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Practice:</h3>
                    <p className="text-base text-gray-700">Apply AI prompts, case studies, and hands-on activities. Prepare for the certification exam.</p>
                  </div>
                </div>

                {/* Step 4 - Become Certified */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fa4a23] text-white flex items-center justify-center text-2xl font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Become a Certified AI-Driven Scrum Master:</h3>
                    <p className="text-base text-gray-700">Pass the certification exam and earn your AI-Driven Scrum Master™ Certification, issued through Accredible, the global credentialing platform used by top universities and training providers.</p>
                  </div>
                </div>
              </div>
            </div>
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
                        The AI-Driven Scrum Master™ Certification Training is designed to help Scrum Masters enhance their facilitation, coaching, and team leadership skills using AI-powered tools and practices. This comprehensive course covers AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        Learn how to leverage AI technologies to improve team productivity, enhance decision-making, and streamline Scrum ceremonies while maintaining ethical and responsible AI practices.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Master AI-enhanced Scrum practices and methodologies",
                          "Leverage AI tools for backlog refinement and story quality",
                          "Use AI for sprint planning and forecasting",
                          "Apply AI to daily Scrum and impediment management",
                          "Integrate AI into testing, quality, and release readiness",
                          "Enhance coaching and facilitation with AI support"
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
                        <li>Scrum Masters looking to enhance their skills with AI tools</li>
                        <li>Agile Coaches seeking to integrate AI into their practice</li>
                        <li>Team Leads and Facilitators working with Scrum teams</li>
                        <li>Product Owners interested in AI-enhanced backlog management</li>
                        <li>Anyone involved in Agile transformation and team facilitation</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Course Curriculum</p>
                        <h2 className="text-3xl font-bold text-gray-900">AI-Driven Scrum Master™ Course Curriculum</h2>
                      </div>
                      <a 
                        href="/AI_Driven_Scrum_Master_Brochure.pdf" 
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

                    <div className="space-y-4">
                      {[
                        { 
                          title: "Module 1: The AI-Enhanced Scrum Master",
                          topics: [
                            "How AI supports facilitation, coaching, and team leadership",
                            "Applying AI to real Scrum challenges and decision-making"
                          ],
                          learningObjective: "Understand how AI can enhance Scrum Master capabilities and support team leadership"
                        },
                        { 
                          title: "Module 2: AI for Backlog Refinement & Story Quality",
                          topics: [
                            "Using AI to generate and improve user stories and acceptance criteria",
                            "Identifying gaps, dependencies, and risks with AI assistance"
                          ],
                          learningObjective: "Learn to leverage AI for better backlog management and story quality"
                        },
                        { 
                          title: "Module 3: AI-Driven Sprint Planning & Forecasting",
                          topics: [
                            "Capacity planning, estimating, and sprint goal support with AI",
                            "Using AI to surface scope trade-offs and planning risks"
                          ],
                          learningObjective: "Master AI-enhanced sprint planning and forecasting techniques"
                        },
                        { 
                          title: "Module 4: AI for Daily Scrum, Flow, and Impediment Management",
                          topics: [
                            "AI summaries of blockers, WIP, and aging items",
                            "Improving flow and cycle time visibility with AI tools"
                          ],
                          learningObjective: "Use AI to improve daily Scrum effectiveness and flow management"
                        },
                        { 
                          title: "Module 5: AI-Supported Testing, Quality, and Release Readiness",
                          topics: [
                            "Using AI for test ideas, validation, and risk identification",
                            "Automating release notes and readiness summaries"
                          ],
                          learningObjective: "Enhance testing and release processes with AI support"
                        },
                        { 
                          title: "Module 6: Coaching & Facilitation with AI",
                          topics: [
                            "AI-generated retro formats, discussion prompts, and insights",
                            "Using AI to prepare for difficult coaching conversations"
                          ],
                          learningObjective: "Improve coaching and facilitation skills using AI tools"
                        },
                        { 
                          title: "Module 7: Practical Use of AI in Jira, Confluence, and Team Tools",
                          topics: [
                            "AI integrations for backlog, documentation, and dashboards",
                            "Workflow automation examples for real Scrum teams"
                          ],
                          learningObjective: "Integrate AI into common team tools and workflows"
                        },
                        { 
                          title: "Module 8: Ethics, Transparency, and Responsible AI in Agile Teams",
                          topics: [
                            "When and how to use AI safely",
                            "Building a team AI working agreement"
                          ],
                          learningObjective: "Understand ethical AI use and create team agreements"
                        },
                        { 
                          title: "Module 9: Best Practices, Case Studies, and Real Team Examples",
                          topics: [
                            "How high-performing teams use AI today",
                            "Lessons learned from AI-augmented Scrum environments"
                          ],
                          learningObjective: "Learn from real-world examples and best practices"
                        },
                        { 
                          title: "Module 10: Your 30-Day AI Adoption Plan",
                          topics: [
                            "Defining 3–5 workflows to augment with AI",
                            "Personal playbook for applying AI after class"
                          ],
                          learningObjective: "Create a practical plan for AI adoption in your Scrum practice"
                        }
                      ].map((part, index) => (
                        <div key={index} className="border border-blue-200 rounded-lg bg-white">
                          <button
                            onClick={() => toggleCurriculum(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-900">{part.title}</h3>
                            <svg 
                              className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform ${expandedCurriculum.includes(index) ? 'rotate-180' : ''}`}
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
                                  <p className="font-semibold text-gray-900 mb-2">Topics:</p>
                                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {part.topics.map((topic, topicIndex) => (
                                      <li key={topicIndex}>{topic}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {part.learningObjective && (
                                <div>
                                  <p className="font-semibold text-gray-900 mb-2">Learning Objective:</p>
                                  <p className="text-gray-700">{part.learningObjective}</p>
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
                      <h2 className="text-3xl font-bold text-gray-900">Student Reviews</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-base font-semibold text-gray-900">4.9 (156 reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[
                        { 
                          name: "David Martinez", 
                          role: "Scrum Master", 
                          review: "This course transformed how I approach Scrum ceremonies. The AI tools for backlog refinement and sprint planning have significantly improved my team's productivity. Highly recommend!",
                          rating: 5
                        },
                        { 
                          name: "Jennifer Kim", 
                          role: "Agile Coach", 
                          review: "Excellent course on integrating AI into Scrum practices. The Jira and Confluence integration examples were particularly valuable. The 30-day adoption plan gave me a clear roadmap.",
                          rating: 5
                        },
                        { 
                          name: "Robert Thompson", 
                          role: "Team Lead", 
                          review: "The AI-enhanced facilitation techniques have made my daily Scrums much more effective. The course covers everything from practical tool usage to ethical considerations. Great balance!",
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
                        { q: "What is the AI-Driven Scrum Master™ Certification Training?", a: "The AI-Driven Scrum Master™ Certification Training is designed to help Scrum Masters enhance their facilitation, coaching, and team leadership skills using AI-powered tools and practices. It covers AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching." },
                        { q: "Is there an exam for this course?", a: "No, this course does not include an exam. It focuses on practical skills and knowledge for applying AI tools to enhance Scrum Master effectiveness." },
                        { q: "What is included in the course?", a: "The course includes 8 hours of live virtual training, comprehensive course materials, hands-on exercises with AI tools, practical examples for Jira and Confluence, and a 30-day AI adoption plan." },
                        { q: "Do I need prior Scrum Master experience?", a: "While prior Scrum Master experience is helpful, the course is designed for both new and experienced Scrum Masters who want to enhance their practice with AI tools." }
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
                  <div className="text-4xl font-bold text-gray-900 mb-2">$555</div>
                  <div className="text-base text-gray-500 line-through">$1,110</div>
                  <div className="text-sm text-green-600 font-semibold mt-2">50% OFF</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">1 Day (8 Hours) Live Virtual Training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Comprehensive Course Materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Hands-On Exercises</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Expert-Led Sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Lifetime Access to Materials</span>
                  </div>
                </div>

                <Link 
                  href={`/courses/ai-driven-scrum-master/schedule?course=${courseSlug}`}
                  className="w-full border-2 border-[#fa4a23] text-[#fa4a23] font-semibold py-3 rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors mb-4 inline-block text-center"
                >
                  View Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-2">AI-Driven Scrum Master™ Course FAQs</p>
            <h2 className="text-3xl font-bold text-gray-900">FAQs on AI-Driven Scrum Master™ Certification Training</h2>
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
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before the scheduled class start date. Cancellations received within thirty (30) days of the class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. For questions, please email d.stevenson@agile36.com." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com so they can be processed promptly." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before the scheduled class start date. Cancellations received within thirty (30) days of the class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. For questions, please email d.stevenson@agile36.com." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials and resources. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is the AI-Driven Scrum Master™ Certification Training?", a: "The AI-Driven Scrum Master™ Certification Training is designed to help Scrum Masters enhance their facilitation, coaching, and team leadership skills using AI-powered tools and practices. It covers AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching." },
                  { q: "Who should take this course?", a: "This course is ideal for Scrum Masters, Agile Coaches, Team Leads, Facilitators, Product Owners, and anyone involved in Agile transformation and team facilitation who wants to enhance their practice with AI tools." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. However, having a basic understanding of Scrum fundamentals and Agile principles is recommended. Prior Scrum Master experience is helpful but not required." },
                  { q: "Is there a certification exam?", a: "No, this course does not include a certification exam. It focuses on practical skills and knowledge for applying AI tools to enhance Scrum Master effectiveness." }
                ]
              };

              const currentFaqs = faqs[activeFaqCategory as keyof typeof faqs] || [];

              return currentFaqs.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        setExpandedFaqs(prev =>
                          prev.includes(index)
                            ? prev.filter(i => i !== index)
                            : [...prev, index]
                        );
                      }}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-bold text-gray-900 pr-4">{faq.q}</h3>
                      <svg
                        className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
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
                        <p className="text-base text-gray-700">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>
    </main>
  );
}