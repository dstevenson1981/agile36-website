'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function CorporatePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  return (
    <>
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-[#01203d] via-[#012a4a] to-[#01203d] text-white py-24 px-4 sm:px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#fa4a23] text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wide">
                Enterprise Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Organization with World-Class Agile & AI Training
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Partner with industry experts who have led 30+ transformations across Fortune 100 companies. From enterprise agile training to AI transformation, we deliver measurable results.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  Request Consultation
                </button>
                <Link
                  href="#services"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-lg transition-all border-2 border-white/30"
                >
                  Explore Services
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96 bg-gradient-to-br from-[#fa4a23]/20 to-[#01203d]/20 rounded-2xl backdrop-blur-sm border border-white/10 p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="w-12 h-12 bg-[#fa4a23] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold">100,000+</p>
                      <p className="text-gray-300 text-sm">Professionals Trained</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="w-12 h-12 bg-[#fa4a23] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold">500+</p>
                      <p className="text-gray-300 text-sm">Enterprise Clients</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="w-12 h-12 bg-[#fa4a23] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold">30+</p>
                      <p className="text-gray-300 text-sm">Transformations Led</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm font-semibold text-gray-600 uppercase tracking-wide mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center opacity-60">
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
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full bg-[#f0f9ff] py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#fa4a23] uppercase tracking-wide mb-3">
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Enterprise Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From training to transformation, we provide end-to-end solutions that drive measurable business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Enterprise Agile Training */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#fa4a23] to-[#e03d1a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Agile Training</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive SAFe®, Scrum, and Agile training programs designed for organizations scaling agile practices. From foundational courses to advanced certifications.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#fa4a23] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Customized curriculum aligned to your business goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#fa4a23] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">On-site or virtual delivery options</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#fa4a23] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Industry-recognized certifications included</span>
                </li>
              </ul>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="text-[#fa4a23] font-semibold hover:text-[#e03d1a] transition-colors flex items-center gap-2 group"
              >
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Private Group Training */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#01203d] to-[#012a4a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Private Group Training</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Dedicated training sessions for your teams with flexible scheduling, custom content, and hands-on workshops tailored to your organization's specific challenges.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#01203d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Flexible scheduling to fit your team's availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#01203d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Group discounts for 10+ participants</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#01203d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Post-training support and coaching included</span>
                </li>
              </ul>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="text-[#01203d] font-semibold hover:text-[#012a4a] transition-colors flex items-center gap-2 group"
              >
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Agile Transformation Services */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#fa4a23] to-[#e03d1a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Agile Transformation Services</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                End-to-end transformation consulting to help your organization adopt and scale agile practices. From assessment to implementation and continuous improvement.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#fa4a23] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Current state assessment and gap analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#fa4a23] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Roadmap development and implementation planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#fa4a23] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Embedded coaching and ongoing support</span>
                </li>
              </ul>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="text-[#fa4a23] font-semibold hover:text-[#e03d1a] transition-colors flex items-center gap-2 group"
              >
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* AI Transformation Services */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#01203d] to-[#012a4a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Transformation Services</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Strategic AI adoption and transformation consulting to help organizations leverage generative AI and automation for competitive advantage and operational excellence.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#01203d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">AI readiness assessment and strategy development</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#01203d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">GenAI and automation use case identification</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#01203d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Responsible AI frameworks and governance</span>
                </li>
              </ul>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="text-[#01203d] font-semibold hover:text-[#012a4a] transition-colors flex items-center gap-2 group"
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
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#fa4a23] uppercase tracking-wide mb-3">
              Proven Results
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Impact That Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our enterprise solutions deliver measurable outcomes across organizations of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-[#f0f9ff] to-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#fa4a23] to-[#e03d1a] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-3">40%</h3>
              <p className="text-gray-600 font-medium">Average Productivity Increase</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-[#f0f9ff] to-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#01203d] to-[#012a4a] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-3">50%</h3>
              <p className="text-gray-600 font-medium">Faster Time to Market</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-[#f0f9ff] to-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#fa4a23] to-[#e03d1a] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-3">95%</h3>
              <p className="text-gray-600 font-medium">Client Satisfaction Rate</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-[#f0f9ff] to-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#01203d] to-[#012a4a] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-3">100K+</h3>
              <p className="text-gray-600 font-medium">Professionals Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-gradient-to-br from-[#01203d] to-[#012a4a] text-white py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#fa4a23] uppercase tracking-wide mb-3">
              Why Agile36
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Transformation Partner
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We bring deep expertise, proven methodologies, and a track record of successful transformations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="w-14 h-14 bg-[#fa4a23] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Practitioner-Led Training</h3>
              <p className="text-gray-300 leading-relaxed">
                Learn from experts who have led transformations at Fortune 100 companies. Real-world experience, not just theory.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="w-14 h-14 bg-[#fa4a23] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Tailored Solutions</h3>
              <p className="text-gray-300 leading-relaxed">
                No cookie-cutter approaches. We customize every engagement to your organization's unique context and challenges.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="w-14 h-14 bg-[#fa4a23] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Ongoing Support</h3>
              <p className="text-gray-300 leading-relaxed">
                We don't disappear after training. Continuous coaching and support ensure lasting transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#f0f9ff] py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Let's discuss how we can help you achieve your agile and AI transformation goals. Schedule a consultation with our team today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-xl text-lg"
            >
              Schedule a Consultation
            </button>
            <Link
              href="/courses"
              className="bg-white hover:bg-gray-50 text-[#01203d] font-bold py-4 px-10 rounded-lg transition-all border-2 border-[#01203d] text-lg"
            >
              Explore Our Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-900">Request a Consultation</h3>
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Fill out the form below and our team will get back to you within 24 hours to discuss your enterprise training and transformation needs.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service of Interest *
                  </label>
                  <select
                    id="service"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent transition-all"
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
                  <label htmlFor="teamSize" className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Team Size
                  </label>
                  <select
                    id="teamSize"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent transition-all"
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
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell us about your needs
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent transition-all resize-none"
                    placeholder="Share any specific challenges, goals, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

