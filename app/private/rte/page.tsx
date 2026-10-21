import { fetchActiveCourseSchedules } from "@/app/lib/fetch-active-course-schedules";
import { RTE_SCHEDULE_LINK_ENABLED } from "@/app/lib/rte-public-weekend";
import PrivateRteScheduleClient from "./PrivateRteScheduleClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PrivateRtePage() {
  const initialSchedules = RTE_SCHEDULE_LINK_ENABLED
    ? await fetchActiveCourseSchedules("release-train-engineer", { includeHidden: true })
    : [];
  return <PrivateRteScheduleClient initialSchedules={initialSchedules} />;
}
