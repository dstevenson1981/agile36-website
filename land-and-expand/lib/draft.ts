export type DraftInput = {
  prospectFirstName: string | null;
  prospectTitle: string | null;
  companyName: string;
  offer: string;
  offerReason: string;
};

export type DraftMessage = {
  subject: string;
  bodyText: string;
  usedOpenAI: boolean;
};

function templateDraft(input: DraftInput): DraftMessage {
  const first = input.prospectFirstName || "there";
  const roleBit = input.prospectTitle
    ? `As a ${input.prospectTitle}`
    : `In your role at ${input.companyName}`;

  const subject = `${input.offer} for teams at ${input.companyName}`;
  const bodyText = [
    `Hi ${first},`,
    "",
    `${roleBit}, ${input.offer} is often a strong fit — ${input.offerReason}`,
    "",
    "If useful, I can share upcoming public dates or options for a private corporate cohort.",
    "",
    "Would either of those be helpful?",
    "",
    "Best,",
    "Agile36",
  ].join("\n");

  return { subject, bodyText, usedOpenAI: false };
}

function resolveOpenAIConfig(): {
  apiKey: string;
  baseUrl: string;
  model: string;
} | null {
  const openaiKey = process.env.OPENAI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  if (openaiKey) {
    return {
      apiKey: openaiKey,
      baseUrl: (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, ""),
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    };
  }

  // Hermes / OpenRouter is OpenAI-compatible and can run OpenAI models.
  if (openrouterKey) {
    return {
      apiKey: openrouterKey,
      baseUrl: (process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1").replace(/\/$/, ""),
      model: process.env.OPENAI_MODEL || "openai/gpt-4o-mini",
    };
  }

  return null;
}

/**
 * Prefer OpenAI (or OpenAI-compatible) when a key is set; otherwise deterministic template.
 * Never invent facts; never mention a colleague registration.
 */
export async function draftOutreach(input: DraftInput): Promise<DraftMessage> {
  const config = resolveOpenAIConfig();
  if (!config) return templateDraft(input);

  const system = [
    "You draft concise B2B training outreach for Agile36.",
    "Rules:",
    "- Be concise (under 120 words).",
    "- Reference only the recipient role and company name provided.",
    "- Explain why the training may be useful.",
    "- One clear CTA.",
    "- Do NOT mention any colleague, customer, registration, or purchase.",
    "- Do NOT invent company activity, job facts, or relationships.",
    '- Return JSON only: {"subject":"...","body_text":"..."}',
  ].join("\n");

  const user = JSON.stringify({
    prospect_first_name: input.prospectFirstName,
    prospect_title: input.prospectTitle,
    company_name: input.companyName,
    recommended_offer: input.offer,
    recommendation_reason: input.offerReason,
  });

  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!response.ok) {
      console.warn(`OpenAI draft failed (${response.status}); using template`);
      return templateDraft(input);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return templateDraft(input);

    const parsed = JSON.parse(jsonMatch[0]) as { subject?: string; body_text?: string };
    if (!parsed.subject || !parsed.body_text) return templateDraft(input);

    const lower = `${parsed.subject}\n${parsed.body_text}`.toLowerCase();
    if (
      /colleague|coworker|teammate|registered|enrolled|purchased|bought|just took|completed our/.test(
        lower
      )
    ) {
      console.warn("OpenAI draft rejected for unsafe language; using template");
      return templateDraft(input);
    }

    return {
      subject: parsed.subject.trim(),
      bodyText: parsed.body_text.trim(),
      usedOpenAI: true,
    };
  } catch (err) {
    console.warn("OpenAI draft error; using template", err);
    return templateDraft(input);
  }
}
