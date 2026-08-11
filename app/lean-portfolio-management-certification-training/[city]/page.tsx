import type { Metadata } from "next";
import LocationPageClient from "./LocationPageClient";
import { LocationTrainingCityShell } from "@/app/components/location-training/LocationTrainingCityShell";
import { buildLocationTrainingMetadata } from "@/app/lib/location-training-metadata";
import { generateLocationStaticParams } from "@/app/lib/location-training-pages";

export const revalidate = 3600;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return generateLocationStaticParams("lean-portfolio-management-certification-training");
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return buildLocationTrainingMetadata(
    "lean-portfolio-management-certification-training",
    city
  );
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  return (
    <LocationTrainingCityShell
      segment="lean-portfolio-management-certification-training"
      citySlug={city}
    >
      <LocationPageClient />
    </LocationTrainingCityShell>
  );
}
