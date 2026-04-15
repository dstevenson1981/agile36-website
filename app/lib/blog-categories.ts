/**
 * Maps generated MDX `vertical` frontmatter to a small set of browse categories
 * (similar to KnowledgeHut’s “Discover Blogs by Categories”).
 */
export type BlogCategoryId =
  | "all"
  | "safe"
  | "glossary"
  | "ai"
  | "careers"
  | "industry"
  | "practices"
  | "guides";

export const BLOG_CATEGORY_TABS: Array<{ id: BlogCategoryId; label: string }> = [
  { id: "all", label: "All articles" },
  { id: "safe", label: "SAFe & scrum certifications" },
  { id: "glossary", label: "Glossary & definitions" },
  { id: "ai", label: "AI & technology" },
  { id: "careers", label: "Careers & salaries" },
  { id: "industry", label: "Agile & AI in industry" },
  { id: "practices", label: "Agile frameworks & practices" },
  { id: "guides", label: "Guides & comparisons" },
];

export function mapVerticalToCategoryId(vertical?: string): Exclude<BlogCategoryId, "all"> {
  const v = (vertical ?? "").toLowerCase().trim();
  switch (v) {
    case "safe-certifications":
      return "safe";
    case "glossary":
      return "glossary";
    case "ai-tools":
    case "ai-skills":
    case "ai-agile":
    case "ai-transform":
    case "ai-industry":
      return "ai";
    case "careers":
      return "careers";
    case "agile-industry":
      return "industry";
    case "agile-practices":
      return "practices";
    default:
      return "guides";
  }
}

export function categoryLabelForId(id: Exclude<BlogCategoryId, "all">): string {
  const row = BLOG_CATEGORY_TABS.find((t) => t.id === id);
  return row?.label ?? "Guides & comparisons";
}
