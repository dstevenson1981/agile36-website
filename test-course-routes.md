# Course Route Verification

## Issues Found:

1. **SAFe DevOps Route Mismatch:**
   - Homepage routes to: `/courses/safe-devops`
   - Courses page routes to: `/courses/devops`
   - Actual directory: `devops/`
   - **FIX NEEDED:** Homepage should route to `/courses/devops`

2. **Missing Routes:**
   - "AI-Driven Project Manager™" - not in homepage courseRoutes
   - "Agentic Product Leader Certification" - not in homepage courseRoutes

3. **Courses Page Missing Routes:**
   - "Generative AI for Project Managers" - needs route check
   - "AI-Driven Project Manager™" - needs route check

## All Courses and Their Expected Routes:

### SAFe Courses:
- Leading SAFe/ SAFe Agilist → `/courses/leading-safe` ✓
- SAFe Product Owner/Product Manager → `/courses/product-owner-manager` ✓
- SAFe Lean Portfolio Management → `/courses/lean-portfolio-management` ✓
- SAFe Agile Product Management → `/courses/agile-product-management` ✓
- SAFe Scrum Master → `/courses/scrum-master` ✓
- SAFe for Teams → `/courses/safe-for-teams` ✓
- SAFe DevOps → `/courses/devops` (NOT safe-devops) ✗
- SAFe Advanced Scrum Master → `/courses/advanced-scrum-master` ✓
- SAFe Release Train Engineer → `/courses/release-train-engineer` ✓
- SAFe Value Stream Mapping → `/courses/value-stream-mapping` ✓
- Responsible AI → `/courses/responsible-ai` ✓

### Generative AI Courses:
- AI-Driven Scrum Master™ → `/courses/ai-driven-scrum-master` ✓
- Executive GenAI Leadership™ → `/courses/executive-genai-leadership` ✓
- Generative AI for Project Managers → `/courses/generative-ai-project-managers` ✓
- Certified GenAI Practitioner™ → `/courses/certified-genai-practitioner` ✓
- AI-Driven Project Manager™ → **NEEDS ROUTE** ✗

### AI Product Courses:
- No-Code AI Agents & Automation™ → `/courses/ai-agent-builder` ✓
- Certified AI Product Manager → `/courses/certified-ai-product-manager` ✓
- Agentic Product Leader Certification → **NEEDS ROUTE** ✗

### PMI Courses:
- PMP® Certification Training → `/courses/pmp-certification` ✓
