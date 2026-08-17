---
name: results-page
description: Render a local HTML page of job results the human can open and click through.
---

# Skill: Results page

## Responsibility

Write a self-contained HTML file listing jobs with links, remote status, and fit scores.

## Must

- Output to `output/jobs.html` (openable in any browser — no server required).
- Include clickable posting URLs.
- Show remote label exactly as verified (`remote` / `hybrid` / `onsite` / `unverified`).
- Show gaps-first fit summary.

## Must not

- Host the page publicly or require login.
- Hide unverified remote status.

## Outputs

- `output/jobs.html`
