#!/usr/bin/env python3
"""One-off: dark-theme the per-course Stripe PaymentForm components and the
combo checkout page (different quoting than the canonical course checkout)."""
import glob

PF_PAIRS = [
    ("flex-1 bg-[#fa4a23] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#e03d1a] transition-colors", "flex-1 bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"),
    ("flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors", "flex-1 px-6 py-3 border border-white/20 rounded-lg text-gray-300 font-medium hover:bg-white/10 transition-colors"),
    ("animate-spin h-5 w-5 text-white", "animate-spin h-5 w-5 text-black"),
    ("bg-red-50 border border-red-200 text-red-700", "bg-red-500/10 border border-red-500/30 text-red-300"),
    ("border-t border-gray-200 pt-6", "border-t border-white/15 pt-6"),
    ("font-semibold text-gray-900", "font-semibold text-white"),
    ("text-[#fa4a23]", "text-[#fbbf24]"),
    ("text-sm text-gray-600 text-center", "text-sm text-gray-400 text-center"),
]

COMBO_PAIRS = [
    ('"bg-[#fa4a23] text-white" : "bg-gray-200 text-gray-400"', '"bg-[#fbbf24] text-black" : "bg-white/10 text-gray-400"'),
    ("w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23]", "w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/50"),
    ("w-full bg-[#fa4a23] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#e03d1a]", "w-full bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-100"),
    ('colorPrimary: "#fa4a23", colorBackground: "#ffffff", colorText: "#1f2937"', 'colorPrimary: "#fbbf24", colorBackground: "#404e70", colorText: "#ffffff"'),
    ('theme: "stripe"', 'theme: "night"'),
    ("bg-[#fa4a23] text-white", "bg-[#fbbf24] text-black"),
    ("hover:bg-[#e03d1a]", "hover:bg-gray-100"),
    ("text-[#fa4a23]", "text-[#fbbf24]"),
    ("bg-gray-200 text-gray-400", "bg-white/10 text-gray-400"),
    ("bg-gray-50", "bg-white/[0.04]"),
    ("bg-white rounded-lg border border-gray-200", "rounded-2xl border border-white/15 bg-white/[0.06]"),
    ("text-gray-900", "text-white"),
    ("text-gray-700", "text-gray-300"),
    ("text-gray-600", "text-gray-400"),
    ("border border-gray-300", "border border-white/20"),
]

def apply(path, pairs):
    with open(path) as f:
        src = f.read()
    out = src
    hits = 0
    for old, new in pairs:
        n = out.count(old)
        if n:
            out = out.replace(old, new)
            hits += n
    if out != src:
        with open(path, "w") as f:
            f.write(out)
    print(f"{hits:4d}  {path}")

for p in sorted(glob.glob("app/courses/*/schedule/checkout/PaymentForm.tsx")):
    apply(p, PF_PAIRS)
for p in ["app/combo-courses/checkout/page.tsx"]:
    apply(p, COMBO_PAIRS)
