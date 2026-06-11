import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe DevOps Certification: What It Covers and Who It's For | Agile36",
  description:
    "SAFe DevOps certification explained: what the SDP course covers, who should take it, how it differs from other SAFe certs, and what the exam requires.",
  keywords: ["SAFe DevOps certification", "SDP certification", "SAFe DevOps practitioner", "SAFe DevOps exam", "SAFe DevOps course", "DevOps SAFe training"],
  openGraph: {
    title: "SAFe DevOps Certification: What It Covers and Who It's For",
    description: "What the SAFe DevOps Practitioner certification covers and whether it's right for your role.",
    url: "https://www.agile36.com/blog/safe-devops-certification",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-devops-certification" },
};

function BlogHeroDots() {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
      </div>
    </>
  );
}

function ExecutiveSummary() {
  return (
    <section aria-label="At a glance" className="bg-gray-50 border-l-4 border-[#01203d] p-6 md:p-8 my-10 rounded-r-lg">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#01203d] font-bold mb-4">At a glance</p>
      <ul className="space-y-3 text-gray-800 text-[17px] leading-relaxed">
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The SAFe DevOps Practitioner (SDP) certification is a <strong>2-day course and closed-book exam</strong> focused on the Continuous Delivery Pipeline — the technical practices that enable flow from idea to production in SAFe organizations.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>SDP is designed for <strong>developers, engineers, testers, and Scrum Masters</strong> working in SAFe environments who need to understand CI/CD pipelines, DevOps culture, and how technical practices connect to agile delivery at scale.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The SDP exam is <strong>45 questions, 90 minutes, 73% passing score</strong> — closed book. It covers the four aspects of the Continuous Delivery Pipeline: Continuous Exploration, Continuous Integration, Continuous Deployment, and Release on Demand.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>SDP doesn&apos;t require any formal prerequisites, but <strong>hands-on technical experience</strong> in software development or testing makes the content far more applicable. The course is not an introduction to DevOps concepts — it assumes you already work in technical delivery.</span></li>
      </ul>
    </section>
  );
}

function PipelineStages() {
  const stages = [
    { stage: "Continuous Exploration", pct: 90, desc: "Hypothesis-driven development, customer-centric design, architecture runway" },
    { stage: "Continuous Integration", pct: 85, desc: "Trunk-based development, automated testing, build automation, fast feedback" },
    { stage: "Continuous Deployment", pct: 82, desc: "Deployment pipelines, environment management, release staging, feature toggles" },
    { stage: "Release on Demand", pct: 78, desc: "Decoupling deployment from release, market rhythm, operational visibility" },
  ];
  return (
    <section aria-label="CDP stages" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">The Continuous Delivery Pipeline: SDP Exam Coverage</h3>
      <div className="space-y-4">
        {stages.map((s) => (
          <div key={s.stage} className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-[#01203d]">{s.stage}</span>
              <span className="text-xs font-semibold text-gray-500">{s.pct}% exam weight</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-[#01203d] h-2 rounded-full" style={{ width: `${s.pct}%` }} />
            </div>
            <p className="text-xs text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution: string }) {
  return (
    <blockquote className="border-l-4 border-yellow-400 pl-6 md:pl-8 my-12">
      <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug italic">{children}</p>
      <footer className="text-sm text-gray-600 mt-3 not-italic">— {attribution}</footer>
    </blockquote>
  );
}

function KeyTakeaways() {
  return (
    <section aria-label="Key takeaways" className="bg-[#01203d] text-white rounded-xl p-8 md:p-10 my-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold mb-6">Key takeaways</p>
      <ol className="space-y-5">
        {[
          "SDP fills a specific gap in the SAFe certification portfolio — it covers the technical practices that team-level SAFe certifications like SSM and POPM don't go deep on. If you're a developer or tester in a SAFe environment, SDP is the most role-relevant certification available.",
          "The Continuous Delivery Pipeline is the organizing framework for the SDP course. Everything in the course connects to one of the four pipeline aspects. Candidates who understand this structure navigate the exam more effectively than those who try to memorize individual practices.",
          "Release on Demand — the fourth pipeline stage — is often where SAFe organizations struggle most. SDP develops the understanding that deployment and release are separate concerns, which is the foundation of dark launches, canary releases, and feature flagging practices.",
          "SDP is one of the few SAFe certifications that applies directly to non-Scrum technical roles. Database engineers, site reliability engineers, and QA architects all find SDP more role-relevant than the SSM or POPM certifications.",
          "The one-year renewal requirement applies to SDP — like all SAFe certifications. Renewal costs $100 and requires 20 PDUs or CPEs of ongoing education. Given how quickly DevOps tooling evolves, the annual renewal incentive aligns well with the nature of the content.",
        ].map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="text-yellow-400 font-bold text-lg min-w-[28px]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[17px] leading-relaxed text-gray-100">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function SafeDevopsCertificationPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe DevOps Certification: What It Covers and Who It&apos;s For
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe DevOps Certification</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Certification Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe DevOps Certification: What It Covers and Who It&apos;s For
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe DevOps Practitioner (SDP) is the technical certification in the SAFe portfolio — the one designed for developers, engineers, and testers rather than coaches and managers. While certifications like Leading SAFe and SSM focus on organizational practices and team ceremonies, the{" "}
            <Link href="/courses/safe-devops" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe DevOps course</Link>{" "}
            focuses on the Continuous Delivery Pipeline: the technical infrastructure, practices, and culture required to deploy software to production continuously and safely.
          </p>

          <ExecutiveSummary />

          <PipelineStages />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What SDP Covers That Other SAFe Certs Don&apos;t</h2>
          <p className="text-lg text-gray-700 mb-4">
            Most SAFe certifications focus on the organizational and process practices of agile at scale. SDP is different — it covers the technical practices that enable those organizational changes to actually deliver fast, reliable software. Without the technical foundation SDP teaches, SAFe PI Planning and ART ceremonies produce coordination without acceleration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-3">SDP covers</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• CI/CD pipeline design and automation</li>
                <li>• Test automation strategy and pyramid</li>
                <li>• Infrastructure as code concepts</li>
                <li>• Feature flagging and dark launches</li>
                <li>• DevOps culture and CALMS model</li>
                <li>• Deployment vs. release decoupling</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h4 className="text-gray-700 font-bold mb-3">Not in SDP scope</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• SAFe PI Planning facilitation</li>
                <li>• Portfolio management and Lean Budgets</li>
                <li>• ART organization and launch</li>
                <li>• Leadership and coaching practices</li>
                <li>• Scrum ceremonies and facilitation</li>
              </ul>
            </div>
          </div>

          <PullQuote attribution="Senior engineer, enterprise retail platform">
            I had my SSM and found PI Planning and ART ceremonies useful context, but neither certification touched what I actually do — CI/CD pipelines, deployment automation, test strategy. SDP was the first SAFe certification that covered my actual work. The Continuous Delivery Pipeline framework gave me a vocabulary for conversations with our RTE about what was actually slowing down our deployments.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is SDP the same as a general DevOps certification?</p>
              <p className="text-lg text-gray-700">No — SDP is specifically about DevOps practices within the SAFe framework. It uses the SAFe Continuous Delivery Pipeline model rather than general industry frameworks like DORA or ITIL. If you work in a SAFe environment, SDP is more relevant. If you work in a non-SAFe context, a general DevOps certification (AWS DevOps, CKA, DORA) may be more applicable.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need technical experience to pass SDP?</p>
              <p className="text-lg text-gray-700">The exam tests framework knowledge, not hands-on tooling skill. You don't need to configure a Jenkins pipeline to pass SDP. However, practitioners without any technical delivery background often find the content abstract. SDP resonates most with people who have encountered CI/CD, automated testing, or deployment challenges in real work.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does SDP relate to the SSM certification?</p>
              <p className="text-lg text-gray-700">SSM and SDP are complementary. SSM develops team-level facilitation and ceremony skills; SDP develops the technical pipeline understanding. Scrum Masters in engineering organizations often benefit from both — SSM for their coaching work and SDP to communicate credibly about the technical practices their teams need to improve flow.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What jobs benefit most from SDP certification?</p>
              <p className="text-lg text-gray-700">Software engineers and developers working in SAFe environments, QA engineers moving into test automation, DevOps engineers on ART teams, and technical Scrum Masters working in engineering organizations. SDP is most relevant when your day-to-day work involves the delivery pipeline rather than organizational practices.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is SDP worth it if my organization doesn&apos;t use SAFe?</p>
              <p className="text-lg text-gray-700">Less so — SDP's framework content is most valuable in organizations using SAFe's Continuous Delivery Pipeline model. The underlying DevOps practices (CI/CD, test automation, feature flagging) are universal, but a vendor-neutral DevOps certification may be a better fit if you work outside SAFe environments.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get SAFe DevOps Certified</p>
            <p className="mb-5">The SDP course covers the Continuous Delivery Pipeline — the technical foundation that makes agile delivery at scale actually work.</p>
            <Link href="/courses/safe-devops" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SAFe DevOps course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-devops-explained" className="text-[#01203d] underline hover:no-underline">SAFe DevOps explained</Link>
            {" · "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">Agile Release Train explained</Link>
            {" · "}
            <Link href="/blog/agile-metrics-guide" className="text-[#01203d] underline hover:no-underline">Agile metrics guide</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
