"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CourseHeroSocialProof from "@/app/components/CourseHeroSocialProof";
import CourseHeroRightColumn from "@/app/components/CourseHeroRightColumn";
import { AI_AGENT_BUILDER_BROCHURE_HREF } from "@/app/lib/ai-agent-builder-brochure";
import TrustedByStrip from "@/app/components/TrustedByStrip";

export default function NoCodeAIAgentsCoursePage() {
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
            <span className="text-[#334155]">No-Code AI Agents & Automation™ Certification Training</span>
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
                  No-Code AI Agents & Automation™ Certification Training
                </h1>
                <p className="mb-4 mt-4 text-[14.5px] font-normal leading-relaxed text-[#475569] md:mb-5 md:text-[15px]">
                  Build AI Agents That Actually Do Work
                </p>
                <CourseHeroSocialProof enrolledLabel="2,800+ enrolled" />

                {/* Key Benefits with Checkmarks */}
                <div className="space-y-3 mb-6">
                  {[
                    "Build practical AI agents without traditional coding",
                    "Work with Claude, Claude Code, Codex, and n8n",
                    "Automate real multi-step business workflows",
                    "Connect agents to tools, data, APIs, and apps",
                    "Design human-in-the-loop and multi-agent workflows",
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
                <a
                  href={AI_AGENT_BUILDER_BROCHURE_HREF}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium rounded-lg hover:bg-[#1f2c4a] hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </a>
                <Link 
                  href={`/courses/ai-agent-builder/schedule?course=${courseSlug}`}
                  className="px-6 py-3 bg-[#1f2c4a] text-white font-medium rounded-lg hover:bg-[#16243f] transition-colors inline-block text-center"
                >
                  View Schedules
                </Link>
              </div>
            </div>

            <CourseHeroRightColumn courseSlug={courseSlug}>
              <div className="mt-8 lg:mt-20">
                <img
                  src="/Logo_Agents.png"
                  alt="No-Code AI Agents & Automation"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </CourseHeroRightColumn>
          </div>
        </div>
      </section>

      {/* Trusted by industry leaders */}
      <TrustedByStrip />

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
                title: "Hands-On Experience" 
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
                        Learn how to build practical AI agents and automate real business workflows using tools like Claude, Claude Code, Codex, and n8n — without needing to be a programmer.
                      </p>
                      <p className="text-base text-[#475569] mb-4">
                        This live, hands-on course takes you beyond simply prompting AI. You’ll learn how to give AI agents instructions, tools, context, and workflows so they can complete tasks across applications and business processes.
                      </p>
                      <p className="text-base text-[#475569]">
                        You won’t spend two days listening to lectures about AI. You’ll build working agents and automations that demonstrate how AI can perform real business tasks from start to finish. No programming background is required.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What You&apos;ll Learn</h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Build AI Agents Without Traditional Coding",
                            body: "Create AI agents that can reason through tasks, use tools, access information, and complete work on your behalf.",
                          },
                          {
                            title: "Build with Claude",
                            body: "Use Claude to design agents, define instructions, work with business information, analyze problems, and turn ideas into functioning AI solutions.",
                          },
                          {
                            title: "Build with Claude Code and Codex",
                            body: "Learn how AI coding agents can build applications, agents, integrations, and automations for you — even if you are not a software developer.",
                          },
                          {
                            title: "Automate Workflows with n8n",
                            body: "Connect AI agents to business applications and automate multi-step workflows using n8n.",
                          },
                          {
                            title: "Connect Agents to Tools and Data",
                            body: "Give agents access to the applications, documents, APIs, and information they need to complete real work.",
                          },
                          {
                            title: "Design Human-in-the-Loop Workflows",
                            body: "Determine what AI can handle autonomously and where human review, approval, or escalation should happen.",
                          },
                          {
                            title: "Build Multi-Step Agent Workflows",
                            body: "Create workflows where agents research, analyze, generate outputs, make decisions, trigger actions, and hand work between systems.",
                          },
                          {
                            title: "Turn Business Processes into AI Workflows",
                            body: "Learn how to identify repetitive or knowledge-heavy work and redesign it around AI agents and automation.",
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                              <p className="text-[14.5px] font-semibold text-[#1f2c4a]">{item.title}</p>
                              <p className="text-[14.5px] text-[#475569] mt-1">{item.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What You&apos;ll Build</h3>
                      <p className="text-base text-[#475569] mb-3">
                        You’ll work through practical use cases such as research and information-gathering agents, workflow automation agents, document and data processing agents, customer and employee support workflows, agents that interact with multiple applications, human approval and escalation workflows, multi-agent workflows, and end-to-end business process automation.
                      </p>
                      <p className="text-base text-[#475569]">
                        By the end of the course, you’ll understand how to go from <strong className="text-[#1f2c4a]">Manual Process → AI Workflow → Working Agent</strong>.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Tools You&apos;ll Work With</h3>
                      <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                        <li>Claude</li>
                        <li>Claude Code</li>
                        <li>Codex</li>
                        <li>n8n</li>
                        <li>APIs and integrations</li>
                        <li>AI agent tools and connectors</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Who Should Attend</h3>
                      <p className="text-base text-[#475569] mb-3">
                        This course is designed for professionals who want to build with AI rather than simply learn about AI. You do not need a software development background.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                        <li>Business professionals</li>
                        <li>Product Managers and Product Owners</li>
                        <li>Project and Program Managers</li>
                        <li>Operations professionals</li>
                        <li>Consultants</li>
                        <li>Entrepreneurs and business owners</li>
                        <li>Marketing and sales professionals</li>
                        <li>Customer support teams</li>
                        <li>Process improvement professionals</li>
                        <li>Anyone responsible for improving how work gets done</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What Makes This Course Different</h3>
                      <p className="text-base text-[#475569] mb-3">
                        Most AI courses teach you how to use ChatGPT or write better prompts. This course teaches you how to build AI-powered systems that perform work.
                      </p>
                      <p className="text-base text-[#475569] mb-3">
                        You’ll learn how to combine AI agents, workflow automation, business applications, data, and human decision points to automate real processes.
                      </p>
                      <p className="text-base text-[#475569]">
                        The goal isn’t simply to understand AI agents. <strong className="text-[#1f2c4a]">The goal is to leave knowing how to build them.</strong>
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-[#64748b] mb-2">Course Curriculum</p>
                        <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">No-Code AI Agents & Automation™ Course Curriculum</h2>
                      </div>
                      <a
                        href={AI_AGENT_BUILDER_BROCHURE_HREF}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium rounded-lg hover:bg-[#1f2c4a] hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
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
                          title: "Module 1: Build AI Agents Without Traditional Coding",
                          topics: [
                            "Create agents that reason through tasks",
                            "Give agents instructions, tools, and context",
                            "Complete work across applications without programming",
                          ],
                          learningObjective: "Build AI agents that can use tools, access information, and complete work on your behalf",
                        },
                        {
                          title: "Module 2: Build with Claude",
                          topics: [
                            "Design agents and define instructions in Claude",
                            "Work with business information and analyze problems",
                            "Turn ideas into functioning AI solutions",
                          ],
                          learningObjective: "Use Claude to design and shape working AI agent solutions",
                        },
                        {
                          title: "Module 3: Build with Claude Code and Codex",
                          topics: [
                            "Use AI coding agents to build applications and agents",
                            "Create integrations and automations without being a developer",
                            "Turn requirements into working software with AI assistance",
                          ],
                          learningObjective: "Apply Claude Code and Codex to build agents, apps, and automations",
                        },
                        {
                          title: "Module 4: Automate Workflows with n8n",
                          topics: [
                            "Connect AI agents to business applications",
                            "Automate multi-step workflows in n8n",
                            "Trigger actions across systems and hand off work",
                          ],
                          learningObjective: "Automate multi-step business workflows with n8n and AI agents",
                        },
                        {
                          title: "Module 5: Tools, Data, and Human-in-the-Loop Design",
                          topics: [
                            "Connect agents to apps, documents, APIs, and data",
                            "Decide what AI can do autonomously vs. with approval",
                            "Design escalation, review, and multi-agent workflows",
                            "Redesign business processes around AI agents and automation",
                          ],
                          learningObjective: "Design reliable agent workflows with the right tools, data, and human decision points",
                        },
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
                          name: "David Martinez", 
                          role: "Business Analyst", 
                          review: "This course finally showed me how to move past prompting. We built agents with Claude and connected them through n8n to real workflows. I left with something I could actually use at work.",
                          rating: 5
                        },
                        { 
                          name: "Jennifer Kim", 
                          role: "Marketing Director", 
                          review: "Claude Code and Codex made it possible to build integrations without waiting on engineering. The human-in-the-loop pieces were especially practical for our team processes.",
                          rating: 5
                        },
                        { 
                          name: "Robert Thompson", 
                          role: "Operations Consultant", 
                          review: "Hands-on from start to finish. We went from a manual process to a working AI workflow in class. Exactly what I needed for clients who want automation without a programming team.",
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
                  { q: "What is the No-Code AI Agents & Automation™ Certification Training?", a: "The No-Code AI Agents & Automation™ Certification Training is a live, hands-on course that teaches you to build practical AI agents and automate real business workflows using Claude, Claude Code, Codex, and n8n — without needing to be a programmer. You learn how to give agents instructions, tools, context, and workflows so they can complete work across applications and processes." },
                  { q: "Is there an exam for this course?", a: "No, this course does not include an exam. It focuses on building working agents and automations you can apply immediately." },
                        { q: "What is included in the course?", a: "The course includes live training, hands-on builds with Claude, Claude Code, Codex, and n8n, course materials, and guidance on connecting agents to tools, data, APIs, and human-in-the-loop workflows." },
                        { q: "Do I need prior AI or programming experience?", a: "No. You do not need a software development background. The course is designed for professionals who want to build with AI rather than only learn about AI." }
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
                    <span className="text-sm text-[#475569]">Hands-On Exercises</span>
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
                  href={`/courses/ai-agent-builder/schedule?course=${courseSlug}`}
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
            <p className="text-sm text-[#64748b] mb-2">No-Code AI Agents & Automation™ Course FAQs</p>
            <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">FAQs on No-Code AI Agents & Automation™ Certification Training</h2>
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
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Please contact our support team for more details." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, you can reschedule your training class as long as it's within 24 hours of the start time at no additional charge. Please contact our support team to make changes to your enrollment." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Please contact our support team for refund requests." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials and resources. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is the No-Code AI Agents & Automation™ Certification Training?", a: "The No-Code AI Agents & Automation™ Certification Training is a live, hands-on course that teaches you to build practical AI agents and automate real business workflows using Claude, Claude Code, Codex, and n8n — without needing to be a programmer." },
                  { q: "Who should take this course?", a: "This course is ideal for business professionals, Product Managers and Product Owners, Project and Program Managers, operations professionals, consultants, entrepreneurs, marketing and sales teams, customer support teams, process improvement professionals, and anyone responsible for improving how work gets done." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. You do not need a software development background." },
                  { q: "Is there a certification exam?", a: "No, this course does not include a certification exam. The focus is building working AI agents and automations." },
                  { q: "What makes this course different from prompt-writing courses?", a: "Most AI courses teach you how to use ChatGPT or write better prompts. This course teaches you how to build AI-powered systems that perform work by combining agents, workflow automation, business applications, data, and human decision points." }
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

    </main>
  );
}

