"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  category: "SAFe Generative AI" | "Product AI";
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

// Pure AI courses (no SAFe mentions)
const aiCourses = [
  "Certified AI Product Manager",
  "No-Code AI Agents & Automation",
  "AI Agent Builder",
  "AI Product Management",
  "Generative AI for Project Managers",
  "Certified GenAI Practitioner",
  "Executive GenAI Leadership"
];

// AI + SAFe hybrid courses
const safeAICourses = [
  "AI-Driven Scrum Master",
  "Achieving Responsible AI with SAFe"
];

const generateTestimonials = (): Testimonial[] => {
  const testimonials: Testimonial[] = [];
  const avatarImages: string[] = [];
  
  // Get 150 avatar images - using AVATAR2 folder (adult avatars)
  const avatar2Images = [
    "image 472.png", "image 473.png", "image 474.png", "image 475.png", "image 476.png",
    "image 477.png", "image 478.png", "image 479.png", "image 485.png", "image 486.png",
    "image 487.png", "image 488.png", "image 489.png", "image 490.png", "image 491.png",
    "image 492.png", "image 493.png", "image 494.png", "image 496.png", "image 497.png"
  ];
  
  // Cycle through AVATAR2 images for all 150 testimonials
  for (let i = 0; i < 150; i++) {
    avatarImages.push(`/AVATAR2/${avatar2Images[i % avatar2Images.length]}`);
  }

  const firstInitials = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const lastNames = [
    "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez",
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

  // Generate 50 SAFe Generative AI testimonials (mix of pure SAFe and SAFe+AI courses)
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[i % trainers.length];
    let course: string;
    let reviewTemplates: string[];
    
    if (i < 35) {
      // First 35: Pure SAFe courses (no AI mentions)
      course = safeCourses[i % safeCourses.length];
      reviewTemplates = [
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
    } else {
      // Last 15: SAFe+AI hybrid courses
      course = safeAICourses[(i - 35) % safeAICourses.length];
      reviewTemplates = [
        `The ${course} training with ${trainer} was absolutely outstanding! ${trainer} is an exceptional instructor who made complex SAFe and AI concepts easy to understand. The hands-on approach and real-world examples were incredibly valuable. I highly recommend this course to anyone looking to advance their career.`,
        `I can't say enough good things about ${trainer} and the ${course} program. ${trainer}'s expertise in both SAFe and AI made the entire experience engaging and productive. The course materials were comprehensive, and ${trainer} was always available to answer questions.`,
        `${trainer} delivered an exceptional ${course} training session. The depth of knowledge in SAFe and AI was invaluable. ${trainer} created an interactive learning environment that kept everyone engaged throughout. I feel much more confident applying these concepts.`,
        `The ${course} course with ${trainer} exceeded all my expectations. ${trainer} is a true expert in SAFe and AI integration and has a gift for explaining complex topics clearly. The combination of theory and hands-on practice was perfect.`,
        `I'm so grateful I took the ${course} training with ${trainer}. ${trainer}'s teaching methodology and real-world experience made this course incredibly valuable. The interactive sessions helped reinforce the learning. Highly recommend!`
      ];
    }
    
    const firstName = firstInitials[i % firstInitials.length];
    const lastName = lastNames[i % lastNames.length];

    testimonials.push({
      id: i + 1,
      name: `${firstName}. ${lastName}`,
      avatar: avatarImages[i],
      rating: 5,
      review: reviewTemplates[i % reviewTemplates.length],
      category: "SAFe Generative AI",
      postedOn: "Google"
    });
  }

  // Generate 50 Product AI testimonials (pure AI courses, no SAFe mentions)
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[i % trainers.length];
    const course = aiCourses[i % aiCourses.length];
    const firstName = firstInitials[(i + 13) % firstInitials.length]; // Offset to get different initials
    const lastName = lastNames[(i + 50) % lastNames.length];
    
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
      id: i + 51,
      name: `${firstName}. ${lastName}`,
      avatar: avatarImages[i + 50],
      rating: 5,
      review: reviewTemplates[i % reviewTemplates.length],
      category: "Product AI",
      postedOn: "Google"
    });
  }

  return testimonials;
};

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "SAFe Generative AI" | "Product AI">("All");
  const [searchQuery, setSearchQuery] = useState("");

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
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("All")}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "All"
                    ? "bg-[#01203d] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("SAFe Generative AI")}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "SAFe Generative AI"
                    ? "bg-[#01203d] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                SAFe Generative AI
              </button>
              <button
                onClick={() => setActiveTab("Product AI")}
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 rounded-full object-cover"
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
        </div>
      </section>
    </main>
  );
}
