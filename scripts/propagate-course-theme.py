#!/usr/bin/env python3
"""One-off: propagate the dark-theme class substitutions from the canonical
leading-safe course + schedule pages (already restyled) to the sibling course
directories. Ordered, literal replacement — unmatched pairs are no-ops."""
import glob

PAIRS = [
    ("min-h-screen bg-gray-50", "min-h-screen bg-black text-white"),
    ("min-h-screen bg-white", "min-h-screen bg-black text-white"),
    ("w-full bg-white border-b border-gray-200", "w-full bg-black border-b border-white/10"),
    ("w-full bg-white py-12 px-4 sm:px-6 lg:px-20", "w-full bg-black py-12 px-4 sm:px-6 lg:px-20"),
    ("w-full bg-white py-8 px-4 sm:px-6 lg:px-20", "w-full bg-black py-8 px-4 sm:px-6 lg:px-20"),
    ("w-full bg-white py-6 px-4 sm:px-6 lg:px-20", "w-full bg-black py-6 px-4 sm:px-6 lg:px-20"),
    ("w-full bg-blue-50 border-t-4 border-blue-600 py-8 px-4 sm:px-6 lg:px-20", "w-full bg-white/[0.03] border-t border-white/10 py-8 px-4 sm:px-6 lg:px-20"),
    ("w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-20", "w-full bg-white/[0.03] py-12 px-4 sm:px-6 lg:px-20"),
    ("w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-20", "w-full bg-white/[0.03] py-8 px-4 sm:px-6 lg:px-20"),
    ("w-full bg-gradient-to-b from-[#d3edff52] to-transparent py-8 px-4 sm:px-6 lg:px-20", "w-full bg-black py-8 px-4 sm:px-6 lg:px-20"),
    ("mb-3 text-4xl font-bold leading-[1.08] text-gray-900 sm:text-5xl md:text-6xl lg:text-[3.35rem] md:mb-4", "mb-3 text-4xl font-normal tracking-[-0.03em] leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-[3.35rem] md:mb-4"),
    ("mb-4 text-lg font-semibold text-gray-700 md:mb-5 md:text-xl", "mb-4 text-lg font-medium text-gray-300 md:mb-5 md:text-xl"),
    ("bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full", "liquid-glass text-white text-sm font-medium px-4 py-1 rounded-full"),
    ("flex items-center gap-2 rounded-lg border-2 border-green-500 bg-green-50 px-3 py-2 sm:px-4", "flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 sm:px-4"),
    ("text-sm font-bold text-green-700", "text-sm font-bold text-emerald-300"),
    ("px-6 py-3 border-2 border-[#fa4a23] text-[#fa4a23] font-semibold rounded-md hover:bg-[#fa4a23] hover:text-white transition-colors flex items-center gap-2", "px-6 py-3 liquid-glass border border-white/20 text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2"),
    ("px-6 py-3 bg-[#fa4a23] text-white font-bold rounded-md hover:bg-[#e03d1a] transition-colors inline-block text-center", "px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors inline-block text-center"),
    ("px-6 py-3 border-2 border-[#0e78c2] text-[#0e78c2] font-bold rounded-md hover:bg-[#0e78c2] hover:text-white transition-colors", "px-6 py-3 liquid-glass border border-white/20 text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors"),
    ("bg-white border-2 border-gray-200 p-6 rounded-lg", "liquid-glass p-6 rounded-2xl"),
    ("block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-lg transition-all", "block p-6 liquid-glass rounded-2xl transition-all hover:bg-white/[0.1]"),
    ("border-l-4 border-orange-500 pl-6 py-2", "border-l-2 border-[#fbbf24] pl-6 py-2"),
    ("text-orange-500 font-bold text-xl", "text-[#fbbf24] font-bold text-xl"),
    ("w-20 h-20 rounded-full bg-gradient-to-b from-[#d3edff99] to-transparent flex items-center justify-center mb-4", "w-20 h-20 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center mb-4"),
    ("border border-gray-200 rounded-lg p-6", "rounded-2xl border border-white/15 bg-white/[0.06] p-6"),
    ("bg-blue-50 border-l-4 border-[#006f] p-6 my-6", "bg-white/[0.06] border-l-2 border-[#fbbf24] p-6 my-6"),
    ("w-16 h-16 bg-[#fa4a23] rounded-full flex items-center justify-center mx-auto mb-4", "w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"),
    ("w-8 h-8 text-white", "w-8 h-8 text-[#fbbf24]"),
    ("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300", "border-transparent text-gray-400 hover:text-white hover:border-white/40"),
    ("bg-white border-2 border-blue-200 rounded-xl p-8 shadow-lg", "liquid-glass rounded-2xl p-8"),
    ("bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md", "bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-sm font-semibold px-4 py-1.5 rounded-md"),
    ("bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-bold px-8 py-3 rounded-lg transition-colors", "bg-white hover:bg-gray-100 text-black font-medium px-8 py-3 rounded-lg transition-colors"),
    ("text-sm text-[#01203d] mb-1", "text-sm text-[#fbbf24] mb-1"),
    ("w-4 h-4 text-blue-400", "w-4 h-4 text-[#fbbf24]"),
    ("bg-white border border-blue-200 rounded-lg overflow-hidden", "rounded-2xl border border-white/15 overflow-hidden"),
    ("bg-blue-600 text-white", "bg-white text-black"),
    ("bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50", "liquid-glass border border-white/20 text-white hover:bg-white hover:text-black"),
    ("border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors", "border border-white/15 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] transition-colors"),
    ("text-3xl font-bold text-[#01203d] mb-12 text-center", "text-3xl font-normal tracking-[-0.03em] text-white mb-12 text-center"),
    ("text-2xl md:text-3xl font-bold text-[#01203d] mb-8 text-center", "text-2xl md:text-3xl font-normal tracking-[-0.03em] text-white mb-8 text-center"),
    ("text-2xl font-bold text-[#01203d] mb-4", "text-2xl font-normal tracking-[-0.03em] text-white mb-4"),
    ("text-xl font-bold text-[#006f] mb-4", "text-xl font-bold text-white mb-4"),
    ("text-4xl font-bold text-gray-900", "text-4xl font-normal tracking-[-0.03em] text-white"),
    ("text-3xl font-bold text-gray-900", "text-3xl font-normal tracking-[-0.03em] text-white"),
    ("text-2xl font-bold text-gray-900", "text-2xl font-normal tracking-[-0.03em] text-white"),
    ("fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"),
    ("bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative", "bg-[#404e70] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"),
    ("bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative", "bg-[#404e70] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"),
    ("absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center z-10", "absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10"),
    ("text-gray-600 text-xl", "text-gray-200 text-xl"),
    ("absolute top-4 right-4 text-gray-500 hover:text-gray-700", "absolute top-4 right-4 text-gray-400 hover:text-white"),
    ("bg-gradient-to-br from-[#fffef2] to-[#ffe5d9] p-8 md:w-2/5 flex flex-col justify-center", "bg-gradient-to-br from-white/10 to-transparent p-8 md:w-2/5 flex flex-col justify-center"),
    ("bg-white rounded-lg p-4 mb-4 border-2 border-[#fa4a23]", "bg-white/10 rounded-lg p-4 mb-4 border border-[#fbbf24]/50"),
    ("w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent", "w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-white/50 focus:outline-none"),
    ("w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa4a23]", "w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-white/50 focus:outline-none"),
    ("w-full bg-gradient-to-r from-[#fa4a23] to-[#e03d1a] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed", "w-full bg-white text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"),
    ("bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4", "bg-white/[0.06] border border-white/15 rounded-lg p-3 mt-4"),
    ("text-xs text-blue-800 text-center", "text-xs text-gray-200 text-center"),
    ("w-full bg-[#fa4a23] text-white font-bold py-3 rounded-md hover:bg-[#e03d1a] transition-colors", "w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-100 transition-colors"),
    ("w-full bg-[#fa4a23] hover:bg-[#e03d1a] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed", "w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"),
    ("bg-gray-100 text-gray-700 hover:bg-gray-200", "bg-white/10 text-gray-300 hover:bg-white/20"),
    ("bg-[#fa4a23] text-white", "bg-[#fbbf24] text-black"),
    ("bg-white text-[#fa4a23] px-2 py-0.5 rounded text-xs", "bg-black text-white px-2 py-0.5 rounded text-xs"),
    ("text-sm text-gray-600 mb-1", "text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-1"),
    ("bg-white rounded-lg border border-gray-200 p-6", "liquid-glass rounded-2xl p-6"),
    ("text-blue-600 font-semibold text-sm", "text-blue-400 font-semibold text-sm"),
    ("text-center py-12 bg-white rounded-lg", "text-center py-12 liquid-glass rounded-2xl"),
    ("bg-[#01203d] hover:bg-[#023a5e] text-white font-bold px-8 py-3 rounded-lg transition-colors", "liquid-glass border border-white/20 text-white font-medium px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors"),
    ("bg-white border border-gray-200 rounded-lg px-4 py-3 text-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer", "liquid-glass rounded-lg px-4 py-3 text-center hover:bg-white/[0.1] transition-all cursor-pointer"),
    ("hover:text-[#01203d]", "hover:text-white"),
    ("text-[#01203d]", "text-gray-200"),
    ("text-[#fa4a23]", "text-[#fbbf24]"),
    ("border-[#fa4a23]", "border-[#fbbf24]"),
    ("text-blue-600", "text-[#fbbf24]"),
    ("text-green-600", "text-emerald-400"),
    ("text-yellow-400", "text-[#fbbf24]"),
    ("text-gray-900", "text-white"),
    ("text-gray-800", "text-gray-200"),
    ("text-gray-700", "text-gray-300"),
    ("text-gray-600", "text-gray-400"),
    ("text-gray-500", "text-gray-400"),
    ("border-gray-200", "border-white/15"),
    ("border-gray-300", "border-white/20"),
    ("bg-gray-50", "bg-white/[0.06]"),
]

targets = sorted(
    glob.glob("app/courses/*/page.tsx")
    + glob.glob("app/courses/*/schedule/page.tsx")
    + ["app/combo-courses/schedule/page.tsx"]
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
