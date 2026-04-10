export type ScrumMasterQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

/** SAFe Scrum Master practice questions (in-house item bank). */
export const SCRUM_MASTER_QUESTIONS: ScrumMasterQuestion[] = [
  {
    id: 1,
    question:
      'What is one anti-pattern that emerges when teams do not spend enough time refining the backlog?',
    options: [
      'Teams enter retrospectives without improvement ideas',
      'Teams arrive to Team Sync without progress to share',
      'Teams arrive to Iteration Planning without specified goals',
      'Teams enter new Iterations without enough Stories prepared',
    ],
    correctIndex: 3,
  },
  {
    id: 2,
    question: 'According to SAFe, what is one output of a successful Iteration Retrospective?',
    options: [
      'Iteration Goals',
      'Updated ART metrics',
      'Updated dependencies between Stories',
      'Improvement Stories',
    ],
    correctIndex: 3,
  },
  {
    id: 4,
    question: 'What is the intended value of the Backlog Refinement event?',
    options: [
      'The team is able to commit to a set of goals to be delivered in the Iteration',
      'The team aligns on the progress of Iteration Goals',
      'The team is able to prepare requirements for Iteration Planning',
      'The team reviews and improves processes before the next Iteration',
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    question: 'What is one way a Scrum Master/Team Coach can help improve ART performance?',
    options: [
      'Run an Agile Team charter workshop',
      'Facilitate cross-team collaboration',
      'Communicate the PI Planning agenda',
      'Prioritize the ART backlog for PI Planning',
    ],
    correctIndex: 1,
  },
  {
    id: 6,
    question: 'What is one element on the Scrum Master/Team Coach responsibility wheel?',
    options: [
      'Facilitate a Community of Practice',
      'Facilitate PI Planning',
      'Facilitate Coach Sync',
      'Facilitate an Agile Team charter workshop',
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    question: 'According to SAFe, which of the following types of work should fit into one Iteration for one team?',
    options: ['Stories', 'Features', 'Epics', 'Tasks'],
    correctIndex: 0,
  },
  {
    id: 8,
    question: 'What is one way to ensure a team is holding successful Iteration Reviews and demos?',
    options: [
      'The team ensures they complete every Story',
      'The team demos working functionality',
      'The team shares improving metrics',
      'The team swarms to prepare for demos',
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    question:
      'What is one recommended practice for Scrum Masters/Team Coaches when facilitating Iteration Review?',
    options: [
      'Begin to consider how and what to demo in Iteration Planning',
      'Limit participants to just the team members',
      'Encourage team members to spend 3+ hours preparing',
      'Encourage the team member with the best presentation skills to demo each Iteration',
    ],
    correctIndex: 0,
  },
  {
    id: 10,
    question: 'What is one characteristic of high-performing teams?.',
    options: [
      'Having fun with the work and with each other',
      'Having similar backgrounds and points of view',
      'Having shared interests outside of work',
      'Having a competitive drive between team members',
    ],
    correctIndex: 0,
  },
  {
    id: 11,
    question: 'Which of the following events aligns teams on a train?',
    options: ['Coach Sync', 'Architect Sync', 'PI Planning', 'Iteration Planning'],
    correctIndex: 2,
  },
  {
    id: 12,
    question:
      'What is one example of Scrum Masters/Team Coaches helping without diminishing the commitment of others?',
    options: [
      'Coaching the team to refrain from relying on external resources',
      'Facilitating necessary meetings for the team',
      'Demoing the team\'s completed work',
      'Encouraging handoffs so each team member contributes to the work',
    ],
    correctIndex: 1,
  },
  {
    id: 13,
    question: 'What is one way a Scrum Master/Team Coach can support Iteration Execution?',
    options: [
      'Facilitate team events',
      'Build value stream maps',
      'Assign story points for each User Story',
      'Prioritize the team backlog',
    ],
    correctIndex: 0,
  },
  {
    id: 14,
    question: 'What is one Scrum value that can help Agile Teams create transparency?',
    options: ['Empathy', 'Persistence', 'Respect', 'Communication'],
    correctIndex: 2,
  },
  {
    id: 15,
    question: 'What is one benefit of holding regular system demos?',
    options: [
      'Execution can be measured across the whole ART',
      'Bottlenecks can be identified early by the teams',
      'Problems can be escalated to ART leadership',
      'Deliverables are reviewed with stakeholders',
    ],
    correctIndex: 3,
  },
  {
    id: 16,
    question: 'What is one way uncommitted objectives help Agile Teams make a plan for the PI?',
    options: [
      'They generate additional ways to measure team progress',
      'They ensure the team has additional development options',
      'They maintain the predictability of achieving the objectives',
      'They create an opportunity for teams to take on harder work',
    ],
    correctIndex: 2,
  },
  {
    id: 17,
    question:
      'According to SAFe, which of the following key traits of effective Scrum Masters/Team Coaches is crucial for team members to accept coaching?',
    options: ['Empathy', 'Agreeableness', 'Fairness', 'Optimism'],
    correctIndex: 0,
  },
  {
    id: 18,
    question: 'Who are important attendees to the PI System Demo?',
    options: [
      'Board Members',
      'Business Owners',
      'Portfolio Management',
      'Feature Owners',
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    question: 'What is one example of an Agile Team development practice?',
    options: [
      'Writing requirements',
      'Tracking regulations',
      'Demoing frequently',
      'Visualizing effort',
    ],
    correctIndex: 2,
  },
  {
    id: 20,
    question: 'What is the first step of the problem-solving workshop?',
    options: [
      'Restate the new problem for the biggest root cause',
      'Agree on the problem to solve',
      'Identify the biggest root cause',
      'Perform a root-cause analysis',
    ],
    correctIndex: 1,
  },
  {
    id: 21,
    question: 'What is one Agile development value?',
    options: [
      'Working teams over busy individuals',
      'Healthy interactions over detailed plans',
      'Risk-taking over process development',
      'Customer collaboration over contract negotiation',
    ],
    correctIndex: 3,
  },
  {
    id: 22,
    question: 'During which of the following Agile Team events do team members estimate relative story sizes?',
    options: [
      'Iteration Retrospective',
      'Iteration Review',
      'Iteration Planning',
      'Backlog Refinement',
    ],
    correctIndex: 3,
  },
  {
    id: 23,
    question:
      'Team A wants to use the IP Iteration to continue their \'usual work.\' What is one benefit the Scrum Master/Team Coach could share with the team about using the IP Iteration as intended?',
    options: [
      'The team can participate in hackathons',
      'The team can perform needed system maintenance',
      'The team can find time to participate in ad hoc groups',
      'The team can consider additional retrospective action items',
    ],
    correctIndex: 0,
  },
  {
    id: 24,
    question:
      'What is one recommended practice for Scrum Masters/Team Coaches when coaching teams on presenting a draft plan at PI Planning?',
    options: [
      'Identify as many risks and dependencies as possible for the management review',
      'Ensure the team has Stories written for the first two Iterations of the increment',
      'Align on how the team will answer questions about their proposed objectives',
      'Secure support from other teams on how work will be shared and completed',
    ],
    correctIndex: 0,
  },
  {
    id: 25,
    question: 'What is one responsibility of a Scrum Master/Team Coach?',
    options: [
      'Improving flow',
      'Prioritizing the backlog',
      'Testing the system',
      'Demoing the system',
    ],
    correctIndex: 0,
  },
  {
    id: 26,
    question: 'What is one potential root cause of Team Sync anti-patterns?',
    options: [
      'Occasional conflict within the team',
      'Frequent verification and integration during the Iteration',
      'Lack of collective ownership',
      'Overcommunication between team members',
    ],
    correctIndex: 2,
  },
  {
    id: 27,
    question:
      'Team A has decided to use the IP Iteration to continue the finalizing Feature delivery work they have been working on for the past two Iterations. What is one effect Team A might experience by continuing to stay heads-down rather than using the IP Iteration as intended?',
    options: [
      'Individual team members could lose an opportunity to consider their team work more holistically',
      'Individual team members could lose an opportunity to attend a professional development class',
      'Individual team members could lose an opportunity to learn from one another',
      'Individual team members could lose an opportunity to refresh their motivation',
    ],
    correctIndex: 2,
  },
  {
    id: 28,
    question: 'What is one element of the CALMR approach to DevOps?',
    options: [
      'Activate the knowledge worker',
      'Lean flow accelerates delivery',
      'Relentlessly reduce risk',
      'Maximize work in process',
    ],
    correctIndex: 1,
  },
  {
    id: 29,
    question: 'What is one purpose of Iteration Goals?',
    options: [
      'To identify what to present in System Demo',
      'To align team members to common objectives',
      'To get feedback from the organization',
      'To communicate which Stories will be completed during the Iteration',
    ],
    correctIndex: 1,
  },
  {
    id: 30,
    question: 'What is one way a servant leader can support team members in decision-making?',
    options: [
      'Support teams in affinity mapping their concerns',
      'Identify solutions to problems the team surfaces',
      'Give each team member the opportunity to contribute',
      'Perform regular retrospectives on behalf of the team',
    ],
    correctIndex: 2,
  },
  {
    id: 31,
    question:
      'Team A works collaboratively on new functionality for a customer application. The acceptance criteria have each been minimally met. Team A decides to release the functionality with a method for collecting direct customer feedback. Which of the following high-performing team characteristics is Team A demonstrating?',
    options: [
      'Balancing abilities on the team with the challenge of the work',
      'Focusing on success over trying to avoid failures',
      'Taking appropriate risks without fear of failure',
      'Using regular feedback loops built into the learning cycle',
    ],
    correctIndex: 2,
  },
  {
    id: 32,
    question:
      'According to SAFe, which of the following metrics are reported at the Inspect and Adapt event?',
    options: [
      'ART predictability measure',
      'Cumulative value rate',
      'ART cycle velocity',
      'Cumulative value measure',
    ],
    correctIndex: 0,
  },
  {
    id: 33,
    question: 'What is a team\'s primary goal in an Iteration?',
    options: [
      'Maintaining steady team syncs across the Iteration',
      'Delivering working functionality at the end of the Iteration',
      'Managing scope at the start of the Iteration',
      'Sharing progress with the organization during the Iteration',
    ],
    correctIndex: 1,
  },
  {
    id: 34,
    question: 'What is one benefit of PI Planning?',
    options: [
      'Allows for faster decision-making',
      'It aligns the ART to established DevOps practices',
      'It maximizes team capacity',
      'It fosters cross-team dependencies',
    ],
    correctIndex: 0,
  },
  {
    id: 35,
    question:
      'Three members of Team C created a new workflow to speed up the testing process. They spent an entire Iteration designing the process but discovered, just before implementation, that the system could not support the workflow. The rest of the team was excited to hear what was learned from the failed experiment. Which of the following characteristics of a high-performing Agile Team is Team C demonstrating?',
    options: [
      'Accountability to each other and the organization for reliably completing quality work',
      'A safe environment for taking risks without fear of embarrassment or criticism',
      'Mutual trust that allows for both healthy conflict and reliance on others',
      'Enjoying the work and working together',
    ],
    correctIndex: 1,
  },
  {
    id: 36,
    question: 'What is one trait of a servant leader?',
    options: [
      'Persuades rather than using authority',
      'Solves problems on behalf of the team',
      'Deflects information that could change the team\'s work',
      'Determines the day-to-day activities for the team',
    ],
    correctIndex: 0,
  },
  {
    id: 37,
    question:
      'How does the \'C\' in the CALMR approach to DevOps help teams manage tensions caused by differing needs?',
    options: [
      'By identifying a collaborative approach to deployment',
      'By establishing communication between different teams',
      'By committing to a balance of speed and quality',
      'By creating a culture of shared responsibility',
    ],
    correctIndex: 3,
  },
  {
    id: 38,
    question: 'What is one anti-pattern of the Inspect and Adapt?',
    options: [
      'Too many ideas enter the problem-solving workshop',
      'Only one problem is identified by each team in the retrospective',
      'Not enough team members attend the PI System demo',
      'No actionable improvement Features are created',
    ],
    correctIndex: 3,
  },
  {
    id: 39,
    question:
      'What can a Scrum Master/Team Coach recommend to a team that is showing signs of burnout, not addressing increasing technical debt, and acting out of urgency rather than considering innovation?',
    options: [
      'A communicative retrospective at the end of each Iteration',
      'A collective Iteration Review and demo each Iteration',
      'A careful plan at the beginning of each Iteration',
      'A constructive IP Iteration at the end of each PI',
    ],
    correctIndex: 3,
  },
  {
    id: 40,
    question: 'What is one benefit of having an IP Iteration every PI?',
    options: [
      'It creates an estimating guard band for meeting PI objectives',
      'It creates a guardrail for teams working too hard',
      'It creates a timeboxed opportunity for team growth',
      'It creates a chance for teams to manage quality',
    ],
    correctIndex: 0,
  },
  {
    id: 41,
    question: 'According to SAFe, what is one Iteration Retrospective anti-pattern?',
    options: [
      'The team only shares issues that cannot be measured',
      'The team only brings up issues that are outside of their control to address',
      'The team only shares issues that are too small to result in real improvement',
      'The team only shares issues that are too big to be solved',
    ],
    correctIndex: 1,
  },
  {
    id: 42,
    question: 'What is one practice Scrum Masters/Team Coaches can use to facilitate conflict management?',
    options: [
      'Encourage team members to resolve conflicts on their own',
      'Enforce working agreements',
      'Implement a formal complaints system',
      'Escalate conflicts to the Release Train Engineer',
    ],
    correctIndex: 1,
  },
  {
    id: 43,
    question:
      'During which of the following stages of team development do team members stop focusing on their own goals and begin focusing on developing better ways of working together?',
    options: ['Transforming', 'Storming', 'Forming', 'Norming'],
    correctIndex: 3,
  },
  {
    id: 44,
    question: 'What is one practice Scrum Masters/Team Coaches can use to run successful meetings?',
    options: [
      'Maintain vague agendas to allow for any urgent issues',
      'Schedule meetings around the Product Owner to ensure they are able to make final decisions',
      'Allow individuals to override timeboxes to ensure full discussions',
      'Leave meetings with clear action items',
    ],
    correctIndex: 3,
  },
  {
    id: 45,
    question: 'How can teams use Iteration planning to stay aligned on their work?',
    options: [
      'By sharing Stories that could be pairing opportunities',
      'By agreeing on a meeting timebox',
      'By committing to a set of goals to be delivered',
      'By reviewing its processes before the next iteration',
    ],
    correctIndex: 2,
  },
];
