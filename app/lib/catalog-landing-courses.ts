import {
  type CatalogLandingContent,
  daysFromDomains,
  safeExamFormat,
  sharedCourseFaqs,
  sharedPaymentFaqs,
  sharedPaymentFaqsMicrocredential,
  sharedWhyTail,
  sharedWhyTailMicrocredential,
} from "@/app/lib/catalog-landing";

type WhyRow = CatalogLandingContent["whyRows"][number];
type FaqItem = CatalogLandingContent["faqs"]["exam"][number];

const DURATION_2 = "2-Day Live Online · Instructor-Led";
const DURATION_3 = "3-Day Live Online · Instructor-Led";
const INCLUDES_16 =
  "Includes exam (first two attempts), official courseware, 16 PDUs · 16 SEUs & 1-year SAFe Studio access.";
const INCLUDES_16_ONE =
  "Includes exam (first attempt), official courseware, 16 PDUs · 16 SEUs & 1-year SAFe Studio access.";
const INCLUDES_24 =
  "Includes exam (first two attempts), official courseware, 24 PDUs · 24 SEUs & 1-year SAFe Studio access.";
const INCLUDES_24_ONE =
  "Includes exam (first attempt), official courseware, 24 PDUs · 24 SEUs & 1-year SAFe Studio access.";
const GUIDELINE_SCORE =
  "See Scaled Agile exam guidelines for the current passing score.";

function featuredWhy(
  row01: Omit<WhyRow, "n" | "featured">,
  row02: Omit<WhyRow, "n" | "featured">,
  row03: Omit<WhyRow, "n" | "featured">,
  examAttempts: 1 | 2 = 2
): WhyRow[] {
  return [
    { n: "01", featured: true, ...row01 },
    { n: "02", featured: true, ...row02 },
    { n: "03", ...row03 },
    ...sharedWhyTail(examAttempts),
  ];
}

function featuredWhyMicro(
  row01: Omit<WhyRow, "n" | "featured">,
  row02: Omit<WhyRow, "n" | "featured">,
  row03: Omit<WhyRow, "n" | "featured">
): WhyRow[] {
  return [
    { n: "01", featured: true, ...row01 },
    { n: "02", featured: true, ...row02 },
    { n: "03", ...row03 },
    ...sharedWhyTailMicrocredential(),
  ];
}

function faqsFor(args: {
  shortName: string;
  datesTitle: string;
  certName: string;
  exam: FaqItem[];
  generic: FaqItem[];
  hasExam?: boolean;
  payment?: FaqItem[];
}): CatalogLandingContent["faqs"] {
  return {
    courses: sharedCourseFaqs({
      shortName: args.shortName,
      datesTitle: args.datesTitle,
      certName: args.certName,
      hasExam: args.hasExam,
    }),
    exam: args.exam,
    payment: args.payment ?? sharedPaymentFaqs(),
    generic: args.generic,
  };
}

function examIncluded(windowDays: 30 | 60, attempts: 1 | 2 = 2): FaqItem {
  const attemptCopy =
    attempts === 1
      ? "Your first exam attempt is included."
      : "Your first two exam attempts are included.";
  return {
    q: "Is the exam included in the course fee?",
    a: `Yes. ${attemptCopy} The exam must be completed within ${windowDays} days of the course.`,
  };
}

function failExamFaq(attempts: 1 | 2 = 2): FaqItem {
  return {
    q: "What happens if I fail the exam?",
    a:
      attempts === 1
        ? "Your first exam attempt is included. Additional attempts can be purchased from Scaled Agile. Contact Agile36 for guidance on next steps. The attempt must be completed within 30 days of the course."
        : "Your first two attempts are included. Contact Agile36 for guidance on next steps. Attempts must be completed within 30 days of the course.",
  };
}

const popm: CatalogLandingContent = {
  slug: "product-owner-manager",
  crumb: "SAFe® POPM",
  title:
    "AI-Empowered SAFe® Product Owner / Product Manager (POPM) Certification Training",
  lede: "The official 2-day live course. You leave ready to own the backlog, run PI Planning, apply customer-centric design, and sit the POPM exam.",
  badgeSrc: "/POPM.jpg",
  badgeAlt: "SAFe POPM badge",
  cardTitle: "SAFe® POPM Certification",
  durationLabel: DURATION_2,
  includesLine: INCLUDES_16,
  highlights: [
    "Attend 16 hours of live SAFe POPM training and earn 16 PDUs and SEUs",
    "Sit the official exam with your first two attempts included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/POPM_6.0_Partner.pdf",
  assessmentLabel: "Free POPM Assessment",
  assessmentHref: "/test/product-owner-manager",
  examName: "SAFe Product Owner/Product Manager Practice Test",
  datesTitle: "Upcoming POPM dates",
  scheduleCourseName: "AI-Empowered SAFe Product Owner/Product Manager",
  whyRows: featuredWhy(
    {
      check: "Real product experience",
      usLead: "Learn from people who have actually built products at Fortune 100 companies.",
      usRest:
        "Go beyond SAFe theory with lessons grounded in real product strategy, discovery, roadmaps, prioritization, customer research, and delivery.",
      other: "SAFe expertise doesn't necessarily mean hands-on product-building experience.",
    },
    {
      check: "AI-powered product management",
      usLead: "Learn how product management is changing because of AI.",
      usRest:
        "Use AI for market research, customer insights, product strategy, requirements, prioritization, and everyday product work.",
      other: "Traditional POPM training focuses primarily on the standard SAFe curriculum.",
    },
    {
      check: "Learn the job, not just SAFe",
      usLead: "We don't just prepare you to understand the framework.",
      usRest:
        "You'll connect SAFe concepts to how strong product teams actually discover, decide what to build, prioritize, and deliver products.",
      other:
        "Certification-focused training can teach the framework without teaching the deeper craft of product management.",
    }
  ),
  outcomes: [
    "Execute the POPM roles day to day — backlogs, forecasting, and representing the customer",
    "Facilitate PI Planning: vision, PI Objectives, dependencies, and risks",
    "Optimize workflow with customer-centric design, features, and stories",
    "Apply AI to refinement, prioritization, and discovery — including responsible use",
  ],
  curriculum: daysFromDomains(
    [
      {
        title: "Product Owner and Product Manager roles",
        weight: "12–14%",
        topics: [
          "Applying SAFe to the PO and PM roles",
          "The Lean-Agile mindset",
          "Value streams",
          "PO and PM responsibilities",
        ],
      },
      {
        title: "PI Planning preparation",
        weight: "17–19%",
        topics: [
          "How PI Planning works",
          "Solution vision",
          "Forecasting work with roadmaps",
          "Planning features",
          "Managing the ART backlog and Kanban",
        ],
      },
      {
        title: "Leadership for PI Planning",
        weight: "14–16%",
        topics: [
          "Communicating the vision",
          "Planning PI Objectives",
          "Organizing and managing dependencies",
          "Analyzing risks",
        ],
      },
      {
        title: "Iteration execution",
        weight: "28–30%",
        topics: [
          "Creating stories",
          "Planning an iteration",
          "Managing flow with Team Kanban",
          "Refining the Team Backlog",
          "Iteration Review and Retrospective",
          "DevOps and Release on Demand",
        ],
      },
      {
        title: "PI execution",
        weight: "10–12%",
        topics: [
          "PO Sync",
          "System Demo",
          "Innovation throughout the PI",
          "Inspect and Adapt",
        ],
      },
      {
        title: "Apply AI to product roles",
        weight: "12–14%",
        topics: [
          "AI basics and terminology",
          "Prompting for product work",
          "Risks and responsible AI use",
          "Augmenting PO and PM work with AI",
        ],
      },
    ],
    ["Roles, vision, and PI Planning", "Execution, flow, and AI"]
  ),
  examNote:
    "Exam: 90 minutes, 82% to pass. Day 2 also includes exam prep — your first two attempts are included.",
  examGuidelinesHref:
    "https://scaledagile.com/certification/product-owner-product-manager/#h-exam-guidelines",
  reviews: [
    {
      name: "Tyler Brooks",
      role: "Product Owner",
      review:
        "The SAFe Product Owner/Product Manager course was exactly what I needed to advance my career. The focus on backlog management and stakeholder collaboration was excellent. Passed the POPM exam on my first try!",
    },
    {
      name: "Jessica Lee",
      role: "Senior Product Manager",
      review:
        "Outstanding training program! The real-world examples of product ownership in SAFe environments were incredibly helpful. The instructors brought years of practical experience to every session.",
    },
    {
      name: "Ryan Mitchell",
      role: "Agile Product Owner",
      review:
        "As someone transitioning from Scrum to SAFe, this course provided a solid foundation. The product management principles and practices are clearly explained. The certification process was straightforward.",
    },
    {
      name: "Priya Sharma",
      role: "Product Manager",
      review:
        "Excellent course! The content on continuous exploration and customer-centric development transformed my approach to product management. I've already applied many concepts in my organization.",
    },
    {
      name: "Brandon Taylor",
      role: "Release Train Engineer",
      review:
        "This POPM course helped me understand the bigger picture of product ownership in SAFe. The interactive sessions on epic management and value delivery were particularly valuable. Worth every penny!",
    },
    {
      name: "Maya Patel",
      role: "Product Owner Lead",
      review:
        "The SAFe POPM certification has opened new career opportunities for me. The training materials on product strategy and roadmap planning are comprehensive. The exam preparation was thorough.",
    },
    {
      name: "Connor O'Brien",
      role: "Product Manager",
      review:
        "I appreciated the focus on practical application of product management in SAFe. The instructors shared real-world challenges and solutions. The course exceeded my expectations in every way.",
    },
    {
      name: "Isabella Garcia",
      role: "VP of Product",
      review:
        "Excellent investment in professional development! The SAFe Product Owner/Product Manager framework concepts are clearly explained with relevant examples. I feel confident leading product initiatives now.",
    },
  ],
  certificateSrc: "/POPM_Certificate.jpg",
  certificateTitle: "AI-Empowered SAFe® POPM Certificate",
  practiceTestTitle: "SAFe Product Owner/Product Manager Practice Test",
  practiceQuestions: "45 Questions",
  practiceDuration: "1 hours and 30 minutes",
  faqs: faqsFor({
    shortName: "SAFe Product Owner/Product Manager",
    datesTitle: "Upcoming POPM dates",
    certName: "SAFe Product Owner/Product Manager (POPM)",
    exam: [
      {
        q: "What is the difference between a SAFe Product Owner and a SAFe Product Manager?",
        a: "In SAFe, the Product Owner (PO) works at the team level — managing the team backlog and writing stories. The Product Manager (PM) operates at the program level — defining the product vision, roadmap, and features for the Agile Release Train. The POPM course covers both roles.",
      },
      examIncluded(30),
      {
        q: "What is the passing score for the SAFe POPM exam?",
        a: "The current AI-Empowered POPM exam is 90 minutes. Scaled Agile requires 82% to pass. See the exam guidelines on this page under Course curriculum.",
      },
      {
        q: "How long is SAFe POPM certification valid?",
        a: "One year from the date you pass the exam. Annual renewal requires a minimum of 12 Continuing Education Units (CEUs).",
      },
      {
        q: "Do I need to be in a software company to take SAFe POPM?",
        a: "No. SAFe is used across industries including healthcare, financial services, government, and manufacturing. The POPM certification is valuable in any enterprise using SAFe.",
      },
      {
        q: "Does Agile36 offer private POPM training for teams?",
        a: "Yes. We specialize in enterprise training and have delivered SAFe POPM to Fortune 100 teams. Contact us for group pricing.",
      },
    ],
    generic: [
      {
        q: "What is SAFe Product Owner/Product Manager certification?",
        a: "SAFe POPM is a 2-day certification covering product ownership at scale — backlog management, PI Planning, epic and feature management, and Lean-Agile product delivery within Agile Release Trains.",
      },
      {
        q: "Who should take this course?",
        a: "Product Owners managing team-level backlogs, Product Managers responsible for program-level vision and roadmaps, Business Analysts transitioning into Agile product roles, and anyone working in or with an Agile Release Train (ART).",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "There are no formal prerequisites. Basic understanding of Agile or Scrum and experience with product backlogs or customer requirements are recommended but not required.",
      },
      {
        q: "How long is the course?",
        a: "The SAFe Product Owner/Product Manager course is a 2-day intensive training program, totaling 16 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam. Your first two exam attempts are included.",
      },
      {
        q: "Is this course available online?",
        a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SAFe Product Owner/Product Manager certification is valid for one year. Scaled Agile requires a minimum of 12 Continuing Education Units (CEUs) each year to renew.",
      },
    ],
  }),
};

const leadingSafe: CatalogLandingContent = {
  slug: "leading-safe",
  crumb: "Leading SAFe®",
  title: "AI-Empowered Leading SAFe® 6.0 Training with SAFe Agilist Certification",
  lede: "This Leading SAFe® 6.0 course prepares you for the SAFe Agilist certification exam with expert-led live training and simulations.",
  badgeSrc: "/Leading SAFe.png",
  badgeAlt: "Leading SAFe / SAFe Agilist badge",
  cardTitle: "SAFe® Agilist Certification",
  durationLabel: DURATION_2,
  includesLine: INCLUDES_16,
  highlights: [
    "Attend 16 hours of live Leading SAFe training and earn 16 PDUs and SEUs",
    "Sit the official exam with your first two attempts included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/Leading-SAFe_6.0_Partner.pdf",
  assessmentLabel: "Free Leading SAFe Assessment",
  assessmentHref: "/test/leading-safe",
  examName: "Leading SAFe Practice Test | SAFe Agilist Mock",
  datesTitle: "Upcoming Leading SAFe dates",
  scheduleCourseName: "AI-Empowered Leading SAFe® / SAFe Agilist",
  whyRows: featuredWhy(
    {
      check: "Lead from real transformations",
      usLead: "Learn from SPCs who have led SAFe at Fortune 100 companies.",
      usRest:
        "PI Planning, portfolio flow, and leading change are taught from lived enterprise work — not slides alone.",
      other: "Some providers teach the framework without the leadership context of a real transformation.",
    },
    {
      check: "AI-empowered Lean-Agile leadership",
      usLead: "See how AI supports Lean-Agile leaders without replacing judgment.",
      usRest:
        "Use AI to prepare for PI Planning, explore portfolio flow, and coach change — with responsible Lean-Agile guardrails.",
      other: "Many Leading SAFe classes stop at the standard curriculum and never address AI in leadership work.",
    },
    {
      check: "Lead the change, not just the class",
      usLead: "Leave ready to run PI Planning and connect strategy to the ART.",
      usRest:
        "You practice the mindset, flow, and portfolio conversations you will actually have as a SAFe Agilist.",
      other: "Certification-focused training can optimize for exam recall instead of leading the work.",
    }
  ),
  outcomes: [
    "Thrive in disruption and build a Lean-Agile organization",
    "Apply the Lean-Agile mindset, SAFe Core Values, and SAFe principles",
    "Establish team and technical agility across Agile Release Trains",
    "Participate in PI Planning and explore Lean Portfolio Management",
    "Lead the change — including responsible use of AI as a leader",
  ],
  curriculum: daysFromDomains(
    [
      {
        title: "Adapting and Thriving with SAFe",
        weight: "7-9%",
        topics: [
          "Thrive in the age of disruption",
          "Build a Lean-Agile organization",
        ],
      },
      {
        title: "Building a Foundation with Mindset, Values and Principles",
        weight: "18-21%",
        topics: [
          "Lean-Agile mindset and SAFe Core Values",
          "Apply SAFe Lean-Agile principles",
          "Empower agility with AI",
        ],
      },
      {
        title: "Establishing Team and Technical Agility",
        weight: "7-9%",
        topics: [
          "Cross-functional Agile Teams",
          "Organize around flow with ARTs",
          "Built-In Quality",
          "Continuous Delivery Pipeline with DevOps",
        ],
      },
      {
        title: "Product Development Flow",
        weight: "25-28%",
        topics: [
          "Customer-centricity and Design Thinking",
          "Prioritize the ART Backlog",
          "Participate in PI Planning",
          "Execute the PI",
        ],
      },
      {
        title: "Exploring Lean Portfolio Management",
        weight: "25-28%",
        topics: [
          "Define a SAFe Portfolio",
          "Connect portfolio to strategy",
          "Maintain Portfolio Vision",
          "Realize vision through Epics",
          "Establish Portfolio flow",
          "Apply AI tools to LPM",
        ],
      },
      {
        title: "Leading the Change",
        weight: "7-9%",
        topics: [
          "Lead by example",
          "Lead the change",
          "Empower leaders with AI",
        ],
      },
    ],
    ["Mindset and agility", "Flow, portfolio, and leading change"]
  ),
  examNote:
    "Exam: 90 minutes, 80% to pass. Annual renewal requires 12 CEUs. Your first two attempts are included.",
  examGuidelinesHref: "https://scaledagile.com/certification/leading-safe/",
  reviews: [
    {
      name: "Christopher Lee",
      role: "SAFe Agilist",
      review:
        "The Leading SAFe course was exceptional! The comprehensive coverage of SAFe principles and practices gave me the foundation I needed. I passed the SAFe Agilist exam on my first attempt!",
    },
    {
      name: "Michelle Chang",
      role: "Agile Transformation Lead",
      review:
        "Outstanding training! The Leading SAFe course exceeded my expectations. The real-world examples of enterprise Agile transformations and case studies made complex concepts easy to understand.",
    },
    {
      name: "Thomas Wright",
      role: "Program Manager",
      review:
        "As someone new to SAFe, this Leading SAFe course provided a solid foundation. The instructors were patient and the coverage of Agile Release Trains and value streams was excellent.",
    },
    {
      name: "Patricia Moore",
      role: "Enterprise Agile Coach",
      review:
        "Excellent course structure! The Leading SAFe training content is well-organized and the instructors bring years of practical experience. I've already applied SAFe principles in my organization.",
    },
    {
      name: "Benjamin Harris",
      role: "Release Train Engineer",
      review:
        "This Leading SAFe course helped me understand the bigger picture of SAFe implementation. The interactive sessions on PI Planning and Agile Release Trains were particularly valuable.",
    },
    {
      name: "Samantha Clark",
      role: "Scrum Master",
      review:
        "The Leading SAFe certification has opened new career opportunities for me. The training materials on SAFe framework and Lean-Agile principles are comprehensive. Exam prep was thorough.",
    },
    {
      name: "Jonathan Lewis",
      role: "IT Director",
      review:
        "I appreciated the focus on practical SAFe application. The instructors shared real-world challenges in enterprise Agile transformations. The Leading SAFe course exceeded my expectations.",
    },
    {
      name: "Nicole Walker",
      role: "VP of Engineering",
      review:
        "Excellent investment in professional development! The Leading SAFe framework concepts are clearly explained with relevant examples. I feel confident leading enterprise Agile transformations now.",
    },
  ],
  certificateSrc: "/SA Certificate.jpeg",
  certificateTitle: "SAFe® Agilist Certificate",
  practiceTestTitle: "Leading SAFe Practice Test | SAFe Agilist Mock",
  practiceQuestions: "45 Questions",
  practiceDuration: "1 hours and 30 minutes",
  faqs: faqsFor({
    shortName: "Leading SAFe",
    datesTitle: "Upcoming Leading SAFe dates",
    certName: "SAFe 6.0 Agilist (SA)",
    exam: [
      {
        q: "What is the format of the SAFe Agilist exam?",
        a: "The current SAFe Agilist exam is 90 minutes. Scaled Agile requires 80% to pass. See Scaled Agile exam guidelines for the current question count and format.",
      },
      examIncluded(30),
      {
        q: "What is the passing score for the SAFe Agilist exam?",
        a: "Scaled Agile requires 80% to pass. The exam is 90 minutes. See the exam guidelines on this page under Course curriculum.",
      },
      {
        q: "Can I take the exam online?",
        a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course.",
      },
      {
        q: "What happens if I fail the exam?",
        a: "Your first two attempts are included. Contact Agile36 for exam prep support and guidance on next steps. Attempts must be completed within 30 days of the course.",
      },
      {
        q: "How do I renew my SAFe Agilist certification?",
        a: "The SAFe Agilist certification is valid for one year. Annual renewal requires 12 Continuing Education Units (CEUs). Confirm current renewal steps on scaledagile.com when you certify.",
      },
    ],
    generic: [
      {
        q: "What is Leading SAFe certification?",
        a: "Leading SAFe is a comprehensive course that provides the knowledge and skills needed to lead a Lean-Agile enterprise using the Scaled Agile Framework (SAFe). It prepares you for the SAFe Agilist (SA) certification exam.",
      },
      {
        q: "Is this course updated for SAFe 6.0?",
        a: "Yes — this training reflects the current SAFe 6.0 framework release.",
      },
      {
        q: "Who should take this course?",
        a: "This course is ideal for executives, leaders, Agile coaches, program managers, product managers, and anyone interested in leading enterprise Agile transformations.",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in software development or IT projects is recommended.",
      },
      {
        q: "How long is the course?",
        a: "The Leading SAFe course is a 2-day intensive training program, totaling 16 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam. Your first two exam attempts are included.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SAFe Agilist certification is valid for one year. Annual renewal requires 12 Continuing Education Units (CEUs).",
      },
    ],
  }),
};

const scrumMaster: CatalogLandingContent = {
  slug: "scrum-master",
  crumb: "SAFe SSM",
  title: "AI-Empowered SAFe® 6.0 Scrum Master (SSM) Certification Training",
  lede: "Become a certified AI-Empowered SAFe Scrum Master in 2 days with live, expert-led training from a SAFe Silver Partner.",
  badgeSrc: "/SSM.jpeg",
  badgeAlt: "SAFe Scrum Master badge",
  cardTitle: "SAFe® Scrum Master Certification",
  durationLabel: DURATION_2,
  includesLine: INCLUDES_16,
  highlights: [
    "Attend 16 hours of live SAFe Scrum Master training and earn 16 PDUs and SEUs",
    "Sit the official exam with your first two attempts included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/SSM_Agile36_Brochure.pdf",
  assessmentLabel: "Free SSM Assessment",
  assessmentHref: "/test/scrum-master",
  examName: "SAFe Scrum Master Practice Test",
  datesTitle: "Upcoming SSM dates",
  scheduleCourseName: "AI-Empowered SAFe Scrum Master",
  whyRows: featuredWhy(
    {
      check: "Facilitation that works on an ART",
      usLead: "Learn from Scrum Masters who have coached teams inside real Agile Release Trains.",
      usRest:
        "PI Planning, iteration execution, and finishing the PI are taught as job skills — not ceremony scripts.",
      other: "Team-level Scrum training often skips how the Scrum Master actually supports the ART.",
    },
    {
      check: "AI-augmented Scrum Master work",
      usLead: "Use AI to prepare ceremonies, coaching prompts, and improvement work.",
      usRest:
        "Day 2 includes how to augment the Scrum Master role with AI — including risks and responsible use.",
      other: "Standard SSM classes typically stay inside the published curriculum and skip AI.",
    },
    {
      check: "The role on a train, not just a team",
      usLead: "You practice the Scrum Master job in a SAFe enterprise.",
      usRest:
        "Impediments, flow, and PI events are connected to how teams actually deliver on an ART.",
      other: "Some classes teach Scrum vocabulary without teaching SAFe-scale facilitation.",
    }
  ),
  outcomes: [
    "Facilitate team events and ceremonies effectively",
    "Coach Agile teams and support continuous improvement",
    "Support Program Increment (PI) Planning",
    "Remove impediments and foster team collaboration",
    "Apply SAFe principles in a team and ART context",
    "Augment Scrum Master work with responsible AI use",
  ],
  curriculum: daysFromDomains(
    [
      {
        title: "Introducing Scrum in SAFe",
        weight: "10-12%",
        topics: [
          "Scrum in a SAFe enterprise",
          "Agile Teams and the Agile Release Train",
          "Scrum events in SAFe",
          "Where the Scrum Master / Team Coach fits",
        ],
      },
      {
        title: "Characterizing the role of the Scrum Master",
        weight: "21-23%",
        topics: [
          "Servant leadership and the Team Coach stance",
          "Coaching the Agile Team",
          "Facilitating team events",
          "Supporting Built-In Quality and flow",
        ],
      },
      {
        title: "Participating in PI Planning",
        weight: "14-16%",
        topics: [
          "PI Planning purpose and agenda",
          "Scrum Master responsibilities during PI Planning",
          "Managing risks and dependencies",
          "PI Objectives and the confidence vote",
        ],
      },
      {
        title: "Facilitating the Iteration Execution",
        weight: "21-23%",
        topics: [
          "Planning the Iteration",
          "Tracking iteration progress and flow",
          "Facilitating daily events, review, and retrospective",
          "Removing impediments during the iteration",
        ],
      },
      {
        title: "Finishing the PI",
        weight: "14-16%",
        topics: [
          "System Demo",
          "Inspect and Adapt",
          "Innovation and Planning",
          "Relentless improvement into the next PI",
        ],
      },
      {
        title: "Augmenting the Scrum Master Role with AI",
        weight: "12-14%",
        topics: [
          "AI basics for Scrum Masters",
          "Prompting for facilitation and coaching",
          "Risks and responsible AI use",
          "Augmenting Scrum Master work with AI",
        ],
      },
    ],
    [
      "The Scrum Master role and PI Planning",
      "Iteration execution, finishing the PI, and AI",
    ]
  ),
  examNote:
    "Exam: 90 minutes, 80% to pass. Your first two attempts are included.",
  examGuidelinesHref: "https://scaledagile.com/certification/scrum-master/",
  reviews: [
    {
      name: "Brian Mitchell",
      role: "Scrum Master",
      review:
        "The SAFe Scrum Master course transformed how I facilitate teams. The PI planning and iteration execution modules were game-changers. I passed the SSM exam on my first attempt!",
    },
    {
      name: "Catherine Wong",
      role: "Agile Coach",
      review:
        "Outstanding training! The focus on team facilitation and coaching gave me practical tools I use daily. The instructors' real-world examples made complex SAFe concepts clear.",
    },
    {
      name: "Derek Thompson",
      role: "Team Lead",
      review:
        "As a Team Lead transitioning to Scrum Master, this course provided exactly what I needed. The facilitation techniques and impediment removal lessons were particularly valuable. Highly recommend!",
    },
    {
      name: "Elena Rodriguez",
      role: "Senior Scrum Master",
      review:
        "The SAFe SSM certification has elevated my facilitation skills significantly. The Agile Release Train support module helped me better serve my teams. Worth every penny!",
    },
    {
      name: "Franklin Lee",
      role: "Agile Facilitator",
      review:
        "Excellent course structure! The two-day format was intensive but well-paced. I've already applied the team coaching and facilitation frameworks in my organization with great results.",
    },
    {
      name: "Gabriela Silva",
      role: "Scrum Master",
      review:
        "The SAFe SSM training exceeded expectations. The case studies on PI planning and team ceremonies were incredibly practical. The exam preparation was thorough and effective.",
    },
    {
      name: "Henry Chen",
      role: "Agile Team Coach",
      review:
        "This course helped me bridge the gap between Scrum and SAFe. The servant leadership and team facilitation principles are now core to my coaching approach.",
    },
    {
      name: "Isabella Martinez",
      role: "Lead Scrum Master",
      review:
        "Outstanding investment in professional development! The SAFe Scrum Master framework concepts are clearly explained with relevant examples. I feel confident facilitating Agile Release Trains now.",
    },
  ],
  certificateSrc: "/SSM_Certification.jpeg",
  certificateTitle: "SAFe® Scrum Master Certificate",
  practiceTestTitle: "SAFe Scrum Master Practice Test",
  practiceQuestions: "45 Questions",
  practiceDuration: "1 hours and 30 minutes",
  faqs: faqsFor({
    shortName: "SAFe Scrum Master",
    datesTitle: "Upcoming SSM dates",
    certName: "SAFe Scrum Master (SSM)",
    exam: [
      {
        q: "How is the SAFe Scrum Master different from a regular Scrum Master?",
        a: "The SAFe Scrum Master operates at enterprise scale — supporting not just one team but an entire Agile Release Train (ART). You'll learn PI Planning, program-level ceremonies, and how to coordinate across multiple teams, which goes well beyond traditional Scrum.",
      },
      examIncluded(60),
      {
        q: "What is the passing score for the SAFe Scrum Master exam?",
        a: "The current SSM exam is 90 minutes. Scaled Agile requires 80% to pass. See the exam guidelines on this page under Course curriculum.",
      },
      {
        q: "Can I take the SAFe SSM exam online?",
        a: "Yes. The exam is delivered online through the SAFe Community Platform and can be taken from anywhere within 60 days of course completion.",
      },
      {
        q: "How long does SAFe Scrum Master certification last?",
        a: "One year. Confirm current continuing-education and renewal steps on Scaled Agile's SSM certification page when you certify.",
      },
      {
        q: "Does Agile36 offer corporate/team training for SAFe Scrum Master?",
        a: "Yes. Agile36 specializes in enterprise and Fortune 100 training. Contact us for private group pricing and custom scheduling.",
      },
    ],
    generic: [
      {
        q: "What is SAFe Scrum Master certification?",
        a: "SAFe Scrum Master (SSM) is a 2-day certification teaching Scrum Masters to facilitate Agile teams within the Scaled Agile Framework. You learn to support teams on Agile Release Trains, participate in PI Planning, remove impediments at scale, and coach teams in SAFe practices.",
      },
      {
        q: "Who should take this course?",
        a: "This course is ideal for current Scrum Masters looking to operate in a SAFe enterprise, team leads transitioning to Agile, project managers moving into Agile facilitation, and anyone on an Agile Release Train (ART).",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "There are no formal prerequisites. Basic understanding of Scrum or Agile principles and familiarity with iteration-based delivery are recommended but not required.",
      },
      {
        q: "How long is the course?",
        a: "The SAFe Scrum Master course is a 2-day intensive training program, totaling 16 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam. Your first two exam attempts are included.",
      },
      {
        q: "Is this course available online?",
        a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SAFe Scrum Master certification is valid for one year. Confirm current CEU and renewal steps on scaledagile.com.",
      },
    ],
  }),
};

const lpm: CatalogLandingContent = {
  slug: "lean-portfolio-management",
  crumb: "SAFe LPM",
  title: "AI-Empowered SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training",
  lede: "Align strategy with execution, manage portfolio flow, and optimize value streams across the enterprise portfolio.",
  badgeSrc: "/Lean Portfolio.png",
  badgeAlt: "SAFe Lean Portfolio Management badge",
  cardTitle: "SAFe® LPM Certification",
  durationLabel: DURATION_2,
  includesLine: INCLUDES_16_ONE,
  attemptsLine: "Your first exam attempt is included.",
  highlights: [
    "Attend 16 hours of live SAFe LPM training and earn 16 PDUs and SEUs",
    "Sit the official exam with your first attempt included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/LPM_6.0_Partner (1).pdf",
  assessmentLabel: "Free LPM Assessment",
  assessmentHref: "/test/lean-portfolio-management",
  examName: "SAFe Lean Portfolio Management Practice Test",
  datesTitle: "Upcoming LPM dates",
  scheduleCourseName: "SAFe Lean Portfolio Management",
  whyRows: featuredWhy(
    {
      check: "Portfolio work from real enterprises",
      usLead: "Learn LPM from people who have funded value streams, not just described them.",
      usRest:
        "Strategy, lean budgets, and portfolio operations are taught with the conversations executives actually have.",
      other: "Some LPM classes stay theoretical and never connect budgets to ART-level delivery.",
    },
    {
      check: "Strategy through to flow",
      usLead: "You practice connecting investment funding to portfolio Kanban and epic flow.",
      usRest:
        "Guardrails, lean governance, and adoption planning are part of the two days — not an afterthought.",
      other: "Certification-only courses can skip the operating model you need on Monday.",
    },
    {
      check: "Adoption you can take home",
      usLead: "Leave with a plan for LPM adoption, not only exam vocabulary.",
      usRest:
        "You map strategy, budgets, operations, and governance to how your portfolio actually runs.",
      other: "Framework walkthroughs rarely include a concrete adoption plan.",
    },
    1
  ),
  outcomes: [
    "Align strategy with execution through a SAFe portfolio",
    "Apply lean budgets, guardrails, and investment funding",
    "Establish portfolio flow with Kanban and epic management",
    "Run Agile portfolio operations and lean governance",
    "Design a practical plan for LPM adoption",
  ],
  curriculum: daysFromDomains(
    [
      {
        title: "Aligning Strategy with Execution",
        topics: [
          "The purpose of SAFe Lean Portfolio Management",
          "Strategy and investment funding",
          "Portfolio vision and organizing around value",
          "Realizing vision through epics",
        ],
      },
      {
        title: "Lean Budgeting and Portfolio Flow",
        topics: [
          "Lean budgets and guardrails",
          "Problems of project-cost accounting",
          "Establishing investment funding",
          "Managing portfolio flow",
        ],
      },
      {
        title: "Running Agile Portfolio Operations",
        topics: [
          "Agile portfolio operations",
          "Connecting the portfolio to ARTs and value streams",
          "Supporting coordinated execution",
        ],
      },
      {
        title: "Designing a Plan for LPM Adoption",
        topics: [
          "Lean governance",
          "Measuring portfolio outcomes",
          "Designing a plan for LPM adoption",
        ],
      },
    ],
    ["Strategy and lean budgets", "Portfolio operations and adoption"]
  ),
  examNote:
    "Exam: 90 minutes. Scaled Agile's current guideline is 77% (35/45) to pass. Your first exam attempt is included.",
  examGuidelinesHref:
    "https://scaledagile.com/certification/lean-portfolio-management/",
  reviews: [
    {
      name: "Victoria Chen",
      role: "Portfolio Director",
      review:
        "The SAFe Lean Portfolio Management course was exceptional! The portfolio strategy and investment funding modules gave me the tools I needed to optimize our portfolio. Passed the LPM exam on my first attempt!",
    },
    {
      name: "Nathaniel Brown",
      role: "Enterprise Portfolio Manager",
      review:
        "Outstanding training! The lean governance and portfolio flow management lessons were incredibly practical. The real-world case studies on portfolio operations made complex concepts clear.",
    },
    {
      name: "Olivia Martinez",
      role: "Portfolio Manager",
      review:
        "As someone new to portfolio management in SAFe, this course provided a solid foundation. The instructors were patient and the portfolio planning exercises were invaluable. Highly recommend!",
    },
    {
      name: "Ethan Davis",
      role: "VP of Portfolio",
      review:
        "Excellent course structure! The focus on lean budgets, portfolio Kanban, and epic management transformed how I approach portfolio strategy. I've already applied these concepts with great results.",
    },
    {
      name: "Grace Kim",
      role: "Portfolio Strategy Lead",
      review:
        "This LPM course helped me understand the bigger picture of portfolio management in SAFe. The interactive sessions on investment funding and portfolio flow were particularly valuable. Worth every penny!",
    },
    {
      name: "Lucas Anderson",
      role: "Enterprise Architect",
      review:
        "The SAFe Lean Portfolio Management certification has opened new career opportunities. The training materials on portfolio governance and lean-agile budgeting are comprehensive. Exam prep was thorough.",
    },
    {
      name: "Zoe Thompson",
      role: "Portfolio Operations Manager",
      review:
        "I appreciated the focus on practical portfolio management application. The instructors shared real-world challenges in portfolio optimization. The course exceeded my expectations in every way.",
    },
    {
      name: "Jordan White",
      role: "Chief Portfolio Officer",
      review:
        "Excellent investment in professional development! The SAFe Lean Portfolio Management framework concepts are clearly explained with relevant examples. I feel confident leading portfolio transformations now.",
    },
  ],
  certificateSrc: "/LPM_Cert.jpg",
  certificateTitle: "SAFe® Lean Portfolio Management Certificate",
  practiceTestTitle: "SAFe Lean Portfolio Management Practice Test",
  practiceQuestions: "45 Questions",
  practiceDuration: "1 hours and 30 minutes",
  faqs: faqsFor({
    shortName: "SAFe Lean Portfolio Management",
    datesTitle: "Upcoming LPM dates",
    certName: "SAFe Lean Portfolio Management (LPM)",
    exam: [
      {
        q: "What is the format of the SAFe Lean Portfolio Management exam?",
        a: "The exam is 90 minutes. Scaled Agile's current guideline is 77% (35/45) to pass. Confirm the latest details on Scaled Agile's LPM exam guidelines.",
      },
      examIncluded(30, 1),
      {
        q: "What is the passing score for the SAFe LPM exam?",
        a: "Scaled Agile's current guideline is 77% (35/45) to pass on a 90-minute exam. See the exam guidelines on this page under Course curriculum.",
      },
      {
        q: "Can I take the exam online?",
        a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course.",
      },
      failExamFaq(1),
      {
        q: "How do I renew my SAFe LPM certification?",
        a: "The SAFe Lean Portfolio Management certification is valid for one year. Confirm current continuing-education and renewal steps on scaledagile.com.",
      },
    ],
    generic: [
      {
        q: "What is SAFe Lean Portfolio Management certification?",
        a: "SAFe Lean Portfolio Management is a comprehensive course that provides the knowledge and skills needed to effectively manage portfolios, align strategy with execution, and optimize value delivery in a SAFe environment. It prepares you for the SAFe Lean Portfolio Management (LPM) certification exam.",
      },
      {
        q: "Who should take this course?",
        a: "This course is ideal for Portfolio Managers, Portfolio Directors, Executives, Enterprise Architects, Program Managers, and anyone interested in strategic portfolio management in a SAFe environment.",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in product management or software development is recommended.",
      },
      {
        q: "How long is the course?",
        a: "The SAFe Lean Portfolio Management course is a 2-day intensive training program, totaling 16 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam. Your first exam attempt is included.",
      },
      {
        q: "Is this course available online?",
        a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SAFe Lean Portfolio Management certification is valid for one year. You can renew it by earning continuing education credits or by taking advanced SAFe courses.",
      },
    ],
  }),
};

const apm: CatalogLandingContent = {
  slug: "agile-product-management",
  crumb: "SAFe APM",
  title: "AI-Empowered SAFe® 6.0 Agile Product Management (APM) Certification Training",
  lede: "Apply design thinking, continuous exploration, and Lean UX to build products customers love at enterprise scale.",
  badgeSrc: "/AgileProductManagment.png",
  badgeAlt: "SAFe Agile Product Management badge",
  cardTitle: "SAFe® APM Certification",
  durationLabel: DURATION_3,
  includesLine: INCLUDES_24_ONE,
  attemptsLine: "Your first exam attempt is included.",
  highlights: [
    "Attend 24 hours of live SAFe APM training and earn 24 PDUs and SEUs",
    "Sit the official exam with your first attempt included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/APM_Brochure_Agile36.pdf",
  assessmentLabel: "Free APM Assessment",
  assessmentHref: "/test/agile-product-management",
  examName: "SAFe Agile Product Management Practice Test",
  datesTitle: "Upcoming APM dates",
  scheduleCourseName: "SAFe Agile Product Management",
  whyRows: featuredWhy(
    {
      check: "Product craft at enterprise scale",
      usLead: "Learn APM from people who have run continuous exploration in real portfolios.",
      usRest:
        "Design thinking, segmentation, vision, and roadmaps are taught as product work — not a SAFe glossary.",
      other: "Some APM classes stay on framework labels without teaching how product managers actually decide.",
    },
    {
      check: "Empathy through to delivery",
      usLead: "Three days is enough depth to connect discovery, strategy, and value delivery.",
      usRest:
        "You practice empathy-driven design, then take it through vision, roadmaps, and the value stream.",
      other: "Shorter overviews rarely give time for both design thinking and delivery.",
    },
    {
      check: "Innovation in the value stream",
      usLead: "Leave able to create space for innovation without stalling delivery.",
      usRest:
        "Day 3 covers value delivery, innovation in the value stream, and exam prep with one attempt included.",
      other: "Exam-only courses can skip the innovation and delivery practices product leaders need.",
    },
    1
  ),
  outcomes: [
    "Clarify the Product Manager role in the Lean enterprise",
    "Run continuous exploration of markets and users",
    "Apply empathy-driven design and market segmentation",
    "Build product strategy, vision, and roadmaps",
    "Deliver value and create innovation in the value stream",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "Product Manager role, continuous exploration, market segmentation",
      modules: [
        {
          title: "Product Manager Role in the Lean Enterprise",
          topics: [
            "Product Manager's role and responsibilities",
            "Product Management stakeholders and collaborators",
            "Design Thinking",
          ],
        },
        {
          title: "Continuous Exploration of Markets and Users",
          topics: [
            "Continuous exploration practices",
            "Customer and market research",
            "Hypothesis-driven discovery",
          ],
        },
        {
          title: "Market Segmentation Strategies",
          topics: [
            "Segmenting markets and users",
            "Choosing where to play",
            "Connecting segments to the backlog",
          ],
        },
      ],
    },
    {
      day: "Day 2",
      focus: "Empathy-driven design, strategy and vision, roadmaps",
      modules: [
        {
          title: "Empathy-driven Design",
          topics: [
            "Empathy and Lean UX",
            "Personas and journey insights",
            "Turning insights into product choices",
          ],
        },
        {
          title: "Product Strategy and Vision",
          topics: [
            "Product strategy in a SAFe enterprise",
            "Solution vision",
            "Aligning stakeholders on where you are going",
          ],
        },
        {
          title: "Roadmap Creation to Build Solutions",
          topics: [
            "Forecasting with roadmaps",
            "Features and milestones",
            "Connecting the roadmap to ART delivery",
          ],
        },
      ],
    },
    {
      day: "Day 3",
      focus: "Value delivery, innovation in the value stream, exam prep",
      modules: [
        {
          title: "Value Delivery",
          topics: [
            "Delivering value through the ART",
            "Prioritization and flow",
            "Measuring outcomes",
          ],
        },
        {
          title: "Innovation Creation in the Value Stream",
          topics: [
            "Creating space for innovation",
            "Innovation in the value stream",
            "Sustaining exploration alongside delivery",
          ],
        },
        {
          title: "Exam preparation",
          topics: [
            "Review of APM practices",
            "Practice exam and Q&A",
            "Your first exam attempt is included",
          ],
        },
      ],
    },
  ],
  examNote: `${GUIDELINE_SCORE} Your first exam attempt is included.`,
  examGuidelinesHref:
    "https://scaledagile.com/certification/agile-product-management/",
  reviews: [
    {
      name: "Amanda Foster",
      role: "Senior Product Manager",
      review:
        "The SAFe Agile Product Management course transformed how I approach product strategy. The design thinking and continuous exploration modules were game-changers. I passed the APM exam on my first attempt!",
    },
    {
      name: "Kevin Patel",
      role: "Product Director",
      review:
        "Outstanding training! The focus on empathy-driven design and market segmentation strategies gave me practical tools I use daily. The instructors' real-world examples made complex concepts clear.",
    },
    {
      name: "Rachel Green",
      role: "Product Owner",
      review:
        "As a Product Owner transitioning to Product Manager, this course provided exactly what I needed. The roadmap creation and value delivery lessons were particularly valuable. Highly recommend!",
    },
    {
      name: "Marcus Johnson",
      role: "VP of Product",
      review:
        "The SAFe APM certification has elevated my product management skills significantly. The innovation creation in value streams module helped me drive better outcomes. Worth every penny!",
    },
    {
      name: "Sophie Chen",
      role: "Product Strategy Lead",
      review:
        "Excellent course structure! The three-day format allowed deep dives into each topic. I've already applied the product vision and strategy frameworks in my organization with great results.",
    },
    {
      name: "Daniel Torres",
      role: "Agile Product Manager",
      review:
        "The SAFe APM training exceeded expectations. The case studies on continuous exploration and lean UX principles were incredibly practical. The exam preparation was thorough and effective.",
    },
    {
      name: "Nina Williams",
      role: "Product Marketing Manager",
      review:
        "This course helped me bridge the gap between product strategy and execution. The empathy-driven design and market segmentation strategies are now core to my product planning process.",
    },
    {
      name: "Alex Rivera",
      role: "Head of Product",
      review:
        "Outstanding investment in professional development! The SAFe Agile Product Management framework concepts are clearly explained with relevant examples. I feel confident leading product innovation now.",
    },
  ],
  certificateSrc: "/APM_cert.jpg",
  certificateTitle: "SAFe® Agile Product Management Certificate",
  practiceTestTitle: "SAFe Agile Product Management Practice Test",
  faqs: faqsFor({
    shortName: "SAFe Agile Product Management",
    datesTitle: "Upcoming APM dates",
    certName: "SAFe Agile Product Management (APM)",
    exam: [
      {
        q: "What is the format of the SAFe Agile Product Management exam?",
        a: `${GUIDELINE_SCORE} You'll receive access instructions after completing the course.`,
      },
      examIncluded(30, 1),
      {
        q: "What is the passing score for the SAFe APM exam?",
        a: GUIDELINE_SCORE,
      },
      {
        q: "Can I take the exam online?",
        a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course.",
      },
      failExamFaq(1),
      {
        q: "How do I renew my APM certification?",
        a: "The SAFe Agile Product Management (APM) certification is valid for one year. Confirm current continuing-education and renewal steps on scaledagile.com.",
      },
    ],
    generic: [
      {
        q: "What is SAFe Agile Product Management certification?",
        a: "SAFe Agile Product Management is a comprehensive course that provides the knowledge and skills needed to effectively manage products, drive continuous exploration, and optimize value delivery in a SAFe environment. It prepares you for the SAFe Agile Product Management (APM) certification exam.",
      },
      {
        q: "Who should take this course?",
        a: "This course is ideal for Product Managers, Product Directors, Executives, Enterprise Architects, Program Managers, and anyone interested in strategic product management in a SAFe environment.",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in product management or software development is recommended.",
      },
      {
        q: "How long is the course?",
        a: "The SAFe Agile Product Management course is a 3-day intensive training program, totaling 24 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam. Your first exam attempt is included.",
      },
      {
        q: "Is this course available online?",
        a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SAFe Agile Product Management certification is valid for one year. You can renew it by earning continuing education credits or by taking advanced SAFe courses.",
      },
    ],
  }),
};

const architects: CatalogLandingContent = {
  slug: "safe-for-architects",
  crumb: "SAFe ARCH",
  title: "SAFe® 6.0 for Architects (ARCH) Certification Training",
  lede: "Align architecture with business value, plan architectural runway, and lead Agile architecture across ARTs and Solution Trains.",
  badgeSrc: "/ARCH.png",
  badgeAlt: "SAFe for Architects badge",
  cardTitle: "SAFe® for Architects Certification",
  durationLabel: DURATION_3,
  includesLine: INCLUDES_24,
  highlights: [
    "Attend 24 hours of live SAFe for Architects training and earn 24 PDUs and SEUs",
    "Sit the official exam with your first two attempts included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  datesTitle: "Upcoming ARCH dates",
  scheduleCourseName: "SAFe for Architects",
  whyRows: featuredWhy(
    {
      check: "Architecture that shows up in PI Planning",
      usLead: "Learn how architects actually contribute runway, Solution Intent, and enablers.",
      usRest:
        "The course connects Agile architecture to the ART events you will facilitate or join.",
      other: "Some architecture classes stay on patterns and never reach PI Planning.",
    },
    {
      check: "Business value, not architecture theater",
      usLead: "Practice aligning architecture with Strategic Themes and value streams.",
      usRest:
        "Enabler epics, NFRs, and roadmaps are taught as delivery work, not a separate architecture track.",
      other: "Framework overviews can leave architects without a backlog they can use.",
    },
    {
      check: "Lead the transformation from the architecture seat",
      usLead: "Three days covers execution, evolving the portfolio, and leading change.",
      usRest:
        "You leave with an action plan for Agile architecture in your organization.",
      other: "Exam-focused courses often skip the leadership work architects do during a transformation.",
    }
  ),
  outcomes: [
    "Practice Agile architecture and the SAFe Architect role",
    "Architect for DevOps, the Continuous Delivery Pipeline, and Release on Demand",
    "Connect architecture to business value, value streams, and Solution Intent",
    "Prepare runway and contribute during PI Planning",
    "Support PI execution and lead architecture through a Lean-Agile transformation",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "Agile architecture, DevOps and release on demand",
      modules: [
        {
          title: "Agile Architecture and SAFe",
          topics: [
            "Attributes of Agile Architecture",
            "The SAFe Architect role and responsibilities",
            "Collaboration with other enterprise roles",
            "Architecting with SAFe Principles",
          ],
        },
        {
          title: "DevOps and Release on Demand",
          topics: [
            "DevOps culture and the Continuous Delivery Pipeline",
            "Architect for continuous exploration, integration, and deployment",
          ],
        },
      ],
    },
    {
      day: "Day 2",
      focus: "Architecture with business value, PI Planning",
      modules: [
        {
          title: "Architecture with Business Value",
          topics: [
            "Strategic Themes, Portfolio Canvas, and Portfolio Vision",
            "Value streams, ARTs, and Solution Trains",
            "Enabler epics, Solution Intent, NFRs, and roadmaps",
          ],
        },
        {
          title: "Preparing for and contributing to PI Planning",
          topics: [
            "Architectural runway for the upcoming PI",
            "Management Review and problem-solving",
          ],
        },
      ],
    },
    {
      day: "Day 3",
      focus: "PI execution, evolving the portfolio, leading the transformation",
      modules: [
        {
          title: "Supporting continuous delivery during PI execution",
          topics: [
            "Iteration Reviews, System Demos, and Solution Demos",
            "Improve through Inspect and Adapt",
          ],
        },
        {
          title: "Evolving the solution portfolio across value streams",
          topics: [
            "Evolving architecture across value streams",
            "Coordinating architecture beyond a single ART",
          ],
        },
        {
          title: "Leading during a Lean-Agile transformation",
          topics: [
            "Lean-Agile leadership attributes for architects",
            "Action plan to support Agile architecture in your organization",
            "Exam preparation — your first two attempts are included",
          ],
        },
      ],
    },
  ],
  examNote: `${GUIDELINE_SCORE} Your first two attempts are included.`,
  examGuidelinesHref: "https://scaledagile.com/certification/safe-architect/",
  reviews: [
    {
      name: "Priya Nair",
      role: "Solution Architect",
      review:
        "This is the course that finally connected architecture to PI Planning. Architectural runway and enabler epics went from theory to a working backlog practice.",
    },
    {
      name: "James Okonkwo",
      role: "Enterprise Architect",
      review:
        "Clear treatment of Solution Intent, NFRs, and how architects actually collaborate with Product Management. I used the action plan the week after class.",
    },
    {
      name: "Elena Vasquez",
      role: "System Architect",
      review:
        "Three days is the right depth. DevOps and Release on Demand for architects was the missing piece for our ART.",
    },
    {
      name: "David Chen",
      role: "Technical Lead",
      review:
        "Instructors kept the conversation practical — how to show up in PI Planning, Management Review, and Inspect and Adapt without becoming a bottleneck.",
    },
  ],
  faqs: faqsFor({
    shortName: "SAFe for Architects",
    datesTitle: "Upcoming ARCH dates",
    certName: "SAFe for Architects (ARCH)",
    exam: [
      {
        q: "What is the format of the SAFe for Architects exam?",
        a: `${GUIDELINE_SCORE} You'll receive access instructions after completing the course.`,
      },
      examIncluded(30),
      {
        q: "What is the passing score for the SAFe ARCH exam?",
        a: GUIDELINE_SCORE,
      },
      {
        q: "Can I take the exam online?",
        a: "Yes. The exam is taken online. You will receive access instructions after completing the course.",
      },
      {
        q: "What happens if I fail the exam?",
        a: "Your first two attempts are included. Contact Agile36 for guidance on next steps. Attempts must be completed within 30 days of the course.",
      },
      {
        q: "How do I renew my ARCH certification?",
        a: "ARCH is valid for one year. Confirm current continuing-education and renewal steps on scaledagile.com.",
      },
    ],
    generic: [
      {
        q: "What is SAFe for Architects certification?",
        a: "SAFe for Architects (ARCH) is a 3-day course that teaches system, solution, and enterprise architects how to practice Agile architecture, plan runway, contribute to Solution Intent, and lead architecture during PI Planning and transformation.",
      },
      {
        q: "Who should take this course?",
        a: "System Architects, Solution Architects, Enterprise Architects, technical leaders, senior engineers, and infrastructure architects working in a SAFe enterprise.",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "There are no formal prerequisites. Architecture experience is recommended. Leading SAFe is helpful.",
      },
      {
        q: "How long is the course?",
        a: "SAFe for Architects is a 3-day live training program, totaling 24 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include live instruction, official courseware, access to the SAFe Community Platform for one year, and your first two exam attempts.",
      },
      {
        q: "Is this course available online?",
        a: "Yes. We offer live virtual training. Private onsite cohorts can be arranged for teams.",
      },
    ],
  }),
};

const safeForTeams: CatalogLandingContent = {
  slug: "safe-for-teams",
  crumb: "SAFe SP",
  title: "AI-Empowered SAFe® 6.0 for Teams Certification Training",
  lede: "Master SAFe team member skills to excel in Agile Release Trains with expert-led SAFe® 6.0 training and hands-on iteration simulations.",
  badgeSrc: "/SAFe for Teams.png",
  badgeAlt: "SAFe for Teams / Practitioner badge",
  cardTitle: "SAFe® Practitioner Certification",
  durationLabel: DURATION_2,
  includesLine: INCLUDES_16,
  highlights: [
    "Attend 16 hours of live SAFe for Teams training and earn 16 PDUs and SEUs",
    "Sit the official exam with your first two attempts included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/SP_6.0_Partner.pdf",
  assessmentLabel: "Free SAFe for Teams Assessment",
  assessmentHref: "/test/safe-for-teams",
  examName: "SAFe for Teams Practice Test",
  datesTitle: "Upcoming SAFe for Teams dates",
  scheduleCourseName: "AI-Empowered SAFe for Teams",
  whyRows: featuredWhy(
    {
      check: "Built for people who sit on the ART",
      usLead: "Learn the team-member job: collaborate, plan, deliver, and improve on a train.",
      usRest:
        "Iteration and PI work are practiced the way developers, testers, and analysts actually experience them.",
      other: "Leadership courses explain SAFe without teaching how a team member shows up day to day.",
    },
    {
      check: "Customer connection, not just process",
      usLead: "Connecting to the customer is a first-class part of the two days.",
      usRest:
        "Stories, feedback, and Built-In Quality are taught as how the team delivers value — not extra theory.",
      other: "Some SP classes rush past customer-centricity to get to the exam domains.",
    },
    {
      check: "Plan, deliver, improve",
      usLead: "You leave able to plan an iteration, deliver in a PI, and improve relentlessly.",
      usRest:
        "Class time maps to the exam domains, so you are also preparing to sit the Practitioner exam.",
      other: "Generic Agile team training often skips PI Planning and Inspect and Adapt.",
    }
  ),
  outcomes: [
    "Collaborate effectively with other teams in ARTs",
    "Plan and execute iterations successfully",
    "Participate in Program Increment (PI) planning",
    "Deliver value in a Lean-Agile environment",
    "Apply SAFe principles as a team member",
    "Continuously improve team processes and deliverables",
  ],
  curriculum: daysFromDomains(
    [
      {
        title: "Introducing SAFe",
        weight: "10-12%",
        topics: [
          "SAFe overview and Lean-Agile principles",
          "Core Values and SAFe configurations",
          "Value streams and Agile Release Trains",
        ],
      },
      {
        title: "Forming Agile Teams as an Agile Release Train",
        weight: "15-17%",
        topics: [
          "Cross-functional Agile Teams",
          "Team roles and responsibilities",
          "Built-In Quality",
          "Organizing around value on the ART",
        ],
      },
      {
        title: "Connecting to the Customer",
        weight: "19-21%",
        topics: [
          "Customer-centricity",
          "Design Thinking for teams",
          "Stories, features, and acceptance criteria",
        ],
      },
      {
        title: "Planning the Work",
        weight: "11-14%",
        topics: [
          "Team Backlog",
          "Iteration Planning",
          "Estimating and forecasting",
          "PI Planning as a team member",
        ],
      },
      {
        title: "Delivering Value",
        weight: "17-19%",
        topics: [
          "Iteration execution",
          "Kanban and flow",
          "Built-in quality practices",
          "Demo and review",
        ],
      },
      {
        title: "Getting Feedback",
        weight: "7-9%",
        topics: [
          "Iteration Review",
          "System Demo",
          "Using feedback to adjust the plan",
        ],
      },
      {
        title: "Improving Relentlessly",
        weight: "12-14%",
        topics: [
          "Iteration Retrospective",
          "Inspect and Adapt",
          "Team improvement backlog",
        ],
      },
    ],
    ["Forming the ART and connecting to the customer", "Planning, delivering, and improving"]
  ),
  examNote:
    "Exam: 90 minutes, 76% to pass. Annual renewal requires 12 CEUs. Your first two attempts are included.",
  examGuidelinesHref: "https://scaledagile.com/certification/safe-practitioner/",
  reviews: [
    {
      name: "Brian Mitchell",
      role: "Agile Team Member",
      review:
        "The SAFe for Teams course transformed how I work in Agile Release Trains. The iteration planning and execution modules were game-changers. I passed the SP exam on my first attempt!",
    },
    {
      name: "Catherine Wong",
      role: "Developer",
      review:
        "Outstanding training! The focus on collaboration and iteration execution gave me practical tools I use daily. The instructors' real-world examples made complex SAFe concepts clear.",
    },
    {
      name: "Derek Thompson",
      role: "Business Analyst",
      review:
        "As a Business Analyst working in Agile teams, this course provided exactly what I needed. The PI planning and team collaboration lessons were particularly valuable. Highly recommend!",
    },
    {
      name: "Elena Rodriguez",
      role: "Senior Developer",
      review:
        "The SAFe SP certification has elevated my team collaboration skills significantly. The Agile Release Train participation module helped me better contribute to my teams. Worth every penny!",
    },
    {
      name: "Franklin Lee",
      role: "Tester",
      review:
        "Excellent course structure! The two-day format was intensive but well-paced. I've already applied the iteration planning and execution frameworks in my organization with great results.",
    },
    {
      name: "Gabriela Silva",
      role: "Agile Team Member",
      review:
        "The SAFe for Teams training exceeded expectations. The case studies on PI planning and iteration execution were incredibly practical. The exam preparation was thorough and effective.",
    },
    {
      name: "Henry Chen",
      role: "Product Owner",
      review:
        "This course helped me bridge the gap between traditional product management and SAFe. The team collaboration and iteration principles are now core to my approach.",
    },
    {
      name: "Isabella Martinez",
      role: "Lead Developer",
      review:
        "Outstanding investment in professional development! The SAFe for Teams framework concepts are clearly explained with relevant examples. I feel confident working in Agile Release Trains now.",
    },
  ],
  certificateSrc: "/SAFe Teams_Cert.jpg",
  certificateTitle: "SAFe® Practitioner Certificate",
  practiceTestTitle: "SAFe for Teams Practice Test",
  practiceQuestions: "45 Questions",
  practiceDuration: "1 hours and 30 minutes",
  faqs: faqsFor({
    shortName: "SAFe for Teams",
    datesTitle: "Upcoming SAFe for Teams dates",
    certName: "SAFe Practitioner (SP)",
    exam: [
      {
        q: "What is the format of the SAFe Practitioner exam?",
        a: "The current SAFe Practitioner exam is 90 minutes. Scaled Agile requires 76% to pass. See Scaled Agile exam guidelines for the current question count and format.",
      },
      examIncluded(60),
      {
        q: "What is the passing score for the SAFe Practitioner exam?",
        a: "Scaled Agile requires 76% to pass. The exam is 90 minutes. See the exam guidelines on this page under Course curriculum.",
      },
      {
        q: "Can I take the exam online?",
        a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course.",
      },
      {
        q: "How do I renew my SAFe Practitioner certification?",
        a: "The SAFe Practitioner (SP) certification is valid for one year. Annual renewal requires 12 Continuing Education Units (CEUs). Confirm current renewal steps on scaledagile.com.",
      },
    ],
    generic: [
      {
        q: "What is SAFe for Teams certification?",
        a: "SAFe for Teams is a comprehensive course that provides the knowledge and skills needed to effectively work as a team member in Agile Release Trains (ARTs), collaborate with other teams, plan and execute iterations, and deliver value in a Lean-Agile environment. It prepares you for the SAFe Practitioner (SP) certification exam.",
      },
      {
        q: "Who should take this course?",
        a: "This course is ideal for Agile Team Members, Developers, Testers, Business Analysts, Product Owners, and anyone working in or planning to work in Agile Release Trains within a SAFe environment.",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in software development or Agile teams is recommended.",
      },
      {
        q: "How long is the course?",
        a: "The SAFe for Teams course is a 2-day intensive training program, totaling 16 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam. Your first two exam attempts are included.",
      },
      {
        q: "Is this course available online?",
        a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SAFe Practitioner certification is valid for one year. Annual renewal requires 12 Continuing Education Units (CEUs).",
      },
    ],
  }),
};

const devops: CatalogLandingContent = {
  slug: "devops",
  crumb: "SAFe SDP",
  title: "AI-Empowered SAFe® 6.0 DevOps (SDP) Certification Training",
  lede: "Master DevOps practices and continuous delivery pipelines with expert-led SAFe® 6.0 training and hands-on automation labs.",
  badgeSrc: "/Devops.png",
  badgeAlt: "SAFe DevOps badge",
  cardTitle: "SAFe® DevOps Certification",
  durationLabel: DURATION_2,
  includesLine: INCLUDES_16,
  highlights: [
    "Attend 16 hours of live SAFe DevOps training and earn 16 PDUs and SEUs",
    "Sit the official exam with your first two attempts included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/SDP_6.0_Partner.pdf",
  assessmentLabel: "Free DevOps Assessment",
  assessmentHref: "/test/devops",
  examName: "SAFe DevOps Practice Test",
  datesTitle: "Upcoming DevOps dates",
  scheduleCourseName: "SAFe DevOps",
  whyRows: featuredWhy(
    {
      check: "CALMR, not tool theater",
      usLead: "Start from Culture, Automation, Lean Flow, Measurement, and Recovery.",
      usRest:
        "Pipelines are taught as a delivery system, not a list of tools to memorize for the exam.",
      other: "Some DevOps classes jump to tooling without the CALMR operating model.",
    },
    {
      check: "Map the stream, then improve it",
      usLead: "Value Stream Mapping is a core day-one practice.",
      usRest:
        "You identify bottlenecks in the current delivery pipeline before designing the future state.",
      other: "Slide-only DevOps courses rarely give time to map a real value stream.",
    },
    {
      check: "Leave with a transformation plan",
      usLead: "Day 2 ends with creating a DevOps transformation plan you can take back to the ART.",
      usRest:
        "Continuous exploration and integration are connected to how you will actually change delivery.",
      other: "Exam cram classes often skip the adoption plan that makes the practices stick.",
    }
  ),
  outcomes: [
    "Apply the CALMR approach to DevOps in a SAFe enterprise",
    "Map the current delivery value stream and find bottlenecks",
    "Strengthen continuous exploration and continuous integration",
    "Create a practical DevOps transformation plan",
    "Accelerate value delivery through the Continuous Delivery Pipeline",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "CALMR and Value Stream Mapping",
      modules: [
        {
          title: "CALMR",
          topics: [
            "Culture of shared responsibility",
            "Automation of the Continuous Delivery Pipeline",
            "Lean flow, measurement, and recovery",
            "How CALMR guides DevOps in SAFe",
          ],
        },
        {
          title: "Value Stream Mapping",
          topics: [
            "Map the current delivery pipeline",
            "Identify bottlenecks and waste",
            "Visualize value flow from concept to customer",
            "Target improvements for the future state",
          ],
        },
      ],
    },
    {
      day: "Day 2",
      focus: "Continuous Exploration and Integration, transformation plan",
      modules: [
        {
          title: "Continuous Exploration and Integration",
          topics: [
            "Align development with customer needs",
            "Hypothesis-driven development and customer research",
            "Automate builds and tests",
            "Integrate frequently to reduce risk",
          ],
        },
        {
          title: "Creating a Transformation Plan",
          topics: [
            "Prioritize DevOps improvements",
            "Build a transformation backlog",
            "Connect the plan to ART and value-stream outcomes",
            "Exam prep — your first two attempts are included",
          ],
        },
      ],
    },
  ],
  examNote: `${GUIDELINE_SCORE} Your first two attempts are included.`,
  examGuidelinesHref: "https://scaledagile.com/certification/devops/",
  reviews: [
    {
      name: "Alexandra Chen",
      role: "DevOps Engineer",
      review:
        "The SAFe DevOps course transformed how I build deployment pipelines. The continuous delivery and automation modules were game-changers. I passed the SDP exam on my first attempt!",
    },
    {
      name: "Michael Rodriguez",
      role: "Senior DevOps Engineer",
      review:
        "Outstanding training! The focus on continuous integration and deployment automation gave me practical tools I use daily. The instructors' real-world examples made complex DevOps concepts clear.",
    },
    {
      name: "Sarah Johnson",
      role: "Release Engineer",
      review:
        "As a Release Engineer transitioning to DevOps, this course provided exactly what I needed. The pipeline design and automation techniques were particularly valuable. Highly recommend!",
    },
    {
      name: "David Kim",
      role: "DevOps Architect",
      review:
        "The SAFe DevOps certification has elevated my pipeline implementation skills significantly. The infrastructure as code module helped me better design deployment automation. Worth every penny!",
    },
    {
      name: "Jennifer Martinez",
      role: "Site Reliability Engineer",
      review:
        "Excellent course structure! The two-day format was intensive but well-paced. I've already applied the continuous delivery and automation frameworks in my organization with great results.",
    },
    {
      name: "Robert Taylor",
      role: "DevOps Engineer",
      review:
        "The SAFe DevOps training exceeded expectations. The case studies on pipeline implementation and deployment automation were incredibly practical. The exam preparation was thorough and effective.",
    },
    {
      name: "Lisa Anderson",
      role: "CI/CD Engineer",
      review:
        "This course helped me bridge the gap between development and operations. The continuous delivery and DevOps culture principles are now core to my engineering approach.",
    },
    {
      name: "James Wilson",
      role: "Lead DevOps Engineer",
      review:
        "Outstanding investment in professional development! The SAFe DevOps framework concepts are clearly explained with relevant examples. I feel confident implementing continuous delivery pipelines now.",
    },
  ],
  certificateSrc: "/Devops_Certification.jpg",
  certificateTitle: "SAFe® DevOps Certificate",
  practiceTestTitle: "SAFe DevOps Practice Test",
  practiceQuestions: "45 Questions",
  faqs: faqsFor({
    shortName: "SAFe DevOps",
    datesTitle: "Upcoming DevOps dates",
    certName: "SAFe DevOps (SDP)",
    exam: [
      {
        q: "What is the format of the SAFe DevOps exam?",
        a: `${GUIDELINE_SCORE} You'll receive access instructions after completing the course.`,
      },
      examIncluded(30),
      {
        q: "What is the passing score for the SAFe DevOps exam?",
        a: GUIDELINE_SCORE,
      },
      {
        q: "Can I take the exam online?",
        a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course.",
      },
      {
        q: "What happens if I fail the exam?",
        a: "Your first two attempts are included. Contact Agile36 for guidance on next steps. Attempts must be completed within 30 days of the course.",
      },
      {
        q: "How do I renew my SAFe DevOps certification?",
        a: "The SAFe DevOps (SDP) certification is valid for one year. Confirm current continuing-education and renewal steps on scaledagile.com.",
      },
    ],
    generic: [
      {
        q: "What is SAFe DevOps certification?",
        a: "SAFe DevOps is a comprehensive course that provides the knowledge and skills needed to effectively implement DevOps practices, build continuous delivery pipelines, and accelerate value delivery in a SAFe environment. It prepares you for the SAFe DevOps (SDP) certification exam.",
      },
      {
        q: "Who should take this course?",
        a: "This course is ideal for DevOps Engineers, Software Developers, Release Train Engineers, System Architects, IT Operations professionals, and anyone interested in implementing DevOps practices in a SAFe environment.",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "There are no formal prerequisites. However, having a basic understanding of Agile principles and experience in software development, testing, or IT operations is recommended.",
      },
      {
        q: "How long is the course?",
        a: "The SAFe DevOps course is a 2-day intensive training program, totaling 16 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam. Your first two exam attempts are included.",
      },
      {
        q: "Is this course available online?",
        a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SAFe DevOps certification is valid for one year. You can renew it by earning continuing education credits or by taking advanced SAFe courses.",
      },
    ],
  }),
};

const sasm: CatalogLandingContent = {
  slug: "advanced-scrum-master",
  crumb: "SAFe SASM",
  title:
    "AI-Empowered SAFe® 6.0 Advanced Scrum Master (SASM) Certification Training",
  lede: "Move from team ceremonies to ART-level results: faster flow, cleaner multi-team conflict, and a SASM credential that signals you can coach the train — not just one team.",
  badgeSrc: "/AdvancedSM.png",
  badgeAlt: "SAFe Advanced Scrum Master badge",
  cardTitle: "SAFe® Advanced Scrum Master Certification",
  durationLabel: DURATION_2,
  includesLine: INCLUDES_16,
  highlights: [
    "Attend 16 hours of live SAFe Advanced Scrum Master training and earn 16 PDUs and SEUs",
    "Sit the official exam with your first two attempts included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/AdvancedSM_Brochure.pdf",
  assessmentLabel: "Free SASM Assessment",
  assessmentHref: "/test/advanced-scrum-master",
  examName: "SAFe Advanced Scrum Master Practice Test",
  datesTitle: "Upcoming SASM dates",
  scheduleCourseName: "AI-Empowered SAFe Advanced Scrum Master",
  whyRows: featuredWhy(
    {
      check: "The advanced role on the ART",
      usLead: "Go past team ceremonies into flow, conflict, and train-level coaching.",
      usRest:
        "You practice the Advanced Scrum Master job: helping multiple teams share one PI cadence.",
      other: "Repeating SSM content does not prepare you to coach across the ART.",
    },
    {
      check: "Flow you can see and improve",
      usLead: "Visualize, measure, and improve team flow with the methods that fit the work.",
      usRest:
        "WIP, bottlenecks, and Built-In Quality are treated as facilitation skills, not metrics theater.",
      other: "Some advanced classes stay on theory and never put flow on a board.",
    },
    {
      check: "Conflict and ART performance",
      usLead: "Address multi-team conflict and improve ART performance in the same course.",
      usRest:
        "Inspect and Adapt, the problem-solving workshop, and high-performing teams are connected.",
      other: "Team-only coaching courses skip the ART events where SASM work actually happens.",
    }
  ),
  outcomes: [
    "Facilitate collaboration across teams on the ART",
    "Visualize, measure, and improve team flow",
    "Coach high-performing teams and use powerful questions",
    "Apply interest-based problem solving in conflict situations",
    "Support Inspect & Adapt and ART-level improvement",
    "Use AI and Studio resources responsibly with Lean-Agile guardrails",
  ],
  curriculum: daysFromDomains(
    [
      {
        title: "Evolving the Advanced Scrum Master role",
        weight: "11-13%",
        topics: [
          "Advanced Scrum Master responsibilities on and across the ART",
          "Empowering teams with AI: prompts, templates, and verification",
          "Human-in-the-loop use of SAFe Studio guidance",
          "Ethical, quality-focused use of AI with Lean-Agile principles",
        ],
      },
      {
        title: "Improving Flow",
        weight: "22-24%",
        topics: [
          "Selecting the team method (Scrum, Kanban, XP hooks)",
          "Visualizing and managing flow; bottlenecks and WIP",
          "Measuring and accelerating flow at team level",
          "Built-in quality practices that protect throughput",
        ],
      },
      {
        title: "Building high-performing teams",
        weight: "26-28%",
        topics: [
          "Characteristics of high-performing teams",
          "Employing powerful questions in facilitation",
          "Promoting cross-team collaboration on shared objectives",
          "Assessing team performance and improvement backlog items",
        ],
      },
      {
        title: "Addressing conflict",
        weight: "18-20%",
        topics: [
          "Behaviors that improve (or erode) conflict outcomes",
          "Sources of conflict in multi-team settings",
          "Interest-based problem solving",
          "Framing and reframing; conflict analysis and strategy design",
        ],
      },
      {
        title: "Improving ART performance",
        weight: "17-19%",
        topics: [
          "Outcome-based team events and facilitating toward ART goals",
          "Coaching the Innovation & Planning (IP) iteration",
          "Inspect & Adapt and the problem-solving workshop",
          "Exam preparation — your first two attempts are included",
        ],
      },
    ],
    ["The advanced role and flow", "Teams, conflict, and ART performance"]
  ),
  examNote:
    "Scaled Agile requires 82% to pass. Your first two attempts are included.",
  examGuidelinesHref:
    "https://scaledagile.com/certification/advanced-scrum-master/",
  reviews: [
    {
      name: "Brian Mitchell",
      role: "Scrum Master",
      review:
        "SASM pushed my facilitation past single-team basics. Flow, cross-team collaboration, and I&A prep finally clicked—I passed the SASM exam on my first try.",
    },
    {
      name: "Catherine Wong",
      role: "Agile Coach",
      review:
        "The conflict and collaboration depth is what I needed for multi-team settings. Real examples from the trainers made SAFe at scale much easier to coach.",
    },
    {
      name: "Derek Thompson",
      role: "Team Lead",
      review:
        "After SSM, this was the right next step. Built-in quality, flow metrics, and ART-level events are now part of how I support teams.",
    },
    {
      name: "Elena Rodriguez",
      role: "Senior Scrum Master",
      review:
        "Worth it for the ART focus alone. I’m more deliberate about dependencies, PI readiness, and healthy team dynamics across the train.",
    },
    {
      name: "Franklin Lee",
      role: "Agile Facilitator",
      review:
        "Two intense days, well paced. I’ve used the powerful-questions and problem-solving workshop patterns in live PIs already.",
    },
    {
      name: "Gabriela Silva",
      role: "Scrum Master",
      review:
        "Exam prep matched the blueprint. Practice scenarios for flow and conflict were the most valuable part of the class.",
    },
    {
      name: "Henry Chen",
      role: "Agile Team Coach",
      review:
        "Connects team-level Scrum Master habits to train outcomes. Exactly what I needed before coaching more teams on the same ART.",
    },
    {
      name: "Isabella Martinez",
      role: "Lead Scrum Master",
      review:
        "Clear, practical, and focused on measurable improvement. I left with a concrete plan for I&A and team health.",
    },
  ],
  certificateSrc: "/Advanced_Cert.jpg",
  certificateTitle: "SAFe® Advanced Scrum Master Certificate",
  practiceTestTitle: "SAFe Advanced Scrum Master Practice Test",
  faqs: faqsFor({
    shortName: "SAFe Advanced Scrum Master",
    datesTitle: "Upcoming SASM dates",
    certName: "SAFe Advanced Scrum Master (SASM)",
    exam: [
      {
        q: "What is the format of the AI-Empowered SAFe Advanced Scrum Master (SASM) exam?",
        a: "Scaled Agile requires 82% to pass. See Scaled Agile exam guidelines for the current exam length and question count. Use the practice test to gauge readiness.",
      },
      examIncluded(30),
      {
        q: "What is the passing score for the SASM exam?",
        a: "Scaled Agile requires 82% to pass. See the exam guidelines on this page under Course curriculum.",
      },
      {
        q: "Can I take the exam online?",
        a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course.",
      },
      {
        q: "What happens if I fail the exam?",
        a: "Your first two attempts are included. Contact Agile36 for guidance on next steps. Attempts must be completed within 30 days of the course.",
      },
      {
        q: "How do I maintain my SASM certification?",
        a: "SASM is valid for one year. Confirm current continuing-education and renewal steps on Scaled Agile's SASM certification page.",
      },
    ],
    generic: [
      {
        q: "What is AI-Empowered SAFe Advanced Scrum Master (SASM) certification?",
        a: "AI-Empowered SAFe Advanced Scrum Master is an advanced certification for experienced Scrum Masters who want to lead program-level coaching, optimize Agile Release Train performance, and drive organizational transformation. It builds on your SAFe Scrum Master (SSM) certification.",
      },
      {
        q: "Who should take this course?",
        a: "This course is ideal for certified SAFe Scrum Masters (SSM), experienced Scrum Masters, Agile Coaches, program-level facilitators, and Agile transformation leaders who want to advance their coaching and facilitation skills at scale.",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "Experience as a Scrum Master or Agile Coach is recommended. Familiarity with SAFe concepts and team-level delivery is expected, and SAFe Scrum Master (SSM) certification is often preferred.",
      },
      {
        q: "How long is the course?",
        a: "The AI-Empowered SASM class is a 2-day intensive training program, totaling 16 hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the SASM certification exam. Your first two exam attempts are included.",
      },
      {
        q: "Is this course available online?",
        a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SASM certification is valid for one year. Confirm the latest renewal steps on the official certification page.",
      },
    ],
  }),
};

const rte: CatalogLandingContent = {
  slug: "release-train-engineer",
  crumb: "SAFe RTE",
  title: "AI-Empowered SAFe® Release Train Engineer (RTE) Certification Training",
  lede: "Master ART facilitation and PI planning — with responsible AI practices to sharpen readiness, dependencies, and stakeholder communication.",
  badgeSrc: "/RTE.png",
  badgeAlt: "SAFe Release Train Engineer badge",
  cardTitle: "SAFe® RTE Certification",
  durationLabel: DURATION_2,
  includesLine: INCLUDES_16,
  highlights: [
    "Attend 16 hours of live SAFe RTE training and earn 16 PDUs and SEUs",
    "Sit the official exam with your first two attempts included",
    "Get a year of SAFe Studio and Community access with courseware included",
  ],
  brochureHref: "/RTE_Brochure.pdf",
  datesTitle: "Upcoming RTE dates",
  scheduleCourseName: "AI-Empowered SAFe Release Train Engineer",
  whyRows: featuredWhy(
    {
      check: "Facilitate the train, not just the agenda",
      usLead: "Learn PI Planning, ART events, and coaching from people who have run trains.",
      usRest:
        "Dependencies, risks, and stakeholder communication are treated as the RTE job — not extras.",
      other: "Some RTE courses walk the slides without practicing how an ART actually stays aligned.",
    },
    {
      check: "Flow and improvement at program level",
      usLead: "Day 2 focuses on optimizing flow, ART sync, metrics, and continuous improvement.",
      usRest:
        "You leave able to run the operating cadence of an ART, not only the PI Planning weekend.",
      other: "Planning-only workshops skip the execution system RTEs live in all PI long.",
    },
    {
      check: "Responsible AI for RTE work",
      usLead: "Use AI to sharpen PI prep, dependency sense-making, and communications.",
      usRest:
        "Judgment stays with the RTE. AI is a preparation aid, not a substitute for facilitation.",
      other: "Standard RTE classes typically ignore how AI changes program-level prep.",
    }
  ),
  outcomes: [
    "Facilitate Agile Release Trains (ARTs) effectively",
    "Coordinate Program Increment (PI) Planning events",
    "Coach teams and stakeholders on SAFe practices",
    "Manage dependencies and risks across teams",
    "Optimize flow and value delivery",
    "Drive continuous improvement, ART sync, and metrics",
  ],
  curriculum: [
    {
      day: "Day 1",
      focus: "Facilitate ARTs, PI Planning, coaching, dependencies",
      modules: [
        {
          title: "Facilitate Agile Release Trains",
          topics: [
            "The Release Train Engineer role",
            "ART events and the operating cadence",
            "Creating alignment across teams on the train",
          ],
        },
        {
          title: "PI Planning",
          topics: [
            "Prepare and facilitate PI Planning",
            "Management Review and problem-solving",
            "PI Objectives, risks, and the confidence vote",
          ],
        },
        {
          title: "Coaching teams and stakeholders",
          topics: [
            "Coaching teams, Product Management, and leaders",
            "Stakeholder communication during the PI",
            "Responsible AI for PI prep and communications",
          ],
        },
        {
          title: "Dependencies and risks",
          topics: [
            "Visualizing and managing cross-team dependencies",
            "Risk management during planning and execution",
            "Keeping delivery unblocked across the ART",
          ],
        },
      ],
    },
    {
      day: "Day 2",
      focus: "Optimize flow, continuous improvement, ART sync, metrics",
      modules: [
        {
          title: "Optimize flow",
          topics: [
            "Flow at ART level",
            "Bottlenecks, WIP, and value delivery",
            "Keeping the train moving through the PI",
          ],
        },
        {
          title: "Continuous improvement",
          topics: [
            "Inspect and Adapt",
            "The problem-solving workshop",
            "Turning improvement items into system fixes",
          ],
        },
        {
          title: "ART sync and metrics",
          topics: [
            "Facilitate ART sync and Scrum of Scrums",
            "SAFe metrics and reporting practices",
            "Exam prep — your first two attempts are included",
          ],
        },
      ],
    },
  ],
  examNote: `${GUIDELINE_SCORE} Your first two attempts are included.`,
  examGuidelinesHref: "https://scaledagile.com/certification/",
  reviews: [
    {
      name: "Brian Mitchell",
      role: "Program Manager",
      review:
        "The SAFe Release Train Engineer course transformed how I facilitate Agile Release Trains. The PI planning facilitation and ART coordination modules were game-changers. I passed the RTE exam on my first attempt!",
    },
    {
      name: "Catherine Wong",
      role: "Agile Release Train Engineer",
      review:
        "Outstanding training! The focus on ART facilitation and program-level coaching gave me practical tools I use daily. The instructors' real-world examples made complex SAFe concepts clear.",
    },
    {
      name: "Derek Thompson",
      role: "Program Lead",
      review:
        "As a Program Lead transitioning to RTE, this course provided exactly what I needed. The PI planning facilitation and dependency management lessons were particularly valuable. Highly recommend!",
    },
    {
      name: "Elena Rodriguez",
      role: "Senior RTE",
      review:
        "The SAFe RTE certification has elevated my facilitation skills significantly. The Agile Release Train coordination module helped me better serve multiple teams. Worth every penny!",
    },
    {
      name: "Franklin Lee",
      role: "Agile Program Manager",
      review:
        "Excellent course structure! The two-day format was intensive but well-paced. I've already applied the ART coaching and PI planning frameworks in my organization with great results.",
    },
    {
      name: "Gabriela Silva",
      role: "Release Train Engineer",
      review:
        "The SAFe RTE training exceeded expectations. The case studies on PI planning and ART coordination were incredibly practical. The exam preparation was thorough and effective.",
    },
    {
      name: "Henry Chen",
      role: "Agile Program Coach",
      review:
        "This course helped me bridge the gap between team-level and program-level Agile. The ART facilitation and stakeholder coaching principles are now core to my approach.",
    },
    {
      name: "Isabella Martinez",
      role: "Lead Release Train Engineer",
      review:
        "Outstanding investment in professional development! The SAFe RTE framework concepts are clearly explained with relevant examples. I feel confident facilitating multiple Agile Release Trains now.",
    },
  ],
  certificateSrc: "/RTE_Cert.jpg",
  certificateTitle: "SAFe® Release Train Engineer Certificate",
  faqs: faqsFor({
    shortName: "SAFe Release Train Engineer",
    datesTitle: "Upcoming RTE dates",
    certName: "SAFe Release Train Engineer (RTE)",
    exam: [
      {
        q: "What is the format of the SAFe Release Train Engineer exam?",
        a: `${GUIDELINE_SCORE} You'll receive access instructions after completing the course.`,
      },
      examIncluded(30),
      {
        q: "What is the passing score for the SAFe RTE exam?",
        a: GUIDELINE_SCORE,
      },
      {
        q: "Can I take the exam online?",
        a: "Yes, the exam can be taken online from anywhere. You'll receive instructions on how to access the exam portal after completing the course.",
      },
      {
        q: "What happens if I fail the exam?",
        a: "Your first two attempts are included. Contact Agile36 for guidance on next steps. Attempts must be completed within 30 days of the course.",
      },
    ],
    generic: [
      {
        q: "What is SAFe Release Train Engineer (RTE) certification?",
        a: "SAFe Release Train Engineer is a comprehensive course that provides the knowledge and skills needed to facilitate Agile Release Train (ART) events, coach leaders and teams, and drive continuous improvement at the program level. It prepares you for the SAFe Release Train Engineer (RTE) certification exam.",
      },
      {
        q: "Who should take this course?",
        a: "This course is ideal for Release Train Engineers, Agile Coaches, Scrum Masters, Program Managers, and anyone responsible for facilitating and improving Agile Release Trains in a SAFe environment.",
      },
      {
        q: "What are the prerequisites for this course?",
        a: "Leading SAFe (SA) or SAFe Scrum Master (SSM) certification is recommended. Experience with Agile teams and PI Planning is helpful.",
      },
      {
        q: "How long is the course?",
        a: "The SAFe Release Train Engineer certification training is a 2-day (16-hour) program.",
      },
      {
        q: "What materials are included?",
        a: "Course materials include comprehensive study guides, practice exams, access to the SAFe Community Platform for one year, and all resources needed to prepare for the certification exam. Your first two exam attempts are included.",
      },
      {
        q: "Is this course available online?",
        a: "Yes, we offer both live virtual training (online) and in-person classroom training options. You can choose the format that works best for you.",
      },
      {
        q: "How do I maintain my certification?",
        a: "The SAFe Release Train Engineer (RTE) certification is valid for one year. You can renew it by earning continuing education credits or by taking advanced SAFe courses.",
      },
    ],
  }),
};

const DURATION_HALF = "Half-Day Live Online · Instructor-Led";
const INCLUDES_MICRO =
  "Includes live workshop, official courseware, and 1-year SAFe Studio access. No exam.";
const MICRO_EYEBROW = "SAFe® Micro-credential · Live Online";
const MICRO_CURRICULUM_LEDE =
  "This workshop follows Scaled Agile's current outline. Class time is spent on the work itself — there is no certification exam.";

const vsm: CatalogLandingContent = {
  slug: "value-stream-mapping",
  crumb: "SAFe® VSM",
  title: "SAFe® Value Stream Mapping Certification Training",
  lede: "Map the stream from concept to customer, find the bottlenecks, and leave with a future-state plan you can run on the ART.",
  summary:
    "This half-day workshop is how you map a value stream from concept to customer and see where work actually stalls. You facilitate current-state mapping, find delays and waste, and leave with a future-state map the ART can run. There is no exam — completing the live workshop is the micro-credential.",
  badgeSrc: "/MicroCredential.jpeg",
  badgeAlt: "SAFe Value Stream Mapping micro-credential badge",
  cardTitle: "SAFe® Value Stream Mapping",
  durationLabel: DURATION_HALF,
  includesLine: INCLUDES_MICRO,
  highlights: [
    "Map and visualize value streams from concept to customer",
    "Identify bottlenecks, waste, and delays in delivery",
    "Leave with a future-state map and an improvement plan",
  ],
  brochureHref: "/VS_Mapping_Agile36.pdf",
  datesTitle: "Upcoming Value Stream Mapping dates",
  scheduleCourseName: "SAFe Value Stream Mapping",
  eyebrow: MICRO_EYEBROW,
  attemptsLine: null,
  curriculumLede: MICRO_CURRICULUM_LEDE,
  whyRows: featuredWhyMicro(
    {
      check: "Map a real stream, not a slide",
      usLead: "Current-state mapping is the work of the workshop.",
      usRest:
        "You identify process steps, lead time, and cycle time on a stream you can take back to the ART.",
      other: "Some listings are lecture-only and never put a map on the wall.",
    },
    {
      check: "Find the constraint, then design around it",
      usLead: "Bottlenecks and waste are named before anyone draws a future state.",
      usRest: "Lean metrics tell you where improvement will actually move delivery.",
      other: "Future-state exercises without a current-state baseline stay hypothetical.",
    },
    {
      check: "A plan you can run next week",
      usLead: "The workshop ends with an actionable improvement plan.",
      usRest: "Future-state design is tied to the ART and the people who own the work.",
      other: "A completed worksheet that never becomes a backlog item does not change flow.",
    }
  ),
  outcomes: [
    "Map and visualize value streams from concept to customer",
    "Identify bottlenecks, waste, and inefficiencies",
    "Calculate key metrics like lead time and cycle time",
    "Apply Lean principles to optimize flow",
    "Create actionable improvement plans",
    "Measure and track value stream improvements",
  ],
  curriculum: [
    {
      day: "Part 1",
      focus: "See the current stream",
      modules: [
        {
          title: "Introduction to Value Stream Mapping",
          topics: [
            "Understanding value streams in SAFe",
            "Value stream mapping fundamentals",
            "Identifying value and waste",
          ],
        },
        {
          title: "Mapping Current State",
          topics: [
            "Creating current state maps",
            "Identifying process steps",
            "Measuring lead time and cycle time",
          ],
        },
      ],
    },
    {
      day: "Part 2",
      focus: "Design the future state",
      modules: [
        {
          title: "Analyzing Value Streams",
          topics: [
            "Identifying bottlenecks",
            "Finding waste and inefficiencies",
            "Calculating key metrics",
          ],
        },
        {
          title: "Designing Future State",
          topics: [
            "Creating future state maps",
            "Applying Lean principles",
            "Developing improvement plans",
          ],
        },
      ],
    },
  ],
  examNote:
    "This is a Scaled Agile micro-credential workshop. There is no certification exam. Completing the live session earns the official credential.",
  examGuidelinesHref: "",
  reviews: [
    {
      name: "David Martinez",
      role: "Value Stream Engineer",
      review:
        "This course provided excellent insights into value stream mapping within SAFe. The current state mapping module was particularly valuable for identifying bottlenecks in our delivery process.",
    },
    {
      name: "Jennifer Lee",
      role: "Lean Portfolio Manager",
      review:
        "Great course on value stream optimization. The curriculum is well-structured and the practical exercises helped me understand how to create actionable improvement plans.",
    },
    {
      name: "Robert Thompson",
      role: "Agile Coach",
      review:
        "The future state design section was exactly what I needed. This course bridges the gap between Lean principles and SAFe implementation perfectly.",
    },
  ],
  faqs: faqsFor({
    shortName: "Value Stream Mapping",
    datesTitle: "Upcoming Value Stream Mapping dates",
    certName: "SAFe Value Stream Mapping micro-credential",
    hasExam: false,
    payment: sharedPaymentFaqsMicrocredential(),
    exam: [
      {
        q: "Is there an exam for this course?",
        a: "No. Value Stream Mapping is a Scaled Agile micro-credential. There is no certification exam. Completing the live workshop earns the credential.",
      },
      {
        q: "Do I still get a credential?",
        a: "Yes. Completing the live session earns the official SAFe Value Stream Mapping micro-credential from Scaled Agile, Inc.",
      },
      {
        q: "Is SAFe Studio included?",
        a: "Yes. Enrollment includes official courseware and one year of SAFe Community Platform / Studio access.",
      },
    ],
    generic: [
      {
        q: "What is the SAFe Value Stream Mapping course?",
        a: "The SAFe Value Stream Mapping course helps professionals map and optimize value streams inside the Scaled Agile Framework. It covers value stream identification, current-state mapping, waste elimination, and future-state design.",
      },
      {
        q: "Who should take this course?",
        a: "Product Managers, Product Owners, Agile Coaches, Scrum Masters, Value Stream Engineers, Lean Portfolio Managers, Business Analysts, and anyone involved in optimizing value delivery in a SAFe organization.",
      },
      {
        q: "What are the prerequisites?",
        a: "Basic SAFe knowledge is helpful but not required. The workshop is open to product managers, architects, leaders, and anyone involved in process improvement or value delivery.",
      },
      {
        q: "How long is the course?",
        a: "Value Stream Mapping is a half-day live workshop, about four hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Live virtual training, digital course materials, hands-on mapping exercises, and one year of SAFe Community Platform access. There is no exam.",
      },
      {
        q: "Is this course available online?",
        a: "Yes. We offer live virtual training. Private cohorts can be scheduled for your team.",
      },
    ],
  }),
};

const responsibleAi: CatalogLandingContent = {
  slug: "responsible-ai",
  crumb: "SAFe® RAI",
  title: "Achieving Responsible AI with SAFe Micro-credential Course",
  lede: "Identify the people who own AI risk, evaluate RAI policy, and write Epic Hypothesis Statements that keep AI work inside SAFe.",
  summary:
    "This half-day workshop is how you keep AI work inside SAFe instead of treating it as a side project. You name the people who own AI risk, evaluate Responsible AI policy, and write Epic Hypothesis Statements you can actually backlog. There is no exam — completing the live workshop is the micro-credential.",
  badgeSrc: "/MicroCredential.jpeg",
  badgeAlt: "SAFe Responsible AI micro-credential badge",
  cardTitle: "Responsible AI with SAFe",
  durationLabel: DURATION_HALF,
  includesLine: INCLUDES_MICRO,
  highlights: [
    "Identify and engage stakeholders on AI initiatives",
    "Evaluate and apply Responsible AI policies in SAFe",
    "Write RAI Epic Hypothesis Statements you can backlog",
  ],
  brochureHref: "/Responsible_AI-Brochure_Agile36.pdf",
  datesTitle: "Upcoming Responsible AI dates",
  scheduleCourseName: "Responsible AI with SAFe",
  eyebrow: MICRO_EYEBROW,
  attemptsLine: null,
  curriculumLede: MICRO_CURRICULUM_LEDE,
  whyRows: featuredWhyMicro(
    {
      check: "Name the people who own AI risk",
      usLead: "Stakeholder mapping is the first move, not a slide at the end.",
      usRest:
        "You define roles, concerns, and who must be in the room before policy talk starts.",
      other: "Ethics overviews without named owners do not change how an ART funds AI work.",
    },
    {
      check: "Policy that fits SAFe, not a binder on a shelf",
      usLead: "You evaluate RAI policies against how the ART actually delivers.",
      usRest: "Gaps become backlog items instead of a PDF nobody reads after class.",
      other: "Generic AI ethics training rarely connects policy to PI Planning.",
    },
    {
      check: "An Epic you can put on the portfolio",
      usLead: "The workshop ends with writing an RAI Epic Hypothesis Statement.",
      usRest: "Responsible AI becomes work the train can sequence, not a side conversation.",
      other: "A principles deck without an Epic does not survive the next PI.",
    }
  ),
  outcomes: [
    "Identify and map key stakeholders in AI initiatives",
    "Define roles and responsibilities for Responsible AI",
    "Address stakeholder concerns effectively",
    "Evaluate and implement RAI policies",
    "Communicate the need for RAI across the organization",
    "Write effective RAI Epic Hypothesis Statements",
  ],
  curriculum: [
    {
      day: "Part 1",
      focus: "People and policy",
      modules: [
        {
          title: "Identifying Stakeholders",
          topics: [
            "Map key stakeholders",
            "Define roles and responsibilities",
            "Address stakeholder concerns",
          ],
        },
        {
          title: "Evaluating RAI Policies",
          topics: [
            "Review existing Responsible AI policies",
            "Fit policy to SAFe roles and events",
            "Find gaps that belong on the backlog",
          ],
        },
      ],
    },
    {
      day: "Part 2",
      focus: "Communication and the Epic",
      modules: [
        {
          title: "Communicating the Need for RAI",
          topics: [
            "Make the case to leaders and teams",
            "Connect RAI to delivery risk",
            "Keep the conversation inside SAFe events",
          ],
        },
        {
          title: "Writing an RAI Epic Hypothesis Statement",
          topics: [
            "Draft the hypothesis",
            "Tie it to measurable outcomes",
            "Place the Epic where the portfolio can sequence it",
          ],
        },
      ],
    },
  ],
  examNote:
    "This is a Scaled Agile micro-credential workshop. There is no certification exam. Completing the live session earns the official credential.",
  examGuidelinesHref: "",
  reviews: [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      review:
        "This course provided excellent insights into implementing Responsible AI within SAFe. The stakeholder identification module was particularly valuable for my AI transformation project.",
    },
    {
      name: "Michael Chen",
      role: "Agile Coach",
      review:
        "Great course on integrating RAI practices with SAFe. The curriculum is well-structured and the practical examples helped me understand how to communicate RAI needs effectively.",
    },
    {
      name: "Emily Rodriguez",
      role: "Enterprise Architect",
      review:
        "The RAI Epic Hypothesis Statement section was exactly what I needed. This course bridges the gap between AI ethics and SAFe implementation perfectly.",
    },
  ],
  faqs: faqsFor({
    shortName: "Responsible AI with SAFe",
    datesTitle: "Upcoming Responsible AI dates",
    certName: "Achieving Responsible AI with SAFe micro-credential",
    hasExam: false,
    payment: sharedPaymentFaqsMicrocredential(),
    exam: [
      {
        q: "Is there an exam for this course?",
        a: "No. Achieving Responsible AI with SAFe is a Scaled Agile micro-credential. There is no certification exam. Completing the live workshop earns the credential.",
      },
      {
        q: "Do I still get a credential?",
        a: "Yes. Completing the live session earns the official Achieving Responsible AI with SAFe micro-credential from Scaled Agile, Inc.",
      },
      {
        q: "Is SAFe Studio included?",
        a: "Yes. Enrollment includes official courseware and one year of SAFe Community Platform / Studio access.",
      },
    ],
    generic: [
      {
        q: "What is the Achieving Responsible AI with SAFe course?",
        a: "It helps professionals implement Responsible AI practices inside SAFe: stakeholder identification, RAI policy evaluation, communication, and Epic Hypothesis Statements.",
      },
      {
        q: "Who should take this course?",
        a: "Product Managers and Product Owners on AI work, Agile Coaches, Scrum Masters, Enterprise and Solution Architects, Business Analysts, and anyone involved in AI transformation in a SAFe organization.",
      },
      {
        q: "What are the prerequisites?",
        a: "Prior SAFe experience is helpful but not required. The workshop is designed for both beginners and experienced practitioners integrating AI work with SAFe.",
      },
      {
        q: "How long is the course?",
        a: "Responsible AI with SAFe is a half-day live workshop, about four hours of instruction.",
      },
      {
        q: "What materials are included?",
        a: "Live virtual training, course materials, hands-on exercises, and one year of SAFe Community Platform access. There is no exam.",
      },
      {
        q: "Is this course available online?",
        a: "Yes. We offer live virtual training. Private cohorts can be scheduled for your team.",
      },
    ],
  }),
};

const CAREER: Record<
  string,
  { summary: string; lede: string; next: { href: string; name: string; forWho: string }[] }
> = {
  "leading-safe": {
    summary:
      "This class gives you the Lean-Agile mindset and the working pieces of SAFe so you can run it in a real enterprise, not only talk about it. You practice PI Planning, how Agile Release Trains stay aligned, and how strategy actually reaches delivery. Completing the course is what makes you eligible for the SAFe Agilist exam.",
    lede:
      "Most Agilists do not stop here. The next class depends on the job you actually do — product, teams, or portfolio.",
    next: [
      {
        href: "/courses/product-owner-manager",
        name: "SAFe POPM",
        forWho: "If you own a backlog, features, or PI Planning from the product seat.",
      },
      {
        href: "/courses/scrum-master",
        name: "SAFe Scrum Master",
        forWho: "If you facilitate a team on an ART and want the SSM credential next.",
      },
      {
        href: "/courses/lean-portfolio-management",
        name: "SAFe LPM",
        forWho: "If you fund value streams, set lean budgets, or sit in the PMO.",
      },
    ],
  },
  "product-owner-manager": {
    summary:
      "This class is for people who own product work on an Agile Release Train: the backlog, Lean thinking, and customer-centric delivery. You write epics, features, and stories, manage program and team backlogs, and plan a PI with the rest of the ART. Completing the course is what makes you eligible for the POPM exam.",
    lede: "From POPM, the next step is either deeper product craft or portfolio-level funding.",
    next: [
      {
        href: "/courses/agile-product-management",
        name: "SAFe APM",
        forWho: "If you run product strategy, vision, and roadmaps at enterprise scale.",
      },
      {
        href: "/courses/lean-portfolio-management",
        name: "SAFe LPM",
        forWho: "If your work moved from team backlogs to investment funding and flow.",
      },
    ],
  },
  "scrum-master": {
    summary:
      "This class prepares Scrum Masters to coach a team that sits on an Agile Release Train, not a standalone Scrum team. You run iteration planning, team sync, and retrospectives, and you help the team plan and execute the PI with the rest of the train. Completing the course is what makes you eligible for the SAFe Scrum Master exam.",
    lede: "SSM is the start of the facilitation track. SASM is the usual next class.",
    next: [
      {
        href: "/courses/advanced-scrum-master",
        name: "SAFe Advanced Scrum Master",
        forWho: "If you already coach multiple teams or want the SASM credential.",
      },
      {
        href: "/courses/safe-for-teams",
        name: "SAFe for Teams",
        forWho: "If the rest of the team needs the same ART language you just learned.",
      },
    ],
  },
  "lean-portfolio-management": {
    summary:
      "This class is how portfolio leaders connect strategy to the work that actually gets funded. You practice Strategy and Investment Funding, Agile Portfolio Operations, and Lean Governance, including the Portfolio Canvas and Portfolio Kanban. Completing the course is what makes you eligible for the LPM exam.",
    lede: "LPM pairs with product leadership when the same company is building both funding and product craft.",
    next: [
      {
        href: "/courses/agile-product-management",
        name: "SAFe APM",
        forWho: "If product managers in the same portfolio need design thinking and roadmaps.",
      },
      {
        href: "/courses/leading-safe",
        name: "Leading SAFe",
        forWho: "If leaders on the ART still need the Agilist foundation.",
      },
    ],
  },
  "agile-product-management": {
    summary:
      "This class is for people who own product strategy, not only the team backlog. You use design thinking and continuous exploration to write a vision, strategy, and roadmap, and you work with architects and RTEs to keep ARTs pointed at the same outcomes. Completing the course is what makes you eligible for the APM exam.",
    lede: "APM and LPM are the pair companies use when product and portfolio have to move together.",
    next: [
      {
        href: "/courses/lean-portfolio-management",
        name: "SAFe LPM",
        forWho: "If you now need lean budgets and portfolio flow around that product work.",
      },
      {
        href: "/courses/product-owner-manager",
        name: "SAFe POPM",
        forWho: "If POs on the ART still need the team-level product cert.",
      },
    ],
  },
  "advanced-scrum-master": {
    summary:
      "This class is the next Scrum Master cert after SSM: you move from one-team ceremonies to flow, conflict, and coaching across the ART. You practice built-in quality, Inspect & Adapt, and the problem-solving workshop so you can improve how the train actually delivers. Completing the course is what makes you eligible for the SASM exam.",
    lede: "After SASM, most people either deepen architecture collaboration or stay on the facilitation track with their teams.",
    next: [
      {
        href: "/courses/safe-for-architects",
        name: "SAFe for Architects",
        forWho: "If you work the architectural runway with ARTs and Solution Trains.",
      },
      {
        href: "/courses/scrum-master",
        name: "SAFe Scrum Master",
        forWho: "If teammates still need the SSM foundation you already have.",
      },
    ],
  },
  "safe-for-teams": {
    summary:
      "This class is how a whole team learns to sit on an Agile Release Train together. You write stories, split features, plan and run iterations, and line that work up to the PI. Completing the course is what makes you eligible for the SAFe Practitioner exam.",
    lede: "Once the team shares the language, the usual next certs are the role seats: Scrum Master or POPM.",
    next: [
      {
        href: "/courses/scrum-master",
        name: "SAFe Scrum Master",
        forWho: "If you facilitate the team after this class.",
      },
      {
        href: "/courses/product-owner-manager",
        name: "SAFe POPM",
        forWho: "If you own the backlog for that same ART.",
      },
    ],
  },
  devops: {
    summary:
      "This class is how people who build and run the system get a working Continuous Delivery Pipeline. You map the value stream, find the delays, and practice continuous exploration, integration, and deployment. Completing the course is what makes you eligible for the SAFe DevOps exam.",
    lede: "DevOps usually sits next to the team and architecture classes, not instead of them.",
    next: [
      {
        href: "/courses/scrum-master",
        name: "SAFe Scrum Master",
        forWho: "If you also facilitate delivery on the ART.",
      },
      {
        href: "/courses/safe-for-architects",
        name: "SAFe for Architects",
        forWho: "If your next problem is runway and Solution Intent, not only the pipeline.",
      },
    ],
  },
  "safe-for-architects": {
    summary:
      "This class is for system, solution, and enterprise architects who have to keep architecture pointed at the same outcomes as the business. You plan architectural runway, work Solution Intent, and lead architecture through PI Planning and Lean-Agile transformation. Completing the course is what makes you eligible for the SAFe Architect exam.",
    lede: "Architects often pair this with LPM when architecture and funding have to move on the same portfolio.",
    next: [
      {
        href: "/courses/lean-portfolio-management",
        name: "SAFe LPM",
        forWho: "If you now sit with portfolio on epics, enablers, and lean budgets.",
      },
      {
        href: "/courses/leading-safe",
        name: "Leading SAFe",
        forWho: "If you still need the Agilist foundation before architecture depth.",
      },
    ],
  },
  "release-train-engineer": {
    summary:
      "This class is how you run an Agile Release Train after the planning weekend: servant leadership, coaching, and the operating cadence of the ART. You facilitate PI Planning, manage dependencies and risks, and keep leaders, teams, and Scrum Masters aligned through the PI. Completing the course is what makes you eligible for the RTE exam.",
    lede: "After RTE, the usual next step is either portfolio funding or making sure ART leaders share the same SAFe foundation.",
    next: [
      {
        href: "/courses/lean-portfolio-management",
        name: "SAFe LPM",
        forWho: "If you now sit with the PMO on lean budgets, epics, and portfolio flow.",
      },
      {
        href: "/courses/leading-safe",
        name: "Leading SAFe",
        forWho: "If leaders on the ART still need the Agilist foundation.",
      },
    ],
  },
};

export const CATALOG_LANDING: Record<string, CatalogLandingContent> = {
  "product-owner-manager": popm,
  "leading-safe": leadingSafe,
  "scrum-master": scrumMaster,
  "lean-portfolio-management": lpm,
  "agile-product-management": apm,
  "safe-for-architects": architects,
  "safe-for-teams": safeForTeams,
  devops,
  "advanced-scrum-master": sasm,
  "release-train-engineer": rte,
  "value-stream-mapping": vsm,
  "responsible-ai": responsibleAi,
};

const EXAM_DETAILS: Record<string, NonNullable<CatalogLandingContent["examDetails"]>> = {
  "leading-safe": {
    prerequisites:
      "There are no formal prerequisites or eligibility requirements to become a SAFe® Agilist. However, familiarity and experience with Agile concepts and environments are recommended.",
    format: safeExamFormat({ durationMinutes: 90, questions: 45, passingScore: "80%" }),
  },
  "product-owner-manager": {
    prerequisites:
      "There are no formal prerequisites. A working knowledge of Agile or Scrum, and experience with product backlogs or customer requirements, is recommended but not required.",
    format: safeExamFormat({ durationMinutes: 90, questions: 45, passingScore: "82%" }),
  },
  "scrum-master": {
    prerequisites:
      "There are no formal prerequisites. A basic understanding of Scrum or Agile, and familiarity with iteration-based delivery, is recommended but not required.",
    format: safeExamFormat({ durationMinutes: 90, questions: 45, passingScore: "80%" }),
  },
  "lean-portfolio-management": {
    prerequisites:
      "There are no formal prerequisites. Familiarity with Agile and experience in product, program, or portfolio work is recommended. Leading SAFe is helpful before this class.",
    format: safeExamFormat({ durationMinutes: 90, questions: 45, passingScore: "77% (35/45)" }),
  },
  "agile-product-management": {
    prerequisites:
      "There are no formal prerequisites. A basic understanding of Agile and experience in product management or software delivery is recommended.",
    format: safeExamFormat(),
  },
  "safe-for-architects": {
    prerequisites:
      "There are no formal prerequisites. Architecture experience is recommended. Leading SAFe is helpful.",
    format: safeExamFormat(),
  },
  "safe-for-teams": {
    prerequisites:
      "There are no formal prerequisites. A basic understanding of Agile and experience on a software or delivery team is recommended.",
    format: safeExamFormat({ durationMinutes: 90, questions: 45, passingScore: "76%" }),
  },
  devops: {
    prerequisites:
      "There are no formal prerequisites. Experience in software development, testing, or IT operations is recommended.",
    format: safeExamFormat({ questions: 45 }),
  },
  "advanced-scrum-master": {
    prerequisites:
      "Experience as a Scrum Master or Agile Coach is recommended. Familiarity with SAFe and team-level delivery is expected, and SAFe Scrum Master (SSM) certification is often preferred.",
    format: safeExamFormat({ passingScore: "82%" }),
  },
  "release-train-engineer": {
    prerequisites:
      "Leading SAFe (SA) or SAFe Scrum Master (SSM) certification is recommended. Experience with Agile teams and PI Planning is helpful.",
    format: safeExamFormat(),
  },
};

export function getCatalogLanding(slug: string): CatalogLandingContent {
  const content = CATALOG_LANDING[slug];
  if (!content) {
    throw new Error(`Missing catalog landing content for ${slug}`);
  }
  const career = CAREER[slug];
  const examDetails = EXAM_DETAILS[slug];
  return {
    ...content,
    ...(career
      ? { summary: career.summary, careerPath: { lede: career.lede, next: career.next } }
      : {}),
    ...(examDetails ? { examDetails } : {}),
  };
}
