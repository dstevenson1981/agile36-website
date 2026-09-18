import type { ComponentType } from "react";
import PopmPracticeTest from "@/app/account/(dashboard)/practice-exams/popm/PopmPracticeTest";
import { POPM_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/popm/questions";
import LeadingSafePracticeTest from "@/app/account/(dashboard)/practice-exams/leading-safe/LeadingSafePracticeTest";
import { LEADING_SAFE_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/leading-safe/questions";
import ScrumMasterPracticeTest from "@/app/account/(dashboard)/practice-exams/scrum-master/ScrumMasterPracticeTest";
import { SCRUM_MASTER_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/scrum-master/questions";
import LpmPracticeTest from "@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest";
import { LPM_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/lpm/questions";
import AgileProductManagementPracticeTest from "@/app/account/(dashboard)/practice-exams/agile-product-management/AgileProductManagementPracticeTest";
import { AGILE_PRODUCT_MANAGEMENT_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/agile-product-management/questions";
import AdvancedScrumMasterPracticeTest from "@/app/account/(dashboard)/practice-exams/advanced-scrum-master/AdvancedScrumMasterPracticeTest";
import { ADVANCED_SCRUM_MASTER_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/advanced-scrum-master/questions";
import RtePracticeTest from "@/app/account/(dashboard)/practice-exams/rte/RtePracticeTest";
import { RTE_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/rte/questions";
import SafeForTeamsPracticeTest from "@/app/account/(dashboard)/practice-exams/safe-for-teams/SafeForTeamsPracticeTest";
import { SAFE_FOR_TEAMS_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/safe-for-teams/questions";
import AiProductManagementPracticeTest from "@/app/account/(dashboard)/practice-exams/ai-product-management/AiProductManagementPracticeTest";
import { AI_PRODUCT_MANAGEMENT_PRACTICE_QUESTIONS } from "@/app/account/(dashboard)/practice-exams/ai-product-management/questions";

type ExamTest = ComponentType<{ backHref?: string; backLabel?: string }>;

export type ClassExamDefinition = {
  title: string;
  heading: string;
  questionCount: number;
  description: string;
  Test: ExamTest;
};

export const CLASS_EXAM_CATALOG: Record<string, ClassExamDefinition> = {
  "product-owner-manager": {
    title: "SAFe POPM Pro Practice Test | Agile36",
    heading: "SAFe Product Owner/Product Manager (POPM) Practice Test",
    questionCount: POPM_QUESTIONS.length,
    description:
      "questions to help you prepare for the SAFe POPM certification exam. Answer all questions, then submit to see your score and review.",
    Test: PopmPracticeTest,
  },
  "leading-safe": {
    title: "SAFe Agilist Pro Practice Test | Agile36",
    heading: "SAFe Agilist (Leading SAFe) Practice Test",
    questionCount: LEADING_SAFE_QUESTIONS.length,
    description:
      "questions to help you prepare for the SAFe Agilist certification exam. Answer all questions, then submit to see your score and review.",
    Test: LeadingSafePracticeTest,
  },
  "scrum-master": {
    title: "SAFe Scrum Master Pro Practice Test | Agile36",
    heading: "SAFe Scrum Master (SSM) Practice Test",
    questionCount: SCRUM_MASTER_QUESTIONS.length,
    description:
      "questions to help you prepare for the SAFe Scrum Master certification exam. Answer all questions, then submit to see your score and review.",
    Test: ScrumMasterPracticeTest,
  },
  "lean-portfolio-management": {
    title: "SAFe LPM Pro Practice Test | Agile36",
    heading: "SAFe Lean Portfolio Management (LPM) Practice Test",
    questionCount: LPM_QUESTIONS.length,
    description:
      "questions to help you prepare for the SAFe LPM certification exam. Answer all questions, then submit to see your score and review.",
    Test: LpmPracticeTest,
  },
  "agile-product-management": {
    title: "Agile Product Management Pro Practice Test | Agile36",
    heading: "Agile Product Management (APM) Practice Test",
    questionCount: AGILE_PRODUCT_MANAGEMENT_QUESTIONS.length,
    description:
      "questions to help you prepare for the SAFe Agile Product Management certification exam. Answer all questions, then submit to see your score and review.",
    Test: AgileProductManagementPracticeTest,
  },
  "advanced-scrum-master": {
    title: "SAFe Advanced Scrum Master Pro Practice Test | Agile36",
    heading: "SAFe Advanced Scrum Master (SASM) Practice Test",
    questionCount: ADVANCED_SCRUM_MASTER_QUESTIONS.length,
    description:
      "questions to help you prepare for the SAFe Advanced Scrum Master certification exam. Answer all questions, then submit to see your score and review.",
    Test: AdvancedScrumMasterPracticeTest,
  },
  "release-train-engineer": {
    title: "SAFe RTE Pro Practice Test | Agile36",
    heading: "SAFe Release Train Engineer (RTE) Practice Test",
    questionCount: RTE_QUESTIONS.length,
    description:
      "questions to help you prepare for the SAFe RTE certification exam. Answer all questions, then submit to see your score and review.",
    Test: RtePracticeTest,
  },
  "safe-for-teams": {
    title: "SAFe for Teams Pro Practice Test | Agile36",
    heading: "SAFe for Teams (SP) Practice Test",
    questionCount: SAFE_FOR_TEAMS_QUESTIONS.length,
    description:
      "questions to help you prepare for the SAFe for Teams certification exam. Answer all questions, then submit to see your score and review.",
    Test: SafeForTeamsPracticeTest,
  },
  "certified-ai-product-manager": {
    title: "AI Product Management Pro Practice Test | Agile36",
    heading: "AI Product Management Practice Test",
    questionCount: AI_PRODUCT_MANAGEMENT_PRACTICE_QUESTIONS.length,
    description:
      "questions to help you prepare for the AI Product Management exam. Answer all questions, then submit to see your score and review.",
    Test: AiProductManagementPracticeTest,
  },
};

export function getClassExamDefinition(courseSlug: string): ClassExamDefinition | null {
  return CLASS_EXAM_CATALOG[courseSlug] ?? null;
}
