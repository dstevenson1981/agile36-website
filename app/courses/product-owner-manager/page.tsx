import ProductOwnerManagerCoursePage from "./ProductOwnerManagerCoursePage";
import { fetchActiveCourseSchedules } from "@/app/lib/fetch-active-course-schedules";

export const dynamic = "force-dynamic";

export default async function ProductOwnerManagerPage() {
  const initialSchedules = await fetchActiveCourseSchedules("product-owner-manager");
  return <ProductOwnerManagerCoursePage initialSchedules={initialSchedules} />;
}
