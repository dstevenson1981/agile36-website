"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { SAFE_COURSE_PARTICIPANTS_LABEL } from "@/app/lib/course-catalog";
import PromoBanner, { usePromoBannerActive, PROMO_BANNER_STICKY_OFFSET_PX } from "./PromoBanner";
import SiteSearch from "./SiteSearch";

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

const MEGA_MENU_SAFE_ORDER: Record<string, number> = {
  "16": 0, // Advanced Scrum Master
  "8": 1,
  "9": 2,
  "18": 3,
  "10": 4,
  "11": 5,
  "12": 6,
  "13": 7,
  "27": 8,
  "17": 9,
  "15": 10, // DevOps
};

function sortMegaMenuCourses(courses: Course[], category: string): Course[] {
  if (category !== "SAFe") return courses;
  return [...courses].sort(
    (a, b) => (MEGA_MENU_SAFE_ORDER[a.id] ?? 99) - (MEGA_MENU_SAFE_ORDER[b.id] ?? 99)
  );
}

const MEGA_MENU_CATEGORIES = [
  {
    id: "SAFe",
    label: "SAFe",
    description: "Scaled Agile Framework certifications for enterprise agility and AI-empowered delivery.",
    gridCols: "grid-cols-2",
  },
  {
    id: "Generative AI",
    label: "Generative AI",
    description: "Practical GenAI skills for leaders, scrum masters, and project managers.",
    gridCols: "grid-cols-2",
  },
  {
    id: "AI Product",
    label: "AI Product",
    description: "Build and ship AI-powered products with hands-on product management training.",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
] as const;

export default function Header() {
  // Call ALL hooks first to maintain consistent hook order
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);
  const [cinematicHero, setCinematicHero] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [selectedMegaMenuCategory, setSelectedMegaMenuCategory] = useState<string>("SAFe");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
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
  
  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setShowMegaMenu(false);
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }
    };

    if (showMegaMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [showMegaMenu]);

  // On the homepage the header floats as translucent glass over the hero,
  // then fades to its normal solid background once the hero is scrolled past.
  useEffect(() => {
    if (!isHome) {
      setCinematicHero(false);
      return;
    }
    setCinematicHero(document.documentElement.dataset.homeHero === "cinematic");
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Hide shared header on practice exam pages since they have their own custom headers
  if (
    pathname?.startsWith("/test/") ||
    pathname === "/apm-pro-temp" ||
    pathname === "/lpm-pro-temp" ||
    pathname === "/lpmpro" ||
    pathname === "/popm-pro-temp" ||
    pathname === "/popmpro" ||
    pathname === "/popm-practice-temp" ||
    pathname === "/popm-prep-pro"
  ) {
    return null;
  }

  // Mapping for mega menu thumbnail images
  const megaMenuThumbnails: { [key: string]: string } = {
    "AI-Empowered Leading SAFe® / SAFe Agilist": "/Leading SAFe.png",
    "Leading SAFe/ SAFe Agilist": "/Leading SAFe.png",
    "Leading SAFe® 6.0 Certification Training": "/Leading SAFe.png",
    "SAFe Lean Portfolio Management": "/Lean Portfolio.png",
    "SAFe Agile Product Management": "/AgileProductManagment.png",
    "AI-Empowered SAFe for Teams": "/SAFe for Teams.png",
    "SAFe for Teams": "/SAFe for Teams.png",
    "SAFe DevOps": "/Devops.png",
    "AI-Empowered SAFe Advanced Scrum Master": "/AdvancedSM.png",
    "SAFe Advanced Scrum Master": "/AdvancedSM.png",
    "SAFe Release Train Engineer": "/RTE.png",
    "AI-Empowered SAFe Product Owner/Product Manager": "/POPM.jpg",
    "SAFe Product Owner/Product Manager": "/POPM.jpg",
    "AI-Empowered SAFe Scrum Master": "/SSM.jpeg",
    "SAFe Scrum Master": "/SSM.jpeg",
    "Certified AI Product Manager": "/PMAI.jpeg",
    "No-Code AI Agents & Automation™": "/Logo_Agents.png",
    "Responsible AI": "/MicroCredential.jpeg",
    "SAFe Value Stream Mapping": "/MicroCredential.jpeg",
  };

  const getMegaMenuImage = (course: Course) => {
    if (course.title.includes("No-Code AI Agents")) {
      return "/Logo_Agents.png";
    }
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

  const allCourses: Course[] = [
    // SAFe courses
    {
      id: "8",
      title: "AI-Empowered Leading SAFe® / SAFe Agilist",
      category: "SAFe",
      image: "/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg",
      price: 515,
      originalPrice: 1030,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "SAFe Principles, Lean-Agile Practices, AI-empowered collaboration",
      popular: true,
    },
    {
      id: "9",
      title: "AI-Empowered SAFe Product Owner/Product Manager",
      category: "SAFe",
      image: "/annie-spratt-hCb3lIB8L8E-unsplash.jpg",
      price: 545,
      originalPrice: 1090,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Product Ownership, SAFe PO/PM Practices, AI-assisted delivery",
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
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Value Stream Mapping, Process Optimization",
      trending: true,
    },
    {
      id: "10",
      title: "SAFe Lean Portfolio Management",
      category: "SAFe",
      image: "/brooke-cagle--uHVRvDr7pg-unsplash.jpg",
      price: 1050,
      originalPrice: 2100,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Portfolio Strategy, Investment Funding, Value Stream Management",
      popular: true,
      advanced: true,
    },
    {
      id: "11",
      title: "SAFe Agile Product Management",
      category: "SAFe",
      image: "/campaign-creators-gMsnXqILjp4-unsplash.jpg",
      price: 1100,
      originalPrice: 2200,
      hours: "24 Hrs",
      days: "03 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Agile Product Management, Continuous Exploration",
      popular: true,
      advanced: true,
    },
    {
      id: "12",
      title: "AI-Empowered SAFe Scrum Master",
      category: "SAFe",
      image: "/christina-wocintechchat-com-0Nfqp0WiJqc-unsplash (1).jpg",
      price: 515,
      originalPrice: 1030,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "SAFe Scrum, Team Facilitation, Coaching, AI-empowered ceremonies",
      popular: true,
    },
    {
      id: "13",
      title: "AI-Empowered SAFe for Teams",
      category: "SAFe",
      image: "/christina-wocintechchat-com-faEfWCdOKIg-unsplash.jpg",
      price: 599,
      originalPrice: 1198,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "SAFe Team Practices, Iteration Execution, AI-empowered teamwork",
      popular: true,
    },
    {
      id: "15",
      title: "SAFe DevOps",
      category: "SAFe",
      image: "/ewan-buck-xc9B3i-1QiI-unsplash.jpg",
      price: 599,
      originalPrice: 1198,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
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
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Responsible AI, Ethical AI Practices, AI Governance",
      trending: true,
    },
    {
      id: "16",
      title: "AI-Empowered SAFe Advanced Scrum Master",
      category: "SAFe",
      image: "/headway-5QgIuuBxKwM-unsplash.jpg",
      price: 599,
      originalPrice: 1198,
      hours: "16 Hrs",
      days: "02 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
      skills: "Flow, facilitation with AI, ART performance",
      popular: true,
      advanced: true,
    },
    {
      id: "17",
      title: "SAFe Release Train Engineer",
      category: "SAFe",
      image: "/RTE.png",
      price: 0,
      originalPrice: 0,
      hours: "16 Hrs",
      days: "03 days",
      enrolled: SAFE_COURSE_PARTICIPANTS_LABEL,
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
      price: 400,
      originalPrice: 800,
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
      price: 400,
      originalPrice: 800,
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
      image: "/Logo_Agents.png",
      price: 400,
      originalPrice: 800,
      hours: "10 Hrs",
      days: "02 days",
      enrolled: "2.8K+ Enrolled",
      skills: "Claude Agents, Claude Code, Codex, n8n Automation",
      popular: true,
    },
    // AI Product courses
    {
      id: "24",
      title: "Certified AI Product Manager",
      category: "AI Product",
      image: "/annie-spratt-QckxruozjRg-unsplash.jpg",
      price: 400,
      originalPrice: 800,
      hours: "10 Hrs",
      days: "02 days",
      enrolled: "2.5K+ Enrolled",
      skills: "AI Product Development, Prototype Building, Stakeholder Validation",
      popular: true,
    },
  ];

  const promoBannerActive = usePromoBannerActive();

  const selectedCategoryMeta =
    MEGA_MENU_CATEGORIES.find((c) => c.id === selectedMegaMenuCategory) ?? MEGA_MENU_CATEGORIES[0];

  const megaMenuCourses = sortMegaMenuCourses(
    allCourses.filter((course) => course.category === selectedMegaMenuCategory),
    selectedMegaMenuCategory
  );

  return (
    <>
      {/* Promo Banner — tap to copy 100OFF */}
      <PromoBanner />

      {/* Navigation Header — offset when thin promo strip is visible */}
      <header
        style={{ top: promoBannerActive ? PROMO_BANNER_STICKY_OFFSET_PX : 0 }}
        className={`w-full sticky z-50 overflow-visible transition-colors duration-300 ${
          isHome && cinematicHero && !scrolledPastHero
            ? "bg-white/82 backdrop-blur-xl border-b border-[#1f2c4a]/12 shadow-sm shadow-[#1f2c4a]/5"
            : isHome && !scrolledPastHero
              ? "bg-black/25 backdrop-blur-xl border-b border-[#1f2c4a]/10"
              : isHome
                ? "bg-black/60 backdrop-blur-2xl border-b border-[#1f2c4a]/10"
                : "bg-black border-b border-[#1f2c4a]/10"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-3 py-3.5 lg:py-4 min-w-0">
            {/* Logo and All Courses */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 min-w-0">
              <Link href="/" className="flex-shrink-0 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/agile36-logo-header.png"
                  alt="Agile36 Logo"
                  className="h-9 sm:h-11 w-auto block object-contain"
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
                  className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="font-medium text-base">All Courses</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mega Menu */}
                {showMegaMenu && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-[min(960px,calc(100vw-2rem))] max-w-[960px] bg-transparent z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white border border-[#1f2c4a]/10 rounded-xl shadow-2xl shadow-[#1f2c4a]/15 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Left Sidebar - Categories */}
                      <div className="w-full sm:w-52 shrink-0 bg-[#1f2c4a]/[0.03] border-b sm:border-b-0 sm:border-r border-[#1f2c4a]/10 rounded-t-xl sm:rounded-t-none sm:rounded-l-xl p-4 flex flex-col">
                        <h3 className="font-medium text-[#94a3b8] mb-3 text-xs uppercase tracking-[0.2em]">Categories</h3>
                        <ul className="space-y-0.5 flex-1">
                          {MEGA_MENU_CATEGORIES.map((category) => (
                            <li key={category.id}>
                              <button
                                onMouseEnter={() => setSelectedMegaMenuCategory(category.id)}
                                onClick={() => setShowMegaMenu(false)}
                                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                  selectedMegaMenuCategory === category.id
                                    ? "bg-[#1f2c4a] text-white"
                                    : "text-[#475569] hover:bg-[#1f2c4a]/10"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span>{category.label}</span>
                                  {selectedMegaMenuCategory === category.id && (
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  )}
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/courses"
                          onClick={() => setShowMegaMenu(false)}
                          className="mt-4 pt-3 border-t border-[#1f2c4a]/10 text-sm font-medium text-[#d97706] hover:text-[#b45309] flex items-center gap-1.5"
                        >
                          Browse All Courses
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                      
                      {/* Right Content - Courses */}
                      <div className="flex-1 p-5 sm:p-6 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-[#1f2c4a] text-lg leading-tight">
                              {selectedCategoryMeta.label}
                            </h3>
                            <p className="text-sm text-[#64748b] mt-1 leading-snug max-w-xl">
                              {selectedCategoryMeta.description}
                            </p>
                          </div>
                          <Link
                            href={`/courses?category=${selectedMegaMenuCategory}`}
                            onClick={() => setShowMegaMenu(false)}
                            className="text-sm text-[#d97706] hover:text-[#b45309] font-medium whitespace-nowrap shrink-0"
                          >
                            View all {selectedCategoryMeta.label} Courses
                          </Link>
                        </div>
                        <ul className={`grid ${selectedCategoryMeta.gridCols} gap-x-6 gap-y-1`}>
                          {megaMenuCourses.map((course) => (
                            <li key={course.id}>
                              <Link
                                href={getCourseUrl(course)}
                                onClick={() => setShowMegaMenu(false)}
                                className="flex items-start gap-2.5 py-2 px-1.5 -mx-1.5 rounded-md hover:bg-[#1f2c4a]/[0.06] transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#1f2c4a]/10 ring-1 ring-[#1f2c4a]/10">
                                  <Image
                                    src={getMegaMenuImage(course)}
                                    alt=""
                                    width={36}
                                    height={36}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                  <div className="flex items-start gap-1.5 flex-wrap">
                                    <h4 className="text-[13px] font-medium text-[#1f2c4a] group-hover:text-[#d97706] transition-colors leading-snug">
                                      {course.title}
                                    </h4>
                                    {course.popular && (
                                      <span className="bg-[#d97706]/15 text-[#d97706] text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0">
                                        Popular
                                      </span>
                                    )}
                                    {course.trending && (
                                      <span className="bg-emerald-400/15 text-emerald-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0">
                                        Trending
                                      </span>
                                    )}
                                    {course.advanced && (
                                      <span className="bg-purple-400/15 text-purple-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0">
                                        Advanced
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[#64748b] mt-0.5">
                                    {course.days} · Live Remote Class
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
            
            <SiteSearch />
            
            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7">
              <Link href="/combo-courses" className="flex items-center gap-1.5 whitespace-nowrap text-[#334155] hover:text-[#1f2c4a] font-medium transition-colors text-[15px] group">
                Combo Courses
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#d97706]/15 text-[#d97706] border border-[#d97706]/30 group-hover:bg-[#d97706]/20 transition-colors">
                  New
                </span>
              </Link>
              <Link href="/courses" className="whitespace-nowrap text-[#334155] hover:text-[#1f2c4a] font-medium transition-colors text-[15px]">
                Courses
              </Link>
              <Link href="/blog" className="whitespace-nowrap text-[#334155] hover:text-[#1f2c4a] font-medium transition-colors text-[15px]">
                Blogs
              </Link>
              <Link href="/test" className="whitespace-nowrap text-[#334155] hover:text-[#1f2c4a] font-medium transition-colors text-[15px]">
                Practice Tests
              </Link>
              <Link href="/testimonials" className="whitespace-nowrap text-[#334155] hover:text-[#1f2c4a] font-medium transition-colors text-[15px]">
                Testimonials
              </Link>
              <Link href="/corporate" className="whitespace-nowrap text-[#334155] hover:text-[#1f2c4a] font-medium transition-colors text-[15px]">
                Corporate
              </Link>
              <Link href="/account" className="whitespace-nowrap text-[#334155] hover:text-[#1f2c4a] font-medium transition-colors text-[15px]">
                My Account
              </Link>
            </div>
            
            {/* Utility Icons */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#334155] hover:text-[#1f2c4a] hover:bg-[#1f2c4a]/10 rounded-md transition-colors"
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
                className="p-2 text-[#334155] hover:text-[#1f2c4a] hover:bg-[#1f2c4a]/10 rounded-md transition-colors"
                title="Contact Us"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
              <button className="p-2 text-[#334155] hover:text-[#1f2c4a] hover:bg-[#1f2c4a]/10 rounded-md transition-colors relative">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-[#1f2c4a]/10 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              <Link 
                href="/combo-courses" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md font-medium"
              >
                Combo Courses
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#fa4a23]/15 text-[#fa4a23] border border-[#fa4a23]/30">
                  New
                </span>
              </Link>
              <Link 
                href="/courses" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md font-medium"
              >
                All Courses
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md font-medium"
              >
                Blogs
              </Link>
              <Link 
                href="/test" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md font-medium"
              >
                Practice Tests
              </Link>
              <Link 
                href="/testimonials" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md font-medium"
              >
                Testimonials
              </Link>
              <Link 
                href="/corporate" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md font-medium"
              >
                Corporate
              </Link>
              <Link 
                href="/account" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md font-medium"
              >
                My Account
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#334155] hover:bg-[#1f2c4a]/10 rounded-md font-medium"
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
