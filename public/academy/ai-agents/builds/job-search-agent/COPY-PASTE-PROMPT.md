# Day 1 — copy this entire prompt into Claude Code or Codex

Paste the block below into a new chat **after** you open this folder as the project root (`public/academy/ai-agents/builds/job-search-agent` locally, or download the build zip from class).

Replace `[attach resume]` with your real resume (or paste it into `context/resume.md` first and say “resume is in context/resume.md”).

---

```
I want to build a Job Search Agent.

It should find jobs that match my experience, score how well I fit each one against my resume, help me tailor my application materials, and track what I've applied to.

Build it in this folder. Start with the foundation, not the whole thing:

Define what the agent is responsible for — and what it should never do.
Identify what context it needs to know about me.
Identify the tools it needs. Prefer things that work with no API keys and no login.
Identify the skills to create.
Create the folder structure and CLAUDE.md.

Requirements:

Search LinkedIn and Dice, not just company job boards — that's where people actually look.
Only return jobs posted in the last 7 days.
I want remote roles. Don't trust a search filter to tell you a job is remote — verify it from the posting, and mark anything you can't confirm as "unverified" rather than claiming it's remote.
Output the results as a web page I can open and click through.
Score fit honestly. Never invent experience I don't have. Lead with the gaps.
Never submit an application or message a recruiter — draft only.

Here's my resume: [attach resume]

Walk me through it step by step. Don't build everything at once.
```

---

## After you paste

1. Point the agent at this folder (so it can see `CLAUDE.md`).
2. Put your resume in `context/resume.md` (or attach it in the chat).
3. Fill `context/preferences.md` with target titles and keywords.
4. Ask only for the **next** step in `README.md` — do not ask it to “finish the whole agent” on Day 1.
