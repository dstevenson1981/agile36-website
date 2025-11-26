"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#01203d] text-white py-16 px-4 sm:px-6 lg:px-20 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/accreditation" className="hover:text-white transition-colors">
                  Accreditation
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Offerings</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/offerings/live-virtual" className="hover:text-white transition-colors">
                  Live virtual (Online)
                </Link>
              </li>
              <li>
                <Link href="/offerings/classroom" className="hover:text-white transition-colors">
                  Classroom (In-Person)
                </Link>
              </li>
              <li>
                <Link href="/offerings/corporate" className="hover:text-white transition-colors">
                  Corporate training
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-white transition-colors">
                  Training Schedule
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/test" className="hover:text-white transition-colors">
                  Practice Tests
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="hover:text-white transition-colors">
                  Webinars
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Get Our Weekly Newsletter</h4>
            <div className="flex gap-2 mb-4">
              <input 
                type="email" 
                placeholder="Email*" 
                className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-[#34595f] hover:bg-[#2a474c] text-white font-bold px-6 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-8 h-8 bg-gray-600 rounded hover:bg-gray-500 transition-colors flex items-center justify-center">
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-600 rounded hover:bg-gray-500 transition-colors flex items-center justify-center">
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-600 rounded hover:bg-gray-500 transition-colors flex items-center justify-center">
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-600 rounded hover:bg-gray-500 transition-colors flex items-center justify-center">
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
          <p>© 2024 Agile36. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}



