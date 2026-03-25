import { MetadataRoute } from 'next';
import { seoPages } from '@/data/seoPages';

const BASE_URL = 'https://www.agile36.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Main pages: priority 1.0 for homepage, 0.6 for everything else; monthly
  const mainPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: currentDate, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/corporate`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/safe-certifications`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/combo-courses`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // All course pages under /courses/: weekly, priority 0.8
  const courseSlugs = [
    'leading-safe',
    'product-owner-manager',
    'lean-portfolio-management',
    'agile-product-management',
    'scrum-master',
    'safe-for-teams',
    'devops',
    'advanced-scrum-master',
    'release-train-engineer',
    'value-stream-mapping',
    'responsible-ai',
    'safe-devops',
    'certified-ai-product-manager',
    'ai-agent-builder',
    'ai-driven-scrum-master',
    'executive-genai-leadership',
    'generative-ai-project-managers',
    'certified-genai-practitioner',
    'pmp-certification',
  ];

  const coursePages: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${BASE_URL}/courses/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Geo pages (city-specific certification training): monthly, priority 0.6
  const cities = [
    'new-york',
    'los-angeles',
    'chicago',
    'houston',
    'phoenix',
    'philadelphia',
    'san-antonio',
    'san-diego',
    'dallas',
    'san-jose',
    'austin',
    'jacksonville',
    'fort-worth',
    'columbus',
    'charlotte',
    'san-francisco',
    'indianapolis',
    'seattle',
    'denver',
    'washington',
    'boston',
    'nashville',
    'oklahoma-city',
    'las-vegas',
    'portland',
    'miami',
    'tampa',
    'orlando',
    'raleigh',
    'baltimore',
  ];

  const geoRoutes = [
    'leading-safe-certification-training',
    'safe-for-teams-certification-training',
    'scrum-master-certification-training',
    'agile-product-management-certification-training',
    'safe-product-owner-product-manager-certification-training',
    'lean-portfolio-management-certification-training',
    'release-train-engineer-certification-training',
  ];

  const geoPages: MetadataRoute.Sitemap = [];
  for (const route of geoRoutes) {
    for (const city of cities) {
      geoPages.push({
        url: `${BASE_URL}/${route}/${city}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  const programmaticSeoPages: MetadataRoute.Sitemap = seoPages.map(
    (p: { slug: string }) => ({
      url: `${BASE_URL}/${p.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })
  );

  const blogSlugs = [
    'ai-transformation',
    'ai-tools-product-managers',
    'lean-portfolio-management',
    'leading-safe-certification-cost-2026',
    'is-safe-certification-worth-it-2026',
    'safe-lpm-vs-popm',
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [
    ...mainPages,
    ...coursePages,
    ...geoPages,
    ...programmaticSeoPages,
    ...blogPages,
  ];
}
