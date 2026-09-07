import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";
import { fetchActiveCourseSchedules } from "@/app/lib/fetch-active-course-schedules";
import PopmCourseLanding from "./PopmCourseLanding";

export const dynamic = "force-dynamic";

export default async function ProductOwnerManagerPage() {
  const slug = "product-owner-manager";
  const initialSchedules = await fetchActiveCourseSchedules(slug);
  return <PopmCourseLanding content={getCatalogLanding(slug)} initialSchedules={initialSchedules} />;
}
