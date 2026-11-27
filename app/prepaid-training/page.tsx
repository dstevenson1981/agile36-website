import type { Metadata } from "next";
import Link from "next/link";
import { listPayLaterOffers } from "@/app/lib/pay-later";
import { PREPAID_TRAINING_FAQS } from "@/app/lib/prepaid-training-faqs";

export const metadata: Metadata = {
  title: "Prepaid Training | Agile36",
  description:
    "Pay for an Agile36 course now and choose the live date later. The credit stays on your account until you confirm a class.",
};

export default async function PrepaidTrainingPage() {
  const offers = listPayLaterOffers();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PREPAID_TRAINING_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="bg-white text-[#111111]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="border-b border-[#EAEAEA] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8860B]">Prepaid Training</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Pay now. Get a credit. Book the date from your account.</h1>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-7 text-[#374151]">
            <li>Pay for the seat. You do not pick a date, and you are not enrolled in a class yet.</li>
            <li>Create an account with the same email, or log in if you already have one. The page after payment walks you through it.</li>
            <li>Your credit shows in My Account.</li>
            <li>When you are ready to book, open My Account and pick the date. That registers you. There is no second charge.</li>
          </ol>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Choose a course</h2>
          <ul className="mt-4 divide-y divide-[#EAEAEA] border-y border-[#EAEAEA]">
            {offers.map((offer) => (
              <li key={offer.slug} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm text-[#111111]">{offer.courseName}</span>
                <Link
                  href={`/courses/${offer.slug}/schedule/checkout?course=${encodeURIComponent(offer.slug)}&prepaid=1`}
                  className="shrink-0 text-sm font-semibold text-[#B8860B] hover:underline"
                >
                  Pay ${offer.price.toLocaleString("en-US")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[#EAEAEA] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Prepaid Training questions</h2>
          <div className="mt-6 space-y-6">
            {PREPAID_TRAINING_FAQS.map((item) => (
              <div key={item.q}>
                <h3 className="text-lg font-semibold text-[#111111]">{item.q}</h3>
                <p className="mt-2 text-base leading-7 text-[#374151]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
