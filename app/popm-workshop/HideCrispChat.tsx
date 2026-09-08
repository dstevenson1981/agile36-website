"use client";

import { useEffect } from "react";

function crispQueue(): unknown[] {
  const w = window as Window & { $crisp?: unknown[] };
  if (!w.$crisp) w.$crisp = [];
  return w.$crisp;
}

export default function HideCrispChat() {
  useEffect(() => {
    document.documentElement.classList.add("hide-crisp-chat");
    const crisp = crispQueue();
    crisp.push(["do", "chat:hide"]);
    crisp.push(["on", "session:loaded", () => {
      crispQueue().push(["do", "chat:hide"]);
    }]);

    return () => {
      document.documentElement.classList.remove("hide-crisp-chat");
      crispQueue().push(["do", "chat:show"]);
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
