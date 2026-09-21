export const OPEN_SITE_AGENT_EVENT = "a36:open-site-agent";

export function openSiteAgent(event?: { preventDefault?: () => void }) {
  event?.preventDefault?.();
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_SITE_AGENT_EVENT));
}
