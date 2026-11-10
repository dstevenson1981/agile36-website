---
name: agile-product-owner
description: "Use for backlog work: writing user stories and acceptance criteria, splitting epics, estimating or prioritizing for a sprint. Generates stories with user_story_generator.py."
metadata:
  not_for: Kanban-only workflows, waterfall project planning, general task management, non-Scrum agile frameworks (SAFe, LeSS) without adaptation
  triggers:
    - write user story
    - create acceptance criteria
    - plan sprint
    - estimate story points
    - break down epic
    - prioritize backlog
    - sprint planning
    - backlog grooming
    - sprint retrospective
    - definition of done
    - INVEST criteria
    - Given When Then
    - user story template
    - sprint capacity
    - velocity tracking
---

> This single-file version leaves out the skill's Python tools. Download the .zip for the full skill.

# Agile Product Owner

Backlog management and sprint execution toolkit for product owners, including user story generation, acceptance criteria patterns, sprint planning, and velocity tracking.

---

## Table of Contents

- [What Makes This Skill Different](#what-makes-this-skill-different)
- [User Story Generation Workflow](#user-story-generation-workflow)
- [Acceptance Criteria Patterns](#acceptance-criteria-patterns)
- [Epic Breakdown Workflow](#epic-breakdown-workflow)
- [Sprint Planning Workflow](#sprint-planning-workflow)
- [Backlog Prioritization](#backlog-prioritization)
- [Reference Documentation](#reference-documentation)
- [Tools](#tools)

---

## What Makes This Skill Different

- **Capacity math that aligns with reality:** sprint capacity is based on velocity × availability factor, not hope.
- **Acceptance criteria scaled by story size:** minimum AC counts map to story points to avoid under-spec'ing large items.
- **Weighted prioritization that stays consistent:** value 40%, impact 30%, risk 15%, effort 15% keeps tradeoffs explicit.
- **Systematic epic splitting techniques:** five concrete split patterns prevent oversized stories.
- **INVEST validation baked into workflows:** every story includes a validation step, not just guidance.

## User Story Generation Workflow

Create INVEST-compliant user stories from requirements:

1. Identify the persona (who benefits from this feature)
2. Define the action or capability needed
3. Articulate the benefit or value delivered
4. Write acceptance criteria using Given-When-Then
5. Estimate story points using Fibonacci scale
6. Validate against INVEST criteria
7. Add to backlog with priority
8. **Validation:** Story passes all INVEST criteria; acceptance criteria are testable

### User Story Template

```
As a [persona],
I want to [action/capability],
So that [benefit/value].
```

**Example:**
```
As a marketing manager,
I want to export campaign reports to PDF,
So that I can share results with stakeholders who don't have system access.
```

### Story Types

| Type | Template | Example |
|------|----------|---------|
| Feature | As a [persona], I want to [action] so that [benefit] | As a user, I want to filter search results so that I find items faster |
| Improvement | As a [persona], I need [capability] to [goal] | As a user, I need faster page loads to complete tasks without frustration |
| Bug Fix | As a [persona], I expect [behavior] when [condition] | As a user, I expect my cart to persist when I refresh the page |
| Enabler | As a developer, I need to [technical task] to enable [capability] | As a developer, I need to implement caching to enable instant search |

### Persona Reference

| Persona | Typical Needs | Context |
|---------|--------------|---------|
| End User | Efficiency, simplicity, reliability | Daily feature usage |
| Administrator | Control, visibility, security | System management |
| Power User | Automation, customization, shortcuts | Expert workflows |
| New User | Guidance, learning, safety | Onboarding |

---

## Acceptance Criteria Patterns

Write testable acceptance criteria using Given-When-Then format.

### Given-When-Then Template

```
Given [precondition/context],
When [action/trigger],
Then [expected outcome].
```

**Examples:**
```
Given the user is logged in with valid credentials,
When they click the "Export" button,
Then a PDF download starts within 2 seconds.

Given the user has entered an invalid email format,
When they submit the registration form,
Then an inline error message displays "Please enter a valid email address."

Given the shopping cart contains items,
When the user refreshes the browser,
Then the cart contents remain unchanged.
```

### Acceptance Criteria Checklist

Each story should include criteria for:

| Category | Example |
|----------|---------|
| Happy Path | Given valid input, When submitted, Then success message displayed |
| Validation | Should reject input when required field is empty |
| Error Handling | Must show user-friendly message when API fails |
| Performance | Should complete operation within 2 seconds |
| Accessibility | Must be navigable via keyboard only |

### Minimum Criteria by Story Size

| Story Points | Minimum AC Count |
|--------------|------------------|
| 1-2 | 3-4 criteria |
| 3-5 | 4-6 criteria |
| 8 | 5-8 criteria |
| 13+ | Split the story |

See `references/user-story-templates.md` for complete template library.

---

## Epic Breakdown Workflow

Break epics into deliverable sprint-sized stories:

1. Define epic scope and success criteria
2. Identify all personas affected by the epic
3. List all capabilities needed for each persona
4. Group capabilities into logical stories
5. Validate each story is ≤8 points
6. Identify dependencies between stories
7. Sequence stories for incremental delivery
8. **Validation:** Each story delivers standalone value; total stories cover epic scope

### Splitting Techniques

| Technique | When to Use | Example |
|-----------|-------------|---------|
| By workflow step | Linear process | "Checkout" → "Add to cart" + "Enter payment" + "Confirm order" |
| By persona | Multiple user types | "Dashboard" → "Admin dashboard" + "User dashboard" |
| By data type | Multiple inputs | "Import" → "Import CSV" + "Import Excel" |
| By operation | CRUD functionality | "Manage users" → "Create" + "Edit" + "Delete" |
| Happy path first | Risk reduction | "Feature" → "Basic flow" + "Error handling" + "Edge cases" |

### Epic Example

**Epic:** User Dashboard

**Breakdown:**
```
Epic: User Dashboard (34 points total)
├── US-001: View key metrics (5 pts) - End User
├── US-002: Customize layout (5 pts) - Power User
├── US-003: Export data to CSV (3 pts) - End User
├── US-004: Share with team (5 pts) - End User
├── US-005: Set up alerts (5 pts) - Power User
├── US-006: Filter by date range (3 pts) - End User
├── US-007: Admin overview (5 pts) - Admin
└── US-008: Enable caching (3 pts) - Enabler
```

---

## Sprint Planning Workflow

Plan sprint capacity and select stories:

1. Calculate team capacity (velocity × availability)
2. Review sprint goal with stakeholders
3. Select stories from prioritized backlog
4. Fill to 80-85% of capacity (committed)
5. Add stretch goals (10-15% additional)
6. Identify dependencies and risks
7. Break complex stories into tasks
8. **Validation:** Committed points ≤85% capacity; all stories have acceptance criteria

### Capacity Calculation

```
Sprint Capacity = Average Velocity × Availability Factor

Example:
Average Velocity: 30 points
Team availability: 90% (one member partially out)
Adjusted Capacity: 27 points

Committed: 23 points (85% of 27)
Stretch: 4 points (15% of 27)
```

### Availability Factors

| Scenario | Factor |
|----------|--------|
| Full sprint, no PTO | 1.0 |
| One team member out 50% | 0.9 |
| Holiday during sprint | 0.8 |
| Multiple members out | 0.7 |

### Sprint Loading Template

```
Sprint Capacity: 27 points
Sprint Goal: [Clear, measurable objective]

COMMITTED (23 points):
[H] US-001: User dashboard (5 pts)
[H] US-002: Export feature (3 pts)
[H] US-003: Search filter (5 pts)
[M] US-004: Settings page (5 pts)
[M] US-005: Help tooltips (3 pts)
[L] US-006: Theme options (2 pts)

STRETCH (4 points):
[L] US-007: Sort options (2 pts)
[L] US-008: Print view (2 pts)
```

See `references/sprint-planning-guide.md` for complete planning procedures.

---

## Backlog Prioritization

Prioritize backlog using value and effort assessment.

### Priority Levels

| Priority | Definition | Sprint Target |
|----------|------------|---------------|
| Critical | Blocking users, security, data loss | Immediate |
| High | Core functionality, key user needs | This sprint |
| Medium | Improvements, enhancements | Next 2-3 sprints |
| Low | Nice-to-have, minor improvements | Backlog |

### Prioritization Factors

| Factor | Weight | Questions |
|--------|--------|-----------|
| Business Value | 40% | Revenue impact? User demand? Strategic alignment? |
| User Impact | 30% | How many users? How frequently used? |
| Risk/Dependencies | 15% | Technical risk? External dependencies? |
| Effort | 15% | Size? Complexity? Uncertainty? |

### INVEST Criteria Validation

Before adding to sprint, validate each story:

| Criterion | Question | Pass If... |
|-----------|----------|------------|
| **I**ndependent | Can this be developed without other uncommitted stories? | No blocking dependencies |
| **N**egotiable | Is the implementation flexible? | Multiple approaches possible |
| **V**aluable | Does this deliver user or business value? | Clear benefit in "so that" |
| **E**stimable | Can the team estimate this? | Understood well enough to size |
| **S**mall | Can this complete in one sprint? | ≤8 story points |
| **T**estable | Can we verify this is done? | Clear acceptance criteria |

---

## Reference Documentation

### User Story Templates

`references/user-story-templates.md` contains:

- Standard story formats by type (feature, improvement, bug fix, enabler)
- Acceptance criteria patterns (Given-When-Then, Should/Must/Can)
- INVEST criteria validation checklist
- Story point estimation guide (Fibonacci scale)
- Common story antipatterns and fixes
- Story splitting techniques

### Sprint Planning Guide

`references/sprint-planning-guide.md` contains:

- Sprint planning meeting agenda
- Capacity calculation formulas
- Backlog prioritization framework (WSJF)
- Sprint ceremony guides (standup, review, retro)
- Velocity tracking and burndown patterns
- Definition of Done checklist
- Sprint metrics and targets

---

## Tools

### User Story Generator

```bash
# Generate stories from sample epic
python scripts/user_story_generator.py

# Plan sprint with capacity
python scripts/user_story_generator.py sprint 30
```

Generates:
- INVEST-compliant user stories
- Given-When-Then acceptance criteria
- Story point estimates (Fibonacci scale)
- Priority assignments
- Sprint loading with committed and stretch items

### Sample Output

```
USER STORY: USR-001
========================================
Title: View Key Metrics
Type: story
Priority: HIGH
Points: 5

Story:
As a End User, I want to view key metrics and KPIs
so that I can save time and work more efficiently

Acceptance Criteria:
  1. Given user has access, When they view key metrics, Then the result is displayed
  2. Should validate input before processing
  3. Must show clear error message when action fails
  4. Should complete within 2 seconds
  5. Must be accessible via keyboard navigation

INVEST Checklist:
  ✓ Independent
  ✓ Negotiable
  ✓ Valuable
  ✓ Estimable
  ✓ Small
  ✓ Testable
```

---

## Sprint Metrics

Track sprint health and team performance.

### Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Velocity | Points completed / sprint | Stable ±10% |
| Commitment Reliability | Completed / Committed | >85% |
| Scope Change | Points added or removed mid-sprint | <10% |
| Carryover | Points not completed | <15% |

### Velocity Tracking

```
Sprint 1: 25 points
Sprint 2: 28 points
Sprint 3: 30 points
Sprint 4: 32 points
Sprint 5: 29 points
------------------------
Average Velocity: 28.8 points
Trend: Stable

Planning: Commit to 24-26 points
```

### Definition of Done

Story is complete when:

- [ ] Code complete and peer reviewed
- [ ] Unit tests written and passing
- [ ] Acceptance criteria verified
- [ ] Documentation updated
- [ ] Deployed to staging environment
- [ ] Product Owner accepted
- [ ] No critical bugs remaining

## Related Skills

- **Scrum Master** (`project-management/scrum-master/`) — Velocity data and sprint ceremonies complement backlog management
- **Product Manager Toolkit** (`product-team/product-manager-toolkit/`) — RICE prioritization feeds backlog ordering

---

# Reference material

Where the instructions above say to read a `references/` file, use the matching section below.

## references/sprint-planning-guide.md

# Sprint Planning Guide

Sprint planning workflows, capacity calculation, and backlog management.

---

## Table of Contents

- [Sprint Planning Workflow](#sprint-planning-workflow)
- [Capacity Planning](#capacity-planning)
- [Backlog Prioritization](#backlog-prioritization)
- [Sprint Ceremonies](#sprint-ceremonies)
- [Metrics and Tracking](#metrics-and-tracking)

---

## Sprint Planning Workflow

### Pre-Planning (1-2 Days Before)

1. Review and refine backlog items for upcoming sprint
2. Ensure top items have acceptance criteria
3. Validate story point estimates with team
4. Identify dependencies between stories
5. Confirm team availability for sprint
6. **Validation:** Top 1.5x capacity of stories are refined and estimated

### Sprint Planning Meeting

**Duration:** 2 hours for 2-week sprint

**Agenda:**

| Time | Activity | Participants |
|------|----------|--------------|
| 0:00-0:15 | Review sprint goal and priorities | PO presents |
| 0:15-0:45 | Discuss top backlog items | Team asks questions |
| 0:45-1:15 | Team selects stories for sprint | Team decides |
| 1:15-1:45 | Break down stories into tasks | Team collaborates |
| 1:45-2:00 | Confirm commitment and identify risks | All |

### Planning Checklist

**Before Planning:**
- [ ] Backlog groomed with top items refined
- [ ] Previous sprint retrospective actions reviewed
- [ ] Team capacity calculated
- [ ] Dependencies identified
- [ ] Sprint goal drafted

**During Planning:**
- [ ] Sprint goal agreed
- [ ] Stories selected fit within capacity
- [ ] Acceptance criteria reviewed for each story
- [ ] Tasks identified for complex stories
- [ ] Risks and blockers discussed

**After Planning:**
- [ ] Sprint backlog visible to all
- [ ] Sprint goal communicated
- [ ] Calendar blocked for ceremonies
- [ ] Dependencies communicated to other teams

---

## Capacity Planning

### Team Capacity Calculation

```
Sprint Capacity = (Team Members × Sprint Days × Hours/Day × Focus Factor)
                  ÷ Hours per Story Point

Simplified Version:
Sprint Capacity = Average Velocity × Availability Factor
```

### Availability Factors

| Scenario | Factor | Example |
|----------|--------|---------|
| Full sprint, no PTO | 1.0 | 30 points if velocity = 30 |
| 1 team member out 50% | 0.9 | 27 points |
| Holiday during sprint | 0.8 | 24 points |
| Multiple team members out | 0.7 | 21 points |
| Major release/on-call | 0.75 | 22-23 points |

### Capacity Buffer Rules

| Commitment Level | % of Velocity | Purpose |
|------------------|---------------|---------|
| Committed | 80-85% | High confidence delivery |
| Stretch | 10-15% | Optional if things go well |
| Buffer | 5-10% | Unplanned work, bugs |

### Sprint Loading Example

```
Team Velocity: 30 points/sprint
Availability: 90% (one team member partially out)
Adjusted Velocity: 27 points

Sprint Loading:
- Committed work: 23 points (85% of 27)
- Stretch goals: 4 points (15% of 27)
- Buffer: Remaining capacity for bugs/support

Story Selection:
[H] US-001: User dashboard (5 pts) ← Committed
[H] US-002: Export feature (3 pts) ← Committed
[H] US-003: Search filter (5 pts) ← Committed
[M] US-004: Settings page (5 pts) ← Committed
[M] US-005: Help tooltips (3 pts) ← Committed
[L] US-006: Theme options (2 pts) ← Committed
------------------------
Committed Total: 23 points

[L] US-007: Sort options (2 pts) ← Stretch
[L] US-008: Print view (2 pts) ← Stretch
------------------------
Stretch Total: 4 points
```

---

## Backlog Prioritization

### Priority Framework

| Priority | Definition | SLA |
|----------|------------|-----|
| Critical | Blocking users, security, data loss | Immediate |
| High | Core functionality, key user needs | This sprint |
| Medium | Improvements, enhancements | Next 2-3 sprints |
| Low | Nice-to-have, minor improvements | Backlog |

### Prioritization Factors

| Factor | Weight | Questions |
|--------|--------|-----------|
| Business Value | 40% | Revenue impact? User demand? Strategic? |
| User Impact | 30% | How many users? How often used? |
| Risk/Dependencies | 15% | Technical risk? External dependencies? |
| Effort | 15% | Size? Complexity? Uncertainty? |

### WSJF (Weighted Shortest Job First)

For larger items, use SAFe's WSJF:

```
WSJF = Cost of Delay / Job Duration

Cost of Delay = User Value + Time Criticality + Risk Reduction

Scale: 1, 2, 3, 5, 8, 13, 20

Example:
Feature A: CoD = 13, Duration = 5 → WSJF = 2.6
Feature B: CoD = 8, Duration = 2 → WSJF = 4.0 ← Higher priority
```

### Backlog Organization

| Section | Content | Review Frequency |
|---------|---------|------------------|
| Sprint Backlog | Committed for current sprint | Daily |
| Ready | Refined, estimated, prioritized | Each planning |
| Grooming | Needs refinement | Weekly |
| Icebox | Future consideration | Monthly |
| Archive | Completed or obsolete | Quarterly |

---

## Sprint Ceremonies

### Daily Standup

**Duration:** 15 minutes max
**Format:** Each team member answers:

1. What did I complete yesterday?
2. What will I work on today?
3. What blockers do I have?

**Product Owner Role:**
- Listen for blockers needing PO action
- Answer clarifying questions
- Note scope concerns for offline discussion
- Update stakeholders on progress

### Backlog Refinement (Grooming)

**Duration:** 1-2 hours per week
**Timing:** Mid-sprint

**Agenda:**

| Time | Activity |
|------|----------|
| 0:00-0:15 | Review upcoming priorities |
| 0:15-0:45 | Detail acceptance criteria for top items |
| 0:45-1:15 | Estimate new stories |
| 1:15-1:30 | Split large stories |

**Readiness Criteria:**
- [ ] Clear user story format (As a... I want... So that...)
- [ ] Acceptance criteria defined (Given-When-Then)
- [ ] Story point estimate agreed
- [ ] Dependencies identified
- [ ] Fits in one sprint (≤8 points)

### Sprint Review (Demo)

**Duration:** 1 hour for 2-week sprint

**Agenda:**

| Time | Activity | Lead |
|------|----------|------|
| 0:00-0:05 | Sprint goal recap | PO |
| 0:05-0:40 | Demo completed work | Team |
| 0:40-0:50 | Stakeholder feedback | Stakeholders |
| 0:50-1:00 | Roadmap update | PO |

**Demo Checklist:**
- [ ] Only demo completed (done-done) stories
- [ ] Use production or production-like environment
- [ ] Show user perspective, not technical details
- [ ] Collect feedback for backlog items
- [ ] Thank team for accomplishments

### Sprint Retrospective

**Duration:** 1.5 hours for 2-week sprint

**Format Options:**

| Format | Structure |
|--------|-----------|
| Start-Stop-Continue | What to begin, end, keep doing |
| 4Ls | Liked, Learned, Lacked, Longed for |
| Sailboat | Wind (helpers), Anchors (blockers), Rocks (risks) |
| Mad-Sad-Glad | Emotional state about sprint events |

**Action Items:**
- Maximum 2-3 improvement actions per retro
- Assign owner and due date
- Review previous actions at start of next retro

---

## Metrics and Tracking

### Sprint Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Velocity | Points completed / sprint | Stable ±10% |
| Commitment Reliability | Completed / Committed | >85% |
| Scope Change | Points added or removed | <10% |
| Carryover | Points not completed | <15% |
| Bug Ratio | Bug points / Total points | <20% |

### Velocity Tracking

```
Sprint Velocity Trend:
Sprint 1: 25 points
Sprint 2: 28 points
Sprint 3: 30 points
Sprint 4: 32 points
Sprint 5: 29 points
------------------------
Average: 28.8 points
Trend: Stable (±10%)

Planning Recommendation: Plan for 26-29 points committed
```

### Burndown Chart

Track progress within sprint:

```
Day   Ideal    Actual   Status
---   -----    ------   ------
 0     30       30      On track
 2     24       26      Slightly behind
 4     18       20      Behind
 6     12       14      Recovering
 8      6        6      On track
10      0        2      Minor carryover
```

**Burndown Patterns:**

| Pattern | Meaning | Action |
|---------|---------|--------|
| Flat start | No progress early | Check blockers |
| Late drop | Last-minute completion | Improve WIP limits |
| Scope increase | Line moves up | Address scope creep |
| Early completion | Done before sprint end | Pull stretch items |

### Definition of Done

Story is complete when:

- [ ] Code complete and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Acceptance criteria verified
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] PO accepted
- [ ] No critical bugs

### Release Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| Lead Time | Idea to production | <2 sprints |
| Cycle Time | Development start to done | <1 sprint |
| Throughput | Stories completed/sprint | Increasing |
| Defect Escape | Bugs found in production | Decreasing |

## references/user-story-templates.md

# User Story Templates

Standard templates, acceptance criteria patterns, and INVEST validation for user stories.

---

## Table of Contents

- [Story Templates](#story-templates)
- [Acceptance Criteria Patterns](#acceptance-criteria-patterns)
- [INVEST Criteria](#invest-criteria)
- [Story Point Estimation](#story-point-estimation)
- [Common Antipatterns](#common-antipatterns)

---

## Story Templates

### Standard User Story Format

```
As a [persona],
I want to [action/capability],
So that [benefit/value].
```

### Template by Story Type

**Feature Story:**
```
As a [persona],
I want to [perform action]
So that [I achieve benefit].

Example:
As a marketing manager,
I want to export campaign reports to PDF
So that I can share results with stakeholders who don't have system access.
```

**Improvement Story:**
```
As a [persona],
I need [capability/improvement]
To [achieve goal more effectively].

Example:
As a sales rep,
I need faster search results
To find customer records without interrupting calls.
```

**Bug Fix Story:**
```
As a [persona],
I expect [correct behavior]
When [specific condition].

Example:
As a user,
I expect my session to remain active
When navigating between dashboard tabs.
```

**Integration Story:**
```
As a [persona],
I want to [integrate/connect with system]
So that [workflow improvement].

Example:
As an admin,
I want to sync user data with our LDAP server
So that employees are automatically provisioned.
```

**Enabler Story (Technical):**
```
As a developer,
I need to [technical requirement]
To enable [user-facing capability].

Example:
As a developer,
I need to implement caching layer
To enable sub-second dashboard load times.
```

### Persona Library

| Persona | Typical Needs | Context |
|---------|--------------|---------|
| End User | Efficiency, simplicity, reliability | Daily core feature usage |
| Administrator | Control, visibility, security | System management |
| Power User | Automation, customization, shortcuts | Expert workflows |
| New User | Guidance, learning, safety | Onboarding experience |
| Manager | Reporting, oversight, delegation | Team coordination |
| External User | Access, security, documentation | Customer/partner usage |

---

## Acceptance Criteria Patterns

### Given-When-Then (Gherkin)

Preferred format for testable acceptance criteria:

```
Given [precondition/context],
When [action/trigger],
Then [expected outcome].
```

**Examples:**

```
Given the user is logged in with valid credentials,
When they click the "Export" button,
Then a PDF download starts within 2 seconds.

Given the user has entered invalid email format,
When they submit the registration form,
Then an inline error message displays "Please enter a valid email address."

Given the daily sync job has not run in 24 hours,
When the scheduler triggers at midnight,
Then all pending records are synchronized and logged.
```

### Should/Must/Can Patterns

**Should (Expected Behavior):**
```
Should [behavior] when [condition].

Example:
Should display loading spinner when API call exceeds 500ms.
```

**Must (Hard Requirement):**
```
Must [requirement] to [achieve outcome].

Example:
Must encrypt all data at rest to meet compliance requirements.
```

**Can (Capability):**
```
Can [capability] without [negative outcome].

Example:
Can undo last action without losing other changes.
```

### Acceptance Criteria Checklist

Each story should have acceptance criteria covering:

| Category | Example Criterion |
|----------|-------------------|
| Happy Path | Given valid input, When submitted, Then success message displayed |
| Validation | Should reject input when required field is empty |
| Error Handling | Must show user-friendly message when API fails |
| Performance | Should complete operation within 2 seconds |
| Accessibility | Must be navigable via keyboard only |
| Security | Should not expose sensitive data in URL parameters |

### Minimum Acceptance Criteria Count

| Story Size (Points) | Minimum AC Count |
|--------------------|------------------|
| 1-2 | 3-4 |
| 3-5 | 4-6 |
| 8 | 5-8 |
| 13+ | Split the story |

---

## INVEST Criteria

### INVEST Validation Checklist

| Criterion | Question | Pass If... |
|-----------|----------|------------|
| **I**ndependent | Can this story be developed without depending on another story? | No blocking dependencies on uncommitted work |
| **N**egotiable | Is the implementation approach flexible? | Multiple ways to deliver the value |
| **V**aluable | Does this deliver value to users or business? | Clear benefit statement in "so that" |
| **E**stimable | Can the team estimate this story? | Understood well enough to size |
| **S**mall | Can this be completed in one sprint? | ≤8 story points typically |
| **T**estable | Can we verify this story is done? | Clear, measurable acceptance criteria |

### INVEST Failure Patterns

| Criterion | Red Flag | Fix |
|-----------|----------|-----|
| Independent | "After story X is done..." | Combine stories or resequence |
| Negotiable | Specific implementation in story | Focus on outcome, not solution |
| Valuable | No "so that" clause | Add benefit statement |
| Estimable | Team says "no idea" | Spike first, then story |
| Small | >8 points | Split into smaller stories |
| Testable | "System should be better" | Add measurable criteria |

### Story Splitting Techniques

When stories are too large (>8 points), split using:

| Technique | Example |
|-----------|---------|
| By workflow step | "Create order" → "Add items" + "Apply discount" + "Submit order" |
| By persona | "User dashboard" → "Admin dashboard" + "Member dashboard" |
| By data type | "Import data" → "Import CSV" + "Import Excel" |
| By operation | "Manage users" → "Add user" + "Edit user" + "Delete user" |
| By platform | "Mobile support" → "iOS support" + "Android support" |
| Happy path first | "Full feature" → "Basic feature" + "Error handling" + "Edge cases" |

---

## Story Point Estimation

### Fibonacci Scale Reference

| Points | Complexity | Example |
|--------|------------|---------|
| 1 | Trivial | Fix typo, change label |
| 2 | Simple | Add field, simple validation |
| 3 | Small | New form, basic CRUD operation |
| 5 | Medium | Feature with multiple components |
| 8 | Large | Complex feature, multiple integrations |
| 13 | Very Large | Consider splitting |
| 21+ | Epic | Must split |

### Estimation Factors

| Factor | Low Complexity | High Complexity |
|--------|---------------|-----------------|
| Unknowns | Well understood | Many unknowns |
| Dependencies | None | Multiple systems |
| Testing | Simple unit tests | Complex integration tests |
| Data | Simple structure | Complex transformations |
| UI | Minor changes | New components |

### Velocity Calculation

```
Velocity = Total points completed / Number of sprints

Example:
Sprint 1: 28 points
Sprint 2: 32 points
Sprint 3: 30 points
Average Velocity: (28 + 32 + 30) / 3 = 30 points/sprint

Sprint Capacity Planning:
- Committed: 80-90% of velocity (24-27 points)
- Stretch goals: 10-20% additional (3-6 points)
```

---

## Common Antipatterns

### Story Antipatterns

| Antipattern | Example | Fix |
|-------------|---------|-----|
| Solution story | "Implement React component" | "Display user profile information" |
| Compound story | "Create, edit, and delete users" | Split into three stories |
| Missing persona | "The system will..." | "As an admin, I want to..." |
| No benefit | "I want to see a button" | Add "so that [benefit]" |
| Too vague | "Improve performance" | "Reduce page load to <2 seconds" |
| Technical jargon | "Implement Redis caching" | "Enable instant search results" |

### Acceptance Criteria Antipatterns

| Antipattern | Example | Fix |
|-------------|---------|-----|
| Too vague | "Works correctly" | Specific Given-When-Then |
| Implementation details | "Use PostgreSQL query" | Focus on outcome |
| Missing unhappy path | Only success scenario | Add error cases |
| Untestable | "User is happy" | Measurable behavior |
| Too many | 15+ criteria | Split the story |

### Sprint Planning Antipatterns

| Antipattern | Impact | Fix |
|-------------|--------|-----|
| 100% capacity | No buffer for unknowns | Plan 80-85% |
| All large stories | Risk of incomplete sprint | Mix sizes |
| No dependencies mapped | Blocked work | Identify dependencies upfront |
| Stretch = overflow | Hiding overcommitment | Stretch should be optional |
