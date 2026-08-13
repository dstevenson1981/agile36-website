export type AiPmExamQuestion = {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};

/** Passing score for the AI Product Management final exam. */
export const AI_PM_EXAM_PASS_PERCENT = 75;

/** Soft time limit shown in the exam chrome (75 minutes). */
export const AI_PM_EXAM_TIME_LIMIT_SECONDS = 75 * 60;

export const AI_PM_EXAM_QUESTIONS: AiPmExamQuestion[] = [
  {
    id: 1,
    question: "Which best characterizes how the course frames AI's effect on the PM role?",
    options: [
    "Core PM responsibilities stay intact; AI increases the speed and effectiveness of delivering value",
    "AI absorbs most PM responsibilities, shrinking the role",
    "AI's effect is limited to the Development and Launch phases",
    "AI and PM work are described as separate, non-overlapping tracks",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "A PM skips the Ideation & Research phase to save three weeks before a hard deadline. What's the most likely consequence, per the course?",
    options: [
    "Faster time to market with no meaningful tradeoff",
    "A higher chance of building something nobody wants, since decisions aren't grounded in evidence",
    "Reduced need for later stakeholder alignment",
    "Increased data source diversity",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "In the AI-enhanced version of Ideation & Research, how does research duration compare to the traditional approach?",
    options: [
    "About the same, just with better tools",
    "It increases initially before dropping in later phases",
    "It drops from several weeks to a matter of days",
    "Duration isn't addressed \u2014 only data-source count changes",
    ],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "Which phase does the course single out as the one where \"ideas become reality,\" making a specific handoff especially consequential?",
    options: [
    "Ideation & Research",
    "Validation & Testing",
    "Post-Launch & Monitoring",
    "Development",
    ],
    correctIndex: 3,
  },
  {
    id: 5,
    question: "Of the reasons the course gives for why research isn't optional, which is specifically about not solving problems that don't actually exist?",
    options: [
    "Real Problems",
    "Market Demand",
    "Time & Money",
    "Hidden Patterns",
    ],
    correctIndex: 0,
  },
  {
    id: 6,
    question: "In the AI-enhanced user research comparison, which activity (or activities) move from a fully manual process to a fully automatic one?",
    options: [
    "Interview Analysis only",
    "Both Interview Analysis and Survey Responses",
    "Survey Responses only",
    "Neither \u2014 both remain partially manual",
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "Which research type is best suited to validating a hypothesis with a specific statistical claim?",
    options: [
    "Qualitative",
    "Primary",
    "Quantitative",
    "Secondary",
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "Which AI-enhanced market research activity is specifically about comparing what competitors charge?",
    options: [
    "Trend Analysis",
    "Competitor Analysis",
    "Sentiment Analysis",
    "Pricing Intelligence",
    ],
    correctIndex: 3,
  },
  {
    id: 9,
    question: "A PM writes: Objective \u2014 \"Improve customer support.\" Key Result \u2014 \"Customers are happier.\" Using the course's own model OKR as a benchmark, what's the central flaw?",
    options: [
    "Neither the objective nor the key result is measurable or time-bound",
    "The objective is too specific",
    "OKRs shouldn't include an objective at all",
    "Key Results should never mention numbers",
    ],
    correctIndex: 0,
  },
  {
    id: 10,
    question: "How many KPIs does the course recommend supporting each individual Key Result?",
    options: [
    "1",
    "2\u20134",
    "5\u201310",
    "As many as possible",
    ],
    correctIndex: 1,
  },
  {
    id: 11,
    question: "What best distinguishes an \"initiative\" from a \"strategic theme\" in the course's framework?",
    options: [
    "They're interchangeable terms for the same artifact",
    "Initiatives are always set before themes are defined",
    "A theme is the broad direction; an initiative is the specific, actionable effort that advances it",
    "Themes apply only to OKRs, initiatives only to KPIs",
    ],
    correctIndex: 2,
  },
  {
    id: 12,
    question: "In the course's own example, which of these is the initiative rather than the strategic theme?",
    options: [
    "\"Expand Disney+ into three international markets by Jan 2027\"",
    "Both are strategic themes",
    "Neither \u2014 one is an OKR, the other a KPI",
    "\"Launch Disney+ streaming platform in Japan by Q2\"",
    ],
    correctIndex: 3,
  },
  {
    id: 13,
    question: "Why can't a large initiative like \"Improve Post-Purchase Support Experience\" appear directly on a roadmap?",
    options: [
    "It's too broad \u2014 it must first be translated into smaller, time-based objectives",
    "It doesn't reference AI",
    "Roadmaps in this course only track bugs, not initiatives",
    "It lacks stakeholder sign-off",
    ],
    correctIndex: 0,
  },
  {
    id: 14,
    question: "Put these roadmap phases in order from nearest-term to longest-term.",
    options: [
    "Future \u2192 Later \u2192 Next \u2192 Now",
    "Now \u2192 Next \u2192 Later \u2192 Future",
    "Next \u2192 Now \u2192 Future \u2192 Later",
    "Later \u2192 Now \u2192 Future \u2192 Next",
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    question: "What should Year 1 of a multi-year roadmap generally emphasize, per the roadmap activity's guidance?",
    options: [
    "Long-term bets and R&D",
    "Expansion into every target market simultaneously",
    "Core functionality, with iterative improvements and scale-up phases following later",
    "Advanced features before core functionality is validated",
    ],
    correctIndex: 2,
  },
  {
    id: 16,
    question: "Two roadmap capabilities have a dependency: B can't start until A is finished. What does the course say a team should do?",
    options: [
    "Build both in parallel to save time",
    "Always build the harder capability first regardless of dependencies",
    "Push both to the \"Future\" phase until the dependency resolves itself",
    "Identify and sequence the dependency explicitly rather than ignoring it",
    ],
    correctIndex: 3,
  },
  {
    id: 17,
    question: "Which sequence correctly reflects how a roadmap objective becomes buildable work, from broadest to most granular?",
    options: [
    "Roadmap Objective \u2192 Feature \u2192 User Story",
    "User Story \u2192 Feature \u2192 Roadmap Objective",
    "Feature \u2192 User Story \u2192 Roadmap Objective",
    "Roadmap Objective \u2192 User Story \u2192 Feature",
    ],
    correctIndex: 0,
  },
  {
    id: 18,
    question: "A feature is written with just a name and a one-line description. What's missing, per the course's feature-writing framework?",
    options: [
    "A sprint number and story points",
    "A clearly stated benefit (customer and business) and acceptance criteria",
    "A list of competitor features",
    "An OKR reference number",
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    question: "The MVP capstone activity (using a no-code AI tool) explicitly does NOT require which of the following?",
    options: [
    "A defined problem and core assumption to test",
    "A working front-end interface",
    "A functioning backend",
    "A short demo walkthrough",
    ],
    correctIndex: 2,
  },
  {
    id: 20,
    question: "Three of these four activities belong to the same testing stage; one is the odd one out. Which one?",
    options: [
    "Summarize Feedback",
    "Generate Test Cases & Flows",
    "Simulate User Behavior",
    "Track Adoption & Behavior",
    ],
    correctIndex: 3,
  },
  {
    id: 21,
    question: "Beyond writing use cases and test cases, what else does the validation activity require teams to define?",
    options: [
    "Success metrics for post-launch, and the risks/assumptions to validate",
    "A go-to-market budget",
    "A hiring plan for QA",
    "Competitor pricing tiers",
    ],
    correctIndex: 0,
  },
  {
    id: 22,
    question: "\"Detect Churn/Drop-Off Risk\" and \"Analyze Feedback & Reviews\" both belong to which testing stage?",
    options: [
    "Pre-Launch Testing",
    "Post-Launch Testing",
    "Both stages equally",
    "Neither \u2014 they're GTM activities",
    ],
    correctIndex: 1,
  },
  {
    id: 23,
    question: "A PMM is finalizing campaign messaging and content. Which of the following remains the PM's call rather than the PMM's?",
    options: [
    "The exact wording of the ad copy",
    "The visual design of campaign assets",
    "The timing and readiness of the product capabilities being promoted",
    "The media buying schedule",
    ],
    correctIndex: 2,
  },
  {
    id: 24,
    question: "The course describes the PM's \"core focus\" in GTM as ensuring the campaign is grounded in what, rather than in what marketing wants to promote?",
    options: [
    "Competitor positioning",
    "Sales team preferences",
    "Historical campaign performance",
    "What users actually need",
    ],
    correctIndex: 3,
  },
  {
    id: 25,
    question: "A team wants to make a post-launch decision based solely on a spike in competitor feature announcements. Why is this inconsistent with the course's framework?",
    options: [
    "Competitive activity isn't one of the three signal types (Behavioral, Qualitative, Business) the course identifies for post-launch decisions",
    "Competitor data is always more reliable than internal signals",
    "Competitor signals should always override behavioral data",
    "Competitive signals are only valid during Launch, not post-launch",
    ],
    correctIndex: 0,
  },
  {
    id: 26,
    question: "Which of the following is explicitly listed as one of the reasons iteration matters more than launch?",
    options: [
    "Reducing the frequency of user feedback",
    "Doubling down on what's already working",
    "Avoiding changes until the next major version",
    "Deprioritizing friction points until they escalate",
    ],
    correctIndex: 1,
  },
  {
    id: 27,
    question: "A support bot confidently states an exact account balance it never actually looked up. What's the most accurate diagnosis and fix?",
    options: [
    "This is a latency issue; use a faster model",
    "This is context window overflow; shorten the prompt",
    "This is a hallucination; the balance should be retrieved from the system of record, not generated",
    "This is expected probabilistic behavior and requires no fix",
    ],
    correctIndex: 2,
  },
  {
    id: 28,
    question: "Which pairing correctly illustrates deterministic vs. probabilistic behavior?",
    options: [
    "Deterministic: \"summarize why this customer wants to cancel\" \u2014 Probabilistic: \"order total > $50 \u2192 free shipping\"",
    "Both examples are deterministic",
    "Both examples are probabilistic",
    "Deterministic: \"order total > $50 \u2192 free shipping\" \u2014 Probabilistic: \"summarize why this customer wants to cancel\"",
    ],
    correctIndex: 3,
  },
  {
    id: 29,
    question: "Of the following, which is the best fit for a knowledge-retrieval (RAG) approach rather than a live tool/API call?",
    options: [
    "\"What is our current parental leave policy?\"",
    "\"Is order #48291 eligible for a refund right now?\"",
    "\"Refund order #48291.\"",
    "\"What's the current status of my shipment?\"",
    ],
    correctIndex: 0,
  },
  {
    id: 30,
    question: "Why do the other three options in the previous question fail as good RAG use cases, even though the correct one succeeds?",
    options: [
    "They involve numbers, and RAG cannot process numeric data",
    "They require live, real-time, or transactional data \u2014 better served by a tool/API call than static retrieval",
    "They are classification tasks, and RAG only supports generation",
    "They exceed the token limit for retrieval",
    ],
    correctIndex: 1,
  },
  {
    id: 31,
    question: "A PM is deciding how much time to invest personally learning RAG versus MCP in depth. Based on how the course frames each, what's the most defensible allocation?",
    options: [
    "Equal effort \u2014 both are core, hands-on build decisions for PMs",
    "Heavier on MCP, since it determines what knowledge the AI can access",
    "Heavier on RAG, since what knowledge the AI should see is a product decision; MCP is more of an integration standard to recognize by name",
    "Neither is worth a PM's time \u2014 both are purely engineering concerns",
    ],
    correctIndex: 2,
  },
  {
    id: 32,
    question: "A vendor demos a model that outperforms everything else you've tested \u2014 but it's also the most expensive and slowest option. What does the course's guidance suggest?",
    options: [
    "Always choose the top-performing model regardless of cost or speed",
    "Immediately disqualify any model that isn't the cheapest",
    "Base model selection on demo performance alone",
    "Use the strongest model only where the added quality creates meaningful value; mix models by task where appropriate",
    ],
    correctIndex: 3,
  },
  {
    id: 33,
    question: "Two tool designs are proposed for an agent: one function that \"handles all customer actions,\" and several narrower functions like retrieving order status specifically. Which is more consistent with the course's guidance, and why?",
    options: [
    "The narrower functions \u2014 specific, well-defined capabilities work better than one tool expected to do everything",
    "The single broad function \u2014 it reduces the number of tools to maintain",
    "Neither \u2014 agents shouldn't use tools at all",
    "Both are equally valid; tool granularity doesn't affect reliability",
    ],
    correctIndex: 0,
  },
  {
    id: 34,
    question: "An agent can read order status automatically and draft refund decisions, but any refund over a set dollar threshold requires human approval before it executes. What principle does this illustrate?",
    options: [
    "Agents should never be allowed to draft decisions",
    "Autonomy should scale with the risk of the action being taken",
    "All actions should require human approval regardless of risk",
    "Permission levels are unnecessary once an agent is deployed",
    ],
    correctIndex: 1,
  },
  {
    id: 35,
    question: "One process has fixed, predetermined steps (receive form \u2192 look up account \u2192 respond). A second process requires the system to decide in real time whether to ask a question, search, retrieve, or escalate. How would the course categorize these, respectively?",
    options: [
    "Both are agents",
    "The first is an agent; the second is a workflow",
    "The first is a workflow; the second is an agent",
    "Both are workflows, since AI is involved in each",
    ],
    correctIndex: 2,
  },
  {
    id: 36,
    question: "An AI product shows strong accuracy and a low hallucination rate in testing, but adoption is low and satisfaction is falling. Which category of metric does this expose a gap in?",
    options: [
    "AI performance",
    "Model parameter count",
    "There's no gap \u2014 strong AI metrics guarantee strong product metrics",
    "Product performance",
    ],
    correctIndex: 3,
  },
  {
    id: 37,
    question: "Which testing approach involves deliberately trying to get the AI to behave in unintended or manipulated ways, and why does the course argue it shouldn't be skipped even for \"well-behaved\" user bases?",
    options: [
    "Adversarial testing; assuming good-faith use only creates a blind spot in evaluation",
    "Edge case testing; it's redundant with adversarial testing",
    "Ambiguous case testing; it only matters for multimodal products",
    "Normal case testing; it already covers manipulation attempts",
    ],
    correctIndex: 0,
  },
  {
    id: 38,
    question: "A user crafts input specifically designed to override an AI system's original instructions. What is this risk called, and is it more associated with AI products or traditional deterministic software?",
    options: [
    "Data leakage; equally common in both",
    "Prompt injection; a risk more specific to AI products, since instructions can be manipulated via input in a way fixed logic can't be",
    "Latency; unrelated to security",
    "Observability; a traditional software concept only",
    ],
    correctIndex: 1,
  },
  {
    id: 39,
    question: "Four practices are proposed for a new customer-facing agent: (1) scope the goal narrowly, (2) limit which tools/data it can access, (3) maximize its autonomy so it resolves issues without interruption, (4) log every action it takes. Which one contradicts the course's safe-agent guidance?",
    options: [
    "1",
    "2",
    "3",
    "4",
    ],
    correctIndex: 2,
  },
  {
    id: 40,
    question: "An agent's tool call silently fails, but the agent generates a confident, plausible-sounding answer anyway and sends it to the customer. Which combination of safeguards would most directly have caught this before it reached the customer?",
    options: [
    "A larger context window and a more capable model",
    "More few-shot examples in the prompt",
    "Reducing the number of permission levels",
    "A defined stop condition for failures (escalate instead of continuing) plus logging/observability into what happened",
    ],
    correctIndex: 3,
  },
  {
    id: 41,
    question: "A support AI shows a 92% task success rate in evaluation, but adoption is flat and NPS is declining. What does this gap most likely indicate?",
    options: [
    "AI performance is strong, but a gap exists in product performance \u2014 something in the experience or actual customer value isn't landing",
    "The AI performance metrics are inaccurate and should be discarded",
    "NPS and adoption are irrelevant once task success is high",
    "The evaluation methodology itself is flawed and must be redone",
    ],
    correctIndex: 0,
  },
  {
    id: 42,
    question: "You're scoping an MVP for an AI-powered expense report assistant. Which of the following best reflects the course's MVP principle?",
    options: [
    "Include every possible expense scenario, including disputed and multi-currency cases, in the first release",
    "Scope to the core assumption being tested \u2014 e.g., reading a receipt and auto-categorizing standard expenses \u2014 and route edge cases like disputes to a human",
    "Build the full backend and reporting suite before testing with any users",
    "Skip defining any assumption and let user feedback shape the MVP after launch",
    ],
    correctIndex: 1,
  },
  {
    id: 43,
    question: "A stakeholder argues a refund-processing agent should be fully autonomous because \"approval steps defeat the purpose of AI.\" What is the strongest counterargument grounded in the course?",
    options: [
    "Full autonomy is fine as long as the model has a low hallucination rate",
    "Approval steps should be removed entirely once the agent has been tested once",
    "Autonomy should scale with the risk of the action; irreversible or high-cost actions (e.g., large refunds) warrant a human checkpoint regardless of model quality",
    "Autonomy and risk are unrelated considerations in agent design",
    ],
    correctIndex: 2,
  },
  {
    id: 44,
    question: "Which of the following is something an AI product requirement must specify that a traditional software requirement typically wouldn't need to?",
    options: [
    "The name of the feature",
    "The release date",
    "The name of the engineering lead",
    "An escalation path for low-confidence responses",
    ],
    correctIndex: 3,
  },
  {
    id: 45,
    question: "Which pairing correctly matches the term to its definition?",
    options: [
    "Hallucination \u2014 a response that sounds authoritative but isn't actually grounded in verified data",
    "Context Window \u2014 a required approval step before a high-risk action executes",
    "Guardrails \u2014 the delay introduced by processing more context or using a larger model",
    "Observability \u2014 the full set of information available to the model in a single interaction",
    ],
    correctIndex: 0,
  },
];
