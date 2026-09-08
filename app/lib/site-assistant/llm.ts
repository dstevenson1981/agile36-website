import { createOpenAI } from "@ai-sdk/openai";
import {
  generateText,
  isStepCount,
  jsonSchema,
  tool,
  type ModelMessage,
  type ToolSet,
} from "ai";
import { buildSystemPrompt, type AssistantMode } from "./prompt";
import {
  ASSISTANT_TOOL_DEFS,
  PUBLIC_ASSISTANT_TOOL_DEFS,
  runAssistantTool,
  type AssistantAction,
} from "./tools";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatImage = { name: string; type: string; dataUrl: string };

function resolveLlm() {
  const openaiKey = process.env.OPENAI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;
  if (openaiKey) {
    const provider = createOpenAI({
      apiKey: openaiKey,
      baseURL: (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, ""),
    });
    return {
      model: provider(process.env.OPENAI_MODEL || "gpt-4o-mini"),
    };
  }
  if (openrouterKey) {
    const provider = createOpenAI({
      apiKey: openrouterKey,
      baseURL: (process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1").replace(/\/$/, ""),
      name: "openrouter",
      headers: {
        "HTTP-Referer": "https://www.agile36.com",
        "X-Title": "Agile36 Site Assistant",
      },
    });
    return {
      model: provider(process.env.OPENAI_MODEL || "openai/gpt-4o-mini"),
    };
  }
  return null;
}

function actionsFromReply(reply: string, existing: AssistantAction[]): AssistantAction[] {
  if (existing.length > 0) return existing;
  const match = reply.match(
    /\/courses\/([a-z0-9-]+)\/schedule\/checkout\?[^)\s]*schedule=([a-z0-9-]+)/i,
  );
  if (!match) return existing;
  const courseSlug = match[1];
  const scheduleId = match[2];
  return [
    {
      label: "Enroll in this class",
      href: `/courses/${courseSlug}/schedule/checkout?schedule=${scheduleId}&course=${courseSlug}`,
    },
  ];
}

const ENGAGE_TURN: ChatTurn = {
  role: "user",
  content:
    "[The visitor has not spoken. First message: two or three sentences covering (1) discounts if they are between jobs or self-paying, (2) 98% pass rate on the certification exam, (3) the exam fee is included in the course. No numbered list. Then: if the current page is a specific class or checkout, name that class, look up its next date, and offer an enroll button. Do not ask which class. If it is not a class page, ask which class they want. Do not pick a class. Do not pitch Leading SAFe. Do not ask how you can help.]",
};

export async function runSiteAssistant(input: {
  messages: ChatTurn[];
  mode?: AssistantMode;
  pagePath?: string;
  pageTitle?: string;
  visitorContext?: string;
  engage?: boolean;
  images?: ChatImage[];
}): Promise<{ reply: string; actions: AssistantAction[]; handoff: boolean }> {
  const mode = input.mode ?? "public";
  const tools = mode === "owner" ? ASSISTANT_TOOL_DEFS : PUBLIC_ASSISTANT_TOOL_DEFS;
  const history =
    input.engage && input.messages.length === 0 ? [ENGAGE_TURN] : input.messages.slice(-16);
  const images = input.images?.slice(0, 3) ?? [];
  const messages: ModelMessage[] = history.map((turn, index) => {
    const isLastUser = turn.role === "user" && index === history.length - 1 && images.length > 0;
    if (!isLastUser) return { role: turn.role, content: turn.content };
    return {
      role: "user",
      content: [
        { type: "text", text: turn.content },
        ...images.map((image) => ({
          type: "image" as const,
          image: image.dataUrl,
          mediaType: image.type,
        })),
      ],
    };
  });

  const actions: AssistantAction[] = [];
  let handoff = false;
  const sdkTools: ToolSet = {};
  for (const definition of tools) {
    const name = definition.function.name;
    sdkTools[name] = tool({
      description: definition.function.description,
      inputSchema: jsonSchema<Record<string, unknown>>(
        definition.function.parameters as Parameters<typeof jsonSchema>[0],
      ),
      execute: async (args) => {
        const result = await runAssistantTool(name, args, mode);
        if (result.actions) actions.push(...result.actions);
        if (result.handoff) handoff = true;
        return result.data;
      },
    });
  }

  const config = resolveLlm();
  if (!config) throw new Error("missing_llm");
  const result = await generateText({
    model: config.model,
    instructions:
      mode === "owner"
        ? buildSystemPrompt("owner")
        : buildSystemPrompt("public", input.pagePath, input.pageTitle, input.visitorContext),
    messages,
    tools: sdkTools,
    stopWhen: isStepCount(6),
    maxRetries: 2,
  });
  const reply =
    result.text.trim() ||
    (mode === "owner"
      ? "Send the email or the situation and I will look it up."
      : "If you tell me the role, I will pick the next class.");

  return {
    reply,
    actions: mode === "public" ? actionsFromReply(reply, actions) : actions,
    handoff,
  };
}

export function llmConfigured(): boolean {
  return resolveLlm() !== null;
}
