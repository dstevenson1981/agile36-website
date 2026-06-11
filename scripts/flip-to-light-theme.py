#!/usr/bin/env python3
"""Flip the dark graphite theme to the light theme (pale blue-white bg, navy
text, deep-amber accents) across all themed files. Ordered literal pairs —
longest/most-specific first. Unmatched pairs are no-ops."""
import glob

NAVY = "#1f2c4a"

PAIRS = [
    # --- composite buttons/chips first (order matters) ---
    ("bg-[#fbbf24] text-black", "bg-[#d97706] text-white"),
    ("bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black",
     f"bg-[{NAVY}] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"),
    ("bg-white text-black", f"bg-[{NAVY}] text-white"),
    ("hover:bg-white hover:text-black", f"hover:bg-[{NAVY}] hover:text-white"),
    ("group-hover:bg-white group-hover:text-black", f"group-hover:bg-[{NAVY}] group-hover:text-white"),
    ("hover:bg-gray-100", "hover:bg-[#16243f]"),
    ("text-black", "text-white"),
    # --- logos: invert filter would vanish on light bg ---
    ("brightness-0 invert", "grayscale"),
    # --- accents: amber too pale on light, deepen; status colors darken ---
    ("hover:text-amber-300", "hover:text-[#b45309]"),
    ("#fbbf24", "#d97706"),
    ("#404e70", "#ffffff"),
    ("text-emerald-300", "text-emerald-700"),
    ("text-emerald-400", "text-emerald-600"),
    ("text-green-400", "text-green-700"),
    ("text-green-300", "text-green-700"),
    ("border-green-400", "border-green-600"),
    ("text-red-300", "text-red-600"),
    ("text-red-400", "text-red-600"),
    ("text-blue-400", "text-blue-600"),
    # --- core inversion ---
    ("text-white", f"text-[{NAVY}]"),
    ("white/", f"[{NAVY}]/"),
    ("placeholder-gray-400", "placeholder-[#94a3b8]"),
    ("text-gray-200", "text-[#334155]"),
    ("text-gray-300", "text-[#475569]"),
    ("text-gray-400", "text-[#64748b]"),
    ("text-gray-500", "text-[#94a3b8]"),
]

FILES = sorted(set(
    glob.glob("app/components/home/*.tsx")
    + ["app/components/Header.tsx", "app/components/Footer.tsx",
       "app/components/BlogHub.tsx", "app/components/BlogAuthorBio.tsx",
       "app/components/BlogConsultationCta.tsx", "app/components/BlogLayoutFooter.tsx",
       "app/components/blog/BlogAuthorByline.tsx",
       "app/components/WhyAgile36Section.tsx", "app/components/CourseHeroSocialProof.tsx",
       "app/components/CourseHeroRightColumn.tsx", "app/components/CourseHeroPriceScheduleCta.tsx"]
    + glob.glob("app/courses/**/*.tsx", recursive=True)
    + glob.glob("app/combo-courses/page.tsx")
    + glob.glob("app/combo-courses/schedule/page.tsx")
    + ["app/corporate/page.tsx", "app/about/page.tsx", "app/contact/page.tsx",
       "app/testimonials/page.tsx", "app/test/page.tsx",
       "app/blog/page.tsx", "app/blog/[slug]/page.tsx",
       "app/safe-certifications/page.tsx", "app/privacy-policy/page.tsx",
       "app/refund-policy/page.tsx", "app/[slug]/page.tsx",
       "app/account/login/page.tsx", "app/account/signup/page.tsx",
       "app/account/forgot-password/page.tsx", "app/account/reset-password/page.tsx",
       "app/auth/confirm/page.tsx"]
    + glob.glob("app/*certification-training/[[]city[]]/LocationPageClient.tsx")
))

total = 0
for path in FILES:
    try:
        src = open(path).read()
    except (FileNotFoundError, IsADirectoryError):
        continue
    out = src
    hits = 0
    for old, new in PAIRS:
        n = out.count(old)
        if n:
            out = out.replace(old, new)
            hits += n
    if out != src:
        open(path, "w").write(out)
        total += hits
        print(f"{hits:4d}  {path}")
print("TOTAL:", total, "replacements in", len(FILES), "candidate files")
