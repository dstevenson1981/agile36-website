"use client";

import Link from "next/link";

type EnrollNowLinkProps = {
  courseSlug: string;
  scheduleId: string;
  quantity: number;
  className?: string;
  label?: string;
};

export default function EnrollNowLink({
  courseSlug,
  scheduleId,
  quantity,
  className,
  label = "ENROLL NOW",
}: EnrollNowLinkProps) {
  const href = `/courses/${courseSlug}/schedule/checkout?schedule=${scheduleId}&course=${courseSlug}&quantity=${quantity}`;

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}
