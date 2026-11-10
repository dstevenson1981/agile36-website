'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ScrumSkill } from '@/app/lib/academy/scrum-master-skills';

const FILES = '/skills/scrum-master';

type CopyState = 'idle' | 'done' | 'failed';

type CopySource = string | (() => Promise<string>);

type CopyHook = {
  state: CopyState;
  copy: (source: CopySource) => void;
  manual: string | null;
  closeManual: () => void;
};

function useCopy(): CopyHook {
  const [state, setState] = useState<CopyState>('idle');
  const [manual, setManual] = useState<string | null>(null);
  const copy = (source: CopySource) => {
    let value: string | Promise<string> = '';
    const done = () => {
      setState('done');
      setTimeout(() => setState('idle'), 1800);
    };
    // Clipboard refused (locked-down browser): show the text so people can copy it by hand.
    const fail = () => {
      Promise.resolve(value).then(
        (t) => (t ? setManual(t) : setState('failed')),
        () => setState('failed'),
      );
      setTimeout(() => setState('idle'), 2500);
    };
    try {
      value = typeof source === 'string' ? source : source();
      if (typeof value === 'string') {
        navigator.clipboard.writeText(value).then(done, fail);
        return;
      }
      // Safari only allows clipboard writes started inside the click, so hand it a pending item.
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard.write) {
        const pending = value;
        const item = new ClipboardItem({
          'text/plain': pending.then((t) => new Blob([t], { type: 'text/plain' })),
        });
        navigator.clipboard.write([item]).then(done, () => pending.then((t) => navigator.clipboard.writeText(t)).then(done, fail));
      } else {
        value.then((t) => navigator.clipboard.writeText(t)).then(done, fail);
      }
    } catch {
      fail();
    }
  };
  return { state, copy, manual, closeManual: () => setManual(null) };
}

function ManualCopy({ text, onClose, filename }: { text: string; onClose: () => void; filename?: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Copy the text"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1f2c4a]/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col gap-3 rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#1f2c4a]">
            Your browser blocked automatic copying. Press Ctrl+C (⌘C on a Mac) to copy.
          </p>
          <button type="button" onClick={onClose} className="shrink-0 text-sm font-semibold text-[#64748b] hover:text-[#1f2c4a]">
            Close
          </button>
        </div>
        <textarea
          id="manual-copy-text"
          readOnly
          autoFocus
          value={text}
          onFocus={(e) => e.currentTarget.select()}
          className="min-h-[50vh] w-full flex-1 resize-none rounded-lg border border-[#1f2c4a]/15 bg-[#f8fafc] p-3 font-mono text-xs text-[#1f2c4a]"
        />
        {filename ? (
          <p className="text-xs text-[#64748b]">
            Or{' '}
            <a href={filename} download className="font-semibold text-[#1f2c4a] hover:underline">
              download SKILL.md
            </a>{' '}
            instead.
          </p>
        ) : null}
      </div>
    </div>
  );
}

const label = (state: CopyState, idle: string) =>
  state === 'done' ? 'Copied' : state === 'failed' ? 'Copy failed' : idle;

const btn =
  'inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#1f2c4a]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#1f2c4a] transition hover:border-[#1f2c4a]/35 hover:bg-[#1f2c4a]/[0.03]';
const btnPrimary =
  'inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#1f2c4a] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#16243f]';

export function CopyCommand({ command }: { command: string }) {
  const c = useCopy();
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl bg-[#1f2c4a] px-4 py-3 text-white">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs">{command}</code>
      <button
        type="button"
        onClick={() => c.copy(command)}
        className="shrink-0 rounded-md border border-white/25 px-3 py-1 text-xs font-semibold hover:border-white/60"
      >
        {label(c.state, 'Copy')}
      </button>
      {c.manual !== null && <ManualCopy text={c.manual} onClose={c.closeManual} />}
    </div>
  );
}

const TOOLS = [
  {
    id: 'claude-app',
    name: 'Claude app',
    sub: 'claude.ai, desktop, mobile',
    steps: [
      <>On the skill&apos;s card, click <b>Download .zip</b>. Don&apos;t unzip it.</>,
      <>In Claude, open <b>Settings → Capabilities</b> and make sure <b>Code execution and file creation</b> is on.</>,
      <>Under <b>Skills</b>, click <b>Upload skill</b> and choose the .zip.</>,
      <>Start a new chat and ask in your own words, for example &ldquo;Plan our Sprint Review.&rdquo; Claude uses the skill when it fits.</>,
    ],
    note: "Don't see Skills in Settings? Your plan may not include them, or on a Team or Enterprise plan an admin may need to turn them on.",
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    sub: 'terminal or desktop app',
    steps: [
      <>Click <b>Download .zip</b> and unzip it. You get a folder named after the skill, with SKILL.md inside.</>,
      <>Move that folder into <code className="font-mono text-xs">~/.claude/skills/</code> (create the folder if it doesn&apos;t exist).</>,
      <>Start a new Claude Code session. The skill loads on its own when your request matches.</>,
    ],
    note: 'Or install every skill at once with the one-line command below.',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    sub: 'VS Code',
    steps: [
      <>Click <b>Copilot file</b> to download <code className="font-mono text-xs">&lt;skill&gt;.prompt.md</code>.</>,
      <>In your repository, put it in <code className="font-mono text-xs">.github/prompts/</code> (create the folder if needed).</>,
      <>In Copilot Chat, type <code className="font-mono text-xs">/</code> and the skill name, for example <code className="font-mono text-xs">/sprint-review</code>, then add your request.</>,
    ],
    note: 'Prompt files need VS Code with GitHub Copilot Chat. Your organization may need to allow them.',
  },
  {
    id: 'chat',
    name: 'ChatGPT, Gemini, others',
    sub: 'any chat assistant',
    steps: [
      <>Click <b>Copy SKILL.md</b> on the skill&apos;s card.</>,
      <>Start a new chat, paste it, and add: &ldquo;Use these instructions for this conversation.&rdquo; Then ask your question.</>,
      <>To keep it: paste it into a custom GPT&apos;s instructions, a Gemini Gem, or a ChatGPT Project&apos;s instructions.</>,
    ],
    note: 'Custom GPT instructions are limited to 8,000 characters. For a longer skill, save SKILL.md as a file and upload it to the GPT as knowledge instead.',
  },
];

export function HowToAddSkills() {
  const [tab, setTab] = useState(TOOLS[0].id);
  const active = TOOLS.find((t) => t.id === tab) ?? TOOLS[0];
  return (
    <div>
      <div role="tablist" aria-label="Choose your AI tool" className="grid gap-2 sm:grid-cols-4">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            id={`howto-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={t.id === tab}
            aria-controls={`howto-panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`rounded-xl border px-4 py-3 text-left transition ${
              t.id === tab
                ? 'border-[#1f2c4a] bg-[#1f2c4a] text-white'
                : 'border-[#1f2c4a]/12 bg-white text-[#1f2c4a] hover:border-[#1f2c4a]/30'
            }`}
          >
            <span className="block text-sm font-semibold">{t.name}</span>
            <span className={`block text-xs ${t.id === tab ? 'text-white/70' : 'text-[#64748b]'}`}>{t.sub}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`howto-panel-${active.id}`}
        aria-labelledby={`howto-tab-${active.id}`}
        className="mt-5 rounded-2xl border border-[#1f2c4a]/10 bg-[#f8fafc] p-5 sm:p-6"
      >
        <ol className="space-y-3">
          {active.steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#475569]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d97706]/10 text-xs font-semibold text-[#d97706]">
                {i + 1}
              </span>
              <span className="min-w-0 pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-[#64748b]">{active.note}</p>
      </div>
    </div>
  );
}

const LEVEL_STYLE: Record<ScrumSkill['level'], string> = {
  beginner: 'bg-[#0f766e]/10 text-[#0f766e]',
  intermediate: 'bg-[#1d4ed8]/10 text-[#1d4ed8]',
  advanced: 'bg-[#7c2d92]/10 text-[#7c2d92]',
};

function SkillCard({ skill, install }: { skill: ScrumSkill; install: string }) {
  const skillCopy = useCopy();
  const tryCopy = useCopy();
  const cmdCopy = useCopy();
  const base = `${FILES}/${skill.slug}`;
  const manual = skillCopy.manual ?? tryCopy.manual ?? cmdCopy.manual;
  const closeManual = () => {
    skillCopy.closeManual();
    tryCopy.closeManual();
    cmdCopy.closeManual();
  };

  return (
    <article
      id={`skill-${skill.slug}`}
      className="flex min-w-0 scroll-mt-24 flex-col gap-3 rounded-2xl border border-[#1f2c4a]/12 bg-white p-5 shadow-sm"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="break-all font-mono text-sm font-semibold text-[#1f2c4a]">{skill.slug}</h4>
        <div className="flex flex-wrap gap-1.5">
          {skill.author === 'Agile36' && (
            <span className="rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#d97706]">
              Agile36
            </span>
          )}
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${LEVEL_STYLE[skill.level]}`}>
            {skill.level}
          </span>
          {skill.optional && (
            <span className="rounded-full bg-[#1f2c4a]/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#64748b]">
              Optional
            </span>
          )}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#475569]">{skill.job}</p>
      <p className="text-xs text-[#64748b]">
        <span className="font-semibold text-[#1f2c4a]">Needs:</span> {skill.needs}
      </p>

      <div className="rounded-xl bg-[#1f2c4a]/[0.04] p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">Try this</span>
          <button type="button" onClick={() => tryCopy.copy(skill.tryPrompt)} className="text-xs font-semibold text-[#1f2c4a] hover:text-[#d97706]">
            {label(tryCopy.state, 'Copy')}
          </button>
        </div>
        <p className="mt-1.5 text-sm text-[#1f2c4a]">&ldquo;{skill.tryPrompt}&rdquo;</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {skill.hasFiles ? (
          <>
            <button
              type="button"
              onClick={() => skillCopy.copy(() => fetch(`${base}/SKILL.md`).then((r) => {
                if (!r.ok) throw new Error(String(r.status));
                return r.text();
              }))}
              className={btnPrimary}
            >
              {label(skillCopy.state, 'Copy SKILL.md')}
            </button>
            <a href={`${base}/${skill.slug}.zip`} download className={btn}>Download .zip</a>
            <a href={`${base}/${skill.slug}.prompt.md`} download className={btn}>Copilot file</a>
          </>
        ) : (
          <>
            <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Get it from the author ↗
            </a>
            <button type="button" onClick={() => cmdCopy.copy(`${install} --only ${skill.slug}`)} className={btn}>
              {label(cmdCopy.state, 'Copy install command')}
            </button>
          </>
        )}
      </div>
      {manual !== null && (
        <ManualCopy
          text={manual}
          onClose={closeManual}
          filename={skillCopy.manual !== null ? `${base}/SKILL.md` : undefined}
        />
      )}
      <p className="text-[11px] text-[#94a3b8]">
        {skill.author} · {skill.license}
        {skill.hasFiles && skill.hasTools ? ' · Python tools in the .zip' : ''}
        {skill.hasFiles ? (
          <>
            {' · '}
            <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#1f2c4a] hover:underline">
              source
            </a>
          </>
        ) : null}
      </p>
    </article>
  );
}

export default function SkillsBrowser({ skills, install }: { skills: ScrumSkill[]; install: string }) {
  const categories = useMemo(() => Array.from(new Set(skills.map((s) => s.category))), [skills]);
  const [cat, setCat] = useState<string>('All');
  const [onlyCopyable, setOnlyCopyable] = useState(false);

  const shown = categories.filter((c) => cat === 'All' || c === cat);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {['All', ...categories].map((c) => {
            const n = c === 'All' ? skills.length : skills.filter((s) => s.category === c).length;
            const on = c === cat;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  on
                    ? 'border-[#1f2c4a] bg-[#1f2c4a] text-white'
                    : 'border-[#1f2c4a]/15 bg-white text-[#475569] hover:border-[#1f2c4a]/35'
                }`}
              >
                {c} <span className={on ? 'text-white/60' : 'text-[#94a3b8]'}>{n}</span>
              </button>
            );
          })}
        </div>
        <label className="flex w-fit cursor-pointer items-center gap-2 text-xs text-[#64748b]">
          <input
            id="only-copyable"
            type="checkbox"
            checked={onlyCopyable}
            onChange={(e) => setOnlyCopyable(e.target.checked)}
            className="h-3.5 w-3.5 accent-[#1f2c4a]"
          />
          Only show skills I can copy or download here
        </label>
      </div>

      {shown.map((c) => {
        const items = skills.filter((s) => s.category === c && (!onlyCopyable || s.hasFiles));
        if (!items.length) return null;
        return (
          <div key={c} className="flex flex-col gap-4">
            <h3 className="flex items-baseline gap-2 text-lg font-semibold text-[#1f2c4a]" style={{ letterSpacing: '-0.02em' }}>
              {c} <span className="font-mono text-xs font-normal text-[#94a3b8]">{items.length}</span>
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => (
                <SkillCard key={s.slug} skill={s} install={install} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
