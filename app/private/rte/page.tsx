import { fetchActiveCourseSchedules } from "@/app/lib/fetch-active-course-schedules";
import PrivateRteScheduleClient from "./PrivateRteScheduleClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PrivateRtePage() {
  const initialSchedules = await fetchActiveCourseSchedules("release-train-engineer", {
    includeHidden: true,
  });
  return <PrivateRteScheduleClient initialSchedules={initialSchedules} />;
}
