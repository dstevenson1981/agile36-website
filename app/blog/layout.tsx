import type { ReactNode } from "react";
import BlogLayoutFooter from "@/app/components/BlogLayoutFooter";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BlogLayoutFooter />
    </>
  );
}
