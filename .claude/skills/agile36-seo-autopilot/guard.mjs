#!/usr/bin/env node
/**
 * The thing that makes unattended pushing to a live storefront acceptable.
 *
 *   node guard.mjs            # inspect the staged diff, exit non-zero to abort
 *   node guard.mjs --staged   # same; explicit
 *
 * Checks three things against `config.json`:
 *   1. no changed file sits under a denied path,
 *   2. no ADDED line matches a denied pattern (price, date, owner stat,
 *      enrolment field) — checked in every file, allowed or not, because the
 *      danger is the content, not the location,
 *   3. the diff is small enough to be a plausible SEO edit.
 *
 * Prints every reason it found rather than the first, so one run tells the
 * whole story. Never modifies anything — the caller decides what to do.
 */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(here, "config.json"), "utf8"));

/** Minimal glob → RegExp. Supports `**`, `*`, and literal path segments;
 *  everything else (including the parens in `app/(legacy)/`) is escaped. */
function globToRe(glob) {
  let out = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        // `**/` swallows any number of segments, `**` at the end swallows the rest
        if (glob[i + 2] === "/") { out += "(?:.*/)?"; i += 2; } else { out += ".*"; i += 1; }
      } else {
        out += "[^/]*";
      }
      continue;
    }
    out += c.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${out}$`);
}

/** Go-style `(?i)` prefixes are how the config expresses case-insensitivity;
 *  JavaScript wants it as a flag instead. */
function toRe(pattern) {
  const ci = pattern.startsWith("(?i)");
  return new RegExp(ci ? pattern.slice(4) : pattern, ci ? "i" : "");
}

const denyPaths = cfg.deny.paths.map(globToRe);
const denyLines = cfg.deny.linePatterns.map((p) => ({ re: toRe(p.pattern), why: p.why }));

const git = (...args) =>
  execFileSync("git", args, { cwd: cfg.repo, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });

const files = git("diff", "--cached", "--name-only").split("\n").filter(Boolean);
const problems = [];

if (files.length === 0) {
  console.log("guard: nothing staged — nothing to check");
  process.exit(0);
}

if (files.length > cfg.blastRadius.maxFiles) {
  problems.push(
    `${files.length} files staged, ceiling is ${cfg.blastRadius.maxFiles} — this is not an SEO edit`
  );
}

for (const f of files) {
  if (denyPaths.some((re) => re.test(f))) problems.push(`${f} — denied path`);
}

// Per-file added lines. `-U0` keeps context out of the scan so we only judge
// what this run actually wrote.
for (const f of files) {
  const diff = git("diff", "--cached", "-U0", "--", f);
  const added = diff
    .split("\n")
    .filter((l) => l.startsWith("+") && !l.startsWith("+++"))
    .map((l) => l.slice(1));

  if (added.length > cfg.blastRadius.maxLinesPerFile) {
    problems.push(
      `${f} — ${added.length} added lines, ceiling is ${cfg.blastRadius.maxLinesPerFile}`
    );
  }

  for (const line of added) {
    for (const { re, why } of denyLines) {
      const hit = line.match(re);
      if (hit) problems.push(`${f} — added line contains ${why}: ${hit[0].trim()}`);
    }
  }
}

if (problems.length) {
  console.error("guard: BLOCKED\n");
  for (const p of [...new Set(problems)]) console.error(`  ${p}`);
  console.error(`\n${problems.length} problem(s). Nothing was committed.`);
  process.exit(1);
}

console.log(`guard: clear — ${files.length} file(s), no denied paths, patterns, or overreach`);
