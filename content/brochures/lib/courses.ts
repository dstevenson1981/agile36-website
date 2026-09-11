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

  /* ------------------------------------------- SAFe Advanced Scrum Master */
  "advanced-scrum-master": {
    slug: "advanced-scrum-master",
    version: "26.3",
    subtitle: "Coaching teams that have an AI teammate",
    coverTitle: { main: "AI-Empowered SAFe®", accent: "Advanced Scrum Master" },
    badge: "/AdvancedSM.png",
    band: BAND,
    path: "/courses/advanced-scrum-master",
    price: PRICE["advanced-scrum-master"],
    exam: { minutes: 120, questions: 60, pass: "82%", attempts: "First two included" },
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs / SEUs",
    prerequisites: [
      "None required, though this is an advanced course.",
      "Best suited to practising Scrum Masters and Team Coaches.",
      "SAFe Scrum Master certification first is strongly recommended.",
    ],
    audience: [
      { role: "Scrum Masters", note: "Ready to coach beyond one team." },
      { role: "Team Coaches", note: "Supporting multiple Agile Teams." },
      { role: "Agile Coaches", note: "Working at ART level." },
      { role: "RTEs", note: "Coaching Scrum Masters across a train." },
      { role: "Delivery Managers", note: "Accountable for team performance." },
      { role: "Engineering Leads", note: "Improving flow and quality." },
      { role: "Programme Managers", note: "Removing systemic impediments." },
      { role: "SPCs", note: "Coaching teams through transformation." },
    ],
    industries: INDUSTRIES,
    lessons: [
      { title: "Introducing the SAFe Advanced Scrum Master", topics: ["Becoming an Advanced Scrum Master", "Introducing the MCT case study"], aiTopics: ["Empowering your teams with AI — AI agents, advanced prompting, and the benefits of an AI teammate"] },
      { title: "Improving Flow", topics: ["Choosing the right team method", "Visualizing team flow with Kanban", "Measuring and accelerating team flow", "Using built-in quality to improve flow"] },
      { title: "Building High-Performing Teams", topics: ["Characteristics of high-performing teams", "Employing powerful questions", "Promoting cross-team collaboration", "Assessing team performance"] },
      { title: "Addressing Conflict and Anti-Patterns", topics: ["Recognizing team anti-patterns", "Navigating conflict constructively", "Coaching through disagreement", "Restoring collaboration after conflict"] },
      { title: "Improving ART Performance", topics: ["Driving outcome-based team events", "Coaching the IP Iteration", "Driving improvement with Inspect & Adapt", "Facilitating the Problem-Solving Workshop"], aiTopics: ["Activity: using AI to sharpen problem statements before the workshop"] },
    ],
    ai: {
      heading: "Coaching a team with<br />an AI teammate in it",
      lede: "SASM treats AI as something the team already has, and asks the harder question: what does it change about coaching, flow, and how problems get solved?",
      activities: [
        { title: "Empowering your teams with AI", where: "Lesson 1", body: "A full topic on what AI agents are, when they help a team, and where advanced prompting earns its keep." },
        { title: "Explore the benefits of an AI teammate", where: "Lesson 1", body: "Work through what changes when a team treats AI as a working member — and what still needs a person to own it." },
        { title: "Using AI to improve problem statements", where: "Lesson 5", body: "Take a real problem statement into the Problem-Solving Workshop, use AI to sharpen it, and judge whether the sharper version is actually truer." },
      ],
      techniques: [
        "Use AI to sharpen a <strong>problem statement</strong> before a room spends a day on it",
        "Know when a team genuinely needs an <strong>agent</strong> and when a prompt will do",
        "Apply <strong>advanced prompting</strong> to coaching questions and retrospectives",
        "Read <strong>flow data</strong> critically when part of it is generated",
        "Keep <strong>built-in quality</strong> intact as the team's output speeds up",
      ],
      responsible: RESPONSIBLE_AI,
      shifts: FOUR_SHIFTS,
    },
    whatsNew: [
      { title: "AI as a teammate", body: "Lesson 1 gains \"Empowering your teams with AI\" — agents, advanced prompting, and what an AI teammate changes about coaching." },
      { title: "Sharper problem statements", body: "Lesson 5 adds an activity using AI to improve problem statements before the Problem-Solving Workshop." },
      { title: "A running case study", body: "The MCT case study threads through the class so the coaching work has a real context." },
    ],
    changed: [
      { title: "AI-Empowered release", body: "Version 26.3 reworks SASM around the AI-Empowered theme rather than appending an AI module." },
      { title: "Flow gets four topics", body: "Choosing a method, Kanban, measuring flow, and built-in quality each get their own treatment." },
      { title: "Conflict is its own lesson", body: "Addressing conflict and anti-patterns carries 18–20% of the exam and gets a full lesson." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "5", label: "Lessons in the official 26.3 courseware" },
      { value: "3", label: "AI topics and activities across the class" },
      { value: "82", unit: "%", label: "To pass the SASM certification exam" },
    ],
    overview: {
      heading: "Coaching beyond<br />a single team",
      body: [
        "Advanced Scrum Master is the step up from facilitating one team to improving how a train performs. Two days on flow, high-performing team characteristics, powerful questions, cross-team collaboration, conflict and anti-patterns, and driving improvement through Inspect & Adapt.",
        "Version 26.3 adds the coaching problem nobody trained for: the team now has an AI teammate. The course covers agents, advanced prompting, and using AI to sharpen the problem statements a Problem-Solving Workshop is built on.",
      ],
    },
    whyNow: {
      heading: "The impediment is rarely<br />on the team's board",
      body: "Advanced Scrum Masters spend their time on the problems a single team cannot fix alone — dependencies, conflict, systemic flow issues, and anti-patterns that have hardened into normal. This course is about seeing those clearly and having the coaching moves to shift them, now including what changes when part of the team's output is generated.",
    },
    whyStats: {
      items: [
        { value: "1", label: "New topic: <strong>Empowering your teams with AI</strong>, added to Lesson 1" },
        { value: "26", unit: "%", label: "Of the exam covers building high-performing teams — the largest domain" },
        { value: "5", label: "Lessons, ending on driving improvement through Inspect & Adapt" },
      ],
      source: "Source: Scaled Agile, <em style=\"font-style:italic\">AI-Empowered SAFe® Advanced Scrum Master (26.3)</em> courseware.",
    },
  },

  /* ------------------------------------------------------ SAFe for Teams */
  "safe-for-teams": {
    slug: "safe-for-teams",
    version: "2026.01.27",
    subtitle: "Becoming an Agile Team on an ART",
    coverTitle: { main: "AI-Empowered SAFe®", accent: "for Teams" },
    badge: "/SAFe for Teams.png",
    band: BAND,
    path: "/courses/safe-for-teams",
    price: PRICE["safe-for-teams"],
    exam: { minutes: 90, pass: "76%", attempts: "First two included" },
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs / SEUs",
    prerequisites: [
      "None. The course is open to all attendees.",
      "Designed for whole teams to attend together.",
      "No prior AI experience is assumed.",
    ],
    audience: [
      { role: "Agile Team Members", note: "The whole team, together." },
      { role: "Developers", note: "Building on an ART." },
      { role: "Testers & QA", note: "Owning built-in quality." },
      { role: "Business Analysts", note: "Shaping stories and criteria." },
      { role: "Scrum Masters", note: "New to a SAFe environment." },
      { role: "Product Owners", note: "Working the team backlog." },
      { role: "UX & Design", note: "Embedded in the team." },
      { role: "Ops & Support", note: "Joining the value stream." },
    ],
    industries: INDUSTRIES,
    lessons: [
      { title: "Introducing SAFe", topics: ["The Scaled Agile Framework", "SAFe foundations"], aiTopics: ["AI-empowered SAFe — model types, and how AI changes speed rather than foundations"] },
      { title: "Forming Agile Teams as an Agile Release Train", topics: ["Forming cross-functional Agile Teams", "Operating as an Agile Team", "Becoming an Agile Release Train"] },
      { title: "Connecting to the Customer", topics: ["Build empathy for the customer", "Align to product vision and roadmaps", "Define features and stories", "Creating the team backlog"], aiTopics: ["Writing stories with generative AI"] },
      { title: "Planning the Work", topics: ["Preparing for PI Planning", "Team breakouts and draft plans", "Identifying dependencies and risks", "Committing to PI Objectives"] },
      { title: "Delivering Value", topics: ["Iteration Planning and execution", "Managing flow with the team board", "Built-in quality practices", "Continuous integration and delivery"] },
      { title: "Getting Feedback", topics: ["Getting customer feedback", "Demonstrating progress with the Iteration Review", "Demonstrating the integrated solution with the System Demo"] },
      { title: "Improving Relentlessly", topics: ["Iteration Retrospective", "The Innovation and Planning iteration", "Inspect & Adapt", "Accelerating flow", "Measure and Grow"], aiTopics: ["Discussion: using AI to interpret flow data"] },
    ],
    ai: {
      heading: "AI where a team<br />actually touches it",
      lede: "SAFe for Teams keeps the AI content close to the work: understanding what these tools are, drafting stories with them, and reading flow data that may be partly generated.",
      activities: [
        { title: "AI-empowered SAFe", where: "Lesson 1", body: "Get the foundations straight early — what AI, ML and generative AI actually are, and why AI changes the speed of the work rather than its foundations." },
        { title: "Writing stories with GenAI", where: "Lesson 3", body: "Draft user stories and acceptance criteria with generative AI, then edit them into something the team can actually plan and test against." },
        { title: "Using AI to interpret flow data", where: "Lesson 7", body: "A team discussion on reading flow metrics with AI help — and on knowing when the interpretation is confident but wrong." },
      ],
      techniques: [
        "Draft <strong>stories and acceptance criteria</strong> with generative AI, then edit them down",
        "Read <strong>flow data</strong> with AI help without outsourcing the judgment",
        "Build <strong>customer empathy</strong> faster without inventing the customer",
        "Keep <strong>built-in quality</strong> intact when drafting speeds up",
        "Know what the team stays <strong>accountable</strong> for, whatever produced the draft",
      ],
      responsible: RESPONSIBLE_AI,
      shifts: FOUR_SHIFTS,
    },
    whatsNew: [
      { title: "AI foundations in Lesson 1", body: "\"AI-empowered SAFe\" joins the opening lesson so the whole team shares a vocabulary before the tools come up." },
      { title: "Stories written with GenAI", body: "Lesson 3 adds writing stories with generative AI, right where the team builds its backlog." },
      { title: "Reading flow data with AI", body: "Lesson 7 adds a discussion on interpreting flow metrics with AI assistance." },
    ],
    changed: [
      { title: "AI-Empowered release", body: "Version 2026.01.27 threads AI through the team's own work rather than teaching it separately." },
      { title: "Customer work expanded", body: "Connecting to the Customer carries 19–21% of the exam, the largest single domain." },
      { title: "Whole-team course", body: "Still built to be taken by an entire Agile Team together, before or during ART launch." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "7", label: "Lessons in the official 2026.01.27 courseware" },
      { value: "3", label: "AI topics placed where the team touches the work" },
      { value: "76", unit: "%", label: "To pass the 90-minute SAFe Practitioner exam" },
    ],
    overview: {
      heading: "The whole team,<br />on the same train",
      body: [
        "SAFe for Teams is the course an Agile Team takes together. Two days on forming as a cross-functional team, becoming part of an Agile Release Train, connecting to the customer, planning the work, delivering value, getting feedback, and improving relentlessly.",
        "The AI-Empowered release adds what a team actually does with these tools: shared foundations in Lesson 1, writing stories with generative AI in Lesson 3, and reading flow data with AI help in Lesson 7 — always with the team still owning what it ships.",
      ],
    },
    whyNow: {
      heading: "An ART is only as good<br />as the teams on it",
      body: "Launching a train fails more often on team fundamentals than on programme mechanics — unclear stories, no shared definition of done, weak customer connection, retrospectives that change nothing. This course puts a whole team through those fundamentals at once, now including how they use AI without quietly lowering the bar.",
    },
    whyStats: {
      items: [
        { value: "3", label: "New AI topics: foundations, <strong>writing stories with GenAI</strong>, and reading flow data" },
        { value: "21", unit: "%", label: "Of the exam covers connecting to the customer, the largest domain" },
        { value: "7", label: "Lessons taken by the whole team together" },
      ],
      source: "Source: Scaled Agile, <em style=\"font-style:italic\">AI-Empowered SAFe® for Teams (2026.01.27)</em> courseware.",
    },
  },

  /* -------------------------------------------- Release Train Engineer */
  "release-train-engineer": {
    slug: "release-train-engineer",
    version: "26.6",
    subtitle: "Facilitating the train, and the AI on it",
    coverTitle: { main: "AI-Empowered SAFe®", accent: "Release Train Engineer" },
    badge: "/RTE.png",
    band: BAND,
    path: "/courses/release-train-engineer",
    price: PRICE["release-train-engineer"],
    exam: { minutes: 120, questions: 60, pass: "77%", attempts: "First two included" },
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs / SEUs",
    prerequisites: [
      "None required, though this is an advanced course.",
      "Best suited to people already serving, or about to serve, as an RTE.",
      "Prior SAFe certification and ART experience are strongly recommended.",
    ],
    audience: [
      { role: "RTEs", note: "Current and incoming." },
      { role: "Solution Train Engineers", note: "Coordinating multiple ARTs." },
      { role: "Programme Managers", note: "Moving to train facilitation." },
      { role: "Scrum Masters", note: "Stepping up to ART level." },
      { role: "Agile Coaches", note: "Coaching a whole train." },
      { role: "Delivery Managers", note: "Accountable for PI outcomes." },
      { role: "PMO Leads", note: "Supporting ART execution." },
      { role: "SPCs", note: "Launching and coaching trains." },
    ],
    industries: INDUSTRIES,
    lessons: [
      { title: "Exploring the RTE Role and Responsibilities", topics: ["Connect the RTE role to SAFe", "Examine the responsibilities of the RTE role", "Review the SAFe foundations"], aiTopics: ["AI-Empowered SAFe — model types, LLMs, prompting, RAG, and knowing when agents are needed"] },
      { title: "Organizing the ART", topics: ["Identify the characteristics of an effective ART organization", "Examine key ART roles and responsibilities"] },
      { title: "Facilitating PI Planning", topics: ["Preparation activities for the PI Planning event", "Facilitating Day 1 activities", "Facilitating final plan development and commitment", "Facilitating PI Planning across multiple locations"], aiTopics: ["Discussion: AI-empowered PI Planning — where AI reduces overhead and friction"] },
      { title: "Supporting PI Execution", topics: ["Using events to keep the ART on track", "Visualizing flow", "Executing the PI with built-in quality", "Building a Continuous Delivery Pipeline with DevOps"] },
      { title: "Optimizing Flow", topics: ["Measuring flow", "Optimizing flow"], aiTopics: ["Reviewing AI-generated data before you act on it"] },
      { title: "Improving Relentlessly", topics: ["Prioritizing time to innovate and plan", "Exploring the Inspect & Adapt event", "Measure and Grow", "Systems thinking and Value Stream Mapping"], aiTopics: ["Responsible AI", "AI-Empowered agility — the four shifts"] },
      { title: "Coaching the ART", topics: ["Examine coaching techniques", "Evolving group dynamics", "Explore group facilitation techniques", "Creating a one-team culture"] },
      { title: "Get Certified", topics: ["Exam preparation and practice questions", "SAFe Studio resources and your learning plan", "SAFe Connect — your professional network", "Claiming your digital badge"] },
    ],
    ai: {
      heading: "The RTE's problem:<br />trusting generated data",
      lede: "An RTE runs on data — flow metrics, dependency maps, PI reports. This release is largely about what happens when some of that data is generated, and where accountability sits once AI is allowed to act.",
      activities: [
        { title: "AI-Empowered SAFe", where: "Lesson 1", body: "Foundations up front: model types, LLMs and prompting, retrieval-augmented generation, and knowing when an ART genuinely needs an agent rather than a prompt." },
        { title: "AI disruption and the RTE role", where: "Lesson 1", body: "A discussion on what AI changes for the person facilitating the train — and the principle that the moment AI is allowed to act, leadership accountability increases." },
        { title: "AI-empowered PI Planning", where: "Lesson 3", body: "Brainstorm as a class where AI genuinely reduces overhead or friction in PI Planning, and where it would quietly remove the alignment the event exists to create." },
        { title: "Reviewing AI-generated data", where: "Lesson 5", body: "A full topic on reading generated flow data critically before an ART makes decisions on it." },
      ],
      techniques: [
        "Review <strong>AI-generated flow data</strong> before an ART acts on it",
        "Cut <strong>PI Planning overhead</strong> with AI without losing the alignment",
        "Use <strong>RAG</strong> to ground answers in your own ART's documents",
        "Judge when the train needs an <strong>agent</strong> rather than a prompt",
        "Hold <strong>accountability</strong> steady as AI is allowed to act",
      ],
      responsible: RESPONSIBLE_AI,
      shifts: FOUR_SHIFTS,
    },
    whatsNew: [
      { title: "Reviewing generated data", body: "Lesson 5 gains a topic on reviewing AI-generated data — the RTE's most practical AI risk." },
      { title: "Responsible AI and agility", body: "Lesson 6 adds both Responsible AI and AI-Empowered agility alongside Inspect & Adapt and Measure and Grow." },
      { title: "Foundations in Lesson 1", body: "AI-Empowered SAFe opens the course: models, prompting, RAG, and when agents are warranted." },
    ],
    changed: [
      { title: "AI-Empowered release", body: "Version 26.6 threads AI through the RTE's actual work — planning overhead, flow data, and improvement." },
      { title: "Accountability made explicit", body: "The course states plainly that when AI is allowed to act, leadership accountability increases rather than decreases." },
      { title: "Eight lessons", body: "Coaching the ART and Get Certified close the course after flow and improvement." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "8", label: "Lessons in the official 26.6 courseware" },
      { value: "4", label: "AI topics and discussions across the class" },
      { value: "60", label: "Questions on the SAFe RTE certification exam" },
    ],
    overview: {
      heading: "Running the train,<br />not riding it",
      body: [
        "The RTE is the servant leader and chief facilitator of an Agile Release Train. This course covers the role and its responsibilities, organizing the ART, facilitating PI Planning end to end including across multiple locations, supporting execution, optimizing flow, driving relentless improvement, and coaching the train.",
        "Version 26.6 adds the part that matters most to someone running on metrics: how to read AI-generated data before acting on it, where AI genuinely reduces planning friction, and what responsible AI and AI-empowered agility mean at train level.",
      ],
    },
    whyNow: {
      heading: "The moment AI acts,<br />accountability goes up",
      body: "An RTE makes calls on flow data, dependency maps, and PI reports. As more of that becomes generated or summarized, the facilitation job changes: you have to know how the number was produced before you let a room act on it. This release treats that as core RTE skill rather than a footnote.",
    },
    whyStats: {
      items: [
        { value: "2", label: "New topics in Lesson 6: <strong>Responsible AI</strong> and <strong>AI-Empowered agility</strong>" },
        { value: "1", label: "Full topic on <strong>reviewing AI-generated data</strong>, added to Lesson 5" },
        { value: "4", label: "Shifts required for AI-empowered agility, covered at train level" },
      ],
      source: "Source: Scaled Agile, <em style=\"font-style:italic\">AI-Empowered SAFe® Release Train Engineer (26.6)</em> courseware.",
    },
  },

  /* --------------------------------------------- Lean Portfolio Management */
  "lean-portfolio-management": {
    slug: "lean-portfolio-management",
    version: "6.0.2",
    subtitle: "Funding value streams, not projects",
    coverTitle: { main: "SAFe® Lean Portfolio", accent: "Management" },
    badge: "/Lean Portfolio.png",
    band: BAND,
    path: "/courses/lean-portfolio-management",
    price: PRICE["lean-portfolio-management"],
    exam: { minutes: 90, questions: 45, pass: "77%", attempts: "First attempt included" },
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs / SEUs",
    prerequisites: [
      "None required, though this is an advanced course.",
      "Aimed at people who influence portfolio strategy, funding, or governance.",
      "Familiarity with SAFe at programme level is recommended.",
    ],
    audience: [
      { role: "Portfolio Managers", note: "Owning portfolio flow." },
      { role: "Executives", note: "Setting strategy and budgets." },
      { role: "Epic Owners", note: "Shepherding portfolio epics." },
      { role: "Enterprise Architects", note: "Shaping enabler investment." },
      { role: "Finance Leads", note: "Moving to Lean budgets." },
      { role: "PMO Leads", note: "Replacing project accounting." },
      { role: "Business Owners", note: "Accountable for value stream outcomes." },
      { role: "SPCs", note: "Leading LPM adoption." },
    ],
    industries: INDUSTRIES,
    lessons: [
      { title: "Introducing Lean Portfolio Management", topics: ["Why LPM?", "The Lean-Agile mindset and SAFe Principles", "The problem with project-based accounting", "Benefits of organizing around value", "SAFe portfolio structure", "Shift to LPM"] },
      { title: "Establishing Portfolio Strategy and Vision", topics: ["Connecting the portfolio to the enterprise strategy", "Maintaining the Portfolio Vision", "Developing the Portfolio Roadmap"] },
      { title: "Realizing Portfolio Vision through Epics", topics: ["Defining portfolio Epics", "Estimating Epic costs", "The SAFe Lean Startup Cycle"] },
      { title: "Establishing Investment Funding", topics: ["Lean Budget Guardrails", "LPM events overview", "Strategic portfolio review and portfolio sync", "Participatory Budgeting"] },
      { title: "Managing Portfolio Flow", topics: ["Describing the value of portfolio flow", "Establishing flow with the Portfolio Kanban", "Sequencing Epics for implementation using WSJF"] },
      { title: "Applying Agile Portfolio Operations", topics: ["Value Stream coordination", "Supporting ART execution and operational excellence"] },
      { title: "Applying Lean Governance", topics: ["Measuring LPM performance", "Coordinating compliance", "The Getting Started with Lean Portfolio Management workshop", "Additional LPM resources"] },
    ],
    whatsNew: [
      { title: "Participatory Budgeting", body: "Funding decisions made in the room by the people accountable for outcomes, rather than handed down annually." },
      { title: "Portfolio flow, made visible", body: "Portfolio Kanban and WSJF sequencing turn a list of competing initiatives into a queue with a rationale." },
      { title: "You leave with a start", body: "The final lesson is the Getting Started with LPM workshop, so adoption has a first step." },
    ],
    changed: [
      { title: "Beyond project accounting", body: "Lesson 1 confronts the problem directly: why project-based accounting fights against organizing around value." },
      { title: "Guardrails, not gates", body: "Lean Budget Guardrails replace approval gates, with the LPM events that keep them honest." },
      { title: "Governance you can measure", body: "Lean governance closes the course — measuring LPM performance and coordinating compliance." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "7", label: "Lessons in the official 6.0.2 courseware" },
      { value: "45", label: "Questions on the SAFe LPM certification exam" },
      { value: "16", label: "PDUs and SEUs toward renewal" },
    ],
    overview: {
      heading: "Fund the value stream,<br />not the project",
      body: [
        "Lean Portfolio Management is where strategy meets money. Two days on connecting the portfolio to enterprise strategy, maintaining a portfolio vision and roadmap, defining and estimating epics, establishing Lean budgets and guardrails, sequencing with WSJF, and coordinating value streams.",
        "It closes on Lean governance — measuring LPM performance, coordinating compliance, and the Getting Started workshop that turns all of it into a first move you can make when you get back.",
      ],
    },
    whyNow: {
      heading: "Annual budgets cannot fund<br />quarterly learning",
      body: "Most enterprises now plan delivery in Program Increments and fund it in annual projects. That mismatch is where good ARTs go to stall — waiting on approvals, defending variance, and rebuilding business cases for work the strategy already justified. Lean Portfolio Management exists to close that gap with guardrails, flow, and participatory budgeting.",
    },
  },

  /* ------------------------------------------------- AI Agent Builder */
  "ai-agent-builder": {
    slug: "ai-agent-builder",
    version: "2026",
    subtitle: "A fleet of agents, a voice agent, and a working app",
    coverTitle: { main: "No-Code AI Agents", accent: "& Automation™" },
    badge: "/Logo_Agents.png",
    band: BAND,
    path: "/courses/ai-agent-builder",
    price: PRICE["ai-agent-builder"],
    duration: { days: "2 days", hours: "8" },
    credits: "8 PDUs",
    accreditation: {
      safe: false,
      credential: "AI Agents and Automation™",
      assessment: "Working agents, no exam",
    },
    prerequisites: [
      "None. No programming background is required.",
      "Bring a real business process you would like to automate.",
      "A laptop and a willingness to build in the session.",
    ],
    audience: [
      { role: "Operations Leads", note: "Automating manual processes." },
      { role: "Product Managers", note: "Prototyping without engineering." },
      { role: "Business Analysts", note: "Turning process into workflow." },
      { role: "Scrum Masters", note: "Removing team toil." },
      { role: "Consultants", note: "Building client solutions fast." },
      { role: "Founders", note: "Shipping without a dev team." },
      { role: "Marketers", note: "Automating campaigns and content." },
      { role: "Support Leads", note: "Deflecting repetitive work." },
    ],
    industries: INDUSTRIES,
    landing: {
      crumb: "No-Code AI Agents",
      lede: "This is not another course about prompting AI. Over two live days you build a fleet of business agents, a voice agent, and a working application.",
      difference: "You will not spend eight hours watching demonstrations. You build with GrokBot, RAG, Claude Code, Codex, n8n, and voice AI — and leave with one working system.",
      outcomes: [],
      curriculumModules: [
        { title: "Day One: Build the Agent Fleet", topics: ["Turn a business process into an agent-powered workflow", "Define agent roles, goals, instructions, tools, and guardrails", "Build agents that perform different parts of the work", "Ground agents in company knowledge using RAG", "Create agent handoffs and human approval points", "Use n8n to connect the workflow", "Test the complete agent fleet from beginning to end"] },
        { title: "Day Two: Build a Voice Agent and an AI-Powered App", topics: ["Build a voice agent that can hold natural conversations", "Connect the voice agent to company knowledge and business workflows", "Define the purpose and requirements for a business application", "Use Claude Code or Codex as the application-building agent", "Watch the agent plan, design, and build the application", "Test and improve the voice agent and application", "Connect everything into one working AI-powered business system"] },
      ],
      examNote: "No exam. You earn the AI Agents and Automation™ certification, and leave with the agent fleet, voice agent, and application you built in class.",
    },
    outcomeGroups: [
      { title: "Build", items: ["A fleet of specialized agents that collaborate on company work", "A RAG knowledge system grounded in company information", "A voice agent capable of holding real conversations", "A working application planned and built by an AI agent"] },
      { title: "Connect", items: ["Connected workflows with agent handoffs and human approvals", "Use n8n to wire the agent fleet together", "Connect the voice agent to company knowledge and business workflows", "One complete workflow connecting agents, knowledge, voice, and software"] },
      { title: "Ship", items: ["Turn a business process into an agent-powered workflow", "Use Claude Code or Codex as the application-building agent", "Test the complete agent fleet from beginning to end", "Leave with a working AI-powered business system"] },
    ],
    ai: {
      heading: "Two days,<br />all of them hands-on",
      lede: "Day one is the agent fleet. Day two is the voice agent and the application. You will not spend eight hours watching demonstrations.",
      activities: [
        { title: "Build the agent fleet", where: "Day 1", body: "Turn a business process into specialized agents with roles, tools, RAG knowledge, handoffs, and human approvals — then connect it in n8n and test end to end." },
        { title: "Build the voice agent", where: "Day 2", body: "Create a voice agent that can hold natural conversations and connect it to company knowledge and the workflows you built on day one." },
        { title: "Have an agent build the app", where: "Day 2", body: "Use Claude Code or Codex as the application-building agent. Watch it plan, design, and build a working application from your requirements." },
        { title: "Connect the whole system", where: "Day 2", body: "Bring the fleet, RAG knowledge, voice agent, and application into one working AI-powered business system." },
      ],
      techniques: [
        "Combine <strong>GrokBot, RAG, Claude Code, Codex, n8n, and voice AI</strong>",
        "Ground agents in <strong>company knowledge</strong> with RAG",
        "Create <strong>handoffs and human approvals</strong> so work stays trustworthy",
        "Build a <strong>voice agent</strong> that can hold a real conversation",
        "Use Claude Code or Codex to <strong>plan, design, and build</strong> the application",
      ],
      responsible: RESPONSIBLE_AI,
    },
    whatsNew: [
      { title: "A fleet, not a single chatbot", body: "Day one is specialized agents that collaborate on company work, grounded in RAG, with handoffs and approvals." },
      { title: "Voice plus a working app", body: "Day two you build a voice agent and use Claude Code or Codex to have an agent build a working application." },
      { title: "One connected system", body: "You leave with agents, knowledge, voice, and software wired into one workflow — not a pile of demos." },
    ],
    changed: [
      { title: "Not a prompting class", body: "This is not another course about prompting AI. You build a fleet, a voice agent, and an app." },
      { title: "Eight hours, four hours a day", body: "Two live days. You build the whole time." },
      { title: "Current stack", body: "GrokBot, RAG, Claude Code, Codex, n8n, and voice AI." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "4", label: "Hours per day" },
      { value: "8", label: "Hours of live training" },
      { value: "1", label: "Complete system: fleet, voice, and app" },
    ],
    overview: {
      heading: "Build a fleet of AI agents,<br />a voice agent, and a working app",
      body: [
        "This is not another course about prompting AI. Over two live, hands-on days, you will build a connected fleet of business agents, create an AI voice agent, and use Claude Code or Codex to have an agent build a working application.",
        "You’ll learn how to combine GrokBot, RAG, Claude Code, Codex, n8n, and voice AI to turn a business challenge into a functioning AI-powered system. The journey is Company Challenge → Agent Fleet → RAG Knowledge → Voice Agent → AI-Built Application → Working Business System.",
      ],
    },
    whyNow: {
      heading: "You will not spend eight hours<br />watching demonstrations",
      body: "Most AI courses stop at prompting. This class is a build: a fleet of agents on company knowledge, a voice agent that can talk, and an application planned and built by Claude Code or Codex — connected into one working system.",
    },
  },

  /* ------------------------------------------ AI Workflow Automation */
  "ai-workflow-automation": {
    slug: "ai-workflow-automation",
    version: "2026",
    subtitle: "From a manual process to a working automation",
    coverTitle: { main: "AI Workflow", accent: "Automation™" },
    badge: "/Logo_AI_Workflow_Automation.png",
    band: BAND,
    path: "/courses/ai-workflow-automation",
    price: PRICE["ai-workflow-automation"],
    duration: { days: "2 days", hours: "8" },
    credits: "8 PDUs",
    accreditation: {
      safe: false,
      credential: "AI Workflow Automation™",
      assessment: "Working workflow, no exam",
    },
    prerequisites: [
      "None. No traditional programming experience is required.",
      "Bring a repetitive business process you would like to automate.",
      "A laptop and a willingness to build in the session.",
    ],
    audience: [
      { role: "Business Owners", note: "Replacing copy-paste work." },
      { role: "Operations Leads", note: "Moving work without handoffs." },
      { role: "Product Managers", note: "Automating operational glue." },
      { role: "Project Managers", note: "Cutting repetitive follow-ups." },
      { role: "Consultants", note: "Building client automations." },
      { role: "Marketers", note: "Connecting campaigns and data." },
      { role: "Support Leads", note: "Routing requests automatically." },
      { role: "Process Leads", note: "Turning maps into running workflows." },
    ],
    industries: INDUSTRIES,
    landing: {
      crumb: "AI Workflow Automation",
      lede: "Turn manual business processes into working automations with n8n, Claude, APIs, and webhooks — without traditional programming.",
      difference: "This is not a collection of disconnected exercises. You automate one complete business process from trigger to outcome.",
      outcomes: [],
      curriculumModules: [
        { title: "Day One: Design and Build the Workflow", topics: ["Identify the business process and desired outcome", "Map the current manual workflow", "Define triggers, actions, decisions, and outputs", "Build the workflow in n8n", "Connect applications and move data between systems", "Add rules, conditions, and routing", "Test the workflow from beginning to end"] },
        { title: "Day Two: Add AI and Make It Reliable", topics: ["Add Claude to analyze, classify, extract, and generate", "Work with APIs and webhooks", "Add human approvals and escalation paths", "Handle errors, incomplete information, and exceptions", "Add notifications, logging, and monitoring", "Improve workflow accuracy and reliability", "Run the completed automation from trigger to business outcome"] },
      ],
      examNote: "No exam. You earn the AI Workflow Automation™ certification and leave with a complete workflow you can run from trigger to business outcome.",
    },
    outcomeGroups: [
      { title: "Map", items: ["Find high-value automation opportunities", "Map triggers, inputs, actions, decisions, and exceptions", "Define success conditions before you build"] },
      { title: "Build", items: ["Create the workflow visually in n8n", "Connect applications, APIs, and webhooks", "Move data between business tools"] },
      { title: "Run", items: ["Add Claude to classify, extract, and generate", "Keep humans in control with approvals", "Handle errors and leave an audit trail"] },
    ],
    ai: {
      heading: "Two days,<br />all of them hands-on",
      lede: "Day one is the workflow. Day two is AI, reliability, and a run from trigger to business outcome.",
      activities: [
        { title: "Map and build the workflow", where: "Day 1", body: "Take a manual process, define triggers and decisions, and build it in n8n so work moves between systems without copy-paste." },
        { title: "Add Claude inside the process", where: "Day 2", body: "Use Claude to classify requests, extract information, summarize, generate outputs, and support decisions in the workflow." },
        { title: "Keep humans in control", where: "Day 2", body: "Add approval and escalation steps for sensitive, financial, or customer-facing work." },
        { title: "Make it reliable", where: "Day 2", body: "Handle missing information, prevent duplicates, manage failures, and monitor the run." },
      ],
      techniques: [
        "Build the workflow in <strong>n8n</strong>",
        "Add <strong>Claude</strong> to classify, extract, and generate",
        "Connect systems with <strong>APIs and webhooks</strong>",
        "Keep people in the loop for <strong>approvals and exceptions</strong>",
        "Test from <strong>trigger to business outcome</strong>",
      ],
      responsible: RESPONSIBLE_AI,
    },
    whatsNew: [
      { title: "The process comes first", body: "You start with the work itself, not with a feature tour of an automation tool." },
      { title: "AI inside the workflow", body: "Claude classifies, extracts, and generates as a step — not as a separate chatbot exercise." },
      { title: "Reliable enough to run", body: "Approvals, errors, notifications, and an audit trail are part of the build." },
    ],
    changed: [
      { title: "Not a feature sampler", body: "You automate one complete business process from beginning to end." },
      { title: "Eight hours, four hours a day", body: "Two live days. You build the whole time." },
      { title: "No traditional coding", body: "n8n, Claude, APIs, and webhooks — not a programming class." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "4", label: "Hours per day" },
      { value: "8", label: "Hours of live training" },
      { value: "1", label: "Complete process, automated end to end" },
    ],
    overview: {
      heading: "Turn manual processes<br />into working automations",
      body: [
        "Stop copying information between systems, sending repetitive follow-ups, updating spreadsheets by hand, and relying on people to move every task forward.",
        "You will map a manual process, build it in n8n, add Claude, connect APIs and webhooks, and run it from trigger to business outcome.",
      ],
    },
    whyNow: {
      heading: "Most automation courses<br />stop at features",
      body: "This one starts with the work. You leave able to move from Manual Process → Workflow Map → Connected Systems → AI-Powered Decisions → Automated Business Outcome.",
    },
  },

  /* ------------------------------------------ No-Code AI App Builder */
  "ai-app-builder": {
    slug: "ai-app-builder",
    version: "2026",
    subtitle: "Build apps you can sell, or use to grow your own business",
    coverTitle: { main: "No-Code AI", accent: "App Builder™" },
    badge: "/Logo_AI_App_Builder.png",
    band: BAND,
    path: "/courses/ai-app-builder",
    price: PRICE["ai-app-builder"],
    duration: { days: "2 days", hours: "8" },
    credits: "8 PDUs",
    accreditation: {
      safe: false,
      credential: "No-Code AI App Builder™",
      assessment: "Working app, no exam",
    },
    prerequisites: [
      "None. No coding experience is required.",
      "Bring a real business problem you would like to solve with an application.",
      "A laptop and a willingness to build in the session.",
    ],
    audience: [
      { role: "Entrepreneurs", note: "Building a product you can sell." },
      { role: "Consultants", note: "Offering app-building as a service." },
      { role: "Small-Business Owners", note: "Replacing spreadsheets and manual work." },
      { role: "Product Managers", note: "Shipping without waiting on engineering." },
      { role: "Product Owners", note: "Turning needs into a working app." },
      { role: "Operations Leads", note: "Building internal tools." },
      { role: "Marketers", note: "Standing up lead and membership tools." },
      { role: "Freelancers", note: "Packaging a repeatable client offer." },
    ],
    industries: INDUSTRIES,
    landing: {
      crumb: "No-Code AI App Builder",
      lede: "Turn a real business problem into a working application you can sell to a small business or use inside your own company, without writing code.",
      difference: "You will not simply build a practice app and forget it after class. You learn a repeatable process: Business Problem → App Requirements → Working Solution → Client Customization → Published App → Sellable Service.",
      outcomes: [],
      curriculumModules: [
        { title: "Day One: Find the Opportunity and Build the App", topics: ["Identify a valuable small-business problem", "Define the customer and desired business outcome", "Turn the problem into app requirements", "Generate the initial application", "Build the screens, navigation, and user experience", "Add forms, data, and core functionality", "Complete the first working version"] },
        { title: "Day Two: Customize, Launch, and Sell", topics: ["Add business rules and advanced features", "Add user accounts and permissions", "Connect external tools and services", "Customize the app for a specific business", "Improve the design and user experience", "Test and publish the finished application", "Create a client-ready demonstration and service offer"] },
      ],
      examNote: "No exam. You earn the No-Code AI App Builder™ certification and leave with a published application and a service offer you can sell.",
    },
    outcomeGroups: [
      { title: "Find", items: ["Identify processes small businesses would pay to improve", "Turn a client conversation into users, workflows, and features", "Write clear build instructions before you generate the app"] },
      { title: "Build", items: ["Generate screens, navigation, and functionality with AI", "Add data, rules, users, and integrations", "Customize branding, content, and workflows for a client"] },
      { title: "Sell", items: ["Test realistic user scenarios and publish the app", "Demonstrate the business value", "Package the build as a repeatable client service"] },
    ],
    ai: {
      heading: "Two days,<br />all of them hands-on",
      lede: "Day one is the opportunity and the first working version. Day two is customization, launch, and a service you can sell.",
      activities: [
        { title: "Find the opportunity", where: "Day 1", body: "Identify a valuable small-business problem, define the customer and outcome, and turn it into app requirements." },
        { title: "Build the first version", where: "Day 1", body: "Generate the application, build screens and navigation, and add forms, data, and core functionality." },
        { title: "Customize for a client", where: "Day 2", body: "Add business rules, users, permissions, and integrations, then brand the app for a specific business." },
        { title: "Publish and package", where: "Day 2", body: "Test, publish, demonstrate the finished product, and structure it as a client-ready service offer." },
      ],
      techniques: [
        "Use an <strong>AI-powered no-code platform</strong> to generate the app",
        "Add <strong>data, users, workflows, and integrations</strong>",
        "Customize <strong>branding, content, and features</strong> for different businesses",
        "Test, publish, and <strong>demonstrate</strong> the finished product",
        "Package the app as a <strong>service you can sell</strong>",
      ],
      responsible: {
        lede: "A full topic, not a disclaimer. You'll work through common AI risks and the three aspects of responsible use:",
        points: [
          "<strong>Trustworthy AI</strong>: reliable enough to base a decision on",
          "<strong>Explainable AI</strong>: you can say why it produced that",
          "<strong>Human-centric AI</strong>: the person stays accountable",
        ],
      },
    },
    whatsNew: [
      { title: "A real business problem first", body: "You start with a need worth solving, not with a template tour of a no-code tool." },
      { title: "Built to sell or to use", body: "The same process works for a client engagement or an internal operations tool." },
      { title: "A repeatable service", body: "You leave with a published app and a way to turn one successful build into more." },
    ],
    changed: [
      { title: "Not a practice app you abandon", body: "You finish with a published application and a client-ready demonstration." },
      { title: "Eight hours, four hours a day", body: "Two live days. You build the whole time." },
      { title: "No coding required", body: "AI-powered no-code tools, not a programming class." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "4", label: "Hours per day" },
      { value: "8", label: "Hours of live training" },
      { value: "1", label: "Working app, ready to publish" },
    ],
    overview: {
      heading: "Build apps you can sell,<br />or use to grow your own business",
      body: [
        "Learn how to turn real business problems into working applications without manually writing code.",
        "You will identify a valuable need, turn it into requirements, build the application with AI, customize it for a client, and package it as a service you can sell.",
      ],
    },
    whyNow: {
      heading: "Custom software used to be<br />expensive and slow",
      body: "AI-powered no-code platforms changed that. You leave able to move from Business Problem → App Requirements → Working Solution → Client Customization → Published App → Sellable Service.",
    },
  },

  /* ------------------------------------------ GenAI for Project Managers */
  "generative-ai-project-managers": {
    slug: "generative-ai-project-managers",
    version: "2026",
    subtitle: "AI across the whole project lifecycle",
    coverTitle: { main: "Generative AI for", accent: "Project Managers™" },
    badge: "/GenAI.png",
    band: BAND,
    path: "/courses/generative-ai-project-managers",
    price: PRICE["generative-ai-project-managers"],
    duration: { days: "2 days", hours: "16" },
    credits: "16 PDUs",
    prerequisites: [
      "None. The course is open to all attendees.",
      "Project management experience helps you apply it faster.",
      "No prior AI experience is assumed.",
    ],
    audience: [
      { role: "Project Managers", note: "Running delivery day to day." },
      { role: "Programme Managers", note: "Coordinating across projects." },
      { role: "PMO Leads", note: "Setting practice and standards." },
      { role: "Scrum Masters", note: "Bridging Agile and traditional." },
      { role: "Delivery Managers", note: "Accountable for schedule." },
      { role: "Business Analysts", note: "Supporting planning and risk." },
      { role: "Product Owners", note: "Managing scope and stakeholders." },
      { role: "Team Leads", note: "Reporting up and out." },
    ],
    industries: INDUSTRIES,
    landing: {
      crumb: "GenAI for PMs",
      lede: "Twelve modules taking generative AI through the whole project lifecycle — planning, collaboration, risk, budget, stakeholders, quality, and the ethics of using it.",
      difference: "Built by practising project leaders, so every module lands on something a PM does every week: a schedule, a risk register, a status update, a budget forecast.",
      outcomes: [],
      curriculumModules: [
        { title: "Introduction to Generative AI for Project Management", topics: ["What generative AI is and is not", "Where it fits a project lifecycle", "Setting expectations with your team"] },
        { title: "AI in Project Planning and Scheduling", topics: ["Drafting plans and work breakdowns", "Estimating and schedule modelling", "Testing a plan for gaps"] },
        { title: "Enhancing Team Collaboration with AI", topics: ["Meeting summaries and action tracking", "Reducing coordination overhead", "Keeping the team in the loop"] },
        { title: "AI for Risk Management and Mitigation", topics: ["Surfacing risks a register missed", "Assessing likelihood and impact", "Drafting mitigation plans"] },
        { title: "Leveraging AI for Project Budgeting", topics: ["Cost modelling and forecasting", "Variance analysis", "Explaining budget movement"] },
        { title: "AI in Stakeholder Communication", topics: ["Tailoring updates by audience", "Drafting status and escalation", "Preparing for difficult conversations"] },
        { title: "Using AI for Decision Making", topics: ["Structuring options and trade-offs", "Testing assumptions", "Documenting the rationale"] },
        { title: "Integrating AI into Project Management Tools", topics: ["Working with your existing toolchain", "Automating repetitive updates", "Keeping a single source of truth"] },
        { title: "Optimizing Project Quality with AI", topics: ["Quality planning and checks", "Reviewing deliverables", "Catching defects earlier"] },
        { title: "AI in Agile and Scrum Practices", topics: ["Backlog and story support", "Retrospective and review input", "Flow and velocity analysis"] },
        { title: "Ethical Considerations in AI Implementation", topics: ["Data handling and confidentiality", "Bias and fairness in project decisions", "Transparency with your team and client"] },
        { title: "Future Trends and AI Evolution in Project Management", topics: ["Where the tooling is heading", "Preparing your practice", "Building an adoption plan"] },
      ],
      examNote: "No exam. You leave with a certificate of completion, 16 PDUs, and a prompt library covering every stage of the project lifecycle.",
    },
    outcomeGroups: [
      { title: "Plan and forecast", items: ["Draft plans, work breakdowns, and schedules with AI support", "Model costs and explain budget variance", "Surface risks a register missed and draft mitigations", "Structure options and trade-offs for a real decision"] },
      { title: "Communicate", items: ["Tailor status updates by audience without rewriting from scratch", "Summarize meetings into tracked actions", "Prepare for escalation and difficult conversations", "Keep stakeholders current with far less overhead"] },
      { title: "Run it responsibly", items: ["Handle project data confidentially when using AI tools", "Recognize bias and fairness risks in AI-supported decisions", "Be transparent with your team and client about AI use", "Build an adoption plan for your own practice"] },
    ],
    ai: {
      heading: "Twelve modules,<br />one project lifecycle",
      lede: "The whole course is AI applied to project work. Each module takes one thing a project manager does every week and rebuilds it with generative AI in the loop.",
      activities: [
        { title: "Plan and schedule", where: "Module 2", body: "Draft a work breakdown and schedule with AI, then stress-test it for the gaps a confident plan usually hides." },
        { title: "Risk register, rebuilt", where: "Module 4", body: "Use AI to surface risks your register missed, assess likelihood and impact, and draft mitigations worth reviewing." },
        { title: "Budget and variance", where: "Module 5", body: "Model project costs, forecast, and produce a variance explanation a sponsor will actually read." },
        { title: "Stakeholder updates", where: "Module 6", body: "Tailor the same project truth to three different audiences without writing it three times." },
      ],
      techniques: [
        "Draft <strong>plans, WBS, and schedules</strong> then test them for what is missing",
        "Rebuild a <strong>risk register</strong> with risks the team had not named",
        "Produce <strong>budget forecasts and variance</strong> explanations that hold up",
        "Tailor <strong>stakeholder communication</strong> by audience in minutes",
        "Apply AI inside <strong>Agile and Scrum</strong> practices as well as traditional delivery",
      ],
      responsible: {
        lede: "Module 11 is a full module on the ethics of using AI on client and project data:",
        points: [
          "<strong>Confidentiality</strong> — what project data should never reach a model",
          "<strong>Bias and fairness</strong> — where AI-supported decisions go wrong",
          "<strong>Transparency</strong> — telling your team and client how you used it",
        ],
      },
    },
    whatsNew: [
      { title: "The whole lifecycle", body: "Twelve modules from planning and scheduling through to future trends, not a single AI overview." },
      { title: "Ethics as a module", body: "Module 11 covers confidentiality, bias, and transparency on real client work." },
      { title: "Traditional and Agile", body: "Module 10 applies the same practices inside Agile and Scrum delivery." },
    ],
    changed: [
      { title: "Built around PM artefacts", body: "Every module produces something a PM already owns: a plan, a register, a forecast, an update." },
      { title: "Tool-agnostic", body: "Module 8 covers integrating AI into whatever project toolchain you already run." },
      { title: "An adoption plan", body: "The final module turns the course into a plan for your own practice." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "12", label: "Modules across the project lifecycle" },
      { value: "1", label: "Full module on ethics, bias, and confidentiality" },
      { value: "16", label: "PDUs toward renewal" },
    ],
    overview: {
      heading: "AI applied to the job<br />a PM actually does",
      body: [
        "This is generative AI taken through the whole project lifecycle rather than introduced in the abstract. Twelve modules covering planning and scheduling, team collaboration, risk, budgeting, stakeholder communication, decision making, tooling, quality, and Agile practices.",
        "Module 11 is a full module on ethics — confidentiality of project and client data, bias in AI-supported decisions, and being transparent with your team about how the work was produced. The course closes on an adoption plan for your own practice.",
      ],
    },
    whyNow: {
      heading: "Project managers were<br />handed AI without a method",
      body: "Most PMs are now expected to use AI and given no guidance on where it helps, where it quietly fabricates, or what may safely be pasted into it. This course supplies the method: which artefacts to rebuild with AI, how to test what comes back, and how to be straight with clients about it.",
    },
  },

  /* --------------------------------------------- AI Product Manager */
  "certified-ai-product-manager": {
    slug: "certified-ai-product-manager",
    version: "2026",
    subtitle: "Ship a working app in two days",
    coverTitle: { main: "Certified AI", accent: "Product Manager" },
    badge: "/PMAI.jpeg",
    band: BAND,
    path: "/courses/certified-ai-product-manager",
    price: PRICE["certified-ai-product-manager"],
    duration: { days: "2 days", hours: "10" },
    credits: "10 PDUs",
    prerequisites: [
      "None. No engineering background is required.",
      "Bring a product idea you would genuinely like to exist.",
      "A laptop — you will be building on it.",
    ],
    audience: [
      { role: "Product Managers", note: "Wanting to build, not just spec." },
      { role: "Product Owners", note: "Prototyping before a sprint." },
      { role: "Founders", note: "Shipping a first version alone." },
      { role: "Business Analysts", note: "Moving into product." },
      { role: "Programme Managers", note: "Validating ideas quickly." },
      { role: "Designers", note: "Taking a concept to working code." },
      { role: "Consultants", note: "Building client prototypes." },
      { role: "Marketers", note: "Standing up their own tools." },
    ],
    industries: INDUSTRIES,
    landing: {
      crumb: "AI Product Manager",
      lede: "Eight modules that take one idea from a blank page to a deployed, working application — built by you, with AI, in two days.",
      difference: "Most AI product courses teach you to talk about AI products. This one has you ship one, then make the product calls you only face once something is actually running.",
      outcomes: [],
      curriculumModules: [
        { title: "From idea to a shippable product", topics: ["Choose an idea small enough to finish", "Define the one job it does", "Scope to a first working version"] },
        { title: "Build the first working version", topics: ["Stand up the app", "Get something on screen fast", "Iterate against real use"] },
        { title: "Data, auth, and the parts that make it an app", topics: ["Persist real data", "Add sign-in", "Handle state and errors"] },
        { title: "Put AI in the product", topics: ["Choose where AI genuinely helps", "Wire the model into the product", "Handle failure and cost"] },
        { title: "Finish and deploy", topics: ["Close the gaps that block release", "Deploy it live", "Share a working link"] },
        { title: "Product calls you only make when you are building", topics: ["Cut scope with the build in front of you", "Decide what is good enough", "Trade speed against reliability"] },
        { title: "Demo the live app", topics: ["Show the working product", "Take questions on real behaviour", "Capture what you would build next"] },
        { title: "What you take back to work", topics: ["Apply the loop to your real roadmap", "Prototype before you spec", "Change how you brief engineering"] },
      ],
      examNote: "No exam. You leave with a deployed application, a shareable link, and a certificate of completion.",
    },
    outcomeGroups: [
      { title: "Ship it", items: ["Take an idea from blank page to a deployed, working application", "Stand up data, authentication, and state without an engineer", "Put AI into a product where it genuinely helps", "Deploy live and share a working link"] },
      { title: "Decide it", items: ["Scope an idea down to a first version that can actually finish", "Cut scope with the build in front of you, not a document", "Decide what is good enough to release", "Trade speed against reliability deliberately"] },
      { title: "Take it back", items: ["Prototype before you write a spec", "Brief engineering with a working thing rather than a document", "Apply the same loop to your real roadmap", "Know what AI in a product costs to run"] },
    ],
    ai: {
      heading: "You leave with<br />a live application",
      lede: "This is a building course. By the end of day two your product is deployed and you are demoing it to the room from a link.",
      activities: [
        { title: "Scope to something finishable", where: "Module 1", body: "Pick an idea and cut it down to the one job it does — the single hardest product skill, practised before any code exists." },
        { title: "Put AI in the product", where: "Module 4", body: "Decide where AI genuinely improves the product rather than decorating it, wire the model in, and handle failure and cost." },
        { title: "Finish and deploy", where: "Module 5", body: "Close the gaps that block release and get the thing live on a link you can share." },
        { title: "Demo the live app", where: "Module 7", body: "Show the working product, take questions about real behaviour, and capture what you would build next." },
      ],
      techniques: [
        "Take an idea to a <strong>deployed app</strong> without an engineering team",
        "Decide where AI <strong>belongs in a product</strong> and where it is decoration",
        "Handle <strong>failure and cost</strong> when a model sits in your critical path",
        "Cut scope against a <strong>running build</strong> rather than a document",
        "Brief engineering with a <strong>working prototype</strong> instead of a spec",
      ],
      responsible: RESPONSIBLE_AI,
    },
    whatsNew: [
      { title: "You ship, not sketch", body: "The deliverable is a deployed application with a link, not a slide deck or a canvas." },
      { title: "Real product calls", body: "Module 6 covers the decisions you only face once something is actually running." },
      { title: "It changes how you spec", body: "The final module is about prototyping before writing requirements, back at work." },
    ],
    changed: [
      { title: "Building over theory", body: "Eight modules, and six of them have you building rather than discussing." },
      { title: "AI where it earns its place", body: "Module 4 is explicit that AI goes in where it improves the product, not everywhere." },
      { title: "Deploy on day two", body: "The app goes live in the session, and you demo it from a shareable link." },
    ],
    stats: [
      { value: "2", label: "Days, live and instructor-led" },
      { value: "8", label: "Modules from blank page to deployed app" },
      { value: "1", label: "Working application you leave holding" },
      { value: "10", label: "PDUs toward renewal" },
    ],
    overview: {
      heading: "Stop specifying products.<br />Build one",
      body: [
        "Two days that take a single idea from a blank page to a deployed application. You scope it down to something finishable, stand up the first working version, add data and authentication, put AI where it genuinely helps, and deploy it live.",
        "The last three modules are the ones product people remember: the calls you only make with a running build in front of you, demoing something real, and changing how you brief engineering once you have built a thing yourself.",
      ],
    },
    whyNow: {
      heading: "A working prototype beats<br />a perfect requirements doc",
      body: "Product managers have spent years describing software to the people who build it. That gap has narrowed sharply — a PM can now stand up a working version themselves in a day. This course exists to make that a habit, because the fastest way to settle an argument about a feature is to put the feature in front of people.",
    },
  },

  /* ------------------------------------------- Certified GenAI Practitioner */
  "certified-genai-practitioner": {
    slug: "certified-genai-practitioner",
    version: "2026",
    subtitle: "Generative AI foundations that stick",
    coverTitle: { main: "Certified GenAI", accent: "Practitioner" },
    badge: "/GENAI.jpeg",
    band: BAND,
    path: "/courses/certified-genai-practitioner",
    price: PRICE["certified-genai-practitioner"],
    duration: { days: "1 day", hours: "8" },
    credits: "8 PDUs",
    prerequisites: [
      "None. This is the entry point to the AI track.",
      "No technical background required.",
      "Useful for anyone whose work is being changed by AI.",
    ],
    audience: [
      { role: "Anyone starting", note: "The entry point to the AI track." },
      { role: "Team Members", note: "Using AI tools daily already." },
      { role: "Managers", note: "Setting expectations for a team." },
      { role: "Business Analysts", note: "Applying AI to analysis work." },
      { role: "Scrum Masters", note: "Coaching AI use on a team." },
      { role: "Marketers", note: "Producing content responsibly." },
      { role: "Operations", note: "Automating routine work." },
      { role: "Consultants", note: "Advising clients on AI." },
    ],
    industries: INDUSTRIES,
    landing: {
      crumb: "GenAI Practitioner",
      lede: "A one-day grounding in generative AI: what it is, how to prompt it well, where it goes wrong, and how to apply it to your own work.",
      difference: "Foundations taught for practitioners rather than engineers — every concept lands on something you do at work, and the ethics module is taught as judgment rather than compliance.",
      outcomes: [],
      curriculumModules: [
        { title: "Introduction to Generative AI", topics: ["What generative AI is and how it differs from other AI", "Models, tokens, and context in plain language", "What these systems can and cannot do", "Where the technology is heading"] },
        { title: "Prompt Engineering Fundamentals", topics: ["Anatomy of an effective prompt", "Instruction, analysis, and chain-of-thought techniques", "Giving context and constraints", "Iterating a prompt toward a usable answer", "Common prompting mistakes"] },
        { title: "AI Ethics and Responsible Implementation", topics: ["Bias, fairness, and representational harm", "Confidentiality and what not to paste in", "Hallucination and verification habits", "Transparency about AI-assisted work", "Organizational policy and your responsibility"] },
        { title: "Practical GenAI Applications", topics: ["Applying AI to your own recurring work", "Drafting, summarizing, and analyzing", "Building a personal prompt library", "Knowing when not to use it", "Planning your next thirty days"] },
      ],
      examNote: "Assessment is practical rather than a timed exam. You leave with a certificate of completion and a personal prompt library.",
    },
    outcomeGroups: [
      { title: "Understand it", items: ["Explain what generative AI is and how it differs from other AI", "Describe models, tokens, and context without jargon", "State plainly what these systems can and cannot do", "Recognize where the technology is heading"] },
      { title: "Use it well", items: ["Write effective prompts using instruction, analysis, and chain-of-thought", "Give context and constraints that change the answer", "Iterate a weak answer into a usable one", "Avoid the prompting mistakes that waste most people's time"] },
      { title: "Use it safely", items: ["Recognize bias, fairness, and representational harm", "Know what must never be pasted into a model", "Build verification habits against hallucination", "Be transparent about AI-assisted work"] },
    ],
    ai: {
      heading: "Foundations you can<br />actually build on",
      lede: "One day, four modules, and a personal prompt library at the end. Everything is taught against work you already do.",
      activities: [
        { title: "What it is, plainly", where: "Module 1", body: "Models, tokens, and context explained without jargon — enough to reason about why a tool behaved the way it did." },
        { title: "Prompting properly", where: "Module 2", body: "Instruction, analysis, and chain-of-thought techniques, and the constraints that turn a vague answer into a usable one." },
        { title: "Where it goes wrong", where: "Module 3", body: "Bias, confidentiality, and hallucination — with verification habits rather than a policy document." },
        { title: "Your own prompt library", where: "Module 4", body: "Apply the day to your recurring work and leave with prompts you will use, plus a thirty-day plan." },
      ],
      techniques: [
        "Write prompts with <strong>instruction, analysis, and chain-of-thought</strong>",
        "Add <strong>context and constraints</strong> that materially change the answer",
        "<strong>Iterate</strong> a weak answer instead of accepting the first one",
        "Build <strong>verification habits</strong> against confident fabrication",
        "Know <strong>when not to use it</strong> — the most valuable judgment of all",
      ],
      responsible: {
        lede: "A quarter of the course is responsible use, taught as judgment rather than compliance:",
        points: [
          "<strong>Bias and fairness</strong> — where outputs quietly disadvantage people",
          "<strong>Confidentiality</strong> — what must never be pasted into a model",
          "<strong>Transparency</strong> — being straight about AI-assisted work",
        ],
      },
    },
    whatsNew: [
      { title: "One day, no prerequisites", body: "The entry point to the whole AI track, with no technical background assumed." },
      { title: "A quarter on ethics", body: "One of four modules is responsible implementation — bias, confidentiality, and verification." },
      { title: "You leave with prompts", body: "The final module builds a personal prompt library against your own recurring work." },
    ],
    changed: [
      { title: "Plain language throughout", body: "Models, tokens, and context explained for practitioners, not engineers." },
      { title: "Prompting taught as a skill", body: "A full module on technique, iteration, and the mistakes that waste most people's time." },
      { title: "A thirty-day plan", body: "The day ends with what you will actually do differently over the next month." },
    ],
    stats: [
      { value: "1", label: "Day, live and instructor-led" },
      { value: "4", label: "Modules from foundations to your own applications" },
      { value: "25", unit: "%", label: "Of the course is responsible and ethical use" },
      { value: "8", label: "PDUs toward renewal" },
    ],
    overview: {
      heading: "The grounding everything<br />else assumes you have",
      body: [
        "A single day covering what generative AI actually is, how to prompt it well, where it goes wrong, and how to apply it to your own work. It is the entry point to the Agile36 AI track and assumes no technical background whatsoever.",
        "A full quarter of the course is responsible implementation — bias and fairness, confidentiality, hallucination and verification, and transparency about AI-assisted work. You leave with a personal prompt library and a thirty-day plan.",
      ],
    },
    whyNow: {
      heading: "Most people learned AI<br />by guessing at it",
      body: "Almost everyone is now using these tools and almost nobody was taught how. The result is predictable: weak prompts accepted at face value, confidential material pasted into public models, and fabricated answers passed on unchecked. One day of proper foundations removes most of that.",
    },
  },

  /* ---------------------------------------- Executive GenAI Leadership */
  "executive-genai-leadership": {
    slug: "executive-genai-leadership",
    version: "2026",
    subtitle: "From scattered pilots to a funded agenda",
    coverTitle: { main: "Executive GenAI", accent: "Leadership" },
    // No badge: the Accredible credential has no artwork in public/ yet, and
    // borrowing another course's mark is how AIMP.jpeg (the AI Product Manager
    // badge) ended up on this cover.
    band: BAND,
    path: "/courses/executive-genai-leadership",
    price: PRICE["executive-genai-leadership"],
    // One day, 9 AM–2 PM, matching every cohort on the schedule page.
    duration: { days: "1 day", hours: "5" },
    credits: "5 PDUs",
    accreditation: {
      safe: false,
      credential: "Executive GenAI Leadership™, issued through Accredible",
      assessment: "Capstone, no exam",
    },
    prerequisites: [
      "None. Built for senior leaders, not technologists.",
      "No technical AI background is assumed.",
      "Most valuable if your organization has pilots but no strategy.",
    ],
    audience: [
      { role: "Executives", note: "Owning the AI agenda." },
      { role: "Directors", note: "Turning strategy into delivery." },
      { role: "Transformation Leads", note: "Running the change." },
      { role: "CIOs & CTOs", note: "Choosing the operating model." },
      { role: "Finance Leaders", note: "Funding and measuring AI." },
      { role: "HR Leaders", note: "Workforce readiness and roles." },
      { role: "Portfolio Managers", note: "Sequencing AI investment." },
      { role: "Board Members", note: "Governing AI risk." },
    ],
    industries: INDUSTRIES,
    landing: {
      crumb: "Executive GenAI",
      lede: "A one-day executive programme on AI opportunity, governance, operating-model choices, workforce readiness, risk, and value realization — moving from scattered experimentation to a focused transformation agenda.",
      difference: "Taught in business language by people who have led enterprise transformations, and it ends in a capstone: a full AI strategy for your own organization with the use cases and ROI modelled.",
      outcomes: [],
      curriculumModules: [
        { title: "Introduction to Generative AI for Leaders", topics: ["What generative AI means for business performance", "How AI creates measurable value across operations and customer experience", "Separating capability from hype"] },
        { title: "Key Concepts for Executive Decision-Making", topics: ["Core concepts explained in business language", "Understanding data readiness, governance, and workflow design", "The questions to ask your technology leaders"] },
        { title: "Identifying High-Value Use Cases", topics: ["Prioritizing use cases using value scoring", "Determining feasibility, impact, and ROI", "Killing the pilots that will never scale"] },
        { title: "Quantifying Business Value & ROI", topics: ["Calculating cost savings, efficiency gains, and revenue impact", "KPI frameworks for automation, productivity, and cycle-time reduction", "Building a case the board will fund"] },
        { title: "Industry-Specific Executive Use Cases", topics: ["High-impact opportunities across retail, healthcare, finance, logistics, government, and professional services", "Business models transforming through generative AI"] },
        { title: "Implementing an AI Strategy", topics: ["Building a scalable enterprise AI roadmap", "Choosing the right operating model — centralized, federated, or hybrid", "Sequencing investment across the portfolio"] },
        { title: "Execution & Preventing AI Project Failure", topics: ["Why many AI initiatives fail and how leaders prevent it", "Delivery frameworks for successful AI projects", "Governance that does not stall delivery"] },
        { title: "Hands-On Business Workshops", topics: ["Use-case discovery workshop", "Value modeling simulation", "Prioritization against your own portfolio"] },
        { title: "AI for Innovation & New Business Models", topics: ["Using AI to launch new digital products", "New revenue streams and subscription models", "Where AI changes the economics"] },
        { title: "Managing AI Teams & Organizational Readiness", topics: ["The roles needed to execute an AI strategy", "Redesigning jobs and responsibilities around AI", "Building workforce readiness"] },
        { title: "Future Trends in AI for Leaders", topics: ["Emerging capabilities executives should prepare for", "Regulatory developments and compliance expectations", "Keeping the strategy current"] },
        { title: "Capstone Project & Executive Certification", topics: ["Build a full AI strategy for your organization", "Identify high-impact use cases and model their ROI", "Present and defend the agenda"] },
      ],
      examNote: "Assessment is a capstone rather than a timed exam: a full AI strategy for your own organization, with use cases identified and ROI modelled.",
    },
    outcomeGroups: [
      { title: "Decide", items: ["Separate genuine AI capability from hype in business language", "Prioritize use cases by value, feasibility, impact, and ROI", "Kill the pilots that will never scale", "Ask your technology leaders the right questions"] },
      { title: "Fund", items: ["Calculate cost savings, efficiency gains, and revenue impact", "Apply KPI frameworks for automation and cycle-time reduction", "Build an investment case the board will fund", "Sequence AI investment across the portfolio"] },
      { title: "Execute", items: ["Choose an operating model — centralized, federated, or hybrid", "Apply delivery frameworks that prevent AI project failure", "Redesign roles and build workforce readiness", "Govern AI risk without stalling delivery"] },
    ],
    ai: {
      heading: "A strategy, not<br />a set of pilots",
      lede: "The whole programme is AI leadership. Two hands-on workshops and a capstone mean you leave with a strategy for your own organization rather than notes about someone else's.",
      activities: [
        { title: "Use-case discovery workshop", where: "Module 8", body: "Work your own organization's opportunities into a scored, prioritized list rather than a wish list of pilots." },
        { title: "Value modeling simulation", where: "Module 8", body: "Model the ROI on your highest-value cases using KPI frameworks for automation, productivity, and cycle time." },
        { title: "Operating model choice", where: "Module 6", body: "Decide between centralized, federated, and hybrid — the structural call that determines whether the strategy survives contact with the organization." },
        { title: "Capstone strategy", where: "Module 12", body: "Build and defend a full AI strategy for your organization, with use cases identified and their ROI modelled." },
      ],
      techniques: [
        "Score and prioritize <strong>use cases</strong> by value, feasibility, and ROI",
        "Build an <strong>investment case</strong> a board will actually fund",
        "Choose an <strong>operating model</strong> that fits how your organization works",
        "Apply delivery frameworks that <strong>prevent AI project failure</strong>",
        "Redesign <strong>roles and readiness</strong> around what AI changes",
      ],
      responsible: RESPONSIBLE_AI,
    },
    whatsNew: [
      { title: "Ends in a real strategy", body: "The capstone is an AI strategy for your own organization, with use cases and modelled ROI." },
      { title: "Two working workshops", body: "Use-case discovery and value modelling, run against your portfolio rather than a case study." },
      { title: "Why AI projects fail", body: "A full module on the failure patterns and the delivery frameworks that prevent them." },
    ],
    changed: [
      { title: "Business language throughout", body: "Core concepts explained for decision-making rather than for engineers." },
      { title: "Operating model as a decision", body: "Centralized, federated, or hybrid treated as the structural call it actually is." },
      { title: "Workforce readiness included", body: "Roles, job redesign, and organizational readiness rather than technology alone." },
    ],
    stats: [
      { value: "1", label: "Day, live and instructor-led (9 AM–2 PM)" },
      { value: "12", label: "Modules from opportunity through to capstone" },
      { value: "2", label: "Hands-on workshops using your own portfolio" },
      { value: "5", label: "PDUs toward renewal" },
    ],
    overview: {
      heading: "From scattered pilots<br />to a funded agenda",
      body: [
        "A one-day executive programme covering AI opportunity, governance, operating-model decisions, workforce readiness, risk, and value realization. It is built for leaders who have experimentation happening across the business and no coherent agenda holding it together.",
        "The programme moves from identifying and scoring high-value use cases, through quantifying ROI and choosing an operating model, into why AI initiatives fail and how leaders prevent it. It ends with a capstone: a full AI strategy for your own organization.",
      ],
    },
    whyNow: {
      heading: "Pilots are cheap.<br />A strategy is not",
      body: "Most enterprises now have AI activity in a dozen places and no view of which of it matters. The expensive failure is not a pilot that does not work — it is a year of pilots that were never going to scale, funded because nobody scored them. This day exists to produce that scoring, and the agenda that follows from it.",
    },
  },

  /* --------------------------------------------- AI-Driven Scrum Master */
  "ai-driven-scrum-master": {
    slug: "ai-driven-scrum-master",
    version: "2026",
    subtitle: "The Scrum Master job, rebuilt with AI",
    coverTitle: { main: "AI-Driven", accent: "Scrum Master" },
    badge: "/SSM.jpeg",
    band: BAND,
    path: "/courses/ai-driven-scrum-master",
    price: PRICE["ai-driven-scrum-master"],
    duration: { days: "1 day", hours: "8" },
    credits: "8 PDUs",
    prerequisites: [
      "None, though this assumes you already work as a Scrum Master.",
      "Existing Scrum or SAFe experience makes it land faster.",
      "No prior AI experience is assumed.",
    ],
    audience: [
      { role: "Scrum Masters", note: "Practising, wanting to go faster." },
      { role: "Team Coaches", note: "Supporting several teams." },
      { role: "Agile Coaches", note: "Coaching AI adoption." },
      { role: "Delivery Leads", note: "Owning flow and forecasts." },
      { role: "RTEs", note: "Rolling practice across a train." },
      { role: "Product Owners", note: "Sharing refinement work." },
      { role: "Team Leads", note: "Running Scrum events." },
      { role: "Programme Managers", note: "Reporting on delivery." },
    ],
    industries: INDUSTRIES,
    landing: {
      crumb: "AI-Driven Scrum Master",
      lede: "Ten modules taking AI through every part of the Scrum Master's week — refinement, planning, flow, testing, coaching, and the tools you already live in.",
      difference: "Every module lands on something you run: a refinement session, a sprint forecast, a daily scrum, a retrospective, a Jira board. It closes on a thirty-day adoption plan for your own team.",
      outcomes: [],
      curriculumModules: [
        { title: "The AI-Enhanced Scrum Master", topics: ["What changes in the role, and what does not", "Setting expectations with your team"] },
        { title: "AI for Backlog Refinement & Story Quality", topics: ["Sharpening stories and acceptance criteria", "Finding the gaps before the team does"] },
        { title: "AI-Driven Sprint Planning & Forecasting", topics: ["Capacity and forecast modelling", "Testing a sprint plan for optimism"] },
        { title: "AI for Daily Scrum, Flow, and Impediment Management", topics: ["Spotting flow problems earlier", "Tracking and escalating impediments"] },
        { title: "AI-Supported Testing, Quality, and Release Readiness", topics: ["Test coverage and quality signals", "Judging release readiness"] },
        { title: "Coaching & Facilitation with AI", topics: ["Preparing powerful questions", "Designing retrospectives that change something"] },
        { title: "Practical Use of AI in Jira, Confluence, and Team Tools", topics: ["Working inside the tools you already run", "Automating the reporting nobody enjoys"] },
        { title: "Ethics, Transparency, and Responsible AI in Agile Teams", topics: ["What team data should never be pasted in", "Being transparent with your team about AI use"] },
        { title: "Best Practices, Case Studies, and Real Team Examples", topics: ["What has worked on real teams", "The patterns that quietly fail"] },
        { title: "Your 30-Day AI Adoption Plan", topics: ["Choose the two changes worth making first", "Measure whether they helped"] },
      ],
      examNote: "No exam. You leave with a certificate of completion, a prompt set for Scrum events, and a thirty-day adoption plan for your team.",
    },
    outcomeGroups: [
      { title: "Run the events", items: ["Sharpen stories and acceptance criteria before refinement", "Model sprint capacity and test a plan for optimism", "Spot flow problems and impediments earlier", "Design retrospectives that actually change something"] },
      { title: "Work the tools", items: ["Use AI inside Jira, Confluence, and the tools you already run", "Automate the reporting nobody enjoys writing", "Read quality and coverage signals for release readiness", "Prepare powerful coaching questions in minutes"] },
      { title: "Do it responsibly", items: ["Know what team data must never be pasted into a model", "Be transparent with your team about how you use AI", "Recognize the AI patterns that quietly fail on real teams", "Leave with a thirty-day adoption plan and a way to measure it"] },
    ],
    ai: {
      heading: "AI through a Scrum<br />Master's whole week",
      lede: "Ten modules, each one taking a thing you already run and rebuilding it with AI in the loop — then a plan for the two changes worth making first.",
      activities: [
        { title: "Refinement and story quality", where: "Module 2", body: "Sharpen stories and acceptance criteria, and find the gaps before the team hits them mid-sprint." },
        { title: "Planning and forecasting", where: "Module 3", body: "Model capacity and test a sprint plan for the optimism that quietly gets baked into every commitment." },
        { title: "Coaching and facilitation", where: "Module 6", body: "Prepare powerful questions and design a retrospective that produces a change rather than a list." },
        { title: "Your 30-day plan", where: "Module 10", body: "Pick the two changes worth making first on your own team, and decide how you will know whether they helped." },
      ],
      techniques: [
        "Sharpen <strong>stories and acceptance criteria</strong> before refinement, not during",
        "Test a <strong>sprint plan</strong> for the optimism baked into it",
        "Spot <strong>flow problems and impediments</strong> before they surface as slippage",
        "Work AI inside <strong>Jira and Confluence</strong> rather than beside them",
        "Design <strong>retrospectives</strong> that produce a change, not a list",
      ],
      responsible: {
        lede: "Module 8 is a full module on responsible use inside an Agile team:",
        points: [
          "<strong>Team data</strong> — what must never be pasted into a model",
          "<strong>Transparency</strong> — telling your team how you are using it",
          "<strong>Judgment</strong> — where AI patterns quietly fail on real teams",
        ],
      },
    },
    whatsNew: [
      { title: "Every event covered", body: "Refinement, planning, daily scrum, review, and retrospective each get their own treatment." },
      { title: "Inside your real tools", body: "Module 7 is Jira, Confluence, and the team tooling you already live in." },
      { title: "A thirty-day plan", body: "The day closes on the two changes worth making first, and how to measure them." },
    ],
    changed: [
      { title: "Practice over theory", body: "Ten modules, each landing on something a Scrum Master runs every week." },
      { title: "Ethics as its own module", body: "Team data, transparency, and the AI patterns that quietly fail on real teams." },
      { title: "Real team examples", body: "Module 9 is case studies of what has worked and what has not." },
    ],
    stats: [
      { value: "1", label: "Day, live and instructor-led" },
      { value: "10", label: "Modules across the Scrum Master's week" },
      { value: "1", label: "Thirty-day adoption plan for your own team" },
      { value: "8", label: "PDUs toward renewal" },
    ],
    overview: {
      heading: "The Scrum Master week,<br />rebuilt with AI",
      body: [
        "Ten modules taking AI through everything a Scrum Master actually runs: backlog refinement and story quality, sprint planning and forecasting, daily scrum and flow, testing and release readiness, coaching and facilitation, and the Jira and Confluence work that fills the gaps.",
        "Module 8 is a full module on ethics and transparency inside an Agile team, and the day closes on a thirty-day adoption plan — the two changes worth making first, and how you will know whether they helped.",
      ],
    },
    whyNow: {
      heading: "The admin is the part<br />AI is genuinely good at",
      body: "A large share of the Scrum Master week is preparation and reporting — sharpening stories, assembling a forecast, writing the status nobody reads, pulling a retrospective together. That is exactly the work these tools do well, and getting it back is the difference between facilitating a team and administering one.",
    },
  },
};
