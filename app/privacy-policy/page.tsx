import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Agile36",
  description: "Agile36 Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-[#1f2c4a]">
      {/* Header Section */}
      <div className="border-b border-[#1f2c4a]/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#64748b] mb-4">Legal</p>
          <h1 className="text-4xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>
            Privacy Policy
          </h1>
          <p className="text-xl text-[#64748b]">Effective Date: January 1, 2025</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-none">
          <p className="text-lg text-[#475569] leading-relaxed mb-8">
            At Agile36, we respect your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Information We Collect</h2>
            <p className="text-[#475569] leading-relaxed mb-4">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-[#475569] leading-relaxed space-y-2">
              <li>Name, email address, phone number, and company information</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Course enrollment and completion data</li>
              <li>Communications with our team</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>How We Use Your Information</h2>
            <p className="text-[#475569] leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-[#475569] leading-relaxed space-y-2">
              <li>Process course registrations and payments</li>
              <li>Deliver training materials and certifications</li>
              <li>Communicate about courses, schedules, and updates</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Information Sharing</h2>
            <p className="text-[#475569] leading-relaxed mb-4">
              We do not sell your personal information. We share your data only with:
            </p>
            <ul className="list-disc pl-6 text-[#475569] leading-relaxed space-y-2">
              <li>Payment processors (Stripe) to complete transactions</li>
              <li>Email service providers to send course communications</li>
              <li>Certification bodies as required for credential issuance</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Data Security</h2>
            <p className="text-[#475569] leading-relaxed">
              We implement industry-standard security measures to protect your information. However,
              no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Your Rights</h2>
            <p className="text-[#475569] leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-[#475569] leading-relaxed space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Cookies</h2>
            <p className="text-[#475569] leading-relaxed">
              We use cookies to improve your experience on our website. You can control cookie settings
              through your browser preferences.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Third-Party Links</h2>
            <p className="text-[#475569] leading-relaxed">
              Our website may contain links to third-party sites. We are not responsible for the privacy
              practices of these external sites.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Changes to This Policy</h2>
            <p className="text-[#475569] leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page with
              an updated effective date.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Contact Us</h2>
            <p className="text-[#475569] leading-relaxed mb-4">
              For questions about this Privacy Policy or to exercise your privacy rights, contact us at:
            </p>
            <a
              href="mailto:d.stevenson@agile36.com"
              className="text-[#d97706] font-medium text-lg underline hover:no-underline"
            >
              d.stevenson@agile36.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
