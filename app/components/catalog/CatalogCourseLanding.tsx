"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useMemo, useState } from "react";
import { SAFE_COURSE_PARTICIPANTS_VALUE } from "@/app/lib/course-catalog";
import CorporateQuoteModal from "@/app/components/CorporateQuoteModal";
import TrustedByStrip from "@/app/components/TrustedByStrip";
import CourseScheduleEmbed from "@/app/components/schedule/CourseScheduleEmbed";
import FeaturedCohortCard from "@/app/components/schedule/FeaturedCohortCard";
import type { CatalogLandingContent } from "@/app/lib/catalog-landing";
import type { CourseScheduleRow } from "@/app/lib/schedule-display";

const HEADING =
  "text-[1.85rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1f2c4a] sm:text-4xl";
const SECTION_HEADING =
  "text-2xl font-semibold leading-[1.2] tracking-[-0.03em] text-[#1f2c4a] sm:text-[1.85rem]";
const BODY = "text-[15px] leading-relaxed text-[#475569]";

const HERO_AVATARS = [
  "image 120.png",
  "image 137.png",
  "image 247.png",
  "image 476.png",
] as const;

const COURSE_SUMMARY_TITLE: Record<string, string> = {
  "leading-safe": "AI-Empowered Leading SAFe® (6.0) Course Summary",
  "product-owner-manager": "AI-Empowered SAFe® Product Owner / Product Manager (6.0) Course Summary",
  "scrum-master": "AI-Empowered SAFe® Scrum Master (6.0) Course Summary",
  "lean-portfolio-management": "AI-Empowered SAFe® Lean Portfolio Management (6.0) Course Summary",
  "agile-product-management": "AI-Empowered SAFe® Agile Product Management (6.0) Course Summary",
  "safe-for-architects": "SAFe® for Architects (6.0) Course Summary",
  "safe-for-teams": "AI-Empowered SAFe® for Teams (6.0) Course Summary",
  devops: "AI-Empowered SAFe® DevOps (6.0) Course Summary",
  "advanced-scrum-master": "AI-Empowered SAFe® Advanced Scrum Master (6.0) Course Summary",
  "release-train-engineer": "AI-Empowered SAFe® Release Train Engineer Course Summary",
  "value-stream-mapping": "SAFe® Value Stream Mapping Course Summary",
  "responsible-ai": "Achieving Responsible AI with SAFe Course Summary",
};

function durationPhrase(label: string): string {
  if (/3-Day/i.test(label)) return "three-day";
  if (/Half-Day/i.test(label)) return "half-day";
  return "two-day";
}

function passingScoreLabel(content: CatalogLandingContent): string | null {
  const line = content.examDetails?.format.find((item) =>
    item.highlight.toLowerCase().startsWith("passing score")
  );
  if (!line) return null;
  return line.highlight.replace(/^Passing score\s*/i, "");
}

function certShortName(content: CatalogLandingContent): string {
  return (content.certificateTitle || content.cardTitle).replace(/\s*Certificate$/i, "").trim();
}

function goalParts(outcome: string): { title: string; rest: string } {
  const cut = outcome.search(/,| — | – /);
  if (cut > 12) {
    return { title: outcome.slice(0, cut), rest: outcome.slice(cut).replace(/^,\s*/, "") };
  }
  const words = outcome.split(" ");
  if (words.length <= 6) return { title: outcome, rest: "" };
  return { title: words.slice(0, 4).join(" "), rest: words.slice(4).join(" ") };
}

function certifiedCopy(content: CatalogLandingContent) {
  const hasExam = content.attemptsLine !== null;
  const days = durationPhrase(content.durationLabel);
  const cert = certShortName(content);
  const score = passingScoreLabel(content);

  if (!hasExam) {
    return {
      path: [
        { n: "01", label: "Register for the course" },
        { n: "02", label: "Attend the workshop" },
        { n: "03", label: "Do the work in class" },
        { n: "04", label: "Receive the micro-credential" },
        { n: "05", label: "Keep a year of SAFe Community" },
      ],
      steps: [
        { lead: "Enroll", rest: ` in our ${content.scheduleCourseName} workshop` },
        { lead: `Attend the ${days} live session`, rest: "" },
        { lead: "Complete the in-class work", rest: " — the credential is the workshop, not an exam" },
        { lead: "Receive the official micro-credential", rest: " from Scaled Agile" },
        { lead: "Keep one year of SAFe Community access", rest: " with the courseware" },
      ],
    };
  }

  return {
    path: [
      { n: "01", label: "Register for the course" },
      { n: "02", label: "Attend the live class" },
      { n: "03", label: "Pass the online exam" },
      { n: "04", label: `Receive your ${cert} certificate` },
      { n: "05", label: "Continue with 1 year of SAFe Studio" },
    ],
    steps: [
      { lead: "Enroll", rest: ` in our ${content.scheduleCourseName} course` },
      { lead: `Attend the ${days} live training`, rest: "" },
      { lead: "After you finish class,", rest: " exam access is granted" },
      { lead: "Accept the Candidate Agreement", rest: " and sit the exam" },
      {
        lead: score ? `Score ${score} to pass` : "Meet the passing score",
        rest: score ? " and pass the exam" : " listed in Scaled Agile's exam guidelines",
      },
      { lead: `Get certified as ${cert}`, rest: " from Scaled Agile" },
    ],
  };
}

function CertifiedTrack({
  path,
  steps,
}: {
  path: { n: string; label: string }[];
  steps: { lead: string; rest: string }[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % path.length);
    }, 700);
    return () => window.clearInterval(id);
  }, [path.length]);

  const fill = path.length > 1 ? (active / (path.length - 1)) * 100 : 0;
  const highlightedStep = active === path.length - 1 ? steps.length - 1 : Math.min(active, steps.length - 1);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
      <div>
        <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[#d97706]">
          Get Certified
        </p>
                <h2 className={`mt-3 ${SECTION_HEADING}`}>
          Steps to getting certified
        </h2>
        <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-2">
          <span
            className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-1 overflow-hidden rounded-full bg-[#1f2c4a]/15 sm:block"
            aria-hidden
          >
            <span
              className="block h-full rounded-full bg-[#d97706] transition-[width] duration-500 ease-out"
              style={{ width: `${fill}%` }}
            />
          </span>
          {path.map((stop, index) => {
            const on = index === active;
            const done = index < active;
            return (
              <div key={stop.n} className="relative flex flex-col items-center text-center">
                <span
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-[15px] font-semibold ring-4 ring-[#faf8f4] ${
                    on
                      ? "cert-station-on bg-[#d97706] text-white"
                      : done
                        ? "bg-[#d97706] text-white"
                        : "bg-[#1f2c4a] text-white"
                  }`}
                >
                  {stop.n}
                </span>
                <p
                  className={`mt-3 max-w-[9.5rem] text-[13px] font-medium leading-snug ${
                    on || done ? "text-[#1f2c4a]" : "text-[#64748b]"
                  }`}
                >
                  {stop.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <ol className="space-y-3 rounded-2xl bg-[#1f2c4a] p-6 sm:p-7">
        {steps.map((step, index) => {
          const on = index === highlightedStep;
          return (
            <li
              key={step.lead}
              className={`flex items-start gap-3 text-[15px] leading-snug transition-opacity duration-500 ${
                on ? "text-white" : "text-white/55"
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition-colors duration-500 ${
                  on ? "bg-[#d97706] text-white" : "bg-white/15 text-white"
                }`}
              >
                {index + 1}
              </span>
              <p>
                <span className="font-semibold text-white">{step.lead}</span>
                {step.rest}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function CatalogCourseLanding({
  content,
  initialSchedules = [],
}: {
  content: CatalogLandingContent;
  initialSchedules?: CourseScheduleRow[];
}) {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showCorporateQuote, setShowCorporateQuote] = useState(false);
  const [assessmentFormData, setAssessmentFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const handleAssessmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessmentFormData.email || !assessmentFormData.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    if (!assessmentFormData.name.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!content.assessmentHref) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/store-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: assessmentFormData.name,
          email: assessmentFormData.email,
          source: "SA Free Assessment",
          exam_name: content.examName || content.practiceTestTitle,
        }),
      });

      if (response.ok) {
        window.location.href = content.assessmentHref;
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || "Failed to submit email. Please try again.");
        setIsSubmitting(false);
      }
    } catch {
      alert("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const [activeSection, setActiveSection] = useState("overview");

  const pageTabs = useMemo(() => {
    const tabs: { id: string; label: string }[] = [
      { id: "overview", label: "Overview" },
      { id: "upcoming-dates", label: "Get Certified" },
    ];
    if (content.attemptsLine !== null || content.examDetails) {
      tabs.push({ id: "exam", label: "Exam Details" });
    }
    tabs.push(
      { id: "why-agile36", label: "Why Agile36" },
      { id: "curriculum", label: "Curriculum" }
    );
    if (content.careerPath) tabs.push({ id: "career-path", label: "Career Path" });
    tabs.push({ id: "faqs", label: "FAQs" });
    return tabs;
  }, [content.attemptsLine, content.examDetails, content.careerPath]);

  useEffect(() => {
    const ids = pageTabs.map((tab) => tab.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pageTabs]);

  function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  const faqGroups = content.faqs;

  return (
    <main className="min-h-screen bg-[#faf8f4] text-[#1f2c4a]">
      <section className="relative w-full px-4 pb-10 pt-8 sm:px-6 lg:px-20 lg:pb-12 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#94a3b8]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#1f2c4a]">SAFe</Link>
            <span>/</span>
            <span className="text-[#64748b]">{content.crumb}</span>
          </nav>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-x-14 lg:gap-y-0">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
                {content.eyebrow || "SAFe® Certification · Live Online"}
              </p>
              <h1 className={`mt-3 ${HEADING}`}>
                {content.title}
              </h1>
              <p className={`mt-4 max-w-xl ${BODY}`}>
                {content.lede}
              </p>
              {content.attemptsLine === null ? null : (
                <p className="mt-2 text-[15px] font-medium text-[#1f2c4a]">
                  {content.attemptsLine || "Your first two attempts are included."}
                </p>
              )}
            </div>

            <div id="next-class" className="lg:sticky lg:top-24 lg:row-span-2">
              <FeaturedCohortCard
                courseSlug={content.slug}
                initialSchedule={initialSchedules[0] ?? null}
                badgeSrc={content.badgeSrc}
                cardTitle={content.cardTitle}
                durationLabel={content.durationLabel}
                includesLine={content.includesLine}
              />
              <div className="mt-4 inline-flex items-center gap-3 rounded-lg bg-[#efe8dc] px-4 py-2.5">
                <Image src="/Silver.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
                <p className="text-sm font-medium text-[#1f2c4a]">Scaled Agile Silver Partner</p>
                <Image
                  src={content.badgeSrc}
                  alt={content.badgeAlt}
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
                {content.highlights.map((item) => (
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
                <button
                  type="button"
                  onClick={() => setShowCorporateQuote(true)}
                  className="inline-flex items-center justify-center rounded-md border border-[#1f2c4a] bg-white px-6 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a] hover:text-white"
                >
                  Team / Corporate Training
                </button>
              </div>
              <p className="mt-4 text-sm text-[#64748b]">
                Looking for more information?{" "}
                {content.brochureHref ? (
                  <a
                    href={content.brochureHref}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#d97706] underline decoration-[#d97706]/40 underline-offset-2 hover:text-[#b45309]"
                  >
                    Download Brochure
                  </a>
                ) : null}
                {content.brochureHref && content.assessmentHref ? " · " : null}
                {content.assessmentHref ? (
                  <button
                    type="button"
                    onClick={() => setShowAssessmentModal(true)}
                    className="font-medium text-[#1f2c4a] underline decoration-[#1f2c4a]/25 underline-offset-2 hover:decoration-[#1f2c4a]"
                  >
                    {content.assessmentLabel || "Free Assessment"}
                  </button>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustedByStrip />

      <nav
        aria-label="On this page"
        className="sticky top-[4.25rem] z-40 border-b border-[#1f2c4a]/15 bg-[#faf8f4]/95 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-20">
          {pageTabs.map((tab) => {
            const active = activeSection === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(event) => scrollToSection(event, tab.id)}
                className={`relative shrink-0 px-4 py-4 text-[15px] font-semibold tracking-[-0.02em] transition sm:flex-1 sm:px-2 sm:text-center md:text-base ${
                  active
                    ? "text-[#1f2c4a]"
                    : "text-[#64748b] hover:text-[#1f2c4a]"
                }`}
              >
                {tab.label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-[3px] rounded-full transition sm:inset-x-4 ${
                    active ? "bg-[#d97706]" : "bg-transparent"
                  }`}
                  aria-hidden
                />
              </a>
            );
          })}
        </div>
      </nav>

      <section id="overview" className="scroll-mt-32 w-full px-4 py-10 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className={`max-w-xl ${SECTION_HEADING}`}>
            {COURSE_SUMMARY_TITLE[content.slug] || content.summaryTitle || "Course Summary"}
          </h2>
          <div className="mt-4 max-w-xl space-y-4">
            {(content.summary || content.lede).split(/\n\n/).map((paragraph) => (
              <p key={paragraph} className={BODY}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="upcoming-dates" className="scroll-mt-32 w-full px-4 py-12 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {(() => {
            const certified = certifiedCopy(content);
            return (
              <>
                <CertifiedTrack path={certified.path} steps={certified.steps} />

                <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
                  <div>
                    <h2 className={SECTION_HEADING}>
                      Learning goals
                    </h2>
                    <ul className="mt-6 space-y-4">
                      {content.outcomes.map((outcome) => {
                        const goal = goalParts(outcome);
                        return (
                          <li key={outcome} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-[#d97706] text-white">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <p className="text-[16px] leading-relaxed text-[#334155]">
                              <span className="font-semibold text-[#1f2c4a]">{goal.title}</span>
                              {goal.rest ? ` ${goal.rest}` : null}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white">
                    {content.certificateSrc ? (
                      <img
                        src={content.certificateSrc}
                        alt={content.certificateTitle || content.cardTitle}
                        className="h-auto w-full"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-[#1f2c4a]/[0.04] p-8">
                        <Image
                          src={content.badgeSrc}
                          alt={content.badgeAlt}
                          width={120}
                          height={120}
                          className="h-28 w-28 object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}

          <p className="mt-14 text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
            Live online cohorts
          </p>
          <h2 className={`mt-3 ${SECTION_HEADING}`}>
            {content.datesTitle}
          </h2>
          <div className="mt-8">
            <CourseScheduleEmbed
              courseSlug={content.slug}
              courseName={content.scheduleCourseName}
              brochureHref={content.brochureHref}
              showSafeBadges
              initialSchedules={initialSchedules}
            />
          </div>
        </div>
      </section>

      {content.examDetails ? (
        <section id="exam" className="scroll-mt-32 w-full px-4 py-12 sm:px-6 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[#d97706]">
                  Exam Details
                </p>
                <h2 className={`mt-3 ${SECTION_HEADING}`}>
                  Prerequisites
                </h2>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#475569]">
                  {content.examDetails.prerequisites}
                </p>
              </div>
              <div>
                <p className="hidden text-[13px] font-medium uppercase tracking-[0.16em] lg:block" aria-hidden>
                  &nbsp;
                </p>
                <h2 className={`mt-3 ${SECTION_HEADING}`}>
                  Exam Format
                </h2>
                <ul className="mt-6 space-y-4">
                  {content.examDetails.format.map((line) => (
                    <li key={`${line.before ?? ""}${line.highlight}${line.after ?? ""}`} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-[#d97706] text-white">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <p className="text-[17px] leading-snug text-[#334155]">
                        {line.before}
                        <span className="font-semibold text-[#d97706]">{line.highlight}</span>
                        {line.after}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {content.attemptsLine === null ? null : (
              <div className="mt-10 flex items-start gap-4 rounded-2xl bg-[#1f2c4a] px-6 py-6 text-white sm:px-8">
                <span
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d97706]"
                  aria-hidden
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 6.75h15M6 6.75V18a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0018 18V6.75M9 10.5h6M9 14.25h3.75"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-[17px] font-semibold tracking-[-0.02em]">
                    Exam prep is part of the class, not an extra product
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-white/75">
                    {content.attemptsLine || "Your first two attempts are included."} Official courseware
                    and a year of SAFe Studio come with enrollment.
                  </p>
                </div>
              </div>
            )}
            <p className="mt-6 text-[15px] leading-relaxed text-[#64748b]">
              {content.examNote}{" "}
              <a
                href={content.examGuidelinesHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#d97706] underline decoration-[#d97706]/30 underline-offset-2 hover:text-[#b45309]"
              >
                Scaled Agile exam guidelines
              </a>
              .
            </p>
          </div>
        </section>
      ) : null}

      <section id="why-agile36" className="scroll-mt-32 w-full px-4 py-12 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">Why Agile36</p>
          <h2 className={`mt-3 ${SECTION_HEADING}`}>
            This is why they should choose us
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white">
            <div className="hidden border-b border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748b] lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)_minmax(0,1.05fr)] lg:gap-8 lg:px-8">
              <span>What to check</span>
              <span className="text-[#1f2c4a]">Agile36</span>
              <span>{content.whyOtherLabel || "Other SAFe training providers"}</span>
            </div>
            {content.whyRows.map((row) => (
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
                  <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#1f2c4a]">{row.check}</h3>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d97706] lg:hidden">
                    Agile36
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#475569]">
                    <span className="font-semibold text-[#1f2c4a]">{row.usLead}</span> {row.usRest}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8] lg:hidden">
                    {content.whyOtherLabel || "Other SAFe training providers"}
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#64748b]">{row.other}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="scroll-mt-32 w-full px-4 py-10 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
            Official outline
          </p>
          <h2 className={`mt-3 ${SECTION_HEADING}`}>
            Course curriculum
          </h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            {content.curriculumLede ||
              "This course follows Scaled Agile's current outline. Lessons map to the exam domains, so class time is also exam prep."}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {content.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-3 rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-3"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97706]" />
                <p className="text-[15px] leading-relaxed text-[#475569]">{outcome}</p>
              </li>
            ))}
          </ul>
          <div className={`mt-8 grid gap-6 ${content.curriculum.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            {content.curriculum.map((block) => (
              <div key={block.day} className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">{block.day}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-[#1f2c4a]">{block.focus}</h3>
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
                        {mod.weight ? (
                          <span className="text-[12px] font-semibold tabular-nums text-[#d97706]">
                            {mod.weight} of exam
                          </span>
                        ) : null}
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex gap-2 text-[15px] leading-relaxed text-[#475569]">
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
          {content.examDetails ? null : (
            <p id="exam" className="mt-6 scroll-mt-32 text-[15px] leading-relaxed text-[#64748b]">
              {content.examNote}{" "}
              <a
                href={content.examGuidelinesHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#d97706] underline decoration-[#d97706]/30 underline-offset-2 hover:text-[#b45309]"
              >
                Scaled Agile exam guidelines
              </a>
              .
            </p>
          )}
        </div>
      </section>

      {content.careerPath ? (
        <section id="career-path" className="scroll-mt-32 w-full px-4 py-12 sm:px-6 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
              After this cert
            </p>
            <h2 className={`mt-3 ${SECTION_HEADING}`}>
              Career path
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#475569]">
              {content.careerPath.lede}
            </p>
            <div
              className={`mt-8 grid gap-4 ${
                content.careerPath.next.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"
              }`}
            >
              {content.careerPath.next.map((step, index) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="group rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 transition hover:border-[#d97706]/40"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d97706]">
                    Next {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[#1f2c4a] group-hover:text-[#d97706]">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">{step.forWho}</p>
                  <p className="mt-4 text-sm font-semibold text-[#1f2c4a]">
                    View dates
                    <span aria-hidden className="ml-1 transition group-hover:ml-2">
                      →
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="student-reviews"
        className="scroll-mt-32 w-full border-t border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] px-4 py-12 sm:px-6 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">Google reviews</p>
              <h2 className={`mt-3 ${SECTION_HEADING}`}>
                What students say
              </h2>
            </div>
            <p className="text-sm font-semibold text-[#1f2c4a]">4.9 Google rating</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {content.reviews.map((review) => (
              <article key={review.name} className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#1f2c4a]">{review.name}</h3>
                    <p className="text-sm text-[#64748b]">{review.role}</p>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-[#475569]">{review.review}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {content.practiceTestTitle && content.assessmentHref ? (
        <section className="w-full bg-black px-4 py-8 sm:px-6 lg:px-20">
          <div className="mx-auto max-w-2xl">
            <div className="liquid-glass rounded-2xl p-8">
              <span className="rounded-md border border-[#d97706]/30 bg-[#d97706]/10 px-4 py-1.5 text-sm font-semibold text-[#d97706]">
                1 Practice Test
              </span>
              <h2 className={`mt-4 ${SECTION_HEADING}`}>
                {content.practiceTestTitle}
              </h2>
              <p className="mt-2 text-[15px] text-[#475569]">
                {SAFE_COURSE_PARTICIPANTS_VALUE} participants · {content.practiceQuestions || "Practice questions"} ·{" "}
                {content.practiceDuration || "Timed"}
              </p>
              <button
                type="button"
                onClick={() => setShowAssessmentModal(true)}
                className="mt-6 rounded-lg bg-[#d97706] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
              >
                Start Test
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {content.attemptsLine !== null && !content.examDetails ? (
        <section className="w-full px-4 py-6 sm:px-6 lg:px-20">
          <div className="mx-auto flex max-w-7xl items-start gap-4 rounded-2xl bg-[#1f2c4a] px-6 py-6 text-white sm:px-8">
            <span
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d97706]"
              aria-hidden
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 6.75h15M6 6.75V18a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0018 18V6.75M9 10.5h6M9 14.25h3.75"
                />
              </svg>
            </span>
            <div>
              <p className="text-[15px] font-semibold tracking-[-0.02em]">
                Exam prep is part of the class, not an extra product
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/75">
                {content.attemptsLine || "Your first two attempts are included."} Official courseware
                and a year of SAFe Studio come with enrollment.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section id="faqs" className="scroll-mt-32 w-full bg-black px-4 py-8 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
            Questions
          </p>
          <h2 className={`mb-8 text-center ${SECTION_HEADING}`}>
            FAQs
          </h2>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {(
              [
                ["courses", "FAQ Courses"],
                ["exam", "FAQ Exam"],
                ["payment", "FAQ Payment"],
                ["generic", "FAQ Generic"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveFaqCategory(id);
                  setExpandedFaqs([]);
                }}
                className={`rounded-md px-6 py-2 font-semibold transition-colors ${
                  activeFaqCategory === id
                    ? "bg-[#1f2c4a] text-white"
                    : "liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] hover:bg-[#1f2c4a] hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {faqGroups[activeFaqCategory as keyof typeof faqGroups]?.map((faq, index) => {
              const isExpanded = expandedFaqs.includes(index);
              return (
                <div
                  key={faq.q}
                  className="rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] transition-colors hover:bg-[#1f2c4a]/[0.1]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedFaqs(
                        isExpanded ? expandedFaqs.filter((i) => i !== index) : [...expandedFaqs, index]
                      )
                    }
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <span className="pr-4 text-[15px] font-semibold text-[#1f2c4a]">
                      {index + 1}. {faq.q}
                    </span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-[#d97706] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isExpanded ? (
                    <div className="px-4 pb-4">
                      <div className="border-t border-[#1f2c4a]/20 pt-4">
                        <p className="text-[15px] leading-relaxed text-[#475569]">{faq.a}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CorporateQuoteModal
        open={showCorporateQuote}
        onClose={() => setShowCorporateQuote(false)}
        courseSlug={content.slug}
        courseLabel={content.scheduleCourseName}
      />

      {showAssessmentModal && content.assessmentHref ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8">
            <button
              type="button"
              onClick={() => {
                setShowAssessmentModal(false);
                setAssessmentFormData({ name: "", email: "" });
              }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2c4a]/10 hover:bg-[#1f2c4a]/20"
            >
              <span className="text-xl text-[#334155]">×</span>
            </button>
            <h3 className="mb-2 text-xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
              Start Your Practice Test
            </h3>
            <p className="mb-6 text-sm text-[#64748b]">
              Enter your details below to access the {content.examName || content.practiceTestTitle}
            </p>
            <form onSubmit={handleAssessmentSubmit} className="space-y-4">
              <div>
                <label htmlFor="assessment-name" className="mb-2 block text-sm font-medium text-[#475569]">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="assessment-name"
                  required
                  value={assessmentFormData.name}
                  onChange={(e) => setAssessmentFormData({ ...assessmentFormData, name: e.target.value })}
                  className="w-full rounded-lg border border-[#1f2c4a]/20 bg-[#1f2c4a]/10 px-4 py-2 text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="assessment-email" className="mb-2 block text-sm font-medium text-[#475569]">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="assessment-email"
                  required
                  value={assessmentFormData.email}
                  onChange={(e) => setAssessmentFormData({ ...assessmentFormData, email: e.target.value })}
                  className="w-full rounded-lg border border-[#1f2c4a]/20 bg-[#1f2c4a]/10 px-4 py-2 text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                  placeholder="Enter your email address"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-lg bg-[#d97706] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#b45309] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Start Practice Test"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
