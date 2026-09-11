"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  PUBLIC_CATALOG_COURSES,
  getCatalogCourseImage,
  getCatalogCourseUrl,
  type CatalogCourse,
} from "@/app/lib/course-catalog";
import PromoBanner, { usePromoBannerActive, PROMO_BANNER_STICKY_OFFSET_PX } from "./PromoBanner";
import SiteSearch from "./SiteSearch";

const MEGA_MENU_SAFE_ORDER: Record<string, number> = {
  "16": 0, // Advanced Scrum Master
  "8": 1,
  "9": 2,
  "18": 3,
  "10": 4,
  "11": 5,
  "28": 6, // SAFe for Architects
  "12": 7,
  "13": 8,
  "27": 9,
  "17": 10,
  "15": 11, // DevOps
};

const MEGA_MENU_AI_ORDER: Record<string, number> = {
  "23": 0, // No-Code AI Agents
  "31": 1, // AI Workflow Automation
  "32": 2, // No-Code AI App Builder
  "19": 3, // AI-Driven Scrum Master
  "22": 4, // Certified GenAI Practitioner
  "24": 5, // Certified AI Product Manager
  "20": 6, // Executive GenAI Leadership
  "21": 7, // AI-Driven Project Manager
};

function sortMegaMenuCourses(courses: CatalogCourse[], category: string): CatalogCourse[] {
  const order = category === "SAFe" ? MEGA_MENU_SAFE_ORDER : category === "AI Courses" ? MEGA_MENU_AI_ORDER : null;
  if (!order) return courses;
  return [...courses].sort(
    (a, b) => (order[a.id] ?? 99) - (order[b.id] ?? 99)
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
    id: "AI Courses",
    label: "AI Courses",
    description: "Hands-on training to build AI agents, automations, and apps you can sell. No traditional programming required.",
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
  const promoBannerActive = usePromoBannerActive();

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
  
  // Close menus on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowMegaMenu(false);
  }, [pathname]);

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
    pathname === "/apm-pro-class" ||
    pathname === "/leading-safe-pro-class" ||
    pathname === "/lpm-pro-temp" ||
    pathname === "/lpm-pro-class" ||
    pathname === "/lpmpro" ||
    pathname === "/popm-pro-temp" ||
    pathname === "/popm-pro-class" ||
    pathname === "/popmpro" ||
    pathname === "/popm-practice-temp" ||
    pathname === "/popm-prep-pro" ||
    pathname === "/popm-workshop" ||
    pathname === "/scrum-master-pro-class" ||
    pathname === "/advanced-scrum-master-pro-class"
  ) {
    return null;
  }

  const selectedCategoryMeta =
    MEGA_MENU_CATEGORIES.find((c) => c.id === selectedMegaMenuCategory) ?? MEGA_MENU_CATEGORIES[0];

  const megaMenuCourses = sortMegaMenuCourses(
    PUBLIC_CATALOG_COURSES.filter((course) => course.category === selectedMegaMenuCategory),
    selectedMegaMenuCategory
  );

  return (
    <>
      {/* Promo Banner — subscribe to reveal 100OFF */}
      <PromoBanner />

      {/* Navigation Header — offset when thin promo strip is visible */}
      <header
        style={{ top: promoBannerActive ? PROMO_BANNER_STICKY_OFFSET_PX : 0 }}
        className={`w-full sticky z-50 overflow-x-clip overflow-y-visible transition-colors duration-300 ${
          isHome && cinematicHero && !scrolledPastHero
            ? "bg-white/82 backdrop-blur-xl border-b border-[#1f2c4a]/12 shadow-sm shadow-[#1f2c4a]/5"
            : isHome && !scrolledPastHero
              ? "bg-black/25 backdrop-blur-xl border-b border-[#1f2c4a]/10"
              : isHome
                ? "bg-black/60 backdrop-blur-2xl border-b border-[#1f2c4a]/10"
                : "bg-black border-b border-[#1f2c4a]/10"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8">
          {/* KnowledgeHut-style: left cluster | flexible search | right links — grid prevents overlap */}
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3 lg:gap-4 py-3 lg:py-3.5 min-w-0">
            {/* Left: Logo + All Courses */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
              <Link href="/" className="shrink-0 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/agile36-logo-header.png"
                  alt="Agile36 Logo"
                  className="h-8 sm:h-9 w-auto max-w-[130px] sm:max-w-[150px] block object-contain"
                />
              </Link>
              
              {/* All Courses — pill control like KnowledgeHut */}
              <div 
                ref={megaMenuRef}
                className="relative hidden md:block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  type="button"
                  className="flex items-center gap-2 h-10 px-3.5 rounded-full border border-[#1f2c4a]/20 bg-white text-[#1f2c4a] hover:border-[#1f2c4a]/40 hover:bg-[#1f2c4a]/[0.03] transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="font-medium text-sm whitespace-nowrap">All Courses</span>
                  <svg className="w-3.5 h-3.5 shrink-0 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            href={`/courses?category=${encodeURIComponent(selectedMegaMenuCategory)}`}
                            onClick={() => setShowMegaMenu(false)}
                            className="text-sm text-[#d97706] hover:text-[#b45309] font-medium whitespace-nowrap shrink-0"
                          >
                            View all {selectedCategoryMeta.label === "AI Courses" ? "AI Courses" : `${selectedCategoryMeta.label} Courses`}
                          </Link>
                        </div>
                        <ul className={`grid ${selectedCategoryMeta.gridCols} gap-x-6 gap-y-1`}>
                          {megaMenuCourses.map((course) => (
                            <li key={course.id}>
                              <Link
                                href={getCatalogCourseUrl(course)}
                                onClick={() => setShowMegaMenu(false)}
                                className="flex items-start gap-2.5 py-2 px-1.5 -mx-1.5 rounded-md hover:bg-[#1f2c4a]/[0.06] transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#1f2c4a]/10 ring-1 ring-[#1f2c4a]/10">
                                  <Image
                                    src={getCatalogCourseImage(course)}
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
            
            {/* Center: search fills only the middle column */}
            <div className="min-w-0 w-full">
              <SiteSearch />
            </div>
            
            {/* Right: full nav set — grid middle column shrinks so these never get covered */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 justify-end">
              <div className="hidden xl:flex items-center gap-2.5 2xl:gap-4">
                <Link
                  href="/combo-courses"
                  className="flex items-center gap-1 whitespace-nowrap text-[#1f2c4a] hover:text-[#d97706] font-medium transition-colors text-[13px] 2xl:text-sm"
                >
                  Combo Courses
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#d97706]/15 text-[#d97706] border border-[#d97706]/30">
                    New
                  </span>
                </Link>
                <Link
                  href="/courses"
                  className="whitespace-nowrap text-[#1f2c4a] hover:text-[#d97706] font-medium transition-colors text-[13px] 2xl:text-sm"
                >
                  Courses
                </Link>
                <Link
                  href="/blog"
                  className="whitespace-nowrap text-[#1f2c4a] hover:text-[#d97706] font-medium transition-colors text-[13px] 2xl:text-sm"
                >
                  Blogs
                </Link>
                <Link
                  href="/test"
                  className="whitespace-nowrap text-[#1f2c4a] hover:text-[#d97706] font-medium transition-colors text-[13px] 2xl:text-sm"
                >
                  Practice Tests
                </Link>
                <Link
                  href="/testimonials"
                  className="whitespace-nowrap text-[#1f2c4a] hover:text-[#d97706] font-medium transition-colors text-[13px] 2xl:text-sm"
                >
                  Testimonials
                </Link>
                <Link
                  href="/corporate"
                  className="whitespace-nowrap text-[#1f2c4a] hover:text-[#d97706] font-medium transition-colors text-[13px] 2xl:text-sm"
                >
                  Corporate
                </Link>
                <Link
                  href="/account"
                  className="inline-flex items-center justify-center h-9 px-3.5 rounded-lg bg-[#1f2c4a] text-white text-[13px] 2xl:text-sm font-semibold hover:bg-[#16243f] transition-colors whitespace-nowrap"
                >
                  My Account
                </Link>
                <Link
                  href="/contact"
                  className="p-2 text-[#1f2c4a] hover:bg-[#1f2c4a]/10 rounded-md transition-colors"
                  title="Contact Us"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </Link>
              </div>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#1f2c4a] hover:bg-[#1f2c4a]/10 rounded-md transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Compact menu — below xl so every item is still available on laptop/phone */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-[#1f2c4a]/10 shadow-lg max-h-[min(80vh,32rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              <Link 
                href="/combo-courses" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-[#1f2c4a] hover:bg-[#1f2c4a]/5 rounded-md font-medium"
              >
                Combo Courses
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#d97706]/15 text-[#d97706] border border-[#d97706]/30">
                  New
                </span>
              </Link>
              <Link 
                href="/courses" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#1f2c4a] hover:bg-[#1f2c4a]/5 rounded-md font-medium"
              >
                All Courses
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#1f2c4a] hover:bg-[#1f2c4a]/5 rounded-md font-medium"
              >
                Blogs
              </Link>
              <Link 
                href="/test" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#1f2c4a] hover:bg-[#1f2c4a]/5 rounded-md font-medium"
              >
                Practice Tests
              </Link>
              <Link 
                href="/testimonials" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#1f2c4a] hover:bg-[#1f2c4a]/5 rounded-md font-medium"
              >
                Testimonials
              </Link>
              <Link 
                href="/corporate" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#1f2c4a] hover:bg-[#1f2c4a]/5 rounded-md font-medium"
              >
                Corporate
              </Link>
              <Link 
                href="/account" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#1f2c4a] hover:bg-[#1f2c4a]/5 rounded-md font-semibold"
              >
                My Account
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#1f2c4a] hover:bg-[#1f2c4a]/5 rounded-md font-medium"
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
