"use client";

import Link from "next/link";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CoursesCatalogHero from "@/app/components/courses/CoursesCatalogHero";
import CourseCatalogCard from "@/app/components/courses/CourseCatalogCard";
import {
  CATALOG_COURSES,
  COURSE_CATEGORIES,
  getCatalogCourseSlug,
  normalizeCourseCategory,
  type CourseCategory,
} from "@/app/lib/course-catalog";

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
    () => CATALOG_COURSES.filter((c) => c.category === selectedCategory),
    [selectedCategory],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<CourseCategory, number> = {
      SAFe: 0,
      "Generative AI": 0,
      "AI Product": 0,
    };
    for (const c of CATALOG_COURSES) {
      counts[c.category] += 1;
    }
    return counts;
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <CoursesCatalogHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 lg:sticky lg:top-24">
              <h2 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wide">
                Categories
              </h2>
              <p className="text-xs text-gray-500 mb-4">Choose your career path</p>
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
                            ? "bg-[#01203d] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span>{category}</span>
                        <span
                          className={`text-xs tabular-nums ${
                            active ? "text-blue-200" : "text-gray-400"
                          }`}
                        >
                          {count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  href="/combo-courses"
                  className="text-sm font-semibold text-[#fa4a23] hover:text-[#e03d1a]"
                >
                  View combo courses →
                </Link>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Choose {selectedCategory} courses
                <span className="text-gray-500 font-semibold ml-2">
                  ({filteredCourses.length})
                </span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Expert-led live remote training — browse details or jump straight to
                upcoming schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filteredCourses.map((course) => (
                <CourseCatalogCard
                  key={course.id}
                  course={course}
                  nextStartDate={nextDatesBySlug[getCatalogCourseSlug(course)]}
                />
              ))}
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-600">No courses found in this category.</p>
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
        <main className="min-h-screen bg-[#f4f7fb] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fa4a23]" />
        </main>
      }
    >
      <CoursesContent />
    </Suspense>
  );
}
