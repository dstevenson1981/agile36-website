export type CorporateQuoteCopy = {
  shortName: string;
  heading: string;
  upskill: string;
  examIncluded: string;
};

const COPY: Record<string, CorporateQuoteCopy> = {
  "product-owner-manager": {
    shortName: "POPM",
    heading: "Private POPM for your product teams",
    upskill: "Upskill Product Owners and PMs",
    examIncluded: "POPM exam, courseware, and SAFe Studio included",
  },
  "leading-safe": {
    shortName: "Leading SAFe",
    heading: "Private Leading SAFe for your leaders",
    upskill: "Upskill executives, managers, and change agents",
    examIncluded: "SAFe Agilist exam, courseware, and SAFe Studio included",
  },
  "scrum-master": {
    shortName: "SSM",
    heading: "Private Scrum Master training for your teams",
    upskill: "Upskill Scrum Masters across the ART",
    examIncluded: "SSM exam, courseware, and SAFe Studio included",
  },
  "lean-portfolio-management": {
    shortName: "LPM",
    heading: "Private LPM for portfolio and PMO leaders",
    upskill: "Upskill portfolio, PMO, and Lean finance roles",
    examIncluded: "LPM exam, courseware, and SAFe Studio included",
  },
  "agile-product-management": {
    shortName: "APM",
    heading: "Private APM for product leadership",
    upskill: "Upskill product managers and product leaders",
    examIncluded: "APM exam, courseware, and SAFe Studio included",
  },
  "safe-for-architects": {
    shortName: "ARCH",
    heading: "Private SAFe for Architects for your architecture function",
    upskill: "Upskill enterprise and solution architects",
    examIncluded: "ARCH exam, courseware, and SAFe Studio included",
  },
  "safe-for-teams": {
    shortName: "SAFe for Teams",
    heading: "Private SAFe for Teams for your ART",
    upskill: "Upskill ART team members together",
    examIncluded: "SP exam, courseware, and SAFe Studio included",
  },
  devops: {
    shortName: "SAFe DevOps",
    heading: "Private SAFe DevOps for your delivery organization",
    upskill: "Upskill DevOps, SRE, and delivery teams",
    examIncluded: "SDP exam, courseware, and SAFe Studio included",
  },
  "advanced-scrum-master": {
    shortName: "SASM",
    heading: "Private Advanced Scrum Master for your coaches",
    upskill: "Upskill experienced Scrum Masters and team coaches",
    examIncluded: "SASM exam, courseware, and SAFe Studio included",
  },
  "release-train-engineer": {
    shortName: "RTE",
    heading: "Private RTE cohorts for your Agile Release Trains",
    upskill: "Upskill Release Train Engineers and program coaches",
    examIncluded: "RTE exam, courseware, and SAFe Studio included",
  },
  "value-stream-mapping": {
    shortName: "VSM",
    heading: "Private Value Stream Mapping for your delivery teams",
    upskill: "Upskill teams mapping flow and removing waste",
    examIncluded: "SAFe VSM micro-credential and courseware included",
  },
  "responsible-ai": {
    shortName: "Responsible AI",
    heading: "Private Responsible AI with SAFe for your AI initiatives",
    upskill: "Upskill teams governing AI inside SAFe",
    examIncluded: "SAFe Responsible AI micro-credential and courseware included",
  },
};

const FALLBACK: CorporateQuoteCopy = {
  shortName: "SAFe",
  heading: "Private SAFe training for your teams",
  upskill: "Upskill your SAFe roles together",
  examIncluded: "Exam, courseware, and SAFe Studio included",
};

export function getCorporateQuoteCopy(slug: string): CorporateQuoteCopy {
  return COPY[slug] ?? FALLBACK;
}
