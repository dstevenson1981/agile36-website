"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { COMBO_COURSES, comboFilterCourses, findComboByCourseSlugs, type Combo } from "./data";

const FAQS = [
  {
    q: "What are Agile36 Combo Courses?",
    a: "Agile36 Combo Courses pair two complementary certifications into one bundled enrollment — so you stack credentials faster, with coordinated live schedules and a lower total price than buying each course separately.",
  },
  {
    q: "How do Combo Courses help save costs?",
    a: "Bundled pricing is significantly lower than enrolling in each course on its own. You get both live trainings, materials, and certification exam paths in one package.",
  },
  {
    q: "Who should enroll in Combo Courses?",
    a: "They’re ideal for professionals who want to expand across related SAFe® or AI paths quickly — for example Scrum Masters adding LPM, or Product Owners pairing POPM with SASM.",
  },
  {
    q: "Are the certifications globally recognized?",
    a: "Yes. Certifications in our combos come from industry-recognized bodies such as Scaled Agile, Inc. and aligned AI credentialing partners.",
  },
  {
    q: "What is the typical combo course duration?",
    a: "Most combos include two 2-day live courses (about 16 hours each). You’ll choose cohort dates for each course at enrollment — weekday and weekend options are available.",
  },
  {
    q: "Can I choose my own course combinations?",
    a: "Yes. Use Build your own beside the catalog and pick any two courses. The price is the published bundle price for that pair, and you choose live dates for each course. For a team or corporate cohort, contact a course advisor.",
  },
  {
    q: "Will I get separate certificates for each course?",
    a: "Yes. After you successfully complete each course and pass the related exam (when required), you receive individual certificates from the respective accreditation bodies.",
  },
  {
    q: "Are these courses delivered live or self-paced?",
    a: "All Agile36 Combo Courses are live, instructor-led (virtual classroom) with SPC faculty — not self-paced video libraries.",
  },
  {
    q: "Do Combo Courses include exam preparation support?",
    a: "Yes. Combos include certification exam attempts (where applicable), digital course materials, and exam preparation support so you’re ready when it’s time to certify.",
  },
];

function savePercent(combo: Combo): number {
  if (combo.originalPrice <= 0) return 0;
  return Math.round((100 * (combo.originalPrice - combo.comboPrice)) / combo.originalPrice);
}

const COURSE_LABELS = new Map(comboFilterCourses().map((course) => [course.slug, course.label]));

function courseLabel(slug: string, name: string): string {
  return COURSE_LABELS.get(slug) ?? shortCourseLabel(name);
}

function shortCourseLabel(name: string): string {
  const paren = name.match(/\(([^)]+)\)\s*$/);
  if (paren) return paren[1];
  if (name.includes("POPM")) return "POPM";
  if (name.includes("GenAI")) return "GenAI";
  return name.replace(/^AI-Empowered\s+/i, "").replace(/^SAFe\s+/i, "").slice(0, 28);
}

const selectClass =
  "w-full rounded-lg border border-[#1f2c4a]/15 bg-white px-3 py-2.5 text-sm text-[#1f2c4a] outline-none focus-visible:border-[#1f2c4a]/40 focus-visible:ring-2 focus-visible:ring-[#1f2c4a]/20 disabled:cursor-not-allowed disabled:bg-[#1f2c4a]/[0.03] disabled:text-[#94a3b8]";

function ComboHero() {
  return (
    <section className="w-full bg-black text-[#1f2c4a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-20">
        <nav className="mb-6 flex items-center gap-2 text-sm text-[#64748b]">
          <Link href="/" className="hover:text-[#1f2c4a]">
            Home
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-[#1f2c4a]">
            Courses
          </Link>
          <span>/</span>
          <span className="text-[#334155]">Combo Courses</span>
        </nav>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#d97706]">
            Combo courses
          </p>
          <h1
            className="mb-4 text-3xl font-normal leading-tight text-[#1f2c4a] sm:text-4xl md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Two certifications. One bundle.
          </h1>
          <p className="mb-8 text-base leading-relaxed text-[#475569] sm:text-lg">
            Pair two live courses and pay the published bundle price. Pick any two, or browse by the
            course you already want. You choose the dates for each class.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#combo-catalog"
              className="inline-flex items-center justify-center rounded-lg bg-[#1f2c4a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#16243f]"
            >
              Browse bundles
            </a>
            <Link
              href="/contact"
              className="liquid-glass inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 px-6 py-3 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
            >
              Contact learning advisor
            </Link>
          </div>
        </div>
        <ul className="mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          {[
            { value: "2", label: "Courses in every bundle" },
            { value: "Live", label: "Remote instructor-led" },
            { value: "SAFe®", label: "Silver Partner" },
            { value: "2", label: "Certificates when you pass" },
          ].map((stat) => (
            <li key={stat.label} className="liquid-glass rounded-2xl px-4 py-3">
              <p className="text-xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-[#64748b]">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BuildYourOwn({ courses }: { courses: { slug: string; label: string }[] }) {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const partners = useMemo(() => {
    if (!first) return [];
    const partnerSlugs = new Set(
      COMBO_COURSES.filter((combo) => combo.courses.some((course) => course.slug === first)).flatMap((combo) =>
        combo.courses.map((course) => course.slug),
      ),
    );
    partnerSlugs.delete(first);
    return courses.filter((course) => partnerSlugs.has(course.slug));
  }, [courses, first]);

  const combo = first && second ? findComboByCourseSlugs(first, second) : undefined;
  const pct = combo ? savePercent(combo) : 0;

  function chooseFirst(slug: string) {
    setFirst(slug);
    if (!slug || slug === second) {
      setSecond("");
      return;
    }
    const stillPairs = COMBO_COURSES.some((item) => {
      const slugs = item.courses.map((course) => course.slug);
      return slugs.includes(slug) && slugs.includes(second);
    });
    if (!stillPairs) setSecond("");
  }

  return (
    <div>
      <h2 className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">Build your own</h2>
      <p className="mb-4 text-xs text-[#64748b]">Pick two courses. The price is the published pair.</p>
      <label className="mb-3 block">
        <span className="mb-1.5 block text-xs text-[#64748b]">First course</span>
        <select className={selectClass} value={first} onChange={(event) => chooseFirst(event.target.value)}>
          <option value="">Choose a course</option>
          {courses.map((course) => (
            <option key={course.slug} value={course.slug}>
              {course.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-[#64748b]">Second course</span>
        <select
          className={selectClass}
          value={second}
          disabled={!first}
          onChange={(event) => setSecond(event.target.value)}
        >
          <option value="">{first ? "Choose a second course" : "Choose the first course"}</option>
          {partners.map((course) => (
            <option key={course.slug} value={course.slug}>
              {course.label}
            </option>
          ))}
        </select>
      </label>
      {combo ? (
        <div className="mt-4 border-t border-[#1f2c4a]/10 pt-4">
          <p className="text-sm font-medium text-[#1f2c4a]">{combo.name}</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-lg font-semibold text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>
              ${combo.comboPrice.toLocaleString()}
            </span>
            <span className="text-sm text-[#94a3b8] line-through">${combo.originalPrice.toLocaleString()}</span>
            {pct > 0 ? (
              <span className="text-xs font-semibold text-[#d97706]">Save {pct}%</span>
            ) : null}
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {combo.courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="liquid-glass inline-flex w-full items-center justify-center rounded-lg border border-[#1f2c4a]/20 px-4 py-2.5 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
              >
                View {courseLabel(course.slug, course.name)}
              </Link>
            ))}
            <Link
              href={`/combo-courses/schedule?combo=${combo.id}`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#1f2c4a] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#16243f]"
            >
              View schedule
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ComboCard({ combo }: { combo: Combo }) {
  const pct = savePercent(combo);
  const labels = combo.courses.map((course) => shortCourseLabel(course.name));

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl liquid-glass transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          {combo.courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06]"
              aria-label={`View ${course.name}`}
            >
              <Image src={course.badge} alt="" width={56} height={56} className="h-full w-full object-cover" />
            </Link>
          ))}
          <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
            {labels.join(" + ")}
          </span>
        </div>

        <h3
          className="text-base font-normal leading-snug text-[#1f2c4a] sm:text-lg"
          style={{ letterSpacing: "-0.03em" }}
        >
          {combo.name}
        </h3>

        <div className="mb-5 mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#64748b]">
          <span className="font-medium text-[#475569]">Two live courses</span>
          <span aria-hidden>·</span>
          <span className="font-bold text-[#1f2c4a]">${combo.comboPrice.toLocaleString()}</span>
          <span className="text-[#94a3b8] line-through">${combo.originalPrice.toLocaleString()}</span>
          {pct > 0 ? <span className="font-semibold text-[#d97706]">Save {pct}%</span> : null}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            {combo.courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="liquid-glass inline-flex flex-1 items-center justify-center rounded-lg border border-[#1f2c4a]/20 px-4 py-2.5 text-center text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
              >
                View {courseLabel(course.slug, course.name)}
              </Link>
            ))}
          </div>
          <Link
            href={`/combo-courses/schedule?combo=${combo.id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#1f2c4a] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#16243f]"
          >
            View schedule
          </Link>
        </div>
      </div>
    </article>
  );
}

function ComboCatalog() {
  const courses = useMemo(() => comboFilterCourses(), []);
  const [courseSlug, setCourseSlug] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      COMBO_COURSES.filter(
        (combo) => !courseSlug || combo.courses.some((course) => course.slug === courseSlug),
      ),
    [courseSlug],
  );

  const selectedCourse = courses.find((course) => course.slug === courseSlug);

  return (
    <div id="combo-catalog" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-72">
            <div className="liquid-glass self-start rounded-2xl border border-[#1f2c4a]/10 p-5 lg:sticky lg:top-24">
              <BuildYourOwn courses={courses} />
              <div className="mt-6 border-t border-[#1f2c4a]/10 pt-6">
                <h2 className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">Includes</h2>
                <p className="mb-4 text-xs text-[#64748b]">Show bundles with this course</p>
                <ul className="max-h-[28rem] space-y-1 overflow-y-auto">
                  <li>
                    <button
                      type="button"
                      aria-pressed={courseSlug === null}
                      onClick={() => setCourseSlug(null)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                        courseSlug === null
                          ? "bg-[#1f2c4a] text-white"
                          : "text-[#475569] hover:bg-[#1f2c4a]/[0.06] hover:text-[#1f2c4a]"
                      }`}
                    >
                      Any course
                    </button>
                  </li>
                  {courses.map((course) => {
                    const active = courseSlug === course.slug;
                    const count = COMBO_COURSES.filter((combo) =>
                      combo.courses.some((item) => item.slug === course.slug),
                    ).length;
                    return (
                      <li key={course.slug}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCourseSlug(course.slug)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                            active
                              ? "bg-[#1f2c4a] text-white"
                              : "text-[#475569] hover:bg-[#1f2c4a]/[0.06] hover:text-[#1f2c4a]"
                          }`}
                        >
                          <span>{course.label}</span>
                          <span className={`text-xs tabular-nums ${active ? "text-white/70" : "text-[#94a3b8]"}`}>
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-normal text-[#1f2c4a] md:text-2xl" style={{ letterSpacing: "-0.03em" }}>
                {selectedCourse ? `Bundles with ${selectedCourse.label}` : "All bundles"}
                <span className="ml-2 text-[#94a3b8]">({visible.length})</span>
              </h2>
              <p className="mt-1 text-sm text-[#64748b]">
                Live remote classes. Open a bundle to pick dates for each course.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {visible.map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComboFaqs() {
  return (
    <section className="w-full bg-black px-4 py-8 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">Questions</p>
        <h2
          className="mb-8 text-center text-2xl font-normal text-[#1f2c4a] md:text-3xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          FAQs
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] transition-colors hover:bg-[#1f2c4a]/[0.1]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-medium text-[#1f2c4a]">
                <span>{faq.q}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-[#94a3b8] transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm leading-relaxed text-[#64748b]">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ComboCoursesPage() {
  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <ComboHero />
      <ComboCatalog />
      <ComboFaqs />
    </main>
  );
}
