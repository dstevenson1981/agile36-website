"use client";

import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Training",
    links: [
      { label: "View All Courses", href: "/courses" },
      { label: "AI Academy", href: "/academy" },
      { label: "Combo Courses", href: "/combo-courses" },
      { label: "Corporate Training", href: "/corporate" },
      { label: "Practice Tests", href: "/test" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "My Account", href: "/account" },
      { label: "FAQs", href: "/#faq" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-[#1f2c4a]/10 bg-black text-[#1f2c4a] mt-auto">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:pr-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/agile36-logo-header.png"
              alt="Agile36"
              className="h-9 w-auto"
              loading="lazy"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#64748b]">
              Live SAFe® and AI certification training from the coaches behind
              30+ enterprise transformations. Scaled Agile Silver Partner.
            </p>
            <div className="mt-6 space-y-1.5">
              <a
                href="tel:+13106207966"
                className="block text-sm text-[#475569] transition-colors hover:text-[#1f2c4a]"
              >
                (310) 620-7966
              </a>
              <p className="text-xs text-[#94a3b8]">Mon–Fri, 9AM–5PM EST</p>
              <a
                href="mailto:d.stevenson@agile36.com"
                className="block text-sm text-[#475569] transition-colors hover:text-[#1f2c4a]"
              >
                d.stevenson@agile36.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[#94a3b8]">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#64748b] transition-colors duration-200 hover:text-[#1f2c4a]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#1f2c4a]/10 py-8 md:flex-row">
          <p className="text-xs text-[#94a3b8]">
            © {new Date().getFullYear()} Agile36. All Rights Reserved.
          </p>
          <p className="text-xs text-[#94a3b8]">
            SAFe Silver Partner | Agile Training & AI Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
