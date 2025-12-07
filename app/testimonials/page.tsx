"use client";

import { useState, useMemo, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  category: "SAFe" | "Generative AI" | "Product AI";
  postedOn: string;
}

const trainers = ["Joe Puoci", "Deadra Stevenson", "Marcus Ball"];

// Pure SAFe courses (no AI mentions)
const safeCourses = [
  "Leading SAFe",
  "SAFe DevOps",
  "SAFe Lean Portfolio Management",
  "SAFe Agile Product Management",
  "SAFe for Teams",
  "SAFe Scrum Master",
  "SAFe Product Owner/Product Manager"
];

// Generative AI courses (includes SAFe+AI hybrid)
const generativeAICourses = [
  "Generative AI for Project Managers",
  "Certified GenAI Practitioner",
  "Executive GenAI Leadership",
  "AI-Driven Scrum Master",
  "Achieving Responsible AI with SAFe"
];

// Product AI courses
const productAICourses = [
  "Certified AI Product Manager",
  "No-Code AI Agents & Automation",
  "AI Agent Builder",
  "AI Product Management"
];

const generateTestimonials = (): Testimonial[] => {
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
      postedOn: "Google"
    });
  }

  // Generate 50 Generative AI testimonials (Generative AI courses + SAFe+AI hybrid)
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[i % trainers.length];
    const course = generativeAICourses[i % generativeAICourses.length];
    const firstName = firstInitials[(i + 13) % firstInitials.length];
    const lastName = lastNames[(i + 50) % lastNames.length];
    
    // Check if it's a hybrid course (mentions both SAFe and AI)
    const isHybrid = course === "AI-Driven Scrum Master" || course === "Achieving Responsible AI with SAFe";
    
    const reviewTemplates = isHybrid ? [
      `The ${course} training with ${trainer} was absolutely outstanding! ${trainer} is an exceptional instructor who made complex SAFe and AI concepts easy to understand. The hands-on approach and real-world examples were incredibly valuable. I highly recommend this course to anyone looking to advance their career.`,
      `I can't say enough good things about ${trainer} and the ${course} program. ${trainer}'s expertise in both SAFe and AI made the entire experience engaging and productive. The course materials were comprehensive, and ${trainer} was always available to answer questions.`,
      `${trainer} delivered an exceptional ${course} training session. The depth of knowledge in SAFe and AI was invaluable. ${trainer} created an interactive learning environment that kept everyone engaged throughout. I feel much more confident applying these concepts.`,
      `The ${course} course with ${trainer} exceeded all my expectations. ${trainer} is a true expert in SAFe and AI integration and has a gift for explaining complex topics clearly. The combination of theory and hands-on practice was perfect.`,
      `I'm so grateful I took the ${course} training with ${trainer}. ${trainer}'s teaching methodology and real-world experience made this course incredibly valuable. The interactive sessions helped reinforce the learning. Highly recommend!`
    ] : [
      `The ${course} training with ${trainer} was absolutely phenomenal! ${trainer} is a master instructor who brought the world of generative AI to life. The hands-on projects and ${trainer}'s guidance helped me understand AI implementation. This course has been a game-changer for my career.`,
      `I'm blown away by the quality of the ${course} program with ${trainer}. ${trainer}'s expertise in generative AI is unmatched. The practical approach and ${trainer}'s real-world insights made every session valuable. I can't recommend this enough!`,
      `${trainer} delivered an incredible ${course} training experience. ${trainer}'s teaching style and deep knowledge of generative AI made complex concepts easy to grasp. The practical exercises with ${trainer}'s mentorship were particularly rewarding.`,
      `The ${course} course with ${trainer} exceeded all expectations. ${trainer} is not just an instructor but a true mentor. The way ${trainer} explained generative AI strategies and implementation was outstanding. This course has opened new doors for me.`,
      `I had an exceptional experience with ${trainer} in the ${course} program. ${trainer}'s ability to connect AI theory with practical application is remarkable. The interactive sessions and ${trainer}'s feedback were invaluable. Highly recommended!`,
      `${trainer} is an outstanding instructor for the ${course} training. ${trainer}'s passion for generative AI is evident throughout. The course structure and ${trainer}'s teaching methodology created an optimal learning experience.`,
      `The ${course} training with ${trainer} was transformative. ${trainer}'s expertise in generative AI and hands-on approach helped me build confidence. The real-world examples ${trainer} shared were incredibly valuable.`,
      `I'm so grateful for the ${course} course with ${trainer}. ${trainer}'s teaching style and industry experience made this one of the best training programs I've attended. ${trainer} truly understands how to help professionals succeed with generative AI.`
    ];

    testimonials.push({
      id: i + 51,
      name: `${firstName}. ${lastName}`,
      avatar: avatarImages[i + 50],
      rating: 5,
      review: reviewTemplates[i % reviewTemplates.length],
      category: "Generative AI",
      postedOn: "Google"
    });
  }

  // Generate 50 Product AI testimonials (Product AI courses, no SAFe mentions)
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[i % trainers.length];
    const course = productAICourses[i % productAICourses.length];
    const firstName = firstInitials[(i + 26) % firstInitials.length];
    const lastName = lastNames[(i + 100) % lastNames.length];
    
    const reviewTemplates = [
      `The ${course} training with ${trainer} was absolutely phenomenal! ${trainer} is a master instructor who brought the world of AI product management to life. The hands-on projects and ${trainer}'s guidance helped me build real AI products. This course has been a game-changer for my career.`,
      `I'm blown away by the quality of the ${course} program with ${trainer}. ${trainer}'s expertise in AI and product management is unmatched. The practical approach and ${trainer}'s real-world insights made every session valuable. I can't recommend this enough!`,
      `${trainer} delivered an incredible ${course} training experience. ${trainer}'s teaching style and deep knowledge of AI product development made complex concepts easy to grasp. The capstone project with ${trainer}'s mentorship was particularly rewarding.`,
      `The ${course} course with ${trainer} exceeded all expectations. ${trainer} is not just an instructor but a true mentor. The way ${trainer} explained AI product strategies and implementation was outstanding. This course has opened new doors for me.`,
      `I had an exceptional experience with ${trainer} in the ${course} program. ${trainer}'s ability to connect AI theory with practical product development is remarkable. The interactive sessions and ${trainer}'s feedback were invaluable. Highly recommended!`,
      `${trainer} is an outstanding instructor for the ${course} training. ${trainer}'s passion for AI product innovation is evident throughout. The course structure and ${trainer}'s teaching methodology created an optimal learning experience.`,
      `The ${course} training with ${trainer} was transformative. ${trainer}'s expertise in AI product management and hands-on approach helped me build confidence. The real-world examples ${trainer} shared were incredibly valuable.`,
      `I'm so grateful for the ${course} course with ${trainer}. ${trainer}'s teaching style and industry experience made this one of the best training programs I've attended. ${trainer} truly understands how to help product managers succeed with AI.`,
      `The ${course} program with ${trainer} was world-class. ${trainer}'s knowledge of AI tools and product development is impressive. The practical exercises and ${trainer}'s guidance helped me create a portfolio-ready AI product.`,
      `${trainer} delivered an amazing ${course} training. ${trainer}'s ability to make AI product concepts accessible and actionable is remarkable. The course exceeded my expectations, and ${trainer}'s mentorship was invaluable.`
    ];

    testimonials.push({
      id: i + 101,
      name: `${firstName}. ${lastName}`,
      avatar: avatarImages[i + 100],
      rating: 5,
      review: reviewTemplates[i % reviewTemplates.length],
      category: "Product AI",
      postedOn: "Google"
    });
  }

  return testimonials;
};

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "SAFe" | "Generative AI" | "Product AI">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const allTestimonials = useMemo(() => generateTestimonials(), []);

  const filteredTestimonials = useMemo(() => {
    let filtered = allTestimonials;

    if (activeTab !== "All") {
      filtered = filtered.filter(t => t.category === activeTab);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.review.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allTestimonials, activeTab, searchQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Learners Say
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Hear why our participants love us
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Based on 2500+ reviews</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-yellow-400">4.9</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="w-full bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  setActiveTab("All");
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "All"
                    ? "bg-[#01203d] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setActiveTab("SAFe");
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "SAFe"
                    ? "bg-[#01203d] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                SAFe
              </button>
              <button
                onClick={() => {
                  setActiveTab("Generative AI");
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "Generative AI"
                    ? "bg-[#01203d] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Generative AI
              </button>
              <button
                onClick={() => {
                  setActiveTab("Product AI");
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "Product AI"
                    ? "bg-[#01203d] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Product AI
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search Testimonials"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01203d] focus:border-transparent"
              />
              <button className="bg-[#fa4a23] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e03d1a] transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredTestimonials.length} {filteredTestimonials.length === 1 ? "review" : "reviews"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] rounded-full object-cover"
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        (e.target as HTMLImageElement).src = '/AVATAR2/image 472.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{testimonial.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {testimonial.rating}/5 Posted on {testimonial.postedOn}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.review}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          currentPage === page
                            ? "bg-[#01203d] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-4 py-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
