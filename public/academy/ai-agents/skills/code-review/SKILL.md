---
name: code-review
description: Review diffs for correctness, tests, security, and maintainability. Use after implementation before merge or handoff to QA.
---

# Code review

## Checklist

1. **Correctness** — Does it solve the stated problem? Edge cases?  
2. **Tests** — Fail path covered? Regressions guarded?  
3. **Security** — Authz, injection, secrets, unsafe HTML  
4. **Clarity** — Naming, dead code, unnecessary complexity  
5. **Consistency** — Matches project patterns  

## Feedback style

- Lead with blocking vs non-blocking  
- Suggest a fix, don't only criticize  
- Ask questions when intent is unclear  

## Output

```
Summary: …
Blocking:
- …
Non-blocking:
- …
Tests: …
```
