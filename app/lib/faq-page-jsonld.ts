import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";

type ExtraQuestion = { q: string; a: string };

/** FAQPage JSON-LD from the questions actually rendered on the course page. */
export function faqPageJsonLd(slug: string, extra: ExtraQuestion[] = []) {
  const seen = new Set<string>();
  const items = [
    ...extra.map((item) => ({ q: item.q, a: item.a })),
    ...Object.values(getCatalogLanding(slug).faqs).flat(),
  ].filter((item) => {
    if (seen.has(item.q)) return false;
    seen.add(item.q);
    return true;
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
