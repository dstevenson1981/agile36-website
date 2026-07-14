"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

/**
 * Microsoft Clarity session replay / heatmaps.
 * Set NEXT_PUBLIC_CLARITY_PROJECT_ID from clarity.microsoft.com → Settings → Overview.
 */
export default function ClarityAnalytics() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
    if (!projectId) return;

    Clarity.init(projectId);
  }, []);

  return null;
}
