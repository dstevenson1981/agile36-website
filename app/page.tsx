import type { Metadata } from "next";
import HomeExperience from "./components/home/HomeExperience";
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
  title: "Agile36 — Expert SAFe, Agile, AI & Product Management Training",
  description:
    "Expert training in Agile, AI, and product management. Live virtual SAFe, Agile, and certification cohorts from a Scaled Agile Silver Partner — instructor-led by certified SAFe Program Consultants (SPCs).",
  alternates: {
    canonical: "https://www.agile36.com/",
  },
  openGraph: {
    title: "Agile36 — Expert SAFe, Agile, AI & Product Management Training",
    description:
      "Expert training in Agile, AI, and product management. Live virtual SAFe and certification training from a Scaled Agile Silver Partner.",
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
      <HomeExperience />
    </>
  );
}
