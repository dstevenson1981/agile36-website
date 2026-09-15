/** Transcribed from the supplied photos. Preserve wording, option order, and selected answers.
 * correctIndex records the source selection, not an independently verified answer key.
 * null means the photo has no selected answer. Missing source questions: 8, 9, 28, 45.
 */
export type LeadingSafeQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number | null;
  sourceImage: string;
  sourceNote?: string;
};

export const LEADING_SAFE_QUESTIONS: LeadingSafeQuestion[] = [
  {
    "id": 1,
    "question": "How does SAFe describe Customer Centricity?",
    "options": [
      "As a strategy to meet the needs of an ever-changing Customer market",
      "As a set of practices employed to make products focused on the Customer",
      "As a way of working to include the Customer in daily work processes and planning",
      "As a mindset focused on the Customer journey that produces the best innovations"
    ],
    "correctIndex": null,
    "sourceImage": "IMG_0037.jpg"
  },
  {
    "id": 2,
    "question": "What is an example of applying cadence and synchronization in SAFe?",
    "options": [
      "Using a Portfolio Kanban system",
      "Allocating budgets to Value Streams",
      "Conducting a PI Planning event",
      "Creating cross-functional ARTs and Agile teams"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0038.jpg"
  },
  {
    "id": 3,
    "question": "Which factor is most likely to determine whether organizations thrive in the Age of AI?",
    "options": [
      "The organization's design and operating model",
      "The speed at which new tools are adopted",
      "The size of the organization's technology budget",
      "The productivity of individual contributors"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0079.jpg"
  },
  {
    "id": 4,
    "question": "During the final plan review, ART PI risks are ROAM'ed. What do the letters in ROAM represent?",
    "options": [
      "Resolved, Owned, Approved, Mitigated",
      "Resolved, Owned, Assigned, Mitigated",
      "Resolved, Owned, Active, Mitigated",
      "Resolved, Owned, Accepted, Mitigated"
    ],
    "correctIndex": 3,
    "sourceImage": "IMG_0080.jpg"
  },
  {
    "id": 5,
    "question": "What is one example of differentiating business objectives?",
    "options": [
      "Strategic Themes",
      "Portfolio Vision",
      "Enterprise Goals",
      "Solution Intent"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0081.jpg"
  },
  {
    "id": 6,
    "question": "What is one key to leading a successful change?",
    "options": [
      "Sustaining deceleration",
      "Forming a strategic vision",
      "Generating long-term wins",
      "Instituting traditions"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0040.jpg"
  },
  {
    "id": 7,
    "question": "Too many large initiatives are being analyzed at once, slowing decision-making across the portfolio. How could AI help improve flow while maintaining Lean principles?",
    "options": [
      "Identify bottlenecks and forecast capacity for analysis work",
      "Replace the portfolio kanban system",
      "Approve the highest-value initiatives first",
      "Eliminate work-in-process limits to increase throughput"
    ],
    "correctIndex": null,
    "sourceImage": "IMG_0039.jpg"
  },
  {
    "id": 10,
    "question": "What is one way Lean-Agile leaders lead by example?",
    "options": [
      "By implementing Lean Portfolio Management",
      "By modeling SAFe's Lean-Agile Mindset, values, principles, and practices",
      "By using the SAFe Implementation Roadmap to script the path for change",
      "By applying empathic design and focusing on Customer Centricity"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0042.jpg"
  },
  {
    "id": 11,
    "question": "What else does the SAFe principle, unlock the intrinsic motivation of knowledge workers, require besides purpose and minimum possible constraints?",
    "options": [
      "Mastery",
      "Transparency",
      "Innovation",
      "Incentive-based compensation"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0043.jpg"
  },
  {
    "id": 12,
    "question": "Who is responsible for managing the Portfolio Kanban?",
    "options": [
      "Lean Portfolio Management",
      "Product Management",
      "Solution Management",
      "Release Train Engineer"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0044.jpg"
  },
  {
    "id": 13,
    "question": "Which use of AI best helps leaders strengthen an Epic?",
    "options": [
      "Refining assumptions to make hypotheses clearer and more testable",
      "Consolidating stakeholder opinions into a single viewpoint",
      "Producing financial forecasts for long-term planning",
      "Generating detailed implementation plans for each initiative"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0045.jpg"
  },
  {
    "id": 14,
    "question": "What is one of the Agile Release Train events?",
    "options": [
      "Backlog refinement",
      "Product Owner sync",
      "Solution Demo",
      "Iteration Retrospective"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0046.jpg"
  },
  {
    "id": 15,
    "question": "Which of the following is a benefit of separating deployment from release?",
    "options": [
      "It enables testing before exposing new functionality to users",
      "It reduces bottlenecks and delays in deployment",
      "It helps to reduce batch size and increase flow",
      "It accelerates time to market and larger features"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0047.jpg"
  },
  {
    "id": 16,
    "question": "What information is required for the Weighted Shortest Job First (WSJF) formula to prioritize features?",
    "options": [
      "Feature size and stakeholder priority",
      "Customer satisfaction and team velocity",
      "Cost of delay and job duration",
      "Business value and technical risk"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0049.jpg"
  },
  {
    "id": 17,
    "question": "Which statement applies to uncommitted objectives?",
    "options": [
      "They can only receive Business Value assignments of 3 or less",
      "The story points are counted when calculating the load",
      "The items the team has high confidence in get higher points",
      "They are included in the commitment"
    ],
    "correctIndex": 3,
    "sourceImage": "IMG_0050.jpg"
  },
  {
    "id": 18,
    "question": "What is the best way to describe a cross-functional Agile Team?",
    "options": [
      "They have no dependencies with other Agile teams",
      "They deliver value every 6 weeks",
      "They release customer products to production continuously",
      "They are optimized for communication and delivery of value"
    ],
    "correctIndex": 3,
    "sourceImage": "IMG_0051.jpg"
  },
  {
    "id": 19,
    "question": "What is used to brainstorm potential Portfolio future states?",
    "options": [
      "Epics and Enablers",
      "KPIs and Lean budget Guardrails",
      "SWOT and TOWS",
      "Enterprise business drivers"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0052.jpg"
  },
  {
    "id": 20,
    "question": "Which scenario best illustrates a common risk associated with using AI systems?",
    "options": [
      "An AI model automates repetitive administrative tasks",
      "An AI tool generates confident but incorrect information due to hallucination",
      "An AI system produces results faster than human analysts",
      "An AI assistant summarizes large documents efficiently"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0053.jpg"
  },
  {
    "id": 21,
    "question": "What is \"precisely specify value by product\" central to?",
    "options": [
      "Agile Manifesto",
      "SAFe Principles",
      "SAFe Core Values",
      "Lean Thinking"
    ],
    "correctIndex": 3,
    "sourceImage": "IMG_0054.jpg"
  },
  {
    "id": 22,
    "question": "What is the primary function of SAFe Practice Consultants (SPCs) within an organization adopting SAFe?",
    "options": [
      "They are responsible for making all decentralized decisions on behalf of the Lean-Agile leadership team.",
      "They act as traditional project managers who oversee the day-to-day tasks of teams to ensure a 20–50% increase in productivity.",
      "They are experienced change agents who guide the transformation, build the guiding coalition, and help identify value streams to launch Ag",
      "They are executive sponsors whose main responsibility is to financially fund the transformation and invest in career development."
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0055.jpg",
    "sourceNote": "Answer C is cut off in the supplied photo after “launch Ag”. Only the visible text is shown; the missing ending has not been inferred."
  },
  {
    "id": 23,
    "question": "User business value and time criticality are components of what?",
    "options": [
      "Product Vision",
      "Feature Acceptance Criteria",
      "Cost of Delay",
      "Story point estimation"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0056.jpg"
  },
  {
    "id": 24,
    "question": "Portfolio leaders receive fragmented data from multiple sources about strategy execution. How can AI most effectively support their decision-making?",
    "options": [
      "Prioritizing initiatives based solely on historical performance",
      "Synthesizing diverse inputs to highlight meaningful patterns and signals",
      "Selecting a single data source to ensure consistency",
      "Replacing leadership reviews with automated dashboards"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0057.jpg"
  },
  {
    "id": 25,
    "question": "Portfolio leaders want to balance short-term delivery with long-term investment using Lean budgets and guardrails. How could AI support this responsibility?",
    "options": [
      "Cancel initiatives that exceed their estimates",
      "Enforce fixed spending limits for each value stream",
      "Model trade-offs across multiple investment scenarios",
      "Rank initiatives only by projected revenue"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0058.jpg"
  },
  {
    "id": 26,
    "question": "The analyzing step of the Portfolio Kanban system has a new Epic with a completed Lean business case. What best describes the next step for the Epic?",
    "options": [
      "It will be implemented once the Epic Owner approves the Lean business case",
      "It will remain in the analyzing step until one or more Agile Release Trains have the capacity to implement it",
      "It will be implemented if it has the highest weighted shortest job first (WSJF) ranking",
      "It will be moved to the ready state in the Portfolio Kanban if it receives a 'go' decision from Lean Portfolio Management"
    ],
    "correctIndex": 3,
    "sourceImage": "IMG_0059.jpg"
  },
  {
    "id": 27,
    "question": "Which statement best reflects the role of leaders in building a Lean-Agile organization?",
    "options": [
      "Leaders focus primarily on enforcing process compliance",
      "Leaders drive transformation by modeling Lean-Agile principles and empowering teams",
      "Leaders delegate responsibility for change to transformation specialists",
      "Leaders concentrate on improving individual team productivity"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0060.jpg"
  },
  {
    "id": 29,
    "question": "How do Lean budget guardrails support decentralized decision-making?",
    "options": [
      "They allocate fixed budgets to individual teams",
      "They replace financial oversight with automated controls",
      "They define boundaries that allow local decisions while maintaining strategic alignment",
      "They require approval for each significant expenditure"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0061.jpg"
  },
  {
    "id": 30,
    "question": "During the PI Planning event, when are planning adjustments agreed upon?",
    "options": [
      "During the management review and problem-solving meeting",
      "During the draft plan review",
      "During the Coach Sync",
      "During breakout sessions"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0063.jpg"
  },
  {
    "id": 31,
    "question": "What is one of the techniques associated with Design Thinking?",
    "options": [
      "Behavior-driven development",
      "Empathy maps",
      "Portfolio canvas",
      "Set-based design"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0064.jpg"
  },
  {
    "id": 32,
    "question": "Which basic Agile quality practice reduces bottlenecks?",
    "options": [
      "Collective ownership",
      "Extensive documentation",
      "Peer-reviewing",
      "Definition of done"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0065.jpg"
  },
  {
    "id": 33,
    "question": "Technological revolutions (including AI) most significantly affect organizations by:",
    "options": [
      "Making existing governance structures more effective",
      "Reducing uncertainty in strategic planning",
      "Changing how value is created and delivered",
      "Eliminating the need for human decision-making"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0066.jpg"
  },
  {
    "id": 34,
    "question": "What method provides a continuous understanding of the target market?",
    "options": [
      "Design thinking",
      "Lean Systems Engineering",
      "Participatory budgeting",
      "Lean Portfolio Management"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0067.jpg"
  },
  {
    "id": 35,
    "question": "Which team provides processes and tools to support other teams in integrating and validating their work?",
    "options": [
      "DevOps Team",
      "Solution Team",
      "System Team",
      "Shared Services Team"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0068.jpg"
  },
  {
    "id": 36,
    "question": "What is found on an ART planning board?",
    "options": [
      "Features",
      "Tasks",
      "Epics",
      "User Stories"
    ],
    "correctIndex": 0,
    "sourceImage": "IMG_0069.jpg"
  },
  {
    "id": 37,
    "question": "Which SAFe Lean-Agile Principle includes an emphasis on \"deliver early and often\"?",
    "options": [
      "Organize around value",
      "Take an economic view",
      "Unlock the intrinsic motivation of knowledge workers",
      "Make value flow without interruptions"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0070.jpg"
  },
  {
    "id": 38,
    "question": "What represents the workflow, activities, and automation needed to deliver new functionality more frequently?",
    "options": [
      "The Portfolio Kanban",
      "The PI Planning process",
      "The Lean budget Guardrails",
      "The Continuous Delivery Pipeline"
    ],
    "correctIndex": 3,
    "sourceImage": "IMG_0071.jpg"
  },
  {
    "id": 39,
    "question": "What is a primary benefit of funding value streams instead of individual projects?",
    "options": [
      "It eliminates the need for portfolio governance",
      "It ensures detailed upfront scope definition",
      "It enables continuous delivery of value without repeated funding approvals",
      "It centralizes financial control at the team level"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0072.jpg"
  },
  {
    "id": 40,
    "question": "Which type of AI combines a language model with trusted sources to produce grounded responses?",
    "options": [
      "Prompt-based language modeling",
      "Autonomous agent systems",
      "Traditional machine learning",
      "Retrieval-Augmented Generation (RAG)"
    ],
    "correctIndex": 3,
    "sourceImage": "IMG_0082.jpg"
  },
  {
    "id": 41,
    "question": "What is the focus and purpose of applying Lean Thinking?",
    "options": [
      "Ensuring respect for people and culture",
      "Reducing delays and waste",
      "Implementing objective measures of progress",
      "Moving to an iterative development process"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0083.jpg"
  },
  {
    "id": 42,
    "question": "A confidence vote is taken at the end of PI Planning after dependencies are resolved and risks are addressed. What best describes the process of the confidence vote?",
    "options": [
      "The Business Owners vote",
      "Each team selects a delegate to vote",
      "The teams and the ART vote",
      "The managers vote"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0075.jpg"
  },
  {
    "id": 43,
    "question": "Which SAFe Core Value includes use \"common language\" and \"understand your customer\"?",
    "options": [
      "Relentless Improvement",
      "Transparency",
      "Alignment",
      "Respect for People"
    ],
    "correctIndex": 2,
    "sourceImage": "IMG_0076.jpg"
  },
  {
    "id": 44,
    "question": "A SAFe Portfolio is a collection of what?",
    "options": [
      "Organizational departments",
      "Value Streams",
      "Functional teams",
      "Solutions"
    ],
    "correctIndex": 1,
    "sourceImage": "IMG_0077.jpg"
  }
];
