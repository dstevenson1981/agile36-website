# SAFe partner portal — Course Admin form notes

Captured 2026-08-10 from `https://community.scaledagile.com/s/course-admin`
while logged in as Deadra (Claude in Chrome, her own session).

## Getting there

`community.scaledagile.com/s/course-admin` → **My Courses** tab. If Chrome
isn't connected, `list_connected_browsers` → `select_browser` first; the
extension's tab group starts empty, so navigate a tab there yourself.

A transient Salesforce **"Sorry to interrupt / CSS Error"** dialog often
covers the page on load. Dismiss it with the *Cancel and close* button; the
grid underneath is fine.

## Header counters (read these BEFORE planning a batch)

| Counter | Meaning |
|---|---|
| Public Classes Scheduled | all public classes on the account |
| within 30 / 60 / 90 days | near-term subset |
| **Calendar Listings Available** | **hard cap on how many more you can post** |
| Base Calendar Listings | tier allowance |
| Earned Calendar Listings | earned on top of base |

Available = Base + Earned − Public Classes Scheduled. On 2026-08-10 that was
25 + 37 − 43 = **19**. Never plan a batch bigger than this number without
Deadra explicitly confirming she has more credits.

## The grid is the source of truth for what exists

`My Courses` lists every class. Set **Rows: 100** and read it — the public
Training Finder lags and can show a *different start date* for the same
class (a POPM cohort read Sep 7 in the portal and Sep 8 on the Finder).
Reconcile against this grid, never against the Finder, or you will create
duplicates and burn listings.

Extract rows with JS — it's a Lightning datatable, so plain `table tbody tr`
finds nothing. Walk shadow roots and collect `[role="row"]` →
`[role="gridcell"],[role="rowheader"]`.

## Creating a class

**Add New** (top right) → four types:
`Public Course` · `Private Course` · `Remote Private Course` · **`Remote Public Course`**

Agile36 classes are always **Remote Public Course**.

### Stage 1 — "Create Remote Public Course" modal

| Field | Control | Value |
|---|---|---|
| Learning Plan | `<select>` | see mapping below |
| ILT Course Name | text | `{Course}- Guaranteed to Run` |
| Remote Course | combobox | `Yes` (default) |
| Start Date | text | `M/D/YYYY` |
| End Date | text | `M/D/YYYY` |
| Start Time | text | e.g. `9:00 AM` |
| Timezone | combobox | plain **Eastern Standard Time** — not the "…- New York" option |
| City | text | **Miami**, **Atlanta**, or **Los Angeles** — never New York |
| Language | combobox | `English` |
| Country | combobox | `United States` |
| City | text | `New York` for Eastern classes (cosmetic; no city filter on the Finder) |
| Registration URL | text | canonical per-course URL from `config.json` |
| Sold Out | checkbox | leave unchecked |

Then **Save & View Remote Public Course**.

There is **no "Guaranteed to Run" checkbox** — GTR is conveyed by the course
*name*. That is why every Agile36 listing ends in `- Guaranteed to Run`.

There is no price, seats, or instructor field in stage 1.

### Stage 2 — assign the instructor (REQUIRED, easy to miss)

Saving lands on the course detail page with a banner:

> *Warning: If applicable, 1 instructor is required for listings on Scaled
> Agile's training calendar.*

**A class with no instructor does not reach the training calendar.** Stage 1
alone burns a listing and publishes nothing. Always finish stage 2.

1. **+ Instructor** (button row under the course title) → scrolls to the
   Instructors table → **+ Instructor** again → *Add Instructors* modal.
2. Type a name and click **Search** (the button — do not press Enter). The
   search takes a few seconds; the first screenshot usually still shows
   "No search results".
3. Click **Add** on the right row, then **Cancel** to close the modal.
4. The banner disappears once an instructor is attached.

Search by first name and check carefully — "Martina" returns both
*Elvira Martina* and *Martina Svoboda*. Known trainers:

| Trainer | Email | Company |
|---|---|---|
| Martina Svoboda | masvobod@southernco.com | Southern Company |
| Deadra Stevenson, Joe Puoci, Marcus Ball | — | Agile36, LLC |

### Gotchas

- **Never press Escape** in the create modal — it closes and discards
  everything with no confirmation.
- The **State** field only appears once City has a value, and it is required.
- **Timezone can silently revert to `--None--`** if you move to the next field
  too fast. Screenshot and confirm it before saving.
- Clicking *Save* by coordinate can miss; click it by element ref.
- The Add New menu closes between tool batches — open it and pick the type in
  the same batch, or grab the menuitem ref right after opening.

### Learning Plan mapping (what Deadra already uses)

| Our course | Learning Plan option |
|---|---|
| Product Owner/Product Manager | `AI-Empowered SAFe Product Owner/Product Manager (6.0) - Updated` |
| Scrum Master | `AI-Empowered SAFe Scrum Master (6.0) - Updated` |
| Leading SAFe | `AI-Empowered Leading SAFe (6.0)` |
| Advanced Scrum Master | `AI-Empowered SAFe Advanced Scrum Master (6.0)` |
| Lean Portfolio Management | `Lean Portfolio Management (6.0)` |
| Agile Product Management | `Agile Product Management (6.0)` |
| SAFe for Teams | `AI-Empowered SAFe for Teams (6.0)` |
| Value Stream Mapping | `Advanced Facilitator: Value Stream Mapping` |
| DevOps | `SAFe DevOps (6.0)` — excluded by policy, never post |

**Always English.** The dropdown carries Brazilian Portuguese, Simplified
Chinese, French, and German variants — Agile36 never teaches those, so ignore
them entirely. The Language field is always `English`.

The only real choice is plain vs `- Updated` on the courses that have both
(POPM, Scrum Master, RTE). Use the variant in the table above, which is what
Deadra's existing listings use.

## Editing an existing class — different from creating one

The create dialog and the edit panel look like the same form. They are not, and
assuming they were cost a full day on 2026-08-19.

Open a class by its **direct URL** (`/s/ilt-course/<id>`), captured as `href` by
`dump-portal.mjs`. Do not search the My Courses grid for it — the grid paginates
at 25 rows and anything outside page one is invisible.

| Step | What works |
|---|---|
| Open the editor | `page.getByText(/^Basic Info$/i).click()` — **not** `getByRole("button")`, which times out even though the a11y tree reports a button |
| Scope | It *is* a dialog: `page.getByRole("dialog")` |
| Text fields | `getByRole("textbox", {name})` + **`.fill()`** — `.fill()` replaces, typing appends (`MiamiMiami`) |
| Dropdowns | Address by **Salesforce API name**: `[name="Timezone__c"]`, `[name="State_Province__c"]`, `[name="Country__c"]`. In the create modal the same fields resolve by label; here they do not |
| Clicking a dropdown | The `[name]` element is the `lightning-combobox` host and has **no clickable box** — click the `button` inside it |
| Picking an option | Match the **full label, anchored**. The portal renders the offset with a Unicode minus (U+2212), so `GMT-05:00 …` never matches — allow `[-−–]`. **Never** match on a loose substring |

### The trap that put 41 live classes on Australian time

Matching `/Eastern Standard Time/` also matches **"GMT+10:00 Australian Eastern
Standard Time"**, which sorts first. The run then *verified* with the same loose
string, so every wrong class reported success. One was set to India Standard
Time the same way.

Two rules follow, and they are not optional:

1. **Anchor option matches.** Reject `GMT+` and `Australian` explicitly.
2. **Never let the script that made a change be the only thing that checks it.**
   Audit with a separate pass that re-reads the live page. `audit-tz.mjs` does
   this; the discrepancy it found was 41 classes wrong while the run said 37 OK.

### Dates are the easy case

Start Date and End Date are plain textboxes — `.fill()` with `M/D/YYYY`. None of
the dropdown traps above apply. `move-classes.mjs` does this, and per `RULES.md`
moving a date is the *only* remedy for a surplus or mis-dated class.
