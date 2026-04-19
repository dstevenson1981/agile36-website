import Link from "next/link";
import type { LocationSegment } from "@/app/lib/location-training-metadata";
import { buildLocationTrainingJsonLd } from "@/app/lib/location-training-jsonld";
import { buildLocalLocationContent } from "@/app/lib/location-training-local-content";

export function LocationTrainingCityShell({
  segment,
  citySlug,
  children,
}: {
  segment: LocationSegment;
  citySlug: string;
  children: React.ReactNode;
}) {
  const graph = buildLocationTrainingJsonLd(segment, citySlug);
  const local = buildLocalLocationContent(segment, citySlug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <section className="border-b border-gray-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-20">
          <h2 className="mb-4 text-2xl font-bold text-[#01203d]">{local.heading}</h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            {local.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-700">
            {local.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href={local.scheduleCta.href}
              className="inline-flex items-center font-semibold text-[#0e78c2] hover:text-[#01203d] underline-offset-2 hover:underline"
            >
              {local.scheduleCta.label}
            </Link>
          </div>
        </div>
      </section>
      {children}
    </>
  );
}
