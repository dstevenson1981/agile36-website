"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  PUBLIC_CATALOG_COURSES,
  COURSE_CATEGORIES,
  formatCatalogLiveDate,
  getCatalogCourseAcronym,
  getCatalogCourseImage,
  getCatalogCourseSlug,
  getCatalogCourseUrl,
  getCatalogScheduleUrl,
  normalizeCourseCategory,
  type CatalogCourse,
  type CourseCategory,
} from "@/app/lib/course-catalog";

function CatalogHero() {
  return (
    <section className="w-full bg-black text-[#1f2c4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d97706] mb-3">
            Our certification courses
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#1f2c4a] leading-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Build skills with experts in SAFe, Agile &amp; AI
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8">
            Pick a course from our catalog, train with certified instructors, and
            earn credentials that move your career forward. Live remote classes with
            exam prep included on select SAFe certifications.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#16243f]"
            >
              Contact learning advisor
            </Link>
            <Link
              href="/corporate"
              className="liquid-glass inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 px-6 py-3 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
            >
              Corporate training
            </Link>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl">
          {[
            { value: "10K+", label: "Professionals trained" },
            { value: "Live", label: "Remote instructor-led" },
            { value: "SAFe®", label: "Silver Partner" },
            { value: "Exam", label: "Included on select courses" },
          ].map((stat) => (
            <li
              key={stat.label}
              className="rounded-2xl liquid-glass px-4 py-3"
            >
              <p
                className="text-xl font-semibold text-[#1f2c4a]"
                style={{ letterSpacing: "-0.03em" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-[#64748b] mt-0.5">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StarRating() {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#475569]">
      <svg className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      4.9
    </span>
  );
}

type CourseCardProps = {
  course: CatalogCourse;
  nextStartDate?: string | null;
};

function CourseCard({ course, nextStartDate }: CourseCardProps) {
  const courseUrl = getCatalogCourseUrl(course);
  const scheduleUrl = getCatalogScheduleUrl(course);
  const acronym = getCatalogCourseAcronym(course.title);
  const liveLabel = course.privateClass
    ? "Private class"
    : nextStartDate
      ? `Starts ${formatCatalogLiveDate(nextStartDate)}`
      : "Live remote class — view schedule";

  const badge = course.advanced
    ? { label: "Advanced", className: "bg-purple-500/15 text-purple-300" }
    : course.trending
      ? { label: "Trending", className: "bg-emerald-500/15 text-emerald-700" }
      : course.popular
        ? { label: "Popular", className: "bg-sky-500/15 text-sky-300" }
        : null;

  const priceLabel =
    course.privateClass || course.price <= 0
      ? "Contact for pricing"
      : `From $${course.price}`;

  return (
    <article className="rounded-2xl liquid-glass transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] overflow-hidden flex flex-col h-full">
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {badge ? (
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badge.className}`}
            >
              {badge.label}
            </span>
          ) : null}
          <StarRating />
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] bg-[#1f2c4a]/[0.06] border border-[#1f2c4a]/10 px-2.5 py-1 rounded-full ml-auto sm:ml-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden />
            Live classes · {liveLabel}
          </span>
        </div>

        <div className="flex gap-4 mb-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#1f2c4a]/[0.06] border border-[#1f2c4a]/10 flex items-center justify-center">
            <Image
              src={getCatalogCourseImage(course)}
              alt=""
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
              {acronym}
            </span>
            <h2
              className="text-base sm:text-lg font-normal text-[#1f2c4a] leading-snug mt-0.5"
              style={{ letterSpacing: "-0.03em" }}
            >
              <Link href={courseUrl} className="hover:text-[#d97706] transition-colors">
                {course.title}
              </Link>
            </h2>
          </div>
        </div>

        <p className="text-sm text-[#64748b] mb-4 line-clamp-2">
          <span className="font-medium text-[#475569]">Skills you&apos;ll gain: </span>
          {course.skills}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#64748b] mb-5">
          <span className="font-medium text-[#475569]">{course.days} course</span>
          <span aria-hidden>·</span>
          <span>{course.hours}</span>
          <span aria-hidden>·</span>
          <span>{course.enrolled.replace(" Enrolled", " learners")}</span>
          <span aria-hidden>·</span>
          <span className="text-[#1f2c4a] font-bold">{priceLabel}</span>
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          <Link
            href={courseUrl}
            className="liquid-glass flex-1 inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 text-[#1f2c4a] hover:bg-[#1f2c4a] hover:text-white px-4 py-2.5 text-sm font-medium transition-colors text-center"
          >
            View course
          </Link>
          {course.privateClass ? (
            <Link
              href={`/contact?course=${getCatalogCourseSlug(course)}`}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-white hover:bg-[#16243f] text-[#1f2c4a] px-4 py-2.5 text-sm font-medium transition-colors text-center"
            >
              Contact us
            </Link>
          ) : (
            <Link
              href={scheduleUrl}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-white hover:bg-[#16243f] text-[#1f2c4a] px-4 py-2.5 text-sm font-medium transition-colors text-center"
            >
              View schedule
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function CoursesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>(
    normalizeCourseCategory(categoryParam),
  );
  const [nextDatesBySlug, setNextDatesBySlug] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    setSelectedCategory(normalizeCourseCategory(searchParams.get("category")));
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          "/api/course-schedules?status=active&_t=" + Date.now(),
        );
        const json = await res.json();
        if (!res.ok || cancelled || !json?.data) return;
        const map: Record<string, string> = {};
        for (const row of json.data as { course_slug?: string; start_date?: string }[]) {
          const slug = row.course_slug;
          const start = row.start_date;
          if (slug && start && !map[slug]) {
            map[slug] = start;
          }
        }
        if (!cancelled) setNextDatesBySlug(map);
      } catch {
        /* schedules optional for catalog display */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCourses = useMemo(
    () => PUBLIC_CATALOG_COURSES.filter((c) => c.category === selectedCategory),
    [selectedCategory],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<CourseCategory, number> = {
      SAFe: 0,
      "Generative AI": 0,
      "AI Product": 0,
    };
    for (const c of PUBLIC_CATALOG_COURSES) {
      counts[c.category] += 1;
    }
    return counts;
  }, []);

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <CatalogHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="liquid-glass rounded-2xl border border-[#1f2c4a]/10 p-5 lg:sticky lg:top-24">
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8] mb-1">
                Categories
              </h2>
              <p className="text-xs text-[#64748b] mb-4">Choose your career path</p>
              <ul className="space-y-1">
                {COURSE_CATEGORIES.map((category) => {
                  const active = selectedCategory === category;
                  const count = categoryCounts[category];
                  return (
                    <li key={category}>
                      <Link
                        href={`/courses?category=${encodeURIComponent(category)}`}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                          active
                            ? "bg-[#1f2c4a] text-white"
                            : "text-[#475569] hover:bg-[#1f2c4a]/[0.06] hover:text-[#1f2c4a]"
                        }`}
                      >
                        <span>{category}</span>
                        <span
                          className={`text-xs tabular-nums ${
                            active ? "text-gray-600" : "text-[#94a3b8]"
                          }`}
                        >
                          {count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#1f2c4a]/10">
                <Link
                  href="/combo-courses"
                  className="text-sm font-medium text-[#d97706] hover:text-[#fcd34d] transition-colors"
                >
                  View combo courses →
                </Link>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h2
                className="text-xl md:text-2xl font-normal text-[#1f2c4a]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Choose {selectedCategory} courses
                <span className="text-[#94a3b8] ml-2">
                  ({filteredCourses.length})
                </span>
              </h2>
              <p className="text-sm text-[#64748b] mt-1">
                Expert-led live remote training — browse details or jump straight to
                upcoming schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  nextStartDate={nextDatesBySlug[getCatalogCourseSlug(course)]}
                />
              ))}
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 rounded-2xl liquid-glass">
                <p className="text-[#64748b]">No courses found in this category.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </main>
      }
    >
      <CoursesContent />
    </Suspense>
  );
}
