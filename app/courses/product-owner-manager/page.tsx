import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";
import { fetchActiveCourseSchedules } from "@/app/lib/fetch-active-course-schedules";
import PopmStorefront from "./PopmStorefront";

export const dynamic = "force-dynamic";

export default async function ProductOwnerManagerPage() {
  const slug = "product-owner-manager";
  const initialSchedules = await fetchActiveCourseSchedules(slug);
  return <PopmStorefront content={getCatalogLanding(slug)} initialSchedules={initialSchedules} />;
}
