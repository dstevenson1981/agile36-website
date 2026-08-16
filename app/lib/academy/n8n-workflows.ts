import classCatalog from './n8n-workflows-catalog.json';
import businessCatalog from './n8n-workflows-business-catalog.json';

export type N8nWorkflow = {
  id: string;
  filename: string;
  path?: string;
  title: string;
  category: string;
  complexity: 'low' | 'medium' | 'high';
  trigger: string;
  nodeCount: number;
  integrations: string[];
  downloadUrl: string;
};

export type N8nWorkflowCatalog = {
  sourceRepo?: string;
  sourceFork?: string;
  sourceGallery: string;
  audience?: string;
  total?: number;
  totalInSource?: number;
  workflows: N8nWorkflow[];
};

/** Curated set for AI Agents Academy students / class labs. */
export const N8N_CLASS_CATALOG = classCatalog as N8nWorkflowCatalog;

/** Full inventory for Agile36 business / instructor use. */
export const N8N_BUSINESS_CATALOG = businessCatalog as N8nWorkflowCatalog;

/** @deprecated Use N8N_CLASS_CATALOG */
export const N8N_WORKFLOW_CATALOG = N8N_CLASS_CATALOG;

export function categoriesFor(catalog: N8nWorkflowCatalog): string[] {
  return ['All', ...Array.from(new Set(catalog.workflows.map((w) => w.category))).sort()];
}

export const N8N_CATEGORIES = categoriesFor(N8N_CLASS_CATALOG);
