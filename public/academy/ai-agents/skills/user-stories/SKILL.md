---
name: user-stories
description: Turn a PRD or problem into crisp user stories with Given/When/Then acceptance criteria and clear out-of-scope notes. Use when breaking work for engineering.
---

# User stories

## Format

```
As a [role],
I want [capability],
So that [outcome].

Acceptance criteria:
- Given … When … Then …
- Given … When … Then …

Out of scope:
- …

Notes for QA:
- …
```

## Quality bar

- One user + one outcome per story  
- Acceptance criteria are testable (no "feels fast")  
- Edge cases listed or deferred with a reason  
- Complexity as S/M/L or points — not hours  

## Anti-patterns

- Stories that are really epics ("build checkout")  
- Criteria that describe UI chrome instead of behavior  
- Missing failure paths (errors, empty states, permissions)
