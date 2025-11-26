"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AdvancedScrumMasterCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

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
            <span className="text-[#01203d]">Advanced Scrum Master Certification Path</span>
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
                    alt="SAFe Advanced Scrum Master Badge"
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
                  Advanced Scrum Master Certification Path
                </h1>
                <p className="text-xl text-gray-900 font-bold mb-4">
                  Upskill your career with the Advanced Scrum Master Certification path
                </p>
                
                {/* Key Benefits with Checkmarks */}
                <div className="space-y-3 mb-6">
                  {[
                    "Enhance your ability to facilitate Agile teams effectively",
                    "Master conflict resolution & boost team collaboration",
                    "Optimize team flow and Agile Release Train (ART) performance",
                    "Drive organizational success with advanced Agile methodologies",
                    "Access to Advanced Facilitator Training in Conflict and Collaboration"
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
                    alt="SAFe Advanced Scrum Master Certification Badge"
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
                  alt="SAFe Advanced Scrum Master" 
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
                        Make your Scrum Career more progressive with the Advanced Scrum Master Certification Path. This job role of Scrum Master extends beyond providing support for Agile practices. They are responsible for guiding teams to achieve high performance and efficiently delivering value. This course is intended to enhance your knowledge, providing an understanding of Agile frameworks & advanced facilitation methods. It helps you manage dependency issues, manage organizational problems and ensure the continuous improvement of agile teams.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        This course mostly focuses on methodologies for SAFe; the certification provides participants with the necessary skills to assist Agile Release Trains (ART) to improve collaboration among teams and increase the efficiency of workflow. It will provide you with insights into the resolution of conflicts & team dynamics and the Agile metrics that will ensure your team remains flexible and efficient. This course will also include Advanced Facilitator Training in Conflict and Collaboration that is self-paced (2 hours) and facilitated interactive training (4 hours) for you to improve your facilitation and leadership skills.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        Simpliaxis has a comprehensive course of instruction to ensure you are successful in this exam. By combining expert-led training with hands-on activities, and actual scenarios, our training will help you gain hands-on knowledge. Sign up with Simpliaxis and take the next step in your Scrum Master career to the highest level.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <p className="text-base text-gray-700 mb-4">
                        The Advanced Scrum Master Certification Path offers advanced learning opportunities that can benefit experienced Scrum Masters involved in facilitating Agile teams, resolving conflicts, optimizing team flow, and driving organizational success with advanced Agile methodologies.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Advanced facilitation and coaching techniques",
                          "SAFe's Eight Flow Accelerators",
                          "Fostering high-performing Agile teams",
                          "Real-world application and case studies",
                          "Conflict resolution and team collaboration",
                          "Agile Release Train (ART) performance optimization"
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
                        <li>Certified SAFe Scrum Masters (SSM) seeking advancement</li>
                        <li>Experienced Scrum Masters and Agile Coaches</li>
                        <li>Program-level facilitators and coaches</li>
                        <li>Agile transformation leaders</li>
                        <li>Anyone leading organizational Agile change in SAFe</li>
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
                            <p className="font-semibold text-gray-900">Advanced Scrum Master Certification Path</p>
                            <p className="text-sm text-gray-600">Comprehensive certification program</p>
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
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What is the Advanced Scrum Master Certification Path?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        The Advanced Scrum Master Certification Path is an advanced certification program designed to help experienced Scrum Masters enhance their ability to facilitate Agile teams effectively, master conflict resolution, boost team collaboration, optimize team flow and Agile Release Train (ART) performance, and drive organizational success with advanced Agile methodologies.
                      </p>
                      <p className="text-base text-gray-700">
                        This course mostly focuses on methodologies for SAFe; the certification provides participants with the necessary skills to assist Agile Release Trains (ART) to improve collaboration among teams and increase the efficiency of workflow. It will provide you with insights into the resolution of conflicts & team dynamics and the Agile metrics that will ensure your team remains flexible and efficient. This course will also include Advanced Facilitator Training in Conflict and Collaboration that is self-paced (2 hours) and facilitated interactive training (4 hours) for you to improve your facilitation and leadership skills.
                      </p>
                    </div>

                    {/* Why Leading SAFe */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Why Choose the Advanced Scrum Master Certification Path?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        The SAFe Advanced Scrum Master Certification empowers experienced Scrum Masters to effectively lead program-level coaching, organizational transformation, and scaling Agile practices in a SAFe environment. It provides advanced understanding of how to coach at scale, facilitate organizational change, mentor other Scrum Masters, and lead Agile Release Train transformations.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        By earning this certification, you gain the expertise to lead organizational change, scale Agile practices across multiple teams, and develop other Scrum Masters. The certification is recognized globally and opens doors to senior Scrum Master, Program-level Agile Coach, and Agile Transformation Leader roles in enterprise Agile organizations.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-[#006f] p-6 my-6">
                        <p className="text-base text-gray-700 font-semibold mb-2">Key Benefits:</p>
                        <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
                          <li>Master advanced SAFe Scrum Master principles and program-level coaching</li>
                          <li>Improve organizational transformation and change leadership skills</li>
                          <li>Accelerate enterprise agility through program-level facilitation</li>
                          <li>Increase organizational impact through scaling Agile practices</li>
                          <li>Enhance career prospects with globally recognized advanced certification</li>
                        </ul>
                      </div>
                    </div>

                    {/* What Will You Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">What Will You Learn in the Advanced Scrum Master Certification Path?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Complete the Advanced Scrum Master Certification Path to gain the advanced practical tools and knowledge needed to effectively facilitate Agile teams, resolve conflicts, optimize team flow, and drive organizational success. This comprehensive certification path covers advanced facilitation techniques, SAFe's Eight Flow Accelerators, fostering high-performing teams, and real-world applications.
                      </p>
                      <p className="text-base text-gray-700 mb-6">
                        Through the Advanced Scrum Master Certification Path, you will learn:
                      </p>
                      <div className="space-y-4">
                        {[
                          "Advanced facilitation and coaching techniques",
                          "SAFe's Eight Flow Accelerators",
                          "Fostering high-performing Agile teams",
                          "Real-world application and case studies",
                          "Conflict resolution and team collaboration strategies",
                          "Agile Release Train (ART) performance optimization",
                          "Agile metrics for team flexibility and efficiency",
                          "Advanced Facilitator Training in Conflict and Collaboration"
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
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Prerequisites for the Advanced Scrum Master Certification Path?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        To enroll in the <strong>Advanced Scrum Master Certification Path,</strong> you must have:
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

                    {/* Career Advancement */}
                    <div>
                      <h3 className="text-xl font-bold text-[#006f] mb-4">How Does SAFe® Advanced Scrum Master Certification Advance Your Career?</h3>
                      <p className="text-base text-gray-700 mb-4">
                        Earning your SAFe Advanced Scrum Master certification opens up numerous senior career opportunities and demonstrates your commitment to advanced professional growth. The certification validates your ability to effectively lead program-level coaching and organizational transformation in a SAFe environment.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Career Growth</h4>
                          <p className="text-base text-gray-700">
                            The Advanced Scrum Master Certification Path positions you for senior Scrum Master, Agile Coach, and Agile Transformation Leader roles in enterprise Agile organizations.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Salary Increase</h4>
                          <p className="text-base text-gray-700">
                            Certified SAFe Advanced Scrum Master professionals typically earn 30-40% more than their non-certified peers, with salaries ranging from $100,000 to $150,000 depending on experience and location.
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Industry Recognition</h4>
                          <p className="text-base text-gray-700">
                            The SAFe SSM certification is recognized by top organizations worldwide, including Fortune 500 companies, making you a valuable asset in the job market.
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
                      <h3 className="text-xl font-bold text-[#006f] mb-4">Advanced Scrum Master Certification Path Information</h3>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Course Format:</p>
                            <p className="text-base text-gray-700">Live virtual training with hands-on activities</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Duration:</p>
                            <p className="text-base text-gray-700">2 days (10 hours) + Advanced Facilitator Training</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Class Time:</p>
                            <p className="text-base text-gray-700">9 AM - 2 PM EST</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Advanced Facilitator Training:</p>
                            <p className="text-base text-gray-700">Self-paced (2 hours) + Interactive (4 hours)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Exam Format:</p>
                            <p className="text-base text-gray-700">Multiple choice, 20 questions</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Passing Score:</p>
                            <p className="text-base text-gray-700">16 out of 20 (80%)</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-2">Certification:</p>
                            <p className="text-base text-gray-700">Advanced Scrum Master Certification Path</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-base text-gray-700 mb-2">
                            <strong>Note:</strong> This comprehensive certification path combines expert-led training with hands-on activities and actual scenarios to help you gain practical knowledge. The course includes Advanced Facilitator Training in Conflict and Collaboration to improve your facilitation and leadership skills.
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
                        <h2 className="text-3xl font-bold text-gray-900">Advanced Scrum Master Certification Path Curriculum</h2>
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
                        By the end of this certification path, you will be able to:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Enhance your ability to facilitate Agile teams effectively",
                          "Master conflict resolution and boost team collaboration",
                          "Optimize team flow and Agile Release Train (ART) performance",
                          "Drive organizational success with advanced Agile methodologies",
                          "Apply SAFe's Eight Flow Accelerators",
                          "Foster high-performing Agile teams",
                          "Resolve conflicts and understand team dynamics",
                          "Apply Agile metrics to ensure team flexibility and efficiency"
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
                          module: "Module 1: Advanced Facilitation and Coaching Techniques",
                          expanded: false
                        },
                        { 
                          module: "Module 2: SAFe's Eight Flow Accelerators",
                          expanded: false
                        },
                        { 
                          module: "Module 3: Fostering High-Performing Agile Teams",
                          expanded: false
                        },
                        { 
                          module: "Module 4: Real-World Application and Case Studies",
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
                        { q: "What is included in the course?", a: "The course includes 10 hours of live training over 2 days (9 AM - 2 PM EST), Advanced Facilitator Training in Conflict and Collaboration (self-paced 2 hours + interactive 4 hours), comprehensive course materials, practice exam, and certification." },
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
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$950</div>
                  <div className="text-base text-gray-500 line-through">$1,699</div>
                  <div className="text-sm text-green-600 font-semibold mt-2">44% OFF</div>
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
                    <span className="text-sm text-gray-700">SAFe Advanced Scrum Master Certification</span>
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
            <p className="text-sm text-[#01203d] mb-1">Get the SAFe Scrum Master Certification</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">SAFe Advanced Scrum Master Certificate</h2>
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
              alt="SAFe Advanced Scrum Master Certificate"
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
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Refunds are only available if the class is more than 30 days out from the start date. Please contact our support team for more details." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Is there any option to complete the Training in the native language if a participant chooses to?", a: "Currently, our SAFe Scrum Master training is conducted in English. However, we do offer course materials in multiple languages. Please contact us to discuss your specific language requirements." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, you can reschedule your training class as long as it's within 24 hours of the start time at no additional charge. Please contact our support team to make changes to your enrollment." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes, upon successful completion of the SAFe Scrum Master course and passing the certification exam, you'll receive the official SAFe Scrum Master (SSM) certificate from Scaled Agile, Inc." }
                ],
                exam: [
                  { q: "What is the format of the SAFe Scrum Master exam?", a: "The SAFe Scrum Master exam is a multiple-choice exam with 45 questions. You have 90 minutes to complete it, and you need to score 35 out of 45 (77%) to pass." },
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
                  { q: "What is SAFe Scrum Master certification?", a: "SAFe Scrum Master is a comprehensive course that provides the knowledge and skills needed to effectively facilitate Agile teams, coach team members, and support Program Increment (PI) planning in a SAFe environment. It prepares you for the SAFe Scrum Master (SSM) certification exam." },
                  { q: "Who should take this course?", a: "This course is ideal for Product Managers, Product Directors, Executives, Enterprise Architects, Program Managers, and anyone interested in strategic product management in a SAFe environment." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in product management or software development is recommended." },
                  { q: "How long is the course?", a: "The Advanced Scrum Master Certification Path is a 2-day intensive training program, totaling 10 hours of instruction (9 AM - 2 PM EST each day), plus Advanced Facilitator Training in Conflict and Collaboration." },
                  { q: "What materials are included?", a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam." },
                  { q: "Is this course available online?", a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you." },
                  { q: "How do I maintain my certification?", a: "The SAFe Scrum Master certification is valid for one year. You can renew it by earning continuing education credits or by taking advanced SAFe courses." }
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
              Why Choose the Advanced Scrum Master Certification Path with Agile36?
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
                    Agile36 offers SAFe Scrum Master training accredited by Scaled Agile, Inc., ensuring an internationally recognized certification valued across industries and enterprises worldwide.
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
                    Get guided exam readiness support, including learning resources, and expert mentoring to ensure success in the Advanced Scrum Master Certification Path.
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
                    Participants earn 24 PDUs and SEUs to maintain the validity of their certifications and expand professional credibility in the Agile market.
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
              SAFe Advanced Scrum Master Certification in the USA
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              There has been a significant increase in demand for the SAFe Advanced Scrum Master certification across the United States, as more organizations embrace Agile-at-scale methodologies and seek experienced professionals to lead program-level coaching and organizational transformation. Companies throughout the USA in sectors including technology, finance, healthcare, and manufacturing are actively recruiting SAFe Advanced Scrum Masters and Program-level Agile Coaches who can lead organizational change, scale Agile practices across multiple teams, mentor other Scrum Masters, and drive Agile Release Train transformations. These certified experts are highly valued for their expertise in program-level coaching, organizational transformation, advanced facilitation, and scaling Agile practices. The SAFe Advanced Scrum Master certification serves as a powerful differentiator in the competitive US job market, especially as organizations continue their digital transformation journeys and seek senior Agile leadership.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Certifications Are Required for SAFe Advanced Scrum Master Certification Training in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Experience as a Scrum Master or Agile Coach is recommended to enroll in the Advanced Scrum Master Certification Path in the United States. The Advanced Scrum Master Certification Path in the USA provides participants with the necessary skills to assist Agile Release Trains (ART) to improve collaboration among teams and increase the efficiency of workflow. The course covers advanced facilitation techniques, conflict resolution, team dynamics, Agile metrics, and includes Advanced Facilitator Training in Conflict and Collaboration. The certification path is designed for experienced Scrum Masters seeking to advance their careers.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What Are Job Opportunities for SAFe Advanced Scrum Master Professionals in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Advanced Scrum Master professionals in the United States have excellent senior career prospects across various industries. Job opportunities include Senior Scrum Master, Agile Coach, Agile Transformation Leader, Enterprise Agile Coach, and Agile Release Train Coach roles. Companies in technology, finance, healthcare, and manufacturing sectors actively seek professionals with Advanced Scrum Master certification who can facilitate Agile teams effectively, resolve conflicts, optimize team flow, and drive organizational success with advanced Agile methodologies. The certification opens doors to senior leadership positions in Agile transformation and team facilitation roles.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#01203d] mb-4">
              What is the Fee for SAFe Advanced Scrum Master Certification in the USA?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              The cost of the Advanced Scrum Master Certification Path in the United States typically ranges from <strong>$950 to $1,699</strong>, depending on the specific course offerings and training provider. This investment includes two days of instructor-led training (9 AM - 2 PM EST), comprehensive digital study materials, Advanced Facilitator Training in Conflict and Collaboration, and certification. The pricing for Advanced Scrum Master Certification Path training in the USA reflects the value of advanced expert instruction, official materials, and ongoing community access that supports your professional development.
            </p>
          </div>
        </div>
      </section>

      {/* Find Leading SAFe Course in Cities Section */}
      <section className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600 mb-2 text-center">Courses based on location</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#01203d] mb-8 text-center">
            Find SAFe Advanced Scrum Master Course in Other Top Cities in USA
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
