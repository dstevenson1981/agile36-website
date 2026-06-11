"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Animates children-driven values when the element scrolls into view. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/**
 * Animated radial gauge (donut percentage). Fully responsive — scales with
 * its container via viewBox.
 */
export function RadialGauge({
  percent,
  label,
  sublabel,
  color = "#d97706",
}: {
  percent: number;
  label: string;
  sublabel?: string;
  color?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const R = 54;
  const C = 2 * Math.PI * R;
  const offset = inView ? C * (1 - percent / 100) : C;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative w-full max-w-[180px]">
        <svg viewBox="0 0 140 140" className="w-full" role="img" aria-label={`${percent}% — ${label}`}>
          <circle cx="70" cy="70" r={R} fill="none" stroke="#1f2c4a" strokeOpacity="0.08" strokeWidth="12" />
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            transform="rotate(-90 70 70)"
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
          <text x="70" y="66" textAnchor="middle" fontSize="26" fontWeight="600" fill="#1f2c4a" style={{ letterSpacing: "-0.02em" }}>
            {percent}%
          </text>
          <text x="70" y="86" textAnchor="middle" fontSize="9" fontWeight="500" fill="#64748b" style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {sublabel || ""}
          </text>
        </svg>
      </div>
      <p className="mt-2 max-w-[220px] text-sm leading-snug text-[#475569]">{label}</p>
    </div>
  );
}

/**
 * Animated horizontal range bar (e.g. a salary band). The band fills on
 * scroll-into-view; min/max markers sit underneath.
 */
export function RangeBar({
  minLabel,
  maxLabel,
  midLabel,
  title,
  caption,
}: {
  minLabel: string;
  maxLabel: string;
  midLabel?: string;
  title: string;
  caption?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-2xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: "-0.02em" }}>
          {title}
        </p>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[#1f2c4a]/[0.08]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#d97706]/60 via-[#d97706] to-[#b45309]"
          style={{
            width: inView ? "100%" : "0%",
            transition: "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs font-medium text-[#64748b]">
        <span>{minLabel}</span>
        {midLabel ? <span>{midLabel}</span> : null}
        <span>{maxLabel}</span>
      </div>
      {caption ? <p className="mt-3 text-sm text-[#475569]">{caption}</p> : null}
    </div>
  );
}

/** Compact icon stat chip for exam facts (questions, duration, retake). */
export function FactChip({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d97706]/10 text-[#d97706]">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-base font-semibold text-[#1f2c4a]">{value}</p>
        <p className="text-xs text-[#64748b]">{label}</p>
      </div>
    </div>
  );
}

/**
 * Demand meter — headlines the verdict ("High") with a pegged, animated
 * gauge bar. Low → Moderate → High scale underneath.
 */
export function DemandMeter({ caption }: { caption: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="flex items-center gap-2.5">
        <span className="text-3xl font-semibold text-emerald-600" style={{ letterSpacing: "-0.02em" }}>
          High
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-7 w-7 text-emerald-600" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h7v7" />
        </svg>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[#1f2c4a]/[0.08]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#d97706] via-emerald-500 to-emerald-600"
          style={{
            width: inView ? "94%" : "0%",
            transition: "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs font-medium text-[#94a3b8]">
        <span>Low</span>
        <span>Moderate</span>
        <span className="font-bold text-emerald-600">High</span>
      </div>
      <p className="mt-3 text-sm text-[#475569]">{caption}</p>
    </div>
  );
}
