export default function WhyAgile36Section() {
  const items = [
    {
      title: "SAFe Silver Partner",
      description: "Fully accredited by Scaled Agile, Inc. Our instructors are certified SAFe Program Consultants (SPCs) who meet Scaled Agile's rigorous standards.",
    },
    {
      title: "Fortune 100 Experience",
      description: "Our instructors have led real SAFe transformations at Fortune 100 companies. You're learning from practitioners who've done it at scale.",
    },
    {
      title: "20+ Years of Enterprise Training",
      description: "Agile36 has trained tens of thousands of professionals across the US and globally, with a proven track record of high first-attempt pass rates.",
    },
    {
      title: "4.9/5.0 Rating",
      description: "Based on 2,500+ verified Scaled Agile reviews from professionals who've completed our training.",
    },
    {
      title: "Exam Fee Included",
      description: "No surprises. Your first certification exam attempt is included in your course fee.",
    },
    {
      title: "Post-Training Support",
      description: "Access to practice exams, study materials, and instructor support before your exam date.",
    },
  ];

  return (
    <section className="w-full bg-black py-8 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d97706] mb-3">Why Agile36</p>
          <h2 className="text-2xl md:text-3xl font-normal text-[#1f2c4a] mb-4" style={{ letterSpacing: "-0.03em" }}>
            Why Choose Agile36 for SAFe Certification Training
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4 liquid-glass rounded-2xl p-6 transition-colors hover:bg-[#1f2c4a]/[0.1]">
              <div className="flex-shrink-0 w-10 h-10 bg-[#1f2c4a]/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#1f2c4a] mb-2">{item.title}</h3>
                <p className="text-base text-[#475569]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
