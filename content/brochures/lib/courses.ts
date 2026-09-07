/**
 * Per-course brochure supplements.
 *
 * Only what the website does not already publish lives here. Anything the
 * catalog landing holds — title, lede, outcomes, curriculum, exam note,
 * reviews — is read from `getCatalogLanding(slug)` at render time.
 *
 * AI sections for SAFe courses are sourced from the official Scaled Agile
 * courseware kits (release notes + workbook). Do not invent lesson content.
 */
import { COURSE_HERO_SCHEDULE_LIST_USD as PRICE } from "@/app/lib/course-hero-schedule-pricing";
import type { BrochureCourse } from "./types";

const BAND = "../assets/cover-band.jpg";

const RESPONSIBLE_AI = {
  lede: "A full topic, not a disclaimer. You'll work through common AI risks and the three aspects of responsible use:",
  points: [
    "<strong>Trustworthy AI</strong> — reliable enough to base a decision on",
    "<strong>Explainable AI</strong> — you can say why it produced that",
    "<strong>Human-centric AI</strong> — the person stays accountable",
  ],
};

/** Scaled Agile's four shifts, from the Achieving AI-Empowered Agility article. */
const FOUR_SHIFTS = {
  heading: "AI-Empowered Agility — the four shifts",
  note: "Aligned to Scaled Agile's <em style=\"font-style:italic\">Achieving AI-Empowered Agility</em> framework article.",
  items: [
    { label: "Shift 01", title: "Outcomes and intent", body: "Direct the work by the result you want, not the tasks you'd have assigned." },
    { label: "Shift 02", title: "Rapid experimentation", body: "Shorter learning loops, because the cost of trying an option has collapsed." },
    { label: "Shift 03", title: "Innovation at scale", body: "Development and discovery running wider than headcount alone would allow." },
    { label: "Shift 04", title: "AI-augmented teams", body: "Cross-functional teams where AI is a working member, and a human still owns the call." },
  ],
};

const INDUSTRIES = [
  "Financial services and insurance",
  "Healthcare and life sciences",
  "Government and public sector",
  "Telecom and media",
  "Retail and logistics",
  "Higher education",
];

export const BROCHURE_COURSES: Record<string, BrochureCourse> = {
  /* ------------------------------------------------------------------ POPM */
  "product-owner-manager": {
    slug: "product-owner-manager",
    version: "2026.05",
    subtitle: "Discovering product roles with SAFe and AI",
    coverTitle: { main: "AI-Empowered SAFe®<br />Product Owner /", accent: "Product Manager" },
    badge: "/POPM.jpg",
    band: BAND,
    path: "/courses/product-owner-manager",
    price: PRICE["product-owner-manager"],
    exam: { minutes: 90, questions: 45, pass: "82%", attempts: "First two included" },
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs / SEUs",
    prerequisites: [
      "None. The course is open to all attendees.",
      "Experience in a SAFe, Lean, or Agile environment is helpful but not required.",
      "No prior AI experience is assumed — prompting is taught from the ground up.",
    ],
    audience: [
      { role: "Product Owners", note: "Current and aspiring, at team level." },
      { role: "Product Managers", note: "Owning features and roadmaps on an ART." },
      { role: "Business Owners", note: "Accountable for value delivered." },
      { role: "Business Analysts", note: "Moving into product ownership." },
      { role: "Solution Managers", note: "Working across multiple ARTs." },
      { role: "Portfolio Managers", note: "Connecting strategy to execution." },
      { role: "Agile Coaches & RTEs", note: "Supporting product roles day to day." },
      { role: "Architects", note: "Enterprise and system, partnering with product." },
    ],
    industries: INDUSTRIES,
    // Lesson structure from the 2026.05 workbook and release notes. The
    // standalone "AI for Product Roles" lesson was removed in this release.
    lessons: [
      {
        title: "Exploring Product Roles and Responsibilities",
        topics: [
          "Introducing SAFe for product roles",
          "The Lean-Agile mindset",
          "Value streams",
          "Responsibilities of product roles",
        ],
        aiTopics: [
          "AI-Empowered SAFe — AI, ML, DL and generative AI; LLMs, prompting, RAG, and when agents are needed",
        ],
      },
      {
        title: "Preparing for PI Planning",
        topics: [
          "PI Planning",
          "The solution vision",
          "Solution and PI roadmaps",
          "Customer-centric features",
          "ART backlog and Kanban",
        ],
        aiTopics: [
          "AI-powered customer research, good data vs. bad data, and generative AI for writing better features",
        ],
      },
      {
        title: "Leading PI Planning",
        topics: [
          "Communicate the vision",
          "Establish PI Objectives",
          "Manage dependencies",
          "Manage risks",
        ],
        aiTopics: [
          "AI-empowered PI Planning, and using AI to sharpen how the vision is communicated",
        ],
      },
      {
        title: "Executing Iterations",
        topics: [
          "Stories and story maps",
          "Iteration Planning",
          "Team Sync",
          "Backlog Refinement",
          "Iteration Review and Iteration Retrospective",
          "Continuous Delivery Pipeline",
        ],
        aiTopics: [
          "AI-assisted Iteration Planning — synthesizing stories into outcome-focused iteration goals",
        ],
      },
      {
        title: "Executing the PI",
        topics: [
          "Aligning delivery with sync events",
          "The System Demo",
          "The Innovation and Planning iteration",
          "Inspect &amp; Adapt",
        ],
        aiTopics: [
          "Responsible AI — common risks, trustworthy, explainable, and human-centric AI",
          "AI-Empowered Agility — the four shifts, and building a human-centric AI culture",
        ],
      },
      {
        title: "Get Certified",
        topics: [
          "Exam preparation and practice questions",
          "SAFe Studio resources and your learning plan",
          "SAFe Connect — your professional network",
          "Claiming your digital badge",
        ],
      },
    ],
    // Learning objectives as written in the 2026.05 workbook.
    outcomeGroups: [
      {
        title: "The role",
        items: [
          "Define SAFe as it relates to Product Owners and Product Management",
          "Summarize the Lean-Agile mindset for decision-making",
          "Explain value streams and the benefit they deliver",
          "Summarize the responsibilities of the PO and PM roles, and where they divide",
        ],
      },
      {
        title: "Planning and leading",
        items: [
          "Summarize PI Planning and explain the solution vision",
          "Forecast work through solution and PI roadmaps",
          "Plan beneficial, customer-centric features",
          "Communicate the vision, plan PI Objectives, organize dependencies, and analyze risks",
        ],
      },
      {
        title: "Executing",
        items: [
          "Write stories and story maps, and run Iteration Planning",
          "Manage flow through Team Sync and Backlog Refinement",
          "Contribute to Iteration Review, Retrospective, and the System Demo",
          "Manage the ART backlog and ART Kanban",
        ],
      },
    ],
    ai: {
      heading: "What you'll actually<br />practise with AI",
      lede: "Four hands-on activities, spread across the two days. You write the prompt, read what comes back critically, and edit it into something a real Agile Release Train could use.",
      activities: [
        {
          title: "Develop your SAFe message",
          where: "Lesson 1",
          body: "Start with basic prompting: goal, role, task, context, details. Learn what a prompt actually is, and why the same question phrased two ways gives you two very different answers.",
        },
        {
          title: "Prompt, refine, and edit",
          where: "Lesson 2",
          body: "Use AI-supported research to explore customer needs, then draft customer-centric features — and practise spotting where the model has confidently invented something.",
        },
        {
          title: "AI-empowered PI Planning",
          where: "Lesson 3",
          body: "Work through where AI genuinely helps in planning — and where structure, not speed, is what liberates a room full of teams.",
        },
        {
          title: "AI-assisted Iteration Planning",
          where: "Lesson 4",
          body: "Give a model a set of user stories and have it synthesize two or three outcome-focused iteration goals — not one goal per story. Then edit for the business outcome the team is actually chasing.",
        },
      ],
      techniques: [
        "Draft customer-centric <strong>features and epics</strong> with generative AI, then edit for the outcome",
        "Turn raw discovery into <strong>user stories, acceptance criteria, and iteration goals</strong> in minutes",
        "Build an <strong>outcome-driven roadmap</strong> — themes, sequencing, and trade-offs, pressure-tested by AI",
        "Write and stress-test <strong>OKRs</strong> that measure value delivered, not output shipped",
        "Go <strong>prompt-to-prototype</strong> — validate a clickable concept before you spend a sprint",
        "Keep it <strong>responsible</strong> — explainable, human-centric AI you can defend to the business",
      ],
      responsible: RESPONSIBLE_AI,
      shifts: FOUR_SHIFTS,
    },
    whatsNew: [
      { title: "AI woven through the class", body: "Five of six lessons now carry AI content, activities, or discussion — not one bolted-on module at the end." },
      { title: "Prompting you actually practise", body: "Four hands-on activities: research a customer, write a feature, sharpen a vision, draft iteration goals." },
      { title: "Responsible AI, as a topic", body: "Trustworthy, explainable, and human-centric AI — plus the four shifts to AI-empowered agility." },
    ],
    changed: [
      { title: "AI moved into the lessons", body: "The standalone \"AI for Product Roles\" lesson is gone. Its content now lives where the work happens — research in Lesson 2, planning in Lesson 3, iteration goals in Lesson 4." },
      { title: "Two new topics", body: "Responsible AI and AI-Empowered Agility both join Lesson 5, aligned to Scaled Agile's <em style=\"font-style:italic\">Achieving AI-Empowered Agility</em> framework article." },
      { title: "Action plans replaced", body: "End-of-lesson action plan slides are out. In their place: AI activities you work through during the lesson, while the material is still in front of you." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "6", label: "Lessons in the official 2026.05 courseware" },
      { value: "4", label: "Hands-on AI activities across the two days" },
      { value: "82", unit: "%", label: "To pass the 90-minute certification exam" },
    ],
    overview: {
      heading: "The product roles, rebuilt<br />for the AI era",
      body: [
        "Product Owners and Product Managers sit where strategy meets delivery. This two-day course teaches you to do that job on an Agile Release Train — writing the vision, shaping features and stories, leading PI Planning, managing the backlog, and representing the customer every day.",
        "What's new is <strong>how</strong> the work gets done. Scaled Agile's 2026.05 release threads AI through every lesson rather than bolting it on at the end: AI-supported customer research, generative AI for features and iteration goals, prompting techniques you'll actually practise, and a clear-eyed treatment of responsible AI. You leave able to pass the exam — and able to use these tools on Monday.",
      ],
    },
    whyNow: {
      heading: "AI changes the speed of<br />product work, not the foundations",
      body: "Backlogs still need refining. Customers still need understanding. Dependencies still need managing. What has changed is how fast a Product Owner or Product Manager can get from a pile of raw signal to a decision — and how badly it goes when the tooling is used without judgment. This release of POPM is built around exactly that gap.",
    },
    whyStats: {
      items: [
        { value: "2", label: "New AI topics added to the course: <strong>Responsible AI</strong> and <strong>AI-Empowered Agility</strong>" },
        { value: "5", unit: "/6", label: "Lessons that now include AI content, activities, or discussion" },
        { value: "4", label: "Shifts required for AI-empowered agility, covered in Lesson 5" },
      ],
      source: "Source: Scaled Agile, <em style=\"font-style:italic\">AI-Empowered SAFe® Product Owner/Product Manager (2026.05) Release Notes</em>.",
    },
  },

  /* ---------------------------------------------------------- Leading SAFe */
  "leading-safe": {
    slug: "leading-safe",
    version: "2026.02.24",
    subtitle: "Leading the change with SAFe and AI",
    coverTitle: { main: "AI-Empowered<br />Leading SAFe®", accent: "SAFe Agilist" },
    badge: "/Leading SAFe.png",
    band: BAND,
    path: "/courses/leading-safe",
    price: PRICE["leading-safe"],
    exam: { minutes: 90, pass: "80%", attempts: "First two included" },
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs / SEUs",
    prerequisites: [
      "None. The course is open to all attendees.",
      "Five or more years in software, systems, or business development helps, but is not required.",
      "No prior AI experience is assumed — prompting is taught from the ground up.",
    ],
    audience: [
      { role: "Executives & Directors", note: "Sponsoring or funding the change." },
      { role: "Managers", note: "Leading teams through a transformation." },
      { role: "Change Agents", note: "Driving Lean-Agile adoption." },
      { role: "Portfolio Managers", note: "Connecting strategy to execution." },
      { role: "Product Managers", note: "Owning vision and roadmaps." },
      { role: "Programme Managers", note: "Moving to ART-based delivery." },
      { role: "Consultants", note: "Advising on enterprise agility." },
      { role: "Architects", note: "Enterprise, solution, and system." },
    ],
    industries: INDUSTRIES,
    lessons: [
      { title: "Adapting and Thriving with SAFe", topics: ["Thriving in the age of disruption", "Building a Lean-Agile organization"], aiTopics: ["Discussion: AI disruption and what it changes for leaders"] },
      { title: "Building a Foundation with Mindset, Values, and Principles", topics: ["The Lean-Agile mindset and SAFe Core Values", "Applying SAFe Principles"], aiTopics: ["Empowering agility with AI — what AI accelerates, and where the risks sit"] },
      { title: "Team and Technical Agility", topics: ["Forming cross-functional Agile Teams", "Organizing Agile Release Trains around the flow of value", "Built-in quality", "Building a Continuous Delivery Pipeline with DevOps"], aiTopics: ["AI as a quality accelerator, and empowering Agile Teams with AI"] },
      { title: "Product Development Flow", topics: ["Customer centricity and design thinking", "Prioritizing the ART backlog", "PI Planning", "Executing the PI"], aiTopics: ["Exploring customer needs with AI-supported research, and AI-empowered PI Planning"] },
      { title: "Lean Portfolio Management", topics: ["Defining a SAFe portfolio", "Connecting the portfolio to enterprise strategy", "Maintaining the portfolio vision", "Realizing the portfolio vision through epics", "Establishing Lean budgets and guardrails", "Establishing portfolio flow"], aiTopics: ["Using AI to challenge and refine the epic hypothesis statement"] },
      { title: "Leading the Change", topics: ["Leading by example", "Leading the change"], aiTopics: ["Empowering leaders with AI"] },
    ],
    outcomeGroups: [
      { title: "Lead the change", items: ["Thrive in the age of disruption by building a Lean-Agile organization", "Lead by example and model the Lean-Agile mindset", "Establish the SAFe Core Values and Principles as the basis for decisions", "Build and lead a transformation others will follow"] },
      { title: "Organize around value", items: ["Form cross-functional Agile Teams and organize ARTs around the flow of value", "Build in quality rather than inspecting it in", "Establish a Continuous Delivery Pipeline with DevOps", "Apply customer centricity and design thinking"] },
      { title: "Run the portfolio", items: ["Define a SAFe portfolio and connect it to enterprise strategy", "Maintain the portfolio vision and realize it through epics", "Establish Lean budgets and guardrails", "Establish portfolio flow and prioritize the ART backlog"] },
    ],
    ai: {
      heading: "What AI changes<br />for the people leading",
      lede: "AI shows up in five of the six lessons — as discussion, activity, and a working tool. You write the prompts yourself and judge what comes back.",
      activities: [
        { title: "Discussion: AI disruption", where: "Lesson 1", body: "Open the class on what AI actually changes for a leader — and what it plainly does not. Speed, not foundations." },
        { title: "Empowering agility with AI", where: "Lesson 2", body: "Understand AI, ML, DL and generative AI well enough to lead a conversation about them, and see where the real risks sit." },
        { title: "Prompt, refine, and edit", where: "Lesson 4", body: "Explore customer needs with AI-supported research, then practise spotting where the model has confidently invented something." },
        { title: "Refine the epic hypothesis", where: "Lesson 5", body: "Put a real epic hypothesis statement to an LLM, have it challenge the thinking, and edit toward a statement the portfolio can fund." },
      ],
      techniques: [
        "Use AI to <strong>test strategy</strong> — challenge an epic hypothesis before you fund it",
        "Turn customer research into a <strong>defensible vision</strong>, not a generated one",
        "Judge <strong>AI-generated data</strong> critically: garbage in, garbage out, at portfolio scale",
        "Understand where <strong>AI accelerates quality</strong> and where it quietly erodes it",
        "Lead teams that use AI without handing them your <strong>accountability</strong>",
      ],
      responsible: RESPONSIBLE_AI,
      shifts: FOUR_SHIFTS,
    },
    whatsNew: [
      { title: "AI runs through the class", body: "Five of six lessons now carry AI content — discussion in Lesson 1, foundations in Lesson 2, and working activities from Lesson 3 on." },
      { title: "A new topic on AI", body: "\"Empowering agility with AI\" joins Lesson 2, covering model types, prompting, and where AI is revolutionary but not without risk." },
      { title: "Leaders get their own section", body: "Lesson 6 closes on empowering leaders with AI — what to delegate to it, and what stays yours." },
    ],
    changed: [
      { title: "AI-Empowered branding", body: "This is the AI-Empowered release of Leading SAFe. Slides, activities, and learning objectives were reworked around it rather than appended." },
      { title: "Working activities, not slides", body: "The AI content is discussion- and activity-led: AI disruption, empowering teams with AI, prompt-refine-edit, and refining an epic hypothesis." },
      { title: "Portfolio work gets AI", body: "Lesson 5 now has you put a real epic hypothesis statement to an LLM and edit what it gives back." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "6", label: "Lessons in the official 2026.02.24 courseware" },
      { value: "5", unit: "/6", label: "Lessons that now carry AI content" },
      { value: "80", unit: "%", label: "To pass the 90-minute SAFe Agilist exam" },
    ],
    overview: {
      heading: "Lead the transformation,<br />not just attend it",
      body: [
        "Leading SAFe is where executives, managers, and change agents learn to run a Lean-Agile enterprise — organizing around the flow of value, funding it through a Lean portfolio, and leading the change by example rather than mandate.",
        "The AI-Empowered release adds the question every leader is now being asked: what does AI actually change? The answer this course gives is precise — it changes decision velocity, experimentation, and feedback, not the foundations. You leave able to sit the SAFe Agilist exam, and able to lead that conversation without hand-waving.",
      ],
    },
    whyNow: {
      heading: "AI raises decision velocity.<br />Someone still owns the decision",
      body: "Leaders are being asked to adopt AI and to stay accountable for what it produces — often in the same meeting. This release of Leading SAFe treats that squarely: where AI genuinely accelerates flow, feedback and experimentation, where it introduces risk, and why the moment AI is allowed to act, leadership accountability increases rather than decreases.",
    },
    whyStats: {
      items: [
        { value: "1", label: "New topic: <strong>Empowering agility with AI</strong>, added to Lesson 2" },
        { value: "4", label: "Hands-on AI discussions and activities across the two days" },
        { value: "6", label: "Lessons, ending on empowering leaders with AI" },
      ],
      source: "Source: Scaled Agile, <em style=\"font-style:italic\">AI-Empowered Leading SAFe® (2026.02.24)</em> courseware.",
    },
  },

  /* ------------------------------------------------- SAFe Scrum Master */
  "scrum-master": {
    slug: "scrum-master",
    version: "26.7",
    subtitle: "Coaching responsible, AI-empowered teams",
    coverTitle: { main: "AI-Empowered SAFe®", accent: "Scrum Master" },
    badge: "/SSM.jpeg",
    band: BAND,
    path: "/courses/scrum-master",
    price: PRICE["scrum-master"],
    exam: { minutes: 90, pass: "80%", attempts: "First two included" },
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs / SEUs",
    prerequisites: [
      "None. The course is open to all attendees.",
      "Familiarity with Agile or Scrum helps, but is not required.",
      "No prior AI experience is assumed — prompting is taught from the ground up.",
    ],
    audience: [
      { role: "Scrum Masters", note: "New and experienced, at team level." },
      { role: "Team Coaches", note: "Supporting one or more Agile Teams." },
      { role: "Agile Coaches", note: "Moving into a SAFe environment." },
      { role: "Team Leads", note: "Facilitating team events day to day." },
      { role: "Project Managers", note: "Transitioning to Agile delivery." },
      { role: "Product Owners", note: "Working closely with a Scrum Master." },
      { role: "Engineers & Testers", note: "Stepping into facilitation." },
      { role: "RTEs", note: "Coaching Scrum Masters across an ART." },
    ],
    industries: INDUSTRIES,
    lessons: [
      { title: "Introducing Scrum in SAFe", topics: ["Basic Agile development concepts", "Scrum basics", "The Agile Team in SAFe"], aiTopics: ["AI-Empowered SAFe — model types, LLMs, prompting, and when agents are needed"] },
      { title: "Characterizing the Role of the Scrum Master", topics: ["Defining the role of the Scrum Master", "Coaching execution with effective events", "Cultivating high-performing teams"], aiTopics: ["Coaching responsible AI-empowered teams — trustworthy, explainable, and human-centric AI"] },
      { title: "Experiencing PI Planning", topics: ["Preparing for PI Planning", "PI Planning — Day One", "PI Planning — Day Two", "Final plan review and PI objectives"], aiTopics: ["AI-powered customer research, and an activity to prompt, refine, and edit"] },
      { title: "Facilitating Iteration Execution", topics: ["Plan the iteration", "Track iteration progress", "Refine the backlog", "Facilitate the Iteration Review", "Facilitate relentless improvement", "Support DevOps and Release on Demand"] },
      { title: "Finishing the PI", topics: ["Coach the IP iteration", "Prepare the team for Inspect & Adapt", "Facilitate the Problem-Solving Workshop"], aiTopics: ["Using innovation time to let teams explore AI tools and workflows"] },
    ],
    outcomeGroups: [
      { title: "The role", items: ["Describe Scrum in a SAFe enterprise and the role of the Agile Team", "Define the Scrum Master role and how it differs from a manager", "Coach execution through effective team events", "Cultivate a high-performing team"] },
      { title: "Planning and executing", items: ["Prepare for, and take part in, PI Planning", "Facilitate iteration planning, tracking, and backlog refinement", "Run the Iteration Review and drive relentless improvement", "Support DevOps and Release on Demand"] },
      { title: "Finishing the PI", items: ["Coach the Innovation and Planning iteration", "Prepare the team for Inspect & Adapt", "Facilitate the Problem-Solving Workshop", "Turn problems into measurable improvement items"] },
    ],
    ai: {
      heading: "Coaching a team that<br />has AI in the room",
      lede: "AI lands in three of the five lessons, and the emphasis is coaching: helping a team get real value from these tools without letting them outsource their judgment.",
      activities: [
        { title: "AI-Empowered SAFe", where: "Lesson 1", body: "Get the vocabulary straight — AI, ML, DL, generative AI — then learn what a prompt actually is and when a team genuinely needs an agent." },
        { title: "Coaching responsible AI-empowered teams", where: "Lesson 2", body: "A full topic on coaching teams to deliver measurable value with AI, built on the three aspects of responsible use." },
        { title: "Prompt, refine, and edit", where: "Lesson 3", body: "Use AI-powered research to learn about customers, then practise editing generated output into something a team can plan against." },
        { title: "Explore AI in IP", where: "Lesson 5", body: "Use innovation time to let the team try AI tools and workflows deliberately, rather than adopting them by accident." },
      ],
      techniques: [
        "Coach a team to get <strong>measurable value</strong> from AI, not novelty",
        "Use AI for <strong>customer research</strong> and know when the output is thin",
        "Draft and sharpen <strong>stories and acceptance criteria</strong> with generative AI",
        "Spot where AI is quietly <strong>eroding built-in quality</strong>",
        "Keep the team <strong>accountable</strong> for what it ships, whatever produced it",
      ],
      responsible: RESPONSIBLE_AI,
      shifts: FOUR_SHIFTS,
    },
    whatsNew: [
      { title: "A coaching topic on AI", body: "Lesson 2 gains \"Coaching responsible AI-empowered teams\" — the Scrum Master's job when the team starts using these tools." },
      { title: "AI foundations up front", body: "Lesson 1 now closes on AI-Empowered SAFe: model types, LLMs, prompting, RAG, and knowing when an agent is warranted." },
      { title: "Research and drafting", body: "Lesson 3 adds AI-powered customer research plus a prompt, refine, and edit activity during PI Planning." },
    ],
    changed: [
      { title: "AI-Empowered release", body: "Version 26.7 reworks SSM around the AI-Empowered theme rather than adding a module at the end." },
      { title: "Responsible AI for coaches", body: "Trustworthy, explainable, and human-centric AI are taught as coaching material, not as a compliance slide." },
      { title: "Innovation time gets a nudge", body: "Lesson 5 suggests using the IP iteration to explore AI tools and workflows deliberately." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "5", label: "Lessons in the official 26.7 courseware" },
      { value: "4", label: "AI topics and activities across the class" },
      { value: "80", unit: "%", label: "To pass the 90-minute SSM exam" },
    ],
    overview: {
      heading: "The Scrum Master job,<br />with AI in the team",
      body: [
        "This two-day course teaches the Scrum Master role as it is actually practised on an Agile Release Train — facilitating team events, preparing for and taking part in PI Planning, refining the backlog, and driving relentless improvement through Inspect & Adapt.",
        "Version 26.7 adds the coaching problem every Scrum Master now has: the team is already using AI. The course covers the foundations, the responsible-use aspects, and the facilitation moves that keep a team accountable for what it ships — whatever helped produce it.",
      ],
    },
    whyNow: {
      heading: "Your team already uses AI.<br />Coaching it is the job now",
      body: "Most Agile Teams adopted AI tools before anyone decided how they would be used. That leaves the Scrum Master facilitating a team whose drafts, estimates, and research may be partly generated — and still accountable for the quality of what gets demoed. This release gives you the vocabulary, the responsible-use framing, and the coaching moves to handle it.",
    },
    whyStats: {
      items: [
        { value: "1", label: "New coaching topic: <strong>Coaching responsible AI-empowered teams</strong>" },
        { value: "3", unit: "/5", label: "Lessons that now carry AI content or activities" },
        { value: "3", label: "Aspects of responsible AI taught as coaching material" },
      ],
      source: "Source: Scaled Agile, <em style=\"font-style:italic\">AI-Empowered SAFe® Scrum Master (26.7)</em> courseware.",
    },
  },

  /* ------------------------------------------- Agile Product Management */
  "agile-product-management": {
    slug: "agile-product-management",
    version: "6.0",
    subtitle: "Building products customers actually want",
    coverTitle: { main: "SAFe®<br />Agile Product", accent: "Management" },
    badge: "/AgileProductManagment.png",
    band: BAND,
    path: "/courses/agile-product-management",
    price: PRICE["agile-product-management"],
    exam: { minutes: 120, questions: 60, pass: "77%", attempts: "First attempt included" },
    duration: { days: "3 days", hours: "24" },
    credits: "24 PDUs / SEUs",
    prerequisites: [
      "None required. Scaled Agile suggests POPM certification first.",
      "Agile experience and prior SAFe POPM training are recommended.",
      "Comfort with product discovery and roadmapping helps but is not assumed.",
    ],
    audience: [
      { role: "Product Managers", note: "Owning strategy and roadmaps." },
      { role: "Product Owners", note: "Stepping up to product management." },
      { role: "Product Marketers", note: "Connecting market to backlog." },
      { role: "Business Owners", note: "Accountable for product outcomes." },
      { role: "Solution Managers", note: "Working across multiple ARTs." },
      { role: "Project Managers", note: "Moving into product roles." },
      { role: "Portfolio Managers", note: "Funding product investment." },
      { role: "UX & Design Leads", note: "Partnering on discovery." },
    ],
    industries: INDUSTRIES,
    whatsNew: [
      { title: "Design thinking, end to end", body: "Continuous exploration, empathy-driven design, and market segmentation taught as one connected discipline." },
      { title: "Strategy you can defend", body: "Product strategy, solution vision, and roadmaps built so stakeholders can see the reasoning, not just the dates." },
      { title: "Three days, not two", body: "The longest course in the SAFe product track, with room for real discovery work rather than a tour of the framework." },
    ],
    changed: [
      { title: "Discovery gets the time", body: "Continuous exploration, market segmentation, and empathy-driven design each get their own module rather than sharing one." },
      { title: "Vision through to delivery", body: "Strategy and vision connect forward into roadmaps, value delivery, and innovation in the value stream." },
      { title: "Exam prep built in", body: "The final module is review, practice questions, and Q&A — your first exam attempt is included." },
    ],
    stats: [
      { value: "3", label: "Days, live and instructor-led" },
      { value: "9", label: "Modules from discovery through to delivery" },
      { value: "60", label: "Questions on the SAFe APM certification exam" },
      { value: "24", label: "PDUs and SEUs toward renewal" },
    ],
    overview: {
      heading: "Product management at<br />enterprise scale",
      body: [
        "Agile Product Management is the deep end of the SAFe product track. Over three days you work through the whole arc — exploring markets and users, segmenting where to play, building empathy through Lean UX, setting strategy and vision, forecasting with roadmaps, and delivering value through the Agile Release Train.",
        "It is the natural step after POPM. Where POPM teaches you to operate the role on a train, APM teaches you to decide what the train should be building in the first place — and to make that case to the people funding it.",
      ],
    },
    whyNow: {
      heading: "Deciding what to build is<br />harder than building it",
      body: "Most enterprises can ship. Far fewer can say confidently why they are shipping this rather than that. Agile Product Management is about closing that gap — replacing opinion and internal politics with customer research, market segmentation, hypothesis-driven discovery, and a roadmap the business can actually read.",
    },
  },

  /* --------------------------------------------------- SAFe for Architects */
  "safe-for-architects": {
    slug: "safe-for-architects",
    version: "6.0",
    subtitle: "Architecting for continuous value flow",
    coverTitle: { main: "SAFe®", accent: "for Architects" },
    badge: "/ARCH.png",
    band: BAND,
    path: "/courses/safe-for-architects",
    price: PRICE["safe-for-architects"],
    exam: { minutes: 120, questions: 45, pass: "75%", attempts: "First two included" },
    duration: { days: "3 days", hours: "24" },
    credits: "24 PDUs / SEUs",
    prerequisites: [
      "None required, though this is an advanced course.",
      "Suited to practising architects and senior technical leaders.",
      "Familiarity with SAFe and enterprise delivery is strongly recommended.",
    ],
    audience: [
      { role: "System Architects", note: "Designing across an ART." },
      { role: "Solution Architects", note: "Spanning multiple trains." },
      { role: "Enterprise Architects", note: "Setting direction portfolio-wide." },
      { role: "Experienced Engineers", note: "Moving into architecture." },
      { role: "Technical Managers", note: "Accountable for technical strategy." },
      { role: "Senior Technical Leads", note: "Guiding architectural decisions." },
      { role: "Infrastructure Architects", note: "Owning platform and pipeline." },
      { role: "SPCs", note: "Coaching architecture in a transformation." },
    ],
    industries: INDUSTRIES,
    whatsNew: [
      { title: "Architecture that enables flow", body: "Architectural runway, enabler epics, and Solution Intent taught as the means to continuous delivery, not documentation." },
      { title: "Business value, not diagrams", body: "Strategic Themes, Portfolio Canvas, and Portfolio Vision connect technical strategy to what the business is funding." },
      { title: "Leading the change", body: "The closing module is about the architect as a Lean-Agile leader, with an action plan you leave holding." },
    ],
    changed: [
      { title: "Runway before PI Planning", body: "A full module on preparing architectural runway and contributing to Management Review and problem-solving." },
      { title: "Across value streams", body: "Evolving the solution portfolio across value streams, and coordinating architecture beyond a single ART." },
      { title: "Two exam attempts", body: "Exam preparation closes the course and your first two attempts are included." },
    ],
    stats: [
      { value: "3", label: "Days, live and instructor-led" },
      { value: "7", label: "Modules from Agile architecture to leading change" },
      { value: "45", label: "Questions on the SAFe Architect exam" },
      { value: "24", label: "PDUs and SEUs toward renewal" },
    ],
    overview: {
      heading: "The architect's job<br />on a Lean-Agile train",
      body: [
        "SAFe for Architects is for the people who have to make architecture serve delivery rather than block it. Over three days you work through Agile architecture and the architect's role, DevOps and the Continuous Delivery Pipeline, connecting technical strategy to business value, preparing architectural runway for PI Planning, and supporting continuous delivery during execution.",
        "It closes on the part most architecture training skips — leading during a Lean-Agile transformation, and the action plan you take back to support Agile architecture in your own organization.",
      ],
    },
    whyNow: {
      heading: "Architecture either enables<br />the flow, or becomes the queue",
      body: "In a Lean-Agile enterprise, architecture is judged by whether value moves. This course is about making architectural decisions that create runway rather than gates — enabler epics that get funded, Solution Intent that stays current, and non-functional requirements that trains can actually plan against.",
    },
  },

  /* --------------------------------------------------------- SAFe DevOps */
  devops: {
    slug: "devops",
    version: "6.0",
    subtitle: "CALMR, mapped and made real",
    coverTitle: { main: "SAFe®", accent: "DevOps" },
    badge: "/Devops.png",
    band: BAND,
    path: "/courses/devops",
    price: PRICE["devops"],
    exam: { minutes: 90, questions: 45, pass: "77%", attempts: "First two included" },
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs / SEUs",
    prerequisites: [
      "None. The course is open to all attendees.",
      "Familiarity with delivery pipelines or release processes helps.",
      "Useful for both technical and non-technical members of a value stream.",
    ],
    audience: [
      { role: "Software Engineers", note: "Building the pipeline." },
      { role: "Development Managers", note: "Owning delivery throughput." },
      { role: "Release Managers", note: "Running release on demand." },
      { role: "QA Leads", note: "Automating built-in quality." },
      { role: "Infrastructure Architects", note: "Owning platform and tooling." },
      { role: "Scrum Masters", note: "Coaching flow across the pipeline." },
      { role: "Product Owners", note: "Sequencing pipeline improvements." },
      { role: "Operations Leads", note: "Closing the deploy-to-release gap." },
    ],
    industries: INDUSTRIES,
    whatsNew: [
      { title: "CALMR, taught as a whole", body: "Culture, Automation, Lean flow, Measurement and Recovery covered as one approach rather than five buzzwords." },
      { title: "You map your own pipeline", body: "Value Stream Mapping is a working session on your delivery pipeline, finding the real bottlenecks and waste." },
      { title: "You leave with a plan", body: "The final module builds a prioritized DevOps transformation backlog tied to ART and value-stream outcomes." },
    ],
    changed: [
      { title: "Mapping, not theory", body: "The current-state map is built in the room, so the bottlenecks you find are the ones you actually have." },
      { title: "Exploration and integration", body: "Hypothesis-driven development and customer research sit alongside build and test automation." },
      { title: "A backlog you can run", body: "Improvements come out prioritized and connected to outcomes, not as a wish list." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "4", label: "Modules, ending in your own transformation plan" },
      { value: "45", label: "Questions on the SAFe DevOps Practitioner exam" },
      { value: "16", label: "PDUs and SEUs toward renewal" },
    ],
    overview: {
      heading: "Find the bottleneck,<br />then fix it",
      body: [
        "SAFe DevOps is a working course. You learn the CALMR approach — culture of shared responsibility, automation, Lean flow, measurement, and recovery — and then immediately map your own delivery pipeline to see where value actually stalls.",
        "From there it moves into continuous exploration and integration, and closes by building a prioritized transformation plan connected to ART and value-stream outcomes. You leave with a backlog, not a set of principles.",
      ],
    },
    whyNow: {
      heading: "Most delivery problems<br />are not coding problems",
      body: "Teams write software quickly and then wait — for an environment, an approval, a release window, a handoff. SAFe DevOps exists to make that waiting visible and then to shorten it, by mapping the pipeline from concept to customer and attacking the bottlenecks in priority order.",
    },
  },

  /* -------------------------------------------------- Value Stream Mapping */
  "value-stream-mapping": {
    slug: "value-stream-mapping",
    version: "6.0",
    subtitle: "Seeing where the value actually stalls",
    coverTitle: { main: "Value Stream", accent: "Mapping" },
    badge: "/Lean Portfolio.png",
    band: BAND,
    path: "/courses/value-stream-mapping",
    duration: { days: "Half a day", hours: "4" },
    price: PRICE["value-stream-mapping"],
    credits: "4 PDUs / SEUs",
    prerequisites: [
      "None. The workshop is open to all attendees.",
      "Bring a real delivery process you want to improve.",
      "Useful for anyone in a value stream, technical or not.",
    ],
    audience: [
      { role: "Scrum Masters", note: "Facilitating flow improvement." },
      { role: "RTEs", note: "Improving ART throughput." },
      { role: "Agile Coaches", note: "Running mapping workshops." },
      { role: "Product Owners", note: "Sequencing improvement work." },
      { role: "Delivery Managers", note: "Accountable for lead time." },
      { role: "Process Improvement", note: "Lean and continuous improvement leads." },
      { role: "Operations Leads", note: "Owning handoffs and approvals." },
      { role: "Team Members", note: "Anyone living the bottleneck." },
    ],
    industries: INDUSTRIES,
    whatsNew: [
      { title: "A half day, done properly", body: "Short enough to run without pulling a team offline for a week, long enough to produce a real map." },
      { title: "Current state, then future state", body: "You map what is actually happening before designing what should happen." },
      { title: "Metrics that hold up", body: "Lead time, cycle time, and process efficiency calculated from your own map, not from benchmarks." },
    ],
    changed: [
      { title: "Built around your process", body: "The mapping work uses a delivery process the room actually owns, so the waste found is real." },
      { title: "Waste made visible", body: "Bottlenecks, delays, and rework surface as measurements rather than opinions." },
      { title: "An improvement plan", body: "The session closes on a future-state map and the changes needed to reach it." },
    ],
    stats: [
      { value: "4", label: "Hours, live and instructor-led" },
      { value: "4", label: "Modules from fundamentals to future state" },
      { value: "2", label: "Maps you leave with: current and future state" },
      { value: "4", label: "PDUs and SEUs toward renewal" },
    ],
    overview: {
      heading: "You cannot improve<br />what you cannot see",
      body: [
        "This half-day workshop teaches value stream mapping and then has you do it. You learn value streams in SAFe and the fundamentals of mapping, build a current-state map of a real process, measure lead and cycle time, and identify where value stalls.",
        "The session closes on analysis and a future-state map — bottlenecks named, waste quantified, and an improvement plan the group can take back and act on.",
      ],
    },
    whyNow: {
      heading: "The delay is rarely<br />where people think it is",
      body: "Ask a team where the hold-up is and you will get an opinion. Map it and you get a measurement — often showing that the work sits idle far longer than it is worked on. This workshop exists to replace that opinion with a picture everyone can see and argue from.",
    },
  },

  /* ------------------------------------------------------- Responsible AI */
  "responsible-ai": {
    slug: "responsible-ai",
    version: "6.0",
    subtitle: "Putting responsible AI on the portfolio backlog",
    coverTitle: { main: "Responsible AI", accent: "for SAFe Enterprises" },
    badge: "/PMAI.png",
    band: BAND,
    path: "/courses/responsible-ai",
    duration: { days: "Half a day", hours: "4" },
    price: PRICE["responsible-ai"],
    credits: "4 PDUs / SEUs",
    prerequisites: [
      "None. The workshop is open to all attendees.",
      "No technical AI background is assumed.",
      "Most useful if your organization is adopting AI without a policy yet.",
    ],
    audience: [
      { role: "Epic Owners", note: "Writing and sequencing AI epics." },
      { role: "Portfolio Managers", note: "Governing AI investment." },
      { role: "Product Managers", note: "Shipping AI-touched products." },
      { role: "RTEs", note: "Running AI work through an ART." },
      { role: "Agile Coaches", note: "Coaching responsible practice." },
      { role: "Risk & Compliance", note: "Translating policy into delivery." },
      { role: "Business Owners", note: "Accountable for AI outcomes." },
      { role: "Executives", note: "Setting the guardrails." },
    ],
    industries: INDUSTRIES,
    ai: {
      heading: "Responsible AI as<br />portfolio work",
      lede: "This is a working session, not an ethics lecture. You leave with a stakeholder map, a policy gap assessment, and a drafted epic hypothesis statement the portfolio can sequence.",
      activities: [
        { title: "Map your stakeholders", where: "Module 1", body: "Identify who actually has a say in responsible AI in your organization, define roles and responsibilities, and surface the concerns that will otherwise block you later." },
        { title: "Evaluate existing policy", where: "Module 2", body: "Review the Responsible AI policies you already have, fit them to SAFe roles and events, and find the gaps that belong on a backlog." },
        { title: "Make the case", where: "Module 3", body: "Connect responsible AI to delivery risk and practise making the argument to leaders and teams inside the SAFe events you already run." },
        { title: "Write the epic hypothesis", where: "Module 4", body: "Draft a Responsible AI epic hypothesis statement, tie it to measurable outcomes, and place it where the portfolio can sequence and fund it." },
      ],
      techniques: [
        "Turn responsible AI from a principle into a <strong>funded epic</strong>",
        "Assess an existing <strong>AI policy</strong> against how your ARTs actually work",
        "Frame AI risk as <strong>delivery risk</strong>, in language the business acts on",
        "Place governance inside <strong>SAFe events</strong> instead of alongside them",
        "Define <strong>measurable outcomes</strong> so responsible AI can be inspected",
      ],
      responsible: RESPONSIBLE_AI,
    },
    whatsNew: [
      { title: "A half day, four outputs", body: "Stakeholder map, policy gap assessment, the case for change, and a drafted epic hypothesis statement." },
      { title: "Governance inside SAFe", body: "Responsible AI is fitted to the roles and events you already run rather than bolted on as a separate process." },
      { title: "Built for portfolios", body: "The session ends where the work actually starts — an epic the portfolio can sequence and fund." },
    ],
    changed: [
      { title: "Practice over principles", body: "Every module produces an artefact you take back, rather than a framework you agree with and forget." },
      { title: "Policy meets delivery", body: "Existing policies are assessed against how work really flows through your ARTs." },
      { title: "Risk in business terms", body: "The case for responsible AI is made as delivery risk, not as ethics in the abstract." },
    ],
    stats: [
      { value: "4", label: "Hours, live and instructor-led" },
      { value: "4", label: "Modules, each producing an artefact" },
      { value: "1", label: "Epic hypothesis statement you leave holding" },
      { value: "4", label: "PDUs and SEUs toward renewal" },
    ],
    overview: {
      heading: "Responsible AI, turned<br />into something fundable",
      body: [
        "Most organizations agree that AI should be used responsibly and then struggle to say what that means on a Tuesday. This half-day workshop closes that gap by treating responsible AI as portfolio work: who the stakeholders are, what the current policy actually covers, how to make the case, and what the epic looks like.",
        "You leave with a stakeholder map, a gap assessment against your existing policies, and a drafted Responsible AI epic hypothesis statement tied to measurable outcomes — positioned where the portfolio can sequence it.",
      ],
    },
    whyNow: {
      heading: "Everyone agrees on responsible AI.<br />Almost nobody has funded it",
      body: "AI adoption is running ahead of AI governance in most enterprises. The gap is rarely disagreement about principles — it is that nobody has turned those principles into work with an owner, a budget, and a measurable outcome. That is precisely what this session produces.",
    },
  },
};
