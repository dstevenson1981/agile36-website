export type SafeForTeamsQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

/** AI-Empowered SAFe for Teams (SP) Pro practice questions. */
export const SAFE_FOR_TEAMS_QUESTIONS: SafeForTeamsQuestion[] = [
  {
    id: 1,
    question: 'Which of the following basic quality practices applies to all teams?',
    options: [
      'Rapid prototyping',
      'Modeling and simulation',
      'Agile architecture',
      'Collective ownership',
    ],
    correctIndex: 3,
  },
  {
    id: 2,
    question: 'Which of the following is an output of the PI Planning process?',
    options: ['Actual PI Business Value', 'PI Objectives', 'PI Vision', 'PI Goals'],
    correctIndex: 1,
  },
  {
    id: 3,
    question: 'What is one key component of a Feature?',
    options: ['Business plan', 'Key stakeholders', 'Benefit hypothesis', 'Release plan'],
    correctIndex: 2,
  },
  {
    id: 4,
    question: 'What is one result from Iteration Planning for SAFe Scrum Teams?',
    options: [
      'Iteration demo',
      'Iteration estimate',
      'Iteration goals',
      'Iteration sequencing',
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    question: 'What is one method for reducing queue length?',
    options: [
      'Leave capacity for newly emerging priorities',
      'Increase the size of work',
      'Lengthen Iteration timeboxes',
      'Commit to deliver value by a specific date',
    ],
    correctIndex: 0,
  },
  {
    id: 6,
    question: "What is one of the Product Owner's responsibilities?",
    options: [
      'To facilitate team meetings and drive Agile behavior',
      'To manage and prioritize the Team Backlog',
      'To foster adoption of Agile technical practices',
      'To foster normalized estimating within the team',
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    question:
      'Which of the following work types is defined as "a short description of a small piece of desired functionality written in the user\'s language"?',
    options: ['User Story', 'User Requirement', 'User Criteria', 'User Feature'],
    correctIndex: 0,
  },
  {
    id: 8,
    question:
      'Which of the following statements describes the balance between emergent design and intentional architecture when building in quality?',
    options: [
      'It is required for speed of value delivery and Solution Intent',
      'It is required for implementation speed and maturity',
      'It is required for backlog speed and designed refinement',
      'It is required for speed of development and maintainability',
    ],
    correctIndex: 0,
  },
  {
    id: 9,
    question: 'Which of the following Story components captures details on testing for completion?',
    options: ['User voice', 'Story map', 'Release plan', 'Acceptance criteria'],
    correctIndex: 3,
  },
  {
    id: 10,
    question: 'Which of the following types of work is found within the Agile Team Backlog?',
    options: ['Capabilities', 'User Stories', 'Features', 'Epics'],
    correctIndex: 1,
  },
  {
    id: 11,
    question:
      'Which of the following SAFe Lean-Agile principles involves delivering a continuous flow of value to customers in the shortest sustainable lead time?',
    options: [
      'Decentralized decision-making',
      'Take an economic view',
      'Apply systems thinking',
      'Make value flow without interruptions',
    ],
    correctIndex: 3,
  },
  {
    id: 12,
    question:
      'Which of the following roles act as proxies for the customer in representing their needs to the teams?',
    options: ['Executive roles', 'Architecture roles', 'Developer roles', 'Product roles'],
    correctIndex: 3,
  },
  {
    id: 13,
    question: 'What is the purpose of building a continuous delivery pipeline?',
    options: [
      'To identify key stakeholders within the system architecture',
      'To prioritize development speed over system stability',
      'To deliver new functionality more frequently than with traditional processes',
      'To prioritize system stability over development speed',
    ],
    correctIndex: 2,
  },
  {
    id: 14,
    question: 'What is an example of an ART event?',
    options: ['Coach Sync', 'Innovation and Planning', 'Iteration review', 'Team Sync'],
    correctIndex: 0,
  },
  {
    id: 15,
    question:
      'Which of the following activities does SAFe recommend as the first activity of the Inspect and Adapt event?',
    options: [
      'Retrospective and problem-solving workshop',
      'Agreement on the problems to solve',
      'Quantitative measurement',
      'PI System Demo',
    ],
    correctIndex: 3,
  },
  {
    id: 16,
    question: 'Why is it important to spend time "in the zone"?',
    options: [
      'To reduce queue lengths',
      'To maximize ideal productivity time',
      'To make work in process visible',
      'To refine productive collaboration',
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    question: 'What is the purpose of the Iteration review?',
    options: [
      'To identify where there is too much work in the system',
      'To work on solutions for backlog items',
      "To measure the team's progress",
      'To forecast where work is estimated for the upcoming PIs',
    ],
    correctIndex: 2,
  },
  {
    id: 18,
    question:
      'Which of the following events does SAFe recommend running regularly throughout the PI?',
    options: ['ART Sync', 'Business Owner Sync', 'Design Sync', 'Product Sync'],
    correctIndex: 0,
  },
  {
    id: 19,
    question:
      'Which of the following SAFe Core Values involves coaching aspiring developers to grow their skillsets and fill new roles throughout the organization?',
    options: ['Respect for People', 'Alignment', 'Transparency', 'Built-In Quality'],
    correctIndex: 0,
  },
  {
    id: 20,
    question: 'What is one way to understand current WIP in a system?',
    options: [
      'Split Stories',
      'Make current work visible',
      'Size Stories smaller',
      'Pair to complete the work faster',
    ],
    correctIndex: 1,
  },
  {
    id: 21,
    question: 'What does the "C" represent in the CALMR approach to DevOps?',
    options: ['Culture', 'Cycle-time', 'Completion', 'Continuous Integration'],
    correctIndex: 0,
  },
  {
    id: 22,
    question:
      'Which of the following SAFe Agile Team types relies on a continually-refined Team Backlog as the primary input to drive value delivery?',
    options: [
      'SAFe Team Kanban',
      'SAFe Co-located Team',
      'SAFe Epic Team',
      'SAFe Lean Team',
    ],
    correctIndex: 0,
  },
  {
    id: 23,
    question: 'Which of the following statements describes the concept of "shift-left"?',
    options: [
      'Write tests at the end of development to capture potential failures discovered throughout the development process',
      'Perform testing and validation activities in the production environment under real-world conditions',
      'Move testing and validation activities earlier in the work cycle to get faster or continuous feedback',
      'Run two nearly identical production environments, moving users between the two to make small changes to one or the other',
    ],
    correctIndex: 2,
  },
  {
    id: 24,
    question:
      'Why is it important for teams to understand the optimum batch size for their work?',
    options: [
      'To make value flow',
      'To complete more work',
      'To determine the correct cadence',
      'To understand transaction costs',
    ],
    correctIndex: 0,
  },
  {
    id: 25,
    question: 'What is one of the Lean Thinking Principles?',
    options: [
      'Individuals and Iterations over processes and tools',
      'Make value flow without interruptions',
      'Working software over comprehensive documentation',
      'Responding to change over following a plan',
    ],
    correctIndex: 1,
  },
  {
    id: 26,
    question:
      'Team A has seven developers that can define and build any application the organization requires. Team A works with another team to test and deploy their work. Can Team A be considered a high-functioning Agile Team?',
    options: [
      'Yes, because they can build any application the organization requires',
      'Yes, because they use another team to deploy',
      'No, because they have fewer than ten developers',
      'No, because they are not cross-functional',
    ],
    correctIndex: 3,
  },
  {
    id: 27,
    question: 'Which of the following statements describes the Product Owner role?',
    options: [
      'Ensuring quality by testing the Solution',
      'Estimating Stories in the Product Backlog',
      'Representing the Customer to the Agile Team',
      'Prioritizing the ART Backlog',
    ],
    correctIndex: 2,
  },
  {
    id: 28,
    question:
      'Team A is a maintenance team that cannot always predictably plan their work. They like to meet daily to review the needs of the system and plan for how they can quickly address those needs during the workday. Which of the following SAFe Lean-Agile methods should Team A use to plan and execute their work?',
    options: [
      'SAFe Team Kanban',
      'SAFe Platform Team',
      'SAFe Enabling Team',
      'SAFe XP Team',
    ],
    correctIndex: 0,
  },
  {
    id: 29,
    question: 'Which of the following categories addresses potential risks?',
    options: ['Acquired', 'Resolved', 'Supervised', 'Obtained'],
    correctIndex: 1,
  },
  {
    id: 30,
    question: 'What is the purpose of an empathy map?',
    options: [
      'To facilitate collaboration with other team members',
      'To help develop a deeper understanding of the customer',
      'To gain deeper insight to the members of an Agile Team',
      'To identify the customer',
    ],
    correctIndex: 1,
  },
  {
    id: 31,
    question: 'Which of the following activities occurs during the Inspect and Adapt workshop?',
    options: [
      'Refining the ART backlog',
      'A demo of the integrated system',
      'A retrospective of the Iteration',
      'Planning the next PI',
    ],
    correctIndex: 1,
  },
  {
    id: 32,
    question:
      'During the Innovation and Planning Iteration, an organization invites every team member to work on any project they choose. Which of the following SAFe Core Values is the organization demonstrating?',
    options: [
      'Visualizing work',
      'Make value flow without interruptions',
      'Relentless improvement',
      'Siloed thinking',
    ],
    correctIndex: 2,
  },
  {
    id: 33,
    question: 'According to SAFe, a Feature should be sized to fit into what duration?',
    options: ['One Iteration', 'One PI', 'One month', 'One year'],
    correctIndex: 1,
  },
  {
    id: 34,
    question:
      "The Scrum Master/Team Coach wants to establish a team's initial capacity. The team has two testers, three developers, one full-time Scrum Master/Team Coach, and a Product Owner split between two teams. What is their capacity before calculating for time off?",
    options: ['32', '52', '40', '48'],
    correctIndex: 2,
  },
  {
    id: 35,
    question:
      'Which of the following methods for gathering customer feedback relies on building analytic systems to deliver information about how customers are using the Solution?',
    options: [
      'Refactoring',
      'Continuous exploration',
      'Continuous integration',
      'Telemetry',
    ],
    correctIndex: 3,
  },
  {
    id: 36,
    question:
      'Team A is writing a Story enabling book shoppers to access their shopping cart from any page on the website. Which of the following examples represents the recommended user voice format for the Story?',
    options: [
      'I want to view my shopping cart so I can review what I am purchasing',
      'I am a book shopper that wants to access my shopping cart anywhere on the website',
      'As a book shopper, I want to access my shopping cart from any page',
      'As a book shopper, I want access to my shopping cart from any page, so that I can review what I am purchasing',
    ],
    correctIndex: 3,
  },
  {
    id: 37,
    question:
      'Which of the following continuous delivery pipeline aspects focuses on enabling the organization to deliver value aligned with business needs?',
    options: [
      'Continuous Ideation',
      'Continuous Integration',
      'Release on Demand',
      'Continuous Deployment',
    ],
    correctIndex: 2,
  },
  {
    id: 38,
    question: 'What is the formula to calculate flow efficiency?',
    options: [
      'Total wait time / Flow time [Total wait time divided by Flow time]',
      'Total wait time + Flow time [Total wait time plus Flow time]',
      'Total active time / Flow time [Total active time divided by Flow time]',
      'Total active time + Flow time [Total active time plus Flow time]',
    ],
    correctIndex: 2,
  },
  {
    id: 39,
    question:
      'Which of the following Agile Team responsibilities is associated with the Iteration Retrospective?',
    options: [
      'Improve relentlessly',
      'Apply systems thinking',
      'Connect to the customer',
      'Take an economic view',
    ],
    correctIndex: 0,
  },
  {
    id: 40,
    question: 'What is the recommended final agenda item of PI Planning?',
    options: [
      'Participating in the planning retrospective',
      'Reviewing the final plan',
      'Surfacing the ART risks',
      'Assigning Business Value',
    ],
    correctIndex: 0,
  },
  {
    id: 41,
    question: 'Which of the following statements describes the Release Train Engineer role?',
    options: [
      'To serve as the ART-level content authority',
      'To maintain Team Backlogs',
      'To ensure technical integrity of all development within the ART',
      'To serve as the coach for the ART',
    ],
    correctIndex: 3,
  },
  {
    id: 42,
    question: 'Which of the following types of information is shown in a cumulative flow diagram?',
    options: [
      'Team velocity',
      'Costs of producing artifacts',
      'Time to complete a Feature by the rollup of Stories',
      'Work that is in process across the whole team',
    ],
    correctIndex: 3,
  },
  {
    id: 43,
    question: 'Agile Teams, Roadmaps, and backlogs are elements of which SAFe Discipline?',
    options: [
      'Team and Technical Agility',
      'Lean Portfolio Management',
      'Leadership and Culture',
      'Large Solution Integration and Delivery',
    ],
    correctIndex: 0,
  },
  {
    id: 44,
    question:
      'During which of the following PI Planning activities are Business Owners asked to accept the plans?',
    options: [
      'The second team breakout session',
      'The draft plan review',
      'The final plan review',
      'The Management Review and Problem-Solving workshop',
    ],
    correctIndex: 2,
  },
  {
    id: 45,
    question:
      'Which of the following principles includes "working software is the primary measure of progress"?',
    options: [
      'Agile Product Delivery',
      'Lean Thinking',
      'Agile Manifesto',
      'Lean Portfolio Management',
    ],
    correctIndex: 2,
  },
];
