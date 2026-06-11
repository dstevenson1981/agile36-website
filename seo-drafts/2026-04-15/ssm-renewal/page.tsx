import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSM Certification Renewal: How to Maintain Your SAFe Scrum Master Credential | Agile36",
  description:
    "SSM certification renewal explained: how long the credential lasts, what PDUs are required, and how to renew your SAFe Scrum Master certification before it expires.",
  keywords: ["SSM renewal", "SAFe Scrum Master renewal", "SSM certification renewal", "SSM PDUs", "renew SAFe Scrum Master", "SSM certification expiry"],
  openGraph: {
    title: "SSM Certification Renewal: How to Maintain Your SAFe Scrum Master Credential",
    description: "How to renew your SSM certification, how long it lasts, and what PDUs you need.",
    url: "https://www.agile36.com/blog/ssm-renewal",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/ssm-renewal" },
};

function BlogHeroDots() {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
      </div>
    </>
  );
}

function ExecutiveSummary() {
  return (
    <section aria-label="At a glance" className="bg-gray-50 border-l-4 border-[#01203d] p-6 md:p-8 my-10 rounded-r-lg">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#01203d] font-bold mb-4">At a glance</p>
      <ul className="space-y-3 text-gray-800 text-[17px] leading-relaxed">
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SAFe certifications, including the SSM, expire after <strong>one year</strong>. You must renew annually to maintain your active certification status and keep the credential on your profile.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Renewal requires <strong>20 PDUs (Professional Development Units)</strong> and a $100 renewal fee paid to Scaled Agile. PDUs can be earned through training, conferences, SAFe community participation, and agile practice.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The most efficient way to renew: <strong>attend a SAFe course</strong> (like SASM or Leading SAFe), which earns 16 PDUs and advances your certification level at the same time.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>You can renew up to <strong>90 days before your expiration date</strong>. Renewing early extends your credential from the original expiration date, not from when you renew — so there&apos;s no benefit to waiting until the last minute.</span></li>
      </ul>
    </section>
  );
}

function RenewalTimeline() {
  const steps = [
    { day: "Day 1", event: "SSM certification earned", color: "bg-green-500" },
    { day: "Month 9", event: "Renewal window opens (90 days before expiry)", color: "bg-blue-500" },
    { day: "Month 12", event: "Certification expires if not renewed", color: "bg-red-500" },
    { day: "Renewal", event: "20 PDUs + $100 fee → renewed for another year", color: "bg-[#01203d]" },
  ];
  return (
    <section aria-label="SSM renewal timeline" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SSM Certification Lifecycle</h3>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.day} className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${s.color} flex-shrink-0`} />
            <span className="text-sm font-bold text-gray-600 w-24 flex-shrink-0">{s.day}</span>
            <p className="text-sm text-gray-700">{s.event}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution: string }) {
  return (
    <blockquote className="border-l-4 border-yellow-400 pl-6 md:pl-8 my-12">
      <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug italic">{children}</p>
      <footer className="text-sm text-gray-600 mt-3 not-italic">— {attribution}</footer>
    </blockquote>
  );
}

function KeyTakeaways() {
  return (
    <section aria-label="Key takeaways" className="bg-[#01203d] text-white rounded-xl p-8 md:p-10 my-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold mb-6">Key takeaways</p>
      <ol className="space-y-5">
        {[
          "Set a calendar reminder at month 9 post-certification. The renewal window opens 90 days before expiry — don't let it slip to the last week. Renewing under time pressure usually means paying for a course you didn't plan for.",
          "If you let the certification expire, you don't have to retake the exam — but you do pay a late renewal fee. Scaled Agile allows expired certifications to be renewed within a grace period, typically 30 days after expiration.",
          "The most strategic way to earn renewal PDUs: take the next certification in your career path. SASM earns 16 PDUs toward SSM renewal AND advances your credential level. Two outcomes from one investment.",
          "PDU sources beyond formal training include: webinars, conference sessions, SAFe Community Platform contributions, and agile practice logged as professional development. Keep records throughout the year, not just before renewal.",
          "Employers who require active SAFe certification check expiry dates. An expired SSM on a resume or LinkedIn profile signals lack of ongoing professional development — worth the $100 annual renewal investment.",
        ].map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="text-yellow-400 font-bold text-lg min-w-[28px]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[17px] leading-relaxed text-gray-100">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function SsmRenewalPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SSM Certification Renewal: How to Maintain Your SAFe Scrum Master Credential
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SSM Certification Renewal</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Certification Guide · 6 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SSM Certification Renewal: How to Maintain Your SAFe Scrum Master Credential
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Every SAFe certification — including the SSM — requires annual renewal. The renewal process is straightforward: 20 PDUs and a $100 renewal fee paid to Scaled Agile. What catches practitioners off guard is the one-year expiry timeline, which is shorter than some other certifications. If you earned your{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification</Link>{" "}
            and haven&apos;t thought about renewal yet, this guide covers everything you need to know.
          </p>

          <ExecutiveSummary />

          <RenewalTimeline />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How to Earn 20 PDUs for SSM Renewal</h2>
          <div className="space-y-3 my-6">
            {[
              { source: "SAFe course attendance", pdu: "16 PDUs per course", notes: "SSM, SASM, Leading SAFe, RTE, or LPM — any SAFe course earns 16 PDUs" },
              { source: "SAFe Community Platform", pdu: "Variable", notes: "Articles, discussions, and contributions on the community platform earn PDUs" },
              { source: "Agile conferences", pdu: "1 PDU per hour", notes: "Attending sessions at Agile Alliance, PMI, or SAFe Summit earns PDUs" },
              { source: "Webinars and virtual learning", pdu: "1 PDU per hour", notes: "SAFe webinars, Agile Alliance virtual events, other professional development" },
              { source: "Agile practice documentation", pdu: "Variable", notes: "Documented professional practice can count — check Scaled Agile guidelines for logging" },
            ].map((item) => (
              <div key={item.source} className="flex gap-3 bg-gray-50 rounded-xl p-4 items-start">
                <span className="font-bold text-[#01203d] text-sm min-w-[200px] flex-shrink-0">{item.source}</span>
                <div>
                  <p className="text-sm font-semibold text-yellow-700 mb-1">{item.pdu}</p>
                  <p className="text-sm text-gray-600">{item.notes}</p>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="SSM-certified Scrum Master, telecommunications">
            I treated renewal as a career development forcing function. Each year I use it as a reason to take the next SAFe course I&apos;ve been considering. I got my SASM in year two, which earned my SSM renewal PDUs and gave me a credential upgrade at the same time. The $100 renewal fee is a rounding error compared to the salary differential.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What happens if my SSM expires?</p>
              <p className="text-lg text-gray-700">Your certification status changes from active to expired on the Scaled Agile community profile. You can still renew within a short grace period (typically 30 days) with a higher late renewal fee. After the grace period, you would need to retrain to reinstate the certification. Most practitioners renew before expiry to avoid this.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I have to renew all my SAFe certifications separately?</p>
              <p className="text-lg text-gray-700">Yes — each SAFe certification renews independently, each with its own annual fee. Practitioners with multiple SAFe certifications (SSM, SASM, SA) pay for each separately. This is one reason practitioners often choose to let lower-level certifications lapse when they&apos;ve advanced to higher credentials.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I renew my SSM with a different SAFe course, like Leading SAFe?</p>
              <p className="text-lg text-gray-700">Yes — any SAFe course earns 16 PDUs that can be applied toward SSM renewal. Leading SAFe, SASM, RTE, POPM, and LPM all count. This makes renewal an opportunity to advance your SAFe knowledge while maintaining your existing credentials.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does my employer pay for SSM renewal?</p>
              <p className="text-lg text-gray-700">Many do — the $100 annual fee is modest relative to the credential value. Employers who require active SAFe certification for a role typically cover renewal. If yours doesn&apos;t and you need to cover it yourself, it&apos;s a deductible professional development expense in many jurisdictions.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Where do I go to renew my SSM?</p>
              <p className="text-lg text-gray-700">Log in to your account at scaledagile.com, navigate to your certification profile, and initiate the renewal from there. You&apos;ll need to log your PDUs (Scaled Agile reviews them) and pay the $100 renewal fee. The system notifies you when your renewal window opens.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Use Renewal as a Career Development Moment</p>
            <p className="mb-5">SASM training earns 16 renewal PDUs for your SSM and advances your certification level in a single course.</p>
            <Link href="/courses/advanced-scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SASM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/ssm-pass-rate" className="text-[#01203d] underline hover:no-underline">SSM pass rate</Link>
            {" · "}
            <Link href="/blog/ssm-exam-tips" className="text-[#01203d] underline hover:no-underline">SSM exam tips</Link>
            {" · "}
            <Link href="/blog/safe-advanced-scrum-master-vs-ssm" className="text-[#01203d] underline hover:no-underline">SASM vs SSM comparison</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
