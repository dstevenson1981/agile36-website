import type { Metadata } from "next";
import LocationPageClient from "./LocationPageClient";
import { LocationTrainingCityShell } from "@/app/components/location-training/LocationTrainingCityShell";
import { buildLocationTrainingMetadata } from "@/app/lib/location-training-metadata";
import { generateLocationStaticParams } from "@/app/lib/location-training-pages";

export const revalidate = 3600;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return generateLocationStaticParams("release-train-engineer-certification-training");
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return buildLocationTrainingMetadata(
    "release-train-engineer-certification-training",
    city
  );
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  return (
    <LocationTrainingCityShell
      segment="release-train-engineer-certification-training"
      citySlug={city}
    >
      <LocationPageClient />
    </LocationTrainingCityShell>
  );
}
