import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | Agile36",
  description: "Agile36 Refund and Cancellation Policy - Learn about our refund, rescheduling, and no-show policies.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-[#1f2c4a]">
      {/* Header Section */}
      <div className="border-b border-[#1f2c4a]/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#64748b] mb-4">Legal</p>
          <h1 className="text-4xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>
            Refund and Cancellation Policy
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-none">
          {/* Refunds */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Refunds</h2>
            <div className="space-y-4 text-[#475569] leading-relaxed">
              <p>
                Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date.
              </p>
              <p>
                Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund.
              </p>
              <p>
                Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times.
              </p>
              <p>
                Classes rescheduled due to customer conflicts are not eligible for refunds.
              </p>
            </div>
          </section>

          {/* Rescheduling */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Rescheduling</h2>
            <div className="space-y-4 text-[#475569] leading-relaxed">
              <p>
                Participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time.
              </p>
              <p>
                All rescheduling requests must be submitted via email so they can be processed promptly.
              </p>
            </div>
          </section>

          {/* Provider-Initiated Rescheduling */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>
              Provider-Initiated Rescheduling
            </h2>
            <div className="space-y-4 text-[#475569] leading-relaxed">
              <p>
                If Agile36 reschedules a class, participants may attend the new date, transfer to another available session, or receive a course credit valid for 12 months.
              </p>
              <p>
                Participants who paid the full registration price may request a refund if they cannot attend the rescheduled date.
              </p>
              <p>
                Registrations purchased using a promotional code, coupon code, discounted price, special offer, or promotional rate remain non-refundable but may be transferred to another available session or converted into a course credit valid for 12 months.
              </p>
            </div>
          </section>

          {/* No Show Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>No-Show Policy</h2>
            <div className="space-y-4 text-[#475569] leading-relaxed">
              <p>
                Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid.
              </p>
              <p>
                No refunds, credits, or transfers are available for no-shows.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-12 liquid-glass rounded-2xl p-8">
            <h2 className="text-2xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>Contact Us</h2>
            <p className="text-[#475569] leading-relaxed mb-4">
              For questions regarding cancellations or rescheduling, please email:
            </p>
            <a
              href="mailto:d.stevenson@agile36.com"
              className="text-[#d97706] font-medium text-lg underline hover:no-underline"
            >
              d.stevenson@agile36.com
            </a>
            <p className="text-[#475569] leading-relaxed mt-4">
              We are here to support you and ensure a smooth registration experience.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
