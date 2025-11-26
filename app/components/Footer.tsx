"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#01203d] text-white py-16 px-4 sm:px-6 lg:px-20 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Training */}
          <div>
            <h4 className="font-bold mb-4">Training</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  View All Courses
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-white transition-colors">
                  Corporate Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <a 
              href="mailto:d.stevenson@agile36.com" 
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              d.stevenson@agile36.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
          <p>© 2025 Agile36 | SAFe Silver Partner | Agile Training & Consulting</p>
        </div>
      </div>
    </footer>
  );
}



