export const COMPANY_COOLDOWN_DAYS = 90;
export const PROSPECT_COOLDOWN_DAYS = 60;
export const MIN_ENRICHMENT_CONFIDENCE = 0.7;
export const DEFAULT_BATCH_SIZE = 10;

export const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "mail.com",
  "yandex.com",
  "zoho.com",
  "gmx.com",
  "gmx.net",
  "qq.com",
  "163.com",
]);

/** Fallback titles when the source customer's title is missing. */
export const PROSPECT_TITLES = [
  "Scrum Master",
  "Product Owner",
  "Product Manager",
  "Business Analyst",
  "Project Manager",
  "Program Manager",
  "Release Train Engineer",
  "Agile Coach",
  "Portfolio Manager",
  "Transformation Lead",
  "Transformation Manager",
  "Learning and Development",
  "L&D Manager",
  "Head of Learning",
  "AI Lead",
  "Automation Lead",
  "Director of Agile",
  "VP Product",
  "Head of Product",
];

export type OfferMatch = {
  offer: string;
  reason: string;
  courseSlug?: string;
};

/**
 * Build an Apollo title search list centered on the buyer's role.
 * Same-class expansion: find people with similar titles, then pitch the course they bought.
 */
export function similarTitlesFor(title: string | null | undefined): string[] {
  const raw = (title || "").trim();
  if (!raw) return [...PROSPECT_TITLES];

  const t = raw.toLowerCase();
  const titles = new Set<string>([raw]);

  const add = (...items: string[]) => items.forEach((item) => titles.add(item));

  if (/scrum master|ssm\b/.test(t)) {
    add("Scrum Master", "Senior Scrum Master", "Lead Scrum Master", "Agile Scrum Master", "SAFe Scrum Master");
  } else if (/product owner|popm/.test(t)) {
    add("Product Owner", "Senior Product Owner", "SAFe Product Owner", "Product Owner / Product Manager");
  } else if (/business analyst|\bba\b/.test(t)) {
    add("Business Analyst", "Senior Business Analyst", "Agile Business Analyst", "Product Owner");
  } else if (/product manager|product management|\bpm\b/.test(t)) {
    add("Product Manager", "Senior Product Manager", "Lead Product Manager", "Group Product Manager", "Head of Product");
  } else if (/release train|\brte\b/.test(t)) {
    add("Release Train Engineer", "Senior Release Train Engineer", "SAFe RTE", "Agile Coach");
  } else if (/agile coach/.test(t)) {
    add("Agile Coach", "Enterprise Agile Coach", "Senior Agile Coach", "Release Train Engineer");
  } else if (/program manager/.test(t)) {
    add("Program Manager", "Senior Program Manager", "Technical Program Manager", "Release Train Engineer");
  } else if (/project manager/.test(t) && !/product/.test(t)) {
    add("Project Manager", "Senior Project Manager", "Technical Project Manager", "Program Manager");
  } else if (/portfolio/.test(t)) {
    add("Portfolio Manager", "Lean Portfolio Manager", "Portfolio Lead", "Head of Portfolio");
  } else if (/transformation/.test(t)) {
    add("Transformation Lead", "Transformation Manager", "Agile Transformation Lead", "Director of Transformation");
  } else if (/learning|l&d|talent development|training/.test(t)) {
    add("Learning and Development", "L&D Manager", "Head of Learning", "Training Manager");
  } else if (/\bai\b|automation|agentic/.test(t)) {
    add("AI Lead", "Automation Lead", "AI Product Manager", "Head of AI", "Director of Automation");
  } else {
    // Use the exact title plus stripped seniority variants so Apollo can find peers.
    const stripped = raw
      .replace(/^(senior|sr\.?|junior|jr\.?|lead|principal|staff|associate|assistant)\s+/i, "")
      .replace(/\s+(i{1,3}|iv|v|\d+)$/i, "")
      .trim();
    if (stripped && stripped.toLowerCase() !== t) add(stripped);
    add(`Senior ${stripped || raw}`, `Lead ${stripped || raw}`);
  }

  return Array.from(titles).slice(0, 12);
}

/** Prefer selling the same class the source customer just bought. */
export function offerFromPurchasedCourse(
  courseSlug: string,
  courseName: string
): OfferMatch {
  const name = (courseName || "").trim() || courseSlug;
  return {
    offer: name,
    // Prospect-safe: used in outreach drafts. Never mention a colleague registration.
    reason: `This course is a strong fit for people in similar roles.`,
    courseSlug: courseSlug || undefined,
  };
}

/** Deterministic role → offer mapping (fallback only). */
export function matchOfferFromTitle(title: string | null | undefined): OfferMatch {
  const t = (title || "").toLowerCase();

  if (/scrum master|ssm\b/.test(t)) {
    if (/advanced|senior|lead|principal/.test(t)) {
      return {
        offer: "AI-Empowered SAFe Advanced Scrum Master",
        reason: "Title indicates an advanced Scrum Master role.",
        courseSlug: "advanced-scrum-master",
      };
    }
    return {
      offer: "AI-Empowered SAFe Scrum Master",
      reason: "Title indicates a Scrum Master role.",
      courseSlug: "scrum-master",
    };
  }

  if (/product owner|business analyst|\bba\b|popm/.test(t)) {
    return {
      offer: "AI-Empowered SAFe Product Owner/Product Manager",
      reason: "Title aligns with Product Owner / Business Analyst responsibilities.",
      courseSlug: "product-owner-manager",
    };
  }

  if (/product manager|product management|\bpm\b/.test(t)) {
    if (/\bai\b|artificial intelligence|genai/.test(t)) {
      return {
        offer: "AI Product Manager training",
        reason: "Title indicates AI-focused product leadership.",
        courseSlug: "ai-product-manager",
      };
    }
    return {
      offer: "SAFe Agile Product Management",
      reason: "Title indicates a Product Manager role.",
      courseSlug: "agile-product-management",
    };
  }

  if (/release train engineer|\brte\b|program manager|transformation/.test(t)) {
    if (/portfolio/.test(t)) {
      return {
        offer: "SAFe Lean Portfolio Management",
        reason: "Title indicates portfolio / transformation leadership.",
        courseSlug: "lean-portfolio-management",
      };
    }
    if (/release train|\brte\b/.test(t)) {
      return {
        offer: "SAFe Release Train Engineer",
        reason: "Title indicates an RTE / ART facilitation role.",
        courseSlug: "release-train-engineer",
      };
    }
    return {
      offer: "Leading SAFe",
      reason: "Title indicates program or transformation leadership.",
      courseSlug: "leading-safe",
    };
  }

  if (/portfolio/.test(t)) {
    return {
      offer: "SAFe Lean Portfolio Management",
      reason: "Title indicates portfolio leadership.",
      courseSlug: "lean-portfolio-management",
    };
  }

  if (/learning|l&d|talent development|training manager|organizational development/.test(t)) {
    return {
      offer: "Private corporate training cohort",
      reason: "Title indicates Learning & Development ownership of team enablement.",
    };
  }

  if (/\bai\b|automation|agentic|machine learning/.test(t)) {
    return {
      offer: "AI Agents and Automation training",
      reason: "Title indicates AI / automation leadership.",
      courseSlug: "ai-agent-builder",
    };
  }

  if (/operations|ops lead|chief operating|coo\b/.test(t)) {
    return {
      offer: "AI workflow consulting",
      reason: "Title indicates operations leadership that may benefit from workflow automation.",
    };
  }

  return {
    offer: "Leading SAFe",
    reason: "General Agile leadership fit based on role at a company with prior Agile36 registration activity.",
    courseSlug: "leading-safe",
  };
}

export function prospectLimitForCompanySize(employeeCount: number | null | undefined): number {
  const n = employeeCount ?? 0;
  if (n > 0 && n < 50) return 5;
  if (n < 500) return 10;
  return 15;
}

export function scoreTitleRelevance(title: string | null | undefined): number {
  const t = (title || "").toLowerCase();
  if (!t) return 0.2;
  if (/release train engineer|\brte\b|agile coach|portfolio|transformation/.test(t)) return 1;
  if (/scrum master|product owner|product manager|program manager/.test(t)) return 0.9;
  if (/business analyst|project manager|l&d|learning/.test(t)) return 0.75;
  if (/\bai\b|automation/.test(t)) return 0.7;
  return 0.4;
}
