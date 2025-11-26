"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#01203d] to-[#000c18] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Training */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Training
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/courses" 
                  className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                >
                  View All Courses
                </Link>
              </li>
              <li>
                <Link 
                  href="/corporate" 
                  className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Corporate Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/#faq" 
                  className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  href="/refund-policy" 
                  className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Contact
            </h4>
            <a 
              href="mailto:d.stevenson@agile36.com" 
              className="text-base text-gray-400 hover:text-white transition-colors duration-200 inline-block"
            >
              d.stevenson@agile36.com
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 Agile36. All Rights Reserved.
            </p>
            <p className="text-sm text-gray-400">
              SAFe Silver Partner | Agile Training & AI Consulting
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}



