import {
  type LocationSegment,
  cityDisplayFromSlug,
} from "@/app/lib/location-training-metadata";
import { SCHEMA_ORGANIZATION_ID } from "@/app/lib/schema-site";

const SITE = "https://www.agile36.com";
const ORG_ID = SCHEMA_ORGANIZATION_ID;

type HubConfig = {
  coursePath: string;
  schedulePath: string;
  imageUrl: string;
  /** Short label for Event/Course names */
  productLabel: string;
  credentialName: string;
  recognizedByName: string;
  recognizedByUrl: string;
  teaches: string[];
  timeRequired: string;
  cohort: {
    startDate: string;
    endDate: string;
    instructor: string;
    price: number;
    currency: string;
  };
};

const HUBS: Record<LocationSegment, HubConfig> = {
  "leading-safe-certification-training": {
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
    cohort: {
      startDate: "2026-05-12",
      endDate: "2026-05-13",
      instructor: "Joe Puoci",
      price: 515,
      currency: "USD",
    },
  },
  "scrum-master-certification-training": {
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
    cohort: {
      startDate: "2026-05-19",
      endDate: "2026-05-20",
      instructor: "Deadra Stevenson",
      price: 515,
      currency: "USD",
    },
  },
  "release-train-engineer-certification-training": {
    coursePath: "/courses/release-train-engineer",
    schedulePath: "/courses/release-train-engineer/schedule",
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
    cohort: {
      startDate: "2026-06-02",
      endDate: "2026-06-04",
      instructor: "Marcus Ball",
      price: 995,
      currency: "USD",
    },
  },
  "safe-for-teams-certification-training": {
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
    cohort: {
      startDate: "2026-06-09",
      endDate: "2026-06-10",
      instructor: "Joe Puoci",
      price: 515,
      currency: "USD",
    },
  },
  "lean-portfolio-management-certification-training": {
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
    cohort: {
      startDate: "2026-06-16",
      endDate: "2026-06-17",
      instructor: "Deadra Stevenson",
      price: 515,
      currency: "USD",
    },
  },
  "safe-product-owner-product-manager-certification-training": {
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
    cohort: {
      startDate: "2026-06-23",
      endDate: "2026-06-24",
      instructor: "Marcus Ball",
      price: 515,
      currency: "USD",
    },
  },
  "agile-product-management-certification-training": {
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
    timeRequired: "PT16H",
    cohort: {
      startDate: "2026-06-30",
      endDate: "2026-07-01",
      instructor: "Deadra Stevenson",
      price: 995,
      currency: "USD",
    },
  },
};

function pageUrl(segment: LocationSegment, citySlug: string): string {
  return `${SITE}/${segment}/${citySlug}`;
}

/** Deterministic JSON-LD: BreadcrumbList + Course (with CourseInstance) + Event for the same cohort window. */
export function buildLocationTrainingJsonLd(
  segment: LocationSegment,
  citySlug: string
): Record<string, unknown> {
  const city = cityDisplayFromSlug(citySlug);
  const hub = HUBS[segment];
  const url = pageUrl(segment, citySlug);
  const courseId = `${url}#course`;
  const eventId = `${url}#event`;
  const pageId = `${url}#webpage`;

  const description = `Live virtual ${hub.productLabel} training for professionals in and around ${city}. Sessions are instructor-led by certified SAFe Program Consultants (SPCs), with cohort schedules published on Agile36. This ${city}-focused page explains how the curriculum applies to teams hiring in your metro while you attend remotely—no travel required.`;

  const { cohort } = hub;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Courses",
            item: `${SITE}/courses`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: hub.productLabel,
            item: `${SITE}${hub.coursePath}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: city,
            item: url,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url,
        name: `${hub.productLabel} in ${city} | Agile36`,
        description,
        isPartOf: { "@type": "WebSite", name: "Agile36", url: SITE },
        about: { "@id": courseId },
      },
      {
        "@type": "Course",
        "@id": courseId,
        name: `${hub.productLabel} — live virtual for ${city} professionals`,
        url,
        description,
        image: hub.imageUrl,
        inLanguage: "en-US",
        timeRequired: hub.timeRequired,
        teaches: hub.teaches,
        provider: { "@id": ORG_ID },
        educationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          name: hub.credentialName,
          credentialCategory: "certification",
          recognizedBy: {
            "@type": "Organization",
            name: hub.recognizedByName,
            url: hub.recognizedByUrl,
          },
        },
        offers: {
          "@type": "Offer",
          price: cohort.price,
          priceCurrency: cohort.currency,
          availability: "https://schema.org/InStock",
          url: `${SITE}${hub.schedulePath}`,
          category: "Training / Certification",
        },
        hasCourseInstance: [
          {
            "@type": "CourseInstance",
            name: `${hub.productLabel} cohort (${city} market)`,
            courseMode: "online",
            courseWorkload: hub.timeRequired,
            startDate: cohort.startDate,
            endDate: cohort.endDate,
            location: {
              "@type": "VirtualLocation",
              url,
              name: `Live virtual classroom (attend from ${city})`,
            },
            instructor: {
              "@type": "Person",
              name: cohort.instructor,
              jobTitle: "SAFe Program Consultant (SPC)",
            },
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            offers: {
              "@type": "Offer",
              url: `${SITE}${hub.schedulePath}`,
              price: cohort.price,
              priceCurrency: cohort.currency,
            },
          },
        ],
        mainEntityOfPage: { "@id": pageId },
      },
      {
        "@type": "Event",
        "@id": eventId,
        name: `${hub.productLabel} — live virtual session window (${city})`,
        description: `Public instructor-led cohort aligned to Agile36’s published schedule. Market page for ${city}; delivery is online.`,
        startDate: cohort.startDate,
        endDate: cohort.endDate,
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        location: {
          "@type": "VirtualLocation",
          url,
          name: `Attend from ${city} (live virtual)`,
        },
        organizer: { "@id": ORG_ID },
        performer: {
          "@type": "Person",
          name: cohort.instructor,
          jobTitle: "SAFe Program Consultant (SPC)",
        },
        offers: {
          "@type": "Offer",
          url: `${SITE}${hub.schedulePath}`,
          price: cohort.price,
          priceCurrency: cohort.currency,
          availability: "https://schema.org/InStock",
        },
        image: hub.imageUrl,
      },
    ],
  };
}
