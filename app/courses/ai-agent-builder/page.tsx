"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AIAgentBuilderCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [expandedCurriculum, setExpandedCurriculum] = useState<number[]>([0]);

  const courseSlug = "ai-agent-builder";

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
            <span className="text-[#01203d]">AI Agent Builder™ Certification Training</span>
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
                  <span className="text-lg font-semibold text-gray-900">2,800+ enrolled</span>
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
                  No-Code AI Agents & Automation™ Certification Training
                </h1>
                <p className="text-xl text-gray-900 font-bold mb-4">
                  Master No-Code AI Agents to Automate Tasks, Optimize Workflows, and Supercharge Productivity!
                </p>
                
                {/* Key Benefits with Checkmarks */}
                <div className="space-y-3 mb-6">
                  {[
                    "Build powerful AI agents without writing any code",
                    "Automate complex workflows with no-code tools",
                    "Connect ChatGPT API to real-world business processes",
                    "Complete 25+ hands-on automation projects",
                    "Replace manual tasks with intelligent AI systems"
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
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="px-6 py-3 border-2 border-[#fa4a23] text-[#fa4a23] font-semibold rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </button>
                <Link 
                  href={`/courses/ai-agent-builder/schedule?course=${courseSlug}`}
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
                  src="/christina-wocintechchat-com-faEfWCdOKIg-unsplash.jpg" 
                  alt="AI Agent Builder" 
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
              Why No-Code AI Skills Are in High Demand
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Businesses need professionals who can build AI solutions without coding. No-code AI skills open doors to higher-paying roles and transform how organizations operate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Stat 1 - Career Opportunity */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Career Advantage</div>
              <p className="text-sm text-gray-600 mb-4">Professionals with no-code AI skills are highly sought after across industries.</p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-2xl md:text-3xl font-bold text-[#fa4a23]">$90K–$150K</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">typical salary range</div>
              </div>
            </div>

            {/* Stat 2 - Productivity Gains */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Productivity Boost</div>
              <p className="text-sm text-gray-600 mb-4">Automation dramatically reduces time spent on repetitive tasks.</p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xl md:text-2xl font-bold text-blue-600">Major Time Savings</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">within weeks of adoption</div>
              </div>
            </div>

            {/* Stat 3 - Business Impact */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Business Value</div>
              <p className="text-sm text-gray-600 mb-4">Companies see measurable returns from no-code AI implementations.</p>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xl md:text-2xl font-bold text-[#fa4a23]">Fast ROI</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">proven business impact</div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Key Skills You'll Master</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">No-Code AI Agent Development</div>
                  <div className="text-sm text-gray-600">High Demand</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#fa4a23] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">Workflow Automation Design</div>
                  <div className="text-sm text-gray-600">Essential Skill</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">API Integration & ChatGPT</div>
                  <div className="text-sm text-gray-600">Critical Competency</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#fa4a23] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">Business Process Optimization</div>
                  <div className="text-sm text-gray-600">Growing Priority</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">n8n, Make.com & Automation Platforms</div>
                  <div className="text-sm text-gray-600">Industry Standard Tools</div>
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
                        The No-Code AI Agents & Automation™ Certification Training is a transformative 2-day intensive program (10 hours total) designed specifically for non-programmers who want to harness the power of AI automation. No coding experience required—just bring your curiosity and business challenges!
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        This hands-on course empowers you to build sophisticated AI agents and automated workflows using cutting-edge no-code platforms like n8n, Make.com, Pipedream, and Langflow. You'll learn to connect ChatGPT and other AI models to real business processes, creating intelligent systems that work autonomously 24/7.
                      </p>
                      <p className="text-base text-gray-700 mb-4">
                        With 25+ practical projects and real-world use cases, you'll master the art of eliminating repetitive work, optimizing business operations, and building AI-powered solutions that deliver immediate ROI. By the end of this course, you'll have a portfolio of functional automations ready to deploy in your organization.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Build autonomous AI agents with zero coding",
                          "Create multi-step automated workflow pipelines",
                          "Integrate ChatGPT API with business systems",
                          "Develop 25+ practical automation projects",
                          "Automate emails, reports, and data processing",
                          "Design AI-driven customer engagement systems"
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
                        <li>Business professionals with zero coding experience</li>
                        <li>Operations managers seeking workflow automation</li>
                        <li>Marketing and sales professionals</li>
                        <li>Entrepreneurs and small business owners</li>
                        <li>Anyone wanting to eliminate repetitive tasks with AI</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Course Curriculum</p>
                        <h2 className="text-3xl font-bold text-gray-900">No-Code AI Agents & Automation™ Course Curriculum</h2>
                      </div>
                      <button
                        onClick={() => setShowConsultationModal(true)}
                        className="px-6 py-3 border-2 border-[#fa4a23] text-[#fa4a23] font-semibold rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
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
                          title: "Module 1: Build No-Code AI Agents",
                          topics: [
                            "Design and configure autonomous AI agents",
                            "Set up agents that research, summarize, and generate content",
                            "Create agents that send emails and execute workflows",
                            "Deploy agents that work without human intervention",
                            "Configure agent triggers, conditions, and actions"
                          ],
                          learningObjective: "Master the fundamentals of designing and deploying AI agents that perform complex tasks autonomously using no-code platforms"
                        },
                        { 
                          title: "Module 2: Create Multi-Step Automated Workflows",
                          topics: [
                            "Introduction to n8n, Make.com, Pipedream, and Langflow",
                            "Orchestrate complex workflows with triggers and actions",
                            "Build decision trees and conditional logic",
                            "Transform and manipulate data across systems",
                            "Create workflows that collaborate across platforms"
                          ],
                          learningObjective: "Design and implement sophisticated multi-step automation workflows that connect systems, make decisions, and execute actions seamlessly"
                        },
                        { 
                          title: "Module 3: Integrate ChatGPT & API-Based Automations",
                          topics: [
                            "Connect ChatGPT API to your workflows",
                            "Retrieve and analyze data automatically",
                            "Build agents that make intelligent decisions",
                            "Create AI-powered data processing pipelines",
                            "Integrate multiple AI models and services"
                          ],
                          learningObjective: "Connect AI models to real-world business processes through APIs and create intelligent agents that operate autonomously"
                        },
                        { 
                          title: "Module 4: Develop Real-World Agent Use Cases",
                          topics: [
                            "Build lead qualification and scoring systems",
                            "Create automated outreach sequencing agents",
                            "Design content generation pipelines",
                            "Develop AI research assistants",
                            "Build onboarding bots and operational task automation"
                          ],
                          learningObjective: "Apply your skills to practical business scenarios and build production-ready automation systems for common business challenges"
                        },
                        { 
                          title: "Module 5: Hands-On No-Code Agent Projects",
                          topics: [
                            "Complete 25+ practical automation builds",
                            "Create functional AI agents for immediate deployment",
                            "Build customer service automation systems",
                            "Develop data processing and reporting agents",
                            "Design personalized business productivity tools"
                          ],
                          learningObjective: "Gain extensive hands-on experience by completing 25+ real-world automation projects you can deploy immediately in your organization"
                        },
                        { 
                          title: "Module 6: Automate Repetitive Digital Work",
                          topics: [
                            "Replace manual email processing with AI agents",
                            "Automate spreadsheet data entry and analysis",
                            "Create document processing workflows",
                            "Build automated reporting systems",
                            "Design reminder and notification systems"
                          ],
                          learningObjective: "Eliminate time-consuming manual tasks by building agents that autonomously handle emails, documents, spreadsheets, and routine operations"
                        },
                        { 
                          title: "Module 7: AI-Enhanced Coding (No-Code + Low-Code Mix)",
                          topics: [
                            "Use AI to generate automation scripts",
                            "Fix bugs and errors with AI assistance",
                            "Enhance automation logic with AI suggestions",
                            "Create modular workflow components",
                            "Debug automations faster with AI tools"
                          ],
                          learningObjective: "Leverage AI to enhance your automations, generate helpful code snippets, and troubleshoot issues—even without programming experience"
                        },
                        { 
                          title: "Module 8: AI-Driven User Interaction Design",
                          topics: [
                            "Create agents that respond intelligently to users",
                            "Personalize interactions and user experiences",
                            "Build conversational agents that answer questions",
                            "Design task execution systems triggered by commands",
                            "Deliver frictionless, AI-powered user experiences"
                          ],
                          learningObjective: "Design sophisticated AI agents that interact naturally with users, personalize responses, and execute tasks on command for exceptional user experiences"
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
                          name: "Jennifer Martinez", 
                          role: "Operations Manager", 
                          review: "I have zero coding background, but this course made me feel like an automation wizard! Built 15 working AI agents in 2 days that now save my team 20 hours per week. The no-code approach is pure genius—n8n and Make.com are now essential tools in our workflow.",
                          rating: 5
                        },
                        { 
                          name: "David Thompson", 
                          role: "Marketing Director", 
                          review: "Absolutely transformative! I automated our entire lead qualification process and built a content generation pipeline that works 24/7. The instructors made complex automation concepts incredibly accessible. Worth every penny at $699!",
                          rating: 5
                        },
                        { 
                          name: "Rachel Chen", 
                          role: "Small Business Owner", 
                          review: "Best investment I've made in my business this year. Created automated customer onboarding, email workflows, and reporting systems—all without touching a line of code. The 25+ projects gave me real-world skills I use daily. Highly recommend for non-technical professionals!",
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
                  { q: "What is the No-Code AI Agents & Automation™ Certification Training?", a: "This is a comprehensive 2-day intensive program (10 hours total) designed for non-programmers to build AI agents and automated workflows without writing any code. You'll learn to use platforms like n8n, Make.com, Pipedream, and Langflow to create intelligent automation systems." },
                  { q: "Do I need any programming or technical experience?", a: "No! This course is specifically designed for non-technical professionals. No coding experience required. If you can use a web browser and business software, you can build AI automations." },
                        { q: "What is included in the course?", a: "The course includes 10 hours of live training, 25+ hands-on automation projects, access to no-code platforms, step-by-step guides, workflow templates, and lifetime access to course materials and community support." },
                        { q: "What tools will I learn to use?", a: "You'll master industry-leading no-code automation platforms including n8n, Make.com, Pipedream, and Langflow. You'll also learn to integrate ChatGPT API, connect business systems, and build AI-powered workflows." }
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
                  <div className="text-4xl font-bold text-gray-900 mb-2">$699</div>
                  <div className="text-base text-gray-500 line-through">$1,398</div>
                  <div className="text-sm text-green-600 font-semibold mt-2">50% OFF</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Live Virtual Training</span>
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
                  href={`/courses/ai-agent-builder/schedule?course=${courseSlug}`}
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
            <p className="text-sm text-gray-600 mb-2">No-Code AI Agents & Automation™ Course FAQs</p>
            <h2 className="text-3xl font-bold text-gray-900">FAQs on No-Code AI Agents & Automation™ Certification Training</h2>
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
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Refunds are only available if the class is more than 30 days out from the start date. Please contact our support team for more details." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, you can reschedule your training class as long as it's within 24 hours of the start time at no additional charge. Please contact our support team to make changes to your enrollment." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Refunds are only available if the class is more than 30 days out from the start date. Please contact our support team for refund requests." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials and resources. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is the No-Code AI Agents & Automation™ Certification Training?", a: "This is a comprehensive 2-day intensive program (10 hours total) designed for non-programmers to build AI agents and automated workflows without writing any code. You'll complete 25+ practical projects and learn to automate real business processes." },
                  { q: "Who should take this course?", a: "This course is perfect for business professionals, operations managers, marketers, entrepreneurs, and anyone who wants to leverage AI automation without coding. If you spend time on repetitive tasks or want to optimize workflows, this course is for you." },
                  { q: "What are the prerequisites for this course?", a: "No prerequisites! This course is designed specifically for non-technical professionals. All you need is basic computer skills and a desire to automate your work. No coding or technical background required." },
                  { q: "Will I receive a certification?", a: "Yes! Upon completion, you'll receive the No-Code AI Agents & Automation™ Certification, issued through Accredible, the global credentialing platform used by top universities and training providers." }
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
                    placeholder="Tell us about your interest in this course"
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

