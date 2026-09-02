"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SAFE_COURSE_PARTICIPANTS_VALUE } from "@/app/lib/course-catalog";
import TrustedByStrip from "@/app/components/TrustedByStrip";
import CourseScheduleEmbed from "@/app/components/schedule/CourseScheduleEmbed";
import FeaturedCohortCard from "@/app/components/schedule/FeaturedCohortCard";
import type { CourseScheduleRow } from "@/app/lib/schedule-display";

const HERO_AVATARS = [
  "image 120.png",
  "image 137.png",
  "image 247.png",
  "image 476.png",
] as const;

const WHY_CHOOSE_ROWS = [
  {
    n: "01",
    check: "Real product experience",
    usLead: "Learn from people who have actually built products at Fortune 100 companies.",
    usRest:
      "Go beyond SAFe theory with lessons grounded in real product strategy, discovery, roadmaps, prioritization, customer research, and delivery.",
    other: "SAFe expertise doesn't necessarily mean hands-on product-building experience.",
    featured: true,
  },
  {
    n: "02",
    check: "AI-powered product management",
    usLead: "Learn how product management is changing because of AI.",
    usRest:
      "Use AI for market research, customer insights, product strategy, requirements, prioritization, and everyday product work.",
    other: "Traditional POPM training focuses primarily on the standard SAFe curriculum.",
    featured: true,
  },
  {
    n: "03",
    check: "Learn the job, not just SAFe",
    usLead: "We don't just prepare you to understand the framework.",
    usRest:
      "You'll connect SAFe concepts to how strong product teams actually discover, decide what to build, prioritize, and deliver products.",
    other:
      "Certification-focused training can teach the framework without teaching the deeper craft of product management.",
    featured: false,
  },
  {
    n: "04",
    check: "Certification confidence",
    usLead: "Two exam attempts are included.",
    usRest:
      "Exam preparation is incorporated into the training, with a second attempt included if you need it.",
    other: "Exam retake policies and additional costs vary by provider.",
    featured: false,
  },
  {
    n: "05",
    check: "Your class actually runs",
    usLead: "Register for the date you want with confidence.",
    usRest: "Agile36 classes are guaranteed to run, even with a small cohort.",
    other: "Some providers cancel or consolidate classes when enrollment is low.",
    featured: false,
  },
  {
    n: "06",
    check: "Beyond the certification",
    usLead: "Leave with skills you can use Monday morning.",
    usRest:
      "Apply what you learn to real product decisions—not just questions you'll encounter on the exam.",
    other: "The learning experience may be optimized primarily around completing the certification.",
    featured: false,
  },
] as const;

const POPM_OUTCOMES = [
  "Execute the POPM roles day to day — backlogs, forecasting, and representing the customer",
  "Facilitate PI Planning: vision, PI Objectives, dependencies, and risks",
  "Optimize workflow with customer-centric design, features, and stories",
  "Apply AI to refinement, prioritization, and discovery — including responsible use",
] as const;

const POPM_CURRICULUM = [
  {
    day: "Day 1",
    focus: "Roles, vision, and PI Planning",
    modules: [
      {
        title: "Product Owner and Product Manager roles",
        weight: "12–14%",
        featured: false,
        topics: [
          "Applying SAFe to the PO and PM roles",
          "The Lean-Agile mindset",
          "Value streams",
          "PO and PM responsibilities",
        ],
      },
      {
        title: "PI Planning preparation",
        weight: "17–19%",
        featured: false,
        topics: [
          "How PI Planning works",
          "Solution vision",
          "Forecasting work with roadmaps",
          "Planning features",
          "Managing the ART backlog and Kanban",
        ],
      },
      {
        title: "Leadership for PI Planning",
        weight: "14–16%",
        featured: false,
        topics: [
          "Communicating the vision",
          "Planning PI Objectives",
          "Organizing and managing dependencies",
          "Analyzing risks",
        ],
      },
    ],
  },
  {
    day: "Day 2",
    focus: "Execution, flow, and AI",
    modules: [
      {
        title: "Iteration execution",
        weight: "28–30%",
        featured: true,
        topics: [
          "Creating stories",
          "Planning an iteration",
          "Managing flow with Team Kanban",
          "Refining the Team Backlog",
          "Iteration Review and Retrospective",
          "DevOps and Release on Demand",
        ],
      },
      {
        title: "PI execution",
        weight: "10–12%",
        featured: false,
        topics: [
          "PO Sync",
          "System Demo",
          "Innovation throughout the PI",
          "Inspect and Adapt",
        ],
      },
      {
        title: "Apply AI to product roles",
        weight: "12–14%",
        featured: false,
        topics: [
          "AI basics and terminology",
          "Prompting for product work",
          "Risks and responsible AI use",
          "Augmenting PO and PM work with AI",
        ],
      },
    ],
  },
] as const;

export default function ProductOwnerManagerCoursePage({
  initialSchedules = [],
}: {
  initialSchedules?: CourseScheduleRow[];
}) {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentFormData, setAssessmentFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const examName = "SAFe Product Owner/Product Manager Practice Test";
  const courseSlug = "product-owner-manager";

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
        window.location.href = '/test/product-owner-manager';
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
    <main className="min-h-screen bg-[#faf8f4] text-[#1f2c4a]">
      {/* Catalog-style hero */}
      <section className="relative w-full px-4 pb-10 pt-8 sm:px-6 lg:px-20 lg:pb-12 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#94a3b8]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#1f2c4a]">SAFe</Link>
            <span>/</span>
            <span className="text-[#64748b]">SAFe® POPM</span>
          </nav>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-x-14 lg:gap-y-0">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
                SAFe® Certification · Live Online
              </p>
              <h1 className="mt-3 text-[1.85rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1f2c4a] sm:text-4xl">
                AI-Empowered SAFe® Product Owner / Product Manager (POPM) Certification Training
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#475569]">
                The official 2-day live course. You leave ready to own the backlog, run PI Planning, apply customer-centric design, and sit the POPM exam.
              </p>
              <p className="mt-2 text-[15px] font-medium text-[#1f2c4a]">
                Your first two attempts are included.
              </p>
            </div>

            <div id="next-class" className="lg:sticky lg:top-24 lg:row-span-2">
              <FeaturedCohortCard
                courseSlug={courseSlug}
                initialSchedule={initialSchedules[0] ?? null}
              />
              <div className="mt-4 inline-flex items-center gap-3 rounded-lg bg-[#efe8dc] px-4 py-2.5">
                <Image
                  src="/Silver.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <p className="text-sm font-medium text-[#1f2c4a]">
                  Scaled Agile Silver Partner
                </p>
                <Image
                  src="/POPM.jpg"
                  alt="SAFe POPM badge"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
            </div>

            <div className="lg:pt-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2" aria-hidden>
                    {HERO_AVATARS.map((name) => (
                      <Image
                        key={name}
                        src={`/Images/${encodeURIComponent(name)}`}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-[#1f2c4a]">
                    {SAFE_COURSE_PARTICIPANTS_VALUE} trained
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-md border border-[#1f2c4a]/10 bg-white px-2.5 py-1.5 text-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09A6.97 6.97 0 015.5 12c0-.72.12-1.43.34-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-medium text-[#475569]">Google</span>
                  <span className="font-semibold text-[#1f2c4a]">4.9/5</span>
                </div>

                <Link
                  href="https://training.scaledagile.com/?sort=feedbackScore&page=1&limit=25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-[#1f2c4a]/10 bg-white px-2.5 py-1.5 text-sm hover:border-[#1f2c4a]/25"
                >
                  <span className="text-[#d97706]" aria-hidden>★</span>
                  <span className="font-semibold text-[#1f2c4a]">4.94</span>
                  <span className="font-medium text-[#475569]">Highest-rated Scaled Agile partner</span>
                </Link>
              </div>

              <ul className="mt-7 space-y-3">
                {[
                  "Attend 16 hours of live SAFe POPM training and earn 16 PDUs and SEUs",
                  "Sit the official exam with your first two attempts included",
                  "Get a year of SAFe Studio and Community access with courseware included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d97706] text-white">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-[15px] leading-relaxed text-[#334155]">{item}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#next-class"
                  className="inline-flex items-center justify-center rounded-md bg-[#d97706] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b45309]"
                >
                  Enroll Now
                </a>
                <Link
                  href="/corporate"
                  className="inline-flex items-center justify-center rounded-md border border-[#1f2c4a] bg-white px-6 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a] hover:text-white"
                >
                  Team / Corporate Training
                </Link>
              </div>
              <p className="mt-4 text-sm text-[#64748b]">
                Looking for more information?{" "}
                <a
                  href="/POPM_6.0_Partner.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#d97706] underline decoration-[#d97706]/40 underline-offset-2 hover:text-[#b45309]"
                >
                  Download Brochure
                </a>
                {" · "}
                <button
                  type="button"
                  onClick={() => setShowAssessmentModal(true)}
                  className="font-medium text-[#1f2c4a] underline decoration-[#1f2c4a]/25 underline-offset-2 hover:decoration-[#1f2c4a]"
                >
                  Free POPM Assessment
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="upcoming-dates" className="scroll-mt-28 w-full px-4 py-10 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
            Live online cohorts
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
            Upcoming POPM dates
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#475569]">
            Pick a cohort and enroll on this page. Checkout stays on Agile36.
          </p>
          <div className="mt-8">
            <CourseScheduleEmbed
              courseSlug={courseSlug}
              courseName="AI-Empowered SAFe Product Owner/Product Manager"
              brochureHref="/POPM_6.0_Partner.pdf"
              showSafeBadges
              initialSchedules={initialSchedules}
            />
          </div>
        </div>
      </section>

      <TrustedByStrip />

      <section id="why-agile36" className="scroll-mt-28 w-full px-4 py-12 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
            Why Agile36
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
            This is why they should choose us
          </h2>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white">
            <div className="hidden border-b border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b] lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)_minmax(0,1.05fr)] lg:gap-8 lg:px-8">
              <span>What to check</span>
              <span className="text-[#1f2c4a]">Agile36</span>
              <span>Other SAFe training providers</span>
            </div>

            {WHY_CHOOSE_ROWS.map((row) => (
              <div
                key={row.n}
                className={`grid gap-4 border-b border-[#1f2c4a]/10 px-5 py-5 last:border-b-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)_minmax(0,1.05fr)] lg:items-start lg:gap-8 lg:px-8 ${
                  row.featured
                    ? "border-l-[3px] border-l-[#d97706] bg-[#d97706]/[0.07] py-7 lg:py-8"
                    : "bg-white"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="shrink-0 text-lg font-semibold tabular-nums tracking-tight text-[#d97706]">
                    {row.n}
                  </span>
                  <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#1f2c4a]">
                    {row.check}
                  </h3>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d97706] lg:hidden">
                    Agile36
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#475569]">
                    <span className="font-semibold text-[#1f2c4a]">{row.usLead}</span>{" "}
                    {row.usRest}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8] lg:hidden">
                    Other SAFe training providers
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#64748b]">{row.other}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="scroll-mt-28 w-full px-4 py-10 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
            Official 2-day outline
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
            Course curriculum
          </h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            The AI-Empowered SAFe® POPM course follows Scaled Agile&apos;s current outline.
            Lessons map to the exam domains, so class time is also exam prep.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {POPM_OUTCOMES.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-3 rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-3"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97706]" />
                <p className="text-[15px] leading-relaxed text-[#475569]">{outcome}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {POPM_CURRICULUM.map((block) => (
              <div key={block.day} className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
                  {block.day}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-[#1f2c4a]">
                  {block.focus}
                </h3>
                <div className="mt-5 space-y-5">
                  {block.modules.map((mod) => (
                    <div
                      key={mod.title}
                      className={`rounded-xl px-4 py-4 ${
                        mod.featured
                          ? "border-l-[3px] border-l-[#d97706] bg-[#d97706]/[0.07]"
                          : "bg-[#1f2c4a]/[0.03]"
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-[15px] font-semibold text-[#1f2c4a]">{mod.title}</h4>
                        <span className="text-[12px] font-semibold tabular-nums text-[#d97706]">
                          {mod.weight} of exam
                        </span>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {mod.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex gap-2 text-[15px] leading-relaxed text-[#475569]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97706]" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-[#64748b]">
            Exam: 90 minutes, 82% to pass. Day 2 also includes exam prep — your first two attempts
            are included.{" "}
            <a
              href="https://scaledagile.com/certification/product-owner-product-manager/#h-exam-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#d97706] underline decoration-[#d97706]/40 underline-offset-2 hover:text-[#b45309]"
            >
              Scaled Agile exam guidelines
            </a>
          </p>
        </div>
      </section>

      {/* Student reviews */}
      <section
        id="student-reviews"
        className="scroll-mt-28 w-full border-t border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] px-4 py-12 sm:px-6 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
                Google reviews
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
                What students say
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-semibold text-[#1f2c4a]">4.9 Google rating</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Tyler Brooks",
                role: "Product Owner",
                review:
                  "The SAFe Product Owner/Product Manager course was exactly what I needed to advance my career. The focus on backlog management and stakeholder collaboration was excellent. Passed the POPM exam on my first try!",
              },
              {
                name: "Jessica Lee",
                role: "Senior Product Manager",
                review:
                  "Outstanding training program! The real-world examples of product ownership in SAFe environments were incredibly helpful. The instructors brought years of practical experience to every session.",
              },
              {
                name: "Ryan Mitchell",
                role: "Agile Product Owner",
                review:
                  "As someone transitioning from Scrum to SAFe, this course provided a solid foundation. The product management principles and practices are clearly explained. The certification process was straightforward.",
              },
              {
                name: "Priya Sharma",
                role: "Product Manager",
                review:
                  "Excellent course! The content on continuous exploration and customer-centric development transformed my approach to product management. I've already applied many concepts in my organization.",
              },
              {
                name: "Brandon Taylor",
                role: "Release Train Engineer",
                review:
                  "This POPM course helped me understand the bigger picture of product ownership in SAFe. The interactive sessions on epic management and value delivery were particularly valuable. Worth every penny!",
              },
              {
                name: "Maya Patel",
                role: "Product Owner Lead",
                review:
                  "The SAFe POPM certification has opened new career opportunities for me. The training materials on product strategy and roadmap planning are comprehensive. The exam preparation was thorough.",
              },
              {
                name: "Connor O'Brien",
                role: "Product Manager",
                review:
                  "I appreciated the focus on practical application of product management in SAFe. The instructors shared real-world challenges and solutions. The course exceeded my expectations in every way.",
              },
              {
                name: "Isabella Garcia",
                role: "VP of Product",
                review:
                  "Excellent investment in professional development! The SAFe Product Owner/Product Manager framework concepts are clearly explained with relevant examples. I feel confident leading product initiatives now.",
              },
            ].map((review) => (
              <article
                key={review.name}
                className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-6"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#1f2c4a]">{review.name}</h3>
                    <p className="text-sm text-[#64748b]">{review.role}</p>
                  </div>
                  <div className="flex shrink-0" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-[#475569]">{review.review}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Test Section */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">SAFe Product Owner/Product Manager Practice Test</h2>
              <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] font-medium text-[#475569]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Test Card */}
          <div className="max-w-2xl mx-auto">
            <div className="liquid-glass rounded-2xl p-8">
              {/* Badge */}
              <div className="mb-4">
                <span className="bg-[#d97706]/10 border border-[#d97706]/30 text-[#d97706] text-sm font-semibold px-4 py-1.5 rounded-md">
                  1 Practice Test
                </span>
              </div>

              {/* Title and Users */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
                  SAFe Product Owner/Product Manager Practice Test
                </h3>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-[15px] font-semibold text-[#475569]">52,000+ Participants</span>
                </div>
              </div>

              {/* Test Details */}
              <div className="flex items-center gap-8 mb-6 pb-6 border-b border-[#1f2c4a]/15">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[15px] font-medium text-[#475569]">45 Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[15px] font-medium text-[#475569]">1 hours and 30 minutes</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="text-[15px] font-medium text-[#475569]">English</span>
                </div>
                <button
                  onClick={() => setShowAssessmentModal(true)}
                  className="rounded-lg bg-[#d97706] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="w-full bg-black py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706] mb-2">Get certified</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">AI-Empowered SAFe® POPM Certificate</h2>
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
          <div className="rounded-2xl border border-[#1f2c4a]/15 overflow-hidden">
            <img
              src="/POPM_Certificate.jpg"
              alt="Certified AI-Empowered SAFe 6 Product Owner/Product Manager certificate"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706] mb-2">Questions</p>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">FAQs</h2>
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
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. For questions, please email d.stevenson@agile36.com." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Is there any option to complete the Training in the native language if a participant chooses to?", a: "Currently, our SAFe Product Owner/Product Manager training is conducted in English. However, we do offer course materials in multiple languages. Please contact us to discuss your specific language requirements." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "Upcoming live POPM dates are listed on this page under Upcoming POPM dates. Choose a cohort and enroll without visiting a separate schedule page." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com so they can be processed promptly." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes, upon successful completion of the SAFe Product Owner/Product Manager course and passing the certification exam, you'll receive the official SAFe Product Owner/Product Manager (POPM) certificate from Scaled Agile, Inc." }
                ],
                exam: [
                  { q: "What is the difference between a SAFe Product Owner and a SAFe Product Manager?", a: "In SAFe, the Product Owner (PO) works at the team level — managing the team backlog and writing stories. The Product Manager (PM) operates at the program level — defining the product vision, roadmap, and features for the Agile Release Train. The POPM course covers both roles." },
                  { q: "Is the exam included in the Agile36 POPM course price?", a: "Yes. Your first two SAFe POPM exam attempts are included. The exam must be completed within 30 days of the course." },
                  { q: "What is the passing score for the SAFe POPM exam?", a: "The current AI-Empowered POPM exam is 90 minutes. Scaled Agile requires 82% to pass. See the exam guidelines on this page under Course curriculum." },
                  { q: "How long is SAFe POPM certification valid?", a: "One year from the date you pass the exam. Annual renewal requires a minimum of 12 Continuing Education Units (CEUs)." },
                  { q: "Do I need to be in a software company to take SAFe POPM?", a: "No. SAFe is used across industries including healthcare, financial services, government, and manufacturing. The POPM certification is valuable in any enterprise using SAFe." },
                  { q: "Does Agile36 offer private POPM training for teams?", a: "Yes. We specialize in enterprise training and have delivered SAFe POPM to Fortune 100 teams. Contact us for group pricing." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. For questions, please email d.stevenson@agile36.com." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials, the certification exam, and one year of access to the SAFe Community Platform. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is SAFe Product Owner/Product Manager certification?", a: "SAFe POPM is a 2-day certification covering product ownership at scale — backlog management, PI Planning, epic and feature management, and Lean-Agile product delivery within Agile Release Trains." },
                  { q: "Who should take this course?", a: "Product Owners managing team-level backlogs, Product Managers responsible for program-level vision and roadmaps, Business Analysts transitioning into Agile product roles, and anyone working in or with an Agile Release Train (ART)." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. Basic understanding of Agile or Scrum and experience with product backlogs or customer requirements are recommended but not required." },
                  { q: "How long is the course?", a: "The SAFe Product Owner/Product Manager course is a 2-day intensive training program, totaling 16 hours of instruction." },
                  { q: "What materials are included?", a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam." },
                  { q: "Is this course available online?", a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you." },
                  { q: "How do I maintain my certification?", a: "The SAFe Product Owner/Product Manager certification is valid for one year. Scaled Agile requires a minimum of 12 Continuing Education Units (CEUs) each year to renew." }
                ]
              };

              return faqs[activeFaqCategory as keyof typeof faqs]?.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div
                    key={index}
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
                      <span className="pr-4 text-[15px] font-semibold text-[#1f2c4a]">
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
                          <p className="text-[15px] leading-relaxed text-[#475569]">{faq.a}</p>
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

      {/* Free POPM Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAssessmentModal(false);
                setAssessmentFormData({ name: "", email: "" });
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1f2c4a]/10 hover:bg-[#1f2c4a]/20 flex items-center justify-center z-10"
            >
              <span className="text-[#334155] text-xl">×</span>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Section - Course Promotion */}
              <div className="bg-gradient-to-br from-[#1f2c4a]/10 to-transparent p-8 md:w-2/5 flex flex-col justify-center">
                <div>
                  <h2 className="mb-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
                    Ready to Master This Certification?
                  </h2>
                  <p className="mb-4 text-[15px] text-[#475569]">
                    Take your learning to the next level with our comprehensive training course.
                  </p>
                  <ul className="space-y-2 text-[15px] text-[#475569]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#d97706]">✓</span>
                      Live instructor-led sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#d97706]">✓</span>
                      Official certification exam voucher
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#d97706]">✓</span>
                      Lifetime access to course materials
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Section - Practice Test Form */}
              <div className="p-8 md:w-3/5">
                <h3 className="mb-2 text-xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
                  Start Your Practice Test
                </h3>
                <p className="text-[#64748b] mb-6 text-sm">
                  Enter your details below to access the {examName}
                </p>
                <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="assessment-name"
                      className="block text-sm font-medium text-[#475569] mb-2"
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
                      className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="assessment-email"
                      className="block text-sm font-medium text-[#475569] mb-2"
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
                      className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                      placeholder="Enter your email address"
                    />
                    <p className="text-xs text-[#64748b] mt-1">
                      We&apos;ll send you the practice test link and course information
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d97706] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#b45309] disabled:cursor-not-allowed disabled:opacity-50"
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

                  <div className="bg-[#1f2c4a]/[0.06] border border-[#1f2c4a]/15 rounded-lg p-3 mt-4">
                    <p className="text-xs text-[#334155] text-center">
                      💡 <strong>Interested in the full course?</strong> Explore upcoming dates on the course schedule when you&apos;re ready to enroll.
                    </p>
                  </div>

                  <p className="text-xs text-[#64748b] text-center">
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
              <h2 className="mb-6 text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">Get Course Information</h2>
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
