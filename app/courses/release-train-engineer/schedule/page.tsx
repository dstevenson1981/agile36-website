import type { Metadata } from "next";
import { fetchActiveCourseSchedules } from "@/app/lib/fetch-active-course-schedules";
import PrivateRteScheduleClient from "@/app/private/rte/PrivateRteScheduleClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "RTE Class Schedule | Agile36",
  description: "Upcoming SAFe Release Train Engineer class dates from Agile36.",
  robots: { index: false, follow: false },
};

export default async function RteSchedulePage() {
  const initialSchedules = await fetchActiveCourseSchedules("release-train-engineer", {
    includeHidden: true,
  });
  return <PrivateRteScheduleClient initialSchedules={initialSchedules} />;
}
