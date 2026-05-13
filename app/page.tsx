import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import {
  SCHEMA_INSTRUCTOR_DEADRA_STEVENSON_ID,
  SCHEMA_INSTRUCTOR_JOE_PUOCI_ID,
  SCHEMA_INSTRUCTOR_MARCUS_BALL_ID,
  SCHEMA_INSTRUCTOR_PERSON_NODES,
} from "./lib/schema-site";

/** Sitewide Person @id anchors so course JSON-LD instructor references resolve beyond a single page graph. */
const homepageInstructorPersonGraph = {
  "@context": "https://schema.org",
  "@graph": [
    SCHEMA_INSTRUCTOR_PERSON_NODES[SCHEMA_INSTRUCTOR_DEADRA_STEVENSON_ID],
    SCHEMA_INSTRUCTOR_PERSON_NODES[SCHEMA_INSTRUCTOR_MARCUS_BALL_ID],
    SCHEMA_INSTRUCTOR_PERSON_NODES[SCHEMA_INSTRUCTOR_JOE_PUOCI_ID],
  ],
};

export const metadata: Metadata = {
  title: "Agile36 (2026) — Expert SAFe, Agile, AI & Product Management Training",
  description:
    "2026 live virtual cohorts: SAFe, Agile, AI, and product management certification training. Scaled Agile Silver Partner. Instructor-led by certified SAFe Program Consultants (SPCs).",
  alternates: {
    canonical: "https://www.agile36.com/",
  },
  openGraph: {
    title: "Agile36 (2026) — SAFe, Agile, AI & Product Training",
    description:
      "2026 live virtual cohorts: SAFe, Agile, AI, and product management certification training. Scaled Agile Silver Partner.",
    url: "https://www.agile36.com/",
    siteName: "Agile36",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageInstructorPersonGraph),
        }}
      />
      <HomePageClient />
    </>
  );
}
