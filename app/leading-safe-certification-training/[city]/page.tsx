import type { Metadata } from "next";
import LocationPageClient from "./LocationPageClient";
import { LocationTrainingCityShell } from "@/app/components/location-training/LocationTrainingCityShell";
import { buildLocationTrainingMetadata } from "@/app/lib/location-training-metadata";
import { generateLocationStaticParams } from "@/app/lib/location-training-pages";

export const revalidate = 3600;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return generateLocationStaticParams("leading-safe-certification-training");
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const metadata = buildLocationTrainingMetadata(
    "leading-safe-certification-training",
    city
  );
  if (city !== "new-york") return metadata;
  const courseUrl = "https://www.agile36.com/courses/leading-safe";
  return {
    ...metadata,
    alternates: { canonical: courseUrl },
    openGraph: {
      ...metadata.openGraph,
      url: courseUrl,
    },
  };
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  return (
    <LocationTrainingCityShell
      segment="leading-safe-certification-training"
      citySlug={city}
    >
      <LocationPageClient />
    </LocationTrainingCityShell>
  );
}
