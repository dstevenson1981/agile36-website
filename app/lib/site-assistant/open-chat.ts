export const SITE_CHAT_EVENT = "agile36-open-chat";

export function openSiteChat() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SITE_CHAT_EVENT));
}
