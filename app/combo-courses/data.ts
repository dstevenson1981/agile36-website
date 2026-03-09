export type ComboCategory = "safe" | "pmi" | "ai";

export interface ComboCourse {
  id: string;
  name: string;
  slug: string;
  badge: string;
  price: number;
}

export interface Combo {
  id: string;
  name: string;
  courses: ComboCourse[];
  comboPrice: number;
  originalPrice: number;
  discount: number;
  category: ComboCategory;
  enrolled?: string;
  trending?: boolean;
}

export const BADGES: Record<string, string> = {
  "leading-safe": "/Leading SAFe.png",
  "scrum-master": "/SSM.jpeg",
  "product-owner-manager": "/POPM.jpg",
  "safe-for-teams": "/SAFe for Teams.png",
  "devops": "/Devops.png",
  "lean-portfolio-management": "/Lean Portfolio.png",
  "agile-product-management": "/AgileProductManagment.png",
  "advanced-scrum-master": "/AdvancedSM.png",
  "value-stream-mapping": "/MicroCredential.jpeg",
  "responsible-ai": "/MicroCredential.jpeg",
  "pmp-certification": "/PMP.png",
  "ai-driven-scrum-master": "/GenAI_2.png",
  "certified-genai-practitioner": "/GenAI_2.png",
  "certified-ai-product-manager": "/PMAI.jpeg",
  "executive-genai-leadership": "/GenAI_2.png",
};

export const COMBO_COURSES: Combo[] = [
  {
    id: "leading-safe-ssm",
    name: "Leading SAFe Certification Training & SSM Certification Training",
    courses: [
      { id: "1", name: "Leading SAFe (SA)", slug: "leading-safe", badge: BADGES["leading-safe"], price: 555 },
      { id: "2", name: "SAFe Scrum Master (SSM)", slug: "scrum-master", badge: BADGES["scrum-master"], price: 555 },
    ],
    comboPrice: 799,
    originalPrice: 2220,
    discount: 1421,
    category: "safe",
    enrolled: "17k",
    trending: true,
  },
  {
    id: "leading-safe-popm",
    name: "Leading SAFe Certification Training & SAFe POPM Certification Training",
    courses: [
      { id: "1", name: "Leading SAFe (SA)", slug: "leading-safe", badge: BADGES["leading-safe"], price: 555 },
      { id: "2", name: "SAFe POPM", slug: "product-owner-manager", badge: BADGES["product-owner-manager"], price: 555 },
    ],
    comboPrice: 799,
    originalPrice: 2220,
    discount: 1421,
    category: "safe",
    enrolled: "17k",
    trending: true,
  },
  {
    id: "ssm-popm",
    name: "SSM Certification Training & SAFe POPM Certification Training",
    courses: [
      { id: "1", name: "SAFe Scrum Master (SSM)", slug: "scrum-master", badge: BADGES["scrum-master"], price: 555 },
      { id: "2", name: "SAFe POPM", slug: "product-owner-manager", badge: BADGES["product-owner-manager"], price: 555 },
    ],
    comboPrice: 799,
    originalPrice: 2220,
    discount: 1421,
    category: "safe",
    enrolled: "16k",
    trending: true,
  },
  {
    id: "leading-safe-teams",
    name: "Leading SAFe Certification Training & SAFe for Teams Certification Training",
    courses: [
      { id: "1", name: "Leading SAFe (SA)", slug: "leading-safe", badge: BADGES["leading-safe"], price: 555 },
      { id: "2", name: "SAFe for Teams (SP)", slug: "safe-for-teams", badge: BADGES["safe-for-teams"], price: 599 },
    ],
    comboPrice: 799,
    originalPrice: 2308,
    discount: 1509,
    category: "safe",
    enrolled: "11k",
    trending: true,
  },
  {
    id: "ssm-teams",
    name: "SSM Certification Training & SAFe for Teams Certification Training",
    courses: [
      { id: "1", name: "SAFe Scrum Master (SSM)", slug: "scrum-master", badge: BADGES["scrum-master"], price: 555 },
      { id: "2", name: "SAFe for Teams (SP)", slug: "safe-for-teams", badge: BADGES["safe-for-teams"], price: 599 },
    ],
    comboPrice: 850,
    originalPrice: 2308,
    discount: 1458,
    category: "safe",
    enrolled: "10k",
    trending: true,
  },
  {
    id: "popm-teams",
    name: "SAFe POPM Certification Training & SAFe for Teams Certification Training",
    courses: [
      { id: "1", name: "SAFe POPM", slug: "product-owner-manager", badge: BADGES["product-owner-manager"], price: 555 },
      { id: "2", name: "SAFe for Teams (SP)", slug: "safe-for-teams", badge: BADGES["safe-for-teams"], price: 599 },
    ],
    comboPrice: 799,
    originalPrice: 2308,
    discount: 1509,
    category: "safe",
    enrolled: "10k",
    trending: true,
  },
  {
    id: "leading-safe-ssm-popm",
    name: "Leading SAFe Certification Training & SSM Certification Training & SAFe POPM Certification Training",
    courses: [
      { id: "1", name: "Leading SAFe (SA)", slug: "leading-safe", badge: BADGES["leading-safe"], price: 555 },
      { id: "2", name: "SAFe Scrum Master (SSM)", slug: "scrum-master", badge: BADGES["scrum-master"], price: 555 },
      { id: "3", name: "SAFe POPM", slug: "product-owner-manager", badge: BADGES["product-owner-manager"], price: 555 },
    ],
    comboPrice: 1190,
    originalPrice: 3330,
    discount: 2140,
    category: "safe",
    enrolled: "25k",
    trending: true,
  },
  {
    id: "ssm-advanced",
    name: "SSM Certification Training & ASM Certification Path",
    courses: [
      { id: "1", name: "SAFe Scrum Master (SSM)", slug: "scrum-master", badge: BADGES["scrum-master"], price: 555 },
      { id: "2", name: "SAFe Advanced Scrum Master (ASM)", slug: "advanced-scrum-master", badge: BADGES["advanced-scrum-master"], price: 950 },
    ],
    comboPrice: 1177,
    originalPrice: 3010,
    discount: 1833,
    category: "safe",
    enrolled: "9k",
    trending: true,
  },
  {
    id: "lpm-apm",
    name: "SAFe LPM Certification Training & SAFe APM Certification Training",
    courses: [
      { id: "1", name: "SAFe Lean Portfolio Management", slug: "lean-portfolio-management", badge: BADGES["lean-portfolio-management"], price: 950 },
      { id: "2", name: "SAFe Agile Product Management", slug: "agile-product-management", badge: BADGES["agile-product-management"], price: 950 },
    ],
    comboPrice: 1700,
    originalPrice: 3800,
    discount: 2100,
    category: "safe",
    enrolled: "4k",
    trending: false,
  },
  {
    id: "ssm-pmp",
    name: "SAFe Scrum Master & PMP Certification",
    courses: [
      { id: "1", name: "SAFe Scrum Master (SSM)", slug: "scrum-master", badge: BADGES["scrum-master"], price: 555 },
      { id: "2", name: "PMP® Certification Training", slug: "pmp-certification", badge: BADGES["pmp-certification"], price: 1150 },
    ],
    comboPrice: 1275,
    originalPrice: 3410,
    discount: 2135,
    category: "pmi",
    enrolled: "8K+",
    trending: true,
  },
  {
    id: "popm-pmp",
    name: "SAFe POPM & PMP Certification",
    courses: [
      { id: "1", name: "SAFe POPM", slug: "product-owner-manager", badge: BADGES["product-owner-manager"], price: 555 },
      { id: "2", name: "PMP® Certification Training", slug: "pmp-certification", badge: BADGES["pmp-certification"], price: 1150 },
    ],
    comboPrice: 1275,
    originalPrice: 3410,
    discount: 2135,
    category: "pmi",
    enrolled: "8K+",
    trending: true,
  },
  {
    id: "ai-scrum-genai",
    name: "AI-Driven Scrum Master & Certified GenAI Practitioner",
    courses: [
      { id: "1", name: "AI-Driven Scrum Master™", slug: "ai-driven-scrum-master", badge: BADGES["ai-driven-scrum-master"], price: 299 },
      { id: "2", name: "Certified GenAI Practitioner™", slug: "certified-genai-practitioner", badge: BADGES["certified-genai-practitioner"], price: 200 },
    ],
    comboPrice: 399,
    originalPrice: 998,
    discount: 599,
    category: "ai",
    enrolled: "2.5K+",
    trending: true,
  },
  {
    id: "ai-scrum-ai-product",
    name: "AI-Driven Scrum Master & Certified AI Product Manager",
    courses: [
      { id: "1", name: "AI-Driven Scrum Master™", slug: "ai-driven-scrum-master", badge: BADGES["ai-driven-scrum-master"], price: 299 },
      { id: "2", name: "Certified AI Product Manager", slug: "certified-ai-product-manager", badge: BADGES["certified-ai-product-manager"], price: 400 },
    ],
    comboPrice: 549,
    originalPrice: 1398,
    discount: 849,
    category: "ai",
    enrolled: "2.5K+",
    trending: true,
  },
  {
    id: "genai-ai-product",
    name: "Certified GenAI Practitioner & Certified AI Product Manager",
    courses: [
      { id: "1", name: "Certified GenAI Practitioner™", slug: "certified-genai-practitioner", badge: BADGES["certified-genai-practitioner"], price: 200 },
      { id: "2", name: "Certified AI Product Manager", slug: "certified-ai-product-manager", badge: BADGES["certified-ai-product-manager"], price: 400 },
    ],
    comboPrice: 499,
    originalPrice: 1200,
    discount: 701,
    category: "ai",
    enrolled: "2K+",
  },
  {
    id: "ssm-ai-scrum",
    name: "SAFe Scrum Master & AI-Driven Scrum Master",
    courses: [
      { id: "1", name: "SAFe Scrum Master (SSM)", slug: "scrum-master", badge: BADGES["scrum-master"], price: 555 },
      { id: "2", name: "AI-Driven Scrum Master™", slug: "ai-driven-scrum-master", badge: BADGES["ai-driven-scrum-master"], price: 299 },
    ],
    comboPrice: 699,
    originalPrice: 1708,
    discount: 1009,
    category: "ai",
    enrolled: "3K+",
    trending: true,
  },
  {
    id: "popm-ai-product",
    name: "SAFe POPM & Certified AI Product Manager",
    courses: [
      { id: "1", name: "SAFe POPM", slug: "product-owner-manager", badge: BADGES["product-owner-manager"], price: 555 },
      { id: "2", name: "Certified AI Product Manager", slug: "certified-ai-product-manager", badge: BADGES["certified-ai-product-manager"], price: 400 },
    ],
    comboPrice: 799,
    originalPrice: 1910,
    discount: 1111,
    category: "ai",
    enrolled: "2.5K+",
    trending: true,
  },
];
