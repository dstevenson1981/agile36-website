'use client';

import { useState } from 'react';

const STUDENT_PROMPT = `I want to build a Job Search Agent.

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

Walk me through it step by step. Don't build everything at once.`;

export default function CopyPastePrompt() {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(STUDENT_PROMPT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1f2c4a]/15 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] px-4 py-3 sm:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d97706]">
            Day 1 · Copy into Claude Code or Codex
          </p>
          <p className="mt-1 text-sm text-[#64748b]">
            Open the build folder first, then paste this prompt. Replace{' '}
            <code className="rounded bg-[#1f2c4a]/5 px-1 text-[12px] text-[#1f2c4a]">
              [attach resume]
            </code>{' '}
            with yours.
          </p>
        </div>
        <button
          type="button"
          onClick={copyPrompt}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1f2c4a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16243f]"
        >
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap p-4 text-[13px] leading-relaxed text-[#1f2c4a] sm:p-5">
        {STUDENT_PROMPT}
      </pre>
    </div>
  );
}
