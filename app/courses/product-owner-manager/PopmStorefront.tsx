"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import CorporateQuoteModal from "@/app/components/CorporateQuoteModal";
import TrustedByStrip from "@/app/components/TrustedByStrip";
import CourseScheduleEmbed from "@/app/components/schedule/CourseScheduleEmbed";
import EnrollNowLink from "@/app/components/schedule/EnrollNowLink";
import type { CatalogLandingContent, FaqItem } from "@/app/lib/catalog-landing";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";
import { getFeaturedScheduleInstructorProfiles } from "@/app/lib/schedule-instructors";
import {
  formatDateRange,
  formatTimeRange,
  formatTimezoneLabel,
  type CourseScheduleRow,
} from "@/app/lib/schedule-display";

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "roles", label: "PO & PM" },
  { id: "included", label: "What is included" },
  { id: "exam", label: "Exam" },
  { id: "curriculum", label: "Curriculum" },
  { id: "dates", label: "Schedules" },
  { id: "trainers", label: "Trainers" },
  { id: "faqs", label: "FAQs" },
] as const;

const HERO_POINTS = [
  "Two exam attempts included, due within 60 days of the course",
  "16 hours live, plus 16 PDUs and 16 SEUs",
  "One year of SAFe Studio and the official courseware",
  "Write epics, features, and user stories the way an ART uses them",
  "Lead the product side of PI Planning: vision, objectives, dependencies, and risks",
  "Use AI for discovery, refinement, and prioritization, with a line on responsible use",
];

const KEYS: [string, string][] = [
  ["Guaranteed to run", "Every listed Agile36 cohort runs, even with a small group."],
  ["Two exam attempts", "Both are in the tuition. Later retakes follow Scaled Agile."],
  ["Practice before the exam", "A free POPM assessment is on this page."],
  ["Product experience", "Instructors who have built products, not only taught the slides."],
  ["Hands-on PI Planning", "You practice the event, not a lecture about it."],
  ["Live, not a recording", "Two days with a SAFe Practice Consultant and live Q&A."],
];

const AUDIENCE = [
  "Product Owners",
  "Product Managers",
  "Business Analysts",
  "Project and program managers",
  "Scrum Masters",
  "Engineers and architects",
  "Delivery managers",
  "Product leaders on an ART",
];

const AUDIENCE_BY_SLUG: Record<string, string[]> = {
  "product-owner-manager": AUDIENCE,
  "leading-safe": ["Executives", "Directors", "Managers", "Agile coaches", "Change agents", "Consultants"],
  "scrum-master": ["Scrum Masters", "Team coaches", "Project managers", "Agile team members", "New facilitators"],
  "advanced-scrum-master": ["Experienced Scrum Masters", "Team coaches", "Release Train Engineers", "Agile coaches"],
  "release-train-engineer": ["Release Train Engineers", "Program managers", "Scrum Masters moving up", "Agile coaches"],
  "lean-portfolio-management": ["Portfolio managers", "Epic owners", "Executives", "Strategy leaders", "LACE members"],
  "agile-product-management": ["Product managers", "Product owners", "Solution managers", "Business owners", "Product leaders"],
  "safe-for-architects": ["System architects", "Solution architects", "Enterprise architects", "Technical leaders"],
  "safe-for-teams": ["Developers", "Testers", "Scrum Masters", "Product owners", "Agile team members"],
  devops: ["DevOps engineers", "System teams", "Release managers", "Developers", "Operations"],
  "value-stream-mapping": ["Value stream leads", "Operations leaders", "Coaches", "Transformation leads"],
};

const EXAM_STEPS: [string, string][] = [
  ["Attend the class", "Two days with a SAFe Practice Consultant. Completing it is what makes you eligible."],
  ["Get the exam link", "Scaled Agile emails access after the class. You cannot buy the exam on its own."],
  ["Sit the exam", "90 minutes, 45 questions, one answer each, closed book. Scaled Agile lists 82% as the passing score. You cannot pause it. The result shows when you submit."],
  ["Use the included attempts", "Two attempts, within 60 days. Later retakes follow Scaled Agile fees and waiting periods."],
  ["Receive the credential", "PDF certificate and digital badge. One year of SAFe Community membership comes with a pass."],
];

type PayCard = { role: string; label: string; pay: string; note: string };
type PayBlock = { title: string; copy: string; cards: PayCard[]; source: string; href: string; extra?: string };

const PAY: Record<string, PayBlock> = {
  "product-owner-manager": {
    title: "What US Product Owner roles pay in 2026",
    copy: "Glassdoor total pay in the United States, from 13,035 Product Owner salaries. Total pay includes base plus bonus and other cash pay. City and industry move the number. This is market data, not a promise of pay.",
    cards: [
      { role: "Product Owner", label: "Median total pay", pay: "$151,000", note: "Most likely range $121,000–$191,000" },
      { role: "Senior Product Owner", label: "Total pay range", pay: "$142,000–$209,000", note: "The next step up on the same track" },
      { role: "Top of the range", label: "90th percentile", pay: "$234,000", note: "Highest seniority on this track is estimated near $280,000" },
    ],
    source: "Glassdoor Product Owner pay, 2026",
    href: "https://www.glassdoor.com/Salaries/product-owner-salary-SRCH_KO0,13.htm",
    extra: "Base pay alone usually sits between $103,000 and $157,000. The higher figures are total pay.",
  },
  "scrum-master": {
    title: "What US Scrum Master roles pay in 2026",
    copy: "Glassdoor total pay in the United States, from 10,181 Scrum Master salaries reported as of October 8, 2026. Total pay includes base plus additional pay. City and industry move the number. This is market data, not a promise of pay.",
    cards: [
      { role: "Scrum Master", label: "Median total pay", pay: "$129,000", note: "Most likely range $103,000–$162,000" },
      { role: "Senior Scrum Master", label: "Total pay range", pay: "$134,000–$197,000", note: "Glassdoor’s senior band" },
      { role: "Top of the range", label: "90th percentile", pay: "$198,000", note: "Highest seniority estimate about $214,000" },
    ],
    source: "Glassdoor Scrum Master pay, 2026",
    href: "https://www.glassdoor.com/Salaries/scrum-master-salary-SRCH_KO0,12.htm",
    extra: "Base pay on the same page is usually $94,000 to $145,000, before bonus and additional pay.",
  },
  "advanced-scrum-master": {
    title: "What senior Scrum Master roles pay in 2026",
    copy: "This class is for people already doing the Scrum Master job. Glassdoor’s 2026 Scrum Master page, from 10,181 salaries reported as of October 8, 2026, puts the senior total-pay band at $134,000 to $197,000. Median total pay for the role overall is $129,000. These are market figures, not a salary Agile36 can promise.",
    cards: [
      { role: "Senior Scrum Master", label: "Total pay range", pay: "$134,000–$197,000", note: "Closer comparison for this class" },
      { role: "Scrum Master", label: "Median total pay", pay: "$129,000", note: "Most likely range $103,000–$162,000" },
      { role: "Top of the range", label: "90th percentile", pay: "$198,000", note: "Highest seniority estimate about $214,000" },
    ],
    source: "Glassdoor Scrum Master pay, 2026",
    href: "https://www.glassdoor.com/Salaries/scrum-master-salary-SRCH_KO0,12.htm",
    extra: "Base pay on the same page is usually $94,000 to $145,000, before bonus and additional pay.",
  },
  "agile-product-management": {
    title: "What US Product Manager roles pay in 2026",
    copy: "Glassdoor total pay in the United States, from 93,230 Product Manager salaries reported as of October 8, 2026. Total pay includes base plus additional pay. City and industry move the number. This is market data, not a promise of pay.",
    cards: [
      { role: "Product Manager", label: "Median total pay", pay: "$160,000", note: "Most likely range $129,000–$201,000" },
      { role: "Upper half", label: "75th percentile", pay: "$201,000", note: "25th percentile about $129,000" },
      { role: "Top of the range", label: "90th percentile", pay: "$246,000", note: "Highest seniority estimate about $278,000" },
    ],
    source: "Glassdoor Product Manager pay, 2026",
    href: "https://www.glassdoor.com/Salaries/product-manager-salary-SRCH_KO0,15.htm",
    extra: "Base pay on the same page is usually $108,000 to $163,000, before bonus and additional pay.",
  },
};

function money(value: string | number): string {
  const amount = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(amount)) return String(value);
  return amount.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function nextCohort(rows: CourseScheduleRow[]): CourseScheduleRow | null {
  const today = new Date().toISOString().slice(0, 10);
  return (
    [...rows]
      .filter((row) => (row.start_date || "").slice(0, 10) >= today)
      .sort((a, b) => a.start_date.localeCompare(b.start_date))[0] ?? null
  );
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">{eyebrow}</p>
      <h2 className="mt-2 text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] text-[#1f2c4a] sm:text-[2rem]">{title}</h2>
      {copy ? <p className="mt-3 text-[15px] leading-7 text-[#64748b]">{copy}</p> : null}
    </div>
  );
}

function Accordion({
  items,
  openFirst = true,
}: {
  items: { title: string; body: ReactNode }[];
  openFirst?: boolean;
}) {
  const [open, setOpen] = useState(openFirst ? 0 : -1);
  return (
    <div className="divide-y divide-[#1f2c4a]/10 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-semibold text-[#1f2c4a]">{item.title}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef3f8] text-lg leading-none text-[#1f2c4a]">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? <div className="px-5 pb-5 text-sm leading-7 text-[#475569]">{item.body}</div> : null}
          </div>
        );
      })}
    </div>
  );
}

export default function PopmStorefront({
  content,
  initialSchedules,
}: {
  content: CatalogLandingContent;
  initialSchedules: CourseScheduleRow[];
}) {
  const [active, setActive] = useState("overview");
  const [showQuote, setShowQuote] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessment, setAssessment] = useState({ name: "", email: "" });
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [faqGroup, setFaqGroup] = useState<keyof CatalogLandingContent["faqs"]>("generic");
  const upcoming = useMemo(() => nextCohort(initialSchedules), [initialSchedules]);
  const listPrice = COURSE_HERO_SCHEDULE_LIST_USD[content.slug];
  const price = upcoming?.price || (listPrice ? String(listPrice.current) : "");
  const original = upcoming?.original_price || (listPrice ? String(listPrice.original) : "");
  const discount =
    price && original && Number(money(original).replace(/,/g, "")) > Number(money(price).replace(/,/g, ""))
      ? Math.round((1 - Number(String(price).replace(/[^0-9.]/g, "")) / Number(String(original).replace(/[^0-9.]/g, ""))) * 100)
      : null;
  const instructors = useMemo(() => getFeaturedScheduleInstructorProfiles().slice(0, 4), []);
  const faqItems: FaqItem[] = content.faqs[faqGroup] ?? [];
  const modules = content.curriculum.flatMap((day) => day.modules.map((module) => ({ ...module, day: day.day })));
  const isPopm = content.slug === "product-owner-manager";
  const pay = PAY[content.slug];
  const nav = NAV.filter((item) => item.id !== "roles" || isPopm);
  const heroPoints = [
    "Rated 4.9/5 from Agile36 learners",
    "Highest feedback score on Scaled Agile",
    ...(isPopm ? HERO_POINTS : (content.highlights.length ? content.highlights : content.outcomes).slice(0, 5)),
  ];
  const keys: [string, string][] = [];
  if (isPopm) {
    keys.push(...KEYS);
  } else {
    keys.push(
      ["Guaranteed to run", "Every listed Agile36 cohort runs, even with a small group."],
      ["Live class", content.durationLabel],
      ["What is included", content.includesLine],
    );
    for (const row of content.whyRows.slice(0, 3)) keys.push([row.check, `${row.usLead} ${row.usRest}`]);
  }
  const audience = AUDIENCE_BY_SLUG[content.slug] ?? [];
  const passLine = content.examDetails?.format.find((line) => /passing score/i.test(line.highlight));
  const examSteps: [string, string][] = isPopm
    ? EXAM_STEPS
    : [
        ["Attend the class", "Completing the authorized class is what makes you eligible for the exam."],
        ["Get the exam link", "Scaled Agile emails access after the class."],
        ["Sit the exam", passLine ? `${passLine.highlight}${passLine.after}` : `${content.examNote.split(". ")[0]}.`],
        ["Use the included attempts", content.includesLine],
        ["Receive the credential", "Scaled Agile issues the certificate and digital badge after you pass. It does not say the class was virtual."],
      ];
  const included: [string, string][] = isPopm
    ? [
        ["16 hours live", "Two instructor-led days."],
        ["16 PDUs and 16 SEUs", "Training hours for PMI and Scrum Alliance. Renewal of the cert is separate: 12 CEUs a year."],
        ["Two exam attempts", "Included, and due within 60 days."],
        ["SAFe Studio", "One year of Community Platform access and official courseware."],
        ["Certificate and badge", "Issued by Scaled Agile after you pass."],
        ["Free practice assessment", "45 questions, same length as the exam window."],
      ]
    : [
        [content.durationLabel, "Live instructor-led class."],
        ["What is included", content.includesLine],
        ["Exam", content.attemptsLine || content.examNote.split(". ")[0]],
        ["Certificate and badge", content.safePartner === false ? "Issued after you finish the class." : "Issued by Scaled Agile after you pass."],
      ];
  const citation =
    "Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.";
  const ledeBase = content.lede.split("\n").map((line) => line.trim()).filter(Boolean)[0] || content.lede;
  const lede = ledeBase.includes("highest feedback score") ? ledeBase : `${ledeBase} ${citation}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25] },
    );
    NAV.filter((item) => item.id !== "roles" || content.slug === "product-owner-manager").forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [content.slug]);

  async function submitAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!assessment.name.trim() || !assessment.email.includes("@") || !content.assessmentHref) return;
    setSending(true);
    try {
      const response = await fetch("/api/store-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: assessment.name,
          email: assessment.email,
          source: "SA Free Assessment",
          exam_name: content.examName || content.practiceTestTitle,
        }),
      });
      if (!response.ok) throw new Error("failed");
      window.location.href = content.assessmentHref;
    } catch {
      window.alert("We could not start the assessment. Please try again.");
      setSending(false);
    }
  }

  return (
    <main className="bg-[#f6f8fb] text-[#1f2c4a]">
      <section className="border-b border-[#1f2c4a]/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:px-8 lg:py-10">
          <div>
            <nav className="flex flex-wrap items-center gap-2 text-xs text-[#94a3b8]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-[#1f2c4a]">Courses</Link>
              <span>/</span>
              <span className="text-[#475569]">{content.crumb}</span>
            </nav>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#d97706]">{content.eyebrow || content.crumb}</p>
            <h1 className="mt-2 text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] text-[#1f2c4a] sm:text-[2.45rem]">
              {content.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#475569]">
              {lede}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {content.safePartner !== false ? <span className="font-semibold text-[#1f2c4a]">4.9/5 from Agile36 learners · highest feedback score on Scaled Agile</span> : null}
              {content.safePartner !== false ? <span className="text-[#64748b]">Scaled Agile Silver Partner</span> : null}
              <span className="font-semibold text-emerald-700">Guaranteed to run</span>
            </div>
            <ul className="mt-6 max-w-2xl space-y-2.5">
              {heroPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-[#334155]">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#dates" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1f2c4a] px-5 text-sm font-semibold text-white hover:bg-[#16243f]">
                View schedules
              </a>
              {content.brochureHref ? (
                <a href={content.brochureHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#1f2c4a]/20 bg-white px-5 text-sm font-semibold text-[#1f2c4a] hover:border-[#1f2c4a]/40">
                  Download brochure
                </a>
              ) : null}
              <button type="button" onClick={() => setShowQuote(true)} className="min-h-11 cursor-pointer px-2 text-sm font-semibold text-[#d97706]">
                Train your team
              </button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Image src="/Silver.png" alt="Scaled Agile Silver Partner" width={36} height={36} className="h-9 w-9 object-contain" />
              <Image src={content.badgeSrc} alt={content.badgeAlt} width={44} height={44} className="h-11 w-11 rounded-lg border border-[#1f2c4a]/10 bg-white object-contain p-1" />
              <p className="text-xs leading-5 text-[#64748b]">Credential issued by Scaled Agile after you pass.<br />Agile36 teaches the authorized class.</p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-5 shadow-[0_18px_50px_-28px_rgba(31,44,74,.45)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">Upcoming schedule</p>
              {upcoming ? (
                <>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">{formatDateRange(upcoming.start_date, upcoming.end_date, upcoming.timezone)}</p>
                  <p className="mt-1 text-sm text-[#64748b]">
                    {[formatTimeRange(upcoming.start_time, upcoming.end_time), formatTimezoneLabel(upcoming.timezone)].filter(Boolean).join(" · ") || "Live online"}
                  </p>
                  {upcoming.instructor_name ? <p className="mt-2 text-sm font-medium text-[#1f2c4a]">{upcoming.instructor_name}</p> : null}
                </>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[#64748b]">Dates are listed below. Every cohort on this page is guaranteed to run.</p>
              )}
              <div className="mt-4 border-t border-[#1f2c4a]/10 pt-4">
                {discount ? <p className="text-sm font-semibold text-[#d97706]">{discount}% off</p> : null}
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-3xl font-semibold tracking-[-0.04em]">USD {money(price || "545")}</p>
                  {original ? <p className="text-sm text-[#94a3b8] line-through">USD {money(original)}</p> : null}
                </div>
                <p className="mt-1 text-xs leading-5 text-[#64748b]">{content.includesLine}</p>
              </div>
              {upcoming ? (
                <EnrollNowLink
                  courseSlug={content.slug}
                  scheduleId={upcoming.id}
                  quantity={1}
                  label="Enroll now"
                  className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-[#d97706] text-sm font-semibold text-white hover:bg-[#b45309]"
                />
              ) : (
                <a href="#dates" className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-[#d97706] text-sm font-semibold text-white hover:bg-[#b45309]">
                  Enroll now
                </a>
              )}
              <a href="#dates" className="mt-3 block text-center text-sm font-semibold text-[#1f2c4a] underline-offset-2 hover:underline">
                View all schedules
              </a>
              <button type="button" onClick={() => setShowQuote(true)} className="mt-4 w-full cursor-pointer rounded-lg border border-[#1f2c4a]/15 bg-[#f8fafc] px-4 py-3 text-left">
                <p className="text-sm font-semibold">Group / corporate training</p>
                <p className="mt-0.5 text-xs text-[#64748b]">Private cohort for your team. Get a quote.</p>
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-[#1f2c4a]/10 bg-[#f6f8fb]">
        <div className="mx-auto grid max-w-6xl gap-px bg-[#1f2c4a]/10 px-4 py-px sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {keys.map(([title, copy]) => (
            <div key={title} className="bg-[#f6f8fb] px-4 py-5">
              <p className="text-sm font-semibold text-[#1f2c4a]">{title}</p>
              <p className="mt-1 text-xs leading-5 text-[#64748b]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <TrustedByStrip />

      <nav className="sticky top-[4.25rem] z-30 border-b border-[#1f2c4a]/10 bg-white" aria-label="On this page">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:px-6">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 border-b-2 px-3 py-3.5 text-sm font-semibold ${active === item.id ? "border-[#d97706] text-[#1f2c4a]" : "border-transparent text-[#94a3b8] hover:text-[#475569]"}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Overview" title={isPopm ? "What this POPM class covers" : content.summaryTitle || `What this ${content.crumb} class covers`} copy={content.summary || content.lede.split(/\n\s*\n/)[0]} />
          <div className="mt-8">
            <Accordion
              items={[
                {
                  title: isPopm ? "What is SAFe POPM certification training?" : `What is ${content.crumb}?`,
                  body: content.lede.split(/\n\s*\n/).map((paragraph) => <p key={paragraph} className="mb-3 last:mb-0">{paragraph}</p>),
                },
                {
                  title: isPopm ? "Why take POPM?" : "Why take this class?",
                  body: isPopm
                    ? "The credential shows you can do the product roles on an Agile Release Train: the backlog, PI Planning, and how features become stories. Completing this authorized class is what makes you eligible for the exam."
                    : content.summary || content.outcomes[0] || content.includesLine,
                },
                {
                  title: "What is included?",
                  body: content.includesLine + (content.safePartner === false ? "" : " After you pass, Scaled Agile issues the PDF certificate and a shareable digital badge. The certificate does not say the class was virtual."),
                },
                {
                  title: "What skills does the class cover?",
                  body: (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {content.outcomes.map((item) => (
                        <li key={item} className="flex gap-2"><span className="text-[#d97706]">•</span>{item}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "How is the class delivered?",
                  body: isPopm
                    ? "Live online, instructor-led, across two days and 16 hours. The same official curriculum as a classroom class. Private teams can book an in-person or virtual cohort."
                    : `${content.durationLabel}. Live and instructor-led, with the same official curriculum as a classroom class. Private teams can book an in-person or virtual cohort.`,
                },
              ]}
            />
          </div>
        </div>
      </section>

      {isPopm ? <section id="roles" className="scroll-mt-28 border-y border-[#1f2c4a]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Two roles"
            title="Product Owner and Product Manager are not the same job"
            copy="SAFe splits them on purpose. You practice both, and the handoff between them."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["Product Owner", "The team backlog", ["Owns the team backlog", "Splits features into stories with acceptance criteria", "Joins planning, refinement, review, and the retrospective", "Brings customer feedback into the next slice"]],
              ["Product Manager", "The ART backlog", ["Owns vision, roadmap, and features", "Prioritizes with value, time, risk, and job size", "Presents the vision in PI Planning", "Works with stakeholders on what the train builds next"]],
            ].map(([role, seat, points]) => (
              <article key={role as string} className="rounded-2xl border border-[#1f2c4a]/10 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d97706]">{role as string}</p>
                <h3 className="mt-1 text-xl font-semibold">{seat as string}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[#475569]">
                  {(points as string[]).map((point) => (
                    <li key={point} className="flex gap-2"><span className="text-emerald-600">✓</span>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-[#1f2c4a] px-5 py-4 text-sm leading-6 text-white/80">
            The Product Manager names the feature. The Product Owner breaks it into stories and stays with the team until it ships. PI Planning is where those two views have to agree.
          </p>
        </div>
      </section> : null}

      {pay ? (
      <section className="border-b border-[#1f2c4a]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Pay" title={pay.title} copy={pay.copy} />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pay.cards.map((card) => (
              <article key={card.role} className="rounded-2xl border border-[#1f2c4a]/10 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d97706]">{card.role}</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">{card.pay}</p>
                <p className="mt-1 text-sm font-medium text-[#1f2c4a]">{card.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">{card.note}</p>
              </article>
            ))}
          </div>
          {pay.extra ? <p className="mt-4 max-w-3xl text-sm leading-6 text-[#64748b]">{pay.extra}</p> : null}
          <a href={pay.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-[#d97706] hover:underline">
            {pay.source}
          </a>
        </div>
      </section>
      ) : null}

      <section id="included" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Included with tuition" title="The class, the attempts, and the membership are in the price." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(([title, copy]) => (
              <article key={title} className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">{copy}</p>
              </article>
            ))}
          </div>
          {content.assessmentHref ? <div className="mt-8 rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h3 className="text-lg font-semibold">{content.practiceTestTitle || "Practice test"}</h3>
              <p className="mt-1 text-sm leading-6 text-[#64748b]">Use it before you book, or after class, to see how the questions feel.</p>
            </div>
            <button type="button" onClick={() => setShowAssessment(true)} className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-[#1f2c4a] px-5 text-sm font-semibold text-white hover:bg-[#16243f] sm:mt-0">
              Start the free assessment
            </button>
          </div> : null}
        </div>
      </section>

      <section className="border-y border-[#1f2c4a]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Who attends" title={isPopm ? "People who sit near a backlog, a customer, or a train." : "Who this class is for."} />
            <div className="mt-6 flex flex-wrap gap-2">
              {audience.map((role) => (
                <span key={role} className="rounded-full border border-[#1f2c4a]/10 bg-[#f6f8fb] px-3 py-1.5 text-sm font-medium text-[#1f2c4a]">{role}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#d97706]/30 bg-[#fff7ed] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b45309]">Prerequisites and eligibility</p>
            <h3 className="mt-2 text-xl font-semibold text-[#1f2c4a]">{/no formal prerequisites/i.test(content.examDetails?.prerequisites || "") || isPopm ? "No prior certification is required." : "What you should already know."}</h3>
            <p className="mt-3 text-sm leading-7 text-[#475569]">
              {content.examDetails?.prerequisites || "There are no formal prerequisites. Agile or Scrum experience, and time with a backlog, makes the class easier to use. It is not required to enroll."}
            </p>
          </div>
        </div>
      </section>

      <section id="exam" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Exam format" title="Class first. Then the exam. Then the badge." copy={content.examNote} />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start">
            <div>
              <ol className="space-y-3">
                {examSteps.map(([title, copy], index) => (
                  <li key={title} className="flex gap-4 rounded-xl border border-[#1f2c4a]/10 bg-white p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f2c4a] text-sm font-semibold text-white">{index + 1}</span>
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#64748b]">{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {content.examDetails?.format?.length ? (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {content.examDetails.format.map((line) => (
                    <p key={`${line.highlight}${line.after || ""}`} className="rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-3 text-sm text-[#475569]">
                      {line.before}<strong className="font-semibold text-[#1f2c4a]">{line.highlight}</strong>{line.after}
                    </p>
                  ))}
                </div>
              ) : null}
              {content.examGuidelinesHref ? (
                <a href={content.examGuidelinesHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[#d97706] hover:underline">
                  Official exam guidelines
                </a>
              ) : null}
            </div>
            <div className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-4">
              <Image src={content.certificateSrc || content.badgeSrc} alt={content.certificateTitle || content.badgeAlt} width={640} height={480} className="h-auto w-full rounded-lg object-contain" />
              <p className="mt-3 text-sm font-semibold">{content.certificateTitle}</p>
              <p className="mt-1 text-xs leading-5 text-[#64748b]">Same certificate for live online and in person.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="curriculum" className="scroll-mt-28 border-y border-[#1f2c4a]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Course content" title={`${content.curriculum.length} ${content.curriculum.length === 1 ? "day" : "days"}. ${modules.length} modules.`} copy={content.curriculumLede} />
          <div className="mt-8">
            <Accordion
              items={modules.map((module) => ({
                title: `${module.day} · ${module.title}`,
                body: (
                  <div>
                    {module.objective ? <p className="mb-3">{module.objective}</p> : null}
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {module.topics.map((topic) => (
                        <li key={topic} className="flex gap-2"><span className="text-[#d97706]">•</span>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </div>
          {content.brochureHref ? (
            <a href={content.brochureHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[#d97706] hover:underline">
              Download the full curriculum
            </a>
          ) : null}
        </div>
      </section>

      <section id="dates" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Schedules" title="Choose a live online cohort." copy="Every listed Agile36 class is guaranteed to run. Tuition includes the live training, official courseware, and the exam attempts listed above." />
          <div className="mt-8">
            <CourseScheduleEmbed
              courseSlug={content.slug}
              courseName={content.scheduleCourseName}
              brochureHref={content.brochureHref}
              showSafeBadges
              premium
              initialSchedules={initialSchedules}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#1f2c4a]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Why Agile36" title="What to weigh before you book." />
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#1f2c4a]/10">
            {content.whyRows.map((row) => (
              <div key={row.n} className="grid gap-2 border-b border-[#1f2c4a]/10 px-5 py-4 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <p className="text-sm font-semibold">{row.check}</p>
                <p className="text-sm leading-6 text-[#475569]"><span className="font-semibold text-[#1f2c4a]">{row.usLead}</span> {row.usRest}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trainers" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Trainers" title="SAFe Practice Consultants who still do the work." copy="The instructor for your cohort is listed with the date. These are the people who teach Agile36 classes." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {instructors.map((profile) => (
              <article key={profile.name} className="flex gap-4 rounded-2xl border border-[#1f2c4a]/10 bg-white p-4">
                <Image src={profile.image} alt="" width={72} height={72} className="h-16 w-16 shrink-0 rounded-xl object-cover object-top" />
                <div className="min-w-0">
                  <h3 className="font-semibold">{profile.name}</h3>
                  <p className="mt-0.5 text-xs leading-5 text-[#64748b]">{profile.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#475569]">{profile.bio[0]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {content.careerPath ? (
        <section className="border-y border-[#1f2c4a]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow={isPopm ? "After POPM" : "Next"} title="Related courses" copy={content.careerPath.lede} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.careerPath.next.map((next) => (
                <Link key={next.href} href={next.href} className="rounded-2xl border border-[#1f2c4a]/10 p-5 hover:border-[#d97706]/40">
                  <h3 className="font-semibold">{next.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#64748b]">{next.forWho}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="faqs" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="FAQs" title="Questions people ask before they enroll." />
          <div className="mt-6 flex flex-wrap gap-2">
            {([
              ["generic", "Course"],
              ["exam", "Exam"],
              ["payment", "Payment"],
              ["courses", "Training"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setFaqGroup(id);
                  setOpenFaq(0);
                }}
                className={`min-h-9 cursor-pointer rounded-full px-4 text-sm font-semibold ${faqGroup === id ? "bg-[#1f2c4a] text-white" : "bg-white text-[#64748b] ring-1 ring-[#1f2c4a]/10"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4 divide-y divide-[#1f2c4a]/10 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white">
            {faqItems.map((item, index) => (
              <div key={item.q}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={openFaq === index}>
                  <span className="text-[15px] font-semibold">{item.q}</span>
                  <span className="text-lg text-[#94a3b8]">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index ? <p className="px-5 pb-5 text-sm leading-7 text-[#475569]">{item.a}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 rounded-2xl bg-[#1f2c4a] px-6 py-8 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold">Ready to pick a date?</p>
            <p className="mt-1 text-sm text-white/70">{content.attemptsLine || "Live class. Official courseware. Exam attempts are in the price."}</p>
          </div>
          <a href="#dates" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#d97706] px-5 text-sm font-semibold text-white hover:bg-[#b45309]">
            View schedules
          </a>
        </div>
      </section>

      <CorporateQuoteModal open={showQuote} onClose={() => setShowQuote(false)} courseSlug={content.slug} courseLabel={content.scheduleCourseName} />

      {showAssessment && content.assessmentHref ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2c4a]/70 p-4" role="dialog" aria-modal="true">
          <form onSubmit={submitAssessment} className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold">Start the free {content.crumb} assessment</h2>
              <button type="button" onClick={() => setShowAssessment(false)} className="cursor-pointer text-sm text-[#64748b]" aria-label="Close">Close</button>
            </div>
            <label className="mt-4 block text-sm font-medium">Name
              <input required value={assessment.name} onChange={(event) => setAssessment({ ...assessment, name: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1f2c4a]/15 px-3 py-2" />
            </label>
            <label className="mt-3 block text-sm font-medium">Email
              <input required type="email" value={assessment.email} onChange={(event) => setAssessment({ ...assessment, email: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1f2c4a]/15 px-3 py-2" />
            </label>
            <button type="submit" disabled={sending} className="mt-5 flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#1f2c4a] text-sm font-semibold text-white disabled:opacity-60">
              {sending ? "Starting..." : "Continue"}
            </button>
          </form>
        </div>
      ) : null}
    </main>
  );
}
