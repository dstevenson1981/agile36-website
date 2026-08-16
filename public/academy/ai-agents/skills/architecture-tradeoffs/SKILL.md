---
name: architecture-tradeoffs
description: Make and record engineering trade-offs before coding complex features. Use when choosing libraries, data models, or system boundaries.
---

# Architecture tradeoffs

## Process

1. Restate the problem and constraints (time, team, scale)  
2. List 2–3 viable options  
3. Compare: complexity, risk, reversibility, ops cost  
4. Recommend one with explicit "why not" for others  
5. Note follow-ups / ADRs if needed  

## Output

```
Decision: …
Context: …
Options: A / B / C
Choice: … because …
Consequences: …
Revisit when: …
```

## Rules

- Prefer boring technology when stakes are high  
- Optimize for change later unless requirements demand otherwise  
- Don't gold-plate a class prototype — call what's temporary
