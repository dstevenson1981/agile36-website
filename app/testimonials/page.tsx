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

const safeGenerativeAICourses = [
  "Leading SAFe",
  "SAFe DevOps",
  "SAFe Lean Portfolio Management",
  "SAFe Agile Product Management",
  "SAFe for Teams",
  "SAFe Scrum Master",
  "SAFe Product Owner/Product Manager",
  "Generative AI for Project Managers",
  "Certified GenAI Practitioner",
  "Executive GenAI Leadership",
  "AI-Driven Scrum Master",
  "Achieving Responsible AI with SAFe"
];

const productAICourses = [
  "Certified AI Product Manager",
  "No-Code AI Agents & Automation",
  "AI Agent Builder",
  "AI Product Management"
];

const generateTestimonials = (): Testimonial[] => {
  const testimonials: Testimonial[] = [];
  const avatarImages: string[] = [];
  
  // Get 150 avatar images - using available images
  const availableImages = [
    "image 1.png", "image 2.png", "image 3.png", "image 4.png", "image 5.png", "image 6.png", "image 7.png", "image 8.png", "image 9.png", "image 10.png",
    "image 11.png", "image 12.png", "image 13.png", "image 14.png", "image 15.png", "image 16.png", "image 17.png", "image 18.png", "image 19.png", "image 20.png",
    "image 21.png", "image 22.png", "image 23.png", "image 24.png", "image 25.png", "image 26.png", "image 27.png", "image 28.png", "image 29.png", "image 31.png",
    "image 32.png", "image 33.png", "image 34.png", "image 36.png", "image 37.png", "image 38.png", "image 39.png", "image 40.png", "image 41.png", "image 42.png",
    "image 44.png", "image 46.png", "image 47.png", "image 48.png", "image 49.png", "image 50.png", "image 51.png", "image 52.png", "image 53.png", "image 54.png",
    "image 55.png", "image 56.png", "image 57.png", "image 58.png", "image 59.png", "image 60.png", "image 61.png", "image 62.png", "image 63.png", "image 64.png",
    "image 65.png", "image 66.png", "image 67.png", "image 68.png", "image 69.png", "image 70.png", "image 71.png", "image 72.png", "image 73.png", "image 74.png",
    "image 75.png", "image 76.png", "image 77.png", "image 78.png", "image 79.png", "image 80.png", "image 81.png", "image 82.png", "image 83.png", "image 84.png",
    "image 85.png", "image 86.png", "image 87.png", "image 88.png", "image 89.png", "image 90.png", "image 91.png", "image 93.png", "image 94.png", "image 98.png",
    "image 146.png", "image 147.png", "image 151.png", "image 155.png", "image 157.png", "image 158.png", "image 159.png", "image 167.png", "image 168.png", "image 169.png",
    "image 170.png", "image 172.png", "image 174.png", "image 175.png", "image 177.png", "image 178.png", "image 179.png", "image 180.png", "image 182.png", "image 183.png",
    "image 184.png", "image 186.png", "image 187.png", "image 188.png", "image 190.png", "image 192.png", "image 193.png", "image 194.png", "image 196.png", "image 197.png",
    "image 201.png", "image 202.png", "image 204.png", "image 205.png", "image 206.png", "image 207.png", "image 208.png", "image 209.png", "image 216.png", "image 219.png",
    "image 262.png", "image 275.png", "image 277.png", "image 278.png", "image 279.png", "image 280.png", "image 281.png", "image 282.png", "image 283.png", "image 284.png",
    "image 285.png", "image 288.png", "image 291.png", "image 292.png", "image 293.png", "image 294.png", "image 295.png", "image 297.png", "image 298.png", "image 299.png"
  ];
  
  for (let i = 0; i < 150; i++) {
    avatarImages.push(`/Avatars/${availableImages[i % availableImages.length]}`);
  }

  const firstNames = [
    "Sarah", "Michael", "Emily", "David", "Jessica", "James", "Amanda", "Robert", "Lisa", "Christopher",
    "Michelle", "Daniel", "Ashley", "Matthew", "Melissa", "Andrew", "Nicole", "Joshua", "Stephanie", "Ryan",
    "Jennifer", "Justin", "Lauren", "Brandon", "Rachel", "Tyler", "Samantha", "Kevin", "Kimberly", "Eric",
    "Amy", "Brian", "Angela", "Jonathan", "Michelle", "Steven", "Patricia", "Thomas", "Nancy", "Richard",
    "Karen", "Charles", "Betty", "Joseph", "Helen", "William", "Sandra", "Christopher", "Donna", "Daniel",
    "Carol", "Paul", "Ruth", "Mark", "Sharon", "Donald", "Michelle", "Steven", "Laura", "Andrew",
    "Sarah", "Kenneth", "Emily", "Joshua", "Kimberly", "Kevin", "Deborah", "Brian", "Lisa", "George",
    "Nancy", "Edward", "Betty", "Ronald", "Helen", "Timothy", "Sandra", "Jason", "Donna", "Jeffrey",
    "Carol", "Ryan", "Ruth", "Jacob", "Sharon", "Gary", "Michelle", "Nicholas", "Laura", "Eric",
    "Sarah", "Jonathan", "Emily", "Stephen", "Kimberly", "Larry", "Deborah", "Justin", "Lisa", "Frank",
    "Nancy", "Scott", "Betty", "Brandon", "Helen", "Benjamin", "Sandra", "Samuel", "Donna", "Gregory",
    "Carol", "Raymond", "Ruth", "Alexander", "Sharon", "Patrick", "Michelle", "Jack", "Laura", "Dennis"
  ];

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
    "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry"
  ];

  // Generate 50 SAFe Generative AI testimonials
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[i % trainers.length];
    const course = safeGenerativeAICourses[i % safeGenerativeAICourses.length];
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    
    const reviewTemplates = [
      `The ${course} training with ${trainer} was absolutely outstanding! ${trainer} is an exceptional instructor who made complex concepts easy to understand. The hands-on approach and real-world examples were incredibly valuable. I highly recommend this course to anyone looking to advance their career in SAFe and Generative AI.`,
      `I can't say enough good things about ${trainer} and the ${course} program. ${trainer}'s expertise and teaching style made the entire experience engaging and productive. The course materials were comprehensive, and ${trainer} was always available to answer questions. This has been one of the best training experiences I've had.`,
      `${trainer} delivered an exceptional ${course} training session. The depth of knowledge and practical insights shared were invaluable. ${trainer} created an interactive learning environment that kept everyone engaged throughout. I feel much more confident applying these concepts in my work.`,
      `The ${course} course with ${trainer} exceeded all my expectations. ${trainer} is a true expert in the field and has a gift for explaining complex topics clearly. The combination of theory and hands-on practice was perfect. I'm already seeing the benefits in my daily work.`,
      `I'm so grateful I took the ${course} training with ${trainer}. ${trainer}'s teaching methodology and real-world experience made this course incredibly valuable. The interactive sessions and breakout activities helped reinforce the learning. Highly recommend!`,
      `${trainer} is an outstanding instructor for the ${course} program. The way ${trainer} breaks down complex SAFe and AI concepts is remarkable. I appreciated ${trainer}'s patience and willingness to ensure everyone understood the material. This course has transformed my understanding.`,
      `The ${course} training with ${trainer} was transformative. ${trainer}'s expertise in both SAFe and Generative AI is evident in every session. The practical exercises and case studies were particularly helpful. I feel equipped to implement these strategies immediately.`,
      `I had an amazing experience with ${trainer} in the ${course} course. ${trainer}'s passion for the subject matter is contagious, and the structured approach made learning enjoyable. The real-world examples ${trainer} shared were incredibly insightful.`,
      `${trainer} delivered a world-class ${course} training. The combination of ${trainer}'s industry experience and teaching skills created an optimal learning environment. I particularly appreciated how ${trainer} tailored examples to different industries.`,
      `The ${course} program with ${trainer} was exceptional. ${trainer} has a unique ability to make complex topics accessible. The interactive format and ${trainer}'s engaging style kept me motivated throughout. This is training at its finest.`
    ];

    testimonials.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      avatar: avatarImages[i],
      rating: 5,
      review: reviewTemplates[i % reviewTemplates.length],
      category: "SAFe Generative AI",
      postedOn: "Google"
    });
  }

  // Generate 50 Product AI testimonials
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[i % trainers.length];
    const course = productAICourses[i % productAICourses.length];
    const firstName = firstNames[(i + 50) % firstNames.length];
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
      name: `${firstName} ${lastName}`,
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
                        (e.target as HTMLImageElement).src = '/Avatars/image 1.png';
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

