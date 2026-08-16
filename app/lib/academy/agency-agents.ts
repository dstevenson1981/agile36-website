import classCatalog from './agency-agents-class-catalog.json';
import businessCatalog from './agency-agents-business-catalog.json';
import classSkills from './agency-agents-class-skills.json';

export type AgencyAgentSkill = {
  id: string;
  name: string;
  summary?: string;
  description?: string;
  downloadUrl: string;
};

export type AgencyAgent = {
  id: string;
  filename: string;
  path: string;
  name: string;
  description: string;
  division: string;
  divisionSlug: string;
  emoji: string;
  vibe: string;
  color: string;
  /** Local or remote download for the agent markdown. */
  downloadUrl?: string;
  /** @deprecated Prefer downloadUrl for class; kept for owner inventory. */
  sourceUrl?: string;
  rawUrl?: string;
  claudeInstallPath?: string;
  skills?: AgencyAgentSkill[];
};

export type AgencyAgentCatalog = {
  sourceRepo?: string;
  sourceGallery?: string;
  audience?: string;
  total?: number;
  totalInSource?: number;
  agents: AgencyAgent[];
};

/** Curated SE-team pack for AI Agents Academy students. */
export const AGENCY_AGENTS_CLASS_CATALOG = classCatalog as AgencyAgentCatalog;

/** Full Agency Agents inventory for Agile36 client delivery (owner). */
export const AGENCY_AGENTS_BUSINESS_CATALOG = businessCatalog as AgencyAgentCatalog;

/** Flat index of class companion skills. */
export const AGENCY_AGENTS_CLASS_SKILLS = (classSkills as { skills: AgencyAgentSkill[] }).skills;

export function divisionsFor(catalog: AgencyAgentCatalog): string[] {
  return ['All', ...Array.from(new Set(catalog.agents.map((a) => a.division))).sort()];
}
