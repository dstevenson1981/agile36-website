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
 * Keys are lowercased, trimmed instructor_name values from course_schedules.
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

  "marcus ball": {
    name: "Marcus Ball",
    title: "SAFe® Practice Consultant (SPC®), Enterprise Agile Coach",
    image: "/marcus.jpeg",
    bio: [
      "Marcus Ball is an Enterprise Agile Coach with Agile36, specializing in Scaled Agile Framework (SAFe®) certification training and enterprise transformation coaching. He helps organizations build stronger delivery teams, improve alignment, and navigate today's fast-paced business landscape with agility and confidence.",
      "His coaching is rooted in the belief that organizations unlock extraordinary potential when they embrace Lean-Agile principles. Over the course of his career, Marcus has guided teams and leaders through adopting Agile practices, strengthening collaboration, and building a culture of continuous improvement.",
      "With Agile36, he delivers high-quality SAFe certification training designed to equip teams, leaders, and organizations with the skills needed to improve flow, increase value delivery, and operate more effectively. As a certified SAFe Program Consultant (SPC), Marcus focuses on practical application and capabilities that support long-term success.",
    ],
    clients: [
      { name: "Anthem", logo: "/instructors/clients/anthem.svg" },
      { name: "KPMG", logo: "/instructors/clients/kpmg.svg" },
      { name: "Cox Communications", logo: "/instructors/clients/cox.svg" },
      { name: "Macy's", logo: "/instructors/clients/macys.svg" },
    ],
    testimonials: [
      {
        name: "Daniel Torres",
        role: "Scrum Master",
        quote:
          "Marcus kept the class focused and practical. SAFe concepts finally clicked, and I left with clear next steps for my team.",
      },
      {
        name: "Angela Brooks",
        role: "Product Owner",
        quote:
          "Excellent facilitation from Marcus. Real-world examples and steady pacing made a dense curriculum feel manageable and useful.",
      },
      {
        name: "Kevin Patel",
        role: "Delivery Lead",
        quote:
          "Marcus brings deep SPC experience without the fluff. Engaging sessions, strong Q&A, and content I could apply the next day.",
      },
    ],
  },

  "joe puoci": {
    name: "Joe Puoci",
    title: "SAFe® Practice Consultant (SPC®), Enterprise Agile Coach",
    image: "/Joe.jpeg",
    bio: [
      "Joe Puoci is a SAFe® Program Consultant (SPC) and enterprise trainer with Agile36, delivering live virtual SAFe certification courses across the portfolio. He focuses on practical application of the Scaled Agile Framework so teams and leaders can improve flow, alignment, and delivery outcomes.",
      "Joe brings hands-on experience guiding organizations through SAFe adoption, team-level execution, and program-level planning. His training emphasizes real-world scenarios, clear facilitation, and skills learners can apply immediately after class.",
      "Learners work with an SPC who combines deep framework knowledge with a straightforward, outcome-oriented teaching style—helping you prepare for certification and for the day-to-day work of operating in a SAFe environment.",
    ],
    clients: [
      { name: "ADP", logo: "/instructors/clients/adp.svg" },
      { name: "Experian", logo: "/instructors/clients/experian.svg" },
      { name: "Accenture", logo: "/instructors/clients/accenture.svg" },
      { name: "CVS Health", logo: "/instructors/clients/cvs-health.svg" },
      { name: "Amazon", logo: "/instructors/clients/amazon.svg" },
    ],
    testimonials: [
      {
        name: "Rachel Nguyen",
        role: "Release Train Engineer",
        quote:
          "Joe's teaching style is clear and no-nonsense. He connected every SAFe topic back to how we actually run our ART.",
      },
      {
        name: "Chris Alvarez",
        role: "Program Manager",
        quote:
          "Great class with Joe. Practical examples, strong facilitation, and excellent preparation for the certification exam.",
      },
      {
        name: "Samantha Reed",
        role: "Agile Coach",
        quote:
          "Joe made complex SAFe material approachable. Interactive, well-paced, and immediately relevant to our transformation work.",
      },
    ],
  },

  "martina svoboda": {
    name: "Martina Svoboda",
    title: "SAFe® Practice Consultant (SPC®), Enterprise Agile Coach",
    image: "/martina.jpg",
    bio: [
      "Martina Svoboda is a SAFe® Practice Consultant (SPC®) and enterprise Agile coach who partners with Agile36 to deliver live, instructor-led SAFe certification training. She brings a practical, learner-centered approach that helps teams and leaders turn framework concepts into day-to-day delivery habits.",
      "With experience spanning Agile transformation, organizational development, and change leadership, Martina focuses on building collaboration, improving flow, and creating environments where teams take ownership of outcomes. Her facilitation style emphasizes clarity, real-world application, and skills you can use immediately after class.",
    ],
    linkedin: "https://www.linkedin.com/in/martinasvoboda",
    clients: [
      { name: "Honeywell", logo: "/instructors/clients/honeywell.svg" },
      { name: "Anthem", logo: "/instructors/clients/anthem.svg" },
      { name: "EY", logo: "/instructors/clients/ey.svg" },
      { name: "Blue Cross Blue Shield", logo: "/instructors/clients/blue-cross-blue-shield.svg" },
      { name: "Humana", logo: "/instructors/clients/humana.svg" },
    ],
    testimonials: [
      {
        name: "Olivia Hart",
        role: "Scrum Master",
        quote:
          "Martina created a welcoming, focused class. She explained SAFe clearly and made space for questions that mattered to our work.",
      },
      {
        name: "James Okonkwo",
        role: "Product Manager",
        quote:
          "Practical, well-structured training with Martina. Strong facilitation and examples that helped me connect SAFe roles to my day job.",
      },
      {
        name: "Elena Vasquez",
        role: "Agile Transformation Lead",
        quote:
          "Martina balances framework depth with real coaching insight. I left more confident applying SAFe practices with my teams.",
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
