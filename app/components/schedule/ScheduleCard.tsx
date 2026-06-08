"use client";

import { useState } from "react";
import EnrollNowLink from "@/app/components/schedule/EnrollNowLink";
import ScheduleInstructorRow from "@/app/components/schedule/ScheduleInstructorRow";
import {
  calculateDiscount,
  formatDateRange,
  formatTimeShort,
  formatTimezoneLabel,
  getScheduleUrgency,
  getTimeSlotColor,
  getTimeSlotLabel,
  type CourseScheduleRow,
} from "@/app/lib/schedule-display";
import { BANNER_COUPON_CODE, isSitePromoActive } from "@/app/lib/site-promo";

type ScheduleCardProps = {
  schedule: CourseScheduleRow;
  courseSlug: string;
  quantity: number;
  onQuantityChange: (delta: number) => void;
  onGroupInquiry: () => void;
  brochureHref?: string;
  onBrochureClick?: () => void;
  brochureLabel?: string;
  examLabel?: string;
  showSafeBadges?: boolean;
  enrollLabel?: string;
};

function TimeSlotIcon({ timeSlot }: { timeSlot?: string }) {
  if (timeSlot === "afternoon") {
    return (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 0a1 1 0 100 2H3a1 1 0 100-2h3zM3.05 6.464A1 1 0 104.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM17 11a9 9 0 11-18 0 9 9 0 0118 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (timeSlot === "evening") {
    return (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    );
  }
  return (
    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 100 2h.01a1 1 0 100-2H10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BrochureLink({
  href,
  onClick,
  label,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
}) {
  const className =
    "inline-flex items-center gap-2 text-sm font-medium text-[#1a56db] hover:text-[#0f3d99] hover:underline transition-colors";

  const icon = (
    <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {icon}
        {label}
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }

  if (href) {
    return (
      <a href={href} download target="_blank" rel="noopener noreferrer" className={className}>
        {icon}
        {label}
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    );
  }

  return null;
}

export default function ScheduleCard({
  schedule,
  courseSlug,
  quantity,
  onQuantityChange,
  onGroupInquiry,
  brochureHref,
  onBrochureClick,
  brochureLabel = "Download Curriculum",
  examLabel,
  showSafeBadges = false,
  enrollLabel = "Enroll Now",
}: ScheduleCardProps) {
  const [shareCopied, setShareCopied] = useState(false);
  const urgency = getScheduleUrgency(schedule);
  const totalPrice = (parseFloat(schedule.price) * quantity).toFixed(2);
  const unitPrice = parseFloat(schedule.price);
  const discount = schedule.original_price
    ? calculateDiscount(parseFloat(schedule.original_price), unitPrice)
    : 0;
  const promoActive = isSitePromoActive();
  const hasBrochure = Boolean(brochureHref || onBrochureClick);
  const tzLabel = formatTimezoneLabel(schedule.timezone);
  const batchType = schedule.is_weekend === true ? "Weekend" : "Weekday";

  const handleShare = async () => {
    const url = `${window.location.origin}/courses/${courseSlug}/schedule/checkout?schedule=${schedule.id}&course=${courseSlug}&quantity=${quantity}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Agile36 Course", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 2000);
    } catch {
      /* user cancelled share */
    }
  };

  const columnDivider =
    "relative lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-5 lg:before:bottom-5 lg:before:w-0 lg:before:border-l lg:before:border-dotted lg:before:border-gray-300";

  return (
    <article className="overflow-hidden rounded-[10px] border border-[#e0e0e0] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Left — schedule & instructor */}
        <div className="flex flex-col gap-4 p-5 lg:p-6">
          <div className="flex items-start gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getTimeSlotColor(schedule.time_slot)}`}
            >
              <TimeSlotIcon timeSlot={schedule.time_slot} />
              {getTimeSlotLabel(schedule.time_slot)}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              {formatDateRange(schedule.start_date, schedule.end_date)}
            </h3>
            <p className="mt-1.5 text-sm text-gray-500">
              {tzLabel} • {formatTimeShort(schedule.start_time || "")} –{" "}
              {formatTimeShort(schedule.end_time || "")}
              {schedule.duration ? ` • ${schedule.duration}` : ""}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-600">
              <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Online • {batchType} Batch
            </p>
          </div>

          <div className="border-t border-dotted border-gray-300 pt-4">
            <ScheduleInstructorRow
              instructorName={schedule.instructor_name}
              instructorImage={schedule.instructor_image}
              language={schedule.language}
              examIncluded={schedule.exam_included}
              examLabel={examLabel}
              variant="prominent"
            />
          </div>

          {showSafeBadges && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                SAFe
              </span>
              <span className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                Silver Partner
              </span>
            </div>
          )}
        </div>

        {/* Middle — curriculum, qty, urgency */}
        <div
          className={`flex flex-col items-center justify-between gap-5 border-t border-dotted border-gray-300 p-5 mx-5 lg:mx-0 lg:border-t-0 lg:p-6 ${columnDivider}`}
        >
          {hasBrochure && (
            <div className="w-full">
              <BrochureLink href={brochureHref} onClick={onBrochureClick} label={brochureLabel} />
            </div>
          )}

          <div className="flex items-center rounded-lg border border-gray-200 bg-white px-1 py-1 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
            <button
              type="button"
              onClick={() => onQuantityChange(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-lg text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-10 text-center text-base font-semibold text-gray-900">{quantity}</span>
            <button
              type="button"
              onClick={() => onQuantityChange(1)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-lg text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {urgency.show && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {urgency.message}
            </p>
          )}

          <button
            type="button"
            onClick={onGroupInquiry}
            className="text-center text-sm text-[#1a56db] hover:underline"
          >
            More than 5 participants? <span className="font-semibold">Enquire Now »</span>
          </button>
        </div>

        {/* Right — pricing & CTA */}
        <div
          className={`flex flex-col gap-4 border-t border-dotted border-gray-300 p-5 mx-5 lg:mx-0 lg:border-t-0 lg:p-6 ${columnDivider}`}
        >
          <div className="flex flex-wrap items-start justify-end gap-2">
            {schedule.is_best_deal && (
              <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900 ring-1 ring-amber-300">
                Best Deal
              </span>
            )}
            {promoActive && (
              <span className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-800 ring-1 ring-orange-200">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414L12.5 9.414l4.293 4.293a1 1 0 001.414-1.414l-5-6z"
                    clipRule="evenodd"
                  />
                </svg>
                Use {BANNER_COUPON_CODE}
              </span>
            )}
          </div>

          <div className="text-right">
            {schedule.original_price && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-gray-400 line-through">USD {schedule.original_price}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px]">%</span>
                  {discount}% OFF
                </span>
              </div>
            )}
            <p className="mt-1 text-3xl font-bold tracking-tight text-[#01203d]">USD {totalPrice}</p>
          </div>

          <div className="flex items-center gap-2">
            <EnrollNowLink
              courseSlug={courseSlug}
              scheduleId={schedule.id}
              quantity={quantity}
              label={enrollLabel}
              className="flex-1 rounded-lg bg-gradient-to-b from-[#ff6b35] to-[#e8381a] px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:from-[#ff7a48] hover:to-[#fa4a23] hover:shadow-md"
            />
            <button
              type="button"
              onClick={handleShare}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              title={shareCopied ? "Link copied!" : "Share enrollment link"}
              aria-label="Share enrollment link"
            >
              {shareCopied ? (
                <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
