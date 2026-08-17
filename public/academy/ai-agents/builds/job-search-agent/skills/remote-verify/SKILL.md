---
name: remote-verify
description: Verify remote/hybrid/onsite from posting text. Never trust search filters alone.
---

# Skill: Remote verify

## Responsibility

Read the posting body and classify work arrangement.

## Labels

| Label | When |
|-------|------|
| `remote` | Posting clearly states remote / work from home / distributed |
| `hybrid` | Posting clearly states hybrid |
| `onsite` | Posting clearly requires office / on-site |
| `unverified` | Filter said remote but posting missing, blocked, or ambiguous |

## Must not

- Trust LinkedIn/Dice “Remote” filters by themselves.
- Upgrade `unverified` to `remote` to fill a quota.

## Outputs

- Same candidate list with a `remote` field set.
