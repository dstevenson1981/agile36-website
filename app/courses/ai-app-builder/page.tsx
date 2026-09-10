"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CourseHeroRightColumn from "@/app/components/CourseHeroRightColumn";
import { COURSE_BROCHURE_HREF } from "@/app/lib/course-brochures";
import TrustedByStrip from "@/app/components/TrustedByStrip";

export default function AIAppBuilderCoursePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [expandedCurriculum, setExpandedCurriculum] = useState<number[]>([0]);

  const courseSlug = "ai-app-builder";

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
            <span className="text-[#334155]">No-Code AI App Builder™ Certification Training</span>
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
                  No-Code AI App Builder™
                </p>
                <h1 className="text-[2.15rem] font-normal leading-[1.04] tracking-[-0.045em] text-[#1f2c4a] sm:text-[2.85rem] lg:text-[3rem]">
                  Build Apps You Can Sell, or Use to Grow Your Own Business
                </h1>
                <p className="mb-4 mt-6 text-[15px] font-normal leading-7 text-[#475569] md:text-base md:leading-8">
                  Learn how to turn real business problems into working applications without manually writing code.
                </p>
                <p className="mb-4 text-[15px] font-normal leading-7 text-[#475569] md:text-base md:leading-8">
                  In this live, hands-on course, you&apos;ll use AI-powered no-code tools to build, customize, and launch an application that could be sold to a small business or used inside your own company.
                </p>
                <p className="mb-5 text-sm font-semibold tracking-wide text-[#1f2c4a]">
                  8 Hours of Live Training · 2 Days · 4 Hours Per Day
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "Find business problems worth solving",
                    "Turn a client's needs into app requirements",
                    "Build a working app without coding",
                    "Add data, users, workflows, and integrations",
                    "Customize and brand apps for different businesses",
                    "Publish and demonstrate the finished product",
                    "Package your app as a service you can sell",
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
                    src="/Logo_AI_App_Builder.png"
                    alt="No-Code AI App Builder™ Certification Badge"
                    width={200}
                    height={200}
                    priority
                    className="h-40 w-40 object-contain sm:h-44 sm:w-44"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={COURSE_BROCHURE_HREF["ai-app-builder"]}
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
                  href={`/courses/ai-app-builder/schedule?course=${courseSlug}`}
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
                  "AI-powered no-code tools",
                  "An app you can sell or use",
                  "No coding experience required",
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
                        Small businesses need better tools for managing customers, bookings, orders, leads, employees, operations, and everyday work, but custom software has traditionally been expensive and difficult to build.
                      </p>
                      <p className="text-base text-[#475569] mb-4">
                        AI-powered no-code platforms have changed that.
                      </p>
                      <p className="text-base text-[#475569] mb-4">
                        This course teaches you how to identify a valuable business need and turn it into a functional application. You&apos;ll build the interface, features, data, and business rules while AI handles the technical implementation.
                      </p>
                      <p className="text-base text-[#475569]">
                        You&apos;ll also learn how to customize the application for a client, present its value, and turn one successful build into a repeatable service.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What You&apos;ll Be Able to Build</h3>
                      <p className="text-base text-[#475569] mb-4">Use the same process to create applications such as:</p>
                      <div className="space-y-3">
                        {[
                          "Customer and client portals",
                          "Booking and appointment systems",
                          "Lead management applications",
                          "Ordering and service request apps",
                          "Internal operations tools",
                          "Employee onboarding systems",
                          "Quote and intake applications",
                          "Dashboards and trackers",
                          "Membership and resource portals",
                          "Industry-specific business tools",
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
                          { title: "Find Profitable App Opportunities", body: "Identify manual, outdated, and inefficient processes that small businesses would pay to improve." },
                          { title: "Turn Business Needs into Requirements", body: "Convert a client conversation or internal problem into users, workflows, features, and clear build instructions." },
                          { title: "Build the Application with AI", body: "Use an AI-powered no-code platform to generate the app's screens, navigation, features, and functionality." },
                          { title: "Add Data and Business Rules", body: "Store information, connect records, apply rules, calculate values, and control how users interact with the app." },
                          { title: "Add Users and Integrations", body: "Create accounts and permissions while connecting the application to external business tools and services." },
                          { title: "Customize Apps for Clients", body: "Update the branding, content, features, and workflows for different companies and industries." },
                          { title: "Test and Launch", body: "Test realistic user scenarios, correct issues with AI, and publish an application that others can access." },
                          { title: "Package and Sell the Solution", body: "Demonstrate the app, explain its business value, determine what to include, and structure it as a client service." },
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
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What Makes This Course Different</h3>
                      <p className="text-base text-[#475569] mb-3">
                        You will not simply build a practice app and forget about it after class.
                      </p>
                      <p className="text-base text-[#475569] mb-3">
                        You&apos;ll learn a repeatable process for creating applications that solve real business problems, whether you want to improve your own operations, offer app-building services, or create a new source of revenue.
                      </p>
                      <p className="text-base font-semibold text-[#1f2c4a]">
                        Business Problem → App Requirements → Working Solution → Client Customization → Published App → Sellable Service
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Who Should Attend</h3>
                      <p className="text-base text-[#475569] mb-3">No coding experience is required.</p>
                      <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                        <li>Entrepreneurs and aspiring business owners</li>
                        <li>Consultants and freelancers</li>
                        <li>Small-business owners</li>
                        <li>Product Managers and Product Owners</li>
                        <li>Operations professionals</li>
                        <li>Marketing and sales professionals</li>
                        <li>Anyone interested in building and selling business applications</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <p className="text-sm text-[#64748b] mb-2">Course Curriculum</p>
                      <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">No-Code AI App Builder™ Course Curriculum</h2>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          title: "Day One: Find the Opportunity and Build the App",
                          topics: [
                            "Identify a valuable small-business problem",
                            "Define the customer and desired business outcome",
                            "Turn the problem into app requirements",
                            "Generate the initial application",
                            "Build the screens, navigation, and user experience",
                            "Add forms, data, and core functionality",
                            "Complete the first working version",
                          ],
                          learningObjective: "Leave day one with a real business problem turned into a working first version of the application.",
                        },
                        {
                          title: "Day Two: Customize, Launch, and Sell",
                          topics: [
                            "Add business rules and advanced features",
                            "Add user accounts and permissions",
                            "Connect external tools and services",
                            "Customize the app for a specific business",
                            "Improve the design and user experience",
                            "Test and publish the finished application",
                            "Create a client-ready demonstration and service offer",
                          ],
                          learningObjective: "Leave day two with a published application, a client-ready demo, and a service offer you can sell.",
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
                        { q: "What is No-Code AI App Builder™ Certification Training?", a: "A live, two-day hands-on course (8 hours total, 4 hours per day). You turn a real business problem into a working application using AI-powered no-code tools. No coding experience is required." },
                        { q: "Is there an exam?", a: "No. The course is about building, customizing, and publishing an application you can sell or use in your own business." },
                        { q: "What kinds of apps can I build?", a: "The same process works for client portals, booking systems, lead managers, ordering apps, operations tools, onboarding systems, quote and intake apps, dashboards, membership portals, and industry-specific business tools." },
                        { q: "Do I need coding experience?", a: "No coding experience is required. You build the screens, features, data, and business rules while AI handles the technical implementation." },
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
                  href={`/courses/ai-app-builder/schedule?course=${courseSlug}`}
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
            <p className="text-sm text-[#64748b] mb-2">No-Code AI App Builder™ Course FAQs</p>
            <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">FAQs on No-Code AI App Builder™ Certification Training</h2>
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
                  { q: "What is No-Code AI App Builder™ Certification Training?", a: "A live, two-day hands-on course. You turn a real business problem into a working application with AI-powered no-code tools. 8 hours total, 4 hours per day." },
                  { q: "Who should take this course?", a: "Entrepreneurs, consultants and freelancers, small-business owners, Product Managers and Product Owners, operations professionals, marketing and sales professionals, and anyone interested in building and selling business applications." },
                  { q: "What are the prerequisites?", a: "No coding experience is required." },
                  { q: "Is there a certification exam?", a: "No exam. You leave with a published application and a repeatable process for packaging it as a client service." },
                  { q: "How is this different from other no-code courses?", a: "You will not simply build a practice app and forget it after class. You learn a repeatable process: Business Problem → App Requirements → Working Solution → Client Customization → Published App → Sellable Service." },
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
