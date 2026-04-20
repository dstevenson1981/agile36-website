import {
  type LocationSegment,
  cityDisplayFromSlug,
} from "@/app/lib/location-training-metadata";
import {
  instructorPersonNodesForCohorts,
  scheduleCohortInstructorField,
  type ScheduleCohortJsonLd,
  type ScheduleJsonLdFetchResult,
} from "@/app/lib/live-schedule-course-jsonld";
import { SAF_TRAINING_HUBS, type HubConfig } from "@/app/lib/saf-training-hubs";
import { SCHEMA_ORGANIZATION_ID, SCHEMA_VIRTUAL_CLASS_SCHEDULE } from "@/app/lib/schema-site";

const SITE = "https://www.agile36.com";
const ORG_ID = SCHEMA_ORGANIZATION_ID;

function pageUrl(segment: LocationSegment, citySlug: string): string {
  return `${SITE}/${segment}/${citySlug}`;
}

function courseInstanceBlock(
  hub: HubConfig,
  city: string,
  url: string,
  cohort: ScheduleCohortJsonLd,
  index: number
): Record<string, unknown> {
  return {
    "@type": "CourseInstance",
    "@id": `${url}#instance-${index + 1}`,
    url: `${url}#instance-${index + 1}`,
    name: `${hub.productLabel} cohort starting ${cohort.startDate} (${city} market)`,
    courseMode: "online",
    courseWorkload: hub.timeRequired,
    courseSchedule: { ...SCHEMA_VIRTUAL_CLASS_SCHEDULE },
    startDate: cohort.startDate,
    endDate: cohort.endDate,
    location: {
      "@type": "VirtualLocation",
      url,
      name: `Live virtual classroom (attend from ${city})`,
    },
    instructor: scheduleCohortInstructorField(cohort),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    offers: {
      "@type": "Offer",
      url: `${SITE}${hub.schedulePath}`,
      price: cohort.price,
      priceCurrency: cohort.currency,
    },
  };
}

function eventBlock(
  hub: HubConfig,
  city: string,
  url: string,
  courseId: string,
  cohort: ScheduleCohortJsonLd,
  index: number
): Record<string, unknown> {
  return {
    "@type": "Event",
    "@id": `${url}#event-${index + 1}`,
    name: `${hub.productLabel} — cohort ${cohort.startDate} (live virtual, ${city})`,
    description: `Public instructor-led ${hub.productLabel} session. Market page for ${city}; attend live online from anywhere.`,
    startDate: cohort.startDate,
    endDate: cohort.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    about: { "@id": courseId },
    location: {
      "@type": "VirtualLocation",
      url,
      name: `Attend from ${city} (live virtual)`,
    },
    organizer: { "@id": ORG_ID },
    performer: scheduleCohortInstructorField(cohort),
    offers: {
      "@type": "Offer",
      url: `${SITE}${hub.schedulePath}`,
      price: cohort.price,
      priceCurrency: cohort.currency,
      availability: "https://schema.org/InStock",
    },
    image: hub.imageUrl,
  };
}

/** City location JSON-LD: live cohorts from Supabase only when `status === 'ok'`. */
export function buildLocationTrainingJsonLd(
  segment: LocationSegment,
  citySlug: string,
  scheduleResult: ScheduleJsonLdFetchResult
): Record<string, unknown> {
  const city = cityDisplayFromSlug(citySlug);
  const hub = SAF_TRAINING_HUBS[segment];
  const url = pageUrl(segment, citySlug);
  const courseId = `${url}#course`;
  const pageId = `${url}#webpage`;

  const description = `Live virtual ${hub.productLabel} training for professionals in and around ${city}. Sessions are instructor-led by certified SAFe Program Consultants (SPCs), with cohort schedules published on Agile36. This ${city}-focused page explains how the curriculum applies to teams hiring in your metro while you attend remotely—no travel required.`;

  const hasSchedule =
    scheduleResult.status === "ok" && scheduleResult.cohorts.length > 0;

  const firstPrice = hasSchedule
    ? scheduleResult.cohorts[0].price
    : hub.price;
  const firstCurrency = hasSchedule
    ? scheduleResult.cohorts[0].currency
    : hub.currency;

  const persons = hasSchedule
    ? instructorPersonNodesForCohorts(scheduleResult.cohorts)
    : [];

  const hasCourseInstance = hasSchedule
    ? scheduleResult.cohorts.map((c, i) =>
        courseInstanceBlock(hub, city, url, c, i)
      )
    : undefined;

  const events = hasSchedule
    ? scheduleResult.cohorts.map((c, i) =>
        eventBlock(hub, city, url, courseId, c, i)
      )
    : [];

  const courseNode: Record<string, unknown> = {
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
      price: firstPrice,
      priceCurrency: firstCurrency,
      availability: "https://schema.org/InStock",
      url: `${SITE}${hub.schedulePath}`,
      category: "Training / Certification",
    },
    mainEntityOfPage: { "@id": pageId },
  };

  if (hasCourseInstance) {
    courseNode.hasCourseInstance = hasCourseInstance;
  }

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
      ...persons,
      courseNode,
      ...events,
    ],
  };
}
