import type { LocationSegment } from "@/app/lib/location-training-metadata";

const SITE = "https://www.agile36.com";

export type HubConfig = {
  /** Matches `course_schedules.course_slug` for live JSON-LD cohorts. */
  courseSlug: string;
  coursePath: string;
  schedulePath: string;
  imageUrl: string;
  /** Short label for Event/CourseInstance naming */
  productLabel: string;
  credentialName: string;
  recognizedByName: string;
  recognizedByUrl: string;
  teaches: string[];
  timeRequired: string;
  /** Default list price when no upcoming rows (Course.offers only). */
  price: number;
  currency: string;
};

/** SAFe hubs: metadata + `courseSlug` for Supabase schedules (no synthetic cohort dates). */
export const SAF_TRAINING_HUBS: Record<LocationSegment, HubConfig> = {
  "leading-safe-certification-training": {
    courseSlug: "leading-safe",
    coursePath: "/courses/leading-safe",
    schedulePath: "/courses/leading-safe/schedule",
    imageUrl: `${SITE}/Leading%20SAFe.png`,
    productLabel: "Leading SAFe® 6.0 / SAFe Agilist",
    credentialName: "SAFe Agilist (SA) Certification",
    recognizedByName: "Scaled Agile, Inc.",
    recognizedByUrl: "https://scaledagile.com",
    teaches: [
      "Lean-Agile leadership at enterprise scale",
      "Program Increment planning and execution",
      "Value stream and portfolio alignment",
    ],
    timeRequired: "PT16H",
    price: 515,
    currency: "USD",
  },
  "scrum-master-certification-training": {
    courseSlug: "scrum-master",
    coursePath: "/courses/scrum-master",
    schedulePath: "/courses/scrum-master/schedule",
    imageUrl: `${SITE}/SSM.jpeg`,
    productLabel: "SAFe® Scrum Master (SSM)",
    credentialName: "SAFe Scrum Master (SSM) Certification",
    recognizedByName: "Scaled Agile, Inc.",
    recognizedByUrl: "https://scaledagile.com",
    teaches: [
      "Facilitating Agile teams on an Agile Release Train",
      "PI execution, iteration goals, and team coaching",
      "Removing impediments at team and program level",
    ],
    timeRequired: "PT16H",
    price: 515,
    currency: "USD",
  },
  "release-train-engineer-certification-training": {
    courseSlug: "release-train-engineer",
    coursePath: "/courses/release-train-engineer",
    schedulePath: "/contact?course=release-train-engineer",
    imageUrl: `${SITE}/RTE.png`,
    productLabel: "SAFe® Release Train Engineer (RTE)",
    credentialName: "SAFe Release Train Engineer (RTE) Certification",
    recognizedByName: "Scaled Agile, Inc.",
    recognizedByUrl: "https://scaledagile.com",
    teaches: [
      "PI Planning facilitation and ART execution",
      "Coaching teams, Scrum Masters, and Product Owners",
      "Program-level risk, dependency, and flow management",
    ],
    timeRequired: "PT24H",
    price: 995,
    currency: "USD",
  },
  "safe-for-teams-certification-training": {
    courseSlug: "safe-for-teams",
    coursePath: "/courses/safe-for-teams",
    schedulePath: "/courses/safe-for-teams/schedule",
    imageUrl: `${SITE}/SAFe%20for%20Teams.png`,
    productLabel: "SAFe for Teams / SAFe Practitioner (SP)",
    credentialName: "SAFe Practitioner (SP) Certification",
    recognizedByName: "Scaled Agile, Inc.",
    recognizedByUrl: "https://scaledagile.com",
    teaches: [
      "Team-level Scrum, Kanban, and XP inside SAFe",
      "Iteration planning, backlog refinement, and demos",
      "Collaborating effectively during PI Planning",
    ],
    timeRequired: "PT16H",
    price: 599,
    currency: "USD",
  },
  "lean-portfolio-management-certification-training": {
    courseSlug: "lean-portfolio-management",
    coursePath: "/courses/lean-portfolio-management",
    schedulePath: "/courses/lean-portfolio-management/schedule",
    imageUrl: `${SITE}/Lean%20Portfolio.png`,
    productLabel: "SAFe Lean Portfolio Management (LPM)",
    credentialName: "SAFe Lean Portfolio Manager (LPM) Certification",
    recognizedByName: "Scaled Agile, Inc.",
    recognizedByUrl: "https://scaledagile.com",
    teaches: [
      "Strategy and investment funding in a Lean portfolio",
      "Epic hypothesis, governance, and guardrails",
      "Connecting portfolio decisions to Agile delivery",
    ],
    timeRequired: "PT16H",
    price: 1395,
    currency: "USD",
  },
  "safe-product-owner-product-manager-certification-training": {
    courseSlug: "product-owner-manager",
    coursePath: "/courses/product-owner-manager",
    schedulePath: "/courses/product-owner-manager/schedule",
    imageUrl: `${SITE}/POPM.jpg`,
    productLabel: "SAFe Product Owner / Product Manager (POPM)",
    credentialName: "SAFe Product Owner / Product Manager (POPM) Certification",
    recognizedByName: "Scaled Agile, Inc.",
    recognizedByUrl: "https://scaledagile.com",
    teaches: [
      "Customer-centric backlog design and prioritization",
      "PI objectives, WSJF prioritization, and solution context",
      "PM/PO collaboration across the ART",
    ],
    timeRequired: "PT16H",
    price: 545,
    currency: "USD",
  },
  "agile-product-management-certification-training": {
    courseSlug: "agile-product-management",
    coursePath: "/courses/agile-product-management",
    schedulePath: "/courses/agile-product-management/schedule",
    imageUrl: `${SITE}/AgileProductManagment.png`,
    productLabel: "SAFe Agile Product Management (APM)",
    credentialName: "SAFe Agile Product Management Certification",
    recognizedByName: "Scaled Agile, Inc.",
    recognizedByUrl: "https://scaledagile.com",
    teaches: [
      "Continuous exploration and design thinking in SAFe",
      "Roadmaps, epics, and solution intent",
      "Aligning product strategy to delivery outcomes",
    ],
    timeRequired: "PT24H",
    price: 1495,
    currency: "USD",
  },
};
