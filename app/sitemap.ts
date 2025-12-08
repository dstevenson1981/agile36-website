import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.agile36.com';
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // SAFe Certification Course Pages
  const safeCourses: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/courses/leading-safe`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/product-owner-manager`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/lean-portfolio-management`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/agile-product-management`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/scrum-master`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/safe-for-teams`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/devops`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/advanced-scrum-master`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/release-train-engineer`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/value-stream-mapping`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/responsible-ai`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/safe-devops`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // AI Product Manager Certification Pages
  const aiProductCourses: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/courses/certified-ai-product-manager`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/ai-agent-builder`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Generative AI Course Pages
  const genAICourses: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/courses/ai-driven-scrum-master`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/executive-genai-leadership`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/generative-ai-project-managers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/certified-genai-practitioner`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // PMI Certification Pages
  const pmiCourses: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/courses/pmp-certification`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Blog/Resource Pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/ai-transformation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/ai-tools-product-managers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/lean-portfolio-management`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // City-specific certification training pages
  // List of cities (30 major US cities)
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

  // Certification training routes
  const certificationRoutes = [
    'leading-safe-certification-training',
    'safe-for-teams-certification-training',
    'scrum-master-certification-training',
    'agile-product-management-certification-training',
    'safe-product-owner-product-manager-certification-training',
    'lean-portfolio-management-certification-training',
    'release-train-engineer-certification-training',
  ];

  // Generate all city-specific certification training pages
  const cityCertificationPages: MetadataRoute.Sitemap = [];
  for (const route of certificationRoutes) {
    for (const city of cities) {
      cityCertificationPages.push({
        url: `${baseUrl}/${route}/${city}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Combine all pages
  return [
    ...staticPages,
    ...safeCourses,
    ...aiProductCourses,
    ...genAICourses,
    ...pmiCourses,
    ...blogPages,
    ...cityCertificationPages,
  ];
}

