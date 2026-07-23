"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WhyAgile36Section from "@/app/components/WhyAgile36Section";
import { SAFE_COURSE_PARTICIPANTS_LABEL, SAFE_COURSE_PARTICIPANTS_VALUE } from "@/app/lib/course-catalog";
import CourseHeroSocialProof from "@/app/components/CourseHeroSocialProof";
import CourseHeroRightColumn from "@/app/components/CourseHeroRightColumn";
import CourseHeroStats from "@/app/components/CourseHeroStats";
import { RadialGauge, RangeBar, FactChip, DemandMeter } from "@/app/components/CourseInfographics";
import TrustedByStrip from "@/app/components/TrustedByStrip";

export default function DevOpsCoursePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentFormData, setAssessmentFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFaqCategory, setActiveFaqCategory] = useState("generic");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [expandedCurriculum, setExpandedCurriculum] = useState<number[]>([]);

  const examName = "SAFe DevOps Practice Test";
  const courseSlug = "devops";

  const handleAssessmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessmentFormData.email || !assessmentFormData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    if (!assessmentFormData.name || assessmentFormData.name.trim() === '') {
      alert('Please enter your full name');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/store-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: assessmentFormData.name,
          email: assessmentFormData.email,
          source: 'SA Free Assessment',
          exam_name: examName
        }),
      });

      if (response.ok) {
        // Redirect to practice test
        window.location.href = '/test/devops';
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        alert(errorData.error || 'Failed to submit email. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-black px-4 pb-16 pt-10 sm:px-6 lg:px-20 lg:pb-20">
        {/* Soft ambient glows behind the hero */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[55vh] w-[55vh] rounded-full bg-[#d97706]/[0.07] blur-[130px]" />
          <div className="absolute -right-40 top-10 h-[60vh] w-[60vh] rounded-full bg-blue-500/[0.08] blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#1f2c4a]">SAFe</Link>
            <span>/</span>
            <span className="text-[#334155]">SAFe SDP</span>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10">
            {/* Left Content */}
            <div className="space-y-5">
              {/* Category Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="liquid-glass rounded-full px-3 py-1 text-xs font-medium text-[#1f2c4a]">SAFe DevOps Practitioner (SDP)</span>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-700">
                  Certification Exam Included
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1f2c4a] sm:text-[2rem] lg:text-[2rem]">
                  AI-Empowered SAFe® DevOps (SDP) Certification Training
                </h1>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#475569] md:text-[15px]">
                  Master DevOps practices and continuous delivery pipelines with expert-led SAFe® 6.0 training and hands-on automation labs.
                </p>
              </div>

              {/* Social proof */}
              <CourseHeroSocialProof enrolledLabel={SAFE_COURSE_PARTICIPANTS_LABEL} />

              {/* Infographic stats */}
              <CourseHeroStats
                stats={[
                  { value: SAFE_COURSE_PARTICIPANTS_VALUE, label: "Participants", icon: "users" },
                  { value: "4.9", label: "Avg. rating", icon: "star" },
                  { value: "16", label: "Hours live", icon: "clock" },
                  { value: "2", label: "Days", icon: "calendar" },
                ]}
              />

              {/* Features List */}
              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  "Join SAFe SDP Training with Agile36, a Scaled Agile Silver Partner",
                  "Design continuous delivery pipelines & automate deployment in SAFe",
                  "Learn from SPCs & access exclusive SAFe® resources for success",
                  "Earn 16 PDUs & SEUs and join the global SAFe® Agile leader network",
                  "Get SAFe DevOps Practitioner certified with live sessions & exam guidance"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-600">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-[14.5px] leading-relaxed text-[#475569]">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Accredited By */}
              <div className="flex items-center gap-4 border-t border-[#1f2c4a]/10 pt-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#94a3b8]">Accredited by</span>
                <div className="flex items-center gap-4">
                  <Image
                    src="/Silver.png"
                    alt="Scaled Agile Silver Partner"
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                  <Image
                    src="/Devops.png"
                    alt="SAFe DevOps Practitioner Certification Badge"
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/courses/devops/schedule?course=${courseSlug}`}
                  className="inline-block rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-[#1f2c4a]/20 transition-colors hover:bg-[#16243f]"
                >
                  View Schedules
                </Link>
                <a
                  href="/SDP_6.0_Partner.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </a>
                <button
                  onClick={() => setShowAssessmentModal(true)}
                  className="liquid-glass rounded-lg px-5 py-2.5 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
                >
                  Free DevOps Assessment
                </button>
              </div>
            </div>

            {/* Sticky pricing card */}
            <CourseHeroRightColumn courseSlug={courseSlug}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">16 Hours Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">2 Days Duration</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">SAFe DevOps Practitioner (SDP)</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">16 PDUs & SEUs</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#475569]">Lifetime Access to Materials</span>
                </div>
              </div>
            </CourseHeroRightColumn>
          </div>
        </div>
      </section>

      {/* Trusted by industry leaders */}
      <TrustedByStrip />

      {/* AI-SEO: Page Summary - What is SAFe SDP? */}
      <section className="w-full bg-[#1f2c4a]/[0.03] border-t border-[#1f2c4a]/10 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">What is SAFe SDP Certification?</h2>
            <p className="text-lg text-[#334155] leading-relaxed mb-4">
              SAFe DevOps Practitioner (SDP) certification validates your ability to implement DevOps practices, build continuous delivery pipelines, and accelerate value delivery within the Scaled Agile Framework. The certification teaches you to map value streams, automate testing and deployment, apply infrastructure as code, and foster a culture of continuous improvement across Agile Release Trains.
            </p>
            <p className="text-lg text-[#334155] leading-relaxed">
              The certification is earned by completing a 2-day (16-hour) course taught by a SAFe Program Consultant (SPC) and passing the online SAFe DevOps Practitioner exam. Upon certification, you receive one year of access to the SAFe Community Platform, 16 PDUs/SEUs, and the credentials to lead DevOps transformations at enterprise scale.
            </p>
          </div>
        </div>
      </section>

      {/* AI-SEO: Quick Facts */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-6">SAFe SDP Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Certification</h3>
              <p className="text-xl font-semibold text-[#1f2c4a]">SAFe DevOps Practitioner (SDP)</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Duration</h3>
              <p className="text-xl font-semibold text-[#1f2c4a]">2 Days (16 Hours)</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">PDUs/SEUs</h3>
              <p className="text-xl font-semibold text-[#1f2c4a]">16 PDUs & 16 SEUs</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-[#64748b] mb-2">Exam Fee</h3>
              <p className="text-xl font-semibold text-[#1f2c4a]">Included</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI-SEO: Key Definitions */}
      <section className="w-full bg-[#1f2c4a]/[0.03] py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-8">Key Definitions</h2>
          <div className="space-y-6 max-w-4xl">
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-xl text-[#1f2c4a] mb-2">What is DevOps in SAFe?</h3>
              <p className="text-[#475569] leading-relaxed">
                DevOps in SAFe combines development and operations practices to shorten the lead time from concept to deployment. It emphasizes collaboration, automation, continuous integration, continuous delivery, and a culture of shared responsibility for quality and flow across the Agile Release Train.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-xl text-[#1f2c4a] mb-2">What is a Continuous Delivery Pipeline?</h3>
              <p className="text-[#475569] leading-relaxed">
                A continuous delivery pipeline is the automated workflow that moves code from commit to production. In SAFe, the pipeline spans continuous exploration, integration, deployment, and release on demand — enabling teams to deliver value frequently with minimal manual intervention.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-xl text-[#1f2c4a] mb-2">What is Continuous Integration (CI)?</h3>
              <p className="text-[#475569] leading-relaxed">
                Continuous Integration is the practice of merging code changes into a shared repository frequently, with automated builds and tests running on each integration. CI reduces integration risk, surfaces defects early, and keeps the codebase in a continuously releasable state.
              </p>
            </div>
            <div className="border-l-2 border-[#d97706] pl-6 py-2">
              <h3 className="font-bold text-xl text-[#1f2c4a] mb-2">What is Release on Demand?</h3>
              <p className="text-[#475569] leading-relaxed">
                Release on Demand is the ability to release value to customers whenever the business chooses, independent of deployment. SAFe decouples deployment from release using techniques like feature toggles, canary releases, and dark launches to minimize risk while maximizing flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI-SEO: Who Should Take This Course */}
      <section className="w-full bg-black py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-8">Who Should Take SAFe SDP Certification?</h2>
          <p className="text-lg text-[#475569] mb-6 max-w-4xl">
            SAFe SDP certification is designed for professionals who build, automate, and optimize software delivery pipelines within Lean-Agile enterprises:
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-xl">•</span>
              <div>
                <h3 className="font-bold text-lg text-[#1f2c4a]">DevOps Engineers</h3>
                <p className="text-[#475569]">Practitioners responsible for CI/CD pipelines, deployment automation, and infrastructure as code.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-xl">•</span>
              <div>
                <h3 className="font-bold text-lg text-[#1f2c4a]">Software Developers & Engineers</h3>
                <p className="text-[#475569]">Developers who want to integrate DevOps practices into their daily workflow within SAFe teams.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-xl">•</span>
              <div>
                <h3 className="font-bold text-lg text-[#1f2c4a]">Release Train Engineers & System Architects</h3>
                <p className="text-[#475569]">ART leaders who coordinate delivery flow, tooling, and architectural enablers across teams.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-xl">•</span>
              <div>
                <h3 className="font-bold text-lg text-[#1f2c4a]">IT Operations & Infrastructure Teams</h3>
                <p className="text-[#475569]">Operations professionals transitioning to DevOps culture and automation-first delivery models.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-xl">•</span>
              <div>
                <h3 className="font-bold text-lg text-[#1f2c4a]">Site Reliability Engineers (SREs)</h3>
                <p className="text-[#475569]">Engineers focused on reliability, observability, and automated remediation in production systems.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#d97706] font-bold text-xl">•</span>
              <div>
                <h3 className="font-bold text-lg text-[#1f2c4a]">Agile Coaches & Transformation Leaders</h3>
                <p className="text-[#475569]">Change agents guiding organizations through DevOps adoption within SAFe transformations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-SEO: Related SAFe Certifications - Entity Linking */}
      <section className="w-full bg-[#1f2c4a]/[0.03] py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">Related SAFe Certifications</h2>
          <p className="text-lg text-[#475569] mb-8 max-w-4xl">
            Build on your SAFe SDP certification with these complementary SAFe certifications to deepen your expertise:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/courses/leading-safe" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ Leading SAFe (SAFe Agilist)</h3>
              <p className="text-[#475569] text-sm">Lead Lean-Agile transformations, coordinate Agile Release Trains, and organize around value at enterprise scale.</p>
            </Link>
            <Link href="/courses/product-owner-manager" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ SAFe Product Owner/Product Manager (POPM)</h3>
              <p className="text-[#475569] text-sm">Manage Program and Team Backlogs, prioritize Features, and drive customer-centric delivery across ARTs.</p>
            </Link>
            <Link href="/courses/scrum-master" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ SAFe Scrum Master (SSM)</h3>
              <p className="text-[#475569] text-sm">Master facilitation of Agile teams, Scrum events, and the execution of Program Increments within the SAFe framework.</p>
            </Link>
            <Link href="/courses/lean-portfolio-management" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ Lean Portfolio Management (LPM)</h3>
              <p className="text-[#475569] text-sm">Align strategy and execution, manage portfolio flow, and optimize value streams across the enterprise portfolio.</p>
            </Link>
            <Link href="/courses/advanced-scrum-master" className="block p-6 liquid-glass rounded-2xl transition-all hover:bg-[#1f2c4a]/[0.1]">
              <h3 className="font-bold text-lg text-[#1f2c4a] mb-2">→ AI-Empowered Advanced Scrum Master (SASM)</h3>
              <p className="text-[#475569] text-sm">Advanced facilitation, coaching, and leadership skills for experienced Scrum Masters working in SAFe environments.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Key to Success Section — glassmorphism feature cards */}
      <section className="w-full bg-[#e9eef6] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-3 text-center">
            Our Key to Exam and Career Success
          </h2>
          <p className="mb-12 text-center text-[#64748b]">
            Everything in your enrollment is built to get you certified — and hired.
          </p>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                title: "High Pass Rate",
                desc: "Exam fee is included with your course enrollment.",
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ), 
                title: "Expert-Led Study Sessions",
                desc: "Live exam prep with certified SPC instructors.",
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ), 
                title: "Networking Opportunities",
                desc: "Join a global community of certified SAFe leaders.",
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ), 
                title: "Flexible Monthly Payment Plans",
                desc: "Split your tuition into easy monthly payments.",
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ), 
                title: "Real-World Case Studies",
                desc: "Learn through real enterprise transformation scenarios.",
              },
              { 
                icon: (
                  <svg className="w-10 h-10 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ), 
                title: "Hands-On Project Experience",
                desc: "Build continuous delivery pipelines in live, instructor-run labs.",
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/20 hover:shadow-[0_16px_40px_-12px_rgba(13,148,136,0.35),inset_0_1px_1px_rgba(255,255,255,0.8)]"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#d97706]/10 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <h3 className="mt-4 text-base font-bold text-[#1f2c4a]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {/* Main content area - full width */}
            <div className="space-y-12">
              {/* Tabs Navigation */}
              <div className="border-b border-[#1f2c4a]/15">
                <nav className="flex space-x-8">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "curriculum", label: "Curriculum" },
                    { id: "reviews", label: "Reviews" },
                    { id: "faq", label: "FAQ" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-[#d97706] text-[#d97706]"
                          : "border-transparent text-[#64748b] hover:text-[#1f2c4a] hover:border-[#1f2c4a]/40"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">Course Overview</h2>
                      <p className="text-base text-[#475569] mb-4">
                        SAFe DevOps is a comprehensive 2-day course that provides the knowledge and skills needed to implement DevOps practices, build continuous delivery pipelines, and accelerate value delivery in SAFe environments. This course prepares you to take the SAFe® DevOps (SDP) certification exam.
                      </p>
                      <p className="text-base text-[#475569] mb-4">
                        During this two-day course, you'll learn how to design and implement continuous delivery pipelines, automate testing and deployment, apply DevOps practices in SAFe, and foster a culture of continuous improvement. You'll master DevOps engineering practices, infrastructure as code, and deployment automation. The course emphasizes practical implementation of DevOps principles within the Scaled Agile Framework.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What You'll Learn</h3>
                      <p className="text-base text-[#475569] mb-4">
                        SAFe® DevOps (SDP) certification training offers a variety of learning opportunities that can benefit professionals involved in software development, deployment automation, continuous integration, and DevOps practices within SAFe environments.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Design and implement continuous delivery pipelines",
                          "Automate testing, integration, and deployment processes",
                          "Apply DevOps practices in SAFe environments",
                          "Implement infrastructure as code and deployment automation",
                          "Foster a culture of continuous improvement and learning",
                          "Accelerate value delivery through DevOps practices"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[14.5px] text-[#475569]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Who Should Attend</h3>
                      <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                        <li>DevOps Engineers and Practitioners</li>
                        <li>Software Developers and Engineers</li>
                        <li>Release Train Engineers and System Architects</li>
                        <li>IT Operations and Infrastructure Teams</li>
                        <li>Anyone interested in implementing DevOps practices in SAFe</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Certification Details</h3>
                      <div className="bg-[#1f2c4a]/[0.06] rounded-lg p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-[#1f2c4a]">SAFe® DevOps (SDP) Certification</p>
                            <p className="text-sm text-[#64748b]">Valid for 1 year, renewable</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-[#1f2c4a]">16 PDUs & SEUs</p>
                            <p className="text-sm text-[#64748b]">Earn professional development units</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-[#1f2c4a]">Digital Certificate</p>
                            <p className="text-sm text-[#64748b]">Downloadable upon completion</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What is Leading SAFe Training */}
                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What is SAFe DevOps training?</h3>
                      <p className="text-base text-[#475569] mb-4">
                        SAFe DevOps Training is a certification program designed to help professionals understand and effectively implement DevOps practices within the Scaled Agile Framework (SAFe). This comprehensive 2-day course covers continuous delivery pipelines, deployment automation, testing strategies, infrastructure as code, and DevOps culture. You'll learn to apply DevOps principles and accelerate value delivery in SAFe environments.
                      </p>
                      <p className="text-[14.5px] text-[#475569]">
                        The training prepares participants for the SAFe DevOps (SDP) certificate exam, providing them with the knowledge and skills to work effectively as DevOps practitioners in a SAFe environment, implementing continuous delivery pipelines and fostering a culture of continuous improvement.
                      </p>
                    </div>

                    {/* Why Leading SAFe */}
                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Why SAFe DevOps?</h3>
                      <p className="text-base text-[#475569] mb-4">
                        The SAFe DevOps Certification empowers professionals to effectively implement DevOps practices in a SAFe environment. It provides a comprehensive understanding of how to build continuous delivery pipelines, automate deployment processes, improve software quality, and accelerate value delivery.
                      </p>
                      <p className="text-base text-[#475569] mb-4">
                        By earning this certification, you gain the expertise to implement DevOps transformations, design deployment pipelines, and foster a culture of continuous improvement. The certification is recognized globally and opens doors to DevOps Engineer, Site Reliability Engineer, and DevOps Architect roles in technology organizations.
                      </p>
                      <div className="bg-[#1f2c4a]/[0.06] border-l-2 border-[#d97706] p-6 my-6">
                        <p className="text-base text-[#475569] font-semibold mb-2">Key Benefits:</p>
                        <ul className="list-disc list-inside space-y-2 text-base text-[#475569]">
                          <li>Master SAFe DevOps principles and practices</li>
                          <li>Improve deployment velocity and software quality</li>
                          <li>Accelerate value delivery through automation</li>
                          <li>Increase organizational agility through DevOps practices</li>
                          <li>Enhance career prospects with globally recognized certification</li>
                        </ul>
                      </div>
                    </div>

                    {/* What Will You Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">What Will You Learn in SAFe DevOps Certification Training?</h3>
                      <p className="text-base text-[#475569] mb-4">
                        Complete your SAFe DevOps certification course to gain the practical tools and knowledge needed to effectively implement continuous delivery pipelines, automate deployment processes, and accelerate value delivery in a SAFe environment. This comprehensive training covers all aspects of DevOps practices in SAFe.
                      </p>
                      <p className="text-base text-[#475569] mb-6">
                        Through SAFe DevOps Certification, you will learn:
                      </p>
                      <div className="space-y-4">
                        {[
                          "Design and implement continuous delivery pipelines",
                          "Automate testing, integration, and deployment processes",
                          "Apply DevOps practices in SAFe environments",
                          "Implement infrastructure as code and deployment automation",
                          "Foster a culture of continuous improvement and learning",
                          "Accelerate value delivery through DevOps practices",
                          "Build and maintain deployment pipelines",
                          "Improve software quality and deployment frequency"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-[14.5px] text-[#475569]">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Prerequisites for SAFe DevOps Certification Training Course?</h3>
                      <p className="text-base text-[#475569] mb-4">
                        There are no formal prerequisites to enroll in the <strong>SAFe DevOps Certification course.</strong> Software development, operations, or DevOps experience is recommended to get the most from the training.
                      </p>
                      <div className="bg-[#1f2c4a]/[0.06] rounded-lg p-6 space-y-3">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#d97706] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-[14.5px] text-[#475569]">Software development, operations, or DevOps experience recommended</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#d97706] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-[14.5px] text-[#475569]">Familiarity with CI/CD, automation, or release pipelines helpful</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#d97706] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <p className="text-[14.5px] text-[#475569]">Interest in improving delivery flow and reducing deployment lead time</p>
                        </div>
                      </div>
                    </div>

                    {/* Career & Salary */}
                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Career Outcomes for SAFe DevOps Professionals</h3>
                      <p className="text-base text-[#475569] mb-4">
                        Earning your SAFe DevOps certification opens up numerous career opportunities and demonstrates your commitment to professional growth. The certification validates your ability to effectively implement DevOps practices and continuous delivery pipelines in a SAFe environment.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="rounded-2xl border border-[#1f2c4a]/15 bg-white p-6">
                          <h4 className="font-bold text-[#1f2c4a] mb-4">Average Salary (US)</h4>
                          <RangeBar
                            title="$100K – $150K"
                            minLabel="$100,000"
                            midLabel="$125,000"
                            maxLabel="$150,000+"
                            caption="Typical US salary band for SAFe DevOps professionals"
                          />
                        </div>
                        <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                          <h4 className="font-bold text-[#1f2c4a] mb-3">Common Roles</h4>
                          <p className="text-[14.5px] text-[#475569]">DevOps Engineer, Site Reliability Engineer, DevOps Architect, Release Manager</p>
                        </div>
                        <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                          <h4 className="font-bold text-[#1f2c4a] mb-3">Top Hiring Industries</h4>
                          <p className="text-[14.5px] text-[#475569]">Financial services, healthcare, federal government, technology</p>
                        </div>
                        <div className="rounded-2xl border border-[#1f2c4a]/15 bg-white p-6">
                          <h4 className="font-bold text-[#1f2c4a] mb-4">Demand</h4>
                          <DemandMeter caption="SAFe DevOps professionals are in high demand as enterprises accelerate digital delivery." />
                        </div>
                      </div>
                    </div>

                    {/* Course Format */}
                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Course Format & Delivery</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-[#1f2c4a] mb-2">Live Virtual Training</h4>
                          <p className="text-sm text-[#475569]">Interactive online sessions with expert instructors</p>
                        </div>
                        <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-[#1f2c4a] mb-2">Course Materials</h4>
                          <p className="text-sm text-[#475569]">Comprehensive study guides and practice exams</p>
                        </div>
                        <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-[#1f2c4a] mb-2">Community Access</h4>
                          <p className="text-sm text-[#475569]">1 year access to SAFe Community Platform</p>
                        </div>
                      </div>
                    </div>

                    {/* Exam Information */}
                    <div>
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">SAFe DevOps Exam Information</h3>
                      <div className="bg-[#1f2c4a]/[0.04] rounded-2xl border border-[#1f2c4a]/10 p-6 space-y-6">
                        <div className="grid items-center gap-6 md:grid-cols-[200px_1fr]">
                          <RadialGauge
                            percent={71}
                            sublabel="to pass"
                            label="Passing score — 32 of 45 questions"
                          />
                          <div className="grid gap-3 sm:grid-cols-2">
                            <FactChip
                              value="45 questions"
                              label="Multiple choice, open book"
                              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
                            />
                            <FactChip
                              value="90 minutes"
                              label="Online, from anywhere"
                              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 2" /></svg>}
                            />
                            <FactChip
                              value="Exam fee included"
                              label="With course enrollment"
                              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            />
                            <FactChip
                              value="30-day window"
                              label="To complete your exam online"
                              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                            />
                          </div>
                        </div>
                        <div className="pt-4 border-t border-[#1f2c4a]/15">
                          <p className="text-base text-[#475569] mb-2">
                            <strong>Note:</strong> The exam can be taken online from anywhere within 30 days of course completion. Your exam attempt is included with course enrollment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-[#64748b] mb-2">Course Curriculum</p>
                        <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">SAFe® DevOps Certification Course Curriculum</h2>
                      </div>
                      <a 
                        href="/SDP_6.0_Partner.pdf" 
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] font-medium rounded-lg hover:bg-[#1f2c4a] hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Curriculum
                      </a>
                    </div>
                    {/* Learning Objectives Section */}
                    <div className="bg-[#1f2c4a]/[0.06] border border-[#1f2c4a]/15 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold text-[#1f2c4a] mb-4">Learning Objectives</h3>
                      <p className="text-base text-[#475569] mb-4">
                        By the end of this course, you will be able to:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Design and implement continuous delivery pipelines",
                          "Automate testing, integration, and deployment processes",
                          "Apply DevOps practices in SAFe environments",
                          "Implement infrastructure as code and deployment automation",
                          "Foster a culture of continuous improvement and learning",
                          "Accelerate value delivery through DevOps practices",
                          "Build and maintain deployment pipelines",
                          "Improve software quality and deployment frequency"
                        ].map((objective, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[14.5px] text-[#475569]">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { 
                          lesson: "Lesson 1: Introducing DevOps",
                          content: "Learn the fundamentals of DevOps practices and how they integrate with the Scaled Agile Framework. Understand the core principles of DevOps culture, collaboration, and continuous improvement."
                        },
                        { 
                          lesson: "Lesson 2: Value Stream Mapping",
                          content: "Map your current delivery pipeline to identify bottlenecks and waste. Learn techniques to visualize value flow and optimize your software delivery process from concept to customer."
                        },
                        { 
                          lesson: "Lesson 3: Continuous Exploration",
                          content: "Explore how to align development with customer needs through continuous exploration. Learn techniques for hypothesis-driven development, customer research, and market analysis."
                        },
                        { 
                          lesson: "Lesson 4: Continuous Integration",
                          content: "Build quality into your development process with continuous integration. Learn to automate builds, run tests, and integrate code changes frequently to reduce integration issues."
                        },
                        { 
                          lesson: "Lesson 5: Continuous Deployment",
                          content: "Deploy to production with confidence through continuous deployment practices. Learn automation techniques for deployment pipelines, infrastructure as code, and release management."
                        },
                        { 
                          lesson: "Lesson 6: Release on Demand",
                          content: "Release value to customers on demand with effective release strategies. Learn how to decouple deployment from release, implement feature toggles, and manage production releases safely."
                        }
                      ].map((item, index) => {
                        const isExpanded = expandedCurriculum.includes(index);
                        return (
                          <div key={index} className="border border-blue-200 rounded-lg bg-white overflow-hidden">
                            <button
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1f2c4a]/[0.1] transition-colors"
                              onClick={() => {
                                if (isExpanded) {
                                  setExpandedCurriculum(expandedCurriculum.filter(i => i !== index));
                                } else {
                                  setExpandedCurriculum([...expandedCurriculum, index]);
                                }
                              }}
                            >
                              <span className="text-lg font-semibold text-[#1f2c4a]">{item.lesson}</span>
                              <svg 
                                className={`w-5 h-5 text-[#64748b] flex-shrink-0 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 pt-0 border-t border-blue-100">
                                <p className="text-base text-[#475569] mt-4">{item.content}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">Student Reviews</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-base font-semibold text-[#1f2c4a]">4.9 (234 reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[
                        { 
                          name: "Alexandra Chen", 
                          role: "DevOps Engineer", 
                          review: "The SAFe DevOps course transformed how I build deployment pipelines. The continuous delivery and automation modules were game-changers. I passed the SDP exam on my first attempt!",
                          rating: 5
                        },
                        { 
                          name: "Michael Rodriguez", 
                          role: "Senior DevOps Engineer", 
                          review: "Outstanding training! The focus on continuous integration and deployment automation gave me practical tools I use daily. The instructors' real-world examples made complex DevOps concepts clear.",
                          rating: 5
                        },
                        { 
                          name: "Sarah Johnson", 
                          role: "Release Engineer", 
                          review: "As a Release Engineer transitioning to DevOps, this course provided exactly what I needed. The pipeline design and automation techniques were particularly valuable. Highly recommend!",
                          rating: 5
                        },
                        { 
                          name: "David Kim", 
                          role: "DevOps Architect", 
                          review: "The SAFe DevOps certification has elevated my pipeline implementation skills significantly. The infrastructure as code module helped me better design deployment automation. Worth every penny!",
                          rating: 5
                        },
                        { 
                          name: "Jennifer Martinez", 
                          role: "Site Reliability Engineer", 
                          review: "Excellent course structure! The two-day format was intensive but well-paced. I've already applied the continuous delivery and automation frameworks in my organization with great results.",
                          rating: 5
                        },
                        { 
                          name: "Robert Taylor", 
                          role: "DevOps Engineer", 
                          review: "The SAFe DevOps training exceeded expectations. The case studies on pipeline implementation and deployment automation were incredibly practical. The exam preparation was thorough and effective.",
                          rating: 5
                        },
                        { 
                          name: "Lisa Anderson", 
                          role: "CI/CD Engineer", 
                          review: "This course helped me bridge the gap between development and operations. The continuous delivery and DevOps culture principles are now core to my engineering approach.",
                          rating: 5
                        },
                        { 
                          name: "James Wilson", 
                          role: "Lead DevOps Engineer", 
                          review: "Outstanding investment in professional development! The SAFe DevOps framework concepts are clearly explained with relevant examples. I feel confident implementing continuous delivery pipelines now.",
                          rating: 5
                        }
                      ].map((review, index) => (
                        <div key={index} className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-[#1f2c4a]">{review.name}</h4>
                              <p className="text-sm text-[#64748b]">{review.role}</p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-[14.5px] text-[#475569]">
                            {review.review}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                        { q: "What is the SAFe DevOps (SDP) certification?", a: "The SAFe DevOps (SDP) certification validates your knowledge of DevOps practices in the Scaled Agile Framework and your ability to implement continuous delivery pipelines, automate deployment processes, and accelerate value delivery in a SAFe environment." },
                        { q: "How long is the certification valid?", a: "The SAFe DevOps (SDP) certification is valid for one year from the date of issue. You can renew it by earning continuing education credits or taking advanced SAFe courses." },
                        { q: "What is included in the course?", a: "The course includes 16 hours of live training over 2 days, comprehensive course materials, practice exam, and one year of access to the SAFe Community Platform." },
                        { q: "Do I need prior DevOps experience?", a: "While prior DevOps experience is helpful, it's not required. The course is designed for both beginners and experienced practitioners. Basic understanding of software development or IT operations is recommended." }
                      ].map((faq, index) => (
                        <div key={index} className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                          <h3 className="font-bold text-[#1f2c4a] mb-2">{faq.q}</h3>
                          <p className="text-[14.5px] text-[#475569]">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Test Section */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1f2c4a] sm:text-[2rem] lg:text-[2rem]">SAFe DevOps Practice Test</h2>
              <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                "Immediate Results",
                "Sample Papers",
                "Time-Limited",
                "Comprehensive Explanation",
                "Previous Exams"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-[#475569] font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Test Card */}
          <div className="max-w-2xl mx-auto">
            <div className="liquid-glass rounded-2xl p-8">
              {/* Badge */}
              <div className="mb-4">
                <span className="bg-emerald-500/15 border border-emerald-400/40 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-md">
                  1 Practice Test
                </span>
              </div>

              {/* Title and Users */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1f2c4a]">
                  SAFe DevOps Practice Test
                </h3>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-base text-[#475569] font-semibold">52,000+ Participants</span>
                </div>
              </div>

              {/* Test Details */}
              <div className="flex items-center gap-8 mb-6 pb-6 border-b border-[#1f2c4a]/15">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base text-[#475569] font-medium">45 Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base text-[#475569] font-medium">2 hours</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="text-base text-[#475569] font-medium">English</span>
                </div>
                <button
                  onClick={() => setShowAssessmentModal(true)}
                  className="bg-white hover:bg-[#16243f] text-[#1f2c4a] font-medium px-8 py-3 rounded-lg transition-colors"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="w-full bg-black py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-[#d97706] mb-1">Get the SAFe DevOps Certification</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a]">SAFe DevOps Certificate</h2>
              <div className="flex gap-1">
                <svg className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Certificate Display */}
          <div className="rounded-2xl border border-[#1f2c4a]/15 overflow-hidden">
            <img
              src="/Devops_Certification.jpg"
              alt="SAFe DevOps Certificate"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-[#64748b] mb-2">SAFe DevOps Course FAQs</p>
            <h2 className="text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a]">FAQs on SAFe DevOps Certification Course</h2>
          </div>

          {/* FAQ Category Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[
              { id: "courses", label: "FAQ Courses" },
              { id: "exam", label: "FAQ Exam" },
              { id: "payment", label: "FAQ Payment" },
              { id: "generic", label: "FAQ Generic" }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveFaqCategory(category.id);
                  setExpandedFaqs([]);
                }}
                className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                  activeFaqCategory === category.id
                    ? "bg-[#1f2c4a] text-white"
                    : "liquid-glass border border-[#1f2c4a]/20 text-[#1f2c4a] hover:bg-[#1f2c4a] hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {(() => {
              const faqs = {
                courses: [
                  { q: "What if I miss a class? Are there any money back options?", a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. For questions, please email d.stevenson@agile36.com." },
                  { q: "If I want to know more about Training, whom should I connect with?", a: "You can reach out to our course advisors through the 'Contact Course Advisor' button on this page, or call our support team. We're available to answer any questions about the training program, schedules, and enrollment." },
                  { q: "Is there any option to complete the Training in the native language if a participant chooses to?", a: "Currently, our SAFe DevOps training is conducted in English. However, we do offer course materials in multiple languages. Please contact us to discuss your specific language requirements." },
                  { q: "Can I receive personalized Training at my convenience?", a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs and we'll work with you to create a customized schedule." },
                  { q: "Where do I find the upcoming schedules of my course?", a: "You can view all upcoming schedules by clicking the 'View Schedules' button on this page, or visit our course schedule page. Schedules are updated regularly and show both live virtual and in-person options." },
                  { q: "After enrollment, can I change the date of my training class?", a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com so they can be processed promptly." },
                  { q: "Do I get any certificate upon completion of the course?", a: "Yes, upon successful completion of the SAFe DevOps course and passing the certification exam, you'll receive the official SAFe DevOps (SDP) certificate from Scaled Agile, Inc." }
                ],
                exam: [
                  { q: "What is the format of the SAFe DevOps exam?", a: "The SAFe DevOps exam is a multiple-choice, open-book exam with 45 questions. You have 90 minutes to complete it, and you need to score 71% (32 out of 45) to pass." },
                  { q: "How long do I have to take the exam after completing the course?", a: "You have 30 days after course completion to take the exam online from anywhere." },
                  { q: "Is the exam included in the course fee?", a: "Yes, the exam fee is included with your course enrollment. There are no additional charges for taking the certification exam." },
                  { q: "Can I take the exam online?", a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course." },
                  { q: "What is the passing score for the SAFe DevOps exam?", a: "You need 71% or higher — answering at least 32 out of 45 questions correctly within the 30-day exam window." },
                  { q: "How do I renew my SAFe DevOps certification?", a: "The SAFe DevOps (SDP) certification is valid for one year. Annual renewal is $195 paid to Scaled Agile. You can renew by earning continuing education credits or taking advanced SAFe courses." }
                ],
                payment: [
                  { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers." },
                  { q: "Are there any installment payment options?", a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you." },
                  { q: "Is there a refund policy?", a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. For questions, please email d.stevenson@agile36.com." },
                  { q: "Do you offer discounts for group enrollments?", a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts." },
                  { q: "Are there any hidden fees?", a: "No, the course price includes all training materials, the certification exam, and one year of access to the SAFe Community Platform. There are no hidden fees." }
                ],
                generic: [
                  { q: "What is SAFe DevOps certification?", a: "SAFe DevOps is a comprehensive course that provides the knowledge and skills needed to effectively implement DevOps practices, build continuous delivery pipelines, and accelerate value delivery in a SAFe environment. It prepares you for the SAFe DevOps (SDP) certification exam." },
                  { q: "Who should take this course?", a: "This course is ideal for DevOps Engineers, Software Developers, Release Train Engineers, System Architects, IT Operations professionals, and anyone interested in implementing DevOps practices in a SAFe environment." },
                  { q: "What are the prerequisites for this course?", a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in software development, testing, or IT operations is recommended." },
                  { q: "How long is the course?", a: "The SAFe DevOps course is a 2-day intensive training program, totaling 16 hours of instruction." },
                  { q: "What materials are included?", a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam." },
                  { q: "Is this course available online?", a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you." },
                  { q: "How do I maintain my certification?", a: "The SAFe DevOps certification is valid for one year. You can renew it by earning continuing education credits or by taking advanced SAFe courses." }
                ]
              };

              return faqs[activeFaqCategory as keyof typeof faqs]?.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div
                    key={index}
                    className="border border-[#1f2c4a]/15 rounded-lg bg-[#1f2c4a]/[0.06] hover:bg-[#1f2c4a]/[0.1] transition-colors"
                  >
                    <button
                      onClick={() => {
                        setExpandedFaqs(
                          isExpanded
                            ? expandedFaqs.filter((i) => i !== index)
                            : [...expandedFaqs, index]
                        );
                      }}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-semibold text-[#1f2c4a] pr-4">
                        {index + 1}. {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 text-[#d97706] flex-shrink-0 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="pt-4 border-t border-[#1f2c4a]/20">
                          <p className="text-base text-[#475569] leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      <WhyAgile36Section />

      {/* SAFe Agilist Certification Section */}
      <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              SAFe DevOps Certification
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              There has been a significant increase in demand for the SAFe DevOps certification across the United States, as more organizations embrace DevOps practices and continuous delivery pipelines to enhance software development velocity and quality. Companies throughout the USA in sectors including technology, finance, healthcare, and manufacturing are actively recruiting SAFe certified DevOps engineers and practitioners who can implement continuous integration, continuous delivery, and DevOps practices within SAFe environments. These certified experts are highly valued for their expertise in building deployment pipelines, implementing infrastructure as code, automating testing and deployment, and fostering a culture of continuous improvement. The SAFe DevOps certification serves as a powerful differentiator in the competitive US job market, especially as organizations continue their digital transformation journeys.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              What Certifications Are Required for SAFe DevOps Certification Training?
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              No prior certification is required to enroll in SAFe DevOps Certification Training. However, having foundational knowledge of Agile principles, DevOps practices, continuous integration/continuous delivery (CI/CD), or software development experience can be beneficial for participants. The SAFe DevOps course prepares candidates for the SAFe DevOps (SDP) certification exam from Scaled Agile, Inc., covering continuous delivery pipeline, DevOps practices, automation, testing strategies, and deployment practices. The course is accessible to professionals at various stages of their DevOps journey.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              What Are Job Opportunities for SAFe DevOps Professionals?
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              SAFe DevOps professionals in the United States have excellent career prospects across various industries. Job opportunities include DevOps Engineer, Senior DevOps Engineer, Site Reliability Engineer (SRE), CI/CD Pipeline Engineer, and DevOps Architect roles. Companies in technology, finance, healthcare, and manufacturing sectors actively seek professionals with SAFe DevOps certification who can implement continuous delivery pipelines, automate deployment processes, improve software quality, and foster a culture of continuous improvement. The certification opens doors to leadership positions in DevOps transformation and engineering excellence roles.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-4">
              What is the Fee for SAFe DevOps Certification?
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              The cost of the SAFe DevOps certification course typically ranges from <strong>$599 to $1,398</strong>, depending on the specific course offerings and training provider. This investment includes two days of instructor-led training, comprehensive digital study materials, one exam attempt, and a one-year membership to the SAFe Community Platform provided by Scaled Agile, Inc. The pricing for SAFe DevOps certification training reflects the value of expert instruction, official materials, and ongoing community access that supports your professional development.
            </p>
          </div>
        </div>
      </section>

      {/* Find Leading SAFe Course in Cities Section */}
      <section className="w-full bg-[#1f2c4a]/[0.03] py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-[#64748b] mb-2 text-center">Courses based on location</p>
          <h2 className="text-2xl md:text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-8 text-center">
            Find SAFe DevOps Course in Other Top Cities
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              "New York",
              "Los Angeles",
              "Chicago",
              "Houston",
              "Phoenix",
              "Philadelphia",
              "San Antonio",
              "San Diego",
              "Dallas",
              "San Jose",
              "Austin",
              "Jacksonville",
              "Fort Worth",
              "Columbus",
              "Charlotte",
              "San Francisco",
              "Indianapolis",
              "Seattle",
              "Denver",
              "Washington",
              "Boston",
              "Nashville",
              "Oklahoma City",
              "Las Vegas",
              "Portland",
              "Miami",
              "Tampa",
              "Orlando",
              "Raleigh",
              "Baltimore"
            ].map((city) => {
              const citySlug = city.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={city}
                  href={`/devops-certification-training/${citySlug}`}
                  className="liquid-glass rounded-lg px-4 py-3 text-center hover:bg-[#1f2c4a]/[0.1] transition-all cursor-pointer"
                >
                  <span className="text-base text-[#1f2c4a] font-medium">{city}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free APM Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAssessmentModal(false);
                setAssessmentFormData({ name: "", email: "" });
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1f2c4a]/10 hover:bg-[#1f2c4a]/20 flex items-center justify-center z-10"
            >
              <span className="text-[#334155] text-xl">×</span>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Section - Course Promotion */}
              <div className="bg-gradient-to-br from-[#1f2c4a]/10 to-transparent p-8 md:w-2/5 flex flex-col justify-center">
                <div>
                  <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-3">
                    Ready to Master This Certification?
                  </h2>
                  <p className="text-base text-[#475569] mb-4">
                    Take your learning to the next level with our comprehensive training course.
                  </p>
                  <ul className="space-y-2 text-sm text-[#475569]">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span>
                      Live instructor-led sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span>
                      Official certification exam voucher
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span>
                      Lifetime access to course materials
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Section - Practice Test Form */}
              <div className="p-8 md:w-3/5">
                <h3 className="text-xl font-bold text-[#1f2c4a] mb-2">
                  Start Your Practice Test
                </h3>
                <p className="text-[#64748b] mb-6 text-sm">
                  Enter your details below to access the {examName}
                </p>
                <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="assessment-name"
                      className="block text-sm font-medium text-[#475569] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="assessment-name"
                      required
                      value={assessmentFormData.name}
                      onChange={(e) =>
                        setAssessmentFormData({ ...assessmentFormData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="assessment-email"
                      className="block text-sm font-medium text-[#475569] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="assessment-email"
                      required
                      value={assessmentFormData.email}
                      onChange={(e) =>
                        setAssessmentFormData({ ...assessmentFormData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                      placeholder="Enter your email address"
                    />
                    <p className="text-xs text-[#64748b] mt-1">
                      We'll send you the practice test link and course information
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1f2c4a] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-[#16243f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {isSubmitting ? 'Submitting...' : 'Start Practice Test'}
                  </button>

                  <div className="bg-[#1f2c4a]/[0.06] border border-[#1f2c4a]/15 rounded-lg p-3 mt-4">
                    <p className="text-xs text-[#334155] text-center">
                      💡 <strong>Interested in the full course?</strong> Explore upcoming dates on the course schedule when you're ready to enroll.
                    </p>
                  </div>

                  <p className="text-xs text-[#64748b] text-center">
                    ✔ By providing your contact details you agreed to our{" "}
                    <Link href="#" className="font-bold hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    &{" "}
                    <Link href="#" className="font-bold hover:underline">
                      Terms and Conditions.
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowConsultationModal(false)}
              className="absolute top-4 right-4 text-[#64748b] hover:text-[#1f2c4a]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-6">Get Course Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                    placeholder="Tell us about your requirements"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1f2c4a] text-white font-medium py-3 rounded-lg hover:bg-[#16243f] transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
