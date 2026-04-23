/** Single canonical @id for Agile36 org JSON-LD (root layout defines the entity). */
export const SCHEMA_ORGANIZATION_ID = "https://www.agile36.com/#organization" as const;

/** WebSite entity @id (paired with EducationalOrganization in root JSON-LD). */
export const SCHEMA_WEBSITE_ID = "https://www.agile36.com/#website" as const;

/** Public brand logo (`public/logo.png`). */
export const SCHEMA_ORGANIZATION_LOGO_URL = "https://www.agile36.com/logo.png" as const;

/** Intrinsic dimensions of `public/logo.png` (for JSON-LD ImageObject). */
export const SCHEMA_ORGANIZATION_LOGO_WIDTH = 1280;
export const SCHEMA_ORGANIZATION_LOGO_HEIGHT = 853;

/** Default Open Graph / article image (place file at `public/og/agile36-default.png`). */
export const SCHEMA_DEFAULT_OG_IMAGE_URL =
  "https://www.agile36.com/og/agile36-default.png" as const;

export const SCHEMA_DEFAULT_OG_IMAGE_WIDTH = 1200;
export const SCHEMA_DEFAULT_OG_IMAGE_HEIGHT = 630;

export const SCALED_AGILE_TRAINING_FEEDBACK_URL =
  "https://training.scaledagile.com/?sort=feedbackScore&page=1&limit=25" as const;

/** Typical published virtual class window (US Eastern) for `CourseInstance.courseSchedule`. */
export const SCHEMA_VIRTUAL_CLASS_SCHEDULE = {
  "@type": "Schedule",
  startTime: "09:00",
  endTime: "17:00",
  scheduleTimezone: "America/New_York",
} as const;

/** `@id` targets for recurring instructors (referenced from CourseInstance / Event JSON-LD). */
export const SCHEMA_INSTRUCTOR_MARCUS_BALL_ID =
  "https://www.agile36.com/#instructor-marcus-ball" as const;
export const SCHEMA_INSTRUCTOR_DEADRA_STEVENSON_ID =
  "https://www.agile36.com/#instructor-deadra-stevenson" as const;
export const SCHEMA_INSTRUCTOR_JOE_PUOCI_ID =
  "https://www.agile36.com/#instructor-joe-puoci" as const;

export const SCHEMA_INSTRUCTOR_PERSON_NODES: Record<
  string,
  Record<string, unknown>
> = {
  [SCHEMA_INSTRUCTOR_MARCUS_BALL_ID]: {
    "@type": "Person",
    "@id": SCHEMA_INSTRUCTOR_MARCUS_BALL_ID,
    name: "Marcus Ball",
    jobTitle: "SAFe Program Consultant (SPC)",
    worksFor: { "@id": SCHEMA_ORGANIZATION_ID },
    image: "https://www.agile36.com/marcus.jpeg",
  },
  [SCHEMA_INSTRUCTOR_DEADRA_STEVENSON_ID]: {
    "@type": "Person",
    "@id": SCHEMA_INSTRUCTOR_DEADRA_STEVENSON_ID,
    name: "Deadra Stevenson",
    jobTitle: "SAFe Program Consultant (SPC)",
    worksFor: { "@id": SCHEMA_ORGANIZATION_ID },
    image: "https://www.agile36.com/Deadra.jpeg",
    sameAs: "https://www.linkedin.com/in/deadra-stevenson-a20a6a1a2/",
  },
  [SCHEMA_INSTRUCTOR_JOE_PUOCI_ID]: {
    "@type": "Person",
    "@id": SCHEMA_INSTRUCTOR_JOE_PUOCI_ID,
    name: "Joe Puoci",
    jobTitle: "SAFe Program Consultant (SPC)",
    worksFor: { "@id": SCHEMA_ORGANIZATION_ID },
    image: "https://www.agile36.com/Joe.jpeg",
  },
};
