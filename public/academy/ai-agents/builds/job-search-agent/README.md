# Job Search Agent — Day 1 walkthrough

This is the **Day 1 foundation** for the No-Code AI Agents class. You are not shipping the full agent yet.

## Goal today

Leave class with:

1. A clear agent contract (`CLAUDE.md`)
2. Folder structure + skill stubs
3. Your resume + preferences on disk
4. The **copy-paste prompt** ready for Claude Code / Codex (`COPY-PASTE-PROMPT.md`)

You are **not** required to finish LinkedIn/Dice search, scoring, or the HTML results page today — those are later steps.

---

## Step 1 — Open this folder

In Claude Code or Codex, open:

`job-search-agent/` (this directory)

Read `CLAUDE.md` first.

---

## Step 2 — Copy the student prompt

Open **`COPY-PASTE-PROMPT.md`**. Copy the fenced prompt into a new agent chat.

Replace `[attach resume]` with your resume, **or** paste the resume into `context/resume.md` and tell the agent that file is the source of truth.

---

## Step 3 — Fill context (required before any search)

| File | What to put |
|------|-------------|
| `context/resume.md` | Full resume text |
| `context/preferences.md` | Target titles, keywords, deal-breakers |

If resume is still the placeholder, stop. Do not invent a persona.

---

## Step 4 — Understand the skills (stubs only)

Read each `skills/*/SKILL.md`. Today they define **responsibility**, not full automation.

| Skill | Later it will… |
|-------|----------------|
| `job-search` | Find LinkedIn + Dice jobs ≤ 7 days old |
| `remote-verify` | Confirm remote from posting text |
| `fit-scoring` | Score vs resume; gaps first |
| `tailor-materials` | Draft-only application copy |
| `application-tracker` | Update `tracker/applications.md` |
| `results-page` | Write `output/jobs.html` |

---

## Step 5 — What “done” looks like for Day 1

- [ ] `CLAUDE.md` matches the rules (LinkedIn + Dice, 7 days, remote verify, honest scoring, draft only)
- [ ] Resume + preferences filled
- [ ] You can explain what the agent **never** does
- [ ] You know which skill owns which step

---

## Later class steps (do not jump ahead unless asked)

1. Implement `job-search` + `remote-verify` for a small batch (e.g. 5 jobs).
2. Implement `fit-scoring` with gaps-first writeups.
3. Implement `results-page` → open `output/jobs.html` in a browser.
4. Implement `tailor-materials` + `application-tracker` for one job you choose.

---

## Hard rules (remind yourself)

- LinkedIn + Dice required.
- Last 7 days only.
- Remote only if the posting says so; else `unverified`.
- Never invent experience.
- Never submit or message recruiters — draft only.
- Prefer tools with **no API keys and no login**.
