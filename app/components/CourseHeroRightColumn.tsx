"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";
import CourseHeroPriceScheduleCta from "@/app/components/CourseHeroPriceScheduleCta";
import PrivateCohortContactModal from "@/app/components/PrivateCohortContactModal";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";

/** Courses listed publicly but sold as private cohorts (no schedule / checkout). */
const PRIVATE_CLASS_SLUGS = new Set(["release-train-engineer"]);

/** Official SAFe / Scaled Agile offerings — show Silver Partner trust footer. */
const SCALED_AGILE_COURSE_SLUGS = new Set([
  "leading-safe",
  "scrum-master",
  "product-owner-manager",
  "agile-product-management",
  "lean-portfolio-management",
  "safe-for-teams",
  "release-train-engineer",
  "devops",
  "responsible-ai",
  "value-stream-mapping",
  "ai-driven-scrum-master",
  "advanced-scrum-master",
]);

const PRIVATE_COURSE_LABELS: Record<string, string> = {
  "release-train-engineer": "SAFe Release Train Engineer (RTE)",
};

type Props = {
  courseSlug: string;
  children: ReactNode;
  /** Override auto-detection from PRIVATE_CLASS_SLUGS. */
  privateClass?: boolean;
  /** If set, private CTA calls this instead of the built-in modal. */
  onPrivateContactClick?: () => void;
  /** Override Scaled Agile Silver Partner footer (defaults on for SAFe course slugs). */
  showScaledAgilePartner?: boolean;
};

/** Compact sticky pricing card: glass shell, price block, what's-included, trust footer. */
export default function CourseHeroRightColumn({
  courseSlug,
  children,
  privateClass,
  onPrivateContactClick,
  showScaledAgilePartner,
}: Props) {
  const isPrivate = privateClass ?? PRIVATE_CLASS_SLUGS.has(courseSlug);
  const list = isPrivate ? null : COURSE_HERO_SCHEDULE_LIST_USD[courseSlug];
  const showPartner =
    showScaledAgilePartner ?? SCALED_AGILE_COURSE_SLUGS.has(courseSlug);
  const scheduleHref = `/courses/${courseSlug}/schedule?course=${courseSlug}`;
  const [showContactModal, setShowContactModal] = useState(false);
  const courseLabel =
    PRIVATE_COURSE_LABELS[courseSlug] ?? courseSlug.replace(/-/g, " ");

  function handlePrivateContact() {
    if (onPrivateContactClick) {
      onPrivateContactClick();
      return;
    }
    setShowContactModal(true);
  }

  return (
    <div className="lg:flex lg:justify-end">
      <div className="w-full max-w-[20.5rem] space-y-4">
        {isPrivate || list ? (
          <div className="liquid-glass overflow-hidden rounded-2xl lg:sticky lg:top-24">
            <div className="bg-gradient-to-r from-[#1f2c4a] to-[#33415f] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              {isPrivate ? "Private cohort" : "Live, instructor-led cohort"}
            </div>

            <div className="p-4">
              {isPrivate ? (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">
                    Pricing
                  </p>
                  <p
                    className="mt-1 text-[1.35rem] font-semibold leading-none text-[#1f2c4a]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Contact for pricing
                  </p>
                  <button
                    type="button"
                    onClick={handlePrivateContact}
                    className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1f2c4a] py-2.5 text-center text-[13px] font-semibold text-white transition hover:bg-[#16243f]"
                  >
                    Contact Us to Register
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m-6-6l6 6-6 6"
                      />
                    </svg>
                  </button>
                  <p className="mt-2 text-center text-[11px] leading-snug text-[#94a3b8]">
                    Private cohorts · dates arranged with your team
                  </p>
                </div>
              ) : list ? (
                <CourseHeroPriceScheduleCta
                  scheduleHref={scheduleHref}
                  currentUsd={list.current}
                  originalUsd={list.original}
                />
              ) : null}

              {children != null && children !== false ? (
                <div className="mt-4 border-t border-[#1f2c4a]/10 pt-3.5">
                  <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">
                    What&apos;s included
                  </p>
                  <div className="space-y-2.5 text-[13px] text-[#475569] [&>div]:space-y-2.5 [&_svg]:h-4 [&_svg]:w-4 [&_.space-y-4]:!space-y-2.5 [&_span]:text-[13px]">
                    {children}
                  </div>
                </div>
              ) : null}

              {showPartner ? (
                <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-[#1f2c4a]/[0.04] px-3 py-2.5">
                  <Image
                    src="/Silver.png"
                    alt="Scaled Agile Silver Partner"
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0 object-contain"
                  />
                  <p className="text-[11px] leading-snug text-[#475569]">
                    Official training under our{" "}
                    <span className="font-semibold text-[#1f2c4a]">
                      Scaled Agile Silver Partnership
                    </span>
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {isPrivate && !onPrivateContactClick ? (
        <PrivateCohortContactModal
          open={showContactModal}
          onClose={() => setShowContactModal(false)}
          courseSlug={courseSlug}
          courseLabel={courseLabel}
        />
      ) : null}
    </div>
  );
}
