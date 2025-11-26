"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0); // Carousel state
  const practiceTests = [
    {
      id: 1,
      name: "Leading SAFe Practice Test | SAFe Agilist Mock",
      icon: "/Leading SAFe.png",
      badge: "/test-assets/ffceb9da-1494-452c-91a1-889dd8e99146.png",
      freeTests: "1 Free Test",
      users: "5K+ Users",
      rating: "5.0",
      enrolled: "5K+ enrolled",
      language: "English",
    },
    {
      id: 2,
      name: "Lean Portfolio Management Practice Test",
      icon: "/Lean Portfolio.png",
      badge: "/test-assets/0e7aa2d2-915a-4fa9-8e7b-b1e5dd9b67ad.png",
      freeTests: "1 Free Test",
      users: "3K+ Users",
      rating: "5.0",
      enrolled: "3K+ enrolled",
      language: "English",
    },
    {
      id: 3,
      name: "SAFe Product Owner/Product Manager Practice Test",
      icon: "/POPM.jpg",
      badge: "/test-assets/24e904e5-55b4-4208-b0ff-9eec2d803ae9.png",
      freeTests: "1 Free Test",
      users: "4K+ Users",
      rating: "5.0",
      enrolled: "4K+ enrolled",
      language: "English",
    },
    {
      id: 4,
      name: "SAFe Scrum Master Practice Test",
      icon: "/SSM.jpeg",
      badge: "/test-assets/6a7a67ac-3a02-46ef-b183-069a456e10b0.png",
      freeTests: "1 Free Test",
      users: "6K+ Users",
      rating: "5.0",
      enrolled: "6K+ enrolled",
      language: "English",
    },
    {
      id: 5,
      name: "SAFe DevOps Practice Test",
      icon: "/Devops.png",
      badge: "/test-assets/6a7a67ac-3a02-46ef-b183-069a456e10b0.png",
      freeTests: "1 Free Test",
      users: "3.5K+ Users",
      rating: "5.0",
      enrolled: "3.5K+ enrolled",
      language: "English",
    },
    {
      id: 6,
      name: "SAFe Agile Product Management Practice Test",
      icon: "/AgileProductManagment.png",
      badge: "/test-assets/6a7a67ac-3a02-46ef-b183-069a456e10b0.png",
      freeTests: "1 Free Test",
      users: "2.5K+ Users",
      rating: "5.0",
      enrolled: "2.5K+ enrolled",
      language: "English",
    },
    {
      id: 7,
      name: "SAFe for Teams Practice Test",
      icon: "/SAFe for Teams.png",
      badge: "/test-assets/6a7a67ac-3a02-46ef-b183-069a456e10b0.png",
      freeTests: "1 Free Test",
      users: "4K+ Users",
      rating: "5.0",
      enrolled: "4K+ enrolled",
      language: "English",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-white to-[#fffef2] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#01203d]">Home</Link>
                <span>/</span>
                <span>Practice Test</span>
              </div>

              {/* Main Heading */}
              <div className="mb-6">
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
                  Practice Tests That Get You Certified
                </h1>
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-4">
                  Real exam-style questions with detailed explanations to boost your confidence
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-8">
                Get hands-on experience with our curated practice tests that mirror actual certification exams. Track your progress, understand key concepts, and walk into your exam with confidence.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: "/test-assets/020d084a-ea08-4ee4-bdeb-362918463401.png",
                    text: "Practice with Real Exam-Style Questions",
                  },
                  {
                    icon: "/test-assets/dcc0c7f5-5fdd-45af-aed2-f335115c8d1b.png",
                    text: "Expert-Curated Content Aligned with Latest Exam Formats",
                  },
                  {
                    icon: "/test-assets/04772de8-36d7-4f68-8b61-b182f0bbc427.png",
                    text: "Detailed Explanations for Every Answer",
                  },
                  {
                    icon: "/test-assets/d4760c33-063e-4065-99e6-b3c267f711d7.png",
                    text: "Immediate Results and Performance Analytics",
                  },
                  {
                    icon: "/test-assets/f2381108-479d-406c-b880-c8f7fe319f9c.png",
                    text: "Review Incorrect Answers to Strengthen Weak Areas",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 flex-shrink-0">
                      <Image
                        src={feature.icon}
                        alt=""
                        width={16}
                        height={16}
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/test-assets/c9102ecb-2319-4c35-92d1-3b3bde72b3a0.png"
                    alt="Rating"
                    width={92}
                    height={44}
                  />
                  <span className="font-semibold">4.8/5</span>
                </div>
                <div className="w-px h-10 bg-black"></div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/test-assets/edb1c5aa-a39e-4eee-877e-296e1fd1f366.png"
                    alt="Rating"
                    width={87}
                    height={43}
                  />
                  <span className="font-semibold">4.9/5</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => {
                  document.getElementById('practice-tests')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold uppercase px-8 py-3 rounded flex items-center gap-2 transition-colors"
              >
                Get started
                <Image
                  src="/test-assets/d6df18b9-65da-4815-9cc5-9242a2aa7fcd.png"
                  alt=""
                  width={12}
                  height={11}
                />
              </button>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <Image
                src="/Exampic.png"
                alt="Practice Tests"
                width={600}
                height={624}
                className="w-full max-w-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Focused Learning Journey */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Your Path to Certification Success
          </h2>
          <div className="bg-[#fffef2] rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "/test-assets/44c539b2-9e25-4c01-8027-872b21c64c39.png",
                  title: "Increase Your Exam Readiness",
                  description: "Regular practice helps minimize test anxiety and builds preparedness.",
                },
                {
                  icon: "/test-assets/a2a8630c-2d0a-4fe9-9154-e96243f9a438.png",
                  title: "Flexible Study Schedule",
                  description: "Take practice tests whenever you want, on any device, around the clock.",
                },
                {
                  icon: "/test-assets/13e9a11c-fb43-4e04-b29d-667109e0b71c.png",
                  title: "Learn at Your Own Pace",
                  description: "Study when and where it works best for you, at a comfortable speed.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border-r border-gray-200 last:border-r-0 pr-6 last:pr-0"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={53}
                    height={55}
                    className="flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Test Series */}
      <section id="practice-tests" className="w-full py-16 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Popular Practice Test Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {practiceTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  {/* Icon Section */}
                  <div className="relative h-28 mb-4 flex items-center justify-center">
                    <Image
                      src={test.badge}
                      alt=""
                      width={71}
                      height={85}
                      className="absolute top-0 left-0 z-10"
                    />
                    <Image
                      src={test.icon}
                      alt={test.name}
                      width={70}
                      height={70}
                      className="relative z-20 mt-6"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-center font-bold text-gray-900 mb-4 text-sm">
                    {test.name}
                  </h3>

                  {/* Badge and Users */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-[#6ecd2b] to-[#25cd71] text-white text-xs font-semibold px-3 py-1 rounded">
                      {test.freeTests}
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/test-assets/1aafa2fd-6344-4c8c-9322-ed09455b423f.png"
                        alt=""
                        width={25}
                        height={13}
                      />
                      <span className="text-xs font-semibold text-gray-900">
                        {test.users}
                      </span>
                    </div>
                  </div>

                  {/* Rating, Enrolled, Language */}
                  <div className="flex items-center justify-center gap-4 text-xs mb-4">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/test-assets/6174ddd7-c8a1-435e-8519-09e53ed77b39.png"
                        alt=""
                        width={14}
                        height={14}
                      />
                      <span className="font-semibold text-gray-900">
                        {test.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#ff5a47]">●</span>
                      <span className="font-semibold text-gray-900">
                        {test.enrolled}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/test-assets/764d0e70-d685-4135-b38a-7ff358f5357f.png"
                        alt=""
                        width={17}
                        height={10}
                      />
                      <span className="font-semibold text-blue-600">
                        {test.language}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 pt-4">
                    <button
                      onClick={() => {
                        setSelectedTest(test.name);
                        setShowModal(true);
                      }}
                      className="w-full bg-gradient-to-r from-[#fa4a23] to-[#e03d1a] text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Start Test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learners Reviews Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Learners Reviews
          </h2>
          
          <div className="relative">
            {/* Reviews Carousel - Updated 2024 */}
            <div className="overflow-hidden">
              <div className="flex">
                {[
                  {
                    id: 1,
                    name: "Angela Davis",
                    title: "Project Manager",
                    review: "I'm happy to share that I've obtained a new certification: Certified SAFe® 6 Scrum Master from SAFe by Scaled Agile, Inc.! Thanks a lot to Agile36 for the excellent training and support throughout the journey. The practice tests were incredibly helpful in preparing for the exam.",
                    certification: "Certified SAFe® 6 Scrum Master",
                    linkedin: "#",
                    image: "/Images/Frame 1.png"
                  },
                  {
                    id: 2,
                    name: "Amber Jones",
                    title: "Release Train Engineer",
                    review: "I'm happy to share that I've obtained a new certification: Certified SAFe® 6 Release Train Engineer from SAFe by Scaled Agile, Inc.! The comprehensive practice tests and expert guidance from Agile36 made all the difference. Highly recommend their training programs!",
                    certification: "Certified SAFe® 6 Release Train Engineer",
                    linkedin: "#",
                    image: "/Images/image 120.png"
                  },
                  {
                    id: 3,
                    name: "Tiffany Henderson",
                    title: "Agile Coach",
                    review: "I'm thrilled to announce that I have officially earned the Professional Scrum Master 1 (PSM 1) certification from Scrum.org via Agile36. The practice tests were spot-on and helped me identify my weak areas. Thank you for the amazing learning experience!",
                    certification: "Professional Scrum Master 1 (PSM 1)",
                    linkedin: "#",
                    image: "/Images/image 137.png"
                  }
                ].map((review, index) => (
                  <div key={review.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full relative">
                      {/* LinkedIn Icon */}
                      <a 
                        href={review.linkedin}
                        className="absolute top-4 right-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      
                      {/* Profile Picture */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image 
                            src={review.image} 
                            alt={review.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{review.name}</h3>
                          <p className="text-sm text-gray-600">{review.title}</p>
                        </div>
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-gray-700 mb-4 line-clamp-4">
                        {review.review}
                      </p>
                      
                      {/* Read More Link */}
                      <button className="text-[#fa4a23] text-sm font-semibold underline mb-4 hover:text-[#e03d1a] transition-colors">
                        Read More
                      </button>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Practice Test Access Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                setFormData({ name: "", email: "" });
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center z-10"
            >
              <span className="text-gray-600 text-xl">×</span>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Section - Course Promotion */}
              <div className="bg-gradient-to-br from-[#fffef2] to-[#ffe5d9] p-8 md:w-2/5 flex flex-col justify-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Ready to Master This Certification?
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Take your learning to the next level with our comprehensive training course.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#fa4a23]">
                    <p className="text-sm font-semibold text-[#fa4a23] mb-1">
                      🎯 Special Offer
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      $50 Off Full Course Enrollment
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Live instructor-led sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Official certification exam voucher
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Lifetime access to course materials
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Section - Practice Test Form */}
              <div className="p-8 md:w-3/5">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Start Your Practice Test
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Enter your details below to access the {selectedTest}
                </p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    
                    // Store email in Supabase
                    try {
                      const response = await fetch('/api/store-email', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          name: formData.name,
                          email: formData.email,
                          source: 'Practice Test Page',
                          exam_name: selectedTest
                        }),
                      });

                      if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        console.error('Failed to store email:', errorData);
                        // Continue anyway - don't block user from taking test
                      }
                    } catch (error) {
                      console.error('Error storing email:', error);
                      // Continue anyway - don't block user from taking test
                    }
                    
                    // Redirect to practice exam based on selected test
                    if (selectedTest.includes("Leading SAFe")) {
                      router.push("/test/leading-safe");
                    } else if (selectedTest.includes("Lean Portfolio Management")) {
                      router.push("/test/lean-portfolio-management");
                    } else if (selectedTest.includes("Scrum Master")) {
                      router.push("/test/scrum-master");
                    } else if (selectedTest.includes("Product Owner") || selectedTest.includes("Product Manager")) {
                      router.push("/test/product-owner-manager");
                    } else if (selectedTest.includes("DevOps")) {
                      router.push("/test/devops");
                    } else if (selectedTest.includes("Agile Product Management")) {
                      router.push("/test/agile-product-management");
                    } else if (selectedTest.includes("for Teams")) {
                      router.push("/test/safe-for-teams");
                    } else {
                      // For other tests, just close modal for now
                      setShowModal(false);
                      setFormData({ name: "", email: "" });
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send you the practice test link and course information
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#fa4a23] to-[#e03d1a] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
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
                    Start Practice Test
                  </button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                    <p className="text-xs text-blue-800 text-center">
                      💡 <strong>Interested in the full course?</strong> We'll send you exclusive enrollment details and special pricing after you complete the practice test.
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 text-center">
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

      {/* Footer */}
      <footer className="w-full bg-[#01203d] text-white py-16 px-4 sm:px-6 lg:px-20 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>About us</li>
                <li>Accreditation</li>
                <li>Careers</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Offerings</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Live virtual (Online)</li>
                <li>Classroom (In-Person)</li>
                <li>Corporate training</li>
                <li>Training Schedule</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Practice Tests</li>
                <li>Webinars</li>
                <li>Blogs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Get Our Weekly Newsletter</h4>
              <div className="flex gap-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Email*" 
                  className="flex-1 px-4 py-2 rounded-md text-gray-900"
                />
                <button className="bg-[#34595f] hover:bg-[#2a474c] text-white font-bold px-6 py-2 rounded-md">
                  Subscribe
                </button>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
            <p>© 2024 Agile36. All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
