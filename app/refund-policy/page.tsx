import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | Agile36",
  description: "Agile36 Refund and Cancellation Policy - Learn about our refund, rescheduling, and no-show policies.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#01203d] to-[#0a4a6e] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Refund and Cancellation Policy</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Refunds */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refunds</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Full refunds are available for cancellations submitted thirty (30) or more days before the scheduled class start date.
              </p>
              <p>
                Cancellations received within thirty (30) days of the class start date are not eligible for a refund.
              </p>
              <p>
                Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. If a coupon code or discounted rate was used and Agile36 reschedules the course on our end, a refund will not be issued; you will be moved to a future class date at no additional cost.
              </p>
            </div>
          </section>

          {/* Rescheduling */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rescheduling</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time.
              </p>
              <p>
                All rescheduling requests must be submitted via email so they can be processed promptly.
              </p>
            </div>
          </section>

          {/* No Show Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No-Show Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid.
              </p>
              <p>
                No refunds, credits, or transfers are available for no-shows.
              </p>
              <p>
                <strong>Late Arrival Policy:</strong> Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. No refunds, credits, or transfers are available for late arrivals that result in being locked out of the classroom.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-12 bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For questions regarding cancellations or rescheduling, please email:
            </p>
            <a 
              href="mailto:d.stevenson@agile36.com"
              className="text-[#fa4a23] hover:text-[#d43e1c] font-medium text-lg"
            >
              d.stevenson@agile36.com
            </a>
            <p className="text-gray-700 mt-4">
              We are here to support you and ensure a smooth registration experience.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
