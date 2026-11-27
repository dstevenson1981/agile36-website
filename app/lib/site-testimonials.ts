export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  category: "SAFe" | "AI Courses";
  title: string;
  postedOn: string;
}

const trainers = ["Deadra Stevenson", "Marcus Ball"];

// Pure SAFe courses (no AI mentions)
const safeCourses = [
  "AI-Empowered Leading SAFe",
  "SAFe DevOps",
  "SAFe Lean Portfolio Management",
  "SAFe Agile Product Management",
  "AI-Empowered SAFe for Teams",
  "AI-Empowered SAFe Scrum Master",
  "AI-Empowered SAFe Product Owner/Product Manager"
];

const aiCourses = [
  "No-Code AI Agents & Automation",
  "AI Workflow Automation",
  "No-Code AI App Builder",
  "Certified AI Product Manager",
  "AI-Driven Scrum Master",
  "Executive GenAI Leadership",
  "Generative AI for Project Managers",
];

// Job titles shown under each testimonial (replaces the generic "graduate" label)
const safeTitles = [
  "Scrum Master", "Senior Scrum Master", "Product Owner", "Release Train Engineer",
  "Agile Coach", "Program Manager", "Portfolio Manager", "Enterprise Agile Coach",
  "IT Director", "VP of Engineering", "Project Manager", "Delivery Lead"
];

const aiTitles = [
  "Software Engineer", "Senior Software Engineer", "Engineering Manager", "AI Engineer",
  "Data Scientist", "Technical Lead", "Product Manager", "Head of Product",
  "Director of Engineering", "VP of Technology", "Solutions Architect", "Innovation Director"
];

function generateTestimonials(): Testimonial[] {
  const testimonials: Testimonial[] = [];
  const avatarImages: string[] = [];
  
  // Get all avatar images from AVATAR2 folder (adult avatars)
  const avatar2Images = [
    "image 1.png", "image 2.png", "image 3.png", "image 4.png", "image 5.png",
    "image 7.png", "image 8.png", "image 9.png", "image 12.png", "image 13.png",
    "image 14.png", "image 15.png", "image 16.png", "image 17.png", "image 18.png",
    "image 19.png", "image 20.png", "image 21.png", "image 22.png", "image 23.png",
    "image 24.png", "image 25.png", "image 26.png", "image 27.png", "image 29.png",
    "image 31.png", "image 32.png", "image 33.png", "image 34.png", "image 36.png",
    "image 37.png", "image 38.png", "image 39.png", "image 41.png", "image 44.png",
    "image 46.png", "image 47.png", "image 48.png", "image 49.png", "image 50.png",
    "image 51.png", "image 52.png", "image 53.png", "image 54.png", "image 55.png",
    "image 57.png", "image 58.png", "image 59.png", "image 60.png", "image 61.png",
    "image 62.png", "image 63.png", "image 64.png", "image 66.png", "image 67.png",
    "image 68.png", "image 70.png", "image 71.png", "image 72.png", "image 73.png",
    "image 74.png", "image 75.png", "image 77.png", "image 79.png", "image 81.png",
    "image 82.png", "image 83.png", "image 87.png", "image 89.png", "image 90.png",
    "image 91.png", "image 93.png", "image 94.png", "image 98.png", "image 146.png",
    "image 151.png", "image 155.png", "image 157.png", "image 159.png", "image 167.png",
    "image 168.png", "image 169.png", "image 170.png", "image 172.png", "image 174.png",
    "image 175.png", "image 177.png", "image 178.png", "image 182.png", "image 183.png",
    "image 186.png", "image 187.png", "image 190.png", "image 192.png", "image 193.png",
    "image 194.png", "image 201.png", "image 202.png", "image 204.png", "image 206.png",
    "image 207.png", "image 208.png", "image 209.png", "image 216.png", "image 219.png",
    "image 277.png", "image 280.png", "image 281.png", "image 283.png", "image 285.png",
    "image 291.png", "image 292.png", "image 293.png", "image 294.png", "image 295.png",
    "image 297.png", "image 299.png", "image 307.png", "image 309.png", "image 310.png",
    "image 321.png", "image 322.png", "image 323.png", "image 324.png", "image 332.png",
    "image 342.png", "image 344.png", "image 345.png", "image 347.png", "image 353.png",
    "image 354.png", "image 355.png", "image 357.png", "image 358.png", "image 360.png",
    "image 362.png", "image 363.png", "image 364.png", "image 365.png", "image 380.png",
    "image 384.png", "image 385.png", "image 393.png", "image 396.png", "image 397.png",
    "image 398.png", "image 400.png", "image 401.png", "image 402.png", "image 404.png",
    "image 406.png", "image 408.png", "image 411.png", "image 412.png", "image 413.png",
    "image 416.png", "image 421.png", "image 425.png", "image 428.png", "image 472.png",
    "image 473.png", "image 474.png", "image 475.png", "image 476.png", "image 477.png",
    "image 478.png", "image 479.png", "image 485.png", "image 486.png", "image 487.png",
    "image 488.png", "image 489.png", "image 490.png", "image 491.png", "image 492.png",
    "image 493.png", "image 494.png", "image 496.png", "image 497.png"
  ];
  
  // Cycle through AVATAR2 images for all 150 testimonials
  for (let i = 0; i < 150; i++) {
    const imageName = avatar2Images[i % avatar2Images.length];
    avatarImages.push(`/AVATAR2/${imageName}`);
  }

  const firstInitials = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const lastNames = [
    "Johnson", "Williams", "Smith", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez",
    "Lopez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson",
    "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen",
    "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson",
    "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans",
    "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales",
    "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed",
    "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez",
    "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo",
    "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry",
    "Butler", "Barnes", "Fisher", "Henderson", "Coleman", "Simmons", "Patterson", "Jordan", "Reynolds", "Hamilton",
    "Graham", "Gonzales", "Alexander", "Wallace", "Griffin", "West", "Cole", "Hayes", "Chen", "Wang"
  ];

  // Generate 50 SAFe testimonials (pure SAFe courses, no AI mentions)
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[i % trainers.length];
    const course = safeCourses[i % safeCourses.length];
    const firstName = firstInitials[i % firstInitials.length];
    const lastName = lastNames[i % lastNames.length];
    
    const reviewTemplates = [
      `The ${course} training with ${trainer} was absolutely outstanding! ${trainer} is an exceptional instructor who made complex SAFe concepts easy to understand. The hands-on approach and real-world examples were incredibly valuable. I highly recommend this course to anyone looking to advance their career in scaled agile.`,
      `I can't say enough good things about ${trainer} and the ${course} program. ${trainer}'s expertise and teaching style made the entire experience engaging and productive. The course materials were comprehensive, and ${trainer} was always available to answer questions. This has been one of the best training experiences I've had.`,
      `${trainer} delivered an exceptional ${course} training session. The depth of knowledge and practical insights shared were invaluable. ${trainer} created an interactive learning environment that kept everyone engaged throughout. I feel much more confident applying these SAFe principles in my work.`,
      `The ${course} course with ${trainer} exceeded all my expectations. ${trainer} is a true expert in SAFe and has a gift for explaining complex topics clearly. The combination of theory and hands-on practice was perfect. I'm already seeing the benefits in my daily work.`,
      `I'm so grateful I took the ${course} training with ${trainer}. ${trainer}'s teaching methodology and real-world experience made this course incredibly valuable. The interactive sessions and breakout activities helped reinforce the learning. Highly recommend!`,
      `${trainer} is an outstanding instructor for the ${course} program. The way ${trainer} breaks down complex SAFe concepts is remarkable. I appreciated ${trainer}'s patience and willingness to ensure everyone understood the material. This course has transformed my understanding of scaled agile.`,
      `The ${course} training with ${trainer} was transformative. ${trainer}'s expertise in SAFe is evident in every session. The practical exercises and case studies were particularly helpful. I feel equipped to implement these strategies immediately.`,
      `I had an amazing experience with ${trainer} in the ${course} course. ${trainer}'s passion for SAFe is contagious, and the structured approach made learning enjoyable. The real-world examples ${trainer} shared were incredibly insightful.`,
      `${trainer} delivered a world-class ${course} training. The combination of ${trainer}'s industry experience and teaching skills created an optimal learning environment. I particularly appreciated how ${trainer} tailored examples to different industries.`,
      `The ${course} program with ${trainer} was exceptional. ${trainer} has a unique ability to make complex SAFe topics accessible. The interactive format and ${trainer}'s engaging style kept me motivated throughout. This is training at its finest.`
    ];

    // Use a different avatar for C. Smith, F. Miller, H. Rodriguez, and K. Lopez to avoid chatbot face and duplicates
    let avatarIndex = i;
    if (firstName === "C" && lastName === "Smith") {
      avatarIndex = (i + 1) % avatarImages.length;
    } else if (firstName === "F" && lastName === "Miller") {
      avatarIndex = (i + 2) % avatarImages.length;
    } else if (firstName === "H" && lastName === "Rodriguez") {
      avatarIndex = (i + 3) % avatarImages.length;
    } else if (firstName === "K" && lastName === "Lopez") {
      avatarIndex = (i + 4) % avatarImages.length;
    }
    
    testimonials.push({
      id: i + 1,
      name: `${firstName}. ${lastName}`,
      avatar: avatarImages[avatarIndex],
      rating: 5,
      review: reviewTemplates[i % reviewTemplates.length],
      category: "SAFe",
      title: safeTitles[i % safeTitles.length],
      postedOn: "Google"
    });
  }

  // Generate 50 AI course testimonials
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[i % trainers.length];
    const course = aiCourses[i % aiCourses.length];
    const firstName = firstInitials[(i + 13) % firstInitials.length];
    const lastName = lastNames[(i + 50) % lastNames.length];

    const reviewTemplates = [
      `The ${course} training with ${trainer} was absolutely phenomenal! ${trainer} is a master instructor who brought hands-on AI work to life. The projects and ${trainer}'s guidance helped me leave with something I can actually use. This course has been a game-changer for my career.`,
      `I'm blown away by the quality of the ${course} program with ${trainer}. ${trainer}'s expertise in practical AI is unmatched. The practical approach and ${trainer}'s real-world insights made every session valuable. I can't recommend this enough!`,
      `${trainer} delivered an incredible ${course} training experience. ${trainer}'s teaching style and deep knowledge of no-code AI tools made complex concepts easy to grasp. The practical exercises with ${trainer}'s mentorship were particularly rewarding.`,
      `The ${course} course with ${trainer} exceeded all expectations. ${trainer} is not just an instructor but a true mentor. The way ${trainer} explained how to build and ship with AI was outstanding. This course has opened new doors for me.`,
      `I had an exceptional experience with ${trainer} in the ${course} program. ${trainer}'s ability to connect AI tools with real business work is remarkable. The interactive sessions and ${trainer}'s feedback were invaluable. Highly recommended!`,
    ];

    testimonials.push({
      id: i + 51,
      name: `${firstName}. ${lastName}`,
      avatar: avatarImages[i + 50],
      rating: 5,
      review: reviewTemplates[i % reviewTemplates.length],
      category: "AI Courses",
      title: aiTitles[i % aiTitles.length],
      postedOn: "Google"
    });
  }

  return testimonials;
};


let cached: Testimonial[] | null = null;

export function getSiteTestimonials(): Testimonial[] {
  if (!cached) cached = generateTestimonials();
  return cached;
}

const COURSE_MENTION: Record<string, string> = {
  "leading-safe": "AI-Empowered Leading SAFe",
  devops: "SAFe DevOps",
  "lean-portfolio-management": "SAFe Lean Portfolio Management",
  "agile-product-management": "SAFe Agile Product Management",
  "safe-for-teams": "AI-Empowered SAFe for Teams",
  "scrum-master": "AI-Empowered SAFe Scrum Master",
  "product-owner-manager": "AI-Empowered SAFe Product Owner/Product Manager",
  "ai-agent-builder": "No-Code AI Agents & Automation",
  "ai-workflow-automation": "AI Workflow Automation",
  "ai-app-builder": "No-Code AI App Builder",
  "certified-ai-product-manager": "Certified AI Product Manager",
  "ai-driven-scrum-master": "AI-Driven Scrum Master",
  "executive-genai-leadership": "Executive GenAI Leadership",
  "generative-ai-project-managers": "Generative AI for Project Managers",
};

export function testimonialsForSlug(slug: string, limit = 6): Testimonial[] {
  const all = getSiteTestimonials();
  const mention = COURSE_MENTION[slug];
  if (mention) {
    const matched = all.filter((item) => item.review.includes(mention));
    if (matched.length) return matched.slice(0, limit);
  }
  const ai = all.filter((item) => item.category === "AI Courses");
  const safe = all.filter((item) => item.category === "SAFe");
  const pool = /ai-|genai|generative/i.test(slug) ? ai : safe;
  return pool.slice(0, limit);
}
