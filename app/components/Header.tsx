"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

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

export default function Header() {
  // Call ALL hooks first to maintain consistent hook order
  const pathname = usePathname();
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [selectedMegaMenuCategory, setSelectedMegaMenuCategory] = useState<string>("SAFe");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle mouse enter with immediate show
  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowMegaMenu(true);
  };
  
  // Handle mouse leave with delay to allow moving to menu
  const handleMouseLeave = () => {
    // Add a delay before closing to allow mouse to move to menu
    closeTimeoutRef.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 200); // 200ms delay
  };
  
  // Close mega menu and search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setShowMegaMenu(false);
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    if (showMegaMenu || showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [showMegaMenu, showSearchResults]);
  
  // Hide shared header on home page since it has its own mega menu header
  // Also hide on practice exam pages since they have their own custom headers
  if (pathname === "/" || pathname?.startsWith("/test/")) {
    return null;
  }

  // Mapping for mega menu thumbnail images
  const megaMenuThumbnails: { [key: string]: string } = {
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
    "Certified AI Product Manager": "/PMAI.jpeg",
    "PMP® Certification Training": "/PMP.png",
    "Responsible AI": "/MicroCredential.jpeg",
    "SAFe Value Stream Mapping": "/MicroCredential.jpeg",
  };

  const getMegaMenuImage = (course: Course) => {
    // Use GenAI_2.png for all Generative AI and AI Product courses
    if (course.category === "Generative AI" || course.category === "AI Product") {
      return "/GenAI_2.png";
    }
    return megaMenuThumbnails[course.title] || course.image;
  };

  // Helper function to generate course URL
  const getCourseUrl = (course: Course): string => {
    // Special cases
    if (course.title.includes("Generative AI for Project Managers") || course.title.includes("AI for Project Managers")) {
      return "/courses/generative-ai-project-managers";
    }

    // Special case for Certified GenAI Practitioner
    if (course.title.includes("Certified GenAI Practitioner")) {
      return "/courses/certified-genai-practitioner";
    }

    // Special case for No-Code AI Agents & Automation
    if (course.title.includes("No-Code AI Agents") || course.title.includes("AI Agent Builder")) {
      return "/courses/ai-agent-builder";
    }

    // Special case for Certified AI Product Manager
    if (course.title.includes("Certified AI Product Manager")) {
      return "/courses/certified-ai-product-manager";
    }

    // Special case for PMP Certification
    if (course.title.includes("PMP") || course.title.includes("PMP® Certification")) {
      return "/courses/pmp-certification";
    }
    
    if (course.title.includes("Executive GenAI Leadership") || course.title.includes("GenAI Leadership")) {
      return "/courses/executive-genai-leadership";
    }
    
    if (course.title.includes("AI-Driven Scrum Master") || course.title.includes("AI Scrum Master")) {
      return "/courses/ai-driven-scrum-master";
    }
    
    if (course.title.includes("Leading SAFe") || course.title.includes("SAFe Agilist")) {
      return "/courses/leading-safe";
    }
    
    if (course.title.includes("SAFe Product Owner/Product Manager") || course.title.includes("Product Owner/Product Manager")) {
      return "/courses/product-owner-manager";
    }
    
    // Special case for SAFe Lean Portfolio Management
    if (course.title.includes("SAFe Lean Portfolio Management") || course.title.includes("Lean Portfolio Management")) {
      return "/courses/lean-portfolio-management";
    }
    
    // Special case for SAFe Agile Product Management
    if (course.title.includes("SAFe Agile Product Management") || course.title.includes("Agile Product Management")) {
      return "/courses/agile-product-management";
    }
    
      // Special case for SAFe Advanced Scrum Master (must come before regular Scrum Master)
      if (course.title.includes("Advanced Scrum Master") || course.title.includes("Advanced Scrum")) {
        return "/courses/advanced-scrum-master";
      }
      
      // Special case for SAFe Scrum Master
      if (course.title.includes("SAFe Scrum Master") || course.title.includes("Scrum Master")) {
        return "/courses/scrum-master";
      }
      
      // Special case for SAFe for Teams
      if (course.title.includes("SAFe for Teams") || course.title.includes("for Teams")) {
        return "/courses/safe-for-teams";
      }
      
      // Special case for Responsible AI
      if (course.title.includes("Responsible AI") || course.title.includes("AI with SAFe")) {
        return "/courses/responsible-ai";
      }
      
      // Special case for SAFe DevOps
      if (course.title.includes("SAFe DevOps") || course.title.includes("DevOps")) {
        return "/courses/devops";
      }
      
      // Special case for Value Stream Mapping
      if (course.title.includes("Value Stream Mapping") || course.title.includes("Value Stream")) {
        return "/courses/value-stream-mapping";
      }
      
      // Special case for SAFe Release Train Engineer
      if (course.title.includes("Release Train Engineer") || course.title.includes("RTE")) {
        return "/courses/release-train-engineer";
      }
    
    const titleSlug = course.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/\//g, '-');
    
    return `/courses/${titleSlug}`;
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      // Filter courses based on search query
      const filtered = allCourses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase()) ||
        course.skills.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 8)); // Show max 8 results
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
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
    {
      id: "10",
      title: "SAFe Lean Portfolio Management",
      category: "SAFe",
      image: "/brooke-cagle--uHVRvDr7pg-unsplash.jpg",
      price: 950,
      originalPrice: 1900,
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
      price: 950,
      originalPrice: 1900,
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
      trending: true,
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
      popular: true,
      advanced: true,
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
      price: 555,
      originalPrice: 1110,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "2.5K+ Enrolled",
      skills: "AI-Enhanced Scrum Practices, Agile AI Tools, Team Facilitation",
      trending: true,
    },
    {
      id: "20",
      title: "Executive GenAI Leadership™",
      category: "Generative AI",
      image: "/redd-francisco-PTRzqc_h1r4-unsplash.jpg",
      price: 950,
      originalPrice: 1900,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "1.8K+ Enrolled",
      skills: "GenAI Strategy, Executive AI Decision Making, Leadership in AI Era",
      trending: true,
    },
    {
      id: "23",
      title: "Generative AI for Project Managers",
      category: "Generative AI",
      image: "/redd-francisco-5U_28ojjgms-unsplash.jpg",
      price: 555,
      originalPrice: 1110,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: "2.2K+ Enrolled",
      skills: "AI Project Management, AI-Assisted Planning, Prompt Engineering",
      trending: true,
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
      trending: true,
    },
    {
      id: "29",
      title: "No-Code AI Agents & Automation™",
      category: "AI Product",
      image: "/christina-wocintechchat-com-faEfWCdOKIg-unsplash.jpg",
      price: 699,
      originalPrice: 1398,
      hours: "10 Hrs",
      days: "02 days",
      enrolled: "2.8K+ Enrolled",
      skills: "No-Code Automation, AI Agents, Workflow Optimization",
      popular: true,
    },
    // AI Product courses
    {
      id: "24",
      title: "Certified AI Product Manager",
      category: "AI Product",
      image: "/annie-spratt-QckxruozjRg-unsplash.jpg",
      price: 450,
      originalPrice: 900,
      hours: "10 Hrs",
      days: "02 days",
      enrolled: "2.5K+ Enrolled",
      skills: "AI Product Development, Prototype Building, Stakeholder Validation",
      popular: true,
    },
    // PMI courses
    {
      id: "4",
      title: "PMP® Certification Training",
      category: "PMI",
      image: "/annie-spratt-sggw4-qDD54-unsplash.jpg",
      price: 1100,
      originalPrice: 2200,
      hours: "35 PDUs",
      days: "05 days",
      enrolled: "30K+ Enrolled",
      skills: "Project Management, PMP Exam Prep, PMBOK Guide, Agile Project Management",
      popular: true,
    },
  ];

  return (
    <>
      {/* Black Friday Sale Banner */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white font-bold text-sm sm:text-base">BLACK FRIDAY SALE</span>
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-white text-sm sm:text-base">Get <span className="text-yellow-400 font-bold text-lg">$200 OFF</span> - <span className="text-red-400 font-bold">TODAY ONLY</span> - Use Code:</span>
          <span className="bg-[#fa4a23] text-white font-bold px-4 py-1 rounded text-sm sm:text-base tracking-wider">BF200</span>
        </div>
      </div>
      
      {/* Top Banner */}
      <div className="w-full bg-[#fa4a23] h-1"></div>
      
      {/* Navigation Header */}
      <header className="w-full bg-[#e8f0f5] border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            {/* Logo and All Courses */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Link href="/" className="h-28 sm:h-32 w-auto">
                <Image
                  src="/Agile36Logo.png"
                  alt="Agile36 Logo"
                  width={360}
                  height={128}
                  className="h-28 sm:h-32 w-auto object-contain"
                  priority
                />
              </Link>
              
              {/* All Courses Dropdown with Mega Menu */}
              <div 
                ref={megaMenuRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="font-medium text-sm sm:text-base">All Courses</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mega Menu */}
                {showMegaMenu && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-[900px] bg-transparent z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200">
                    <div className="flex">
                      {/* Left Sidebar - Categories */}
                      <div className="w-48 bg-gray-50 border-r border-gray-200 rounded-l-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Categories</h3>
                        <ul className="space-y-1">
                          {["SAFe", "Generative AI", "AI Product", "PMI"].map((category) => (
                            <li key={category}>
                              <button
                                onMouseEnter={() => setSelectedMegaMenuCategory(category)}
                                onClick={() => {
                                  setShowMegaMenu(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                  selectedMegaMenuCategory === category
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{category}</span>
                                  {selectedMegaMenuCategory === category && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  )}
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Right Content - Courses */}
                      <div className="flex-1 p-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2 z-10">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {selectedMegaMenuCategory} ({allCourses.filter(course => course.category === selectedMegaMenuCategory).length} Courses)
                          </h3>
                          <Link
                            href={`/courses?category=${selectedMegaMenuCategory}`}
                            onClick={() => setShowMegaMenu(false)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View all Courses
                          </Link>
                        </div>
                        <ul className="space-y-3 pr-2">
                          {allCourses
                            .filter(course => course.category === selectedMegaMenuCategory)
                            .map(course => (
                              <li key={course.id}>
                                <Link
                                  href={getCourseUrl(course)}
                                  onClick={() => {
                                    setShowMegaMenu(false);
                                  }}
                                  className="w-full text-left flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors group"
                                >
                                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image
                                      src={getMegaMenuImage(course)}
                                      alt={course.title}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#fa4a23] transition-colors">
                                        {course.title}
                                      </h4>
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
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-2 sm:mx-4">
              <div className="relative" ref={searchRef}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-9 sm:pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01203d] focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 sm:left-0 sm:right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[70vh] overflow-y-auto z-50 w-full sm:w-auto">
                    <div className="p-2">
                      <div className="text-xs text-gray-500 px-3 py-2 font-semibold">
                        {searchResults.length} {searchResults.length === 1 ? 'Course' : 'Courses'} Found
                      </div>
                      {searchResults.map((course) => (
                        <Link
                          key={course.id}
                          href={getCourseUrl(course)}
                          onClick={handleClearSearch}
                          className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#fa4a23] line-clamp-2">
                              {course.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 truncate">
                              {course.category} • {course.days}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs sm:text-sm font-bold text-[#fa4a23]">${course.price}</span>
                              <span className="text-xs text-gray-400 line-through">${course.originalPrice}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {showSearchResults && searchQuery && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 sm:left-0 sm:right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-full sm:w-auto">
                    <div className="p-4 sm:p-6 text-center">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">No courses found</p>
                      <p className="text-xs text-gray-400">Try different keywords</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <Link href="/#blog" className="text-gray-700 hover:text-[#01203d] font-medium transition-colors text-sm">
                Blogs
              </Link>
              <Link href="/test" className="text-gray-700 hover:text-[#01203d] font-medium transition-colors text-sm">
                Practice Tests
              </Link>
              <Link href="/corporate" className="text-gray-700 hover:text-[#01203d] font-medium transition-colors text-sm">
                Corporate
              </Link>
            </div>
            
            {/* Utility Icons */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-[#01203d] hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <Link 
                href="/contact" 
                className="p-2 text-gray-700 hover:text-[#01203d] hover:bg-gray-100 rounded-md transition-colors"
                title="Contact Us"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
              <button className="p-2 text-gray-700 hover:text-[#01203d] hover:bg-gray-100 rounded-md transition-colors relative">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              <Link 
                href="/courses" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              >
                All Courses
              </Link>
              <Link 
                href="/#blog" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              >
                Blogs
              </Link>
              <Link 
                href="/test" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              >
                Practice Tests
              </Link>
              <Link 
                href="/corporate" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              >
                Corporate
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
