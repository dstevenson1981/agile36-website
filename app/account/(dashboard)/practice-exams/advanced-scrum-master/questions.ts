export type AdvancedScrumMasterQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

/** Parsed verbatim from public/SASM.docx (55 unique items; 2 duplicate paragraphs in source omitted). */
export const ADVANCED_SCRUM_MASTER_QUESTIONS: AdvancedScrumMasterQuestion[] = [
  {
    id: 1,
    question:
      "Which team behavior is most likely to result in relentless improvement and growth?",
    options: [
      "Constructive behaviors",
      "Management by exception",
      "Passive-defensive behaviors",
      "Aggressive-defensive behaviors",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "What is the primary purpose of using flow metrics in SAFe?",
    options: [
      "To replace the need for iteration retrospectives",
      "To allow fixed completion dates for all items in the backlog",
      "To determine individual team member performance ratings",
      "To highlight opportunities to remove delays",
    ],
    correctIndex: 3,
  },
  {
    id: 3,
    question:
      "How should a team evaluate the benefit of combining Kanban practices with their existing SAFe Scrum method?",
    options: [
      "Determine whether it provides better visibility based on the team\u2019s specific workflow",
      "Judge whether it will allow the team to skip participation in ART events, including planning and demos",
      "Assess whether it eliminates the need for any work estimation",
      "Evaluate whether it reduces the need for collaboration with other teams on shared features",
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "What is a primary characteristic of an AI agent?",
    options: [
      "It only searches internal company documents",
      "It can take actions on its own to meet objectives",
      "It is limited to answering basic questions",
      "It requires constant step-by-step human prompts",
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    question:
      "A facilitator is managing a long-standing dispute between a Product Manager and a Developer. How should they apply the dynamics component of the framework?",
    options: [
      "Analyze the historical elements of the conflict that have promoted escalation",
      "Identify which party holds the most power to force a settlement",
      "Instruct the parties to ignore past issues and focus on their current positions",
      "Assign blame for previous challenges to the secondary parties",
    ],
    correctIndex: 2,
  },
  {
    id: 6,
    question:
      "What is a primary benefit of effective collaboration across teams?",
    options: [
      "Strict separation of technical knowledge",
      "Eliminate the need for teams to communicate during the PI",
      "Reduction in the total number of team events",
      "Early and ongoing identification of dependencies",
    ],
    correctIndex: 3,
  },
  {
    id: 7,
    question:
      "What is the primary objective of an Advanced Scrum Master when facilitating team interactions within an Agile Release Train",
    options: [
      "Shifting the focus from local team success to overall train performance",
      "Documenting individual team performance for management review",
      "Limiting collaboration with other teams and stakeholders to protect the iteration",
      "Ensuring every team member follows the organization and ART's process rules",
    ],
    correctIndex: 0,
  },
  {
    id: 8,
    question:
      "What is a characteristic of a constructive team behavior during conflict?",
    options: [
      "Focusing on short-term gains over long-term goals",
      "Engaging with the conflict directly rather than ignoring it",
      "Limiting divergent opinions to maintain team harmony",
      "Adhering strictly to established team social hierarchies",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    question:
      "What is an expected outcome of fostering better cross-team collaboration?",
    options: [
      "Reduction in rework",
      "Fewer System Demos",
      "Increased technical silos",
      "Elimination of all cross-team dependencies",
    ],
    correctIndex: 0,
  },
  {
    id: 10,
    question:
      "How do high-performing teams typically approach the concept of conflict?",
    options: [
      "They avoid conflict to maintain a positive team environment",
      "They view conflict as a sign that the team is failing to align on purpose",
      "They engage in healthy conflict to explore divergent opinions and ideas",
      "They escalate all disagreements to the Business Owner for immediate resolution",
    ],
    correctIndex: 2,
  },
  {
    id: 11,
    question:
      "What is the purpose of establishing work-in-process (WIP) limits on a Kanban board",
    options: [
      "To provide a fixed date for when a specific item will be finished",
      "To prevent the system from becoming overloaded",
      "To record the total number of hours spent on each work item",
      "To ensure team members work on no more than three items at once",
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    question:
      "Which prompt element is being used when a user instructs an AI to act as a seasoned financial analyst?",
    options: ["Task", "Goal", "Detail", "Role"],
    correctIndex: 3,
  },
  {
    id: 13,
    question:
      "A Platform team provides a specialized logging tool used by ten different Agile teams. Which interaction mode is most appropriate for maintaining this tool with minimal face-to-face disruption?",
    options: ["Heroic Effort", "Collaboration", "Facilitating", "As-a-Service"],
    correctIndex: 3,
  },
  {
    id: 14,
    question:
      "What is the primary reason for a team to engage with conflict rather than ignore it?",
    options: [
      "To ensure the most senior member makes the final decision",
      "To foster a constructive culture that promotes collaboration",
      "To prevent different ideas from being shared during meetings so they finish on time",
      "To establish a passive-defensive team environment",
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    question:
      "What is the ultimate goal of the findings from the Inspect and Adapt event?",
    options: [
      "To determine which features are feasible in the upcoming PI",
      "To update legacy organizational policies for the company",
      "To identify the individuals responsible for missed objectives",
      "To add identified improvement items to the ART backlog",
    ],
    correctIndex: 3,
  },
  {
    id: 16,
    question:
      "What is the primary tool used to measure team health across Agile and technical dimensions?",
    options: [
      "A standard performance review",
      "The individual team member survey",
      "The iteration velocity chart",
      "The Team and Technical Agility assessment",
    ],
    correctIndex: 3,
  },
  {
    id: 17,
    question: "What is a core characteristic of a powerful question?",
    options: [
      "It leads to a specific correct answer",
      "It can be answered with yes or no",
      "It has an open-ended structure",
      "It contains advice in disguise",
    ],
    correctIndex: 2,
  },
  {
    id: 18,
    question:
      "What is the most effective way to evaluate a problem statement for use in the workshop?",
    options: [
      "Confirm that it offers a direct solution to the challenge",
      "Ensure it includes the problem\u2019s what, when, where, and specific impact",
      "Confirm that it identifies which individual caused the problem",
      "Verify that it aligns with the original positions of the stakeholders",
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    question:
      "What is the primary purpose of the Innovation and Planning (IP) Iteration?",
    options: [
      "Ensuring every team member achieves a high flow velocity score",
      "Allowing the Product Manager to define new features to complete before the PI ends",
      "Reserving time for teams to complete all the unfinished work from every iteration",
      "Providing a timebox for alignment, innovation, and a capacity buffer to help ensure predictability",
    ],
    correctIndex: 3,
  },
  {
    id: 20,
    question:
      "What is the relationship between Work-in-Process (WIP) and flow time?",
    options: [
      "Increasing WIP has no measurable effect on how fast work is delivered",
      "Increasing WIP requires the team to move from Scrum to Kanban to accelerate flow",
      "Increasing WIP typically increases the time it takes to finish work",
      "Increasing WIP typically decreases the time it takes to finish work",
    ],
    correctIndex: 2,
  },
  {
    id: 21,
    question:
      "When designing a Kanban board, what is the importance of establishing explicit policies?",
    options: [
      "To ensure the team is complying with corporate standards",
      "To create a shared understanding of how work moves through the board",
      "To list the legal requirements for third-party external vendors",
      "To define the official processes and procedures for the Agile team",
    ],
    correctIndex: 1,
  },
  {
    id: 22,
    question:
      "A team identifies several potential causes for a delivery delay. How should the Scrum Master apply Pareto analysis?",
    options: [
      "Have the team vote to identify which root cause has the greatest impact",
      "Categorize each cause into people, process, tools, or environment",
      "Trace the chain of causality for every cause using the Five Whys",
      "Ask the Product Owner to select the cause that is most important to stakeholders",
    ],
    correctIndex: 0,
  },
  {
    id: 23,
    question:
      "What does SAFe Scrum provide to support synchronization with the ART?",
    options: [
      "Team backlog",
      "Decentralized decision-making",
      "Built-in quality",
      "A common cadence",
    ],
    correctIndex: 3,
  },
  {
    id: 24,
    question:
      "A team wants to improve visibility into work progress based on their specific workflow. What is the best action?",
    options: [
      "Combine Kanban practices with the team\u2019s current process",
      "Eliminate iteration goals",
      "Remove the team from the ART",
      "Move from Kanban to Scrum practices",
    ],
    correctIndex: 0,
  },
  {
    id: 25,
    question:
      "What is a desired outcome of the Inspect and Adapt (I&A) event held during the IP Iteration?",
    options: [
      "Determining which primary party holds the most organizational influence",
      "Identifying and addressing systemic problems through a workshop",
      "Reframing all technical constraints as innovation opportunities",
      "Promoting the senior member\u2019s technical solution to ensure team conformity",
    ],
    correctIndex: 1,
  },
  {
    id: 26,
    question:
      "What is the benefit of moving from positions to interests during a team disagreement?",
    options: [
      "It opens up a wider range of possible solutions that satisfy everyone",
      "It encourages team members to conform to the most popular opinion",
      "It ensures that the person with the highest authority resolves the conflict",
      "It simplifies the conflict by ignoring the emotions of the people involved",
    ],
    correctIndex: 0,
  },
  {
    id: 27,
    question:
      "What is the primary purpose of reframing in conflict management?",
    options: [
      "To focus on short-term technical gains over the needs of the team to address the conflict",
      "To identify which person is responsible for a technical error to resolve the conflict",
      "To create a new way to look at a situation to encourage a neutral perception of the conflict",
      "To enforce adherence to original positions to ensure clarity and mitigate the conflict",
    ],
    correctIndex: 2,
  },
  {
    id: 28,
    question:
      "Why should a Scrum Master shift their focus from the individual team's progress to the overall performance of the Agile Release Train (ART)?",
    options: [
      "To replace the need for teams to coordinate during synchronization events",
      "To allow the team to ignore its committed objectives during the iteration",
      "To ensure that the team always finishes its work before other teams",
      "To help identify and resolve broader alignment gaps and dependencies",
    ],
    correctIndex: 3,
  },
  {
    id: 29,
    question:
      "What is the best way to use team assessment results to drive improvement?",
    options: [
      "Collaborate with the team to identify high-impact backlog items",
      "Send the results directly to senior leadership for review",
      "Ignore the data if it contradicts the current team velocity",
      "Compare the scores of different teams to find low performers",
    ],
    correctIndex: 0,
  },
  {
    id: 30,
    question:
      "Which flow property describes the total number of items currently in progress within the system?",
    options: ["Flow velocity", "Flow load", "Flow distribution", "Flow time"],
    correctIndex: 1,
  },
  {
    id: 31,
    question:
      'A Scrum Master asks, "What happened during the build that we didn\'t expect?" instead of "Why did the build fail again?" Evaluate the impact of this change in phrasing.',
    options: [
      "It is less effective because it is too brief and does not identify who made the mistake",
      "It is ineffective because it does not challenge the team\u2019s existing technical assumptions",
      "It is advice in disguise because it implies that every build failure is always unexpected",
      "It fosters a safe environment for learning by focusing on facts rather than blame",
    ],
    correctIndex: 3,
  },
  {
    id: 32,
    question:
      "A Product Owner and a Lead Developer are in conflict over a feature's scope. How should the Scrum Master facilitate a settlement?",
    options: [
      "Ask the parties to make the strongest case for their specific positions",
      "Help the parties identify options that meet their mutual underlying needs",
      "Encourage the parties to avoid the conflict to protect psychological safety",
      "Evaluate which party has more organizational power to make the final decision",
    ],
    correctIndex: 1,
  },
  {
    id: 33,
    question:
      "What is the first step a Scrum Master should take before using a public AI tool for work?",
    options: [
      "Select the appropriate AI agent for the task",
      "Define the specific role for the AI to play",
      "Check the company's data privacy and security policies",
      "Create a well-defined problem statement",
    ],
    correctIndex: 2,
  },
  {
    id: 34,
    question:
      "A team feels sabotaged because another team deactivated an API they were using. What question best moves the team from a mindset of blame toward collaborative accountability?",
    options: [
      "Why did the other team deactivate the API without telling us?",
      "How much of our work is currently blocked by this specific issue?",
      "What can we do to find a technical path forward together?",
      "Who should we contact to have the legacy API reactivated?",
    ],
    correctIndex: 2,
  },
  {
    id: 35,
    question:
      "A team is struggling with internal competition that is hindering their progress. How should the team lead apply constructive behaviors to improve the culture?",
    options: [
      "Increase pressure on the upcoming iteration goals to improve performance",
      "Focus the team on shared goal-setting and collective accomplishment",
      "Encourage rigidity in roles to prevent overlapping responsibilities",
      "Have the team select an award for the highest-performing member over the past iteration",
    ],
    correctIndex: 1,
  },
  {
    id: 36,
    question:
      "What is the primary purpose of integrating built-in quality practices into a workflow?",
    options: [
      "To provide a final quality inspection before releasing to customers",
      "To assign responsibility for quality to the testing team",
      "To increase the total number of stories delivered in an iteration",
      "To ensure value delivery meets appropriate standards throughout the entire process",
    ],
    correctIndex: 3,
  },
  {
    id: 37,
    question:
      "What is a key concept that Advanced Scrum Masters use to AI-empower their teams?",
    options: [
      "Life-cycle testing practices",
      "Traditional project management",
      "Retrieval Augmented Generation",
      "Statistical process control",
    ],
    correctIndex: 2,
  },
  {
    id: 38,
    question:
      "Why is it important for an Advanced Scrum Master to master AI basics?",
    options: [
      "To effectively manage the team's technical architecture",
      "To help teams integrate AI into their daily work effectively",
      "To take over administrative reporting from the Product Owner",
      "To replace team collaboration with automated AI agents",
    ],
    correctIndex: 1,
  },
  {
    id: 39,
    question:
      "What is a major benefit of using pairing and peer review practices?",
    options: [
      "Ensuring that each team member only works on their specific specialty",
      "Broadening team skills while detecting defects in real time",
      "Increasing the speed of individual task completion for every developer",
      "Eliminating the need for a definition of done",
    ],
    correctIndex: 1,
  },
  {
    id: 40,
    question:
      "What is the primary purpose of using team and technical agility assessments?",
    options: [
      "Assign individual performance ratings to team members",
      "Replace the need for regular iteration retrospectives",
      "Determine which teams can handle additional work",
      "Baseline the current state and identify growth opportunities",
    ],
    correctIndex: 3,
  },
  {
    id: 41,
    question:
      "What is the most critical factor to evaluate when deciding if an AI system should be granted the authority to act as an agent?",
    options: [
      "The number and completeness of internal documents pre-loaded into the search system",
      "The specific formatting style requested for the final AI summary",
      "The level of leadership accountability for the outcomes of those actions",
      "The quality of the specific prompting technique used by the team",
    ],
    correctIndex: 2,
  },
  {
    id: 42,
    question:
      "How does facilitation help improve flow across the Agile Release Train (ART)?",
    options: [
      "One team helps another acquire a new skill or overcome a specific hurdle",
      "It requires teams to work in isolated silos to prevent getting in each other\u2019s way",
      "It centralizes all technical decision-making within a single enabling team",
      "It eliminates the need for teams to participate in ART synchronization events",
    ],
    correctIndex: 0,
  },
  {
    id: 43,
    question: "What does framing primarily involve in a communication context?",
    options: [
      "Changing another person\u2019s values to match the team\u2019s values",
      "Negotiating a settlement based on organizational power and influence",
      "Uncovering the deep root cause through root cause analysis",
      "How a person presents what is important to them during a conversation",
    ],
    correctIndex: 3,
  },
  {
    id: 44,
    question:
      "A Scrum Master identifies that work items remain idle for extended periods between active steps. Which flow metric best highlights this problem?",
    options: [
      "Flow efficiency",
      "Flow velocity",
      "Flow distribution",
      "Flow time",
    ],
    correctIndex: 0,
  },
  {
    id: 45,
    question:
      "What is a primary outcome of a daily team synchronization event?",
    options: [
      "The product owner updates the long-term roadmap",
      "Teams are aligned on the most valuable work to perform",
      "Individuals receive technical training on new tools",
      "Stakeholders provide feedback on the latest solution increment",
    ],
    correctIndex: 1,
  },
  {
    id: 46,
    question:
      "Which flow accelerator is most effective for reducing wait times between different stages of work?",
    options: [
      "Reduce queue length",
      "Optimize time in the zone",
      "Get faster feedback",
      "Remediate legacy policies and practices",
    ],
    correctIndex: 0,
  },
  {
    id: 47,
    question:
      "What is a primary goal of healthy conflict management for high-performing teams?",
    options: [
      "Assigning individual accountability for conflict triggers",
      "Ensuring every team member conforms to a single perspective",
      "Achieving shared goals through collaborative problem-solving",
      "Eliminating all disagreements among team members",
    ],
    correctIndex: 2,
  },
  {
    id: 48,
    question:
      "How should a leader evaluate the level of participation in a problem-solving workshop?",
    options: [
      "Confirm that all individuals, including Product Owners and specialists, are actively contributing",
      "Record which individuals spoke the most so they can be assigned future leadership tasks",
      "Verify that senior members led the discussions in each group",
      "Check whether participants adopted aggressive-defensive behaviors to drive results",
    ],
    correctIndex: 0,
  },
  {
    id: 49,
    question:
      "Which characteristic is a primary hallmark of a high-performing team?",
    options: [
      "Individual performance goals",
      "Shared accountability",
      "Centralized leadership",
      "Independent task execution",
    ],
    correctIndex: 1,
  },
  {
    id: 50,
    question:
      "Which method is recommended if work is mostly unplanned and reactive?",
    options: [
      "SAFe Kanban",
      "Waterfall delivery",
      "SAFe Scrum",
      "Traditional project management",
    ],
    correctIndex: 0,
  },
  {
    id: 51,
    question: "What is the desired outcome of a team sync event?",
    options: [
      "Creating a rigid technical position for the upcoming iteration",
      "Identifying which party holds the most organizational power",
      "Aligning teams on the most valuable work to be done",
      "Identifying individuals who caused the most recent critical errors",
    ],
    correctIndex: 2,
  },
  {
    id: 52,
    question:
      "What is the first step in the structured Problem-Solving Workshop?",
    options: [
      "Conduct a Pareto analysis of team metrics",
      "Agree on the problem to solve",
      "Brainstorm solutions for the biggest root cause",
      "Identify improvement items for the backlog",
    ],
    correctIndex: 1,
  },
  {
    id: 53,
    question:
      "A team discovers that most of their defects are found during the final validation stage, causing significant rework and missed iteration goals. What is the best action for the team to take to improve flow?",
    options: [
      "Increase the timebox for the final validation phase to ensure more thorough checks",
      "Assign a dedicated quality specialist to review all work before it reaches validation",
      "Stop performing peer reviews to save time for more rigorous final testing",
      "Shift learning left by integrating testing and feedback earlier in the process",
    ],
    correctIndex: 3,
  },
  {
    id: 54,
    question: "What does self-direction allow a high-performing team to do?",
    options: [
      "Assign work to team members based on their specific skills",
      "Value the team\u2019s success over the Agile Release Train\u2019s success",
      "Manage its own work and break down complex tasks",
      "Wait for the Scrum Master to resolve all technical hurdles",
    ],
    correctIndex: 2,
  },
  {
    id: 55,
    question:
      "A team consistently meets its own delivery goals but refuses to help a struggling partner team on the same Release Train. Which characteristic of a high-performing team is currently missing?",
    options: [
      "Healthy conflict",
      "Self-direction",
      "Shared accountability",
      "Built-in quality",
    ],
    correctIndex: 2,
  },
];
