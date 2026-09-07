import VisitorsBoard from "./VisitorsBoard";
import { loadVisitors } from "@/app/lib/hyper/load-visitors";

export const dynamic = "force-dynamic";

export default async function AdminVisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  const initial = await loadVisitors(200);
  return <VisitorsBoard initial={initial} openId={v ?? null} />;
}
