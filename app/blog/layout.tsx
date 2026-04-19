import type { Metadata } from "next";
import type { ReactNode } from "react";
import BlogLayoutFooter from "@/app/components/BlogLayoutFooter";
import {
  BLOG_LEAD_AUTHOR_LINKEDIN,
  BLOG_LEAD_AUTHOR_NAME,
} from "@/app/lib/blog-author";

export const metadata: Metadata = {
  authors: [{ name: BLOG_LEAD_AUTHOR_NAME, url: BLOG_LEAD_AUTHOR_LINKEDIN }],
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BlogLayoutFooter />
    </>
  );
}
