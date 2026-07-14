"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

function useCountUp(target: number, active: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);
  return value;
}

const EXAM_DOMAINS = [
  { name: "High-performing teams", pct: 27, color: "#0f766e" },
  { name: "Improving flow", pct: 23, color: "#0369a1" },
  { name: "Addressing conflict", pct: 19, color: "#d97706" },
  { name: "ART performance", pct: 18, color: "#1f2c4a" },
  { name: "Evolving the SASM role", pct: 13, color: "#64748b" },
];

const SALARY_LADDER = [
  { role: "Scrum Master", band: 95, label: "$95K" },
  { role: "SAFe SSM", band: 110, label: "$110K" },
  { role: "SASM", band: 125, label: "$125K", highlight: true },
  { role: "Agile Coach", band: 140, label: "$140K" },
  { role: "RTE path", band: 155, label: "$155K+" },
];

const IMPACT_SERIES = [
  { label: "Team SM", flow: 42, collab: 38, conflict: 30 },
  { label: "After SSM", flow: 58, collab: 55, conflict: 48 },
  { label: "After SASM", flow: 86, collab: 84, conflict: 82 },
];

function DashboardCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function KpiTile({
  label,
  value,
  suffix = "",
  prefix = "",
  hint,
  delay,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  hint: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const n = useCountUp(value, inView);

  return (
    <DashboardCard delay={delay} className="p-5">
      <div ref={ref}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-[#1f2c4a] tabular-nums">
          {prefix}
          {n}
          {suffix}
        </p>
        <p className="mt-1.5 text-sm leading-snug text-slate-600">{hint}</p>
      </div>
    </DashboardCard>
  );
}

function ExamDomainChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <DashboardCard delay={0.08} className="p-5 sm:p-6">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Exam blueprint
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#1f2c4a]">
            Where the SASM exam puts its weight
          </h3>
        </div>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          Scaled Agile domains
        </span>
      </div>
      <p className="mb-5 max-w-xl text-sm text-slate-600">
        Training maps directly to the official exam — so study time compounds into a pass, not guesswork.
      </p>
      <div ref={ref} className="space-y-3.5">
        {EXAM_DOMAINS.map((d) => (
          <div key={d.name} className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-3">
            <div>
              <div className="mb-1 flex justify-between gap-2 text-sm">
                <span className="font-medium text-slate-800">{d.name}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-sm bg-slate-100">
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: inView ? `${d.pct}%` : "0%",
                    backgroundColor: d.color,
                    transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </div>
            </div>
            <span className="text-right text-sm font-semibold tabular-nums text-[#1f2c4a]">
              {d.pct}%
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

function SalaryColumnChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const max = 160;

  return (
    <DashboardCard delay={0.14} className="p-5 sm:p-6">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Compensation ladder
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#1f2c4a]">
            Typical US midpoint by role
          </h3>
        </div>
        <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800">
          Illustrative
        </span>
      </div>
      <p className="mb-4 text-sm text-slate-600">
        SASM sits between team-level Scrum Master work and train-level coaching — the pay band moves with the scope.
      </p>
      <div ref={ref} className="relative h-52">
        <div className="absolute inset-0 flex flex-col justify-between py-1">
          {[160, 120, 80, 40, 0].map((tick) => (
            <div key={tick} className="flex items-center gap-2">
              <span className="w-8 text-right text-[10px] tabular-nums text-slate-400">${tick}K</span>
              <div className="h-px flex-1 border-t border-dashed border-slate-200" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-10 right-0 flex h-[calc(100%-0.25rem)] items-end justify-around gap-1 px-1">
          {SALARY_LADDER.map((bar) => {
            const h = (bar.band / max) * 100;
            return (
              <div key={bar.role} className="flex h-full w-full max-w-[4.5rem] flex-col items-center justify-end">
                <span
                  className={`mb-1 text-[11px] font-semibold tabular-nums ${
                    bar.highlight ? "text-[#d97706]" : "text-slate-600"
                  }`}
                >
                  {bar.label}
                </span>
                <div
                  className={`w-full rounded-t-sm ${
                    bar.highlight
                      ? "bg-gradient-to-t from-[#b45309] to-[#f59e0b]"
                      : "bg-[#1f2c4a]/80"
                  }`}
                  style={{
                    height: inView ? `${h}%` : "0%",
                    transition: "height 1.15s cubic-bezier(0.22, 1, 0.36, 1)",
                    boxShadow: bar.highlight ? "0 0 0 1px rgba(217,119,6,0.35)" : undefined,
                  }}
                />
                <span className="mt-2 text-center text-[10px] font-medium leading-tight text-slate-600">
                  {bar.role}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardCard>
  );
}

function ImpactLineChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const w = 360;
  const h = 160;
  const pad = { t: 12, r: 12, b: 28, l: 28 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const x = (i: number) => pad.l + (i / (IMPACT_SERIES.length - 1)) * innerW;
  const y = (v: number) => pad.t + innerH - (v / 100) * innerH;

  const pathFor = (key: "flow" | "collab" | "conflict") =>
    IMPACT_SERIES.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p[key])}`).join(" ");

  return (
    <DashboardCard delay={0.2} className="p-5 sm:p-6 lg:col-span-2">
      <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Capability growth
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#1f2c4a]">
            The outcome: train-level impact, not just ceremonies
          </h3>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span className="h-2 w-2 rounded-full bg-[#0369a1]" /> Flow
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span className="h-2 w-2 rounded-full bg-[#0f766e]" /> Collaboration
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span className="h-2 w-2 rounded-full bg-[#d97706]" /> Conflict skill
          </span>
        </div>
      </div>
      <p className="mb-4 max-w-2xl text-sm text-slate-600">
        SASM is built for Scrum Masters who already run a team well — and need to move work, people, and decisions across the ART.
      </p>
      <div ref={ref} className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-44 w-full min-w-[280px]" role="img" aria-label="Capability growth from team Scrum Master to SASM">
          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line
                x1={pad.l}
                x2={w - pad.r}
                y1={y(tick)}
                y2={y(tick)}
                stroke="#e2e8f0"
                strokeDasharray="3 3"
              />
              <text x={pad.l - 6} y={y(tick) + 3} textAnchor="end" fontSize="9" fill="#94a3b8">
                {tick}
              </text>
            </g>
          ))}
          {(
            [
              ["flow", "#0369a1"],
              ["collab", "#0f766e"],
              ["conflict", "#d97706"],
            ] as const
          ).map(([key, color]) => (
            <path
              key={key}
              d={pathFor(key)}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: inView ? 0 : 500,
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          ))}
          {IMPACT_SERIES.map((p, i) => (
            <text
              key={p.label}
              x={x(i)}
              y={h - 6}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#475569"
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </DashboardCard>
  );
}

function OutcomesCta() {
  return (
    <DashboardCard delay={0.24} className="flex flex-col justify-between bg-[#1f2c4a] p-6 text-white lg:col-span-1">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
          Next step
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          Get certified. Show up ready for ART-level work.
        </h3>
        <ul className="mt-4 space-y-2.5 text-sm text-white/85">
          {[
            "Pass the SASM exam (73% required — fee included)",
            "Facilitate flow, conflict, and Inspect & Adapt with confidence",
            "Position for Senior SM, Coach, and RTE-track roles",
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f59e0b]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href="/courses/advanced-scrum-master/schedule?course=advanced-scrum-master"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#f59e0b] px-5 py-3 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#fbbf24]"
      >
        View upcoming classes
      </Link>
    </DashboardCard>
  );
}

/**
 * Power BI–style outcomes dashboard for the SASM course page.
 * Charts are illustrative marketing visuals grounded in published exam weights / market bands.
 */
export default function SasmOutcomesDashboard() {
  return (
    <section className="relative w-full overflow-hidden border-y border-slate-200 bg-[#f4f6f9] px-4 py-16 sm:px-6 lg:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-3xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
            Outcomes dashboard
          </p>
          <h2 className="mt-2 text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] sm:text-4xl">
            What SASM is built to change
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Not another badge for LinkedIn — a measurable step from team facilitator to ART-level coach:
            stronger flow, cleaner conflict, and a credential employers recognize.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiTile label="Pass threshold" value={73} suffix="%" hint="Official SASM exam passing score" delay={0} />
          <KpiTile label="Live training" value={16} suffix=" hrs" hint="2 days with a SAFe Program Consultant" delay={0.05} />
          <KpiTile label="Salary midpoint" value={125} prefix="$" suffix="K" hint="Typical US band for SASM-level roles" delay={0.1} />
          <KpiTile label="Exam window" value={30} suffix=" days" hint="Complete your attempt after class ends" delay={0.15} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <ExamDomainChart />
          <SalaryColumnChart />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <ImpactLineChart />
          <OutcomesCta />
        </div>
      </div>
    </section>
  );
}
