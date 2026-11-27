import { redirect } from "next/navigation";

export default async function PayLaterSuccessRedirect({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string; email?: string }>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (params.payment_intent) query.set("payment_intent", params.payment_intent);
  if (params.email) query.set("email", params.email);
  const suffix = query.toString();
  redirect(suffix ? `/prepaid-training/success?${suffix}` : "/prepaid-training/success");
}
