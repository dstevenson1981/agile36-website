"use client";

import { useEffect } from "react";
import { agile36WebMcpTools } from "@/app/webmcp/tools";
import { createToolScope, isWebMCPAvailable } from "@/app/webmcp/webmcpify";

/**
 * Registers in-page WebMCP tools for browser agents (ChatGPT Desktop, Chrome 149+
 * origin trial, Brave Leo). No-ops in browsers without document.modelContext.
 */
export default function WebMcpProvider() {
  useEffect(() => {
    if (!isWebMCPAvailable()) return;
    const scope = createToolScope("agile36", agile36WebMcpTools);
    return () => {
      scope();
    };
  }, []);

  return null;
}
