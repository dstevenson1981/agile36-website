declare global {
  interface Window {
    $crisp?: unknown[];
  }
}

export function openCrispChat(event?: { preventDefault?: () => void }) {
  event?.preventDefault?.();
  if (typeof window === "undefined") return;
  if (window.$crisp) {
    window.$crisp.push(["do", "chat:open"]);
  }
}
