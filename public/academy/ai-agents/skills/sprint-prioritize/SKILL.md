---
name: sprint-prioritize
description: Rank backlog items with RICE (Reach, Impact, Confidence, Effort). Use when choosing what ships this sprint or cutting scope.
---

# Sprint prioritize (RICE)

Score each candidate:

| Factor | Meaning |
|--------|---------|
| Reach | How many users / events in a period |
| Impact | 0.25–3 (minimal → massive) |
| Confidence | % you believe the estimates (as 0–1) |
| Effort | Person-weeks or relative points |

`Score = (Reach × Impact × Confidence) / Effort`

## Process

1. List candidates with one-line problem statements  
2. Score RICE with a one-line reason each  
3. Flag quick wins (high score, low effort)  
4. Map blockers / dependencies  
5. Propose a **cut line** for this sprint  
6. Explicitly kill or defer everything below the line  

## Output

```markdown
| Item | R | I | C | E | Score | Notes |
|------|---|---|---|---|-------|-------|
| … | | | | | | |

Cut line: ship above / defer below
Ships now: …
Deferred: …
Killed: … (why)
Blockers: …
```

## Rules

- No item without an owner and a success signal  
- Gut feel alone is not enough — write the confidence reason  
- If everything is P0, nothing is P0  
- For class labs with no data: use Must / Should / Could, still force a cut line
