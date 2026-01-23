"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Course {
  id: string;
  title: string;
  category: string;
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
}

function CoursesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'SAFe');

  // Update selected category when URL param changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'SAFe';
    setSelectedCategory(cat);
  }, [searchParams]);

  // Mapping for course thumbnail images
  const courseThumbnails: { [key: string]: string } = {
    "Leading SAFe/ SAFe Agilist": "/Leading SAFe.png",
    "Leading SAFe® 6.0 Certification Training": "/Leading SAFe.png",
    "SAFe Lean Portfolio Management": "/Lean Portfolio.png",
    "SAFe Agile Product Management": "/AgileProductManagment.png",
    "SAFe for Teams": "/SAFe for Teams.png",
    "SAFe DevOps": "/Devops.png",
    "SAFe Advanced Scrum Master": "/AdvancedSM.png",
    "SAFe Release Train Engineer": "/RTE.png",
    "SAFe Product Owner/Product Manager": "/POPM.jpg",
    "SAFe Scrum Master": "/SSM.jpeg",
    "Responsible AI with SAFe": "/MicroCredential.jpeg",
    "Certified AI Product Manager": "/PMAI.jpeg",
    "Agentic Product Leader Certification": "/Agentic.jpeg",
    "PMP® Certification Training": "/PMP.png",
    "Responsible AI": "/MicroCredential.jpeg",
    "SAFe Value Stream Mapping": "/MicroCredential.jpeg",
  };

  const getCourseImage = (course: Course) => {
    // Use GenAI_2.png for all Generative AI and AI Product courses
    if (course.category === "Generative AI" || course.category === "AI Product") {
      return "/GenAI_2.png";
    }
    return courseThumbnails[course.title] || course.image;
  };

  const allCourses: Course[] = [
    // SAFe courses
    {
      id: "8",
      title: "Leading SAFe/ SAFe Agilist",
      category: "SAFe",
      image: "/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg",
      price: 555,
      originalPrice: 1110,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "3K+ Enrolled",
      skills: "SAFe Principles, Lean-Agile Practices",
      popular: true,
    },
    {
      id: "9",
      title: "SAFe Product Owner/Product Manager",
      category: "SAFe",
      image: "/annie-spratt-hCb3lIB8L8E-unsplash.jpg",
      price: 555,
      originalPrice: 1110,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "2.5K+ Enrolled",
      skills: "Product Ownership, SAFe PO/PM Practices",
      popular: true,
    },
    {
      id: "10",
      title: "SAFe Lean Portfolio Management",
      category: "SAFe",
      image: "/brooke-cagle--uHVRvDr7pg-unsplash.jpg",
      price: 1095,
      originalPrice: 2190,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "1.8K+ Enrolled",
      skills: "Portfolio Strategy, Investment Funding, Value Stream Management",
      popular: true,
      advanced: true,
    },
    {
      id: "11",
      title: "SAFe Agile Product Management",
      category: "SAFe",
      image: "/campaign-creators-gMsnXqILjp4-unsplash.jpg",
      price: 1095,
      originalPrice: 2190,
      hours: "24 Hrs",
      days: "03 days",
      enrolled: "2K+ Enrolled",
      skills: "Agile Product Management, Continuous Exploration",
      popular: true,
      advanced: true,
    },
    {
      id: "12",
      title: "SAFe Scrum Master",
      category: "SAFe",
      image: "/christina-wocintechchat-com-0Nfqp0WiJqc-unsplash (1).jpg",
      price: 555,
      originalPrice: 1110,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "3.5K+ Enrolled",
      skills: "SAFe Scrum, Team Facilitation, Coaching",
      popular: true,
    },
    {
      id: "13",
      title: "SAFe for Teams",
      category: "SAFe",
      image: "/christina-wocintechchat-com-faEfWCdOKIg-unsplash.jpg",
      price: 599,
      originalPrice: 1198,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "4K+ Enrolled",
      skills: "SAFe Team Practices, Iteration Execution",
      popular: true,
    },
    {
      id: "15",
      title: "SAFe DevOps",
      category: "SAFe",
      image: "/ewan-buck-xc9B3i-1QiI-unsplash.jpg",
      price: 699,
      originalPrice: 1398,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "2.2K+ Enrolled",
      skills: "DevOps Practices, Continuous Delivery, SAFe Pipeline",
      popular: true,
    },
    {
      id: "16",
      title: "SAFe Advanced Scrum Master",
      category: "SAFe",
      image: "/headway-5QgIuuBxKwM-unsplash.jpg",
      price: 950,
      originalPrice: 1900,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "2K+ Enrolled",
      skills: "Advanced Scrum Mastery, Program Level Coaching",
    },
    {
      id: "17",
      title: "SAFe Release Train Engineer",
      category: "SAFe",
      image: "/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
      price: 0,
      originalPrice: 0,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "1.8K+ Enrolled",
      skills: "RTE Practices, Agile Release Train Facilitation",
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
      price: 299,
      originalPrice: 598,
      hours: "8 Hrs",
      days: "01 day",
      enrolled: "2.5K+ Enrolled",
      skills: "AI-Enhanced Scrum Practices, Agile AI Tools, Team Facilitation",
      popular: true,
    },
    {
      id: "20",
      title: "Executive GenAI Leadership™",
      category: "Generative AI",
      image: "/redd-francisco-PTRzqc_h1r4-unsplash.jpg",
      price: 299,
      originalPrice: 598,
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
      price: 299,
      originalPrice: 598,
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
      price: 200,
      originalPrice: 400,
      hours: "4 Hrs",
      days: "Half day",
      enrolled: "3K+ Enrolled",
      skills: "GenAI Fundamentals, AI Ethics, Prompt Engineering, AI Applications",
      popular: true,
    },
    {
      id: "23",
      title: "AI Agent Builder™",
      category: "Generative AI",
      image: "/christina-wocintechchat-com-faEfWCdOKIg-unsplash.jpg",
      price: 555,
      originalPrice: 1110,
      hours: "8 Hrs",
      days: "01 day",
      enrolled: "1.5K+ Enrolled",
      skills: "AI Agent Development, Autonomous Systems, Agent Architecture",
    },
    // AI Product courses
    {
      id: "24",
      title: "Certified AI Product Manager",
      category: "AI Product",
      image: "/annie-spratt-QckxruozjRg-unsplash.jpg",
      price: 555,
      originalPrice: 1110,
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
      price: 499,
      originalPrice: 998,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "1.8K+ Enrolled",
      skills: "Agentic Product Leadership, Autonomous Product Systems, Strategic AI Product Vision",
      popular: true,
    },
    // PMI courses
    {
      id: "4",
      title: "PMP® Certification Training",
      category: "PMI",
      image: "/annie-spratt-sggw4-qDD54-unsplash.jpg",
      price: 1150,
      originalPrice: 2300,
      hours: "35 PDUs",
      days: "06 weeks",
      enrolled: "30K+ Enrolled",
      skills: "A PROVEN 60 DAY STUDY BLUEPRINT Get Your PMP in 60 Days is a focused, results-driven program designed for professionals who are serious about earning their PMP certification",
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
      enrolled: "1.2K+ Enrolled",
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
      enrolled: "1.5K+ Enrolled",
      skills: "Value Stream Mapping, Process Optimization",
      trending: true,
    },
  ];

  const categories = ["SAFe", "Generative AI", "AI Product", "PMI"];
  
  const filteredCourses = allCourses.filter(course => course.category === selectedCategory);
  const courseCount = filteredCourses.length;

  // Helper function to generate course URL
  const getCourseUrl = (course: Course): string => {
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
    
    const titleSlug = course.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/\//g, '-');
    
    return `/courses/${titleSlug}`;
  };


  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Categories */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 lg:sticky lg:top-24">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">CATEGORIES</h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/courses?category=${category}`}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-between block ${
                        selectedCategory === category
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{category}</span>
                      {selectedCategory === category && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {selectedCategory} ({courseCount} Courses)
              </h1>
              <Link 
                href="/"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all Courses
              </Link>
            </div>

            {/* Course List */}
            <div className="space-y-3">
              {filteredCourses.map((course) => (
                <Link href={getCourseUrl(course)} key={course.id}>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow flex items-center gap-4 group">
                    {/* Course Image/Icon */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={getCourseImage(course)}
                        alt={course.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Course Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#fa4a23] transition-colors">
                          {course.title}
                        </h3>
                        {course.popular && (
                          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                        {course.trending && (
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            Trending
                          </span>
                        )}
                        {course.advanced && (
                          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            Advanced
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        {course.days} | Live Remote Class
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">No courses found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fa4a23]"></div>
      </main>
    }>
      <CoursesContent />
    </Suspense>
  );
}

