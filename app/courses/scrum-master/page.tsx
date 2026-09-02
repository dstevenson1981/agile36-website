import CatalogCourseLanding from "@/app/components/catalog/CatalogCourseLanding";
import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";
import { fetchActiveCourseSchedules } from "@/app/lib/fetch-active-course-schedules";

export const dynamic = "force-dynamic";

export default async function ScrumMasterPage() {
  const slug = "scrum-master";
  const initialSchedules = await fetchActiveCourseSchedules(slug);
  return <CatalogCourseLanding content={getCatalogLanding(slug)} initialSchedules={initialSchedules} />;
}
