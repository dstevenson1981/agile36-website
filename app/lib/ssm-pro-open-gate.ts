/**
 * Temporary public entry to the SSM Pro practice exam.
 * Retire: remove imports from middleware and scrum-master practice page, then delete this file.
 *
 * Override with env SCRUM_MASTER_PRO_SHARE_KEY (rotate or disable by clearing code paths).
 */
export const SCRUM_MASTER_PRO_SHARE_KEY_FALLBACK = 'd4f8c2e1-ssm-pro-open-may2026';

export function getScrumMasterProShareKey(): string {
  const fromEnv = process.env.SCRUM_MASTER_PRO_SHARE_KEY?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : SCRUM_MASTER_PRO_SHARE_KEY_FALLBACK;
}

export const SSM_PRO_OPEN_COOKIE = 'agile36_ssm_pro_open' as const;
export const SSM_PRO_OPEN_COOKIE_VALUE = '1' as const;
