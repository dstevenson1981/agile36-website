import type { CatalogLandingContent, ExamFormatLine, FaqItem } from "@/app/lib/catalog-landing";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";
import { learnerReviewCount, learnerReviewCountLabel } from "@/app/lib/learner-review-count";
import { BANNER_DISCOUNT_AMOUNT } from "@/app/lib/site-promo";
import { getFeaturedScheduleInstructorProfiles } from "@/app/lib/schedule-instructors";
import {
  SCALED_AGILE_TRAINING_FEEDBACK_URL,
  SCHEMA_ORGANIZATION_ID,
  SCHEMA_ORGANIZATION_LOGO_URL,
} from "@/app/lib/schema-site";
import { CLAUDE_PARTNER_BADGE_URL } from "@/app/lib/course-partners";

const REFUND =
  "Full refunds are available for cancellations submitted thirty (30) or more days before your original scheduled start date. Cancellations received within thirty (30) days of your original scheduled class start date are not eligible for a refund. Registrations purchased using promotional codes, coupon codes, or any discounted pricing are non-refundable at all times. Classes rescheduled due to customer conflicts are not eligible for refunds. Participants who do not attend a scheduled session and do not provide advance notice forfeit all fees paid. Email d.stevenson@agile36.com.";

const RESCHEDULE =
  "You can move to another session at no additional cost when the request is submitted at least twenty-four (24) hours before the original class start time. Email d.stevenson@agile36.com.";

/**
 * Glassdoor figures already printed on these course pages. Do not add a course here without a sourced figure.
 * TODO: salary answers for courses not in this map.
 */
const SALARY_ANSWER: Record<string, string> = {
  "product-owner-manager":
    "The median total pay is $151,000. Glassdoor’s 2026 Product Owner page, from 13,035 US salaries, lists that median, with a most likely range of $121,000 to $191,000. Total pay includes base plus bonus and other cash pay. City and industry move the number, and this is market data, not a salary Agile36 can promise.",
  "scrum-master":
    "Glassdoor’s 2026 Scrum Master page, from 10,181 US salaries reported as of October 8, 2026, lists a median total pay of $129,000, with a most likely range of $103,000 to $162,000. Total pay includes base plus additional pay. This is market data, not a salary Agile36 can promise.",
  "advanced-scrum-master":
    "This class is for people already doing the Scrum Master job. Glassdoor’s 2026 Scrum Master page, from 10,181 salaries reported as of October 8, 2026, puts the senior total-pay band at $134,000 to $197,000. Median total pay for the role overall is $129,000. These are market figures, not a salary Agile36 can promise.",
  "agile-product-management":
    "Glassdoor’s 2026 Product Manager page, from 93,230 US salaries reported as of October 8, 2026, lists a median total pay of $160,000, with a most likely range of $129,000 to $201,000. Total pay includes base plus additional pay. This is market data, not a salary Agile36 can promise.",
};

function lineText(line: ExamFormatLine): string {
  return `${line.before || ""}${line.highlight}${line.after || ""}`;
}

function examBlob(content: CatalogLandingContent): string {
  return [content.examNote, ...(content.examDetails?.format || []).map(lineText)].join(" ");
}

function matchNumber(blob: string, pattern: RegExp): string | null {
  const match = blob.match(pattern);
  return match?.[1] || null;
}

export function courseDisplayName(content: CatalogLandingContent): string {
  return content.crumb || content.cardTitle;
}

export function openingDefinition(content: CatalogLandingContent): string {
  const name = courseDisplayName(content);
  const duration = content.durationLabel.replace(/\s*·\s*/g, ", ");
  const credential = content.cardTitle || name;
  const attempts = content.attemptsLine?.replace(/\.$/, "");
  const exam = attempts
    ? `${attempts}.`
    : content.safePartner === false
      ? "Check the exam section for what this class includes."
      : "The tuition includes the exam attempts listed on this page.";
  return `${name} is a ${duration} live class that leads to ${credential}. ${exam}`;
}

export function discountAnswer(content: CatalogLandingContent): string {
  const name = courseDisplayName(content);
  const price = COURSE_HERO_SCHEDULE_LIST_USD[content.slug];
  const through = content.promoEndsAt
    ? ` The offer runs through ${new Date(content.promoEndsAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" })}.`
    : "";
  let combined = "";
  if (content.discountStacks && price) {
    const finalPrice = price.current - BANNER_DISCOUNT_AMOUNT;
    combined = ` The listed price is $${price.current.toLocaleString("en-US")}. With the $${BANNER_DISCOUNT_AMOUNT} code applied, that is $${finalPrice.toLocaleString("en-US")}.`;
  }
  return `Agile36 offers $${BANNER_DISCOUNT_AMOUNT} off ${name} for Black Friday. Enter your email in the banner to get the code, then apply it at checkout. The offer ends at 4:00 PM EST on November 27, 2026.${combined}${through}`;
}

function examFacts(content: CatalogLandingContent) {
  const blob = examBlob(content);
  const minutes = matchNumber(blob, /(\d+)\s*minutes/i);
  const questions = matchNumber(blob, /(\d+)\s*questions/i);
  const passing = blob.match(/(\d{2,3}%)/)?.[1] || null;
  const closed = /closed book/i.test(blob);
  const open = /open book/i.test(blob);
  const retake = blob.match(/\$[\d,]+/)?.[0] || null;
  const includes = `${content.includesLine} ${content.attemptsLine || ""}`;
  const pdus = matchNumber(includes, /(\d+)\s*PDUs?/i);
  const seus = matchNumber(includes, /(\d+)\s*SEUs?/i);
  const attempts = /two exam attempts|2 attempts/i.test(includes)
    ? "2"
    : /one exam attempt|1 attempt/i.test(includes)
      ? "1"
      : null;
  return { minutes, questions, passing, closed, open, retake, pdus, seus, attempts, noExam: /no exam/i.test(blob) };
}

export function examDetailLines(content: CatalogLandingContent): { label: string; value: string }[] {
  const facts = examFacts(content);
  const lines: { label: string; value: string }[] = [];
  if (facts.noExam) lines.push({ label: "Exam", value: "This class does not include a certification exam." });
  if (facts.questions) lines.push({ label: "Questions", value: facts.questions });
  if (facts.minutes) lines.push({ label: "Time limit", value: `${facts.minutes} minutes` });
  if (facts.passing) lines.push({ label: "Passing score", value: facts.passing });
  if (facts.attempts) lines.push({ label: "Attempts included", value: facts.attempts });
  if (facts.retake) lines.push({ label: "Retake fee", value: facts.retake });
  if (facts.pdus) lines.push({ label: "PDUs", value: facts.pdus });
  if (facts.seus) lines.push({ label: "SEUs", value: facts.seus });
  return lines;
}

export function policyLines(content: CatalogLandingContent): { label: string; value: string }[] {
  return [
    { label: "Refund", value: REFUND },
    { label: "Reschedule", value: RESCHEDULE },
    {
      label: "Class runs",
      value: `Every listed Agile36 ${courseDisplayName(content)} cohort is guaranteed to run, including a small group.`,
    },
  ];
}

function q(question: string, answer: string): FaqItem {
  return { q: question, a: answer };
}

export function buildAeoFaqs(content: CatalogLandingContent): CatalogLandingContent["faqs"] {
  const name = courseDisplayName(content);
  const facts = examFacts(content);
  const price = COURSE_HERO_SCHEDULE_LIST_USD[content.slug];
  const trainers = getFeaturedScheduleInstructorProfiles().map((profile) => profile.name);
  const next = content.careerPath?.next[0];
  const count = learnerReviewCountLabel(content.slug);
  const book = facts.closed ? "closed book" : facts.open ? "open book" : null;

  const course: FaqItem[] = [
    q(
      `What is ${name} certification training?`,
      openingDefinition(content) + (content.summary ? ` ${content.summary}` : ""),
    ),
    q(
      `Who should take ${name}?`,
      content.examDetails?.prerequisites
        ? `${content.examDetails.prerequisites} The class is listed on this page as ${content.durationLabel}.`
        : `${name} is listed on this page as ${content.durationLabel}. Read the overview for who the class is built for.`,
    ),
    q(
      `What are the prerequisites for ${name}?`,
      content.examDetails?.prerequisites || `Prerequisite details for ${name} are not listed as a separate field on this page.`,
    ),
    q(
      `How long is the ${name} class?`,
      `${name} is ${content.durationLabel}. The dates and daily hours for each cohort are in the schedule on this page.`,
    ),
    q(
      `Is ${name} live online or in person?`,
      `${name} at Agile36 is live and instructor-led online. Private teams can ask for an in-person or virtual cohort. It is not a recording.`,
    ),
    q(
      `What is included with ${name} at Agile36?`,
      content.includesLine,
    ),
    q(
      `What can I do after ${name}?`,
      content.careerPath?.lede ||
        (content.outcomes[0]
          ? `After class, the work this page trains is: ${content.outcomes.slice(0, 2).join(" ")}`
          : `The skills for ${name} are listed in the curriculum on this page.`),
    ),
    q(
      `Is ${name} worth it?`,
      content.whyRows[0]
        ? `Yes. ${content.whyRows[0].usLead} ${content.whyRows[0].usRest}`
        : `Yes, when the work on this page matches the job. The reasons to take ${name} with Agile36 are in the comparison on this page.`,
    ),
    q(
      content.slug === "product-owner-manager"
        ? "SAFe POPM vs CSPO: which is better?"
        : `How does ${name} compare to the closest related certification?`,
      content.slug === "product-owner-manager"
        ? "Neither is better for every job. CSPO, from Scrum Alliance, is the team-level Scrum Product Owner credential. SAFe POPM is for the Product Owner and Product Manager on an Agile Release Train. Choose CSPO when the job is one Scrum team. Choose POPM when the job sits on a SAFe train."
        : next
          ? `The next class listed after ${name} is ${next.name}. ${next.forWho}`
          : `A side-by-side with another certification is not in the ${name} data yet.`,
    ),
    q(
      content.slug === "product-owner-manager"
        ? "Which SAFe certification is best for a Product Owner?"
        : `Which SAFe certification is best for my role if I am looking at ${name}?`,
      content.slug === "product-owner-manager"
        ? "SAFe POPM, when the Product Owner works on an Agile Release Train. Leading SAFe is the overview for leaders who need the whole picture. SAFe Scrum Master is the credential for facilitating a team on that train."
        : `${name} is the class to take when the work on this page matches your job. ${content.outcomes.slice(0, 2).join(" ")}`.trim(),
    ),
    q(
      content.slug === "product-owner-manager"
        ? "What is the average salary of a SAFe POPM certified Product Owner?"
        : `What is the average salary for the role ${name} trains?`,
      SALARY_ANSWER[content.slug] ||
        `Agile36 does not publish an average salary for the ${name} role on this page.`,
    ),
  ];

  const exam: FaqItem[] = facts.noExam
    ? [
        q(`Is there an exam for ${name}?`, `${name} does not include a certification exam. Completing the live class is what this page lists as the credential.`),
        q(`How many questions are on the ${name} exam?`, `${name} has no exam, so there is no question count.`),
        q(`How long is the ${name} exam?`, `${name} has no timed exam. The class length is ${content.durationLabel}.`),
        q(`What is the passing score for the ${name} exam?`, `${name} has no exam, so there is no passing score.`),
        q(`Is the ${name} exam open book or closed book?`, `${name} has no exam, so open-book or closed-book rules do not apply.`),
        q(`How many exam attempts are included with ${name}?`, `${name} does not include exam attempts because there is no exam.`),
        q(`What is the retake cost for the ${name} exam?`, `${name} has no exam, so there is no retake fee.`),
        q(`How soon do you get ${name} exam results?`, `${name} has no exam. The credential on this page comes from completing the live class.`),
        q(`Is there a practice test for ${name}?`, content.assessmentHref ? `Yes. A practice assessment for ${name} is linked on this page.` : `This page does not list a practice test for ${name}.`),
        q(`How long is the ${name} certification valid?`, `A validity period for ${name} is not in this page's data.`),
        q(`What does it cost to renew ${name}, and how do you renew?`, `A renewal fee for ${name} is not in this page's data.`),
      ]
    : [
        q(
          `What is the format of the ${name} exam?`,
          content.examDetails?.format?.length
            ? content.examDetails.format.map(lineText).join(" ")
            : content.examNote,
        ),
        q(
          `How many questions are on the ${name} exam?`,
          facts.questions
            ? `The ${name} exam is ${facts.questions} questions.`
            : `A question count for the ${name} exam is not in this page's data. Check the official exam guidelines linked on this page.`,
        ),
        q(
          `How long is the ${name} exam?`,
          facts.minutes
            ? `The ${name} exam time limit is ${facts.minutes} minutes.`
            : `A time limit for the ${name} exam is not in this page's data. Check the official exam guidelines linked on this page.`,
        ),
        q(
          `What is the passing score for the ${name} exam?`,
          facts.passing
            ? `The passing score listed for the ${name} exam is ${facts.passing}.`
            : `A passing score for the ${name} exam is not in this page's data. Check the official exam guidelines linked on this page.`,
        ),
        q(
          `Is the ${name} exam open book or closed book?`,
          book
            ? `The ${name} exam is ${book}.`
            : `Open-book or closed-book status for the ${name} exam is not in this page's data.`,
        ),
        q(
          `How many exam attempts are included with ${name}?`,
          facts.attempts
            ? `${facts.attempts === "1" ? "One exam attempt is" : "Two exam attempts are"} included with ${name}. ${content.attemptsLine || content.includesLine}`
            : content.attemptsLine || `The attempt count for ${name} is in the included-with-tuition line on this page.`,
        ),
        q(
          `What is the retake cost for the ${name} exam?`,
          facts.retake
            ? `After the included attempts, the retake fee listed for ${name} is ${facts.retake}.`
            : `A retake fee for ${name} is not in this page's data. Later retakes follow the certifying body's current fee.`,
        ),
        q(
          `How soon do you get ${name} exam results?`,
          /result shows when you submit/i.test(examBlob(content))
            ? `The result shows when you submit. The exam also submits when the timer ends.`
            : `A separate results-delay figure is not in this page's data. The exam submits when the timer ends, and unanswered questions are marked wrong.`,
        ),
        ...(content.slug === "product-owner-manager"
          ? [
              q(
                `What do I get when I pass the ${name} exam?`,
                `Scaled Agile issues the AI-Empowered SAFe 6 Product Owner/Product Manager certificate and digital badge. This class also includes a free AI-Native SAFe Product Owner/Product Manager upgrade.`,
              ),
              q(
                "Who issues the SAFe POPM certification?",
                "Scaled Agile, Inc. issues the exam, the certificate, and the digital badge. Agile36 teaches the class.",
              ),
              q(
                "What is the difference between PSPO and SAFe POPM?",
                "PSPO is Scrum.org’s Professional Scrum Product Owner credential for a team-level Scrum Product Owner. SAFe POPM is Scaled Agile’s credential for the Product Owner and Product Manager on an Agile Release Train.",
              ),
              // TODO: no difficulty rating or pass rate is stored for POPM. Do not invent one.
              q(
                "Is the SAFe POPM exam hard?",
                "Agile36 does not publish a difficulty rating or pass rate for this exam. It is 45 closed-book questions in 90 minutes, and Scaled Agile lists 82% as the passing score.",
              ),
              // TODO: POPM exam copy says web-based and closed book. It does not say proctored or unproctored. Confirm before stating either.
              q(
                "Is the SAFe POPM exam proctored?",
                "This page does not say a live proctor watches the exam. It does say the exam is web-based and closed book, and the result shows when you submit.",
              ),
            ]
          : []),
        q(
          `Is there a practice test for ${name}?`,
          content.assessmentHref
            ? `Yes. A free ${name} practice assessment is on this page.`
            : `This page does not list a practice test for ${name}.`,
        ),
        q(
          `How long is the ${name} certification valid?`,
          /one year|12 continuing|12 CEU/i.test(examBlob(content))
            ? `The membership or renewal period mentioned for ${name} is one year. Confirm the current term on the official exam guidelines.`
            : `A validity period for the ${name} certification is not in this page's data. Confirm it on the official exam guidelines.`,
        ),
        q(
          `What does it cost to renew ${name}, and how do you renew?`,
          /12 continuing|12 CEU/i.test(examBlob(content))
            ? `Renewing is separate from the class PDUs. The ${name} notes on this page say renewal is a minimum of 12 continuing education units a year. A renewal fee is not listed on this page.`
            : `A renewal fee and renewal steps for ${name} are not in this page's data. Confirm both with the certifying body.`,
        ),
      ];

  const payment: FaqItem[] = [
    q(
      `How much does ${name} cost at Agile36?`,
      price
        ? `The listed ${name} price on this page is $${price.current.toLocaleString("en-US")}. The crossed-out price is $${price.original.toLocaleString("en-US")}. The cohort you pick at checkout is the price you pay before any code.`
        : `The ${name} price is the amount shown on the cohort you select. A separate list price is not stored for this course.`,
    ),
    q(
      `Is the exam fee included with ${name}?`,
      facts.noExam
        ? `${name} does not include an exam fee because this class does not include an exam. ${content.includesLine}`
        : `Yes. ${content.includesLine}`,
    ),
    q(`Is there a discount code for ${name} at Agile36?`, discountAnswer(content)),
    q(`What is the refund policy for ${name}?`, REFUND),
    q(`Can I reschedule ${name}?`, RESCHEDULE),
    q(
      `What payment methods does Agile36 accept for ${name}?`,
      `Agile36 accepts major credit cards and debit cards for ${name}. Corporate training can also be paid by purchase order or wire transfer.`,
    ),
    q(
      `Does Agile36 offer group or corporate pricing for ${name}?`,
      `Yes. Private cohorts and group enrollments for ${name} are quoted separately. Use the group training request on this page.`,
    ),
    ...(content.slug === "product-owner-manager"
      ? [
          // TODO: no installment plan is stored in course or checkout data. Confirm before offering one.
          q(
            "Can I pay for SAFe POPM in installments?",
            "No installment plan is listed for this class. Pay by card, or request a quote if your employer is paying by purchase order or wire.",
          ),
        ]
      : []),
  ];

  const agile36: FaqItem[] = [
    q(
      `Who teaches ${name} at Agile36?`,
      trainers.length
        ? `The instructor for your ${name} cohort is named on that date. Agile36 instructors on these pages include ${trainers.join(", ")}.`
        : `The instructor for your ${name} cohort is named on the date you choose.`,
    ),
    q(
      `How do Agile36 ratings compare for ${name}?`,
      count
        ? `Agile36 publishes a 4.9/5 rating from ${count} reviews. ${content.safePartner === false ? "" : "The page also states the highest feedback score on Scaled Agile."}`.trim()
        : `Agile36 publishes a 4.9/5 rating. A review count for ${name} is not in the course data, so this page does not state one.`,
    ),
    q(
      `Does my ${name} class actually run?`,
      `Yes. Every listed Agile36 ${name} cohort is guaranteed to run, even with a small group.`,
    ),
    q(
      `Does Agile36 offer corporate training for ${name}?`,
      `Yes. Agile36 runs private ${name} cohorts for teams, live online or arranged for your group. Ask for a quote on this page.`,
    ),
  ];

  return { courses: course, exam, payment, generic: agile36 };
}

export function mergeCourseAeoGraph(graph: Record<string, unknown>, content: CatalogLandingContent): Record<string, unknown> {
  const cloned = JSON.parse(JSON.stringify(graph)) as Record<string, unknown>;
  const nodes = Array.isArray(cloned["@graph"]) ? (cloned["@graph"] as Record<string, unknown>[]) : [];
  const course = nodes.find((node) => node["@type"] === "Course");
  const pageUrl = `https://www.agile36.com/courses/${content.slug}`;

  if (course) {
    if (content.lastUpdated) course.dateModified = content.lastUpdated;
    const count = learnerReviewCount(content.slug);
    if (count == null) delete course.aggregateRating;
    else {
      course.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: count,
        bestRating: 5,
        worstRating: 1,
      };
    }
    const offer = course.offers as Record<string, unknown> | undefined;
    if (offer && content.promoEndsAt) offer.priceValidUntil = content.promoEndsAt.slice(0, 10);
  }

  const faqs = Object.values(content.faqs).flat();
  const withoutFaq = nodes.filter((node) => node["@type"] !== "FAQPage" && node["@type"] !== "Organization" && node["@type"] !== "EducationalOrganization");
  withoutFaq.push({
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });
  withoutFaq.push({
    "@type": "EducationalOrganization",
    "@id": SCHEMA_ORGANIZATION_ID,
    name: "Agile36",
    url: "https://www.agile36.com",
    logo: SCHEMA_ORGANIZATION_LOGO_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1000 Brickell Ave, Suite 715",
      addressLocality: "Miami",
      addressRegion: "FL",
      postalCode: "33131",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.linkedin.com/company/agile36",
      "https://www.facebook.com/agile36/",
      CLAUDE_PARTNER_BADGE_URL,
      SCALED_AGILE_TRAINING_FEEDBACK_URL,
    ],
  });

  const webPage = withoutFaq.find((node) => node["@type"] === "WebPage");
  if (webPage && content.lastUpdated) webPage.dateModified = content.lastUpdated;
  if (webPage && !webPage.url) webPage.url = pageUrl;

  cloned["@context"] = "https://schema.org";
  cloned["@graph"] = withoutFaq;
  return cloned;
}
