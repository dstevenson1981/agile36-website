'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-black text-[#1f2c4a]">
      {/* Hero Section */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm mb-10">
            <Link href="/" className="text-[#64748b] hover:text-[#1f2c4a] transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1f2c4a] font-medium">Contact Us</span>
          </div>

          {/* Heading */}
          <div className="text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
              Contact
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal leading-[1.08] text-[#1f2c4a] mb-5"
              style={{ letterSpacing: '-0.03em' }}
            >
              Your Questions Matter, Let's Connect!
            </h1>
            <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
              We're here to help you transform your organization. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="rounded-2xl liquid-glass p-8 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] text-center group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-105">
                <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-3" style={{ letterSpacing: '-0.02em' }}>Phone</h3>
              <a
                href="tel:786-321-5200"
                className="text-lg text-[#1f2c4a] hover:text-[#d97706] transition-colors font-medium"
              >
                (786) 321-5200
              </a>
              <p className="text-sm text-[#64748b] mt-3">Mon-Fri, 9AM-5PM EST</p>
            </div>

            {/* Email Card */}
            <div className="rounded-2xl liquid-glass p-8 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] text-center group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-105">
                <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-3" style={{ letterSpacing: '-0.02em' }}>Email</h3>
              <a
                href="mailto:d.stevenson@agile36.com"
                className="text-lg text-[#1f2c4a] hover:text-[#d97706] transition-colors font-medium break-all"
              >
                d.stevenson@agile36.com
              </a>
              <p className="text-sm text-[#64748b] mt-3">Response within 24 hours</p>
            </div>

            {/* Corporate Inquiries Card */}
            <div className="rounded-2xl liquid-glass p-8 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] text-center group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-105">
                <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-3" style={{ letterSpacing: '-0.02em' }}>Corporate</h3>
              <Link
                href="/corporate"
                className="text-lg text-[#1f2c4a] hover:text-[#d97706] transition-colors font-medium inline-block"
              >
                Enterprise Solutions
              </Link>
              <p className="text-sm text-[#64748b] mt-3">Custom training packages</p>
            </div>

            {/* Live Chat Card */}
            <div className="rounded-2xl liquid-glass p-8 transition-all duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] text-center group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-105">
                <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-normal text-[#1f2c4a] mb-3" style={{ letterSpacing: '-0.02em' }}>Chat</h3>
              <p className="text-lg text-[#1f2c4a] font-medium">Live Support</p>
              <p className="text-sm text-[#64748b] mt-3">Average response &lt; 2 min</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
              Get in Touch
            </p>
            <h2
              className="text-4xl font-normal text-[#1f2c4a] mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              Send Us a Message
            </h2>
            <p className="text-lg md:text-xl text-[#475569]">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="liquid-glass rounded-2xl border border-[#1f2c4a]/10 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-[#475569] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-[#475569] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm text-[#475569] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-[#475569] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all"
                    placeholder="(786) 321-5200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm text-[#475569] mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] focus:border-[#1f2c4a]/40 focus:outline-none transition-all [&>option]:bg-black [&>option]:text-[#1f2c4a]"
                >
                  <option value="">Select a subject...</option>
                  <option value="course-inquiry">Course Inquiry</option>
                  <option value="corporate-training">Corporate Training</option>
                  <option value="private-group">Private Group Training</option>
                  <option value="transformation">Transformation Services</option>
                  <option value="certification">Certification Information</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-[#475569] mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#1f2c4a]/5 border border-[#1f2c4a]/15 rounded-lg text-[#1f2c4a] placeholder-gray-500 focus:border-[#1f2c4a]/40 focus:outline-none transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1f2c4a] text-white font-medium py-4 px-8 rounded-lg transition-colors hover:bg-[#16243f]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl liquid-glass overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Side - World Map */}
              <div className="relative bg-[#1f2c4a]/[0.02] border-b border-[#1f2c4a]/10 lg:border-b-0 lg:border-r p-12 flex items-center justify-center">
                {/* Simplified World Map with Location Markers */}
                <div className="relative w-full h-full min-h-[400px]">
                  {/* World Map SVG */}
                  <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20">
                    {/* Simplified continents outline */}
                    <path d="M100,150 Q150,120 200,130 T280,140 Q320,150 340,180 L350,200 Q340,220 320,230 L280,240 Q240,250 200,240 T120,220 Q90,200 100,150 Z" fill="#ffffff" opacity="0.3"/>
                    <path d="M400,100 Q450,90 500,100 T580,120 L600,140 Q610,170 590,190 L550,210 Q500,220 450,210 T380,180 Q370,150 400,100 Z" fill="#ffffff" opacity="0.3"/>
                    <path d="M150,280 Q180,270 220,280 L250,300 Q260,330 240,350 L200,370 Q160,380 130,360 Q110,340 120,310 L150,280 Z" fill="#ffffff" opacity="0.3"/>
                    <path d="M650,200 Q690,190 730,200 L760,220 Q780,250 760,280 L720,300 Q680,310 650,290 Q630,270 650,200 Z" fill="#ffffff" opacity="0.3"/>
                    <path d="M700,320 Q730,310 760,320 L780,340 Q790,370 770,390 L740,410 Q710,420 680,400 Q660,380 700,320 Z" fill="#ffffff" opacity="0.3"/>
                  </svg>

                  {/* Location Markers */}
                  {/* North America - West Coast */}
                  <div className="absolute top-[35%] left-[15%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <svg className="w-10 h-10 text-[#d97706] drop-shadow-lg animate-bounce" style={{ animationDuration: '3s' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* North America - East Coast */}
                  <div className="absolute top-[32%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <svg className="w-10 h-10 text-[#d97706] drop-shadow-lg animate-bounce" style={{ animationDuration: '3.3s' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Europe - UK */}
                  <div className="absolute top-[28%] left-[48%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <svg className="w-10 h-10 text-[#d97706] drop-shadow-lg animate-bounce" style={{ animationDuration: '3.6s' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Asia - India */}
                  <div className="absolute top-[45%] left-[65%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <svg className="w-10 h-10 text-[#d97706] drop-shadow-lg animate-bounce" style={{ animationDuration: '2.8s' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Asia - Southeast */}
                  <div className="absolute top-[52%] left-[73%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <svg className="w-10 h-10 text-[#d97706] drop-shadow-lg animate-bounce" style={{ animationDuration: '3.2s' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Australia */}
                  <div className="absolute top-[70%] left-[78%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <svg className="w-10 h-10 text-[#d97706] drop-shadow-lg animate-bounce" style={{ animationDuration: '3.5s' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="p-12 flex flex-col justify-center">
                <h2
                  className="text-4xl font-normal text-[#1f2c4a] mb-6"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  We Meet You Where You Are
                </h2>
                <p className="text-lg text-[#475569] leading-relaxed mb-8">
                  At Agile36, we deliver training worldwide, offering personalized support and guidance to help you move forward at your own pace. Your transformation journey is unique, and we're here every step of the way.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.05] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#1f2c4a] mb-1">Global Presence</h3>
                      <p className="text-[#64748b]">Training delivered across North America, Europe, Asia, and Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.05] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#1f2c4a] mb-1">Flexible Delivery</h3>
                      <p className="text-[#64748b]">Live virtual, on-site, and hybrid training options available</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.05] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#1f2c4a] mb-1">Local Support</h3>
                      <p className="text-[#64748b]">Personalized guidance in your timezone and language preferences</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
              Questions
            </p>
            <h2
              className="text-4xl font-normal text-[#1f2c4a] mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-[#475569]">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            <details className="liquid-glass rounded-2xl border border-[#1f2c4a]/10 p-6 group transition-colors open:bg-[#1f2c4a]/[0.06]">
              <summary className="font-medium text-lg text-[#1f2c4a] cursor-pointer list-none flex items-center justify-between">
                What are your response times?
                <svg className="w-5 h-5 text-[#64748b] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-[#64748b] mt-4 leading-relaxed">
                We typically respond to email inquiries within 24 hours during business days. Phone calls are answered during business hours (Monday-Friday, 9AM-5PM EST), and our live chat support has an average response time of less than 2 minutes.
              </p>
            </details>

            <details className="liquid-glass rounded-2xl border border-[#1f2c4a]/10 p-6 group transition-colors open:bg-[#1f2c4a]/[0.06]">
              <summary className="font-medium text-lg text-[#1f2c4a] cursor-pointer list-none flex items-center justify-between">
                Do you offer on-site training?
                <svg className="w-5 h-5 text-[#64748b] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-[#64748b] mt-4 leading-relaxed">
                Yes! We offer both on-site and virtual training options for corporate clients. Contact us to discuss your specific needs and we'll create a customized training solution for your organization.
              </p>
            </details>

            <details className="liquid-glass rounded-2xl border border-[#1f2c4a]/10 p-6 group transition-colors open:bg-[#1f2c4a]/[0.06]">
              <summary className="font-medium text-lg text-[#1f2c4a] cursor-pointer list-none flex items-center justify-between">
                How do I enroll in a course?
                <svg className="w-5 h-5 text-[#64748b] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-[#64748b] mt-4 leading-relaxed">
                Browse our course catalog, select your preferred course and schedule, then click "Enroll Now" to complete the registration process. If you need assistance, contact us and we'll guide you through the enrollment.
              </p>
            </details>

            <details className="liquid-glass rounded-2xl border border-[#1f2c4a]/10 p-6 group transition-colors open:bg-[#1f2c4a]/[0.06]">
              <summary className="font-medium text-lg text-[#1f2c4a] cursor-pointer list-none flex items-center justify-between">
                What payment methods do you accept?
                <svg className="w-5 h-5 text-[#64748b] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-[#64748b] mt-4 leading-relaxed">
                We accept all major credit cards, debit cards, and offer invoice-based payment options for corporate clients. Contact us for special payment arrangements or group discounts.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
