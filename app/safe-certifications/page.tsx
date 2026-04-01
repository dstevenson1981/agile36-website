import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SAFe® Certification Training Courses | All SAFe Certifications | Agile36",
  description:
    "Browse all SAFe certification training courses from Agile36. AI-Empowered Leading SAFe, LPM, POPM, Scrum Master, APM, DevOps and more. SAFe Silver Partner. Expert SPCs. Exam included.",
  alternates: {
    canonical: "https://www.agile36.com/safe-certifications",
  },
  openGraph: {
    title: "SAFe® Certification Training Courses | Agile36",
    description:
      "Browse all SAFe certification courses. Expert-led live training. Exam included. SAFe Silver Partner.",
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
    name: "SAFe Scrum Master Advanced (SASM)",
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
    name: "Release Train Engineer (RTE)",
    url: "/courses/release-train-engineer",
    level: "Advanced",
    description: "Facilitate and coach the Agile Release Train at program level",
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
  { cert: "AI-Empowered Leading SAFe", bestFor: "Managers, Directors, Executives", level: "Foundation", duration: "2 days", salary: "$105K–$158K" },
  { cert: "AI-Empowered SAFe Scrum Master", bestFor: "Scrum Masters, Team Leads", level: "Team", duration: "2 days", salary: "$95K–$130K" },
  { cert: "AI-Empowered SAFe POPM", bestFor: "Product Owners, Product Managers", level: "Team/Program", duration: "2 days", salary: "$100K–$141K" },
  { cert: "SAFe LPM", bestFor: "PMO Directors, Portfolio Managers, Executives", level: "Portfolio", duration: "2 days", salary: "$120K–$160K" },
  { cert: "SAFe APM", bestFor: "Senior Product Managers, Heads of Product", level: "Advanced", duration: "3 days", salary: "$115K–$150K" },
  { cert: "SAFe SASM", bestFor: "Senior Scrum Masters, Agile Coaches", level: "Advanced", duration: "2 days", salary: "$110K–$145K" },
  { cert: "SAFe DevOps", bestFor: "Dev/Ops Engineers, Release Managers", level: "Specialist", duration: "2 days", salary: "$110K–$148K" },
  { cert: "AI-Empowered SAFe for Teams", bestFor: "All ART team members", level: "Foundation", duration: "2 days", salary: "—" },
  { cert: "RTE", bestFor: "ARTs, Senior Agile Coaches", level: "Advanced", duration: "2 days", salary: "$130K–$170K" },
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
  { title: "4.9/5.0 Rating", desc: "Based on 2,500+ verified reviews from SAFe-certified professionals." },
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
    { "@type": "ListItem", position: 6, name: "SAFe Advanced Scrum Master (SASM)", url: "https://www.agile36.com/courses/advanced-scrum-master" },
    { "@type": "ListItem", position: 7, name: "SAFe DevOps (SDP)", url: "https://www.agile36.com/courses/devops" },
    { "@type": "ListItem", position: 8, name: "AI-Empowered SAFe for Teams (SP)", url: "https://www.agile36.com/courses/safe-for-teams" },
    { "@type": "ListItem", position: 9, name: "Release Train Engineer (RTE)", url: "https://www.agile36.com/courses/release-train-engineer" },
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
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="w-full bg-[#f0f9ff] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SAFe® Certification Training
          </h1>
          <p className="text-xl text-[#4f6882] max-w-3xl mb-10">
            All SAFe certifications in one place. Expert-led live training, exam included, delivered by a SAFe Silver Partner with Fortune 100 experience.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <p className="text-2xl md:text-3xl font-bold text-[#01203d]">25,000+</p>
              <p className="text-sm text-gray-600">Professionals Trained</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <p className="text-2xl md:text-3xl font-bold text-[#01203d]">SAFe Silver Partner</p>
              <p className="text-sm text-gray-600">Accredited</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <p className="text-2xl md:text-3xl font-bold text-[#01203d]">4.9/5.0</p>
              <p className="text-sm text-gray-600">Rating (2,500+ Reviews)</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <p className="text-2xl md:text-3xl font-bold text-[#01203d]">Exam Included</p>
              <p className="text-sm text-gray-600">First attempt included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Paragraph */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-4">
            The Scaled Agile Framework® (SAFe) is the world&apos;s leading framework for enterprise Agile at scale, used by over 70% of Fortune 100 companies. SAFe certifications validate your ability to apply Lean-Agile principles across teams, programs, and portfolios — and they&apos;re among the most in-demand credentials in the Agile job market.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Agile36 is a SAFe Silver Partner offering instructor-led SAFe certification training across all major role-based certifications. Every course includes your first exam attempt, live training with certified SPCs, and post-training support.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="w-full bg-[#f0f9ff] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#01203d] mb-10">All SAFe Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <div
                key={course.url}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 mb-4 flex-shrink-0">
                  <Image
                    src={course.badge}
                    alt={course.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-[#134263] bg-[#edf5f0] px-2 py-1 rounded-full inline-block mb-2 w-fit">
                  {course.level}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{course.description}</p>
                <p className="text-xs text-gray-500 mb-4">
                  {course.duration} | {course.pdus} PDUs | Exam Included
                </p>
                <Link
                  href={course.url}
                  className="inline-flex items-center gap-2 text-[#fa4a23] font-semibold hover:underline"
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
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#01203d] mb-10">
            Which SAFe Certification Is Right for You?
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[640px] border-collapse border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#01203d] text-white">
                  <th className="text-left px-4 py-3 font-semibold">Certification</th>
                  <th className="text-left px-4 py-3 font-semibold">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold">Level</th>
                  <th className="text-left px-4 py-3 font-semibold">Duration</th>
                  <th className="text-left px-4 py-3 font-semibold">Salary Range</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr
                    key={row.cert}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-3 border-b border-gray-200 font-medium">{row.cert}</td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700">{row.bestFor}</td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700">{row.level}</td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700">{row.duration}</td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700">{row.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#01203d] mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <summary className="px-4 py-4 cursor-pointer font-semibold text-gray-900 list-none flex items-center justify-between">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Why Agile36 */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#01203d] mb-10 text-center">Why Agile36</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#01203d] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get SAFe Certified?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Browse upcoming course dates and enroll today. Group pricing available for teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center gap-2"
            >
              View All Courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/corporate"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#01203d] font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Contact Us for Corporate Training
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
