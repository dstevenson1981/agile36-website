"use client";

import { useEffect } from "react";

type CrispQueue = unknown[] & { push: (...args: unknown[]) => number };

declare global {
  interface Window {
    $crisp?: CrispQueue;
  }
}

export default function HideCrispChat() {
  useEffect(() => {
    document.documentElement.classList.add("hide-crisp-chat");
    const crisp = (window.$crisp ??= [] as unknown as CrispQueue);
    crisp.push(["do", "chat:hide"]);
    crisp.push(["on", "session:loaded", () => {
      window.$crisp?.push(["do", "chat:hide"]);
    }]);

    return () => {
      document.documentElement.classList.remove("hide-crisp-chat");
      window.$crisp?.push(["do", "chat:show"]);
    };
  }, []);

  return (
    <style>{`
      html.hide-crisp-chat .crisp-client,
      html.hide-crisp-chat [class^="crisp-client"] {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `}</style>
  );
}
