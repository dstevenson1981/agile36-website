import type { CourseScheduleRow } from "@/app/lib/schedule-display";

export type WhyRow = {
  n: string;
  check: string;
  usLead: string;
  usRest: string;
  other: string;
  featured?: boolean;
};

export type CurriculumModule = {
  title: string;
  weight?: string;
  featured?: boolean;
  topics: string[];
};

export type CurriculumDay = {
  day: string;
  focus: string;
  modules: CurriculumModule[];
};

export type FaqItem = { q: string; a: string };

export type CatalogLandingContent = {
  slug: string;
  crumb: string;
  title: string;
  lede: string;
  badgeSrc: string;
  badgeAlt: string;
  cardTitle: string;
  durationLabel: string;
  includesLine: string;
  highlights: [string, string, string];
  brochureHref?: string;
  assessmentLabel?: string;
  assessmentHref?: string;
  examName?: string;
  datesTitle: string;
  scheduleCourseName: string;
  whyRows: WhyRow[];
  outcomes: string[];
  curriculum: CurriculumDay[];
  examNote: string;
  examGuidelinesHref: string;
  reviews: { name: string; role: string; review: string }[];
  certificateSrc?: string;
  certificateTitle?: string;
  practiceTestTitle?: string;
  practiceQuestions?: string;
  practiceDuration?: string;
  /** Hero eyebrow. Defaults to SAFe® Certification · Live Online. */
  eyebrow?: string;
  /** Hero line under the lede. Omit or pass null to hide (micro-credentials with no exam). */
  attemptsLine?: string | null;
  /** Curriculum intro. Defaults to Scaled Agile outline / exam-prep copy. */
  curriculumLede?: string;
  whyOtherLabel?: string;
  faqs: {
    courses: FaqItem[];
    exam: FaqItem[];
    payment: FaqItem[];
    generic: FaqItem[];
  };
};

export function daysFromDomains(
  domains: { title: string; weight?: string; topics: string[] }[],
  focuses: string[],
  dayCount = 2
): CurriculumDay[] {
  const scored = domains.map((d, i) => {
    const n = parseFloat(String(d.weight || "").replace(/[^\d.]/g, "")) || 0;
    return { ...d, i, n };
  });
  const featuredTitle = scored.reduce((best, d) => (d.n > best.n ? d : best), scored[0])?.title;
  const size = Math.ceil(domains.length / dayCount);
  return Array.from({ length: dayCount }, (_, dayIndex) => {
    const slice = domains.slice(dayIndex * size, dayIndex * size + size);
    return {
      day: `Day ${dayIndex + 1}`,
      focus: focuses[dayIndex] || `Day ${dayIndex + 1}`,
      modules: slice.map((mod) => ({
        title: mod.title,
        weight: mod.weight,
        featured: mod.title === featuredTitle,
        topics: mod.topics,
      })),
    };
  });
}

export function sharedWhyTail(examAttempts: 1 | 2 = 2): WhyRow[] {
  const oneAttempt = examAttempts === 1;
  return [
    {
      n: "04",
      check: "Certification confidence",
      usLead: oneAttempt
        ? "One exam attempt is included."
        : "Two exam attempts are included.",
      usRest: oneAttempt
        ? "Exam preparation is incorporated into the training. Additional attempts can be purchased from Scaled Agile if you need them."
        : "Exam preparation is incorporated into the training, with a second attempt included if you need it.",
      other: "Exam retake policies and additional costs vary by provider.",
    },
    {
      n: "05",
      check: "Your class actually runs",
      usLead: "Register for the date you want with confidence.",
      usRest: "Agile36 classes are guaranteed to run, even with a small cohort.",
      other: "Some providers cancel or consolidate classes when enrollment is low.",
    },
    {
      n: "06",
      check: "Beyond the certification",
      usLead: "Leave with skills you can use Monday morning.",
      usRest:
        "Apply what you learn to real work — not just questions you'll encounter on the exam.",
      other: "The learning experience may be optimized primarily around completing the certification.",
    },
  ];
}

export function sharedWhyTailMicrocredential(): WhyRow[] {
  return [
    {
      n: "04",
      check: "The official micro-credential",
      usLead: "Completion of the live workshop is the credential.",
      usRest: "There is no exam. You leave with the official Scaled Agile micro-credential.",
      other: "Some listings treat this as a webinar with no credential attached.",
    },
    {
      n: "05",
      check: "Your class actually runs",
      usLead: "Register for the date you want with confidence.",
      usRest: "Agile36 classes are guaranteed to run, even with a small cohort.",
      other: "Some providers cancel or consolidate classes when enrollment is low.",
    },
    {
      n: "06",
      check: "Skills you can use Monday morning",
      usLead: "Class time is spent on the work, not an exam cram.",
      usRest: "You practice the mapping, policy, or facilitation skill the credential names.",
      other: "Slide-only sessions rarely give time to do the work in class.",
    },
  ];
}

export function sharedPaymentFaqs(): FaqItem[] {
  return [
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards and debit cards. For corporate training, we also accept purchase orders and wire transfers.",
    },
    {
      q: "Are there any installment payment options?",
      a: "Yes, we offer flexible monthly payment plans. Contact our course advisors to discuss payment plan options that work for you.",
    },
    {
      q: "Is there a refund policy?",
      a: "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Participants who arrive more than fifteen (15) minutes late to a scheduled class session will be locked out of the classroom and marked as a no-call, no-show. For questions, please email d.stevenson@agile36.com.",
    },
    {
      q: "Do you offer discounts for group enrollments?",
      a: "Yes, we offer significant discounts for group enrollments. Contact us for corporate training rates and group discounts.",
    },
    {
      q: "Are there any hidden fees?",
      a: "No, the course price includes all training materials, the certification exam, and one year of access to the SAFe Community Platform. There are no hidden fees.",
    },
  ];
}

export function sharedPaymentFaqsMicrocredential(): FaqItem[] {
  return sharedPaymentFaqs().map((item) =>
    item.q === "Are there any hidden fees?"
      ? {
          ...item,
          a: "No, the course price includes live training, official courseware, and one year of access to the SAFe Community Platform. There is no exam and there are no hidden fees.",
        }
      : item
  );
}

export function sharedCourseFaqs(args: {
  shortName: string;
  datesTitle: string;
  certName: string;
  hasExam?: boolean;
}): FaqItem[] {
  const hasExam = args.hasExam !== false;
  return [
    {
      q: "What if I miss a class? Are there any money back options?",
      a: "If you miss a class, you can attend the next available session at no additional cost. Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. For questions, please email d.stevenson@agile36.com.",
    },
    {
      q: "If I want to know more about Training, whom should I connect with?",
      a: "You can reach out to our course advisors on this page, or email d.stevenson@agile36.com. We're available to answer questions about the training program, schedules, and enrollment.",
    },
    {
      q: "Is there any option to complete the Training in the native language if a participant chooses to?",
      a: `Currently, our ${args.shortName} training is conducted in English. We do offer course materials in multiple languages. Please contact us to discuss your language requirements.`,
    },
    {
      q: "Can I receive personalized Training at my convenience?",
      a: "Yes, we offer private/corporate training sessions that can be scheduled at your convenience. Contact us to discuss your specific training needs.",
    },
    {
      q: "Where do I find the upcoming schedules of my course?",
      a: `Upcoming live dates are listed on this page under ${args.datesTitle}. Choose a cohort and enroll without visiting a separate schedule page.`,
    },
    {
      q: "After enrollment, can I change the date of my training class?",
      a: "Yes, participants may reschedule to another session at no additional cost when the request is submitted at least twenty-four (24) hours prior to the original class start time. All rescheduling requests must be submitted via email to d.stevenson@agile36.com so they can be processed promptly.",
    },
    {
      q: "Do I get any certificate upon completion of the course?",
      a: hasExam
        ? `Yes, upon successful completion of the course and passing the certification exam, you'll receive the official ${args.certName} certificate from Scaled Agile, Inc.`
        : `Yes. Completing the live ${args.shortName} workshop earns the official ${args.certName} from Scaled Agile, Inc. There is no certification exam.`,
    },
  ];
}

export type { CourseScheduleRow };
