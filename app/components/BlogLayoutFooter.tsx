import { getPublishedArticleCount } from "@/app/lib/blog-editorial";
import BlogAuthorBio from "@/app/components/BlogAuthorBio";
import BlogConsultationCta from "@/app/components/BlogConsultationCta";

export default async function BlogLayoutFooter() {
  const articleCount = await getPublishedArticleCount();

  return (
    <div className="border-t border-[#1f2c4a]/10 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <BlogConsultationCta />
          <BlogAuthorBio articleCount={articleCount} />
        </div>
      </div>
    </div>
  );
}
