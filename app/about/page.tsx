import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Agile36 | SAFe Silver Partner",
  description: "Learn about Agile36, a SAFe Silver Partner offering world-class Agile, SAFe, and AI Product Management training and consulting services.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#01203d] to-[#0a4a6e] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">About Agile36</h1>
          <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
            A transformation and technology enablement firm dedicated to helping organizations accelerate performance, 
            modernize operations, and build the capabilities required to compete in the digital era.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Who We Are */}
        <section className="mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Agile36 is a transformation and technology enablement firm dedicated to helping organizations accelerate 
            performance, modernize operations, and build the capabilities required to compete in the digital era. 
            We bring deep expertise across Agile, AI, and enterprise delivery, combining proven frameworks with next 
            generation innovation to help leaders achieve measurable outcomes.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            For more than a decade, Agile36 has partnered with Fortune 100 and Fortune 500 companies, government agencies, 
            and universities to guide large-scale change. Our work spans strategic consulting, enterprise Agile transformation, 
            AI adoption, workforce enablement, and performance improvement across complex business environments.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We equip leaders and teams with the skills, systems, and strategies needed to unlock sustainable value. 
            Our approach blends pragmatic execution with forward-looking innovation, enabling clients to evolve with 
            speed, clarity, and confidence.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Enterprise Agile Transformation */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Agile Transformation</h3>
              <p className="text-gray-700">
                We help organizations adopt Agile at scale to improve alignment, accelerate delivery, and increase 
                responsiveness. Our team supports enterprise-level transformations, organizational design, change 
                enablement, and leadership coaching.
              </p>
            </div>

            {/* SAFe Training and Certification */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">SAFe Training and Certification</h3>
              <p className="text-gray-700">
                As a Scaled Agile Silver Partner, we deliver accredited SAFe courses led by industry-recognized experts. 
                Our programs provide hands-on, practical learning that empowers teams to adopt new ways of working and 
                drive measurable results.
              </p>
            </div>

            {/* AI and Digital Enablement */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI and Digital Enablement</h3>
              <p className="text-gray-700">
                We help executives and teams understand, adopt, and integrate AI into their strategic and operational 
                workflows. Our solutions include AI strategy development, AI product advisory, and the design of agentic 
                systems that enhance decision-making and automate critical processes.
              </p>
            </div>

            {/* Leadership and Workforce Development */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Leadership and Workforce Development</h3>
              <p className="text-gray-700">
                We provide modern training programs that strengthen leadership capability, elevate collaboration, and 
                build high-performing teams. Our curriculum spans product management, Agile leadership, AI literacy, 
                and executive-level enablement.
              </p>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How We Work</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Outcome-Driven</h3>
                <p className="text-gray-700">
                  Every engagement begins with clear business objectives, measurable ROI, and a structured approach 
                  to tracking value.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enterprise-Grade Discipline</h3>
                <p className="text-gray-700">
                  We bring the rigor, structure, and leadership expected from top consulting firms, paired with the 
                  flexibility required for modern transformation.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">People-Focused</h3>
                <p className="text-gray-700">
                  We prioritize people, fostering alignment, adoption, and collaboration across all levels of the 
                  organization.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation-Led</h3>
                <p className="text-gray-700">
                  We combine Agile frameworks with AI, automation, and digital tools to help clients operate at the 
                  speed of change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-orange-50 p-10 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
          <p className="text-lg text-gray-700 mb-6">Agile36 has supported clients in the following ways:</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Large-scale Agile transformations across major enterprises</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Modernization initiatives for federal, state, and municipal government organizations</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Universities seeking to elevate product, Agile, and AI capability</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Executive teams navigating strategic shifts and digital disruption</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Companies building AI-powered products and new operating models</span>
            </li>
          </ul>
          <p className="text-lg text-gray-700 mt-6">
            Our clients trust us to deliver clarity, accelerate execution, and empower teams to perform at the highest level.
          </p>
        </section>

        {/* Our Vision */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To be the leading partner for organizations seeking to transform how they work, deliver, and innovate—uniting 
            the strengths of Agile, AI, and enterprise consulting to build the next generation of high-performing, 
            adaptive organizations.
          </p>
        </section>

        {/* Why Organizations Choose Agile36 */}
        <section className="mb-16 bg-gray-50 p-10 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Organizations Choose Agile36</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Deep expertise in SAFe and AI transformation</span>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Proven success with complex, high-visibility initiatives</span>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Practical and actionable guidance</span>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Training and consulting integrated for maximum impact</span>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">A collaborative approach that builds internal capability</span>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">A strong record of measurable business outcomes</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-[#01203d] to-[#0a4a6e] text-white p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of professionals who have advanced their careers with Agile36.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="bg-[#fa4a23] hover:bg-[#d43e1c] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View All Courses
            </a>
            <a
              href="/contact"
              className="bg-white hover:bg-gray-100 text-[#01203d] font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

