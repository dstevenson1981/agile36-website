import Link from "next/link";
import { redirect } from "next/navigation";
import { getAccountMaterials } from "@/app/lib/course-materials";

export const metadata = {
  title: "Course Materials | Agile36",
  description: "Download coursebooks and materials for your enrolled Agile36 courses.",
  robots: "noindex, nofollow",
};

export default async function AccountMaterialsPage() {
  const materials = await getAccountMaterials();
  if (materials.length === 0) {
    redirect("/account");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-semibold tracking-tight text-[#1f2c4a]"
          style={{ letterSpacing: "-0.03em" }}
        >
          Course Materials
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
          Digital coursebooks for courses on your account. Open in the browser or
          download to keep offline.
        </p>
      </div>

      <div className="space-y-4">
        {materials.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-[#1f2c4a]/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
                {item.courseName}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-[#1f2c4a]">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-[#64748b]">{item.description}</p>
            </div>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#16243f]"
            >
              Open PDF
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>

      <Link
        href="/account"
        className="inline-block text-sm font-medium text-[#64748b] hover:text-[#1f2c4a]"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
