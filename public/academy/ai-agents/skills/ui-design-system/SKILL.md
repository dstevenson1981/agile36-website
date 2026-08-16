---
name: ui-design-system
description: Define tokens, components, and handoff notes for a consistent UI. Use when creating or extending a visual system before building screens.
---

# UI design system

## Workflow

1. **Tokens** — color (4–6 named hex), type (display + body), spacing scale, radii, elevation  
2. **Components** — button, input, card/panel, nav — states: default, hover, focus, disabled, error  
3. **Layout rules** — max width, grid/columns, section rhythm  
4. **Handoff** — CSS variables or Tailwind map + usage do/don't  

## Accessibility floor

- Text contrast AA minimum  
- Visible focus rings  
- Interactive targets ≥ 44px where practical  
- Don't rely on color alone  

## Deliverable checklist

- [ ] Token table with hex / rem values  
- [ ] Component inventory with states  
- [ ] One example screen using only the system  
- [ ] Notes for the frontend agent  

Adapted for Agile36 class labs from common design-system skill patterns (MIT-licensed community skills).
