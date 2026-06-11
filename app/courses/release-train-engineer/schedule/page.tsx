"use client";

import ScheduleCard from "@/app/components/schedule/ScheduleCard";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function CourseScheduleContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get('course') || 'release-train-engineer';
  const [schedules, setSchedules] = useState<any[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<any[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(10);
  const [courseName, setCourseName] = useState("SAFe AI-Empowered Release Train Engineer");
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

  const [showGroupInquiryModal, setShowGroupInquiryModal] = useState(false);
  const [groupInquiryFormData, setGroupInquiryFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmittingGroupInquiry, setIsSubmittingGroupInquiry] = useState(false);
  const [selectedScheduleForInquiry, setSelectedScheduleForInquiry] = useState<any>(null);

  const [activeFilters, setActiveFilters] = useState({
    thisMonth: false,
    nextMonth: false,
    weekdays: false,
    weekend: false,
    timeSlot: false,
  });

  const courseNames: { [key: string]: string } = {
    'release-train-engineer': 'SAFe AI-Empowered Release Train Engineer',
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

    const displayName = courseNames[courseSlug] || 'SAFe AI-Empowered Release Train Engineer';
    setCourseName(displayName);
    fetchSchedules();
  }, [courseSlug]);

  useEffect(() => {
    let filtered = [...schedules];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

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
      if (filterName === 'weekdays' && newFilters.weekdays) newFilters.weekend = false;
      if (filterName === 'weekend' && newFilters.weekend) newFilters.weekdays = false;
      if (filterName === 'thisMonth' && newFilters.thisMonth) newFilters.nextMonth = false;
      if (filterName === 'nextMonth' && newFilters.nextMonth) newFilters.thisMonth = false;
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      thisMonth: false,
      nextMonth: false,
      weekdays: false,
      weekend: false,
      timeSlot: false,
    });
  };

  const updateQuantity = (scheduleId: string, delta: number) => {
    setQuantity(prev => {
      const current = prev[scheduleId] || 1;
      const newValue = Math.max(1, current + delta);
      return { ...prev, [scheduleId]: newValue };
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startFormatted = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endFormatted = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
    return `${displayHour}:${minutes} ${ampm}${tz ? ` (${tz})` : ''}`;
  };

  const getTimeSlotLabel = (timeSlot: string) => {
    const labels: { [key: string]: string } = {
      'morning': 'Morning',
      'afternoon': 'Afternoon',
      'evening': 'Evening',
    };
    return labels[timeSlot] || 'Morning';
  };

  const getTimeSlotColor = (timeSlot: string) => {
    const colors: { [key: string]: string } = {
      'morning': 'bg-green-100 text-green-800',
      'afternoon': 'bg-blue-100 text-blue-800',
      'evening': 'bg-purple-100 text-purple-800',
    };
    return colors[timeSlot] || 'bg-gray-100 text-[#334155]';
  };

  const calculateDiscount = (originalPrice: number, salePrice: number) => {
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  const handleGroupInquiryClick = (schedule: any) => {
    setSelectedScheduleForInquiry(schedule);
    setShowGroupInquiryModal(true);
  };

  const handleGroupInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupInquiryFormData.email || !groupInquiryFormData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    if (!groupInquiryFormData.name || groupInquiryFormData.name.trim() === '') {
      alert('Please enter your full name');
      return;
    }

    setIsSubmittingGroupInquiry(true);
    try {
      const response = await fetch('/api/store-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: groupInquiryFormData.name,
          email: groupInquiryFormData.email,
          source: 'Group Inquiry - 5+ Participants',
          exam_name: selectedScheduleForInquiry ? `${courseName} - ${selectedScheduleForInquiry.start_date}` : courseName
        }),
      });

      if (response.ok) {
        alert('Thank you for your inquiry! We will contact you shortly about group pricing.');
        setShowGroupInquiryModal(false);
        setGroupInquiryFormData({ name: "", email: "" });
        setSelectedScheduleForInquiry(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmittingGroupInquiry(false);
    }
  };

  const hasActiveFilters = Object.values(activeFilters).some(v => v);

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <section className="w-full bg-black border-b border-[#1f2c4a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6">
          <div className="flex items-center gap-2 mb-4 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <Link href="/courses/release-train-engineer" className="hover:text-[#1f2c4a]">SAFe AI-Empowered Release Train Engineer</Link>
            <span>/</span>
            <span className="text-[#334155]">Schedule</span>
          </div>

          <div className="mb-4">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#64748b] mb-1">COURSE SCHEDULES</p>
            <h1 className="text-2xl md:text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">
              Schedules for {courseName}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={() => toggleFilter('thisMonth')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeFilters.thisMonth ? 'bg-[#d97706] text-white' : 'bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20'}`}
            >
              This Month
            </button>
            <button
              onClick={() => toggleFilter('nextMonth')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeFilters.nextMonth ? 'bg-[#d97706] text-white' : 'bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20'}`}
            >
              Next Month
            </button>
            <button
              onClick={() => toggleFilter('weekdays')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeFilters.weekdays ? 'bg-[#d97706] text-white' : 'bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20'}`}
            >
              Weekdays
            </button>
            <button
              onClick={() => toggleFilter('weekend')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeFilters.weekend ? 'bg-[#d97706] text-white' : 'bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20'}`}
            >
              Weekend
            </button>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="px-4 py-2 rounded-md text-sm font-medium text-[#475569] hover:text-[#d97706] transition-colors">
                Clear All
              </button>
            )}
            <div className="ml-auto flex items-center gap-2 text-sm text-[#64748b]">
              <span>15% off for any group of 5 or more</span>
            </div>
          </div>

          <p className="text-sm text-[#64748b]">
            Showing {Math.min(displayedCount, filteredSchedules.length)} of {filteredSchedules.length} Results
          </p>
        </div>
      </section>

      <section className="w-full py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="space-y-6">
                <div className="liquid-glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-2">
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
            </aside>

            <div className="flex-1">
              {isLoadingSchedules ? (
                <div className="flex justify-center py-12">
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
                        courseSlug="release-train-engineer"
                        quantity={qty}
                        onQuantityChange={(delta) => updateQuantity(schedule.id, delta)}
                        onGroupInquiry={() => handleGroupInquiryClick(schedule)}
                        brochureHref="/RTE_Brochure.pdf"
                      />
                    );
                  })}

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

      {showGroupInquiryModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => {
                setShowGroupInquiryModal(false);
                setGroupInquiryFormData({ name: "", email: "" });
                setSelectedScheduleForInquiry(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1f2c4a]/10 hover:bg-[#1f2c4a]/20 flex items-center justify-center z-10"
            >
              <span className="text-[#334155] text-xl">×</span>
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="bg-gradient-to-br from-[#1f2c4a]/10 to-transparent p-8 md:w-2/5 flex flex-col justify-center">
                <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-3">Group Training Discount Available</h2>
                <p className="text-base text-[#475569] mb-4">Get special pricing when enrolling 5 or more participants.</p>
                <div className="bg-[#1f2c4a]/10 rounded-lg p-4 mb-4 border border-[#d97706]/50">
                  <p className="text-base font-bold text-[#1f2c4a]">20% Off for Groups of 5+</p>
                </div>
              </div>

              <div className="p-8 md:w-3/5">
                <h3 className="text-xl font-bold text-[#1f2c4a] mb-2">Request Group Pricing</h3>
                <form onSubmit={handleGroupInquirySubmit} className="space-y-4">
                  <div>
                    <label htmlFor="group-inquiry-name" className="block text-sm font-medium text-[#475569] mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="group-inquiry-name"
                      required
                      value={groupInquiryFormData.name}
                      onChange={(e) => setGroupInquiryFormData({ ...groupInquiryFormData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="group-inquiry-email" className="block text-sm font-medium text-[#475569] mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="group-inquiry-email"
                      required
                      value={groupInquiryFormData.email}
                      onChange={(e) => setGroupInquiryFormData({ ...groupInquiryFormData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingGroupInquiry}
                    className="w-full bg-white hover:bg-[#16243f] text-[#1f2c4a] font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingGroupInquiry ? 'Submitting...' : 'Request Group Pricing'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
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
