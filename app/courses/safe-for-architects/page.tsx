"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WhyAgile36Section from "@/app/components/WhyAgile36Section";
import { SAFE_COURSE_PARTICIPANTS_LABEL, SAFE_COURSE_PARTICIPANTS_VALUE } from "@/app/lib/course-catalog";
import CourseHeroSocialProof from "@/app/components/CourseHeroSocialProof";
import CourseHeroRightColumn from "@/app/components/CourseHeroRightColumn";
import CourseHeroStats from "@/app/components/CourseHeroStats";
import { RadialGauge, FactChip, DemandMeter } from "@/app/components/CourseInfographics";
import TrustedByStrip from "@/app/components/TrustedByStrip";
import { courseLong } from "@/app/lib/course-seo";

export default function SafeForArchitectsCoursePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const courseSlug = "safe-for-architects";

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <section className="relative w-full overflow-hidden bg-black px-4 pb-16 pt-10 sm:px-6 lg:px-20 lg:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[55vh] w-[55vh] rounded-full bg-[#d97706]/[0.07] blur-[130px]" />
          <div className="absolute -right-40 top-10 h-[60vh] w-[60vh] rounded-full bg-blue-500/[0.08] blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-2 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#1f2c4a]">SAFe</Link>
            <span>/</span>
            <span className="text-[#334155]">SAFe ARCH</span>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="liquid-glass rounded-full px-3 py-1 text-xs font-medium text-[#1f2c4a]">SAFe</span>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-700">
                  Certification Exam Included
                </span>
              </div>

              <div>
                <h1 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1f2c4a] sm:text-[2rem] lg:text-[2rem]">
                  {courseLong("safe-for-architects")}
                </h1>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#475569] md:text-[15px]">
                  Align architecture with business value, plan architectural runway, and lead Agile architecture across ARTs and Solution Trains.
                </p>
              </div>

              <CourseHeroSocialProof enrolledLabel={SAFE_COURSE_PARTICIPANTS_LABEL} />

              <CourseHeroStats
                stats={[
                  { value: SAFE_COURSE_PARTICIPANTS_VALUE, label: "Participants", icon: "users" },
                  { value: "4.9", label: "Avg. rating", icon: "star" },
                  { value: "24", label: "Hours live", icon: "clock" },
                  { value: "3", label: "Days", icon: "calendar" },
                ]}
              />

              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  "Join SAFe for Architects training with Agile36, a Scaled Agile Silver Partner",
                  "Lead Agile architecture across teams, ARTs, and Solution Trains",
                  "Plan architectural runway, Solution Intent, and enabler epics",
                  "Earn 24 PDUs & SEUs — exam fee included with live instruction",
                  "Get SAFe ARCH certified with live sessions and exam guidance",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-600">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-[14.5px] leading-relaxed text-[#475569]">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 border-t border-[#1f2c4a]/10 pt-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#94a3b8]">Accredited by</span>
                <div className="flex items-center gap-4">
                  <Image
                    src="/Silver.png"
                    alt="Scaled Agile Silver Partner"
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                  <Image
                    src="/ARCH.png"
                    alt="SAFe for Architects Certification Badge"
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/courses/safe-for-architects/schedule?course=${courseSlug}`}
                  className="inline-block rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-[#1f2c4a]/20 transition-colors hover:bg-[#16243f]"
                >
                  View Schedules
                </Link>
              </div>
            </div>

            <CourseHeroRightColumn courseSlug={courseSlug}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">24 Hours Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">3 Days Duration</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">SAFe for Architects (ARCH)</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">24 PDUs & SEUs</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">Lifetime Access to Materials</span>
                </div>
              </div>
            </CourseHeroRightColumn>
          </div>
        </div>
      </section>

      <TrustedByStrip />

      <section className="w-full bg-[#1f2c4a]/[0.03] border-t border-[#1f2c4a]/10 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">What is SAFe for Architects (ARCH) Certification?</h2>
            <p className="text-lg text-[#334155] leading-relaxed mb-4">
              SAFe for Architects (ARCH) certification validates your ability to practice Agile architecture in the Scaled Agile Framework. System, Solution, and Enterprise Architects learn to align architecture with business strategy, plan architectural runway, contribute to Solution Intent, and lead architectural decisions during PI Planning and PI execution.
            </p>
            <p className="text-lg text-[#334155] leading-relaxed">
              The certification is earned by completing a 3-day (24-hour) course taught by a SAFe Program Consultant (SPC) and passing the online SAFe ARCH exam within 30 days of course completion. Upon certification, you receive one year of access to the SAFe Community Platform, 24 PDUs/SEUs, and the credentials to lead architecture in a Lean-Agile enterprise.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-6">SAFe ARCH Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Certification</h3>
              <p className="text-xl font-semibold text-[#1f2c4a]">SAFe for Architects (ARCH)</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Duration</h3>
              <p className="text-xl font-semibold text-[#1f2c4a]">3 Days (24 Hours)</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">PDUs/SEUs</h3>
              <p className="text-xl font-semibold text-[#1f2c4a]">24 PDUs & 24 SEUs</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Exam Fee</h3>
              <p className="text-xl font-semibold text-[#1f2c4a]">Included</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#1f2c4a]/[0.03] py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-8">Key Definitions</h2>
          <div className="space-y-6 max-w-4xl">
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-xl text-[#1f2c4a] mb-2">What is Agile Architecture?</h3>
              <p className="text-[#475569] leading-relaxed">
                Agile Architecture is a set of values, practices, and collaborations that support a system&apos;s active, evolutionary design. Rather than locking architecture upfront, SAFe Architects continuously evolve the design so teams can deliver value without waiting on a central design authority.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-xl text-[#1f2c4a] mb-2">What is Architectural Runway?</h3>
              <p className="text-[#475569] leading-relaxed">
                Architectural runway is the existing code, components, and technical infrastructure needed to implement near-term features without excessive redesign. Architects keep runway healthy by contributing enabler work that supports upcoming Features and Capabilities.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-xl text-[#1f2c4a] mb-2">What is Solution Intent?</h3>
              <p className="text-[#475569] leading-relaxed">
                Solution Intent is the repository for current and intended solution behavior — requirements, designs, and nonfunctional requirements. Architects contribute to Solution Intent so ARTs and Solution Trains share a living understanding of what the system must do.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-xl text-[#1f2c4a] mb-2">What are Nonfunctional Requirements (NFRs)?</h3>
              <p className="text-[#475569] leading-relaxed">
                NFRs define system qualities such as security, reliability, performance, and maintainability. In SAFe, architects help specify, test, and govern NFRs so quality is built in rather than inspected at the end.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-black py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-8">Who Should Take SAFe for Architects?</h2>
          <p className="text-lg text-[#475569] mb-6 max-w-4xl">
            ARCH is built for technical leaders who guide architecture across Agile Release Trains and Solution Trains:
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {[
              { title: "System Architects", desc: "Guide ART-level design, enablers, and architectural runway for upcoming Features." },
              { title: "Solution Architects", desc: "Coordinate architecture across multiple ARTs delivering a large solution." },
              { title: "Enterprise Architects", desc: "Align solution portfolios, strategic themes, and cross-value-stream technical direction." },
              { title: "Technical Managers & Senior Engineers", desc: "Lead architectural decisions and coach teams practicing Agile architecture." },
              { title: "Infrastructure Architects", desc: "Design platforms, environments, and continuous delivery infrastructure that support Release on Demand." },
              { title: "SAFe Practice Consultants", desc: "SPCs supporting architecture during a Lean-Agile transformation." },
            ].map((role) => (
              <div key={role.title} className="flex items-start gap-3">
                <span className="text-[#d97706] font-bold text-xl">•</span>
                <div>
                  <h3 className="font-bold text-lg text-[#1f2c4a]">{role.title}</h3>
                  <p className="text-[#475569]">{role.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#1f2c4a]/[0.03] py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">Related SAFe Certifications</h2>
          <p className="text-lg text-[#475569] mb-8 max-w-4xl">
            Pair ARCH with these complementary SAFe certifications:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/courses/leading-safe" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ Leading SAFe (SAFe Agilist)</h3>
              <p className="text-[#475569] text-sm">The foundation for Lean-Agile leadership, ARTs, and PI Planning before specializing in architecture.</p>
            </Link>
            <Link href="/courses/devops" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ SAFe DevOps (SDP)</h3>
              <p className="text-[#475569] text-sm">Architect for continuous exploration, integration, deployment, and Release on Demand.</p>
            </Link>
            <Link href="/courses/release-train-engineer" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ Release Train Engineer (RTE)</h3>
              <p className="text-[#475569] text-sm">Work alongside RTEs to keep architecture represented in PI Planning and ART execution.</p>
            </Link>
            <Link href="/courses/lean-portfolio-management" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ Lean Portfolio Management (LPM)</h3>
              <p className="text-[#475569] text-sm">Connect enabler epics, lean budgets, and portfolio Kanban to architectural strategy.</p>
            </Link>
            <Link href="/courses/agile-product-management" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ Agile Product Management (APM)</h3>
              <p className="text-[#475569] text-sm">Collaborate with product leaders on Solution Vision, roadmaps, and customer-centric design.</p>
            </Link>
            <Link href="/courses/product-owner-manager" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ SAFe Product Owner/Product Manager (POPM)</h3>
              <p className="text-[#475569] text-sm">Partner with POs and PMs so enablers and Features land in the same PI backlog.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#e9eef6] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-3 text-center">
            Our Key to Exam and Career Success
          </h2>
          <p className="mb-12 text-center text-[#64748b]">
            Everything in your enrollment is built to get you certified — and hired.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "High Pass Rate", desc: "Exam fee is included with enrollment." },
              { title: "Expert-Led Study Sessions", desc: "Live exam prep with certified SPC instructors." },
              { title: "Networking Opportunities", desc: "Join a global community of certified SAFe architects." },
              { title: "Flexible Monthly Payment Plans", desc: "Split your tuition into easy monthly payments." },
              { title: "Real-World Case Studies", desc: "Practice runway, Solution Intent, and PI architecture scenarios." },
              { title: "Hands-On Project Experience", desc: "Apply Agile architecture during live PI Planning simulations." },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/20 hover:shadow-[0_16px_40px_-12px_rgba(13,148,136,0.35),inset_0_1px_1px_rgba(255,255,255,0.8)]"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#d97706]/10">
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h3 className="mt-4 text-base font-bold text-[#1f2c4a]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="border-b border-[#1f2c4a]/15">
              <nav className="flex space-x-8">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "curriculum", label: "Curriculum" },
                  { id: "reviews", label: "Reviews" },
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
                      SAFe for Architects is a 3-day course that prepares System, Solution, and Enterprise Architects to lead Agile architecture in a Lean-Agile enterprise. You will learn how architecture enables continuous value flow, how to collaborate with Product Management and RTEs, and how to contribute during PI Planning and Inspect and Adapt.
                    </p>
                    <p className="text-base text-[#475569] mb-4">
                      The course covers DevOps and Release on Demand, aligning architecture with strategic themes and value streams, developing Solution Vision and Solution Intent, managing NFRs, and leading the transition to Agile architecture. It prepares you for the SAFe® for Architects (ARCH) certification exam.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What You&apos;ll Learn</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Practice Agile architecture using SAFe principles",
                        "Architect for continuous exploration, integration, and deployment",
                        "Align architecture with business strategy and value streams",
                        "Contribute enabler epics and maintain architectural runway",
                        "Prepare architecture for PI Planning and post-PI coordination",
                        "Lead the transition to Agile architecture during transformation",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[14.5px] text-[#475569]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Who Should Attend</h3>
                    <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                      <li>System Architects and System Engineers</li>
                      <li>Solution Architects</li>
                      <li>Enterprise Architects</li>
                      <li>Technical managers and senior technical leaders</li>
                      <li>Infrastructure architects supporting ARTs and Solution Trains</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Certification Details</h3>
                    <div className="bg-[#1f2c4a]/[0.06] rounded-lg p-6 space-y-4">
                      <div>
                        <p className="font-semibold text-[#1f2c4a]">SAFe® for Architects (ARCH) Certification</p>
                        <p className="text-sm text-[#64748b]">Valid for 1 year, renewable</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1f2c4a]">24 PDUs & SEUs</p>
                        <p className="text-sm text-[#64748b]">Earn professional development units</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1f2c4a]">Digital Certificate</p>
                        <p className="text-sm text-[#64748b]">Issued by Scaled Agile, Inc. upon passing the exam</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Prerequisites</h3>
                    <p className="text-base text-[#475569] mb-4">
                      There are no formal prerequisites to enroll in SAFe for Architects. Architecture experience is recommended. Leading SAFe is helpful but not required.
                    </p>
                    <div className="bg-[#1f2c4a]/[0.06] rounded-lg p-6 space-y-3">
                      <p className="text-[14.5px] text-[#475569]">Experience as a system, solution, or enterprise architect recommended</p>
                      <p className="text-[14.5px] text-[#475569]">Leading SAFe (SA) certification helpful</p>
                      <p className="text-[14.5px] text-[#475569]">Familiarity with ARTs, PI Planning, and continuous delivery is useful</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Career Outcomes for SAFe Architects</h3>
                    <p className="text-base text-[#475569] mb-4">
                      ARCH certification signals that you can practice architecture at enterprise scale — not only design systems, but keep delivery flowing across trains.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 my-6">
                      <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                        <h4 className="font-bold text-[#1f2c4a] mb-3">Common Roles</h4>
                        <p className="text-[14.5px] text-[#475569]">System Architect, Solution Architect, Enterprise Architect, Technical Lead</p>
                      </div>
                      <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                        <h4 className="font-bold text-[#1f2c4a] mb-3">Advanced Paths</h4>
                        <p className="text-[14.5px] text-[#475569]">Chief Architect, Head of Architecture, Solution Train Architect</p>
                      </div>
                      <div className="rounded-2xl border border-[#1f2c4a]/15 bg-white p-6 md:col-span-2">
                        <h4 className="font-bold text-[#1f2c4a] mb-4">Demand</h4>
                        <DemandMeter caption="Enterprises scaling SAFe need architects who can keep runway, NFRs, and PI architecture aligned with delivery." />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">SAFe ARCH Exam Information</h3>
                    <div className="bg-[#1f2c4a]/[0.04] rounded-2xl border border-[#1f2c4a]/10 p-6 space-y-6">
                      <div className="grid items-center gap-6 md:grid-cols-[200px_1fr]">
                        <RadialGauge
                          percent={71}
                          sublabel="to pass"
                          label="Passing score — 32 of 45 questions"
                        />
                        <div className="grid gap-3 sm:grid-cols-2">
                          <FactChip
                            value="45 questions"
                            label="Multiple choice, closed book"
                            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
                          />
                          <FactChip
                            value="90 minutes"
                            label="Online, from anywhere"
                            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 2" /></svg>}
                          />
                          <FactChip
                            value="Exam fee included"
                            label="With course enrollment"
                            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                          />
                          <FactChip
                            value="30-day window"
                            label="To complete your exam online"
                            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                          />
                        </div>
                      </div>
                      <p className="text-base text-[#475569] pt-4 border-t border-[#1f2c4a]/15">
                        <strong>Note:</strong> The exam can be taken online from anywhere within 30 days of course completion. Your first exam attempt is included with course enrollment.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-6">Course Curriculum</h2>
                  <div className="space-y-4">
                    {[
                      {
                        day: "Day 1",
                        topics: [
                          "Lesson 1: Agile Architecture and SAFe",
                          "  • Attributes of Agile Architecture",
                          "  • The SAFe Architect role and responsibilities",
                          "  • Collaboration with other enterprise roles",
                          "  • Architecting with SAFe Principles",
                          "Lesson 2: DevOps and Release on Demand",
                          "  • DevOps culture and the Continuous Delivery Pipeline",
                          "  • Architect for continuous exploration, integration, and deployment",
                        ],
                      },
                      {
                        day: "Day 2",
                        topics: [
                          "Lessons 3–4: Architecture with Business Value",
                          "  • Strategic Themes, Portfolio Canvas, and Portfolio Vision",
                          "  • Value streams, ARTs, and Solution Trains",
                          "  • Enabler epics, Solution Intent, NFRs, and roadmaps",
                          "Lessons 5–6: Preparing for and contributing to PI Planning",
                          "  • Architectural runway for the upcoming PI",
                          "  • Management Review and problem-solving",
                        ],
                      },
                      {
                        day: "Day 3",
                        topics: [
                          "Lesson 7: Supporting continuous delivery during PI execution",
                          "  • Iteration Reviews, System Demos, and Solution Demos",
                          "  • Improve through Inspect and Adapt",
                          "Lesson 8: Evolving the solution portfolio across value streams",
                          "Lesson 9: Leading during a Lean-Agile transformation",
                          "  • Lean-Agile leadership attributes for architects",
                          "  • Action plan to support Agile architecture in your organization",
                          "Exam preparation",
                        ],
                      },
                    ].map((day) => (
                      <div key={day.day} className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                        <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">{day.day}</h3>
                        <ul className="space-y-2">
                          {day.topics.map((topic) => {
                            const isSubTopic = topic.trim().startsWith("•");
                            return (
                              <li key={topic} className={`flex items-start gap-3 ${isSubTopic ? "ml-6" : ""}`}>
                                {isSubTopic ? (
                                  <span className="text-[#d97706] mt-0.5 flex-shrink-0">•</span>
                                ) : (
                                  <svg className="w-5 h-5 text-[#d97706] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                                <span className="text-[14.5px] text-[#475569]">{topic.trim().replace(/^•\s*/, "")}</span>
                              </li>
                            );
                          })}
                        </ul>
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
                      <span className="text-base font-semibold text-[#1f2c4a]">4.9 avg. rating</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {[
                      {
                        name: "Priya Nair",
                        role: "Solution Architect",
                        review: "This is the course that finally connected architecture to PI Planning. Architectural runway and enabler epics went from theory to a working backlog practice.",
                      },
                      {
                        name: "James Okonkwo",
                        role: "Enterprise Architect",
                        review: "Clear treatment of Solution Intent, NFRs, and how architects actually collaborate with Product Management. I used the action plan the week after class.",
                      },
                      {
                        name: "Elena Vasquez",
                        role: "System Architect",
                        review: "Three days is the right depth. DevOps and Release on Demand for architects was the missing piece for our ART.",
                      },
                      {
                        name: "David Chen",
                        role: "Technical Lead",
                        review: "Instructors kept the conversation practical — how to show up in PI Planning, Management Review, and Inspect and Adapt without becoming a bottleneck.",
                      },
                    ].map((review) => (
                      <div key={review.name} className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-[#1f2c4a]">{review.name}</h4>
                            <p className="text-sm text-[#64748b]">{review.role}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-[14.5px] text-[#475569]">{review.review}</p>
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
                      { q: "What is the SAFe for Architects (ARCH) certification?", a: "ARCH validates your knowledge of Agile architecture in SAFe and your ability to align architecture with business value, plan runway, and contribute during PI Planning and PI execution." },
                      { q: "How long is the certification valid?", a: "The SAFe for Architects certification is valid for one year from the date of issue. Annual renewal is paid to Scaled Agile, Inc." },
                      { q: "What is included in the course?", a: "The course includes 24 hours of live training over 3 days, official course materials, one ARCH exam attempt, and one year of access to the SAFe Community Platform." },
                      { q: "Do I need prior SAFe experience?", a: "No formal prerequisite. Architecture experience is recommended. Leading SAFe is helpful if you are new to ARTs and PI Planning." },
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
        </div>
      </section>

      <section className="w-full bg-black py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-[#d97706] mb-1">Get the SAFe for Architects Certification</p>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a]">SAFe for Architects (ARCH) Credential</h2>
          </div>
          <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.04] p-10 flex flex-col items-center text-center">
            <Image
              src="/ARCH.png"
              alt="SAFe for Architects certification badge"
              width={112}
              height={112}
              className="h-28 w-28 object-contain"
            />
            <p className="mt-6 max-w-xl text-base text-[#475569]">
              After you pass the exam, Scaled Agile, Inc. issues the official SAFe for Architects (ARCH) digital certificate and community access for one year.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-[#64748b] mb-2">SAFe for Architects Course FAQs</p>
            <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">FAQs on SAFe for Architects Certification Course</h2>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[
              { id: "courses", label: "FAQ Courses" },
              { id: "exam", label: "FAQ Exam" },
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
                    : "liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] hover:bg-[#1f2c4a] hover:text-white"
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
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. For questions, please email d.stevenson@agile36.com." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach our team through the contact page or email d.stevenson@agile36.com. We're available to answer questions about the training program, schedules, and enrollment." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss a customized schedule for your architecture team." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "Click View Schedules on this page. Dates are added in admin as cohorts are confirmed." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes. After you complete the SAFe for Architects course and pass the certification exam, Scaled Agile, Inc. issues the official SAFe for Architects (ARCH) certificate." },
                ],
                exam: [
                  { q: "What is the format of the SAFe for Architects exam?", a: "The ARCH exam is 45 multiple-choice questions in 90 minutes. You need 71% (32 of 45) to pass. The exam is closed book." },
                  { q: "How long do I have to take the exam after completing the course?", a: "You have 30 days after course completion to take the exam." },
                  { q: "Is the exam included in the course fee?", a: "Yes. The first exam attempt is included with your $1,399 enrollment. There is no separate exam fee for that attempt." },
                  { q: "Can I take the exam online?", a: "Yes. The exam is taken online. You will receive access instructions after completing the course." },
                  { q: "What happens if I fail the exam?", a: "Your first attempt is included. Contact Agile36 for guidance on retakes. Additional attempts are paid to Scaled Agile and follow their waiting-period policy." },
                  { q: "How do I renew my ARCH certification?", a: "ARCH is valid for one year. Annual renewal is $195 paid to Scaled Agile. You can renew by earning continuing education credits or taking additional SAFe courses." },
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss options." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. For questions, please email d.stevenson@agile36.com." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No. The $1,399 course price includes live training, materials, the first certification exam attempt, and one year of access to the SAFe Community Platform." },
                ],
                generic: [
                  { q: "What is SAFe for Architects certification?", a: "SAFe for Architects (ARCH) is a 3-day course that teaches system, solution, and enterprise architects how to practice Agile architecture, plan runway, contribute to Solution Intent, and lead architecture during PI Planning and transformation." },
                  { q: "Who should take this course?", a: "System Architects, Solution Architects, Enterprise Architects, technical leaders, senior engineers, and infrastructure architects working in a SAFe enterprise." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. Architecture experience is recommended. Leading SAFe is helpful." },
                  { q: "How long is the course?", a: "SAFe for Architects is a 3-day live training program, totaling 24 hours of instruction." },
                  { q: "How much does the course cost?", a: "The course is $1,399 and includes the exam attempt, materials, and one year of SAFe Community Platform access." },
                  { q: "Is this course available online?", a: "Yes. We offer live virtual training. Private onsite cohorts can be arranged for teams." },
                ],
              };

              return faqs[activeFaqCategory as keyof typeof faqs]?.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div
                    key={faq.q}
                    className="border border-[#1f2c4a]/15 rounded-lg bg-[#1f2c4a]/[0.06] hover:bg-[#1f2c4a]/[0.1] transition-colors"
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
                      <span className="font-semibold text-[#1f2c4a] pr-4">
                        {index + 1}. {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 text-[#d97706] flex-shrink-0 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="pt-4 border-t border-[#1f2c4a]/20">
                          <p className="text-base text-[#475569] leading-relaxed">{faq.a}</p>
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

      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              SAFe for Architects Certification
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Organizations running Agile Release Trains need architects who can keep technical direction aligned with delivery. SAFe for Architects (ARCH) is the role-based credential for System, Solution, and Enterprise Architects who plan runway, contribute to Solution Intent, and show up in PI Planning as partners rather than a separate design authority. Companies in technology, finance, healthcare, and manufacturing recruit ARCH-certified architects to support Release on Demand and Lean-Agile transformation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              What Certifications Are Required for SAFe for Architects Training?
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              No prior certification is required. Architecture experience is recommended. Many participants take Leading SAFe first so ARTs, PI Planning, and Lean-Agile principles are familiar before the architecture-specific work in ARCH.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              What Are Job Opportunities for SAFe Architects?
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              ARCH-certified professionals work as System Architects, Solution Architects, Enterprise Architects, technical leads, and architecture managers. The credential is most useful when the role includes ART or Solution Train collaboration, enabler backlogs, NFRs, and continuous delivery — not only document-centric design.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              What is the Fee for SAFe for Architects Certification?
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Agile36&apos;s SAFe for Architects course is <strong>$1,399</strong>. That includes three days of instructor-led training, official digital study materials, one exam attempt, and a one-year membership to the SAFe Community Platform from Scaled Agile, Inc.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
