export const POPM_WORKSHOP_BOARD_ID = "popm";

export type PopmActivity = {
  id: string;
  code: string;
  title: string;
  prompt: string;
  template: "storm" | "wsjf" | "stories";
};

export const POPM_ACTIVITIES: PopmActivity[] = [
  {
    id: "feature-storming",
    code: "EXTRA",
    title: "Feature Storming and Refining",
    prompt: "Storm features for the epic, then move the ones you keep into Refined Features.",
    template: "storm",
  },
  {
    id: "wsjf",
    code: "EXTRA",
    title: "Prioritize Features using WSJF",
    prompt: "Score each feature with Fibonacci (1, 2, 3, 5, 8, 13, 21). Cost of Delay = UBV + time criticality + RR/OE. WSJF = Cost of Delay ÷ job size.",
    template: "wsjf",
  },
  {
    id: "stories",
    code: "EXTRA",
    title: "User Stories, Acceptance Criteria, and Estimating Stories",
    prompt: "Put the selected feature at the top, split it into stories, then write acceptance criteria.",
    template: "stories",
  },
];
