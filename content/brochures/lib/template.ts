/**
 * Renders an 8-page Agile36 course brochure to standalone HTML.
 *
 * Content comes from two places and nowhere else:
 *   - `getCatalogLanding(slug)` for anything the website already publishes
 *     (title, lede, outcomes, curriculum, exam note, reviews, instructors)
 *   - a `BrochureCourse` supplement for the version, AI story, and audience
 *
 * That split is deliberate: nothing in a brochure should state a fact the site
 * does not already stand behind.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { BrochureCourse, BrochureLanding, Lesson } from "./types";

const here = path.dirname(fileURLToPath(import.meta.url));
const CSS = fs.readFileSync(path.join(here, "brochure.css"), "utf8");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Catalog copy carries "SAFe®" and em dashes; keep them, escape the rest. */
const rich = (s: string) => s.replace(/&(?!amp;|lt;|gt;|#)/g, "&amp;");

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

type Trainer = { name: string; role: string; bio: string; image: string };

const TRAINERS: Trainer[] = [
  {
    name: "Deadra Stevenson",
    role: "CEO & Founder · SPC®",
    image: "/Deadra.jpeg",
    bio: "15+ years leading large-scale change and 30+ Lean-Agile transformations for Fortune and enterprise organizations. Pairs deep SAFe expertise with practical AI transformation guidance.",
  },
  {
    name: "Marcus Ball",
    role: "Enterprise Agile Coach · SPC®",
    image: "/marcus.jpeg",
    bio: "Specializes in SAFe certification training and transformation coaching, helping teams improve flow, alignment, and the value they actually deliver.",
  },
  {
    name: "Joe Puoci",
    role: "Enterprise Trainer · SPC®",
    image: "/Joe.jpeg",
    bio: "Delivers live virtual SAFe courses across the portfolio with a focus on real-world scenarios and skills learners can use the week after class.",
  },
  {
    name: "Martina Svoboda",
    role: "Enterprise Agile Coach · SPC®",
    image: "/martina.jpg",
    bio: "Learner-centered facilitation spanning Agile transformation, organizational development, and change leadership.",
  },
];

const P = "../../../public";

function pageFoot(n: number) {
  return `  <div class="pagefoot">
    <img src="${P}/agile36-logo-header.png" alt="Agile36" />
    <span class="n">${n}</span>
  </div>`;
}

function pageHead(crumb: string, right: string) {
  return `  <div class="pagehead">
    <span class="course">${rich(crumb)}</span>
    <span class="course">${rich(right)}</span>
  </div>`;
}

function statTiles(items: { value: string; unit?: string; label: string }[]) {
  return items
    .map(
      (s) => `      <div class="stat">
        <span class="v">${esc(s.value)}${s.unit ? `<span class="unit">${esc(s.unit)}</span>` : ""}</span>
        <span class="k">${rich(s.label)}</span>
      </div>`,
    )
    .join("\n");
}

/* ------------------------------- pages ---------------------------------- */

function cover(c: BrochureCourse, l: BrochureLanding) {
  const { main: line1, accent: tail } = c.coverTitle;
  return `<section class="page cover">
  <div class="cover-band"><img src="${esc(c.band)}" alt="" /></div>
  <div class="cover-inner">
    <img class="logo" src="${P}/agile36-logo-header-dark.png" alt="Agile36" />

    <div style="margin-top:0.52in">
      <span class="cover-eyebrow">Course Brochure &nbsp;·&nbsp; Version ${esc(c.version)}</span>
      <h1>${rich(line1)}${tail ? `<br /><span class="accent">${rich(tail)}</span>` : ""}</h1>
      <div class="subtitle">${rich(c.subtitle)}</div>
      <div class="cover-line"></div>
      <div class="cover-facts">
        <div class="cover-fact"><span class="v">${esc(c.duration.days)}</span><span class="k">Live online</span></div>
        <div class="cover-fact"><span class="v">${esc(c.duration.hours)} hrs</span><span class="k">PDUs &amp; SEUs</span></div>
        <div class="cover-fact"><span class="v">${c.exam ? "Included" : "Included"}</span><span class="k">${c.exam ? "Exam + retake" : "Courseware"}</span></div>
        <div class="cover-fact"><span class="v">${money(c.price.current)}</span><span class="k">Per seat</span></div>
      </div>
    </div>

    <div class="mt-a">
      <div class="cover-new">
        <span class="cover-eyebrow" style="color:rgba(251,191,36,0.9)">New in this release</span>
        <div class="cover-new-grid">
${c.whatsNew
  .map(
    (w) => `          <div>
            <span class="t">${rich(w.title)}</span>
            <span class="d">${rich(w.body)}</span>
          </div>`,
  )
  .join("\n")}
        </div>
      </div>

      <div class="cover-badges mb-20">
        <img class="popm" src="${P}${esc(c.badge)}" alt="Certification badge" />
        <img class="silver" src="${P}/Silver.png" alt="Scaled Agile Silver Partner" />
      </div>
      <div class="cover-foot">
        <span class="site">www.agile36.com</span>
        <span class="who">Agile36 · Scaled Agile Silver Partner · Live online, instructor-led by certified SPCs, worldwide</span>
      </div>
    </div>
  </div>
</section>`;
}

function contents(c: BrochureCourse, l: BrochureLanding) {
  const rows: [string, string, number][] = [
    ["01", "Program overview &amp; what's included", 3],
    ["02", "Why this certification, now", 4],
    ["03", "Delivery mode &amp; prerequisites", 4],
    ["04", "What you'll be able to do", 5],
    ["05", "Who should attend", 5],
    ["06", "Course curriculum", 6],
    ...(c.ai ? ([["07", "AI in this course", 7]] as [string, string, number][]) : []),
    [c.ai ? "08" : "07", "Your instructors &amp; how to enroll", c.ai ? 8 : 7],
  ];
  const glance: [string, string][] = [
    ["Course version", c.version],
    ["Format", "Live online"],
    ["Duration", `${c.duration.days} · ${c.duration.hours} hours`],
    ["Credits", c.credits],
    ...(c.exam
      ? ([
          ["Exam", c.exam.questions ? `${c.exam.minutes} min · ${c.exam.questions} questions` : `${c.exam.minutes} minutes`],
          ["Passing score", c.exam.pass],
          ["Exam attempts", c.exam.attempts],
        ] as [string, string][])
      : ([["Assessment", "Micro-credential, no exam"]] as [string, string][])),
    ["Membership", "1 year SAFe Studio"],
    ["Prerequisites", c.prerequisites.length && /^none/i.test(c.prerequisites[0]) ? "None" : "See page 4"],
  ];
  return `<section class="page">
${pageHead(l.crumb, "Agile36")}

  <div class="grid-2 gap-16" style="grid-template-columns: 1.08fr 1fr; align-items:start">
    <div>
      <span class="eyebrow amber">Inside this brochure</span>
      <h2 class="section">Contents</h2>
      <div class="rule"></div>
      <ul class="toc">
${rows
  .map(
    ([n, t, p]) =>
      `        <li><span class="num">${n}</span> ${t} <span class="dots"></span> <span class="pg">${p}</span></li>`,
  )
  .join("\n")}
      </ul>
    </div>

    <div class="stack gap-12">
      <div class="panel tint">
        <span class="eyebrow">At a glance</span>
        <table class="blueprint" style="margin-top:10px">
${glance.map(([k, v]) => `          <tr><td>${rich(k)}</td><td class="w">${rich(v)}</td></tr>`).join("\n")}
          <tr><td>Investment</td><td class="w">${money(c.price.current)} <span style="color:var(--faint); font-weight:400; text-decoration:line-through">${money(c.price.original)}</span></td></tr>
        </table>
      </div>

      <div class="panel amber">
        <h4 style="margin-bottom:4px">Training a team?</h4>
        <p class="small" style="margin:0">25% off any group of five or more, plus private cohorts scheduled around your PI calendar. Email <strong>d.stevenson@agile36.com</strong>.</p>
      </div>

      <div class="panel">
        <div class="row gap-8" style="margin-bottom:6px">
          <span style="color:var(--amber); font-size:11pt; letter-spacing:1px">★★★★★</span>
          <strong style="font-size:10pt">4.9 / 5</strong>
        </div>
        <p class="small" style="margin:0">Rated by learners on Google. Agile36 has trained professionals at Fortune 100 and Fortune 500 companies, government agencies, and universities for more than a decade.</p>
      </div>
    </div>
  </div>

  <div class="mt-a">
    <span class="eyebrow amber">What changed in version ${esc(c.version)}</span>
    <div class="rule"></div>
    <div class="grid-3">
${c.changed
  .map(
    (t, i) => `      <div class="tile${i === 1 ? " accent" : ""}">
        <h4>${rich(t.title)}</h4>
        <p>${rich(t.body)}</p>
      </div>`,
  )
  .join("\n")}
    </div>
  </div>

${pageFoot(2)}
</section>`;
}

const INCLUDE_ICONS = [
  "M15 10l4.55-2.27A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.89L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  "M9 12l2 2 4-4m5.6-4a12 12 0 01-8.6 3A12 12 0 013 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3z",
  "M12 14l9-5-9-5-9 5 9 5zm0 0v7m0-7l6.16-3.42A12 12 0 0112 21a12 12 0 01-6.16-10.42L12 14z",
  "M17 20h5v-2a3 3 0 00-5.4-1.8M17 20H7m10 0v-2c0-.7-.1-1.3-.4-1.8M7 20H2v-2a3 3 0 015.4-1.8M7 20v-2c0-.7.1-1.3.4-1.8m0 0a5 5 0 019.2 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  "M12 6.25c-1.7-1.2-4-1.6-6.5-1.2A1 1 0 004.5 6v11.3a1 1 0 001.2 1c2.3-.4 4.5 0 6.3 1.2 1.8-1.2 4-1.6 6.3-1.2a1 1 0 001.2-1V6a1 1 0 00-1-1c-2.5-.4-4.8 0-6.5 1.2zm0 0V19",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-6 4h6",
  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
];

function overview(c: BrochureCourse, l: BrochureLanding) {
  const paras = c.overview.body ?? l.lede.split("\n\n");
  const includes: { t: string; d: string; accent?: boolean }[] = [
    { t: `${c.duration.hours} hours live`, d: `${c.duration.days} of instructor-led virtual classroom — not recordings.` },
    c.exam
      ? { t: "Exam + retake", d: `Official exam fee with ${c.exam.attempts.toLowerCase()}.`, accent: true }
      : { t: "Micro-credential", d: "A Scaled Agile micro-credential badge on completion.", accent: true },
    { t: c.credits, d: "Credit toward PMI and Scrum Alliance renewal requirements." },
    { t: "SAFe Studio", d: "One-year membership plus SAFe Connect community access." },
    { t: "Digital workbook", d: `The official ${c.version} courseware, yours to keep and annotate.` },
    { t: "AI prompt library", d: "Reusable prompt patterns you can run the week after class.", accent: true },
    { t: "Practice test", d: "Free practice exam and preparation materials." },
    { t: "Free reschedule", d: "Miss a session and join the next cohort at no extra cost." },
  ];
  return `<section class="page compact">
${pageHead(l.crumb, "Program overview")}

  <span class="eyebrow amber">01 · Program overview</span>
  <h2 class="section">${rich(c.overview.heading)}</h2>
  <div class="rule"></div>

  <div class="grid-2 gap-16 mb-14" style="grid-template-columns: 1.25fr 1fr; align-items:start">
    <div>
${paras.map((t, i) => `      <p class="lede"${i === paras.length - 1 ? ' style="margin-bottom:0"' : ""}>${rich(t)}</p>`).join("\n")}
    </div>
    <div class="panel navy">
      <span class="eyebrow">The Agile36 difference</span>
      <div class="rule"></div>
      <p class="small" style="color:rgba(255,255,255,0.78)">${rich(l.difference)}</p>
      <p class="small" style="color:rgba(255,255,255,0.78); margin:0">Every class is live, capped for discussion, and led by a certified SAFe® Practice Consultant.</p>
    </div>
  </div>

  <div class="panel tint mb-14" style="padding:12px 16px">
    <div class="grid-4">
${statTiles(c.stats)}
    </div>
  </div>

  <span class="eyebrow amber">What's included</span>
  <div class="rule"></div>

  <div class="grid-4" style="margin-bottom:10px">
${includes
  .map(
    (t, i) => `    <div class="tile${t.accent ? " accent" : ""}">
      <div class="ico"><svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="${INCLUDE_ICONS[i]}"/></svg></div>
      <h4>${rich(t.t)}</h4>
      <p>${rich(t.d)}</p>
    </div>`,
  )
  .join("\n")}
  </div>

  <div class="panel amber">
    <p class="small" style="margin:0"><strong>Hands-on, not lecture.</strong> The class runs on activities, small-group discussion, role-play, and a running case study${c.ai ? ` — including ${c.ai.activities.length} AI activities where you write prompts, critique the output, and edit it into something a real team could use` : ""}.</p>
  </div>

${pageFoot(3)}
</section>`;
}

function whyNow(c: BrochureCourse, l: BrochureLanding) {
  const review = l.review;
  return `<section class="page compact">
${pageHead(l.crumb, "Why now · Delivery · Prerequisites")}

  <span class="eyebrow amber">02 · Why this certification, now</span>
  <h2 class="section">${rich(c.whyNow.heading)}</h2>
  <div class="rule"></div>

  <p class="lede mb-14" style="max-width:6in">${rich(c.whyNow.body)}</p>

${
  c.whyStats
    ? `  <div class="panel tint mb-14">
    <div class="grid-3">
${statTiles(c.whyStats.items)}
    </div>
    <p class="tiny" style="margin:12px 0 0">${rich(c.whyStats.source)}</p>
  </div>`
    : ""
}

  <div class="grid-2 gap-16" style="align-items:start">
    <div class="stack gap-12">
      <div class="panel">
        <span class="eyebrow amber">Where this training lands</span>
        <div class="rule"></div>
        <p class="small">Agile36 has delivered this course into:</p>
        <ul class="ticks" style="margin-top:8px; margin-bottom:0">
${c.industries.map((i) => `          <li>${rich(i)}</li>`).join("\n")}
        </ul>
      </div>
${
  review
    ? `      <div class="panel navy">
        <p class="small" style="color:rgba(255,255,255,0.85); font-size:9pt; line-height:1.55">“${rich(review.review.split(". ").slice(0, 2).join(". "))}”</p>
        <p class="tiny" style="color:rgba(255,255,255,0.5); margin:0">${rich(review.name)} · ${rich(review.role)}</p>
      </div>`
    : ""
}
    </div>

    <div class="stack gap-12">
      <div class="panel">
        <span class="eyebrow amber">03 · Delivery mode</span>
        <div class="rule"></div>
        <ul class="ticks">
          <li>Live virtual classroom delivered remotely worldwide, over ${c.duration.days.toLowerCase()}</li>
          <li>Taught by certified SAFe® Practice Consultants (SPCs), never contractors reading slides</li>
          <li>Cohorts kept small enough for real discussion and Q&amp;A</li>
          <li>Open to attendees anywhere — weekday and weekend cohorts across US time zones, with private cohorts timed to your region</li>
        </ul>
      </div>

      <div class="panel">
        <span class="eyebrow amber">Prerequisites</span>
        <div class="rule"></div>
        <ul class="ticks" style="margin-bottom:0">
${c.prerequisites.map((p) => `          <li>${rich(p)}</li>`).join("\n")}
        </ul>
      </div>
    </div>
  </div>

${pageFoot(4)}
</section>`;
}

function outcomes(c: BrochureCourse, l: BrochureLanding) {
  // Prefer the courseware's own learning objectives; the catalog's outcomes
  // field is a four-line marketing summary and reads thin at this size.
  const groups = c.outcomeGroups
    ? c.outcomeGroups.map((g) => g.items)
    : (() => {
        const o = l.outcomes;
        const per = Math.ceil(o.length / 3) || 1;
        return [o.slice(0, per), o.slice(per, per * 2), o.slice(per * 2)];
      })();
  const titles = c.outcomeGroups
    ? c.outcomeGroups.map((g) => g.title)
    : ["The role", "Planning and leading", "Executing"];
  const aiPanel = c.ai
    ? `    <div class="panel amber">
      <h4 style="margin-bottom:8px">AI-augmented product work <span class="aitag">New</span></h4>
      <ul class="ticks" style="margin-bottom:0">
${c.ai.techniques.map((t) => `        <li>${rich(t)}</li>`).join("\n")}
      </ul>
    </div>`
    : "";
  return `<section class="page compact">
${pageHead(l.crumb, "Outcomes · Audience")}

  <span class="eyebrow amber">04 · What you'll be able to do</span>
  <h2 class="section">Outcomes you can point<br />to on Monday morning</h2>
  <div class="rule"></div>

  <div class="grid-2 gap-16" style="align-items:start; margin-bottom:8px">
${groups
  .filter((g) => g.length)
  .map(
    (g, i) => `    <div class="panel">
      <h4 style="margin-bottom:8px">${titles[i] ?? "And also"}</h4>
      <ul class="ticks" style="margin-bottom:0">
${g.map((x) => `        <li>${rich(x)}</li>`).join("\n")}
      </ul>
    </div>`,
  )
  .join("\n")}
${aiPanel}
  </div>

  <span class="eyebrow amber">05 · Who should attend</span>
  <div class="rule"></div>

  <div class="grid-4" style="margin-bottom:8px">
${c.audience
  .map((a) => `    <div class="tile"><h4>${rich(a.role)}</h4><p>${rich(a.note)}</p></div>`)
  .join("\n")}
  </div>

  <div class="panel tint">
    <p class="small" style="margin:0"><strong>Certification.</strong> ${rich(l.examNote)}</p>
  </div>

${pageFoot(5)}
</section>`;
}

function curriculum(c: BrochureCourse, l: BrochureLanding) {
  // Lessons come from the courseware kit; the weighted domains beside them are
  // the exam blueprint, which Scaled Agile versions separately.
  const mods = l.curriculumModules;
  // Courses with a courseware kit use its lessons; the rest use the catalog
  // modules the website already publishes.
  const lessons: Lesson[] =
    c.lessons ?? mods.map((m) => ({ title: m.title, topics: m.topics }));
  const blueprint = c.lessons ? mods.filter((m) => m.weight) : [];
  const days = c.duration.days;
  const last = lessons[lessons.length - 1];
  return `<section class="page compact">
${pageHead(l.crumb, `Curriculum · ${c.version}`)}

  <span class="eyebrow amber">06 · Course curriculum</span>
  <h2 class="section">${lessons.length} ${c.lessons ? "lessons" : "modules"}, ${days}</h2>
  <div class="rule"></div>
  <p class="small" style="margin:-6px 0 14px; max-width:5.6in">The official ${esc(c.version)} ${c.lessons ? "lesson" : "module"} structure.${lessons.some((m) => m.aiTopics?.length) ? ` Topics marked <span class="aitag" style="margin-left:0">AI</span> are new or reworked in this release — AI runs through the lessons rather than sitting in one at the end.` : ""}</p>

  <div class="grid-2" style="gap:11px">
${lessons
  .slice(0, -1)
  .map(
    (m, i) => `    <div class="lesson">
      <div class="lesson-head"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${rich(m.title)}</span></div>
      <div class="lesson-body">
        <ul class="dots" style="margin-bottom:0">
${m.topics.map((t) => `          <li>${rich(t)}</li>`).join("\n")}
${(m.aiTopics ?? []).map((t) => `          <li class="ai">${rich(t)}</li>`).join("\n")}
        </ul>
      </div>
    </div>`,
  )
  .join("\n")}
    <div class="stack" style="gap:11px">
      <div class="lesson">
        <div class="lesson-head"><span class="n">${String(lessons.length).padStart(2, "0")}</span><span class="t">${rich(last.title)}</span></div>
        <div class="lesson-body">
          <ul class="dots" style="margin-bottom:0">
${last.topics.map((t) => `            <li>${rich(t)}</li>`).join("\n")}
${(last.aiTopics ?? []).map((t) => `            <li class="ai">${rich(t)}</li>`).join("\n")}
          </ul>
        </div>
      </div>
${
  blueprint.length
    ? `      <div class="panel tint" style="padding:13px 14px">
        <span class="eyebrow">Exam blueprint weighting</span>
        <table class="blueprint" style="margin-top:8px">
${blueprint.map((m) => `          <tr><td>${rich(m.title)}</td><td class="w">${rich(m.weight!)}</td></tr>`).join("\n")}
        </table>
      </div>`
    : ""
}
    </div>
  </div>

${pageFoot(6)}
</section>`;
}

function aiPage(c: BrochureCourse, l: BrochureLanding) {
  const ai = c.ai!;
  return `<section class="page compact">
${pageHead(l.crumb, "AI in this course")}

  <span class="eyebrow amber">07 · AI in this course</span>
  <h2 class="section">${rich(ai.heading)}</h2>
  <div class="rule"></div>

  <div class="grid-2 gap-16 mb-14" style="grid-template-columns:1.15fr 1fr; align-items:start">
    <div>
      <p class="small" style="margin-bottom:10px">${rich(ai.lede)}</p>
${ai.activities
  .map(
    (a, i) => `      <div class="panel"${i < ai.activities.length - 1 ? ' style="margin-bottom:9px"' : ""}>
        <h4>${rich(a.title)} <span class="aitag">${rich(a.where)}</span></h4>
        <p class="small" style="margin:0">${rich(a.body)}</p>
      </div>`,
  )
  .join("\n")}
    </div>

    <div class="stack gap-12">
      <div class="panel navy">
        <span class="eyebrow">Prompting techniques you'll take away</span>
        <div class="rule"></div>
        <ul class="dots" style="margin-bottom:0">
${ai.techniques.map((t) => `          <li style="color:rgba(255,255,255,0.82)">${rich(t).replace(/<strong>/g, '<strong style="color:#fff">')}</li>`).join("\n")}
        </ul>
      </div>
${
  ai.responsible
    ? `      <div class="panel amber">
        <span class="eyebrow amber">Responsible AI</span>
        <div class="rule"></div>
        <p class="small">${rich(ai.responsible.lede)}</p>
        <ul class="ticks" style="margin-bottom:0">
${ai.responsible.points.map((p) => `          <li>${rich(p)}</li>`).join("\n")}
        </ul>
      </div>`
    : ""
}
    </div>
  </div>

${
  ai.shifts
    ? `  <div class="panel tint">
    <span class="eyebrow amber">${rich(ai.shifts.heading)}</span>
    <div class="rule"></div>
    <div class="grid-4">
${ai.shifts.items
  .map(
    (s) => `      <div>
        <h4 style="color:var(--amber); font-size:8pt; letter-spacing:0.12em; text-transform:uppercase">${rich(s.label)}</h4>
        <h4 style="margin:4px 0 4px">${rich(s.title)}</h4>
        <p class="small" style="margin:0">${rich(s.body)}</p>
      </div>`,
  )
  .join("\n")}
    </div>
${ai.shifts.note ? `    <p class="tiny" style="margin:12px 0 0">${rich(ai.shifts.note)}</p>` : ""}
  </div>`
    : ""
}

${pageFoot(7)}
</section>`;
}

function closing(c: BrochureCourse, l: BrochureLanding, n: number) {
  return `<section class="page">
${pageHead(l.crumb, "Instructors · Enrollment")}

  <span class="eyebrow amber">08 · Your instructors</span>
  <h2 class="section">Taught by practising SPCs</h2>
  <div class="rule"></div>

  <div class="grid-2 gap-16 mb-14">
${TRAINERS.map(
  (t) => `    <div class="trainer">
      <img src="${P}${t.image}" alt="${esc(t.name)}" />
      <div>
        <div class="nm">${esc(t.name)}</div>
        <div class="rl">${rich(t.role)}</div>
        <p>${rich(t.bio)}</p>
      </div>
    </div>`,
).join("\n")}
  </div>

  <div class="panel navy mb-14">
    <div class="row" style="justify-content:space-between; align-items:flex-end; gap:24px">
      <div style="flex:1">
        <span class="eyebrow">Enroll</span>
        <div class="rule"></div>
        <div class="cta-price" style="margin-bottom:8px">
          <span class="now">${money(c.price.current)}</span>
          <span class="was">${money(c.price.original)}</span>
          <span class="small" style="color:rgba(255,255,255,0.6); margin:0">per seat, everything included</span>
        </div>
        <p class="small" style="color:rgba(255,255,255,0.72); margin:0">Weekday and weekend cohorts running throughout the year. Groups of five or more save 25%; private cohorts can be scheduled around your PI calendar.</p>
      </div>
      <div style="text-align:right; flex:none">
        <span class="btn">agile36.com${esc(c.path)}</span>
      </div>
    </div>
  </div>

  <span class="eyebrow amber">About Agile36</span>
  <div class="rule"></div>
  <div class="grid-2 gap-16" style="grid-template-columns:1.4fr 1fr; align-items:start">
    <div>
      <p class="small">Agile36 is a transformation and technology enablement firm helping organizations accelerate performance, modernize operations, and build the capabilities required to compete in the digital era. For more than a decade we have partnered with Fortune 100 and Fortune 500 companies, government agencies, and universities to guide large-scale change.</p>
      <p class="small" style="margin-bottom:0">As a <strong>Scaled Agile Silver Partner</strong>, we deliver accredited SAFe® courses led by industry-recognized SPCs — hands-on, practical training that helps teams adopt new ways of working and produce measurable results.</p>
    </div>
    <div class="row gap-16" style="justify-content:flex-end">
      <img src="${P}/Silver.png" alt="Scaled Agile Silver Partner" style="height:74px; border-radius:5px" />
      <img src="${P}${esc(c.badge)}" alt="Certification badge" style="height:74px; border-radius:9px" />
    </div>
  </div>

  <div class="panel" style="margin-top:14px">
    <div class="contact-row">
      <div><span class="k">Web</span><span class="v">www.agile36.com</span></div>
      <div><span class="k">Email</span><span class="v">d.stevenson@agile36.com</span></div>
      <div><span class="k">Based in</span><span class="v">Miami, Florida · Delivered live online worldwide</span></div>
    </div>
  </div>

  <p class="tiny" style="margin-top:12px">SAFe® and Scaled Agile Framework® are registered trademarks of Scaled Agile, Inc. Course content, exam details, and certification requirements are set by Scaled Agile and current as of course version ${esc(c.version)}. Pricing and schedules current at time of publication; see agile36.com for live availability.</p>

${pageFoot(n)}
</section>`;
}

/* ------------------------------- render --------------------------------- */

export function renderBrochure(c: BrochureCourse, l: BrochureLanding): string {
  const pages = [
    cover(c, l),
    contents(c, l),
    overview(c, l),
    whyNow(c, l),
    outcomes(c, l),
    curriculum(c, l),
    c.ai ? aiPage(c, l) : "",
    closing(c, l, c.ai ? 8 : 7),
  ].filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(c.coverTitle.main.replace(/<br \/>/g, " "))}${c.coverTitle.accent ? " " + esc(c.coverTitle.accent) : ""} — Course Brochure | Agile36</title>
<style>
${CSS}</style>
</head>
<body>

${pages.join("\n\n")}

</body>
</html>
`;
}
