import type { Metadata } from "next";
import Image from "next/image";

import { DEFAULT_OG_IMAGES } from "@/app/lib/og-defaults";
export const metadata: Metadata = {
  title: "About Agile36 (2026) | SAFe Silver Partner & Enterprise Training",
  description:
    "2026: Meet Agile36 — a SAFe Silver Partner delivering live virtual SAFe, Agile, and AI product training with SPC-led instructors and enterprise-scale experience.",
  alternates: { canonical: "https://www.agile36.com/about" },
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: "About Agile36 (2026) | Agile36",
    description:
      "Who we are: SAFe Silver Partner training firm focused on certification quality and real program delivery.",
    url: "https://www.agile36.com/about",
    siteName: "Agile36",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-[#1f2c4a]">
      {/* Hero Section */}
      <div className="border-b border-[#1f2c4a]/10 px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
            Who We Are
          </p>
          <h1
            className="mb-6 text-5xl font-normal leading-[1.05] text-[#1f2c4a] md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            About Agile36
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-[#475569] md:text-xl">
            A transformation and technology enablement firm dedicated to helping organizations accelerate performance,
            modernize operations, and build the capabilities required to compete in the digital era.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Who We Are */}
        <section className="mb-24">
          <p className="mb-6 text-lg leading-relaxed text-[#475569]">
            Agile36 is a transformation and technology enablement firm dedicated to helping organizations accelerate
            performance, modernize operations, and build the capabilities required to compete in the digital era.
            We bring deep expertise across Agile, AI, and enterprise delivery, combining proven frameworks with next
            generation innovation to help leaders achieve measurable outcomes.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-[#475569]">
            For more than a decade, Agile36 has partnered with Fortune 100 and Fortune 500 companies, government agencies,
            and universities to guide large-scale change. Our work spans strategic consulting, enterprise Agile transformation,
            AI adoption, workforce enablement, and performance improvement across complex business environments.
          </p>
          <p className="text-lg leading-relaxed text-[#475569]">
            We equip leaders and teams with the skills, systems, and strategies needed to unlock sustainable value.
            Our approach blends pragmatic execution with forward-looking innovation, enabling clients to evolve with
            speed, clarity, and confidence.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
            Our Practice
          </p>
          <h2
            className="mb-10 text-4xl font-normal text-[#1f2c4a] md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            What We Do
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Enterprise Agile Transformation */}
            <div className="rounded-2xl liquid-glass p-8 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06]">
                <svg className="h-6 w-6 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.02em" }}>
                Enterprise Agile Transformation
              </h3>
              <p className="text-sm leading-relaxed text-[#64748b]">
                We help organizations adopt Agile at scale to improve alignment, accelerate delivery, and increase
                responsiveness. Our team supports enterprise-level transformations, organizational design, change
                enablement, and leadership coaching.
              </p>
            </div>

            {/* SAFe Training and Certification */}
            <div className="rounded-2xl liquid-glass p-8 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06]">
                <svg className="h-6 w-6 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.02em" }}>
                SAFe Training and Certification
              </h3>
              <p className="text-sm leading-relaxed text-[#64748b]">
                As a Scaled Agile Silver Partner, we deliver accredited SAFe courses led by industry-recognized experts.
                Our programs provide hands-on, practical learning that empowers teams to adopt new ways of working and
                drive measurable results.
              </p>
            </div>

            {/* AI and Digital Enablement */}
            <div className="rounded-2xl liquid-glass p-8 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06]">
                <svg className="h-6 w-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.02em" }}>
                AI and Digital Enablement
              </h3>
              <p className="text-sm leading-relaxed text-[#64748b]">
                We help executives and teams understand, adopt, and integrate AI into their strategic and operational
                workflows. Our solutions include AI strategy development, AI product advisory, and the design of agentic
                systems that enhance decision-making and automate critical processes.
              </p>
            </div>

            {/* Leadership and Workforce Development */}
            <div className="rounded-2xl liquid-glass p-8 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06]">
                <svg className="h-6 w-6 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.02em" }}>
                Leadership and Workforce Development
              </h3>
              <p className="text-sm leading-relaxed text-[#64748b]">
                We provide modern training programs that strengthen leadership capability, elevate collaboration, and
                build high-performing teams. Our curriculum spans product management, Agile leadership, AI literacy,
                and executive-level enablement.
              </p>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="mb-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
            Our Approach
          </p>
          <h2
            className="mb-10 text-4xl font-normal text-[#1f2c4a] md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            How We Work
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start rounded-2xl liquid-glass p-7 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="mr-4 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#1f2c4a]/20 bg-[#1f2c4a]/[0.06]">
                <span className="text-sm font-medium text-[#d97706]">✓</span>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-[#1f2c4a]">Outcome-Driven</h3>
                <p className="text-sm leading-relaxed text-[#64748b]">
                  Every engagement begins with clear business objectives, measurable ROI, and a structured approach
                  to tracking value.
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-2xl liquid-glass p-7 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="mr-4 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#1f2c4a]/20 bg-[#1f2c4a]/[0.06]">
                <span className="text-sm font-medium text-[#d97706]">✓</span>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-[#1f2c4a]">Enterprise-Grade Discipline</h3>
                <p className="text-sm leading-relaxed text-[#64748b]">
                  We bring the rigor, structure, and leadership expected from top consulting firms, paired with the
                  flexibility required for modern transformation.
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-2xl liquid-glass p-7 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="mr-4 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#1f2c4a]/20 bg-[#1f2c4a]/[0.06]">
                <span className="text-sm font-medium text-[#d97706]">✓</span>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-[#1f2c4a]">People-Focused</h3>
                <p className="text-sm leading-relaxed text-[#64748b]">
                  We prioritize people, fostering alignment, adoption, and collaboration across all levels of the
                  organization.
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-2xl liquid-glass p-7 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="mr-4 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#1f2c4a]/20 bg-[#1f2c4a]/[0.06]">
                <span className="text-sm font-medium text-[#d97706]">✓</span>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-[#1f2c4a]">Innovation-Led</h3>
                <p className="text-sm leading-relaxed text-[#64748b]">
                  We combine Agile frameworks with AI, automation, and digital tools to help clients operate at the
                  speed of change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="mb-24 rounded-3xl liquid-glass p-10 md:p-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#d97706]">
            Track Record
          </p>
          <h2
            className="mb-6 text-4xl font-normal text-[#1f2c4a] md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Our Impact
          </h2>
          <p className="mb-6 text-lg text-[#475569]">Agile36 has supported clients in the following ways:</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Large-scale Agile transformations across major enterprises</span>
            </li>
            <li className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Modernization initiatives for federal, state, and municipal government organizations</span>
            </li>
            <li className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Universities seeking to elevate product, Agile, and AI capability</span>
            </li>
            <li className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Executive teams navigating strategic shifts and digital disruption</span>
            </li>
            <li className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Companies building AI-powered products and new operating models</span>
            </li>
          </ul>
          <p className="mt-6 text-lg text-[#475569]">
            Our clients trust us to deliver clarity, accelerate execution, and empower teams to perform at the highest level.
          </p>
        </section>

        {/* Our Vision */}
        <section className="mb-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
            Looking Ahead
          </p>
          <h2
            className="mb-6 text-4xl font-normal text-[#1f2c4a] md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Our Vision
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-[#475569]">
            To be the leading partner for organizations seeking to transform how they work, deliver, and innovate—uniting
            the strengths of Agile, AI, and enterprise consulting to build the next generation of high-performing,
            adaptive organizations.
          </p>
        </section>

        {/* Why Organizations Choose Agile36 */}
        <section className="mb-24 rounded-3xl liquid-glass p-10 md:p-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
            The Difference
          </p>
          <h2
            className="mb-10 text-4xl font-normal text-[#1f2c4a] md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Why Organizations Choose Agile36
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Deep expertise in SAFe and AI transformation</span>
            </div>
            <div className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Proven success with complex, high-visibility initiatives</span>
            </div>
            <div className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Practical and actionable guidance</span>
            </div>
            <div className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">Training and consulting integrated for maximum impact</span>
            </div>
            <div className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">A collaborative approach that builds internal capability</span>
            </div>
            <div className="flex items-start">
              <svg className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#475569]">A strong record of measurable business outcomes</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="liquid-glass rounded-3xl border border-[#1f2c4a]/10 px-8 py-16 text-center md:py-20">
          <h2
            className="mb-4 text-4xl font-normal text-[#1f2c4a] md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Ready to Transform Your Career?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-[#475569] md:text-xl">
            Join thousands of professionals who have advanced their careers with Agile36.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/courses"
              className="rounded-lg bg-white px-8 py-3 font-medium text-[#1f2c4a] transition-colors duration-200 hover:bg-[#16243f]"
            >
              View All Courses
            </a>
            <a
              href="/contact"
              className="liquid-glass rounded-lg border border-[#1f2c4a]/20 px-8 py-3 font-medium text-[#1f2c4a] transition-colors duration-200 hover:bg-[#1f2c4a] hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
