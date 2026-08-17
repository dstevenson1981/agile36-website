---
name: application-tracker
description: Track jobs found, drafted, and applied. Human confirms applied status.
---

# Skill: Application tracker

## Responsibility

Keep `tracker/applications.md` accurate.

## Must

- Add rows when jobs are found or drafted.
- Set `applied` only when the human says they submitted it themselves.
- Preserve URLs and remote/fit fields.

## Must not

- Mark `applied` automatically after drafting.
- Delete history without asking.

## Outputs

- Updated `tracker/applications.md`.
