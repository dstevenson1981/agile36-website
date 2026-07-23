import Image from "next/image";
import Link from "next/link";
import {
  CatalogCourse,
  formatCatalogLiveDate,
  getCatalogCourseAcronym,
  getCatalogCourseImage,
  getCatalogCourseSlug,
  getCatalogCourseUrl,
  getCatalogScheduleUrl,
} from "@/app/lib/course-catalog";

type CourseCatalogCardProps = {
  course: CatalogCourse;
  nextStartDate?: string | null;
};

function StarRating() {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-800">
      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      4.9
    </span>
  );
}

export default function CourseCatalogCard({
  course,
  nextStartDate,
}: CourseCatalogCardProps) {
  const courseUrl = getCatalogCourseUrl(course);
  const scheduleUrl = getCatalogScheduleUrl(course);
  const acronym = getCatalogCourseAcronym(course.title);
  const liveLabel = course.privateClass
    ? "Private class"
    : nextStartDate
      ? `Starts ${formatCatalogLiveDate(nextStartDate)}`
      : "Live remote class — view schedule";

  const badge = course.advanced
    ? { label: "Advanced", className: "bg-purple-100 text-purple-800" }
    : course.trending
      ? { label: "Trending", className: "bg-emerald-100 text-emerald-800" }
      : course.popular
        ? { label: "Popular", className: "bg-sky-100 text-sky-800" }
        : null;

  const priceLabel =
    course.privateClass || course.price <= 0
      ? "Contact for pricing"
      : `From $${course.price}`;

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
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
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#01203d] bg-[#e8f4fc] px-2.5 py-1 rounded-full ml-auto sm:ml-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden />
            Live classes · {liveLabel}
          </span>
        </div>

        <div className="flex gap-4 mb-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 flex items-center justify-center">
            <Image
              src={getCatalogCourseImage(course)}
              alt=""
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              {acronym}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mt-0.5">
              <Link href={courseUrl} className="hover:text-[#fa4a23] transition-colors">
                {course.title}
              </Link>
            </h2>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          <span className="font-medium text-gray-800">Skills you&apos;ll gain: </span>
          {course.skills}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-5">
          <span className="font-medium text-gray-700">{course.days} course</span>
          <span aria-hidden>·</span>
          <span>{course.hours}</span>
          <span aria-hidden>·</span>
          <span>{course.enrolled.replace(" Enrolled", " learners")}</span>
          <span aria-hidden>·</span>
          <span className="text-[#01203d] font-semibold">{priceLabel}</span>
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          <Link
            href={courseUrl}
            className="flex-1 inline-flex items-center justify-center rounded-md border-2 border-[#01203d] text-[#01203d] hover:bg-[#01203d] hover:text-white px-4 py-2.5 text-sm font-semibold transition-colors text-center"
          >
            View course
          </Link>
          {course.privateClass ? (
            <Link
              href={`/contact?course=${getCatalogCourseSlug(course)}`}
              className="flex-1 inline-flex items-center justify-center rounded-md bg-[#fa4a23] hover:bg-[#e03d1a] text-white px-4 py-2.5 text-sm font-semibold transition-colors text-center"
            >
              Contact us
            </Link>
          ) : (
            <Link
              href={scheduleUrl}
              className="flex-1 inline-flex items-center justify-center rounded-md bg-[#fa4a23] hover:bg-[#e03d1a] text-white px-4 py-2.5 text-sm font-semibold transition-colors text-center"
            >
              View schedule
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
