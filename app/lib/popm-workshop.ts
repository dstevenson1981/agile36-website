export const POPM_WORKSHOP_BOARD_ID = "popm";

export type PopmActivity = {
  id: string;
  code: string;
  title: string;
  prompt: string;
};

export const POPM_ACTIVITIES: PopmActivity[] = [
  {
    id: "kanban",
    code: "0.1.1",
    title: "Course Kanban",
    prompt: "Drop the work we are tracking this class — one sticky per item.",
  },
  {
    id: "parking-lot",
    code: "0.1.2",
    title: "Parking Lot",
    prompt: "Park questions and ideas we should come back to.",
  },
  {
    id: "feedback",
    code: "0.1.3",
    title: "Course Feedback",
    prompt: "What is landing, and what should we change?",
  },
  {
    id: "icebreaker",
    code: "0.2.1",
    title: "Where in the World",
    prompt: "Add a sticky with your name and city.",
  },
  {
    id: "principles",
    code: "EXTRA",
    title: "Agile Principles at Scale",
    prompt: "Which principle is hardest in your organization — and why?",
  },
  {
    id: "feature-storming",
    code: "EXTRA",
    title: "Feature Storming",
    prompt: "Capture candidate features. One sticky per feature.",
  },
  {
    id: "wsjf",
    code: "EXTRA",
    title: "Prioritize with WSJF",
    prompt: "Score features: user-business value, time criticality, risk reduction / opportunity enablement, job size.",
  },
  {
    id: "vision",
    code: "3.1.1",
    title: "Communicate the Vision",
    prompt: "Write the product vision in plain language a team could plan from.",
  },
  {
    id: "dependencies",
    code: "3.3.1",
    title: "Dependencies",
    prompt: "Name the dependency, who owns it, and what would unblock it.",
  },
  {
    id: "stories",
    code: "EXTRA",
    title: "Stories, AC, and Estimating",
    prompt: "Draft a user story, acceptance criteria, and a relative size.",
  },
];
