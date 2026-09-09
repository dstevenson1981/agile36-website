"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CourseHeroRightColumn from "@/app/components/CourseHeroRightColumn";
import { COURSE_BROCHURE_HREF } from "@/app/lib/course-brochures";
import TrustedByStrip from "@/app/components/TrustedByStrip";

export default function AIWorkflowAutomationCoursePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [expandedCurriculum, setExpandedCurriculum] = useState<number[]>([0]);

  const courseSlug = "ai-workflow-automation";

  const toggleCurriculum = (index: number) => {
    setExpandedCurriculum((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <section className="w-full bg-black py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <span className="text-[#334155]">Courses</span>
            <span>/</span>
            <span className="text-[#334155]">AI Workflow Automation™ Certification Training</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] px-3 py-1.5">
                  <svg className="h-5 w-5 shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="text-sm font-semibold text-blue-700">English</span>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#d97706]">
                  AI Workflow Automation™
                </p>
                <h1 className="text-[2.15rem] font-normal leading-[1.04] tracking-[-0.045em] text-[#1f2c4a] sm:text-[2.85rem] lg:text-[3rem]">
                  Turn Manual Business Processes into Working Automations
                </h1>
                <p className="mb-4 mt-6 text-[15px] font-normal leading-7 text-[#475569] md:text-base md:leading-8">
                  Stop copying information between systems, sending repetitive follow-ups, updating spreadsheets by hand, and relying on people to move every task forward.
                </p>
                <p className="mb-4 text-[15px] font-normal leading-7 text-[#475569] md:text-base md:leading-8">
                  In this live, hands-on course, you will learn how to identify automation opportunities and build workflows that collect information, make decisions, update systems, generate content, request approvals, and trigger the next action automatically.
                </p>
                <p className="mb-4 text-[15px] font-normal leading-7 text-[#475569] md:text-base md:leading-8">
                  Using <strong className="font-semibold text-[#1f2c4a]">n8n, Claude, APIs, webhooks, and business applications</strong>, you will build complete workflows that solve real operational problems—without traditional programming.
                </p>
                <p className="mb-5 text-sm font-semibold tracking-wide text-[#1f2c4a]">
                  8 Hours of Live Training · 2 Days · 4 Hours Per Day
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "Turn manual processes into automated workflows",
                    "Connect business applications and data",
                    "Add AI to analyze, classify, summarize, and create",
                    "Build approval, notification, and escalation steps",
                    "Handle errors and unexpected conditions",
                    "Test complete workflows from trigger to outcome",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[14.5px] text-[#475569]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-[#1f2c4a]/10 pt-6 sm:flex-row sm:items-center sm:gap-5">
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#94a3b8]">Certification</span>
                  <Image
                    src="/Logo_AI_Workflow_Automation.png"
                    alt="AI Workflow Automation™ Certification Badge"
                    width={200}
                    height={200}
                    priority
                    className="h-40 w-40 object-contain sm:h-44 sm:w-44"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={COURSE_BROCHURE_HREF["ai-workflow-automation"]}
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
                  href={`/courses/ai-workflow-automation/schedule?course=${courseSlug}`}
                  className="px-6 py-3 bg-[#1f2c4a] text-white font-medium rounded-lg hover:bg-[#16243f] transition-colors inline-block text-center"
                >
                  View Schedules
                </Link>
              </div>
            </div>

            <CourseHeroRightColumn courseSlug={courseSlug}>
              <div className="space-y-2.5">
                {[
                  "8 Hours of Live Training",
                  "2 Days · 4 Hours Per Day",
                  "n8n, Claude, APIs, and webhooks",
                  "Approvals, notifications, and error handling",
                  "No traditional programming required",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13.5px] text-[#475569]">{item}</span>
                  </div>
                ))}
              </div>
            </CourseHeroRightColumn>
          </div>
        </div>
      </section>

      <TrustedByStrip />

      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-12">
              <div className="border-b border-[#1f2c4a]/15">
                <nav className="flex space-x-8">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "curriculum", label: "Curriculum" },
                    { id: "faq", label: "FAQ" },
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

              <div className="min-h-[400px]">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">Course Overview</h2>
                      <p className="text-base text-[#475569] mb-4">
                        Most automation courses teach individual features without showing how to automate an entire business process.
                      </p>
                      <p className="text-base text-[#475569] mb-4">
                        This course begins with the work itself. You will map a manual process, identify decisions and handoffs, determine where AI adds value, and transform the process into a working automation.
                      </p>
                      <p className="text-base text-[#475569]">
                        You will build throughout the course—not simply watch demonstrations. By the end, you will understand how to move from a repetitive business process to a reliable workflow that runs across multiple systems.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What You&apos;ll Build</h3>
                      <p className="text-base text-[#475569] mb-4">You will build workflows that can:</p>
                      <div className="space-y-3">
                        {[
                          "Start from a form, message, schedule, file, or system event",
                          "Collect and transform information",
                          "Move data between business applications",
                          "Use AI to interpret unstructured information",
                          "Generate documents, messages, and other deliverables",
                          "Apply rules and route work based on conditions",
                          "Request human review or approval",
                          "Send notifications and follow-ups",
                          "Detect errors and escalate exceptions",
                          "Record results and maintain an audit trail",
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-[14.5px] text-[#475569]">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What You&apos;ll Learn</h3>
                      <div className="space-y-4">
                        {[
                          { title: "Find High-Value Automation Opportunities", body: "Identify repetitive, time-consuming, and error-prone processes that are strong candidates for automation." },
                          { title: "Map the Complete Workflow", body: "Define triggers, inputs, actions, decisions, handoffs, outputs, exceptions, and success conditions before building." },
                          { title: "Build with n8n", body: "Create workflows visually, connect applications, transform data, apply logic, and control how work moves between systems." },
                          { title: "Add AI to Business Processes", body: "Use Claude to classify requests, extract information, summarize content, generate outputs, and support decisions inside a workflow." },
                          { title: "Connect Applications and Data", body: "Work with integrations, APIs, webhooks, forms, documents, spreadsheets, databases, and other business tools." },
                          { title: "Keep Humans in Control", body: "Add approval steps for sensitive decisions, exceptions, financial actions, or customer-facing outputs." },
                          { title: "Build Reliable Automations", body: "Test workflows, handle missing information, prevent duplicate actions, manage failures, and monitor performance." },
                        ].map((item) => (
                          <div key={item.title} className="flex items-start gap-3">
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
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Tools You&apos;ll Use</h3>
                      <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                        <li><strong className="text-[#1f2c4a]">n8n:</strong> Build and coordinate the workflow</li>
                        <li><strong className="text-[#1f2c4a]">Claude:</strong> Add intelligence to workflow steps</li>
                        <li><strong className="text-[#1f2c4a]">APIs and Webhooks:</strong> Connect systems and trigger actions</li>
                        <li><strong className="text-[#1f2c4a]">Business Applications:</strong> Move information and complete work across tools</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What Makes This Course Different</h3>
                      <p className="text-base text-[#475569] mb-3">
                        This is not a collection of disconnected automation exercises. You will learn how to automate a complete business process from beginning to end.
                      </p>
                      <p className="text-base text-[#475569] mb-3">
                        Every concept is immediately applied to a working workflow, allowing you to see how systems, data, AI, business rules, and human decisions operate together.
                      </p>
                      <p className="text-base text-[#475569] mb-3">By the end of the course, you will understand how to move from:</p>
                      <p className="text-base font-semibold text-[#1f2c4a]">
                        Manual Process → Workflow Map → Connected Systems → AI-Powered Decisions → Automated Business Outcome
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Who Should Attend</h3>
                      <p className="text-base text-[#475569] mb-3">No traditional programming experience is required.</p>
                      <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                        <li>Business owners and entrepreneurs</li>
                        <li>Operations professionals</li>
                        <li>Product and Project Managers</li>
                        <li>Consultants</li>
                        <li>Marketing and sales professionals</li>
                        <li>Customer support teams</li>
                        <li>Process improvement professionals</li>
                        <li>Anyone responsible for repetitive business processes</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <p className="text-sm text-[#64748b] mb-2">Course Curriculum</p>
                      <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">AI Workflow Automation™ Course Curriculum</h2>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          title: "Day One: Design and Build the Workflow",
                          topics: [
                            "Identify the business process and desired outcome",
                            "Map the current manual workflow",
                            "Define triggers, actions, decisions, and outputs",
                            "Build the workflow in n8n",
                            "Connect applications and move data between systems",
                            "Add rules, conditions, and routing",
                            "Test the workflow from beginning to end",
                          ],
                          learningObjective: "Leave day one with a mapped process running as a connected n8n workflow, from trigger to outcome.",
                        },
                        {
                          title: "Day Two: Add AI and Make It Reliable",
                          topics: [
                            "Add Claude to analyze, classify, extract, and generate",
                            "Work with APIs and webhooks",
                            "Add human approvals and escalation paths",
                            "Handle errors, incomplete information, and exceptions",
                            "Add notifications, logging, and monitoring",
                            "Improve workflow accuracy and reliability",
                            "Run the completed automation from trigger to business outcome",
                          ],
                          learningObjective: "Leave day two with AI inside the workflow, human approvals where they belong, and a reliable automation you can run end to end.",
                        },
                      ].map((part, index) => (
                        <div key={part.title} className="border border-blue-200 rounded-lg bg-white">
                          <button
                            onClick={() => toggleCurriculum(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1f2c4a]/[0.1] transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-[#1f2c4a]">{part.title}</h3>
                            <svg
                              className={`w-5 h-5 text-[#d97706] flex-shrink-0 transition-transform ${expandedCurriculum.includes(index) ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {expandedCurriculum.includes(index) && (
                            <div className="p-4 pt-0 border-t border-blue-100">
                              <div className="mb-4">
                                <p className="font-semibold text-[#1f2c4a] mb-2">Topics:</p>
                                <ul className="list-disc list-inside space-y-1 text-[#475569]">
                                  {part.topics.map((topic) => (
                                    <li key={topic}>{topic}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-[#1f2c4a] mb-2">Learning Objective:</p>
                                <p className="text-[#475569]">{part.learningObjective}</p>
                              </div>
                            </div>
                          )}
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
                        { q: "What is AI Workflow Automation™ Certification Training?", a: "A live, two-day hands-on course (8 hours total, 4 hours per day). You map a manual business process and build a working automation in n8n with Claude, APIs, webhooks, and human approvals. No traditional programming is required." },
                        { q: "Is there an exam?", a: "No. The course is about building a complete workflow you can run from trigger to business outcome." },
                        { q: "What tools will I use?", a: "n8n to build and coordinate the workflow, Claude to add intelligence, APIs and webhooks to connect systems, and the business applications your process already uses." },
                        { q: "Do I need programming experience?", a: "No traditional programming experience is required. You will build workflows visually in n8n and add AI steps with Claude." },
                      ].map((faq) => (
                        <div key={faq.q} className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                          <h3 className="font-bold text-[#1f2c4a] mb-2">{faq.q}</h3>
                          <p className="text-[14.5px] text-[#475569]">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-24 h-fit">
              <div className="liquid-glass rounded-2xl p-6">
                <div className="text-center mb-6">
                  <div className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1f2c4a] sm:text-[2rem]">$400</div>
                  <div className="text-base text-[#64748b] line-through">$800</div>
                  <div className="text-sm text-emerald-600 font-semibold mt-2">50% OFF</div>
                </div>
                <div className="space-y-4 mb-6">
                  {["Live Virtual Training", "Comprehensive Course Materials", "Hands-On Exercises", "Expert-Led Sessions"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[#475569]">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/courses/ai-workflow-automation/schedule?course=${courseSlug}`}
                  className="w-full liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium py-3 rounded-lg hover:bg-[#1f2c4a] hover:text-white transition-colors mb-4 inline-block text-center"
                >
                  View Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-[#64748b] mb-2">AI Workflow Automation™ Course FAQs</p>
            <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">FAQs on AI Workflow Automation™ Certification Training</h2>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[
              { id: "courses", label: "FAQ Courses" },
              { id: "payment", label: "FAQ Payment" },
              { id: "generic", label: "FAQ Generic" },
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

          <div className="space-y-4">
            {(() => {
              const faqs = {
                courses: [
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Please contact our support team for more details." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the contact options on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the View Schedules button on this page. Schedules are updated regularly and show live virtual options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, you can reschedule your training class as long as it's within 24 hours of the start time at no additional charge. Please contact our support team to make changes to your enrollment." },
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials and resources. There are no hidden fees." },
                ],
                generic: [
                  { q: "What is AI Workflow Automation™ Certification Training?", a: "A live, two-day hands-on course. You map a manual process and build a working automation with n8n, Claude, APIs, and webhooks — 8 hours total, 4 hours per day." },
                  { q: "Who should take this course?", a: "Business owners, operations professionals, product and project managers, consultants, marketing and sales, customer support, process improvement professionals, and anyone responsible for repetitive business processes." },
                  { q: "What are the prerequisites?", a: "No traditional programming experience is required." },
                  { q: "Is there a certification exam?", a: "No exam. You leave with a complete workflow you can run from trigger to business outcome." },
                  { q: "How is this different from feature-by-feature automation courses?", a: "You will not collect disconnected exercises. You automate one complete business process: Manual Process → Workflow Map → Connected Systems → AI-Powered Decisions → Automated Business Outcome." },
                ],
              };
              const currentFaqs = faqs[activeFaqCategory as keyof typeof faqs] || [];
              return currentFaqs.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div key={faq.q} className="border border-[#1f2c4a]/15 rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        setExpandedFaqs((prev) =>
                          prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
                        );
                      }}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1f2c4a]/[0.06] transition-colors"
                    >
                      <h3 className="font-bold text-[#1f2c4a] pr-4">{faq.q}</h3>
                      <svg
                        className={`w-5 h-5 text-[#64748b] flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
