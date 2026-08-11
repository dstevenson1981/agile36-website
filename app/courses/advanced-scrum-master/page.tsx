"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WhyAgile36Section from "@/app/components/WhyAgile36Section";
import { SAFE_COURSE_PARTICIPANTS_LABEL, SAFE_COURSE_PARTICIPANTS_VALUE } from "@/app/lib/course-catalog";
import CourseHeroSocialProof from "@/app/components/CourseHeroSocialProof";
import CourseHeroRightColumn from "@/app/components/CourseHeroRightColumn";
import CourseHeroStats from "@/app/components/CourseHeroStats";
import { RadialGauge, RangeBar, FactChip, DemandMeter } from "@/app/components/CourseInfographics";
import TrustedByStrip from "@/app/components/TrustedByStrip";
import SasmOutcomesDashboard from "@/app/components/SasmOutcomesDashboard";


export default function AdvancedScrumMasterCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const courseSlug = "advanced-scrum-master";

  return (
    <main className="relative z-0 min-h-screen overflow-x-hidden bg-black text-[#1f2c4a]">
      {/* Static glass atmosphere — no looping motion */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-32 h-[50vh] w-[50vh] rounded-full bg-[#d97706]/[0.09] blur-[120px]" />
        <div className="absolute -right-32 top-[20%] h-[45vh] w-[45vh] rounded-full bg-sky-400/[0.08] blur-[130px]" />
        <div className="absolute bottom-[10%] left-1/3 h-[40vh] w-[40vh] rounded-full bg-[#1f2c4a]/[0.06] blur-[110px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full overflow-hidden bg-transparent px-4 pb-16 pt-10 sm:px-6 lg:px-20 lg:pb-20">

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-2 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#1f2c4a]">SAFe</Link>
            <span>/</span>
            <span className="text-[#334155]">SAFe SASM</span>
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
                  AI-Empowered SAFe® Advanced Scrum Master (SASM) Certification Training
                </h1>
                <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-[#475569] md:text-[15px]">
                  Move from team ceremonies to ART-level results: faster flow, cleaner multi-team conflict, and a SASM credential that signals you can coach the train — not just one team.
                </p>
              </div>

              <div>
                <CourseHeroSocialProof enrolledLabel={SAFE_COURSE_PARTICIPANTS_LABEL} />
              </div>

              <CourseHeroStats
                stats={[
                  { value: SAFE_COURSE_PARTICIPANTS_VALUE, label: "Participants" },
                  { value: "4.9", label: "Avg. rating" },
                  { value: "16", label: "Hours live" },
                  { value: "2", label: "Days" },
                ]}
              />

              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  "Unblock flow across teams sharing one PI cadence",
                  "Facilitate hard cross-team conversations without losing trust",
                  "Turn Inspect & Adapt into system fixes, not unused parking lots",
                  "Pass the official SASM exam — attempt included with enrollment",
                  "Use AI for prep and templates without handing over judgment",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
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
                    src="/Advanced_Logo.png"
                    alt="AI-Empowered SAFe Advanced Scrum Master Certification Badge"
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/courses/advanced-scrum-master/schedule?course=${courseSlug}`}
                  className="inline-block rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-[#1f2c4a]/20 transition-colors hover:bg-[#16243f]"
                >
                  View Schedules
                </Link>
                <a
                  href="/AdvancedSM_Brochure.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </a>
              </div>
            </div>

            <div>
              <CourseHeroRightColumn courseSlug={courseSlug}>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13.5px] text-[#475569]">16 Hours Training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13.5px] text-[#475569]">2 Days Duration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13.5px] text-[#475569]">SAFe Advanced Scrum Master (SASM)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13.5px] text-[#475569]">PMI PDUs & Scrum CEUs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13.5px] text-[#475569]">Lifetime Access to Materials</span>
                  </div>
                </div>
              </CourseHeroRightColumn>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by industry leaders */}
      <TrustedByStrip />

      <SasmOutcomesDashboard />

      {/* Page Summary */}
      <section className="relative z-10 w-full border-t border-[#1f2c4a]/10 bg-transparent py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-4">What is SAFe Advanced Scrum Master (SASM) Certification?</h2>
            <p className="text-[14.5px] text-[#334155] leading-relaxed mb-4">
              SAFe Advanced Scrum Master (SASM) certification proves you can improve flow, build high-performing teams, resolve multi-team conflict, and drive Agile Release Train performance. The AI-Empowered course adds practical AI for facilitation — with human judgment still in charge.
            </p>
            <p className="text-[14.5px] text-[#334155] leading-relaxed">
              You earn it by completing a 2-day (16-hour) live course with a SAFe Program Consultant (SPC) and passing the online SASM exam within 30 days. Prior Scrum Master experience and SAFe Scrum Master (SSM) certification are recommended before you enroll.
            </p>
          </div>
        </div>
      </section>

      {/* AI-SEO: Quick Facts */}
      <section className="relative z-10 w-full bg-transparent py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-6">SAFe SASM Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Certification</h3>
              <p className="text-base font-semibold text-[#1f2c4a]">SAFe Advanced Scrum Master (SASM)</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Duration</h3>
              <p className="text-base font-semibold text-[#1f2c4a]">2 Days (16 Hours)</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">PDUs/CEUs</h3>
              <p className="text-base font-semibold text-[#1f2c4a]">PMI PDUs & Scrum CEUs</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Exam Fee</h3>
              <p className="text-base font-semibold text-[#1f2c4a]">Included</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI-SEO: Key Definitions */}
      <section className="relative z-10 w-full bg-transparent py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-8">Key Definitions</h2>
          <div className="space-y-6 max-w-4xl">
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-base text-[#1f2c4a] mb-2">What is an Advanced Scrum Master in SAFe?</h3>
              <p className="text-[#475569] leading-relaxed">
                An Advanced Scrum Master in SAFe goes beyond team-level facilitation to improve flow, build high-performing teams, resolve multi-team conflict, and strengthen Agile Release Train outcomes. SASM-certified professionals coach teams and the train toward measurable improvement.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-base text-[#1f2c4a] mb-2">What is Flow in SAFe?</h3>
              <p className="text-[#475569] leading-relaxed">
                Flow in SAFe refers to the smooth movement of work items through the system with minimal delays. Advanced Scrum Masters optimize flow using Kanban, XP practices, visualization, measurement, and built-in quality to accelerate value delivery.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-base text-[#1f2c4a] mb-2">What is Inspect & Adapt (I&A)?</h3>
              <p className="text-[#475569] leading-relaxed">
                Inspect & Adapt is a significant event held at the end of each Program Increment where the Agile Release Train reflects on the PI, identifies systemic issues, and runs a structured problem-solving workshop to drive continuous improvement.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-base text-[#1f2c4a] mb-2">What is AI-Empowered SAFe?</h3>
              <p className="text-[#475569] leading-relaxed">
                AI-Empowered SAFe integrates responsible AI practices into certification training — using prompting, Studio resources, and human-in-the-loop judgment to amplify facilitation, analysis, and preparation while maintaining Lean-Agile principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisites — modeled after competitor structure, Agile36 visual language */}
      <section
        id="prerequisites"
        className="relative w-full border-y border-[#1f2c4a]/10 bg-transparent px-4 py-14 sm:px-6 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium text-slate-500">
              Prerequisites for SAFe® 6.0 Advanced Scrum Master certification training
            </p>
            <h2 className="mt-2 text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] sm:text-[1.375rem]">
              What are the Prerequisites for the AI-Empowered SAFe ASM Certification Course?
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">
              Participants are expected to have the following understanding and knowledge before enrolling in the SAFe ASM certification training:
            </p>
          </div>

          <ul className="mt-8 max-w-3xl space-y-4">
            {[
              "Basic understanding of Agile principles and Scrum framework",
              "Familiarity with the Scaled Agile Framework (SAFe) concepts is highly recommended",
              "Prior experience working as a Scrum Master, Agile Coach, or in a similar Agile role (preferably 1–2 years)",
              "Completion of SAFe Scrum Master (SSM) certification is often recommended or preferred",
              "Working knowledge of Agile ceremonies such as sprint planning, daily stand-ups, and retrospectives",
              "Understanding of team-level Agile delivery and collaboration practices",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d97706] text-white"
                  aria-hidden
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[14.5px] leading-relaxed text-[#334155]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who Should Take This Course */}
      <section className="relative z-10 w-full bg-transparent py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-8">Who Should Take SAFe SASM Certification?</h2>
          <p className="text-[14.5px] text-[#475569] mb-6 max-w-4xl">
            SASM certification is designed for experienced Scrum Masters ready to deepen their impact across the Agile Release Train:
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-base">•</span>
              <div>
                <h3 className="font-semibold text-base text-[#1f2c4a]">Experienced Scrum Masters</h3>
                <p className="text-[14.5px] text-[#475569]">SSM-certified professionals scaling from team-level to multi-team facilitation on the ART.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-base">•</span>
              <div>
                <h3 className="font-semibold text-base text-[#1f2c4a]">Agile Coaches</h3>
                <p className="text-[14.5px] text-[#475569]">Coaches adding advanced flow, conflict, and ART performance disciplines to their practice.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-base">•</span>
              <div>
                <h3 className="font-semibold text-base text-[#1f2c4a]">Engineering Managers</h3>
                <p className="text-[14.5px] text-[#475569]">Leaders seeking deeper flow measurement and scalable engineering practices.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-base">•</span>
              <div>
                <h3 className="font-semibold text-base text-[#1f2c4a]">Aspiring Release Train Engineers</h3>
                <p className="text-[14.5px] text-[#475569]">Professionals building multi-team facilitation skills as a foundation for train-level roles.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-base">•</span>
              <div>
                <h3 className="font-semibold text-base text-[#1f2c4a]">Program-Level Facilitators</h3>
                <p className="text-[14.5px] text-[#475569]">Facilitators driving organizational transformation and ART-level improvement.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-base">•</span>
              <div>
                <h3 className="font-semibold text-base text-[#1f2c4a]">Senior Scrum Master Leads</h3>
                <p className="text-[14.5px] text-[#475569]">Leaders mentoring other Scrum Masters and championing continuous improvement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-SEO: Related SAFe Certifications */}
      <section className="relative z-10 w-full bg-transparent py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-4">Related SAFe Certifications</h2>
          <p className="text-[14.5px] text-[#475569] mb-8 max-w-4xl">
            Build on your SASM certification with these complementary SAFe certifications:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/courses/scrum-master" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-semibold text-base text-[#1f2c4a] mb-2">→ SAFe Scrum Master (SSM)</h3>
              <p className="text-[#475569] text-sm">Recommended foundation — master team-level Scrum Master facilitation within SAFe before SASM.</p>
            </Link>
            <Link href="/courses/leading-safe" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-semibold text-base text-[#1f2c4a] mb-2">→ Leading SAFe (SAFe Agilist)</h3>
              <p className="text-[#475569] text-sm">Lead Lean-Agile transformations and coordinate Agile Release Trains at enterprise scale.</p>
            </Link>
            <Link href="/courses/product-owner-manager" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-semibold text-base text-[#1f2c4a] mb-2">→ SAFe Product Owner/Product Manager (POPM)</h3>
              <p className="text-[#475569] text-sm">Manage backlogs, participate in PI Planning, and drive customer-centric delivery.</p>
            </Link>
            <Link href="/courses/lean-portfolio-management" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-semibold text-base text-[#1f2c4a] mb-2">→ Lean Portfolio Management (LPM)</h3>
              <p className="text-[#475569] text-sm">Align strategy and execution, manage portfolio flow, and optimize value streams.</p>
            </Link>
            <Link href="/courses/agile-product-management" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-semibold text-base text-[#1f2c4a] mb-2">→ SAFe Agile Product Management (APM)</h3>
              <p className="text-[#475569] text-sm">Apply design thinking and continuous exploration to build products customers love.</p>
            </Link>
            <Link href="/courses/ai-driven-scrum-master" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-semibold text-base text-[#1f2c4a] mb-2">→ AI-Driven Scrum Master</h3>
              <p className="text-[#475569] text-sm">Bring AI into the Scrum Master role — automate reporting and backlog hygiene, and coach teams working alongside AI tools.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* What you walk away with */}
      <section className="relative z-10 w-full border-y border-[#1f2c4a]/10 bg-transparent px-4 py-14 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
                After two days
              </p>
              <h2 className="mt-2 text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a]">
                You leave ready to run the hard conversations
              </h2>
              <p className="mt-3 max-w-2xl text-[14.5px] text-slate-600">
                SASM is for experienced Scrum Masters who are done babysitting one team&apos;s board and ready to unblock the train.
              </p>
            </div>
            <p className="text-[13px] leading-relaxed text-slate-500 lg:text-right">
              Live virtual · SPC-led · Exam included · SSM recommended
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Pass the official exam",
                desc: "120-minute SASM exam, 73% to pass. Attempt is included — plus prep mapped to each exam domain.",
              },
              {
                title: "Improve flow across teams",
                desc: "Visualize WIP, measure bottlenecks, and coach methods that actually accelerate delivery — not vanity velocity.",
              },
              {
                title: "Handle multi-team conflict",
                desc: "Interest-based problem solving and reframing you can use in PI Planning, syncs, and dependency wars.",
              },
              {
                title: "Run Inspect & Adapt for real",
                desc: "Facilitate the problem-solving workshop so I&A produces system fixes, not a parking lot of unused ideas.",
              },
              {
                title: "Use AI without losing judgment",
                desc: "Prompts, templates, and Studio guidance with human-in-the-loop checks — less admin, more facilitation time.",
              },
              {
                title: "Open the next role door",
                desc: "Credential signal for Senior Scrum Master, Agile Coach, and RTE-track opportunities at SAFe enterprises.",
              },
            ].map((item) => (
              <div key={item.title} className="liquid-glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#1f2c4a]">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 w-full bg-transparent py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="space-y-12">
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
                      <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-4">Course Overview</h2>
                      <p className="text-[14.5px] text-[#475569] mb-4">
                        The <strong>AI-Empowered SAFe Advanced Scrum Master (SASM)</strong> course—for experienced Scrum Masters, typically with SAFe Scrum Master (SSM) certification—builds the skills to foster high-performing teams that collaborate on the <strong>Agile Release Train (ART)</strong>. You will improve <strong>flow</strong>, strengthen <strong>cross-team collaboration</strong>, and apply practical <strong>conflict management</strong> so the train stays aligned and delivery stays healthy.
                      </p>
                      <p className="text-[14.5px] text-[#475569] mb-4">
                        Scaled Agile positions this offering as <strong>foundational-level</strong> training that adds <strong>AI-empowered facilitation</strong>: using AI fundamentals and prompting for role-specific templates and analysis, Studio and CoPilot-style tooling for Framework guidance, and <strong>human-in-the-loop</strong> judgment so recommendations stay aligned with Lean-Agile principles. Exam: <strong>120 minutes</strong>, <strong>73%</strong> to pass; credential maintenance includes continuing education per Scaled Agile (e.g. <strong>24 CEUs within a two-year cycle</strong>, <strong>12 CEUs per year</strong> on average).
                      </p>
                      <p className="text-[14.5px] text-[#475569] mb-4">
                        Agile36 delivers this as expert-led, live virtual training with hands-on practice, exam preparation, and the materials you need to succeed—consistent with Scaled Agile&apos;s certification process (workbook, Studio access, practice test with feedback, timed exam with coaching report).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">What You&apos;ll Learn: Advance team value flow</h3>
                      <p className="text-[14.5px] text-[#475569] mb-4">
                        The course deepens team-level facilitation for multi-team environments: coordinating success on the ART, optimizing flow with XP and Kanban practices, facilitating collaboration, and improving ART performance through Inspect &amp; Adapt and related events.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Facilitate cross-team collaboration and synchronized delivery on the ART",
                          "Optimize flow: method selection, visualization, measurement, acceleration, built-in quality",
                          "Manage multi-team engagement: conflict behaviors, sources, interest-based problem solving, reframing",
                          "Drive high-performing teams: characteristics, powerful questions, collaboration, performance assessment",
                          "Improve ART performance: outcome-based team events, IP iteration, I&A, problem-solving workshop",
                          "Apply AI responsibly for the SASM role—templates, insights, and preparation with human oversight",
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

                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">Who Should Attend</h3>
                      <p className="text-[14.5px] text-[#475569] mb-3">
                        Built for professionals with a firm grasp of the Scrum Master role, SAFe principles, and team facilitation—especially <strong>experienced Scrum Masters</strong> and those who already hold or are pursuing <strong>SAFe Scrum Master (SSM)</strong>.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[14.5px] text-[#475569]">
                        <li><strong>Scrum Master</strong> — scale to flow, outcomes, and system improvement at team level</li>
                        <li><strong>Agile Coach</strong> — add advanced SASM disciplines for measurable collaboration across the ART</li>
                        <li><strong>Engineering Manager</strong> — deeper flow measurement and scalable engineering practices</li>
                        <li><strong>Aspiring Release Train Engineer</strong> — multi-team facilitation and conflict resolution as a foundation for train-level roles</li>
                        <li>Program-level facilitators and Agile transformation leaders in SAFe</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">Certification Details</h3>
                      <div className="liquid-glass rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-[#1f2c4a]">SAFe Advanced Scrum Master (SASM)</p>
                            <p className="text-sm text-[#64748b]">AI-Empowered certification path (Scaled Agile)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-[#1f2c4a]">PMI PDUs &amp; Scrum CEUs</p>
                            <p className="text-sm text-[#64748b]">Eligible professional credits per Scaled Agile guidance</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-[#1f2c4a]">Digital badge &amp; certificate</p>
                            <p className="text-sm text-[#64748b]">Shareable credential after you pass the exam</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What is SASM */}
                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">What is the AI-Empowered SAFe Advanced Scrum Master (SASM)?</h3>
                      <p className="text-[14.5px] text-[#475569] mb-4">
                        SASM is the Scaled Agile certification for Scrum Masters who are ready to go deeper on <strong>flow</strong>, <strong>multi-team collaboration</strong>, <strong>conflict</strong>, and <strong>ART outcomes</strong>. The AI-Empowered update adds practical use of AI and Studio tooling so you can focus on facilitation and coaching while still applying Lean-Agile guardrails.
                      </p>
                      <p className="text-[14.5px] text-[#475569]">
                        Exam coverage includes evolving the Advanced Scrum Master role (including empowering teams with AI), improving flow, building high-performing teams, addressing conflict, and improving ART performance—aligned with Scaled Agile&apos;s published exam blueprint.
                      </p>
                    </div>

                    {/* Why SASM */}
                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">Why earn SASM now?</h3>
                      <p className="text-[14.5px] text-[#475569] mb-4">
                        Companies keep scaling SAFe. SASM is how you prove you can support teams <em>and</em> the train — flow, psychological safety, and measurable improvement. The AI-Empowered track matches how work actually gets done: assistants where they help, humans accountable for decisions.
                      </p>
                      <div className="liquid-glass my-6 border-l-2 border-[#d97706] p-6">
                        <p className="text-[14.5px] text-[#475569] font-semibold mb-2">What changes after you certify:</p>
                        <ul className="list-disc list-inside space-y-2 text-[14.5px] text-[#475569]">
                          <li>You can facilitate when multiple teams share dependencies and one PI cadence</li>
                          <li>You have conflict tools that work in the room — not just on a slide</li>
                          <li>You connect team boards to ART health with real flow measures</li>
                          <li>You use AI for speed, then verify before anything hits the ART</li>
                          <li>You are prepared for the official exam (120 minutes, 73% to pass)</li>
                        </ul>
                      </div>
                    </div>

                    {/* Exam domains summary */}
                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">Exam emphasis (Scaled Agile domains)</h3>
                      <p className="text-[14.5px] text-[#475569] mb-6">
                        The certification exam weights roughly: Evolving the Advanced Scrum Master role (11–13%); Improving Flow (22–24%); Building high-performing teams (26–28%); Addressing conflict (18–20%); Improving ART performance (17–19%). Agile36 training maps activities and study time to these areas.
                      </p>
                      <div className="space-y-4">
                        {[
                          "Role evolution: understanding the Advanced Scrum Master and empowering teams with AI",
                          "Flow: team method, visualization, measurement and acceleration, built-in quality",
                          "Teams: high-performing traits, powerful questions, cross-team collaboration, performance assessment",
                          "Conflict: behaviors, sources, interest-based problem solving, reframing, analysis & strategy design",
                          "ART: outcome-based events, coaching IP iteration, I&A, problem-solving workshop",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-[14.5px] text-[#475569]">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">
                        Prerequisites for SAFe® 6.0 Advanced Scrum Master certification training
                      </p>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-3">
                        What are the Prerequisites for the AI-Empowered SAFe ASM Certification Course?
                      </h3>
                      <p className="text-[14.5px] text-[#475569] mb-5">
                        Participants are expected to have the following understanding and knowledge before enrolling in the SAFe ASM certification training:
                      </p>
                      <ul className="liquid-glass space-y-3.5 rounded-xl p-6">
                        {[
                          "Basic understanding of Agile principles and Scrum framework",
                          "Familiarity with the Scaled Agile Framework (SAFe) concepts is highly recommended",
                          "Prior experience working as a Scrum Master, Agile Coach, or in a similar Agile role (preferably 1–2 years)",
                          "Completion of SAFe Scrum Master (SSM) certification is often recommended or preferred",
                          "Working knowledge of Agile ceremonies such as sprint planning, daily stand-ups, and retrospectives",
                          "Understanding of team-level Agile delivery and collaboration practices",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d97706] text-white"
                              aria-hidden
                            >
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.8} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="text-[14.5px] text-[#475569]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Career & Salary — dashboard above sells the story; keep a compact proof strip here */}
                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">Career outcomes after SASM</h3>
                      <p className="text-[14.5px] text-[#475569] mb-4">
                        SASM is the signal that you can coach beyond a single team — flow, conflict, and ART performance. Typical next titles include Senior Scrum Master, Agile Coach, and RTE-track roles.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="liquid-glass rounded-2xl p-6">
                          <h4 className="font-bold text-[#1f2c4a] mb-4">Average salary (US)</h4>
                          <RangeBar
                            title="$120K – $165K"
                            minLabel="$120,000"
                            midLabel="$145,000"
                            maxLabel="$165,000+"
                            caption="Typical US salary band for SAFe SASM professionals"
                          />
                        </div>
                        <div className="liquid-glass rounded-2xl p-6">
                          <h4 className="font-bold text-[#1f2c4a] mb-4">Demand</h4>
                          <DemandMeter caption="Enterprises running SAFe hire SASM-level coaches to stabilize ARTs and raise delivery predictability." />
                        </div>
                      </div>
                    </div>

                    {/* Course Format — plain specs, no icon cards */}
                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">Course Format & Delivery</h3>
                      <dl className="liquid-glass divide-y divide-[#1f2c4a]/10 rounded-xl">
                        <div className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8">
                          <dt className="text-sm font-semibold text-[#1f2c4a]">Live virtual</dt>
                          <dd className="text-[14.5px] text-[#475569]">
                            Interactive online sessions with an expert SAFe Program Consultant (SPC)
                          </dd>
                        </div>
                        <div className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8">
                          <dt className="text-sm font-semibold text-[#1f2c4a]">Duration</dt>
                          <dd className="text-[14.5px] text-[#475569]">
                            2 days · 16 hours of live instruction
                          </dd>
                        </div>
                        <div className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8">
                          <dt className="text-sm font-semibold text-[#1f2c4a]">Materials</dt>
                          <dd className="text-[14.5px] text-[#475569]">
                            Course workbook, study guides, and practice exam access via Scaled Agile
                          </dd>
                        </div>
                        <div className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8">
                          <dt className="text-sm font-semibold text-[#1f2c4a]">Community</dt>
                          <dd className="text-[14.5px] text-[#475569]">
                            1 year access to the SAFe Community Platform
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Exam Information */}
                    <div>
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">SAFe SASM Exam Information</h3>
                      <div className="liquid-glass rounded-2xl p-6 space-y-6">
                        <div className="grid items-center gap-6 md:grid-cols-[200px_1fr]">
                          <RadialGauge
                            percent={73}
                            sublabel="to pass"
                            label="Passing score — 73%"
                          />
                          <div className="grid gap-3 sm:grid-cols-2">
                            <FactChip
                              value="120 minutes"
                              label="Timed, multiple choice"
                              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 2" /></svg>}
                            />
                            <FactChip
                              value="Online exam"
                              label="From anywhere"
                              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
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
                        <div className="pt-4 border-t border-[#1f2c4a]/15">
                          <p className="text-[14.5px] text-[#475569] mb-2">
                            <strong>Note:</strong> The exam can be taken online from anywhere within 30 days of course completion. Your exam attempt is included with course enrollment. Credential maintenance requires continuing education per Scaled Agile guidance.
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
                        <p className="text-sm text-[#64748b] mb-2">Course Curriculum</p>
                        <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a]">AI-Empowered SASM curriculum map</h2>
                      </div>
                      <a 
                        href="/AdvancedSM_Brochure.pdf" 
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
                    {/* Learning Objectives Section */}
                    <div className="liquid-glass mb-6 rounded-xl p-6">
                      <h3 className="text-base font-bold text-[#1f2c4a] mb-4">Learning Objectives</h3>
                      <p className="text-[14.5px] text-[#475569] mb-4">
                        By the end of this course, you will be better able to:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Facilitate collaboration across teams on the ART",
                          "Visualize, measure, and improve team flow using appropriate team methods",
                          "Coach high-performing teams and use powerful questions effectively",
                          "Apply interest-based problem solving and reframing in conflict situations",
                          "Support Inspect & Adapt, the problem-solving workshop, and ART-level improvement",
                          "Use AI and Studio resources responsibly with Lean-Agile guardrails",
                          "Prepare for the official SASM exam structure and timing (120 minutes, 73% to pass)",
                          "Connect day-to-day Scrum Master work to train-level outcomes"
                        ].map((objective, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[14.5px] text-[#475569]">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { 
                          module: "Module 1: Evolving the Advanced Scrum Master role",
                          content: [
                            "Advanced Scrum Master responsibilities on and across the ART",
                            "Empowering teams with AI: prompts, templates, and verification",
                            "Human-in-the-loop use of SAFe Studio / CoPilot-style guidance",
                            "Ethical, quality-focused use of AI with Lean-Agile principles"
                          ]
                        },
                        { 
                          module: "Module 2: Improving flow",
                          content: [
                            "Selecting the team method (Scrum, Kanban, XP hooks)",
                            "Visualizing and managing flow; bottlenecks and WIP",
                            "Measuring and accelerating flow at team level",
                            "Built-in quality practices that protect throughput"
                          ]
                        },
                        { 
                          module: "Module 3: High-performing teams & cross-team collaboration",
                          content: [
                            "Characteristics of high-performing teams",
                            "Employing powerful questions in facilitation",
                            "Promoting cross-team collaboration on shared objectives",
                            "Assessing team performance and improvement backlog items"
                          ]
                        },
                        { 
                          module: "Module 4: Addressing conflict",
                          content: [
                            "Behaviors that improve (or erode) conflict outcomes",
                            "Sources of conflict in multi-team settings",
                            "Interest-based problem solving",
                            "Framing and reframing; conflict analysis and strategy design"
                          ]
                        },
                        { 
                          module: "Module 5: Improving ART performance",
                          content: [
                            "Outcome-based team events and facilitating toward ART goals",
                            "Coaching the Innovation & Planning (IP) iteration",
                            "Inspect & Adapt and the problem-solving workshop",
                            "Exam preparation and review—timed 120-minute, 73% passing context"
                          ]
                        }
                      ].map((module, index) => {
                        const isExpanded = expandedModules.includes(index);
                        return (
                          <div key={index} className="liquid-glass overflow-hidden rounded-lg">
                            <button
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1f2c4a]/[0.1] transition-colors"
                              onClick={() => {
                                setExpandedModules(prev => 
                                  prev.includes(index) 
                                    ? prev.filter(i => i !== index)
                                    : [...prev, index]
                                );
                              }}
                            >
                              <span className="text-sm font-semibold text-[#1f2c4a]">{module.module}</span>
                              <svg 
                                className={`w-5 h-5 text-[#64748b] flex-shrink-0 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 border-t border-blue-100">
                                <ul className="mt-4 space-y-2">
                                  {module.content.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-start gap-2">
                                      <svg className="w-5 h-5 text-[#d97706] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                      <span className="text-[14.5px] text-[#475569]">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a]">Student Reviews</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-[#1f2c4a]">4.9 (234 reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[
                        { 
                          name: "Brian Mitchell", 
                          role: "Scrum Master", 
                          review: "SASM pushed my facilitation past single-team basics. Flow, cross-team collaboration, and I&A prep finally clicked—I passed the SASM exam on my first try.",
                          rating: 5
                        },
                        { 
                          name: "Catherine Wong", 
                          role: "Agile Coach", 
                          review: "The conflict and collaboration depth is what I needed for multi-team settings. Real examples from the trainers made SAFe at scale much easier to coach.",
                          rating: 5
                        },
                        { 
                          name: "Derek Thompson", 
                          role: "Team Lead", 
                          review: "After SSM, this was the right next step. Built-in quality, flow metrics, and ART-level events are now part of how I support teams.",
                          rating: 5
                        },
                        { 
                          name: "Elena Rodriguez", 
                          role: "Senior Scrum Master", 
                          review: "Worth it for the ART focus alone. I’m more deliberate about dependencies, PI readiness, and healthy team dynamics across the train.",
                          rating: 5
                        },
                        { 
                          name: "Franklin Lee", 
                          role: "Agile Facilitator", 
                          review: "Two intense days, well paced. I’ve used the powerful-questions and problem-solving workshop patterns in live PIs already.",
                          rating: 5
                        },
                        { 
                          name: "Gabriela Silva", 
                          role: "Scrum Master", 
                          review: "Exam prep matched the blueprint. Practice scenarios for flow and conflict were the most valuable part of the class.",
                          rating: 5
                        },
                        { 
                          name: "Henry Chen", 
                          role: "Agile Team Coach", 
                          review: "Connects team-level Scrum Master habits to train outcomes. Exactly what I needed before coaching more teams on the same ART.",
                          rating: 5
                        },
                        { 
                          name: "Isabella Martinez", 
                          role: "Lead Scrum Master", 
                          review: "Clear, practical, and focused on measurable improvement. I left with a concrete plan for I&A and team health.",
                          rating: 5
                        }
                      ].map((review, index) => (
                        <div key={index} className="liquid-glass rounded-2xl p-6">
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
                    <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {[
                        { q: "What is the AI-Empowered SAFe Advanced Scrum Master (SASM)?", a: "SASM is Scaled Agile’s certification for experienced Scrum Masters who strengthen flow, high-performing teams, multi-team conflict skills, and ART performance. The AI-Empowered course adds responsible use of AI, prompting, and Studio / CoPilot-style support for the SASM role." },
                        { q: "What is the exam like?", a: "Scaled Agile publishes a timed, multiple-choice SASM exam. As of the AI-Empowered program overview, you have 120 minutes and need 73% to pass. You also get practice tests and a coaching report through the official certification process." },
                        { q: "What is included with the course?", a: "Agile36 provides live expert-led training plus exam preparation. Scaled Agile’s certification process includes perpetual workbook access, Studio for study, an unlimited practice test with feedback, customer support, and the timed exam with coaching report—per their public SASM certification page." },
                        { q: "Do I need Agile experience?", a: "You should already understand Agile principles, Scrum ceremonies, and team-level delivery. Prior experience as a Scrum Master, Agile Coach, or similar role (preferably 1–2 years) is expected, and SAFe Scrum Master (SSM) certification is recommended or preferred before enrolling." }
                      ].map((faq, index) => (
                        <div key={index} className="liquid-glass rounded-2xl p-6">
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
        </div>
      </section>

      {/* Certificate Section */}
      <section className="relative z-10 w-full bg-transparent py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-[#d97706] mb-1">Earn the AI-Empowered SAFe Advanced Scrum Master (SASM) credential</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a]">AI-Empowered SAFe Advanced Scrum Master Certificate</h2>
              <div className="flex gap-1">
                <svg className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Certificate Display */}
          <div className="liquid-glass overflow-hidden rounded-2xl">
            <img
              src="/Advanced_Cert.jpg"
              alt="AI-Empowered SAFe Advanced Scrum Master Certificate"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 w-full bg-transparent py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-[#64748b] mb-2">AI-Empowered SASM course FAQs</p>
            <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a]">FAQs on AI-Empowered SAFe Advanced Scrum Master (SASM)</h2>
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
                    ? "bg-[#1f2c4a] text-white"
                    : "liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] hover:bg-[#1f2c4a] hover:text-white"
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
                  { q: "What if I miss a class? Can I reschedule or get a refund?", a: "If you miss a class, you can attend the next available session at no additional cost when you notify us in advance. Full refunds are available only for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations within thirty (30) days are not refundable. Promo or discounted registrations are non-refundable. We do not offer a 100% money-back guarantee. For questions, please email d.stevenson@agile36.com." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Is there any option to complete the Training in the native language if a participant chooses to?", a: "Currently, our AI-Empowered SAFe Advanced Scrum Master training is conducted in English. However, we do offer course materials in multiple languages. Please contact us to discuss your specific language requirements." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com so they can be processed promptly." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes, upon successful completion of the AI-Empowered SAFe Advanced Scrum Master course and passing the certification exam, you'll receive the official SAFe Advanced Scrum Master (SASM) certificate from Scaled Agile, Inc." }
                ],
                exam: [
                  { q: "What is the format of the AI-Empowered SAFe Advanced Scrum Master (SASM) exam?", a: "The SASM exam is a timed, multiple-choice exam administered by Scaled Agile. Their public certification overview specifies a 120-minute exam and a 73% passing score. Use the practice test in Studio to gauge readiness." },
                  { q: "How long do I have to take the exam after completing the course?", a: "You have 30 days after course completion to take the exam." },
                  { q: "Is the exam included in the course fee?", a: "Yes, the exam fee is included with your course enrollment. There are no additional charges for taking the certification exam." },
                  { q: "Can I take the exam online?", a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course." },
                  { q: "What happens if I fail the exam?", a: "Contact Agile36 for guidance on next steps. Your first exam attempt is included with course enrollment and must be completed within 30 days of the course." },
                  { q: "How do I maintain my SASM certification?", a: "Scaled Agile communicates credential maintenance including continuing education—for example, 24 CEUs within a two-year certification cycle (about 12 CEUs per year). Certification is also described as renewed yearly on their SASM page; verify current renewal fees and CEU rules on scaledagile.com when you certify." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. For questions, please email d.stevenson@agile36.com." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials, the certification exam, and one year of access to the SAFe Community Platform. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is AI-Empowered SAFe Advanced Scrum Master (SASM) certification?", a: "AI-Empowered SAFe Advanced Scrum Master is an advanced certification for experienced Scrum Masters who want to lead program-level coaching, optimize Agile Release Train performance, and drive organizational transformation. It builds on your SAFe Scrum Master (SSM) certification." },
                  { q: "Who should take this course?", a: "This course is ideal for certified SAFe Scrum Masters (SSM), experienced Scrum Masters, Agile Coaches, program-level facilitators, and Agile transformation leaders who want to advance their coaching and facilitation skills at scale." },
                  { q: "What are the prerequisites for this course?", a: "Participants should have a basic understanding of Agile and Scrum, familiarity with SAFe concepts, working knowledge of Agile ceremonies, and understanding of team-level delivery. Prior experience as a Scrum Master, Agile Coach, or similar role (preferably 1–2 years) is expected, and SAFe Scrum Master (SSM) certification is often recommended or preferred." },
                  { q: "How long is the course?", a: "The AI-Empowered SASM class is a 2-day intensive training program, totaling 16 hours of instruction." },
                  { q: "What materials are included?", a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the SASM certification exam." },
                  { q: "Is this course available online?", a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you." },
                  { q: "How do I maintain my certification?", a: "Per Scaled Agile’s public SASM materials, plan for continuing education such as 24 CEUs within a two-year cycle (about 12 CEUs per year), and confirm the latest renewal steps and any annual membership or renewal fees on the official certification page." }
                ]
              };

              return faqs[activeFaqCategory as keyof typeof faqs]?.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div
                    key={index}
                    className="liquid-glass rounded-lg transition-colors hover:bg-white/80"
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
                        <div className="pt-4 border-t border-[#1f2c4a]/20">
                          <p className="text-[14.5px] text-[#475569] leading-relaxed">{faq.a}</p>
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

      {/* SAFe Agilist Certification Section */}
      <section className="relative z-10 w-full bg-transparent py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-4">
              AI-Empowered SAFe Advanced Scrum Master Certification
            </h2>
            <p className="text-[14.5px] text-[#475569] leading-relaxed">
              There has been a significant increase in demand for the AI-Empowered SAFe Advanced Scrum Master certification across the United States, as more organizations embrace Agile-at-scale methodologies and seek experienced professionals to lead program-level coaching and organizational transformation. Companies throughout the USA in sectors including technology, finance, healthcare, and manufacturing are actively recruiting AI-Empowered SAFe Advanced Scrum Masters and Program-level Agile Coaches who can lead organizational change, scale Agile practices across multiple teams, mentor other Scrum Masters, and drive Agile Release Train transformations. These certified experts are highly valued for their expertise in program-level coaching, organizational transformation, advanced facilitation, and scaling Agile practices. The AI-Empowered SAFe Advanced Scrum Master certification serves as a powerful differentiator in the competitive US job market, especially as organizations continue their digital transformation journeys and seek senior Agile leadership.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-4">
              What Certifications Are Required for AI-Empowered SAFe Advanced Scrum Master Certification Training?
            </h2>
            <p className="text-[14.5px] text-[#475569] leading-relaxed">
              Experience as a Scrum Master or Agile Coach is recommended for SASM in the United States. The AI-Empowered SASM course builds skills to collaborate across the Agile Release Train: flow, high-performing teams, multi-team conflict, and ART performance—including responsible AI practices aligned with Scaled Agile’s published curriculum and exam blueprint.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-4">
              What Are Job Opportunities for AI-Empowered SAFe Advanced Scrum Master Professionals?
            </h2>
            <p className="text-[14.5px] text-[#475569] leading-relaxed">
              Advanced Scrum Master professionals in the United States have excellent senior career prospects across various industries. Job opportunities include Senior Scrum Master, Agile Coach, Agile Transformation Leader, Enterprise Agile Coach, and Agile Release Train Coach roles. Companies in technology, finance, healthcare, and manufacturing sectors actively seek professionals with Advanced Scrum Master certification who can facilitate Agile teams effectively, resolve conflicts, optimize team flow, and drive organizational success with advanced Agile methodologies. The certification opens doors to senior leadership positions in Agile transformation and team facilitation roles.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-4">
              What is the Fee for AI-Empowered SAFe Advanced Scrum Master Certification?
            </h2>
            <p className="text-[14.5px] text-[#475569] leading-relaxed">
              Agile36 currently offers this AI-Empowered SASM course at <strong>$599</strong> for live virtual training (pricing may vary by promotion or private cohort). Your investment covers expert-led instruction aligned to the official exam blueprint; Scaled Agile separately provides workbook, Studio, practice test, and exam per their certification process. Always confirm the latest list price on the schedule page before you register.
            </p>
          </div>
        </div>
      </section>

      {/* Find Leading SAFe Course in Cities Section */}
      <section className="relative z-10 w-full bg-transparent py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-[#64748b] mb-2 text-center">Courses based on location</p>
          <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-8 text-center">
            Find AI-Empowered SAFe Advanced Scrum Master Course in Other Top Cities
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
                  className="liquid-glass rounded-lg px-4 py-3 text-center hover:bg-[#1f2c4a]/[0.1] transition-all cursor-pointer"
                >
                  <span className="text-base text-[#1f2c4a] font-medium">{city}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowConsultationModal(false)}
              className="absolute top-4 right-4 text-[#64748b] hover:text-[#1f2c4a]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8">
              <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1f2c4a] mb-6">Get Course Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Tell us about your requirements"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1f2c4a] text-white font-medium py-3 rounded-lg hover:bg-[#16243f] transition-colors"
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
