import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DEFAULT_OG_IMAGES } from "@/app/lib/og-defaults";
export const metadata: Metadata = {
  title: "SAFe® Certification Training (2026) | All SAFe Courses | Agile36",
  description:
    "2026 SAFe certification catalog from Agile36: AI-Empowered Leading SAFe, LPM, POPM, Scrum Master, APM, DevOps, RTE, and more. SAFe Silver Partner, SPC instructors, exam included.",
  alternates: {
    canonical: "https://www.agile36.com/safe-certifications",
  },
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: "SAFe® Certification Training (2026) | Agile36",
    description:
      "2026 SAFe certification courses — expert-led live training, exam included, SAFe Silver Partner.",
    url: "https://www.agile36.com/safe-certifications",
    type: "website",
  },
};

const COURSES = [
  {
    name: "AI-Empowered Leading SAFe (SA)",
    url: "/courses/leading-safe",
    level: "Foundation",
    description: "The foundational SAFe certification for leaders driving Lean-Agile transformation",
    duration: "2 days",
    pdus: "16",
    badge: "/Leading SAFe.png",
  },
  {
    name: "AI-Empowered SAFe Scrum Master (SSM)",
    url: "/courses/scrum-master",
    level: "Team Level",
    description: "Facilitate Agile teams and support Agile Release Train ceremonies",
    duration: "2 days",
    pdus: "16",
    badge: "/SSM.jpeg",
  },
  {
    name: "AI-Empowered SAFe POPM",
    url: "/courses/product-owner-manager",
    level: "Team/Program",
    description: "Manage backlogs and define product vision at team and program level",
    duration: "2 days",
    pdus: "16",
    badge: "/POPM.jpg",
  },
  {
    name: "SAFe LPM",
    url: "/courses/lean-portfolio-management",
    level: "Portfolio Level",
    description: "Connect strategy to execution with Lean budgeting and portfolio Kanban",
    duration: "2 days",
    pdus: "16",
    badge: "/Lean Portfolio.png",
  },
  {
    name: "SAFe APM",
    url: "/courses/agile-product-management",
    level: "Advanced",
    description: "Advanced product strategy, design thinking, and continuous exploration",
    duration: "3 days",
    pdus: "24",
    badge: "/AgileProductManagment.png",
  },
  {
    name: "SAFe for Architects (ARCH)",
    url: "/courses/safe-for-architects",
    level: "Advanced",
    description: "Agile architecture, architectural runway, and Solution Intent across ARTs",
    duration: "3 days",
    pdus: "24",
    badge: "/ARCH.png",
  },
  {
    name: "AI-Empowered SAFe Advanced Scrum Master (SASM)",
    url: "/courses/advanced-scrum-master",
    level: "Advanced",
    description: "Program-level coaching and the path to Release Train Engineer",
    duration: "2 days",
    pdus: "16",
    badge: "/AdvancedSM.png",
  },
  {
    name: "SAFe DevOps (SDP)",
    url: "/courses/devops",
    level: "Specialist",
    description: "Build continuous delivery pipelines and achieve release on demand",
    duration: "2 days",
    pdus: "16",
    badge: "/Devops.png",
  },
  {
    name: "AI-Empowered SAFe for Teams (SP)",
    url: "/courses/safe-for-teams",
    level: "Team Level",
    description: "Foundation certification for all Agile team members on an ART",
    duration: "2 days",
    pdus: "16",
    badge: "/SAFe for Teams.png",
  },
  {
    name: "AI-Empowered Release Train Engineer (RTE)",
    url: "/courses/release-train-engineer",
    level: "Advanced",
    description: "Private cohort — facilitate and coach the ART at program level with responsible AI practices for PI readiness and alignment",
    duration: "2 days",
    pdus: "16",
    badge: "/RTE.png",
  },
  {
    name: "Value Stream Mapping",
    url: "/courses/value-stream-mapping",
    level: "Specialist",
    description: "Identify waste and optimize flow across your enterprise value streams",
    duration: "1 day",
    pdus: "8",
    badge: "/MicroCredential.jpeg",
  },
];

const COMPARISON_TABLE = [
  { cert: "AI-Empowered Leading SAFe", bestFor: "Managers, Directors, Executives", level: "Foundation", duration: "2 days" },
  { cert: "AI-Empowered SAFe Scrum Master", bestFor: "Scrum Masters, Team Leads", level: "Team", duration: "2 days" },
  { cert: "AI-Empowered SAFe POPM", bestFor: "Product Owners, Product Managers", level: "Team/Program", duration: "2 days" },
  { cert: "SAFe LPM", bestFor: "PMO Directors, Portfolio Managers, Executives", level: "Portfolio", duration: "2 days" },
  { cert: "SAFe APM", bestFor: "Senior Product Managers, Heads of Product", level: "Advanced", duration: "3 days" },
  { cert: "SAFe for Architects", bestFor: "System, Solution, and Enterprise Architects", level: "Advanced", duration: "3 days" },
  { cert: "AI-Empowered SAFe SASM", bestFor: "Senior Scrum Masters, Agile Coaches", level: "Advanced", duration: "2 days" },
  { cert: "SAFe DevOps", bestFor: "Dev/Ops Engineers, Release Managers", level: "Specialist", duration: "2 days" },
  { cert: "AI-Empowered SAFe for Teams", bestFor: "All ART team members", level: "Foundation", duration: "2 days" },
  { cert: "AI-Empowered RTE", bestFor: "ARTs, Senior Agile Coaches (private cohort)", level: "Advanced", duration: "2–3 days" },
];

const FAQS = [
  {
    q: "What is SAFe certification?",
    a: "SAFe (Scaled Agile Framework) certification validates your ability to apply Lean-Agile principles at enterprise scale. Certifications are role-based — there are certifications for team members, Scrum Masters, Product Owners, portfolio managers, executives, and more. All SAFe certifications are issued by Scaled Agile, Inc. and are recognized globally.",
  },
  {
    q: "Which SAFe certification should I get first?",
    a: "AI-Empowered Leading SAFe (SAFe Agilist) is the most common starting point — it provides a broad foundation across all of SAFe. If you're in a specific role, start with the role-based cert: AI-Empowered POPM for product professionals, AI-Empowered SSM for Scrum Masters, LPM for portfolio/PMO leaders. Contact Agile36 if you're unsure which path fits your goals.",
  },
  {
    q: "How long does SAFe certification last?",
    a: "All SAFe certifications are valid for one year from the date you pass the exam. Annual renewal requires completing Continuing Education Units (CEUs) and paying a renewal fee to Scaled Agile.",
  },
  {
    q: "Is the exam included in Agile36's course fee?",
    a: "Yes. Your first exam attempt is included in every Agile36 SAFe course. The exam must be taken within 30 days of completing the course through the SAFe Community Platform.",
  },
  {
    q: "How hard are SAFe certification exams?",
    a: "SAFe exams are open book and taken online. Passing scores range from 71–80% depending on the certification. Most professionals pass on the first attempt after completing the course. Agile36 provides practice exams and study materials to help you prepare.",
  },
  {
    q: "Does Agile36 offer corporate SAFe training?",
    a: "Yes. Agile36 specializes in enterprise and Fortune 100 training. We offer private group sessions, custom scheduling, and volume pricing for teams. Contact us to discuss your organization's needs.",
  },
  {
    q: "What is a SAFe Silver Partner?",
    a: "SAFe Silver Partner is an accreditation level awarded by Scaled Agile, Inc. to training organizations that meet their standards for instructor quality, course delivery, and customer satisfaction. It confirms that Agile36's training is officially recognized and that our instructors are certified SAFe Program Consultants (SPCs).",
  },
];

const WHY_ITEMS = [
  { title: "SAFe Silver Partner", desc: "Fully accredited by Scaled Agile, Inc. Our instructors are certified SPCs." },
  { title: "Fortune 100 Experience", desc: "Our instructors have led real SAFe transformations — not just taught the framework." },
  { title: "25,000+ Professionals Trained", desc: "Tens of thousands of professionals have earned SAFe certifications through Agile36." },
  { title: "4.9/5.0 Rating", desc: "Based on 2,500+ verified Scaled Agile reviews from professionals who've completed our training." },
  { title: "Exam Included", desc: "First certification exam attempt included in every course fee." },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "SAFe Certification Courses",
  description: "All SAFe certification training courses offered by Agile36",
  url: "https://www.agile36.com/safe-certifications",
  numberOfItems: 10,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AI-Empowered Leading SAFe (SA)", url: "https://www.agile36.com/courses/leading-safe" },
    { "@type": "ListItem", position: 2, name: "AI-Empowered SAFe Scrum Master (SSM)", url: "https://www.agile36.com/courses/scrum-master" },
    { "@type": "ListItem", position: 3, name: "AI-Empowered SAFe POPM", url: "https://www.agile36.com/courses/product-owner-manager" },
    { "@type": "ListItem", position: 4, name: "SAFe LPM", url: "https://www.agile36.com/courses/lean-portfolio-management" },
    { "@type": "ListItem", position: 5, name: "SAFe APM", url: "https://www.agile36.com/courses/agile-product-management" },
    { "@type": "ListItem", position: 6, name: "AI-Empowered SAFe Advanced Scrum Master (SASM)", url: "https://www.agile36.com/courses/advanced-scrum-master" },
    { "@type": "ListItem", position: 7, name: "SAFe DevOps (SDP)", url: "https://www.agile36.com/courses/devops" },
    { "@type": "ListItem", position: 8, name: "AI-Empowered SAFe for Teams (SP)", url: "https://www.agile36.com/courses/safe-for-teams" },
    { "@type": "ListItem", position: 9, name: "AI-Empowered Release Train Engineer (RTE)", url: "https://www.agile36.com/courses/release-train-engineer" },
    { "@type": "ListItem", position: 10, name: "Value Stream Mapping", url: "https://www.agile36.com/courses/value-stream-mapping" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SafeCertificationsPage() {
  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20 border-b border-[#1f2c4a]/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d97706] mb-4">Certification Catalog</p>
          <h1 className="text-4xl md:text-5xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>
            SAFe® Certification Training
          </h1>
          <p className="text-xl text-[#475569] max-w-3xl mb-10">
            All SAFe certifications in one place. Expert-led live training, exam included, delivered by a SAFe Silver Partner with Fortune 100 experience.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="liquid-glass rounded-2xl p-4 md:p-6">
              <p className="text-2xl md:text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>25,000+</p>
              <p className="text-sm text-[#64748b]">Professionals Trained</p>
            </div>
            <div className="liquid-glass rounded-2xl p-4 md:p-6">
              <p className="text-2xl md:text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>SAFe Silver Partner</p>
              <p className="text-sm text-[#64748b]">Accredited</p>
            </div>
            <div className="liquid-glass rounded-2xl p-4 md:p-6">
              <p className="text-2xl md:text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>4.9/5.0</p>
              <p className="text-sm text-[#64748b]">Rating (2,500+ Reviews)</p>
            </div>
            <div className="liquid-glass rounded-2xl p-4 md:p-6">
              <p className="text-2xl md:text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>Exam Included</p>
              <p className="text-sm text-[#64748b]">First attempt included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Paragraph */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#475569] leading-relaxed mb-4">
            The Scaled Agile Framework® (SAFe) is a leading approach for enterprise Agile at scale. Scaled Agile states that thousands of enterprises worldwide use SAFe — see their{" "}
            <a
              href="https://scaledagile.com/what-is-safe/"
              className="text-[#d97706] font-medium underline hover:no-underline"
              rel="noopener noreferrer"
            >
              framework overview
            </a>{" "}
            for current adoption messaging. SAFe certifications validate your ability to apply Lean-Agile principles across teams, programs, and portfolios where that model is in use.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Agile36 is a SAFe Silver Partner offering instructor-led SAFe certification training across all major role-based certifications. Every course includes your first exam attempt, live training with certified SPCs, and post-training support.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal text-[#1f2c4a] mb-10" style={{ letterSpacing: "-0.03em" }}>All SAFe Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <div
                key={course.url}
                className="liquid-glass rounded-2xl p-6 transition-colors hover:bg-[#1f2c4a]/[0.08] flex flex-col"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#1f2c4a]/10 mb-4 flex-shrink-0">
                  <Image
                    src={course.badge}
                    alt={course.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-[#d97706] bg-[#d97706]/10 px-2 py-1 rounded-full inline-block mb-2 w-fit">
                  {course.level}
                </span>
                <h3 className="text-lg font-medium text-[#1f2c4a] mb-2">{course.name}</h3>
                <p className="text-sm text-[#475569] mb-4 flex-1">{course.description}</p>
                <p className="text-xs text-[#64748b] mb-4">
                  {course.duration} | {course.pdus} PDUs | Exam Included
                </p>
                <Link
                  href={course.url}
                  className="inline-flex items-center gap-2 text-[#d97706] font-medium hover:underline"
                >
                  View Course
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal text-[#1f2c4a] mb-10" style={{ letterSpacing: "-0.03em" }}>
            Which SAFe Certification Is Right for You?
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[520px] border-collapse border border-[#1f2c4a]/15 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#1f2c4a]/10 text-[#1f2c4a]">
                  <th className="text-left px-4 py-3 font-semibold">Certification</th>
                  <th className="text-left px-4 py-3 font-semibold">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold">Level</th>
                  <th className="text-left px-4 py-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr
                    key={row.cert}
                    className={i % 2 === 0 ? "bg-[#1f2c4a]/[0.04]" : "bg-transparent"}
                  >
                    <td className="px-4 py-3 border-b border-[#1f2c4a]/10 font-medium text-[#1f2c4a]">{row.cert}</td>
                    <td className="px-4 py-3 border-b border-[#1f2c4a]/10 text-[#475569]">{row.bestFor}</td>
                    <td className="px-4 py-3 border-b border-[#1f2c4a]/10 text-[#475569]">{row.level}</td>
                    <td className="px-4 py-3 border-b border-[#1f2c4a]/10 text-[#475569]">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#64748b] mt-6 max-w-3xl leading-relaxed">
            <strong className="text-[#475569]">Pay research:</strong> Agile36 does not list uncited salary
            ranges by certification. Compare compensation using{" "}
            <a
              href="https://www.bls.gov/oes/"
              className="text-[#d97706] font-medium underline hover:no-underline"
              rel="noopener noreferrer"
            >
              BLS OEWS
            </a>
            , your target employers&apos; postings, and Scaled Agile&apos;s{" "}
            <a
              href="https://scaledagile.com/certification/"
              className="text-[#d97706] font-medium underline hover:no-underline"
              rel="noopener noreferrer"
            >
              certification
            </a>{" "}
            pages for vendor-published outcomes.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-normal text-[#1f2c4a] mb-10" style={{ letterSpacing: "-0.03em" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group liquid-glass rounded-2xl overflow-hidden"
              >
                <summary className="px-4 py-4 cursor-pointer font-medium text-[#1f2c4a] list-none flex items-center justify-between">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-[#64748b] group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-[#475569] text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Why Agile36 */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal text-[#1f2c4a] mb-10 text-center" style={{ letterSpacing: "-0.03em" }}>Why Agile36</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#d97706]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#1f2c4a] mb-2">{item.title}</h3>
                  <p className="text-[#475569]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto liquid-glass rounded-2xl p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>
            Ready to Get SAFe Certified?
          </h2>
          <p className="text-lg text-[#475569] mb-8">
            Browse upcoming course dates and enroll today. Group pricing available for teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-[#1f2c4a] text-white hover:bg-[#16243f] font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              View All Courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/corporate"
              className="border border-[#1f2c4a]/20 text-[#1f2c4a] hover:bg-[#1f2c4a]/10 font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Contact Us for Corporate Training
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
