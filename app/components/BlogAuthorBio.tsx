import Image from "next/image";
import Link from "next/link";

type Props = {
  articleCount: number;
};

export default function BlogAuthorBio({ articleCount }: Props) {
  const countLabel = `${articleCount.toLocaleString("en-US")} article${articleCount === 1 ? "" : "s"} published`;

  return (
    <section
      aria-labelledby="blog-author-heading"
      className="rounded-2xl liquid-glass p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-start">
        <div className="shrink-0 flex justify-center sm:justify-start">
          <Image
            src="/agile36-logo-final.png"
            alt="Agile36"
            width={88}
            height={88}
            className="h-[72px] w-[72px] sm:h-[88px] sm:w-[88px] object-contain"
          />
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2
            id="blog-author-heading"
            className="text-lg sm:text-xl font-normal text-[#1f2c4a]"
            style={{ letterSpacing: "-0.03em" }}
          >
            <Link
              href="/blog"
              className="underline decoration-[#1f2c4a]/30 underline-offset-2 hover:text-[#d97706] hover:decoration-[#d97706]"
            >
              Agile36
            </Link>
          </h2>
          <p className="mt-1 text-sm text-[#94a3b8]">{countLabel}</p>
          <p className="mt-4 text-sm sm:text-base text-[#64748b] leading-relaxed">
            Agile36 is a Scaled Agile Silver Partner. We help enterprises and professionals build real capability in
            SAFe, Scrum, and AI-enabled delivery—through expert-led training, practice-focused curriculum, and
            outcomes that stick after class ends.
          </p>
        </div>
      </div>
    </section>
  );
}
