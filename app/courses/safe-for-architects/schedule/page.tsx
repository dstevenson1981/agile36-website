"use client";

import ScheduleCard from "@/app/components/schedule/ScheduleCard";
import CorporateQuoteModal from "@/app/components/CorporateQuoteModal";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

function CourseScheduleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseSlug = searchParams.get('course') || 'safe-for-architects';
  const [schedules, setSchedules] = useState<any[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<any[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(10); // Show 10 initially
  const [courseName, setCourseName] = useState("SAFe for Architects");
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  
  // Group inquiry modal state
  const [showGroupInquiryModal, setShowGroupInquiryModal] = useState(false);
  const [selectedScheduleForInquiry, setSelectedScheduleForInquiry] = useState<any>(null);
  
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    thisMonth: false,
    nextMonth: false,
    weekdays: false,
    weekend: false,
  });

  // Map course slugs to display names
  const courseNames: { [key: string]: string } = {
    'leading-safe': 'AI-Empowered Leading SAFe® / SAFe Agilist',
    'scrum-master': 'AI-Empowered SAFe Scrum Master',
    'product-owner-manager': 'AI-Empowered SAFe Product Owner/Product Manager',
    'lean-portfolio-management': 'Lean Portfolio Management',
    'agile-product-management': 'SAFe Agile Product Management',
    'safe-for-teams': 'AI-Empowered SAFe for Teams',
    'responsible-ai': 'Achieving Responsible AI with SAFe Micro-credential Course',
    'safe-for-architects': 'SAFe for Architects',
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoadingSchedules(true);
      try {
        const response = await fetch(`/api/course-schedules?course_slug=${courseSlug}&status=active&_t=${Date.now()}`, {
          cache: 'no-store'
        });
        const result = await response.json();
        if (result.success) {
          const data = result.data || [];
          setSchedules(data);
          setFilteredSchedules(data);
          // Initialize quantities
          const initialQuantities: { [key: string]: number } = {};
          data.forEach((schedule: any) => {
            initialQuantities[schedule.id] = 1;
          });
          setQuantity(initialQuantities);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setIsLoadingSchedules(false);
      }
    };

    const displayName = courseNames[courseSlug] || 'Course';
    setCourseName(displayName);
    fetchSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug]);

  // Filter schedules based on active filters
  useEffect(() => {
    let filtered = [...schedules];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Apply month filters
    if (activeFilters.thisMonth) {
      filtered = filtered.filter(schedule => {
        const scheduleDate = new Date(schedule.start_date);
        return scheduleDate.getMonth() === currentMonth && scheduleDate.getFullYear() === currentYear;
      });
    }

    if (activeFilters.nextMonth) {
      const nextMonth = (currentMonth + 1) % 12;
      const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
      filtered = filtered.filter(schedule => {
        const scheduleDate = new Date(schedule.start_date);
        return scheduleDate.getMonth() === nextMonth && scheduleDate.getFullYear() === nextYear;
      });
    }

    // Apply weekday/weekend filters - use calendar date to avoid timezone issues
    if (activeFilters.weekdays) {
      filtered = filtered.filter(schedule => {
        const dateStr = String(schedule.start_date).split('T')[0] || String(schedule.start_date).slice(0, 10);
        const day = new Date(dateStr + 'T12:00:00Z').getUTCDay(); // noon UTC = unambiguous day
        return day >= 1 && day <= 5; // Mon-Fri
      });
    }

    if (activeFilters.weekend) {
      filtered = filtered.filter(schedule => {
        const dateStr = String(schedule.start_date).split('T')[0] || String(schedule.start_date).slice(0, 10);
        const day = new Date(dateStr + 'T12:00:00Z').getUTCDay();
        return day === 0 || day === 6; // Sat-Sun
      });
    }

    setFilteredSchedules(filtered);
  }, [activeFilters, schedules]);

  const toggleFilter = (filterName: keyof typeof activeFilters) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev, [filterName]: !prev[filterName] };
      
      // Make weekdays and weekend mutually exclusive
      if (filterName === 'weekdays' && newFilters.weekdays) {
        newFilters.weekend = false;
      }
      if (filterName === 'weekend' && newFilters.weekend) {
        newFilters.weekdays = false;
      }
      
      // Make thisMonth and nextMonth mutually exclusive
      if (filterName === 'thisMonth' && newFilters.thisMonth) {
        newFilters.nextMonth = false;
      }
      if (filterName === 'nextMonth' && newFilters.nextMonth) {
        newFilters.thisMonth = false;
      }
      
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      thisMonth: false,
      nextMonth: false,
      weekdays: false,
      weekend: false,
      });
  };

  const updateQuantity = (scheduleId: string, delta: number) => {
    setQuantity(prev => {
      const current = prev[scheduleId] || 1;
      const newValue = Math.max(1, current + delta);
      return { ...prev, [scheduleId]: newValue };
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startFormatted = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endFormatted = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // If same day, just show one date
      if (start.toDateString() === end.toDateString()) {
        return startFormatted;
      }
      
      // If same month, only show day for end date
      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${startFormatted} - ${end.getDate()}`;
      }
      return `${startFormatted} - ${endFormatted}`;
    } catch (e) {
      return 'Date TBA';
    }
  };

  const formatTime = (time: string, timezone?: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const tz = timezone === 'America/New_York' ? 'EST' : timezone || '';
    return `${displayHour}:${minutes} ${ampm}${tz ? ` ${tz}` : ''}`;
  };


  const calculateDiscount = (originalPrice: number, salePrice: number) => {
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  const handleGroupInquiryClick = (schedule: any) => {
    setSelectedScheduleForInquiry(schedule);
    setShowGroupInquiryModal(true);
  };



  const hasActiveFilters = Object.values(activeFilters).some(v => v);

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      {/* Header Section */}
      <section className="w-full bg-black border-b border-[#1f2c4a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <Link href="/courses/safe-for-architects" className="hover:text-[#1f2c4a]">SAFe for Architects Certification Training</Link>
            <span>/</span>
            <span className="text-[#334155]">Schedule</span>
          </div>

          {/* Title */}
          <div className="mb-4">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#64748b] mb-1">COURSE SCHEDULES</p>
            <h1 className="text-2xl md:text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">
              Schedules for {courseName}
            </h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={() => toggleFilter('thisMonth')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.thisMonth
                  ? 'bg-[#d97706] text-white'
                  : 'bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => toggleFilter('nextMonth')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.nextMonth
                  ? 'bg-[#d97706] text-white'
                  : 'bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20'
              }`}
            >
              Next Month
            </button>
            <button
              onClick={() => toggleFilter('weekdays')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.weekdays
                  ? 'bg-[#d97706] text-white'
                  : 'bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20'
              }`}
            >
              Weekdays
            </button>
            <button
              onClick={() => toggleFilter('weekend')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.weekend
                  ? 'bg-[#d97706] text-white'
                  : 'bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20'
              }`}
            >
              Weekend
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-md text-sm font-medium text-[#475569] hover:text-[#d97706] transition-colors"
              >
                Clear All
              </button>
            )}
            <div className="ml-auto flex items-center gap-2 text-sm text-[#64748b]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>25% off for any group of 5 or more</span>
              <svg className="w-4 h-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-[#64748b]">
            Showing {Math.min(displayedCount, filteredSchedules.length)} of {filteredSchedules.length} Results
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="space-y-6">{/* Reviews Card */}
                <div className="liquid-glass rounded-2xl p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-600 font-semibold text-sm">Google</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-[#64748b]">4.9/5</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/Frame_Group.png"
                      alt="250+ Enrolled"
                      width={200}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Schedule List */}
            <div className="flex-1">
              {isLoadingSchedules ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]"></div>
                </div>
              ) : filteredSchedules.length === 0 ? (
                <div className="text-center py-12 liquid-glass rounded-2xl">
                  <svg className="mx-auto h-12 w-12 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-[#1f2c4a]">No schedules found</h3>
                  <p className="mt-1 text-sm text-[#64748b]">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSchedules.slice(0, displayedCount).map((schedule) => {
                    const qty = quantity[schedule.id] || 1;

                    return (
                      <ScheduleCard
                        key={schedule.id}
                        schedule={schedule}
                        courseSlug="safe-for-architects"
                        quantity={qty}
                        onQuantityChange={(delta) => updateQuantity(schedule.id, delta)}
                        onGroupInquiry={() => handleGroupInquiryClick(schedule)}
                        examLabel={"Exam Included"}
                        showSafeBadges
                      />
                    );
                  })}
                  
                  {/* View More Button */}
                  {displayedCount < filteredSchedules.length && (
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => setDisplayedCount(prev => Math.min(prev + 10, filteredSchedules.length))}
                        className="liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium px-8 py-3 rounded-lg hover:bg-[#1f2c4a] hover:text-white transition-colors"
                      >
                        VIEW MORE SCHEDULES
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CorporateQuoteModal
        open={showGroupInquiryModal}
        onClose={() => {
          setShowGroupInquiryModal(false);
          setSelectedScheduleForInquiry(null);
        }}
        courseSlug="safe-for-architects"
        courseLabel={courseName}
        contextLine={
          selectedScheduleForInquiry
            ? `${courseName} · ${String(selectedScheduleForInquiry.start_date).slice(0, 10)}`
            : courseName
        }
      />
    </main>
  );
}

export default function CourseSchedulePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-[#1f2c4a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]"></div>
      </main>
    }>
      <CourseScheduleContent />
    </Suspense>
  );
}

