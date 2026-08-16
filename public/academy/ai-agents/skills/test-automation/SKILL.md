---
name: test-automation
description: Plan and write automated tests (unit, integration, E2E) for the critical path. Use when adding coverage or scaffolding a test suite.
---

# Test automation

## Strategy

| Layer | Use for |
|-------|---------|
| Unit | Pure logic, reducers, validators |
| Integration | Component + API mocks |
| E2E | Critical user journeys only |

## Process

1. List critical paths from the PRD / stories  
2. Write failing tests for behavior (not implementation)  
3. Cover happy path + one failure path each  
4. Keep E2E few and stable — mock flaky externals  

## Rules

- Tests document intent  
- Don't assert on incidental CSS classes  
- Flaky tests are bugs — quarantine or fix, don't ignore
