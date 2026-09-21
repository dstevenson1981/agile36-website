import {
  type CatalogLandingContent,
  sharedCourseFaqs,
  sharedPaymentFaqs,
} from "@/app/lib/catalog-landing";
import { COURSE_BROCHURE_HREF } from "@/app/lib/course-brochures";

const DURATION_2_FOUR = "2-Day Live Online · 4 Hours Per Day";
const DURATION_2_FIVE = "2-Day Live Online · 9:00 AM–2:00 PM ET";
const DURATION_1_FIVE = "1-Day Live Online · 9:00 AM–2:00 PM ET";
const DURATION_HALF = "Half-Day Live Online · 4 Hours";

function aiFaqs(args: {
  shortName: string;
  datesTitle: string;
  certName: string;
  includes: string;
  generic: CatalogLandingContent["faqs"]["generic"];
  exam: CatalogLandingContent["faqs"]["exam"];
}): CatalogLandingContent["faqs"] {
  return {
    courses: sharedCourseFaqs({
      shortName: args.shortName,
      datesTitle: args.datesTitle,
      certName: args.certName,
      hasExam: false,
      certIssuer: "Accredible",
    }),
    exam: args.exam,
    payment: sharedPaymentFaqs().map((item) =>
      item.q === "Are there any hidden fees?"
        ? { ...item, a: `No. ${args.includes} There are no hidden fees.` }
        : item
    ),
    generic: args.generic,
  };
}

function aiWhy(
  row01: CatalogLandingContent["whyRows"][number] extends infer R
    ? Omit<Extract<R, { n: string }>, "n" | "featured">
    : never,
  row02: Omit<CatalogLandingContent["whyRows"][number], "n" | "featured">,
  row03: Omit<CatalogLandingContent["whyRows"][number], "n" | "featured">,
  certLead: string,
  certRest: string
): CatalogLandingContent["whyRows"] {
  return [
    { n: "01", featured: true, ...row01 },
    { n: "02", featured: true, ...row02 },
    { n: "03", ...row03 },
    {
      n: "04",
      check: "Certification included",
      usLead: certLead,
      usRest: certRest,
      other: "Many AI courses send a PDF with no shareable credential.",
    },
    {
      n: "05",
      check: "Your class actually runs",
      usLead: "Register for the date you want with confidence.",
      usRest: "Agile36 classes are guaranteed to run, even with a small cohort.",
      other: "Some providers cancel or consolidate classes when enrollment is low.",
    },
    {
      n: "06",
      check: "You build in class",
      usLead: "The work happens on your laptop, not on a slide.",
      usRest: "You leave holding the thing you built, not a recording of someone else's demo.",
      other: "Most AI webinars stop at screenshots.",
    },
  ];
}

const NO_EXAM = [
  {
    q: "Do I get certified?",
    a: "Yes. Completing the live class earns a shareable credential issued through Accredible.",
  },
  {
    q: "Is there an exam?",
    a: "No. There is no certification exam. The credential is awarded when you complete the live class.",
  },
];

export const aiAgentBuilder: CatalogLandingContent = {
  slug: "ai-agent-builder",
  crumb: "No-Code AI Agents",
  title: "No-Code AI Agents™ Certification Training",
  lede:
    "Two live days. You build agents that do company work — then connect them so the work actually moves.",
  summary:
    "This is a build class, not a prompting class. Day 1 you turn a real business process into a fleet of specialized agents, ground them in company knowledge with RAG, and wire the handoffs in n8n. Day 2 you add a voice agent that can hold a conversation, then use Claude Code or Codex to have an agent plan, design, and build a working application. You leave with one connected system: fleet, knowledge, voice, and software.",
  badgeSrc: "/Logo_Agents.png",
  badgeAlt: "No-Code AI Agents™ certification",
  cardTitle: "No-Code AI Agents™ Certification",
  durationLabel: DURATION_2_FOUR,
  includesLine:
    "Includes No-Code AI Agents™ certification (Accredible), live training, and 8 PDUs.",
  highlights: [
    "8 hours live over two days — 4 hours per day",
    "Build the agent fleet, voice agent, and working app in class",
    "Leave certified — issued through Accredible, no exam",
  ],
  brochureHref: COURSE_BROCHURE_HREF["ai-agent-builder"],
  datesTitle: "Upcoming AI Agents dates",
  scheduleCourseName: "No-Code AI Agents™",
  eyebrow: "AI Agents certification · Live online",
  attemptsLine: "No-Code AI Agents™ certificate included — issued through Accredible.",
  certificationEyebrow: "Certification included",
  curriculumLede:
    "Day 1 is the agent fleet and the automation that connects it. Day 2 is the voice agent and the working app. That is the class — not the title.",
  summaryTitle: "A fleet, a voice agent, and a working app",
  safePartner: false,
  whyOtherLabel: "Other AI agent classes",
  whyRows: aiWhy(
    {
      check: "You build the whole system",
      usLead: "Fleet, RAG knowledge, voice, and an app — connected before you leave.",
      usRest: "n8n, GrokBot, Claude Code or Codex, and human approvals are part of the build, not a slide.",
      other: "Most agent courses demo one chatbot and stop.",
    },
    {
      check: "Automation is in the agenda",
      usLead: "Day 1 you wire the fleet in n8n with handoffs and approvals.",
      usRest: "Day 2 you connect voice and the application into the same workflow.",
      other: "Automation is often a marketing word on the title, not a module.",
    },
    {
      check: "Not a prompting class",
      usLead: "You define roles, tools, guardrails, and knowledge — then test end to end.",
      usRest: "Prompting is a skill inside the work, not the whole course.",
      other: "Prompt lists die the first week back at work.",
    },
    "You leave with the No-Code AI Agents™ credential.",
    "Issued through Accredible. Complete the live class — there is no exam."
  ),
  outcomes: [
    "A fleet of specialized agents that collaborate on company work",
    "A RAG knowledge system grounded in company information",
    "A voice agent capable of holding real conversations",
    "A working application planned and built by an AI agent",
    "One workflow connecting agents, knowledge, voice, and software",
    "Handoffs and human approvals so the work stays trustworthy",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "Build the agent fleet and the automation",
      modules: [
        {
          title: "1. From business process to agent work",
          topics: [
            "Pick a real process worth automating",
            "Break the work into roles an agent can own",
            "Define goals, instructions, tools, and guardrails",
          ],
        },
        {
          title: "2. Build the agent fleet",
          topics: [
            "Specialized agents that handle different parts of the work",
            "Handoffs between agents",
            "Human approval points for sensitive steps",
          ],
        },
        {
          title: "3. Ground the fleet in company knowledge",
          topics: [
            "RAG so answers come from your information",
            "What never gets pasted into a model",
            "Test the fleet against real documents",
          ],
        },
        {
          title: "4. Automate the connections in n8n",
          topics: [
            "Wire the fleet into one workflow",
            "Triggers, routing, and error paths",
            "Run the complete agent fleet from beginning to end",
          ],
        },
      ],
    },
    {
      day: "Day 2",
      focus: "Voice agent and a working app",
      modules: [
        {
          title: "5. Build a voice agent",
          topics: [
            "A voice agent that can hold a natural conversation",
            "Connect it to company knowledge",
            "Connect it to the workflows from day 1",
          ],
        },
        {
          title: "6. Define the application",
          topics: [
            "Purpose and requirements for a business application",
            "What the agent should plan, design, and build",
            "Scope that can finish in class",
          ],
        },
        {
          title: "7. Have an agent build the app",
          topics: [
            "Use Claude Code or Codex as the application-building agent",
            "Watch it plan, design, and build from your requirements",
            "Test and improve the application in the session",
          ],
        },
        {
          title: "8. One working system",
          featured: true,
          topics: [
            "Connect fleet, knowledge, voice, and software",
            "Run the complete path from business challenge to outcome",
            "Leave certified, with the system you built",
          ],
        },
      ],
    },
  ],
  examNote:
    "There is no exam. Complete the live class and you receive the No-Code AI Agents™ certification, issued through Accredible.",
  examGuidelinesHref: "",
  certificateTitle: "No-Code AI Agents™ Certificate",
  reviews: [
    {
      name: "David Martinez",
      role: "Business Analyst",
      review:
        "This course finally showed me how to move past prompting. We built agents and connected them through n8n to real workflows. I left with something I could actually use at work.",
    },
    {
      name: "Jennifer Kim",
      role: "Marketing Director",
      review:
        "Claude Code made it possible to build the application without waiting on engineering. The human-in-the-loop pieces were the part I took back to the team.",
    },
    {
      name: "Robert Thompson",
      role: "Operations Consultant",
      review:
        "Hands-on from start to finish. We went from a manual process to a working agent fleet, then a voice agent and an app. Exactly what clients ask for.",
    },
  ],
  faqs: aiFaqs({
    shortName: "No-Code AI Agents",
    datesTitle: "Upcoming AI Agents dates",
    certName: "No-Code AI Agents™ certification",
    includes:
      "The course price includes live training, course materials, the No-Code AI Agents™ certification issued through Accredible, and 8 PDUs.",
    exam: [
      ...NO_EXAM,
      {
        q: "What do I leave with?",
        a: "An agent fleet on company knowledge, a voice agent, a working application, the n8n workflow that connects them, 8 PDUs, and the certification.",
      },
    ],
    generic: [
      {
        q: "What is the No-Code AI Agents™ Certification Training?",
        a: "A live two-day class (4 hours per day, 8 hours total). Day 1 you build the agent fleet and automate the connections. Day 2 you add a voice agent and have an agent build a working app. You leave certified.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. You use GrokBot, RAG, n8n, and Claude Code or Codex. No programming background is required.",
      },
      {
        q: "How long is the course?",
        a: "Two days, 4 hours per day, 8 hours total.",
      },
    ],
  }),
};

export const aiWorkflowAutomation: CatalogLandingContent = {
  slug: "ai-workflow-automation",
  crumb: "AI Workflow Automation",
  title: "AI Workflow Automation™ Certification Training",
  lede:
    "Two live days. You take one manual process and leave with a running automation — n8n, Claude, APIs, and webhooks.",
  summary:
    "Day 1 you map the work and build the workflow in n8n. Day 2 you add Claude inside the process, connect APIs and webhooks, put humans on approvals, and handle errors. You run it from trigger to business outcome before you leave.",
  badgeSrc: "/Logo_AI_Workflow_Automation.png",
  badgeAlt: "AI Workflow Automation™ certification",
  cardTitle: "AI Workflow Automation™ Certification",
  durationLabel: DURATION_2_FOUR,
  includesLine:
    "Includes AI Workflow Automation™ certification (Accredible), live training, and 8 PDUs.",
  highlights: [
    "8 hours live over two days — 4 hours per day",
    "Automate one complete process from trigger to outcome",
    "Leave certified — issued through Accredible, no exam",
  ],
  brochureHref: COURSE_BROCHURE_HREF["ai-workflow-automation"],
  datesTitle: "Upcoming Workflow Automation dates",
  scheduleCourseName: "AI Workflow Automation™",
  eyebrow: "AI Workflow Automation · Live online",
  attemptsLine: "AI Workflow Automation™ certificate included — issued through Accredible.",
  certificationEyebrow: "Certification included",
  curriculumLede:
    "Day 1 is the workflow. Day 2 is AI, reliability, and a run from trigger to outcome.",
  summaryTitle: "From a manual process to a working automation",
  safePartner: false,
  whyOtherLabel: "Other automation classes",
  whyRows: aiWhy(
    {
      check: "One process, finished",
      usLead: "You automate a real process end to end, not a feature tour of a tool.",
      usRest: "Map, build, add Claude, add approvals, then run it.",
      other: "Most classes sample features and never finish a workflow.",
    },
    {
      check: "AI inside the work",
      usLead: "Claude classifies, extracts, and generates as a step.",
      usRest: "Not a separate chatbot exercise after the demo.",
      other: "AI is often shown beside the workflow, not in it.",
    },
    {
      check: "Reliable enough to run",
      usLead: "Approvals, errors, notifications, and an audit trail are part of the build.",
      usRest: "You leave able to hand it to operations.",
      other: "Happy-path demos break the first time data is missing.",
    },
    "You leave with the AI Workflow Automation™ credential.",
    "Issued through Accredible. Complete the live class — there is no exam."
  ),
  outcomes: [
    "Map triggers, inputs, actions, decisions, and exceptions",
    "Build the workflow visually in n8n",
    "Connect applications, APIs, and webhooks",
    "Add Claude to classify, extract, and generate",
    "Keep humans in control with approvals",
    "Run the automation from trigger to business outcome",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "Design and build the workflow",
      modules: [
        {
          title: "1. Find the process",
          topics: [
            "Identify the business process and the outcome you want",
            "Map the current manual workflow",
            "Define triggers, actions, decisions, and outputs",
          ],
        },
        {
          title: "2. Build it in n8n",
          topics: [
            "Create the workflow visually",
            "Connect applications and move data",
            "Add rules, conditions, and routing",
          ],
        },
        {
          title: "3. Test the path",
          topics: [
            "Run the workflow from beginning to end",
            "Find the breaks while you still have the room",
            "Tighten the happy path before you add AI",
          ],
        },
      ],
    },
    {
      day: "Day 2",
      focus: "Add AI and make it reliable",
      modules: [
        {
          title: "4. Put Claude in the process",
          topics: [
            "Classify requests, extract information, summarize, generate",
            "Work with APIs and webhooks",
            "Keep the model on the step that earns it",
          ],
        },
        {
          title: "5. Humans and exceptions",
          topics: [
            "Approvals and escalation paths",
            "Missing information, duplicates, and failures",
            "Notifications, logging, and monitoring",
          ],
        },
        {
          title: "6. Run it for real",
          featured: true,
          topics: [
            "Improve accuracy and reliability",
            "Run from trigger to business outcome",
            "Leave certified, with the workflow you built",
          ],
        },
      ],
    },
  ],
  examNote:
    "There is no exam. Complete the live class and you receive the AI Workflow Automation™ certification, issued through Accredible.",
  examGuidelinesHref: "",
  certificateTitle: "AI Workflow Automation™ Certificate",
  reviews: [
    {
      name: "David Martinez",
      role: "Operations Lead",
      review:
        "We mapped one messy process and left with it running in n8n. Claude handles the classification step. I used it the next week.",
    },
    {
      name: "Priya Shah",
      role: "Business Analyst",
      review:
        "The approvals and error paths were the useful part. Every other automation class I took stopped at the happy path.",
    },
    {
      name: "Marcus Ellison",
      role: "PMO",
      review:
        "Four hours a day was enough to finish one real workflow. I did not need another tool tour.",
    },
  ],
  faqs: aiFaqs({
    shortName: "AI Workflow Automation",
    datesTitle: "Upcoming Workflow Automation dates",
    certName: "AI Workflow Automation™ certification",
    includes:
      "The course price includes live training, course materials, the AI Workflow Automation™ certification issued through Accredible, and 8 PDUs.",
    exam: NO_EXAM,
    generic: [
      {
        q: "What is AI Workflow Automation™ Certification Training?",
        a: "A live two-day class (4 hours per day, 8 hours total). You map a manual process, build it in n8n, add Claude, connect APIs and webhooks, and run it from trigger to outcome.",
      },
      {
        q: "Do I need programming experience?",
        a: "No traditional programming is required. You build visually in n8n and add AI steps with Claude.",
      },
    ],
  }),
};

export const aiAppBuilder: CatalogLandingContent = {
  slug: "ai-app-builder",
  crumb: "No-Code AI App Builder",
  title: "No-Code AI App Builder™ Certification Training",
  lede:
    "Two live days. You turn a real business problem into a working application you can sell or use — without writing code.",
  summary:
    "Day 1 you find the opportunity, write requirements, and get the first working version on screen. Day 2 you add users, rules, and integrations, customize it for a specific business, publish it, and package it as a service you can sell.",
  badgeSrc: "/Logo_AI_App_Builder.png",
  badgeAlt: "No-Code AI App Builder™ certification",
  cardTitle: "No-Code AI App Builder™ Certification",
  durationLabel: DURATION_2_FOUR,
  includesLine:
    "Includes No-Code AI App Builder™ certification (Accredible), live training, and 8 PDUs.",
  highlights: [
    "8 hours live over two days — 4 hours per day",
    "Publish a working app and a client-ready offer",
    "Leave certified — issued through Accredible, no exam",
  ],
  brochureHref: COURSE_BROCHURE_HREF["ai-app-builder"],
  datesTitle: "Upcoming App Builder dates",
  scheduleCourseName: "No-Code AI App Builder™",
  eyebrow: "No-Code App Builder · Live online",
  attemptsLine: "No-Code AI App Builder™ certificate included — issued through Accredible.",
  certificationEyebrow: "Certification included",
  curriculumLede:
    "Day 1 is the opportunity and the first working version. Day 2 is customize, publish, and sell.",
  summaryTitle: "Build apps you can sell — or use",
  safePartner: false,
  whyOtherLabel: "Other no-code classes",
  whyRows: aiWhy(
    {
      check: "A real problem first",
      usLead: "You start with a need worth solving, not a template tour.",
      usRest: "The same process works for a client or an internal tool.",
      other: "Most no-code classes start in the tool, not in the business.",
    },
    {
      check: "Published before you leave",
      usLead: "You finish with a live app and a demonstration.",
      usRest: "Not a practice file you abandon after class.",
      other: "Practice apps rarely survive the drive home.",
    },
    {
      check: "Built to sell",
      usLead: "Day 2 packages the build as a repeatable service.",
      usRest: "One successful app becomes an offer, not a one-off.",
      other: "Shipping is usually treated as extra credit.",
    },
    "You leave with the No-Code AI App Builder™ credential.",
    "Issued through Accredible. Complete the live class — there is no exam."
  ),
  outcomes: [
    "Identify a small-business problem worth paying to fix",
    "Turn a conversation into users, workflows, and features",
    "Generate screens, navigation, and functionality with AI",
    "Add data, users, permissions, and integrations",
    "Publish the finished application",
    "Package the build as a client-ready service",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "Find the opportunity and build the app",
      modules: [
        {
          title: "1. Find the opportunity",
          topics: [
            "Identify a valuable small-business problem",
            "Define the customer and the outcome",
            "Turn the problem into app requirements",
          ],
        },
        {
          title: "2. Build the first version",
          topics: [
            "Generate the initial application",
            "Build screens, navigation, and the user experience",
            "Add forms, data, and core functionality",
          ],
        },
      ],
    },
    {
      day: "Day 2",
      focus: "Customize, launch, and sell",
      modules: [
        {
          title: "3. Make it a real app",
          topics: [
            "Business rules and advanced features",
            "User accounts and permissions",
            "Connect external tools and services",
          ],
        },
        {
          title: "4. Publish and package",
          featured: true,
          topics: [
            "Customize for a specific business",
            "Test, publish, and demonstrate",
            "Create a client-ready service offer",
          ],
        },
      ],
    },
  ],
  examNote:
    "There is no exam. Complete the live class and you receive the No-Code AI App Builder™ certification, issued through Accredible.",
  examGuidelinesHref: "",
  certificateTitle: "No-Code AI App Builder™ Certificate",
  reviews: [
    {
      name: "Elena Rossi",
      role: "Consultant",
      review:
        "I left with a published app and a way to sell the next one. That is the difference from every no-code webinar I have sat through.",
    },
    {
      name: "James Okonkwo",
      role: "Small-business owner",
      review:
        "We replaced a spreadsheet process with a working app in two days. I am using it, not demoing it.",
    },
    {
      name: "Sofia Patel",
      role: "Product Owner",
      review:
        "Requirements first, then the build. I finally have a process I can repeat for clients.",
    },
  ],
  faqs: aiFaqs({
    shortName: "No-Code AI App Builder",
    datesTitle: "Upcoming App Builder dates",
    certName: "No-Code AI App Builder™ certification",
    includes:
      "The course price includes live training, course materials, the No-Code AI App Builder™ certification issued through Accredible, and 8 PDUs.",
    exam: NO_EXAM,
    generic: [
      {
        q: "What is No-Code AI App Builder™ Certification Training?",
        a: "A live two-day class (4 hours per day, 8 hours total). You turn a business problem into a published application and a service offer, without writing code.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. You use AI-powered no-code tools. No programming background is required.",
      },
    ],
  }),
};

export const certifiedAiProductManager: CatalogLandingContent = {
  slug: "certified-ai-product-manager",
  crumb: "AI Product Manager",
  title: "Certified AI Product Manager™ Certification Training",
  lede:
    "Two days, 9:00 AM–2:00 PM Eastern. You take one idea from a blank page to a deployed application — then make the product calls you only face once it is running.",
  summary:
    "Eight modules. You scope an idea that can finish, stand up the first version, add data and auth, put AI where it actually helps, deploy it live, and demo it from a link. The last modules are the ones product people remember: cutting scope against a running build, and changing how you brief engineering.",
  badgeSrc: "/Logo_AI_Product_Manager.png",
  badgeAlt: "Certified AI Product Manager™ certification",
  cardTitle: "Certified AI Product Manager™",
  durationLabel: DURATION_2_FIVE,
  includesLine:
    "Includes Certified AI Product Manager™ certification (Accredible), live training, and 10 PDUs.",
  highlights: [
    "10 hours live over two days — 9:00 AM–2:00 PM Eastern",
    "Ship a working app and demo it from a live link",
    "Leave certified — issued through Accredible, no exam",
  ],
  brochureHref: COURSE_BROCHURE_HREF["certified-ai-product-manager"],
  datesTitle: "Upcoming AI Product Manager dates",
  scheduleCourseName: "Certified AI Product Manager™",
  eyebrow: "AI Product Manager · Live online",
  attemptsLine: "Certified AI Product Manager™ certificate included — issued through Accredible.",
  certificationEyebrow: "Certification included",
  curriculumLede:
    "Eight modules from a blank page to a deployed app. You build in six of them.",
  summaryTitle: "Stop specifying products. Build one.",
  safePartner: false,
  whyOtherLabel: "Other AI product courses",
  whyRows: aiWhy(
    {
      check: "You ship, not sketch",
      usLead: "The deliverable is a deployed application with a link.",
      usRest: "Not a canvas, not a slide, not a spec.",
      other: "Most AI product courses teach you to talk about products.",
    },
    {
      check: "Product calls on a running build",
      usLead: "You cut scope with the app in front of you.",
      usRest: "Those decisions do not show up in a requirements workshop.",
      other: "Theory classes never reach the trade-offs of a live app.",
    },
    {
      check: "AI where it earns its place",
      usLead: "Module 4 is explicit: AI goes in where it helps, not everywhere.",
      usRest: "You handle failure and cost when a model sits in the path.",
      other: "Decorative AI is treated as the point of the class.",
    },
    "You leave with the Certified AI Product Manager™ credential.",
    "Issued through Accredible. Complete the live class — there is no exam."
  ),
  outcomes: [
    "Take an idea from a blank page to a deployed application",
    "Stand up data, authentication, and state without an engineer",
    "Put AI in the product only where it helps",
    "Cut scope against a running build",
    "Demo the live app from a shareable link",
    "Brief engineering with a working prototype instead of a spec",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "From idea to a working version",
      modules: [
        {
          title: "1. From idea to a shippable product",
          topics: ["Choose an idea small enough to finish", "Define the one job it does", "Scope to a first working version"],
        },
        {
          title: "2. Build the first working version",
          topics: ["Stand up the app", "Get something on screen fast", "Iterate against real use"],
        },
        {
          title: "3. Data, auth, and the parts that make it an app",
          topics: ["Persist real data", "Add sign-in", "Handle state and errors"],
        },
        {
          title: "4. Put AI in the product",
          topics: ["Choose where AI genuinely helps", "Wire the model into the product", "Handle failure and cost"],
        },
      ],
    },
    {
      day: "Day 2",
      focus: "Finish, deploy, and take it back",
      modules: [
        {
          title: "5. Finish and deploy",
          topics: ["Close the gaps that block release", "Deploy it live", "Share a working link"],
        },
        {
          title: "6. Product calls you only make when you are building",
          topics: ["Cut scope with the build in front of you", "Decide what is good enough", "Trade speed against reliability"],
        },
        {
          title: "7. Demo the live app",
          topics: ["Show the working product", "Take questions on real behaviour", "Capture what you would build next"],
        },
        {
          title: "8. What you take back to work",
          featured: true,
          topics: ["Apply the loop to your real roadmap", "Prototype before you spec", "Change how you brief engineering"],
        },
      ],
    },
  ],
  examNote:
    "There is no exam. Complete the live class and you receive the Certified AI Product Manager™ certification, issued through Accredible.",
  examGuidelinesHref: "",
  certificateTitle: "Certified AI Product Manager™ Certificate",
  reviews: [
    {
      name: "Jennifer Kim",
      role: "Product Manager",
      review:
        "I deployed an app in class and demoed it from a link. That changed how I write requirements more than any product course I have taken.",
    },
    {
      name: "Andre Cole",
      role: "Founder",
      review:
        "We scoped to one job, shipped it, then cut features with the build running. I still use that loop.",
    },
    {
      name: "Priya Shah",
      role: "Product Owner",
      review:
        "Module 4 on where AI belongs saved me from bolting a chatbot onto everything.",
    },
  ],
  faqs: aiFaqs({
    shortName: "Certified AI Product Manager",
    datesTitle: "Upcoming AI Product Manager dates",
    certName: "Certified AI Product Manager™ certification",
    includes:
      "The course price includes live training, course materials, the Certified AI Product Manager™ certification issued through Accredible, and 10 PDUs.",
    exam: NO_EXAM,
    generic: [
      {
        q: "What is Certified AI Product Manager™ Certification Training?",
        a: "A live two-day class (9:00 AM–2:00 PM Eastern each day, 10 hours total). You take one idea to a deployed application and leave certified.",
      },
      {
        q: "Do I need an engineering background?",
        a: "No. You will be building with modern AI development tools. No engineering background is required.",
      },
    ],
  }),
};

export const certifiedGenaiPractitioner: CatalogLandingContent = {
  slug: "certified-genai-practitioner",
  crumb: "GenAI Practitioner",
  title: "Certified GenAI Practitioner™ Certification Training",
  lede:
    "A half day. Core GenAI, prompting, responsible use, and practical applications — enough judgment to use the tools at work.",
  summary:
    "Four modules: how generative AI works, prompt engineering you can reuse, ethics and responsible implementation, then practical applications in content, analysis, service, and process work. Built for people who need a foundation, not a two-day build class.",
  badgeSrc: "/Logo_GenAI_Practitioner.png",
  badgeAlt: "Certified GenAI Practitioner™ certification",
  cardTitle: "Certified GenAI Practitioner™",
  durationLabel: DURATION_HALF,
  includesLine:
    "Includes Certified GenAI Practitioner™ certification (Accredible), live training, and 4 PDUs.",
  highlights: [
    "4 hours live — one half day",
    "Fundamentals, prompting, ethics, and applications",
    "Leave certified — issued through Accredible, no exam",
  ],
  datesTitle: "Upcoming GenAI Practitioner dates",
  scheduleCourseName: "Certified GenAI Practitioner™",
  eyebrow: "GenAI Practitioner · Live online",
  attemptsLine: "Certified GenAI Practitioner™ certificate included — issued through Accredible.",
  certificationEyebrow: "Certification included",
  curriculumLede: "Four modules. Fundamentals, prompting, responsible use, then application.",
  summaryTitle: "A working foundation in generative AI",
  safePartner: false,
  whyOtherLabel: "Other GenAI intros",
  whyRows: aiWhy(
    {
      check: "Judgment, not hype",
      usLead: "You learn what the models are and what they invent.",
      usRest: "Enough language to brief a team and enough caution to keep data safe.",
      other: "Many intros are a product tour.",
    },
    {
      check: "Prompting you can reuse",
      usLead: "Patterns, few-shot, chain-of-thought, and how to improve a weak prompt.",
      usRest: "Not a list of magic phrases.",
      other: "Prompt lists go stale in a week.",
    },
    {
      check: "Ethics in the room",
      usLead: "Bias, privacy, transparency, and governance are a full module.",
      usRest: "Not a disclaimer slide at the end.",
      other: "Responsible use is often optional.",
    },
    "You leave with the Certified GenAI Practitioner™ credential.",
    "Issued through Accredible. Complete the live class — there is no exam."
  ),
  outcomes: [
    "Explain how generative AI works in plain language",
    "Write prompts you can reuse and improve",
    "Spot bias, privacy, and transparency issues",
    "Apply GenAI to content, analysis, and process work",
    "Know what never gets pasted into a model",
    "Leave with a shareable credential",
  ],
  curriculum: [
    {
      day: "Half day",
      focus: "Foundation you can use at work",
      modules: [
        {
          title: "1. Introduction to Generative AI",
          topics: [
            "What generative AI is and how it works",
            "LLMs, transformers, and neural networks in plain language",
            "GenAI vs traditional AI",
            "What is real today and what is still a demo",
          ],
        },
        {
          title: "2. Prompt Engineering Fundamentals",
          topics: [
            "Basic prompting techniques",
            "Advanced prompt patterns",
            "Few-shot and zero-shot",
            "Chain-of-thought and prompt optimization",
          ],
        },
        {
          title: "3. AI Ethics and Responsible Implementation",
          topics: [
            "Bias and fairness",
            "Privacy and data protection",
            "Transparency and explainability",
            "Governance and responsible-use habits",
          ],
        },
        {
          title: "4. Practical GenAI Applications",
          featured: true,
          topics: [
            "Content generation",
            "Data analysis and insights",
            "Customer service and process work",
            "Code assistance — what to trust and what to check",
          ],
        },
      ],
    },
  ],
  examNote:
    "There is no exam. Complete the live class and you receive the Certified GenAI Practitioner™ certification, issued through Accredible.",
  examGuidelinesHref: "",
  certificateTitle: "Certified GenAI Practitioner™ Certificate",
  reviews: [
    {
      name: "Laura Chen",
      role: "Program Coordinator",
      review:
        "Four hours and I finally had language for what these tools do — and a rule for what never goes into them.",
    },
    {
      name: "Michael Torres",
      role: "Team Lead",
      review:
        "The prompting module was usable the next morning. Short class, no fluff.",
    },
    {
      name: "Anita Desai",
      role: "Business Analyst",
      review:
        "Ethics was a real module, not a slide. That is why I sent the rest of the team.",
    },
  ],
  faqs: aiFaqs({
    shortName: "Certified GenAI Practitioner",
    datesTitle: "Upcoming GenAI Practitioner dates",
    certName: "Certified GenAI Practitioner™ certification",
    includes:
      "The course price includes live training, course materials, the Certified GenAI Practitioner™ certification issued through Accredible, and 4 PDUs.",
    exam: NO_EXAM,
    generic: [
      {
        q: "What is Certified GenAI Practitioner™ Certification Training?",
        a: "A live half-day class (4 hours). Fundamentals, prompting, responsible use, and practical applications. You leave certified.",
      },
      {
        q: "Who should take this course?",
        a: "Anyone who needs a working foundation in generative AI. No prior AI experience is assumed.",
      },
    ],
  }),
};

export const executiveGenaiLeadership: CatalogLandingContent = {
  slug: "executive-genai-leadership",
  crumb: "Executive GenAI",
  title: "Executive GenAI Leadership™ Certification Training",
  lede:
    "One day, 9:00 AM–2:00 PM Eastern. From scattered pilots to a funded agenda — opportunity, governance, operating model, workforce, risk, and value.",
  summary:
    "A one-day executive programme. You score use cases, model ROI, choose an operating model, and finish with a capstone: an AI strategy for your own organization. Taught in business language, not engineering language.",
  badgeSrc: "/Logo_Executive_GenAI_Leadership.png",
  badgeAlt: "Executive GenAI Leadership™ certification",
  cardTitle: "Executive GenAI Leadership™",
  durationLabel: DURATION_1_FIVE,
  includesLine:
    "Includes Executive GenAI Leadership™ certification (Accredible), live training, and 5 PDUs.",
  highlights: [
    "5 hours live — one day, 9:00 AM–2:00 PM Eastern",
    "Capstone: an AI strategy for your organization",
    "Leave certified — issued through Accredible, no exam",
  ],
  brochureHref: COURSE_BROCHURE_HREF["executive-genai-leadership"],
  datesTitle: "Upcoming Executive GenAI dates",
  scheduleCourseName: "Executive GenAI Leadership™",
  eyebrow: "Executive GenAI · Live online",
  attemptsLine: "Executive GenAI Leadership™ certificate included — issued through Accredible.",
  certificationEyebrow: "Certification included",
  curriculumLede:
    "Twelve modules from opportunity through to a capstone strategy you can defend.",
  summaryTitle: "From scattered pilots to a funded agenda",
  safePartner: false,
  whyOtherLabel: "Other executive AI briefings",
  whyRows: aiWhy(
    {
      check: "Ends in your strategy",
      usLead: "The capstone is an AI agenda for your organization, with use cases and modelled ROI.",
      usRest: "Not notes about someone else's case study.",
      other: "Most executive briefings end in a slide leave-behind.",
    },
    {
      check: "Business language",
      usLead: "Opportunity, funding, operating model, and workforce — not model architecture.",
      usRest: "You leave able to brief a board.",
      other: "Technical briefings leave leaders translating on the fly.",
    },
    {
      check: "Why AI projects fail",
      usLead: "A full module on the failure patterns and the delivery frameworks that prevent them.",
      usRest: "Pilots are cheap. A year of unscalable pilots is not.",
      other: "Failure modes are usually skipped.",
    },
    "You leave with the Executive GenAI Leadership™ credential.",
    "Issued through Accredible. The assessment is the capstone, not a timed exam."
  ),
  outcomes: [
    "Separate genuine AI capability from hype",
    "Prioritize use cases by value, feasibility, and ROI",
    "Build an investment case a board will fund",
    "Choose centralized, federated, or hybrid",
    "Prevent the failure patterns that stall AI programmes",
    "Leave with a strategy for your own organization",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "Opportunity through to capstone",
      modules: [
        { title: "1. Introduction to Generative AI for Leaders", topics: ["What generative AI means for performance", "How AI creates measurable value", "Separating capability from hype"] },
        { title: "2. Key Concepts for Executive Decision-Making", topics: ["Core concepts in business language", "Data readiness, governance, and workflow design", "Questions to ask technology leaders"] },
        { title: "3. Identifying High-Value Use Cases", topics: ["Value scoring", "Feasibility, impact, and ROI", "Killing pilots that will never scale"] },
        { title: "4. Quantifying Business Value & ROI", topics: ["Cost savings, efficiency, and revenue", "KPI frameworks", "A case the board will fund"] },
        { title: "5. Industry-Specific Executive Use Cases", topics: ["Retail, healthcare, finance, logistics, government, professional services", "Business models changing through generative AI"] },
        { title: "6. Implementing an AI Strategy", topics: ["A scalable enterprise roadmap", "Centralized, federated, or hybrid", "Sequencing investment"] },
        { title: "7. Execution & Preventing AI Project Failure", topics: ["Why initiatives fail", "Delivery frameworks that hold", "Governance that does not stall delivery"] },
        { title: "8. Hands-On Business Workshops", topics: ["Use-case discovery", "Value modeling", "Prioritization against your portfolio"] },
        { title: "9. AI for Innovation & New Business Models", topics: ["New digital products", "Revenue and subscription models", "Where AI changes the economics"] },
        { title: "10. Managing AI Teams & Organizational Readiness", topics: ["Roles needed to execute", "Job redesign", "Workforce readiness"] },
        { title: "11. Future Trends in AI for Leaders", topics: ["Capabilities to prepare for", "Regulation and compliance", "Keeping the strategy current"] },
        {
          title: "12. Capstone Project & Executive Certification",
          featured: true,
          topics: [
            "Build a full AI strategy for your organization",
            "Identify high-impact use cases and model ROI",
            "Present and defend the agenda",
          ],
        },
      ],
    },
  ],
  examNote:
    "Assessment is a capstone, not a timed exam: a full AI strategy for your organization, with use cases and modelled ROI. The Executive GenAI Leadership™ credential is issued through Accredible.",
  examGuidelinesHref: "",
  certificateTitle: "Executive GenAI Leadership™ Certificate",
  reviews: [
    {
      name: "Catherine Moore",
      role: "VP Operations",
      review:
        "We walked in with twelve pilots and walked out with three we would actually fund. The scoring was the useful part.",
    },
    {
      name: "Daniel Ruiz",
      role: "CIO",
      review:
        "Operating model — centralized vs federated — is the conversation my board needed. One day was the right length.",
    },
    {
      name: "Helen Park",
      role: "Transformation Lead",
      review:
        "The capstone was our agenda, not a case study. I used the ROI model the following Monday.",
    },
  ],
  faqs: aiFaqs({
    shortName: "Executive GenAI Leadership",
    datesTitle: "Upcoming Executive GenAI dates",
    certName: "Executive GenAI Leadership™ certification",
    includes:
      "The course price includes live training, course materials, the Executive GenAI Leadership™ certification issued through Accredible, and 5 PDUs.",
    exam: [
      {
        q: "Is there an exam?",
        a: "No timed exam. The assessment is a capstone: an AI strategy for your organization.",
      },
      {
        q: "Do I get certified?",
        a: "Yes. Completing the live day and capstone earns the Executive GenAI Leadership™ credential, issued through Accredible.",
      },
    ],
    generic: [
      {
        q: "What is Executive GenAI Leadership™ Certification Training?",
        a: "A live one-day class (9:00 AM–2:00 PM Eastern, 5 hours). Opportunity, governance, operating model, workforce, risk, and a capstone strategy for your organization.",
      },
      {
        q: "Do I need a technical background?",
        a: "No. The day is taught in business language for senior leaders.",
      },
    ],
  }),
};

export const generativeAiProjectManagers: CatalogLandingContent = {
  slug: "generative-ai-project-managers",
  crumb: "GenAI for PMs",
  title: "Generative AI for Project Managers™ Certification Training",
  lede:
    "Two days, 9:00 AM–2:00 PM Eastern. Twelve modules taking generative AI through the project lifecycle you already run.",
  summary:
    "Planning, collaboration, risk, budget, stakeholders, quality, Agile practices, and a full module on ethics. Every module lands on an artefact a PM already owns: a schedule, a register, a forecast, a status update. You leave with a prompt library and an adoption plan.",
  badgeSrc: "/Logo_GenAI_Project_Managers.png",
  badgeAlt: "Generative AI for Project Managers™ certification",
  cardTitle: "Generative AI for Project Managers™",
  durationLabel: DURATION_2_FIVE,
  includesLine:
    "Includes Generative AI for Project Managers™ certification (Accredible), live training, and 10 PDUs.",
  highlights: [
    "10 hours live over two days — 9:00 AM–2:00 PM Eastern",
    "Twelve modules across the project lifecycle",
    "Leave certified — issued through Accredible, no exam",
  ],
  brochureHref: COURSE_BROCHURE_HREF["generative-ai-project-managers"],
  datesTitle: "Upcoming GenAI for PMs dates",
  scheduleCourseName: "Generative AI for Project Managers™",
  eyebrow: "GenAI for Project Managers · Live online",
  attemptsLine: "Generative AI for Project Managers™ certificate included — issued through Accredible.",
  certificationEyebrow: "Certification included",
  curriculumLede:
    "Twelve modules. The whole project lifecycle, including a full module on ethics.",
  summaryTitle: "AI applied to the job a PM actually does",
  safePartner: false,
  whyOtherLabel: "Other AI-for-PMs classes",
  whyRows: aiWhy(
    {
      check: "Built around PM artefacts",
      usLead: "Every module produces something you already own.",
      usRest: "A plan, a register, a forecast, an update — not an abstract AI overview.",
      other: "Many PM AI classes stay at the tool level.",
    },
    {
      check: "Ethics as a module",
      usLead: "Confidentiality, bias, and transparency on client work.",
      usRest: "What may never be pasted into a model is taught, not implied.",
      other: "Ethics is usually a disclaimer.",
    },
    {
      check: "Traditional and Agile",
      usLead: "The same method works on a Gantt and on a Scrum board.",
      usRest: "Module 10 applies it inside Agile and Scrum delivery.",
      other: "Most classes pick one methodology and ignore the other.",
    },
    "You leave with the Generative AI for Project Managers™ credential.",
    "Issued through Accredible. Complete the live class — there is no exam."
  ),
  outcomes: [
    "Draft plans, work breakdowns, and schedules with AI, then test them for gaps",
    "Rebuild a risk register and draft mitigations worth reviewing",
    "Model costs and explain budget variance",
    "Tailor stakeholder updates by audience without rewriting from scratch",
    "Handle project data confidentially when using AI",
    "Leave with an adoption plan for your own practice",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "Plan, collaborate, risk, and money",
      modules: [
        { title: "1. Introduction to Generative AI for Project Management", topics: ["What generative AI is and is not", "Where it fits a project lifecycle", "Setting expectations with your team"] },
        { title: "2. AI in Project Planning and Scheduling", topics: ["Drafting plans and work breakdowns", "Estimating and schedule modelling", "Testing a plan for gaps"] },
        { title: "3. Enhancing Team Collaboration with AI", topics: ["Meeting summaries and action tracking", "Reducing coordination overhead", "Keeping the team in the loop"] },
        { title: "4. AI for Risk Management and Mitigation", topics: ["Surfacing risks a register missed", "Assessing likelihood and impact", "Drafting mitigation plans"] },
        { title: "5. Leveraging AI for Project Budgeting", topics: ["Cost modelling and forecasting", "Variance analysis", "Explaining budget movement"] },
        { title: "6. AI in Stakeholder Communication", topics: ["Tailoring updates by audience", "Drafting status and escalation", "Preparing for difficult conversations"] },
      ],
    },
    {
      day: "Day 2",
      focus: "Decisions, tools, quality, Agile, ethics, and adoption",
      modules: [
        { title: "7. Using AI for Decision Making", topics: ["Structuring options and trade-offs", "Testing assumptions", "Documenting the rationale"] },
        { title: "8. Integrating AI into Project Management Tools", topics: ["Working with your existing toolchain", "Automating repetitive updates", "Keeping a single source of truth"] },
        { title: "9. Optimizing Project Quality with AI", topics: ["Quality planning and checks", "Reviewing deliverables", "Catching defects earlier"] },
        { title: "10. AI in Agile and Scrum Practices", topics: ["Backlog and story support", "Retrospective and review input", "Flow and velocity analysis"] },
        { title: "11. Ethical Considerations in AI Implementation", topics: ["Data handling and confidentiality", "Bias and fairness in project decisions", "Transparency with your team and client"] },
        {
          title: "12. Future Trends and AI Evolution in Project Management",
          featured: true,
          topics: ["Where the tooling is heading", "Preparing your practice", "Building an adoption plan"],
        },
      ],
    },
  ],
  examNote:
    "There is no exam. Complete the live class and you receive the Generative AI for Project Managers™ certification, issued through Accredible.",
  examGuidelinesHref: "",
  certificateTitle: "Generative AI for Project Managers™ Certificate",
  reviews: [
    {
      name: "Robert Thompson",
      role: "Project Manager",
      review:
        "I rebuilt a status pack and a risk register in class. The ethics module is the one I made the PMO read.",
    },
    {
      name: "Nina Alvarez",
      role: "Programme Manager",
      review:
        "Twelve modules across the lifecycle, not one AI overview. I finally have a method, not a pile of prompts.",
    },
    {
      name: "Chris Walker",
      role: "Delivery Lead",
      review:
        "Works on our hybrid projects. Module 10 on Agile practices was not an afterthought.",
    },
  ],
  faqs: aiFaqs({
    shortName: "Generative AI for Project Managers",
    datesTitle: "Upcoming GenAI for PMs dates",
    certName: "Generative AI for Project Managers™ certification",
    includes:
      "The course price includes live training, course materials, the Generative AI for Project Managers™ certification issued through Accredible, and 10 PDUs.",
    exam: NO_EXAM,
    generic: [
      {
        q: "What is Generative AI for Project Managers™ Certification Training?",
        a: "A live two-day class (9:00 AM–2:00 PM Eastern each day, 10 hours total). Twelve modules across the project lifecycle. You leave certified.",
      },
      {
        q: "Do I need prior AI experience?",
        a: "No. Project management experience helps. No prior AI experience is assumed.",
      },
    ],
  }),
};

export const AI_CATALOG_LANDING: Record<string, CatalogLandingContent> = {
  "ai-agent-builder": aiAgentBuilder,
  "ai-workflow-automation": aiWorkflowAutomation,
  "ai-app-builder": aiAppBuilder,
  "certified-ai-product-manager": certifiedAiProductManager,
  "certified-genai-practitioner": certifiedGenaiPractitioner,
  "executive-genai-leadership": executiveGenaiLeadership,
  "generative-ai-project-managers": generativeAiProjectManagers,
};

export const AI_CAREER: Record<
  string,
  { summary: string; lede: string; next: { href: string; name: string; forWho: string }[] }
> = {
  "ai-agent-builder": {
    summary: aiAgentBuilder.summary!,
    lede: "After the fleet, go deeper on automation or ship the app as a product.",
    next: [
      { href: "/courses/ai-workflow-automation", name: "AI Workflow Automation", forWho: "If you want to push the n8n work into a full business process." },
      { href: "/courses/ai-app-builder", name: "No-Code AI App Builder", forWho: "If you want to turn the application into something you can sell." },
      { href: "/courses/ai-driven-scrum-master", name: "AI-Driven Scrum Master", forWho: "If your next job is putting AI on team delivery." },
    ],
  },
  "ai-workflow-automation": {
    summary: aiWorkflowAutomation.summary!,
    lede: "After one finished workflow, add agents or take the same method into project work.",
    next: [
      { href: "/courses/ai-agent-builder", name: "No-Code AI Agents", forWho: "If the next step is a fleet of agents, not one workflow." },
      { href: "/courses/generative-ai-project-managers", name: "GenAI for Project Managers", forWho: "If you run projects and want AI on the artefacts." },
      { href: "/courses/ai-app-builder", name: "No-Code AI App Builder", forWho: "If the process now needs a front end people can use." },
    ],
  },
  "ai-app-builder": {
    summary: aiAppBuilder.summary!,
    lede: "After one published app, add agents behind it or go deeper on product decisions.",
    next: [
      { href: "/courses/ai-agent-builder", name: "No-Code AI Agents", forWho: "If the app now needs a fleet of agents behind it." },
      { href: "/courses/certified-ai-product-manager", name: "Certified AI Product Manager", forWho: "If you want to ship product, not just an app." },
      { href: "/courses/ai-workflow-automation", name: "AI Workflow Automation", forWho: "If the next problem is the process around the app." },
    ],
  },
  "certified-ai-product-manager": {
    summary: certifiedAiProductManager.summary!,
    lede: "After you have shipped one app, go deeper on agents or official product credentials.",
    next: [
      { href: "/courses/ai-app-builder", name: "No-Code AI App Builder", forWho: "If you want a repeatable way to sell the next app." },
      { href: "/courses/agile-product-management", name: "SAFe APM", forWho: "If you need the official enterprise product credential." },
      { href: "/courses/generative-ai-project-managers", name: "GenAI for Project Managers", forWho: "If delivery around the product is the next gap." },
    ],
  },
  "certified-genai-practitioner": {
    summary: certifiedGenaiPractitioner.summary!,
    lede: "After the foundation, pick the job you actually do.",
    next: [
      { href: "/courses/ai-driven-scrum-master", name: "AI-Driven Scrum Master", forWho: "If you run Scrum and want AI on the week." },
      { href: "/courses/ai-workflow-automation", name: "AI Workflow Automation", forWho: "If you want to automate a real process next." },
      { href: "/courses/generative-ai-project-managers", name: "GenAI for Project Managers", forWho: "If you manage projects and want AI on the artefacts." },
    ],
  },
  "executive-genai-leadership": {
    summary: executiveGenaiLeadership.summary!,
    lede: "After the agenda, send the people who will build it.",
    next: [
      { href: "/courses/certified-ai-product-manager", name: "Certified AI Product Manager", forWho: "If a leader on the agenda needs to ship, not only fund." },
      { href: "/courses/lean-portfolio-management", name: "SAFe LPM", forWho: "If the next problem is how the portfolio funds the work." },
      { href: "/courses/leading-safe", name: "Leading SAFe", forWho: "If the organization still needs the Agilist foundation." },
    ],
  },
  "generative-ai-project-managers": {
    summary: generativeAiProjectManagers.summary!,
    lede: "After the lifecycle method, put AI on the team or the process.",
    next: [
      { href: "/courses/ai-driven-scrum-master", name: "AI-Driven Scrum Master", forWho: "If you also run Scrum events and want AI on that week." },
      { href: "/courses/ai-workflow-automation", name: "AI Workflow Automation", forWho: "If status, risk, and follow-up should run as a workflow." },
      { href: "/courses/product-owner-manager", name: "SAFe POPM", forWho: "If you need the official product-owner credential next." },
    ],
  },
};

export const AI_EXAM_DETAILS: Record<string, NonNullable<CatalogLandingContent["examDetails"]>> = {
  "ai-agent-builder": {
    prerequisites: "There are no formal prerequisites. No programming background is required. Bring a real business process you would like to automate.",
    format: [
      { highlight: "No-Code AI Agents™ certification", after: " issued through Accredible" },
      { highlight: "No exam", after: ". Complete the live class" },
      { highlight: "8 PDUs", after: " for the 8-hour live class" },
    ],
  },
  "ai-workflow-automation": {
    prerequisites: "There are no formal prerequisites. No traditional programming experience is required. Bring a repetitive process you would like to automate.",
    format: [
      { highlight: "AI Workflow Automation™ certification", after: " issued through Accredible" },
      { highlight: "No exam", after: ". Complete the live class" },
      { highlight: "8 PDUs", after: " for the 8-hour live class" },
    ],
  },
  "ai-app-builder": {
    prerequisites: "There are no formal prerequisites. No coding experience is required. Bring a real business problem you would like to solve with an application.",
    format: [
      { highlight: "No-Code AI App Builder™ certification", after: " issued through Accredible" },
      { highlight: "No exam", after: ". Complete the live class" },
      { highlight: "8 PDUs", after: " for the 8-hour live class" },
    ],
  },
  "certified-ai-product-manager": {
    prerequisites: "There are no formal prerequisites. No engineering background is required. Bring a product idea you would genuinely like to exist.",
    format: [
      { highlight: "Certified AI Product Manager™ certification", after: " issued through Accredible" },
      { highlight: "No exam", after: ". Complete the live class" },
      { highlight: "10 PDUs", after: " for the 10-hour live class" },
    ],
  },
  "certified-genai-practitioner": {
    prerequisites: "There are no formal prerequisites. No prior AI experience is assumed.",
    format: [
      { highlight: "Certified GenAI Practitioner™ certification", after: " issued through Accredible" },
      { highlight: "No exam", after: ". Complete the live class" },
      { highlight: "4 PDUs", after: " for the 4-hour live class" },
    ],
  },
  "executive-genai-leadership": {
    prerequisites: "There are no formal prerequisites. Built for senior leaders. No technical AI background is assumed.",
    format: [
      { highlight: "Executive GenAI Leadership™ certification", after: " issued through Accredible" },
      { highlight: "Capstone, no timed exam", after: ". A strategy for your organization" },
      { highlight: "5 PDUs", after: " for the 5-hour live class" },
    ],
  },
  "generative-ai-project-managers": {
    prerequisites: "There are no formal prerequisites. Project management experience helps. No prior AI experience is assumed.",
    format: [
      { highlight: "Generative AI for Project Managers™ certification", after: " issued through Accredible" },
      { highlight: "No exam", after: ". Complete the live class" },
      { highlight: "10 PDUs", after: " for the 10-hour live class" },
    ],
  },
};
