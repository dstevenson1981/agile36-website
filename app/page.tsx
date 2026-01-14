"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CouponModal from "./components/CouponModal";
import CouponDisplayModal from "./components/CouponDisplayModal";

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("SAFe");
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [selectedMegaMenuCategory, setSelectedMegaMenuCategory] = useState<string>("SAFe");
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const [showConsultationModal, setShowConsultationModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [consultationForm, setConsultationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponDisplay, setShowCouponDisplay] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClaimCoupon = (email: string, course: string) => {
    // Close the form modal and show the coupon code
    setShowCouponModal(false);
    setShowCouponDisplay(true);
  };

  // Mapping for mega menu thumbnail images
  const megaMenuThumbnails: { [key: string]: string } = {
    "Leading SAFe/ SAFe Agilist": "/Leading SAFe.png",
    "SAFe Lean Portfolio Management": "/Lean Portfolio.png",
    "SAFe Agile Product Management": "/AgileProductManagment.png",
    "SAFe for Teams": "/SAFe for Teams.png",
    "SAFe DevOps": "/Devops.png",
    "SAFe Advanced Scrum Master": "/AdvancedSM.png",
    "SAFe Release Train Engineer": "/RTE.png",
    "SAFe Product Owner/Product Manager": "/POPM.jpg",
    "SAFe Scrum Master": "/SSM.jpeg",
    "Responsible AI with SAFe": "/MicroCredential.jpeg",
    "AI Product Management Certification": "/PMAI.jpeg",
    "Certified AI Product Manager": "/PMAI.jpeg",
    "Agentic Product Leader Certification": "/Agentic.jpeg",
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

  // Close mega menu and search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setShowMegaMenu(false);
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
    };
  }, [showMegaMenu, showSearchResults]);

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
    // Trending courses
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
      image: "/headway-5QgIuuBxKwM-unsplash.jpg",
      price: 1299,
      originalPrice: 2598,
      hours: "16 Hrs",
      days: "03 days",
      enrolled: "1.8K+ Enrolled",
      skills: "RTE Practices, Agile Release Train Facilitation",
      popular: true,
      advanced: true,
      privateClass: true,
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
      trending: true,
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

  const filteredCourses = activeTab === "SAFe"
    ? allCourses.filter(course => course.category === "SAFe")
    : activeTab === "Generative AI"
    ? allCourses.filter(course => course.category === "Generative AI")
    : activeTab === "AI Product"
    ? allCourses.filter(course => course.category === "AI Product")
    : activeTab === "PMI"
    ? allCourses.filter(course => course.category === "PMI")
    : allCourses;

  // Helper function to generate course URL
  const getCourseUrl = (course: Course): string => {
    // Map course titles to their actual page routes
    const courseRoutes: { [key: string]: string } = {
      "Leading SAFe® 6.0 Certification Training": "/courses/leading-safe",
      "Leading SAFe/ SAFe Agilist": "/courses/leading-safe",
      "SAFe Product Owner/Product Manager": "/courses/product-owner-manager",
      "SAFe Lean Portfolio Management": "/courses/lean-portfolio-management",
      "SAFe Agile Product Management": "/courses/agile-product-management",
      "SAFe Scrum Master": "/courses/scrum-master",
      "SAFe for Teams": "/courses/safe-for-teams",
      "SAFe DevOps": "/courses/safe-devops",
      "SAFe Advanced Scrum Master": "/courses/advanced-scrum-master",
      "SAFe Release Train Engineer": "/courses/release-train-engineer",
      "SAFe Value Stream Mapping": "/courses/value-stream-mapping",
      "Responsible AI": "/courses/responsible-ai",
      "AI-Driven Scrum Master™": "/courses/ai-driven-scrum-master",
      "Executive GenAI Leadership™": "/courses/executive-genai-leadership",
      "Generative AI for Project Managers": "/courses/generative-ai-project-managers",
      "Certified GenAI Practitioner™": "/courses/certified-genai-practitioner",
      "No-Code AI Agents & Automation™": "/courses/ai-agent-builder",
      "Certified AI Product Manager": "/courses/certified-ai-product-manager",
      "PMP® Certification Training": "/courses/pmp-certification",
    };
    
    // Check if we have a specific route for this course
    if (courseRoutes[course.title]) {
      return courseRoutes[course.title];
    }
    
    // Fallback to slug generation
    const titleSlug = course.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/\//g, '-');
    
    return `/courses/${titleSlug}`;
  };

  const renderCourseCard = (course: Course) => (
    <Link href={getCourseUrl(course)} key={course.id} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative cursor-pointer">
      {course.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-[#fa4a23] text-white text-xs font-semibold px-3 py-1 rounded-full">
            Popular
          </span>
        </div>
      )}
      
      <div className="h-48 relative overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          width={400}
          height={192}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs text-[#4f6882] font-bold">Live Remote Class</span>
          <div className="ml-auto bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-bold text-gray-900">5.0</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-700">
          <span className="font-bold">Skill you'll gain: </span>
          <span>{course.skills}</span>
        </p>
        
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex items-center gap-4 text-xs text-[#4f6882] font-semibold">
            <span>{course.hours}</span>
            <span>|</span>
            <span>{course.days}</span>
          </div>
          <div className="text-xs text-[#4f6882] font-semibold">
            {course.enrolled}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          {!course.privateClass && (
            <div>
              <p className="text-xs text-[#4f6882] font-semibold mb-1">Start from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-green-600 text-base">$</span>
                <span className="text-gray-900 text-xl font-bold">{course.price.toLocaleString()}</span>
                <span className="text-[#4f6882] text-sm line-through ml-2">${course.originalPrice.toLocaleString()}</span>
                <span className="text-green-600 text-xs font-semibold ml-2">(50% OFF)</span>
              </div>
            </div>
          )}
          <button className={`bg-[#01203d] hover:bg-[#023a6b] text-white font-bold py-2 px-6 rounded-md text-sm transition-colors ${course.privateClass ? 'w-full' : ''}`}>
            {course.privateClass ? 'Contact Us' : 'Enroll →'}
          </button>
        </div>
      </div>
    </div>
    </Link>
  );

  return (
    <main className="bg-[#f0f9ff]">
      {/* New Year 2026 Sale Banner */}
      <div 
        className="w-full bg-red-600 py-2 sm:py-3 md:py-4 px-2 sm:px-4 cursor-pointer hover:bg-red-700 transition-colors"
        onClick={() => setShowCouponModal(true)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          {/* Left side with megaphone and sale label */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Megaphone icon */}
            <div className="relative hidden sm:block">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              {/* Sound waves */}
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-2 border-yellow-400 rounded-full"></div>
              <div className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 border-2 border-yellow-400 rounded-full"></div>
            </div>
            
            {/* New Year 2026 label */}
            <div className="flex flex-col">
              <div className="bg-yellow-400 px-2 py-0.5 sm:px-3 rounded-t">
                <span className="text-black font-bold text-[10px] sm:text-xs">NEW YOU!</span>
              </div>
              <div className="bg-black px-2 sm:px-4 py-0.5 sm:py-1 rounded-b">
                <span className="text-white font-bold text-xs sm:text-sm">2026</span>
              </div>
            </div>
          </div>

          {/* Center - Main text */}
          <div className="flex-1 text-center min-w-0">
            <h2 className="text-yellow-300 font-bold text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl drop-shadow-lg truncate sm:whitespace-normal">
              Get Flat <span className="text-white">$100 OFF</span> on Course Fee - Sales expire Jan 16
            </h2>
          </div>

          {/* Right side - Claim Coupon button */}
          <button className="bg-white text-red-600 font-bold px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Claim Coupon</span>
            <span className="sm:hidden">Claim</span>
          </button>
        </div>
      </div>

      {/* Coupon Modals */}
      <CouponModal 
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onClaimCoupon={handleClaimCoupon}
      />
      <CouponDisplayModal
        isOpen={showCouponDisplay}
        onClose={() => setShowCouponDisplay(false)}
        couponCode="100OFF"
      />
      
      {/* Top Banner */}
      <div className="w-full bg-[#fa4a23] h-1"></div>
      
      {/* Navigation Header with Mega Menu - Only on Home Page */}
      <header className="w-full bg-[#e8f0f5] border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            {/* Logo and All Courses */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="h-28 sm:h-32 w-auto">
                <Image
                  src="/Agile36Logo.png"
                  alt="Agile36 Logo"
                  width={360}
                  height={128}
                  className="h-28 sm:h-32 w-auto object-contain"
                  priority
                />
              </div>
              
              {/* All Courses Dropdown */}
              <div 
                ref={megaMenuRef}
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
              >
                <button 
                  onClick={() => setShowMegaMenu(!showMegaMenu)}
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
                    className="absolute top-full left-0 mt-2 w-[900px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50"
                    onMouseEnter={() => setShowMegaMenu(true)}
                  >
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
                      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500" style={{ maxHeight: '800px' }}>
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
                                      unoptimized
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
            
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <a href="#blog" className="text-gray-700 hover:text-[#01203d] font-medium transition-colors text-sm">
                Blogs
              </a>
              <Link href="/test" className="text-gray-700 hover:text-[#01203d] font-medium transition-colors text-sm">
                Practice Tests
              </Link>
              <Link href="/testimonials" className="text-gray-700 hover:text-[#01203d] font-medium transition-colors text-sm">
                Testimonials
              </Link>
              <Link href="/corporate" className="text-gray-700 hover:text-[#01203d] font-medium transition-colors text-sm">
                Corporate
              </Link>
            </div>
            
            {/* Utility Icons */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
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
      </header>

      {/* Hero Section */}
      <section className="w-full bg-[#f0f9ff] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Expert Training in Agile, AI, and Product Management
          </h1>
              
              <p className="text-lg text-[#4f6882] leading-relaxed max-w-xl">
                Take the next step in your career with a global leader in Agile and AI training. Start your learning journey today.
              </p>
              
              <Link href="/courses" className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-3 px-8 rounded-md transition-colors duration-200 flex items-center gap-2 w-fit">
                Explore Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              {/* Trusted By Section */}
              <div className="pt-8 space-y-4">
                <p className="text-base font-semibold text-gray-900">Trusted by</p>
                <div className="flex flex-wrap items-center gap-6 py-4">
                  <Image
                    src="/logo-amazon.svg"
                    alt="Amazon"
                    width={80}
                    height={24}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/apple-11.svg"
                    alt="Apple"
                    width={80}
                    height={24}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/accenture-6.svg"
                    alt="Accenture"
                    width={80}
                    height={24}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/tesla-9.svg"
                    alt="Tesla"
                    width={80}
                    height={24}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/netflix-3.svg"
                    alt="Netflix"
                    width={80}
                    height={24}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/disney-2.svg"
                    alt="Disney"
                    width={80}
                    height={24}
                    className="h-6 w-auto"
                  />
                </div>
                <p className="text-sm text-[#718aa5]">
                  and 6,000+ companies across the globe
                </p>
              </div>
              
              {/* Rating Section */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">4.9/5</p>
                    <p className="text-xs text-[#718aa5]">• 10,000+ Reviews</p>
                  </div>
                </div>
                <div className="text-sm text-[#718aa5]">
                  Rated by Learners
                </div>
                
                {/* Profile Pictures Row */}
                <div className="mt-3">
                  <img 
                    src="/Frame_Group.png" 
                    alt="Happy learners" 
                    className="h-10"
                  />
                </div>
              </div>
            </div>
            
            {/* Right Column - Hero Image */}
            <div className="hidden lg:block">
              <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
        <Image
                  src="/Hero.jpg"
                  alt="Agile36 Training Hero"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
          priority
        />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Filter Tabs */}
      <section className="w-full bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button 
              onClick={() => setActiveTab("SAFe")}
              className={`px-6 py-2 font-semibold rounded-lg border-2 transition-colors ${
                activeTab === "SAFe"
                  ? "bg-[#edf5f0] text-[#0dae6b] border-transparent hover:bg-[#d4e8dd]"
                  : "bg-white text-[#828282] border border-gray-200 hover:bg-gray-50"
              }`}
            >
              SAFe
            </button>
            <button 
              onClick={() => setActiveTab("Generative AI")}
              className={`px-6 py-2 font-semibold rounded-lg border-2 transition-colors ${
                activeTab === "Generative AI"
                  ? "bg-[#edf5f0] text-[#0dae6b] border-transparent hover:bg-[#d4e8dd]"
                  : "bg-white text-[#828282] border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Generative AI
            </button>
            <button 
              onClick={() => setActiveTab("AI Product")}
              className={`px-6 py-2 font-semibold rounded-lg border-2 transition-colors ${
                activeTab === "AI Product"
                  ? "bg-[#edf5f0] text-[#0dae6b] border-transparent hover:bg-[#d4e8dd]"
                  : "bg-white text-[#828282] border border-gray-200 hover:bg-gray-50"
              }`}
            >
              AI Product
            </button>
            <button 
              onClick={() => setActiveTab("PMI")}
              className={`px-6 py-2 font-semibold rounded-lg border-2 transition-colors ${
                activeTab === "PMI"
                  ? "bg-[#edf5f0] text-[#0dae6b] border-transparent hover:bg-[#d4e8dd]"
                  : "bg-white text-[#828282] border border-gray-200 hover:bg-gray-50"
              }`}
            >
              PMI
            </button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="w-full bg-[#f0f9ff] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => renderCourseCard(course))}
          </div>
          
          {/* View More Courses Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-[#f0f9ff] hover:bg-[#e0f2fe] text-black font-normal py-2 px-6 rounded-md text-sm transition-colors underline">
              View more courses
              <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Explore All Courses Button */}
          <div className="flex justify-center mt-12">
            <Link href="/courses" className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2">
              Explore All Courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* Practice Tests Section */}
      <section className="w-full bg-[#dee2e6] py-12 px-4 sm:px-6 lg:px-20 my-12 rounded-lg mx-4 sm:mx-6 lg:mx-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#1e2d3e] mb-6">
                Access Free Practice Tests to Master Your Certifications with Confidence
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <span className="text-sm font-semibold text-gray-900">Unlimited Attempts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <span className="text-sm font-semibold text-gray-900">Previous Exams</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <span className="text-sm font-semibold text-gray-900">Immediate Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <span className="text-sm font-semibold text-gray-900">Performance Analytics</span>
                </div>
              </div>
              <Link 
                href="/test"
                className="bg-[#01203d] hover:bg-[#023a6b] text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center gap-2"
              >
                START TEST
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="w-full h-56 rounded-lg overflow-hidden">
                <Image
                  src="/Test.png"
                  alt="Practice Tests"
                  width={600}
                  height={224}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-[#f0f9ff] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#4f6882] uppercase mb-2">BENEFITS FOCUSED ON INDIVIDUALS AND CORPORATE</p>
            <h2 className="text-3xl font-bold text-gray-900">Individual & Corporate Benefits</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Individual Benefits Card */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-center mb-2">Individual Benefits</h3>
              <p className="text-sm text-center text-[#34595f] mb-6">Gain valuable Expert-Led Live Sessions</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Expert-led professional training.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Globally recognized certifications.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Practical learning experience.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Flexible course schedules.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Lifetime access to resources.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Exam support after training.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowConsultationModal(true)}
                className="w-full mt-8 bg-[#01203d] hover:bg-[#023a6b] text-white font-bold py-3 rounded-md transition-colors"
              >
                Contact Course Advisor
              </button>
            </div>

            {/* Corporate Benefits Card */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-center mb-2">Corporate Benefits</h3>
              <p className="text-sm text-center text-[#34595f] mb-6">Personalized Corporate Training</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Customized training solutions.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Boost team productivity.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Industry-specific course content.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Scalable enterprise learning.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Global training delivery.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p className="text-sm text-[#34595f]">Trackable ROI on training.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowConsultationModal(true)}
                className="w-full mt-8 bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-md transition-colors"
              >
                Skill Up Your Teams
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-[#f0f9ff] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#4f6882] uppercase mb-2">Our Experienced Training Expert</p>
            <h2 className="text-3xl font-bold text-gray-900">Meet the Team That's Invested in Your Success</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Deadra Stevenson",
                title: "CEO and Founder of Agile36",
                subtitle: "SAFe® Practice Consultant (SPC®), Enterprise Agile Coach, AI Transformation Leader",
                image: "/Deadra.jpeg",
                experience: "20+ Years",
                linkedin: "https://www.linkedin.com/in/deadra-stevenson-a20a6a1a2/",
                description: "Welcome to Agile36. Deadra Stevenson, CEO and Founder, is proud to lead one of the most trusted training and transformation firms in the Lean-Agile space. With more than 15 years of experience guiding organizations through large-scale change, she has built a strong reputation for delivering impactful, results-driven Agile and AI transformation experiences.\n\nAbout Her\n\nBased in Miami, Florida, Deadra has led more than 30 major Lean-Agile transformations across a wide range of organizations, including global brands such as Coca-Cola and Netflix. Her background spans enterprise coaching, portfolio transformation, executive alignment, and helping leaders adopt the Scaled Agile Framework to improve performance and strategic execution.\n\nWhile her expertise is grounded in Lean and Agile, she also leads AI-focused transformation initiatives. She helps organizations understand how AI can enhance decision-making, elevate delivery flow, and modernize ways of working. Her dual expertise ensures clients receive guidance that is both proven and forward-thinking.\n\nWhy Train With Her\n\nOrganizations choose Agile36 because Deadra brings a rare combination of deep SAFe expertise, practical leadership insight, and a modern understanding of how AI is influencing the future of work. She makes complex concepts simple, relatable, and actionable for teams and executives.\n\nShe holds advanced certifications including SAFe® Program Consultant (SPC 6), PMP, CSM, CSP, CSPO, and LSSGB. These credentials reflect her commitment to excellence and her dedication to staying at the forefront of Agile and AI transformation practices.\n\nAt Agile36, her training is hands-on, grounded in real enterprise challenges, and designed to create measurable outcomes. She blends strong SAFe foundations with modern transformation techniques, helping organizations strengthen delivery, improve alignment, and prepare their teams for the future.\n\nEvery organization is unique. When clients train with Agile36, they gain a partner who understands their goals and provides tailored guidance to support long-term success in both Agile and AI-enabled environments."
              },
              {
                name: "Joe Puoci",
                title: "Enterprise Agile Coach",
                subtitle: "SAFe® Practice Consultant (SPC®), Enterprise Agile Coach",
                image: "/Joe.jpeg",
                experience: "15+ Years",
                linkedin: "https://www.linkedin.com/in/joseph-puoci-0874693/",
                description: "Welcome to my profile. I'm Joe Puoci, an Enterprise Agile Coach with Agile36, specializing in Scaled Agile Framework (SAFe) certification training and enterprise Agile coaching. I am committed to helping organizations strengthen delivery performance, improve collaboration, and successfully adopt Lean-Agile ways of working.\n\nAbout Me\n\nI believe deeply in the impact Agile can have on how organizations operate, innovate, and deliver value. Throughout my career, I have partnered with companies across a wide range of industries, from emerging startups to Fortune 500 enterprises, supporting their journey toward more adaptive, efficient, and customer-focused ways of working.\n\nMy Expertise\n\nAs a certified SAFe Program Consultant (SPC) and experienced Agile Coach, I bring practical insight and hands-on leadership to every engagement. I focus on delivering high-quality SAFe certification training and equipping individuals, teams, and leaders with the skills and confidence needed to excel in complex environments. My guidance is grounded in real-world experience, enabling organizations to apply SAFe effectively and sustainably.\n\nWhy Train With Me\n\nI bring extensive experience across diverse organizational landscapes, offering a broad and adaptable perspective to every transformation effort. My approach is centered on driving measurable results and ensuring that Agile adoption leads to meaningful improvements in flow, alignment, and customer value. Above all, I am passionate about empowering people and helping them unlock their full potential as Lean-Agile practitioners."
              },
              {
                name: "Marcus Ball",
                title: "Enterprise Agile Coach",
                subtitle: "SAFe® Practice Consultant (SPC®), Enterprise Agile Coach",
                image: "/marcus.jpeg",
                experience: "15+ Years",
                description: "Welcome to my profile. I'm Marcus Ball, an Enterprise Agile Coach with Agile36, specializing in Scaled Agile Framework (SAFe) certification training and enterprise transformation coaching. I am committed to helping organizations build stronger delivery teams, improve alignment, and navigate today's fast-paced business landscape with agility and confidence.\n\nAbout Me\n\nMy work as an Agile Coach is rooted in the belief that organizations unlock extraordinary potential when they embrace Lean-Agile principles. Over the course of my career, I have guided teams and leaders through the process of adopting Agile practices, strengthening collaboration, and building a culture that supports continuous improvement.\n\nMy Expertise\n\nWith Agile36, I deliver high-quality SAFe certification training designed to equip teams, leaders, and organizations with the skills needed to improve flow, increase value delivery, and operate more effectively. I focus on practical application, clear guidance, and developing the capabilities required for long-term success with Agile and SAFe.\n\nWhy Train With Me\n\nI bring extensive hands-on experience supporting organizations at various stages of their Agile journey, helping them achieve meaningful and lasting transformation. As a certified SAFe Program Consultant (SPC) and seasoned Agile professional, I offer a depth of knowledge and a practical approach that teams can apply immediately. My goal is to empower individuals and organizations to reach higher levels of performance and deliver exceptional value."
              }
            ].map((member, i) => {
              const isExpanded = expandedMember === i;
              const descriptionLength = member.description.length;
              const shouldTruncate = descriptionLength > 150;
              const displayDescription = shouldTruncate && !isExpanded 
                ? member.description.substring(0, 150) + "..."
                : member.description;

              return (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  <div>
                      <h4 className="font-semibold text-[#01203d]">{member.name}</h4>
                      <p className="text-sm text-[#34595f]">{member.title}</p>
                      {member.subtitle && (
                        <p className="text-xs text-[#34595f] mt-1">{member.subtitle}</p>
                      )}
                  </div>
                </div>
                  
                  {/* Stats Section - For Deadra, Joe, and Marcus */}
                  {(member.name === "Deadra Stevenson" || member.name === "Joe Puoci" || member.name === "Marcus Ball") && (
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 flex-wrap">
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-700">4.9</span>
                      </div>
                      
                      {/* Separator */}
                      <div className="w-px h-4 bg-gray-300"></div>
                      
                      {/* Professional Trained */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                          {member.name === "Deadra Stevenson" ? "25K+" : member.name === "Joe Puoci" ? "15K+" : "13K+"} Professional Trained
                        </span>
                      </div>
                      
                      {/* Separator */}
                      <div className="w-px h-4 bg-gray-300"></div>
                      
                      {/* Enrolled with Profile Pictures */}
                      <div className="flex items-center gap-1.5">
                        <img 
                          src="/Frame_Group.png" 
                          alt="Enrolled students" 
                          className="h-6"
                        />
                        <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                          {member.name === "Deadra Stevenson" ? "25K+" : "15K+"} Enrolled
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <p className="text-sm text-[#34595f] whitespace-pre-line">
                      {displayDescription}
                    </p>
                    {shouldTruncate && (
                      <button
                        onClick={() => setExpandedMember(isExpanded ? null : i)}
                        className="text-sm text-[#fa4a23] font-semibold mt-2 hover:underline"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm font-semibold text-[#34595f]">Experience: {member.experience}</span>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-20 my-12 rounded-2xl shadow-lg mx-4 sm:mx-6 lg:mx-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Advance Your Career with Trusted, Industry-Leading Training</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e8f0f5] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#01203d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">25+ Years</p>
              <p className="text-sm font-semibold text-[#4f6882]">Delivering Enterprise Agile Excellence</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e8f0f5] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#01203d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">30+ Transformations</p>
              <p className="text-sm font-semibold text-[#4f6882]">Led Across Fortune 100 & Global Organizations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e8f0f5] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#01203d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">100,000+ Professionals</p>
              <p className="text-sm font-semibold text-[#4f6882]">Trained and Certified Worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e8f0f5] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#01203d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">Practical, Real-World Training</p>
              <p className="text-sm font-semibold text-[#4f6882]">Built From Hands-On Enterprise Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Query Section */}
      <section className="w-full bg-[#dee2e6] py-12 px-4 sm:px-6 lg:px-20 my-12 rounded-lg mx-4 sm:mx-6 lg:mx-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Have more questions or require individualized guidance?
          </h2>
          <button 
            onClick={() => setShowConsultationModal(true)}
            className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-3 px-8 rounded-md transition-colors border-2 border-[#fa4a23]"
          >
            Request for Query?
          </button>
        </div>
      </section>

      {/* Clients Section */}
      <section className="w-full bg-[#f0f9ff] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#4f6882] uppercase mb-2">OUR CUSTOMER WORDS FOR US</p>
            <h2 className="text-3xl font-bold text-gray-900">Take a Look at Our Clients</h2>
          </div>
          
          <div className="bg-gray-100 rounded-lg border-2 border-[#01203d] p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-center justify-items-center">
              {[
                { src: "/logo-amazon.svg", alt: "Amazon" },
                { src: "/apple-11.svg", alt: "Apple" },
                { src: "/accenture-6.svg", alt: "Accenture" },
                { src: "/tesla-9.svg", alt: "Tesla" },
                { src: "/netflix-3.svg", alt: "Netflix" },
                { src: "/disney-2.svg", alt: "Disney" },
                { src: "/deloitte-1 (2).svg", alt: "Deloitte" }
              ].map((logo, index) => (
                <div key={index} className="flex items-center justify-center h-10 w-full">
                  <div className="relative w-full h-10 flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={40}
                      className="w-full h-full object-contain object-center opacity-70 hover:opacity-100 transition-opacity"
                      style={{ maxHeight: '40px', maxWidth: '100%' }}
                    />
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="w-full bg-[#f0f9ff] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#4f6882] uppercase mb-2">LEARNER REVIEWS FROM THE WORLD OVER</p>
            <h2 className="text-3xl font-bold text-gray-900">Our Latest Blogs</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* AI Transformation Blog Post */}
            <Link href="/blog/ai-transformation" className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
                {/* Decorative golden dots - top left */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                {/* Decorative golden dots - bottom right */}
                <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white text-center px-4 relative z-10">
                  What Is AI Transformation? A Complete Guide for Modern Organizations
                </h3>
              </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#fa4a23] text-white text-sm font-semibold px-4 py-1 rounded-full">AI</span>
                  <span className="text-sm text-[#718aa5]">Latest</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                  Artificial intelligence is no longer emerging technology—it's reshaping how successful organizations operate. Yet while 72% of companies report deploying AI in at least one business function, fewer than 30% have achieved meaningful returns...
                  </p>
                <span className="text-sm text-gray-900 underline">Read More</span>
                </div>
            </Link>

            {/* AI Tools for Product Managers Blog Post */}
            <Link href="/blog/ai-tools-product-managers" className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
                {/* Decorative golden dots - top left */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
              </div>
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                {/* Decorative golden dots - bottom right */}
                <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white text-center px-4 relative z-10">
                  Top AI Tools Every Product Manager Should Know in 2025
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#fa4a23] text-white text-sm font-semibold px-4 py-1 rounded-full">AI</span>
                  <span className="text-sm text-[#718aa5]">Latest</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Product management has fundamentally changed. The PMs winning in 2025 aren't just using AI tools—they're leveraging AI across the entire product lifecycle to move faster, make better decisions, and deliver more value...
                </p>
                <span className="text-sm text-gray-900 underline">Read More</span>
              </div>
            </Link>

            {/* Lean Portfolio Management Blog Post */}
            <Link href="/blog/lean-portfolio-management" className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
                {/* Decorative golden dots - top left */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                {/* Decorative golden dots - bottom right */}
                <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white text-center px-4 relative z-10">
                  Lean Portfolio Management: A Complete Guide for Enterprise Leaders
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe</span>
                  <span className="text-sm text-[#718aa5]">Latest</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Enterprise organizations waste billions annually on the wrong initiatives. Projects that don't align with strategy. Investments that deliver minimal value. Lean Portfolio Management (LPM) solves this problem...
                </p>
                <span className="text-sm text-gray-900 underline">Read More</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowConsultationModal(false);
                setConsultationForm({ fullName: "", email: "", phone: "", message: "" });
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center z-10"
            >
              <span className="text-gray-600 text-xl">×</span>
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left Column - Promotional Content */}
              <div className="bg-gradient-to-br from-[#fffef2] to-[#ffe5d9] p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Invest in your growth through learning. Get a{" "}
                    <span className="bg-[#fa4a23] text-white px-2 py-1 rounded">Free</span>{" "}
                    <span className="underline decoration-[#fa4a23]">Consultation today!</span>
                  </h2>

                  {/* Stats Boxes */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">33,500+ Career Planned</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">Successful Growth</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">94% Success Rate</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">47% Avg Salary Hike</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-[#fa4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">100% Guidance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Fill the Required Details</h3>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                  console.log(consultationForm);
                  setShowConsultationModal(false);
                  setConsultationForm({ fullName: "", email: "", phone: "", message: "" });
                }}>
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        required
                        value={consultationForm.fullName}
                        onChange={(e) => setConsultationForm({ ...consultationForm, fullName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01203d]"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        required
                        value={consultationForm.email}
                        onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01203d]"
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          <span className="text-lg">🇺🇸</span>
                          <span className="text-sm font-medium">+1</span>
                        </div>
                        <input
                          type="tel"
                          required
                          value={consultationForm.phone}
                          onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01203d]"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        value={consultationForm.message}
                        onChange={(e) => setConsultationForm({ ...consultationForm, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01203d]"
                        placeholder="Enter your message"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#fa4a23] to-[#e03d1a] hover:from-[#e03d1a] hover:to-[#c73517] text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Get Free Consultation
                    </button>

                    {/* Privacy Policy */}
                    <p className="text-xs text-gray-600 text-center">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        By providing your contact details you agreed to our{" "}
                        <Link href="#" className="font-bold underline">Privacy Policy</Link> &{" "}
                        <Link href="#" className="font-bold underline">Terms and Conditions</Link>.
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
  );
}
