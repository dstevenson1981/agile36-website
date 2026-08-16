import classCatalog from './agency-agents-class-catalog.json';
import businessCatalog from './agency-agents-business-catalog.json';

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
  sourceUrl: string;
  rawUrl: string;
  claudeInstallPath: string;
};

export type AgencyAgentCatalog = {
  sourceRepo: string;
  sourceGallery: string;
  audience?: string;
  total?: number;
  totalInSource?: number;
  agents: AgencyAgent[];
};

/** Curated SE-team pack for AI Agents Academy students. */
export const AGENCY_AGENTS_CLASS_CATALOG = classCatalog as AgencyAgentCatalog;

/** Full Agency Agents inventory for Agile36 client delivery (owner). */
export const AGENCY_AGENTS_BUSINESS_CATALOG = businessCatalog as AgencyAgentCatalog;

export function divisionsFor(catalog: AgencyAgentCatalog): string[] {
  return ['All', ...Array.from(new Set(catalog.agents.map((a) => a.division))).sort()];
}
