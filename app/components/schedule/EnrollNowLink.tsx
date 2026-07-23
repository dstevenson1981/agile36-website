"use client";

import Link from "next/link";

type EnrollNowLinkProps = {
  courseSlug: string;
  scheduleId: string;
  quantity: number;
  className?: string;
  label?: string;
  /** Override default `/courses/{slug}/schedule/checkout` (e.g. private RTE path). */
  checkoutBasePath?: string;
};

export default function EnrollNowLink({
  courseSlug,
  scheduleId,
  quantity,
  className,
  label = "ENROLL NOW",
  checkoutBasePath,
}: EnrollNowLinkProps) {
  const base = checkoutBasePath ?? `/courses/${courseSlug}/schedule/checkout`;
  const href = `${base}?schedule=${scheduleId}&course=${courseSlug}&quantity=${quantity}`;

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}
