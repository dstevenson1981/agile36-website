export type SsmAiQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

/**
 * AI-Empowered SAFe Scrum Master exam, transcribed from class screenshots.
 * Wording and the selected answer are kept as photographed.
 * Questions 18, 25, and 39 were not in the photo set.
 * Question 2 had no bubble selected; Deep learning is keyed from the definition.
 * Questions 11, 17, 28, 34, and 38 were re-keyed to the correct option.
 */
export const SSM_AI_QUESTIONS: SsmAiQuestion[] = [
  {
    id: 1,
    question:
      'Team A wants to use the IP Iteration to continue their "usual work." What is one benefit the Scrum Master/Team Coach could share with the team about using the IP Iteration as intended?',
    options: [
      'The team can participate in hackathons',
      'The team can find time to participate in ad hoc groups',
      'The team can perform needed system maintenance',
      'The team can consider additional retrospective action items',
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question:
      'Which subset of Artificial Intelligence uses multi-layered neural networks inspired by the human brain to process complex patterns in unstructured data?',
    options: ['Prompt Engineering', 'Machine Learning', 'Deep learning', 'Generative AI'],
    correctIndex: 2,
  },
  {
    id: 3,
    question: 'Who are important attendees of the PI System Demo?',
    options: ['Portfolio Management', 'Board Members', 'Feature Owners', 'Business Owners'],
    correctIndex: 3,
  },
  {
    id: 4,
    question: 'What is one responsibility of a Scrum Master/Team Coach?',
    options: ['Testing the system', 'Prioritizing the backlog', 'Improving flow', 'Demoing the system'],
    correctIndex: 2,
  },
  {
    id: 5,
    question: 'What is one way uncommitted objectives help Agile Teams make a plan for the PI?',
    options: [
      'Ensuring the team has additional development options',
      'Creating an opportunity for teams to take on more challenging work',
      'Maintaining the predictability of achieving the objectives',
      'Generating additional ways to measure team progress',
    ],
    correctIndex: 2,
  },
  {
    id: 6,
    question: 'What is one benefit of PI Planning?',
    options: [
      'It maximizes team capacity',
      'It fosters cross-team dependencies',
      'It allows for faster decision-making',
      'It aligns the ART to established DevOps practices',
    ],
    correctIndex: 2,
  },
  {
    id: 7,
    question:
      'What is one anti-pattern that emerges when teams do not spend enough time refining the backlog?',
    options: [
      'Teams arrive at Iteration Planning without specified goals',
      'Teams enter new Iterations without enough Stories prepared',
      'Teams enter retrospectives without improvement ideas',
      'Teams arrive at a Team Sync without progress to share',
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    question: 'What is one way a Scrum Master/Team Coach can support Iteration Execution?',
    options: [
      'Assign story points for each User Story',
      'Facilitate team events',
      'Prioritize the team backlog',
      'Build value stream maps',
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    question:
      'How can a Scrum Master use AI to specifically augment their "Coaching and Team Health" responsibility?',
    options: [
      'By allowing an AI agent to autonomously resolve conflicts between different team members',
      'By replacing the weekly Team Sync meeting with a daily AI-generated productivity score',
      'By using AI to suggest coaching questions or summarize sentiments from team surveys',
      'By using AI to automatically assign business value to team objectives during PI Planning',
    ],
    correctIndex: 2,
  },
  {
    id: 10,
    question: 'How can teams use Iteration planning to stay aligned on their work?',
    options: [
      'By sharing Stories that could be pairing opportunities',
      'By reviewing its processes before the next iteration',
      'By committing to a set of goals to be delivered',
      'By agreeing on a meeting timebox',
    ],
    correctIndex: 2,
  },
  {
    id: 11,
    question:
      'During the first team breakout, where draft plans are created, what is the best practice for the Scrum Master regarding risks?',
    options: [
      'Ensuring that all identified risks are fully ROAMed and categorized before the draft plan review',
      'Identifying as many risks and dependencies as possible so that each can be addressed in the management review',
      'Assigning business values to the risks so that prioritization can be given to those that need to be solved first',
      "Immediately de-scoping any features that present a high level of risk to the team's iterations",
    ],
    correctIndex: 0,
  },
  {
    id: 12,
    question: 'What does the measurement aspect of the CALMR approach primarily entail?',
    options: [
      'Measuring the flow through the continuous delivery pipeline and implementing full-stack telemetry',
      'Measuring the individual performance and velocity of each developer during an iteration',
      'Measuring progress by requiring manual status reporting and detailed timesheets for all DevOps activities',
      'Tracking only the number of critical defects found by a customer in production post-release',
    ],
    correctIndex: 0,
  },
  {
    id: 13,
    question: 'What is one way a servant leader can support team members in decision-making?',
    options: [
      'Perform regular retrospectives on behalf of the team',
      'Support teams in affinity mapping their concerns',
      'Identify solutions to problems the team surfaces',
      'Give each team member the opportunity to contribute',
    ],
    correctIndex: 3,
  },
  {
    id: 14,
    question:
      'What is one recommended practice for Scrum Masters/Team Coaches when coaching teams on presenting a draft plan at PI Planning?',
    options: [
      'Align on how the team will answer questions about their proposed objectives',
      'Ensure the team has Stories written for the first two Iterations of the increment',
      'Secure support from other teams on how work will be shared and completed',
      'Identify as many risks and dependencies as possible for the management review',
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    question: 'What is one element on the Scrum Master/Team Coach responsibility wheel?',
    options: [
      'Facilitate an Agile Team charter workshop',
      'Facilitate Coach Sync',
      'Facilitate PI Planning',
      'Facilitate a Community of Practice',
    ],
    correctIndex: 2,
  },
  {
    id: 16,
    question: 'What is one Agile development value?',
    options: [
      'Customer collaboration over contract negotiation',
      'Working teams over busy individuals',
      'Risk-taking over process development',
      'Healthy interactions over detailed plans',
    ],
    correctIndex: 0,
  },
  {
    id: 17,
    question: 'What is the definition of a "Hallucination" in the context of common AI risks?',
    options: [
      'Sensitive or confidential information is unintentionally exposed to unauthorized third-party vendors',
      'The AI system fails to operate entirely when it encounters data that was not in its training sets',
      'AI systems exhibit unfair or discriminatory outcomes based on the datasets they were trained on',
      'AI creates outputs that seem confident and plausible but are factually incorrect or make no sense',
    ],
    correctIndex: 3,
  },
  {
    id: 19,
    question:
      'During the "Prepare, Prompt, Refine" iterative cycle, what is the goal of the "Refine" stage?',
    options: [
      'To select the appropriate deep learning model architecture needed to handle the specified task',
      'To identify the specific business problem or task the user needs the AI to perform',
      "To critically evaluate the AI's response and provide follow-up instructions to improve the result",
      'To manually label the organizational datasets before they are put into the prompt',
    ],
    correctIndex: 2,
  },
  {
    id: 20,
    question: 'During which of the following Agile Team events do team members estimate relative story sizes?',
    options: ['Iteration Review', 'Backlog Refinement', 'Iteration Planning', 'Iteration Retrospective'],
    correctIndex: 1,
  },
  {
    id: 21,
    question: 'What is one benefit of holding regular system demos?',
    options: [
      'Deliverables are reviewed with stakeholders',
      'Execution can be measured across the whole ART',
      'Problems can be escalated to ART leadership',
      'Bottlenecks can be identified early by the teams',
    ],
    correctIndex: 0,
  },
  {
    id: 22,
    question: 'What is one way a Scrum Master/Team Coach can help improve ART performance?',
    options: [
      'Facilitate cross-team collaboration',
      'Communicate the PI Planning agenda',
      'Run an Agile Team charter workshop',
      'Prioritize the ART backlog for PI Planning',
    ],
    correctIndex: 0,
  },
  {
    id: 23,
    question: 'What is one benefit of having an IP Iteration every PI?',
    options: [
      'It creates a timeboxed opportunity for team growth',
      'It creates a guardrail for teams working too hard',
      'It creates a chance for teams to manage quality',
      'It creates an estimating guard band for meeting PI objectives',
    ],
    correctIndex: 3,
  },
  {
    id: 24,
    question:
      "What is the primary purpose of the management review and problem-solving meeting held at the end of day one after teams present their draft plans and risks?",
    options: [
      "To assign a business value from 1 to 10 to each team's draft PI objectives",
      'To conduct the final confidence vote for both the individual teams and the Agile Release Train',
      'To finalize the capacity allocation for the upcoming iterations to ensure a healthy balance of work',
      "To adjust the scope and objectives based on the day's planning, such as resolving bottlenecks or de-scoping features",
    ],
    correctIndex: 3,
  },
  {
    id: 26,
    question: 'What is one anti-pattern of the Inspect and Adapt?',
    options: [
      'Not enough team members attend the PI System demo',
      'No actionable improvement Features are created',
      'Too many ideas enter the problem-solving workshop',
      'Only one problem is identified by each team in the retrospective',
    ],
    correctIndex: 1,
  },
  {
    id: 27,
    question:
      'What is the recommended best practice for a Scrum Master when using AI to draft stakeholder communications or summaries?',
    options: [
      "Use the most complex technical language possible to demonstrate the AI's advanced capabilities",
      "Avoid making any manual edits to the AI's response to maintain the system's objective tone",
      'Send the AI-generated output immediately to ensure the fastest possible time-to-market',
      'Review the AI output for accuracy, as AI responses sound true even if errors exist',
    ],
    correctIndex: 3,
  },
  {
    id: 28,
    question: 'What is one practice Scrum Masters/Team Coaches can use to facilitate conflict management?',
    options: [
      'Encourage team members to resolve conflicts on their own',
      'Enforce working agreements',
      'Escalate conflicts to the Release Train Engineer',
      'Implement a formal complaints system',
    ],
    correctIndex: 0,
  },
  {
    id: 29,
    question: 'What is one potential root cause of Team Sync anti-patterns?',
    options: [
      'Occasional conflict within the team',
      'Frequent verification and integration during the Iteration',
      'Lack of collective ownership',
      'Miscommunication between team members',
    ],
    correctIndex: 2,
  },
  {
    id: 30,
    question: 'According to SAFe, what is one output of a successful Iteration Retrospective?',
    options: [
      'Iteration Goals',
      'Updated dependencies between Stories',
      'Updated ART metrics',
      'Improvement Stories',
    ],
    correctIndex: 3,
  },
  {
    id: 31,
    question:
      'During which of the following stages of team development do team members stop focusing on their own goals and begin focusing on developing better ways of working together?',
    options: ['Transforming', 'Norming', 'Storming', 'Forming'],
    correctIndex: 1,
  },
  {
    id: 32,
    question:
      'Which pillar of Responsible AI ensures that AI solutions provide transparency and documentation so humans can understand how outputs are formulated?',
    options: ['Trustworthy AI', 'Explainable AI', 'Human-centric AI', 'Scalable AI'],
    correctIndex: 1,
  },
  {
    id: 33,
    question: 'What is the first step of the problem-solving workshop?',
    options: [
      'Reframe the problem based on the biggest root cause of the underlying issue',
      'Perform a root-cause analysis of the problem',
      'Agree on the problem to solve',
      'Identify the biggest root cause of the underlying problem',
    ],
    correctIndex: 2,
  },
  {
    id: 34,
    question:
      'Team A works collaboratively on new functionality for a customer application. The acceptance criteria have each been minimally met. Team A decides to release the functionality with a method for collecting direct customer feedback. Which of the following high-performing team characteristics is Team A demonstrating?',
    options: [
      'Balancing abilities on the team with the challenge of the work',
      'Focusing on success over trying to avoid failures',
      'Taking appropriate risks without fear of failure',
      'Using regular feedback loops built into the learning cycle',
    ],
    correctIndex: 3,
  },
  {
    id: 35,
    question:
      'Three members of Team C created a new workflow to speed up the testing process. They spent an entire Iteration designing the process but discovered, just before implementation, that the system could not support the workflow. The rest of the team was excited to hear what was learned from the failed experiment. Which of the following characteristics of a high-performing Agile Team is Team C demonstrating?',
    options: [
      'A safe environment for taking risks without fear of embarrassment or criticism',
      'Enjoying the work and working together',
      'Accountability to each other and the organization for reliably completing quality work',
      'Mutual trust that allows for both healthy conflict and reliance on others',
    ],
    correctIndex: 0,
  },
  {
    id: 36,
    question: 'What is one way to ensure a team is holding successful Iteration Reviews and demos?',
    options: [
      'The team ensures it completes every Story',
      'The team shares improving metrics based on data from the previous iteration review',
      'The team demos working and functional updates from the previous iteration review',
      'The team efficiently works together, based on individual strengths, to appropriately prepare for demos',
    ],
    correctIndex: 2,
  },
  {
    id: 37,
    question: 'What is the intended value of the Backlog Refinement event?',
    options: [
      'The team is able to prepare requirements for Iteration Planning',
      'The team aligns on the progress of Iteration Goals',
      'The team is able to commit to a set of goals to be delivered in the Iteration',
      'The team reviews and improves processes before the next Iteration',
    ],
    correctIndex: 0,
  },
  {
    id: 38,
    question: 'What is one Scrum value that can help Agile Teams create transparency?',
    options: ['Empathy', 'Respect', 'Persistence', 'Communication'],
    correctIndex: 1,
  },
  {
    id: 40,
    question:
      'What can a Scrum Master/Team Coach recommend to a team that is showing signs of burnout, not addressing increasing technical debt, and acting out of urgency rather than considering innovation?',
    options: [
      'A communicative retrospective at the end of each Iteration',
      'A careful plan at the beginning of each Iteration',
      'A constructive IP Iteration at the end of each PI',
      'A collective Iteration Review and a demo of each Iteration',
    ],
    correctIndex: 2,
  },
  {
    id: 41,
    question: 'According to SAFe, which of the following metrics are reported at the Inspect and Adapt event?',
    options: [
      'ART predictability measure',
      'Cumulative value measure',
      'ART cycle velocity',
      'Cumulative value rate',
    ],
    correctIndex: 0,
  },
  {
    id: 42,
    question: 'How does the CALMR approach recommend implementing lean flow to accelerate delivery?',
    options: [
      'By relying on large infrequent batch releases to ensure maximum stability and minimum disruption',
      'By keeping batch sizes small, limiting work in process (WIP), and providing extreme visibility',
      'By bypassing the team backlog and assigning emergent priorities directly to developers to reduce queues',
      'By maximizing capacity utilization and ensuring every team member is always booked with tasks',
    ],
    correctIndex: 1,
  },
  {
    id: 43,
    question:
      "When facilitating a team's drafting of PI plans in the first breakout, which of the following is considered a common anti-pattern for a Scrum Master?",
    options: [
      'Allowing the team to spend too much time analyzing each story, resulting in no plan or only a partial plan at the end of the timebox',
      'Ensuring the team identifies as many risks and dependencies as possible so each can be reviewed by management',
      'Actively facilitating coordination with other teams to manage interdependencies and secure necessary subject matter experts',
      'Acting as a request buffer to protect teams that have a high volume of dependencies to manage',
    ],
    correctIndex: 0,
  },
  {
    id: 44,
    question: 'According to SAFe, what is one Iteration Retrospective anti-pattern?',
    options: [
      'The team only shares issues that do not have a measurable outcome',
      'The team only brings up issues that are outside of their control to address',
      'The team only shares issues that will have little impact on any real improvements',
      'The team only shares issues that are too big to be solved',
    ],
    correctIndex: 1,
  },
  {
    id: 45,
    question:
      'What is one recommended practice for Scrum Masters/Team Coaches when facilitating Iteration Review?',
    options: [
      'Begin to consider how and what to demo in Iteration Planning',
      'Rotate the team member who demos each Iteration to encourage full team member buy-in and project ownership',
      'Encourage team members to each prepare a brief to present at the review',
      'Limit participants to just core team members working on the project',
    ],
    correctIndex: 0,
  },
];
