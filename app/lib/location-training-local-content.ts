import {
  type LocationSegment,
  cityDisplayFromSlug,
  getLocationCourseTitle,
} from "@/app/lib/location-training-metadata";

function slugVariant(slug: string, modulo: number): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) >>> 0;
  }
  return h % modulo;
}

const REGION_FOCUS = [
  "regulated delivery environments",
  "high-velocity product organizations",
  "enterprise IT and platform teams",
] as const;

const HIRING_ANGLE = [
  "hiring managers still expect SAFe vocabulary in interviews and internal mobility conversations",
  "delivery leadership is consolidating vendors and tightening training budgets—credible certification signals matter",
  "cross-functional teams are standardizing on SAFe ceremonies while keeping execution metrics visible to finance",
] as const;

const SCHEDULE_NOTE = [
  "Most learners pick a cohort that matches their calendar (weekday vs weekend) rather than geography—your seat is virtual either way.",
  "If your organization is sponsoring a private cohort, compare this public schedule with corporate training options on agile36.com/corporate.",
  "When you enroll, you receive calendar holds, pre-work links, and exam timing guidance so you are not guessing the week of class.",
] as const;

const COURSE_ANGLE: Record<
  LocationSegment,
  [string, string, string]
> = {
  "leading-safe-certification-training": [
    "This cohort path focuses on how executives and program leaders align strategy to execution—especially useful when {city} teams are scaling from a few ARTs to a portfolio operating model.",
    "You will leave with a shared vocabulary for value streams, PI Planning, and Lean-Agile budgeting decisions that show up in steering forums.",
    "Use this page to confirm fit: if your role touches roadmaps, funding tradeoffs, or cross-team dependency management, Leading SAFe is usually the right entry point.",
  ],
  "scrum-master-certification-training": [
    "SSM is built for facilitators who support teams on an ART—retros, iteration goals, and coaching through conflict without becoming a project manager.",
    "If {city} job postings ask for “SAFe Scrum Master” alongside agile delivery experience, this is the certification those reqs map to.",
    "Expect practice-heavy facilitation patterns you can reuse Monday morning, not generic agile theory.",
  ],
  "release-train-engineer-certification-training": [
    "RTE work is program execution: PI Planning readiness, risk burndown, coach-the-coach loops, and keeping the train predictable.",
    "Teams around {city} often promote strong Scrum Masters into RTE tracks—this course is the structured bridge to program-level accountability.",
    "You will work scenarios that mirror real RTE pressure: dependencies, scope negotiation, and leadership asks between iterations.",
  ],
  "safe-for-teams-certification-training": [
    "SAFe for Teams is for contributors who need crisp mechanics: backlog refinement, story slicing, iteration execution, and PI Planning participation.",
    "If your org is onboarding dozens of engineers/analysts in {city} onto the same ART, this is the fastest shared baseline.",
    "The emphasis is practical team execution inside SAFe guardrails—not portfolio strategy.",
  ],
  "lean-portfolio-management-certification-training": [
    "LPM is for portfolio leaders translating strategy into fundable initiatives—epics, guardrails, and lean governance that still satisfy audit-heavy industries.",
    "If {city} leadership is debating where to invest next quarter, LPM gives you the SAFe vocabulary to run that conversation with data.",
    "Expect facilitation patterns for portfolio kanban, epic hypothesis, and lean business cases your PMO can adopt without waterfall drag.",
  ],
  "safe-product-owner-product-manager-certification-training": [
    "POPM splits focus between product management discovery and product ownership delivery—critical when {city} teams blur PM/PO responsibilities.",
    "You will practice prioritization flows that survive PI Planning: WSJF, dependencies, and customer evidence without endless roadmap theater.",
    "Bring real backlog examples; the exercises work best when you map them to your current product constraints.",
  ],
  "agile-product-management-certification-training": [
    "APM goes deeper on continuous exploration, roadmaps, and solution intent—aimed at product leaders shaping direction across multiple ARTs.",
    "If {city} markets reward product leaders who can connect design thinking to PI outcomes, this is the SAFe path that matches that expectation.",
    "You will translate customer insight into actionable backlog signals engineering can execute within a PI.",
  ],
};

export type LocalLocationContent = {
  heading: string;
  paragraphs: string[];
  bullets: string[];
  scheduleCta: { href: string; label: string };
};

const SCHEDULE_PATH: Record<LocationSegment, string> = {
  "leading-safe-certification-training": "/courses/leading-safe/schedule",
  "scrum-master-certification-training": "/courses/scrum-master/schedule",
  "release-train-engineer-certification-training":
    "/courses/release-train-engineer/schedule",
  "safe-for-teams-certification-training": "/courses/safe-for-teams/schedule",
  "lean-portfolio-management-certification-training":
    "/courses/lean-portfolio-management/schedule",
  "safe-product-owner-product-manager-certification-training":
    "/courses/product-owner-manager/schedule",
  "agile-product-management-certification-training":
    "/courses/agile-product-management/schedule",
};

export function buildLocalLocationContent(
  segment: LocationSegment,
  citySlug: string
): LocalLocationContent {
  const city = cityDisplayFromSlug(citySlug);
  const v = slugVariant(citySlug, 3);
  const angles = COURSE_ANGLE[segment].map((p) => p.replaceAll("{city}", city));
  const region = REGION_FOCUS[v];
  const hiring = HIRING_ANGLE[(v + 1) % HIRING_ANGLE.length];
  const scheduleNote = SCHEDULE_NOTE[(v + 2) % SCHEDULE_NOTE.length];

  const courseTitle = getLocationCourseTitle(segment);
  const p1 = `Agile36 runs live virtual ${courseTitle} for learners in and around ${city}. You attend from your home or office—there is no “${city} classroom day”—but the agenda is designed for US-friendly time blocks so teams across the ${city} metro can participate without travel friction.`;

  const p2 = `${angles[0]} In practice, that means ${hiring}`;

  const p3 = `${angles[1]} We also call out how this material shows up for ${region}—because the same SAFe class lands differently when your stakeholders care about compliance traceability vs growth experiments.`;

  const p4 = `${angles[2]} ${scheduleNote}`;

  return {
    heading: `${city}-area professionals: why teams choose this live virtual format`,
    paragraphs: [p1, p2, p3, p4],
    bullets: [
      `Local relevance: language and examples tuned for ${city}-area hiring and operating norms—not a generic recording.`,
      `Instructor-led cohorts: real-time Q&A, breakout exercises, and exam guidance from certified SPCs.`,
      `Outcome focus: connect classroom mechanics to PI Planning, delivery metrics, and stakeholder communication patterns you already use.`,
    ],
    scheduleCta: {
      href: SCHEDULE_PATH[segment],
      label: "View published cohort dates & enroll",
    },
  };
}
