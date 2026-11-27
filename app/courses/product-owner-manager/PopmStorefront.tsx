"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import CorporateQuoteModal from "@/app/components/CorporateQuoteModal";
import { usePromoBannerActive } from "@/app/components/PromoBanner";
import TrustedByStrip from "@/app/components/TrustedByStrip";
import CourseScheduleEmbed from "@/app/components/schedule/CourseScheduleEmbed";
import EnrollNowLink from "@/app/components/schedule/EnrollNowLink";
import type { CatalogLandingContent } from "@/app/lib/catalog-landing";
import { CourseMotionStyles, OutcomeChart, SkillGrid, UniversalSkillGrid } from "./PopmCourseLanding";
import { examDetailLines, openingDefinition, policyLines } from "@/app/lib/course-aeo";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";
import { BANNER_DISCOUNT_AMOUNT, isSitePromoActive, PROMO_UNLOCK_EVENT, PROMO_UNLOCK_KEY } from "@/app/lib/site-promo";
import { getFeaturedScheduleInstructorProfiles } from "@/app/lib/schedule-instructors";
import { testimonialsForSlug } from "@/app/lib/site-testimonials";
import {
  formatDateRange,
  formatTimeRange,
  formatTimezoneLabel,
  marketedSeatsLeft,
  type CourseScheduleRow,
} from "@/app/lib/schedule-display";

const NAV = [
  { id: "exam", label: "Exam" },
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills" },
  { id: "roles", label: "PO & PM" },
  { id: "included", label: "Included" },
  { id: "prereqs", label: "Prerequisites" },
  { id: "curriculum", label: "Curriculum" },
  { id: "dates", label: "Schedules" },
  { id: "trainers", label: "Trainers" },
  { id: "faqs", label: "FAQs" },
  { id: "reviews", label: "Testimonials" },
] as const;

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
  ["Receive the credential", "Scaled Agile issues the AI-Empowered certificate and digital badge, plus the free AI-Native upgrade. One year of SAFe Community membership comes with a pass."],
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

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return reduce;
}

function CourseFaq({
  question,
  answer,
  index,
  startOpen,
}: {
  question: string;
  answer: string;
  index: number;
  startOpen: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const [open, setOpen] = useState(startOpen);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(startOpen ? "auto" : 0);

  function toggle() {
    const inner = innerRef.current;
    if (!inner || reduce) {
      setOpen((value) => !value);
      setHeight((value) => (value === 0 ? "auto" : 0));
      return;
    }
    if (open) {
      setHeight(inner.scrollHeight);
      setOpen(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
      return;
    }
    setHeight(inner.scrollHeight);
    setOpen(true);
  }

  return (
    <div className="rounded-xl border border-[#EAEAEA] bg-white">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={toggle}
          className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="text-[15px] font-medium text-[#111111]">{index + 1}. {question}</span>
          <svg
            className="h-5 w-5 shrink-0 text-[#6B6B6B]"
            style={{ transform: open ? "rotate(180deg)" : "none", transition: reduce ? "none" : "transform 250ms ease-out" }}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <div
        style={{
          height: reduce ? (open ? "auto" : 0) : height,
          overflow: "hidden",
          transition: reduce ? "none" : "height 250ms ease-out",
        }}
        onTransitionEnd={() => {
          if (open) setHeight("auto");
        }}
      >
        <div ref={innerRef}>
          <p className="border-t border-[#EAEAEA] px-5 py-4 text-[15px] leading-6 text-[#475569]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function includedCards(content: CatalogLandingContent, popm: boolean): [string, string][] {
  if (popm) {
    return [
      ["16 hours live", "Two instructor-led days."],
      ["16 PDUs and 16 SEUs", "Training hours for PMI and Scrum Alliance. Renewal of the cert is separate: 12 CEUs a year."],
      ["Two exam attempts", "Included, and due within 60 days."],
      ["SAFe Studio", "One year of Community Platform access and official courseware."],
      ["Two credentials", "The AI-Empowered certificate and badge, plus the free AI-Native upgrade, issued after you pass."],
      ["Free practice assessment", "45 questions, same length as the exam window."],
    ];
  }
  const cards: [string, string][] = [[content.durationLabel, "Live instructor-led class. Same official curriculum as a classroom."]];
  const pdus = content.includesLine.match(/(\d+)\s*PDUs?(?:\s*[·&]\s*(\d+)\s*SEUs?)?/i);
  if (pdus) {
    cards.push([
      pdus[2] ? `${pdus[1]} PDUs and ${pdus[2]} SEUs` : `${pdus[1]} PDUs`,
      "Training hours you can report. Renewal of the certification is separate.",
    ]);
  }
  const twoAttempts = /two attempts/i.test(`${content.includesLine} ${content.attemptsLine || ""}`);
  cards.push([
    twoAttempts ? "Two exam attempts" : "Exam attempt",
    content.attemptsLine || "Included with tuition.",
  ]);
  if (/studio/i.test(content.includesLine)) {
    cards.push(["SAFe Studio", "One year of Community Platform access and official courseware."]);
  }
  cards.push([
    "Certificate and badge",
    content.safePartner === false
      ? "Issued after you finish the class."
      : `Scaled Agile issues the ${content.cardTitle} after you pass.`,
  ]);
  if (content.assessmentHref) {
    cards.push([
      "Free practice assessment",
      content.practiceQuestions ? `${content.practiceQuestions}. Use it before the exam.` : "Use it before you sit the exam.",
    ]);
  }
  return cards;
}

function examSitCopy(content: CatalogLandingContent): string {
  const lines = (content.examDetails?.format ?? [])
    .map((line) => `${line.before || ""}${line.highlight}${line.after || ""}`.replace(/\s+/g, " ").trim())
    .filter((line) => /\d|passing|closed book|multiple-choice|no exam/i.test(line));
  if (lines.length) return `${lines.join(" ")}`;
  return content.examNote;
}

function upcomingCohorts(rows: CourseScheduleRow[], limit = 3): CourseScheduleRow[] {
  const today = new Date().toISOString().slice(0, 10);
  return [...rows]
    .filter((row) => (row.start_date || "").slice(0, 10) >= today)
    .sort((a, b) => a.start_date.localeCompare(b.start_date))
    .slice(0, limit);
}

function titleParts(title: string): [string, string | null] {
  const marker = "Certification Training";
  const index = title.lastIndexOf(marker);
  if (index > 0) return [title.slice(0, index).trim(), marker];
  return [title, null];
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8860B]">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#111111] sm:text-[1.375rem]">{title}</h2>
      {copy ? <p className="mt-2 text-sm leading-6 text-[#64748b]">{copy}</p> : null}
    </div>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setOn(true);
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, on };
}

function ModuleFlow({ modules }: { modules: { title: string; day: string }[] }) {
  const { ref, on } = useInView<HTMLDivElement>();
  const days = modules.reduce<{ day: string; items: { title: string; n: number }[] }[]>((groups, module, index) => {
    const last = groups[groups.length - 1];
    const item = { title: module.title, n: index + 1 };
    if (!last || last.day !== module.day) groups.push({ day: module.day, items: [item] });
    else last.items.push(item);
    return groups;
  }, []);
  return (
    <div ref={ref} className="mt-8 overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[#EAEAEA] bg-[#111111] px-5 py-4 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5B942]">Two days, six modules</p>
        <p className="text-sm text-white/70">Live class</p>
      </div>
      <div className={days.length > 1 ? "grid md:grid-cols-2" : "grid"}>
        {days.map((group, dayIndex) => (
          <div key={group.day} className={dayIndex === 0 ? "border-[#EAEAEA] md:border-r" : ""}>
            <div className="flex items-center gap-3 border-b border-[#EAEAEA] bg-[#FFF9EC] px-5 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5B942] text-xs font-bold text-[#111111]">{dayIndex + 1}</span>
              <p className="text-sm font-semibold text-[#111111]">{group.day}</p>
            </div>
            <ol className="px-5 py-5">
              {group.items.map((module, index) => (
                <li key={module.title} className="relative flex gap-3 pb-5 last:pb-0">
                  {index < group.items.length - 1 ? (
                    <span
                      className="absolute left-[15px] top-8 w-0.5 bg-[#F5B942]"
                      style={{
                        height: on ? "calc(100% - 1.25rem)" : "0%",
                        transition: `height 500ms cubic-bezier(.2,.8,.2,1) ${module.n * 80}ms`,
                      }}
                    />
                  ) : null}
                  <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#F5B942] bg-white text-sm font-semibold text-[#111111]">
                    {module.n}
                  </span>
                  <p className="pt-1 text-sm font-medium leading-5 text-[#111111]">{module.title}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamRing() {
  const { ref, on } = useInView<HTMLDivElement>();
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  return (
    <div ref={ref} className="mt-8 grid items-center gap-6 rounded-2xl border border-[#EAEAEA] bg-white p-5 sm:grid-cols-[auto_1fr]">
      <svg viewBox="0 0 140 140" className="mx-auto h-36 w-36" role="img" aria-label="82 percent passing score">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#EAEAEA" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#B8860B"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={on ? circ * (1 - 0.82) : circ}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }}
        />
        <text x="70" y="74" textAnchor="middle" fontSize="22" fontWeight="600" fill="#111111">82%</text>
      </svg>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8860B]">Exam shape</p>
        <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[#111111]">82% to pass</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["45", "questions"],
            ["90", "minutes"],
            ["2", "attempts included"],
          ].map(([value, label], index) => (
            <div key={label}>
              <p className="text-2xl font-semibold leading-none tracking-[-0.03em] text-[#111111]">{value}</p>
              <p className="mt-1 text-xs text-[#6B6B6B]">{label}</p>
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[#EAEAEA]">
                <span
                  className="block h-full rounded-full bg-[#F5B942]"
                  style={{
                    width: on ? "100%" : "0%",
                    transition: `width 800ms cubic-bezier(.2,.8,.2,1) ${index * 120}ms`,
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PayBars({ cards }: { cards: { role: string; pay: string; label: string }[] }) {
  const { ref, on } = useInView<HTMLDivElement>();
  const amounts = cards.map((card) => {
    const nums = [...card.pay.matchAll(/\$?([\d,]+)/g)].map((match) => Number(match[1].replace(/,/g, "")));
    return nums.length ? Math.max(...nums) : 0;
  });
  const max = Math.max(...amounts, 1);
  return (
    <div ref={ref} className="mt-8 space-y-4 rounded-2xl border border-[#EAEAEA] bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8860B]">Pay comparison</p>
      {cards.map((card, index) => (
        <div key={card.role}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold text-[#111111]">{card.role}</p>
            <p className="text-sm font-semibold text-[#111111]">{card.pay}</p>
          </div>
          <p className="text-xs text-[#6B6B6B]">{card.label}</p>
          <span className="mt-2 block h-2 overflow-hidden rounded-full bg-[#EAEAEA]">
            <span
              className="block h-full rounded-full"
              style={{
                width: on ? `${Math.round((amounts[index] / max) * 100)}%` : "0%",
                background: index % 2 === 0 ? "#F5B942" : "#111111",
                transition: `width 900ms cubic-bezier(.2,.8,.2,1) ${index * 120}ms`,
              }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

function CertificatePhoto({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="bg-white shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
    </div>
  );
}

function CredentialCallout({
  empoweredSrc,
  nativeSrc,
  empoweredAlt,
  nativeAlt,
  badgeSrc,
  badgeAlt,
  detail = "Two live days. One online exam. Then a free AI-Native upgrade.",
}: {
  empoweredSrc: string;
  nativeSrc: string;
  empoweredAlt: string;
  nativeAlt: string;
  badgeSrc?: string;
  badgeAlt?: string;
  detail?: string;
}) {
  return (
    <section className="overflow-hidden bg-[#111111] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.7fr)]">
          <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-6xl">
            One course.
            <span className="mt-2 block text-[#F5B942]">Two certifications.</span>
          </h2>
          <p className="max-w-sm text-base leading-7 text-white/80">
            {detail}
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl pb-4">
          <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-0">
            <div className="relative z-[1] sm:-mr-8 sm:translate-y-4 sm:-rotate-6">
              <CertificatePhoto src={empoweredSrc} alt={empoweredAlt} width={1024} height={819} />
            </div>
            <div className="relative z-[1] sm:-ml-8 sm:rotate-3">
              <CertificatePhoto src={nativeSrc} alt={nativeAlt} width={1024} height={771} />
            </div>
          </div>
          {badgeSrc ? (
            <Image
              src={badgeSrc}
              alt={badgeAlt || ""}
              width={300}
              height={371}
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-28 w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] sm:h-40"
            />
          ) : null}
        </div>
      </div>
    </section>
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
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessment, setAssessment] = useState({ name: "", email: "" });
  const [sending, setSending] = useState(false);
  const [faqTab, setFaqTab] = useState<"courses" | "exam" | "payment" | "generic">("courses");
  const reduceMotion = usePrefersReducedMotion();
  const [codeOn, setCodeOn] = useState(false);
  const [countPrice, setCountPrice] = useState<number | null>(null);
  const [showRegisterBar, setShowRegisterBar] = useState(false);
  const [stepsDrawn, setStepsDrawn] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  const unlockLive = useRef(false);
  const cohorts = useMemo(() => upcomingCohorts(initialSchedules), [initialSchedules]);
  const picked = cohorts.find((row) => row.id === pickedId) ?? cohorts[0] ?? null;
  const listPrice = COURSE_HERO_SCHEDULE_LIST_USD[content.slug];
  const price = picked?.price || (listPrice ? String(listPrice.current) : "");
  const original = picked?.original_price || (listPrice ? String(listPrice.original) : "");
  const instructors = useMemo(() => getFeaturedScheduleInstructorProfiles().slice(0, 4), []);
  const faqGroups = [
    ["courses", "Course"],
    ["exam", "Exam"],
    ["payment", "Pricing & Payment"],
    ["generic", "Agile36"],
  ] as const;
  const modules = content.curriculum.flatMap((day) => day.modules.map((module) => ({ ...module, day: day.day })));
  const isPopm = content.slug === "product-owner-manager";
  const isLeadingSafe = content.slug === "leading-safe";
  const isScrumMaster = content.slug === "scrum-master";
  const isRte = content.slug === "release-train-engineer";
  const isLpm = content.slug === "lean-portfolio-management";
  const isSafeForTeams = content.slug === "safe-for-teams";
  const hasDualCert = isPopm || isLeadingSafe || isScrumMaster || isRte || isLpm || isSafeForTeams;
  const promoOn = usePromoBannerActive();
  const courseNavTop = promoOn ? "calc(var(--promo-banner-height, 72px) + 68px)" : 68;
  const pay = PAY[content.slug];
  const pageReviews = testimonialsForSlug(content.slug);
  const nav = NAV.filter((item) => (item.id !== "roles" || isPopm) && (item.id !== "reviews" || pageReviews.length > 0));
  const audience = AUDIENCE_BY_SLUG[content.slug] ?? [];
  const parsedPrice = String(price).replace(/[^0-9.]/g, "");
  const priceAmount = parsedPrice ? Number(parsedPrice) : Number.NaN;
  const codePrice = Number.isFinite(priceAmount) ? Math.max(priceAmount - BANNER_DISCOUNT_AMOUNT, 0) : null;
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStepsDrawn(true);
      return;
    }
    const frame = requestAnimationFrame(() => setStepsDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(PROMO_UNLOCK_KEY) === "1";
    } catch {
      already = false;
    }
    if (already && isSitePromoActive()) setCodeOn(true);
    const onUnlock = () => {
      if (!isSitePromoActive()) return;
      unlockLive.current = true;
      setCodeOn(true);
    };
    window.addEventListener(PROMO_UNLOCK_EVENT, onUnlock);
    return () => window.removeEventListener(PROMO_UNLOCK_EVENT, onUnlock);
  }, []);
  useEffect(() => {
    if (!codeOn || codePrice == null) return;
    if (reduceMotion || !unlockLive.current) {
      setCountPrice(codePrice);
      return;
    }
    const from = priceAmount;
    let frame = 0;
    const delay = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 600);
        const eased = 1 - (1 - t) ** 3;
        setCountPrice(Math.round(from + (codePrice - from) * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, reduceMotion ? 0 : 280);
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, [codeOn, codePrice, priceAmount, reduceMotion]);
  useEffect(() => {
    const node = bookingRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      setShowRegisterBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [cohorts.length]);
  const [titleLead, titleTail] = titleParts(content.title);
  const heroSteps: [string, string][] = [
    ["Take the class", content.durationLabel.split("·")[0].trim()],
    ["Pass the exam", content.safePartner === false ? "Finish the live class" : (content.attemptsLine || "Exam included").replace(/\.$/, "")],
    ["Get certified", content.cardTitle],
  ];
  const heroChecks = [
    content.attemptsLine?.replace(/\.$/, "") || null,
    content.includesLine.match(/\d+\s*PDUs?(?:\s*[·&]\s*\d+\s*SEUs?)?/i)?.[0] || null,
    content.safePartner === false ? null : "Authorized by Scaled Agile, Inc.",
  ].filter((item): item is string => Boolean(item));
  const examSteps: [string, string][] = isPopm
    ? EXAM_STEPS
    : [
        ["Attend the class", `Completing this ${content.crumb} class is what makes you eligible for the exam.`],
        ["Get the exam link", content.safePartner === false ? "You get access after the class. The exam is not sold on its own." : "Scaled Agile emails access after the class. You cannot buy the exam on its own."],
        ["Sit the exam", examSitCopy(content)],
        ["Use the included attempts", content.attemptsLine || content.includesLine],
        ["Receive the credential", content.safePartner === false ? "You receive the credential after you finish the class." : `Scaled Agile issues the ${content.cardTitle} and digital badge after you pass. It does not say the class was virtual.`],
      ];
  const overviewItems: { title: string; body: ReactNode }[] = [
    {
      title: isPopm ? "What is SAFe POPM certification training?" : `What is ${content.crumb} training?`,
      body: content.lede.split(/\n\s*\n/).map((paragraph) => <p key={paragraph} className="mb-3 last:mb-0">{paragraph}</p>),
    },
    {
      title: isPopm ? "Why take POPM?" : `Why ${content.crumb.replace(/®/g, "")}?`,
      body: isPopm
        ? "The credential shows you can do the product roles on an Agile Release Train: the backlog, PI Planning, and how features become stories. Completing this authorized class is what makes you eligible for the exam."
        : content.summary || content.outcomes.slice(0, 2).join(" ") || content.includesLine,
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
            <li key={item} className="flex gap-2"><span className="text-[#B8860B]">•</span>{item}</li>
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
  ];
  const bookingCard = (
    <div className="rounded-2xl border border-[#EAEAEA] bg-white p-5 text-[#111111]">
      <p className="text-sm font-semibold">Pick your class date</p>
      {cohorts.length ? (
        <div className="mt-4 space-y-2">
          {cohorts.map((row) => {
            const selected = picked?.id === row.id;
            const remaining = marketedSeatsLeft(row);
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => setPickedId(row.id)}
                className={`flex w-full cursor-pointer items-start gap-3 rounded-xl border-2 px-3 py-3 text-left transition-[border-color,background-color] duration-200 ease-out ${selected ? "border-[#B8860B] bg-[#FFF9EC]" : "border-[#EAEAEA] bg-white hover:border-[#6B6B6B]"}`}
              >
                <span className={`mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#111111]" : "border-[#6B6B6B]"}`}>
                  <span className={`h-2 w-2 rounded-full bg-[#111111] ${reduceMotion ? "" : "transition-transform duration-200 ease-out"} ${selected ? "scale-100" : "scale-0"}`} />
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold">{formatDateRange(row.start_date, row.end_date, row.timezone)}</span>
                    {remaining != null ? (
                      <span className={`text-[11px] font-semibold text-[#B8860B] ${remaining <= 5 ? "course-seat-pulse" : ""}`}>{remaining} left</span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-5 text-[#6B6B6B]">
                    {[formatTimeRange(row.start_time, row.end_time), formatTimezoneLabel(row.timezone), row.instructor_name].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">Dates are listed below. Every cohort on this page is guaranteed to run.</p>
      )}
      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6B6B]">USD</p>
          {codeOn && codePrice != null ? (
            <p className={`relative text-lg font-semibold leading-none text-[#6B6B6B]`}>
              {money(price)}
              <span className={`absolute left-0 top-1/2 h-px w-full origin-left bg-[#111111] ${unlockLive.current ? "course-price-strike" : "scale-x-100"}`} />
            </p>
          ) : null}
          <p className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-[#111111]">
            {codeOn && codePrice != null ? money(countPrice ?? priceAmount) : price ? money(price) : "—"}
          </p>
          {original && !codeOn ? <p className="text-sm text-[#6B6B6B] line-through">{money(original)}</p> : null}
        </div>
        {codeOn ? <p className="mt-1 text-[12px] font-semibold text-[#B8860B]">with code</p> : null}
      </div>
      <p className="mt-2 text-[13px] leading-5 text-[#6B6B6B]">{content.includesLine}</p>
      {picked ? (
        <EnrollNowLink
          courseSlug={content.slug}
          scheduleId={picked.id}
          quantity={1}
          label="Register"
          className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-[#F5B942] text-sm font-bold text-[#111111] hover:bg-[#e0a82e]"
        />
      ) : (
        <a href="#dates" className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-[#F5B942] text-sm font-bold text-[#111111] hover:bg-[#e0a82e]">
          Register
        </a>
      )}
      <a href="#dates" className="mt-3 block text-center text-sm font-semibold text-[#B8860B] underline-offset-2 hover:underline">
        See all class dates
      </a>
      <p className="mt-3 text-center text-[12px] leading-5 text-[#6B6B6B]">Free reschedule at least 24 hours before class. Full refund 30 or more days before the start.</p>
      <button type="button" onClick={() => setShowQuote(true)} className="mt-3 block w-full cursor-pointer text-center text-[13px] text-[#6B6B6B]">
        Paying through your employer? <span className="font-semibold text-[#B8860B]">Get a quote</span>
      </button>
    </div>
  );
  const included = includedCards(content, isPopm);
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
    <main className="bg-[#f6f8fb] text-[#111111]">
      <style>{`
        @keyframes courseSeatPulse { 0%, 100% { opacity: 1; } 45% { opacity: 0.35; } }
        @keyframes coursePriceStrike { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (prefers-reduced-motion: no-preference) {
          .course-price-strike { transform: scaleX(0); animation: coursePriceStrike 280ms ease-out forwards; }
          .course-seat-pulse { animation: courseSeatPulse 600ms ease-out 1; }
        }
      `}</style>
      <section className="border-b border-[#EAEAEA] bg-[#FFFFFF] text-[#111111]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:px-8 lg:py-14">
          <div>
            <nav className="flex flex-wrap items-center gap-2 text-xs text-[#6B6B6B]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#111111]">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-[#111111]">Courses</Link>
              <span>/</span>
              <span className="text-[#111111]">{content.crumb}</span>
            </nav>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8860B]">{content.eyebrow || "SAFe® certification · Live online"}</p>
            <h1 className="mt-3 max-w-xl text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#111111] sm:text-[2rem]">
              {titleLead}
              {titleTail ? <span className="text-[#B8860B]"> {titleTail}</span> : null}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#6B6B6B]">{openingDefinition(content)}</p>
            {content.lastUpdated ? <p className="mt-2 text-xs text-[#6B6B6B]">Last updated: {new Date(`${content.lastUpdated.slice(0, 10)}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p> : null}
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroSteps.map(([label, detail], index) => (
                <li key={label} className="relative pt-3">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left bg-[#B8860B]"
                    style={{
                      transform: reduceMotion || stepsDrawn ? "scaleX(1)" : "scaleX(0)",
                      transition: reduceMotion ? "none" : `transform 450ms ease-out ${index * 150}ms`,
                    }}
                  />
                  <p className="text-sm font-semibold text-[#111111]">{index + 1} · {label}</p>
                  <p className="mt-1 text-[13px] leading-5 text-[#6B6B6B]">{detail}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden>
                {["image 120.png", "image 137.png", "image 247.png", "image 476.png"].map((name) => (
                  <Image
                    key={name}
                    src={`/Images/${encodeURIComponent(name)}`}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border-2 border-white object-cover ring-1 ring-[#EAEAEA]"
                  />
                ))}
              </div>
              <div>
                <p className="text-lg font-semibold leading-none tracking-[-0.03em] text-[#111111]">50,000+</p>
                <p className="mt-1 text-xs leading-4 text-[#6B6B6B]">Enrolled</p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <span className="inline-flex h-11 items-center gap-1.5 rounded-md border border-[#EAEAEA] bg-white px-2.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09A6.97 6.97 0 015.5 12c0-.72.12-1.43.34-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm font-medium text-[#111111]">Google</span>
                </span>
                <p className="mt-3 flex items-center gap-1.5 text-2xl font-semibold leading-none tracking-[-0.03em] text-[#111111]">
                  4.9
                  <span className="text-base tracking-tight text-[#F5B942]" aria-hidden>★★★★★</span>
                </p>
                <p className="mt-1 text-xs leading-4 text-[#6B6B6B]">Google reviews</p>
              </div>
              {content.safePartner === false ? null : (
                <div>
                  <Image src="/Silver.png" alt="Scaled Agile Silver Partner" width={44} height={44} className="h-11 w-11 object-contain" />
                  <p className="mt-3 text-2xl font-semibold leading-none tracking-[-0.03em] text-[#111111]">4.9/5</p>
                  <p className="mt-1 text-xs leading-4 text-[#6B6B6B]">Scaled Agile feedback rating</p>
                </div>
              )}
              <div>
                <div className="hidden h-11 sm:block" aria-hidden />
                <p className="text-2xl font-semibold leading-none tracking-[-0.03em] text-[#111111] sm:mt-3">50,000+</p>
                <p className="mt-1 text-xs leading-4 text-[#6B6B6B]">professionals trained</p>
              </div>
            </div>
            {heroChecks.length ? (
              <ul className="mt-4 space-y-1.5">
                {heroChecks.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-5 text-[#111111]">
                    <span className="text-[#B8860B]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {content.brochureHref ? (
              <a
                href={content.brochureHref}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#111111] px-4 text-sm font-semibold text-[#111111] hover:bg-[#111111] hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download brochure
              </a>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div ref={bookingRef}>{bookingCard}</div>
          </aside>
        </div>
      </section>

      <TrustedByStrip />

      {isPopm ? (
        <CredentialCallout
          empoweredSrc="/popm-cert-ai-empowered.jpg"
          nativeSrc="/popm-cert-ai-native.jpg"
          empoweredAlt="Sample Scaled Agile certificate for Certified AI-Empowered SAFe 6 Product Owner/Product Manager"
          nativeAlt="Sample Scaled Agile certificate for Certified AI-Native SAFe Product Owner/Product Manager"
          badgeSrc="/popm-badge-ai-native.png"
          badgeAlt="POPM AI-Native SAFe badge"
        />
      ) : null}
      {isLeadingSafe ? (
        <CredentialCallout
          empoweredSrc="/leading-safe-cert-ai-empowered.jpg"
          nativeSrc="/leading-safe-cert-ai-native.png"
          empoweredAlt="Sample Scaled Agile certificate for Certified AI-Empowered SAFe 6 Agilist"
          nativeAlt="Sample Scaled Agile certificate for Certified AI-Native SAFe Agilist"
        />
      ) : null}
      {isScrumMaster ? (
        <CredentialCallout
          empoweredSrc="/scrum-master-cert-ai-empowered.jpg"
          nativeSrc="/scrum-master-cert-ai-native.png"
          empoweredAlt="Sample Scaled Agile certificate for Certified AI-Empowered SAFe 6 Scrum Master"
          nativeAlt="Sample Scaled Agile certificate for Certified AI-Native SAFe Scrum Master"
        />
      ) : null}
      {isRte ? (
        <CredentialCallout
          empoweredSrc="/rte-cert-ai-empowered.png"
          nativeSrc="/rte-cert-ai-native.png"
          empoweredAlt="Sample Scaled Agile certificate for Certified AI-Empowered SAFe 6 Release Train Engineer"
          nativeAlt="Sample Scaled Agile certificate for Certified AI-Native SAFe Release Train Engineer"
          detail="Three live days. One online exam. Then a free AI-Native upgrade."
        />
      ) : null}
      {isLpm ? (
        <CredentialCallout
          empoweredSrc="/lpm-cert-safe6.png"
          nativeSrc="/lpm-cert-ai-native.png"
          empoweredAlt="Sample Scaled Agile certificate for Certified SAFe 6 Lean Portfolio Manager"
          nativeAlt="Sample Scaled Agile certificate for Certified AI-Native SAFe Lean Portfolio Manager"
        />
      ) : null}
      {isSafeForTeams ? (
        <CredentialCallout
          empoweredSrc="/spt-cert-safe6.png"
          nativeSrc="/spt-cert-ai-native.jpg"
          empoweredAlt="Sample Scaled Agile certificate for Certified SAFe 6 Practitioner"
          nativeAlt="Sample Scaled Agile certificate for Certified AI-Native SAFe 6 Practitioner"
        />
      ) : null}

      <section id="exam" className="scroll-mt-48 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Exam format" title={isPopm ? "Class first. Then the exam. Then the badge." : `Steps to earn the ${content.cardTitle}.`} copy={content.examNote} />
          <ExamRing />
          <div className={`mt-8 grid gap-8 lg:items-start ${hasDualCert ? "" : "lg:grid-cols-[1fr_18rem]"}`}>
            <div>
              <ol className="space-y-3">
                {examSteps.map(([title, copy], index) => (
                  <li key={title} className="flex gap-4 rounded-xl border border-[#EAEAEA] bg-white p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111111] text-sm font-semibold text-white">{index + 1}</span>
                    <div>
                      <p className="font-semibold text-[#111111]">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#64748b]">{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {content.examDetails?.format?.length ? (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {content.examDetails.format.map((line) => (
                    <p key={`${line.highlight}${line.after || ""}`} className="rounded-xl border border-[#EAEAEA] bg-white px-4 py-3 text-sm text-[#475569]">
                      {line.before}<strong className="font-semibold text-[#111111]">{line.highlight}</strong>{line.after}
                    </p>
                  ))}
                </div>
              ) : null}
              {content.examGuidelinesHref ? (
                <a href={content.examGuidelinesHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[#B8860B] hover:underline">
                  Official exam guidelines
                </a>
              ) : null}
            </div>
            {hasDualCert ? null : (
              <div className="rounded-2xl border border-[#EAEAEA] bg-white p-4">
                <Image src={content.certificateSrc || content.badgeSrc} alt={content.certificateTitle || content.badgeAlt} width={640} height={480} className="h-auto w-full rounded-lg object-contain" />
                <p className="mt-3 text-sm font-semibold">{content.certificateTitle}</p>
                <p className="mt-1 text-xs leading-5 text-[#64748b]">Same certificate for live online and in person.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <nav className="sticky z-40 border-b border-[#EAEAEA] bg-white shadow-[0_1px_0_rgba(17,17,17,0.04)]" style={{ top: courseNavTop }} aria-label="On this page">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:px-6">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 border-b-2 px-3 py-3.5 text-sm font-semibold ${active === item.id ? "border-[#B8860B] text-[#111111]" : "border-transparent text-[#94a3b8] hover:text-[#475569]"}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
      <div className="min-w-0 [&>section]:border-b [&>section]:border-[#EAEAEA] [&>section:nth-child(odd)]:bg-white [&>section:nth-child(even)]:bg-[#FFF9EC]">

      <section id="overview" className="scroll-mt-48 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Overview" title={isPopm ? "What this POPM class covers" : content.summaryTitle || `What this ${content.crumb} class covers`} copy={content.summary || content.lede.split(/\n\s*\n/)[0]} />
          <div className="mt-8">
            <div className="space-y-8">
              {overviewItems.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#111111]">{item.title}</h3>
                  <div className="mt-2 text-[15px] leading-6 text-[#475569]">{item.body}</div>
                </div>
              ))}
            </div>
            <ModuleFlow modules={modules} />
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-48 border-y border-[#111111]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <CourseMotionStyles />
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Skills you will build"
            title={isPopm ? "Not just a certificate. A working product operating system." : `What you practice in ${content.crumb}.`}
            copy={isPopm ? "The class follows the real flow of product work, from hearing the customer to helping teams deliver and learn." : content.outcomes.slice(0, 2).join(" ")}
          />
          <div className="mt-8">
            <OutcomeChart outcomes={content.outcomes} courseName={content.crumb} />
          </div>
          {isPopm ? <SkillGrid /> : <UniversalSkillGrid content={content} />}
        </div>
      </section>

      {isPopm ? <section id="roles" className="scroll-mt-48 border-y border-[#111111]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Two roles"
            title="Product Owner and Product Manager are not the same job"
          />
          <p className="mt-2 max-w-3xl text-[15px] leading-6 text-[#6B6B6B]">SAFe splits them on purpose. You practice both, and the handoff between them.</p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#EAEAEA]">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]">
              <caption className="sr-only">How the Product Owner and Product Manager split the work on an Agile Release Train</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-5 py-3"> </th>
                  <th scope="col" className="border-b-2 border-[#B8860B] px-5 py-3 text-[16px] font-bold text-[#111111]">Product Owner</th>
                  <th scope="col" className="border-b-2 border-[#B8860B] px-5 py-3 text-[16px] font-bold text-[#111111]">Product Manager</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Seat", "The team backlog", "The ART backlog"],
                  ["Owns", "The team backlog, and the stories in it", "Vision, roadmap, and features"],
                  ["Breaks the work down", "Splits features into stories with acceptance criteria", "Prioritizes with value, time, risk, and job size"],
                  ["In the room", "Joins planning, refinement, review, and the retrospective", "Presents the vision in PI Planning"],
                  ["Customer", "Brings customer feedback into the next slice", "Works with stakeholders on what the train builds next"],
                ].map(([label, owner, manager]) => (
                  <tr key={label} className="border-b border-[#EAEAEA] last:border-b-0">
                    <th scope="row" className="px-5 py-4 align-top text-[15px] font-semibold text-[#111111]">{label}</th>
                    <td className="px-5 py-4 align-top text-[15px] leading-6 text-[#374151]">{owner}</td>
                    <td className="px-5 py-4 align-top text-[15px] leading-6 text-[#374151]">{manager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-xl bg-[#111111] px-5 py-4 text-sm leading-6 text-white/80">
            The Product Manager names the feature. The Product Owner breaks it into stories and stays with the team until it ships. PI Planning is where those two views have to agree.
          </p>
        </div>
      </section> : null}

      {pay ? (
      <section className="border-b border-[#111111]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Pay" title={pay.title} copy={pay.copy} />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pay.cards.map((card) => (
              <article key={card.role} className="rounded-2xl border border-[#111111]/10 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B8860B]">{card.role}</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">{card.pay}</p>
                <p className="mt-1 text-sm font-medium text-[#111111]">{card.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">{card.note}</p>
              </article>
            ))}
          </div>
          <PayBars cards={pay.cards} />
          {pay.extra ? <p className="mt-4 max-w-3xl text-sm leading-6 text-[#64748b]">{pay.extra}</p> : null}
          <a href={pay.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-[#B8860B] hover:underline">
            {pay.source}
          </a>
        </div>
      </section>
      ) : null}

      <section id="included" className="scroll-mt-48 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Included with tuition" title="The class, the attempts, and the membership are in the price." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(([title, copy]) => (
              <article key={title} className="rounded-2xl border border-[#111111]/10 bg-white p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="prereqs" className="scroll-mt-48 border-y border-[#111111]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Who attends" title={isPopm ? "People who sit near a backlog, a customer, or a train." : `Who usually attends ${content.crumb}.`} />
            <div className="mt-6 flex flex-wrap gap-2">
              {audience.map((role) => (
                <span key={role} className="rounded-full border border-[#111111]/10 bg-[#f6f8fb] px-3 py-1.5 text-sm font-medium text-[#111111]">{role}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#B8860B]/30 bg-[#fff7ed] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B8860B]">Prerequisites and eligibility</p>
            <h3 className="mt-2 text-xl font-semibold text-[#111111]">{/no formal prerequisites/i.test(content.examDetails?.prerequisites || "") || isPopm ? "No prior certification is required." : "What you should already know."}</h3>
            <p className="mt-3 text-sm leading-7 text-[#475569]">
              {content.examDetails?.prerequisites || "There are no formal prerequisites. Agile or Scrum experience, and time with a backlog, makes the class easier to use. It is not required to enroll."}
            </p>
          </div>
        </div>
      </section>

      {content.assessmentHref ? (
        <section className="scroll-mt-48 !border-[#111111] !bg-[#111111] px-4 py-14 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5B942]">Unsure about your prep?</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {content.practiceTestTitle || "Practice test"}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
              {["Score when you finish", "See what you missed", content.practiceQuestions || "45 questions", "90 minutes"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-[#F5B942]" aria-hidden>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-[#EAEAEA] bg-white p-5 text-[#111111] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
              <div>
                <span className="inline-flex rounded-full bg-[#F5B942] px-3 py-1 text-xs font-bold text-[#111111]">1 practice test</span>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em] sm:text-xl">{content.examName || content.practiceTestTitle}</p>
                <p className="mt-2 text-sm text-[#6B6B6B]">{content.practiceQuestions || "45 questions"} · 90 minutes · Free</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAssessment(true)}
                className="mt-5 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-lg bg-[#F5B942] px-6 text-sm font-bold text-[#111111] hover:bg-[#e0a82e] sm:mt-0"
              >
                Start test
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <section id="curriculum" className="scroll-mt-48 border-y border-[#111111]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-sm text-[#6B6B6B]">Course curriculum</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#111111] sm:text-3xl">
                {content.title.replace(/Training$/, "Course Content")}
              </h2>
              {content.curriculumLede ? <p className="mt-3 text-sm leading-6 text-[#64748b]">{content.curriculumLede}</p> : null}
            </div>
            {content.brochureHref ? (
              <a href={content.brochureHref} download target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-[#B8860B] px-4 text-sm font-semibold text-[#B8860B] hover:bg-[#FFF9EC]">
                Download Curriculum
              </a>
            ) : null}
          </div>
          <div className="mt-6 space-y-3">
            {modules.map((module, index) => (
              <details key={`${module.day}-${module.title}`} className="group rounded-xl border border-[#EAEAEA] bg-white">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[15px] font-medium text-[#111111]">Lesson {index + 1}: {module.title}</h3>
                  <svg className="h-5 w-5 shrink-0 text-[#6B6B6B] transition duration-[250ms] ease-out group-open:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="border-t border-[#EAEAEA] px-5 py-4 text-[15px] leading-6 text-[#111111]">
                  <ul className="list-disc space-y-2 pl-5">
                    {module.topics.map((topic) => {
                      const [lead, detail] = topic.split(" — ");
                      return (
                        <li key={topic}>
                          {lead}
                          {detail ? (
                            <ul className="mt-2 list-[circle] space-y-1 pl-5 text-[#475569]">
                              <li>{detail}</li>
                            </ul>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="dates" className="scroll-mt-48 px-4 py-14 sm:px-6 lg:px-8">
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

      <section className="!border-[#EAEAEA] !bg-[#FFF9EC] px-4 py-10 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-6xl text-2xl font-semibold tracking-[-0.03em] text-[#111111] sm:text-3xl">
          Want to Train Your Team?{" "}
          <button type="button" onClick={() => setShowQuote(true)} className="cursor-pointer text-[#B8860B] underline decoration-[#B8860B] underline-offset-4 hover:text-[#111111]">
            Get a Quote
          </button>
        </p>
      </section>

      <section className="border-y border-[#111111]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Why Agile36" title="What to weigh before you book." />
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#111111]/10">
            {content.whyRows.map((row) => (
              <div key={row.n} className="grid gap-2 border-b border-[#111111]/10 px-5 py-4 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <p className="text-sm font-semibold">{row.check}</p>
                <p className="text-sm leading-6 text-[#475569]"><span className="font-semibold text-[#111111]">{row.usLead}</span> {row.usRest}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trainers" className="scroll-mt-48 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Trainers" title="SAFe Practice Consultants who still do the work." copy="The instructor for your cohort is listed with the date. These are the people who teach Agile36 classes." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {instructors.map((profile) => (
              <article key={profile.name} className="flex gap-4 rounded-2xl border border-[#111111]/10 bg-white p-4">
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
        <section className="border-y border-[#111111]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow={isPopm ? "After POPM" : "Next"} title="Related courses" copy={content.careerPath.lede} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.careerPath.next.map((next) => (
                <Link key={next.href} href={next.href} className="rounded-2xl border border-[#111111]/10 p-5 hover:border-[#B8860B]/40">
                  <h3 className="font-semibold">{next.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#64748b]">{next.forWho}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="faqs" className="scroll-mt-48 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-[#6B6B6B]">{isPopm ? "AI-Empowered SAFe POPM Course FAQs" : `${content.crumb} FAQs`}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#111111] sm:text-3xl">{isPopm ? "Frequently Asked Questions on SAFe POPM Certification" : `Frequently asked questions on ${content.crumb}`}</h2>
          <div className="mt-6 inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-[#EAEAEA] p-1" role="tablist">
            {faqGroups.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={faqTab === id}
                onClick={() => setFaqTab(id)}
                className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold ${faqTab === id ? "bg-[#FFF6E0] text-[#111111]" : "text-[#111111] hover:bg-[#FFF9EC]"}`}
              >
                FAQ {label === "Pricing & Payment" ? "Payment" : label === "Agile36" ? "Generic" : label}
              </button>
            ))}
          </div>
          {faqGroups.map(([id]) => {
            const items = content.faqs[id] ?? [];
            if (!items.length) return null;
            return (
              <div key={id} className={faqTab === id ? "mt-5 space-y-3" : "hidden"}>
                {items.map((item, index) => (
                  <CourseFaq key={item.q} question={item.q} answer={item.a} index={index} startOpen={index === 0} />
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {pageReviews.length ? (
        <section id="reviews" className="scroll-mt-48 border-y border-[#111111]/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Testimonials" title="What people wrote after class." />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {pageReviews.map((review) => (
                <figure key={review.id} className="rounded-2xl border border-[#111111]/10 p-5">
                  <div className="flex items-center gap-3">
                    <Image src={review.avatar} alt="" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
                    <figcaption>
                      <p className="text-sm font-semibold text-[#111111]">{review.name}</p>
                      <p className="text-xs text-[#64748b]">{review.title}</p>
                      <p className="mt-1 text-xs tracking-tight text-[#F5B942]" aria-label={`${review.rating} out of 5`}>★★★★★</p>
                    </figcaption>
                  </div>
                  <blockquote className="mt-4 text-sm leading-7 text-[#475569]">“{review.review}”</blockquote>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="exam-details" className="scroll-mt-48 border-y border-[#111111]/10 bg-[#f6f8fb] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Exam details" title="The exam in plain text." />
            <dl className="mt-6 space-y-3">
              {examDetailLines(content).map((line) => (
                <div key={line.label}>
                  <dt className="text-sm font-semibold text-[#111111]">{line.label}</dt>
                  <dd className="text-[15px] leading-6 text-[#475569]">{line.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionTitle eyebrow="Policies" title="Refund, reschedule, and whether the class runs." />
            <dl className="mt-6 space-y-4">
              {policyLines(content).map((line) => (
                <div key={line.label}>
                  <dt className="text-sm font-semibold text-[#111111]">{line.label}</dt>
                  <dd className="text-[15px] leading-6 text-[#475569]">{line.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 rounded-2xl bg-[#111111] px-6 py-8 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold">Ready to pick a date?</p>
            <p className="mt-1 text-sm text-white/70">{content.attemptsLine || "Live class. Official courseware. Exam attempts are in the price."}</p>
          </div>
          <a href="#dates" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#F5B942] px-5 text-sm font-semibold text-[#111111] hover:bg-[#e0a82e]">
            View schedules
          </a>
        </div>
      </section>

      </div>
      </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#EAEAEA] bg-white px-4 py-3 md:hidden ${reduceMotion ? "" : "transition-transform duration-300 ease-out"} ${showRegisterBar ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#111111]">
              {picked ? formatDateRange(picked.start_date, picked.end_date, picked.timezone) : "Pick a class date"}
            </p>
            <p className="text-sm text-[#111111]">
              ${codeOn && codePrice != null ? money(countPrice ?? codePrice) : price ? money(price) : "—"}
              {codeOn ? <span className="ml-2 text-[12px] font-semibold text-[#B8860B]">with code</span> : null}
            </p>
          </div>
          {picked ? (
            <EnrollNowLink
              courseSlug={content.slug}
              scheduleId={picked.id}
              quantity={1}
              label="Register"
              className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-[#F5B942] px-4 text-sm font-bold text-[#111111]"
            />
          ) : (
            <a href="#dates" className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-[#F5B942] px-4 text-sm font-bold text-[#111111]">
              Register
            </a>
          )}
        </div>
      </div>

      <CorporateQuoteModal open={showQuote} onClose={() => setShowQuote(false)} courseSlug={content.slug} courseLabel={content.scheduleCourseName} />

      {showAssessment && content.assessmentHref ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/70 p-4" role="dialog" aria-modal="true">
          <form onSubmit={submitAssessment} className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold">Start the free {content.crumb} assessment</h2>
              <button type="button" onClick={() => setShowAssessment(false)} className="cursor-pointer text-sm text-[#64748b]" aria-label="Close">Close</button>
            </div>
            <label className="mt-4 block text-sm font-medium">Name
              <input required value={assessment.name} onChange={(event) => setAssessment({ ...assessment, name: event.target.value })} className="mt-1 w-full rounded-lg border border-[#111111]/15 px-3 py-2" />
            </label>
            <label className="mt-3 block text-sm font-medium">Email
              <input required type="email" value={assessment.email} onChange={(event) => setAssessment({ ...assessment, email: event.target.value })} className="mt-1 w-full rounded-lg border border-[#111111]/15 px-3 py-2" />
            </label>
            <button type="submit" disabled={sending} className="mt-5 flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#111111] text-sm font-semibold text-white disabled:opacity-60">
              {sending ? "Starting..." : "Continue"}
            </button>
          </form>
        </div>
      ) : null}
    </main>
  );
}
