import type { Metadata } from 'next';
import Link from 'next/link';
import { CORPORATE_TERMS_EFFECTIVE_DATE } from '@/app/lib/corporate-terms';

export const metadata: Metadata = {
  title: 'Corporate Billing Terms & Conditions | Agile36',
  description:
    'Terms governing Agile36 Corporate Billing Accounts — authorization, payment, refunds, and employee registrations.',
};

export default function CorporateTermsPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#1f2c4a]">
      <div className="border-b border-[#1f2c4a]/10 bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link href="/corporate/onboard" className="text-sm font-medium text-[#64748b] hover:text-[#1f2c4a]">
            ← Back to corporate billing setup
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#d97706]">Legal</p>
          <h1 className="mt-2 text-3xl font-semibold" style={{ letterSpacing: '-0.03em' }}>
            Agile36 Corporate Training Account Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-[#64748b]">Effective date: {CORPORATE_TERMS_EFFECTIVE_DATE}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-8 text-[#475569] leading-relaxed">
          <p>
            These Terms &amp; Conditions govern the use of an Agile36 Corporate Billing Account
            (&quot;Corporate Account&quot;). By requesting a Corporate Account, the organization agrees to
            the following:
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">1. Corporate Billing Authorization</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                The organization authorizes Agile36 to charge the payment method on file for all eligible
                employee registrations made under the Corporate Account.
              </li>
              <li>
                The organization certifies that the individual establishing the account has the authority to
                authorize charges on behalf of the company.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">2. Authorized Participants</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                The organization is responsible for identifying who is authorized to register under the
                Corporate Account.
              </li>
              <li>
                Agile36 may require an approved company email domain or a pre-approved participant list as
                specified during account setup.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">3. Payment</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Payment is charged to the corporate payment method after an employee successfully registers.</li>
              <li>The organization is responsible for ensuring the payment method remains valid.</li>
              <li>
                If a payment is declined, Agile36 may suspend future registrations until payment is resolved.
              </li>
              <li>The organization remains responsible for any unpaid balances.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">4. Pricing</h2>
            <p className="mt-3">
              Employees are billed at the pricing agreed upon between Agile36 and the organization.
              Promotional pricing offered to the general public may not apply unless otherwise agreed in
              writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">5. Registration Changes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Participants may reschedule their training in accordance with Agile36&apos;s published
                rescheduling policy.
              </li>
              <li>
                Any applicable fees associated with late changes or transfers will be billed to the Corporate
                Account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">6. Cancellations &amp; Refunds</h2>
            <p className="mt-3">
              All registrations are subject to Agile36&apos;s current{' '}
              <Link href="/refund-policy" className="font-medium text-[#d97706] underline hover:no-underline">
                Cancellation and Refund Policy
              </Link>
              . Unless otherwise stated in a separate corporate agreement:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Eligible refunds are issued to the original corporate payment method.</li>
              <li>No-shows are non-refundable.</li>
              <li>Discounted registrations remain non-refundable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">7. Employee Separation</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                The organization is responsible for notifying Agile36 if an employee should no longer be
                authorized to register under the Corporate Account.
              </li>
              <li>The organization remains responsible for charges incurred prior to such notification.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">8. Payment Method Updates</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>The organization agrees to promptly notify Agile36 of any changes to the payment method on file.</li>
              <li>
                Failure to maintain a valid payment method may result in suspension or termination of the
                Corporate Account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">9. Taxes</h2>
            <p className="mt-3">Applicable taxes will be charged where required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">10. Account Suspension</h2>
            <p className="mt-3">Agile36 reserves the right to suspend or terminate a Corporate Account for:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Repeated payment failures</li>
              <li>Fraudulent activity</li>
              <li>Abuse of the Corporate Account</li>
              <li>Violation of these Terms &amp; Conditions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">11. Limitation of Liability</h2>
            <p className="mt-3">
              Agile36&apos;s liability is limited to the amount paid for the applicable training registration.
              Agile36 shall not be liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">12. Changes to Terms</h2>
            <p className="mt-3">
              Agile36 may update these Terms &amp; Conditions at any time. Updated terms apply to future
              registrations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">13. Governing Law</h2>
            <p className="mt-3">
              These Terms &amp; Conditions shall be governed by the laws of the State of Florida, without
              regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1f2c4a]">14. Acceptance</h2>
            <p className="mt-3">
              By submitting a Corporate Account request, the organization acknowledges that it has read and
              agrees to these Terms &amp; Conditions and authorizes Agile36 to charge the payment method on
              file for employee registrations made under the Corporate Account.
            </p>
          </section>

          <section className="rounded-xl border border-[#1f2c4a]/10 bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1f2c4a]">Corporate Account Contact</h2>
            <p className="mt-3">
              Agile36, LLC
              <br />
              Email:{' '}
              <a href="mailto:support@agile36.com" className="text-[#d97706] underline hover:no-underline">
                support@agile36.com
              </a>
              <br />
              Website:{' '}
              <a href="https://www.agile36.com" className="text-[#d97706] underline hover:no-underline">
                https://www.agile36.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
