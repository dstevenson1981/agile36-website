'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function CorporatePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  return (
    <div className="bg-black text-[#1f2c4a]">

      {/* Hero Section */}
      <section className="relative w-full bg-black text-[#1f2c4a] py-24 px-4 sm:px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[#1f2c4a]/[0.04] blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d97706] mb-6">
                Enterprise Solutions
              </p>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#1f2c4a] mb-6 leading-[1.08]"
                style={{ letterSpacing: '-0.03em' }}
              >
                Transform Your Organization with World-Class Agile & AI Training
              </h1>
              <p className="text-xl text-[#475569] mb-8 leading-relaxed">
                Partner with SAFe Silver Partner instructors for private cohorts,
                multi-course roadmaps, and AI upskilling — live virtual delivery,
                procurement-friendly documentation, and curriculum aligned to how
                large programs actually run.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="bg-[#1f2c4a] text-white font-medium py-4 px-8 rounded-lg transition-colors hover:bg-[#16243f]"
                >
                  Request Consultation
                </button>
                <Link
                  href="/corporate/onboard"
                  className="liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium py-4 px-8 rounded-lg transition-colors hover:bg-[#1f2c4a] hover:text-white"
                >
                  Set up corporate billing
                </Link>
                <Link
                  href="#services"
                  className="liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium py-4 px-8 rounded-lg transition-colors hover:bg-[#1f2c4a] hover:text-white"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full h-96 rounded-2xl liquid-glass backdrop-blur-sm p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.04] p-4">
                    <div className="w-12 h-12 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#1f2c4a] font-medium">Live cohorts</p>
                      <p className="text-[#64748b] text-sm">Scheduled on your calendar — same instructor team for series classes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.04] p-4">
                    <div className="w-12 h-12 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#1f2c4a] font-medium">Volume pricing</p>
                      <p className="text-[#64748b] text-sm">Teams of 3+ — aligned to SAFe, AI, and leadership roadmaps</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.04] p-4">
                    <div className="w-12 h-12 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#1f2c4a] font-medium">SPC-led delivery</p>
                      <p className="text-[#64748b] text-sm">SAFe Silver Partner — exam-included public catalog + private options</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L&D / procurement */}
      <section className="w-full bg-black py-14 px-4 sm:px-6 lg:px-20 border-b border-[#1f2c4a]/10">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-normal text-[#1f2c4a] mb-4 text-center"
            style={{ letterSpacing: '-0.03em' }}
          >
            For L&amp;D, procurement, and transformation offices
          </h2>
          <p className="text-center text-[#64748b] mb-10 max-w-3xl mx-auto">
            One partner for SAFe certification paths, AI upskilling, and cohort
            logistics — with clear commercial terms and attendance reporting your
            stakeholders expect.
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 mb-10 text-[#475569]">
            <li className="rounded-2xl liquid-glass p-5 transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <span className="font-medium text-[#1f2c4a] block mb-1">Private cohorts</span>
              Same class dates for distributed teams; optional multi-course bundles
              (Leading SAFe → SSM / POPM / RTE tracks).
            </li>
            <li className="rounded-2xl liquid-glass p-5 transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <span className="font-medium text-[#1f2c4a] block mb-1">Catalog alignment</span>
              Browse public{" "}
              <Link href="/safe-certifications" className="text-[#d97706] font-medium underline hover:no-underline">
                SAFe certifications
              </Link>{" "}
              or request a scoped proposal for mixed roles.
            </li>
            <li className="rounded-2xl liquid-glass p-5 transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <span className="font-medium text-[#1f2c4a] block mb-1">Compliance-ready delivery</span>
              Live virtual classrooms, named instructors (SPCs), and materials
              suitable for enterprise vendor review.
            </li>
            <li className="rounded-2xl liquid-glass p-5 transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <span className="font-medium text-[#1f2c4a] block mb-1">Single point of contact</span>
              <Link href="/contact" className="text-[#d97706] font-medium underline hover:no-underline">
                Contact Agile36
              </Link>{" "}
              for SOWs, volume pricing, and scheduling — or use Request Consultation above.
            </li>
          </ul>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="w-full bg-black py-12 px-4 sm:px-6 lg:px-20 border-b border-[#1f2c4a]/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-medium text-[#94a3b8] uppercase tracking-[0.3em] mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
            {[
              { src: "/logo-amazon.svg", alt: "Amazon" },
              { src: "/apple-11.svg", alt: "Apple" },
              { src: "/accenture-6.svg", alt: "Accenture" },
              { src: "/tesla-9.svg", alt: "Tesla" },
              { src: "/netflix-3.svg", alt: "Netflix" },
              { src: "/disney-2.svg", alt: "Disney" },
              { src: "/deloitte-1 (2).svg", alt: "Deloitte" }
            ].map((logo, index) => (
              <div key={index} className="relative w-24 h-12">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={96}
                  height={48}
                  className="w-full h-full object-contain opacity-40 grayscale transition-opacity hover:opacity-70"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[#d97706] uppercase tracking-[0.3em] mb-4">
              Our Services
            </p>
            <h2
              className="text-4xl md:text-5xl font-normal text-[#1f2c4a] mb-6 leading-[1.08]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Comprehensive Enterprise Solutions
            </h2>
            <p className="text-xl text-[#475569] max-w-3xl mx-auto">
              From training to transformation, we provide end-to-end solutions that drive measurable business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Enterprise Agile Training */}
            <div className="rounded-3xl liquid-glass p-8 transition-all hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: '-0.03em' }}>Enterprise Agile Training</h3>
              <p className="text-[#64748b] mb-6 leading-relaxed">
                Comprehensive SAFe®, Scrum, and Agile training programs designed for organizations scaling agile practices. From foundational courses to advanced certifications.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">Customized curriculum aligned to your business goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">On-site or virtual delivery options</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">Industry-recognized certifications included</span>
                </li>
              </ul>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="text-[#1f2c4a] font-medium hover:text-[#d97706] transition-colors flex items-center gap-2 group"
              >
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Private Group Training */}
            <div className="rounded-3xl liquid-glass p-8 transition-all hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: '-0.03em' }}>Private Group Training</h3>
              <p className="text-[#64748b] mb-6 leading-relaxed">
                Dedicated training sessions for your teams with flexible scheduling, custom content, and hands-on workshops tailored to your organization's specific challenges.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">Flexible scheduling to fit your team's availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">25% group discounts for 10+ participants</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">Post-training support and coaching included</span>
                </li>
              </ul>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="text-[#1f2c4a] font-medium hover:text-[#d97706] transition-colors flex items-center gap-2 group"
              >
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Agile Transformation Services */}
            <div className="rounded-3xl liquid-glass p-8 transition-all hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: '-0.03em' }}>Agile Transformation Services</h3>
              <p className="text-[#64748b] mb-6 leading-relaxed">
                End-to-end transformation consulting to help your organization adopt and scale agile practices. From assessment to implementation and continuous improvement.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">Current state assessment and gap analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">Roadmap development and implementation planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">Embedded coaching and ongoing support</span>
                </li>
              </ul>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="text-[#1f2c4a] font-medium hover:text-[#d97706] transition-colors flex items-center gap-2 group"
              >
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* AI Transformation Services */}
            <div className="rounded-3xl liquid-glass p-8 transition-all hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: '-0.03em' }}>AI Transformation Services</h3>
              <p className="text-[#64748b] mb-6 leading-relaxed">
                Strategic AI adoption and transformation consulting to help organizations leverage generative AI and automation for competitive advantage and operational excellence.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">AI readiness assessment and strategy development</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">GenAI and automation use case identification</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#475569]">Responsible AI frameworks and governance</span>
                </li>
              </ul>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="text-[#1f2c4a] font-medium hover:text-[#d97706] transition-colors flex items-center gap-2 group"
              >
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="w-full bg-black py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[#94a3b8] uppercase tracking-[0.3em] mb-4">
              Proven Results
            </p>
            <h2
              className="text-4xl md:text-5xl font-normal text-[#1f2c4a] mb-6 leading-[1.08]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Impact That Matters
            </h2>
            <p className="text-xl text-[#475569] max-w-3xl mx-auto">
              Our enterprise solutions deliver measurable outcomes across organizations of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-3xl liquid-glass transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-4xl font-normal text-[#1f2c4a] mb-3" style={{ letterSpacing: '-0.03em' }}>40%</h3>
              <p className="text-[#64748b] font-medium">Average Productivity Increase</p>
            </div>

            <div className="text-center p-8 rounded-3xl liquid-glass transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-4xl font-normal text-[#1f2c4a] mb-3" style={{ letterSpacing: '-0.03em' }}>50%</h3>
              <p className="text-[#64748b] font-medium">Faster Time to Market</p>
            </div>

            <div className="text-center p-8 rounded-3xl liquid-glass transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-4xl font-normal text-[#1f2c4a] mb-3" style={{ letterSpacing: '-0.03em' }}>95%</h3>
              <p className="text-[#64748b] font-medium">Client Satisfaction Rate</p>
            </div>

            <div className="text-center p-8 rounded-3xl liquid-glass transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-4xl font-normal text-[#1f2c4a] mb-3" style={{ letterSpacing: '-0.03em' }}>100K+</h3>
              <p className="text-[#64748b] font-medium">Professionals Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-black text-[#1f2c4a] py-20 px-4 sm:px-6 lg:px-20 border-t border-[#1f2c4a]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[#d97706] uppercase tracking-[0.3em] mb-4">
              Why Agile36
            </p>
            <h2
              className="text-4xl md:text-5xl font-normal mb-6 leading-[1.08]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Your Trusted Transformation Partner
            </h2>
            <p className="text-xl text-[#475569] max-w-3xl mx-auto">
              We bring deep expertise, proven methodologies, and a track record of successful transformations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl liquid-glass p-8 transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="w-14 h-14 rounded-xl border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: '-0.03em' }}>Practitioner-Led Training</h3>
              <p className="text-[#475569] leading-relaxed">
                Learn from experts who have led transformations at Fortune 100 companies. Real-world experience, not just theory.
              </p>
            </div>

            <div className="rounded-2xl liquid-glass p-8 transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="w-14 h-14 rounded-xl border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: '-0.03em' }}>Tailored Solutions</h3>
              <p className="text-[#475569] leading-relaxed">
                No cookie-cutter approaches. We customize every engagement to your organization's unique context and challenges.
              </p>
            </div>

            <div className="rounded-2xl liquid-glass p-8 transition-colors hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]">
              <div className="w-14 h-14 rounded-xl border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.06] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: '-0.03em' }}>Ongoing Support</h3>
              <p className="text-[#475569] leading-relaxed">
                We don't disappear after training. Continuous coaching and support ensure lasting transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-black py-20 px-4 sm:px-6 lg:px-20 border-t border-[#1f2c4a]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-normal text-[#1f2c4a] mb-6 leading-[1.08]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-[#475569] mb-10 leading-relaxed">
            Let's discuss how we can help you achieve your agile and AI transformation goals. Schedule a consultation with our team today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="bg-[#1f2c4a] text-white font-medium py-4 px-10 rounded-lg transition-colors hover:bg-[#16243f] text-lg"
            >
              Schedule a Consultation
            </button>
            <Link
              href="/courses"
              className="liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium py-4 px-10 rounded-lg transition-colors hover:bg-[#1f2c4a] hover:text-white text-lg"
            >
              Explore Our Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#ffffff] border border-[#1f2c4a]/15 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>Request a Consultation</h3>
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="text-[#94a3b8] hover:text-[#1f2c4a] transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-[#64748b] mb-8 leading-relaxed">
                Fill out the form below and our team will get back to you within 24 hours to discuss your enterprise training and transformation needs.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#475569] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#475569] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#475569] mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#475569] mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-[#475569] mb-2">
                    Service of Interest *
                  </label>
                  <select
                    id="service"
                    required
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] focus:border-[#1f2c4a]/40 focus:outline-none transition-all [&>option]:bg-[#ffffff] [&>option]:text-[#1f2c4a]"
                  >
                    <option value="">Select a service...</option>
                    <option value="enterprise-training">Enterprise Agile Training</option>
                    <option value="private-training">Private Group Training</option>
                    <option value="agile-transformation">Agile Transformation Services</option>
                    <option value="ai-transformation">AI Transformation Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-[#475569] mb-2">
                    Estimated Team Size
                  </label>
                  <select
                    id="teamSize"
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] focus:border-[#1f2c4a]/40 focus:outline-none transition-all [&>option]:bg-[#ffffff] [&>option]:text-[#1f2c4a]"
                  >
                    <option value="">Select team size...</option>
                    <option value="1-10">1-10 people</option>
                    <option value="11-50">11-50 people</option>
                    <option value="51-100">51-100 people</option>
                    <option value="101-500">101-500 people</option>
                    <option value="500+">500+ people</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#475569] mb-2">
                    Tell us about your needs
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all resize-none"
                    placeholder="Share any specific challenges, goals, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1f2c4a] text-white font-medium py-4 px-6 rounded-lg transition-colors hover:bg-[#16243f]"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
