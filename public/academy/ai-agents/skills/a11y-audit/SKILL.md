---
name: a11y-audit
description: Audit UI against WCAG 2.2 A/AA — scan, fix, verify. Use when checking accessibility before handoff or release.
---

# Accessibility audit

## Scan → Fix → Verify

1. **Scan** — headings order, labels, alt text, contrast, keyboard traps, ARIA misuse  
2. **Fix** — framework-appropriate patches; prefer semantic HTML over ARIA  
3. **Verify** — re-test keyboard-only and one screen reader path if available  

## Severity

| Level | Examples |
|-------|----------|
| Critical | Can't complete task with keyboard; missing name on control |
| Major | Contrast fail on body text; broken focus order |
| Minor | Redundant ARIA; suboptimal heading skips |

## Report

- Count by severity  
- Top fixes with before/after  
- Residual risk  

Condensed for class labs from common a11y-audit skill patterns (MIT community skills).
