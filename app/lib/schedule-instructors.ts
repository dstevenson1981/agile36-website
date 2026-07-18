export type ScheduleInstructorClient = {
  name: string;
  logo: string;
};

export type ScheduleInstructorTestimonial = {
  name: string;
  role?: string;
  quote: string;
};

export type ScheduleInstructorProfile = {
  name: string;
  title: string;
  image: string;
  /** Full trainer bio for the expanded schedule-card panel (paragraphs). */
  bio: string[];
  /** Optional LinkedIn profile URL shown in the Learn More panel. */
  linkedin?: string;
  /** Client logos shown under “Clients worked with”. */
  clients: ScheduleInstructorClient[];
  /** Testimonials shown in the Reviews tab. */
  testimonials: ScheduleInstructorTestimonial[];
};

/**
 * Rich instructor profiles used by schedule cards (Learn More expand panel).
 * Only Deadra is wired first; other trainers keep the compact row until added here.
 */
const SCHEDULE_INSTRUCTOR_PROFILES: Record<string, ScheduleInstructorProfile> = {
  "deadra stevenson": {
    name: "Deadra Stevenson",
    title: "SAFe® Practice Consultant (SPC®), Enterprise Agile Coach & AI Transformation Leader",
    image: "/Deadra.jpeg",
    bio: [
      "Deadra Stevenson is the CEO and Founder of Agile36 and a SAFe® Practice Consultant (SPC®) based in Miami, Florida. With more than 15 years guiding large-scale change, she has led 30+ Lean-Agile transformations for Fortune and enterprise organizations—helping executives and delivery teams turn complex frameworks into measurable outcomes.",
      "She pairs deep SAFe expertise with practical leadership coaching and AI transformation guidance, enabling organizations to strengthen portfolio alignment, accelerate delivery flow, and modernize how work gets done. Known for making enterprise Agile and AI concepts clear, relatable, and immediately actionable, Deadra partners with leaders who need high-impact training and lasting transformation results.",
    ],
    linkedin: "https://www.linkedin.com/in/deadra-stevenson-a20a6a1a2/",
    clients: [
      { name: "Disney", logo: "/instructors/clients/disney.svg" },
      { name: "ADP", logo: "/instructors/clients/adp.svg" },
      { name: "Anthem", logo: "/instructors/clients/anthem.svg" },
      { name: "Google", logo: "/instructors/clients/google.svg" },
      { name: "Amazon", logo: "/instructors/clients/amazon.svg" },
    ],
    testimonials: [
      {
        name: "Brandon Johnson",
        role: "Student feedback",
        quote:
          "Clear, practical, and engaging from start to finish. Deadra made SAFe concepts immediately usable in our real work.",
      },
      {
        name: "Michelle Chang",
        role: "Agile Transformation Lead",
        quote:
          "Outstanding training with Deadra. Her real-world examples of enterprise Agile transformations made complex SAFe concepts easy to understand and apply.",
      },
      {
        name: "Patricia Moore",
        role: "Enterprise Agile Coach",
        quote:
          "Deadra brings years of practical experience to every session. The course was well-organized, and I left ready to apply SAFe principles in my organization.",
      },
    ],
  },
};

export function getScheduleInstructorProfile(
  instructorName?: string | null
): ScheduleInstructorProfile | null {
  if (!instructorName?.trim()) return null;
  return SCHEDULE_INSTRUCTOR_PROFILES[instructorName.trim().toLowerCase()] ?? null;
}
