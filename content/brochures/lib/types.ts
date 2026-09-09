/**
 * Per-course brochure supplement.
 *
 * Everything a brochure can pull from the site — title, lede, outcomes,
 * curriculum, exam notes, reviews — comes from `getCatalogLanding(slug)` so the
 * PDF and the page never drift. This file carries only what the site does not
 * already hold: the course version, the AI story, and the audience.
 */

export type AiActivity = {
  /** Short activity name as it appears in the courseware. */
  title: string;
  /** Where it lands, e.g. "Lesson 4" or "Module 2". */
  where: string;
  /** What the learner actually does. */
  body: string;
};

export type Shift = { label: string; title: string; body: string };

/**
 * A lesson as the official courseware defines it.
 *
 * This is NOT the catalog's `curriculum` field. That one carries the exam
 * blueprint domains and their weights, which Scaled Agile versions separately
 * from the lesson structure — on POPM they had already diverged. Lessons come
 * from the courseware kit; weights come from the catalog.
 */
export type Lesson = {
  title: string;
  topics: string[];
  /** Topics added or reworked for the AI-Empowered release. */
  aiTopics?: string[];
};

/**
 * The slice of course content the template needs. Catalog courses adapt
 * `getCatalogLanding(slug)` into this; bespoke courses (the AI/GenAI catalog,
 * which has no catalog entry) supply it directly on the course.
 */
export type BrochureLanding = {
  crumb: string;
  lede: string;
  /** The "Agile36 difference" paragraph. */
  difference: string;
  outcomes: string[];
  curriculumModules: { title: string; topics: string[]; weight?: string }[];
  examNote: string;
  review?: { name: string; role: string; review: string };
};

export type BrochureCourse = {
  slug: string;
  /** Courseware version stamped on the cover, e.g. "2026.05". */
  version: string;
  /** Cover subtitle — the courseware's own strapline where one exists. */
  subtitle: string;
  /**
   * Cover headline. The catalog `title` is an SEO string ("… Certification
   * Training") that reads badly at 33pt, so each course states its own.
   * `accent` renders in amber on its own line.
   */
  coverTitle: { main: string; accent?: string };
  /**
   * Certification badge in public/, e.g. "/POPM.jpg". Omit when the course has
   * no badge artwork of its own — never borrow another course's.
   */
  badge?: string;
  /**
   * Scaled Agile accreditation. SAFe courses leave this out and get the
   * default: Silver Partner marks, SPC instructor claims, SAFe Studio
   * membership, and the SAFe® trademark notice.
   *
   * Agile36's own AI/GenAI courses set `safe: false` — none of that is true of
   * them, and claiming it on a non-accredited course misrepresents both the
   * course and the partnership. `credential` then names what the learner
   * actually earns.
   */
  accreditation?: {
    safe: false;
    /** What the course awards, e.g. "Issued through Accredible". */
    credential: string;
    /** At-a-glance assessment line. Defaults to "No exam". */
    assessment?: string;
  };
  /** Cover band photo, relative to content/brochures/. */
  band: string;
  /** Public URL path for the course page, used on the enrol panel. */
  path: string;
  /** Seat price and list price. Pulled from the pricing lib; never invent. */
  price: { current: number; original: number };
  /** Exam facts for the At a Glance table. Omit for micro-credentials. */
  exam?: { minutes: number; questions?: number; pass: string; attempts: string };
  /** Credits line, e.g. "16 PDUs / SEUs". */
  credits: string;
  /** Prerequisite bullets. */
  prerequisites: string[];
  /** Who should attend — 8 short role tiles. */
  audience: { role: string; note: string }[];
  /** Sectors this training has been delivered into. */
  industries: string[];
  /**
   * Course content for brochures with no catalog landing entry.
   * Catalog courses leave this out and the catalog is adapted instead.
   */
  landing?: BrochureLanding;
  /**
   * Lesson structure from the official courseware kit.
   * Omit for courses with no kit — the catalog curriculum is used instead,
   * with each module's exam weight shown on the card.
   */
  lessons?: Lesson[];
  /** Display duration, e.g. { days: "3 days", hours: "24" }. */
  duration: { days: string; hours: string };
  /**
   * Learning objectives grouped for page 5, taken from the courseware.
   * Falls back to the catalog's `outcomes` summary when omitted.
   */
  outcomeGroups?: { title: string; items: string[] }[];

  /** The AI spread. Omit for courses with no AI content. */
  ai?: {
    /** Section heading, e.g. "What you'll actually practise with AI". */
    heading: string;
    /** One-paragraph intro above the activity cards. */
    lede: string;
    activities: AiActivity[];
    /** Techniques panel bullets — "<strong>Name</strong> — description". */
    techniques: string[];
    /** Responsible-AI panel. */
    responsible?: { lede: string; points: string[] };
    /** Four-shift strip, or any similar closing model. */
    shifts?: { heading: string; note?: string; items: Shift[] };
  };

  /** Cover "New in this release" columns. Three entries. */
  whatsNew: { title: string; body: string }[];
  /** Page 2 "What changed" tiles. Three entries. */
  changed: { title: string; body: string }[];
  /** Page 3 stat strip. Four entries. */
  stats: { value: string; unit?: string; label: string }[];
  /**
   * Page 3 headline, and optional brochure-specific opening paragraphs.
   * Falls back to the catalog lede when `body` is omitted.
   */
  overview: { heading: string; body?: string[] };
  /** Page 4 headline and opening paragraph. */
  whyNow: { heading: string; body: string };
  /** Page 4 stat panel with its source line. */
  whyStats?: { items: { value: string; unit?: string; label: string }[]; source: string };
};
