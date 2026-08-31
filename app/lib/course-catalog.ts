export type CourseCategory = "SAFe" | "Generative AI" | "AI Product";

/** Shown on SAFe course heroes, catalog cards, and nav for participants trained. */
export const SAFE_COURSE_PARTICIPANTS_LABEL = "52,000+ Participants";
export const SAFE_COURSE_PARTICIPANTS_VALUE = "52,000+";

export const COURSE_CATEGORIES: CourseCategory[] = [
  "SAFe",
  "Generative AI",
  "AI Product",
];

export interface CatalogCourse {
  id: string;
  title: string;
  category: CourseCategory;
  image: string;
  price: number;
  originalPrice: number;
  hours: string;
  days: string;
  enrolled: string;
  skills: string;
  popular?: boolean;
  trending?: boolean;
  advanced?: boolean;
  privateClass?: boolean;
  /** Keep course URL live for direct sharing; omit from public catalogs/nav/search. */
  hiddenFromListing?: boolean;
}

const COURSE_THUMBNAILS: { [key: string]: string } = {
    "AI-Empowered Leading SAFe® / SAFe Agilist": "/Leading SAFe.png",
    "Leading SAFe/ SAFe Agilist": "/Leading SAFe.png",
    "Leading SAFe® 6.0 Certification Training": "/Leading SAFe.png",
    "SAFe Lean Portfolio Management": "/Lean Portfolio.png",
    "SAFe Agile Product Management": "/AgileProductManagment.png",
    "SAFe for Architects": "/ARCH.png",
    "AI-Empowered SAFe for Teams": "/SAFe for Teams.png",
    "SAFe for Teams": "/SAFe for Teams.png",
    "SAFe DevOps": "/Devops.png",
    "AI-Empowered SAFe Advanced Scrum Master": "/AdvancedSM.png",
    "SAFe Advanced Scrum Master": "/AdvancedSM.png",
    "SAFe Release Train Engineer": "/RTE.png",
    "AI-Empowered SAFe Release Train Engineer": "/RTE.png",
    "AI-Empowered SAFe Product Owner/Product Manager": "/POPM.jpg",
    "SAFe Product Owner/Product Manager": "/POPM.jpg",
    "AI-Empowered SAFe Scrum Master": "/SSM.jpeg",
    "SAFe Scrum Master": "/SSM.jpeg",
    "Responsible AI with SAFe": "/MicroCredential.jpeg",
    "Certified AI Product Manager": "/PMAI.jpeg",
    "No-Code AI Agents & Automation™": "/Logo_Agents.png",
    "Agentic Product Leader Certification": "/Agentic.jpeg",
    "Responsible AI": "/MicroCredential.jpeg",
    "SAFe Value Stream Mapping": "/MicroCredential.jpeg",
  };



export function getCatalogCourseImage(course: CatalogCourse): string {
  if (course.title.includes("No-Code AI Agents")) {
    return "/Logo_Agents.png";
  }
  if (course.category === "Generative AI" || course.category === "AI Product") {
    return "/GenAI_2.png";
  }
  return COURSE_THUMBNAILS[course.title] || course.image;
}

export const CATALOG_COURSES: CatalogCourse[] = [
    // SAFe courses
    {
      id: "8",
      title: "AI-Empowered Leading SAFe® / SAFe Agilist",
      category: "SAFe",
      image: "/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg",
      price: 515,
      originalPrice: 1030,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "SAFe Principles, Lean-Agile Practices, AI-empowered collaboration",
      popular: true,
    },
    {
      id: "9",
      title: "AI-Empowered SAFe Product Owner/Product Manager",
      category: "SAFe",
      image: "/annie-spratt-hCb3lIB8L8E-unsplash.jpg",
      price: 545,
      originalPrice: 1090,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Product Ownership, SAFe PO/PM Practices, AI-assisted delivery",
      popular: true,
    },
    {
      id: "10",
      title: "SAFe Lean Portfolio Management",
      category: "SAFe",
      image: "/brooke-cagle--uHVRvDr7pg-unsplash.jpg",
      price: 950,
      originalPrice: 1900,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Portfolio Strategy, Investment Funding, Value Stream Management",
      popular: true,
      advanced: true,
    },
    {
      id: "11",
      title: "SAFe Agile Product Management",
      category: "SAFe",
      image: "/campaign-creators-gMsnXqILjp4-unsplash.jpg",
      price: 999,
      originalPrice: 1998,
      hours: "24 Hrs",
      days: "03 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Agile Product Management, Continuous Exploration",
      popular: true,
      advanced: true,
    },
    {
      id: "28",
      title: "SAFe for Architects",
      category: "SAFe",
      image: "/andreea-avramescu-wR56AUlEsE4-unsplash.jpg",
      price: 1399,
      originalPrice: 2798,
      hours: "24 Hrs",
      days: "03 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Agile Architecture, Architectural Runway, Solution Intent",
      popular: true,
      advanced: true,
    },
    {
      id: "12",
      title: "AI-Empowered SAFe Scrum Master",
      category: "SAFe",
      image: "/christina-wocintechchat-com-0Nfqp0WiJqc-unsplash (1).jpg",
      price: 515,
      originalPrice: 1030,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "SAFe Scrum, Team Facilitation, Coaching, AI-empowered ceremonies",
      popular: true,
    },
    {
      id: "13",
      title: "AI-Empowered SAFe for Teams",
      category: "SAFe",
      image: "/christina-wocintechchat-com-faEfWCdOKIg-unsplash.jpg",
      price: 599,
      originalPrice: 1030,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "SAFe Team Practices, Iteration Execution, AI-empowered teamwork",
      popular: true,
    },
    {
      id: "15",
      title: "SAFe DevOps",
      category: "SAFe",
      image: "/ewan-buck-xc9B3i-1QiI-unsplash.jpg",
      price: 599,
      originalPrice: 1198,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "DevOps Practices, Continuous Delivery, SAFe Pipeline",
      popular: true,
    },
    {
      id: "16",
      title: "AI-Empowered SAFe Advanced Scrum Master",
      category: "SAFe",
      image: "/headway-5QgIuuBxKwM-unsplash.jpg",
      price: 599,
      originalPrice: 1198,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Flow, facilitation with AI, ART performance",
    },
    {
      id: "17",
      title: "AI-Empowered SAFe Release Train Engineer",
      category: "SAFe",
      image: "/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
      price: 0,
      originalPrice: 0,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "RTE Practices, PI planning, AI-assisted facilitation",
      popular: true,
      advanced: true,
      privateClass: true,
    },
    // Generative AI courses
    {
      id: "19",
      title: "AI-Driven Scrum Master™",
      category: "Generative AI",
      image: "/redd-francisco-5U_28ojjgms-unsplash.jpg",
      price: 555,
      originalPrice: 1110,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "2.5K+ Enrolled",
      skills: "AI-Enhanced Scrum Practices, Agile AI Tools, Team Facilitation",
      popular: true,
    },
    {
      id: "20",
      title: "Executive GenAI Leadership™",
      category: "Generative AI",
      image: "/redd-francisco-PTRzqc_h1r4-unsplash.jpg",
      price: 400,
      originalPrice: 800,
      hours: "8 Hrs",
      days: "01 day",
      enrolled: "1.8K+ Enrolled",
      skills: "GenAI Strategy, Executive AI Decision Making, Leadership in AI Era",
    },
    {
      id: "21",
      title: "AI-Driven Project Manager™",
      category: "Generative AI",
      image: "/vitaly-gariev--X4Qx4_4iMU-unsplash.jpg",
      price: 400,
      originalPrice: 800,
      hours: "8 Hrs",
      days: "01 day",
      enrolled: "2.2K+ Enrolled",
      skills: "AI Project Management, Automated Planning, AI Risk Management",
    },
    {
      id: "22",
      title: "Certified GenAI Practitioner™",
      category: "Generative AI",
      image: "/christina-wocintechchat-com-IxmHiUC-yOw-unsplash.jpg",
      price: 299,
      originalPrice: 598,
      hours: "4 Hrs",
      days: "Half day",
      enrolled: "3K+ Enrolled",
      skills: "GenAI Fundamentals, AI Ethics, Prompt Engineering, AI Applications",
      popular: true,
    },
    {
      id: "23",
      title: "No-Code AI Agents & Automation™",
      category: "AI Product",
      image: "/Logo_Agents.png",
      price: 400,
      originalPrice: 800,
      hours: "10 Hrs",
      days: "02 days",
      enrolled: "2.8K+ Enrolled",
      skills: "Claude Agents, Claude Code, Codex, n8n Automation",
      popular: true,
    },
    // AI Product courses
    {
      id: "24",
      title: "Certified AI Product Manager",
      category: "AI Product",
      image: "/annie-spratt-QckxruozjRg-unsplash.jpg",
      price: 400,
      originalPrice: 800,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "2.5K+ Enrolled",
      skills: "AI Product Strategy, Product Management with AI, AI Integration",
      popular: true,
    },
    {
      id: "25",
      title: "Agentic Product Leader Certification",
      category: "AI Product",
      image: "/annie-spratt-hCb3lIB8L8E-unsplash.jpg",
      price: 400,
      originalPrice: 800,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "1.8K+ Enrolled",
      skills: "Agentic Product Leadership, Autonomous Product Systems, Strategic AI Product Vision",
      popular: true,
    },
    // Microcredentials moved to SAFe
    {
      id: "27",
      title: "Responsible AI",
      category: "SAFe",
      image: "/dylan-gillis-KdeqA3aTnBY-unsplash.jpg",
      price: 350,
      originalPrice: 700,
      hours: "8 Hrs",
      days: "01 day",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Responsible AI, Ethical AI Practices, AI Governance",
      popular: true,
    },
    {
      id: "18",
      title: "SAFe Value Stream Mapping",
      category: "SAFe",
      image: "/ninthgrid-ti8cT-DKwes-unsplash.jpg",
      price: 350,
      originalPrice: 700,
      hours: "4 Hrs",
      days: "Half day",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Value Stream Mapping, Process Optimization",
      trending: true,
    },
  ];

/** Public browsing surfaces (homepage, /courses, nav, search). Direct course URLs still work. */
export const PUBLIC_CATALOG_COURSES: CatalogCourse[] = CATALOG_COURSES.filter(
  (c) => !c.hiddenFromListing
);

export function getCatalogCourseUrl(course: CatalogCourse): string {
    // Special cases
    if (course.title.includes("Leading SAFe") || course.title.includes("SAFe Agilist")) {
      return "/courses/leading-safe";
    }
    
    if (course.title.includes("SAFe Product Owner/Product Manager") || course.title.includes("Product Owner/Product Manager")) {
      return "/courses/product-owner-manager";
    }
    
    if (course.title.includes("SAFe Lean Portfolio Management") || course.title.includes("Lean Portfolio Management")) {
      return "/courses/lean-portfolio-management";
    }
    
    if (course.title.includes("SAFe Agile Product Management") || course.title.includes("Agile Product Management")) {
      return "/courses/agile-product-management";
    }

    if (course.title.includes("SAFe for Architects") || course.title.includes("Architects")) {
      return "/courses/safe-for-architects";
    }

    if (course.title.includes("AI-Driven Scrum Master") || course.title.includes("AI Scrum Master")) {
      return "/courses/ai-driven-scrum-master";
    }

    // Special case for SAFe Advanced Scrum Master (must come before regular Scrum Master)
    if (course.title.includes("Advanced Scrum Master") || course.title.includes("Advanced Scrum")) {
      return "/courses/advanced-scrum-master";
    }
    
    if (course.title.includes("SAFe Scrum Master") || course.title.includes("Scrum Master")) {
      return "/courses/scrum-master";
    }
    
    if (course.title.includes("SAFe for Teams") || course.title.includes("for Teams")) {
      return "/courses/safe-for-teams";
    }

    if (course.title.includes("Responsible AI") || course.title.includes("AI with SAFe")) {
      return "/courses/responsible-ai";
    }

    if (course.title.includes("SAFe DevOps") || course.title.includes("DevOps")) {
      return "/courses/devops";
    }
    
    if (course.title.includes("Value Stream Mapping") || course.title.includes("Value Stream")) {
      return "/courses/value-stream-mapping";
    }

    if (course.title.includes("Release Train Engineer")) {
      return "/courses/release-train-engineer";
    }
    
    if (course.title.includes("No-Code AI Agents") || course.title.includes("AI Agent Builder")) {
      return "/courses/ai-agent-builder";
    }
    
    if (course.title.includes("Certified AI Product Manager")) {
      return "/courses/certified-ai-product-manager";
    }
    
    if (course.title.includes("Executive GenAI Leadership")) {
      return "/courses/executive-genai-leadership";
    }
    
    if (course.title.includes("Certified GenAI Practitioner")) {
      return "/courses/certified-genai-practitioner";
    }
    
    if (course.title.includes("Generative AI for Project Managers") || course.title.includes("AI-Driven Project Manager")) {
      return "/courses/generative-ai-project-managers";
    }
    
    if (course.title.includes("Agentic Product Leader")) {
      return "/courses/certified-ai-product-manager";
    }

    
    const titleSlug = course.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/\//g, '-');
    
    return `/courses/${titleSlug}`;
}



export function getCatalogCourseSlug(course: CatalogCourse): string {
  const url = getCatalogCourseUrl(course);
  return url.replace("/courses/", "");
}

export function getCatalogScheduleUrl(course: CatalogCourse): string {
  const slug = getCatalogCourseSlug(course);
  return `/courses/${slug}/schedule?course=${slug}`;
}

export function getCatalogCourseAcronym(title: string): string {
  if (title.includes("Leading SAFe") || title.includes("SAFe Agilist")) return "SA";
  if (title.includes("Product Owner/Product Manager")) return "POPM";
  if (title.includes("Lean Portfolio")) return "LPM";
  if (title.includes("Agile Product Management")) return "APM";
  if (title.includes("Architects")) return "ARCH";
  if (title.includes("Advanced Scrum Master")) return "SASM";
  if (title.includes("Scrum Master")) return "SSM";
  if (title.includes("for Teams")) return "S4T";
  if (title.includes("DevOps")) return "SDP";
  if (title.includes("Release Train Engineer")) return "RTE";
  if (title.includes("Value Stream")) return "VSM";
  if (title.includes("Responsible AI")) return "RAI";
  if (title.includes("GenAI Practitioner")) return "CGP";
  if (title.includes("Executive GenAI")) return "EGL";
  if (title.includes("Project Manager")) return "PM";
  if (title.includes("AI Agents")) return "AI";
  if (title.includes("AI Product Manager")) return "CAPM";
  if (title.includes("Agentic")) return "APL";
  return title.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase().slice(0, 4) || "CRS";
}

export function formatCatalogLiveDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function normalizeCourseCategory(cat: string | null): CourseCategory {
  const categories = COURSE_CATEGORIES;
  if (!cat || cat === "PMI" || !categories.includes(cat as CourseCategory)) {
    return "SAFe";
  }
  return cat as CourseCategory;
}
