import { redirect } from "next/navigation";

export default async function PayLaterRedirect({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  redirect(course ? `/prepaid-training?course=${encodeURIComponent(course)}` : "/prepaid-training");
}
