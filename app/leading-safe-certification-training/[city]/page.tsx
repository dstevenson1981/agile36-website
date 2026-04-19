import type { Metadata } from "next";
import LocationPageClient from "./LocationPageClient";
import { LocationTrainingCityShell } from "@/app/components/location-training/LocationTrainingCityShell";
import { buildLocationTrainingMetadata } from "@/app/lib/location-training-metadata";

export const revalidate = 3600;

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return buildLocationTrainingMetadata("leading-safe-certification-training", city);
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
