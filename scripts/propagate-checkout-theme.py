#!/usr/bin/env python3
"""One-off: propagate the dark-theme class substitutions from the canonical
leading-safe checkout (already restyled) to the sibling course checkouts.
Ordered, fixed-string replacement — unmatched pairs are no-ops."""
import glob
import os

PAIRS = [
    ("min-h-screen bg-gray-50 flex items-center justify-center", "min-h-screen bg-black flex items-center justify-center"),
    ("min-h-screen bg-gray-50", "min-h-screen bg-black text-white"),
    ("border-b-2 border-[#fa4a23]", "border-b-2 border-[#fbbf24]"),
    ("'bg-[#fa4a23] text-white' : 'bg-gray-200 text-gray-600'", "'bg-[#fbbf24] text-black' : 'bg-white/10 text-gray-400'"),
    ("bg-[#fa4a23] text-white flex items-center justify-center font-bold", "bg-[#fbbf24] text-black flex items-center justify-center font-bold"),
    ("px-6 py-3 bg-[#fa4a23] text-white font-bold rounded-lg hover:bg-[#e03d1a] transition-colors", "px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"),
    ("px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors", "px-6 py-3 border border-white/20 rounded-lg text-gray-300 font-medium hover:bg-white/10 transition-colors"),
    ("w-4 h-4 text-[#fa4a23] focus:ring-[#fa4a23]", "w-4 h-4 accent-[#fbbf24]"),
    ("w-12 h-0.5 bg-gray-300", "w-12 h-0.5 bg-white/20"),
    ("bg-white rounded-lg border border-gray-200", "rounded-2xl border border-white/15 bg-white/[0.06]"),
    ('<h2 className="text-xl font-bold text-gray-900">', '<h2 className="text-xl font-normal text-white tracking-[-0.03em]">'),
    ("text-3xl font-bold text-gray-900 mb-4", "text-3xl font-normal text-white tracking-[-0.03em] mb-4"),
    ("text-lg font-bold text-gray-900", "text-lg font-medium text-white"),
    ("w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent", "w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/50"),
    ("flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#fa4a23] disabled:bg-gray-100 disabled:cursor-not-allowed", "flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed"),
    ("bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900", "bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-100"),
    ("animate-spin h-5 w-5 text-white", "animate-spin h-5 w-5 text-black"),
    ("bg-gray-800 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed", "bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"),
    ("'border-green-500 bg-green-50'", "'border-green-400 bg-green-500/10'"),
    ("'border-orange-500 bg-orange-50'", "'border-[#fbbf24] bg-[#fbbf24]/10'"),
    ("'border-gray-200 hover:border-gray-300'", "'border-white/15 hover:border-white/30'"),
    ("? 'border-green-500' : 'border-gray-300'", "? 'border-green-400' : 'border-white/30'"),
    ("? 'border-orange-500' : 'border-gray-300'", "? 'border-[#fbbf24]' : 'border-white/30'"),
    ("w-3 h-3 rounded-full bg-green-500", "w-3 h-3 rounded-full bg-green-400"),
    ("w-3 h-3 rounded-full bg-orange-500", "w-3 h-3 rounded-full bg-[#fbbf24]"),
    ("bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded", "bg-[#fbbf24] text-black text-xs font-bold px-2 py-1 rounded"),
    ("bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded", "bg-[#fbbf24]/15 text-[#fbbf24] text-xs font-semibold px-2 py-1 rounded"),
    ("bg-red-50 border border-red-200", "bg-red-500/10 border border-red-500/30"),
    ("bg-green-50 border border-green-200", "bg-green-500/10 border border-green-500/30"),
    ("text-gray-400 hover:text-gray-600", "text-gray-400 hover:text-white"),
    ("text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded", "text-xs font-semibold text-gray-300 bg-white/10 px-2 py-1 rounded"),
    ("w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50", "w-8 h-8 border border-white/20 rounded flex items-center justify-center hover:bg-white/10"),
    ("bg-gray-50 rounded-lg", "bg-white/[0.04] border border-white/10 rounded-lg"),
    ("border-t pt-4", "border-t border-white/15 pt-4"),
    ("border-t pt-3", "border-t border-white/15 pt-3"),
    ("text-[#fa4a23]", "text-[#fbbf24]"),
    ("text-gray-700", "text-gray-300"),
    ("text-gray-600", "text-gray-400"),
    ("text-gray-500", "text-gray-400"),
    ("text-gray-900", "text-white"),
    ("text-green-600", "text-green-400"),
    ("text-green-700", "text-green-300"),
    ("bg-green-100", "bg-green-500/15"),
    ("text-red-700", "text-red-300"),
    ("text-red-600", "text-red-300"),
    ("hover:text-red-800", "hover:text-red-200"),
    ("text-red-500", "text-red-400"),
    ("theme: 'stripe',", "theme: 'night',"),
    ("colorPrimary: '#fa4a23',", "colorPrimary: '#fbbf24',"),
    ("colorBackground: '#ffffff',", "colorBackground: '#404e70',"),
    ("colorText: '#1f2937',", "colorText: '#ffffff',"),
]

targets = sorted(
    glob.glob("app/courses/*/schedule/checkout/page.tsx")
    + glob.glob("app/courses/*/schedule/checkout/success/page.tsx")
    + glob.glob("app/combo-courses/checkout/page.tsx")
    + glob.glob("app/combo-courses/checkout/success/page.tsx")
)
targets = [t for t in targets if "leading-safe" not in t]

for path in targets:
    with open(path) as f:
        src = f.read()
    out = src
    hits = 0
    for old, new in PAIRS:
        n = out.count(old)
        if n:
            out = out.replace(old, new)
            hits += n
    if out != src:
        with open(path, "w") as f:
            f.write(out)
    print(f"{hits:4d}  {path}")
