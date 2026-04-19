import type { Metadata } from "next";
import LocationPageClient from "./LocationPageClient";
import { buildLocationTrainingMetadata } from "@/app/lib/location-training-metadata";

export const revalidate = 3600;

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return buildLocationTrainingMetadata("scrum-master-certification-training", city);
}

export default function Page() {
  return <LocationPageClient />;
}
