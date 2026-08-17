---
name: job-search
description: Find recent LinkedIn and Dice job listings that match preferences. Last 7 days only. No login automation.
---

# Skill: Job search

## Responsibility

Discover candidate jobs from **LinkedIn** and **Dice** using WebSearch / WebFetch (or human-pasted posting text when pages are blocked).

## Must

- Prefer LinkedIn + Dice over company-only boards.
- Only keep jobs posted in the **last 7 days** (exclude if date unknown unless human overrides).
- Record title, company, URL, source, posted date.
- Dedupe against `tracker/applications.md`.

## Must not

- Automate LinkedIn/Dice login.
- Invent postings.
- Claim remote here — hand off to `remote-verify`.

## Inputs

- `context/preferences.md`
- `context/resume.md` (for keywords only — scoring is a different skill)

## Outputs

- A short candidate list (markdown or JSON) for the next skills.
