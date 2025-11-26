"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

function CourseScheduleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseSlug = searchParams.get('course') || 'leading-safe';
  const [schedules, setSchedules] = useState<any[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<any[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(10); // Show 10 initially
  const [courseName, setCourseName] = useState("Leading SAFe® 6.0 Training");
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  
  // Group inquiry modal state
  const [showGroupInquiryModal, setShowGroupInquiryModal] = useState(false);
  const [groupInquiryFormData, setGroupInquiryFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmittingGroupInquiry, setIsSubmittingGroupInquiry] = useState(false);
  const [selectedScheduleForInquiry, setSelectedScheduleForInquiry] = useState<any>(null);
  
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    thisMonth: false,
    nextMonth: false,
    weekdays: false,
    weekend: false,
    timeSlot: false,
  });

  // Map course slugs to display names
  const courseNames: { [key: string]: string } = {
    'leading-safe': 'Leading SAFe® 6.0 Training',
    'scrum-master': 'SAFe Scrum Master',
    'product-owner-manager': 'SAFe Product Owner/Product Manager',
    'lean-portfolio-management': 'Lean Portfolio Management',
    'devops': 'SAFe DevOps',
    'agile-product-management': 'SAFe Agile Product Management',
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoadingSchedules(true);
      try {
        const response = await fetch(`/api/course-schedules?course_slug=${courseSlug}&status=active`);
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

    // Apply weekday/weekend filters
    if (activeFilters.weekdays) {
      filtered = filtered.filter(schedule => {
        // Show only weekday batches (is_weekend is false, null, or undefined)
        const isWeekend = schedule.is_weekend;
        return isWeekend === false || isWeekend === null || isWeekend === undefined || !isWeekend;
      });
    }

    if (activeFilters.weekend) {
      filtered = filtered.filter(schedule => {
        // Show only weekend batches (is_weekend is explicitly true)
        return schedule.is_weekend === true;
      });
    }

    // Note: Time slot filter UI exists but no specific filtering logic needed
    // as the badge is already displayed for each schedule

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startFormatted = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endFormatted = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
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
    return colors[timeSlot] || 'bg-gray-100 text-gray-800';
  };

  const calculateDiscount = (originalPrice: number, salePrice: number) => {
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText('50OFF');
    alert('Coupon code copied!');
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        console.error('API Error:', errorData);
        alert(errorData.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmittingGroupInquiry(false);
    }
  };

  const hasActiveFilters = Object.values(activeFilters).some(v => v);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#01203d]">Home</Link>
            <span>/</span>
            <Link href="/courses/leading-safe" className="hover:text-[#01203d]">Leading SAFe® 6.0 Certification Training</Link>
            <span>/</span>
            <span className="text-[#01203d]">Schedule</span>
          </div>

          {/* Title */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">COURSE SCHEDULES</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Schedules for {courseName} in USA
            </h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={() => toggleFilter('thisMonth')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.thisMonth
                  ? 'bg-[#fa4a23] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => toggleFilter('nextMonth')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.nextMonth
                  ? 'bg-[#fa4a23] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Next Month
            </button>
            <button
              onClick={() => toggleFilter('weekdays')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.weekdays
                  ? 'bg-[#fa4a23] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekdays
            </button>
            <button
              onClick={() => toggleFilter('weekend')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.weekend
                  ? 'bg-[#fa4a23] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekend
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#fa4a23] transition-colors"
              >
                Clear All
              </button>
            )}
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>15% off for any group of 5 or more</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600">
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
              <div className="space-y-6">
                {/* Discount Banner */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">$50 OFF</span>
                  </div>
                  <p className="text-sm mb-3 opacity-90">Expires tonight</p>
                  <div className="bg-white/20 rounded-md p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Coupon code '50OFF'</span>
                      <button
                        onClick={copyCouponCode}
                        className="bg-white text-orange-600 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reviews Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-600 font-semibold text-sm">Trustpilot</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">TrustScore 4.9</p>
                      <p className="text-xs text-gray-500">2,653 reviews</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-600 font-semibold text-sm">Google</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">4.9/5</p>
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fa4a23]"></div>
                </div>
              ) : filteredSchedules.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No schedules found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSchedules.slice(0, displayedCount).map((schedule) => {
                    const startDate = new Date(schedule.start_date);
                    const endDate = new Date(schedule.end_date);
                    const isLowSeats = schedule.seats_available !== null && schedule.seats_available > 0 && schedule.seats_available <= 5;
                    const qty = quantity[schedule.id] || 1;
                    const totalPrice = (parseFloat(schedule.price) * qty).toFixed(2);
                    const discount = schedule.original_price ? calculateDiscount(parseFloat(schedule.original_price), parseFloat(schedule.price)) : 0;

                    return (
                      <div key={schedule.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Left Content */}
                          <div className="flex-1 space-y-4">
                            {/* Time Slot Badge and Dates */}
                            <div className="flex items-start gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold {getTimeSlotColor(schedule.time_slot)}`}>
                                {getTimeSlotLabel(schedule.time_slot)}
                              </span>
                              <div>
                                <div className="font-bold text-lg text-gray-900">
                                  {formatDateRange(schedule.start_date, schedule.end_date)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>
                                    {formatTime(schedule.start_time, schedule.timezone)} - {formatTime(schedule.end_time, schedule.timezone)} • ({schedule.duration})
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                  </svg>
                                  <span>Online • {schedule.is_weekend === true ? 'Weekend' : 'Weekday'} Batch</span>
                                </div>
                              </div>
                            </div>

                            {/* Instructor */}
                            <div className="flex items-center gap-3">
                              {schedule.instructor_image ? (
                                <Image
                                  src={schedule.instructor_image}
                                  alt={schedule.instructor_name || 'Instructor'}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-gray-900">{schedule.instructor_name || 'TBA'}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                  </svg>
                                  <span>Language: {schedule.language || 'English'} • {schedule.exam_included ? 'Exam Included' : 'No Exam'}</span>
                                </div>
                              </div>
                            </div>

                            {/* SAFe Badges */}
                            <div className="flex items-center gap-2">
                              <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded text-xs font-semibold text-blue-700">
                                SAFe
                              </div>
                              <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-semibold text-gray-700">
                                SAFe SILVER PARTNER
                              </div>
                            </div>

                            {/* Curriculum and Quantity */}
                            <div className="flex items-center gap-6">
                              <a 
                                href="/Leading-SAFe_6.0_Partner.pdf" 
                                download
                                target="_blank"
                                className="flex items-center gap-2 text-sm text-[#fa4a23] hover:underline"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Brochure
                              </a>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(schedule.id, -1)}
                                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                                >
                                  <span className="text-gray-600">-</span>
                                </button>
                                <span className="w-12 text-center font-semibold">{qty}</span>
                                <button
                                  onClick={() => updateQuantity(schedule.id, 1)}
                                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                                >
                                  <span className="text-gray-600">+</span>
                                </button>
                              </div>
                            </div>

                            {/* Seats Left */}
                            {isLowSeats && (
                              <div className="flex items-center gap-2 text-sm text-orange-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="font-semibold">only few seats left</span>
                              </div>
                            )}

                            {/* Group Inquiry */}
                            <div>
                              <button 
                                onClick={() => handleGroupInquiryClick(schedule)}
                                className="text-sm text-[#fa4a23] hover:underline"
                              >
                                More than 5 Participants? Enquire Now &gt;&gt;
                              </button>
                            </div>
                          </div>

                          {/* Right Pricing Section */}
                          <div className="w-full lg:w-80 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6 space-y-4">
                            {schedule.is_best_deal && (
                              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold text-center">
                                BEST DEAL
                              </div>
                            )}
                            {schedule.original_price && (
                              <div className="text-center">
                                <div className="text-sm text-gray-400 line-through">USD {schedule.original_price}</div>
                                <div className="text-sm font-semibold text-green-600">{discount}% OFF</div>
                              </div>
                            )}
                            <div className="text-center">
                              <div className="text-3xl font-bold text-gray-900">USD {totalPrice}</div>
                            </div>
                            <Link
                              href={`/courses/leading-safe/schedule/checkout?schedule=${schedule.id}&course=leading-safe&quantity=${qty}`}
                              className="w-full bg-[#01203d] hover:bg-[#023a5e] text-white font-bold py-3 px-6 rounded-lg transition-colors text-center block"
                            >
                              ENROLL NOW
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* View More Button */}
                  {displayedCount < filteredSchedules.length && (
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => setDisplayedCount(prev => Math.min(prev + 10, filteredSchedules.length))}
                        className="bg-[#01203d] hover:bg-[#023a5e] text-white font-bold px-8 py-3 rounded-lg transition-colors"
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

      {/* Group Inquiry Modal */}
      {showGroupInquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowGroupInquiryModal(false);
                setGroupInquiryFormData({ name: "", email: "" });
                setSelectedScheduleForInquiry(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center z-10"
            >
              <span className="text-gray-600 text-xl">×</span>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Section - Group Discount Promotion */}
              <div className="bg-gradient-to-br from-[#fffef2] to-[#ffe5d9] p-8 md:w-2/5 flex flex-col justify-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Group Training Discount Available
                  </h2>
                  <p className="text-base text-gray-700 mb-4">
                    Get special pricing when enrolling 5 or more participants in our training courses.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#fa4a23]">
                    <p className="text-sm font-semibold text-[#fa4a23] mb-1">
                      🎯 Special Group Offer
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      15% Off for Groups of 5+
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Customized training schedules
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Dedicated account manager
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Flexible payment options
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Section - Group Inquiry Form */}
              <div className="p-8 md:w-3/5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Request Group Pricing
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Enter your details below and we'll contact you with special group pricing for 5 or more participants
                </p>
                <form onSubmit={handleGroupInquirySubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="group-inquiry-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="group-inquiry-name"
                      required
                      value={groupInquiryFormData.name}
                      onChange={(e) =>
                        setGroupInquiryFormData({ ...groupInquiryFormData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="group-inquiry-email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="group-inquiry-email"
                      required
                      value={groupInquiryFormData.email}
                      onChange={(e) =>
                        setGroupInquiryFormData({ ...groupInquiryFormData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send you group pricing and available dates
                    </p>
                  </div>

                  {selectedScheduleForInquiry && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Selected Course:</p>
                      <p className="text-sm font-medium text-gray-900">{courseName}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(selectedScheduleForInquiry.start_date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingGroupInquiry}
                    className="w-full bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingGroupInquiry ? 'Submitting...' : 'Request Group Pricing'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our{' '}
                    <Link href="#" className="text-[#fa4a23] hover:underline">Privacy Policy</Link>
                    {' '}and{' '}
                    <Link href="#" className="text-[#fa4a23] hover:underline">Terms and Conditions</Link>
                  </p>
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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fa4a23]"></div>
      </main>
    }>
      <CourseScheduleContent />
    </Suspense>
  );
}
