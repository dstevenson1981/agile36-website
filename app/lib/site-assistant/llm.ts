import { buildSystemPrompt, type AssistantMode } from "./prompt";
import {
  ASSISTANT_TOOL_DEFS,
  PUBLIC_ASSISTANT_TOOL_DEFS,
  runAssistantTool,
  type AssistantAction,
} from "./tools";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatImage = { name: string; type: string; dataUrl: string };

type OpenAiContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

type OpenAiMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null | OpenAiContentPart[];
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
};

function resolveLlm(): { apiKey: string; baseUrl: string; model: string } | null {
  const openaiKey = process.env.OPENAI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;
  if (openaiKey) {
    return {
      apiKey: openaiKey,
      baseUrl: (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, ""),
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    };
  }
  if (openrouterKey) {
    return {
      apiKey: openrouterKey,
      baseUrl: (process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1").replace(/\/$/, ""),
      model: process.env.OPENAI_MODEL || "openai/gpt-4o-mini",
    };
  }
  return null;
}

async function complete(
  messages: OpenAiMessage[],
  tools: typeof ASSISTANT_TOOL_DEFS | typeof PUBLIC_ASSISTANT_TOOL_DEFS,
) {
  const config = resolveLlm();
  if (!config) throw new Error("missing_llm");

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.3,
      messages,
      tools,
      tool_choice: "auto",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`llm_http_${response.status}: ${text.slice(0, 400)}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: OpenAiMessage }>;
  };
  const message = payload.choices?.[0]?.message;
  if (!message) throw new Error("llm_empty");
  return message;
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
  const messages: OpenAiMessage[] = [
    {
      role: "system",
      content:
        mode === "owner"
          ? buildSystemPrompt("owner")
          : buildSystemPrompt("public", input.pagePath, input.pageTitle, input.visitorContext),
    },
    ...history.map((turn, index) => {
      const isLastUser = turn.role === "user" && index === history.length - 1 && images.length > 0;
      if (!isLastUser) return { role: turn.role, content: turn.content };
      return {
        role: "user" as const,
        content: [
          { type: "text" as const, text: turn.content },
          ...images.map((image) => ({
            type: "image_url" as const,
            image_url: { url: image.dataUrl },
          })),
        ],
      };
    }),
  ];

  const actions: AssistantAction[] = [];
  let handoff = false;

  for (let i = 0; i < 6; i += 1) {
    const message = await complete(messages, tools);
    const calls = message.tool_calls ?? [];
    if (calls.length === 0) {
      // `content` is typed for outgoing messages too, where it can be a parts
      // array; an assistant reply only ever comes back as a string or null.
      const replyText = typeof message.content === "string" ? message.content : "";
      const reply =
        replyText.trim() ||
        (mode === "owner"
          ? "Send the email or the situation and I will look it up."
          : "If you tell me the role, I will pick the next class.");
      return {
        reply,
        actions: mode === "public" ? actionsFromReply(reply, actions) : actions,
        handoff,
      };
    }

    messages.push({
      role: "assistant",
      content: message.content ?? null,
      tool_calls: calls,
    });

    for (const call of calls) {
      let parsed: unknown = {};
      try {
        parsed = call.function.arguments ? JSON.parse(call.function.arguments) : {};
      } catch {
        parsed = {};
      }
      const result = await runAssistantTool(call.function.name, parsed, mode);
      if (result.actions) actions.push(...result.actions);
      if (result.handoff) handoff = true;
      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result.data),
      });
    }
  }

  return {
    reply:
      mode === "owner"
        ? "I have the records. Send what they asked if you want the reply written out."
        : "I have the class. Weekday or weekend and I will send the enroll link.",
    actions,
    handoff,
  };
}

export function llmConfigured(): boolean {
  return resolveLlm() !== null;
}
