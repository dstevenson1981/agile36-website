import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { createAgile36McpServer, runAgile36McpSelfTest } from './agile36-core';

async function main(): Promise<void> {
  if (process.argv.includes('--self-test')) {
    await runAgile36McpSelfTest();
    return;
  }

  const server = createAgile36McpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  process.stderr.write(`[agile36-mcp] ${error instanceof Error ? error.stack ?? error.message : String(error)}\n`);
  process.exit(1);
});
