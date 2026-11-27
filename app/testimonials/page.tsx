"use client";

import { motion } from "framer-motion";

import { useState, useMemo, useEffect } from "react";

import { getSiteTestimonials } from "@/app/lib/site-testimonials";

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "SAFe" | "AI Courses">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const allTestimonials = useMemo(() => getSiteTestimonials(), []);

  // Cursor-reactive glow: track pointer position per card via CSS vars
  const handleGlowMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  const marqueeRows = useMemo(() => {
    const featured = allTestimonials.slice(0, 16);
    return [featured.slice(0, 8), featured.slice(8, 16)];
  }, [allTestimonials]);

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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black text-[#111111]">
      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden border-b border-[#111111]/10 bg-black py-20 px-4 sm:px-6 lg:px-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(251,191,36,0.08) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl font-normal text-[#111111] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            What Our Learners Say
          </h1>
          <p className="text-xl text-[#475569] mb-8">
            Hear why our participants love us
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="liquid-glass rounded-2xl border border-[#111111]/10 px-8 py-6 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8] mb-3">Highest feedback score on Scaled Agile</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-semibold text-[#111111]" style={{ letterSpacing: "-0.03em" }}>4.9</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-[#B8860B]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#64748b] mt-3">Verified Agile36 learners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite testimonial marquee */}
      <section className="w-full overflow-hidden py-12 bg-black">
        <div className="space-y-6">
          {marqueeRows.map((row, rowIdx) => (
            <div key={rowIdx} className="marquee-mask marquee-paused overflow-hidden">
              <div
                className={`marquee-row flex w-max gap-6 pr-6 ${rowIdx === 1 ? "marquee-reverse" : ""}`}
                style={{ "--marquee-duration": rowIdx === 1 ? "70s" : "55s" } as React.CSSProperties}
              >
                {[...row, ...row].map((t, i) => (
                  <div
                    key={`${t.id}-${i}`}
                    onMouseMove={handleGlowMove}
                    aria-hidden={i >= row.length}
                    className="glow-card w-[300px] sm:w-[380px] shrink-0 rounded-2xl bg-white p-6 ring-1 ring-[#111111]/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(17, 17, 17,0.18)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, s) => (
                          <svg key={s} className="w-4 h-4 text-[#B8860B]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-4xl leading-none font-serif text-[#B8860B]/25 select-none" aria-hidden>&ldquo;</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569] line-clamp-4">{t.review}</p>
                    <div className="mt-4 flex items-center gap-3 border-t border-[#111111]/[0.08] pt-4">
                      <img
                        src={t.avatar}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full border border-[#111111]/15 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/AVATAR2/image 472.png';
                        }}
                      />
                      <div className="leading-tight">
                        <p className="text-sm font-semibold text-[#111111]">{t.name}</p>
                        <p className="text-xs text-[#94a3b8]">{t.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters and Search */}
      <section className="w-full bg-black border-b border-[#111111]/10 py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  setActiveTab("All");
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "All"
                    ? "bg-[#111111] text-white"
                    : "liquid-glass border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setActiveTab("SAFe");
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "SAFe"
                    ? "bg-[#111111] text-white"
                    : "liquid-glass border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-white"
                }`}
              >
                SAFe
              </button>
              <button
                onClick={() => {
                  setActiveTab("AI Courses");
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === "AI Courses"
                    ? "bg-[#111111] text-white"
                    : "liquid-glass border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-white"
                }`}
              >
                AI Courses
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search Testimonials"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 sm:w-64 px-4 py-2 rounded-lg border border-[#111111]/15 bg-[#111111]/[0.05] text-[#111111] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#111111]/30 focus:border-transparent"
              />
              <button className="bg-[#111111] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#000000] transition-colors">
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
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
              Showing {filteredTestimonials.length} {filteredTestimonials.length === 1 ? "review" : "reviews"}
            </p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {paginatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${currentPage}-${testimonial.id}`}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                onMouseMove={handleGlowMove}
                className="glow-card mb-6 break-inside-avoid rounded-2xl bg-white p-7 ring-1 ring-[#111111]/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(17, 17, 17,0.18)]"
              >
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full border border-[#111111]/15 object-cover"
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        (e.target as HTMLImageElement).src = '/AVATAR2/image 472.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#111111] mb-1">{testimonial.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-[#B8860B]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-[#64748b]">
                        {testimonial.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[#475569] leading-relaxed">{testimonial.review}</p>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === 1
                    ? "border border-[#111111]/5 bg-[#111111]/[0.02] text-gray-600 cursor-not-allowed"
                    : "liquid-glass border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-white"
                }`}
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          currentPage === page
                            ? "bg-[#111111] text-white"
                            : "liquid-glass text-[#475569] hover:border-[#111111]/25 hover:bg-[#111111]/[0.06] hover:text-[#111111]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-4 py-2 text-[#94a3b8]">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === totalPages
                    ? "border border-[#111111]/5 bg-[#111111]/[0.02] text-gray-600 cursor-not-allowed"
                    : "liquid-glass border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
