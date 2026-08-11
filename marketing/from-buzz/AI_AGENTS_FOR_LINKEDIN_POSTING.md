---
title: "AI Agents for LinkedIn Posting: X and GitHub Scan"
tags: [linkedin, ai-agents, github, x, content-automation]
status: active
created: 2026-08-06
---

# Scope and access

Requested: identify X posts and GitHub skills/projects for AI agents that create LinkedIn posts.

- GitHub was searched live with `gh` for repositories and `SKILL.md` files using variants of `linkedin ai agent`, `linkedin content agent`, `linkedin posting`, and `linkedin content`.
- X could not be searched directly in this session: the X web search redirected to login, `xurl` is not installed/authenticated, and Google/Brave/DuckDuckGo search fallbacks were CAPTCHA-blocked. Bing's RSS fallback returned irrelevant results. No X post links are claimed below.
- “All” cannot be guaranteed for either platform because indexes are changing and repositories/posts may be private or unindexed. The GitHub section is a ranked, live-search shortlist.

# Best GitHub implementations

## 1. Animesh Jain — LinkedIn Content Agent

- Repository: <https://github.com/animeshjain-hue/linkedin-content-agent>
- Live GitHub metadata at scan: 1 star, 1 fork, MIT, last pushed 2026-05-07.
- Pipeline: RSS news ingestion → Ideator → Writer → Critic → Telegram human approval → Typefully scheduling.
- Strongest ideas: a persistent “Brand Brain” (SQLite, voice guide, topic weights), similarity checks against prior posts, voice-match evaluation, prompt versioning, and progressive autonomy rather than immediate auto-posting.
- Best overall reference for Agile36 because it treats voice, editorial quality, approval, and learning from engagement as first-class concerns.

## 2. Shrithu10 — LinkedIn Content Automation Agent

- Repository: <https://github.com/Shrithu10/linkedin-content-agent>
- Live GitHub metadata at scan: 2 stars, 0 forks, no detected license, last pushed 2026-04-02.
- Pipeline: YouTube URL → yt-dlp audio → local Whisper transcription → Ollama post writer → approval/edit → Playwright LinkedIn posting.
- Useful for repurposing webinars/classes/videos into LinkedIn content.
- Caution: browser automation with LinkedIn email/password is brittle and carries account/terms risk; the missing detected license also limits reuse without owner permission.

## 3. The Agharshit — n8n Human-in-the-loop Content Agent

- Repository: <https://github.com/theagharshit/linkedin-content-agent>
- Live GitHub metadata at scan: 0 stars, 0 forks, no detected license, last pushed 2026-01-31.
- Pipeline: webhook topic/audience → LLM copy and image prompt → generated image → email approval/feedback → regeneration → Google Sheets/Drive tracking.
- Useful as a low-code workflow model. It emphasizes editorial approval and asset lifecycle tracking.

## 4. Balamurugan Thiruganasammantham — Autonomous LinkedIn AI Agent

- Repository: <https://github.com/balamurugan-thiruganasammantham/linkedin-ai-agent>
- Live GitHub metadata at scan: 0 stars, 0 forks, MIT, last pushed 2026-03-20.
- Pipeline: eight RSS sources + Hacker News → recency/keyword scoring → local DistilBART summarization → media handling → scheduled LinkedIn UGC API publishing → URL deduplication.
- Useful for API-based publishing, local inference, scheduling, Docker deployment, health monitoring, and duplicate prevention.
- Caution: its “self-improving” claim is primarily a Claude-maintained file-memory system; the roadmap says engagement analytics are not yet implemented.

# Actual agent skills (SKILL.md)

## BizAI social-content skill

- Skill: <https://github.com/Rollandcodes/BizAI/blob/main/SKILL.md/skills/social-content/SKILL.md>
- Repository: <https://github.com/Rollandcodes/BizAI>
- Live GitHub metadata at scan: 0 stars, 1 fork, MIT, last pushed 2026-04-18.
- Covers audience/goals/voice discovery, content pillars, LinkedIn hooks, repurposing, calendars, engagement, analytics, and reverse-engineering high-performing content.
- Supporting files include LinkedIn platform guidance, post templates, and reverse-engineering methods.
- Best reusable writing/strategy skill found, but it is general social strategy rather than an autonomous posting system.

## Sai Skills — LinkedIn full-stack orchestrator

- Skill: <https://github.com/ziqi-lydia/sai-skills/blob/main/linkedin-full-stack/SKILL.md>
- Repository: <https://github.com/ziqi-lydia/sai-skills>
- Live GitHub metadata at scan: 1 star, 0 forks, no detected license, last pushed 2026-06-24.
- Orchestrates prospecting, outreach, creator content, profile optimization, and engagement activation.
- Includes daily routine, full-funnel, creator-growth, tracking-sheet schema, routing logic, approval rules, and action caps.
- The current repo tree contains `linkedin-full-stack`, `linkedin-activation`, `linkedin-b2b-prospecting`, and `linkedin-profile-optimizer`; although the orchestrator references `linkedin-creator-content`, that directory was not present in the live tree at scan time. Treat the suite as incomplete for standalone post creation.

# Other live-search leads

These matched the request but were less mature or less clearly documented:

- <https://github.com/GauriInTech/Linkedin-AI-Agent> — trend research and LinkedIn post generation.
- <https://github.com/XAlphaone/Linkedin-Ai-Agent> — Grok-based text and image generation.
- <https://github.com/Abhi-tech-geek/linkedin_ai_agent> — personalized long-form posts with human approval.
- <https://github.com/aliter42/linkedin-content-agent> — senior-PM briefs, ideas, hooks, hashtags, and repurposing.
- <https://github.com/blacksinisterx/Linkedin-Content-Agent> — local pipeline with research, SWOT, calendar, images, approval, and scheduling.
- <https://github.com/hurshitagupta/ai-linkedin-content-agent> — n8n + LLM topic-to-publish workflow.
- <https://github.com/Shrithu10/linkedin-content-agent> — strongest video-to-post example.

# Recommendation for Agile36

Use the architecture of Animesh Jain’s system, not a fully autonomous posting bot:

1. Build an Agile36 Brand Brain from approved posts, offers, proof points, forbidden phrases, audiences, and content lanes.
2. Ingest selected current sources plus Agile36 classes, transcripts, FAQs, and founder insights.
3. Generate two meaningfully different drafts.
4. Score voice fidelity, originality, claim support, hook quality, and promotional balance.
5. Require human approval in Buzz before scheduling.
6. Post through an approved API/scheduler where possible, not credential-based browser automation.
7. Capture impressions, meaningful comments, saves, profile visits, and leads; update strategy from evidence.

This combines the strongest pieces found: Brand Brain + evals (Animesh), video repurposing (Shrithu10), visual/approval lifecycle (Agharshit), API publishing/deduplication (Balamurugan), and reusable post strategy (BizAI).

# X next step

To complete the X portion with actual post URLs, configure the official `xurl` CLI with an X developer app and OAuth outside the agent session. Then search multiple variants such as:

- `"LinkedIn content agent"`
- `"LinkedIn posting agent"`
- `"AI agent" "LinkedIn posts"`
- `"automate LinkedIn" agent`
- `n8n LinkedIn AI agent`
- `CrewAI LinkedIn content`
- `LangGraph LinkedIn agent`

The final X pass should deduplicate reposts/threads, retain original posts, and record author, date, post URL, claimed stack, workflow, engagement metrics, and whether code is linked.

# Local related work

Agile36 already has a local Hermes skill at `~/.hermes/skills/social-media/agile36-linkedin-daily/SKILL.md`, which generates a researched post in the Agile36 voice and includes a Higgsfield image workflow. That is closer to the business need than most public GitHub examples, but it does not yet implement the stronger Brand Brain, evaluation, approval, analytics, and learning loop described above.
