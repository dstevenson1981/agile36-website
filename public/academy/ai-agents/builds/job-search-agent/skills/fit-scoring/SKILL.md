---
name: fit-scoring
description: Score job fit against the real resume. Gaps first. Never invent experience.
---

# Skill: Fit scoring

## Responsibility

Compare each verified job to `context/resume.md` and produce an honest fit writeup.

## Must

- Lead with **gaps** (missing years, skills, domain, credentials).
- Then list **matches** grounded in resume lines.
- Give a simple score (e.g. 1–10) with one-sentence rationale.
- Quote or paraphrase requirements; do not invent resume bullets to close gaps.

## Must not

- Fabricate employers, titles, metrics, or skills.
- Soften gaps to make the candidate look stronger.

## Outputs

- Per job: score, gaps[], matches[], recommendation (`pursue` / `stretch` / `skip`).
