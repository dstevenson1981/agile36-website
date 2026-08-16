---
name: frontend-ui-implementation
description: Implement responsive, accessible UI from a design system or mock. Use when building React/Next (or similar) screens to match design intent.
---

# Frontend UI implementation

## Order of work

1. Confirm tokens / components already exist — reuse before inventing  
2. Structure semantic HTML / landmarks  
3. Layout (mobile first)  
4. Interaction states + loading / empty / error  
5. Accessibility pass (keyboard, focus, labels, contrast)  
6. Perf basics (images, avoid layout thrash)  

## Definition of done

- Matches design intent (spacing, type hierarchy)  
- Keyboard operable; focus visible  
- No horizontal scroll on common mobile widths  
- Loading and error states exist  
- No `text-black` traps on sites that remap Tailwind black  

## Anti-patterns

- One-off magic numbers instead of tokens  
- Click-only interactions with no keyboard path  
- Shipping without empty/error states
