"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import CorporateQuoteModal from "@/app/components/CorporateQuoteModal";
import TrustedByStrip from "@/app/components/TrustedByStrip";
import CourseScheduleEmbed from "@/app/components/schedule/CourseScheduleEmbed";
import type { CatalogLandingContent, FaqItem } from "@/app/lib/catalog-landing";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";
import { getFeaturedScheduleInstructorProfiles } from "@/app/lib/schedule-instructors";
import type { CourseScheduleRow } from "@/app/lib/schedule-display";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills" },
  { id: "instructors", label: "Instructors" },
  { id: "dates", label: "Dates & tuition" },
  { id: "curriculum", label: "Curriculum" },
  { id: "certification", label: "Certification" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
] as const;

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
  </svg>
);

function useMotionOnView<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);
  return { observe: setNode, active };
}

function Icon({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "amber" | "navy" | "green";
}) {
  const tones = {
    amber: "bg-[#fff7ed] text-[#d97706] ring-[#d97706]/15",
    navy: "bg-[#eef3f8] text-[#1f2c4a] ring-[#1f2c4a]/10",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-700/10",
  };
  return (
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function compactText(value: string, max = 30): string {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trim()}…` : clean;
}

function courseModules(content: CatalogLandingContent) {
  return content.curriculum.flatMap((day) => day.modules);
}

function firstParagraph(value: string): string {
  return value.split(/\n\s*\n/)[0]?.trim() || value.trim();
}

function FlowCanvas({ content }: { content: CatalogLandingContent }) {
  const modules = courseModules(content);
  const fallbackStages = ["Learn", "Practice", "Apply", "Validate"];
  const stages = Array.from({ length: 4 }, (_, index) => {
    const courseModule = modules[index];
    return {
      label: compactText(courseModule?.title || fallbackStages[index] || "Apply", 18),
      sub: compactText(courseModule?.topics[0] || content.outcomes[index] || "Live workshop", 22),
      value: `0${index + 1}`,
    };
  });

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#1f2c4a]/10 bg-white p-5 shadow-[0_30px_80px_-45px_rgba(31,44,74,.45)] sm:p-7">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#1f2c4a]" />
      <div className="grid items-center gap-5 sm:grid-cols-[7.5rem_1fr]">
        <div className="relative mx-auto">
          <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-[#22c1c3]/20 to-[#1f2c4a]/10 blur-xl" />
          <Image
            src={content.badgeSrc}
            alt={content.badgeAlt}
            width={140}
            height={140}
            priority
            className="relative h-[7.5rem] w-[7.5rem] rounded-[1.5rem] border border-[#1f2c4a]/10 bg-white object-contain p-2 shadow-lg"
          />
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">Official credential</p>
            <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Value flow live
            </span>
          </div>
          <p className="mt-2 text-xl font-normal tracking-[-0.03em] text-[#1f2c4a]">{content.cardTitle}</p>
          <p className="mt-1 text-[13px] leading-5 text-[#64748b]">
            {compactText(content.outcomes[0] || firstParagraph(content.lede), 105)}
          </p>
        </div>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-4 sm:gap-2">
        <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-[#1f2c4a]/10 sm:block" />
        <div className="popm-flow-runner pointer-events-none absolute top-[25px] hidden h-1.5 w-1.5 rounded-full bg-[#d97706] shadow-[0_0_0_5px_rgba(217,119,6,.13)] sm:block" />
        {stages.map((stage, index) => (
          <div
            key={stage.label}
            className="popm-flow-card relative rounded-xl border border-[#1f2c4a]/10 bg-[#f8fafc] p-3"
            style={{ animationDelay: `${index * 240}ms` }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1f2c4a] text-[10px] font-semibold text-white">
              {stage.value}
            </span>
            <p className="mt-4 text-[13px] font-semibold text-[#1f2c4a]">{stage.label}</p>
            <p className="mt-0.5 text-[11px] text-[#64748b]">{stage.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4 rounded-2xl bg-[#1f2c4a] p-4 text-white">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">Learning progress</p>
          <div className="mt-3 space-y-2">
            {[86, 69, 54].map((width, index) => (
              <div key={width} className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <span
                  className="popm-bar block h-full rounded-full bg-gradient-to-r from-[#d97706] to-[#fbbf24]"
                  style={{ "--bar-width": `${width}%`, animationDelay: `${500 + index * 180}ms` } as CSSProperties}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-medium tracking-[-0.05em]">Ready</p>
          <p className="mt-1 text-[11px] text-white/55">Learn → practice → apply</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d97706]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-normal leading-[1.08] tracking-[-0.04em] text-[#1f2c4a] sm:text-[2.65rem]">
        {title}
      </h2>
      {copy ? <p className="mt-5 text-base leading-7 text-[#64748b] sm:text-lg">{copy}</p> : null}
    </div>
  );
}

function OutcomeChart({
  outcomes,
  courseName,
}: {
  outcomes: string[];
  courseName: string;
}) {
  const { observe, active } = useMotionOnView<HTMLDivElement>();
  const shapes = [
    "M20 126 C85 120,95 85,153 88 S232 44,302 54 S373 20,440 25",
    "M20 132 C84 128,112 116,160 113 S245 97,302 87 S383 75,440 64",
  ];
  return (
    <div
      ref={observe}
      className={`relative overflow-hidden rounded-[1.75rem] bg-[#1f2c4a] p-6 text-white sm:p-8 ${active ? "popm-motion-on" : ""}`}
    >
      <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#d97706]/15 blur-3xl" />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fbbf24]">Capability impact map</p>
        <h3 className="mt-3 max-w-xl text-2xl font-normal tracking-[-0.03em] sm:text-3xl">
          Turn {compactText(courseName, 42)} concepts into capability you can use.
        </h3>
        <svg className="mt-6 h-40 w-full overflow-visible" viewBox="0 0 460 150" role="img" aria-label="Animated learning and capability lines trending upward">
          {[0, 1, 2, 3].map((line) => (
            <line key={line} x1="20" x2="440" y1={35 + line * 30} y2={35 + line * 30} stroke="rgba(255,255,255,.08)" />
          ))}
          <path className="popm-chart-line popm-chart-line-muted" d={shapes[1]} fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
          <path className="popm-chart-line" d={shapes[0]} fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <circle className="popm-chart-dot" cx="440" cy="25" r="5" fill="#fbbf24" />
        </svg>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {outcomes.map((outcome, index) => (
            <div key={outcome} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-3.5">
              <span className="text-xs font-semibold text-[#fbbf24]">0{index + 1}</span>
              <p className="text-[13px] leading-5 text-white/75">{outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillGrid() {
  const { observe, active } = useMotionOnView<HTMLDivElement>();
  const skills = [
    {
      number: "01",
      eyebrow: "Listen",
      title: "Customer discovery",
      copy: "Turn interviews, behavior, and stakeholder input into a product direction the ART can act on.",
      className: "lg:col-span-7",
      visual: (
        <div className="relative min-h-48 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">Signal inbox</p>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              3 new insights
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1.1fr_.9fr]">
            <div className="space-y-2">
              {[
                ["JT", "Checkout takes too long", "Friction"],
                ["AM", "I need clearer class options", "Clarity"],
                ["RK", "Can my team enroll together?", "Growth"],
              ].map(([initials, quote, tag], index) => (
                <div
                  key={quote}
                  className="popm-signal flex items-center gap-3 rounded-xl border border-[#1f2c4a]/10 bg-[#f8fafc] p-2.5"
                  style={{ animationDelay: `${index * 220}ms` }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f2c4a] text-[9px] font-semibold text-white">{initials}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold text-[#1f2c4a]">“{quote}”</p>
                    <p className="mt-0.5 text-[9px] text-[#94a3b8]">Customer interview</p>
                  </div>
                  <span className="rounded-full bg-[#fff7ed] px-2 py-1 text-[8px] font-semibold text-[#b45309]">{tag}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-[#1f2c4a] p-3 text-white">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/45">Pattern strength</p>
              <div className="mt-5 flex h-20 items-end gap-2">
                {[45, 72, 54, 88, 65].map((height, index) => (
                  <span
                    key={height}
                    className="popm-discovery-bar flex-1 rounded-t-sm bg-gradient-to-t from-[#d97706] to-[#fbbf24]"
                    style={{ "--bar-height": `${height}%`, animationDelay: `${index * 120}ms` } as CSSProperties}
                  />
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-4 text-white/60">Evidence becomes a product decision—not another lost note.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      eyebrow: "Decide",
      title: "Prioritize the running backlog",
      copy: "Use value, time criticality, risk reduction, and job size to rank what moves next.",
      className: "lg:col-span-5",
      visual: (
        <div className="min-h-48 rounded-2xl border border-[#1f2c4a]/10 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">ART backlog · WSJF</p>
            <span className="rounded-full bg-[#eef3f8] px-2 py-1 text-[9px] font-semibold text-[#475569]">Auto-ranked</span>
          </div>
          <div className="mt-4 space-y-2">
            {[
              ["F-128", "Self-serve enrollment", "18.4", 94],
              ["F-094", "Team checkout", "14.2", 76],
              ["E-031", "Course comparison", "9.8", 56],
            ].map(([id, name, score, width], index) => (
              <div
                key={id}
                className="popm-backlog-row rounded-xl border border-[#1f2c4a]/10 bg-[#f8fafc] px-3 py-2.5"
                style={{ animationDelay: `${index * 260}ms` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-semibold text-[#d97706]">{id}</span>
                  <p className="min-w-0 flex-1 truncate text-[11px] font-semibold text-[#1f2c4a]">{name}</p>
                  <span className="text-[10px] font-semibold text-[#1f2c4a]">{score}</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1f2c4a]/[0.06]">
                  <span className="popm-priority-bar block h-full rounded-full bg-[#d97706]" style={{ "--bar-width": `${width}%` } as CSSProperties} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "03",
      eyebrow: "Align",
      title: "Lead PI Planning",
      copy: "Translate vision into PI Objectives, expose dependencies, and help teams make a plan they believe.",
      className: "lg:col-span-6",
      visual: (
        <div className="relative min-h-48 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">PI 26.3 planning board</p>
            <span className="text-[9px] font-semibold text-emerald-700">Teams aligned</span>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-3">
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 420 120" preserveAspectRatio="none" aria-hidden>
              <path className="popm-dependency-line" d="M65 28 C145 28 145 90 210 90 S300 28 355 28" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
            {[
              ["Team Atlas", "Objective 01", "Vision"],
              ["Team Nova", "Objective 02", "Platform"],
              ["Team Orbit", "Objective 03", "Experience"],
            ].map(([team, objective, tag], index) => (
              <div key={team} className="relative z-10">
                <p className="truncate text-center text-[9px] font-semibold text-[#64748b]">{team}</p>
                <div className={`popm-pi-card mt-3 rounded-xl border p-3 ${index === 1 ? "border-[#d97706]/30 bg-[#fff7ed]" : "border-[#1f2c4a]/10 bg-[#f8fafc]"}`} style={{ animationDelay: `${index * 180}ms` }}>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#d97706]">{tag}</span>
                  <p className="mt-2 text-[10px] font-semibold leading-4 text-[#1f2c4a]">{objective}</p>
                  <div className="mt-4 flex gap-1">
                    {[0, 1, 2].map((dot) => <span key={dot} className={`h-1.5 flex-1 rounded-full ${dot <= index ? "bg-emerald-500" : "bg-[#1f2c4a]/10"}`} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "04",
      eyebrow: "Deliver + learn",
      title: "Keep value moving",
      copy: "Refine stories, manage Team Kanban, inspect outcomes, and feed what you learn back into discovery.",
      className: "lg:col-span-6",
      visual: (
        <div className="min-h-48 rounded-2xl border border-[#1f2c4a]/10 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">Flow board</p>
            <span className="text-[9px] font-semibold text-[#64748b]">WIP 4 / 6</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["Backlog", ["Research", "Feature 128"]],
              ["In progress", ["Prototype", "Story map"]],
              ["Validated", ["Team checkout", "Fast enroll"]],
            ].map(([column, cards], columnIndex) => (
              <div key={column as string} className="rounded-xl bg-[#f8fafc] p-2">
                <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#94a3b8]">{column as string}</p>
                <div className="mt-2 space-y-2">
                  {(cards as string[]).map((card, cardIndex) => (
                    <div
                      key={card}
                      className={`popm-kanban-card rounded-lg border bg-white p-2 text-[9px] font-semibold leading-3 text-[#1f2c4a] shadow-sm ${
                        columnIndex === 2 ? "border-emerald-600/20" : "border-[#1f2c4a]/10"
                      }`}
                      style={{ animationDelay: `${(columnIndex * 2 + cardIndex) * 160}ms` }}
                    >
                      <span className={`mb-1.5 block h-1 w-5 rounded-full ${columnIndex === 2 ? "bg-emerald-500" : "bg-[#d97706]"}`} />
                      {card}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div ref={observe} className={`relative mt-14 grid gap-5 lg:grid-cols-12 ${active ? "popm-motion-on" : ""}`}>
      {skills.map((skill) => (
        <div key={skill.title} className={`group relative overflow-hidden rounded-[1.75rem] border border-[#1f2c4a]/10 bg-[#f8fafc] p-5 sm:p-6 ${skill.className}`}>
          <div className="mb-5 flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d97706]">{skill.number} · {skill.eyebrow}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#1f2c4a]">{skill.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#64748b]">{skill.copy}</p>
            </div>
            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1f2c4a]/10 bg-white text-[#1f2c4a] transition group-hover:rotate-45 group-hover:border-[#d97706]/30 group-hover:text-[#d97706]">
              <ArrowIcon />
            </span>
          </div>
          {skill.visual}
        </div>
      ))}
    </div>
  );
}

function UniversalSkillGrid({ content }: { content: CatalogLandingContent }) {
  const { observe, active } = useMotionOnView<HTMLDivElement>();
  const modules = courseModules(content);
  const cards = Array.from({ length: 4 }, (_, index) => {
    const courseModule = modules[index];
    const topics = courseModule?.topics.slice(0, 3) || [];
    return {
      number: `0${index + 1}`,
      title: courseModule?.title || compactText(content.outcomes[index] || `Apply ${content.crumb}`, 42),
      copy: content.outcomes[index] || topics.join(". "),
      topics: topics.length ? topics : [content.highlights[index % content.highlights.length]],
      className: index < 2 ? "lg:col-span-6" : "lg:col-span-6",
      tone: index % 3,
    };
  });

  return (
    <div ref={observe} className={`mt-14 grid gap-5 lg:grid-cols-12 ${active ? "popm-motion-on" : ""}`}>
      {cards.map((card, index) => (
        <article key={`${card.number}-${card.title}`} className={`group overflow-hidden rounded-[1.75rem] border border-[#1f2c4a]/10 bg-[#f8fafc] p-5 sm:p-6 ${card.className}`}>
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d97706]">{card.number} · Practice</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#1f2c4a]">{card.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#64748b]">{card.copy}</p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1f2c4a]/10 bg-white text-[#1f2c4a] transition group-hover:rotate-45 group-hover:text-[#d97706]">
              <ArrowIcon />
            </span>
          </div>

          <div className="relative mt-5 min-h-44 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
                {index === 0 ? "Concept map" : index === 1 ? "Practice queue" : index === 2 ? "Application path" : "Capability board"}
              </p>
              <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
            </div>
            <div className="mt-4 space-y-2.5">
              {card.topics.map((topic, topicIndex) => (
                <div
                  key={topic}
                  className="popm-backlog-row rounded-xl border border-[#1f2c4a]/10 bg-[#f8fafc] p-3"
                  style={{ animationDelay: `${topicIndex * 220}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold ${
                      card.tone === 0 ? "bg-[#1f2c4a] text-white" : card.tone === 1 ? "bg-[#fff7ed] text-[#b45309]" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {topicIndex + 1}
                    </span>
                    <p className="min-w-0 flex-1 truncate text-[11px] font-semibold text-[#1f2c4a]">{topic}</p>
                    <span className="text-[9px] font-semibold text-[#94a3b8]">{65 + topicIndex * 12}%</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1f2c4a]/[0.06]">
                    <span
                      className="popm-priority-bar block h-full rounded-full bg-gradient-to-r from-[#d97706] to-[#fbbf24]"
                      style={{ "--bar-width": `${65 + topicIndex * 12}%` } as CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Curriculum({ content }: { content: CatalogLandingContent }) {
  const [activeDay, setActiveDay] = useState(0);
  const day = content.curriculum[activeDay] ?? content.curriculum[0];
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="space-y-2">
        {content.curriculum.map((item, index) => (
          <button
            key={item.day}
            type="button"
            onClick={() => setActiveDay(index)}
            className={`w-full cursor-pointer rounded-2xl border p-4 text-left transition ${
              activeDay === index
                ? "border-[#1f2c4a] bg-[#1f2c4a] text-white shadow-lg"
                : "border-[#1f2c4a]/10 bg-white text-[#1f2c4a] hover:border-[#1f2c4a]/25"
            }`}
          >
            <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${activeDay === index ? "text-[#fbbf24]" : "text-[#d97706]"}`}>
              {item.day}
            </span>
            <span className="mt-1 block text-sm font-semibold">{item.focus}</span>
          </button>
        ))}
        <a
          href={content.brochureHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#1f2c4a]/10 bg-[#f8fafc] px-4 text-sm font-semibold text-[#1f2c4a] hover:border-[#d97706]/40"
        >
          Download full brochure
          <ArrowIcon />
        </a>
      </div>

      {day ? (
        <div className="rounded-[1.75rem] border border-[#1f2c4a]/10 bg-white p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1f2c4a]/10 pb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d97706]">{day.day}</p>
              <h3 className="mt-2 text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a]">{day.focus}</h3>
            </div>
            <span className="rounded-full bg-[#eef3f8] px-3 py-1.5 text-xs font-semibold text-[#475569]">
              Live + hands-on
            </span>
          </div>
          <div className="mt-2 divide-y divide-[#1f2c4a]/10">
            {day.modules.map((module) => (
              <details key={module.title} className="group py-5" open={module.featured}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#1f2c4a]">{module.title}</p>
                    {module.weight ? <p className="mt-1 text-xs text-[#94a3b8]">{module.weight} of exam content</p> : null}
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef3f8] text-[#1f2c4a] transition group-open:rotate-45">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm leading-6 text-[#64748b]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97706]" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Faqs({ groups }: { groups: CatalogLandingContent["faqs"] }) {
  const categories = [
    ["generic", "Course"],
    ["exam", "Exam"],
    ["payment", "Payment"],
    ["courses", "Training"],
  ] as const;
  const [category, setCategory] = useState<keyof typeof groups>("generic");
  const [open, setOpen] = useState(0);
  const items: FaqItem[] = groups[category] ?? [];

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col">
        {categories.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setCategory(id);
              setOpen(0);
            }}
            className={`min-h-11 shrink-0 cursor-pointer rounded-xl px-4 text-left text-sm font-semibold transition ${
              category === id ? "bg-[#1f2c4a] text-white" : "bg-white text-[#64748b] hover:text-[#1f2c4a]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="divide-y divide-[#1f2c4a]/10 rounded-[1.5rem] border border-[#1f2c4a]/10 bg-white px-5 sm:px-7">
        {items.map((item, index) => (
          <div key={item.q} className="py-5">
            <button
              type="button"
              onClick={() => setOpen(open === index ? -1 : index)}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-5 text-left"
              aria-expanded={open === index}
            >
              <span className="font-semibold leading-6 text-[#1f2c4a]">{item.q}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef3f8] transition ${open === index ? "rotate-45" : ""}`}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {open === index ? <p className="max-w-3xl pb-2 pt-3 text-[15px] leading-7 text-[#64748b]">{item.a}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PopmCourseLanding({
  content,
  initialSchedules,
}: {
  content: CatalogLandingContent;
  initialSchedules: CourseScheduleRow[];
}) {
  const [activeSection, setActiveSection] = useState("overview");
  const [showCorporateQuote, setShowCorporateQuote] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentFormData, setAssessmentFormData] = useState({ name: "", email: "" });
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);
  const reviews = content.reviews.slice(0, 6);
  const isPrivateClass = content.slug === "release-train-engineer";
  const tuition = isPrivateClass ? null : COURSE_HERO_SCHEDULE_LIST_USD[content.slug];
  const instructors = useMemo(() => getFeaturedScheduleInstructorProfiles(), []);
  const navItems = useMemo(
    () => [
      ...NAV_ITEMS.slice(0, 6),
      ...(content.careerPath ? [{ id: "career-path", label: "Career path" }] : []),
      ...NAV_ITEMS.slice(6),
    ],
    [content.careerPath],
  );
  const featureItems = useMemo(
    () => [
      { title: "Live instruction", copy: content.durationLabel, tone: "navy" as const },
      { title: "Official credential", copy: content.cardTitle, tone: "amber" as const },
      { title: "Everything included", copy: compactText(content.includesLine, 82), tone: "green" as const },
      { title: "Practice, not lectures", copy: compactText(content.highlights[0], 82), tone: "navy" as const },
      { title: "Skills for real work", copy: compactText(content.outcomes[0] || content.highlights[1], 82), tone: "amber" as const },
      { title: "Guaranteed dates", copy: "Your class runs as scheduled", tone: "green" as const },
    ],
    [content],
  );

  async function handleAssessmentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!assessmentFormData.name.trim() || !assessmentFormData.email.includes("@") || !content.assessmentHref) return;
    setIsSubmittingAssessment(true);
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
      if (!response.ok) throw new Error("Assessment registration failed");
      window.location.href = content.assessmentHref;
    } catch {
      window.alert("We could not start the assessment. Please try again.");
      setIsSubmittingAssessment(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.08, 0.25] },
    );
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1f2c4a]">
      <style jsx global>{`
        @keyframes popmFlowCard {
          0%, 100% { border-color: rgba(31,44,74,.1); transform: translateY(0); }
          45% { border-color: rgba(217,119,6,.42); transform: translateY(-3px); }
        }
        @keyframes popmRunner {
          0% { left: 12%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { left: 88%; opacity: 0; }
        }
        @keyframes popmBar {
          from { width: 0; }
          to { width: var(--bar-width); }
        }
        @keyframes popmDraw {
          from { stroke-dashoffset: 650; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes popmDot {
          0%, 55% { opacity: 0; transform: scale(.4); }
          75%, 100% { opacity: 1; transform: scale(1); }
        }
        @keyframes popmSignalIn {
          from { opacity: 0; transform: translateX(-14px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popmDiscoveryBar {
          from { height: 0; }
          to { height: var(--bar-height); }
        }
        @keyframes popmBacklogIn {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popmBacklogPulse {
          0%, 100% { border-color: rgba(31,44,74,.1); }
          50% { border-color: rgba(217,119,6,.35); }
        }
        @keyframes popmDependency {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes popmPiIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popmKanban {
          0%, 100% { transform: translateY(0); box-shadow: 0 1px 2px rgba(31,44,74,.05); }
          50% { transform: translateY(-3px); box-shadow: 0 8px 16px rgba(31,44,74,.09); }
        }
        .popm-flow-card { animation: popmFlowCard 4s ease-in-out infinite; }
        .popm-flow-runner { animation: popmRunner 4s linear infinite; }
        .popm-bar { width: 0; animation: popmBar 1.1s cubic-bezier(.2,.8,.2,1) forwards; }
        .popm-chart-line { stroke-dasharray: 650; stroke-dashoffset: 650; }
        .popm-chart-dot { opacity: 0; transform-origin: 440px 25px; }
        .popm-signal, .popm-backlog-row, .popm-pi-card { opacity: 0; }
        .popm-discovery-bar { height: 0; }
        .popm-priority-bar { width: 0; }
        .popm-dependency-line { stroke-dashoffset: 120; }
        .popm-motion-on .popm-chart-line { animation: popmDraw 2.2s ease-out forwards; }
        .popm-motion-on .popm-chart-line-muted { animation-delay: .3s; }
        .popm-motion-on .popm-chart-dot { animation: popmDot 2.8s ease-out forwards; }
        .popm-motion-on .popm-signal { animation: popmSignalIn .65s cubic-bezier(.2,.8,.2,1) forwards; }
        .popm-motion-on .popm-discovery-bar { animation: popmDiscoveryBar .9s cubic-bezier(.2,.8,.2,1) forwards; }
        .popm-motion-on .popm-backlog-row {
          animation:
            popmBacklogIn .7s cubic-bezier(.2,.8,.2,1) forwards,
            popmBacklogPulse 4s ease-in-out 1.2s infinite;
        }
        .popm-motion-on .popm-priority-bar { animation: popmBar 1.1s .45s cubic-bezier(.2,.8,.2,1) forwards; }
        .popm-motion-on .popm-dependency-line { animation: popmDependency 3s linear infinite; }
        .popm-motion-on .popm-pi-card { animation: popmPiIn .7s cubic-bezier(.2,.8,.2,1) forwards; }
        .popm-motion-on .popm-kanban-card { animation: popmKanban 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .popm-flow-card, .popm-flow-runner, .popm-bar, .popm-chart-line, .popm-chart-dot,
          .popm-signal, .popm-discovery-bar, .popm-backlog-row, .popm-priority-bar,
          .popm-dependency-line, .popm-pi-card, .popm-kanban-card {
            animation: none !important;
          }
          .popm-bar, .popm-priority-bar { width: var(--bar-width); }
          .popm-discovery-bar { height: var(--bar-height); }
          .popm-signal, .popm-backlog-row, .popm-pi-card { opacity: 1; }
          .popm-dependency-line { stroke-dashoffset: 0; }
          .popm-chart-line { stroke-dashoffset: 0; }
          .popm-chart-dot { opacity: 1; }
        }
      `}</style>

      <section className="relative overflow-hidden border-b border-[#1f2c4a]/10 bg-[linear-gradient(180deg,#fff_0%,#f3f7fb_100%)]">
        <div className="pointer-events-none absolute -left-48 top-10 h-[32rem] w-[32rem] rounded-full bg-[#d97706]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -right-48 -top-24 h-[38rem] w-[38rem] rounded-full bg-[#1f2c4a]/[0.06] blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-[#94a3b8]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#1f2c4a]">Courses</Link>
            <span>/</span>
            <span className="text-[#475569]">{content.crumb}</span>
          </nav>

          <div className="mt-9 grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,.85fr)] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d97706]/20 bg-[#fff7ed] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#b45309]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                {content.eyebrow || "Official SAFe® certification · Live online"}
              </div>
              <h1 className="mt-6 max-w-4xl text-[2.15rem] font-normal leading-[1.04] tracking-[-0.045em] text-[#1f2c4a] sm:text-[2.85rem] lg:text-[3rem]">
                {content.title}
              </h1>
              <div className="mt-6 max-w-3xl space-y-3 text-[15px] leading-7 text-[#475569] sm:text-base sm:leading-8">
                {content.lede.split(/\n\s*\n/).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-emerald-700/15 bg-emerald-50 px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1f2c4a]">Guaranteed to run</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#64748b]">Every listed Agile36 cohort runs.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#d97706]/20 bg-[#fff7ed] px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d97706] text-white">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M17 7.5C17 5.6 14.8 4 12 4S7 5.6 7 7.5 9.2 11 12 11s5 1.6 5 3.5S14.8 18 12 18s-5-1.6-5-3.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1f2c4a]">Price Match Guarantee</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#64748b]">Lower price for the same live official course? We&apos;ll match it.</p>
                  </div>
                </div>
              </div>
              <div className="mt-7 grid max-w-3xl gap-3 text-sm font-medium text-[#334155] sm:grid-cols-2">
                {content.highlights.map((item) => (
                  <span key={item} className="flex items-start gap-2.5 leading-6">
                    <span className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600">{CHECK}</span>
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                {isPrivateClass ? (
                  <button type="button" onClick={() => setShowCorporateQuote(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1f2c4a] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-14px_rgba(31,44,74,.8)] transition hover:-translate-y-0.5 hover:bg-[#16243f]">
                    Request a private cohort
                    <ArrowIcon />
                  </button>
                ) : (
                  <a href="#dates" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1f2c4a] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-14px_rgba(31,44,74,.8)] transition hover:-translate-y-0.5 hover:bg-[#16243f]">
                    View dates & enroll
                    <ArrowIcon />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setShowCorporateQuote(true)}
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-[#1f2c4a]/20 bg-white px-6 text-sm font-semibold text-[#1f2c4a] transition hover:border-[#1f2c4a]/40"
                >
                  Train your team
                </button>
                {content.brochureHref ? (
                  <a
                    href={content.brochureHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center px-2 text-sm font-semibold text-[#d97706] hover:text-[#b45309]"
                  >
                    Download brochure
                  </a>
                ) : null}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-[#1f2c4a]/10 pt-6">
                <div className="flex -space-x-2" aria-hidden>
                  {["image 120.png", "image 137.png", "image 247.png", "image 476.png"].map((name) => (
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
                <div>
                  <p className="text-sm font-semibold text-[#1f2c4a]">4.9/5 from Agile36 learners</p>
                  <p className="mt-0.5 text-xs text-[#64748b]">Live instruction from working practitioners</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <FlowCanvas content={content} />
              {tuition ? (
                <div className="grid gap-5 rounded-[1.5rem] border border-[#1f2c4a]/10 bg-white p-5 shadow-[0_22px_55px_-38px_rgba(31,44,74,.55)] sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <div className="sm:border-r sm:border-[#1f2c4a]/10 sm:pr-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">Tuition</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-semibold tracking-[-0.05em] text-[#1f2c4a]">
                        ${tuition.current.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#94a3b8] line-through">
                        ${tuition.original.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1f2c4a]">Everything you need is included.</p>
                    <p className="mt-1 text-xs leading-5 text-[#64748b]">
                      {content.includesLine}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-[#475569]">
                      <Image src="/Silver.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                      Scaled Agile Silver Partner
                    </div>
                  </div>
                  <a
                    href="#dates"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1f2c4a] px-5 text-sm font-semibold text-white transition hover:bg-[#16243f]"
                  >
                    Choose a cohort
                    <ArrowIcon />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <TrustedByStrip />

      <nav className="sticky top-[4.25rem] z-40 border-b border-[#1f2c4a]/10 bg-white/95 backdrop-blur-xl" aria-label="On this page">
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-2 sm:px-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative shrink-0 px-4 py-4 text-sm font-semibold transition ${
                activeSection === item.id ? "text-[#1f2c4a]" : "text-[#94a3b8] hover:text-[#475569]"
              }`}
            >
              {item.label}
              <span className={`absolute inset-x-4 bottom-0 h-0.5 ${activeSection === item.id ? "bg-[#d97706]" : "bg-transparent"}`} />
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Course overview"
            title={content.summaryTitle || `Build practical capability in ${content.crumb}.`}
            copy={content.summary || firstParagraph(content.lede)}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-[.88fr_1.12fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {featureItems.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-5 transition hover:-translate-y-1 hover:border-[#d97706]/25 hover:shadow-lg">
                  <Icon tone={item.tone}>
                    {index % 3 === 0 ? (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 8v4l3 2" /><circle cx="12" cy="12" r="9" /></svg>
                    ) : index % 3 === 1 ? (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="m6 9 6-6 6 6v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" /><path d="M9 21v-8h6v8" /></svg>
                    ) : (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="m12 2 3 6 7 .9-5 4.8 1.2 6.8L12 17.3l-6.2 3.2L7 13.7 2 8.9 9 8Z" /></svg>
                    )}
                  </Icon>
                  <h3 className="mt-5 font-semibold text-[#1f2c4a]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#64748b]">{item.copy}</p>
                </div>
              ))}
            </div>
            <OutcomeChart outcomes={content.outcomes} courseName={content.crumb} />
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-32 border-y border-[#1f2c4a]/10 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Skills you will build"
            title={content.slug === "product-owner-manager" ? "Not just a certificate. A working product operating system." : `Not just a credential. A working ${content.crumb} toolkit.`}
            copy={content.slug === "product-owner-manager" ? "The class follows the real flow of product work—from hearing the customer to helping teams deliver and learn." : "Follow the work from core concepts through hands-on practice, application, and measurable capability."}
            align="center"
          />
          {content.slug === "product-owner-manager" ? <SkillGrid /> : <UniversalSkillGrid content={content} />}
        </div>
      </section>

      <section id="instructors" className="scroll-mt-32 bg-[#eef3f8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <SectionHeading
              eyebrow="Meet your instructors"
              title="Learn from practitioners who know what the work feels like."
              copy="Your class is led live by a SAFe® Practice Consultant and enterprise coach who connects the official curriculum to real decisions, team dynamics, and transformation challenges."
            />
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white text-center">
              {[
                ["SPC®", "certified"],
                ["Enterprise", "experience"],
                ["Live", "Q&A"],
              ].map(([value, label], index) => (
                <div key={value} className={`px-3 py-4 sm:px-5 ${index ? "border-l border-[#1f2c4a]/10" : ""}`}>
                  <p className="text-sm font-semibold text-[#1f2c4a]">{value}</p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[#94a3b8]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {instructors.map((profile, index) => (
              <article key={profile.name} className={`group overflow-hidden rounded-[1.75rem] border bg-white transition hover:-translate-y-1 hover:shadow-xl ${index === 0 ? "border-[#d97706]/30" : "border-[#1f2c4a]/10"}`}>
                <div className={`h-1 ${index === 0 ? "bg-gradient-to-r from-[#d97706] to-[#fbbf24]" : "bg-[#1f2c4a]"}`} />
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="relative shrink-0">
                      <div className="absolute -inset-1.5 rounded-2xl bg-[#d97706]/10 transition group-hover:bg-[#d97706]/20" />
                      <Image
                        src={profile.image}
                        alt={`${profile.name}, Agile36 instructor`}
                        width={112}
                        height={112}
                        className="relative h-20 w-20 rounded-xl object-cover object-top sm:h-24 sm:w-24"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">Agile36 instructor</p>
                      <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-[#1f2c4a]">{profile.name}</h3>
                      <p className="mt-1 text-xs leading-5 text-[#64748b]">{profile.title}</p>
                      {profile.linkedin ? (
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:underline">
                          LinkedIn profile
                          <ArrowIcon />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-5 text-sm leading-6 text-[#475569] sm:line-clamp-none">{profile.bio[0]}</p>

                  {profile.clients.length ? (
                    <div className="mt-5 border-t border-[#1f2c4a]/10 pt-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">Experience across organizations including</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {profile.clients.slice(0, 5).map((client) => (
                          <span key={client.name} className="flex h-9 min-w-16 items-center justify-center rounded-lg border border-[#1f2c4a]/10 bg-[#f8fafc] px-2.5">
                            <Image src={client.logo} alt={client.name} width={72} height={24} className="max-h-5 w-auto max-w-full object-contain" />
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {profile.testimonials[0] ? (
                    <blockquote className="mt-5 line-clamp-5 rounded-xl bg-[#f8fafc] p-4 text-[13px] leading-5 text-[#64748b] sm:line-clamp-none">
                      <span className="mr-1 text-[#d97706]">★★★★★</span>
                      “{profile.testimonials[0].quote}”
                    </blockquote>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-[#64748b]">
            The exact instructor assigned to each cohort is shown with its class date.
          </p>
        </div>
      </section>

      <section id="dates" className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={isPrivateClass ? "Private team training" : "Live online cohorts"}
            title={isPrivateClass ? "Bring the official RTE experience to your organization." : "Choose the class that fits your schedule."}
            copy={isPrivateClass ? "RTE is delivered as a private cohort tailored to your leaders, transformation context, and calendar." : "Every listed Agile36 cohort is guaranteed to run. Your tuition includes live training, official courseware, and the credential items listed for this course."}
          />
          <div className="mt-10">
            {isPrivateClass ? (
              <div className="grid overflow-hidden rounded-[1.75rem] border border-[#1f2c4a]/15 bg-white shadow-[0_24px_60px_-40px_rgba(31,44,74,.6)] lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="p-6 sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d97706]">Built around your ART</p>
                  <h3 className="mt-3 text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a]">Choose dates, team size, and organizational focus.</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748b]">We will shape the private cohort with you and provide a clear group proposal before anything is booked.</p>
                </div>
                <div className="border-t border-[#1f2c4a]/10 bg-[#eef3f8] p-6 lg:border-l lg:border-t-0 lg:p-8">
                  <button type="button" onClick={() => setShowCorporateQuote(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1f2c4a] px-6 text-sm font-semibold text-white hover:bg-[#16243f]">
                    Request private training
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            ) : (
              <CourseScheduleEmbed
                courseSlug={content.slug}
                courseName={content.scheduleCourseName}
                brochureHref={content.brochureHref}
                showSafeBadges
                premium
                initialSchedules={initialSchedules}
              />
            )}
          </div>
        </div>
      </section>

      <section id="curriculum" className="scroll-mt-32 border-y border-[#1f2c4a]/10 bg-[#eef3f8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Course curriculum"
            title={`${content.durationLabel.split("·")[0]?.trim() || "Live training"} from concepts to confident application.`}
            copy={content.curriculumLede || "Official SAFe content, exam preparation, and practical AI applications woven into one live experience."}
          />
          <Curriculum content={content} />
        </div>
      </section>

      <section id="certification" className="scroll-mt-32 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_.9fr]">
          <div>
            <SectionHeading
              eyebrow={content.attemptsLine === null ? "Official micro-credential" : "Exam & certification"}
              title={`Leave class ready to earn the official ${content.cardTitle}.`}
              copy={content.examNote}
            />
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {content.examDetails?.format.map((line) => (
                <div key={`${line.before}${line.highlight}${line.after}`} className="rounded-xl border border-[#1f2c4a]/10 bg-[#f8fafc] p-4">
                  <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <span className="h-4 w-4">{CHECK}</span>
                  </span>
                  <p className="text-sm leading-6 text-[#64748b]">
                    {line.before}
                    <strong className="font-semibold text-[#1f2c4a]">{line.highlight}</strong>
                    {line.after}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {content.assessmentHref ? (
                <button type="button" onClick={() => setShowAssessmentModal(true)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1f2c4a] px-5 text-sm font-semibold text-white hover:bg-[#16243f]">
                  {content.assessmentLabel || "Take the free assessment"}
                </button>
              ) : null}
              <a href={content.examGuidelinesHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 px-3 text-sm font-semibold text-[#d97706]">
                Official exam guidelines
                <ArrowIcon />
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-[#d97706]/10 to-[#1f2c4a]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#1f2c4a]/10 bg-[#f8fafc] p-5 shadow-xl">
              <Image
                src={content.certificateSrc || content.badgeSrc}
                alt={content.certificateTitle || content.badgeAlt}
                width={800}
                height={600}
                className="h-auto w-full rounded-xl object-contain"
              />
              <div className="mt-4 flex items-center gap-3">
                <Image src="/Silver.png" alt="Scaled Agile Silver Partner" width={40} height={40} className="h-10 w-10 object-contain" />
                <div>
                  <p className="text-sm font-semibold text-[#1f2c4a]">Official Scaled Agile certification</p>
                  <p className="mt-0.5 text-xs text-[#64748b]">Delivered by an authorized Silver Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {content.careerPath ? (
        <section id="career-path" className="scroll-mt-32 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="After this course" title="Keep building your career path." copy={content.careerPath.lede} />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {content.careerPath.next.map((next, index) => (
                <Link key={next.href} href={next.href} className="group rounded-[1.5rem] border border-[#1f2c4a]/10 bg-[#f8fafc] p-6 transition hover:-translate-y-1 hover:border-[#d97706]/30 hover:bg-white hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#d97706]">0{index + 1}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1f2c4a] transition group-hover:rotate-45 group-hover:text-[#d97706]"><ArrowIcon /></span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold tracking-[-0.02em] text-[#1f2c4a]">{next.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#64748b]">{next.forWho}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="reviews" className="scroll-mt-32 border-y border-[#1f2c4a]/10 bg-[#f8fafc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="Learner reviews" title="Taught for the work—not just the test." />
            <div className="flex items-end gap-3">
              <span className="text-6xl font-normal tracking-[-0.06em] text-[#1f2c4a]">4.9</span>
              <div className="pb-1">
                <p className="tracking-[0.15em] text-[#d97706]">★★★★★</p>
                <p className="mt-1 text-xs text-[#64748b]">Learner rating</p>
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <article key={`${review.name}-${index}`} className={`rounded-[1.5rem] border p-6 ${index === 0 ? "border-[#d97706]/30 bg-[#fff7ed]" : "border-[#1f2c4a]/10 bg-white"}`}>
                <p className="text-sm tracking-[0.12em] text-[#d97706]">★★★★★</p>
                <blockquote className="mt-5 text-[15px] leading-7 text-[#475569]">“{review.review}”</blockquote>
                <div className="mt-6 border-t border-[#1f2c4a]/10 pt-4">
                  <p className="font-semibold text-[#1f2c4a]">{review.name}</p>
                  <p className="mt-0.5 text-xs text-[#94a3b8]">{review.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="scroll-mt-32 bg-[#eef3f8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Everything you need before you enroll."
            copy="Course logistics, certification details, payment, and private training—all in one place."
          />
          <Faqs groups={content.faqs} />
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#1f2c4a] px-6 py-12 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#d97706]/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fbbf24]">Your next step starts here</p>
            <h2 className="mt-3 text-3xl font-normal tracking-[-0.04em] sm:text-4xl">Build the {content.crumb} capability your work needs.</h2>
            <p className="mt-4 text-base leading-7 text-white/65">Live instruction. Official courseware. Hands-on practice. Skills you can use immediately.</p>
          </div>
          <a href="#dates" className="relative mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#d97706] px-6 text-sm font-semibold text-white transition hover:bg-[#b45309] lg:mt-0">
            Choose your cohort
            <ArrowIcon />
          </a>
        </div>
      </section>

      <CorporateQuoteModal
        open={showCorporateQuote}
        onClose={() => setShowCorporateQuote(false)}
        courseSlug={content.slug}
        courseLabel={content.scheduleCourseName}
      />

      {showAssessmentModal && content.assessmentHref ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2c4a]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="assessment-title">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-white/20 bg-white p-6 shadow-2xl sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#1f2c4a]" />
            <button
              type="button"
              onClick={() => {
                setShowAssessmentModal(false);
                setAssessmentFormData({ name: "", email: "" });
              }}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3f8] text-xl text-[#475569] hover:bg-[#1f2c4a]/10"
              aria-label="Close assessment form"
            >
              ×
            </button>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d97706]">Free practice assessment</p>
            <h3 id="assessment-title" className="mt-3 text-2xl font-normal tracking-[-0.035em] text-[#1f2c4a]">Start your practice test</h3>
            <p className="mt-2 pr-8 text-sm leading-6 text-[#64748b]">Enter your details to access the {content.examName || content.practiceTestTitle}.</p>
            <form onSubmit={handleAssessmentSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-[#1f2c4a]">
                Full name
                <input
                  type="text"
                  required
                  value={assessmentFormData.name}
                  onChange={(event) => setAssessmentFormData((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-[#1f2c4a]/15 bg-[#f8fafc] px-4 py-3 font-normal text-[#1f2c4a] outline-none transition focus:border-[#d97706]/50 focus:ring-4 focus:ring-[#d97706]/10"
                  placeholder="Enter your full name"
                />
              </label>
              <label className="block text-sm font-semibold text-[#1f2c4a]">
                Email address
                <input
                  type="email"
                  required
                  value={assessmentFormData.email}
                  onChange={(event) => setAssessmentFormData((current) => ({ ...current, email: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-[#1f2c4a]/15 bg-[#f8fafc] px-4 py-3 font-normal text-[#1f2c4a] outline-none transition focus:border-[#d97706]/50 focus:ring-4 focus:ring-[#d97706]/10"
                  placeholder="you@company.com"
                />
              </label>
              <button type="submit" disabled={isSubmittingAssessment} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1f2c4a] px-5 text-sm font-semibold text-white hover:bg-[#16243f] disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmittingAssessment ? "Preparing assessment…" : "Start practice test"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
