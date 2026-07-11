# Agile36 Business MCP

This MCP server turns the Agile36 website into an AI-operable business interface. Claude, Claude Code, or another MCP client can inspect course catalog data, schedules, content, visitors, leads, company profiles, buying intent, and staged revenue actions through one tool surface.

The default mode is intentionally broad but gated: tools exist now, while live actions are off unless you explicitly enable them.

## Remote Claude Connector

The website now exposes a Streamable HTTP MCP endpoint at:

```text
https://www.agile36.com/mcp
```

For production, set a strong shared secret in Vercel:

```text
AGILE36_MCP_REMOTE_TOKEN=<long-random-secret>
```

Then add the connector in Claude with the token in the URL:

```text
Name: Agile36
Remote MCP server URL: https://www.agile36.com/mcp?key=<long-random-secret>
OAuth Client ID: leave blank
OAuth Client Secret: leave blank
```

This is a shared-secret remote connector. It is good for getting your private Agile36 connector working quickly. For a multi-user organization or directory-grade connector, replace this with OAuth 2.1 so each user authenticates individually.

For local remote-MCP testing:

```bash
npm run dev
```

Then point an MCP client at:

```text
http://localhost:3001/mcp
```

Local development allows unauthenticated MCP calls unless you set `AGILE36_MCP_REMOTE_TOKEN`.

## Local Claude Code

From the Agile36 repo:

```bash
npm run mcp:agile36
```

Self-test without opening an MCP session:

```bash
npm run mcp:agile36:self-test
```

## Claude Config

Use this shape in your MCP client config. Keep secrets in `.env.local`; do not put them in the MCP config.

```json
{
  "mcpServers": {
    "agile36": {
      "command": "npm",
      "args": ["run", "mcp:agile36", "--silent"],
      "cwd": "/Users/deadrastevenson/Desktop/agile36-website",
      "env": {
        "AGILE36_MCP_WRITE_MODE": "draft"
      }
    }
  }
}
```

If the client does not support `cwd`, use an absolute script path:

```json
{
  "mcpServers": {
    "agile36": {
      "command": "/Users/deadrastevenson/Desktop/agile36-website/node_modules/.bin/tsx",
      "args": ["/Users/deadrastevenson/Desktop/agile36-website/mcp/agile36-server.ts"],
      "env": {
        "AGILE36_MCP_WRITE_MODE": "draft"
      }
    }
  }
}
```

## Write Modes

`AGILE36_MCP_WRITE_MODE=off`

No writes. Action tools return plans or disabled responses.

`AGILE36_MCP_WRITE_MODE=draft`

Default. Action tools save JSON drafts under `mcp/outbox/` for review. The outbox is gitignored.

`AGILE36_MCP_WRITE_MODE=live`

Live database or webhook writes can run only for tools that support live mode and only when the matching environment variables are present.

## Optional Flags

`AGILE36_MCP_REMOTE_TOKEN`

Enables the hosted `/mcp` endpoint in production. Claude can pass this as `?key=...` in the connector URL, as a Bearer token, or as `x-agile36-mcp-token`.

`AGILE36_MCP_REMOTE_ALLOW_UNAUTHENTICATED=true`

Allows unauthenticated access to the remote `/mcp` endpoint. Do not use this in production with private visitor/lead tools enabled.

`AGILE36_MCP_ENABLE_CONTENT_STAGING=false`

Disables content staging tools.

`AGILE36_MCP_ENABLE_WEBHOOKS=true`

Allows `send_sales_alert` to POST to `AGILE36_MCP_ALERT_WEBHOOK_URL`, but only in live mode.

`AGILE36_MCP_ENABLE_LIVE_PUBLISH=true`

Allows the reserved publish tool to move beyond disabled status, but only in live mode. The current implementation still stages publish requests instead of changing production files.

`AGILE36_MCP_LEAD_TABLE`

Table name for live `create_corporate_lead` inserts. Defaults to `mcp_leads`.

`AGILE36_MCP_ACTION_TABLE`

Table name for live `log_agent_action` inserts. Defaults to `mcp_agent_actions`.

## Exposed Tools

- `get_operating_manifest`
- `list_courses`
- `get_course`
- `list_schedules`
- `search_site_content`
- `get_page_content`
- `get_recent_visitors`
- `get_leads`
- `get_company_profile`
- `score_revenue_intent`
- `recommend_next_actions`
- `draft_followup_email`
- `draft_page_update`
- `draft_experiment`
- `log_agent_action`
- `create_corporate_lead`
- `send_sales_alert`
- `stage_content_change`
- `create_experiment_draft`
- `publish_approved_change`

## Resources

- `agile36://manifest`
- `agile36://guardrails`
- `agile36://courses`
- `agile36://site-map`

## Prompts

- `daily_revenue_operator`
- `high_intent_visitor_playbook`
- `course_page_optimizer`
- `corporate_training_operator`

## Security Notes

The MCP server can run locally over stdio or remotely over Streamable HTTP at `/mcp`. It reads environment variables server-side and never exposes secret values in tool output. Service-role Supabase access must remain server-side only.

The shared-secret remote URL should be treated like a password. Rotate `AGILE36_MCP_REMOTE_TOKEN` if it is exposed. OAuth 2.1 is the right next step before letting multiple users connect with separate permissions.

Visitor identification is useful signal, not proof. A visitor associated with a company may still be an individual learner, so sales actions should use intent scoring and staged review before outreach.

Live sending, publishing, pricing changes, refunds, card charges, and destructive production updates are not enabled by default.
