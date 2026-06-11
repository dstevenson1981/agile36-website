import Link from "next/link";
import {
  BLOG_LEAD_AUTHOR_LINKEDIN,
  BLOG_LEAD_AUTHOR_NAME,
} from "@/app/lib/blog-author";

type Props = {
  /** Optional ISO or display date after "Updated" */
  updated?: string;
  className?: string;
  /** Default "Written by"; editorial posts often use "By". */
  verb?: "Written by" | "By";
};

export default function BlogAuthorByline({ updated, className, verb = "Written by" }: Props) {
  return (
    <p className={className ?? "text-base text-[#94a3b8] mb-10"}>
      {verb}{" "}
      <Link
        href={BLOG_LEAD_AUTHOR_LINKEDIN}
        className="font-semibold text-[#1f2c4a] hover:text-[#d97706] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {BLOG_LEAD_AUTHOR_NAME}
      </Link>
      {updated ? (
        <>
          {" "}
          · SAFe Silver Partner · Updated {updated}
        </>
      ) : (
        <> · SAFe Silver Partner</>
      )}
    </p>
  );
}
