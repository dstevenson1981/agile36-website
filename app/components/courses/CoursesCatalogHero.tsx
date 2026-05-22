import Link from "next/link";

export default function CoursesCatalogHero() {
  return (
    <section className="w-full bg-gradient-to-br from-[#01203d] via-[#023a6b] to-[#01203d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#7eb8ff] mb-3">
            Our certification courses
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Build skills with experts in SAFe, Agile &amp; AI
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed mb-8">
            Pick a course from our catalog, train with certified instructors, and
            earn credentials that move your career forward. Live remote classes with
            exam prep included on select SAFe certifications.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[#fa4a23] hover:bg-[#e03d1a] px-6 py-3 text-sm font-bold text-white transition-colors"
            >
              Contact learning advisor
            </Link>
            <Link
              href="/corporate"
              className="inline-flex items-center justify-center rounded-md border border-white/40 hover:border-white px-6 py-3 text-sm font-semibold text-white transition-colors"
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
              className="rounded-lg bg-white/10 border border-white/15 px-4 py-3"
            >
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-blue-100/80 mt-0.5">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
